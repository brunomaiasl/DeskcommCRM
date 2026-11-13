/**
 * A marca "esta mensagem andou pela página do Web Chat" em `messages.metadata`.
 *
 * Client-safe (zero dependência): o balão da caixa de entrada importa daqui.
 * O lado do servidor (`entrega.ts`, `pagina.ts`) grava com a MESMA chave — uma
 * constante só, para leitura e escrita não divergirem.
 */
export const CHAVE_DO_WEBCHAT = "webchat";

export interface MarcaDoWebchat {
  link_id: string;
}

/** A mensagem andou pela página? (para o balão "via Web Chat"). */
export function viaWebchat(metadata: unknown): boolean {
  return (
    !!metadata &&
    typeof metadata === "object" &&
    CHAVE_DO_WEBCHAT in (metadata as Record<string, unknown>) &&
    !!(metadata as Record<string, unknown>)[CHAVE_DO_WEBCHAT]
  );
}
