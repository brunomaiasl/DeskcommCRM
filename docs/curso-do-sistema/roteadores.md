# Roteadores

- **Tela:** `/app/ai/routers`
- **Resumo:** Quando um mesmo número de WhatsApp tem mais de um agente de IA, o roteador lê o que o cliente quer e entrega a conversa ao agente certo.
- **Fonte:** `curso/licoes/roteadores.json`

## Conhecendo a tela de Roteadores

**Objetivo:** Entender o que um roteador faz, onde fica a tela e o que o cartão e a página de cada roteador mostram.

**Quem pode:** admin

**Palavras de busca:** roteador, roteador de intenção, mais de um agente no mesmo número, qual agente atende, separar atendimento por assunto, triagem do whatsapp, direcionar conversa para o agente certo

1. **Onde fica a tela** — Roteadores não aparece direto no menu lateral. No grupo "Agente de IA" do menu, clique em "Ver tudo em IA". Na parte "Montar o agente" está o cartão "Roteadores". O caminho completo é: Agente de IA › Ver tudo em IA › Roteadores.
   - Rota: `/app/ai`
2. **Para que serve um roteador** — Um agente de IA é o atendente virtual que responde os clientes no WhatsApp. Quando a empresa tem mais de um agente, cada um cuidando de um assunto, o roteador decide quem atende. Ele lê a mensagem do cliente, entende o que a pessoa quer (a "intenção") e entrega a conversa ao agente daquele assunto. Cada roteador fica ligado a um número de WhatsApp. Aqui aparece o roteador que a Clínica Bem Viver está montando para o número da recepção.
   - Rota: `/app/ai/routers`
3. **O que o cartão mostra** — Cada cartão é um roteador. No alto vêm o nome e o selo "ativo" ou "inativo". Ativo quer dizer que ele já decide quem atende as conversas do número. Inativo quer dizer que ele não decide nada: o número segue com o agente publicado nele, como se o roteador não existisse. Embaixo vêm o número de WhatsApp e quantas intenções ele tem. Este ainda está "inativo" e "Sem intenções configuradas": a clínica vai montar tudo antes de ligar.
4. **Por dentro do roteador** — Clique no cartão para abrir o roteador. Em "Identificação" ficam o nome, o número e a chave que liga e desliga. Em "Intenções", à direita, você diz que assuntos ele reconhece e qual agente atende cada um. Mais abaixo, à esquerda, vêm "Agente por número do remetente" (para mandar certos telefones sempre para um agente, antes da IA decidir), o modelo de IA que lê as mensagens, o agente de reserva para quando nenhuma intenção serve e um teste. Nada do que você muda vale antes de clicar em "Salvar".

## Criar um roteador

**Objetivo:** Criar um roteador novo e ligá-lo a um número de WhatsApp da empresa.

**Quem pode:** admin

**Palavras de busca:** criar roteador, novo roteador, primeiro roteador, ligar roteador ao whatsapp, roteador para o meu número, este número já tem um roteador ativo

1. **O botão Novo roteador** — Para criar um roteador, clique em "Novo roteador", no alto da tela. Quando a empresa ainda não tem nenhum, a tela mostra uma explicação no meio e o botão "Criar meu primeiro roteador", que abre a mesma janela.
   - Rota: `/app/ai/routers`
2. **Nome e número** — Na janela "Novo roteador", dê um nome que diga para que ele serve. Em "Número de WhatsApp", você escolhe o número que ele vai atender: a lista mostra os números de WhatsApp da empresa, cada um com o seu estado. Repare no aviso embaixo: só é possível ter um roteador ativo por número.
3. **Escolher o número** — Clique no número que o roteador vai atender. Aqui aparece o "Recepção Bem Viver", com o estado "Conectado". Escolha com cuidado: depois de criado, o número do roteador não pode ser trocado. Para outro número, crie outro roteador.
4. **Criar** — Com o nome e o número escolhidos, o botão "Criar roteador" acende. O roteador novo já nasce ativo. Por isso, se o número escolhido já tiver outro roteador ativo, o sistema recusa e avisa: "Este número já tem um roteador ativo.". Nesse caso, desligue o outro antes. Para desistir, clique em "Cancelar".
5. **O roteador nasce vazio** — Depois de criado, a página do roteador abre sozinha, com o aviso "Roteador criado — agora escolha as intenções.". Ele já aparece como "ativo", mas ainda não tem intenções nem agente de reserva. Enquanto estiver assim, quem responde o número continua sendo o agente que já estava publicado nele. O próximo passo é cadastrar as intenções, na lição seguinte.

## Cadastrar as intenções

**Objetivo:** Ensinar ao roteador cada assunto que os clientes trazem e dizer qual agente atende cada um.

**Quem pode:** admin

**Palavras de busca:** intenção do roteador, cadastrar intenção, frases de exemplo, quando escolher esta intenção, agente que atende, funil de destino, roteador não reconhece o assunto

1. **Uma intenção para cada assunto** — Uma intenção é um assunto que faz o cliente escrever, como "agendar consulta" ou "resultado de exame". O roteador compara cada mensagem com as intenções cadastradas e escolhe a que mais combina. Este roteador ainda não tem nenhuma. Para cadastrar a primeira, clique em "Intenção", com o sinal de mais.
   - Rota: `/app/ai/routers/d1130000-0000-4000-8000-000000000001`
2. **Nome e agente** — Em "Nome da intenção", escreva um nome curto, como "Agendar consulta". Dois assuntos do mesmo roteador não podem ter o mesmo nome. Em "Agente que atende", escolha quem assume a conversa quando o cliente quer isso. Nesta clínica de exemplo só existe a Bia. Numa operação com vários agentes, cada intenção aponta para o agente que entende daquele assunto.
3. **Quando escolher esta intenção** — Em "Quando escolher esta intenção", descreva a situação com suas palavras, como explicaria a um atendente novo. É este texto que a IA lê para decidir. Nome, agente e esta descrição são obrigatórios: enquanto faltar um deles, aparece um aviso em vermelho embaixo do bloco e o botão "Salvar" fica apagado.
4. **Frases de exemplo** — Em "Frases de exemplo (opcional)", escreva mensagens como um paciente escreveria e aperte Enter, ou clique em "Adicionar". Cada frase vira uma etiqueta; clicar numa etiqueta tira a frase. Cabem até 10 frases por intenção. Os exemplos ajudam a IA a reconhecer o assunto mesmo quando o cliente escreve de outro jeito.
5. **Funil de destino** — "Funil de destino (opcional)" serve para quem tem um funil de vendas para cada serviço. Deixando "Sem destino — só escolher o agente", o roteador só escolhe quem atende. Escolhendo um funil, quando esta intenção é reconhecida o sistema leva o negócio do cliente para esse funil antes de o agente responder. Aí aparece também o campo "Etapa de destino", que já vem em "Primeira etapa aberta".
6. **Mais intenções e salvar** — Para outro assunto, clique de novo em "Intenção": cada um ganha o seu bloco, e a lixeira ao lado do agente tira o bloco. Quando terminar, clique em "Salvar" e aparece o aviso "Roteador salvo.". As intenções só passam a decidir quem atende quando o roteador está ativo.

## Reserva, teste e ligar o roteador

**Objetivo:** Escolher o agente de reserva, entender o modelo que lê as mensagens, testar e ligar, desligar ou excluir o roteador.

**Quem pode:** admin

**Palavras de busca:** agente de fallback, agente de reserva, testar roteador, testar classificação, ativar roteador, desligar roteador, excluir roteador, modelo do classificador

1. **Quando nenhuma intenção serve** — Nem toda mensagem combina com uma intenção, e a IA também pode ficar em dúvida: com menos de 60% de certeza, a escolha dela não vale. Para esses casos existe o "Agente de fallback", o agente de reserva: quando a conversa ainda não está com o agente de alguma intenção, é ele quem atende o que não foi reconhecido. Aqui é a Bia. Escolhendo "Nenhum — responde com o atendimento padrão", responde o agente publicado no número.
   - Rota: `/app/ai/routers/d1130000-0000-4000-8000-000000000001`
2. **A IA que lê as mensagens** — Em "Modelo que identifica a intenção" fica a IA que lê cada mensagem e escolhe a intenção. "Automático — usa o provedor da organização" deixa o sistema usar a inteligência que a empresa já configurou. Para escolher outro modelo, só aparecem os de provedores com chave cadastrada. Nesta clínica de exemplo não há nenhuma chave de IA utilizável, por isso o campo está travado e o aviso pede para cadastrar uma em Credenciais (Agente de IA › Ver tudo em IA › Credenciais). Em "Mensagens anteriores para o roteamento", de 0 a 16, você diz quantas mensagens anteriores da conversa a IA lê junto com a atual: mais mensagens ajudam a entender o contexto, mas podem aumentar o custo e a demora.
3. **Testar antes de valer** — "Testar classificação" mostra o que o roteador faria com uma frase sua, sem mexer em nenhuma conversa real. Você escreve como um cliente escreveria e clica no botão. Aparecem a intenção escolhida, a certeza da IA em porcentagem e o agente que atenderia. Se a certeza ficar abaixo do mínimo, o resultado avisa que, de verdade, a conversa não seguiria aquela intenção. O teste usa a IA de verdade e gasta crédito do provedor. Ele só funciona com o roteador ativo; por isso aparece o aviso "Ative o roteador para poder testar a classificação.".
4. **Ligar o roteador** — Depois de cadastrar as intenções, clique na chave do bloco "Identificação". O texto muda para "Ativo — está roteando as conversas deste número", e a mudança vale depois de clicar em "Salvar". A partir daí, cada mensagem nova do número passa pelo roteador. Depois que ele entrega uma conversa a um agente, ela continua com esse agente; só muda se o cliente passar a falar de outro assunto cadastrado, com certeza suficiente. Para desligar, clique na chave de novo e salve: o número volta para o agente publicado nele.
5. **Excluir um roteador** — "Excluir roteador", no canto de cima, apaga o roteador e todas as intenções dele. Antes, uma janela pede a confirmação. Depois de excluir, o número volta a ser atendido sem roteador, pelo agente publicado nele. Não dá para desfazer. Se quiser só parar o roteador por um tempo, desligue a chave em vez de excluir.

