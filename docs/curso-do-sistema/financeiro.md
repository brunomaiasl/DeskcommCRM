# Financeiro

- **Tela:** `/app/settings/tenant/financeiro`
- **Resumo:** Onde você diz onde o dinheiro da clínica fica, como o cliente paga, como cada entrada e saída é classificada e quais contas se repetem todo mês.
- **Fonte:** `curso/licoes/financeiro.json`

## Conhecendo o Financeiro

**Objetivo:** Achar a tela pelas Configurações e saber para que serve cada uma das listas.

**Quem pode:** admin

**Palavras de busca:** configurar financeiro, onde cadastro as contas, formas de pagamento da clínica, plano de contas, organizar o dinheiro, caixa e banco

1. **Onde fica** — Abra "Configurações" no rodapé do menu da esquerda. No grupo "Sua empresa" está o cartão "Financeiro". Para seguir, clique nele.
   - Rota: `/app/settings`
2. **Onde o dinheiro fica e como o cliente paga** — A tela é uma página só, com várias listas uma embaixo da outra. "Contas" são os lugares onde o dinheiro fica: o caixa da recepção, a conta no banco. "Formas de pagamento" são os jeitos como o cliente paga, e cada uma diz em qual conta o dinheiro cai. Por isso as duas ficam juntas: dá para conferir de uma olhada que o Pix cai na conta do banco e o dinheiro vivo cai no caixa. O aviso ⚠️ ao lado de "Cartão de crédito" quer dizer que essa forma ainda não tem conta. Você resolve isso na lição "Formas de pagamento".
3. **Como cada lançamento é classificado** — Mais abaixo, o "Plano de contas" é a lista de categorias que separam cada entrada e cada saída, como "Consultas e sessões" ou "Aluguel". Se quem administra o servidor instalar o módulo "Comandas", aparece logo depois uma parte chamada "Comissão", para combinar quanto cada pessoa da equipe recebe por atendimento.
4. **As contas de todo mês** — No fim da página, "Todo mês" guarda as contas que se repetem, como o aluguel e a internet. O sistema abre cada uma no dia certo, para você não esquecer de lançar. Nas próximas lições você aprende a mexer em cada lista.

## Cadastrar, editar e desativar uma conta

**Objetivo:** Criar uma conta nova, corrigir o nome de uma conta e tirar de uso a que não serve mais.

**Quem pode:** admin

**Palavras de busca:** cadastrar conta do banco, criar caixa da clínica, onde o dinheiro fica, renomear conta, desativar conta financeira, conta da maquininha

1. **Os campos da conta** — Em "Contas", escreva o nome da conta e escolha o tipo: "Caixa" (dinheiro guardado na clínica), "Banco" ou "Outra". O botão "Adicionar conta" só fica disponível quando o nome tem pelo menos 2 letras. Embaixo fica a lista das contas que estão em uso, com o nome e o tipo de cada uma.
   - Rota: `/app/settings/tenant/financeiro`
2. **Preencher** — Vamos cadastrar a conta onde cai o dinheiro das vendas na maquininha de cartão. Escreva "Conta da maquininha" e escolha o tipo "Outra". Depois, clique em "Adicionar conta".
3. **A conta entrou na lista** — A "Conta da maquininha" aparece na lista, com o tipo "Outra", e o campo de nome fica vazio para a próxima. A partir de agora ela aparece para escolher nas formas de pagamento e nas contas de todo mês. Se já existir uma conta em uso com o mesmo nome, o sistema avisa e não cria outra.
4. **Corrigir uma conta** — Para mudar o nome ou o tipo de uma conta, clique em "Editar" na linha dela. Os dados dela sobem para os campos do alto, e o botão vira "Salvar". Mude o que precisar e clique em "Salvar". Os pagamentos ligados a essa conta continuam ligados a ela. Se mudar de ideia, "Cancelar" limpa os campos sem mudar nada.
5. **Tirar uma conta de uso** — Quando uma conta não serve mais, clique em "Desativar" na linha dela. Ela não é apagada: os lançamentos antigos continuam guardados com ela. Ela só sai da lista e deixa de aparecer para escolher. Atenção: o clique vale na hora, sem pergunta de confirmação.
6. **Fora da lista** — A "Conta da maquininha" saiu da lista. Se alguma forma de pagamento ainda apontava para ela, a forma passa a mostrar "conta removida" no lugar do nome. Troque a conta dessa forma logo: o sistema não troca sozinho, e enquanto você não troca, o dinheiro pago com ela continua indo para a conta desativada. O mesmo vale para as contas de todo mês ligadas a ela.

## Formas de pagamento

**Objetivo:** Dizer em qual conta cai cada forma de pagamento e cadastrar uma forma nova.

**Quem pode:** admin

**Palavras de busca:** formas de pagamento, cadastrar pix, cartão de crédito e débito, sem conta definida, em qual conta cai o pagamento, como o cliente paga

1. **O aviso de forma sem conta** — Cada linha mostra a forma de pagamento e, depois da seta, a conta onde o dinheiro cai. "Cartão de crédito" está com o aviso "sem conta definida". Dá para cadastrar a forma antes de decidir a conta. Mas, se a clínica usa comandas, uma comanda paga com ela não fecha: na hora de fechar, a tela da comanda avisa que a forma ainda não tem conta de destino. Para resolver, clique em "Editar" na linha do cartão de crédito.
   - Rota: `/app/settings/tenant/financeiro`
2. **Escolher a conta** — O nome "Cartão de crédito" sobe para o campo do alto. Em "Conta de destino", escolha "Conta corrente da clínica", que é onde a operadora do cartão deposita. Depois clique em "Salvar".
3. **Aviso resolvido** — O aviso sumiu: agora a linha diz "Cartão de crédito → Conta corrente da clínica". Se a clínica usa comandas, a partir daqui toda comanda paga no cartão de crédito põe o dinheiro nessa conta.
4. **Cadastrar uma forma nova** — Para aceitar cartão de débito, escreva "Cartão de débito" no nome e, em "Conta de destino", escolha "Conta corrente da clínica". Depois clique em "Adicionar forma". Se ainda não souber a conta, dá para deixar "Decidir depois": a forma é cadastrada com o aviso de sem conta, e você resolve depois como acabou de fazer.
5. **Pronta para usar** — "Cartão de débito → Conta corrente da clínica" entra na lista, em ordem alfabética. Se a clínica usa comandas, ela passa a aparecer como opção de pagamento na hora de fechar uma. "Desativar" tira uma forma de uso sem apagar os pagamentos antigos feitos com ela.

## Plano de contas

**Objetivo:** Criar uma categoria nova para classificar entradas ou saídas.

**Quem pode:** admin

**Palavras de busca:** plano de contas, categoria de despesa, classificar entrada e saída, separar gastos da clínica, categoria de receita, o que é plano de contas

1. **As categorias do dinheiro** — O plano de contas é a lista de categorias que dizem de onde veio cada entrada e para onde foi cada saída. Cada categoria é de "Entrada" ou de "Saída", e isso aparece depois do nome. Aqui, "Consultas e sessões" e "Convênios" são entradas; "Aluguel" e "Material de consumo" são saídas.
   - Rota: `/app/settings/tenant/financeiro`
2. **Escolher é obrigatório** — Escreva o nome da categoria nova, por exemplo "Material de escritório". Repare que o botão "Adicionar plano" continua apagado: o campo "Entrada ou saída?" começa vazio de propósito, e o botão só funciona depois que você escolhe. Assim ninguém cadastra uma despesa como se fosse entrada por pressa.
3. **Escolher a direção** — Material de escritório é dinheiro que sai, então escolha "Saída". O botão "Adicionar plano" acende. Clique nele.
4. **Categoria criada** — "Material de escritório · Saída" entra na lista e os dois campos voltam ao começo. "Editar" e "Desativar" funcionam como nas contas: editar corrige o nome ou a direção; desativar tira a categoria de uso sem apagar os lançamentos que já foram classificados com ela.

## Contas que se repetem todo mês

**Objetivo:** Cadastrar uma conta fixa, como o contador, para o sistema abri-la sozinho todo mês.

**Quem pode:** admin

**Palavras de busca:** conta fixa todo mês, lançamento recorrente, aluguel todo mês, despesa mensal automática, lembrar de pagar conta, cadastrar contador

1. **O que já se repete** — Em "Todo mês" ficam as contas fixas. Cada linha mostra o nome, se é saída ou entrada, o valor e o dia do mês. No dia certo, o sistema abre a conta sozinho, e ela aparece em Análise › Faturamento. Ela nasce como conta a pagar, nunca como paga: o sistema sabe que a conta vence, mas não sabe se você já pagou. Atenção: se você cadastrar uma conta fixa com um dia que já passou neste mês, o sistema abre a deste mês em até um dia, mesmo que você já tenha pago.
   - Rota: `/app/settings/tenant/financeiro`
2. **Preencher a conta fixa** — Escreva o nome ("Honorários do contador"), deixe "Saída", escolha a conta de onde o dinheiro sai, o valor (450,00) e o dia do mês. Aqui o contador é pago no dia 31. Como nem todo mês tem dia 31, aparece o aviso: "Nos meses mais curtos, cai no último dia do mês." O botão "Adicionar" só acende com tudo preenchido.
3. **Conta fixa cadastrada** — A linha "Honorários do contador · Saída · R$ 450,00 · dia 31" entra na lista. Repare que os campos continuam preenchidos: não clique em "Adicionar" de novo, senão a mesma conta fixa entra duas vezes. Para mudar o valor ou o dia, use "Editar" e depois "Salvar". O "×" no fim da linha tira a conta fixa de uso, sem pergunta de confirmação; as contas que ela já abriu continuam lá.

