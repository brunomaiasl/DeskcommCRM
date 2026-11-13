# Conversões

- **Tela:** `/app/settings/conversoes`
- **Resumo:** Onde você liga a conta de anúncios para avisar à Meta quais clientes do anúncio viraram venda, confere o que chegou e marca a origem de quem vem pelo site.
- **Fonte:** `curso/licoes/conversoes.json`

## Conhecendo a tela e ligando a Meta

**Objetivo:** Entender para que serve a tela de Conversões e o que cada campo da conexão com a Meta faz.

**Quem pode:** admin

**Palavras de busca:** conversões, devolver venda ao anúncio, ligar meta ads, token da meta, conjunto de dados, anúncio facebook instagram venda, pixel

1. **Onde fica** — Clique em "Configurações", no rodapé do menu lateral, para abrir a lista de todas as configurações. "Conversões" fica no grupo "Sua empresa". Clique no cartão para abrir a tela.
   - Rota: `/app/settings`
2. **Para que serve a tela** — Quando um paciente que veio de um anúncio fecha e o negócio é marcado como ganho, o valor da venda volta para a plataforma do anúncio. É esse retorno que ensina o anúncio a procurar mais gente parecida com quem comprou. A tela tem quatro abas: "Configuração" (a conexão com a Meta, um cartão do Google Ads, as vendas que não chegaram e a marcação de quem vem pelo site), "Histórico de envios" (cada tentativa de envio), "Diagnóstico" (a saúde da ligação com o Google Ads) e "Links rastreáveis" (links que marcam de onde o cliente veio).
   - Rota: `/app/settings/conversoes`
3. **A conexão com a Meta** — O primeiro cartão, sem título, logo abaixo dos avisos, é o da conta de anúncios do Facebook e do Instagram (Meta). Em "Identificador do destino de conversões" vai o número da fonte de dados que recebe as vendas. Ele fica no Gerenciador de Eventos da Meta, em Fontes de dados. Em "Token de acesso" vai a chave gerada ali mesmo, nas configurações dessa fonte de dados. Aqui ela já foi salva: o campo aparece vazio, com "Gravado. Deixe em branco para manter.", porque a chave nunca volta para a tela. A chave "Reportar vendas automaticamente" liga e pausa o envio. Depois de mexer, clique em "Salvar conexão".
4. **Conferir com o código de teste** — Para conferir se as vendas estão chegando sem bagunçar os números do anúncio, cole em "Código de teste (opcional)" o código que o gerenciador de eventos da Meta mostra e salve. Enquanto ele estiver preenchido, as vendas vão marcadas como teste e não contam para o anúncio aprender. Depois de salvar, aparece um aviso azul no alto da tela para lembrar disso; na foto o código ainda não foi salvo. Terminou de conferir? Apague o código e salve de novo. As vendas que fecharem durante o teste aparecem nas pendências como "Evento recebido em modo de teste". Depois de apagar o código, clique em "Verificar ou tentar novamente" em cada uma para que contem de verdade.

## O que a Meta recebe além da venda

**Objetivo:** Saber quando ligar o envio pelo número de WhatsApp, preencher a página do anúncio e escolher o que cada etapa do funil avisa à Meta.

**Quem pode:** admin

**Palavras de busca:** anúncio clique para whatsapp, id da página, conta whatsapp business, evento por etapa do funil, avisar meta agendamento, lead qualificado meta

1. **Venda pelo canal da conversa** — Esta chave só vale para quem NÃO preencheu a conexão direta do cartão de cima. Como esta clínica já tem a conexão, aqui ela não muda nada. Sem a conexão direta, a venda de quem veio de anúncio pode sair pelo provedor do número de WhatsApp. Isso só funciona quando o número foi conectado por um provedor parceiro que faz esse repasse e que já está ligado à sua fonte de dados da Meta. Um número conectado pelo QR Code não envia nada por aqui. Saem para o provedor o valor, a moeda, o telefone do cliente e a conversa. A chave vem desligada e salva assim que você clica: ligue só se a sua política de privacidade cobre esse uso.
   - Rota: `/app/settings/conversoes`
2. **Página e conta do WhatsApp Business** — Quando a venda vem de um anúncio que abre conversa no WhatsApp, a Meta exige saber de qual página do Facebook ou de qual conta do WhatsApp Business ela veio. Sem isso, a Meta recusa a venda. Preencha só um dos dois campos: "ID da Página" ou "ID da conta do WhatsApp Business". A Meta aceita um ou outro, não os dois juntos. Depois clique em "Salvar".
3. **O que cada etapa do funil avisa** — Além da venda, a Meta pode ficar sabendo de quem agendou ou recebeu orçamento. Assim o anúncio aprende antes de a venda fechar. Cada etapa aberta do funil tem uma linha e uma chave. O contador mostra quantas etapas estão enviando. Clique em "Usar o recomendado" para o sistema sugerir pelo nome de cada etapa.
4. **A sugestão aplicada** — A etapa "Consulta agendada" foi ligada com o evento "Lead enviado". A sugestão vem do nome da etapa: nomes com agendamento, consulta, visita ou reunião viram "Lead enviado"; com orçamento, proposta ou cotação viram "Início de compra (orçamento)"; com qualificação ou interesse viram "Lead qualificado". Em "Evento enviado à Meta" você pode trocar o evento (o nome entre parênteses é o que a Meta usa, pode ignorar). Etapas sem sugestão ficam como estavam. A etapa de ganho não aparece aqui, porque a venda já vai pela conexão.
5. **Salvar as regras** — A sugestão só vale depois de clicar em "Salvar regras". O evento sai uma vez por negócio, quando ele entra na etapa, seja pela equipe, pela IA ou por uma automação. Só vale para quem veio de anúncio da Meta, e vai sem valor: o valor vai junto com a venda. Negócios que já estavam na etapa antes de você ligar não são enviados.

## Vendas que não chegaram ao anúncio

**Objetivo:** Ler a lista de vendas que não foram reportadas, entender o motivo de cada uma e mandar de novo depois de corrigir.

**Quem pode:** admin

**Palavras de busca:** venda não chegou na meta, conversão não reportada, reprocessar venda, venda sem valor, meta recusou a venda, pendências de conversão

1. **A lista do que não chegou** — Mais abaixo, na aba "Configuração", fica "Conversões que não foram reportadas": as vendas de anúncio cujo envio ainda não foi confirmado pela plataforma. Ao lado do título aparece quantas conversões a plataforma já aceitou. Cada linha mostra o negócio, o evento, a origem, o valor, o que houve (com a instrução do que fazer), quando foi e o botão para tentar de novo. Aparecem só as 20 mais recentes; para ver todas, use a aba "Histórico de envios".
   - Rota: `/app/settings/conversoes`
2. **Venda sem valor** — A avaliação da Bruna Tavares foi marcada como ganha sem valor preenchido, e a Meta exige valor e moeda numa compra. Clique no nome do negócio para abri-lo, preencha o valor e volte aqui. Então clique em "Verificar ou tentar novamente": o sistema agenda um novo envio e a linha mostra "Reprocessamento agendado".
3. **Venda recusada pela Meta** — Quando a Meta recusa, o texto pequeno abaixo do motivo é a resposta dela, às vezes em inglês. Aqui ela diz que faltou a página ou a conta do WhatsApp Business. É só preencher o cartão "Página e conta do WhatsApp Business das vendas de clique-para-WhatsApp", mais acima, e depois clicar em "Verificar ou tentar novamente" nesta linha.
4. **Venda esperando nova tentativa** — Na linha da Sofia Andrade houve uma falha passageira, e o sistema já agendou uma nova tentativa sozinho: não precisa fazer nada. Lembre do aviso acima da lista: a plataforma aceitar o envio não garante que ela ligou a venda ao anúncio. Para ter certeza, confira no gerenciador da plataforma.

## Histórico de envios e diagnóstico

**Objetivo:** Conferir tudo o que foi enviado, filtrar as falhas e ver a saúde da ligação com o Google Ads.

**Quem pode:** admin

**Palavras de busca:** histórico de conversões, conferir envio para meta, id do evento, conversões com falha, diagnóstico google ads, google ads não configurado

1. **Abrir o histórico** — A aba "Histórico de envios" mostra cada tentativa de mandar uma venda ou etapa às plataformas: as que deram certo, as que falharam e as que nem saíram. Clique nela.
   - Rota: `/app/settings/conversoes`
2. **Filtros e lista** — No alto ficam os filtros: período (abre nos últimos 30 dias), status, evento, plataforma e uma busca pelo nome do negócio. Escolha e clique em "Filtrar". Abaixo aparece quantos envios há e a lista. O selo de cada linha diz o resultado: "Entregue", "Falhou", "Aguardando" (o envio está na fila: o sistema vai tentar de novo ou espera a confirmação da plataforma) ou "Não enviado" (falta algo do seu lado). Linhas "Lead enviado" são avisos das etapas do funil, não vendas.
3. **Os detalhes de um envio** — Clique numa linha para abrir os detalhes. Aqui, a venda que a Meta recusou: em cima vem o motivo e a resposta da Meta. "ID do evento" é o código para achar esta venda no gerenciador da plataforma; nos envios entregues aparece também o "Protocolo". Logo abaixo ficam o valor e quando a venda aconteceu. "Abrir negócio" leva ao negócio no funil e, como este envio não foi entregue, aparece também "Verificar ou tentar novamente".
4. **Só as falhas** — Para ver só o que deu errado, escolha "Falhas" em "Status" e clique em "Filtrar". O endereço da página guarda os filtros: dá para mandar o link para quem cuida dos anúncios conferir a mesma lista. Quem recebe o link precisa ser administrador desta empresa no sistema; os outros cargos não abrem esta tela.
5. **Diagnóstico do Google Ads** — A aba "Diagnóstico" mostra a saúde da ligação com o Google Ads em cartões, cada um com o próximo passo. Verde está bem, amarelo pede atenção e vermelho é problema. Nesta instalação o Google Ads ainda não foi preparado por quem instalou o sistema, e o primeiro cartão diz o que falta com nomes técnicos em maiúsculas: copie esse texto e mande para quem cuida do servidor. Não é nada que você tenha feito.

## Links rastreáveis

**Objetivo:** Criar um link de WhatsApp por campanha ou botão e ver quantos cliques, contatos e negócios cada um trouxe.

**Quem pode:** admin

**Palavras de busca:** link rastreável whatsapp, saber de onde veio o cliente, link da bio instagram, quantos cliques no link, link por campanha, utm

1. **Os links e o que trouxeram** — Na aba "Links rastreáveis" você cria um link de WhatsApp para cada campanha ou botão. Quem clica abre o WhatsApp com um código curto na mensagem. Se a pessoa enviar sem apagar o código, o sistema liga a conversa àquele link. A tabela mostra os cliques, os contatos e os negócios de cada link e se ele está ativo.
   - Rota: `/app/settings/conversoes?aba=links`
2. **Editar um link** — Clique em "Editar" na linha do link. O formulário abaixo recebe os dados dele: nome, WhatsApp com código do país, mensagem inicial, onde será usado e os campos de campanha. A foto mostra a parte de baixo do formulário. Em "Mensagem inicial" você muda o texto; em "Prévia da mensagem" confere como ele vai sair com um código de exemplo no fim. Cada clique recebe o seu próprio código. Depois de mudar, clique em "Salvar link".
3. **O link e o script para o site** — Com o link aberto, aparecem logo abaixo dois caminhos, cada um com seu botão de copiar. O link vai onde você controla o endereço, como a bio, o anúncio ou um botão. O script é um pedacinho de código que quem cuida do seu site cola uma vez em todas as páginas; com ele, os botões de WhatsApp normais daquele número continuam como estão e o código entra sozinho. Use só um script por número. Em "URL do site", digite o endereço da sua página começando com https:// e clique em "Verificar instalação": o sistema abre o site numa aba (permita a abertura) e, em até 20 segundos, diz se achou o script. Se não confirmar, confira com quem cuida do site antes de concluir que está faltando.
4. **Criar um link novo** — Para começar do zero, clique em "Novo link". O formulário volta ao começo, com uma mensagem inicial sugerida e "Site" já escolhido. Dê um nome que você reconheça, como o da campanha, informe o WhatsApp com código do país (por exemplo +5511…), ajuste a mensagem, escolha onde será usado (Site, Anúncio ou Orgânico) e clique em "Salvar link".

## Marcar quem chega pelo site

**Objetivo:** Ligar o endereço de captura para que quem toca no botão de WhatsApp da sua página entre no CRM com a origem da campanha.

**Quem pode:** admin

**Palavras de busca:** botão whatsapp do site, origem do cliente site, landing page whatsapp, endereço de captura, script do site, de qual campanha veio

1. **O endereço de captura** — No fim da aba "Configuração" fica "Quem chegou pelo site". O jeito mais simples é o endereço de captura: em vez do link comum do WhatsApp, o botão da sua página aponta para um endereço do sistema. Ele guarda de qual campanha a pessoa veio e abre o WhatsApp com um código curto no texto. Em "Para qual WhatsApp mandar" já aparece o número da clínica. O texto que a pessoa vai enviar precisa manter o pedaço "[ref:{token}]" no fim: é ali que o código curto entra. Sem ele, o botão de salvar não libera.
   - Rota: `/app/settings/conversoes`
2. **Copiar e salvar** — Em "Cole este endereço no botão da sua página" está o endereço pronto. Os campos entre chaves só são preenchidos pela Meta quando ficam nos parâmetros de URL do anúncio. Se a página atende mais de uma campanha, o botão precisa repassar o que a página recebeu, senão a conversa entra sem origem. Clique em "Copiar endereço" e cole no botão de WhatsApp da sua página. Depois clique em "Salvar endereço de captura": a chave já vem ligada, mas o endereço só funciona depois de salvo.
3. **O script do site aparece** — Salvo o endereço, o cartão "Script para instalar no site", um pouco acima, passa a mostrar o script. É o outro caminho: em vez de trocar o botão pelo endereço, quem cuida do seu site cola esse pedacinho de código uma vez em todas as páginas e mantém os botões normais de WhatsApp. Ele guarda a origem enquanto a pessoa navega e ajusta os botões do número salvo. Clique em "Copiar script do site" se for usar esse caminho. Se trocar o número, copie o script de novo.
4. **Onde a origem aparece** — O código só vale na primeira mensagem do contato e nunca apaga uma origem que já existia, nem a de um anúncio. Só viajam dados da campanha, nenhum dado pessoal. A origem aparece na ficha do contato e no filtro "Site (landing page)" da lista de contatos.

