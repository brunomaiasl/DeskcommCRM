# Follow-ups

- **Tela:** `/app/ai/followups`
- **Resumo:** Mensagens de retorno que saem sozinhas para o paciente que parou de responder: os fluxos prontos, o construtor e a fila de quem está sendo acompanhado.
- **Fonte:** `curso/licoes/follow-ups.json`

## Conhecendo os Follow-ups

**Objetivo:** Saber o que é um fluxo de follow-up, ler o cartão de cada fluxo e reconhecer os três estados: Ativo, Rascunho e Desativado.

**Quem pode:** admin

**Palavras de busca:** follow-up, retorno automático, paciente sumiu, parou de responder, fluxos, mensagem automática, reengajar cliente

1. **Fluxos e Fila** — Um follow-up é uma sequência de mensagens que sai sozinha para o paciente que parou de responder. A aba "Fluxos" mostra os fluxos da clínica. A aba "Fila" mostra quem está ou já passou por um fluxo, quando sai a próxima mensagem e os retornos que a IA combinou com o paciente. Para criar um fluxo, use "Começar de um modelo" (textos prontos para clínica), "Novo fluxo" (desenhar do zero) ou "Importar fluxo" (trazer um arquivo exportado).
   - Rota: `/app/ai/followups`
2. **O cartão de um fluxo** — Cada fluxo é um cartão. No alto ficam o nome e a situação. "Versão: publicada" quer dizer que o fluxo já foi publicado ao menos uma vez. "Handoff" diz o que o fluxo faz quando uma pessoa da equipe assume a conversa do paciente: "Pausar" (espera a pessoa), "Cancelar" (encerra o fluxo) ou "Permitir" (continua mandando). Embaixo aparece a data da última alteração.
3. **Ativo, Rascunho e Desativado** — O selo no canto do cartão diz a situação do fluxo. "Ativo": publicado e pronto para receber pacientes. "Rascunho": ainda não foi publicado e não manda mensagem para ninguém. "Desativado": foi publicado, mas alguém o desligou. Ele não recebe pacientes novos, mas quem já estava dentro segue até o fim. Para parar alguém, cancele o fluxo dessa pessoa na Fila.
4. **Os botões do cartão** — "Renomear" troca o nome do fluxo. "Duplicar" cria uma cópia com "(cópia)" no nome, sempre como rascunho. "Exportar" baixa o fluxo num arquivo que o botão "Importar fluxo" aceita, aqui ou em outra conta. "Excluir" pede confirmação e apaga o fluxo junto com o histórico de quem passou por ele; não dá para desfazer. Para abrir o fluxo, clique no nome dele.

## Começar por um modelo pronto

**Objetivo:** Instalar um fluxo de modelo, com os textos já escritos, sem mandar mensagem para ninguém.

**Quem pode:** admin

**Palavras de busca:** modelo pronto, começar de um modelo, instalar fluxo, follow-up pronto, exame, consulta, falta, cirurgia

1. **Os modelos prontos** — Clique em "Começar de um modelo". Abre a lista de modelos prontos, com os textos já escritos para as quatro vezes em que um paciente costuma sumir: consulta, exame, cirurgia e falta. Instalar não manda mensagem para ninguém: o fluxo nasce como rascunho para você revisar. O selo "Já instalado" marca os modelos que a clínica já tem.
   - Rota: `/app/ai/followups`
2. **O que cada modelo diz** — Cada modelo mostra a etapa do paciente (aqui, "Exame"), o nome, para que serve, quantas mensagens o paciente recebe se nunca responder, por quanto tempo o fluxo acompanha e o que faz o fluxo começar ("Dispara quando"). Este começa quando o negócio do paciente entra numa etapa do funil, por isso pede que você escolha a etapa.
3. **Escolher a etapa do funil** — A lista mostra as etapas dos seus funis, com o nome do funil depois do ponto. Escolha a etapa em que o paciente fica quando o exame foi pedido. Aqui escolhemos "Em tratamento", do funil "Pacientes".
4. **Instalar** — Com a etapa escolhida, o botão "Instalar" fica liberado. Sem a etapa, ele continua apagado. Ao clicar, o fluxo é criado como rascunho e o construtor abre em seguida.
5. **O rascunho no construtor** — O fluxo foi criado com o nome do modelo e o selo "Rascunho", e o construtor já abriu nele. Ali você lê as mensagens, ajusta para o jeito da sua clínica e publica. Enquanto for rascunho, ele não manda mensagem para ninguém.

## Lendo um fluxo no construtor

**Objetivo:** Entender o desenho de um fluxo: as peças, a ordem em que acontecem e onde fica o texto de cada mensagem.

**Quem pode:** admin

**Palavras de busca:** construtor, editar fluxo, desenho do fluxo, mensagem do follow-up, mudar texto, peças, aguardar resposta

1. **O construtor** — Ao abrir um fluxo, aparece o construtor. À esquerda, em "Adicionar nó", ficam as peças que você pode pôr no fluxo, como "Aguardar", "Ação" (mandar uma mensagem) e "Fim". Clique numa peça para adicioná-la. No meio fica o desenho do fluxo, que começa no "Início" e segue pelas linhas.
   - Rota: `/app/ai/followups/be300000-0000-4000-8000-000000000001`
2. **A ordem das mensagens** — Este fluxo segue da esquerda para a direita. Do "Início" ele manda a primeira mensagem ("Retoma a marcação") e espera a resposta. Se o paciente não responde no prazo, ele aguarda mais um pouco e manda a próxima mensagem. O desenho continua para a direita, com mais esperas e mensagens; para ver o resto, arraste o fundo do desenho para o lado.
3. **O texto da mensagem** — Clique numa peça para abrir os detalhes dela à direita. Nesta, "Como escrever a mensagem" está em "Texto fixo": o paciente recebe exatamente o texto do campo "Texto enviado ao contato", sem IA. As outras opções são "Mensagem escrita pela IA" e "Modelo de mensagem pronto". O que você muda vale para o rascunho; para guardar, use "Salvar" na barra de cima.
4. **Esperar a resposta** — A peça "Espera a resposta" segura o fluxo até o paciente responder ou o prazo acabar. Em "Esperar a resposta por (minutos)" fica o prazo: aqui, 2880 minutos, ou dois dias. Se o prazo acaba sem resposta, o fluxo segue pelo caminho "Sem resposta", até a próxima mensagem. Em "Regras de texto" fica uma palavra (aqui, "quero") que leva a um caminho próprio, mas ela só é usada quando "Cancelar se o lead responder", no gatilho do fluxo, está desligado.

## Quando o fluxo começa e quando ele pausa

**Objetivo:** Ler e ajustar o gatilho que coloca o paciente no fluxo, e escolher o que acontece quando uma pessoa da equipe assume a conversa.

**Quem pode:** admin

**Palavras de busca:** gatilho, quando começa, silêncio, minutos sem responder, etapa do funil, cancelar se responder, pausar handoff

1. **A barra do fluxo** — No alto do construtor ficam o nome do fluxo, a situação e os botões. O botão do gatilho diz o que coloca o paciente no fluxo. Aqui é "Gatilho: Silêncio (1440 min)": o paciente entra 1440 minutos (um dia inteiro) depois da última mensagem que ele mandou, mesmo que a clínica não tenha respondido. Ao lado fica a escolha do que fazer quando uma pessoa assume a conversa.
   - Rota: `/app/ai/followups/be300000-0000-4000-8000-000000000001`
2. **Ajustar o gatilho** — Clique no botão do gatilho para ver os detalhes. "Tipo de gatilho" escolhe o que faz o fluxo começar. Em "Minutos de silêncio" fica quanto tempo depois da última mensagem do paciente conta como sumiço (aqui, 1440). Os campos de baixo limitam quem entra e quantas vezes. Preencha "Silêncio máximo" e "Quantas vezes no máximo, por contato", e ligue "Só começar se a equipe já respondeu a última mensagem do cliente". Sem isso, o fluxo pode chegar a pacientes sumidos há meses e se repetir sem fim.
3. **Os tipos de gatilho** — Além de "Silêncio", o fluxo pode começar por "Etapa do funil" (o negócio entra numa etapa), "Falta confirmada pela equipe" (a equipe marca na agenda que o paciente faltou), "Agente pediu ajuda", "Cliente voltou" (volta a falar depois de um tempo), "Lead criado" (um negócio novo é criado), "Automação (Webhooks)" ou só à mão ("Manual").
4. **Quem entra, quem sai e salvar** — Mais abaixo, com "Só começar se a equipe já respondeu a última mensagem do cliente" ligado, quem está esperando a clínica não entra no fluxo. Com "Cancelar se o lead responder" ligado, qualquer resposta do paciente tira ele do fluxo. Mudou algo no gatilho? Clique em "Salvar gatilho". O botão só fica liberado quando há alguma mudança.
5. **Quando uma pessoa assume a conversa** — Esta lista escolhe o que o fluxo faz quando alguém da equipe assume a conversa do paciente. "Pausar durante handoff" para o fluxo enquanto a pessoa atende. "Cancelar durante handoff" encerra o fluxo. "Permitir durante handoff" deixa as mensagens continuarem. A escolha vale assim que você clica, sem precisar salvar.

## Publicar e ligar no agente

**Objetivo:** Publicar um rascunho, saber para que servem Desativar e Rollback, e ligar o fluxo no agente para as mensagens saírem sozinhas.

**Quem pode:** admin

**Palavras de busca:** publicar fluxo, ativar follow-up, desativar, rollback, voltar versão, ligar no agente, fluxo não dispara

1. **Um rascunho pronto para publicar** — Este fluxo, "Falta · remarcar quem não veio", está como "Rascunho". Depois de revisar as mensagens, clique em "Publicar". O "Salvar" só guarda o rascunho, e fica liberado quando há alterações não salvas.
   - Rota: `/app/ai/followups/be300000-0000-4000-8000-000000000002`
2. **Publicado** — Ao publicar, o sistema confere o fluxo inteiro. Se faltar algo, a peça com problema fica com borda vermelha e o fluxo não é publicado. Deu certo: o selo vira "Ativo". Num fluxo de silêncio, podem aparecer avisos amarelos sobre limites que faltam preencher no gatilho. Leia e ajuste. "Desativar" para de receber pacientes novos, e quem já estava dentro segue até o fim. "Rollback" volta para a versão publicada anterior; por isso só fica liberado depois da segunda publicação.
3. **Quando é preciso ligar no agente** — Alguns fluxos só colocam pacientes sozinhos se estiverem ligados num agente publicado: os que usam a IA ("Mensagem escrita pela IA", "Classificar (IA)" ou uma espera em que a IA escolhe a hora) e os que começam por "Falta confirmada pela equipe", como o "Falta · remarcar quem não veio". Para ligar, abra Agentes, clique em "Editar" e role até o bloco "Follow-up". Ligue "Habilitar gatilhos automáticos de follow-up" e marque o fluxo em "Fluxos publicados".
   - Rota: `/app/ai/agents`
4. **Salvar e publicar o agente** — Ligou e marcou? Volte ao alto da tela do agente. Enquanto a mudança não for salva, aparece "Sem rascunho para publicar." e o "Publicar" fica apagado. Clique em "Salvar rascunho" e depois em "Publicar". Enquanto o agente não for publicado de novo, a mudança não vale para os pacientes.

## A Fila: quem está sendo acompanhado

**Objetivo:** Ler a Fila, entender cada situação, achar um paciente e cancelar um retorno quando ele não faz mais sentido.

**Quem pode:** admin

**Palavras de busca:** fila de follow-up, quem vai receber mensagem, próximo disparo, retorno agendado, promessa da IA, cancelar follow-up, pausado

1. **Quem está ou passou por um fluxo** — A aba "Fila" lista cada paciente que está ou passou por um fluxo, e os retornos que a IA combinou. Cada linha mostra o paciente, o fluxo (e o agente que cuida dele), o passo em que ele está (ou o motivo do retorno), quando sai a próxima mensagem e a situação. O passo aparece como um código curto, como "resposta-2"; o nome completo aparece quando você abre o histórico do paciente. Quem tem a próxima mensagem mais cedo aparece primeiro.
   - Rota: `/app/ai/followups`
2. **As situações** — "Aguardando resposta": a mensagem já saiu e o fluxo espera o paciente. "Pausado (atendimento humano)": alguém da equipe assumiu a conversa. "Pausado por uma pessoa": alguém segurou o fluxo de propósito. "Cancelado": o fluxo terminou antes do fim, por exemplo, quando o paciente responde. Na linha do Pedro aparece "Promessa" e "Agendada": é um retorno que a IA combinou com ele na conversa.
3. **Achar um paciente** — Digite o nome ou o telefone em "Buscar contato…" para achar alguém na Fila. Aqui digitamos "Lucas". Os dois filtros ao lado mostram só uma situação ("Todos os status") ou só um fluxo ("Todos os fluxos").
4. **Cancelar um retorno** — O botão "Cancelar" aparece, para gerente e administrador, nas linhas que ainda não terminaram, inclusive as pausadas. Ele sempre pede confirmação. Num retorno combinado pela IA, a pergunta é "Cancelar este retorno?": o agente não volta a falar com a pessoa no horário combinado. Num fluxo, a pergunta é "Cancelar este follow-up?" e não dá para desfazer. "Voltar" fecha a pergunta sem cancelar nada.

## O histórico de um paciente no fluxo

**Objetivo:** Abrir o histórico de um paciente no fluxo, ver onde ele está e o que já aconteceu, e pausar, adiar ou pular um passo.

**Quem pode:** admin

**Palavras de busca:** histórico do follow-up, o que aconteceu, pausar follow-up, adiar mensagem, pular passo, onde está o paciente, dossiê

1. **Abrir pelo nome** — Na Fila, o nome do paciente é um link. Clique nele para abrir o histórico daquele paciente no fluxo. Os retornos combinados pela IA não têm link, porque são um aviso só, com dia e motivo.
   - Rota: `/app/ai/followups`
2. **Onde ele está agora** — No alto aparecem o nome, a situação, o fluxo, o agente, quando começou e quantos passos já deu. O quadro "Onde está agora" diz o passo atual e quando o fluxo volta a andar. O Antônio já recebeu duas mensagens e o fluxo espera a resposta da segunda.
3. **Mexer no fluxo de um paciente** — "Pausar" segura o fluxo até alguém clicar em "Retomar". "Adiar" escolhe um novo dia e hora para o próximo passo. "Pular este passo" segue em frente sem esperar. "Cancelar follow-up" tira o paciente do fluxo de vez e não dá para desfazer.
4. **Pular para qual caminho** — Quando o passo tem mais de um caminho, o sistema pergunta "Por onde seguir?" em vez de escolher sozinho. Cada opção mostra para onde o fluxo vai e em que caso esse caminho é usado. Para desistir sem mudar nada, feche no X.
5. **O que já aconteceu** — Mais abaixo, "O que já aconteceu" conta, em ordem, cada passo do fluxo: as mensagens enviadas, as esperas e quando o paciente não respondeu no prazo. Cada linha mostra também o passo e a hora.

