# Conexões

- **Tela:** `/app/connections`
- **Resumo:** Onde você liga e acompanha os números de WhatsApp e os outros canais da empresa: se cada um está funcionando, para quem a IA responde, pausas e proteção contra bloqueio.
- **Fonte:** `curso/licoes/conexoes.json`

## Conhecendo a tela de Conexões

**Objetivo:** Saber onde ficam os seus números de WhatsApp e ler, em cada um, se ele está funcionando.

**Quem pode:** admin

**Palavras de busca:** conexões, meu whatsapp, números conectados, ver se o whatsapp está conectado, canais, whatsapp caiu, status do número

1. **Onde ficam os seus canais** — Conexões é a tela dos canais por onde a clínica fala com os clientes. Só quem é administrador abre esta tela. No alto ficam as abas, uma por tipo de canal. A tela abre em "Números por QR", que são os números de WhatsApp conectados lendo um QR Code com o celular. As outras abas ("API Oficial (Meta)", "Provedor parceiro", "Telefone", "Redes sociais" e "Chamada de voz") aparecem na última lição. A faixa vermelha no alto aparece quando algum número cai. Ela é explicada no passo 5.
   - Rota: `/app/connections`
2. **A barra de cima** — A frase da esquerda diz quantos números estão na lista. Ela conta todos, inclusive os que estão desconectados. À direita ficam os botões que valem para todos os números de uma vez. "Atualizar saúde" confere de novo se cada número está funcionando. "Pausar todas" e "Agendar pausa" você aprende na lição sobre pausas. "Conectar novo WhatsApp" abre a janela para ligar mais um número. O quadro "Para integrar" só interessa a quem liga outro sistema ao mesmo número. Se não for o seu caso, pode ignorar.
3. **Conectar um número novo** — Ao clicar em "Conectar novo WhatsApp", abre uma janela com duas formas de ligar o número. Em "QR Code", você abre o WhatsApp do celular, vai em Aparelhos conectados → Conectar um aparelho e lê o código da tela. Em "Conectar por código", você digita o telefone com código do país e DDD, clica em "Gerar código" e digita no celular o código que aparece. Quando o celular confirma, aparece o aviso "WhatsApp conectado!" e o selo do cartão do número fica verde, em "Conectado". Todo número novo começa em modo de teste: a IA não responde ninguém até você autorizar.
4. **O cartão de um número** — Cada número tem um cartão. No alto aparecem o nome que a equipe deu ao número e o telefone. O selo verde "Conectado" diz que ele está recebendo e enviando mensagens. Logo abaixo, depois de "Verificado", fica a data e a hora da última vez que o sistema conferiu o número. "Ainda não verificado" quer dizer que o sistema ainda não conseguiu conferir este número nenhuma vez. Mais embaixo, o cartão diz quem da equipe recebe as conversas deste número. Para escolher essas pessoas, use o link "Configurar responsáveis por número". A chave "Guardar o histórico anterior à vinculação" vem desligada, e assim só entram as mensagens novas. Mexer nela reinicia o número por alguns segundos, e desligá-la num número já conectado pode apagar o que ele já guardou.
5. **Quando um número cai** — Quando um número cai, o selo do cartão muda. Em vermelho, "Caiu" e "Parado" querem dizer que o número não está funcionando. Em amarelo, "Escaneie o QR" pede que você leia o código de novo, e "Conectando…" aparece enquanto ele volta. Uma faixa vermelha também aparece no alto de todas as telas do sistema, avisando que nenhuma mensagem entra nem sai por ele. O botão "Reconectar", que existe em todo cartão, tenta religar o número sem você pegar o celular. Se não der, a janela que abre mostra um QR para ler ou, se o número foi desvinculado do celular, o botão "Gerar novo QR".

## Liberar a IA aos poucos

**Objetivo:** Testar o atendimento automático com números de confiança antes de liberar a IA para todos os clientes.

**Quem pode:** admin

**Palavras de busca:** ia não responde, liberar ia para clientes, modo de teste, testar robô com meu número, ia aberta ao público, números autorizados

1. **Os dois jeitos da IA** — Cada número diz, no próprio cartão, para quem a IA responde. Na Recepção aparece "IA aberta ao público": a IA pode atender qualquer pessoa que escrever. Na Fisioterapia aparece "IA em modo de teste": ela só responde aos números de teste que você autorizar. Como a lista ainda está vazia, o cartão avisa que a IA não responde ninguém neste número.
   - Rota: `/app/connections`
2. **Abrir o acesso da IA** — Clique em "Configurar acesso da IA", no cartão da Fisioterapia. Abre um painel do lado direito. Na caixa "Números autorizados para teste" você escreve os telefones que vão poder conversar com a IA, um por linha, com o código do país (+55) e o DDD. Use números da sua equipe ou de pessoas de confiança. O número cinza que aparece na caixa vazia é só um exemplo.
3. **Autorizar um número de teste** — Escreva o telefone e clique em "Salvar lista de teste". O painel fecha e o cartão passa a mostrar quantos números estão autorizados. A partir daí, só esses números recebem respostas automáticas neste número da clínica, desde que um agente de IA esteja publicado e ligado a este número. Para os outros clientes, a conversa chega à Inbox e a equipe responde.
4. **Liberar para todos os clientes** — Quando os testes derem certo, abra o painel de novo e clique em "Liberar atendimento ao público". O sistema pede confirmação: a lista de teste deixa de limitar as respostas e a IA, com o agente ligado a este número, pode atender qualquer pessoa que escrever. "Confirmar liberação" libera. "Continuar em teste" fecha a pergunta sem mudar nada.

## Renomear, pausar e excluir um número

**Objetivo:** Dar um nome fácil a cada número, pausar um número por um tempo e saber o que acontece ao excluí-lo.

**Quem pode:** admin

**Palavras de busca:** renomear número whatsapp, mudar nome da conexão, pausar número, desligar whatsapp por um tempo, excluir número, grupos do whatsapp

1. **Dar um nome ao número** — Clique em "Renomear" no cartão do número. Abre a janela "Nome interno da conexão". Esse nome é o que a equipe vê no sistema, por exemplo na Inbox, para saber por qual número o cliente chegou. O cliente não vê este nome, e o nome do perfil no WhatsApp não muda.
   - Rota: `/app/connections`
2. **Nome salvo** — Escreva o novo nome e clique em "Salvar". O cartão já aparece com o nome novo. Use nomes que digam para que serve cada número, como a unidade ou o setor.
3. **Pausar um número** — O botão "Pausar" desliga o número sem desconectá-lo. Enquanto ele está pausado, as mensagens que chegam ficam guardadas, mas não aparecem na Inbox, a IA não responde e nada é enviado por ele. O cartão ganha o selo "Pausado", e o botão vira "Retomar". Pausar não religa o número: este continua com o selo "Caiu". Ao retomar, as mensagens guardadas aparecem na Inbox, sem perder nenhuma.
4. **Pausar ou retomar todos de uma vez** — Na barra de cima, "Pausar todas" pausa todos os números que ainda não estão pausados, inclusive os que caíram, e "Retomar todas" tira da pausa todos os pausados. O número entre parênteses diz quantos números o clique vai mudar. Cada botão só aparece quando tem algum número para mudar.
5. **Grupos do número** — O botão "Grupos" abre a lista dos grupos de WhatsApp de que o número participa. Cada grupo tem uma chave: grupo ligado aparece na Inbox para a equipe responder. A IA nunca responde em grupo. Como este número caiu, a lista não carrega e aparece o aviso para conferir a conexão.
6. **Excluir um número** — A lixeira, no fim do cartão, exclui o número. Antes, uma janela pede confirmação. Ao confirmar, o número é desconectado do WhatsApp e sai desta lista, e as conversas que ele já teve continuam na Inbox. Para usar o mesmo número de novo, é preciso conectá-lo outra vez. Se você só quer parar por um tempo, use "Pausar".

## Proteger o número contra bloqueio

**Objetivo:** Entender e ajustar os limites que evitam que o WhatsApp bloqueie o número por excesso de mensagens.

**Quem pode:** admin

**Palavras de busca:** evitar bloqueio do whatsapp, número bloqueado, limite de mensagens por dia, horário de envio, aquecimento do número, enviar no domingo

1. **Abrir a proteção de envio** — Clique em "Proteção de envio" no cartão do número. Abre um painel com os limites que protegem o número contra bloqueio do WhatsApp. Campo vazio usa o padrão seguro do sistema, que aparece escrito em cinza dentro do campo. No começo vem a idade do número: preencha "Este número é usado desde" com o dia em que o número começou a ser usado. Número novo começa enviando pouco por dia e vai subindo aos poucos, e é isso que o texto logo abaixo explica.
   - Rota: `/app/connections`
2. **Os horários** — "Janela de resposta" é o horário em que a IA responde a quem escreveu. "Janela de disparo" é o horário dos envios em massa e das mensagens que retomam uma conversa parada. Fora da janela, o envio fica guardado para o próximo horário permitido. Os horários seguem o fuso escolhido mais abaixo no painel.
3. **Dias e domingo** — Em "Dias da prospecção" você marca os dias em que sai a primeira mensagem da prospecção, quando é a clínica que procura o cliente. A chave "Enviar aos domingos" vem ligada: quem escreve no domingo recebe resposta no domingo. Desligada, o número não responde nem faz envios em massa no domingo.
4. **Ritmo e teto do dia** — "Ritmo entre envios" é o tempo mínimo entre uma mensagem e outra do mesmo número, mais uma variação que muda a cada envio, porque um ritmo sempre igual parece robô. O "Atraso humano" é quanto a IA espera antes da primeira resposta, como alguém que viu a notificação e digitou. Ele é contado em milésimos de segundo: 3000 são 3 segundos. O "Teto diário de envios" é o máximo de mensagens que o número manda por dia. Ele vem em 300. Num número novo, vale o que for menor: o teto ou o limite do aquecimento.
5. **Fuso, aquecimento e salvar** — Em "Fuso horário da janela" você escolhe o fuso dos horários acima. O quadro "Aquecimento automático de número novo" mostra quantas mensagens por dia um número pode mandar conforme a idade dele. Para guardar o que mudou, clique em "Salvar proteção". "Cancelar" fecha sem salvar.

## Agendar uma pausa

**Objetivo:** Marcar um horário para os números pausarem e voltarem sozinhos, como numa troca de aparelho ou numa folga.

**Quem pode:** admin

**Palavras de busca:** agendar pausa, pausar whatsapp à noite, janela de manutenção, desligar número no feriado, pausa automática, retomar sozinho

1. **Abrir o agendamento** — Clique em "Agendar pausa", na barra de cima. Abre a janela "Janela de manutenção". Nela você marca quando a pausa começa e quando termina. No horário marcado, o sistema pausa os números e depois os tira da pausa sozinho. As mensagens que chegarem durante a pausa ficam guardadas e aparecem na Inbox na volta.
   - Rota: `/app/connections`
2. **Escolher os números** — Em "Escopo" você escolhe se a pausa vale para todas as conexões ou para um número só. Depois é só clicar em "Agendar".
3. **Pausas já agendadas** — Abaixo dos campos aparece "Janelas agendadas", com o começo, o fim e o número de cada pausa marcada. Aqui há uma pausa da Fisioterapia, de noite. "Cancelar janela" desmarca a pausa. Se ela já tiver começado, o que foi pausado continua pausado até você retomar.

## Os outros tipos de canal

**Objetivo:** Conhecer as abas da API Oficial da Meta, do provedor parceiro, do telefone, das redes sociais e da chamada de voz, e o que cada uma pede para funcionar.

**Quem pode:** admin

**Palavras de busca:** api oficial do whatsapp, conectar meta business, templates da meta, instagram e facebook no atendimento, número de telefone para ligações, chamada de voz

1. **API Oficial (Meta)** — A aba "API Oficial (Meta)" liga o número oficial do WhatsApp Business, sem QR Code. Para isso você precisa ter um app criado na Meta. Os três dados vêm desse app, na parte WhatsApp → Configuração da API: o ID do número de telefone, o ID da conta do WhatsApp Business e o token de acesso. Ao clicar em "Validar e conectar", o sistema confere os dados com a Meta antes de guardar. Se o número não responder, nada é salvo. Depois de conectar, olhe o quadro logo abaixo: se ele disser "Cole isto no painel da Meta", copie os valores para o painel da Meta, senão as respostas dos clientes não chegam.
   - Rota: `/app/connections?aba=oficial`
2. **Templates da Meta** — Na sub-aba "Templates da Meta" ficam os modelos de mensagem aprovados pela Meta. Eles são criados na sua conta do WhatsApp Business, e esta tela só mostra uma cópia deles. Sem o canal oficial conectado, aparece "Canal oficial não conectado": conecte primeiro na sub-aba "Conexão". Depois de conectar, o botão "Sincronizar com a Meta" traz os modelos. Passadas 24 horas da última mensagem do cliente, só um modelo aprovado pode ser enviado. O aviso fala em "Conexões WhatsApp": é a sub-aba "Conexão", ao lado.
3. **Provedor parceiro** — A aba "Provedor parceiro" liga um número oficial do WhatsApp Business por meio de uma empresa parceira, cujo nome aparece no título do cartão. Você precisa ter conta com essa empresa. Cole a "Conta" (o identificador do número no painel do parceiro) e a "Chave de API" e clique em "Conectar". A chave é testada com o parceiro antes de ser guardada, e o selo "Não conectado" muda quando der certo. Logo depois, a tela mostra dois valores para colar no painel do parceiro. Copie na hora: o segredo só aparece uma vez, e sem esse passo as respostas dos clientes não chegam.
   - Rota: `/app/connections?aba=parceiro`
4. **Telefone** — A aba "Telefone" lista os números que recebem ligações. Cada número aponta para um agente de voz e um modo de atendimento. Para cadastrar, clique em "Novo número". As ligações só chegam se quem cuida da instalação tiver contratado e ligado a linha telefônica: cadastrar aqui, sozinho, não faz o telefone tocar. A clínica de exemplo ainda não tem nenhum.
   - Rota: `/app/connections?aba=telefonia`
5. **Redes sociais** — A aba "Redes sociais" traz as mensagens das suas contas em redes sociais para o atendimento. Ela usa um provedor externo que você precisa contratar. Primeiro cole a "Chave de API" desse provedor e clique em "Buscar perfis". Escolha o perfil da empresa e clique em "Salvar conexão". Depois autorize cada rede em "Autorizar conta" e, no cartão da conta, clique em "Receber no atendimento" para as mensagens entrarem na Inbox.
   - Rota: `/app/connections?aba=sociais`
6. **Chamada de voz** — A aba "Chamada de voz" liga as chamadas de voz pelo WhatsApp. Ela depende de um serviço que quem cuida da instalação do sistema precisa configurar. Enquanto isso não acontece, a aba mostra o aviso "A chamada de voz não está configurada." A linha de baixo do aviso é um recado técnico para quem cuida da instalação. Você não precisa entendê-la, só repassá-la.
   - Rota: `/app/connections?aba=voz`

