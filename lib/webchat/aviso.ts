/**
 * O AVISO de nova mensagem: o paciente saiu da página e chegou resposta.
 *
 * Vai pelo WhatsApp, no máximo um por hora por conversa, e só quando a página
 * não deu sinal no último minuto. O "no máximo um por hora" é garantido no
 * banco, numa linha só: o UPDATE que carimba `last_notice_at` só casa se o
 * carimbo anterior já tem mais de uma hora. Dois envios ao mesmo tempo — o
 * agente costuma mandar a resposta em várias bolhas — disputam essa linha, e só
 * um ganha.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

import { logger } from "@/lib/logger";

import { INTERVALO_DO_AVISO_MS, PRESENCA_MS, lerConfigDoWebChat } from "./config";
import { basePublica, tokenDoLink, urlDoLink } from "./links";
import { enviarLinkPeloWhatsapp } from "./whatsapp";

/** O paciente está na página? Puro, para testar sem banco. */
export function pacientePresente(lastSeenAt: string | null, agora: Date): boolean {
  return !!lastSeenAt && agora.getTime() - new Date(lastSeenAt).getTime() < PRESENCA_MS;
}

export function avisoLiberado(lastNoticeAt: string | null, agora: Date): boolean {
  return !lastNoticeAt || agora.getTime() - new Date(lastNoticeAt).getTime() >= INTERVALO_DO_AVISO_MS;
}

export async function avisarSeAusente(
  admin: SupabaseClient,
  args: { organizationId: string; conversationId: string; linkId: string; requestId: string },
): Promise<void> {
  const agora = new Date();
  const { data: link } = await admin
    .from("webchat_links")
    .select("id, last_seen_at, last_notice_at, revoked_at, expires_at")
    .eq("organization_id", args.organizationId)
    .eq("id", args.linkId)
    .maybeSingle();
  const l = link as {
    id: string;
    last_seen_at: string | null;
    last_notice_at: string | null;
    revoked_at: string | null;
    expires_at: string;
  } | null;
  if (!l || l.revoked_at || new Date(l.expires_at) <= agora) return;
  if (pacientePresente(l.last_seen_at, agora)) return;
  if (!avisoLiberado(l.last_notice_at, agora)) return;

  // A disputa: só quem conseguir carimbar manda.
  const limite = new Date(agora.getTime() - INTERVALO_DO_AVISO_MS).toISOString();
  let carimbo = admin
    .from("webchat_links")
    .update({ last_notice_at: agora.toISOString() })
    .eq("organization_id", args.organizationId)
    .eq("id", args.linkId);
  carimbo = l.last_notice_at ? carimbo.lt("last_notice_at", limite) : carimbo.is("last_notice_at", null);
  const { data: ganhou } = await carimbo.select("id").maybeSingle();
  if (!ganhou) return;

  const { data: org } = await admin
    .from("organizations")
    .select("settings")
    .eq("id", args.organizationId)
    .maybeSingle();
  const config = lerConfigDoWebChat((org as { settings: unknown } | null)?.settings);
  if (!config.ativo) return;

  const base = basePublica();
  const token = await tokenDoLink(admin, args.organizationId, args.linkId);
  if (!base || !token) {
    logger.warn("webchat: aviso sem link reenviável (sem endereço público ou token sem cifra)", {
      organization_id: args.organizationId,
      conversation_id: args.conversationId,
    });
    return;
  }

  const envio = await enviarLinkPeloWhatsapp(admin, {
    organizationId: args.organizationId,
    conversationId: args.conversationId,
    token,
    url: urlDoLink(base, token),
    texto: config.aviso_texto,
    // "Sem modelo próprio, usa o do convite."
    modelo: config.modelo_aviso ?? config.modelo_convite,
    requestId: args.requestId,
    chaveDeIdempotencia: `webchat:aviso:${args.linkId}:${agora.toISOString()}`,
  });
  if (!envio.enviado) {
    logger.info("webchat: aviso de nova mensagem não saiu", {
      organization_id: args.organizationId,
      conversation_id: args.conversationId,
      motivo: envio.motivo,
    });
  }
}
