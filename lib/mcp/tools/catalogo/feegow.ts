/**
 * Capacidades da AGENDA DA CLÍNICA NO FEEGOW (sistema externo).
 *
 * Não confundir com `./agendamento.ts`, que é a agenda PRÓPRIA do CRM (a da
 * equipe, integrada ao Google). As duas convivem: a clínica que agenda no
 * Feegow liga este pacote; a que agenda no CRM liga `vender`.
 *
 * Handlers em `lib/mcp/tools/feegow.ts`. Sem `FEEGOW_API_TOKEN`, as
 * capacidades respondem ao agente que a agenda está indisponível (e logam
 * erro), em vez de inventar horário.
 *
 * Risco do DESMARCAR é `critico`, pela mesma régua de `crm_cancel_appointment`:
 * o horário volta para a agenda e outra pessoa pode pegar — não se desfaz. Por
 * isso ele NÃO entra quando o pacote é ligado; o dono marca à parte.
 */
import { declararTools } from "./tipos";

export const TOOLS_FEEGOW = declararTools([
  {
    name: "crm_feegow_list_specialties",
    category: "read",
    rotulo: "Ver as especialidades da clínica",
    explicacao:
      "Mostra as especialidades atendidas na clínica, para o assistente entender qual o paciente está pedindo antes de procurar horário.",
    oQueToca: "Agenda da clínica",
    risco: "seguro",
    pacotes: ["agendar"],
  },
  {
    name: "crm_feegow_list_professionals",
    category: "read",
    rotulo: "Ver os profissionais da clínica",
    explicacao:
      "Mostra quem atende na clínica e em quais especialidades, para o assistente achar o profissional que o paciente pediu pelo nome.",
    oQueToca: "Agenda da clínica",
    risco: "seguro",
    pacotes: ["agendar"],
  },
  {
    name: "crm_feegow_list_units",
    category: "read",
    rotulo: "Ver as unidades da clínica e seus endereços",
    explicacao:
      "Mostra as unidades da clínica com endereço e telefone, para o assistente perguntar ao paciente se ele prefere alguma antes de procurar horário.",
    oQueToca: "Agenda da clínica",
    risco: "seguro",
    pacotes: ["agendar"],
  },
  {
    name: "crm_feegow_next_available",
    category: "read",
    rotulo: "Achar o horário livre mais próximo",
    explicacao:
      "Procura na agenda o primeiro horário vago para a especialidade pedida, e o primeiro de cada profissional, para oferecer ao paciente.",
    oQueToca: "Agenda da clínica",
    risco: "seguro",
    pacotes: ["agendar"],
  },
  {
    name: "crm_feegow_available_slots",
    category: "read",
    rotulo: "Ver horários vagos da clínica num dia ou semana",
    explicacao:
      "Mostra os horários vagos num dia ou período que o paciente escolheu, como uma sexta-feira ou a semana que vem.",
    oQueToca: "Agenda da clínica",
    risco: "seguro",
    pacotes: ["agendar"],
  },
  {
    name: "crm_feegow_find_patient",
    category: "read",
    rotulo: "Procurar o cadastro do paciente",
    explicacao:
      "Procura o paciente pelo CPF no sistema da clínica, para marcar a consulta no cadastro certo sem criar outro igual.",
    oQueToca: "Cadastro de pacientes",
    risco: "seguro",
    pacotes: ["agendar"],
  },
  {
    name: "crm_feegow_find_patient_by_phone",
    category: "read",
    rotulo: "Reconhecer o paciente pelo celular",
    explicacao:
      "Procura o cadastro do paciente pelo celular de quem está conversando, para já saber quem é e se tem consulta marcada. Só usa o número da própria conversa.",
    oQueToca: "Cadastro de pacientes",
    risco: "seguro",
    pacotes: ["agendar"],
  },
  {
    name: "crm_feegow_list_patient_appointments",
    category: "read",
    rotulo: "Ver as consultas marcadas do paciente",
    explicacao:
      "Mostra as próximas consultas do paciente, para o assistente responder quando é a consulta e saber qual remarcar ou desmarcar.",
    oQueToca: "Agenda da clínica",
    risco: "seguro",
    pacotes: ["agendar"],
  },
  {
    name: "crm_feegow_create_patient",
    category: "write",
    rotulo: "Cadastrar paciente novo",
    explicacao:
      "Cria o cadastro de quem ainda não é paciente da clínica, com nome e CPF, para que a consulta possa ser marcada. Se o CPF já existir, usa o cadastro que já estava lá.",
    oQueToca: "Cadastro de pacientes",
    risco: "atencao",
    pacotes: ["agendar"],
  },
  {
    name: "crm_feegow_book_appointment",
    category: "write",
    rotulo: "Marcar consulta na agenda da clínica",
    explicacao:
      "Marca a consulta no horário que o paciente confirmou, depois de conferir que o horário continua livre. A consulta aparece na agenda da clínica na hora.",
    oQueToca: "Agenda da clínica",
    risco: "atencao",
    pacotes: ["agendar"],
  },
  {
    name: "crm_feegow_reschedule_appointment",
    category: "write",
    rotulo: "Remarcar consulta na agenda da clínica",
    explicacao:
      "Muda a consulta do paciente para outro horário livre com o mesmo profissional, só depois que ele confirmar o novo horário.",
    oQueToca: "Agenda da clínica",
    risco: "atencao",
    pacotes: ["agendar"],
  },
  {
    name: "crm_feegow_cancel_appointment",
    category: "write",
    rotulo: "Desmarcar consulta na agenda da clínica",
    explicacao:
      "Desmarca a consulta a pedido do próprio paciente, conferindo antes que a consulta é mesmo dele. O horário volta para a agenda e outra pessoa pode pegar, então não dá para desfazer.",
    oQueToca: "Agenda da clínica",
    risco: "critico",
    pacotes: ["agendar"],
  },
]);
