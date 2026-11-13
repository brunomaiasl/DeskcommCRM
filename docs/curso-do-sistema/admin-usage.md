# Usage (Admin)

- **Tela:** `/admin/usage`
- **Resumo:** Quanto cada empresa do servidor conversou e gastou com IA, dia a dia e somado, para você saber quem usa mais e quanto custa.
- **Fonte:** `curso/licoes/admin-usage.json`

## Conhecendo a tela de uso

**Objetivo:** Abrir a tela "Usage" do Admin e ler os três gráficos de consumo da instalação.

**Quem pode:** admin

**Palavras de busca:** consumo de ia, quanto gastei com ia, uso por empresa, mensagens por dia, custo da inteligência artificial, tokens por dia, relatório de uso

1. **Onde fica o consumo** — No Admin, o item "Usage" do menu (a palavra inglesa para "uso") abre a tela "Uso & Custo". Ela mostra quanto as empresas da instalação conversaram e quanto gastaram com IA. A tela junta todas as empresas do servidor, e não só a sua. No Admin, cada empresa se chama "tenant".
   - Rota: `/admin/usage`
2. **O período** — No canto direito fica o período que a tela inteira mostra. Ela abre em "Últimos 30 dias". Os gráficos e a tabela de baixo sempre falam desse mesmo período. Na última lição você aprende a trocá-lo.
3. **Mensagens e custo por dia** — "Mensagens / dia" soma as mensagens enviadas e recebidas por todas as empresas em cada dia, inclusive as de contatos pessoais, que a tabela lá de baixo deixa de fora. "Custo AI / dia (R$)" mostra quanto a IA custou em cada dia. Atenção: apesar do "R$" no título, os valores estão em dólar (US$), a moeda em que o provedor de IA cobra. Quando um gráfico não tem nada no período, ele mostra "Sem dados no período".
4. **Tokens: o que a IA lê e escreve** — "AI Tokens / dia" conta os tokens usados em cada dia. Token é um pedacinho de texto: a IA lê a conversa e escreve a resposta em tokens, e o provedor cobra por eles. Por isso este gráfico costuma subir e descer junto com o do custo. Os números do eixo usam "k" para mil: "20k" são 20 mil tokens.
5. **O número de um dia** — Pare o mouse sobre qualquer ponto de um gráfico para ver a data e o número daquele dia. Aqui, o balão mostra quantas mensagens houve no dia apontado.

## Quanto cada empresa usa

**Objetivo:** Ler a tabela "Uso por tenant" e achar quem gasta mais com IA e quem está sem agente no ar.

**Quem pode:** admin

**Palavras de busca:** qual empresa gasta mais, custo de ia por cliente, empresa sem agente, mensagens por empresa, uso por tenant, tabela de consumo

1. **A tabela por empresa** — Abaixo dos gráficos fica "Uso por tenant": uma linha por empresa da instalação, com os números do período escolhido. Embaixo do nome vem o identificador curto da empresa no sistema. A empresa que mais gasta com IA vem primeiro; em caso de empate, a que tem mais mensagens.
   - Rota: `/admin/usage`
2. **O que cada coluna conta** — "Mensagens" conta as enviadas e recebidas no período, fora as dos contatos marcados como pessoais. "Conversas" conta as conversas que começaram no período. "Invoc. AI" conta cada vez que o sistema chamou a IA: respostas do agente, testes, leitura de áudios, base de conhecimento e outras tarefas. "Tokens" soma o texto que ela leu e escreveu. "Custo AI" é quanto isso custou, em dólar.
3. **Quem mais gasta com IA** — A FisioMove Reabilitação está no topo: é a empresa que mais gastou com IA nos últimos 30 dias. A coluna "Agente" mostra o nome do atendente de IA publicado nela, o "Téo — Agenda da Fisio". Quando uma empresa tem mais de um agente publicado, aparece o de maior prioridade. Atenção: um agente pausado continua aparecendo aqui, então o nome nesta coluna não garante que ele esteja respondendo.
4. **Empresa sem agente no ar** — Na linha da OdontoVita, a coluna "Agente" diz "Nenhum agente publicado": essa empresa não tem atendente de IA no ar, e as colunas de IA dela estão zeradas mesmo com mensagens no período. Se o cliente contratou o atendimento com IA, esse é o sinal de que algo ficou para trás.
5. **Agente publicado, mas sem uso** — A Clínica Bem Viver tem a "Bia — Recepção virtual" publicada, mas a IA está zerada: no período, a Bia não respondeu ninguém. Ter o agente publicado não basta. Se a IA de uma empresa fica zerada com o agente no ar, vale conferir se ele não está pausado ou sem número de WhatsApp ligado.

## Trocar o período e baixar a planilha

**Objetivo:** Ver o uso dos últimos 7 ou 90 dias e baixar a tabela numa planilha.

**Quem pode:** admin

**Palavras de busca:** uso da última semana, consumo dos últimos 90 dias, mudar período do relatório, exportar planilha de uso, baixar csv de consumo

1. **Abrindo os períodos** — Clique no período, no canto direito, para ver as opções: "Últimos 7 dias", "Últimos 30 dias" e "Últimos 90 dias".
   - Rota: `/admin/usage`
2. **Só a última semana** — Com "Últimos 7 dias", os gráficos passam a mostrar só os 7 dias mais recentes, e a tabela recalcula os números de cada empresa para essa semana. Bom para ver se o movimento de agora está normal.
3. **Três meses de uso** — Com "Últimos 90 dias", dá para ver a tendência. Repare no custo: ele sobe por volta de 40 dias atrás, quando a FisioMove Reabilitação começou a usar a IA. Na tabela abaixo do gráfico, o NutriVida Consultório passa para o topo ao somar os três meses.
4. **Baixar a planilha** — O botão "Exportar CSV", acima da tabela, baixa a tabela numa planilha, com uma linha por empresa e os números do período escolhido; o nome do arquivo diz o período, como "usage-90d.csv". Abra no Google Planilhas (Arquivo > Importar). No Excel, use Dados > De Texto/CSV em vez de dar dois cliques, senão tudo cai numa coluna só. Atenção: a coluna "custo_reais" está, na verdade, em dólar, como na tela.

