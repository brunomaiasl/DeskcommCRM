# Radar

- **Tela:** `/app/radar`
- **Resumo:** A lista dos clientes que esfriaram e ainda estão em aberto, para você agir antes de perder a venda.
- **Fonte:** `curso/licoes/radar.json`

## Lendo o Radar

**Objetivo:** Entender o que entra no Radar e o que querem dizer Crítico, Em risco e Em voo.

**Quem pode:** admin

**Palavras de busca:** radar, cliente esfriou, parado, sem resposta, crítico, em risco, em voo, venda parada

1. **O que aparece aqui** — O Radar mostra os negócios ainda abertos no funil em que ninguém mexeu nem falou com o cliente há mais de 24 horas. Mensagem do cliente não conta: cliente escrevendo e ninguém respondendo é justamente o risco. As três etiquetas no alto contam quantos negócios estão em cada nível. O quadro amarelo acima delas é outra lista, a dos clientes esperando sem nada combinado; ele tem uma lição só para ele, "Demandas sem próximo passo".
   - Rota: `/app/radar`
2. **Crítico: parado há 3 dias ou mais** — Cada linha é um negócio: o nome dele, o cliente e há quanto tempo está parado. "Crítico" quer dizer 3 dias ou mais sem ninguém agir. O aviso "Sem próximo passo agendado" diz que não há nenhum retorno do assistente nem compromisso marcado com esse cliente. Os críticos ficam no topo e, dentro de cada nível, o mais esquecido vem primeiro.
3. **Em risco: entre 1 e 3 dias** — "Em risco" é o negócio parado há mais de 24 horas e menos de 3 dias. Ainda dá tempo de retomar com calma, mas ele vira crítico se continuar esquecido.
4. **Em voo: o assistente vai voltar a falar** — "Em voo" é o negócio parado, mas com um retorno já marcado pelo assistente. A linha mostra quando ele pretende voltar a falar com o cliente, como "Assistente retorna em 2d". Ele não está esquecido: só fique de olho, porque o retorno só sai se o WhatsApp estiver conectado e o assistente estiver ligado.

## Quem está cuidando de cada cliente

**Objetivo:** Saber, pela linha do Radar, se o negócio tem alguém cuidando ou se está largado.

**Quem pode:** admin

**Palavras de busca:** quem cuida do cliente, sem dono, com atendente, responsável, agente de IA, assistente

1. **Quatro situações** — No fim da segunda linha de cada negócio aparece quem cuida dele. "Sem dono": ninguém. "Com atendente": uma pessoa da equipe. "Assistente na conversa": o atendimento automático está respondendo esse cliente. "Agente:" seguido de um nome: o negócio é de um agente de IA.
   - Rota: `/app/radar`
2. **Quando aparece o botão "Assumir"** — O botão "Assumir" aparece quando o cliente tem conversa no WhatsApp e nem a conversa nem o negócio estão com uma pessoa da equipe. Na Sandra, ninguém cuida. Na Renata, quem responde é o atendimento automático. No Gustavo, o negócio é do agente de IA: assumir traz a conversa para você e cala o atendimento automático nela, mas o negócio continua em nome do agente. No Paulo não aparece, porque ele já está com uma atendente. No Marcos também não: ele ainda não conversou pelo WhatsApp.

## Assumir um cliente pelo Radar

**Objetivo:** Trazer para você um cliente esquecido e ir direto para a conversa com ele.

**Quem pode:** admin

**Palavras de busca:** assumir cliente, pegar atendimento, resgatar cliente, cliente esquecido, responder cliente parado

1. **Clique em "Assumir"** — A Sandra está crítica e ninguém cuida dela. Clique em "Assumir" na linha dela para trazer a conversa para você.
   - Rota: `/app/radar`
2. **Agora a conversa é sua** — A linha passa a mostrar "Com atendente" e o botão some. A conversa fica com você e o atendimento automático para de responder nela. Se o negócio não tinha responsável, você passa a ser o responsável. A Sandra continua no Radar até alguém falar com ela. Para responder, clique no nome do negócio.
3. **A conversa da Sandra** — A Inbox abre na conversa com a Sandra. No alto, "Automático pausado — alguém assumiu" confirma que o assistente parou de responder, e o seu nome aparece abaixo do dela. Leia o que já foi dito e responda.

## Para onde cada linha leva

**Objetivo:** Saber o que abre quando você clica num negócio do Radar, com e sem conversa no WhatsApp.

**Quem pode:** admin

**Palavras de busca:** abrir negócio, abrir conversa, ver cliente, clicar no radar, cliente sem conversa, funil

1. **Cliente com conversa** — Clique na linha, fora do botão "Assumir", para abrir o cliente. Quando ele já conversou pelo WhatsApp, como a Renata, a Inbox abre direto na conversa dela.
   - Rota: `/app/radar`
2. **A conversa da Renata** — Aqui está a conversa com a Renata. A última mensagem foi do assistente, há 30 horas, e ela não respondeu. O botão "Assumir" no alto também existe aqui, para tirar a conversa do automático. Para voltar ao Radar, use o item "Radar" no menu da esquerda.
3. **Cliente sem conversa** — O Marcos ainda não conversou pelo WhatsApp. Por isso a linha dele não tem "Assumir". Clique nela para abrir o negócio no funil.
   - Rota: `/app/radar`
4. **O negócio no funil** — O funil abre com os detalhes do negócio do Marcos na tela: valor, etapa, responsável e os dados do contato. Daqui você edita o negócio sem procurá-lo no quadro. Como ele ainda não conversou, "Abrir conversa no Inbox" cria a conversa com ele e leva você até ela, sem mandar nenhuma mensagem.

## Demandas sem próximo passo

**Objetivo:** Achar o cliente que espera sem nada combinado e tirá-lo do Radar anotando o próximo passo.

**Quem pode:** admin

**Palavras de busca:** sem próximo passo, demanda aberta, cliente esperando, nada combinado, quadro amarelo, próximo passo

1. **O quadro amarelo** — O quadro amarelo no alto lista os clientes com um pedido em aberto em que ninguém anotou o que acontece a seguir. Na mesma linha, à direita, aparece há quantas horas o pedido está aberto. Clique no nome para abrir a conversa.
   - Rota: `/app/radar`
2. **O pedido da Fernanda** — A Inbox abre na conversa da Fernanda. Na ficha do cliente, à direita, "Demandas abertas" mostra o pedido dela com a frase "Sem próximo passo definido". Clique em "Marcar próximo passo". A mensagem com borda vermelha na conversa é outro assunto: um envio que falhou, que se manda de novo em "Tentar de novo".
3. **Escreva o que vem a seguir** — Escreva o que vai acontecer a seguir e clique em "Salvar".
4. **Próximo passo anotado** — A demanda agora mostra o próximo passo. Volte ao Radar pelo item "Radar" do menu da esquerda.
5. **A Fernanda saiu do quadro** — De volta ao Radar, a Fernanda sai do quadro amarelo: ela já tem um próximo passo anotado. Se ela ainda aparecer, espere até um minuto ou atualize a página. Os negócios parados continuam na lista até alguém agir em cada um: anotar o próximo passo da demanda não tira o negócio da lista.
   - Rota: `/app/radar`

