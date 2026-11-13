/**
 * Feegow — configuração vinda do ambiente.
 *
 * Esta instalação atende UMA clínica, então o token mora em variável de
 * ambiente (diferente da Nuvemshop, que é OAuth por organização). O token do
 * Feegow VENCE a cada ~3 meses: renovar é trocar `FEEGOW_API_TOKEN` e reiniciar
 * o app. `FEEGOW_TOKEN_EXPIRES_AT` é opcional e só serve para avisar no log
 * quando faltarem poucos dias — o Feegow não anuncia o vencimento.
 *
 * `getFeegowConfig()` devolve `null` quando o token falta; quem chama trata como
 * "integração não configurada" (nunca como erro de código).
 *
 * Documentação da API: docs/integrations/feegow-api.md
 */

export const FEEGOW_DEFAULT_BASE_URL = "https://api.feegow.com/v1/api";
export const FEEGOW_DEFAULT_TIMEOUT_MS = 15_000;

export interface FeegowConfig {
  token: string;
  /** Sem barra final. */
  baseUrl: string;
  /** Canal de agendamento a gravar (ver `/appoints/list-channel`). */
  canalId: number | null;
  /** Unidade padrão para buscar horários (0 = unidade principal). `null` = todas. */
  unidadeId: number | null;
  tokenExpiresAt: Date | null;
  timeoutMs: number;
}

function inteiroOuNull(valor: string | undefined): number | null {
  if (valor === undefined || valor.trim() === "") return null;
  const n = Number(valor);
  return Number.isInteger(n) && n >= 0 ? n : null;
}

function dataOuNull(valor: string | undefined): Date | null {
  if (!valor || valor.trim() === "") return null;
  const d = new Date(valor);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function getFeegowConfig(
  env: Record<string, string | undefined> = process.env,
): FeegowConfig | null {
  const token = (env.FEEGOW_API_TOKEN ?? "").trim();
  if (!token) return null;

  const base = (env.FEEGOW_API_BASE_URL ?? "").trim() || FEEGOW_DEFAULT_BASE_URL;
  return {
    token,
    baseUrl: base.replace(/\/+$/, ""),
    canalId: inteiroOuNull(env.FEEGOW_CANAL_ID),
    unidadeId: inteiroOuNull(env.FEEGOW_UNIDADE_ID),
    tokenExpiresAt: dataOuNull(env.FEEGOW_TOKEN_EXPIRES_AT),
    timeoutMs: inteiroOuNull(env.FEEGOW_TIMEOUT_MS) ?? FEEGOW_DEFAULT_TIMEOUT_MS,
  };
}

export function isFeegowConfigured(): boolean {
  return getFeegowConfig() !== null;
}

/** Dias inteiros até o token vencer; negativo = já venceu; `null` = não informado. */
export function diasParaVencerToken(cfg: FeegowConfig, agora: Date = new Date()): number | null {
  if (!cfg.tokenExpiresAt) return null;
  return Math.floor((cfg.tokenExpiresAt.getTime() - agora.getTime()) / 86_400_000);
}
