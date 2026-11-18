/**
 * A REGRA PRINCIPAL DA AGENDA (pedido de 18/11, depois de um incidente real):
 * nada é marcado, remarcado ou cancelado no Feegow sem
 *   1. o CPF que O PRÓPRIO PACIENTE digitou na conversa, e
 *   2. o paciente ter VISTO o resumo e respondido DEPOIS dele.
 *
 * O incidente: em 18/11, às 13:39, o agente mostrou três horários e, na MESMA
 * resposta, marcou o primeiro para um CPF que ninguém digitou — e o CPF era de
 * outra pessoa cadastrada na clínica (paciente 22009). Instrução no prompt não
 * segurou; esta trava é do código.
 *
 * Como funciona a confirmação: a 1ª chamada da ferramenta NÃO escreve nada —
 * confere tudo e devolve o resumo com um `codigo_confirmacao` assinado (HMAC com
 * `INTERNAL_SECRET`) que amarra exatamente aqueles dados e a hora em que o resumo
 * foi gerado. A 2ª chamada só executa com o código válido, os MESMOS dados e uma
 * mensagem do paciente chegada DEPOIS do resumo. Mudou o horário? Código novo.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

import type { SupabaseClient } from "@supabase/supabase-js";

/** O resumo vale por 2 horas: depois disso a agenda pode ter mudado. */
export const VALIDADE_DA_CONFIRMACAO_MS = 2 * 60 * 60 * 1000;

export type AcaoDaAgenda = "marcar" | "remarcar" | "cancelar";

export interface DadosDaConfirmacao {
  acao: AcaoDaAgenda;
  organizacao: string;
  /** O contato do turno, quando há; vazio nos ingressos de fora da conversa. */
  contato: string;
  /** Os dados que a ação vai escrever, já normalizados (ordem fixa de chaves). */
  dados: Record<string, string | number | null>;
}

function assinatura(corpo: string): Buffer | null {
  const segredo = process.env.INTERNAL_SECRET;
  if (!segredo?.trim()) return null;
  return createHmac("sha256", segredo).update(`feegow-confirmacao:v1:${corpo}`).digest();
}

function chaveDosDados(dados: Record<string, string | number | null>): string {
  return JSON.stringify(Object.keys(dados).sort().map((k) => [k, dados[k] ?? null]));
}

/** Gera o código que a 2ª chamada precisa trazer. */
export function emitirConfirmacao(d: DadosDaConfirmacao, agora: Date = new Date()): string {
  const corpo = Buffer.from(
    JSON.stringify({ a: d.acao, o: d.organizacao, c: d.contato, k: chaveDosDados(d.dados), t: agora.getTime() }),
  ).toString("base64url");
  const sig = assinatura(corpo);
  if (!sig) throw new Error("confirmacao_sem_segredo");
  return `${corpo}.${sig.toString("base64url")}`;
}

/**
 * Confere o código contra os dados de AGORA. Devolve a hora em que o resumo foi
 * emitido (para exigir resposta do paciente depois dela) ou o motivo da recusa.
 */
export function conferirConfirmacao(
  codigo: string,
  d: DadosDaConfirmacao,
  agora: Date = new Date(),
): { ok: true; emitidoEm: Date } | { ok: false; motivo: "codigo_invalido" | "dados_mudaram" | "codigo_vencido" } {
  if (codigo.length > 4096) return { ok: false, motivo: "codigo_invalido" };
  const [corpo, enc] = codigo.split(".");
  if (!corpo || !enc) return { ok: false, motivo: "codigo_invalido" };
  const esperado = assinatura(corpo);
  if (!esperado) return { ok: false, motivo: "codigo_invalido" };
  let recebido: Buffer;
  try {
    recebido = Buffer.from(enc, "base64url");
  } catch {
    return { ok: false, motivo: "codigo_invalido" };
  }
  if (recebido.length !== esperado.length || !timingSafeEqual(recebido, esperado)) {
    return { ok: false, motivo: "codigo_invalido" };
  }
  let p: { a?: unknown; o?: unknown; c?: unknown; k?: unknown; t?: unknown };
  try {
    p = JSON.parse(Buffer.from(corpo, "base64url").toString("utf8"));
  } catch {
    return { ok: false, motivo: "codigo_invalido" };
  }
  if (p.a !== d.acao || p.o !== d.organizacao || p.c !== d.contato || p.k !== chaveDosDados(d.dados)) {
    return { ok: false, motivo: "dados_mudaram" };
  }
  const t = typeof p.t === "number" ? p.t : NaN;
  if (!Number.isFinite(t) || agora.getTime() - t > VALIDADE_DA_CONFIRMACAO_MS || t > agora.getTime() + 60_000) {
    return { ok: false, motivo: "codigo_vencido" };
  }
  return { ok: true, emitidoEm: new Date(t) };
}

/** Só os dígitos, para casar "347.075.238-97" com "34707523897". */
export function digitos(texto: string): string {
  return texto.replace(/\D+/g, "");
}

/** O CPF aparece numa mensagem que o PACIENTE escreveu? (puro, para teste) */
export function cpfFoiDigitadoPeloPaciente(cpf: string, mensagensDoPaciente: readonly string[]): boolean {
  const alvo = digitos(cpf);
  if (alvo.length !== 11) return false;
  return mensagensDoPaciente.some((m) => digitos(m).includes(alvo));
}

function semAcento(texto: string): string {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

/**
 * O nome foi escrito pelo PACIENTE? Toda palavra de 3+ letras do nome precisa
 * aparecer nas mensagens dele (sem acento, sem caixa). Nome inventado não passa.
 */
export function nomeFoiDigitadoPeloPaciente(nome: string, mensagensDoPaciente: readonly string[]): boolean {
  const texto = semAcento(mensagensDoPaciente.join(" "));
  const palavras = semAcento(nome).split(/[^a-z]+/).filter((p) => p.length >= 3);
  if (palavras.length === 0) return false;
  return palavras.every((p) => new RegExp(`\\b${p}\\b`).test(texto));
}

/** O ano de nascimento (AAAA-MM-DD) aparece no que o paciente escreveu? */
export function anoFoiDigitadoPeloPaciente(dataIso: string, mensagensDoPaciente: readonly string[]): boolean {
  const ano = dataIso.slice(0, 4);
  return /^\d{4}$/.test(ano) && mensagensDoPaciente.some((m) => m.includes(ano));
}

/**
 * As mensagens que o contato do turno ENVIOU nos últimos 30 dias (só entrada) e
 * se alguma chegou depois de `depoisDe`. Service role com `organization_id` do
 * contexto: quem chama é o handler, nunca o modelo.
 */
export async function mensagensDoPaciente(
  supabase: SupabaseClient,
  organizacao: string,
  contato: string,
): Promise<Array<{ body: string; quando: string }>> {
  const desde = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { data } = await supabase
    .from("messages")
    .select("body, sent_at, created_at")
    .eq("organization_id", organizacao)
    .eq("contact_id", contato)
    .eq("direction", "inbound")
    .gte("created_at", desde)
    .order("created_at", { ascending: false })
    .limit(300);
  return ((data ?? []) as Array<{ body: string | null; sent_at: string | null; created_at: string }>).map((m) => ({
    body: m.body ?? "",
    quando: m.sent_at ?? m.created_at,
  }));
}
