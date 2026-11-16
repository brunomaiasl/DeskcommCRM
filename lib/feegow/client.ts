/**
 * Cliente HTTP do Feegow.
 *
 * Contrato da API (docs/integrations/feegow-api.md):
 *  - header `x-access-token`;
 *  - sucesso: `{ success: true, content: ... }`;
 *  - 409: `{ success: false, content: "<texto do erro>" }` — conflito de negócio
 *    (horário ocupado, paciente não encontrado...);
 *  - 422: input inválido; 401: sem token; 403: token inativo; 5xx: erro interno.
 *
 * O que NUNCA acontece aqui: o token vazar. Mensagem de erro, log e retorno não
 * carregam o header nem a URL com credencial.
 */
import { logger } from "@/lib/logger";

import { carregarFeegowConfig, diasParaVencerToken, type FeegowConfig } from "./config";

export type FeegowErrorKind =
  | "nao_configurado"
  | "token_invalido"
  | "conflito"
  | "validacao"
  | "indisponivel"
  | "timeout";

export class FeegowError extends Error {
  readonly kind: FeegowErrorKind;
  readonly status?: number;

  constructor(kind: FeegowErrorKind, message: string, status?: number) {
    super(message);
    this.name = "FeegowError";
    this.kind = kind;
    this.status = status;
  }
}

type QueryValue = string | number | boolean | null | undefined;

interface RequestOptions {
  query?: Record<string, QueryValue>;
  body?: unknown;
  /** Só GET repete (uma vez) em falha transitória. POST nunca: duplicaria agendamento. */
  retry?: boolean;
}

const AVISO_VENCIMENTO_DIAS = 14;
let ultimoAvisoDeVencimento = 0;

function avisarSeTokenPertoDeVencer(cfg: FeegowConfig): void {
  const dias = diasParaVencerToken(cfg);
  if (dias === null || dias > AVISO_VENCIMENTO_DIAS) return;
  const agora = Date.now();
  // No máximo um aviso por hora — um log por requisição afogaria o resto.
  if (agora - ultimoAvisoDeVencimento < 3_600_000) return;
  ultimoAvisoDeVencimento = agora;
  logger.warn(
    dias < 0
      ? "feegow: token vencido — cole o novo em Admin › Configuração da instalação"
      : `feegow: token vence em ${dias} dia(s) — renove em Admin › Configuração da instalação`,
    { dias_para_vencer: dias },
  );
}

function montarUrl(cfg: FeegowConfig, path: string, query?: Record<string, QueryValue>): string {
  const url = new URL(`${cfg.baseUrl}/${path.replace(/^\/+/, "")}`);
  for (const [chave, valor] of Object.entries(query ?? {})) {
    if (valor === undefined || valor === null || valor === "") continue;
    url.searchParams.set(chave, String(valor));
  }
  return url.toString();
}

/** Texto de erro do corpo, sem despejar JSON inteiro no modelo. */
function textoDoErro(corpo: unknown, padrao: string): string {
  if (typeof corpo === "string" && corpo.trim()) return corpo.trim();
  if (corpo && typeof corpo === "object") {
    const c = (corpo as { content?: unknown }).content;
    if (typeof c === "string" && c.trim()) return c.trim();
    // 422: { campo: ["validation.required"] }
    const campos = Object.entries(corpo as Record<string, unknown>)
      .filter(([, v]) => Array.isArray(v))
      .map(([k, v]) => `${k}: ${(v as unknown[]).join(", ")}`);
    if (campos.length > 0) return campos.join("; ");
  }
  return padrao;
}

async function lerCorpo(res: Response): Promise<unknown> {
  const texto = await res.text();
  if (!texto) return null;
  try {
    return JSON.parse(texto) as unknown;
  } catch {
    return texto;
  }
}

async function uma<T>(cfg: FeegowConfig, metodo: "GET" | "POST", path: string, opts: RequestOptions): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), cfg.timeoutMs);
  let res: Response;
  try {
    res = await fetch(montarUrl(cfg, path, opts.query), {
      method: metodo,
      headers: {
        "x-access-token": cfg.token,
        Accept: "application/json",
        ...(opts.body !== undefined ? { "Content-Type": "application/json" } : {}),
      },
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      signal: controller.signal,
      cache: "no-store",
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new FeegowError("timeout", "o Feegow demorou demais para responder");
    }
    throw new FeegowError("indisponivel", "não foi possível falar com o Feegow");
  } finally {
    clearTimeout(timer);
  }

  const corpo = await lerCorpo(res);

  if (res.status === 401 || res.status === 403) {
    throw new FeegowError(
      "token_invalido",
      "o Feegow recusou o token de acesso (ausente, inativo ou vencido)",
      res.status,
    );
  }
  if (res.status === 409) {
    throw new FeegowError("conflito", textoDoErro(corpo, "conflito no Feegow"), 409);
  }
  if (res.status === 422) {
    throw new FeegowError("validacao", textoDoErro(corpo, "dados inválidos para o Feegow"), 422);
  }
  if (!res.ok) {
    throw new FeegowError("indisponivel", `o Feegow respondeu com erro ${res.status}`, res.status);
  }

  // 200 com `success: false` também acontece — é o mesmo conflito de negócio.
  if (corpo && typeof corpo === "object" && (corpo as { success?: unknown }).success === false) {
    throw new FeegowError("conflito", textoDoErro(corpo, "o Feegow recusou a operação"), res.status);
  }

  if (corpo && typeof corpo === "object" && "content" in corpo) {
    return (corpo as { content: T }).content;
  }
  return corpo as T;
}

async function requisitar<T>(metodo: "GET" | "POST", path: string, opts: RequestOptions): Promise<T> {
  const cfg = await carregarFeegowConfig();
  if (!cfg) {
    throw new FeegowError(
      "nao_configurado",
      "a integração com o Feegow não está configurada (falta o token em Admin › Configuração da instalação)",
    );
  }
  avisarSeTokenPertoDeVencer(cfg);

  try {
    return await uma<T>(cfg, metodo, path, opts);
  } catch (err) {
    const transitorio =
      err instanceof FeegowError &&
      (err.kind === "timeout" || (err.kind === "indisponivel" && (err.status === undefined || err.status >= 500)));
    if (metodo === "GET" && opts.retry !== false && transitorio) {
      await new Promise((r) => setTimeout(r, 400));
      return uma<T>(cfg, metodo, path, opts);
    }
    throw err;
  }
}

export function feegowGet<T = unknown>(path: string, query?: Record<string, QueryValue>): Promise<T> {
  return requisitar<T>("GET", path, { query });
}

export function feegowPost<T = unknown>(path: string, body: unknown): Promise<T> {
  return requisitar<T>("POST", path, { body, retry: false });
}

/**
 * O que o MODELO lê quando o Feegow falha. Sem jargão técnico, sem status HTTP,
 * e com a instrução do próximo passo — o modelo que recebe só "erro 500" tende a
 * tentar de novo igual ou a inventar um horário.
 */
export function mensagemDeFalhaParaOModelo(err: FeegowError): string {
  switch (err.kind) {
    case "nao_configurado":
    case "token_invalido":
      return (
        "A agenda da clínica está indisponível por um problema de acesso do sistema. " +
        "Não invente horários. Peça desculpas, diga que um atendente vai confirmar a agenda " +
        "e passe o atendimento para uma pessoa."
      );
    case "timeout":
    case "indisponivel":
      return (
        "A agenda da clínica não respondeu agora. Você pode tentar mais uma vez; se falhar de novo, " +
        "não invente horários: diga que vai pedir a um atendente para confirmar e passe para uma pessoa."
      );
    case "validacao":
      return `A agenda recusou os dados enviados (${err.message}). Confira com o paciente a informação que falta ou está errada.`;
    case "conflito":
      return err.message;
  }
}

export function ehFalhaDeConfiguracao(err: FeegowError): boolean {
  return err.kind === "nao_configurado" || err.kind === "token_invalido";
}
