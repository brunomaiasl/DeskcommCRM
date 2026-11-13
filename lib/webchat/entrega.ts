/**
 * A ENTREGA PELA PÁGINA — o desvio que o `sendMessageHandler` faz quando a
 * conversa está na rota Web Chat.
 *
 * O handler continua sendo a porta ÚNICA de saída (tela, agente, automação,
 * MCP): a linha nasce lá, com o mesmo `sent_via`, autoria, assinatura e
 * auditoria. O que muda é só o transporte: em vez de chamar o adapter do
 * WhatsApp, a linha é marcada `delivered` e a página a busca. Nada vai à Meta,
 * então não há custo nem janela de 24h.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

import { logger } from "@/lib/logger";

import { rotaDaConversa } from "./links";
import { CHAVE_DO_WEBCHAT, type MarcaDoWebchat } from "./marca";

export { CHAVE_DO_WEBCHAT, viaWebchat } from "./marca";

/**
 * A rota desta conversa é a página? Devolve o link ativo, ou `null`.
 *
 * TOLERANTE a banco sem a migration 9348: esta pergunta está no caminho de TODO
 * envio do sistema, e um clone que subiu o código antes de aplicar o schema não
 * pode parar de mandar mensagem por causa de uma coluna ausente. Qualquer erro
 * de leitura = WhatsApp, que é o comportamento de antes.
 */
export async function rotaWebDoEnvio(
  db: SupabaseClient,
  organizationId: string,
  conversationId: string,
): Promise<{ linkId: string } | null> {
  try {
    const { data, error } = await db
      .from("conversations")
      .select("id, organization_id, webchat_rota, webchat_desativado")
      .eq("organization_id", organizationId)
      .eq("id", conversationId)
      .maybeSingle();
    if (error || !data) return null;
    const conversa = data as {
      id: string;
      organization_id: string;
      webchat_rota: string | null;
      webchat_desativado: boolean | null;
    };
    if (conversa.webchat_rota !== "web" || conversa.webchat_desativado === true) return null;
    const rota = await rotaDaConversa(db, conversa);
    return rota.rota === "web" ? { linkId: rota.linkId } : null;
  } catch (err) {
    logger.warn("webchat: rota não pôde ser lida — envio segue pelo WhatsApp", {
      organization_id: organizationId,
      conversation_id: conversationId,
      detail: err instanceof Error ? err.message.slice(0, 160) : "desconhecido",
    });
    return null;
  }
}

/** Marca a linha recém-criada como entregue na página. */
export async function entregarNaPagina(
  db: SupabaseClient,
  args: {
    organizationId: string;
    messageId: string;
    metadataAtual: Record<string, unknown> | null | undefined;
    linkId: string;
    colunas: string;
  },
): Promise<unknown> {
  const agora = new Date().toISOString();
  const marca: MarcaDoWebchat = { link_id: args.linkId };
  const { data, error } = await db
    .from("messages")
    .update({
      status: "delivered",
      ack: 2,
      delivered_at: agora,
      metadata: { ...(args.metadataAtual ?? {}), [CHAVE_DO_WEBCHAT]: marca },
    })
    .eq("organization_id", args.organizationId)
    .eq("id", args.messageId)
    .select(args.colunas)
    .maybeSingle();
  if (error || !data) throw new Error(`webchat_entrega_falhou: ${error?.message ?? "sem linha"}`);
  return data;
}
