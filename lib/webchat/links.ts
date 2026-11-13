/**
 * Os links do Web Chat no banco (`webchat_links`, migration 9348).
 *
 * Service role sempre (a tabela não tem escrita para `authenticated`), e por
 * isso TODA consulta filtra `organization_id` vindo de fonte confiável — a
 * sessão de quem clicou, ou a linha do próprio link achada pelo hash do token.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

import { logger } from "@/lib/logger";
import { basePublicaConfiguradaDaInstalacao } from "@/lib/webhooks/url-publica";

import { VALIDADE_DO_LINK_MS } from "./config";
import { decidirRota, linkAtivo, type Rota } from "./rota";
import { gerarToken, hashDoToken, tokenValido } from "./token";

export interface LinhaDoLink {
  id: string;
  organization_id: string;
  conversation_id: string;
  contact_id: string;
  origem: "convite_automatico" | "manual";
  created_at: string;
  expires_at: string;
  revoked_at: string | null;
  revoked_reason: string | null;
  opened_at: string | null;
  last_seen_at: string | null;
  last_notice_at: string | null;
}

const COLUNAS =
  "id, organization_id, conversation_id, contact_id, origem, created_at, expires_at, revoked_at, revoked_reason, opened_at, last_seen_at, last_notice_at";

/** O caminho da página. O token vai no PATH (o botão do modelo da Meta cola `{{1}}` no fim). */
export const CAMINHO_DA_PAGINA = "/chat/";

/**
 * A base pública da instalação (`NEXT_PUBLIC_APP_URL`). Sem ela não dá para
 * montar link que o paciente consiga abrir — devolve `null` e quem chama não
 * manda convite (melhor do que mandar `localhost` para um celular).
 */
export function basePublica(): string | null {
  return basePublicaConfiguradaDaInstalacao({ aceitarMaquinaLocal: true });
}

export function urlDoLink(base: string, token: string): string {
  return `${base}${CAMINHO_DA_PAGINA}${token}`;
}

export async function criarLink(
  admin: SupabaseClient,
  args: {
    organizationId: string;
    conversationId: string;
    contactId: string;
    origem: LinhaDoLink["origem"];
    criadoPor: string | null;
    agora?: Date;
  },
): Promise<{ link: LinhaDoLink; token: string }> {
  const agora = args.agora ?? new Date();
  const token = gerarToken();

  // Cifrado para reenviar o MESMO link no aviso. Sem a chave da instalação a
  // cifra volta nula: o link funciona igual, e o aviso cria um link novo.
  let cifrado: string | null = null;
  const { data: cifra, error: erroCifra } = await admin.rpc("fn_encrypt_oauth" as never, {
    plaintext: token,
  } as never);
  if (erroCifra || !cifra) {
    logger.warn("webchat: token sem cifra (chave da instalação ausente) — o aviso criará link novo", {
      organization_id: args.organizationId,
    });
  } else {
    cifrado = cifra as unknown as string;
  }

  const { data, error } = await admin
    .from("webchat_links")
    .insert({
      organization_id: args.organizationId,
      conversation_id: args.conversationId,
      contact_id: args.contactId,
      token_hash: hashDoToken(token),
      token_cifrado: cifrado,
      origem: args.origem,
      created_by_user_id: args.criadoPor,
      created_at: agora.toISOString(),
      expires_at: new Date(agora.getTime() + VALIDADE_DO_LINK_MS).toISOString(),
    })
    .select(COLUNAS)
    .single();
  if (error || !data) throw new Error(`webchat_criar_link_falhou: ${error?.message ?? "sem linha"}`);
  return { link: data as unknown as LinhaDoLink, token };
}

/** O token em claro de um link já criado — para o aviso reenviar o mesmo endereço. */
export async function tokenDoLink(
  admin: SupabaseClient,
  organizationId: string,
  linkId: string,
): Promise<string | null> {
  const { data } = await admin
    .from("webchat_links")
    .select("token_cifrado")
    .eq("organization_id", organizationId)
    .eq("id", linkId)
    .maybeSingle();
  const cifrado = (data as { token_cifrado: string | null } | null)?.token_cifrado;
  if (!cifrado) return null;
  const normalizado = cifrado.startsWith("\\x") ? cifrado : `\\x${cifrado}`;
  const { data: claro, error } = await admin.rpc("fn_decrypt_oauth" as never, {
    ciphertext: normalizado,
  } as never);
  if (error || typeof claro !== "string" || !tokenValido(claro)) return null;
  return claro;
}

/**
 * Acha o link pelo token da URL. Token com formato errado nem consulta o banco.
 * Devolve a linha mesmo vencida/revogada: a página precisa dizer "este link
 * expirou" em vez de "não existe".
 */
export async function linkPeloToken(admin: SupabaseClient, token: string): Promise<LinhaDoLink | null> {
  if (!tokenValido(token)) return null;
  const { data } = await admin
    .from("webchat_links")
    .select(COLUNAS)
    .eq("token_hash", hashDoToken(token))
    .maybeSingle();
  return (data as unknown as LinhaDoLink | null) ?? null;
}

/** Os links de uma conversa, do mais novo ao mais antigo. */
export async function linksDaConversa(
  admin: SupabaseClient,
  organizationId: string,
  conversationId: string,
  limite = 20,
): Promise<LinhaDoLink[]> {
  const { data } = await admin
    .from("webchat_links")
    .select(COLUNAS)
    .eq("organization_id", organizationId)
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: false })
    .limit(limite);
  return (data as unknown as LinhaDoLink[] | null) ?? [];
}

/** O link ativo mais novo da conversa, ou `null`. */
export async function linkAtivoDaConversa(
  admin: SupabaseClient,
  organizationId: string,
  conversationId: string,
  agora: Date = new Date(),
): Promise<LinhaDoLink | null> {
  const { data } = await admin
    .from("webchat_links")
    .select(COLUNAS)
    .eq("organization_id", organizationId)
    .eq("conversation_id", conversationId)
    .is("revoked_at", null)
    .gt("expires_at", agora.toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  const link = (data as unknown as LinhaDoLink | null) ?? null;
  return link && linkAtivo(link, agora) ? link : null;
}

export async function revogarLinks(
  admin: SupabaseClient,
  organizationId: string,
  conversationId: string,
  motivo: string,
): Promise<void> {
  const { error } = await admin
    .from("webchat_links")
    .update({ revoked_at: new Date().toISOString(), revoked_reason: motivo })
    .eq("organization_id", organizationId)
    .eq("conversation_id", conversationId)
    .is("revoked_at", null);
  if (error) throw new Error(`webchat_revogar_falhou: ${error.message}`);
}

export async function definirRota(
  admin: SupabaseClient,
  organizationId: string,
  conversationId: string,
  rota: "web" | "whatsapp",
): Promise<void> {
  const { error } = await admin
    .from("conversations")
    .update({ webchat_rota: rota })
    .eq("organization_id", organizationId)
    .eq("id", conversationId);
  if (error) throw new Error(`webchat_definir_rota_falhou: ${error.message}`);
}

/**
 * A rota EFETIVA da conversa agora. Uma consulta a mais só quando a intenção é
 * `web` — o caso comum (`whatsapp`) não toca a tabela de links.
 */
export async function rotaDaConversa(
  admin: SupabaseClient,
  conversa: { organization_id: string; id: string; webchat_rota?: string | null; webchat_desativado?: boolean | null },
  agora: Date = new Date(),
): Promise<Rota> {
  if (conversa.webchat_desativado === true || conversa.webchat_rota !== "web") return { rota: "whatsapp" };
  const link = await linkAtivoDaConversa(admin, conversa.organization_id, conversa.id, agora);
  return decidirRota(
    { webchat_rota: conversa.webchat_rota, webchat_desativado: conversa.webchat_desativado },
    link,
    agora,
  );
}
