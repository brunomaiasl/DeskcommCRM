# Conhecimento

- **Tela:** `/app/ai/knowledge/sources`
- **Resumo:** O material da sua empresa que o agente de IA lê antes de responder: perguntas frequentes, preparos, políticas. Aqui você ensina, confere e tira do ar.
- **Fonte:** `curso/licoes/conhecimento.json`

## Conhecendo a tela de Conhecimento

**Objetivo:** Entender o que é o acervo do agente, o que o aviso da chave quer dizer e o que cada cartão de material mostra.

**Quem pode:** admin

**Palavras de busca:** base de conhecimento, o que o agente sabe, ensinar o agente, material do agente, perguntas frequentes do agente, agente responde errado, acervo

1. **Onde fica a tela** — Conhecimento não aparece direto no menu lateral. No grupo "Agente de IA" do menu, clique em "Ver tudo em IA". Na parte "Ensinar o agente" está o cartão "Conhecimento". O caminho completo é: Agente de IA › Ver tudo em IA › Conhecimento.
   - Rota: `/app/ai`
2. **O que o agente sabe** — O agente de IA é o atendente virtual que responde os pacientes no WhatsApp. Esta tela, "O que o agente sabe", guarda o material da clínica que ele lê antes de responder: perguntas frequentes, preparo de exames, valores. Com o material, ele procura a resposta certa em vez de improvisar. A tela é da empresa toda: cada assistente escolhe, na tela dele, quais destes materiais pode ler.
   - Rota: `/app/ai/knowledge/sources`
3. **O aviso da chave** — Para o agente conseguir procurar no material, o sistema prepara o texto com a ajuda de um serviço de inteligência artificial: a OpenAI, a OpenRouter ou o Google. Isso pede uma chave desse serviço, chamada "chave de embedding". Quando a chave está valendo, no lugar deste aviso aparece a frase "Pronto para preparar material." e qual chave está em uso. Nesta clínica o material foi preparado pela OpenAI, e a chave da OpenAI não está mais utilizável. Por isso o aviso com o triângulo: enquanto isso não for resolvido, o agente não consegue consultar o material.
4. **O estado da base** — O quadro "Estado da base de conhecimento" faz a conta dos materiais do acervo, sem os arquivados. "Prontos" são os que o agente já encontra. "Com erro" são os que falharam ao preparar. Quando algum está sendo preparado naquele momento, aparece também "preparando". O material que está esperando a chave entra no total, mas não em "prontos" nem em "com erro". Quando há falha, a linha de baixo, com o triângulo, diz onde ver o motivo.
5. **A linha de comandos** — À esquerda, a tela diz quantos materiais estão no acervo, sem contar os arquivados. "Adicionar material" abre o formulário para ensinar algo novo ao agente. "Preparar tudo de novo" manda o sistema preparar de novo todos os materiais; o que já estava pronto e não mudou é pulado. Esse botão fica apagado enquanto não houver uma chave valendo.
6. **O que cada cartão mostra** — Cada cartão é um material. No alto vêm o nome e, embaixo, o tipo, como "Perguntas e respostas". "Preparado" diz há quanto tempo o sistema preparou o material pela última vez, ou "nunca". "Trechos que o agente encontra" é em quantos pedaços o texto foi dividido para a busca. "Consultado por" lista os assistentes que leem este material.
7. **O selo de cada material** — O selo colorido no canto do cartão diz em que pé está o material. "O agente já sabe", em verde: está preparado e o agente encontra. "Não entrou", em vermelho: a preparação falhou, e o motivo está em "Por que não entrou". "Esperando a chave", em laranja: o material foi guardado, mas só será preparado quando houver uma chave valendo. Existe ainda "Entrou pela metade", em laranja: só parte do material foi preparada. Ele entra na conta "com erro" do quadro de cima. Clique em "Preparar de novo" para tentar completar.

## Cadastrar a chave que prepara o material

**Objetivo:** Saber de onde vem a chave de embedding e cadastrá-la sem sair da tela de Conhecimento.

**Quem pode:** admin

**Palavras de busca:** chave de embedding, chave da openai, falta uma chave, material não prepara, esperando a chave, openrouter, chave do google

1. **Quem prepara a base** — Dentro do aviso, a linha "Quem prepara a base" diz qual serviço preparou o material desta clínica: aqui, a OpenAI. Para resolver sem sair da tela, clique em "Cadastrar a chave aqui". O link "IA › Credenciais" leva à tela com todas as chaves de IA da empresa.
   - Rota: `/app/ai/knowledge/sources`
2. **Escolher o serviço** — Em "Provedor da chave de embedding", escolha de qual serviço é a chave: OpenAI, OpenRouter ou Google. Como esta base é preparada pela OpenAI, a chave precisa ser da OpenAI ou da OpenRouter. O texto dos materiais é enviado ao serviço escolhido para preparar a busca. Em "Como você quer chamar esta chave" dê um nome para reconhecê-la depois; se deixar em branco, ela fica com o nome sugerido, como "Chave da OpenAI".
3. **Colar a chave e salvar** — No campo "Chave da OpenAI", cole a chave que você criou no site do serviço; o endereço aparece logo abaixo do campo, como platform.openai.com/api-keys. A chave é guardada cifrada e nunca aparece de volta na tela. Clique em "Salvar chave". O sistema confere a chave com o serviço, o que leva alguns segundos. Quando ela for aceita, o aviso dá lugar a "Pronto para preparar material.", com o nome da chave.

## Ensinar algo novo ao agente

**Objetivo:** Cadastrar um material novo: escolher o tipo, escrever perguntas e respostas no formato certo e guardar no acervo.

**Quem pode:** admin

**Palavras de busca:** adicionar material, cadastrar perguntas frequentes, ensinar o agente, subir pdf para o agente, colar texto para o agente, faq do agente

1. **Abrir o formulário** — Para ensinar algo novo ao agente, clique em "Adicionar material", à direita, acima dos cartões.
   - Rota: `/app/ai/knowledge/sources`
2. **Que tipo de material é** — Primeiro escolha o tipo. "Perguntas e respostas" já vem marcado: são as dúvidas que se repetem, com a resposta pronta. É o formato que o agente usa melhor, porque cada resposta chega inteira. "Documento" é um texto corrido, como uma política ou um manual. "Conversas anteriores" e "Catálogo de produtos" ficam apagados: o sistema os preenche sozinho, e não dá para digitar nada neles.
3. **Um documento: arquivo ou texto** — Com "Documento", você envia um arquivo ou cola o texto. Em "Arquivo (opcional)" vão PDF, Markdown, CSV ou texto, até 20 MB. Se não tiver o arquivo, cole o texto no campo "…ou cole o texto aqui". O PDF precisa ter texto que dê para selecionar: um PDF só de imagens escaneadas não tem letra nenhuma para o sistema ler.
4. **Escrever perguntas e respostas** — Agora vamos cadastrar perguntas e respostas. Clique de novo em "Perguntas e respostas". Em "Nome do material" dê um nome que você reconheça depois. Em "Conteúdo", escreva cada item em duas linhas: uma começando com "## Pergunta:" e outra com "## Resposta:". Deixe uma linha em branco entre um item e outro.
5. **Guardar no acervo** — Antes do botão, o formulário avisa, em letras cor de laranja, quando não há chave valendo: o material fica guardado e esperando, e o agente só passa a conhecê-lo depois que a chave for cadastrada. Clique em "Adicionar ao acervo". "Cancelar" fecha o formulário sem guardar nada.
6. **O material entrou no acervo** — O material novo aparece primeiro na grade, com o selo "Ainda não preparado". Com uma chave valendo, o sistema começa a preparar em instantes: o selo passa para "Preparando…" e depois para "O agente já sabe". Sem chave, como nesta clínica, o selo passa para "Esperando a chave".

## Conferir, corrigir e arquivar

**Objetivo:** Ler o que está guardado num material, ver o que o agente aprendeu dele, corrigir o conteúdo, entender por que um material não entrou e tirar um material do ar.

**Quem pode:** admin

**Palavras de busca:** ler o material, o que o agente aprendeu, editar perguntas frequentes, material não entrou, preparar de novo, arquivar material, agente responde errado

1. **Ler o material** — Para ver o que está guardado num material, clique em "Ler o material", no pé do cartão. Clicar no nome do material faz o mesmo.
   - Rota: `/app/ai/knowledge/sources`
2. **O conteúdo guardado** — A página mostra o material como ele foi cadastrado. Num material de perguntas e respostas, cada item aparece com a "Pergunta" em cima e a "Resposta" embaixo. Num documento, aparece o texto inteiro. Para voltar à lista, clique em "Voltar ao acervo".
3. **O que o agente aprendeu** — "Ver o que ele aprendeu" mostra os trechos que o agente procura antes de responder: os pedaços em que o sistema dividiu o material. Quando o agente erra sobre um assunto, é aqui que se vê o porquê. Ao lado de cada trecho aparece o tamanho dele em tokens, a medida de texto que os serviços de IA usam. O botão só aparece quando o material já tem trechos.
   - Rota: `/app/ai/knowledge/sources`
4. **Corrigir o conteúdo** — "Editar conteúdo" abre o texto atual do material, no mesmo formato de "## Pergunta:" e "## Resposta:". Mude o que precisar e clique em "Salvar conteúdo". O que você salvar substitui o conteúdo de antes, e o sistema prepara o material de novo.
   - Rota: `/app/ai/knowledge/sources`
5. **Por que não entrou** — Num material com o selo "Não entrou", clique em "Por que não entrou" para ver o motivo. Ele vem como o serviço respondeu, às vezes em inglês. Aqui, "Incorrect API key provided" quer dizer que a OpenAI recusou a chave. Depois de resolver o motivo, por exemplo cadastrando uma chave que funcione, clique em "Preparar de novo" para o sistema tentar outra vez.
   - Rota: `/app/ai/knowledge/sources`
6. **Arquivar um material** — Para tirar um material do ar, clique em "Arquivar". Não há pergunta de confirmação: o clique arquiva na hora, e nenhum assistente consulta mais aquele material. Antes, olhe "Consultado por": os assistentes listados ali deixam de saber daquele assunto.
   - Rota: `/app/ai/knowledge/sources`
7. **Os arquivados** — O material sai da grade e entra na lista de arquivados, no fim da tela. Clique nela para ver os nomes. Material arquivado não é apagado, mas também não tem botão para voltar: para usar o conteúdo de novo, cadastre-o outra vez. Você pode usar o mesmo nome do material arquivado. Dois materiais em uso, porém, não podem ter o mesmo nome.

