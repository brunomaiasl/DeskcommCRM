/**
 * O que a PÁGINA do Web Chat lê e escreve — o lado do paciente.
 *
 * Tudo aqui começa por um TOKEN da URL e nada mais: não há sessão, não há
 * organização no corpo. A organização, a conversa e o contato saem da linha do
 * link achada pelo hash do token (fonte confiável), e toda consulta seguinte
 * filtra por eles.
 *
 * O que o paciente vê é RECORTADO de propósito: só as mensagens desde que ESTE
 * link foi criado (quem tem o link vê a conversa de agora, não o histórico de
 * anos), sem as ocultadas pelo gestor, sem as do sistema e sem o próprio
 * convite/aviso.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

import { aplicarEfeitosPosEntrada } from "@/lib/channels/pos-entrada";
import { logger } from "@/lib/logger";

import { CHAVE_DO_WEBCHAT } from "./marca";
import { linkPeloToken, type LinhaDoLink } from "./links";
import { ORIGEM_WEBCHAT } from "./origem";
import { linkAtivo } from "./rota";

export const MAX_MENSAGEM = 2000;
const TIPOS_VISIVEIS = ["text", "image", "video", "audio", "document", "sticker", "location", "contact"];
const ESTADOS_ENCERRADOS = new Set(["resolved", "closed", "archived"]);

export type EstadoDoLink = "ativo" | "expirado" | "inexistente";

export interface MensagemDaPagina {
  id: string;
  /** `paciente` escreveu; `clinica` respondeu (pessoa ou assistente). */
  de: "paciente" | "clinica";
  tipo: string;
  texto: string | null;
  midia: { url: string; mime: string | null } | null;
  em: string;
}

export interface CabecalhoDaPagina {
  nomeDaClinica: string;
  expiraEm: string;
}

/** O link do token, se ainda serve. `expirado` cobre vencido, revogado e conversa encerrada. */
export async function abrirLink(
  admin: SupabaseClient,
  token: string,
  agora: Date = new Date(),
): Promise<{ estado: "ativo"; link: LinhaDoLink } | { estado: Exclude<EstadoDoLink, "ativo"> }> {
  const link = await linkPeloToken(admin, token);
  if (!link) return { estado: "inexistente" };
  if (!linkAtivo(link, agora)) return { estado: "expirado" };
  const { data: conv } = await admin
    .from("conversations")
    .select("status")
    .eq("organization_id", link.organization_id)
    .eq("id", link.conversation_id)
    .maybeSingle();
  const status = (conv as { status: string } | null)?.status;
  if (!status || ESTADOS_ENCERRADOS.has(status)) return { estado: "expirado" };
  return { estado: "ativo", link };
}

/** Carimba "o paciente está na página agora" (e a primeira abertura). */
export async function registrarPresenca(admin: SupabaseClient, link: LinhaDoLink, agora: Date = new Date()): Promise<void> {
  const ts = agora.toISOString();
  await admin
    .from("webchat_links")
    .update({ last_seen_at: ts, ...(link.opened_at ? {} : { opened_at: ts }) })
    .eq("organization_id", link.organization_id)
    .eq("id", link.id);
}

export async function cabecalho(admin: SupabaseClient, link: LinhaDoLink): Promise<CabecalhoDaPagina> {
  const { data } = await admin.from("organizations").select("display_name").eq("id", link.organization_id).maybeSingle();
  return {
    nomeDaClinica: (data as { display_name: string | null } | null)?.display_name?.trim() || "Atendimento",
    expiraEm: link.expires_at,
  };
}

/**
 * As mensagens que a página mostra, em ordem. `depois` (ISO) traz só as novas —
 * a página pergunta a cada poucos segundos.
 */
export async function mensagensDaPagina(
  admin: SupabaseClient,
  link: LinhaDoLink,
  depois?: string | null,
): Promise<MensagemDaPagina[]> {
  const desde = depois && depois > link.created_at ? depois : link.created_at;
  const { data } = await admin
    .from("messages")
    .select("id, direction, type, body, media_storage_path, media_mime, metadata, sent_at, status")
    .eq("organization_id", link.organization_id)
    .eq("conversation_id", link.conversation_id)
    .in("type", TIPOS_VISIVEIS)
    .gt("sent_at", desde)
    .order("sent_at", { ascending: true })
    .limit(200);

  const linhas = (data ?? []) as Array<{
    id: string;
    direction: "inbound" | "outbound";
    type: string;
    body: string | null;
    media_storage_path: string | null;
    media_mime: string | null;
    metadata: Record<string, unknown> | null;
    sent_at: string;
    status: string;
  }>;

  const visiveis = linhas.filter((m) => {
    const md = m.metadata ?? {};
    if (md.crm_hidden_at) return false; // ocultada pelo gestor
    if (md.webchat_link) return false; // o próprio convite/aviso com o link
    // O que saiu da clínica e NÃO chegou (falhou, ainda na fila) não aparece:
    // mostrar seria dizer ao paciente algo que ele não recebeu de fato.
    if (m.direction === "outbound" && (m.status === "failed" || m.status === "queued")) return false;
    return true;
  });

  const resultado: MensagemDaPagina[] = [];
  for (const m of visiveis) {
    let midia: MensagemDaPagina["midia"] = null;
    if (m.media_storage_path) {
      const { data: assinada } = await admin.storage
        .from("whatsapp-media")
        .createSignedUrl(m.media_storage_path, 3600);
      if (assinada?.signedUrl) midia = { url: assinada.signedUrl, mime: m.media_mime };
    }
    resultado.push({
      id: m.id,
      de: m.direction === "inbound" ? "paciente" : "clinica",
      tipo: m.type,
      texto: m.body,
      midia,
      em: m.sent_at,
    });
  }
  return resultado;
}

/** O paciente leu: o que saiu pela página passa a `read`. */
export async function marcarLidas(admin: SupabaseClient, link: LinhaDoLink): Promise<void> {
  await admin
    .from("messages")
    .update({ status: "read", ack: 3, read_at: new Date().toISOString() })
    .eq("organization_id", link.organization_id)
    .eq("conversation_id", link.conversation_id)
    .eq("direction", "outbound")
    .eq("status", "delivered")
    .not(`metadata->${CHAVE_DO_WEBCHAT}`, "is", null);
}

export type DesfechoDaEntrada =
  | { ok: true; mensagem: MensagemDaPagina; duplicada: boolean }
  | { ok: false; motivo: "texto_vazio" | "texto_longo" | "falhou" };

/**
 * A mensagem que o paciente escreveu na página.
 *
 * `idDoCliente` é gerado pelo navegador por mensagem: o mesmo envio repetido
 * (rede caiu, botão apertado duas vezes) cai no `unique (organization_id,
 * external_id)` e vira a MESMA linha — nunca duas mensagens nem dois turnos.
 */
export async function receberDaPagina(
  admin: SupabaseClient,
  link: LinhaDoLink,
  args: { texto: string; idDoCliente: string; requestId: string },
): Promise<DesfechoDaEntrada> {
  const texto = args.texto.trim();
  if (!texto) return { ok: false, motivo: "texto_vazio" };
  if (texto.length > MAX_MENSAGEM) return { ok: false, motivo: "texto_longo" };

  const { data: conv } = await admin
    .from("conversations")
    .select("id, channel_session_id, contact_id")
    .eq("organization_id", link.organization_id)
    .eq("id", link.conversation_id)
    .maybeSingle();
  const c = conv as { id: string; channel_session_id: string; contact_id: string } | null;
  if (!c) return { ok: false, motivo: "falhou" };

  const agora = new Date().toISOString();
  const externalId = `webchat:${link.id}:${args.idDoCliente}`;
  const linha = {
    organization_id: link.organization_id,
    conversation_id: c.id,
    channel_session_id: c.channel_session_id,
    contact_id: c.contact_id,
    external_id: externalId,
    type: "text",
    direction: "inbound",
    status: "received",
    body: texto,
    sent_at: agora,
    metadata: { [CHAVE_DO_WEBCHAT]: { link_id: link.id } },
  };

  const { data: criada, error } = await admin
    .from("messages")
    .insert(linha)
    .select("id, sent_at")
    .single();

  if (error?.code === "23505") {
    const { data: existente } = await admin
      .from("messages")
      .select("id, sent_at, body")
      .eq("organization_id", link.organization_id)
      .eq("external_id", externalId)
      .maybeSingle();
    const e = existente as { id: string; sent_at: string; body: string | null } | null;
    if (!e) return { ok: false, motivo: "falhou" };
    return {
      ok: true,
      duplicada: true,
      mensagem: { id: e.id, de: "paciente", tipo: "text", texto: e.body, midia: null, em: e.sent_at },
    };
  }
  if (error || !criada) {
    logger.error("webchat: mensagem da página não gravou", {
      organization_id: link.organization_id,
      conversation_id: link.conversation_id,
      detail: error?.message?.slice(0, 160),
    });
    return { ok: false, motivo: "falhou" };
  }
  const m = criada as { id: string; sent_at: string };

  // A conversa: prévia, não lidas, espera da Fila e rota `web` — SEM andar o
  // relógio da janela de 24h do WhatsApp (migration 9348).
  const { error: erroMarca } = await admin.rpc("fn_mark_conversation_web_message" as never, {
    p_conv: c.id,
    p_preview: texto.slice(0, 200),
    p_at: m.sent_at,
  } as never);
  if (erroMarca) {
    logger.warn("webchat: conversa não marcada com a mensagem da página", {
      organization_id: link.organization_id,
      conversation_id: c.id,
      detail: erroMarca.message.slice(0, 160),
    });
  }
  await registrarPresenca(admin, link);

  // Os mesmos efeitos de qualquer mensagem do paciente: opt-out, demanda no
  // funil, campanha, follow-up e o turno do agente. É isso que faz a IA responder.
  await aplicarEfeitosPosEntrada(admin as never, {
    organizationId: link.organization_id,
    contactId: c.contact_id,
    conversationId: c.id,
    messageId: m.id,
    channelSessionId: c.channel_session_id,
    texto,
    nomeDoContato: null,
    requestId: args.requestId,
    origem: ORIGEM_WEBCHAT,
  });

  return {
    ok: true,
    duplicada: false,
    mensagem: { id: m.id, de: "paciente", tipo: "text", texto, midia: null, em: m.sent_at },
  };
}
