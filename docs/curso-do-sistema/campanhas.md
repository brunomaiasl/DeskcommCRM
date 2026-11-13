# Campanhas

- **Tela:** `/app/campaigns`
- **Resumo:** Mande uma mensagem de WhatsApp para uma lista de contatos que você escolhe, no ritmo do número, e acompanhe quem recebeu e quem respondeu.
- **Fonte:** `curso/licoes/campanhas.json`

## Conhecendo a tela de Campanhas

**Objetivo:** Achar a tela, entender o que é uma campanha e ler a lista: em que situação cada uma está e para quantas pessoas ela fala.

**Quem pode:** admin

**Palavras de busca:** campanhas, mandar mensagem para vários, disparo em massa, lista de transmissão, mensagem para todos os pacientes, whatsapp em massa, onde ficam as campanhas

1. **Onde fica a tela** — Campanhas não aparece direto no menu lateral. No grupo "CRM" do menu, clique em "Ver tudo em CRM". Na parte "O dia a dia da venda" está o cartão "Campanhas". O caminho completo é: CRM › Ver tudo em CRM › Campanhas.
   - Rota: `/app/crm`
2. **O que é uma campanha** — Uma campanha manda a mesma mensagem de WhatsApp para uma lista de contatos que você escolhe, como "os pacientes do pilates". Num número conectado pelo QR Code, as mensagens saem aos poucos, no máximo uma por minuto: é isso que protege o número de ser bloqueado pelo WhatsApp. Cada linha é uma campanha. Embaixo do nome aparece para quantos contatos ela fala e quantos ficaram de fora. À direita vem uma data, que muda com a situação: quando a campanha foi criada, quando começou ou quando terminou.
   - Rota: `/app/campaigns`
3. **A situação de cada campanha** — O selo à direita diz em que pé a campanha está. "Rascunho": foi criada, mas a lista de quem recebe ainda não foi montada. Depois que você prepara a lista, ela fica "Pronta para iniciar". "Enviando": as mensagens estão saindo. "Pausada": o envio parou e espera alguém retomar. "Concluída": a campanha terminou de enviar. "Cancelada": alguém desistiu dela, e quem ainda não tinha recebido não recebe mais.
4. **Filtrar pela situação** — Quando a lista crescer, use o seletor "Situação" para ver só as campanhas de um tipo. Aqui escolhemos "Concluída": sobram só as campanhas que já terminaram. Para ver todas de novo, escolha "Todas".
5. **Os botões do alto** — "Nova campanha" abre o formulário para montar uma campanha; a lição "Criar uma campanha" mostra o passo a passo. "Configuração" guarda o que vale para todas as campanhas da empresa: até quando uma resposta conta para a campanha e a lista de números que nenhuma campanha alcança.
6. **Até quando uma resposta conta** — A tela "Configuração de campanhas" começa por "Padrões desta organização". O campo "Contar como resposta até (horas depois do envio)" diz por quanto tempo uma mensagem do contato conta como resposta à campanha. Ele vem com 72 horas, ou seja, três dias. O que chega depois disso é tratado como conversa nova. A mudança vale para as respostas que chegarem dali em diante, inclusive de campanhas que já foram enviadas. Para gravar, clique em "Salvar padrões".
7. **Números que nenhuma campanha alcança** — No fim da tela fica a "Lista de exclusão": os números que nenhuma campanha alcança, como o de um laboratório parceiro ou o de um paciente que prefere ser avisado por ligação. Digite o número em "Telefone com DDI e DDD" (o 55 do Brasil, depois o DDD), escreva o motivo se quiser e clique em "Excluir das campanhas". Isso não bloqueia a pessoa: se ela escrever, o atendimento responde normalmente. A lista mostra só os quatro últimos dígitos de cada número. Para devolver um número às campanhas, clique em "Tirar da lista" na linha dele.

## Criar uma campanha

**Objetivo:** Montar uma campanha do começo, com nome, número, público, mensagem e ritmo, e salvar como rascunho sem enviar nada.

**Quem pode:** admin

**Palavras de busca:** criar campanha, nova campanha, mensagem para um grupo de pacientes, escolher quem recebe, campanha por etiqueta, mensagem com o nome do paciente, quantas pessoas vão receber

1. **Começar uma campanha** — Clique em "Nova campanha", no canto de cima, à direita. Nada é enviado nesta etapa: o formulário só cria um rascunho, que você ainda vai conferir antes de qualquer mensagem sair.
   - Rota: `/app/campaigns`
2. **Nome, número e base legal** — Em "Nome da campanha", escreva um nome que ajude a equipe a reconhecê-la; o paciente não vê esse nome. Em "Enviar pelo número", escolha o WhatsApp da clínica que vai mandar as mensagens: a lista traz os números cadastrados em Conexões. Em "Base legal do envio", diga por que a clínica pode escrever para essas pessoas, como pede a LGPD, a lei de proteção de dados. "Consentimento" serve quando elas pediram para receber. "Interesse legítimo" serve quando a clínica tem uma avaliação por escrito que justifica o contato; nesse caso a tela pede a referência dessa avaliação.
3. **Quem vai receber** — Em "Público" você escolhe quem entra na campanha, com pelo menos um critério. Aqui usamos "Com alguma destas etiquetas" e escrevemos convenio: entram os contatos que têm essa etiqueta. Escreva a etiqueta igual ao cadastro e separe várias por vírgula. Também dá para deixar de fora quem tem uma etiqueta ("Sem nenhuma destas etiquetas"), pegar quem não fala com a clínica há alguns dias ("Sem falar com a gente há (dias)") ou quem tem negócio num funil ("Com negócio no funil"). O campo "Máximo de contatos nesta campanha" já vem com 100.
4. **Quantas pessoas a campanha pega** — Clique em "Ver quantas pessoas" para contar antes de salvar. A conta mostra quantos podem receber e quantos ficam de fora, com o motivo de cada grupo. Aqui, 1 pode receber e 1 fica de fora por "Já está em outra campanha ainda não concluída": a Fernanda já está na lista de uma campanha que ainda está enviando, e ninguém entra em duas campanhas ao mesmo tempo. Outros motivos comuns são o contato sem telefone, quem pediu para não receber mensagens e os números da lista de exclusão.
5. **A mensagem** — Em "Mensagem", escreva como se falasse com uma pessoa só. Os botões logo abaixo põem, no fim do texto, um campo que muda para cada contato: {{nome}} é o nome do cadastro, {{primeiro_nome}} é só o primeiro nome e {{saudacao}} vira "Bom dia", "Boa tarde" ou "Boa noite", conforme a hora do envio. Quem não tiver o dado que a mensagem usa fica de fora da lista, com o motivo anotado. Para não perder ninguém por falta de dado, ponha um texto de reserva entre aspas: {{primeiro_nome|"paciente"}} usa "paciente" quando o cadastro não tem o nome.
6. **Quem atende e o ritmo** — Em "Quem responder" dá para escolher em que funil nasce o negócio de quem responder a esta campanha e qual agente de IA atende essa resposta. Em branco, vale o de sempre: o negócio nasce no funil do número e quem atende é o agente publicado nele. Em "Ritmo desta campanha", deixe em branco para usar o ritmo do número, que fica em Conexões › Proteção de envio. O que você puser aqui só pode deixar a campanha mais devagar. Com tudo pronto, clique em "Salvar rascunho".
7. **O rascunho está salvo** — Ao salvar, a tela abre a campanha nova com o selo "Rascunho". Nenhuma mensagem saiu. Enquanto for rascunho, "Editar" muda o que você escreveu. O próximo passo é "Preparar lista", que monta a lista de quem vai receber: é a lição "Preparar a lista e iniciar o envio".

## Preparar a lista e iniciar o envio

**Objetivo:** Transformar um rascunho em lista de verdade, conferir quem ficou de fora e por quê, mandar um teste e só então começar o envio.

**Quem pode:** admin

**Palavras de busca:** preparar lista, iniciar campanha, começar o envio, enviar teste, quem ficou de fora, por que não recebeu, disparar campanha

1. **Abrir o rascunho** — Na lista, clique na campanha em "Rascunho" que você quer enviar. Aqui é o "Convite para a avaliação odontológica", que a clínica montou para os contatos sem a etiqueta convenio.
   - Rota: `/app/campaigns`
2. **O rascunho por dentro** — No alto ficam o nome, o selo da situação e só os botões que fazem sentido agora. Num rascunho são "Editar", "Preparar lista", "Cancelar campanha" e "Duplicar". Os números "Na lista", "Enviadas", "Entregues" e "Responderam" ainda estão zerados, porque a lista de quem recebe ainda não existe. Ela só é montada quando você clica em "Preparar lista".
3. **A lista pronta** — Ao clicar em "Preparar lista", o sistema procura os contatos do público e confere, um por um, quem pode receber. A campanha passa a "Pronta para iniciar", e "Na lista" mostra quantos vão receber: aqui, 3. Nenhuma mensagem saiu ainda. Os botões também mudaram: agora aparecem "Enviar teste" e "Iniciar envio".
4. **Quem ficou de fora, e por quê** — Em "Quem está na lista" aparece cada contato do público. "Na fila" quer dizer que a pessoa vai receber. Nos outros aparece o motivo de ter ficado de fora, como "Sem telefone no cadastro", "Pediu para não receber mensagens", "Está na lista de exclusão de campanhas" ou "Já está em outra campanha ainda não concluída". Para ver só quem ficou de fora, escolha "Fora da lista" no seletor ao lado do título.
5. **Mandar um teste antes** — Antes de começar, mande um teste para ver como a mensagem chega. Clique em "Enviar teste" e busque quem vai receber, de preferência você mesmo, cadastrado como contato. O teste sai pelo mesmo número e com o mesmo texto do envio de verdade, e não entra nos números da campanha. Atenção: "Enviar para este" manda a mensagem na hora, sem pedir confirmação. Por isso, não escolha um paciente.
6. **Começar o envio** — Quando estiver tudo certo, clique em "Iniciar envio". A tela pergunta antes quantas pessoas vão receber e avisa que o envio segue o ritmo do número e pode levar horas. Só ao clicar em "Confirmar" as mensagens começam a sair, e a campanha passa a "Enviando". "Voltar" desiste sem enviar nada.

## Acompanhar, pausar e repetir uma campanha

**Objetivo:** Ler os números de uma campanha em andamento, ver quem respondeu, ajustar o ritmo, pausar e mandar de novo com "Duplicar".

**Quem pode:** admin

**Palavras de busca:** acompanhar campanha, quem respondeu, pausar campanha, parar o envio, resultado da campanha, repetir campanha, duplicar campanha, mensagens entregues

1. **Abrir a campanha que está enviando** — Clique na campanha com o selo "Enviando". Aqui é a "Avaliação nutricional de outubro", que começou a sair há algumas horas.
   - Rota: `/app/campaigns`
2. **Os números da campanha** — Os quatro quadros resumem o envio. "Na lista": quantos vão receber. "Enviadas": quantas já saíram. "Entregues": quantas chegaram ao celular da pessoa. "Responderam": quantos responderam dentro do prazo definido em "Configuração" (72 horas, se ninguém mudou). Em "Progresso", a barra mostra quanto da lista já foi feito; embaixo aparecem quantas mensagens ainda não foram enviadas, quantas falharam e quantos pediram para parar. Enquanto a campanha está enviando, os números se atualizam sozinhos a cada 10 segundos.
3. **Quem respondeu** — Em "Quem está na lista", cada pessoa aparece com a situação dela: "Na fila" (ainda vai receber), "Enviada", "Entregue", "Lida", "Respondeu" ou o motivo de ter ficado de fora. O seletor ao lado do título filtra a lista. Aqui escolhemos "Responderam" e sobrou o Pedro. A resposta dele chega na Inbox, como qualquer mensagem.
4. **Deixar o envio mais devagar** — Em "Ritmo desta campanha" dá para deixar o envio mais devagar mesmo com ele em andamento. Esta campanha espera pelo menos 120 segundos entre uma mensagem e outra, manda no máximo 40 por dia e só envia das 8h às 19h. Campo em branco usa o ritmo do número. Depois de mudar, clique em "Salvar ritmo".
5. **Pausar e retomar** — Para parar o envio por um tempo, clique em "Pausar", no alto. A campanha fica "Pausada" e ninguém mais recebe até alguém clicar em "Retomar". Uma mensagem que já estava saindo na hora da pausa ainda pode chegar. Para desistir de vez, use "Cancelar campanha": a tela pede confirmação, e depois quem ainda não recebeu não recebe mais e a campanha não volta a rodar. A campanha também pode ficar "Pausada" sozinha, quando o envio inteiro falha. Nesse caso aparece "Último problema" embaixo do nome, dizendo o que houve: corrija a causa e clique em "Retomar".
6. **Mandar de novo com Duplicar** — Uma campanha "Concluída" não envia de novo. Para repetir a ideia, abra a campanha e clique em "Duplicar". A cópia nasce como "Rascunho", com a mesma mensagem, o mesmo público e o mesmo ritmo, mas sem a lista e sem os números da campanha antiga. O que estava em "Quem responder" (funil e agente) e os números extras não vêm junto: abra "Editar" e escolha de novo.
   - Rota: `/app/campaigns`
7. **A cópia na lista** — Depois de clicar em "Duplicar", a tela continua na campanha antiga, sem aviso. A cópia aparece na lista de Campanhas, com "(cópia)" no fim do nome e o selo "Rascunho". Abra a cópia, use "Editar" para trocar o nome e revisar a mensagem, e siga a lição "Preparar a lista e iniciar o envio".

