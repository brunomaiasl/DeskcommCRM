# LGPD (Admin)

- **Tela:** `/admin/lgpd`
- **Resumo:** A lista dos pedidos de LGPD de todas as empresas do seu servidor (clientes que pedem uma cópia dos seus dados ou que eles sejam apagados), com o prazo e o risco de cada um, para você cobrar quem está atrasado.
- **Fonte:** `curso/licoes/admin-lgpd.json`

## Conhecendo a lista de pedidos

**Objetivo:** Ler a lista de pedidos de LGPD de todas as empresas do servidor e entender o aviso vermelho, o prazo, o risco e a situação de cada pedido.

**Quem pode:** admin

**Palavras de busca:** pedidos de lgpd, lgpd de todas as empresas, cliente pediu para apagar dados, cliente pediu cópia dos dados, prazo da lgpd, pedido de lgpd atrasado, proteção de dados

1. **Os pedidos de todas as empresas** — Pela LGPD, o cliente de uma empresa pode pedir uma cópia dos dados que ela guarda sobre ele, ou pedir que esses dados sejam apagados (o sistema os torna anônimos: o nome vira "Cliente Anonimizado"). Hoje esses pedidos só chegam pela loja virtual Nuvemshop ligada à empresa; se nenhuma empresa tem loja Nuvemshop ligada, a lista fica vazia. Esta tela junta os pedidos de TODAS as empresas do seu servidor (é isso que "Cross-tenant" quer dizer). Abaixo do título aparece quantos pedidos a lista mostra.
   - Rota: `/admin/lgpd`
2. **O aviso vermelho** — O aviso vermelho no topo só aparece quando existe pedido ainda aberto que já passou do prazo ou que vence em menos de 24 horas. Ele mostra quantos são. Pedidos concluídos ou que falharam não entram nessa conta. Quando nenhum pedido está nessa situação, o aviso some.
3. **O que cada coluna diz** — Cada linha é um pedido. "ID" é o código curto do pedido. "Tipo" diz o que foi pedido: "Solicitação de dados" (o cliente quer uma cópia dos dados), "Anonimização cliente" (o cliente quer que os dados dele sejam tornados anônimos) ou "Anonimização tenant" (a empresa desinstalou o aplicativo da loja Nuvemshop, e os dados de todos os clientes dela serão tornados anônimos). "Tenant" é a empresa que recebeu o pedido. "Recebido em" diz há quanto tempo ele chegou.
4. **Prazo e risco** — A empresa tem 7 dias úteis para entregar uma cópia dos dados e 15 dias úteis para torná-los anônimos. "Vence em" conta quanto falta até o fim do último dia do prazo, ou há quantas horas ele passou ("em atraso"). "Risco" resume isso num selo: "OK" (dentro do prazo), "Alerta" (mais da metade do prazo já passou), "Crítico" (vence em menos de 24 horas) e "Vencido" (o prazo passou).
5. **A situação de cada pedido** — A coluna "Status" diz em que pé o pedido está. "Recebido": chegou e ainda não começou a ser feito (o pedido de cópia dos dados espera alguém da empresa aprovar). "Processando": está sendo feito. "Revisão": travou e precisa que alguém da empresa resolva à mão. "Concluído": terminou. "Falhou": deu erro e o sistema desistiu depois de várias tentativas.

## Achando os pedidos que precisam de atenção

**Objetivo:** Usar os filtros de situação, tipo e risco para ver só os pedidos que importam agora, e voltar à lista completa.

**Quem pode:** admin

**Palavras de busca:** filtrar pedidos de lgpd, ver pedidos vencidos, pedidos de lgpd atrasados, filtro de risco lgpd, pedidos em revisão, limpar filtros lgpd

1. **Os três filtros** — Acima da lista ficam três filtros. O primeiro escolhe a situação do pedido, o segundo o tipo de pedido e o terceiro o risco do prazo. Eles começam em "Todos os status", "Todos os tipos" e "Todos os riscos", ou seja, sem filtro. Clique no filtro de risco para abrir as opções.
   - Rota: `/admin/lgpd`
2. **Ver só os vencidos** — As opções são as mesmas do selo de risco: "Vencido", "Crítico (<24h)", "Alerta (>50%)" e "OK". Escolha "Vencido" para ver só os pedidos cujo prazo já passou. Os que ainda não estão em "Concluído" são os primeiros a cobrar da empresa.
3. **A lista filtrada** — Agora a lista mostra só os pedidos vencidos, de todas as empresas, e o número abaixo do título conta só eles. Enquanto houver algum filtro ligado, aparece ao lado dos filtros o selo "Limpar filtros". Clique nele para voltar à lista completa.
4. **Pedidos que travaram** — Outro filtro útil é o de situação. Escolha "Revisão" no primeiro filtro para ver os pedidos que travaram e esperam alguém da empresa resolver à mão. Aqui aparece o pedido da Odonto Sorriso Leve. A próxima lição abre esse pedido para ver o motivo.

## Abrindo um pedido

**Objetivo:** Abrir a ficha de um pedido de LGPD, ler o prazo, os detalhes e o histórico, e entender por que ele travou.

**Quem pode:** admin

**Palavras de busca:** abrir pedido de lgpd, detalhes do pedido lgpd, histórico do pedido lgpd, por que o pedido travou, prazo do pedido de dados, quem aprova pedido lgpd

1. **Abrir a ficha** — Cada linha tem um botão "Ver" no fim. Ele abre a ficha completa do pedido. Clique em "Ver" no pedido da Odonto Sorriso Leve, que está em revisão.
   - Rota: `/admin/lgpd`
2. **O topo da ficha** — No topo ficam o código do pedido, a situação ("Revisão pendente"), o tipo e a empresa. Logo abaixo aparecem o dia em que o pedido chegou e o último dia do prazo. A frase em itálico avisa que esta ficha é só para leitura: quem aprova ou resolve o pedido é o administrador da própria empresa, na tela de LGPD dela.
3. **A linha do tempo do prazo** — O quadro "Linha do tempo SLA" mostra o prazo em forma de barra. À esquerda, há quantos dias o pedido chegou ("D+" e o número de dias); à direita, quantos dias faltam até o último dia do prazo. A barra fica verde, amarela quando três quartos do prazo já passaram, e vermelha quando ele acaba. Abaixo vêm as etapas de referência; a bolinha fica verde quando a data dela já passou.
4. **Os detalhes e o motivo da trava** — O quadro "Detalhes" mostra o código completo, o tipo, a situação, de onde o pedido veio ("Origem"), quantas vezes o sistema tentou fazê-lo ("Tentativas") e a empresa. Quando algo deu errado, aparece no fim desse quadro uma caixa vermelha "Erro". Aqui ela diz "email_not_configured": o arquivo com os dados do cliente foi gerado, mas o servidor não tem envio de e-mail configurado, então ele não foi entregue ao cliente. "Escopo" diz se o pedido é de um cliente só ("contact") ou da loja inteira; "Slug" é o apelido da empresa no endereço do sistema; "External customer ID" é o número do cliente na Nuvemshop.
5. **O histórico do pedido** — O quadro "Trilha de auditoria" lista o que aconteceu com o pedido, do mais antigo para o mais novo, com data e hora: a chegada ("lgpd.data_request_received"), a aprovação pela empresa ("lgpd.manually_approved") e a geração do arquivo ("lgpd.export_generated"). Quando o registro guarda quem fez a ação, aparece "por" e o começo do código da pessoa. Cada vez que alguém abre esta ficha, isso também é registrado ("platform_admin.lgpd_request_viewed") e aparece aqui numa abertura seguinte (se reabrir logo em seguida, recarregue a página para ver).

