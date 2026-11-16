/**
 * O HISTÓRICO DE TRANSFERÊNCIAS de uma conversa — o que aparece no fio.
 *
 * ─── O defeito ───────────────────────────────────────────────────────────────
 * Transferir a conversa para outra pessoa (ou para uma fila) gravava a troca de
 * dono em `conversation_assignment_events` (auditoria) e uma atividade na linha
 * do tempo do NEGÓCIO — que só existe quando o contato tem negócio. O fio da
 * conversa mostra mensagens, notas e passagens da IA, e nenhum destes: quem abria
 * a conversa depois não via que ela tinha passado por alguém. "Histórico total"
 * pede o contrário — toda transferência aparece, por qualquer pessoa que a faça.
 *
 * ─── Onde mora ───────────────────────────────────────────────────────────────
 * Em `conversations.metadata.transferencias`, uma lista curta (as últimas
 * `LIMITE`). Sem coluna nem tabela nova: a produção não recebe migration fora de
 * ordem, e a conversa já é o dono natural do próprio histórico — o realtime de
 * `conversations` (já na publicação) avisa o fio, como faz com as passagens.
 *
 * Guardamos ids, não nomes: o nome da pessoa muda (e some na anonimização); quem
 * lê resolve o nome na hora (`nomesDosAtendentes`). O nome da FILA, ao contrário,
 * vai junto: apagar a fila não pode reescrever o que a conversa passou.
 */

export const CHAVE_DAS_TRANSFERENCIAS = "transferencias";
export const LIMITE_DE_TRANSFERENCIAS = 50;

export interface TransferenciaRegistrada {
  id: string;
  /** ISO 8601 — quando a transferência aconteceu. */
  em: string;
  /** Quem clicou. */
  por_user_id: string | null;
  /** Quem estava com a conversa antes (ausente = estava sem dono). */
  de_user_id: string | null;
  /** Destino pessoa — exclusivo com `para_fila_id`. */
  para_user_id: string | null;
  para_fila_id: string | null;
  /** O nome da fila NA HORA da transferência. */
  para_fila_nome: string | null;
  motivo: string | null;
}

/** O que a tela recebe: os ids já trocados por nomes. */
export interface TransferenciaDoFio {
  id: string;
  em: string;
  por_nome: string | null;
  de_nome: string | null;
  para_nome: string | null;
  para_fila_nome: string | null;
  motivo: string | null;
}

function ehObjeto(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function texto(v: unknown): string | null {
  return typeof v === "string" && v.trim() !== "" ? v : null;
}

/** Lê a lista de dentro do metadata, descartando o que não tem a forma esperada. */
export function lerTransferencias(metadata: unknown): TransferenciaRegistrada[] {
  if (!ehObjeto(metadata)) return [];
  const bruto = metadata[CHAVE_DAS_TRANSFERENCIAS];
  if (!Array.isArray(bruto)) return [];
  const lidas: TransferenciaRegistrada[] = [];
  for (const item of bruto) {
    if (!ehObjeto(item)) continue;
    const id = texto(item["id"]);
    const em = texto(item["em"]);
    if (!id || !em || Number.isNaN(new Date(em).getTime())) continue;
    lidas.push({
      id,
      em,
      por_user_id: texto(item["por_user_id"]),
      de_user_id: texto(item["de_user_id"]),
      para_user_id: texto(item["para_user_id"]),
      para_fila_id: texto(item["para_fila_id"]),
      para_fila_nome: texto(item["para_fila_nome"]),
      motivo: texto(item["motivo"]),
    });
  }
  return lidas;
}

/**
 * O metadata NOVO, com a transferência acrescentada ao fim. Preserva toda outra
 * chave (`setor_origem` e o resto moram no mesmo objeto) e corta o excesso pelo
 * começo — as mais antigas saem primeiro.
 */
export function comTransferencia(
  metadata: unknown,
  entrada: TransferenciaRegistrada,
): Record<string, unknown> {
  const base = ehObjeto(metadata) ? metadata : {};
  const lista = [...lerTransferencias(base), entrada].slice(-LIMITE_DE_TRANSFERENCIAS);
  return { ...base, [CHAVE_DAS_TRANSFERENCIAS]: lista };
}

/**
 * Grava a transferência no metadata da conversa (ler + escrever, pelo cliente da
 * SESSÃO — a RLS de `conversations` vale). Devolve `false` sem lançar: o registro
 * é rastro, e uma falha nele nunca desfaz a transferência já feita.
 */
export async function registrarTransferenciaNaConversa(args: {
  // Tipo estrutural mínimo: aceita o cliente do supabase-js sem importá-lo aqui.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any;
  organizationId: string;
  conversationId: string;
  entrada: TransferenciaRegistrada;
}): Promise<boolean> {
  const { supabase, organizationId, conversationId, entrada } = args;
  try {
    const { data, error } = await supabase
      .from("conversations")
      .select("metadata")
      .eq("id", conversationId)
      .eq("organization_id", organizationId)
      .maybeSingle();
    if (error || !data) return false;
    const { error: erroDeEscrita } = await supabase
      .from("conversations")
      .update({ metadata: comTransferencia((data as { metadata: unknown }).metadata, entrada) })
      .eq("id", conversationId)
      .eq("organization_id", organizationId);
    return !erroDeEscrita;
  } catch {
    return false;
  }
}
