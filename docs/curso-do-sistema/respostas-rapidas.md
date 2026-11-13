# Respostas rápidas

- **Tela:** `/app/templates`
- **Resumo:** Textos, imagens e áudios prontos que você e a equipe usam na Inbox com um clique, para não digitar a mesma coisa toda vez.
- **Fonte:** `curso/licoes/respostas-rapidas.json`

## Conhecendo as respostas rápidas

**Objetivo:** Entender o que cada linha da lista mostra: de quem é a resposta, se leva imagem ou áudio e o que dá para fazer com ela.

**Quem pode:** admin

**Palavras de busca:** respostas rápidas, mensagens prontas, textos salvos, modelos de mensagem, scripts de atendimento, resposta padrão, onde ficam as respostas prontas

1. **A lista de respostas prontas** — Respostas rápidas são mensagens que você salva uma vez e usa sempre que precisar, sem digitar de novo: horários, endereço, preparo para exame. Cada linha mostra o nome da resposta e o começo do texto. Elas aparecem na Inbox, logo acima do campo de mensagem, na mesma ordem desta lista.
   - Rota: `/app/templates`
2. **Da equipe ou só sua** — O selo ao lado do nome diz de quem é a resposta. "Compartilhado" é da equipe: todos usam. "Pessoal" é só de quem criou: aqui, a "Confirmação de consulta" é da Helena, que é quem está usando o sistema nesta tela, e só ela pode mudá-la. Os colegas não veem as respostas pessoais uns dos outros.
3. **Respostas com imagem ou áudio** — Uma resposta rápida pode levar imagens junto com o texto, ou ser só um áudio. O selo "Imagens" mostra quantas imagens ela leva. O selo "🎧 Áudio" marca a resposta que é um áudio gravado; no lugar do texto aparece "Resposta rápida de áudio".
4. **Os botões de cada linha** — À direita de cada linha ficam o lápis, que abre a resposta para editar, e a lixeira, que apaga. Os pontinhos à esquerda servem para mudar a ordem: clique neles e arraste a linha para cima ou para baixo. Esses botões só aparecem nas respostas que você pode mudar.

## Criar uma resposta rápida

**Objetivo:** Salvar um texto pronto, com o nome do cliente trocado sozinho, e encontrá-lo na Inbox.

**Quem pode:** admin

**Palavras de busca:** criar resposta rápida, nova mensagem pronta, salvar texto para reutilizar, colocar nome do cliente na mensagem, atalho de mensagem, compartilhar resposta com a equipe

1. **Começar uma nova** — Clique em "Nova resposta rápida", no alto da tela. Abre uma janela para escrever a resposta.
   - Rota: `/app/templates`
2. **Nome e mensagem** — Em "Título" vai o nome curto que aparece no botão da Inbox. Em "Mensagem" vai o texto que o cliente vai receber. Escreva {{primeiro_nome}} onde quiser o primeiro nome do cliente, ou {{nome}} para o nome completo: na Inbox, ele é trocado sozinho pelo nome de quem está na conversa.
3. **Atalho e equipe** — O "Atalho (opcional)" é uma palavra curta para achar a resposta rápido: na Inbox, com o campo de mensagem vazio, digite / e o atalho (aqui, /pix) e clique na resposta que aparece na lista. Ligue "Compartilhar com a equipe" para todos usarem a resposta; desligado, ela fica só para você. Depois de criada, isso não muda mais. No fim, clique em "Criar resposta rápida".
4. **A resposta nova entra no topo** — Ao clicar em "Criar resposta rápida", a janela fecha e a resposta aparece no alto da lista, com o selo "Compartilhado". Toda resposta nova entra em primeiro lugar; para mudar a posição, arraste-a pelos pontinhos.
5. **Pronta para usar na Inbox** — Abra uma conversa na Inbox: a resposta nova já está entre os botões acima do campo de mensagem. Um clique coloca o texto no campo, com o nome do cliente já trocado. Atenção: ele substitui o que você já tinha escrito. Nada é enviado sem você conferir e clicar em enviar. Se os botões estiverem apagados, a conversa ainda não pode receber resposta (por exemplo, falta assumi-la).
   - Rota: `/app/inbox`

## Respostas com imagem ou áudio

**Objetivo:** Saber como pôr imagens numa resposta rápida, criar uma resposta de áudio e conferir o que já está salvo.

**Quem pode:** admin

**Palavras de busca:** resposta rápida com imagem, mandar foto pronta, resposta de áudio, áudio pronto para o cliente, anexar imagem na resposta, formato de áudio aceito

1. **Imagens junto com o texto** — Na janela "Nova resposta rápida", abaixo do atalho, fica a parte "Imagens (opcional)". Clique em "Adicionar imagem" e escolha uma foto do seu computador: vale JPG ou PNG, até 5 MB cada, no máximo 5 imagens. Na Inbox, a imagem entra junto com o texto, e você vê a prévia antes de enviar.
   - Rota: `/app/templates`
2. **Uma resposta que é um áudio** — No alto da janela, em "Tipo de resposta rápida", clique em "Áudio". O campo de mensagem dá lugar a "Arquivo de áudio": escolha o arquivo gravado (OGG, MP3, AAC, AMR ou WAV, até 16 MB). A resposta de áudio não tem texto: na Inbox, o clique abre a janela "Enviar anexo" com o arquivo pronto, e você confere e clica em "Enviar". Para ouvir antes, use o lápis aqui nesta tela.
3. **Conferir a imagem salva** — Para ver o que uma resposta já leva, clique no lápis dela. No "Cartão da clínica", a imagem aparece em miniatura abaixo de "Imagens (opcional)". O X no canto tira a imagem, mas nada muda até você clicar em "Salvar": "Cancelar" devolve tudo como estava.
   - Rota: `/app/templates`
4. **Ouvir o áudio salvo** — Numa resposta de áudio, o lápis abre a janela com o tocador do áudio atual: dê o play para ouvir antes de usar (o tempo do áudio aparece depois do play). Para trocar o áudio, escolha outro arquivo em "Arquivo de áudio" e clique em "Salvar".
   - Rota: `/app/templates`

## Editar, mudar a ordem e excluir

**Objetivo:** Manter a lista em dia: corrigir um texto, deixar as mais usadas no começo e apagar o que não serve mais.

**Quem pode:** admin

**Palavras de busca:** editar resposta rápida, mudar texto da mensagem pronta, mudar ordem das respostas, arrastar resposta, apagar resposta rápida, excluir mensagem pronta

1. **Corrigir um texto** — Clique no lápis da resposta que quer mudar. A janela "Editar resposta rápida" abre com tudo preenchido: altere o que precisar e clique em "Salvar". O botão "Compartilhar com a equipe" fica esmaecido, sem como clicar, porque não dá para mudar isso depois de criada.
   - Rota: `/app/templates`
2. **Mudar a ordem** — As respostas mais usadas ficam melhor no começo, porque a Inbox mostra os botões na ordem desta lista. Clique nos pontinhos à esquerda de uma resposta e arraste para cima ou para baixo. Aqui, a "Confirmação de consulta" foi levada para o primeiro lugar.
3. **Excluir uma resposta** — Clique na lixeira da resposta que não serve mais. Antes de apagar, aparece a pergunta "Excluir esta resposta rápida?": clique em "Excluir" para confirmar ou em "Cancelar" para desistir. Não dá para desfazer, e as imagens ou o áudio dela são apagados junto.
   - Rota: `/app/templates`
4. **Saiu da lista** — Depois de confirmar, o "Preparo para exame de sangue" some desta lista e dos botões da sua Inbox. Para os colegas, ele some assim que a Inbox deles recarregar.

## O que o atendente vê

**Objetivo:** Entender o que muda quando quem entra na tela é um atendente, e não um gerente ou administrador.

**Quem pode:** agent

**Palavras de busca:** atendente não consegue editar resposta, permissão respostas rápidas, por que não aparece o lápis, resposta pessoal do atendente, quem pode compartilhar resposta

1. **A lista vista pela Ana** — A Ana é atendente. Ela vê e usa todas as respostas compartilhadas, mas não tem lápis, lixeira nem pontinhos nelas: só gerente e administrador mudam o que é da equipe. A "Confirmação de consulta", que é pessoal da Helena, não aparece para ela.
   - Rota: `/app/templates`
2. **O que a Ana cria é só dela** — Na janela "Nova resposta rápida" da Ana não existe a opção "Compartilhar com a equipe": tudo o que um atendente cria fica pessoal. Para uma resposta valer para todos, peça a um gerente ou administrador que a crie.
3. **A resposta pessoal da Ana** — Depois de criada, a resposta aparece no alto da lista com o selo "Pessoal". Nela a Ana tem o lápis, a lixeira e os pontinhos: é dela, ela pode mudar. Os outros atendentes e o gerente não veem esta resposta.

