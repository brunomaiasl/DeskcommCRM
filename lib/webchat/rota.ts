/**
 * Por onde a resposta desta conversa sai AGORA: pela página do Web Chat ou pelo
 * WhatsApp.
 *
 * A coluna `conversations.webchat_rota` guarda a INTENÇÃO (o paciente falou por
 * último pela página; o convite saiu). Ela só VALE com um link ativo — não
 * revogado e dentro das 24h. A conta é feita aqui, na leitura, e nunca gravada:
 * uma coluna "web até tal hora" seria uma segunda verdade que envelhece sozinha
 * (a mesma lição de `guardrails/messaging-window.ts`).
 *
 * Puro: quem lê o banco é o chamador.
 */

export interface LinkParaRota {
  id: string;
  expires_at: string;
  revoked_at: string | null;
}

export interface ConversaParaRota {
  webchat_rota: string | null | undefined;
  webchat_desativado: boolean | null | undefined;
}

export type Rota = { rota: "web"; linkId: string } | { rota: "whatsapp" };

export function linkAtivo(link: LinkParaRota | null | undefined, agora: Date): boolean {
  if (!link || link.revoked_at) return false;
  return new Date(link.expires_at).getTime() > agora.getTime();
}

export function decidirRota(
  conversa: ConversaParaRota,
  link: LinkParaRota | null | undefined,
  agora: Date,
): Rota {
  if (conversa.webchat_desativado === true) return { rota: "whatsapp" };
  if (conversa.webchat_rota !== "web") return { rota: "whatsapp" };
  if (!link || !linkAtivo(link, agora)) return { rota: "whatsapp" };
  return { rota: "web", linkId: link.id };
}
