# Desempenho

- **Tela:** `/app/metrics`
- **Resumo:** Os números do atendimento e das vendas dos últimos 30 dias: o que o resultado custou, por que se perdeu, quanto deve entrar e como cada pessoa da equipe está indo.
- **Fonte:** `curso/licoes/desempenho.json`

## Conhecendo a tela de Desempenho

**Objetivo:** Saber o que a tela de Desempenho mostra, de que período são os números e como cada cartão se lê.

**Quem pode:** admin

**Palavras de busca:** desempenho, métricas, relatório, números do atendimento, resultados das vendas, painel, indicadores, últimos 30 dias

1. **Onde ficam os números** — A tela Desempenho junta os números do atendimento e das vendas da clínica. Você chega a ela pelo menu, em "Desempenho", no grupo Análise. A maior parte dos números olha para os últimos 30 dias, contados até agora, e não há como escolher outro período nesta tela. O Funil e a Previsão são a exceção: eles mostram os negócios que estão abertos agora. O campo "Atendente" mostra parte dos blocos só para uma pessoa da equipe; ele aparece numa lição mais adiante.
   - Rota: `/app/metrics`
2. **O bloco Atrito** — O primeiro bloco, "Atrito", mostra o que o resultado custou para o cliente e para a equipe. A frase de cima diz em que base os números foram medidos: quantas demandas foram encerradas nos últimos 30 dias e quantas ainda estão abertas. Uma demanda é um pedido de um cliente, do começo ao fim do atendimento. Logo abaixo fica a régua que diz depois de quantas horas sem resposta uma conversa conta como perdida; ela tem uma lição própria.
3. **Como ler um cartão** — O Atrito tem quatro cartões: Conversão, Automação, Custo humano e Contenção. Todos se leem do mesmo jeito. À esquerda, em letra grande, fica o resultado (aqui, "Negócios ganhos": quantos negócios foram ganhos nos últimos 30 dias). À direita, em "O que isso custou", ficam as medidas do preço desse resultado. Os dois lados ficam juntos de propósito: um número bom só vale se o custo dele também estiver bom.

## Atrito: os quatro cartões

**Objetivo:** Entender o que mede cada cartão do Atrito e o que quer dizer o traço no lugar de um número.

**Quem pode:** admin

**Palavras de busca:** atrito, conversão, automação, custo humano, contenção, cliente sumiu, o que significa o traço, tempo de espera

1. **Conversão** — O cartão Conversão põe os negócios ganhos ao lado do esforço que o cliente teve. "Turnos até o desfecho (mediana)" mostra quantas mensagens, somando os dois lados, um atendimento típico trocou até ser encerrado. As duas linhas de "Insistência" contam quantas vezes o agente voltou a procurar o cliente por conta própria; elas só são medidas nos atendimentos que viraram um caso do agente, e aqui aparecem com "—" porque não houve nenhum. "Descadastros no período" conta quem pediu para não receber mais mensagens. "Conversas que morreram no silêncio" mostra, das conversas em que a clínica falou, quantas acabaram com a clínica falando por último, o cliente sem responder há mais de 72 horas e ninguém encerrando.
   - Rota: `/app/metrics`
2. **Automação** — O cartão Automação mostra quanto o agente de IA respondeu sozinho. "Respostas dadas pelo agente" é a parte das respostas aos clientes que foi escrita pelo agente; as mensagens de automação não entram nessa conta. Do lado do custo: "Passagens para humano" conta as vezes em que o agente passou para uma pessoa o atendimento de um cliente que tem negócio no funil. "Respostas humanas fora do sistema" mostra, em porcentagem, quanto das respostas da equipe saiu pelo celular, fora do Deskcomm. "Clientes que repetiram depois da passagem" mostra, entre os atendimentos passados para uma pessoa, em quantos o cliente teve de repetir o que já tinha dito. "Perguntas que a pessoa teve de repetir" mostra, também em porcentagem, quantas vezes o cliente mandou de novo quase a mesma frase depois de receber uma resposta.
3. **Custo humano** — O cartão Custo humano mostra o trabalho da equipe. O número grande é o total de demandas encerradas no período. "Espera na fila humana" mede quanto o cliente esperou até alguém da equipe agir, nos atendimentos que o agente passou adiante; aqui aparece "—" porque não houve nenhum no período. As linhas vizinhas medem quantas vezes a equipe precisou entrar em cada demanda, a espera dos casos mais demorados (p90) e quantas demandas precisaram subir para alguém de nível acima. "Demandas abertas sem próximo passo" conta os atendimentos abertos em que nada está marcado para acontecer: é alguém esperando sem que ninguém tenha combinado o que vem depois. A última linha mostra, em porcentagem, quantas falas do cliente esperaram mais de 4 horas pela primeira resposta.
4. **Contenção e o traço** — O cartão Contenção conta as mensagens que saíram sem uma pessoa escrever. "Mensagens enviadas pelo agente" são as do agente de IA. À direita, em "O que isso custou", "Vetos por execução" mostra, em média, quantas vezes o sistema segurou uma mensagem do agente antes de ela sair. Logo abaixo aparecem as enviadas por automação (regras, follow-up e lembretes da agenda) e por integração com outro sistema, contadas à parte para não se misturarem com as do agente. Quando um número aparece como "—", não houve dado suficiente para medir: o traço não quer dizer zero.

## Ajustando quando uma conversa conta como perdida

**Objetivo:** Mudar o número de horas de silêncio depois do qual uma conversa conta como perdida no Atrito.

**Quem pode:** admin

**Palavras de busca:** conversa perdida, cliente não respondeu, horas sem resposta, mudar 72 horas, régua do abandono, silêncio, abandono

1. **A régua do silêncio** — No alto do Atrito fica a frase "Contar como perdida no silêncio após 72 horas sem resposta". É ela que decide quando uma conversa entra na medida "Conversas que morreram no silêncio", no cartão Conversão. O aviso "(padrão do sistema)" quer dizer que a régua está no valor padrão, 72 horas. Clínicas que costumam esperar menos pelo retorno do paciente podem querer um número menor.
   - Rota: `/app/metrics`
2. **Digite o novo número** — Clique no campo e troque o número de horas, por exemplo para 48. Assim que o número muda, aparece o botão "Salvar" ao lado, e o aviso "(padrão do sistema)" sai. O campo aceita um número inteiro de 1 a 2160 horas (90 dias); fora disso, aparece um aviso em vermelho e o botão fica desligado. Clique em "Salvar".
3. **A medida muda junto** — Depois de salvar, o botão some e a medida do cartão Conversão passa a se chamar "Conversas que morreram no silêncio (após 48h)", já contada com a régua nova. Aqui o número não mudou, porque a única conversa perdida já estava em silêncio havia mais de 72 horas. A régua vale para toda a empresa e muda também a leitura dos dias que já passaram. Para voltar ao padrão, digite 72 e salve de novo.

## Perdas e previsão

**Objetivo:** Ver por que e em que etapa os negócios foram perdidos, quanto valiam, e o que a previsão precisa para funcionar.

**Quem pode:** admin

**Palavras de busca:** negócios perdidos, motivo da perda, por que perdi, previsão de vendas, quanto vou faturar, chance de fechamento, valor perdido

1. **Por que os negócios foram perdidos** — O cartão "Perdas" lista os negócios perdidos nos últimos 30 dias de três jeitos. "Por motivo" usa o motivo escolhido quando o negócio foi marcado como perdido. "Por categoria" junta os motivos em grupos: "Preço" conta como "Nós", "Sem resposta do cliente" como "Ausência" e "Cancelado pelo cliente" como "Cliente". "Por etapa de saída" mostra em que etapa do funil o negócio estava quando foi perdido. A maior quantidade vem sempre em cima.
   - Rota: `/app/metrics`
2. **Quanto se perdeu** — Em "Valor por moeda" aparecem quantos negócios foram perdidos e a soma do valor deles. Se a clínica vende em mais de uma moeda, cada uma fica numa linha, sem somar uma com a outra.
3. **A previsão do funil** — O cartão "Previsão" estima quanto deve entrar por mês com os negócios abertos do funil principal, usando a chance de fechamento de cada etapa. Nesta clínica nenhuma etapa tem chance definida, por isso todo o valor em aberto aparece em "Sem chance definida na etapa — falta calibrar". Quando as etapas têm chance, aparece uma tabela por mês com o valor "Ponderado" (o valor vezes a chance) e o "Bruto" (o valor cheio). Negócio sem data prevista de fechamento fica numa linha à parte.

## Funil e desempenho da equipe

**Objetivo:** Ler quantos negócios estão abertos em cada etapa, comparar a equipe e ver os números de uma pessoa só.

**Quem pode:** admin

**Palavras de busca:** funil, desempenho por atendente, comparar equipe, tempo de resposta, quem vendeu mais, média e mediana, filtrar atendente

1. **O funil de agora** — O cartão "Funil" conta os negócios abertos agora em cada etapa. Ele mostra uma barra para cada etapa de todos os funis da clínica, e o número do título é o total de abertos. Cada barra é proporcional à etapa com mais negócios, e as etapas vazias também aparecem, inclusive as de ganho e de perda, que ficam em zero: um negócio que chega nelas deixa de estar aberto. Os negócios ganhos ou perdidos não entram aqui: este cartão olha para o que ainda está em andamento, e não para os últimos 30 dias.
   - Rota: `/app/metrics`
2. **Performance por atendente** — A tabela compara as pessoas da equipe nos últimos 30 dias; o "(você)" marca quem está usando a tela. "Ganhos" e "Perdidos" contam os negócios fechados que estavam no nome da pessoa. "Conversas" conta as conversas passadas para ela. "1ª resposta" é o tempo entre a primeira mensagem do cliente e a primeira resposta escrita por alguém da equipe, nas conversas que estão no nome da pessoa. A média soma todos os tempos; a mediana é o tempo do meio. Na linha da Helena, a média fica bem maior que a mediana: uma única resposta demorada, de horas, puxa a média para cima, e a mediana mostra a resposta típica. Os tempos aparecem em minutos: 120min são 2 horas.
3. **Escolher uma pessoa** — No alto da tela, o campo "Atendente" abre a lista da equipe. Escolha uma pessoa para ver só os números dela. Clique em "Ana Ribeiro".
4. **Os números de uma pessoa** — Com uma pessoa escolhida, o funil passa a se chamar "Funil do atendente" e conta só os negócios abertos no nome dela, e a tabela fica só com a linha dela. O cartão "Por canal" também passa a contar só as conversas dela. O Atrito, as Perdas, a Previsão e os Ganhos por período continuam mostrando a clínica inteira. Para voltar, escolha "Todos os atendentes".

## Por canal e ganhos por período

**Objetivo:** Ver o atendimento de cada número de WhatsApp e acompanhar os ganhos por dia, semana ou mês.

**Quem pode:** admin

**Palavras de busca:** por canal, número do whatsapp, conversas sem resposta, ganhos por dia, vendas por semana, gráfico de vendas, evolução

1. **Cada número de WhatsApp** — O cartão "Por canal" tem uma linha para cada número de WhatsApp que teve atendimento nos últimos 30 dias; um número parado no período não aparece. "Conversas" conta as conversas passadas para alguém da equipe nesse período. "1ª resposta (média)" é o tempo médio até a primeira resposta escrita por uma pessoa. "Sem resposta" conta, dessas conversas, quantas ainda não tiveram nenhuma resposta de alguém da equipe. Um número arquivado que teve atendimento no período continua aparecendo, marcado "(arquivado)".
   - Rota: `/app/metrics`
2. **Ganhos por período** — O último cartão mostra os negócios ganhos ao longo dos últimos 30 dias. O número do título é o total de ganhos, de toda a clínica. A linha do gráfico passa por cada dia, e os dias sem ganho aparecem com zero, para os vales não sumirem. Mais abaixo, rolando a tela, uma tabela repete os mesmos números, período por período. O campo à direita do título, hoje em "Dia", escolhe se os ganhos são juntados por dia, por semana ou por mês; o período continua sendo os últimos 30 dias. Clique nele.
3. **Ver por semana** — Escolha "Semana" para juntar os ganhos de cada semana num ponto só. Assim fica mais fácil ver se as vendas estão subindo ou caindo, sem o sobe e desce de um dia para o outro. "Mês" serve pouco aqui: como a tela olha só 30 dias, ele mostra no máximo dois meses, e os dois incompletos.

## O que um atendente vê

**Objetivo:** Saber como a tela de Desempenho aparece para quem tem o cargo de atendente.

**Quem pode:** agent

**Palavras de busca:** atendente vê, minha performance, meus números, cargo atendente, permissão desempenho, sua performance

1. **A tela para um atendente** — Esta é a mesma tela, aberta pela Ana Ribeiro, que tem o cargo de atendente. Ela não vê o campo para escolher outra pessoa da equipe, e a régua do silêncio aparece só como uma frase, sem campo para editar. O cartão Perdas também não aparece para quem é atendente.
   - Rota: `/app/metrics`
2. **Números só dela** — Para quem é atendente, boa parte dos números conta só o que a pessoa pode ver: os negócios e as conversas no nome dela e, no padrão da instalação, os que ainda não têm responsável. Por isso o cartão Conversão mostra os negócios ganhos que a Ana enxerga, e não os da clínica toda, e as conversas que morreram no silêncio são contadas só entre as que ela vê. Já as contagens de demandas (a base no alto do Atrito, "Demandas encerradas" e "Demandas abertas sem próximo passo") continuam sendo da clínica inteira.
3. **Sua performance** — Mais abaixo, o funil conta os negócios abertos que a Ana enxerga: os dela e os que estão sem responsável. A tabela se chama "Sua performance" e tem uma linha só, a dela: os ganhos, os perdidos, as conversas e o tempo da primeira resposta. Os cartões "Por canal" e "Ganhos por período" também contam só o que ela enxerga, por isso mostram números menores que os da clínica toda.

