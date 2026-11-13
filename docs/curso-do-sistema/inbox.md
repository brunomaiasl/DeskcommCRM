# Inbox

- **Tela:** `/app/inbox`
- **Resumo:** Onde você e a IA atendem os clientes do WhatsApp lado a lado: a fila de quem espera, a conversa, a ficha do cliente e os atalhos do dia a dia.
- **Fonte:** `curso/licoes/inbox.json`

## Conhecendo a Inbox

**Objetivo:** Reconhecer as três partes da Inbox (lista, conversa e ficha do cliente) e abrir a primeira conversa.

**Quem pode:** admin

**Palavras de busca:** inbox, caixa de entrada, conversas, tela principal, whatsapp, atendimento, ficha do cliente

1. **As três partes da tela** — A Inbox é onde você lê e responde os clientes. À esquerda fica a lista de conversas, no meio aparece a conversa que você abrir e à direita fica a ficha do cliente. Quando você entra pelo menu, ela abre na aba Fila, que mostra quem está esperando por uma pessoa. Ao lado ficam as abas Automático (conversas que o atendimento automático está cuidando) e Minhas (as que estão com você). Na linha de baixo, as abas Todas, Fechadas e Arquivadas mostram todas as conversas, as já encerradas e as guardadas fora da fila.
   - Rota: `/app/inbox`
2. **Começar uma conversa você mesmo** — O botão "Iniciar conversa", no alto da lista, serve para você mandar a primeira mensagem para um cliente, sem esperar que ele escreva. A conversa abre no seu nome e o atendimento automático não responde nela. A exceção é quando outro atendente já está cuidando daquele número: aí a conversa continua com ele. Para seguir, clique na conversa da Mariana Souza, a primeira da lista.
3. **Abrindo uma conversa** — Clique numa linha da lista para abrir a conversa no meio da tela. A linha aberta fica com o fundo destacado e uma barra colorida à esquerda. Um segundo e meio depois de abrir, o contador de mensagens não lidas some sozinho. Nesta conversa aparece o cartão "Por que a IA passou para você": é o resumo que o atendimento automático deixa quando passa o cliente para uma pessoa. O botão "Assumir e responder" do cartão passa a conversa para você; isso fica para a lição sobre assumir um cliente.
4. **O topo da conversa** — No topo aparecem o nome do cliente, um selo que diz se o atendimento está aberto ou já terminou e quem está cuidando dele agora: uma pessoa, o atendimento automático ou ninguém ("Sem responsável"). Ao lado do nome aparece também o número por onde o cliente chegou (aqui, "Recepção Bem Viver"). Os botões logo abaixo, como Assumir e Fechar, valem para esta conversa. No canto direito, abaixo dos botões, o aviso "Automático pausado" diz que o atendimento automático não responde nesta conversa. "Reservar serviço" marca um horário na agenda e "Marcar como pessoal" tira o contato da Inbox; os outros botões aparecem nas próximas lições.
5. **A ficha do cliente** — A coluna da direita é a ficha do cliente. No alto ficam o telefone e as etiquetas do cliente. Mais abaixo vêm as "Tags da conversa", que valem só para este atendimento, e as "Demandas abertas" (o que ele pediu e ainda não foi resolvido). Rolando a ficha para baixo aparecem os "Leads recentes" (os negócios dele no funil) e os "Pedidos recentes". Tudo sem você precisar sair da conversa. Os outros blocos, como "Sobre a empresa" e "Tarefas desta demanda", ficam para a lição sobre a ficha. Em telas largas de computador ela fica à vista (dá para escondê-la no botão "Recolher"); no celular, ela abre pelo botão "Ficha".
6. **Ajustar a largura da lista** — Para deixar a lista de conversas mais larga ou mais estreita, arraste a divisória entre a lista e a conversa. Dar dois cliques nela volta as colunas à largura padrão, e o navegador guarda a largura que você escolheu.

## Entendendo a lista: abas, cores e contadores

**Objetivo:** Saber o que cada aba mostra e ler de relance quem está cuidando de cada cliente, quem espera há mais tempo e quem tem mensagem nova.

**Quem pode:** admin

**Palavras de busca:** abas, fila, automático, minhas, todas, fechadas, arquivadas, bolinha, não lidas, contador, quem está atendendo, posição na fila

1. **As seis abas** — As abas separam as conversas: Automático (o robô está atendendo), Fila (esperando uma pessoa), Minhas (as suas que ainda estão abertas), Todas (todas as conversas, inclusive as fechadas e as arquivadas), Fechadas e Arquivadas. O número cinza ao lado de cada aba mostra quantas conversas há nela. Quando o número é zero, ele não aparece.
   - Rota: `/app/inbox`
2. **Quem espera há mais tempo** — Na Fila, quem espera há mais tempo fica em cima. Cada linha mostra a posição (1º, 2º…) e há quanto tempo o cliente aguarda resposta. A bolinha âmbar no canto de baixo, à esquerda, do círculo com as iniciais quer dizer "Aguardando atendente". O número em destaque à direita é a quantidade de mensagens que ainda não foram lidas.
3. **O que o robô está atendendo** — A aba Automático mostra as conversas em que o atendimento automático está respondendo sozinho. Essas conversas aparecem com a bolinha roxa, que quer dizer "Automático atendendo". Nas outras abas, como a Todas, um ícone de robô antes da prévia da mensagem indica a mesma coisa.
4. **As suas conversas** — A aba Minhas lista as conversas que estão no seu nome e ainda estão abertas. A bolinha azul quer dizer "Em atendimento": uma pessoa da equipe está cuidando.
5. **Quem cuida e o que é grupo** — Na aba Todas aparecem selos nas linhas. "Grupo" marca um grupo de WhatsApp. O nome da pessoa da equipe diz quem cuida daquele cliente. Nesta clínica de exemplo, você é a Helena Prado (o "HP" no canto de cima). O ícone de robô antes da prévia da mensagem quer dizer que o atendimento automático está respondendo.
6. **Selos de cuidado** — Mais abaixo na mesma lista aparecem outros dois selos. "Exemplo para a IA" marca uma conversa usada para ensinar o robô a responder. O ícone de brilho à direita de cada linha liga ou desliga esse selo: cheio e verde, está ligado; só o contorno, desligado. "Bloqueado" marca um cliente que pediu para não receber mais mensagens.
7. **Atendimentos encerrados** — A aba Fechadas guarda os atendimentos que já foram encerrados. A aba Arquivadas guarda o que você tirou da frente sem apagar. Uma conversa fechada ou arquivada sem responsável fica com a bolinha cinza clara. Ao passar o mouse sobre a bolinha de qualquer conversa fechada, aparece a palavra "Encerrada".

## Achando a conversa certa

**Objetivo:** Usar a busca e os filtros (Não lidos, Grupos, etiquetas) e desfazer tudo quando a lista parecer vazia.

**Quem pode:** admin

**Palavras de busca:** buscar, pesquisar, procurar cliente, filtro, não lidos, grupos, etiqueta, tag, todas as tags, limpar filtros, lista vazia

1. **Buscar pelo nome** — Digite o nome ou o telefone do cliente na busca. Aqui digitamos "Mari" e a lista já mostra a Mariana. A lista filtra logo depois que você para de digitar. A busca também encontra palavras da última mensagem da conversa, mas não das mensagens mais antigas.
   - Rota: `/app/inbox?filter=all`
2. **Só o que ainda não foi lido** — O botão "Não lidos" liga e desliga um filtro. Quando está ligado, fica colorido, e a lista mostra só as conversas com mensagens que ninguém leu ainda.
3. **Só os grupos** — O botão "Grupos" mostra só as conversas de grupos de WhatsApp e esconde, por enquanto, as conversas com um cliente só.
4. **Filtrar por etiqueta** — Clique no botão "Todas as tags", logo abaixo da busca, e marque uma ou mais etiquetas, como "retorno" ou "convenio", para ver só os clientes marcados com elas. O menu fica aberto enquanto você marca. Se a lista for longa, use o campo "Buscar etiqueta" no topo do menu.
5. **A lista filtrada** — Agora a lista mostra só os clientes com a etiqueta escolhida, e o botão passa a mostrar essa etiqueta em destaque. Na própria linha do cliente, as etiquetas aparecem em selos. Quando são mais de duas, as outras viram um "+1", "+2"… Repare que o número ao lado de "Todas" também caiu, para 1: a etiqueta muda a contagem das abas, assim como "Não lidos".
6. **Quando a lista fica vazia** — Aqui buscamos "Joa" com a etiqueta "retorno" ainda ligada. Nenhuma conversa combina com os dois ao mesmo tempo, então aparece "Nenhuma conversa com esses filtros" e, logo abaixo, os filtros que estão ligados ("Ativos: Busca · Etiqueta"). A caixa não está vazia: são os filtros que estão escondendo as conversas. O "1" ao lado de "Todas" é a Fernanda: ela tem a etiqueta, mas não combina com a busca "Joa". A busca não muda esse número.
7. **Limpar tudo** — "Limpar filtros" desliga de uma vez a busca, Não lidos, Grupos, as etiquetas e os demais filtros. O botão de etiqueta volta a dizer "Todas as tags", a lista volta inteira e você continua na mesma aba.

## Lendo o histórico da conversa

**Objetivo:** Entender as mensagens: de quem é cada uma, se foi entregue e lida, quando falhou, e como achar ou citar uma mensagem antiga.

**Quem pode:** admin

**Palavras de busca:** histórico, mensagens, enviada, entregue, lida, checks, falhou, IA respondeu, responder mensagem, citar, buscar na conversa

1. **Cliente à esquerda, empresa à direita** — As mensagens do cliente ficam à esquerda, em cinza. As mensagens da empresa ficam à direita, na cor da marca. Pílulas como "Hoje" e "Ontem" separam os dias.
   - Rota: `/app/inbox?id=be100000-0000-4000-8000-000000000005`
2. **Quem mandou cada mensagem** — Toda mensagem que sai da empresa mostra, em cima, quem a mandou: "IA", com um robozinho, para o atendimento automático; "Você" para o que você escreveu; "Atendente" para outra pessoa da equipe; e "Celular" quando alguém respondeu pelo WhatsApp do telefone. Lembretes e follow-ups automáticos aparecem como "Automação". Assim dá para saber o que o robô respondeu e o que foi escrito por uma pessoa.
3. **Enviada, entregue e lida** — Nas mensagens enviadas pela empresa, os tiques ao lado da hora mostram o caminho da mensagem: um tique quer dizer enviada, dois tiques cinza quer dizer entregue, e dois tiques azuis quer dizer que o cliente leu. Repare na cor: é ela que separa entregue de lida.
4. **Mensagem que não saiu** — Quando uma mensagem não sai, ela ganha uma borda vermelha e o selo "Falhou", ao lado da hora. Logo abaixo vem o motivo. Quando o sistema não sabe o motivo, aparece um aviso geral, como na foto. Nas mensagens escritas pela equipe costuma aparecer o botão "Tentar de novo", que manda a mesma mensagem outra vez. Quando há chance de ela já ter chegado ao cliente, o sistema pede confirmação antes. Se mandar de novo não resolveria, como num número sem WhatsApp, o botão não aparece. As respostas da IA não ganham esse botão: o próprio sistema tenta de novo.
5. **O menu de cada mensagem** — Passe o mouse sobre uma mensagem e clique na setinha "Opções da mensagem". Esse menu reúne as ações daquela mensagem, como responder a ela ou encaminhá-la para outra conversa. Nas mensagens do cliente, gestores e administradores também veem "Ocultar no CRM". Ele esconde a mensagem só aqui dentro: ela continua no WhatsApp do cliente.
6. **Responder em cima de uma mensagem** — Com "Responder a esta mensagem", o trecho escolhido aparece acima do campo de escrever. Quando você envia uma resposta escrita, ela sai citando essa mensagem, como no WhatsApp. O X desfaz a escolha.
7. **Buscar dentro da conversa** — A lupa no topo abre uma busca dentro da conversa. As mensagens que têm a palavra ganham um contorno, e um contador mostra quantas foram encontradas. A busca só olha as mensagens que já estão carregadas na tela, e as notas internas ficam de fora.

## Assumir um cliente e preparar a resposta

**Objetivo:** Pegar uma conversa que a IA passou para a equipe e montar a resposta com texto, respostas prontas e anexos.

**Quem pode:** admin

**Palavras de busca:** assumir, pegar conversa, IA passou, passagem, responder, escrever mensagem, resposta pronta, respostas rápidas, atalho barra, anexar, enviar, sugerir resposta

1. **Por que a IA passou para você** — Quando o atendimento automático entrega um cliente para a equipe, aparece este cartão dentro da conversa. Ele mostra o motivo da troca, o que o cliente quer, o que a IA já tentou, as últimas palavras dele e se ele já foi avisado de que uma pessoa vai assumir.
   - Rota: `/app/inbox`
2. **Agora a conversa é sua** — Ao clicar em "Assumir e responder", a conversa passa para o seu nome. Ela sai da aba Fila e agora fica na aba Minhas. Por isso ela some da lista da esquerda, que continua mostrando a Fila: para achá-la de novo, clique em Minhas. O topo da conversa mostra você como responsável. O atendimento automático, que já tinha parado quando passou o cliente para a equipe, continua parado: o selo no topo diz "Automático pausado — alguém assumiu".
3. **Escrever a resposta** — Escreva no campo de baixo. Quando está vazio, ele mostra "Escreva uma mensagem…". O Enter envia, e Shift + Enter pula uma linha sem enviar. O botão de avião, à direita, também envia. A estrelinha, entre o rosto e o campo, pede ao agente de IA uma sugestão de resposta. A sugestão aparece num quadro acima do campo, com "Aprovar e enviar" e "Rejeitar": nada sai sem o seu clique.
4. **Respostas prontas num clique** — Os botões logo acima do campo são as respostas rápidas da equipe. Um clique coloca o texto pronto no campo, no lugar do que estiver escrito, já com o primeiro nome do cliente, para você conferir antes de enviar. Nada é enviado sozinho.
5. **O nome do cliente já vem trocado** — Depois do clique, o texto da resposta pronta fica no campo, já com "Mariana" no lugar do nome. Confira, ajuste se quiser e só então envie.
6. **Ou chame pelo atalho /** — Digitar uma barra (/) no começo do campo abre a lista das respostas prontas. Continue digitando, sem espaço, parte do nome (por exemplo /exame) ou o atalho cadastrado em Respostas rápidas (por exemplo /jejum). A lista filtra: na foto, /exame deixou só "Preparo para exame de sangue". Clique na que quiser.
7. **Anexar foto, documento ou contato** — O botão "+" abre as opções de anexo. Em "Fotos e vídeos" ou "Documento" você escolhe um arquivo, e a janela "Enviar anexo" mostra como ele vai ficar e deixa escrever uma legenda antes de enviar. "Contato" abre a janela "Enviar contato", onde você escolhe alguém da sua base ou digita nome e telefone.

## Recados para a equipe com a nota interna

**Objetivo:** Registrar um recado que só a equipe vê e chamar um colega com @.

**Quem pode:** admin

**Palavras de busca:** nota interna, recado, anotação, só a equipe vê, mencionar, @, marcar colega, avisar colega

1. **O que é uma nota interna** — As notas internas aparecem no meio da conversa, num balão amarelado, com o nome de quem escreveu e o aviso "Nota interna · só o time vê". Elas nunca chegam ao cliente e servem para combinar coisas com a equipe. A mensagem com borda vermelha logo acima é outro assunto: um envio que falhou, que se manda de novo em "Tentar de novo".
   - Rota: `/app/inbox?id=be100000-0000-4000-8000-000000000005`
2. **Mudar para Nota interna** — Acima do campo de escrever há duas opções: "Responder" manda a mensagem para o cliente e "Nota interna" guarda um recado só para a equipe. Com a nota escolhida, o botão "Nota interna" fica colorido, o fundo em volta do campo fica amarelado e o campo passa a mostrar "Escreva uma nota interna… (só o time vê)". Os botões de respostas rápidas somem, porque elas são para o cliente.
3. **Chamar um colega com @** — Na nota, digite @ para abrir a lista da equipe e clique no colega. O seu próprio nome também aparece na lista. Quando a nota for salva, o colega recebe o aviso "Você foi mencionado": na tela, se estiver com o sistema aberto, e no celular ou computador, se tiver ativado as notificações.
4. **Salvar a nota** — O nome do colega entra no texto. Aperte Enter, ou clique no aviãozinho ao lado, para salvar a nota. Para pular linha, use Shift+Enter.
5. **A nota no histórico** — A nota aparece no histórico com o seu nome e a hora, e a menção ao colega fica destacada. Ao passar o mouse sobre a nota, aparece uma lixeira no canto. Quem escreveu a nota, e também gestores e administradores, podem apagá-la por ela. A nota é apagada na hora, sem pedir confirmação.

## Pausar o robô, passar adiante e encerrar

**Objetivo:** Controlar quem atende (pausar e devolver o automático, transferir), pedir um lembrete e encerrar, reabrir e arquivar um atendimento.

**Quem pode:** admin

**Palavras de busca:** pausar robô, pausar IA, devolver ao automático, transferir, passar para colega, lembrete, lembrar, fechar conversa, encerrar, reabrir, arquivar

1. **Calar o robô numa conversa sua** — Esta conversa já está no seu nome, mas o atendimento automático (o robô) ainda pode responder nela. O seu nome aparece logo abaixo do nome do cliente (nesta demonstração, Helena Prado). "Pausar o automático" faz o robô parar de responder nesta conversa, e o responsável continua o mesmo. O botão "Liberar", logo à esquerda, faz outra coisa: solta a conversa, que fica sem responsável.
   - Rota: `/app/inbox?id=be100000-0000-4000-8000-000000000007`
2. **Devolver ao automático** — Com o robô pausado, aparece o aviso "Automático pausado — alguém assumiu", e o botão muda para "Devolver ao automático". Ao devolver, o robô volta a atender e a conversa fica sem responsável.
3. **Transferir para um colega** — Ao devolver, a conversa ficou sem responsável: no topo, o botão voltou a ser "Assumir". "Transferir" passa a conversa para outra pessoa da equipe na hora, sem ela precisar aceitar. Escolha quem vai continuar e, se quiser, escreva o motivo: a troca fica registrada, e o motivo aparece no histórico do negócio desse cliente.
4. **Pedir um lembrete** — "Lembrar" serve para quando você está esperando o cliente responder. Escolha o prazo: se ele não responder até lá, a conversa sobe para o topo da lista e aparece um aviso na Central dizendo que o cliente não respondeu no prazo. Nada é enviado ao cliente. Nesta conversa o robô já estava pausado. O balão vermelho é uma mensagem que não saiu, e o quadro bege é um recado interno da equipe: nada disso tem a ver com o lembrete.
   - Rota: `/app/inbox?id=be100000-0000-4000-8000-000000000005`
5. **Encerrar o atendimento** — Quando o assunto terminou, clique em "Fechar". Uma confirmação aparece antes de encerrar. Ela diz que dá para reabrir depois, mas nem sempre é preciso: se o cliente escrever de novo, a conversa reabre sozinha, sem responsável.
6. **Reabrir** — Depois de fechada, a conversa mostra o selo "Fechada", e o campo de mensagem fica travado: parece normal, mas não aceita texto. "Reabrir" começa um novo atendimento com o mesmo cliente, mas sem responsável: até alguém clicar em "Assumir", quem cuida dela é o atendimento automático.
7. **Arquivar sem apagar** — "Arquivar" tira a conversa da Fila e da aba Minhas e a guarda na aba Arquivadas (é o "histórico" de que a confirmação fala). Nada é apagado. Se a conversa ainda estava aberta, o atendimento é encerrado; se o cliente escrever de novo, ela volta, sem responsável.

## A ficha do cliente ao lado da conversa

**Objetivo:** Organizar o cliente sem sair da conversa: etiquetas, próximo passo da demanda e etapa no funil.

**Quem pode:** admin

**Palavras de busca:** ficha, painel do contato, etiqueta, tag do contato, tag da conversa, demanda, próximo passo, funil, etapa, lead, recolher painel

1. **O que a ficha mostra** — No alto da ficha ficam o nome, o telefone e as etiquetas do cliente. Logo abaixo há atalhos: "Marcar compromisso" abre a Agenda já com este cliente escolhido, "Tags do contato" abre o editor de etiquetas, "Novo Lead" abre um negócio novo para ele no funil e "Ver contato" leva à ficha completa do cliente. A mensagem com borda vermelha na conversa é só um envio que falhou neste exemplo; ela não tem a ver com a ficha.
   - Rota: `/app/inbox?filter=all&id=be100000-0000-4000-8000-000000000005`
2. **Etiquetas da pessoa** — As "Tags do contato" acompanham o cliente em todas as conversas dele. Digite uma etiqueta nova e aperte Enter para adicionar. O X ao lado de uma etiqueta (aqui, o de "retorno") remove essa etiqueta. O botãozinho de paleta logo depois de cada etiqueta troca a cor dela.
3. **Etiquetas só deste atendimento** — Repare que "vip" já entrou nas etiquetas da pessoa. Já as "Tags da conversa" marcam só este atendimento, como o assunto tratado agora. Elas não ficam gravadas no cliente. Digite e aperte Enter, igual às etiquetas da pessoa. Enquanto você não aperta Enter, continua aparecendo "Sem tags.".
4. **O que o cliente pediu** — Em "Demandas abertas" fica cada pedido do cliente que ainda não foi resolvido, com a situação ("Aberta") e há quanto tempo está aberto. Quando ninguém combinou o que fazer, aparece a frase "Sem próximo passo definido". "Demanda vigente neste canal" é só um aviso, não um botão: mostra que esta é a demanda desta conversa. "Encerrar demanda" registra o resultado quando o pedido estiver resolvido. Clique em "Marcar próximo passo" para anotar o que vai acontecer a seguir.
5. **Anotar o próximo passo** — Escreva o que vai acontecer a seguir e clique em "Salvar" (ou aperte Enter).
6. **Próximo passo anotado** — Depois de salvar, a demanda mostra o próximo passo no lugar de "Sem próximo passo definido", e o botão "Marcar próximo passo" some. Assim a equipe toda vê o que falta fazer.
7. **O cliente no funil** — Em "Leads recentes" (lead é o negócio aberto com este cliente) aparecem o nome do negócio e, logo abaixo, o funil e a etapa em que ele está. "Etapa do funil" muda a etapa sem sair da conversa, e "Abrir no funil" abre o quadro do funil já com os detalhes deste negócio na tela. "Levar para outro funil" muda o negócio de funil, não só de etapa. A frase "Este funil não tem campos extras." só avisa que este funil não pede informações a mais. "Tarefas desta demanda" e "Memória do contato", mais acima, são outras partes da ficha. Para continuar, clique em "Recolher", no alto da ficha.
8. **Recolher a ficha** — "Recolher" esconde a ficha e dá mais espaço para a conversa. Este navegador lembra a escolha nas próximas visitas. Para abrir a ficha de novo, clique no botão com setas duplas (») no alto da borda direita.

## Trabalhar mais rápido: atalhos e ações em lote

**Objetivo:** Navegar pelo teclado e resolver várias conversas de uma vez.

**Quem pode:** admin

**Palavras de busca:** atalhos, teclado, J K, próxima conversa, selecionar várias, em lote, marcar como lida, arquivar várias, transferir várias

1. **Cinco letras que economizam cliques** — Com a Inbox aberta e o cursor fora de qualquer campo de texto, cinco teclas fazem o trabalho do mouse: "j" abre a próxima conversa da lista, "k" volta para a anterior, "r" leva o cursor ao campo de resposta, "a" assume a conversa aberta e "e" fecha a conversa aberta. Só o "e" pergunta antes de agir ("Fechar conversa?").
   - Rota: `/app/inbox?filter=all`
2. **Andar pela lista com J e K** — Aperte "j" para abrir a próxima conversa da lista e "k" para voltar à anterior, sem usar o mouse. Se nenhuma conversa estiver aberta, o "j" abre a primeira da lista. Atenção: abrir uma conversa a marca como lida em poucos segundos.
3. **Marcar várias conversas** — A caixinha à esquerda de cada linha marca a conversa sem abri-la. Assim que uma é marcada, aparece acima da lista a barra de ações em lote, com a quantidade de conversas selecionadas. Aqui marcamos as conversas do Roberto e da Mariana. A conversa do Pedro, aberta no meio da tela, também fica com o fundo verde-claro, mas não entra no lote: a caixinha dela está vazia. Só contam as caixinhas marcadas, por isso a barra diz "2 conversas selecionadas".
4. **Mais ações** — Em "Mais ações" ficam Arquivar, Pausar IA, Devolver ao automático e "Transferir para…". Cada conversa marcada recebe a ação como se você a fizesse uma por uma. Pausar IA desliga o atendimento automático e, se a conversa não tiver responsável, você passa a ser o responsável. Devolver ao automático tira o responsável e deixa a IA atender de novo.
5. **Marcar todas como lidas** — "Marcar como lida" zera o contador de não lidas de todas as conversas marcadas. No fim, aparece o aviso "2 conversas atualizadas." e a seleção é desfeita. O "Fechar" da barra, ao lado de "2 conversas selecionadas", encerra todas as marcadas de uma vez e, ao contrário da tecla "e", não pede confirmação. Não confunda com o "Fechar" do topo da conversa aberta: esse fecha só a conversa do Pedro.

