# Agentes

- **Tela:** `/app/ai/agents`
- **Resumo:** Onde você monta os atendentes virtuais que respondem seus clientes no WhatsApp: as instruções, o que eles podem fazer, o material que consultam e a hora de entrar no ar.
- **Fonte:** `curso/licoes/agentes.json`

## Conhecendo a tela de Agentes

**Objetivo:** Reconhecer o cartão de cada agente, entender o que dizem os selos e achar um agente pela busca.

**Quem pode:** admin

**Palavras de busca:** agentes, agente de ia, robô, atendente virtual, lista de agentes, publicado, rascunho, buscar agente, criar agente

1. **Um cartão para cada agente** — A tela Agentes, no grupo "Agente de IA" do menu, reúne os atendentes virtuais que respondem seus clientes no WhatsApp. Cada agente aparece num cartão. Nesta clínica de exemplo existe um só: a Bia, que faz a recepção. Para montar outro agente, clique em "Criar novo".
   - Rota: `/app/ai/agents`
2. **O que o cartão mostra** — O selo "Publicado" quer dizer que o agente está no ar: as mensagens novas do WhatsApp vão para ele. Quando aparece "Rascunho", ele não está atendendo, porque ainda não foi publicado ou foi pausado. O selo "default" marca o agente padrão da empresa. Abaixo do nome aparecem a empresa de inteligência artificial e o modelo que estão valendo. Em "Prioridade" fica a ordem de preferência, que só importa quando há mais de um agente. Em "Tipo" aparece um código interno do sistema: é só informativo, você não precisa mexer.
3. **Achar um agente** — Quando a lista crescer, digite parte do nome no campo de busca. Se nenhum agente tiver aquele nome, aparece o aviso "Nenhum agente corresponde aos filtros atuais.". Na caixa "Todos", ao lado, escolha "Publicado" para ver só os que estão no ar. Os agentes arquivados ficam escondidos: marque "Incluir arquivados" para vê-los.
4. **Abrir um agente** — Apague o que digitou na busca e o cartão da Bia volta. Para abrir a configuração de um agente, clique em "Editar" no cartão dele.

## O menu de ações do cartão

**Objetivo:** Saber o que fazem Duplicar, Renomear, Pausar e Arquivar, e trocar o nome de um agente.

**Quem pode:** admin

**Palavras de busca:** duplicar agente, copiar agente, renomear agente, trocar nome, pausar agente, despausar, arquivar agente, desligar robô

1. **Editar, duplicar e renomear** — O botão de três pontinhos, no canto do cartão, abre o menu de ações. "Editar" abre a configuração, igual ao botão do cartão. "Duplicar" cria uma cópia do agente com as mesmas instruções e ajustes, como rascunho: a cópia não entra no ar sozinha. "Renomear" troca só o nome.
   - Rota: `/app/ai/agents`
2. **Pausar e arquivar** — "Pausar" faz o agente parar de responder os clientes, sem perder nada do que foi configurado. Depois disso, o item vira "Despausar", que põe o agente de volta no ar. "Arquivar" tira o agente do ar e da lista, e não dá para desarquivar pela tela. Aqui ele aparece apagado porque a Bia é o agente padrão, e o agente padrão não pode ser arquivado.
3. **Trocar o nome** — Em "Renomear", digite o novo nome e clique em "Salvar". Só o nome muda: as versões publicadas e o histórico continuam iguais. Para desistir, clique em "Cancelar".

## Por dentro de um agente

**Objetivo:** Entender o topo da página do agente: o modo de operação, as abas, o selo da versão no ar e as três partes da configuração.

**Quem pode:** admin

**Palavras de busca:** configurar agente, modo assistido, modo automático, pausar automático, retomar automático, versão publicada, rascunho, publicar agente

1. **Automático ou assistido** — No alto da página do agente fica a "Operação do agente". No modo automático, ele responde sozinho, seguindo as regras que você configurou. No modo assistido, ele só prepara sugestões dentro da conversa, e nada é enviado sem a aprovação de uma pessoa. O botão "Pausar automático" para na hora as respostas que ele manda sozinho: a configuração fica guardada, as sugestões do modo assistido continuam e o botão vira "Retomar automático".
   - Rota: `/app/ai/agents`
2. **As abas do agente** — Logo abaixo ficam as abas do agente. Você começa em "Configuração", onde monta o agente. "Teste" mostra como ele responderia, sem mandar nada ao cliente. "Capacidades" conta o que ele usou, "Execuções" lista cada vez que ele trabalhou, "Histórico" guarda as versões e "Propostas" traz as melhorias que ele sugere. A última lição mostra o Teste, o Histórico, as Execuções e as Propostas.
3. **A versão no ar e os botões** — Ao lado do nome, o selo "Publicado v1" diz que a versão 1 é a que está atendendo. As instruções, a inteligência, o número e as regras de atendimento viram um rascunho: os clientes só veem essas mudanças depois que você publica. Nome, descrição e ordem de preferência mudam assim que você salva o rascunho. Enquanto não há nada para salvar, os botões ficam apagados, e a frase embaixo diz o que falta para publicar.
4. **As três partes da configuração** — A configuração tem três partes. "Conversa com o cliente" é como ele atende. "Organiza o sistema" é o que ele registra por dentro depois da conversa. "Confere antes de enviar" mostra as verificações de cada mensagem. As duas primeiras partes formam um rascunho só, salvo pelo mesmo botão. As escolhas da terceira valem na hora, para a empresa toda.

## Nome, inteligência, número e limites

**Objetivo:** Preencher quem é o agente, entender a escolha da inteligência artificial e da chave, ligar o número de WhatsApp e conhecer os limites de cada atendimento.

**Quem pode:** admin

**Palavras de busca:** nome do agente, chave de acesso, credencial, anthropic, modelo de ia, número do whatsapp, limite de custo, esperar antes de responder

1. **Quem é este agente** — Na parte "Conversa com o cliente", o primeiro bloco é "Quem é este agente". O "Nome" é o que aparece na lista de agentes, e a "Descrição" é uma anotação sua sobre o que ele faz. A "Ordem de preferência" só importa quando mais de um agente pode atender a mesma conversa: o de número maior tenta primeiro. Com um agente só, deixe como está. Atenção: estes três campos valem assim que você salva o rascunho, sem precisar publicar.
   - Rota: `/app/ai/agents`
2. **A inteligência e a chave** — Em "A inteligência que ele usa" você escolhe a empresa de inteligência artificial, o modelo e a "Chave de acesso", que é o código da sua conta nessa empresa. Nesta instalação de exemplo nenhuma chave foi cadastrada. Por isso aparecem o aviso em vermelho e o link "Cadastrar credencial anthropic", que leva à tela onde você cola a chave. Sem chave, o agente não consegue salvar mudanças.
3. **Por qual número ele atende** — "Por qual número ele atende" liga o agente a um número de WhatsApp da empresa. Aqui está escolhido o "Recepção Bem Viver", que aparece como "Conectado". Sem um número escolhido, o rascunho até salva, mas o agente não pode ser publicado.
4. **Freios de segurança** — Os "Freios de segurança" limitam cada atendimento. Em "Ações por atendimento" você define quantas ações o agente pode fazer numa resposta, e em "Mensagens anteriores que ele lê", quanto da conversa ele relê antes de responder. Em "Esperar antes de responder", as mensagens que o cliente manda em sequência, dentro desse tempo, viram uma resposta só. Deixando vazio, vale o padrão da instalação.

## Instruções, capacidades e conhecimento

**Objetivo:** Escrever as instruções do agente, entender como salvar e publicar, e escolher o que ele pode fazer e o material que ele consulta.

**Quem pode:** admin

**Palavras de busca:** instruções do agente, prompt, salvar rascunho, publicar versão, descartar alterações, capacidades, o que o agente pode fazer, base de conhecimento, material da clínica

1. **As instruções dele** — Em "As instruções dele" você escreve, com suas palavras, quem o agente é e como deve atender: o tom, o que ele pode responder e o que deve passar para a equipe. No canto, o número com barra, como "57/20.000", mostra quantos caracteres você já usou, de no máximo 20.000. O outro número, ao lado, é uma estimativa técnica e pode ser ignorado.
   - Rota: `/app/ai/agents`
2. **Mudou? Salve e publique** — Assim que você muda algo, o botão "Descartar alterações" acende, para voltar ao que estava. Aqui "Salvar rascunho" continua apagado porque falta a chave de acesso da lição anterior. Com a chave, ele guarda a mudança como "Rascunho v2" e o botão de publicar vira "Publicar v2". Ao publicar, uma janela resume o que muda e pede confirmação. A versão anterior fica guardada no Histórico. Para desfazer a mudança, clique em "Descartar alterações".
3. **Respostas em mensagens curtas** — Em "Estilo de resposta", ligar "Responder em várias mensagens curtas" faz o agente mandar a resposta em várias bolhas, como uma pessoa digitando, em vez de um bloco único. Ligado, aparece o campo do tamanho máximo de cada bolha.
4. **O que o agente pode fazer** — "O que o agente pode fazer" define o que ele faz sozinho durante o atendimento. As capacidades vêm em pacotes por tarefa, como "Atender e responder" e "Vender e mover o funil": ligar um pacote liga as capacidades dele de uma vez. As que têm "Efeito que não dá para desfazer" ficam no quadro vermelho e só se ligam uma a uma. O contador mostra quantas estão ligadas. O limite é 27: acima disso o agente se confunde na hora de escolher o que usar, então ligue só os pacotes de que o seu negócio precisa.
5. **O que ele consulta antes de responder** — "O que ele consulta antes de responder" é o material da sua clínica que o agente pode ler, como perguntas frequentes, preços e preparo de exames. Ele procura ali antes de responder e cita de onde tirou. Nesta clínica ainda não há material, e o link leva à tela onde você cadastra. Sem material marcado, ele responde só com o que a inteligência artificial já sabe.

## Quando ele responde e quando chama a equipe

**Objetivo:** Definir quando o agente entra em ação, o horário de atendimento e as situações em que ele passa a conversa para uma pessoa.

**Quem pode:** admin

**Palavras de busca:** horário de funcionamento, fora do horário, não responder grupos, passar para humano, chamar atendente, palavras-chave, sentimento, follow-up, comandos #on #off

1. **Quando ele entra em ação** — "Quando ele entra em ação" diz o que faz o agente responder: uma mensagem nova do cliente. Ele nunca responde em grupos nem às mensagens que saem do seu próprio número. Se você preencher "Só responder quando a mensagem falar de algo específico", ele só entra quando a mensagem tiver uma das palavras, separadas por barra vertical (|).
   - Rota: `/app/ai/agents`
2. **Horário de funcionamento** — Ligando "Só atender em horário de funcionamento", aparecem o fuso horário, o início, o fim e os dias da semana do atendimento. Ele já vem das 8h às 20h, de segunda a sexta (na tela aparece como 08:00 AM e 08:00 PM), e você ajusta como quiser. Em "Mensagem fora do horário" você escreve o aviso para quem chamar com a clínica fechada (o texto cinza no campo é só um exemplo): ele vai uma vez por cliente em cada período fechado, e nunca para quem pediu para não receber mensagens. Para valer, salve o rascunho e publique.
3. **Passar para uma pessoa** — "Passar para uma pessoa" tem duas chaves. A primeira deixa o agente chamar alguém da equipe quando percebe que o caso não é dele. A segunda, que só funciona com a primeira ligada, passa a conversa quando o cliente fala de assunto jurídico, como Procon ou advogado. Em "Palavras que chamam uma pessoa na hora" ficam as expressões, como "atendente", que passam a conversa direto para a equipe.
4. **O clima da conversa** — O "Limiar de sentimento" é uma nota do clima da conversa, de 0 a 1. Abaixo dela, o clima é considerado fechado e a conversa passa para uma pessoa. Nota mais alta manda mais conversas para a equipe. Numa clínica, contar o problema de saúde não é irritação: o que conta é hostilidade com o atendimento.
5. **Pedir ajuda, propostas e follow-up** — Com "Deixar o agente pedir uma tarefa a alguém", ele abre um pedido interno, como aprovar um desconto, e continua atendendo até alguém responder. A chave de "Propostas comerciais" deixa ele rascunhar uma proposta quando o cliente pede orçamento. Em "Follow-up", ele retoma sozinho quem parou de responder: a primeira chave deixa ele marcar novos retornos, e a segunda liga os fluxos automáticos criados na tela Follow-ups.
6. **Comandos pelo celular** — Com "Aceitar #on/#off enviados pelo celular" ligado, qualquer mensagem que alguém da equipe mandar pelo WhatsApp do celular pausa a IA naquela conversa até alguém mandar #on ou clicar em "devolver ao automático". O #off pausa sem responder o cliente. Desligado, como na foto, #on e #off são texto comum e responder pelo celular pausa a IA só por um tempo. Atenção: o comando é digitado no chat do cliente e pode aparecer para ele.

## Os bastidores: organizar, conferir, testar e acompanhar

**Objetivo:** Conhecer as partes que trabalham por trás da conversa e as abas que mostram testes, versões e o trabalho do agente.

**Quem pode:** admin

**Palavras de busca:** organizar o sistema, funis do agente, verificações, afirmação clínica, testar agente, histórico de versões, reverter versão, execuções, propostas de melhoria

1. **Organiza o sistema** — "Organiza o sistema" é a parte que trabalha depois da conversa. Ligando a chave e marcando em "O que ele pode mexer no sistema" o que ele pode fazer, o agente também abre chamados, distribui para a pessoa certa e organiza marcadores e etapas. Desligada, ele continua atendendo e o básico continua registrado sozinho. Em "Em que negócios ele pode mexer", marque os funis que ele cuida: sem nenhum marcado, ele conversa normalmente, mas não mexe em negócio nenhum.
   - Rota: `/app/ai/agents`
2. **Confere antes de enviar** — "Confere antes de enviar" mostra as verificações que o sistema faz em cada mensagem do agente antes de ela sair. São 14, nesta ordem: se uma barra a mensagem, o agente recebe o motivo e reescreve. A maioria não se desliga, como "Respeitar quem pediu para parar". No alto, "Estilo de resposta" é um ajuste à parte, para todos os agentes da empresa, que troca o travessão (—) por vírgula nas mensagens; aqui ele está desligado.
3. **Verificações que você escolhe** — Algumas verificações têm chave. "Não fazer afirmação clínica" foi feita para a área da saúde: barra a mensagem em que o agente diz o que a pessoa tem, indica remédio ou dose ou garante resultado. Aqui ela aparece desligada; numa clínica, vale ligar. Essas chaves valem na hora e para a empresa toda, sem passar pelo rascunho.
4. **Testar sem mandar nada** — A aba "Teste" mostra como o agente responderia a uma mensagem de exemplo, sem mandar nada pelo WhatsApp. No alto aparecem a versão que será testada (aqui, a v1 publicada) e o modelo de IA. Você escreve a mensagem e clica em "Executar teste". O aviso em laranja lembra que o teste gasta créditos da empresa de inteligência artificial. Como esta instalação de exemplo não tem chave de acesso, não vamos executar o teste aqui.
5. **Histórico de versões** — A aba "Histórico" lista as versões do agente e mostra qual está publicada. "Diff" compara uma versão com outra. "Reverter" cria uma versão nova igual àquela e a publica na hora; a versão que estava no ar continua guardada.
6. **Execuções** — A aba "Execuções" ganha uma linha cada vez que o agente trabalha: quando começou, se deu certo, se foi teste ou atendimento de verdade, quanto custou e quanto demorou. Em cada linha, "Detalhes" abre esses mesmos números num painel. Como a Bia ainda não atendeu ninguém, a lista está vazia.
7. **Propostas de melhoria** — Na aba "Propostas", o agente sugere melhorias que aprendeu com as conversas reais. Nada é aplicado sozinho: cada proposta tem um botão para você aplicar, se concordar. Atenção: "Aplicar como versão nova" publica a mudança na hora, sem passar pelo rascunho, e a versão anterior fica no Histórico. As propostas dependem da chave de acesso da inteligência artificial; por enquanto não há nenhuma.

