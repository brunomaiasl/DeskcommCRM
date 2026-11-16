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

/**
 * Monta a configuração a partir de um conjunto de valores (puro, sem I/O).
 *
 * ⚠️ O parâmetro se chama `fonte`, e não `env`, de propósito: a cerca
 * `painel-nao-promete-o-que-nao-cumpre` reprova leitura `env.<CHAVE>` de chave
 * editável fora do resolvedor. Aqui não há leitura de ambiente — quem decide de
 * onde vem cada valor é `carregarFeegowConfig`.
 */
export function getFeegowConfig(
  fonte: Record<string, string | undefined> = process.env,
): FeegowConfig | null {
  const token = (fonte["FEEGOW_API_TOKEN"] ?? "").trim();
  if (!token) return null;

  const base = (fonte["FEEGOW_API_BASE_URL"] ?? "").trim() || FEEGOW_DEFAULT_BASE_URL;
  return {
    token,
    baseUrl: base.replace(/\/+$/, ""),
    canalId: inteiroOuNull(fonte["FEEGOW_CANAL_ID"]),
    unidadeId: inteiroOuNull(fonte["FEEGOW_UNIDADE_ID"]),
    tokenExpiresAt: dataOuNull(fonte["FEEGOW_TOKEN_EXPIRES_AT"]),
    timeoutMs: inteiroOuNull(fonte["FEEGOW_TIMEOUT_MS"]) ?? FEEGOW_DEFAULT_TIMEOUT_MS,
  };
}

/**
 * Quanto tempo a configuração lida fica valendo neste processo. Trocar o token
 * pela tela vale em até isto — no app E no worker, sem reiniciar nada. Sem a
 * memória, cada chamada ao Feegow faria quatro leituras ao banco.
 */
export const MEMO_DO_FEEGOW_MS = 30_000;
let memo: { cfg: FeegowConfig | null; ate: number } | null = null;

/** Para testes, e para quem acabou de gravar e quer o valor novo já. */
export function esquecerFeegowConfig(): void {
  memo = null;
}

/**
 * A configuração do Feegow para USAR: o que foi salvo na tela **Admin ›
 * Configuração da instalação** (cifrado em `platform_config`) vence; o `.env`
 * fica como reserva. O token vence a cada ~3 meses — por isso ele mora na tela,
 * e renovar é colar o novo lá.
 *
 * Nunca lança: se o resolvedor não carregar (teste sem banco, ambiente
 * incompleto), cai para o `.env` como antes.
 */
export async function carregarFeegowConfig(agora: number = Date.now()): Promise<FeegowConfig | null> {
  if (memo && memo.ate > agora) return memo.cfg;
  let fonte: Record<string, string | undefined>;
  try {
    const { valorDaInstalacao } = await import("@/lib/instalacao/config");
    const [token, vence, unidade, canal] = await Promise.all([
      valorDaInstalacao("FEEGOW_API_TOKEN"),
      valorDaInstalacao("FEEGOW_TOKEN_EXPIRES_AT"),
      valorDaInstalacao("FEEGOW_UNIDADE_ID"),
      valorDaInstalacao("FEEGOW_CANAL_ID"),
    ]);
    fonte = {
      ...process.env,
      FEEGOW_API_TOKEN: token.valor ?? undefined,
      FEEGOW_TOKEN_EXPIRES_AT: vence.valor ?? undefined,
      FEEGOW_UNIDADE_ID: unidade.valor ?? undefined,
      FEEGOW_CANAL_ID: canal.valor ?? undefined,
    };
  } catch {
    fonte = process.env;
  }
  const cfg = getFeegowConfig(fonte);
  memo = { cfg, ate: agora + MEMO_DO_FEEGOW_MS };
  return cfg;
}

export async function isFeegowConfigured(): Promise<boolean> {
  return (await carregarFeegowConfig()) !== null;
}

/** Dias inteiros até o token vencer; negativo = já venceu; `null` = não informado. */
export function diasParaVencerToken(cfg: FeegowConfig, agora: Date = new Date()): number | null {
  if (!cfg.tokenExpiresAt) return null;
  return Math.floor((cfg.tokenExpiresAt.getTime() - agora.getTime()) / 86_400_000);
}
