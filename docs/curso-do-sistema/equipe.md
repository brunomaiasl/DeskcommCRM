# Equipe

- **Tela:** `/app/team`
- **Resumo:** Quem trabalha no sistema, com qual papel, o que cada um vê no menu, como as conversas são divididas e o horário de cada atendente.
- **Fonte:** `curso/licoes/equipe.json`

## Conhecendo a tela Equipe

**Objetivo:** Achar a tela Equipe, entender a lista de membros e saber trocar o papel, tirar e devolver o acesso de alguém.

**Quem pode:** admin

**Palavras de busca:** equipe, membros, funcionários, quem tem acesso, papel do usuário, tirar acesso de funcionário, permissões

1. **Onde fica a Equipe** — A tela Equipe fica nas Configurações, no grupo "Sua empresa". É nela que você vê quem trabalha no sistema, com qual papel, e quantas conversas cada pessoa aguenta ao mesmo tempo. Para seguir, clique em "Equipe".
   - Rota: `/app/settings`
2. **Duas abas e o botão de convite** — A tela tem duas abas. "Membros" lista as pessoas com acesso e os convites enviados. "Atendimento" mostra como as conversas são distribuídas e o horário de cada um. O botão "Convidar membros" chama gente nova; ele só aparece para quem é Administrador.
   - Rota: `/app/team`
3. **A lista de membros** — Cada linha é uma pessoa: nome e e-mail, o papel, a interface (o que ela vê no menu), a situação e a última vez que entrou no sistema. "Aceito" quer dizer que a pessoa aceitou o convite e tem acesso (o Carlos ainda não entrou, por isso a última atividade dele está vazia); "Revogado", que ela perdeu o acesso. Na sua própria linha aparece "você": ninguém troca o próprio papel nem tira o próprio acesso.
4. **Trocar o papel de alguém** — Clique no papel de uma pessoa para trocá-lo. "Somente leitura" consulta sem atender. "Atendente" atende as conversas. "Gerente" também acompanha a equipe e ajusta o atendimento. "Administrador" pode tudo nesta empresa, inclusive convidar e tirar pessoas. A troca vale assim que você escolhe, sem botão de salvar. Atenção: quem passa para "Somente leitura" deixa de atender, e as conversas abertas que estavam com essa pessoa voltam para a Fila. O sistema não deixa rebaixar o último Administrador.
5. **Tirar o acesso de alguém** — No botão de três pontinhos da linha fica "Revogar acesso". Ao confirmar em "Revogar", a pessoa não entra mais nesta empresa, as conversas abertas que estavam com ela voltam para a Fila, sem dono, e ela sai da lista de responsáveis dos números de atendimento. A linha dela continua na lista, com o selo "Revogado". O sistema não deixa revogar o último Administrador. Aqui, só olhe: feche em "Cancelar". O aviso fala em "tenant": é o mesmo que esta empresa.
6. **Devolver o acesso** — O Marcos saiu da clínica e teve o acesso revogado. Se ele voltar, não precisa de convite novo: nos três pontinhos da linha dele aparece "Devolver acesso". O clique já devolve, sem pedir confirmação, e ele volta a entrar com o mesmo papel que tinha antes. Se ele atendia algum número, coloque-o de novo como responsável em Configurações › Distribuição de atendimento: essa parte não volta sozinha.

## Convidar alguém para a equipe

**Objetivo:** Mandar convites, acompanhar se chegaram e reenviar, copiar ou cancelar um convite.

**Quem pode:** admin

**Palavras de busca:** convidar, adicionar funcionário, novo usuário, convite não chegou, link de convite, cadastrar atendente

1. **O botão de convite** — Para chamar alguém para trabalhar no sistema, clique em "Convidar membros", no alto da tela Equipe.
   - Rota: `/app/team`
2. **Preencher o convite** — No campo "Emails", escreva um e-mail por linha. Escolha em "Papel" o acesso que as pessoas vão ter nesta empresa. Depois clique em "Enviar convites"; o resultado aparece logo abaixo do botão, com a situação de cada convite. Nesta foto os e-mails estão preenchidos, sem enviar.
   - Rota: `/app/team/invite`
3. **Acompanhar os convites** — De volta à aba "Membros", abaixo da equipe fica a lista "Convites". Ela mostra o papel, o "Status" ("Pendente", "Expirado", "Aceito" ou "Revogado"), se o e-mail saiu, quando foi enviado, até quando vale e quem convidou. Quando aparece "Não saiu", o e-mail não foi entregue: use "Copiar link" e mande o link para a pessoa por WhatsApp. Se o convite estiver "Expirado", primeiro use "Reenviar" para renovar o prazo e só depois copie o link. Se o convite foi reenviado, a data mostra quantas vezes, como "(reenviado 1x)".
   - Rota: `/app/team`
4. **Reenviar ou cancelar** — Nos três pontinhos de um convite em aberto ficam três opções. "Reenviar" renova o convite por mais 24 horas e tenta mandar o e-mail de novo; serve também para convite expirado. "Copiar link" copia o link do convite. "Revogar" cancela: a pessoa não consegue mais entrar com aquele link. O Gerente vê esta lista, mas só o Administrador mexe nela.

## Escolher o que cada pessoa vê no menu

**Objetivo:** Deixar o menu de uma pessoa mais simples, sem mudar o que o papel dela permite.

**Quem pode:** admin

**Palavras de busca:** menu simplificado, esconder telas, interface, personalizar menu, o que o funcionário vê

1. **A coluna Interface** — A coluna "Interface" diz como está o menu de cada pessoa: "Completa", "Simplificada" ou "Personalizada". Clique no botão de uma pessoa para mudar. Aqui, vamos abrir o da Ana.
   - Rota: `/app/team`
2. **Completa ou simplificada** — Em "Perfil de interface", "Completa" mostra todas as telas que o papel permite. "Simplificada" deixa só o dia a dia: Inbox, Agenda, Funis, Contatos, Tarefas e Conexões, além das configurações pessoais (Perfil, Segurança, Notificações e App no celular), que nunca somem. A interface muda só o menu: o que a pessoa pode fazer continua definido pelo papel.
3. **Escolher tela por tela** — Clique em "Personalizar áreas visíveis" para marcar e desmarcar telas uma a uma; ao desmarcar qualquer tela, o campo acima muda para "Personalizada". Ao clicar em "Salvar interface", o menu da pessoa muda na próxima vez que ela recarregar a página ou abrir o sistema, sem precisar sair da conta. A mudança vale só nesta empresa.

## Como as conversas são distribuídas

**Objetivo:** Escolher se as conversas novas esperam na fila ou vão sozinhas para alguém da equipe.

**Quem pode:** admin

**Palavras de busca:** distribuir conversas, rodízio, roteamento, dividir atendimento, quem recebe a conversa, fila

1. **A aba Atendimento** — Na aba "Atendimento", o quadro "Modo de roteamento" decide para quem vão as conversas novas na empresa toda. Se um número tiver regra própria em Configurações › Distribuição de atendimento, vale a regra do número (essa tela também mostra este mesmo modo, com outros nomes). Logo abaixo fica a lista de atendentes, com o plantão, a carga e o horário de cada um. Gerentes e Administradores mexem aqui; os outros papéis veem só um aviso.
   - Rota: `/app/team?aba=atendimento`
2. **Os três modos** — "Manual (atendente puxa da fila)": ninguém recebe sozinho; a conversa espera na Fila até alguém assumir. "Rodízio (distribui automático)": o sistema entrega uma conversa para cada atendente, na vez de cada um. "Menor carga (quem tem menos conversas na mão)": vai para quem está com menos conversas abertas. Nos dois automáticos, só recebe quem está de plantão, ainda tem espaço e não é "Somente leitura"; se o número tiver lista de responsáveis, só quem está nela.
   - Rota: `/app/team?aba=atendimento`
3. **Quando ninguém está livre** — Se não há ninguém disponível, o sistema espera alguns segundos e tenta de novo. É o campo "Backoff (s)", a espera entre tentativas, que começa em 60. Depois do número de "Tentativas máx." (5 de início), aparece em "Alertas" (o sino) o aviso "Uma conversa aguarda um responsável", e o sistema passa a tentar de 15 em 15 minutos. O botão "Salvar" acende quando você muda algo.
   - Rota: `/app/team?aba=atendimento`

## Plantão, carga e capacidade

**Objetivo:** Ler quem está atendendo agora e definir quantas conversas cada pessoa aguenta ao mesmo tempo.

**Quem pode:** admin

**Palavras de busca:** plantão, quem está online, capacidade, limite de conversas, disponível, atendente desligado

1. **Quem está de plantão** — A coluna "Status" tem dois selos. O de cima diz se a pessoa recebe conversas agora: "De plantão" (chave ligada e dentro do horário, ou sem horário publicado), "Fora do horário" (chave ligada, mas fora do expediente dela) ou "Desligado" (chave desligada). O de baixo diz se ela está com o sistema aberto: "Com a tela aberta" ou "Sem sinal de tela", com a hora do último sinal.
   - Rota: `/app/team?aba=atendimento`
2. **Carga e capacidade** — "Carga" é quantas conversas abertas estão com a pessoa agora. "Capacidade" é quantas ela aguenta ao mesmo tempo. Quando a carga chega à capacidade, o número fica vermelho e a distribuição automática pula essa pessoa. Para mudar, digite o novo número e clique fora do campo: salva na hora.
   - Rota: `/app/team?aba=atendimento`
3. **Ligar e desligar o plantão** — A chave "Disponível" liga e desliga o plantão de cada pessoa, e vale na hora. Desligada, a pessoa não recebe conversas pela distribuição automática, mas continua podendo assumir conversas pela Inbox. Atenção: desligada, ela também não pode ser marcada nos tipos de agendamento configurados como serviço. O Carlos está com a chave desligada.
   - Rota: `/app/team?aba=atendimento`

## Publicar o horário de atendimento

**Objetivo:** Montar a semana de trabalho de um atendente, para a distribuição respeitar o expediente e a Agenda oferecer horários.

**Quem pode:** admin

**Palavras de busca:** horário de atendimento, expediente, jornada, horários da agenda, não publicado, dias de trabalho

1. **A coluna Horário** — A coluna "Horário" mostra a semana de trabalho de cada um. "Não publicado" quer dizer que a pessoa ainda não tem horário: se a chave dela estiver ligada, a distribuição manda conversa para ela a qualquer hora, mas a Agenda não oferece nenhum horário para marcar com ela. Para montar a semana do Carlos, clique no botão do relógio ("Editar") na linha dele.
   - Rota: `/app/team?aba=atendimento`
2. **O editor de horário** — O editor começa vazio e avisa: "Nenhuma janela publicada — ninguém consegue marcar com esta pessoa." Primeiro, confira o "Fuso horário". Depois, clique em "Adicionar janela". Cada janela é um dia com hora de início e de fim.
   - Rota: `/app/team?aba=atendimento`
3. **Uma janela pronta** — A janela nova nasce na segunda, das 08:00 às 18:00. Troque o dia e as horas se precisar; a lixeira apaga a janela. Para ter manhã e tarde com intervalo, use duas janelas no mesmo dia. Com a janela de segunda-feira pronta, clique em "Copiar estes horários para os outros dias úteis".
   - Rota: `/app/team?aba=atendimento`
4. **A semana inteira** — O botão copiou as faixas da segunda para terça, quarta, quinta e sexta. Nada foi gravado ainda: dá para ajustar um dia ou cancelar. Quando estiver certo, clique em "Salvar".
   - Rota: `/app/team?aba=atendimento`
5. **Conferir o que foi gravado** — Depois de salvar, o quadro "Publicado" mostra o que ficou gravado, juntando os dias iguais: aqui, "Seg–Sex 08:00–18:00". Confira antes de sair e clique em "Fechar". A partir de agora, a Agenda mostra esses horários livres do Carlos. Lembre que a chave "Disponível" dele está desligada: ligue-a para ele também receber conversas e poder ser marcado nos agendamentos configurados como serviço.
   - Rota: `/app/team?aba=atendimento`

