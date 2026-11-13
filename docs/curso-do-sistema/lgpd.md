# LGPD

- **Tela:** `/app/lgpd/requests`
- **Resumo:** Onde chegam os pedidos dos clientes da loja virtual para receber uma cópia dos próprios dados ou apagá-los, com o prazo de cada um.
- **Fonte:** `curso/licoes/lgpd.json`

## Conhecendo a lista de pedidos

**Objetivo:** Achar a tela da LGPD, entender o aviso de prazo e ler cada coluna da lista.

**Quem pode:** admin

**Palavras de busca:** lgpd, pedido de dados do cliente, cliente pediu para apagar os dados, lei de proteção de dados, exportar dados do cliente, prazo lgpd, privacidade

1. **Onde fica a tela** — Clique em "Configurações", no rodapé do menu lateral, e desça até a parte "Dados e acesso": ali fica o cartão "LGPD". É nele que chegam os pedidos dos clientes que querem uma cópia dos próprios dados ou que querem ser apagados do seu cadastro.
   - Rota: `/app/settings`
2. **De onde vêm os pedidos** — A tela "Solicitações LGPD" mostra os pedidos de clientes sobre os próprios dados. Eles só chegam aqui se a sua loja Nuvemshop estiver conectada ao CRM: quando um cliente da loja pede uma cópia dos dados ou pede para ser apagado, a loja manda o pedido para cá e o prazo começa a contar. Pedido feito por WhatsApp ou telefone não aparece nesta lista. Para apagar essa pessoa, abra a ficha dela em Contatos e use "Anonimizar contato". A Clínica Bem Viver tem a loja conectada e quatro pedidos.
3. **O aviso vermelho de prazo** — Quando algum pedido em aberto já passou do prazo, ou tem menos de 2 dias para vencer, aparece este aviso vermelho no alto. Ele conta quantos pedidos estão nessa situação. Aqui é 1: o pedido do cliente 48213907, que já passou do prazo. Quando nenhum está tão perto do fim, mas algum já gastou mais da metade do prazo, o aviso fica amarelo. Pedido concluído não entra na conta.
4. **As colunas da lista** — Cada linha é um pedido, e o que vence primeiro fica em cima. "Tipo" diz o que o cliente pediu: "Solicitação dados" é uma cópia dos dados; "Anonimização cliente" é apagar os dados pessoais. "Sujeito" é o número do cliente na loja virtual. "Recebido" diz há quanto tempo o pedido chegou e "Vence" quanto falta para o prazo (em vermelho quando faltam menos de 2 dias; depois do prazo aparece "atrasado hoje" ou quantos dias de atraso). "SLA" resume o prazo: "OK", "Alerta" (mais da metade do prazo já passou), "Crítico" (menos de 2 dias) ou "Vencido".
5. **O andamento de cada pedido** — A coluna "Status" diz em que pé o pedido está. Num pedido de cópia, "Recebido" quer dizer que ele espera a sua aprovação. Num pedido de apagamento, o sistema começa sozinho: se ele ficou em "Recebido", o processamento automático não rodou e você pode aprovar à mão. Depois vem "Processando" e, quando termina, "Concluído". "Revisão pendente" quer dizer que o sistema não conseguiu terminar sozinho: a cópia ficou pronta mas não foi enviada por e-mail (você baixa e entrega), ou o cliente do pedido de apagamento não foi achado no CRM. "Falhou" quer dizer que deu erro três vezes seguidas. Para abrir um pedido, clique em "Ver", no fim da linha.

## Filtrar os pedidos

**Objetivo:** Mostrar só os pedidos de um tipo ou de uma situação, e voltar para a lista completa.

**Quem pode:** admin

**Palavras de busca:** filtrar pedidos lgpd, ver só pedidos de exclusão, pedidos de dados atrasados, limpar filtros lgpd, pedidos lgpd concluídos

1. **Os três filtros** — Acima da lista ficam três filtros. "Status: todos" separa pelo andamento (por exemplo, só os recebidos). "Tipo: todos" separa cópia de dados de apagamento. "SLA: todos" separa pela situação do prazo. Eles podem ser usados juntos.
   - Rota: `/app/lgpd/requests`
2. **Escolher um tipo** — Clique em "Tipo: todos" para abrir a lista de tipos. "Solicitação dados" é o cliente pedindo uma cópia dos dados. "Anonimização cliente" é o cliente pedindo para ser apagado. "Anonimização tenant" aparece quando alguém desinstala o aplicativo do CRM da loja Nuvemshop. Nesse caso o sistema apaga sozinho os dados pessoais de todos os contatos da empresa no CRM, e não só dos clientes da loja.
3. **A lista filtrada** — Agora a lista mostra só os 2 pedidos de cópia de dados, e o contador ao lado dos filtros diz "2 solicitações". Para voltar a ver tudo, clique em "Limpar filtros": ele só aparece quando algum filtro está ligado. Repare que o aviso do alto ficou amarelo: ele conta só os pedidos que aparecem na lista, e entre as cópias de dados nenhuma venceu, mas uma já gastou mais da metade do prazo.
4. **Ver só os que esperam por você** — No filtro "Status: todos", escolha "Recebido" para ver só os pedidos que ainda não começaram a ser atendidos. É um bom jeito de começar o dia: aqui são 3, as duas cópias que esperam a sua aprovação e o apagamento atrasado.

## Atender um pedido de cópia dos dados

**Objetivo:** Abrir um pedido de cópia dos dados, conferir o que será enviado e preparar a aprovação.

**Quem pode:** admin

**Palavras de busca:** cliente pediu cópia dos dados, aprovar exportação de dados lgpd, enviar dados para o cliente, pré-visualizar dados do titular, como responder pedido lgpd

1. **Abrir o pedido** — O Pedro Henrique Lima pediu, pela loja virtual, uma cópia dos dados que a clínica guarda sobre ele. Na linha do pedido dele (cliente 48227316), clique em "Ver".
   - Rota: `/app/lgpd/requests`
2. **O topo do pedido** — No alto aparecem o código do pedido, o andamento ("Recebido") e o tipo ("Solicitação de dados"). Logo abaixo ficam o dia e a hora em que o pedido chegou e a data-limite para responder ("Vence em"). O link "Solicitações", acima do código, volta para a lista.
3. **Prazo e detalhes** — O quadro "Linha do tempo SLA" mostra a barra do prazo (verde no começo, amarela a partir de três quartos, vermelha no fim) e as etapas "Recebido" (D+0), "Revisão intermediária" (D+5) e "Entrega ao titular" (D+7). Essas etapas contam dias corridos: o prazo que vale é o "Vence em", no alto da página. O quadro "Detalhes" traz o tipo, a origem ("nuvemshop" é a loja virtual), quantas tentativas o sistema já fez e o número do cliente na loja, que aparece como "External customer ID".
4. **O histórico do pedido** — Embaixo, a "Trilha de auditoria" lista tudo o que acontece com o pedido, com dia e hora. Por enquanto só tem a chegada pela loja ("lgpd.data_request_received"); a aprovação e o envio entram aqui depois. Esse registro fica guardado e não pode ser editado, e serve de prova de que a clínica respondeu no prazo.
5. **Ver o que será enviado** — Antes de aprovar, clique em "Pré-visualizar dados". A janela mostra o cadastro do cliente, com o e-mail e o telefone parcialmente escondidos, e quantos registros dele existem no sistema: conversas, mensagens, "Leads" (negócios no funil), pedidos, atividades, entradas de auditoria e consentimentos. Nada é enviado nem alterado ao abrir esta janela. A janela se chama "Prévia de dados do titular". Em "Expandir amostra" você vê até 10 exemplos de cada tipo de registro. O CPF nunca aparece nesta prévia.
6. **Aprovar o envio** — Feche a prévia e clique em "Aprovar export". A janela mostra o nome do cliente e o e-mail para onde a cópia vai: confira se é a pessoa certa, porque o envio não pode ser desfeito. No campo "Justificativa", escreva o motivo da aprovação (no mínimo 10 caracteres) e clique em "Confirmar aprovação". O pedido passa para "Processando", e o sistema monta um PDF com os dados e manda por e-mail. Se o envio de e-mails do sistema não estiver configurado, ou se o cliente não tiver e-mail, o pedido fica em "Revisão pendente" e aparece o botão "Baixar PDF" para você entregar o arquivo. O link do botão vale por 72 horas.

## Atender um pedido para apagar os dados

**Objetivo:** Abrir um pedido de apagamento que ficou parado, entender o que a aprovação apaga e ler um pedido já concluído.

**Quem pode:** admin

**Palavras de busca:** cliente pediu para apagar os dados, anonimizar cliente lgpd, excluir dados do paciente, pedido lgpd vencendo, direito ao esquecimento

1. **O pedido atrasado** — A Juliana Castro pediu para ser apagada do cadastro. Normalmente o sistema faz o apagamento sozinho assim que o pedido chega. Este ficou parado em "Recebido" e já passou do prazo (selo "Vencido"), então precisa de alguém hoje. Clique em "Ver" na linha dele (cliente 48213907).
   - Rota: `/app/lgpd/requests`
2. **O prazo vencido** — O tipo é "Anonimização cliente" e o prazo de 15 dias úteis já acabou. Na "Linha do tempo SLA", a barra está cheia e vermelha, e o canto direito diz há quantos dias o prazo passou ("d em atraso"). As etapas de um apagamento são outras: "Processamento" (D+10) e "Anonimização concluída" (D+15), contadas em dias corridos. A bolinha fica verde quando o dia da etapa chega, mesmo que nada tenha sido feito: quem diz se o pedido foi atendido é o selo "Recebido" ao lado do código.
3. **Aprovar a anonimização** — Antes de aprovar, use "Pré-visualizar dados" para conferir que é a pessoa certa: a janela de aprovação não mostra o nome. Depois clique em "Aprovar anonimização", na janela "Aprovar anonimização de contato", escreva no campo "Justificativa" o motivo, com pelo menos 10 caracteres, e clique em "Confirmar aprovação". Isso não tem volta. O sistema troca o nome do cliente por "Cliente Anonimizado" seguido de um código e apaga o telefone, o e-mail e o conteúdo das conversas, mensagens e arquivos dele. As datas ficam guardadas, para os seus números continuarem certos. O pedido passa para "Processando" e, quando termina, vira "Concluído".
4. **Um pedido já concluído** — Este pedido de apagamento foi atendido há 3 dias. O selo diz "Concluído", o quadro "Detalhes" mostra quando terminou em "Concluído em", e a "Trilha de auditoria" guarda as três etapas: a chegada pela loja ("lgpd.redact_received"), a aprovação ("lgpd.manually_approved", com o começo do código de quem aprovou depois de "por") e o apagamento terminado ("lgpd.redact_completed"). A "Linha do tempo SLA" continua contando os dias mesmo depois de concluído: quem diz que o pedido foi atendido é o selo "Concluído" e a data em "Concluído em".
   - Rota: `/app/lgpd/requests/9e06c2f8-7d35-4b81-b6e4-be7000000004`

