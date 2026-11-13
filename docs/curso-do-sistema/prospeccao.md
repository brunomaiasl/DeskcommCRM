# Prospecção

- **Tela:** `/app/prospecting`
- **Resumo:** Onde você procura empresas no Google Maps, escolhe quais abordar e deixa um agente de IA começar a conversa com elas pelo WhatsApp, aos poucos, acompanhando quem responde.
- **Fonte:** `curso/licoes/prospeccao.json`

## Conhecendo a tela de Prospecção

**Objetivo:** Encontrar a Prospecção dentro de Ver tudo em CRM e entender as campanhas, os números e a tabela de empresas.

**Quem pode:** admin

**Palavras de busca:** onde fica prospecção, encontrar empresas, prospectar clientes, abordar empresas no whatsapp, lista de empresas para vender, campanha de prospecção, captar clientes novos

1. **Prospecção mora em Ver tudo em CRM** — Abra "Ver tudo em CRM", no grupo "CRM" do menu lateral. Na parte "O dia a dia da venda" fica o cartão "Prospecção". O caminho é CRM › Ver tudo em CRM › Prospecção: ela não tem atalho próprio no menu lateral.
   - Rota: `/app/crm`
2. **Para que serve** — A Prospecção serve para achar empresas e começar uma conversa com elas pelo WhatsApp, com a ajuda de um agente de IA. A tela segue três etapas: "1. Encontrar empresas" é a busca; "2. Preparar a abordagem" define quem conversa e como; "3. Acompanhar resultados", mais abaixo, mostra cada empresa. Ao abrir, a tela mostra a campanha mais recente.
   - Rota: `/app/prospecting`
3. **Suas campanhas** — Cada busca vira uma campanha na lista "Suas campanhas", com o segmento e a região no nome. Embaixo do nome aparecem a situação e quantas empresas a busca trouxe: "Preparar campanha" (nada foi enviado ainda), "Em andamento" (enviando), "Pausada" ou "Abordagens concluídas". A campanha aberta fica com a borda colorida. Clique na campanha dos escritórios de contabilidade para abri-la.
4. **Os números da campanha** — O quadro do alto mostra a situação da busca, quanto ela custou na Apify e a situação da campanha ("Pausada"). Os números contam empresas: "Encontrados" é tudo o que a busca trouxe e "Na fila" espera a vez da primeira mensagem. "Responderam" já escreveram de volta. "Pediram para parar" estão bloqueados para novas mensagens. "Qualificados" chegaram à etapa do funil que você marcou como de qualificados. "Score médio" é a média do Score das empresas, que você vai conhecer na lição sobre escolher as empresas.
5. **A tabela de empresas** — Em "3. Acompanhar resultados", cada linha é uma empresa: nome, segmento e telefone; endereço, site, nota e avaliações no Google; a situação em "Progresso"; e a análise em "Auditoria". Em "Progresso" a empresa passa por "Encontrado", "Na fila", "Preparando abordagem" e "Abordado" e, depois, "Respondeu" e "Qualificado". Quando aparece "Não abordado", o motivo vem logo abaixo, como "Sem telefone brasileiro válido.".

## Configurar e fazer uma busca

**Objetivo:** Salvar a chave da Apify, dizer quem assina as mensagens e pedir uma busca de empresas por segmento e região.

**Quem pode:** admin

**Palavras de busca:** chave da apify, configurar prospecção, buscar empresas no google maps, quanto custa a busca, nome nas mensagens da prospecção, vocabulário por nicho, nova busca de empresas

1. **A busca precisa de uma chave** — Na instalação padrão, as empresas vêm da Apify, um serviço de fora que procura negócios no Google Maps e cobra cada busca do seu saldo lá. Por isso a Prospecção precisa da chave da sua conta na Apify. Na primeira vez, sem chave salva, os quadros de configuração já aparecem abertos e o botão "Buscar empresas" fica apagado. Depois, eles ficam atrás do botão "Configurar busca".
   - Rota: `/app/prospecting`
2. **A chave da Apify** — Em "Chave da Apify", cole a chave da sua conta na Apify. No site da Apify ela fica em Configurações e aparece com o nome "API token". Depois clique em "Salvar chave". Antes de gravar, o sistema confere a chave com a Apify: se ela não for aceita, nada é salvo e aparece o aviso. Aceita, ela fica cifrada no servidor, os quadros se fecham e aparece "Chave de busca salva.". A chave salva não volta a aparecer; para trocar, cole a nova e salve de novo.
3. **Quem assina as mensagens** — No quadro "Voz e vocabulário", preencha "Seu nome", "O que você faz" e "Diferencial": a IA escreve a primeira mensagem na voz dessa pessoa. Em "Vocabulário por nicho", escreva uma linha por segmento no formato "termo: valor". Quando o segmento da busca contém o termo, a estratégia de abordagem usa o seu valor para falar do que aquele tipo de empresa quer ganhar. Clique em "Salvar personalização": vale para todas as campanhas.
4. **O que e onde procurar** — No quadro "1. Encontrar empresas", escreva em "Público ou segmento" o tipo de empresa e em "Cidade ou região" onde ela fica, do jeito que você pesquisaria no Google Maps. "Até quantas empresas" é o máximo que a busca traz, de 1 a 100. "Teto da busca (US$)" é o máximo que esta busca pode gastar do seu saldo na Apify, de US$ 0,50 a US$ 10.
   - Rota: `/app/prospecting`
5. **As opções e o botão de buscar** — As três opções vêm marcadas. "Enriquecer com e-mails comerciais e redes encontradas no site" pede à busca os contatos publicados no site de cada empresa. "Avaliar o site de cada empresa automaticamente" faz o sistema abrir cada site e anotar o que encontrou, sem gastar IA. "Gerar a prévia da mensagem automaticamente" faz a IA escrever um rascunho da primeira mensagem para cada empresa marcada e consome crédito de IA; ela só funciona com a avaliação do site ligada. Clique em "Buscar empresas".

## Escolher as empresas que serão abordadas

**Objetivo:** Ler o Score, a auditoria do site e a prévia de cada empresa e deixar de fora quem não deve receber mensagem.

**Quem pode:** admin

**Palavras de busca:** score da prospecção, auditoria do site, prévia da mensagem, desmarcar empresa, tirar empresa da lista, escolher quem abordar

1. **Leia cada empresa** — Com a busca concluída, a campanha fica em "Preparar campanha" e cada empresa aparece como "Encontrado". Na coluna "Auditoria", o "Score" soma três sinais: a nota no Google, o número de avaliações e a situação do site. Embaixo vem o resumo do site, como "Site com problemas", "Sem site próprio" ou "Site em ordem", e, por último, o começo da prévia: o rascunho da primeira mensagem que a IA preparou. No alto da tabela, o seletor "Ordenar" com a opção "Score" põe primeiro as empresas com mais pontos.
   - Rota: `/app/prospecting`
2. **A auditoria completa** — Clique em "Ver detalhes" para abrir a "Auditoria do site" da empresa: os problemas encontrados, o que o site já tem, o que falta e uma sugestão de estratégia de abordagem, pensada para quem vende site ou automação. "Reanalisar site" abre o site de novo na hora. "Prévia da abordagem" pede à IA uma prévia nova, que fica guardada no lugar da anterior e consome crédito de IA. Para fechar, aperte Esc ou clique fora da janela.
3. **Deixe de fora quem não abordar** — Na coluna "Abordar", todas as empresas vêm marcadas, e só as marcadas entram na fila quando você iniciar as abordagens. Para deixar uma de fora, desmarque a caixa dela. Aqui a clínica tira o "Castro Lima Advogados Associados", que tem só 6 avaliações.
   - Rota: `/app/prospecting`
4. **As empresas desmarcadas** — A empresa desmarcada sai da lista na hora, e o botão "Mostrar desmarcadas" passa a contar 2. Clique nele para ver quem ficou de fora; marcar a caixa de novo traz a empresa de volta. "Marcar todas" e "Desmarcar todas" mudam a lista inteira de uma vez. "Excluir desmarcadas" apaga essas empresas da campanha depois de pedir confirmação; numa busca futura, elas podem aparecer de novo.

## Preparar a abordagem, iniciar e ajustar o ritmo

**Objetivo:** Escolher o agente, a conexão e o funil da campanha, definir o ritmo e as regras da primeira mensagem, iniciar as abordagens e ajustar o ritmo de uma campanha pausada.

**Quem pode:** admin

**Palavras de busca:** iniciar abordagens com ia, agente da prospecção, ritmo de envio da prospecção, pausar campanha de prospecção, retomar fila, legítimo interesse, opção de parar de receber

1. **Quem vai conversar** — Em "2. Preparar a abordagem" você escolhe o agente de IA que manda a primeira mensagem e atende as respostas. Há dois caminhos. "Configurar por conversa" abre um assistente que pergunta o que você oferece e o que quer descobrir, monta um agente novo e deixa você testá-lo em "Testar como cliente" antes de publicar. "Usar agente existente / configurar manualmente" usa um agente que você já publicou. A clínica vai usar a Bia, que já atende o WhatsApp.
   - Rota: `/app/prospecting`
2. **Agente, conexão e funil** — Em "Agente de IA", escolha o agente: a lista só mostra agentes publicados, em modo automático e sem pausa. Em "Conexão de saída", escolha o número que envia as mensagens. Só aparecem conexões ativas, e ele precisa ser um número conectado pelo QR Code: o número oficial da Meta ainda não serve para a Prospecção. Em "Funil", o funil em que as empresas entram. "Etapa inicial" é onde elas começam e "Etapa de qualificados" é a etapa que marca quem se qualificou na conversa. As duas etapas precisam ser diferentes.
3. **A oferta e quando qualificar** — Em "O que a IA deve oferecer e como iniciar", explique a oferta e o objetivo da primeira conversa; o texto se soma às instruções do agente nas conversas desta campanha. Em "Quando considerar o cliente qualificado", diga o que precisa ficar confirmado. "O que esta campanha vende" tem três opções fixas: site profissional, automação do atendimento e automações com N8N. Elas mudam o Score e a estratégia sugerida, e pelo menos uma fica marcada; como nenhuma é a oferta da clínica, ela deixa a que já vem.
4. **Ritmo e entrada no funil** — "Máximo em 24 horas" (de 1 a 50) e "Intervalo mínimo (minutos)" (de 5 a 1440) são o ritmo da campanha: no máximo tantas abordagens a cada 24 horas, com pelo menos tantos minutos entre uma e outra. Aqui a clínica usa 10 por dia, com 30 minutos de intervalo. Em "Quando a empresa entra no funil", a opção recomendada só cria o contato, o negócio e a conversa quando a empresa recebe a primeira mensagem; "Todas ao iniciar" cria tudo para a fila inteira assim que você inicia.
5. **A saída, a base legal e o início** — Em "Quando oferecer a opção de parar de receber", a recomendada já põe na primeira mensagem como parar de receber. A clínica escolhe "Atrasar para a 2ª mensagem": a primeira só cumprimenta e confirma se é a empresa certa, sem oferta, e a instrução para parar vai na seguinte. Em "Referência da avaliação de legítimo interesse", informe o documento real que justifica abordar essas empresas; ele não é o consentimento delas. Clique em "Iniciar abordagens com IA".
6. **Pausar e retomar** — Depois de iniciada, a campanha mostra o ritmo e os botões de controle. Enquanto envia ("Em andamento"), aparece "Pausar abordagens". Pausada, como esta, ela mostra "Editar ritmo" e "Retomar fila". Com a campanha pausada, você também pode marcar e desmarcar na tabela as empresas que ainda estão na fila. Clique em "Editar ritmo".
   - Rota: `/app/prospecting`
7. **Ajustar o ritmo** — Mude "Máximo em 24 horas" e "Intervalo mínimo (minutos)" e clique em "Salvar ritmo". A campanha continua pausada, a linha "Ritmo" passa a mostrar os números novos e aparece "Ritmo atualizado. A campanha continua pausada.". O ritmo é a única parte da configuração que muda depois de iniciada. Para voltar a enviar, clique em "Retomar fila": o próximo envio já usa o ritmo novo.

