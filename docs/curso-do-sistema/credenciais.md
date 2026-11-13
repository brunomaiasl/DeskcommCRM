# Credenciais

- **Tela:** `/app/ai/credentials`
- **Resumo:** Onde você guarda a chave da sua conta de inteligência artificial, a que os agentes usam para pensar, e confere se ela está funcionando.
- **Fonte:** `curso/licoes/credenciais.json`

## Conhecendo a tela de Credenciais

**Objetivo:** Entender o que é uma chave de IA, onde ela fica guardada e o que cada cartão da tela mostra.

**Quem pode:** admin

**Palavras de busca:** credenciais, chave da ia, chave de api, onde coloco a chave, chave da anthropic, chave da openai, conta de inteligência artificial

1. **Credenciais fica no hub de IA** — A tela Credenciais não tem atalho próprio no menu lateral. No grupo "Agente de IA", clique em "Ver tudo em IA". Na parte "Montar o agente" está o cartão "Credenciais". É ali que você guarda a chave da sua conta de inteligência artificial (IA), a que os agentes usam para pensar e responder.
   - Rota: `/app/ai`
2. **O que é uma chave de IA** — Os agentes usam uma inteligência artificial contratada de uma empresa, chamada provedor, como a Anthropic (Claude) ou a OpenAI (GPT). A conta nesse provedor é sua: você contrata direto com ele, e a cobrança vai para essa conta. Para o sistema usar a sua conta, o provedor entrega uma chave: um código longo, que funciona como uma senha. Você cola a chave aqui. Ela fica guardada criptografada e nunca mais aparece inteira na tela, nem para você.
   - Rota: `/app/ai/credentials`
3. **Um grupo para cada provedor** — As chaves aparecem agrupadas por provedor, com o nome dele em cima de cada grupo. Cada cartão é uma chave. No alto do cartão fica o nome que você deu a ela e, logo abaixo, só os quatro últimos caracteres da chave, para você reconhecer qual é. No canto, um selo diz se a chave está funcionando; a próxima lição explica cada selo. "Adicionar credencial" cadastra mais uma chave.
4. **Modelos, uso e os botões do cartão** — "Modelos" conta quantos modelos de IA o provedor liberou para essa chave na última conferência. "Em uso por" conta quantas versões de agente estão ligadas a ela, contando rascunhos e versões antigas; o agente escolhe a chave no campo "Chave de acesso" do editor dele. Embaixo ficam três botões: o lápis edita a chave, as setas em círculo testam a chave de novo e a lixeira exclui.

## O que o selo de cada chave quer dizer

**Objetivo:** Saber se uma chave está funcionando e o que fazer quando ela é recusada ou ainda não foi conferida.

**Quem pode:** admin

**Palavras de busca:** chave inválida, chave validada, não validada, chave recusada, testar a chave, revalidar credencial, ia parou de responder

1. **Validada: a chave funciona** — Toda chave cadastrada passa por uma conferência: o sistema pergunta ao provedor se ela vale. "Validada", em verde, quer dizer que o provedor aceitou a chave. A IA só usa chave validada.
   - Rota: `/app/ai/credentials`
2. **Inválida: a conferência falhou** — "Inválida", em vermelho, quer dizer que a conferência falhou. A frase vermelha embaixo do nome diz o motivo. Aqui o provedor recusou a chave: por exemplo, ela foi copiada pela metade ou apagada no site do provedor. O link "Onde pegar a chave" abre a página do provedor onde se cria uma chave nova. Depois, troque a chave pelo lápis, como mostra a lição "Trocar, renomear ou excluir uma chave".
3. **Não validada: a conferência não terminou** — Logo depois de salva, a chave aparece como "Validando…" enquanto o sistema confere com o provedor, e a tela se atualiza sozinha. Se o resultado não chega em dois minutos, o selo vira "Não validada": a conferência foi interrompida no meio. Clique nas setas em círculo, "Revalidar credencial", para testar a chave de novo na hora. O resultado aparece no selo.

## Cadastrar uma chave nova

**Objetivo:** Escolher o provedor, colar a chave e guardá-la para os agentes usarem.

**Quem pode:** admin

**Palavras de busca:** cadastrar chave, adicionar credencial, colar a chave, nova chave de ia, onde pegar a chave, configurar a ia, escolher provedor

1. **Abrir o formulário** — Antes, entre no site do provedor que você contratou, crie uma chave e copie-a inteira. Depois, volte aqui e clique em "Adicionar credencial".
   - Rota: `/app/ai/credentials`
2. **Escolher o provedor** — Em "Provedor", escolha a empresa de IA que você contratou. O formulário já abre com a Anthropic (Claude). Embaixo do campo aparece uma frase curta dizendo quando vale a pena escolher aquele provedor.
3. **Os provedores da lista** — A lista traz todos os provedores que o sistema sabe usar. Os de cima podem conversar com o cliente. O último, "Jev (TypeSafe AI)", não conversa: só toma decisões rápidas, como perceber se o cliente está irritado. Aqui escolhemos a Anthropic (Claude).
4. **Nome e chave** — Em "Nome", escreva um nome que ajude a reconhecer a chave depois. Ele é opcional: em branco, a chave recebe o nome do provedor. Em "Chave", cole a chave que você copiou; ela aparece como bolinhas. Se ainda não tem a chave, "Onde pegar a chave" abre a página do provedor onde ela é criada.
5. **Salvar e conferir** — Clique em "Salvar e validar". A chave é guardada criptografada e o formulário fecha. Em seguida o sistema confere a chave com o provedor, sem você precisar esperar: o cartão novo aparece com "Validando…" e, em alguns segundos, passa para "Validada" ou "Inválida". "Cancelar" fecha o formulário sem guardar nada.

## Trocar, renomear ou excluir uma chave

**Objetivo:** Trocar uma chave recusada sem desligar os agentes, dar outro nome a uma chave e apagar a que não serve mais.

**Quem pode:** admin

**Palavras de busca:** trocar a chave, editar credencial, renomear chave, excluir chave, apagar credencial, chave vazou, chave nova no lugar da antiga

1. **Abrir a edição** — A chave antiga da recepção foi recusada pelo provedor. Para trocá-la, clique no lápis, "Editar credencial", no cartão dela.
   - Rota: `/app/ai/credentials`
2. **Colar a chave nova** — Cole a chave nova em "Nova chave (opcional)" e clique em "Salvar". Trocar a chave por aqui mantém os agentes ligados a ela. Depois de salvar, o sistema confere a chave nova com o provedor: assim que o selo mostrar "Validada", os agentes já usam a chave nova. Se o selo mostrar "Inválida", eles ficam sem chave até você corrigir.
3. **Mudar só o nome** — Para mudar só o nome, abra a edição pelo lápis, troque o "Nome" e deixe "Nova chave (opcional)" em branco. Assim a chave continua a mesma e nada é conferido de novo. Aqui a "Chave de testes" ganha um nome que diz para que ela serve. O botão "Salvar" só fica disponível quando algo mudou.
   - Rota: `/app/ai/credentials`
4. **O nome novo na lista** — O cartão já aparece com o nome novo. Os quatro últimos caracteres e o selo continuam iguais, porque a chave não mudou.
5. **Excluir uma chave** — A lixeira, "Excluir credencial", apaga a chave do sistema. Antes, uma janela pede confirmação: "Remover" apaga de vez, e "Cancelar" desiste. Não dá para desfazer.

