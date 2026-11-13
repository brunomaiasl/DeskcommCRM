# Webhooks

- **Tela:** `/app/webhooks`
- **Resumo:** Onde você liga os formulários do seu site ao funil, vê cada contato que chegou por eles e cria avisos automáticos para outros sistemas quando algo acontece no CRM.
- **Fonte:** `curso/licoes/webhooks.json`

## Conhecendo a tela de Webhooks

**Objetivo:** Saber para que serve cada aba e ler de relance se cada formulário está ligado e recebendo contatos.

**Quem pode:** admin

**Palavras de busca:** webhooks, integração, formulário do site, landing page, receber contatos de fora, ligar outro sistema, fontes de captação

1. **As quatro abas** — A tela de Webhooks liga o CRM a outros lugares. Na aba "Receber dados" ficam as fontes: cada formulário ou landing page que traz contatos para o seu funil. "Leads recebidos" mostra tudo o que chegou por esses formulários. Em "Automações" você cria regras que agem sozinhas, como avisar outro sistema quando um paciente fecha. "Atividade" mostra o que cada automação fez.
   - Rota: `/app/webhooks`
2. **Uma fonte para cada formulário** — Cada cartão é uma fonte. O selo verde "Ativa" quer dizer que ela está aceitando contatos. "Pausada" quer dizer que ela recusa os envios: quem preencher aquele formulário não entra no funil. Embaixo do nome aparece há quanto tempo chegou o último contato, ou "nunca recebeu" se ainda não chegou nenhum. Um formulário que costumava receber todo dia e está parado há muito tempo merece uma olhada.
3. **Abrindo uma fonte** — Clique num cartão para abrir o painel da fonte, à direita. No alto ficam o nome e a situação. O lápis ao lado do nome serve para renomear a fonte. Logo abaixo vem o endereço da fonte: é ele que você cola no seu site. A próxima lição mostra como.

## Criar uma fonte para o seu formulário

**Objetivo:** Criar uma fonte nova e escolher em que funil e etapa os contatos do formulário vão entrar.

**Quem pode:** admin

**Palavras de busca:** criar fonte, conectar formulário, nova landing page, contatos do site no funil, formulário cair no funil, captar leads do site

1. **Começar uma fonte** — Para cada formulário ou landing page, crie uma fonte. Assim você sabe de onde veio cada contato e pode pausar um formulário sem mexer nos outros. Clique em "Nova fonte".
   - Rota: `/app/webhooks`
2. **Dar um nome** — Dê à fonte um nome que diga qual é o formulário. Aqui, "Formulário de avaliação postural". Depois escolha o "Funil de entrada", o funil em que o contato vai entrar. O "Estágio de entrada" (a etapa do funil) só abre depois do funil. Em "URL de obrigado", cole a página de agradecimento do seu site. Ela vale para o formulário pronto do CRM. Preencha agora: depois de criada, a fonte não deixa mudar esse endereço.
3. **Escolher o funil** — A lista mostra os funis da sua empresa. Nesta clínica de exemplo há um só, "Pacientes". Clique nele.
4. **Escolher a etapa** — Agora, em "Estágio de entrada", escolha a etapa do funil em que o contato entra. Quem preenche um formulário em geral ainda está no começo, então "Primeiro contato" costuma ser a escolha certa.
5. **Criar a fonte** — Confira o funil e o estágio e clique em "Criar fonte". Se esquecer um dos dois, a tela avisa e não cria. Capriche nessa escolha: depois de criada, a fonte não deixa trocar o funil nem o estágio.
6. **A fonte pronta** — A fonte nasce ativa, e o painel dela abre sozinho. O endereço no alto já está pronto para usar: cada envio com nome, telefone ou e-mail vira um contato no funil Pacientes, na etapa Primeiro contato. As chaves técnicas logo abaixo do endereço podem ficar desligadas. A próxima lição mostra como colocar esse endereço no seu site.

## Ligar a fonte ao seu site

**Objetivo:** Colocar o formulário no seu site, ajustar as perguntas, testar se funciona e saber pausar ou proteger a fonte.

**Quem pode:** admin

**Palavras de busca:** colar formulário no site, endereço do webhook, elementor, wordpress, testar formulário, lead de teste, perguntas do formulário

1. **O endereço da fonte** — Abra a fonte do formulário que você quer ligar. O endereço da fonte é para onde o seu formulário manda os dados. Muitos construtores de site têm um campo para colar esse endereço. O botão ao lado copia o endereço inteiro. No seu CRM, o endereço começa com o endereço da sua instalação.
   - Rota: `/app/webhooks`
2. **Perguntas extras do formulário** — Além de nome, WhatsApp e e-mail, o formulário pode ter perguntas suas. Esta fonte já pergunta "Qual é o seu objetivo?", com uma lista de opções. "+ Adicionar pergunta" cria outra: você escreve a pergunta e escolhe o tipo de resposta (texto curto, texto longo, número, moeda, lista de opções ou caixa de seleção). "Remover" tira a pergunta. O botão "Salvar perguntas" só fica disponível depois que você muda alguma coisa. As respostas ficam guardadas no lead.
3. **O formulário pronto** — Se o seu site não tem formulário, use o pronto. "Copiar formulário" copia o código, já com as suas perguntas e apontando para o endereço certo. Cole esse código numa área de código do seu site, ou entregue a quem cuida dele. Para quem enviar ver uma página de agradecimento, a fonte precisa ter sido criada com a "URL de obrigado" preenchida.
4. **Passo a passo para o seu caso** — Clique em "Como conectar no seu caso" para ver onde colar o endereço nas ferramentas mais usadas: Elementor Pro, JetFormBuilder, WordPress, Zapier ou n8n, e "Formulário próprio", que é o código pronto do passo anterior. Logo abaixo, "Para desenvolvedores" traz um exemplo técnico para quem programa.
5. **Testar a fonte** — Para ter certeza de que está tudo certo, clique em "Enviar lead de teste". Um contato chamado "Lead de Teste" entra no funil, na etapa da fonte. Quando dá certo, aparece o link "Ver no Kanban", e o envio aparece em "Últimos recebimentos". Atenção: o teste é um contato de verdade. Se você tiver automações para quando entra um contato novo, como uma mensagem de boas-vindas, elas também rodam para ele.
6. **Últimos recebimentos** — Em "Últimos recebimentos" fica cada envio que chegou por esta fonte, do mais novo para o mais antigo. O primeiro é o teste que você acabou de fazer. A bolinha verde quer dizer só que o envio chegou; a vermelha, que a assinatura não conferiu. Para saber se o envio virou lead, veja a aba "Leads recebidos". A lista se atualiza sozinha a cada 5 segundos enquanto o painel está aberto.
7. **Pausar ou excluir** — Para parar de receber contatos por um tempo, desligue "Fonte ativa": aparece o aviso "Fonte pausada.", o formulário passa a ser recusado e nada entra no funil. Ao fechar o painel, o cartão da fonte mostra "Pausada". Ligue de novo quando quiser. "Excluir fonte" desliga o endereço para sempre. Os contatos que já chegaram continuam no funil.

## Ver quem preencheu seus formulários

**Objetivo:** Encontrar cada envio dos formulários, saber se ele virou lead e entender por que um envio não entrou.

**Quem pode:** admin

**Palavras de busca:** leads recebidos, quem preencheu o formulário, formulário não chegou, lead não entrou, origem do lead, utm campanha

1. **Tudo o que chegou** — A aba "Leads recebidos" lista cada envio dos seus formulários, do mais novo para o mais antigo: quem é, o contato, por qual fonte chegou, o dia e a hora, a página de origem e o resultado. "Virou lead" quer dizer que entrou no funil. "Reenvio" é quando o sistema que envia manda de novo o mesmo envio, com o mesmo código de identificação: ele não cria outro lead. Se a mesma pessoa preencher o formulário duas vezes, cada envio vira um lead. "Não entrou" quer dizer que o envio foi recusado.
   - Rota: `/app/webhooks?aba=leads`
2. **Procurar e filtrar** — No alto ficam os filtros. Digite um nome, telefone ou e-mail e aperte Enter (ou clique na lupa). Também dá para ver só uma fonte, só um resultado ou um período, com "De" e "Até". Vamos ver só os envios que não entraram: clique em "Resultado".
3. **Só os que não entraram** — Com "Não entrou" escolhido, a lista mostra só os envios recusados. Este não tem nome: a tabela mostra "(sem identificação)". Clique nele para ver o motivo.
4. **Por que não entrou** — O painel abre com o motivo em vermelho. Aqui o formulário não mandou nome, telefone nem e-mail que o CRM reconhecesse. Logo abaixo, em "O que o formulário trouxe", você vê os nomes que o formulário usou nos campos. Com isso, quem cuida do site sabe o que corrigir.
5. **Um envio que virou lead** — Agora um envio que deu certo, o da Larissa Mendes. Em "O que o formulário trouxe" aparecem nome, telefone, e-mail e a resposta da pergunta extra. O botão "Cadastrar como campo do lead" transforma essa resposta num campo do funil, que passa a aparecer no card do lead.
   - Rota: `/app/webhooks?aba=leads`
6. **De onde veio e onde está** — Em "De onde veio" aparecem a página do formulário, o endereço de internet (IP) e o navegador de quem enviou. As linhas com "utm" dizem de qual anúncio ou campanha a pessoa veio, quando o seu link tem essa marcação. Aqui, do Instagram, campanha "avaliacao-outubro". O botão "Ver o lead no funil" abre o lead que esse envio criou.

## Avisar outro sistema quando algo acontece

**Objetivo:** Montar uma automação que manda um aviso para outro sistema (planilha, financeiro, laboratório) quando algo acontece no CRM.

**Quem pode:** admin

**Palavras de busca:** avisar outro sistema, enviar dados para outro sistema, webhook de saída, integrar com planilha, automação, quando fechar negócio avisar

1. **Suas automações** — A aba "Automações" mostra as regras da sua empresa. Cada cartão traz o nome, a situação ("Ativa" ou "Pausada"), quando ela age e quantas ações faz. A chave liga e pausa a regra. Os ícones à direita abrem a regra no designer (um desenho do caminho), editam e excluem. No alto, "Montar no designer" cria uma regra nova direto no designer. Esta regra avisa o sistema do financeiro sempre que um paciente fecha.
   - Rota: `/app/webhooks?aba=automacoes`
2. **Nome e momento** — Toda automação tem três partes: QUANDO (o que acontece), SE (uma condição, se quiser) e ENTÃO (o que fazer). Dê um nome que diga o que ela faz. Depois escolha o QUANDO: clique em "Escolha o gatilho".
3. **Quando ela age** — A lista traz tudo o que pode disparar uma automação: um contato novo, um lead que muda de etapa, um negócio ganho ou perdido, uma mensagem que chega, um horário marcado ou cancelado, e outros. Para avisar o laboratório, escolha "Quando um horário for marcado".
4. **Condição e ação** — A parte SE é opcional. Com "Adicionar condição" você limita a regra, por exemplo, a um tipo de atendimento. Para avisar sempre, deixe vazio. Na parte ENTÃO, clique em "Adicionar ação" para escolher o que a automação faz.
5. **Escolher "Avisar outro sistema"** — Entre as ações, "Avisar outro sistema (webhook)" é a que manda os dados do que aconteceu para o endereço de outro sistema. Esse outro sistema precisa ter um endereço próprio para receber avisos. É assim que o CRM conversa com um sistema de gestão ou com ferramentas como Zapier e n8n, que podem levar o aviso adiante, por exemplo para uma planilha.
6. **O endereço do outro sistema** — Cole em "Endereço (URL)" o endereço que o outro sistema te deu para receber avisos. O "Segredo (opcional)" serve para o outro sistema conferir que o aviso veio mesmo do seu CRM. Só preencha se quem cuida dele pedir; o texto cinza é só um exemplo. "Incluir o responsável no corpo" fica desligado: ligue só se o outro sistema precisar saber quem da equipe atende o cliente.
7. **Criar a automação** — Clique em "Criar automação". Ela nasce pausada, para você revisar antes, e aparece na lista com o selo "Pausada" e a chave desligada. Quando tiver revisado, ligue a chave: a partir daí, cada horário marcado manda um aviso para o endereço do laboratório. Na aba "Atividade" você confere se ele chegou.

## Conferir se o aviso chegou

**Objetivo:** Ver na aba Atividade se cada automação funcionou e o que fazer quando um aviso não chega.

**Quem pode:** admin

**Palavras de busca:** atividade das automações, aviso não chegou, webhook falhou, reenviar aviso, histórico de automações, erro 404

1. **O que cada automação fez** — A aba "Atividade" mostra cada vez que uma automação agiu, da mais recente para a mais antiga. Cada cartão traz o nome da regra, há quanto tempo foi e o resultado. "Sucesso" quer dizer que todas as ações da regra deram certo; num aviso, que o outro sistema respondeu que recebeu. "Falhou" quer dizer que nenhuma ação deu certo; num aviso, que o outro sistema não aceitou ou não respondeu.
   - Rota: `/app/webhooks?aba=atividade`
2. **Quando o aviso falha** — Embaixo da ação que falhou aparece o que o outro sistema respondeu. Aqui é "http_404": o endereço não foi encontrado do outro lado. Em geral é endereço digitado errado ou que mudou. Confira o endereço na automação (o lápis do cartão, na aba Automações). Depois volte aqui e clique em "Reenviar": o mesmo aviso sai de novo e um cartão novo mostra o resultado.
3. **Ver as novidades** — Se algo acabou de acontecer e ainda não aparece na lista, clique em "Atualizar" para buscar as execuções mais novas.

