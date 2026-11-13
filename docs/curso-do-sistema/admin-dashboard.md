# Dashboard (Admin)

- **Tela:** `/admin/dashboard`
- **Resumo:** O painel de quem cuida do servidor: em uma tela, os números e os alertas de todas as empresas da instalação.
- **Fonte:** `curso/licoes/admin-dashboard.json`

## Conhecendo o Dashboard do Admin

**Objetivo:** Entender para que serve o Dashboard do Admin e o que cada cartão de número conta.

**Quem pode:** admin

**Palavras de busca:** dashboard admin, painel da instalação, visão geral do servidor, todas as empresas, tenants ativos, conversas pendentes, whatsapp caiu, lgpd em risco, gasto de ia

1. **A primeira tela do Admin** — O Admin é a área de quem cuida da instalação inteira, e não de uma empresa só. O "Dashboard" é a primeira tela do menu: ele junta, num lugar, os números de todas as empresas do servidor. No Admin, cada empresa cadastrada se chama "tenant". A tela se atualiza sozinha a cada 30 segundos, sem você recarregar.
   - Rota: `/admin/dashboard`
2. **Quantas empresas estão ativas** — O cartão "Tenants Ativos" conta as empresas que estão funcionando no servidor. Empresas suspensas, arquivadas ou anonimizadas não entram na conta. Aqui são 4: a Clínica Bem Viver e mais três empresas de exemplo.
3. **Clientes esperando uma pessoa** — O cartão "Pendentes >10min" soma, em todas as empresas, as conversas marcadas como pendentes (em geral, as que o atendimento automático passou para uma pessoa) em que o cliente escreveu pela última vez há mais de 10 minutos. Quando o número passa de zero, ele fica laranja. Aqui são 54, todas da Rede Sorriso Pleno.
4. **Números de WhatsApp com problema** — O cartão "LGPD em Risco" conta os pedidos de clientes sobre os próprios dados (uma cópia ou a exclusão deles) que ainda estão em aberto e cujo prazo vence nos próximos 5 dias ou já venceu. Quando passa de zero, fica vermelho. O cartão "Budgets IA" conta as empresas cujo gasto com IA chegou a 80% ou mais do teto que elas definiram. Repare que ele fala em gasto acumulado: esse número não zera na virada do mês e pode somar o gasto de meses anteriores. O cartão "Alertas WAHA" deveria contar os números de WhatsApp com problema de conexão. Hoje ele fica sempre em zero. Para saber se o número de uma empresa caiu, abra a página de saúde dela e veja o cartão "WAHA", que mostra quantos números estão conectados.
5. **Prazos da LGPD e gasto com IA** — O cartão "LGPD em Risco" conta os pedidos de clientes sobre os próprios dados (uma cópia ou a exclusão deles) ainda em aberto e cujo prazo vence nos próximos 5 dias ou já venceu. Quando passa de zero, fica vermelho. O cartão "Budgets IA" conta as empresas cujo gasto com IA chegou a 80% ou mais do teto que elas definiram, e fica laranja quando passa de zero. Repare que ele fala em gasto acumulado: esse número não zera na virada do mês e pode somar o gasto de meses anteriores.

## Lendo os alertas

**Objetivo:** Ler a lista de alertas, entender os selos de cada linha e abrir a empresa que precisa de atenção.

**Quem pode:** admin

**Palavras de busca:** alertas do servidor, alerta crítico, prazo lgpd vencido, prazo lgpd vencendo, fila de conversas cheia, teto de gasto de ia, empresa com problema

1. **A lista de alertas** — Abaixo dos cartões fica "Alertas ativos". Cada linha é um alerta, e a mesma empresa pode aparecer em mais de uma linha, e o número no canto diz quantos alertas foram encontrados (a conta vai até 20). Os críticos vêm primeiro; depois, os mais recentes. A lista mostra até 10 linhas e avisa quantos ficaram de fora. Quando não há nada, aparece "Nenhum alerta crítico no momento. Tudo certo!".
   - Rota: `/admin/dashboard`
2. **Os selos de cada linha** — Cada linha traz o nome da empresa e dois selos. O primeiro diz a urgência: "Crítico", em vermelho, ou "Atenção". O segundo diz o assunto: "LGPD" (prazo de pedido de dados), "Overflow" (fila cheia), "IA Budget" (gasto com IA) ou "WAHA" (número de WhatsApp com problema). Embaixo vem a frase que explica o problema. Aqui, a Rede Sorriso Pleno tem um pedido de LGPD com o prazo já vencido.
3. **Prazos que ainda vão vencer** — Nem todo alerta de LGPD já está atrasado. A FisioMove Reabilitação aparece com "Atenção" porque tem um pedido ainda aberto cujo prazo termina nos próximos dias. A frase "Prazo LGPD expira em" mostra a data para a equipe se organizar antes de vencer. Clicar nessa linha abre a lista de pedidos na tela "LGPD" do Admin.
4. **Fila cheia numa empresa** — O alerta "Overflow" aparece quando uma empresa passa de 50 conversas pendentes, ou seja, passadas para uma pessoa e ainda sem atendimento. Aqui, a Rede Sorriso Pleno tem 54. Costuma ser sinal de que falta gente atendendo naquela empresa.
5. **Empresas perto do teto de IA** — Os alertas "IA Budget" aparecem quando o gasto acumulado de uma empresa chega a 80% ou mais do teto. Aqui, a FisioMove está em 92% e a NutriVida em 87%, ambas com "Atenção". A FisioMove escolheu só acompanhar; a NutriVida escolheu parar a IA ao atingir o limite. O gasto acumulado do alerta não prova que a IA parou: o limite considera o gasto do mês. Clique na linha da NutriVida para conferir esse número na página de saúde, no próximo passo.
6. **Abrindo a empresa do alerta** — Clicar numa linha leva você à tela com os detalhes do problema. Os alertas de fila e de IA abrem a página de saúde daquela empresa; os de LGPD abrem a tela "LGPD" do Admin. Aqui, o cartão "Orçamento IA" mostra o gasto do mês, que é o que decide se a IA para. Ele está em 0%: os 87% do alerta eram o gasto acumulado. Os outros cartões em amarelo ("WAHA", "Nuvemshop" e "Audit Lag") só dizem que essa empresa de exemplo ainda não ligou esses canais nem tem atividade registrada; não é defeito. Para voltar ao painel, clique em "Dashboard" no menu.

