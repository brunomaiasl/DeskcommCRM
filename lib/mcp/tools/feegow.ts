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
  cancelarAgendamento,
  criarAgendamento,
  criarPaciente,
  descreverHorario,
  LIMITE_DE_BUSCA_DIAS,
  listarAgendamentosDoPaciente,
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

// ─── primeiro horário livre ─────────────────────────────────────────────────

const proximoShape = {
  especialidade_id: idFeegow.describe("Especialidade pedida (de crm_feegow_list_specialties)."),
  profissional_id: idFeegow
    .optional()
    .describe("Só quando o paciente pediu um profissional específico."),
  convenio_id: idFeegow.optional().describe("Convênio do paciente, se for atender por convênio."),
  a_partir_de: dataIso.optional().describe("Data inicial (AAAA-MM-DD). Padrão: hoje."),
  quantidade: z.number().int().min(1).max(5).optional().default(3).describe("Quantos horários sugerir."),
};

export const crmFeegowNextAvailable: McpToolDefinition<typeof proximoShape> = {
  name: "crm_feegow_next_available",
  description:
    "Busca na agenda do Feegow o PRIMEIRO horário livre mais próximo para uma especialidade (e, se pedido, " +
    "um profissional). Devolve os horários mais próximos e o primeiro horário de cada profissional. Procura até " +
    `${LIMITE_DE_BUSCA_DIAS} dias à frente. Use para responder "qual o horário mais próximo?". ` +
    "Ofereça as opções ao paciente; nunca agende sem ele confirmar.",
  inputSchema: proximoShape,
  category: "read",
  requiresRole: "agent",
  requiresScope: "mcp:read",
  handler: async (input, ctx) =>
    comFeegow("crm_feegow_next_available", ctx, async () => {
      const { horarios, buscou_ate } = await primeirosHorarios({
        especialidade_id: input.especialidade_id,
        profissional_id: input.profissional_id,
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
      const nomes = await nomesDosProfissionais(input.especialidade_id);
      return {
        ok: true,
        encontrou: true,
        mais_proximos: horarios.slice(0, input.quantidade).map((h) => descreverHorario(h, nomes)),
        primeiro_de_cada_profissional: primeiroDeCadaProfissional(horarios)
          .slice(0, 5)
          .map((h) => descreverHorario(h, nomes)),
      };
    }),
};

// ─── horários de um período ─────────────────────────────────────────────────

const MAX_HORARIOS_DEVOLVIDOS = 40;
const MAX_PERIODO_DIAS = 31;

const horariosShape = {
  especialidade_id: idFeegow.describe("Especialidade (de crm_feegow_list_specialties)."),
  profissional_id: idFeegow.optional(),
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
      const horarios = await buscarHorarios({
        especialidade_id: input.especialidade_id,
        profissional_id: input.profissional_id,
        convenio_id: input.convenio_id,
        de: input.data_inicio,
        ate: fim,
      });
      if (horarios.length === 0) {
        return { ok: true, encontrou: false, mensagem: "Nenhum horário livre nesse período." };
      }
      const nomes = await nomesDosProfissionais(input.especialidade_id);
      return {
        ok: true,
        encontrou: true,
        total: horarios.length,
        horarios: horarios.slice(0, MAX_HORARIOS_DEVOLVIDOS).map((h) => descreverHorario(h, nomes)),
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
      // Cadastro duplicado no Feegow é sujeira que a recepção limpa à mão.
      const existente = await buscarPacientePorCpf(input.cpf);
      if (existente) return { ok: true, ja_existia: true, ...existente };
      const paciente_id = await criarPaciente(input);
      return { ok: true, ja_existia: false, paciente_id };
    }),
};

// ─── agendamentos do paciente ───────────────────────────────────────────────

const agendamentosShape = { paciente_id: idFeegow };

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

const agendarShape = {
  paciente_id: idFeegow.describe("De crm_feegow_find_patient ou crm_feegow_create_patient."),
  profissional_id: idFeegow,
  especialidade_id: idFeegow,
  data: dataIso,
  hora,
  local_id: idFeegow.optional().describe("O local_id que veio junto do horário escolhido."),
  procedimento_id: idFeegow
    .optional()
    .describe("Omitir para usar a consulta padrão da especialidade."),
  convenio_id: idFeegow.optional().describe("Só se o atendimento for pelo convênio."),
  convenio_plano_id: idFeegow.optional(),
  celular: z.string().optional(),
  notas: z.string().max(500).optional().describe("Observação curta para a recepção."),
};

export const crmFeegowBookAppointment: McpToolDefinition<typeof agendarShape> = {
  name: "crm_feegow_book_appointment",
  description:
    "Marca a consulta no Feegow. SÓ chame depois que o paciente CONFIRMAR explicitamente profissional, data e " +
    "hora. Confere se o horário ainda está livre antes de marcar; se não estiver, devolve horários alternativos " +
    "do mesmo dia. Devolve o agendamento_id.",
  inputSchema: agendarShape,
  category: "write",
  requiresRole: "ai_operator",
  requiresScope: "mcp:write",
  handler: async (input, ctx) => {
    const hoje = agoraEmSaoPaulo().data;
    if (input.data < hoje) return recusa("data_no_passado", "Essa data já passou.");

    return comFeegow("crm_feegow_book_appointment", ctx, async () => {
      const horaCurta = input.hora.slice(0, 5);

      // 1. o horário ainda está livre? A conversa pode ter levado minutos.
      const livres = await livresNoDia(input.especialidade_id, input.profissional_id, input.data);
      const slot = livres.find(
        (h) => h.hora === horaCurta && (input.local_id === undefined || h.local_id === input.local_id),
      );
      if (!slot) {
        const nomes = await nomesDosProfissionais(input.especialidade_id);
        return {
          ...recusa(
            "horario_indisponivel",
            "Esse horário não está mais livre. Ofereça uma das alternativas ou busque outro dia.",
          ),
          alternativas_no_mesmo_dia: livres.slice(0, 5).map((h) => descreverHorario(h, nomes)),
        };
      }

      // 2. procedimento: o informado ou a consulta padrão da especialidade.
      let procedimento_id = input.procedimento_id;
      if (procedimento_id === undefined) {
        const esp = await obterEspecialidade(input.especialidade_id);
        if (!esp?.consulta_id) {
          return recusa(
            "procedimento_nao_definido",
            `A especialidade não tem consulta padrão no Feegow, então a consulta precisa ser marcada por uma pessoa.${COMO_PASSAR_PARA_PESSOA}`,
          );
        }
        procedimento_id = esp.consulta_id;
      }

      // 3. valor: com convênio é 0 (regra da API); particular, o da tabela.
      let valor = 0;
      let aviso: string | undefined;
      if (input.convenio_id === undefined) {
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

      const criado = await criarAgendamento({
        paciente_id: input.paciente_id,
        profissional_id: input.profissional_id,
        especialidade_id: input.especialidade_id,
        procedimento_id,
        local_id: slot.local_id,
        data: input.data,
        hora: horaCurta,
        valor,
        convenio_id: input.convenio_id,
        convenio_plano_id: input.convenio_plano_id,
        celular: input.celular,
        notas: input.notas ?? "Agendado pelo assistente do WhatsApp",
      });

      const nomes = await nomesDosProfissionais(input.especialidade_id);
      return {
        ok: true,
        agendamento_id: criado.agendamento_id,
        consulta: descreverHorario(slot, nomes),
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
  agendamento_id: idFeegow,
  paciente_id: idFeegow.describe("O dono do agendamento — é conferido."),
  motivo: z.string().max(300).optional().describe("O que o paciente disse, em poucas palavras."),
};

export const crmFeegowCancelAppointment: McpToolDefinition<typeof cancelarShape> = {
  name: "crm_feegow_cancel_appointment",
  description:
    "Desmarca uma consulta no Feegow a pedido do paciente. SÓ chame depois que o paciente confirmar qual " +
    "consulta quer desmarcar. Confere que o agendamento é do paciente. Ofereça remarcar antes de cancelar.",
  inputSchema: cancelarShape,
  category: "write",
  requiresRole: "ai_operator",
  requiresScope: "mcp:write",
  handler: async (input, ctx) =>
    comFeegow("crm_feegow_cancel_appointment", ctx, async () => {
      const dono = await conferirDono(input.agendamento_id, input.paciente_id);
      if (ehRecusa(dono)) return dono;
      await cancelarAgendamento({
        agendamento_id: input.agendamento_id,
        motivo_id: await motivoPadrao(),
        obs: input.motivo ?? "Desmarcado pelo paciente via WhatsApp",
      });
      return { ok: true, cancelado: true, agendamento_id: input.agendamento_id };
    }),
};

const remarcarShape = {
  agendamento_id: idFeegow,
  paciente_id: idFeegow.describe("O dono do agendamento — é conferido."),
  nova_data: dataIso,
  nova_hora: hora,
  motivo: z.string().max(300).optional(),
};

export const crmFeegowRescheduleAppointment: McpToolDefinition<typeof remarcarShape> = {
  name: "crm_feegow_reschedule_appointment",
  description:
    "Remarca uma consulta existente para nova data e hora com o MESMO profissional. Busque antes os horários " +
    "livres desse profissional e só chame depois que o paciente confirmar o novo horário. Confere que o " +
    "agendamento é do paciente e que o novo horário está livre.",
  inputSchema: remarcarShape,
  category: "write",
  requiresRole: "ai_operator",
  requiresScope: "mcp:write",
  handler: async (input, ctx) => {
    if (input.nova_data < agoraEmSaoPaulo().data) return recusa("data_no_passado", "Essa data já passou.");

    return comFeegow("crm_feegow_reschedule_appointment", ctx, async () => {
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
        return {
          ...recusa("horario_indisponivel", "Esse horário não está livre para este profissional."),
          alternativas_no_mesmo_dia: livres.slice(0, 5).map((h) => descreverHorario(h, nomes)),
        };
      }

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
