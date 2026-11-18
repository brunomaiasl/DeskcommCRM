/**
 * Serviço de agenda do Feegow — o que as tools do agente usam.
 *
 * As tools (`lib/mcp/tools/feegow.ts`) só validam entrada e formatam saída; a
 * conversa com a API e a regra de "qual é o primeiro horário" vivem aqui, onde
 * dá para testar sem montar contexto de agente.
 */
import { feegowGet, feegowPost, FeegowError } from "./client";
import { carregarFeegowConfig } from "./config";
import {
  agoraEmSaoPaulo,
  dataLegivel,
  diaDaSemana,
  horaCompleta,
  horaCurta,
  isoParaBR,
  paraIso,
  somarDias,
} from "./datas";

// ─── tipos ──────────────────────────────────────────────────────────────────

export interface Especialidade {
  especialidade_id: number;
  nome: string;
  /** Procedimento "consulta" padrão da especialidade. */
  consulta_id: number | null;
}

export interface Profissional {
  profissional_id: number;
  nome: string;
  especialidades: Array<{ especialidade_id: number; nome: string }>;
}

export interface Horario {
  profissional_id: number;
  local_id: number;
  /** ISO `YYYY-MM-DD`. */
  data: string;
  /** `HH:MM`. */
  hora: string;
}

// ─── cache curto (listas que mudam pouco) ───────────────────────────────────

const TTL_MS = 10 * 60_000;
const cache = new Map<string, { expira: number; valor: unknown }>();

async function comCache<T>(chave: string, carregar: () => Promise<T>): Promise<T> {
  const agora = Date.now();
  const hit = cache.get(chave);
  if (hit && hit.expira > agora) return hit.valor as T;
  const valor = await carregar();
  cache.set(chave, { expira: agora + TTL_MS, valor });
  return valor;
}

/** Para testes e para "acabei de mudar o cadastro no Feegow". */
export function limparCacheDoFeegow(): void {
  cache.clear();
}

// ─── texto ──────────────────────────────────────────────────────────────────

/** Minúsculas, sem acento: "Dermatológica" casa com "dermato". */
export function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function num(v: unknown): number | null {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}

// ─── unidades ───────────────────────────────────────────────────────────────

export interface UnidadeDoLocal {
  unidade_id: number;
  /** O nome fantasia da unidade no Feegow (ex.: "Padre Anchieta - Campinas"). */
  nome: string;
}

export interface Unidade {
  unidade_id: number;
  nome: string;
  /** Endereço montado do cadastro do Feegow; `null` quando a unidade não tem. */
  endereco: string | null;
  telefone: string | null;
}

function texto(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/** "Rua X, 123 - Bairro, Cidade/UF - CEP 00000-000 (complemento)". */
function montarEndereco(u: Record<string, unknown>): string | null {
  const rua = [texto(u.endereco), texto(u.numero)].filter(Boolean).join(", ");
  const local = [texto(u.bairro), [texto(u.cidade), texto(u.estado)].filter(Boolean).join("/")]
    .filter(Boolean)
    .join(", ");
  const partes = [rua, local].filter(Boolean);
  if (partes.length === 0) return null;
  const cep = texto(u.cep);
  const complemento = texto(u.complemento);
  return (
    partes.join(" - ") + (cep ? ` - CEP ${cep}` : "") + (complemento ? ` (${complemento})` : "")
  );
}

/**
 * As UNIDADES da clínica (matriz + filiais), com endereço — para o agente
 * perguntar a preferência do paciente mostrando onde fica cada uma. Vem de
 * `company/list-unity`; muda pouco: cache de 10 minutos.
 */
export async function listarUnidades(): Promise<Unidade[]> {
  const cfg = await carregarFeegowConfig();
  const permitidas = cfg?.unidades ?? [];
  const todas = await todasAsUnidades();
  // Só as unidades em que a clínica atende (configuração); vazia = todas.
  return permitidas.length === 0 ? todas : todas.filter((u) => permitidas.includes(u.unidade_id));
}

async function todasAsUnidades(): Promise<Unidade[]> {
  return comCache("unidades", async () => {
    const bruto = await feegowGet<unknown>("company/list-unity");
    const blocos =
      bruto && typeof bruto === "object" && !Array.isArray(bruto)
        ? [(bruto as { matriz?: unknown }).matriz, (bruto as { unidades?: unknown }).unidades]
        : [bruto];
    const lista: Unidade[] = [];
    for (const bloco of blocos) {
      if (!Array.isArray(bloco)) continue;
      for (const u of bloco as Array<Record<string, unknown>>) {
        const id = num(u.unidade_id);
        const nome = texto(u.nome_fantasia);
        if (id === null || !nome || lista.some((x) => x.unidade_id === id)) continue;
        lista.push({
          unidade_id: id,
          nome,
          endereco: montarEndereco(u),
          telefone: texto(u.telefone_1) || texto(u.telefone_2) || null,
        });
      }
    }
    return lista;
  });
}

/**
 * De qual UNIDADE é cada local — para o agente dizer "às 9h, na unidade X".
 *
 * O horário da agenda vem com `local_id` (a sala), e a sala pertence a uma
 * unidade (`company/list-local`); o nome da unidade vem de `listarUnidades`.
 * As duas listas mudam pouco: cache de 10 minutos.
 */
export async function unidadesPorLocal(): Promise<Map<number, UnidadeDoLocal>> {
  return comCache("unidades-por-local", async () => {
    const [locaisBrutos, unidades] = await Promise.all([
      feegowGet<unknown>("company/list-local"),
      // TODAS, não só as permitidas: o nome é só rótulo, e a busca já limita.
      todasAsUnidades(),
    ]);

    const nomeDaUnidade = new Map<number, string>(unidades.map((u) => [u.unidade_id, u.nome]));

    const porLocal = new Map<number, UnidadeDoLocal>();
    if (Array.isArray(locaisBrutos)) {
      for (const l of locaisBrutos) {
        const localId = num((l as { id?: unknown }).id);
        const unidadeId = num((l as { unidade_id?: unknown }).unidade_id);
        if (localId === null || unidadeId === null) continue;
        porLocal.set(localId, {
          unidade_id: unidadeId,
          nome: nomeDaUnidade.get(unidadeId) ?? `Unidade ${unidadeId}`,
        });
      }
    }
    return porLocal;
  });
}

/**
 * `unidadesPorLocal` que NUNCA derruba a busca de horário: sem a lista (rota
 * fora do ar, token sem permissão para ela), o horário sai sem o nome da
 * unidade — melhor do que o paciente ficar sem horário nenhum.
 */
export async function unidadesPorLocalOuVazio(): Promise<Map<number, UnidadeDoLocal>> {
  try {
    return await unidadesPorLocal();
  } catch {
    return new Map();
  }
}

// ─── especialidades e profissionais ─────────────────────────────────────────

export async function listarEspecialidades(termo?: string): Promise<Especialidade[]> {
  const cfg = await carregarFeegowConfig();
  const todas = await comCache("especialidades", async () => {
    const bruto = await feegowGet<unknown>("specialties/list", {
      unidade_id: cfg?.unidadeId ?? undefined,
    });
    const lista = Array.isArray(bruto) ? bruto : [];
    return lista
      .map((e): Especialidade | null => {
        const r = e as Record<string, unknown>;
        const id = num(r.especialidade_id);
        if (id === null) return null;
        return {
          especialidade_id: id,
          nome: String(r.nome ?? `Especialidade ${id}`),
          consulta_id: num(r.consulta_id),
        };
      })
      .filter((e): e is Especialidade => e !== null);
  });
  return filtrarEspecialidades(todas, termo);
}

/** Palavras do paciente que não dizem a especialidade ("consulta com o médico de..."). */
const PALAVRAS_VAZIAS = new Set([
  "a", "o", "as", "os", "de", "da", "do", "das", "dos", "com", "e", "para", "pra", "um", "uma",
  "consulta", "consultas", "medico", "medica", "medicos", "dr", "dra", "doutor", "doutora", "especialista",
]);

/** Como o paciente fala → como a especialidade se chama no Feegow. */
const SINONIMOS: Array<[RegExp, string]> = [
  [/\b(clinic[oa]s?|medic[oa] geral)\b/, "clinica geral"],
  [/\b(oculista|olhos?|vista)\b/, "oftalmologia"],
  [/\b(dentista|dente|dentes)\b/, "odontologia"],
  [/\b(coracao)\b/, "cardiologia"],
  [/\b(pele)\b/, "dermatologia"],
  [/\b(crianca|criancas|infantil)\b/, "pediatria"],
];

const ehOdonto = (texto: string) => /odonto|dent/.test(texto);

/**
 * Acha a especialidade pelo jeito que o PACIENTE fala, não pelo nome exato do
 * Feegow: "clínico geral" é "Clínica Geral", "cardiologista" é "Cardiologia".
 * Cada palavra do pedido casa pelo radical (6 letras) com alguma palavra do nome;
 * só as que casam tão bem quanto a melhor voltam. Odontologia só entra se o
 * pedido falar em dente/dentista — senão "clínico geral" virava
 * "ODONTOLOGIA ( CLINICO GERAL)" (bug visto em 17/11 no Testar).
 */
export function filtrarEspecialidades(todas: Especialidade[], termo?: string): Especialidade[] {
  if (!termo || !termo.trim()) return todas;
  let pedido = normalizar(termo).replace(/[^a-z0-9 ]+/g, " ");
  for (const [padrao, nome] of SINONIMOS) if (padrao.test(pedido)) pedido = `${pedido} ${nome}`;
  const radicais = [
    ...new Set(
      pedido
        .split(/\s+/)
        .filter((p) => p && !PALAVRAS_VAZIAS.has(p))
        .map((p) => p.slice(0, 6)),
    ),
  ];
  if (radicais.length === 0) return todas;
  const querOdonto = ehOdonto(pedido);
  const literal = normalizar(termo);

  const pontuadas = todas
    .map((e) => {
      const nome = normalizar(e.nome);
      if (ehOdonto(nome) && !querOdonto) return null;
      const palavras = nome.split(/[^a-z0-9]+/).filter(Boolean);
      const casadas = palavras.filter((w) => radicais.some((r) => w.startsWith(r))).length;
      if (casadas === 0) return null;
      return { e, nota: casadas / palavras.length + (nome.includes(literal) ? 1 : 0) };
    })
    .filter((x): x is { e: Especialidade; nota: number } => x !== null)
    .sort((a, b) => b.nota - a.nota);
  const primeira = pontuadas[0];
  if (!primeira) return [];
  // Só as que casam tão bem quanto a melhor: "clínico geral" não traz "Cirurgia Geral".
  const melhor = primeira.nota;
  return pontuadas.filter((x) => x.nota >= melhor - 0.01).map((x) => x.e);
}

export async function obterEspecialidade(id: number): Promise<Especialidade | null> {
  const todas = await listarEspecialidades();
  return todas.find((e) => e.especialidade_id === id) ?? null;
}

export async function listarProfissionais(opcoes: {
  especialidade_id?: number;
  termo?: string;
} = {}): Promise<Profissional[]> {
  const cfg = await carregarFeegowConfig();
  const chave = `profissionais:${opcoes.especialidade_id ?? "todas"}`;
  const todos = await comCache(chave, async () => {
    const bruto = await feegowGet<unknown>("professional/list", {
      ativo: 1,
      unidade_id: cfg?.unidadeId ?? undefined,
      especialidade_id: opcoes.especialidade_id,
    });
    const lista = Array.isArray(bruto) ? bruto : [];
    return lista
      .map((p): Profissional | null => {
        const r = p as Record<string, unknown>;
        const id = num(r.profissional_id);
        if (id === null) return null;
        const esp = Array.isArray(r.especialidades) ? r.especialidades : [];
        return {
          profissional_id: id,
          nome: typeof r.nome === "string" && r.nome.trim() ? r.nome.trim() : `Profissional ${id}`,
          especialidades: esp
            .map((e) => {
              const x = e as Record<string, unknown>;
              const eid = num(x.especialidade_id);
              return eid === null
                ? null
                : { especialidade_id: eid, nome: String(x.nome_especialidade ?? "") };
            })
            .filter((e): e is { especialidade_id: number; nome: string } => e !== null),
        };
      })
      .filter((p): p is Profissional => p !== null);
  });
  if (!opcoes.termo || !opcoes.termo.trim()) return todos;
  const alvo = normalizar(opcoes.termo);
  return todos.filter((p) => normalizar(p.nome).includes(alvo));
}

// ─── disponibilidade ────────────────────────────────────────────────────────

/**
 * A resposta de `available-schedule` tem DUAS formas para `local_id`, as duas
 * documentadas: lista de objetos `[{ "2018-08-10": [...] }]` (sem id de local) e
 * objeto `{ "15": { "2018-08-11": [...] } }`. Lista vazia vem como `[]`, não `{}`.
 * Normaliza tudo para `Horario[]`.
 */
export function normalizarDisponibilidade(content: unknown): Horario[] {
  const saida: Horario[] = [];
  if (!content || typeof content !== "object") return saida;
  const porProfissional = (content as { profissional_id?: unknown }).profissional_id;
  if (!porProfissional || typeof porProfissional !== "object") return saida;

  const empurrar = (profissionalId: number, localId: number, dias: unknown) => {
    if (!dias || typeof dias !== "object") return;
    for (const [chaveData, horas] of Object.entries(dias as Record<string, unknown>)) {
      const iso = paraIso(chaveData);
      if (!iso || !Array.isArray(horas)) continue;
      for (const h of horas) {
        if (typeof h === "string" && /^\d{2}:\d{2}/.test(h)) {
          saida.push({ profissional_id: profissionalId, local_id: localId, data: iso, hora: horaCurta(h) });
        }
      }
    }
  };

  for (const [idTexto, info] of Object.entries(porProfissional as Record<string, unknown>)) {
    const profissionalId = num(idTexto);
    if (profissionalId === null || !info || typeof info !== "object") continue;
    const locais = (info as { local_id?: unknown }).local_id;
    if (Array.isArray(locais)) {
      for (const bloco of locais) empurrar(profissionalId, 0, bloco);
    } else if (locais && typeof locais === "object") {
      for (const [idLocal, dias] of Object.entries(locais as Record<string, unknown>)) {
        empurrar(profissionalId, num(idLocal) ?? 0, dias);
      }
    }
  }
  return saida;
}

export function ordenarHorarios(horarios: Horario[]): Horario[] {
  return [...horarios].sort(
    (a, b) =>
      a.data.localeCompare(b.data) ||
      a.hora.localeCompare(b.hora) ||
      a.profissional_id - b.profissional_id,
  );
}

export interface FiltroDeHorarios {
  especialidade_id?: number;
  procedimento_id?: number;
  profissional_id?: number;
  convenio_id?: number;
  /**
   * Só a unidade que o PACIENTE preferiu. Ausente = a da configuração (vazia =
   * todas as unidades).
   */
  unidade_id?: number;
  /** ISO. */
  de: string;
  /** ISO. */
  ate: string;
}

/** Uma consulta à agenda, já sem horários que ficaram no passado (relógio de SP). */
export async function buscarHorarios(f: FiltroDeHorarios): Promise<Horario[]> {
  const cfg = await carregarFeegowConfig();
  const porProcedimento = f.procedimento_id !== undefined && f.especialidade_id === undefined;
  if (!porProcedimento && f.especialidade_id === undefined) {
    throw new FeegowError("validacao", "informe a especialidade ou o procedimento");
  }
  // QUAIS unidades consultar. As da configuração são o limite: o Feegow da
  // clínica tem unidades de outras empresas, e o agente nunca oferece horário
  // fora das que ela atende. A preferência do paciente estreita dentro disso;
  // uma unidade fora da lista não devolve nada (não abre exceção).
  const permitidas = cfg?.unidades ?? [];
  let alvo: Array<number | undefined>;
  if (f.unidade_id !== undefined) {
    alvo = permitidas.length === 0 || permitidas.includes(f.unidade_id) ? [f.unidade_id] : [];
  } else {
    alvo = permitidas.length > 0 ? permitidas : [undefined];
  }

  const consultar = (unidade_id: number | undefined) =>
    feegowGet<unknown>("appoints/available-schedule", {
      tipo: porProcedimento ? "P" : "E",
      especialidade_id: porProcedimento ? undefined : f.especialidade_id,
      procedimento_id: porProcedimento ? f.procedimento_id : undefined,
      profissional_id: f.profissional_id,
      convenio_id: f.convenio_id,
      unidade_id,
      data_start: isoParaBR(f.de),
      data_end: isoParaBR(f.ate),
    });
  const respostas = await Promise.all(alvo.map(consultar));
  const agora = agoraEmSaoPaulo();
  return ordenarHorarios(
    respostas
      .flatMap((conteudo) => normalizarDisponibilidade(conteudo))
      .filter((h) => h.data > agora.data || (h.data === agora.data && h.hora > agora.hora)),
  );
}

export const JANELA_DE_BUSCA_DIAS = 15;
export const LIMITE_DE_BUSCA_DIAS = 90;

/**
 * O primeiro horário livre a partir de `de`, andando em janelas de 15 dias até
 * achar ou chegar a 90 dias. Janela curta de propósito: a API devolve a agenda
 * INTEIRA do período, e pedir 90 dias de uma vez para achar "amanhã" é gastar
 * tempo e tráfego à toa.
 */
export async function primeirosHorarios(
  f: Omit<FiltroDeHorarios, "de" | "ate"> & { de?: string },
  buscar: (filtro: FiltroDeHorarios) => Promise<Horario[]> = buscarHorarios,
): Promise<{ horarios: Horario[]; buscou_ate: string }> {
  const inicio = f.de ?? agoraEmSaoPaulo().data;
  const teto = somarDias(inicio, LIMITE_DE_BUSCA_DIAS);
  let janelaInicio = inicio;
  let buscouAte = inicio;
  while (janelaInicio <= teto) {
    const janelaFim = somarDias(janelaInicio, JANELA_DE_BUSCA_DIAS - 1);
    const fim = janelaFim < teto ? janelaFim : teto;
    const horarios = await buscar({ ...f, de: janelaInicio, ate: fim });
    buscouAte = fim;
    if (horarios.length > 0) return { horarios: ordenarHorarios(horarios), buscou_ate: buscouAte };
    janelaInicio = somarDias(fim, 1);
  }
  return { horarios: [], buscou_ate: buscouAte };
}

/**
 * Forma que o modelo lê: data por extenso, nome do profissional e da UNIDADE,
 * sem ids soltos. `unidade` é `null` só quando a lista de locais não veio.
 */
export function descreverHorario(
  h: Horario,
  nomes: Map<number, string>,
  unidades: Map<number, UnidadeDoLocal> = new Map(),
) {
  const unidade = unidades.get(h.local_id) ?? null;
  return {
    profissional_id: h.profissional_id,
    profissional: nomes.get(h.profissional_id) ?? `Profissional ${h.profissional_id}`,
    unidade: unidade?.nome ?? null,
    unidade_id: unidade?.unidade_id ?? null,
    local_id: h.local_id,
    data: h.data,
    hora: h.hora,
    dia_da_semana: diaDaSemana(h.data),
    data_legivel: dataLegivel(h.data),
  };
}

/** O mais cedo de cada profissional, ordenado do mais próximo ao mais distante. */
export function primeiroDeCadaProfissional(horarios: Horario[]): Horario[] {
  const vistos = new Map<number, Horario>();
  for (const h of ordenarHorarios(horarios)) {
    if (!vistos.has(h.profissional_id)) vistos.set(h.profissional_id, h);
  }
  return ordenarHorarios([...vistos.values()]);
}

// ─── procedimento e valor ───────────────────────────────────────────────────

/** Valor em centavos do procedimento para este paciente/profissional; `null` se não achar. */
export async function valorDoProcedimento(opcoes: {
  procedimento_id: number;
  especialidade_id?: number;
  profissional_id?: number;
  paciente_id?: number;
}): Promise<number | null> {
  const cfg = await carregarFeegowConfig();
  const bruto = await feegowGet<unknown>("procedures/list", {
    procedimento_id: opcoes.procedimento_id,
    especialidade_id: opcoes.especialidade_id,
    profissional_id: opcoes.profissional_id,
    paciente_id: opcoes.paciente_id,
    unidade_id: cfg?.unidadeId ?? undefined,
  });
  const lista = Array.isArray(bruto) ? bruto : [];
  const achado = lista.find((p) => num((p as Record<string, unknown>).procedimento_id) === opcoes.procedimento_id);
  return achado ? num((achado as Record<string, unknown>).valor) : null;
}

/**
 * O nome de um procedimento no Feegow (`null` se não achar). Serve à trava de
 * `procedimentoSuspeito` — a marcação confere O QUE vai marcar antes de marcar.
 */
export async function nomeDoProcedimento(procedimento_id: number): Promise<string | null> {
  const bruto = await feegowGet<unknown>("procedures/list", { procedimento_id });
  const lista = Array.isArray(bruto) ? bruto : [];
  const achado = lista.find((p) => num((p as Record<string, unknown>).procedimento_id) === procedimento_id);
  const nome = achado ? (achado as Record<string, unknown>).nome : null;
  return typeof nome === "string" ? nome : null;
}

/**
 * Procedimento que NÃO é consulta de verdade e não pode ir para a agenda do
 * paciente. Medido no Feegow da clínica (16/11/2026): a "consulta padrão" de
 * várias especialidades apontava para "TESTE IMPLANTAÇÃO" — marcar assim põe um
 * teste na agenda do médico, com o preço errado. Recusar e passar para uma
 * pessoa é o caminho certo até o cadastro ser corrigido.
 */
export function procedimentoSuspeito(nome: string | null): boolean {
  if (!nome) return false;
  const n = normalizar(nome);
  return /\bteste\b/.test(n) || n.includes("implantacao");
}

// ─── motivos (cancelar / remarcar) ──────────────────────────────────────────

/**
 * O motivo é obrigatório no Feegow, mas o paciente no WhatsApp não escolhe de
 * uma lista. Usa o motivo "solicitado pelo paciente" — que é o que de fato
 * aconteceu — e cai no primeiro da lista se a clínica renomeou.
 */
export async function motivoPadrao(): Promise<number> {
  const motivos = await comCache("motivos", async () => {
    const bruto = await feegowGet<unknown>("appoints/motives");
    return (Array.isArray(bruto) ? bruto : [])
      .map((m) => {
        const r = m as Record<string, unknown>;
        const id = num(r.id);
        return id === null ? null : { id, motivo: String(r.motivo ?? "") };
      })
      .filter((m): m is { id: number; motivo: string } => m !== null);
  });
  const doPaciente = motivos.find((m) => normalizar(m.motivo).includes("paciente"));
  return doPaciente?.id ?? motivos[0]?.id ?? 1;
}

// ─── pacientes ──────────────────────────────────────────────────────────────

export interface PacienteResumo {
  paciente_id: number;
  primeiro_nome: string;
  convenios: Array<{ convenio_id: number; plano_id: number | null }>;
}

export function soDigitos(valor: string): string {
  return valor.replace(/\D/g, "");
}

/**
 * Os jeitos de escrever o celular que o Feegow casa. Medido em 18/11 no Feegow da
 * clínica: `patient/list?telefone=` casa com DDD + número (11 dígitos) e NÃO casa
 * com o 55 na frente. O de 10 dígitos (sem o 9) cobre cadastro antigo.
 */
export function variantesDoTelefone(telefone: string): string[] {
  let d = soDigitos(telefone);
  if ((d.length === 12 || d.length === 13) && d.startsWith("55")) d = d.slice(2);
  if (d.length < 10) return [];
  const saida: string[] = [];
  if (d.length === 11) {
    saida.push(d);
    if (d[2] === "9") saida.push(d.slice(0, 2) + d.slice(3)); // sem o nono dígito
  } else if (d.length === 10) {
    saida.push(d, d.slice(0, 2) + "9" + d.slice(2)); // com o nono dígito
  } else {
    saida.push(d.slice(-11));
  }
  return [...new Set(saida)];
}

/** O que se sabe de um paciente achado pelo celular: o mínimo para reconhecer e cobrar certo. */
export interface PacientePeloTelefone {
  paciente_id: number;
  primeiro_nome: string;
  /** Tabela de preço do cadastro (`tabela_id`); a do Cartão Saúde tem "Cartão" no nome. */
  tabela_id: number | null;
}

/**
 * Os nomes das tabelas de preço particulares (`patient/list-privates`). Na Med
 * Anchieta a 4 é a "Tabela Cartão Saúde Anchieta" — o nome, não o número, é o que
 * decide (outra clínica tem outro id).
 */
export async function nomesDasTabelas(): Promise<Map<number, string>> {
  return comCache("tabelas", async () => {
    const bruto = await feegowGet<unknown>("patient/list-privates", {});
    const mapa = new Map<number, string>();
    for (const t of Array.isArray(bruto) ? bruto : []) {
      const r = t as Record<string, unknown>;
      const id = num(r.tabela_id);
      if (id !== null) mapa.set(id, String(r.nome_tabela ?? ""));
    }
    return mapa;
  });
}

/** A tabela do cadastro é a do Cartão Saúde? `null` = não dá para saber. */
export function ehTabelaDoCartao(tabela_id: number | null, nomes: Map<number, string> | null): boolean | null {
  if (tabela_id === null) return false;
  if (!nomes) return null;
  const nome = nomes.get(tabela_id);
  if (nome === undefined) return null;
  return /cart[aã]o/i.test(nome);
}

/**
 * Pacientes com este celular (família pode dividir o número). Devolve só id,
 * primeiro nome e a tabela de preço, pela mesma régua do `buscarPacientePorCpf`.
 */
export async function buscarPacientesPorTelefone(telefone: string): Promise<PacientePeloTelefone[]> {
  for (const variante of variantesDoTelefone(telefone)) {
    let conteudo: unknown;
    try {
      conteudo = await feegowGet<unknown>("patient/list", { telefone: variante, limit: 10 });
    } catch (err) {
      if (err instanceof FeegowError && err.kind === "conflito") continue; // "não encontrado"
      throw err;
    }
    const lista = (Array.isArray(conteudo) ? conteudo : [])
      .map((p) => {
        const r = p as Record<string, unknown>;
        const id = num(r.patient_id ?? r.paciente_id ?? r.id);
        if (id === null) return null;
        return {
          paciente_id: id,
          primeiro_nome: String(r.nome ?? "").trim().split(/\s+/)[0] ?? "",
          tabela_id: num(r.tabela_id),
        };
      })
      .filter((p): p is PacientePeloTelefone => p !== null);
    if (lista.length > 0) return lista;
  }
  return [];
}

/**
 * Devolve o MÍNIMO da ficha. `patient/search` traz endereço, documentos e
 * telefones; nada disso é necessário para agendar, e tudo que o modelo lê pode
 * acabar numa mensagem para quem informou só um CPF (que pode nem ser dele).
 */
export async function buscarPacientePorCpf(cpf: string): Promise<PacienteResumo | null> {
  const digitos = soDigitos(cpf);
  try {
    const c = await feegowGet<unknown>("patient/search", { paciente_cpf: digitos, cache: "NONE" });
    const r = (Array.isArray(c) ? c[0] : c) as Record<string, unknown> | undefined;
    const id = r ? num(r.id) : null;
    if (!r || id === null) return null;
    const convs = Array.isArray(r.convenios) ? r.convenios : [];
    return {
      paciente_id: id,
      primeiro_nome: String(r.nome ?? "").trim().split(/\s+/)[0] ?? "",
      convenios: convs
        .map((x) => {
          const y = x as Record<string, unknown>;
          const cid = num(y.convenio_id);
          return cid === null ? null : { convenio_id: cid, plano_id: num(y.plano_id) };
        })
        .filter((x): x is { convenio_id: number; plano_id: number | null } => x !== null),
    };
  } catch (err) {
    // 409 aqui é "paciente não encontrado" — resposta normal, não falha.
    if (err instanceof FeegowError && err.kind === "conflito") return null;
    throw err;
  }
}

export async function criarPaciente(dados: {
  nome_completo: string;
  cpf: string;
  data_nascimento?: string;
  genero?: "M" | "F";
  celular?: string;
  email?: string;
}): Promise<number> {
  const conteudo = await feegowPost<{ paciente_id?: unknown }>("patient/create", {
    nome_completo: dados.nome_completo,
    cpf: soDigitos(dados.cpf),
    data_nascimento: dados.data_nascimento,
    genero: dados.genero,
    celular: dados.celular ? soDigitos(dados.celular) : undefined,
    email: dados.email,
  });
  const id = num(conteudo?.paciente_id);
  if (id === null) throw new FeegowError("indisponivel", "o Feegow não devolveu o código do paciente");
  return id;
}

// ─── agendamentos ───────────────────────────────────────────────────────────

export interface Agendamento {
  agendamento_id: number;
  paciente_id: number | null;
  profissional_id: number | null;
  especialidade_id: number | null;
  procedimento_id: number | null;
  local_id: number | null;
  data: string | null;
  horario: string | null;
  status_id: number | null;
}

function lerAgendamento(bruto: unknown): Agendamento | null {
  const r = bruto as Record<string, unknown>;
  const id = num(r?.agendamento_id);
  if (id === null) return null;
  const data = typeof r.data === "string" ? paraIso(r.data) : null;
  return {
    agendamento_id: id,
    paciente_id: num(r.paciente_id),
    profissional_id: num(r.profissional_id),
    especialidade_id: num(r.especialidade_id),
    procedimento_id: num(r.procedimento_id),
    local_id: num(r.local_id),
    data,
    horario: typeof r.horario === "string" ? horaCurta(r.horario) : null,
    status_id: num(r.status_id),
  };
}

/** Status que significam "não vai mais acontecer / já aconteceu" (ver `/appoints/status`). */
const STATUS_ENCERRADOS = new Set([3, 6, 11, 15, 16]);

export async function listarAgendamentosDoPaciente(
  paciente_id: number,
  de: string = agoraEmSaoPaulo().data,
): Promise<Agendamento[]> {
  const bruto = await feegowGet<unknown>("appoints/search", {
    paciente_id,
    data_start: isoParaBR(de),
    data_end: isoParaBR(somarDias(de, 365)),
  });
  return (Array.isArray(bruto) ? bruto : [])
    .map(lerAgendamento)
    .filter((a): a is Agendamento => a !== null)
    .filter((a) => a.paciente_id === paciente_id)
    .filter((a) => a.status_id === null || !STATUS_ENCERRADOS.has(a.status_id))
    .sort((a, b) => `${a.data}${a.horario}`.localeCompare(`${b.data}${b.horario}`));
}

export async function obterAgendamento(agendamento_id: number): Promise<Agendamento | null> {
  const bruto = await feegowGet<unknown>("appoints/search", { agendamento_id });
  const lista = Array.isArray(bruto) ? bruto : [];
  return lista.map(lerAgendamento).find((a) => a?.agendamento_id === agendamento_id) ?? null;
}

export async function criarAgendamento(dados: {
  paciente_id: number;
  profissional_id: number;
  especialidade_id: number;
  procedimento_id: number;
  local_id: number;
  data: string;
  hora: string;
  valor: number;
  convenio_id?: number;
  convenio_plano_id?: number;
  notas?: string;
  celular?: string;
  email?: string;
  retorno?: boolean;
}): Promise<{ agendamento_id: number; link: string | null }> {
  const cfg = await carregarFeegowConfig();
  const comConvenio = dados.convenio_id !== undefined;
  const conteudo = await feegowPost<{ agendamento_id?: unknown; link?: unknown }>("appoints/new-appoint", {
    local_id: dados.local_id,
    paciente_id: dados.paciente_id,
    profissional_id: dados.profissional_id,
    especialidade_id: dados.especialidade_id,
    procedimento_id: dados.procedimento_id,
    data: isoParaBR(dados.data),
    horario: horaCompleta(dados.hora),
    // Regra da API: com convênio, `valor` TEM que ser 0.
    valor: comConvenio ? 0 : dados.valor,
    plano: comConvenio ? 1 : 0,
    convenio_id: dados.convenio_id,
    convenio_plano_id: dados.convenio_plano_id,
    canal_id: cfg?.canalId ?? undefined,
    notas: dados.notas,
    celular: dados.celular ? soDigitos(dados.celular) : undefined,
    email: dados.email,
    retorno: dados.retorno,
  });
  const id = num(conteudo?.agendamento_id);
  if (id === null) throw new FeegowError("indisponivel", "o Feegow não devolveu o código do agendamento");
  return { agendamento_id: id, link: typeof conteudo?.link === "string" ? conteudo.link : null };
}

export async function cancelarAgendamento(dados: {
  agendamento_id: number;
  motivo_id: number;
  obs?: string;
}): Promise<void> {
  await feegowPost("appoints/cancel-appoint", dados);
}

export async function remarcarAgendamento(dados: {
  agendamento_id: number;
  motivo_id: number;
  data: string;
  hora: string;
  obs?: string;
}): Promise<void> {
  await feegowPost("appoints/reschedule", {
    agendamento_id: dados.agendamento_id,
    motivo_id: dados.motivo_id,
    data: isoParaBR(dados.data),
    horario: horaCompleta(dados.hora),
    obs: dados.obs,
  });
}
