/**
 * VALORES pela TABELA da base de conhecimento, lidos de forma EXATA.
 *
 * Por que existe (18/11): o agente dava R$ 69,00 para a consulta de clínico
 * geral (o certo é R$ 29,90 com o Cartão). A busca semântica pela frase do
 * paciente trazia o trecho de CIRURGIA geral, e o modelo ignorava a instrução de
 * buscar de novo. Preço não pode depender de semelhança de texto: aqui a tabela
 * é lida pelos dois formatos fixos que ela usa e o item é achado PELO NOME.
 *
 *  - consulta:  "A consulta de <nome> custa R$ <particular> no particular e
 *                R$ <cartão> com o Cartão Saúde Anchieta"
 *                (+ apelidos na linha "CONSULTA DE <NOME> — apelido, apelido…")
 *  - exame:     "- <NOME> — Particular: R$ <x> | Com Cartão Saúde Anchieta: R$ <y>"
 *
 * Puro (parse e busca) + um carregador que lê os trechos indexados da versão
 * ativa de cada fonte da organização.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

export interface ValorDaTabela {
  tipo: "consulta" | "exame";
  nome: string;
  particular: string;
  cartao: string;
  /** Só consulta: como o paciente costuma pedir (da linha de apelidos). */
  apelidos?: string[];
}

function semAcento(t: string): string {
  return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function limpar(t: string): string {
  return semAcento(t).replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
}

const RE_CONSULTA =
  /A consulta de ([^?.\n]+?) custa R\$ ([\d.]+,\d{2}) no particular e R\$ ([\d.]+,\d{2}) com o Cart[aã]o/g;
const RE_APELIDOS = /^CONSULTA DE (.+?) — (.+)$/gm;
const RE_EXAME = /^- (.+?) — Particular: R\$ ([\d.]+,\d{2}) \| Com Cart[aã]o Sa[uú]de Anchieta: R\$ ([\d.]+,\d{2})/gm;

/** Extrai todos os valores de um texto da tabela (sem repetição pelo nome). */
export function extrairValores(texto: string): ValorDaTabela[] {
  const porChave = new Map<string, ValorDaTabela>();
  for (const m of texto.matchAll(RE_CONSULTA)) {
    const nome = m[1]!.trim();
    const chave = `c:${limpar(nome)}`;
    if (!porChave.has(chave)) {
      porChave.set(chave, { tipo: "consulta", nome, particular: `R$ ${m[2]}`, cartao: `R$ ${m[3]}`, apelidos: [] });
    }
  }
  for (const m of texto.matchAll(RE_APELIDOS)) {
    const alvo = porChave.get(`c:${limpar(m[1]!)}`);
    if (!alvo) continue;
    const novos = m[2]!
      .replace(/\.$/, "")
      .split(",")
      .map((a) => a.trim())
      .filter((a) => a.length > 1);
    alvo.apelidos = [...new Set([...(alvo.apelidos ?? []), ...novos])];
  }
  for (const m of texto.matchAll(RE_EXAME)) {
    const nome = m[1]!.trim();
    const chave = `e:${limpar(nome)}`;
    if (!porChave.has(chave)) porChave.set(chave, { tipo: "exame", nome, particular: `R$ ${m[2]}`, cartao: `R$ ${m[3]}` });
  }
  return [...porChave.values()];
}

/** Palavras do pedido que não dizem O QUÊ ("quanto custa a consulta de…"). */
const VAZIAS = new Set([
  "a", "o", "as", "os", "de", "da", "do", "das", "dos", "com", "e", "para", "pra", "um", "uma", "no", "na",
  "consulta", "consultas", "exame", "exames", "valor", "valores", "preco", "precos", "quanto", "custa",
  "orcamento", "medico", "medica", "dr", "dra", "particular", "cartao", "saude", "anchieta",
]);

/** Como o paciente fala → como o exame está escrito na tabela (US, TC, RM, RX). */
const SIGLAS: Array<[RegExp, string]> = [
  [/\b(ultrassom|ultrassonografia|ultrasom|ecografia|ultra som)\b/g, "us"],
  [/\b(tomografia|tomo)\b/g, "tc"],
  [/\b(ressonancia|ressonancia magnetica)\b/g, "rm"],
  [/\b(raio x|raiox|raio-x|radiografia)\b/g, "rx"],
];

function comSiglas(t: string): string {
  let r = limpar(t);
  for (const [re, sigla] of SIGLAS) r = r.replace(re, sigla);
  return r;
}

function radicais(t: string): string[] {
  return [...new Set(comSiglas(t).split(" ").filter((p) => p && !VAZIAS.has(p)).map((p) => p.slice(0, 6)))];
}

/**
 * Os valores que respondem ao pedido. Consulta com nome ou apelido IGUAL ao
 * pedido vem sozinha (é a resposta). Senão, os melhores por radical, a 1ª
 * palavra do pedido obrigatória — "clínico geral" não casa com "cirurgia geral".
 */
export function buscarValor(pedido: string, tabela: readonly ValorDaTabela[], limite = 5): ValorDaTabela[] {
  const alvo = limpar(pedido)
    .split(" ")
    .filter((p) => p && !VAZIAS.has(p))
    .join(" ");
  const completo = limpar(pedido);
  if (!alvo && !completo) return [];
  // O pedido inteiro OU sem as palavras vazias: "médico geral" é apelido do clínico
  // geral, mas sem "médico" (palavra vazia) sobraria só "geral".
  const igual = (t: string) => t === alvo || t === completo;
  const exata = tabela.find(
    (v) => v.tipo === "consulta" && (igual(limpar(v.nome)) || (v.apelidos ?? []).some((a) => igual(limpar(a)))),
  );
  if (!alvo) return exata ? [exata] : [];
  if (exata) return [exata];

  const rs = radicais(pedido);
  if (rs.length === 0) return [];
  const pontuados: Array<{ v: ValorDaTabela; nota: number }> = [];
  for (const v of tabela) {
    const nomes = [v.nome, ...(v.apelidos ?? [])].map(comSiglas);
    let melhor = 0;
    for (const n of nomes) {
      const palavras = n.split(" ");
      const casa = (r: string) => palavras.some((w) => w.startsWith(r));
      if (!casa(rs[0]!)) continue;
      const casadas = rs.filter(casa).length;
      // Quanto do pedido casou, e quão "limpo" é o nome (menos palavras sobrando).
      const nota = casadas / rs.length + casadas / Math.max(palavras.length, 1) / 10 + (v.tipo === "consulta" ? 0.05 : 0);
      if (nota > melhor) melhor = nota;
    }
    if (melhor > 0) pontuados.push({ v, nota: melhor });
  }
  pontuados.sort((a, b) => b.nota - a.nota || a.v.nome.length - b.v.nome.length);
  const topo = pontuados[0]?.nota ?? 0;
  return pontuados.filter((p) => p.nota >= topo - 0.15).slice(0, limite).map((p) => p.v);
}

// ─── carregador (trechos indexados da versão ativa) ─────────────────────────

const TTL_MS = 5 * 60 * 1000;
const cache = new Map<string, { expira: number; tabela: ValorDaTabela[] }>();

/** Para testes e para "acabei de subir a tabela nova". */
export function esquecerTabelaDeValores(): void {
  cache.clear();
}

/** A tabela da organização: os valores de TODAS as fontes prontas, na versão ativa. */
export async function tabelaDeValores(supabase: SupabaseClient, organizationId: string): Promise<ValorDaTabela[]> {
  const hit = cache.get(organizationId);
  if (hit && hit.expira > Date.now()) return hit.tabela;
  const { data: fontes } = await supabase
    .from("ai_knowledge_sources")
    .select("id, active_kb_version_id")
    .eq("organization_id", organizationId)
    .eq("status", "ready");
  const versoes = ((fontes ?? []) as Array<{ active_kb_version_id: string | null }>)
    .map((f) => f.active_kb_version_id)
    .filter((v): v is string => !!v);
  let tabela: ValorDaTabela[] = [];
  if (versoes.length > 0) {
    const { data: trechos } = await supabase
      .from("ai_chunks")
      .select("content, position, knowledge_source_id")
      .eq("organization_id", organizationId)
      .in("kb_version_id", versoes)
      .order("knowledge_source_id")
      .order("position")
      .limit(5000);
    const texto = ((trechos ?? []) as Array<{ content: string }>).map((t) => t.content).join("\n");
    tabela = extrairValores(texto);
  }
  cache.set(organizationId, { expira: Date.now() + TTL_MS, tabela });
  return tabela;
}
