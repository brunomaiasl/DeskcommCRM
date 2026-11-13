-- manifest: **Web Chat da conversa: o paciente continua a MESMA conversa do WhatsApp numa página do CRM, por um link de 24h.** Tabela nova `webchat_links` (um link por convite: hash do token para achar, token cifrado com `fn_encrypt_oauth` para reenviar o mesmo link no aviso, validade, revogação, quando abriu, quando foi visto, último aviso), duas colunas em `conversations` (`webchat_rota`: por onde a resposta sai, `whatsapp` ou `web`; `webchat_desativado`: a atendente desligou o Web Chat nesta conversa), a função `fn_mark_conversation_web_message` (registra a mensagem da página na conversa SEM tocar `last_inbound_at`, que é o relógio da janela de 24h do WhatsApp — a página não abre janela na Meta) e o gatilho `trg_webchat_revoga_ao_encerrar` (conversa encerrada revoga os links e volta a rota para o WhatsApp: atendimento novo pede link novo). RLS: leitura por membro da organização; escrita só pelo service role (rotas do app). Aditiva: nada existente muda de comportamento enquanto ninguém criar link.
--
-- 9348 — WEB CHAT DA CONVERSA.
--
-- ═══ Por quê ═══
--
-- Desde 01/10/2026 a Meta cobra cada mensagem de SERVIÇO (a resposta dentro da
-- janela de 24h), com 1.000 grátis por número por mês. A conversa que continua
-- numa página do próprio CRM não passa pela Meta: o que custa é o convite com o
-- link e, quando o paciente sai da página, o aviso de "nova mensagem" (no
-- máximo um por hora).
--
-- ═══ O desenho: rota, não canal ═══
--
-- O Web Chat NÃO é uma conexão nova em `channel_sessions`: a conversa continua
-- sendo do número de WhatsApp dela (`channel_session_id` não muda), e a página é
-- só OUTRA ROTA de entrega da mesma conversa. Assim o histórico, a fila, o
-- setor, o negócio e o agente de IA são os mesmos — não existe "a conversa do
-- site" separada para juntar depois.
--
--   * `conversations.webchat_rota` diz por onde a resposta sai. Vira `web` quando
--     o convite sai e quando o paciente escreve pela página; volta a `whatsapp`
--     quando ele escreve pelo WhatsApp (resposta sai por onde ele falou por
--     último), quando a atendente clica "Voltar para o WhatsApp" e quando a
--     conversa é encerrada. `web` só VALE com um link ativo (não revogado e dentro
--     da validade) — a conta é feita na leitura, nunca guardada.
--   * `webchat_links` é o link. O token é um segredo de portador (quem tem o link
--     entra, como no WhatsApp Web de um convite): guardamos o HASH para achar a
--     linha e o token CIFRADO para mandar o MESMO link no aviso de nova mensagem.
--
-- ═══ O relógio da janela não pode andar ═══
--
-- `fn_mark_conversation_message` grava `last_inbound_at` em toda entrada do
-- cliente, e é por ele que a régua da janela (`lib/channels/janela.ts`,
-- `guardrails/messaging-window.ts`) decide se o WhatsApp aceita texto livre. A
-- mensagem que chega pela página NÃO abre janela na Meta; se andasse o relógio,
-- o sistema mandaria texto livre pelo WhatsApp e a Meta recusaria com 131047. Por
-- isso a função própria abaixo: o resto (prévia, não lidas, espera da Fila) é o
-- mesmo, e a coluna da janela fica intocada.

-- ─── 1. A rota e o interruptor, na conversa ────────────────────────────────
alter table public.conversations
  add column if not exists webchat_rota text not null default 'whatsapp';
alter table public.conversations
  add column if not exists webchat_desativado boolean not null default false;

-- Auto-cura antes da constraint: valor fora do vocabulário volta ao padrão.
update public.conversations set webchat_rota = 'whatsapp'
 where webchat_rota is null or webchat_rota not in ('whatsapp', 'web');

alter table public.conversations drop constraint if exists conversations_webchat_rota_check;
alter table public.conversations add constraint conversations_webchat_rota_check
  check (webchat_rota in ('whatsapp', 'web'));

comment on column public.conversations.webchat_rota is
  'Por onde a resposta sai (migration 9348): whatsapp ou web (página do Web Chat). web só vale com link ativo em webchat_links — a conta é feita na leitura (lib/webchat/rota.ts).';
comment on column public.conversations.webchat_desativado is
  'A atendente desligou o Web Chat nesta conversa (migration 9348): sem convite automático e sem rota web até religar.';

-- ─── 2. O link ─────────────────────────────────────────────────────────────
create table if not exists public.webchat_links (
  id                 uuid primary key default gen_random_uuid(),
  organization_id    uuid not null references public.organizations(id) on delete cascade,
  conversation_id    uuid not null references public.conversations(id) on delete cascade,
  contact_id         uuid not null references public.contacts(id) on delete cascade,
  token_hash         text not null,
  token_cifrado      bytea,
  origem             text not null default 'manual',
  created_by_user_id uuid,
  created_at         timestamptz not null default now(),
  expires_at         timestamptz not null,
  revoked_at         timestamptz,
  revoked_reason     text,
  opened_at          timestamptz,
  last_seen_at       timestamptz,
  last_notice_at     timestamptz,
  constraint webchat_links_origem_check
    check (origem in ('convite_automatico', 'manual')),
  constraint webchat_links_validade_check
    check (expires_at > created_at)
);

create unique index if not exists webchat_links_token_hash_key
  on public.webchat_links (token_hash);
create index if not exists webchat_links_conversa
  on public.webchat_links (organization_id, conversation_id, created_at desc);
-- O link ativo de uma conversa é a pergunta quente (envio, aviso, tela).
create index if not exists webchat_links_ativos
  on public.webchat_links (conversation_id, expires_at)
  where revoked_at is null;

alter table public.webchat_links enable row level security;

revoke all on public.webchat_links from public, anon, authenticated, service_role;
grant select on public.webchat_links to authenticated;
grant select, insert, update, delete on public.webchat_links to service_role;

drop policy if exists tenant_isolation_webchat_links_select on public.webchat_links;
create policy tenant_isolation_webchat_links_select on public.webchat_links
  for select to authenticated
  using (organization_id in (select public.fn_user_org_ids()) or public.fn_is_platform_admin());

comment on table public.webchat_links is
  'Links do Web Chat (migration 9348). Um por convite. token_hash (sha256 hex) acha a linha; token_cifrado (fn_encrypt_oauth) reenvia o mesmo link no aviso. Escrita só pelo service role (lib/webchat/).';

-- ─── 3. A mensagem da página, registrada sem andar o relógio da janela ─────
--
-- Espelho do ramo de ENTRADA de `fn_mark_conversation_message` (ordem de trava
-- contato → conversa, issue #2884; mensagem atrasada; régua da espera da Fila,
-- issue #990) com UMA diferença: `last_inbound_at` não muda. Só entrada: a
-- resposta que sai pela página é marcada pelo caminho de saída de sempre (que
-- não toca a janela), e duas réguas de saída divergiriam com o tempo.
create or replace function public.fn_mark_conversation_web_message(
  p_conv uuid, p_preview text, p_at timestamptz
) returns void language plpgsql security definer set search_path = public as $$
declare c public.conversations; pre_contact uuid;
begin
  select * into c from public.conversations where id = p_conv;
  if not found then return; end if;
  pre_contact := c.contact_id;
  perform public.fn_service_lock(c.organization_id, c.contact_id);
  perform 1 from public.contacts
    where id = pre_contact and organization_id = c.organization_id
    for no key update;
  select * into c from public.conversations where id = p_conv for no key update;
  if c.contact_id is distinct from pre_contact then
    raise exception 'service_contact_changed' using errcode = '40001';
  end if;
  if p_at <= c.service_closed_at then return; end if;
  update public.conversations set
    last_message_at = greatest(last_message_at, p_at),
    last_message_preview = case when last_message_at is null or p_at >= last_message_at
                                then p_preview else last_message_preview end,
    unread_count_for_assignee = unread_count_for_assignee + 1,
    -- O paciente escreveu pela página: a resposta sai por ela.
    webchat_rota = 'web',
    -- Mesmos três ramos da entrada em `fn_mark_conversation_message`.
    awaiting_since = case
      when p_at <= coalesce(c.last_outbound_at, '-infinity'::timestamptz) then
        coalesce(c.awaiting_since, p_at)
      when c.awaiting_since > coalesce(c.last_outbound_at, '-infinity'::timestamptz)
       and c.awaiting_since > coalesce(c.service_closed_at, '-infinity'::timestamptz) then
        least(c.awaiting_since, p_at)
      else p_at
    end
  where id = p_conv and organization_id = c.organization_id;
  update public.contacts set last_activity_at = greatest(last_activity_at, p_at)
   where id = c.contact_id and organization_id = c.organization_id;
end; $$;

revoke execute on function public.fn_mark_conversation_web_message(uuid, text, timestamptz)
  from public, anon, authenticated;
grant execute on function public.fn_mark_conversation_web_message(uuid, text, timestamptz)
  to service_role;

-- ─── 4. Conversa encerrada: links revogados, rota volta ao WhatsApp ────────
--
-- Atendimento novo pede link novo (é o comportamento que a clínica já conhece):
-- quem guardou o link antigo não reabre uma conversa encerrada pela página.
create or replace function public.fn_webchat_revoga_ao_encerrar()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (new.status in ('resolved', 'closed', 'archived')
        and old.status is distinct from new.status)
     or (new.service_closed_at is distinct from old.service_closed_at
        and new.service_closed_at is not null) then
    update public.webchat_links
       set revoked_at = now(), revoked_reason = 'conversa_encerrada'
     where conversation_id = new.id
       and organization_id = new.organization_id
       and revoked_at is null;
    if new.webchat_rota <> 'whatsapp' then
      update public.conversations set webchat_rota = 'whatsapp'
       where id = new.id and organization_id = new.organization_id;
    end if;
  end if;
  return null;
end; $$;

revoke execute on function public.fn_webchat_revoga_ao_encerrar() from public, anon, authenticated;

drop trigger if exists trg_webchat_revoga_ao_encerrar on public.conversations;
create trigger trg_webchat_revoga_ao_encerrar
  after update of status, service_closed_at on public.conversations
  for each row execute function public.fn_webchat_revoga_ao_encerrar();

notify pgrst, 'reload schema';
