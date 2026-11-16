# Integração Feegow — agenda da clínica

O agente de IA consulta e marca consultas no Feegow da clínica. Referência
completa da API: [feegow-api.md](feegow-api.md).

> Não confundir com a **agenda da equipe** do próprio CRM (pacote "Vender e
> mover o funil", integrada ao Google). As duas convivem; a clínica que agenda
> no Feegow usa este pacote.

## Ativar

1. No Feegow Clinic, o usuário master libera o token de API.
2. No sistema, como administrador da plataforma: **Admin › Configuração da
   instalação** (`/admin/configuracao`), quadro **"Agenda da clínica
   (Feegow)"**:
   - **Token da API do Feegow** — guardado cifrado; a tela mostra só os 4
     últimos caracteres;
   - **Vencimento do token** (AAAA-MM-DD, opcional) — avisa no log 14 dias antes;
   - **Unidade** (opcional: 0 = principal, vazio = todas);
   - **Canal de agendamento** (opcional: canal "WhatsApp" do Feegow).

   Vale em até 30 segundos, no app e no worker, **sem reiniciar**. As variáveis
   `FEEGOW_*` do `.env` continuam aceitas como reserva — o que foi salvo na tela
   vence.

3. Na tela do agente (IA → Agentes → capacidades), ligue o pacote
   **Agendar na agenda da clínica** e publique o agente.
4. **Desmarcar consulta** não liga junto com o pacote (é "efeito que não dá
   para desfazer": o horário volta para a agenda). Se quiser que o agente
   desmarque, marque essa capacidade à parte.

## Quando não consegue agendar → setor

Com o módulo **Setores** ligado (Admin → Sistema) e os setores cadastrados
(ex.: "Recepção" ou "Agendamento"), o agente, ao não conseguir agendar (sem
vaga, Feegow fora do ar, token vencido, especialidade sem consulta padrão):

1. lista os setores (`crm_list_sectors`);
2. coloca a conversa no setor de agendamento/recepção
   (`crm_set_conversation_sector`);
3. chama um atendente (`crm_request_human_handoff`) com o resumo do que o
   paciente quer — a distribuição entrega só para quem é daquele setor.

Para isso o agente precisa ter ligadas também essas duas capacidades (pacote
**Passar para um humano**). Uma automação com a ação "definir setor" serve para
o mesmo fim em regras que não passam pela IA.

## Renovar o token (a cada ~3 meses)

O token vence. Quando vence, o agente passa a dizer ao paciente que a agenda
está indisponível e passa para uma pessoa (pelo caminho acima) — e o log
registra `feegow: integração sem acesso`. Para renovar: gere um token novo no
Feegow e cole em **Admin › Configuração da instalação** (atualize também o vencimento). Sem reiniciar nada.

## O que o agente consegue fazer

| Capacidade | Tool | Tipo |
|---|---|---|
| Ver especialidades | `crm_feegow_list_specialties` | leitura |
| Ver profissionais | `crm_feegow_list_professionals` | leitura |
| **Horário livre mais próximo** por especialidade | `crm_feegow_next_available` | leitura |
| Horários de um dia/período | `crm_feegow_available_slots` | leitura |
| Procurar paciente por CPF | `crm_feegow_find_patient` | leitura |
| Consultas marcadas do paciente | `crm_feegow_list_patient_appointments` | leitura |
| Cadastrar paciente | `crm_feegow_create_patient` | escrita |
| Marcar consulta | `crm_feegow_book_appointment` | escrita |
| Remarcar consulta | `crm_feegow_reschedule_appointment` | escrita |
| Desmarcar consulta | `crm_feegow_cancel_appointment` | escrita (crítica, liga à parte) |

Fluxo típico: especialidade → horário mais próximo → paciente escolhe e
confirma → CPF (busca ou cadastra) → marca.

## Proteções

- **Horário conferido na hora de marcar/remarcar**: se ficou ocupado durante a
  conversa, o agente recebe alternativas do mesmo dia em vez de erro.
- **Cancelar/remarcar só a consulta do próprio paciente**: o agendamento é
  conferido contra o `paciente_id`; o de outra pessoa não é tocado.
- **Ficha mínima**: a busca por CPF devolve ao agente só id, primeiro nome e
  convênios — nada de endereço ou documentos.
- **Particular x convênio**: com convênio o valor vai 0 (regra da API); no
  particular, o valor vem da tabela de procedimentos do Feegow.
- Falha do Feegow nunca vira horário inventado.

**Limite conhecido:** o paciente é identificado pelo CPF que a pessoa informa
na conversa. O sistema não confere se o CPF é de quem está no WhatsApp — quem
souber o CPF de outra pessoa consegue ver as consultas dela e remarcá-las.

## Código

- `lib/feegow/` — config, cliente HTTP, datas e serviço de agenda
- `lib/mcp/tools/feegow.ts` — as tools do agente
- `lib/mcp/tools/catalogo/feegow.ts` — textos da tela
- `lib/mcp/tools/governance.ts` — `crm_list_sectors`
- `tests/unit/feegow-agenda.test.ts`, `tests/unit/crm-list-sectors.test.ts`
