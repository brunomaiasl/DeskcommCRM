# Agenda

- **Tela:** `/app/agenda`
- **Resumo:** Onde ficam as consultas, sessões e reuniões da equipe: ver a semana, marcar, remarcar, cancelar e registrar quem veio.
- **Fonte:** `curso/licoes/agenda.json`

## Conhecendo a Agenda

**Objetivo:** Reconhecer as partes da Agenda e andar pelos dias, semanas e meses.

**Quem pode:** admin

**Palavras de busca:** agenda, agendamentos, calendário, compromissos, consultas marcadas, semana, mês, dia, hoje

1. **As partes da tela** — A Agenda mostra os compromissos da clínica: consultas, sessões e reuniões da equipe. Abaixo do título "Agendamentos" ficam as setas para mudar de semana e os botões de visão. Logo depois vem a lista de compromissos, separada em abas, e mais abaixo a grade da semana, com um bloco colorido para cada compromisso. No topo, o quadro "Sincronizar com o Google ainda não está disponível" aparece enquanto a instalação não tem a ligação com o Google cadastrada. A Agenda funciona normalmente sem ela; só não troca compromissos com a agenda do Google.
   - Rota: `/app/agenda?tipo=be310000-0000-4000-8000-000000000001`
2. **Andar pelas semanas** — As setas ao lado da data mudam o período: a da esquerda volta e a da direita avança. Na visão de semana, cada clique anda uma semana inteira. O texto ao lado das setas mostra o período que está na tela, de domingo a sábado. O botão "Hoje" volta para o dia de hoje, de onde você estiver.
3. **Ver um dia só** — Os botões "Dia", "Semana" e "Mês" trocam o tamanho do período. Em "Dia", a grade mostra só um dia, com mais espaço para cada compromisso, e as setas passam a andar um dia por vez. No celular, a Agenda já abre nesta visão.
4. **Ver o mês inteiro** — Em "Mês", cada quadrado é um dia. Dentro dele aparecem até dois compromissos, com a hora e o nome, na cor de quem atende. Quando o dia tem mais, aparece no canto quantos ficaram de fora, como "+1". É o jeito de ver de longe quais dias estão cheios. Para voltar à grade de horários, clique em "Semana", no alto, ao lado de "Dia".

## A agenda de cada pessoa da equipe

**Objetivo:** Saber de quem é cada compromisso e ver a agenda de uma pessoa só.

**Quem pode:** admin

**Palavras de busca:** agenda da equipe, agenda de um profissional, filtrar por pessoa, cores, quem atende, agenda da Ana, ver só uma pessoa

1. **Cada pessoa tem uma cor** — As bolinhas com as iniciais, ao lado dos botões "Dia", "Semana" e "Mês", são as pessoas da equipe. Cada pessoa tem uma cor, e os compromissos dela aparecem na grade e na lista com essa cor. Aqui estão a Helena Prado, a Ana Ribeiro, da fisioterapia, e o Carlos Mendes, da odontologia.
   - Rota: `/app/agenda?tipo=be310000-0000-4000-8000-000000000001`
2. **Ver só a agenda de uma pessoa** — Clique na bolinha de uma pessoa para ver só a agenda dela. A grade e a lista passam a mostrar apenas os compromissos da Ana, a bolinha dela sobe um pouco e as outras ficam cinza. Ao lado aparece o botão "Todos".
3. **Voltar a ver a equipe inteira** — Para ver de novo a agenda de todos, clique em "Todos" ou outra vez na bolinha da pessoa escolhida. A grade volta a mostrar os compromissos da equipe inteira, cada um na cor de quem atende.

## A lista de compromissos

**Objetivo:** Usar as abas da lista para ver o que vem pela frente, aprovar horários e registrar quem veio.

**Quem pode:** admin

**Palavras de busca:** próximos compromissos, aguardando confirmação, confirmar horário, passados, realizado, faltou, não compareceu, cancelados, histórico

1. **As quatro abas** — A lista fica logo acima da grade e tem quatro abas: "Próximos", "Aguardando confirmação", "Passados" e "Cancelados". O número em cada aba diz quantos compromissos ela tem. A lista acompanha o período que está na tela: aqui avançamos uma semana com a seta da direita, para ver o que vem pela frente. Em cada linha aparecem o dia, o horário, o nome do cliente (ou o nome do compromisso, quando não há cliente), quem vai atender e a situação.
   - Rota: `/app/agenda?tipo=be310000-0000-4000-8000-000000000001`
2. **Aprovar um horário** — Em "Aguardando confirmação" ficam os horários reservados que ainda precisam de um sim da clínica. Isso acontece nos tipos de atendimento em que uma pessoa aprova cada horário. O botão "Confirmar" aprova o horário, e ele passa para "Próximos".
3. **O que já passou** — "Passados" mostra o que já aconteceu no período. Aqui voltamos para a semana passada, clicando duas vezes na seta da esquerda. Como a semana já passou, a grade avisa que não há horário livre. O selo diz o resultado: "Realizado" quando o paciente veio e "Não compareceu" quando faltou. Os que ainda estão como "Confirmado" esperam alguém da equipe dizer o que houve, com os botões "Realizado" e "Faltou".
4. **Registrar que o paciente veio** — Ao clicar em "Realizado", aparece o aviso "Marcado como realizado." e, em instantes, o selo da linha muda e os botões somem. Só dá para registrar presença ou falta depois que o horário começou.
5. **Os cancelados** — Em "Cancelados" ficam os horários desmarcados. Eles saem da grade, para o horário ficar livre de novo, mas continuam aqui para consulta.

## Os detalhes de um compromisso

**Objetivo:** Abrir um compromisso e entender o que cada parte do painel mostra.

**Quem pode:** admin

**Palavras de busca:** abrir compromisso, detalhes da consulta, observação, anotação, local do atendimento, compareceu, faltou, lembrar em uma hora, motivo do cancelamento

1. **Abrir pelo bloco da grade** — Clique num bloco da grade para abrir os detalhes daquele compromisso. Todo bloco mostra o nome; os mais compridos mostram também o horário de início. Aqui vamos abrir a reunião de equipe de quarta-feira.
   - Rota: `/app/agenda?tipo=be310000-0000-4000-8000-000000000001`
2. **O que o painel mostra** — Os detalhes abrem na lateral: o nome do compromisso, o dia e o horário, o local e a observação. A "Anotação" é um recado interno, para quem vai atender. Logo abaixo vem a situação (aqui, "Agendado", que é o mesmo que aparece como "Confirmado" na lista) e com quem é. Esta reunião não tem cliente, por isso aparece "Compromisso pessoal, sem cliente vinculado.". Quando há um cliente, no lugar aparece o link "Ver contato", que abre a ficha dele.
3. **As ações do compromisso** — Mais abaixo ficam as ações. "Compareceu" e "Faltou" registram o que aconteceu, e só funcionam depois que o horário começou. Quando o compromisso tem cliente e ele avisou por mensagem, escolha a mensagem dele em "Mensagem do cliente usada como evidência (opcional)" antes de clicar. "Lembrar em uma hora" adia por uma hora o aviso que pede à equipe para registrar a presença. Para desmarcar, escreva o motivo, com pelo menos 3 letras, em "Motivo do cancelamento" e clique em "Cancelar agendamento".

## Marcar um novo agendamento

**Objetivo:** Marcar um horário para um cliente pelo botão Novo agendamento.

**Quem pode:** admin

**Palavras de busca:** marcar consulta, novo agendamento, agendar cliente, marcar horário, escolher dia, horários livres, convidado, endereço, observação

1. **O botão Novo agendamento** — O botão "Novo agendamento", no alto à direita, abre o painel para marcar um horário. Ele só aparece para quem é atendente ou tem cargo acima, e fica apagado enquanto não houver nenhum tipo de agendamento cadastrado.
   - Rota: `/app/agenda?tipo=be310000-0000-4000-8000-000000000001`
2. **Os dados do compromisso** — O painel abre na lateral. Em cima ficam os dados do compromisso: "Quem será atendido", o "Tipo de agendamento", o "E-mail do convidado", o "Endereço" e a "Observação". Escolha o tipo pelos botões (eles aparecem quando a clínica tem mais de um tipo); cada um mostra a duração. O endereço já vem com o do tipo escolhido, e dá para trocar. Se "Quem será atendido" ficar em branco, o compromisso é pessoal, sem cliente.
3. **Escolher o cliente** — Clique em "Quem será atendido" e digite o nome do cliente. A lista mostra os contatos que combinam; clique no certo. Quando nenhum contato combina com o que você digitou, a lista oferece "Criar" com esse nome, para cadastrar o cliente ali mesmo. A primeira opção, "Compromisso pessoal, sem cliente", serve para marcar um horário sem cliente, como uma reunião.
4. **O resumo e o calendário** — Com o cliente escolhido, aparece "Conversa vinculada (opcional)", para ligar o compromisso a uma conversa dele. Mais abaixo, à esquerda, o painel resume o atendimento: quem atende, o tipo, a duração e o local. No calendário ao lado, os dias com horário livre ficam coloridos. Clique num deles.
5. **Escolher o horário e confirmar** — Os horários livres do dia aparecem à direita. Clique no que quiser e aparece o resumo com o dia e a hora. O compromisso só é marcado quando você clica em "Confirmar". Depois disso, o painel mostra "Marcado." e o botão "Ver na agenda".

## Marcar direto na grade

**Objetivo:** Escolher o tipo de atendimento e marcar clicando num horário livre da grade.

**Quem pode:** admin

**Palavras de busca:** clicar na grade, horário livre, marcar rápido, horários livres de, tipo de atendimento, jornada, expediente, semana que vem

1. **Horários livres de qual tipo** — Logo acima da grade fica a linha "Horários livres de", com um botão para cada tipo de agendamento. O tipo escolhido decide quais horários a grade oferece: a duração dele e o expediente de quem atende. Aqui está escolhida a "Sessão de fisioterapia", que é da Ana. Quando não sobra horário livre no período, aparece o aviso "Nenhum horário livre neste período.". E, se quem atende ainda não publicou o expediente, o aviso é "A jornada de atendimento ainda não foi publicada.".
   - Rota: `/app/agenda?tipo=be310000-0000-4000-8000-000000000001`
2. **Achar um horário livre** — Avançamos uma semana: ali a Ana ainda tem muitos horários livres. Passe o mouse na grade: o horário livre que está embaixo do mouse fica colorido e o cursor vira a mãozinha de clique. Os espaços fora do expediente e os horários já ocupados não mudam de cor nem respondem ao clique.
3. **O painel já vem com a hora** — Clique no horário livre e o painel de marcação abre com esse dia e essa hora já escolhidos. Preencha "Quem será atendido" no alto do painel, se for um cliente, e clique em "Confirmar".

## Remarcar e cancelar

**Objetivo:** Mudar o horário de um compromisso e desmarcar com motivo.

**Quem pode:** admin

**Palavras de busca:** remarcar consulta, mudar horário, trocar dia, cancelar consulta, desmarcar, motivo do cancelamento, arrastar compromisso

1. **Remarcar e Cancelar na lista** — Na aba "Próximos" da lista, cada compromisso tem os botões "Remarcar" e "Cancelar". Avançamos para a semana que vem e vamos remarcar a sessão de fisioterapia do Roberto Almeida.
   - Rota: `/app/agenda?tipo=be310000-0000-4000-8000-000000000001`
2. **Escolher o novo horário** — Abre o painel "Remarcar agendamento", com o mesmo calendário de marcar. Escolha o novo dia e o novo horário e clique em "Confirmar". O compromisso muda de lugar e continua com o mesmo cliente, o mesmo tipo e a mesma pessoa que atende.
3. **Cancelar com motivo** — Para desmarcar, clique em "Cancelar" na linha do compromisso. Aqui vamos desmarcar a sessão da Camila Rocha de quarta-feira. O painel pede o motivo, que é obrigatório: escreva pelo menos 3 letras e o botão "Cancelar agendamento" acende. O horário volta a ficar livre e o compromisso vai para a aba "Cancelados". "Voltar" fecha o painel sem cancelar nada.

