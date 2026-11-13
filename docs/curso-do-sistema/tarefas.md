# Tarefas

- **Tela:** `/app/tasks`
- **Resumo:** A lista do que a equipe combinou de fazer, com prazo e responsável: anotar, concluir, filtrar e ver tudo num calendário.
- **Fonte:** `curso/licoes/tarefas.json`

## Conhecendo a tela de Tarefas

**Objetivo:** Entender como as tarefas da equipe ficam organizadas por prazo e o que cada linha mostra.

**Quem pode:** admin

**Palavras de busca:** tarefas, lista de tarefas, o que fazer, pendências da equipe, tarefas atrasadas, prazo das tarefas, lembretes

1. **As tarefas, separadas por prazo** — Tarefas é a lista do que a equipe combinou de fazer, como "ligar de volta na terça". A tela separa as tarefas em grupos pelo prazo. "Atrasadas" vem primeiro, em vermelho, porque pede ação agora: são as tarefas com prazo num dia que já passou. Depois vêm "Hoje", "Esta semana" (os próximos 7 dias), "Mais tarde" e, no fim, "Sem prazo". Uma tarefa de hoje cujo horário já passou continua em "Hoje", com a hora em vermelho. Um grupo sem nenhuma tarefa nem aparece.
   - Rota: `/app/tasks`
2. **O que cada linha mostra** — Cada linha é uma tarefa. Embaixo do título aparecem os detalhes, quando alguém escreveu. Depois vêm a prioridade (Baixa, Média, Alta ou Urgente), o dia e a hora do prazo (em vermelho quando já passou) e quem é o responsável. Quando a tarefa está ligada a um negócio do funil, o nome do negócio aparece no fim da linha.
3. **Os botões do alto da tela** — No alto da tela ficam os comandos. O seletor "Em aberto" escolhe quais tarefas aparecem. "Lista" e "Calendário" trocam o jeito de ver as tarefas. "Atualizar" busca a lista de novo, para você ver o que um colega acabou de mudar. "Nova tarefa" abre o formulário para anotar uma tarefa.

## Criar uma tarefa

**Objetivo:** Anotar uma tarefa nova com detalhes, prioridade e responsável.

**Quem pode:** admin

**Palavras de busca:** criar tarefa, nova tarefa, anotar tarefa, lembrete para equipe, responsável pela tarefa, prioridade, passar tarefa para colega

1. **Abrir o formulário** — Para anotar uma tarefa nova, clique em "Nova tarefa", no canto de cima, à direita.
   - Rota: `/app/tasks`
2. **O que precisa ser feito** — No primeiro campo, "O que precisa ser feito", escreva a tarefa numa frase curta. Ele é o único campo obrigatório. Em "Detalhes", anote o que você vai querer lembrar quando chegar a hora.
3. **Prazo, prioridade e situação** — Em "Prazo" você escolhe o dia e em "Horário" a hora. O prazo é opcional: sem ele, a tarefa vai para o grupo "Sem prazo". A hora só fica liberada depois que você escolhe o dia. "Prioridade" vai de Baixa a Urgente e já vem como Média; aqui escolhemos Alta. "Situação" já vem como Pendente.
4. **Quem vai fazer** — Em "Responsável", escolha quem vai cumprir a tarefa. A lista traz as pessoas da equipe, menos quem só tem permissão de leitura; você aparece como "Eu". "Ninguém" deixa a tarefa sem dono.
5. **Salvar** — Com tudo preenchido, clique em "Salvar". "Cancelar" fecha o formulário sem guardar nada.
6. **A tarefa entrou na lista** — A tarefa aparece na lista na hora. Como ficou sem prazo, ela entrou no grupo "Sem prazo", com a prioridade Alta e a Ana Ribeiro como responsável.

## Concluir, editar e apagar

**Objetivo:** Marcar uma tarefa como feita, mudar uma tarefa e apagar a que não serve mais.

**Quem pode:** admin

**Palavras de busca:** concluir tarefa, marcar como feita, editar tarefa, apagar tarefa, excluir tarefa, mudar prioridade, riscar tarefa

1. **Os comandos de cada linha** — A caixinha à esquerda de cada tarefa marca a tarefa como concluída. Quando você passa o mouse sobre a linha, aparecem dois botões à direita: o lápis, para editar, e a lixeira, para apagar.
   - Rota: `/app/tasks`
2. **Tarefa concluída** — Ao clicar na caixinha, a tarefa do Roberto foi marcada como concluída e saiu da lista, que mostra só o que está em aberto. Agora só a tarefa da Mariana está atrasada. Para rever as concluídas, troque o filtro para "Concluída" (próxima lição).
3. **Editar uma tarefa** — Clique no lápis para abrir a tarefa no formulário "Editar tarefa". Ele traz tudo o que já estava preenchido. Aqui vamos subir a prioridade da tarefa da Fernanda para Urgente.
4. **Salvar a mudança** — Clique em "Salvar". A linha da tarefa mostra a prioridade nova na hora.
5. **Apagar em dois cliques** — Para apagar, clique na lixeira. No lugar dela aparece o botão vermelho "Confirmar": só ao clicar nele a tarefa é apagada. Tarefa apagada não volta. Se ela só não vai mais ser feita, prefira editar e mudar a situação para "Cancelada".

## Ver as tarefas concluídas e as em andamento

**Objetivo:** Usar o filtro de situação para ver as tarefas concluídas, canceladas ou em andamento, e reabrir uma tarefa.

**Quem pode:** admin

**Palavras de busca:** tarefas concluídas, ver tarefas feitas, filtro de tarefas, tarefas canceladas, reabrir tarefa, em andamento

1. **O filtro de situação** — O seletor no alto começa em "Em aberto", que junta as tarefas pendentes e as em andamento. Clique nele para escolher outra situação: "Pendente", "Em andamento", "Concluída" ou "Cancelada".
   - Rota: `/app/tasks`
2. **As tarefas concluídas** — Com "Concluída", a lista mostra o grupo "Encerradas": as tarefas aparecem riscadas e com a caixinha marcada. Para reabrir uma tarefa, clique na caixinha marcada: ela volta a ser pendente e reaparece em "Em aberto".
3. **As tarefas em andamento** — Com "Em andamento", aparecem só as tarefas que alguém marcou como "Em andamento". Essa marcação é feita à mão, no formulário da tarefa, no campo "Situação".

## Ver as tarefas no calendário

**Objetivo:** Ver as tarefas do mês num calendário, abrir uma tarefa e criar outra já com o dia escolhido.

**Quem pode:** admin

**Palavras de busca:** calendário de tarefas, tarefas do mês, ver por data, agenda de tarefas, tarefa no dia, criar tarefa no calendário

1. **Trocar para o calendário** — Clique em "Calendário" para ver as tarefas do mês, cada uma no dia do seu prazo. O dia de hoje fica marcado com um círculo colorido. As tarefas atrasadas aparecem em vermelho. As setas dos lados do nome do mês passam para o mês anterior e para o próximo.
   - Rota: `/app/tasks`
2. **Abrir uma tarefa pelo calendário** — Clique no nome de uma tarefa para abrir o formulário "Editar tarefa" com tudo o que já foi preenchido.
3. **Criar uma tarefa num dia** — Clique num espaço vazio de um dia para abrir "Nova tarefa" com aquele dia já em "Prazo". O horário começa às 9h e pode ser trocado. Escreva o que precisa ser feito e clique em "Salvar".
4. **A tarefa no dia** — Depois de "Salvar", a tarefa aparece no dia escolhido.

## Tarefas ligadas a um negócio

**Objetivo:** Ir da tarefa para o negócio do funil e ver as tarefas daquele negócio.

**Quem pode:** admin

**Palavras de busca:** tarefa do negócio, tarefa do lead, abrir negócio da tarefa, funil e tarefas, tarefas do cliente

1. **O nome do negócio é um atalho** — Quando uma tarefa está ligada a um negócio do funil, o nome do negócio aparece no fim da linha. Clique nele para abrir o negócio.
   - Rota: `/app/tasks`
2. **As tarefas dentro do negócio** — O funil abre com a ficha do negócio por cima. Na seção "Tarefas" da ficha aparecem só as tarefas deste negócio, inclusive as já concluídas, e, ao lado do título, a conta de quantas estão abertas e quantas estão atrasadas. Dali também dá para criar uma tarefa em "Nova tarefa": ela já nasce ligada ao negócio.
3. **Criar uma tarefa pelo negócio** — Clique em "Nova tarefa", na seção "Tarefas" da ficha. O formulário é o mesmo da tela de Tarefas, com duas diferenças: a tarefa já nasce ligada a este negócio, e o campo "Responsável" já vem com você ("Eu"), porque quem anota o próximo passo do negócio quase sempre é quem vai cumpri-lo.

