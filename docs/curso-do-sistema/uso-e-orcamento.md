# Uso e orçamento

- **Tela:** `/app/ai/usage`
- **Resumo:** Quanto a inteligência artificial custou, quantas vezes trabalhou, quanto demorou e qual é o teto de gasto do mês.
- **Fonte:** `curso/licoes/uso-e-orcamento.json`

## Conhecendo a tela de Uso e orçamento

**Objetivo:** Achar a tela e ler o orçamento do mês, os seis números do período e os gráficos por dia.

**Quem pode:** manager

**Palavras de busca:** quanto a ia gastou, custo da ia, gasto com inteligência artificial, orçamento de ia, consumo da ia, quantas vezes a ia respondeu

1. **Onde fica a tela** — Uso e orçamento não aparece direto no menu lateral. No grupo "Agente de IA" do menu, clique em "Ver tudo em IA". Na parte "Acompanhar o agente" está o cartão "Uso e orçamento". O caminho completo é: Agente de IA › Ver tudo em IA › Uso e orçamento.
   - Rota: `/app/ai`
2. **O orçamento do mês** — No alto fica o "Orçamento mensal de IA": quanto a IA já gastou neste mês e quanto falta para o limite. A barra enche conforme o gasto: fica amarela quando passa do ponto de aviso e vermelha quando chega no limite. Ao lado, a frase diz o que acontece no limite. Os valores são em dólar, porque é a moeda em que o provedor de IA cobra.
   - Rota: `/app/ai/usage`
3. **Custo, chamadas e turnos** — Embaixo vêm seis números dos últimos 30 dias. "Custo no período" é quanto a IA custou. "Chamadas de IA" conta cada vez que o sistema perguntou algo a uma IA. "Turnos do agente" conta as respostas que o agente deu ao cliente. Uma resposta pode fazer várias chamadas, como responder e, junto, medir o clima da conversa. Por isso há mais chamadas que turnos.
4. **Cache, passagem para uma pessoa e tempo** — "Taxa de cache" diz quanto do texto enviado à IA já estava guardado de antes, o que custa bem menos. "Passaram para uma pessoa" mostra quantas vezes a IA chamou alguém da equipe; quanto mais alto, mais ela precisou de ajuda. "Tempo de uma chamada à IA" é o pior caso comum, e a frase embaixo diz em quanto tempo a maioria responde.
5. **Os gráficos por dia** — Mais abaixo, os mesmos números aparecem dia a dia: quanto gastou, quanto texto a IA leu e escreveu, quanto demorou e quanto foi para uma pessoa. Passe o mouse sobre um dia para ver o valor exato. Um dia muito acima dos outros é o primeiro lugar para olhar.

## Filtrar por agente, tipo de uso e período

**Objetivo:** Ver só uma parte do gasto: um agente, um tipo de uso ou um intervalo de datas.

**Quem pode:** manager

**Palavras de busca:** filtrar o uso da ia, gasto de um agente, gasto por período, tipo de uso, uso do mês passado

1. **Os filtros** — Acima dos números ficam os filtros. "Agente" mostra só o uso de um agente. "Tipo de uso" mostra só um tipo de trabalho da IA. "De" e "Até" escolhem as datas; em branco, valem os últimos 30 dias. O período vai até 90 dias.
   - Rota: `/app/ai/usage`
2. **Os tipos de uso** — Clique em "Tipo de uso". A lista mostra só os tipos que aconteceram no período. Na Clínica Bem Viver são quatro: "Responder o cliente", "Medir o clima da conversa", "Identificar a etapa do lead" e "Fechar o atendimento".
3. **Os números do filtro** — Escolhemos "Responder o cliente". Os números e os gráficos passam a contar só as respostas ao cliente, que são a maior parte do custo. Para voltar a ver tudo, escolha "Todas" em "Tipo de uso".

## Definir o limite de gasto do mês

**Objetivo:** Escolher o que acontece quando o gasto chega no limite: só acompanhar, avisar ou parar a IA.

**Quem pode:** admin

**Palavras de busca:** limite de gasto da ia, teto do mês, parar a ia por gasto, aviso de gasto, editar limite

1. **Editar o limite** — Só o administrador muda o orçamento. No cartão "Orçamento mensal de IA", clique em "Editar limite".
   - Rota: `/app/ai/usage`
2. **Três jeitos de cuidar do gasto** — "Só acompanhar": a IA nunca para por gasto, e você só vê o número. "Me avisar": ao passar da porcentagem escolhida, chega um aviso na Central de avisos, e a IA continua respondendo. "Parar a IA": ao chegar no limite, as conversas vão para a fila de atendimento humano. Ninguém fica sem resposta, mas alguém da equipe precisa responder.
3. **O valor e o ponto de aviso** — Em "Limite mensal (US$)", escreva o teto do mês em dólar. Aqui a clínica sobe de US$ 15 para US$ 25. Em "Avisar ao chegar em (% do limite)", escolha quando o aviso chega, de 50% a 99%. O texto das opções acima muda junto com o valor.
4. **Parar a IA no limite** — Ao escolher "Parar a IA", aparece um quadro amarelo: a parada só começa a valer 72 horas depois de salvar. É o tempo de o aviso chegar antes que alguma conversa pare. Quem precisa da parada já pode marcar "Começar a valer agora, sem esperar as 72 horas". Por fim, clique em "Salvar".

