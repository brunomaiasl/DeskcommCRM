/**
 * Datas do Feegow. A API mistura formatos (`DD-MM-YYYY` nos filtros e no corpo,
 * `YYYY-MM-DD` nas chaves da disponibilidade) e a clínica vive em horário de
 * Brasília — o servidor pode estar em UTC, e "hoje" às 23h em São Paulo já é
 * "amanhã" em UTC. Por isso tudo aqui passa por `America/Sao_Paulo`.
 *
 * Dentro do sistema as datas são sempre ISO (`YYYY-MM-DD`) e horas `HH:MM`.
 */

const FUSO = "America/Sao_Paulo";

export const REGEX_DATA_ISO = /^\d{4}-\d{2}-\d{2}$/;
export const REGEX_HORA = /^\d{2}:\d{2}(:\d{2})?$/;

/** { data: "2026-11-12", hora: "17:05" } no relógio de São Paulo. */
export function agoraEmSaoPaulo(now: Date = new Date()): { data: string; hora: string } {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: FUSO,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const p = (tipo: string) => partes.find((x) => x.type === tipo)?.value ?? "00";
  return { data: `${p("year")}-${p("month")}-${p("day")}`, hora: `${p("hour")}:${p("minute")}` };
}

export function isoParaBR(iso: string): string {
  const [a, m, d] = iso.split("-");
  return `${d}-${m}-${a}`;
}

/** Aceita `DD-MM-YYYY` ou `YYYY-MM-DD`; devolve ISO ou `null`. */
export function paraIso(valor: string): string | null {
  if (REGEX_DATA_ISO.test(valor)) return valor;
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(valor);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : null;
}

export function somarDias(iso: string, dias: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + dias);
  return d.toISOString().slice(0, 10);
}

/** `09:00` → `09:00:00` (formato que o Feegow exige no corpo). */
export function horaCompleta(hora: string): string {
  return hora.length === 5 ? `${hora}:00` : hora;
}

/** `09:00:00` → `09:00`. */
export function horaCurta(hora: string): string {
  return hora.slice(0, 5);
}

const DIAS = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];

export function diaDaSemana(iso: string): string {
  return DIAS[new Date(`${iso}T12:00:00Z`).getUTCDay()] ?? "";
}

/** `2026-11-13` → `13/11/2026`. */
export function dataLegivel(iso: string): string {
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}
