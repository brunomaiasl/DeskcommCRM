/**
 * Capacidades de AGENDA — consultar e marcar consultas no Feegow da clínica.
 *
 * O caminho que o agente segue numa conversa típica:
 *   1. o paciente pede uma especialidade ("quero um dermatologista");
 *   2. `crm_feegow_list_specialties` traduz o nome em `especialidade_id`;
 *   3. `crm_feegow_next_available` devolve o horário livre MAIS PRÓXIMO (e o
 *      primeiro de cada profissional, para quem tem preferência);
 *   4. o paciente escolhe; o agente CONFIRMA profissional, data e hora;
 *   5. `crm_feegow_find_patient` (por CPF) ou `crm_feegow_create_patient`;
 *   6. `crm_feegow_book_appointment`.
 *
 * Duas regras que não são opcionais:
 *
 *  - Recusa de negócio é RESPOSTA, não exceção. "Horário ocupado" volta como
 *    `{ ok: false, motivo, mensagem }` para o modelo ler e seguir a conversa;
 *    uma exceção faria o turno tentar de novo igual.
 *
 *  - Cancelar e remarcar conferem que o agendamento é DO paciente informado.
 *    Sem isso, quem soubesse um número de agendamento desmarcaria a consulta de
 *    outra pessoa pelo WhatsApp.
 *
 * Integração não multi-organização: o token é da instalação (ver
 * lib/feegow/config.ts). Nada aqui lê ou grava tabela do CRM.
 */
import { z } from "zod";

import { logger } from "@/lib/logger";
import {
  buscarHorarios,
  buscarPacientePorCpf,
  buscarPacientesPorTelefone,
  cancelarAgendamento,
  consultaDaEspecialidade,
  ehTabelaDoCartao,
  nomesDasTabelas,
  criarAgendamento,
  criarPaciente,
  descreverHorario,
  unidadesPorLocalOuVazio,
  LIMITE_DE_BUSCA_DIAS,
  listarAgendamentosDoPaciente,
  listarUnidades,
  nomeDoProcedimento,
  procedimentoSuspeito,
  listarEspecialidades,
  listarProfissionais,
  motivoPadrao,
  obterAgendamento,
  obterEspecialidade,
  primeiroDeCadaProfissional,
  primeirosHorarios,
  remarcarAgendamento,
  soDigitos,
  valorDoProcedimento,
  type Agendamento,
  type Horario,
} from "@/lib/feegow/agenda";
import {
  ehFalhaDeConfiguracao,
  FeegowError,
  mensagemDeFalhaParaOModelo,
} from "@/lib/feegow/client";
import { agoraEmSaoPaulo, dataLegivel, diaDaSemana, REGEX_DATA_ISO, REGEX_HORA, somarDias } from "@/lib/feegow/datas";

import {
  conferirConfirmacao,
  anoFoiDigitadoPeloPaciente,
  cpfFoiDigitadoPeloPaciente,
  emitirConfirmacao,
  nomeFoiDigitadoPeloPaciente,
  mensagensDoPaciente,
  type DadosDaConfirmacao,
} from "@/lib/feegow/confirmacao";
import type { McpContext, McpToolDefinition } from "../types";

// ─── comuns ─────────────────────────────────────────────────────────────────

interface Recusa {
  ok: false;
  motivo: string;
  mensagem: string;
}

function recusa(motivo: string, mensagem: string): Recusa {
  return { ok: false, motivo, mensagem };
}

/**
 * "Não consegui agendar" tem destino: o SETOR que cuida de agenda. A instrução
 * vai junto de toda recusa que o modelo não resolve sozinho, porque é no
 * momento da falha que ele decide o próximo passo — e sem ela o desfecho comum
 * é passar para "qualquer pessoa", fora da fila de quem marca consulta.
 * Sem setores na organização, `crm_list_sectors` volta vazia e o modelo passa
 * direto para a pessoa (a descrição dela diz isso).
 */
export const COMO_PASSAR_PARA_PESSOA =
  " Para passar para uma pessoa: use crm_list_sectors e, se houver um setor de agendamento ou " +
  "recepção, coloque a conversa nele com crm_set_conversation_sector; depois chame um atendente " +
  "com crm_request_human_handoff, dizendo que não foi possível agendar e o que o paciente quer " +
  "(especialidade, profissional, dia/turno preferido).";

/**
 * Toda falha do Feegow vira resposta legível para o modelo. Falha de
 * CONFIGURAÇÃO (token ausente/vencido) também vai para o log como erro: é o
 * único jeito de alguém perceber que a agenda parou — o modelo só pede
 * desculpas ao paciente.
 */
async function comFeegow<T>(tool: string, ctx: McpContext, fn: () => Promise<T>): Promise<T | Recusa> {
  try {
    return await fn();
  } catch (err) {
    if (!(err instanceof FeegowError)) throw err;
    if (ehFalhaDeConfiguracao(err)) {
      logger.error("feegow: integração sem acesso — agenda indisponível para o agente", {
        tool_name: tool,
        kind: err.kind,
        organization_id: ctx.organizationId,
        request_id: ctx.requestId,
      });
    } else if (err.kind !== "conflito" && err.kind !== "validacao") {
      logger.warn("feegow: falha ao consultar a agenda", {
        tool_name: tool,
        kind: err.kind,
        status: err.status,
        request_id: ctx.requestId,
      });
    }
    const mensagem = mensagemDeFalhaParaOModelo(err);
    // Conflito/validação o modelo resolve com o paciente; o resto é "não deu
    // para agendar" e precisa do caminho até a pessoa certa.
    return recusa(
      `feegow_${err.kind}`,
      err.kind === "conflito" || err.kind === "validacao" ? mensagem : `${mensagem}${COMO_PASSAR_PARA_PESSOA}`,
    );
  }
}

async function nomesDosProfissionais(especialidade_id?: number): Promise<Map<number, string>> {
  const lista = await listarProfissionais(
    especialidade_id !== undefined ? { especialidade_id } : {},
  );
  return new Map(lista.map((p) => [p.profissional_id, p.nome]));
}

const dataIso = z.string().regex(REGEX_DATA_ISO, "use o formato AAAA-MM-DD");
const hora = z.string().regex(REGEX_HORA, "use o formato HH:MM (24h)");
const idFeegow = z.number().int().nonnegative();
const cpf = z
  .string()
  .refine((v) => soDigitos(v).length === 11, "CPF deve ter 11 dígitos")
  .describe("CPF do paciente (com ou sem pontuação).");

// ─── a regra principal da agenda (lib/feegow/confirmacao.ts) ────────────────

const cpfDigitado = cpf.describe("O CPF que O PACIENTE digitou nesta conversa. Nunca invente nem use de memória.");
const codigoConfirmacao = z
  .string()
  .max(4096)
  .optional()
  .describe("Omitir na 1ª chamada (só gera o resumo). Na 2ª, o código devolvido, DEPOIS que o paciente confirmar.");

/**
 * 1. O CPF foi digitado pelo PACIENTE nesta conversa (quando há conversa), e
 * 2. o `paciente_id` é o desse CPF no Feegow.
 * Em 18/11 o agente marcou com um CPF que ninguém digitou — e era de outra pessoa.
 */
async function exigirPacienteDoCpf(ctx: McpContext, cpfInformado: string, paciente_id: number): Promise<Recusa | null> {
  if (ctx.contatoDoTurno) {
    const msgs = await mensagensDoPaciente(ctx.supabase, ctx.organizationId, ctx.contatoDoTurno);
    if (!cpfFoiDigitadoPeloPaciente(cpfInformado, msgs.map((m) => m.body))) {
      return recusa(
        "cpf_nao_informado_pelo_paciente",
        "Este CPF não foi digitado pelo paciente nesta conversa. NUNCA use CPF inventado, de memória ou de outra " +
          "pessoa: peça o CPF ao paciente e espere a resposta dele. Nada foi feito.",
      );
    }
  }
  const p = await buscarPacientePorCpf(cpfInformado);
  if (!p || p.paciente_id !== paciente_id) {
    return recusa(
      "paciente_nao_confere",
      "O paciente_id não é o do CPF informado. Busque com crm_feegow_find_patient usando o CPF que o paciente " +
        "digitou e use o paciente_id que voltar. Nada foi feito.",
    );
  }
  return null;
}

/** O CPF foi digitado pelo paciente desta conversa? `null` = sim (ou não há conversa). */
async function exigirCpfDigitado(ctx: McpContext, cpfInformado: string): Promise<Recusa | null> {
  if (!ctx.contatoDoTurno) return null;
  const msgs = await mensagensDoPaciente(ctx.supabase, ctx.organizationId, ctx.contatoDoTurno);
  if (cpfFoiDigitadoPeloPaciente(cpfInformado, msgs.map((m) => m.body))) return null;
  return recusa(
    "cpf_nao_informado_pelo_paciente",
    "Este CPF não foi digitado pelo paciente nesta conversa. NUNCA invente CPF nem use de memória: peça o CPF " +
      "ao paciente e espere a resposta dele. Nada foi consultado.",
  );
}

/**
 * A confirmação em DUAS chamadas. Sem `codigo`: devolve o resumo e o código —
 * nada é escrito. Com `codigo`: só segue se ele confere com os MESMOS dados e se
 * o paciente escreveu DEPOIS do resumo. `null` = pode executar.
 */
async function exigirConfirmacao(
  ctx: McpContext,
  dados: DadosDaConfirmacao,
  codigo: string | undefined,
  resumo: Record<string, unknown>,
): Promise<Recusa | Record<string, unknown> | null> {
  if (!codigo) {
    return {
      ok: true,
      feito: false,
      etapa: "aguardando_confirmacao",
      resumo,
      codigo_confirmacao: emitirConfirmacao(dados),
      mensagem:
        "NADA foi feito ainda. Envie este resumo ao paciente (com o valor já informado) e pergunte se confirma. " +
        "Só depois que ELE responder confirmando, chame de novo com os MESMOS dados e este codigo_confirmacao.",
    };
  }
  const c = conferirConfirmacao(codigo, dados);
  if (!c.ok) {
    return recusa(
      c.motivo,
      c.motivo === "dados_mudaram"
        ? "Os dados mudaram desde o resumo. Chame sem codigo_confirmacao para gerar um resumo novo e confirme de novo com o paciente."
        : "Código de confirmação inválido ou vencido. Gere um resumo novo (chame sem codigo_confirmacao) e confirme com o paciente.",
    );
  }
  if (ctx.contatoDoTurno) {
    const msgs = await mensagensDoPaciente(ctx.supabase, ctx.organizationId, ctx.contatoDoTurno);
    if (!msgs.some((m) => new Date(m.quando).getTime() > c.emitidoEm.getTime())) {
      return recusa(
        "sem_resposta_do_paciente",
        "O paciente ainda não respondeu ao resumo. Envie o resumo, espere ele confirmar e só então chame de novo. Nada foi feito.",
      );
    }
  }
  return null;
}

// ─── especialidades ─────────────────────────────────────────────────────────

const especialidadesShape = {
  termo: z
    .string()
    .trim()
    .optional()
    .describe('Parte do nome, sem precisar de acento (ex.: "dermato", "pediatria"). Vazio lista todas.'),
};

export const crmFeegowListSpecialties: McpToolDefinition<typeof especialidadesShape> = {
  name: "crm_feegow_list_specialties",
  description:
    "Lista as especialidades atendidas pela clínica no Feegow, com o especialidade_id. Use PRIMEIRO quando o " +
    "paciente pedir uma especialidade ou tipo de médico, para obter o id usado nas buscas de horário. " +
    "Se vier mais de uma, pergunte ao paciente qual delas.",
  inputSchema: especialidadesShape,
  category: "read",
  requiresRole: "agent",
  requiresScope: "mcp:read",
  handler: async (input, ctx) =>
    comFeegow("crm_feegow_list_specialties", ctx, async () => {
      const lista = await listarEspecialidades(input.termo);
      return {
        ok: true,
        especialidades: lista.map((e) => ({ especialidade_id: e.especialidade_id, nome: e.nome })),
        ...(lista.length === 0
          ? { aviso: "nenhuma especialidade com esse nome; liste sem termo para ver todas" }
          : {}),
      };
    }),
};

// ─── profissionais ──────────────────────────────────────────────────────────

const profissionaisShape = {
  especialidade_id: idFeegow.optional().describe("Filtra quem atende esta especialidade."),
  termo: z.string().trim().optional().describe("Parte do nome do profissional pedido pelo paciente."),
};

export const crmFeegowListProfessionals: McpToolDefinition<typeof profissionaisShape> = {
  name: "crm_feegow_list_professionals",
  description:
    "Lista os profissionais ativos da clínica no Feegow (id, nome e especialidades). Use quando o paciente " +
    "pedir um profissional pelo nome, para obter o profissional_id, ou para dizer quem atende uma especialidade.",
  inputSchema: profissionaisShape,
  category: "read",
  requiresRole: "agent",
  requiresScope: "mcp:read",
  handler: async (input, ctx) =>
    comFeegow("crm_feegow_list_professionals", ctx, async () => {
      const lista = await listarProfissionais({
        especialidade_id: input.especialidade_id,
        termo: input.termo,
      });
      return {
        ok: true,
        profissionais: lista.map((p) => ({
          profissional_id: p.profissional_id,
          nome: p.nome,
          especialidades: p.especialidades.map((e) => e.nome).filter(Boolean),
        })),
        ...(lista.length === 0 ? { aviso: "nenhum profissional encontrado com esse filtro" } : {}),
      };
    }),
};

// ─── unidades ───────────────────────────────────────────────────────────────

const unidadesShape = {};

export const crmFeegowListUnits: McpToolDefinition<typeof unidadesShape> = {
  name: "crm_feegow_list_units",
  description:
    "Lista as UNIDADES da clínica com nome, endereço e telefone, do cadastro do Feegow. Use para perguntar ao " +
    "paciente se ele prefere alguma unidade, mostrando o endereço de cada uma, ANTES de buscar horário. Se ele " +
    "escolher uma, passe o unidade_id dela para crm_feegow_next_available / crm_feegow_available_slots; se " +
    "disser que tanto faz, busque sem unidade (todas).",
  inputSchema: unidadesShape,
  category: "read",
  requiresRole: "agent",
  requiresScope: "mcp:read",
  handler: async (_input, ctx) =>
    comFeegow("crm_feegow_list_units", ctx, async () => {
      const unidades = await listarUnidades();
      return {
        ok: true,
        total: unidades.length,
        unidades,
        ...(unidades.length === 0 ? { aviso: "o Feegow não devolveu nenhuma unidade" } : {}),
      };
    }),
};

// ─── primeiro horário livre ─────────────────────────────────────────────────

const unidadeDoPaciente = idFeegow
  .optional()
  .describe(
    "Só se o paciente escolheu uma unidade (unidade_id de crm_feegow_list_units). Omitir = todas as unidades.",
  );

/**
 * A especialidade pelo NOME (pedido de 18/11): o modelo pulava
 * crm_feegow_list_specialties e mandava um id inventado (30), a busca voltava
 * vazia e ele dizia "sem horário" e transferia. Com o nome, quem resolve o id é
 * o servidor; id que não existe é recusado e manda usar o nome.
 */
const especialidadePeloNome = z
  .string()
  .trim()
  .min(2)
  .max(80)
  .optional()
  .describe('Como o paciente pediu (ex.: "clínico geral"). Preferível ao id: o sistema acha a especialidade.');

type Resolvida = { ok: true; especialidade_id: number; nome: string };

async function resolverEspecialidade(input: { especialidade?: string; especialidade_id?: number }): Promise<Resolvida | Recusa> {
  if (input.especialidade) {
    const achadas = await listarEspecialidades(input.especialidade);
    if (achadas.length === 1) return { ok: true, especialidade_id: achadas[0]!.especialidade_id, nome: achadas[0]!.nome };
    if (achadas.length > 1) {
      return recusa(
        "especialidade_ambigua",
        `Mais de uma especialidade casa com "${input.especialidade}": ${achadas.map((e) => e.nome).join(", ")}. Pergunte ao paciente qual delas e busque de novo com o nome exato.`,
      );
    }
    return recusa(
      "especialidade_nao_encontrada",
      `Nenhuma especialidade da clínica casa com "${input.especialidade}". Liste com crm_feegow_list_specialties (sem termo) e procure a mais parecida.`,
    );
  }
  if (input.especialidade_id !== undefined) {
    const esp = await obterEspecialidade(input.especialidade_id);
    if (esp) return { ok: true, especialidade_id: esp.especialidade_id, nome: esp.nome };
    return recusa(
      "ids_invalidos",
      `A especialidade ${input.especialidade_id} não existe. Busque de novo passando o NOME em "especialidade" (ex.: "clínico geral"). Não diga ao paciente que não há horário e não transfira por isso.`,
    );
  }
  return recusa("especialidade_obrigatoria", 'Informe a especialidade pelo nome em "especialidade" (ex.: "clínico geral").');
}

const proximoShape = {
  especialidade: especialidadePeloNome,
  especialidade_id: idFeegow.optional().describe("Só se já tiver o id certo; senão use o nome."),
  profissional_id: idFeegow
    .optional()
    .describe("Só quando o paciente pediu um profissional específico."),
  unidade_id: unidadeDoPaciente,
  convenio_id: idFeegow.optional().describe("Convênio do paciente, se for atender por convênio."),
  a_partir_de: dataIso.optional().describe("Data inicial (AAAA-MM-DD). Padrão: hoje."),
  quantidade: z.number().int().min(1).max(5).optional().default(3).describe("Quantos horários sugerir."),
};

export const crmFeegowNextAvailable: McpToolDefinition<typeof proximoShape> = {
  name: "crm_feegow_next_available",
  description:
    "Busca na agenda do Feegow o PRIMEIRO horário livre mais próximo para uma especialidade (e, se pedido, " +
    "um profissional), em TODAS as unidades ou só na que o paciente escolheu (unidade_id). Devolve os horários mais próximos e o primeiro horário de cada " +
    "profissional — cada um com a UNIDADE onde é o atendimento (diga a unidade ao paciente). Procura até " +
    `${LIMITE_DE_BUSCA_DIAS} dias à frente. Use para responder "qual o horário mais próximo?". ` +
    "Ofereça as opções ao paciente; nunca agende sem ele confirmar.",
  inputSchema: proximoShape,
  category: "read",
  requiresRole: "agent",
  requiresScope: "mcp:read",
  handler: async (input, ctx) =>
    comFeegow("crm_feegow_next_available", ctx, async () => {
      const esp = await resolverEspecialidade(input);
      if (!esp.ok) return esp;
      const { horarios, buscou_ate } = await primeirosHorarios({
        especialidade_id: esp.especialidade_id,
        profissional_id: input.profissional_id,
        unidade_id: input.unidade_id,
        convenio_id: input.convenio_id,
        de: input.a_partir_de,
      });
      if (horarios.length === 0) {
        return {
          ok: true,
          encontrou: false,
          mensagem:
            `Não há horário livre até ${dataLegivel(buscou_ate)}. Pergunte se outro profissional ou especialidade serve; ` +
            `se não, não invente vaga.${COMO_PASSAR_PARA_PESSOA}`,
        };
      }
      const nomes = await nomesDosProfissionais(esp.especialidade_id);
      const unidades = await unidadesPorLocalOuVazio();
      return {
        ok: true,
        encontrou: true,
        especialidade: { especialidade_id: esp.especialidade_id, nome: esp.nome },
        mais_proximos: horarios.slice(0, input.quantidade).map((h) => descreverHorario(h, nomes, unidades)),
        primeiro_de_cada_profissional: primeiroDeCadaProfissional(horarios)
          .slice(0, 5)
          .map((h) => descreverHorario(h, nomes, unidades)),
      };
    }),
};

// ─── horários de um período ─────────────────────────────────────────────────

const MAX_HORARIOS_DEVOLVIDOS = 40;
const MAX_PERIODO_DIAS = 31;

const horariosShape = {
  especialidade: especialidadePeloNome,
  especialidade_id: idFeegow.optional().describe("Só se já tiver o id certo; senão use o nome."),
  profissional_id: idFeegow.optional(),
  unidade_id: unidadeDoPaciente,
  convenio_id: idFeegow.optional(),
  data_inicio: dataIso.describe("Primeiro dia (AAAA-MM-DD)."),
  data_fim: dataIso.optional().describe("Último dia (AAAA-MM-DD). Padrão: o mesmo dia de início."),
};

export const crmFeegowAvailableSlots: McpToolDefinition<typeof horariosShape> = {
  name: "crm_feegow_available_slots",
  description:
    "Lista os horários livres de uma especialidade (opcionalmente de um profissional) num dia ou período " +
    "específico, de até 31 dias. Use quando o paciente perguntar por um dia/período (\"tem na sexta?\", " +
    "\"semana que vem à tarde?\"). Para o mais próximo, prefira crm_feegow_next_available.",
  inputSchema: horariosShape,
  category: "read",
  requiresRole: "agent",
  requiresScope: "mcp:read",
  handler: async (input, ctx) => {
    const fim = input.data_fim ?? input.data_inicio;
    if (fim < input.data_inicio) {
      return recusa("periodo_invalido", "A data final é anterior à inicial.");
    }
    if (fim > somarDias(input.data_inicio, MAX_PERIODO_DIAS - 1)) {
      return recusa("periodo_longo", `Consulte no máximo ${MAX_PERIODO_DIAS} dias por vez.`);
    }
    return comFeegow("crm_feegow_available_slots", ctx, async () => {
      const esp = await resolverEspecialidade(input);
      if (!esp.ok) return esp;
      const horarios = await buscarHorarios({
        especialidade_id: esp.especialidade_id,
        profissional_id: input.profissional_id,
        unidade_id: input.unidade_id,
        convenio_id: input.convenio_id,
        de: input.data_inicio,
        ate: fim,
      });
      if (horarios.length === 0) {
        return { ok: true, encontrou: false, especialidade: { especialidade_id: esp.especialidade_id, nome: esp.nome }, mensagem: "Nenhum horário livre nesse período." };
      }
      const nomes = await nomesDosProfissionais(esp.especialidade_id);
      const unidades = await unidadesPorLocalOuVazio();
      // Por período (pedido de 18/11): numa agenda cheia os 40 primeiros são todos
      // da manhã do 1º dia e a tarde sumia. Os 5 mais próximos de cada período vêm
      // à parte, já prontos para a lista "Manhã / Tarde".
      const porPeriodo = (manha: boolean) =>
        horarios
          .filter((h) => (h.hora < "12:00") === manha)
          .slice(0, 5)
          .map((h) => descreverHorario(h, nomes, unidades));
      return {
        ok: true,
        encontrou: true,
        especialidade: { especialidade_id: esp.especialidade_id, nome: esp.nome },
        total: horarios.length,
        manha: porPeriodo(true),
        tarde: porPeriodo(false),
        horarios: horarios.slice(0, MAX_HORARIOS_DEVOLVIDOS).map((h) => descreverHorario(h, nomes, unidades)),
        ...(horarios.length > MAX_HORARIOS_DEVOLVIDOS
          ? { aviso: `mostrando os ${MAX_HORARIOS_DEVOLVIDOS} primeiros; restrinja o período ou o profissional` }
          : {}),
      };
    });
  },
};

// ─── pacientes ──────────────────────────────────────────────────────────────

const buscarPacienteShape = { cpf };

export const crmFeegowFindPatient: McpToolDefinition<typeof buscarPacienteShape> = {
  name: "crm_feegow_find_patient",
  description:
    "Procura o cadastro do paciente no Feegow pelo CPF e devolve o paciente_id (necessário para agendar) e " +
    "os convênios cadastrados. Se não encontrar, colete nome completo e crie com crm_feegow_create_patient.",
  inputSchema: buscarPacienteShape,
  category: "read",
  requiresRole: "agent",
  requiresScope: "mcp:read",
  handler: async (input, ctx) =>
    comFeegow("crm_feegow_find_patient", ctx, async () => {
      // Em 18/11 o paciente errado (22009) veio de uma busca com CPF que ninguém digitou.
      const naoDigitado = await exigirCpfDigitado(ctx, input.cpf);
      if (naoDigitado) return naoDigitado;
      const paciente = await buscarPacientePorCpf(input.cpf);
      return paciente
        ? { ok: true, encontrado: true, ...paciente }
        : { ok: true, encontrado: false, mensagem: "CPF sem cadastro na clínica." };
    }),
};

const criarPacienteShape = {
  nome_completo: z.string().trim().min(3).max(200),
  cpf,
  data_nascimento: dataIso.optional(),
  genero: z.enum(["M", "F"]).optional(),
  celular: z.string().optional().describe("Celular com DDD."),
  email: z.string().email().optional(),
};

export const crmFeegowCreatePatient: McpToolDefinition<typeof criarPacienteShape> = {
  name: "crm_feegow_create_patient",
  description:
    "Cadastra um paciente novo no Feegow e devolve o paciente_id. Se o CPF já tiver cadastro, devolve o " +
    "existente em vez de duplicar. Use só depois de crm_feegow_find_patient não encontrar o CPF.",
  inputSchema: criarPacienteShape,
  category: "write",
  requiresRole: "ai_operator",
  requiresScope: "mcp:write",
  handler: async (input, ctx) =>
    comFeegow("crm_feegow_create_patient", ctx, async () => {
      // NUNCA inventar cadastro (pedido de 18/11): CPF, nome e ano de nascimento
      // precisam ter sido escritos pelo paciente nesta conversa.
      const naoDigitado = await exigirCpfDigitado(ctx, input.cpf);
      if (naoDigitado) return naoDigitado;
      if (ctx.contatoDoTurno) {
        const textos = (await mensagensDoPaciente(ctx.supabase, ctx.organizationId, ctx.contatoDoTurno)).map((m) => m.body);
        if (!nomeFoiDigitadoPeloPaciente(input.nome_completo, textos)) {
          return recusa(
            "nome_nao_informado_pelo_paciente",
            "O nome completo não foi escrito pelo paciente nesta conversa. Peça o nome completo a ele e use " +
              "exatamente o que ele escrever. Nada foi cadastrado.",
          );
        }
        if (input.data_nascimento && !anoFoiDigitadoPeloPaciente(input.data_nascimento, textos)) {
          return recusa(
            "nascimento_nao_informado_pelo_paciente",
            "A data de nascimento não foi escrita pelo paciente nesta conversa. Peça a ele. Nada foi cadastrado.",
          );
        }
      }
      // Cadastro duplicado no Feegow é sujeira que a recepção limpa à mão.
      const existente = await buscarPacientePorCpf(input.cpf);
      if (existente) return { ok: true, ja_existia: true, ...existente };
      const paciente_id = await criarPaciente(input);
      return { ok: true, ja_existia: false, paciente_id };
    }),
};

// ─── agendamentos do paciente ───────────────────────────────────────────────

const agendamentosShape = { paciente_id: idFeegow };

const porTelefoneShape = {};

/**
 * O cadastro pelo celular DA CONVERSA. O número vem do contato do turno
 * (`ctx.contatoDoTurno`, contexto de confiança), nunca do modelo: ninguém
 * consulta a agenda de outra pessoa digitando o telefone dela.
 */
export const crmFeegowFindPatientByPhone: McpToolDefinition<typeof porTelefoneShape> = {
  name: "crm_feegow_find_patient_by_phone",
  description:
    "Reconhece o paciente pelo celular DESTA conversa (você não escolhe o número), no começo do atendimento: " +
    "consultas marcadas (crm_feegow_list_patient_appointments) e se tem Cartão Saúde. Vários no número: pergunte " +
    "quem é. Para MARCAR, use sempre o CPF (crm_feegow_find_patient).",
  inputSchema: porTelefoneShape,
  category: "read",
  requiresRole: "agent",
  requiresScope: "mcp:read",
  handler: async (_input, ctx) =>
    comFeegow("crm_feegow_find_patient_by_phone", ctx, async () => {
      if (!ctx.contatoDoTurno) {
        return recusa("sem_conversa", "Só funciona dentro de uma conversa com o paciente. Peça o CPF.");
      }
      const { data } = await ctx.supabase
        .from("contacts")
        .select("phone_number")
        .eq("organization_id", ctx.organizationId)
        .eq("id", ctx.contatoDoTurno)
        .maybeSingle();
      const telefone = (data as { phone_number: string | null } | null)?.phone_number ?? null;
      if (!telefone) {
        return { ok: true, encontrado: false, mensagem: "Esta conversa não tem celular. Peça o CPF na hora de marcar." };
      }
      const achados = await buscarPacientesPorTelefone(telefone);
      if (achados.length === 0) return { ok: true, encontrado: false, mensagem: "Nenhum cadastro com este celular." };
      // Sem a lista de tabelas o resto continua valendo: o cartão fica "não sei" (null).
      const nomes = await nomesDasTabelas().catch(() => null);
      return {
        ok: true,
        encontrado: true,
        pacientes: achados.map((p) => ({
          paciente_id: p.paciente_id,
          primeiro_nome: p.primeiro_nome,
          possui_cartao_saude: ehTabelaDoCartao(p.tabela_id, nomes),
        })),
      };
    }),
};

export const crmFeegowListPatientAppointments: McpToolDefinition<typeof agendamentosShape> = {
  name: "crm_feegow_list_patient_appointments",
  description:
    "Lista as próximas consultas marcadas de um paciente no Feegow (data, hora, profissional e agendamento_id). " +
    "Use antes de cancelar ou remarcar, e quando o paciente perguntar quando é a consulta dele.",
  inputSchema: agendamentosShape,
  category: "read",
  requiresRole: "agent",
  requiresScope: "mcp:read",
  handler: async (input, ctx) =>
    comFeegow("crm_feegow_list_patient_appointments", ctx, async () => {
      const lista = await listarAgendamentosDoPaciente(input.paciente_id);
      const nomes = await nomesDosProfissionais();
      return {
        ok: true,
        agendamentos: lista.map((a) => ({
          agendamento_id: a.agendamento_id,
          data: a.data,
          hora: a.horario,
          dia_da_semana: a.data ? diaDaSemana(a.data) : null,
          data_legivel: a.data ? dataLegivel(a.data) : null,
          profissional: a.profissional_id !== null ? (nomes.get(a.profissional_id) ?? null) : null,
          profissional_id: a.profissional_id,
          especialidade_id: a.especialidade_id,
        })),
        ...(lista.length === 0 ? { mensagem: "Nenhuma consulta futura marcada." } : {}),
      };
    }),
};

// ─── agendar ────────────────────────────────────────────────────────────────

/** Os horários livres de um profissional num dia — para conferir e sugerir. */
async function livresNoDia(especialidade_id: number, profissional_id: number, data: string): Promise<Horario[]> {
  return buscarHorarios({ especialidade_id, profissional_id, de: data, ate: data });
}

/**
 * A especialidade existe e o profissional atende nela? `null` = tudo certo.
 * Devolve a recusa que MANDA o modelo buscar de novo (e proíbe transferir por isso).
 */
async function conferirIdsDaAgenda(especialidade_id: number, profissional_id: number): Promise<Recusa | null> {
  const orientacao =
    "Esses ids não existem no Feegow — não são os do paciente nem os de outra conversa. Chame " +
    "crm_feegow_list_specialties e crm_feegow_next_available (ou crm_feegow_available_slots) de novo e use EXATAMENTE " +
    "os ids devolvidos (especialidade_id, profissional_id, local_id). Não transfira por causa disto.";
  const esp = await obterEspecialidade(especialidade_id);
  if (!esp) return recusa("ids_invalidos", `Especialidade ${especialidade_id} não existe. ${orientacao}`);
  const profissionais = await listarProfissionais({ especialidade_id });
  if (!profissionais.some((p) => p.profissional_id === profissional_id)) {
    return recusa(
      "ids_invalidos",
      `O profissional ${profissional_id} não atende ${esp.nome}. ${orientacao}`,
    );
  }
  return null;
}

const agendarShape = {
  cpf: cpfDigitado,
  paciente_id: idFeegow.describe("O do CPF (crm_feegow_find_patient ou crm_feegow_create_patient)."),
  profissional_id: idFeegow,
  especialidade_id: idFeegow,
  data: dataIso,
  hora,
  local_id: idFeegow.optional().describe("O local_id que veio junto do horário escolhido."),
  procedimento_id: idFeegow
    .optional()
    .describe("Omitir para usar a consulta padrão da especialidade."),
  convenio_id: idFeegow.optional().describe("Só convênio; particular: omita."),
  convenio_plano_id: idFeegow.optional(),
  celular: z.string().optional(),
  notas: z.string().max(500).optional().describe("Observação curta para a recepção."),
  codigo_confirmacao: codigoConfirmacao,
};

export const crmFeegowBookAppointment: McpToolDefinition<typeof agendarShape> = {
  name: "crm_feegow_book_appointment",
  description:
    "Marca a consulta no Feegow em DUAS chamadas: a 1ª (sem codigo_confirmacao) só confere e devolve o resumo " +
    "para o paciente confirmar; a 2ª, com o código, marca — só depois que o paciente respondeu confirmando. " +
    "Exige o CPF que o paciente digitou. Horário ocupado: devolve alternativas do dia.",
  inputSchema: agendarShape,
  category: "write",
  requiresRole: "ai_operator",
  requiresScope: "mcp:write",
  handler: async (input, ctx) => {
    const hoje = agoraEmSaoPaulo().data;
    if (input.data < hoje) return recusa("data_no_passado", "Essa data já passou.");

    return comFeegow("crm_feegow_book_appointment", ctx, async () => {
      const horaCurta = input.hora.slice(0, 5);
      // `convenio_id: 0` é o modelo dizendo "particular": no Feegow 0 NÃO é convênio.
      const convenioId = input.convenio_id ? input.convenio_id : undefined;
      const convenioPlanoId = convenioId ? input.convenio_plano_id : undefined;

      // 0. os ids existem e combinam? O modelo só vê os ids da busca enquanto está no mesmo turno;
      // numa conversa que anda mensagem a mensagem ele os esquece e INVENTA (visto em 18/11:
      // profissional 2594 / especialidade 11 no lugar de 150 / 227). Antes isto virava "horário
      // indisponível" e o agente transferia para humano com a vaga livre.
      const idsInvalidos = await conferirIdsDaAgenda(input.especialidade_id, input.profissional_id);
      if (idsInvalidos) return idsInvalidos;

      // 0b. A REGRA PRINCIPAL: CPF do próprio paciente, e é dele o paciente_id.
      const semPaciente = await exigirPacienteDoCpf(ctx, input.cpf, input.paciente_id);
      if (semPaciente) return semPaciente;

      // 1. o horário ainda está livre? A conversa pode ter levado minutos.
      const livres = await livresNoDia(input.especialidade_id, input.profissional_id, input.data);
      const slot = livres.find(
        (h) => h.hora === horaCurta && (input.local_id === undefined || h.local_id === input.local_id),
      );
      if (!slot) {
        const nomes = await nomesDosProfissionais(input.especialidade_id);
        const unidades = await unidadesPorLocalOuVazio();
        return {
          ...recusa(
            "horario_indisponivel",
            "Esse horário não está mais livre. Ofereça uma das alternativas ou busque outro dia.",
          ),
          alternativas_no_mesmo_dia: livres.slice(0, 5).map((h) => descreverHorario(h, nomes, unidades)),
        };
      }

      // 2. procedimento: o informado ou a consulta da especialidade — a padrão do
      // Feegow quando ela é consulta de verdade, senão a achada pelo NOME (em 18/11
      // a padrão da Clínica Geral era "TESTE IMPLANTAÇÃO" e nada era marcado).
      let procedimento_id = input.procedimento_id;
      if (procedimento_id === undefined) {
        const esp = await obterEspecialidade(input.especialidade_id);
        const consulta = esp ? await consultaDaEspecialidade(esp) : null;
        if (!consulta) {
          return esp?.consulta_id
            ? recusa(
                "procedimento_invalido",
                "O procedimento desta consulta está cadastrado de forma errada no Feegow, então a consulta não foi " +
                  `marcada. Diga ao paciente que a equipe vai concluir o agendamento.${COMO_PASSAR_PARA_PESSOA}`,
              )
            : recusa(
                "procedimento_nao_definido",
                `A especialidade não tem consulta padrão no Feegow, então a consulta precisa ser marcada por uma pessoa.${COMO_PASSAR_PARA_PESSOA}`,
              );
        }
        procedimento_id = consulta.procedimento_id;
      }

      // 2b. O procedimento é consulta de verdade? A "consulta padrão" de uma
      // especialidade pode estar mal cadastrada no Feegow (ex.: "TESTE
      // IMPLANTAÇÃO"); marcar assim põe um teste na agenda do médico.
      if (procedimentoSuspeito(await nomeDoProcedimento(procedimento_id))) {
        return recusa(
          "procedimento_invalido",
          "O procedimento desta consulta está cadastrado de forma errada no Feegow, então a consulta não foi " +
            `marcada. Diga ao paciente que a equipe vai concluir o agendamento.${COMO_PASSAR_PARA_PESSOA}`,
        );
      }

      // 3. valor: com convênio é 0 (regra da API); particular, o da tabela.
      let valor = 0;
      let aviso: string | undefined;
      if (convenioId === undefined) {
        const tabela = await valorDoProcedimento({
          procedimento_id,
          especialidade_id: input.especialidade_id,
          profissional_id: input.profissional_id,
          paciente_id: input.paciente_id,
        });
        if (tabela === null) {
          aviso = "valor não encontrado na tabela; a recepção confirma o preço";
        } else {
          valor = tabela;
        }
      }

      // 4. CONFIRMAÇÃO: a 1ª chamada para aqui com o resumo; a 2ª só passa com o
      // código e com o paciente tendo respondido depois do resumo.
      {
        const nomes = await nomesDosProfissionais(input.especialidade_id);
        const unidades = await unidadesPorLocalOuVazio();
        const pendente = await exigirConfirmacao(
          ctx,
          {
            acao: "marcar",
            organizacao: ctx.organizationId,
            contato: ctx.contatoDoTurno ?? "",
            dados: {
              paciente_id: input.paciente_id,
              profissional_id: input.profissional_id,
              especialidade_id: input.especialidade_id,
              procedimento_id,
              data: input.data,
              hora: horaCurta,
              local_id: slot.local_id,
              convenio_id: convenioId ?? null,
            },
          },
          input.codigo_confirmacao,
          { consulta: descreverHorario(slot, nomes, unidades) },
        );
        if (pendente) return pendente;
      }

      const criado = await criarAgendamento({
        paciente_id: input.paciente_id,
        profissional_id: input.profissional_id,
        especialidade_id: input.especialidade_id,
        procedimento_id,
        local_id: slot.local_id,
        data: input.data,
        hora: horaCurta,
        valor,
        convenio_id: convenioId,
        convenio_plano_id: convenioPlanoId,
        celular: input.celular,
        notas: input.notas ?? "Agendado pelo assistente do WhatsApp",
      });

      const nomes = await nomesDosProfissionais(input.especialidade_id);
      const unidades = await unidadesPorLocalOuVazio();
      return {
        ok: true,
        agendamento_id: criado.agendamento_id,
        consulta: descreverHorario(slot, nomes, unidades),
        ...(criado.link ? { link_confirmacao: criado.link } : {}),
        ...(aviso ? { aviso } : {}),
      };
    });
  },
};

// ─── cancelar e remarcar ────────────────────────────────────────────────────

/** O agendamento existe E é deste paciente? */
async function conferirDono(agendamento_id: number, paciente_id: number): Promise<Agendamento | Recusa> {
  const ag = await obterAgendamento(agendamento_id);
  if (!ag) return recusa("agendamento_nao_encontrado", "Não encontrei esse agendamento.");
  if (ag.paciente_id !== paciente_id) {
    return recusa(
      "agendamento_de_outro_paciente",
      "Esse agendamento não pertence a este paciente. Não altere; confira com crm_feegow_list_patient_appointments.",
    );
  }
  return ag;
}

function ehRecusa(v: Agendamento | Recusa): v is Recusa {
  return "ok" in v && v.ok === false;
}

const cancelarShape = {
  cpf: cpfDigitado,
  agendamento_id: idFeegow,
  paciente_id: idFeegow.describe("O dono do agendamento — é conferido."),
  motivo: z.string().max(300).optional().describe("O que o paciente disse, em poucas palavras."),
  codigo_confirmacao: codigoConfirmacao,
};

export const crmFeegowCancelAppointment: McpToolDefinition<typeof cancelarShape> = {
  name: "crm_feegow_cancel_appointment",
  description:
    "Desmarca uma consulta no Feegow em DUAS chamadas (1ª: resumo para o paciente confirmar; 2ª: com o código, " +
    "depois da confirmação). Exige o CPF que o paciente digitou e confere o dono. Ofereça remarcar antes.",
  inputSchema: cancelarShape,
  category: "write",
  requiresRole: "ai_operator",
  requiresScope: "mcp:write",
  handler: async (input, ctx) =>
    comFeegow("crm_feegow_cancel_appointment", ctx, async () => {
      const semPaciente = await exigirPacienteDoCpf(ctx, input.cpf, input.paciente_id);
      if (semPaciente) return semPaciente;
      const dono = await conferirDono(input.agendamento_id, input.paciente_id);
      if (ehRecusa(dono)) return dono;
      const pendente = await exigirConfirmacao(
        ctx,
        {
          acao: "cancelar",
          organizacao: ctx.organizationId,
          contato: ctx.contatoDoTurno ?? "",
          dados: { agendamento_id: input.agendamento_id, paciente_id: input.paciente_id },
        },
        input.codigo_confirmacao,
        { agendamento_id: input.agendamento_id, data: dono.data, hora: dono.horario, profissional_id: dono.profissional_id },
      );
      if (pendente) return pendente;
      await cancelarAgendamento({
        agendamento_id: input.agendamento_id,
        motivo_id: await motivoPadrao(),
        obs: input.motivo ?? "Desmarcado pelo paciente via WhatsApp",
      });
      return { ok: true, cancelado: true, agendamento_id: input.agendamento_id };
    }),
};

const remarcarShape = {
  cpf: cpfDigitado,
  agendamento_id: idFeegow,
  paciente_id: idFeegow.describe("O dono do agendamento — é conferido."),
  nova_data: dataIso,
  nova_hora: hora,
  motivo: z.string().max(300).optional(),
  codigo_confirmacao: codigoConfirmacao,
};

export const crmFeegowRescheduleAppointment: McpToolDefinition<typeof remarcarShape> = {
  name: "crm_feegow_reschedule_appointment",
  description:
    "Remarca uma consulta para nova data e hora com o MESMO profissional, em DUAS chamadas (1ª: resumo para o " +
    "paciente confirmar; 2ª: com o código, depois da confirmação). Exige o CPF que o paciente digitou.",
  inputSchema: remarcarShape,
  category: "write",
  requiresRole: "ai_operator",
  requiresScope: "mcp:write",
  handler: async (input, ctx) => {
    if (input.nova_data < agoraEmSaoPaulo().data) return recusa("data_no_passado", "Essa data já passou.");

    return comFeegow("crm_feegow_reschedule_appointment", ctx, async () => {
      const semPaciente = await exigirPacienteDoCpf(ctx, input.cpf, input.paciente_id);
      if (semPaciente) return semPaciente;
      const ag = await conferirDono(input.agendamento_id, input.paciente_id);
      if (ehRecusa(ag)) return ag;
      if (ag.profissional_id === null || ag.especialidade_id === null) {
        return recusa(
          "agendamento_incompleto",
          `Não consegui ler o profissional desse agendamento.${COMO_PASSAR_PARA_PESSOA}`,
        );
      }

      const horaCurta = input.nova_hora.slice(0, 5);
      const livres = await livresNoDia(ag.especialidade_id, ag.profissional_id, input.nova_data);
      if (!livres.some((h) => h.hora === horaCurta)) {
        const nomes = await nomesDosProfissionais(ag.especialidade_id);
        const unidades = await unidadesPorLocalOuVazio();
        return {
          ...recusa("horario_indisponivel", "Esse horário não está livre para este profissional."),
          alternativas_no_mesmo_dia: livres.slice(0, 5).map((h) => descreverHorario(h, nomes, unidades)),
        };
      }

      const pendente = await exigirConfirmacao(
        ctx,
        {
          acao: "remarcar",
          organizacao: ctx.organizationId,
          contato: ctx.contatoDoTurno ?? "",
          dados: { agendamento_id: input.agendamento_id, paciente_id: input.paciente_id, nova_data: input.nova_data, nova_hora: horaCurta },
        },
        input.codigo_confirmacao,
        {
          agendamento_id: input.agendamento_id,
          de: { data: ag.data, hora: ag.horario },
          para: { data: input.nova_data, hora: horaCurta, data_legivel: dataLegivel(input.nova_data) },
        },
      );
      if (pendente) return pendente;

      await remarcarAgendamento({
        agendamento_id: input.agendamento_id,
        motivo_id: await motivoPadrao(),
        data: input.nova_data,
        hora: horaCurta,
        obs: input.motivo ?? "Remarcado pelo paciente via WhatsApp",
      });
      return {
        ok: true,
        remarcado: true,
        agendamento_id: input.agendamento_id,
        nova_data: input.nova_data,
        nova_hora: horaCurta,
        data_legivel: dataLegivel(input.nova_data),
        dia_da_semana: diaDaSemana(input.nova_data),
      };
    });
  },
};
