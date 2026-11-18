/**
 * O SELO DO WEB CHAT na lista da Inbox (pedido de 18/11, no molde do Clinia):
 * a conversa está sendo atendida pela página, e o paciente está nela AGORA?
 *
 * Client-safe (zero dependência): a lista importa daqui; a rota da lista só
 * calcula com o mesmo critério.
 *
 *  - `ativo`: há link vivo (não revogado, não vencido) ou a conversa está na
 *    rota `web` — a resposta sai pela página;
 *  - `online`: o paciente deu sinal de vida na página há pouco
 *    (`last_seen_at`, carimbado pela própria página a cada consulta).
 */
export interface SeloDoWebchat {
  ativo: boolean;
  online: boolean;
}

/** A página pergunta por mensagens novas a cada poucos segundos; 90 s sem sinal = saiu. */
export const JANELA_DE_PRESENCA_MS = 90_000;

export interface LinkParaSelo {
  last_seen_at: string | null;
  revoked_at: string | null;
  expires_at: string;
}

export function seloDoWebchat(
  rota: string | null | undefined,
  desativado: boolean | null | undefined,
  links: readonly LinkParaSelo[],
  agora: Date = new Date(),
): SeloDoWebchat | null {
  if (desativado === true) return null;
  const t = agora.getTime();
  const vivos = links.filter((l) => l.revoked_at === null && new Date(l.expires_at).getTime() > t);
  const ativo = rota === "web" || vivos.length > 0;
  if (!ativo) return null;
  const online = vivos.some(
    (l) => l.last_seen_at !== null && t - new Date(l.last_seen_at).getTime() <= JANELA_DE_PRESENCA_MS,
  );
  return { ativo: true, online };
}
