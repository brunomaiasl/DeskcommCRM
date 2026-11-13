# Atividades

- **Tela:** `/app/activities`
- **Resumo:** O relatório do que aconteceu no CRM num período: quanto foi a equipe, quanto foram os agentes de IA, quem fez cada coisa e quais assuntos mais ocuparam o atendimento.
- **Fonte:** `curso/licoes/atividades.json`

## Conhecendo a tela Atividades

**Objetivo:** Ler o resumo do período: o total de acontecimentos, quanto foi a equipe, os agentes e o automático, e em que dias tudo aconteceu.

**Quem pode:** admin

**Palavras de busca:** atividades, relatório, o que aconteceu, o que a equipe fez, histórico da semana, quem fez o quê, produtividade da equipe

1. **O que esta tela mostra** — A tela Atividades mostra o que aconteceu no seu CRM num período e quem fez cada coisa. Cada acontecimento é algo que ficou registrado num negócio do funil: mudar de etapa, assumir uma conversa, marcar um horário, concluir uma tarefa. A tela abre na aba "Atividades", com os "Últimos 7 dias". À direita aparece o total de acontecimentos do período.
   - Rota: `/app/activities`
2. **Gente, agente ou automático** — Os três cartões dividem o total por origem. "A equipe" conta o que as pessoas da sua equipe fizeram. "Os agentes" conta o que os agentes de IA fizeram sozinhos. "Automático" conta o que não foi nem uma pessoa da equipe nem um agente: o próprio sistema (por exemplo, ao criar o negócio quando chega a primeira mensagem), uma automação ou o próprio cliente. Embaixo do número fica a porcentagem do total.
3. **Em que dias as coisas aconteceram** — O quadro "Quando" tem uma barra por dia, com a data embaixo. O dia de hoje também entra: em "Últimos 7 dias" aparecem 8 barras. Quanto mais alta a barra, mais coisa aconteceu naquele dia. Para ver o número exato, pare o mouse sobre a barra. No celular, o número aparece escrito embaixo da data. A primeira e a última barra pegam só um pedaço do dia, por isso podem sair mais baixas.

## Quem fez o quê

**Objetivo:** Ver quem mais trabalhou no período, que tipo de coisa foi feita, e ir de um acontecimento até o negócio dele.

**Quem pode:** admin

**Palavras de busca:** quem fez, ranking da equipe, o que cada atendente fez, o que a IA fez, linha do tempo, histórico de ações, abrir o negócio

1. **Os dois rankings** — "Quem fez" lista quem agiu no período (cada pessoa da equipe, cada agente de IA e o automático), de quem fez mais para quem fez menos, com o número e uma barra do tamanho da parte de cada um. O desenho antes do nome diz o tipo: bolinha cheia é pessoa, anel é agente e bolinha tracejada é automático (o sistema ou uma automação). Ao lado, "O que foi feito" faz a mesma conta pelo tipo de acontecimento, como "Mudou de estágio" ou "Assumiu a conversa".
   - Rota: `/app/activities`
2. **A linha do tempo da operação** — Mais embaixo fica a "Linha do tempo da operação": os acontecimentos do período, do mais recente para o mais antigo. Cada linha traz o dia e a hora, o que aconteceu, quem fez, o negócio e o nome do cliente. Quando há um motivo, ele aparece logo abaixo: por exemplo, de qual etapa para qual o negócio foi movido. O nome do negócio é um link. Clique nele para abrir o negócio.
3. **Do acontecimento ao negócio** — O link leva ao funil onde o negócio está agora, com a ficha dele já aberta. Role a ficha até "Linha do tempo": ali fica o histórico completo daquele negócio, inclusive o acontecimento em que você clicou. A tela Atividades é o resumo de todos os negócios juntos; a ficha é a história de um só.

## Olhar um período maior

**Objetivo:** Trocar o período do relatório para 30 ou 90 dias e comparar com a última semana.

**Quem pode:** admin

**Palavras de busca:** mudar o período, últimos 30 dias, relatório do mês, últimos 90 dias, ver meses anteriores, filtrar por data

1. **Escolher o período** — Clique no botão "Últimos 7 dias" para trocar o período. As opções são 7, 30 e 90 dias, sempre contando para trás a partir de agora. Os cartões, o gráfico, os rankings e a lista mudam juntos.
   - Rota: `/app/activities`
2. **O mês inteiro na tela** — Com "Últimos 30 dias", entram também os acontecimentos das semanas anteriores. Aqui o total subiu de 29 para 39, e o gráfico "Quando" passou a ter uma barra para cada dia, de um mês atrás até hoje. Assim dá para comparar a última semana com as anteriores.

## Quais assuntos mais ocuparam o atendimento

**Objetivo:** Usar a aba Por etiqueta para ver quais assuntos mais apareceram nas conversas e ir direto a elas na Inbox.

**Quem pode:** admin

**Palavras de busca:** por etiqueta, relatório de tags, assuntos mais comuns, tempo de espera, conversas por assunto, etiquetas mais usadas

1. **A aba Por etiqueta** — A aba "Por etiqueta" mostra quais assuntos mais ocuparam o atendimento. Ela conta as etiquetas postas nas conversas (as "Tags da conversa" da Inbox), nas conversas que começaram no período. Uma conversa com duas etiquetas conta nas duas linhas. Por isso, no alto, o total aparece em "etiquetagens", e não em conversas.
   - Rota: `/app/activities`
2. **Lendo uma linha** — A tabela vem da etiqueta mais usada para a menos usada. Em cada linha, "Conversas" é quantas conversas tiveram aquela etiqueta. "Abertas" e "Resolvidas" separam as que ainda estão em andamento das já encerradas. "Espera média" é quanto tempo, em média, o cliente ficou esperando resposta (um traço quer dizer que não deu para medir). "Fatia" é a parte daquela etiqueta no total.
3. **Ir direto às conversas do assunto** — Clique no nome de uma etiqueta para abrir a Inbox já filtrada por ela, na aba "Todas". No filtro de etiquetas aparece a etiqueta escolhida. Atenção: a Inbox mostra as conversas com aquela etiqueta de qualquer data, e também as conversas de clientes que têm a etiqueta na ficha do cliente. Por isso podem aparecer mais conversas do que o número da tabela: aqui, "convenio" tinha 2 na tabela e a Inbox mostra 4. Na lista, a etiqueta que aparece embaixo do nome é a da ficha do cliente. A etiqueta posta só na conversa não aparece ali: abra a conversa para vê-la em "Tags da conversa".

