# Inbox (Admin)

- **Tela:** `/admin/inbox`
- **Resumo:** Onde quem cuida do servidor lê as conversas de todas as empresas da instalação, sem responder, para dar suporte.
- **Fonte:** `curso/licoes/admin-inbox.json`

## Conhecendo a Inbox do Admin

**Objetivo:** Entender para que serve a Inbox do Admin e ler o que cada linha da lista mostra.

**Quem pode:** admin

**Palavras de busca:** inbox do admin, ver conversas de todas as empresas, suporte aos clientes da instalação, conversas de outra empresa, caixa de entrada geral, ler whatsapp das empresas

1. **Todas as conversas, de todas as empresas** — A "Inbox" do Admin junta numa lista só as conversas de todas as empresas do servidor. No Admin, cada empresa se chama "tenant". Ela serve para suporte: você lê o que aconteceu num atendimento sem precisar entrar na empresa. Aqui não dá para responder; é só leitura.
   - Rota: `/admin/inbox`
2. **O que cada linha mostra** — Cada linha é uma conversa. Em cima vem o nome do cliente e quando chegou a última mensagem: a hora, se foi hoje; há quantos dias, se foi nesta semana; ou a data, se foi antes. Logo abaixo, um selo com um prédio diz de qual empresa é a conversa. Na última linha fica o começo da última mensagem e, quando há, um número com as mensagens ainda não lidas.
3. **O nome curto da empresa** — Pare o mouse em cima do selo da empresa para ver o nome curto dela no sistema, o mesmo que aparece ao lado do nome na página da empresa. Ajuda quando duas empresas têm nomes parecidos.
4. **A ordem da lista** — A lista mistura as empresas e põe no alto quem escreveu por último. A ordem segue a última mensagem do cliente, e não a da empresa. Aqui, a Rafaela, da Rede Sorriso Pleno, vem antes do Pedro, da Clínica Bem Viver. A lista traz 30 conversas por vez; quando há mais, aparece "Carregar mais" no fim.

## Lendo a conversa de uma empresa

**Objetivo:** Abrir uma conversa, ler as mensagens e os dados do cliente e chegar à página da empresa.

**Quem pode:** admin

**Palavras de busca:** abrir conversa no admin, ler conversa de outra empresa, ver mensagens do cliente, por que não consigo responder no admin, somente leitura, dados do contato e da empresa

1. **Abrindo a conversa** — Clique numa linha para abrir a conversa no meio da tela. No alto aparecem o nome do cliente, a situação da conversa e a empresa. A situação aparece com a palavra do sistema, em inglês: "Open" é a conversa que ainda ninguém pegou; "Ai_handling", com a IA; "Claimed", com um atendente; "Closed", encerrada.
   - Rota: `/admin/inbox`
2. **As mensagens** — As mensagens aparecem na ordem em que foram trocadas, como na Inbox da empresa. As do cliente ficam à esquerda; as da empresa ficam à direita, com o selo de quem mandou: "IA" quando foi a inteligência artificial, "Atendente" quando foi alguém da equipe pelo sistema, "Celular" quando responderam pelo WhatsApp do celular. Aqui aparecem só as 50 mensagens mais recentes; para ver as anteriores, é preciso entrar na empresa com "Acompanhar organização".
3. **Os dados do cliente** — À direita, "Contato" mostra o nome e o telefone do cliente. O e-mail aparece com parte escondida, para proteger o cliente. Se o cliente pediu para não receber mais mensagens, aparece o selo "Bloqueado".
4. **De qual empresa é** — Embaixo, "Tenant" mostra a empresa dona da conversa: o nome, o nome curto ("Slug") e a situação dela no servidor ("Active" quer dizer ativa). O link "Abrir tenant" leva para a página dessa empresa.
5. **Agir dentro da empresa** — Na página da empresa fica o botão "Acompanhar organização". Ele abre a confirmação "Iniciar acompanhamento?". Marque "Somente leitura" se quiser só olhar, sem poder mudar nada; deixe desmarcado para poder agir como alguém da equipe. Ao clicar em "Confirmar e entrar", você cai na Inbox da empresa com a sua identidade de administrador, por até uma hora, e tudo o que fizer fica registrado no seu nome. Os detalhes estão no módulo "Tenants".

## Buscando e filtrando conversas

**Objetivo:** Achar uma conversa pelo que foi escrito nela e mostrar só as conversas abertas.

**Quem pode:** admin

**Palavras de busca:** buscar conversa no admin, procurar mensagem de cliente, filtrar conversas abertas, achar atendimento de uma empresa, pesquisar pelo texto da mensagem

1. **Buscar pelo que o cliente escreveu** — Digite uma palavra em "Buscar mensagem..." e a lista mostra só as conversas cuja última mensagem tem essa palavra. A busca não olha o nome do cliente nem as mensagens mais antigas. Aqui, "encaixe" achou o Marcos, da Rede Sorriso Pleno.
   - Rota: `/admin/inbox`
2. **Filtrar pela situação** — Abaixo da busca fica o filtro de situação, que começa em "Todos". Clique nele para ver as opções. "Aberto" mostra as conversas abertas. "Pendente" e "Resolvido" são situações de uma versão antiga do sistema e, numa instalação de hoje, costumam voltar vazias.
   - Rota: `/admin/inbox`
3. **Só as conversas abertas** — "Com "Aberto" escolhido, ficam só as conversas que ainda ninguém pegou, nem a IA nem um atendente, de todas as empresas. Saem as que estão com a IA, as que estão com um atendente, as encerradas e as arquivadas. Para ver tudo de novo, volte o filtro para "Todos"." Rótulo do segundo destaque: "Aberta, da Rede Sorriso Pleno".

