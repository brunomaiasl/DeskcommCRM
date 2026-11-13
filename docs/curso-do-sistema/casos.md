# Casos

- **Tela:** `/app/ai/cases`
- **Resumo:** Os pedidos que a IA não consegue resolver sozinha e deixa para a equipe decidir, enquanto continua falando com o cliente.
- **Fonte:** `curso/licoes/casos.json`

## Conhecendo a tela de Casos

**Objetivo:** Entender o que é um caso, onde fica a lista e como ler cada linha.

**Quem pode:** admin

**Palavras de busca:** casos, o que é um caso, IA travou, IA pediu ajuda, pendências da IA, fila de casos

1. **O que aparece aqui** — Às vezes a IA recebe um pedido que só alguém da equipe resolve: um desconto, um horário fora da agenda, uma dúvida do convênio. Nesses momentos ela abre um caso nesta tela e continua conversando com o cliente enquanto espera a sua resposta. À esquerda fica a lista de casos. À direita aparecem os detalhes do caso que você abrir.
   - Rota: `/app/ai/cases`
2. **Lendo uma linha da lista** — Cada linha mostra o assunto do caso, escrito pela IA, e um selo com a situação. "Aguardando você" quer dizer que a IA está esperando uma decisão da equipe. "Aguardando o cliente" quer dizer que a equipe já pediu uma informação e agora é o cliente que precisa responder. Embaixo vêm o tipo do pedido (como "Pagamento" ou "Horário"), o nome do cliente e há quanto tempo o caso foi aberto. Os casos mais novos ficam no alto.
3. **Abertos e Concluídos** — A aba "Abertos" mostra os casos que ainda não terminaram, e o número entre parênteses diz quantos são. A aba "Concluídos" guarda os que já acabaram, com três desfechos possíveis: "Concluído" (a equipe ou a IA resolveu), "Virou atendimento humano" (a conversa passou para uma pessoa da equipe) e "Cancelado" (o pedido deixou de existir).

## Abrindo um caso

**Objetivo:** Abrir um caso e entender o que o cliente pediu, por que a IA travou e o que já aconteceu.

**Quem pode:** admin

**Palavras de busca:** abrir caso, detalhes do caso, por que a IA travou, o que o cliente precisa, linha do tempo, ver conversa do caso

1. **Quem é o cliente** — Clique numa linha da lista para ver o caso à direita. No alto aparecem o nome e o telefone do cliente e o selo com a situação do caso. O link "Ver conversa" abre a conversa desse cliente na Inbox, para você ler tudo o que ele e a IA já falaram.
   - Rota: `/app/ai/cases`
2. **O pedido e o motivo** — Dois quadros resumem o caso. "O que o cliente precisa" conta o pedido com as palavras da IA. "Por que a IA travou" explica o que impediu a IA de resolver sozinha. Aqui, o Pedro quer desconto no Pix, e a IA não pode prometer um preço diferente sem a equipe confirmar.
3. **A linha do tempo** — No fim do caso fica a "Linha do tempo": tudo o que aconteceu, do mais antigo para o mais novo, com há quanto tempo foi. Aqui ela mostra que a IA abriu o caso e depois registrou que avisou o Pedro de que a recepção confirma o valor. Quando alguém da equipe responde, a resposta também entra nesta lista.

## Respondendo um caso

**Objetivo:** Escolher o que fazer com um caso que espera a equipe e mandar a decisão para a IA.

**Quem pode:** admin

**Palavras de busca:** responder caso, resolver caso, concluir caso, passar para humano, pedir informação ao cliente, decisão da equipe

1. **Três caminhos** — No quadro "O que você quer fazer?" você escolhe o que acontece com o caso. "Concluí": você resolveu, e a IA avisa o cliente e encerra o assunto. "Preciso de info do cliente": a IA pergunta ao cliente o que faltou, e o caso volta para você quando ele responder. "Não consigo — passar pra humano": a IA sai da conversa e o cliente passa a ser atendido por uma pessoa da equipe.
   - Rota: `/app/ai/cases`
2. **Escolha e escreva** — Clique na opção e escreva no campo abaixo o que foi decidido. Com "Concluí" ou "Preciso de info do cliente", quem lê o que você escreve é a IA, e é com isso que ela responde o cliente. Então escreva a decisão de forma clara, com valores e horários. Com "Não consigo — passar pra humano", o texto vira um recado para a pessoa da equipe que vai assumir a conversa. Aqui, a recepção liberou 5% de desconto no Pix.
3. **Enviar a decisão** — O botão "Enviar" só funciona com uma opção marcada e o campo preenchido. Ao enviar, aparece o aviso "Resposta registrada para processamento.". Com "Concluí", o caso vai para a aba "Concluídos" e a IA escreve para o cliente (para isso, a IA e o WhatsApp precisam estar ligados). Com "Não consigo — passar pra humano", ele também vai para "Concluídos" e a conversa passa para a equipe. Com "Preciso de info do cliente", ele continua em "Abertos", agora como "Aguardando o cliente".

## Tirando dúvidas com a IA antes de decidir

**Objetivo:** Conhecer a conversa interna com a IA sobre um caso e saber o que fazer quando ela ainda não está ligada.

**Quem pode:** admin

**Palavras de busca:** perguntar para a IA sobre o caso, conversar sobre o caso, conversa interna, nenhum provedor de IA configurado, IA não responde no caso, configurar provedor de IA

1. **Conversar sobre o caso** — Abaixo do quadro de resposta fica "Conversar sobre o caso". Ali a equipe faz perguntas à IA que abriu o caso antes de decidir, como "Por que a IA não resolveu sozinha?" ou "O que o cliente já tentou?". É uma conversa interna: o cliente não vê nada, e a IA ali não manda mensagem nem muda o caso. As perguntas dos colegas também aparecem nesse quadro, em alguns segundos. Enquanto a IA não estiver ligada, esse quadro mostra um aviso no lugar do campo de pergunta, e o próximo passo explica o porquê.
   - Rota: `/app/ai/cases`
2. **Quando a IA ainda não está ligada** — Enquanto nenhuma chave de IA estiver cadastrada, no lugar do campo de pergunta aparece o aviso "Nenhum provedor de IA está configurado" e o link "Abrir IA › Provedores", que leva para a tela onde quem administra liga a IA.
3. **A tela de provedores** — O link abre a tela "Provedores de IA", onde quem administra escolhe qual IA atende cada parte do sistema. Enquanto falta a chave, ela avisa que você ainda não cadastrou a chave da IA principal, e o link "Cadastrar uma chave" leva para onde se cadastra. Só gerentes e administradores entram nela. Depois que a IA estiver ligada, volte em "Casos" e o campo de pergunta aparece no lugar do aviso.

## Casos esperando o cliente ou abertos pelo sistema

**Objetivo:** Reconhecer um caso que espera o cliente e um caso que o sistema abriu sozinho.

**Quem pode:** admin

**Palavras de busca:** aguardando o cliente, caso parado, aberto automaticamente, sistema abriu caso, não consigo responder caso, botões desativados no caso

1. **Caso aguardando o cliente** — Quando a equipe escolhe "Preciso de info do cliente", o caso fica com o selo "Aguardando o cliente". Nessa situação as opções ficam apagadas e não dá para responder: a vez é do cliente. Quando ele responder, a IA leva a resposta para o caso e ele volta a ficar "Aguardando você".
   - Rota: `/app/ai/cases`
2. **O que a equipe pediu** — A linha do tempo mostra o pedido da equipe ("Você pediu uma informação ao cliente") com o texto que foi escrito, e logo depois "A IA perguntou ao cliente". Assim qualquer pessoa da equipe sabe em que pé está o caso sem precisar perguntar. Atenção: a tela escreve "Você" para qualquer pessoa da equipe que decidiu, mesmo que não tenha sido você.
3. **Caso aberto automaticamente** — Alguns casos trazem o selo "Aberto automaticamente". Isso acontece quando a IA disse ao cliente que ia chamar alguém da equipe, mas não abriu o caso. O sistema percebe e abre o caso por ela, para o cliente não ficar esperando à toa. Você responde esse caso do mesmo jeito que os outros.

## Consultando casos encerrados

**Objetivo:** Ver como cada caso terminou e o que a equipe decidiu.

**Quem pode:** admin

**Palavras de busca:** casos concluídos, histórico de casos, caso cancelado, virou atendimento humano, como o caso foi resolvido, casos antigos

1. **Abrindo um caso encerrado** — Na aba "Concluídos", clique num caso para ver como ele terminou. O selo no alto diz o desfecho, e o quadro "O que você quer fazer?" explica por que não aceita mais resposta. Neste caso, que foi concluído, aparece "Este caso já foi concluído.". As opções ficam apagadas, porque não há mais o que decidir.
   - Rota: `/app/ai/cases`
2. **Como o caso foi resolvido** — A linha do tempo conta a história do caso. Aqui a IA abriu o caso, a equipe resolveu ("Você concluiu o caso", com o que foi escrito para a IA) e o caso ficou "Concluído". O texto da equipe é o que a IA recebe para responder o Lucas. A tela escreve "Você" para qualquer pessoa da equipe que decidiu.
3. **Um caso que virou atendimento humano** — Este caso terminou com "Não consigo — passar pra humano". A linha do tempo mostra "Você decidiu passar para atendimento humano" (a tela diz "Você" para quem da equipe tomou a decisão) com o motivo, e depois "Virou atendimento humano". A partir daí a conversa com a Fernanda segue na Inbox, com uma pessoa da equipe.
4. **Um caso cancelado pela IA** — A própria IA também encerra um caso quando o pedido deixa de existir. Aqui o Roberto achou o recibo sozinho: a IA anotou o motivo ("A IA registrou o que aconteceu") e o caso ficou "Cancelado", sem ninguém da equipe precisar mexer.

