# Notificações

- **Tela:** `/app/settings/notifications`
- **Resumo:** Onde você escolhe sobre o que quer ser avisado, como o aviso aparece na tela e no celular, os lembretes de tarefa e os sons da equipe.
- **Fonte:** `curso/licoes/notificacoes.json`

## Conhecendo a tela de notificações

**Objetivo:** Saber até onde os avisos chegam nesta instalação e escolher, por tipo de aviso, se ele aparece na tela.

**Quem pode:** admin

**Palavras de busca:** notificações, avisos, desligar aviso, aviso de mensagem nova, notificação no navegador, parar de receber avisos, configurar alertas

1. **Onde ficam as notificações** — Clique em "Configurações", no rodapé do menu lateral, para abrir a lista de todas as configurações. Notificações fica no grupo "Sua conta": é onde você decide sobre o que quer ser avisado e por onde.
   - Rota: `/app/settings`
2. **Até onde os avisos chegam** — O quadro amarelo no topo diz o que esta instalação consegue fazer. Na imagem, ele avisa que os avisos só aparecem enquanto o site está aberto numa aba: faltam as chaves do servidor, e quem cuida do servidor resolve rodando a atualização da instalação, que cria essas chaves. Se na sua tela o quadro falar em conexão segura (https), quem cuida do servidor precisa ligar um domínio com https. Se ele disser que os avisos já funcionam "inclusive com a aba fechada", não falta nada. O link "Receber no celular: instalar o app" leva ao passo a passo de pôr o sistema no celular.
3. **Os tipos de aviso** — A tabela lista os seis tipos de aviso: "Nova mensagem", "Lead atribuído a você", "Lead ganho" e "Lead perdido" (dos negócios em que você é o responsável), "Você foi mencionado" (quando alguém cita você numa nota interna de conversa) e "Ligação recebida" (só para quem usa a telefonia do sistema). Cada coluna é um jeito de ser avisado. "In-app" é a janelinha que surge no canto da tela com o site aberto. "Push" é a notificação do próprio computador ou celular, que aparece mesmo com outra janela na frente; com o site fechado, só se o quadro do topo disser que a instalação consegue. "Email" ainda não está disponível. Nesta foto a coluna Push aparece apagada: o navegador usado bloqueou as notificações, como explicamos no passo 5.
4. **Desligar um aviso na tela** — Clique no interruptor da linha e da coluna que quer mudar. Aqui, desligamos a janelinha de "Lead perdido": quando um negócio em que você é o responsável for marcado como perdido, nada aparece no canto da tela. A mudança vale na hora e não tem botão de salvar. Ela fica guardada só neste navegador: no celular ou em outro computador, cada um escolhe de novo.
5. **O interruptor que manda nos outros** — O "Push" de "Nova mensagem" é a chave geral dos avisos fora do site neste aparelho: desligado, nenhum outro aviso vai para a bandeja e os outros interruptores de Push ficam travados. Os interruptores de Push de cada tipo só valem com o site aberto; com o site fechado, quem manda é só essa chave geral. Na imagem, o navegador está bloqueando as notificações. Por isso a linha mostra "O navegador bloqueou as notificações" e a coluna Push fica apagada: os interruptores até aparecem ligados, mas não valem nem mudam enquanto o navegador bloquear. Para liberar, clique no ícone à esquerda do endereço do site (um cadeado ou dois tracinhos), permita as notificações e recarregue a página.

## Lembretes de tarefa

**Objetivo:** Escolher quando o sistema avisa sobre tarefas perto do prazo ou vencidas, e se o aviso chega também no WhatsApp.

**Quem pode:** admin

**Palavras de busca:** lembrete de tarefa, aviso de prazo, tarefa vencida, avisar antes de vencer, lembrete no whatsapp, não esquecer retorno ao cliente

1. **O quadro dos lembretes** — Mais abaixo na tela fica "Lembretes de tarefa". Ele avisa o responsável quando o prazo de uma tarefa chega perto, mesmo que ninguém esteja com o site aberto: o aviso fica guardado na Central. De fábrica, o aviso de prazo perto vem ligado, com 1 hora de antecedência.
   - Rota: `/app/settings/notifications`
2. **Mudar a antecedência** — Em "Antecedência do aviso", escolha entre 15 minutos, 1 hora ou 1 dia. Aqui escolhemos "1 dia": o aviso chega 24 horas antes do prazo. A escolha é salva na hora e é só sua: cada pessoa da equipe escolhe os próprios lembretes.
3. **Avisar quando a tarefa vence** — Ligue "Avisar quando a tarefa vence sem conclusão" para receber um aviso quando o prazo passar e a tarefa ainda não estiver concluída. Ele vem desligado de fábrica. O aviso sai uma vez só por tarefa, sem repetir.
4. **Receber também no WhatsApp** — Ligue "Receber também no WhatsApp" e digite o seu número só com algarismos, começando pelo 55 do Brasil e o DDD, como pede o campo "Número com DDD, só dígitos". Ao sair do campo, ele é salvo. A mensagem sai pelo número de WhatsApp da empresa, e só quando ele estiver conectado. Ela traz só o nome da tarefa e aparece na caixa de entrada como uma conversa com o seu contato. O seu número precisa estar cadastrado como contato no sistema: sem isso, o lembrete fica só na Central.

## O que o aviso mostra e os sons

**Objetivo:** Decidir o que os avisos mostram com o celular bloqueado e conhecer os sons dos avisos da equipe.

**Quem pode:** admin

**Palavras de busca:** privacidade da notificação, esconder mensagem no celular bloqueado, tela bloqueada, som do aviso, trocar som da notificação, aviso sonoro

1. **O que aparece fora do site** — O quadro "O que os avisos mostram fora do app" decide o que aparece no aviso do celular bloqueado e nas notificações do computador. A escolha vale para toda a empresa. De fábrica, fica em "Mostrar quem mandou (recomendado)": aparecem o nome e a foto do cliente, mas não o que ele escreveu.
   - Rota: `/app/settings/notifications`
2. **Esconder tudo** — Para mais sigilo, escolha "Esconder tudo": o aviso diz só que chegou algo, sem o nome do cliente nem a mensagem. A mudança é salva assim que você clica. Só administradores podem mudar; os outros da equipe veem a escolha, com o aviso "Quem decide é um administrador."
3. **Os sons dos avisos** — No fim da tela ficam os "Sons dos avisos". Eles tocam com o site aberto quando chega um aviso na Central. "Etapa que avisa" toca quando um negócio entra numa etapa do funil marcada para avisar. "Precisa de uma pessoa" toca quando o atendimento automático passa a conversa para alguém da equipe, ou quando ele para porque acabou o saldo do serviço de IA. Clique em "Ouvir" para escutar o som.
4. **Trocar por um som seu** — Hoje as duas linhas dizem "Som do sistema": é o som de fábrica. Clique em "Trocar som" e escolha um arquivo de áudio MP3, OGG ou WAV de até 1 MB no seu computador. O som novo vale para toda a equipe, e a linha passa a dizer "Som personalizado". Para voltar ao som de fábrica, aparece o botão "Usar o do sistema". Trocar e voltar o som é para gerentes e administradores.

