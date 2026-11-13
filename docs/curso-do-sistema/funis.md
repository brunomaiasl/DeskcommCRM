# Funis

- **Tela:** `/app/kanban`
- **Resumo:** Onde você acompanha cada negócio da empresa num quadro: cada cliente é um cartão que anda pelas etapas, do primeiro contato até ganhar ou perder.
- **Fonte:** `curso/licoes/funis.json`

## Conhecendo a tela de Funis

**Objetivo:** Reconhecer a lista de funis, os botões do topo e abrir o quadro de um funil.

**Quem pode:** admin

**Palavras de busca:** funis, funil de vendas, kanban, quadro de clientes, pipeline, onde ficam os negócios

1. **A lista de funis** — Um funil é o caminho que um cliente percorre até fechar com você, dividido em etapas. Esta tela lista os funis da empresa. A Clínica Bem Viver tem um: "Pacientes". O selo "Padrão" marca o funil onde entra, sozinho, quem manda a primeira mensagem pelo WhatsApp da clínica (com o WhatsApp conectado).
   - Rota: `/app/kanban`
2. **Os botões do topo** — "Novo funil" cria outro funil, por exemplo um só para pilates ou para odontologia. "Importar planilha" traz de uma vez uma lista de clientes que você já tem, num arquivo CSV: cada linha vira um cartão na primeira etapa do funil escolhido. Ao lado de cada funil ficam "Renomear" e "Arquivar"; você usa esses botões na última lição.
3. **A janela de importar planilha** — Escolha em "Funil de destino" para onde os clientes vão e clique em "Escolher o arquivo CSV". CSV é um formato de planilha: no Excel, use Arquivo › Salvar como › CSV; no Google Planilhas, Arquivo › Fazer download › CSV. "Baixar planilha modelo" baixa um exemplo com as colunas certas. No fim, a janela mostra quantos cartões foram criados, as colunas que ela não reconheceu e as linhas recusadas, com o motivo.
4. **Abrindo o quadro do funil** — Feche a janela e clique no nome do funil para abrir o quadro dele. É no quadro que você trabalha no dia a dia: ele mostra todos os clientes do funil, etapa por etapa.

## Lendo o quadro do funil

**Objetivo:** Entender as colunas, os números do topo de cada etapa e o que cada cartão mostra.

**Quem pode:** admin

**Palavras de busca:** quadro, colunas do funil, etapas, cartão do cliente, valor do negócio, quanto tenho em cada etapa

1. **Cada coluna é uma etapa** — O quadro tem uma coluna para cada etapa do funil, na ordem em que o cliente avança. Cada cartão é um negócio com um cliente. No topo da coluna aparecem o nome da etapa, quantos cartões ela tem e a soma do valor desses cartões.
   - Rota: `/app/kanban`
2. **O que o cartão mostra** — Em cima fica o título do negócio e, logo abaixo, o valor. A linha com o balão é a última mensagem da conversa com esse cliente: clicar nela abre a conversa na Inbox. O número verde no fim dessa linha conta as mensagens que ninguém leu ainda. Depois vêm o telefone do contato, quem é o responsável e há quanto tempo o cartão está nesta etapa ("3h" são três horas).
3. **Quem cuida de cada negócio** — O círculo com iniciais mostra o responsável. Círculo cheio é uma pessoa da equipe, como Ana Ribeiro. Círculo vazado, só com o contorno, é um agente de IA, como a Bia. O círculo tracejado com "Sem responsável", como no cartão da Mariana, avisa que ninguém está cuidando daquele negócio.
4. **Negócio esfriando** — Quando um negócio fica parado, sem conversa nem mudança, por mais tempo que o normal da etapa (sem ajuste, um dia), o cartão ganha uma faixa laranja do lado esquerdo e o aviso "Sem resposta há…" logo abaixo do valor. O rodapé deixa de mostrar o tempo na etapa. É o mesmo aviso da tela Radar. Se já existe um retorno agendado com o cliente, o cartão não ganha o aviso. Aqui, a avaliação do Sérgio está parada há quatro dias: é hora de procurar esse cliente.
5. **As etapas de ganho e de perda** — Role o quadro para o lado para ver as outras etapas. Neste funil, "Em tratamento", a terceira coluna, é a etapa de ganho: o cartão que chega nela conta como negócio fechado. "Cancelado", a última coluna, é a etapa de perda. As colunas que dizem "vazio" ainda não têm nenhum cartão. No topo das etapas de ganho e de perda aparece também o valor "ponderado": na de ganho ele é igual à soma, porque o negócio já fechou; na de perda é zero.
6. **Quadro ou calendário** — No alto, "Quadro" e "Calendário" trocam o jeito de ver o mesmo funil. O calendário espalha os cartões pelos dias de um campo de data que você cria no funil, como a data da avaliação (a data de fechamento previsto não entra). Este funil ainda não tem campo de data, então o calendário avisa isso. Os campos se criam em CRM › "Ver tudo em CRM" › "Etapas do funil".

## Achando o negócio certo

**Objetivo:** Usar a busca e os filtros do quadro para ver só os cartões que interessam.

**Quem pode:** admin

**Palavras de busca:** buscar cliente no funil, filtro, filtrar por responsável, negócios perdidos, atrasados, etiqueta

1. **A barra de filtros** — Acima das colunas fica a barra de filtros. A caixa de busca procura no título e na descrição dos negócios. Os botões ao lado filtram por responsável, por situação ("Status") e por etiqueta ("Tag"). "Apenas atrasados" mostra só os negócios abertos com data de fechamento prevista que já passou.
   - Rota: `/app/kanban`
2. **Buscando pelo nome** — Digite parte do título, por exemplo "pilates". O quadro passa a mostrar só os cartões que combinam com o que você digitou. O botão "Limpar filtros" aparece no fim da barra e desfaz tudo de uma vez.
3. **Filtrando por responsável** — Limpe a busca e abra "Responsável". "Sem responsável" mostra os negócios que ninguém pegou; "Eu" mostra os seus. Abaixo vêm as outras pessoas da equipe e os agentes de IA. Escolha "Ana Ribeiro" para ver só a carteira dela.
4. **Só a carteira da Ana** — Agora o quadro mostra só os negócios da Ana, e o botão passa a dizer "Responsável: Ana Ribeiro". O número no topo de cada coluna e a soma do valor também passam a contar só o que está visível.
5. **Vendo os negócios perdidos** — Em "Status", "Perdidos" mostra só os negócios que não fecharam; eles ficam na etapa de perda, "Cancelado", no fim do quadro. Com esse filtro ligado aparece o botão "Motivo", que separa as perdas pelo motivo escolhido na hora de perder, como "Preço". Ao lado pode aparecer "Categoria", que agrupa as perdas por quem causou: o cliente, a própria clínica ("Nós"), a concorrência ou a falta de resposta. É um jeito rápido de ver por que os clientes desistem.
6. **Negócios atrasados** — Marque "Apenas atrasados" para ver os negócios abertos cuja data de fechamento prevista já passou. Aqui aparece a avaliação do Sérgio, que ficou de confirmar a data e sumiu: é o cliente para procurar hoje.

## Criando um negócio novo

**Objetivo:** Pôr um cliente no funil à mão, ligado ao contato dele.

**Quem pode:** admin

**Palavras de busca:** novo lead, criar negócio, adicionar cliente no funil, novo cartão, cadastrar oportunidade

1. **O botão "Novo Lead"** — Quando um cliente chega por telefone ou no balcão, você mesmo cria o cartão dele. Clique em "Novo Lead", no alto do quadro. O sistema chama cada negócio de "lead".
   - Rota: `/app/kanban`
2. **Escolha o contato** — Comece pelo contato: digite o nome ou o telefone e clique na pessoa certa. Se ela ainda não está cadastrada, "Criar contato" cadastra ali mesmo. Um negócio sem contato não recebe WhatsApp nem entra nas automações.
3. **Preencha o negócio** — Ao escolher o contato, o título vem com o nome dele; troque por algo que diga o que está sendo negociado. Em "Etapa" já vem a primeira etapa do funil. Preencha o "Valor" e, se quiser, a data de "Fechamento previsto" e etiquetas em "Tags", separadas por vírgula. Se quiser falar com o cliente logo depois, "Salvar e iniciar conversa" cria o negócio e abre a conversa com o contato.
4. **O cartão novo no quadro** — Clique em "Criar lead". O cartão aparece na etapa escolhida, com o valor, o telefone e a última conversa do contato. O quadro desce sozinho até o cartão novo; os outros continuam lá em cima. Como a Beatriz ainda não tem ninguém fixo cuidando dela, ele nasce "Sem responsável". Para escolher quem cuida, use o menu do cartão, que você conhece na próxima lição.

## Andar com o negócio: mover, ganhar e perder

**Objetivo:** Mudar o cartão de etapa, trocar o responsável e fechar o negócio como ganho ou perdido, um por um ou vários de uma vez.

**Quem pode:** admin

**Palavras de busca:** mover cartão de etapa, arrastar, marcar como ganho, marcar como perdido, motivo da perda, trocar responsável, selecionar vários

1. **Arrastar muda a etapa** — Para mudar um negócio de etapa, segure o cartão e arraste até a coluna nova. Para os outros comandos, passe o mouse no cartão: aparecem os três pontinhos no canto de cima. Clique neles para abrir o menu do cartão.
   - Rota: `/app/kanban`
2. **O menu do cartão** — "Editar" muda título, valor, descrição e data prevista. "Responsável" passa o negócio para outra pessoa ou para um agente de IA. "Marcar como ganho" e "Marcar como perdido" fecham o negócio. "Levar para outro funil" recria o negócio em outro funil e fecha este como perdido; com um funil só, a janela avisa que não há para onde levar. "Excluir" apaga o cartão, mas o contato e as conversas continuam.
3. **Perder com motivo** — "Marcar como perdido" sempre pede o motivo. Escolha o que aconteceu, aqui "Sem resposta do cliente", e clique em "Confirmar". O cartão vai para a etapa de perda do funil. Os motivos ficam guardados e depois aparecem no filtro "Motivo".
4. **Ganhar o negócio** — Quando o cliente fecha, abra o menu do cartão (aqui, o da Juliana) e clique em "Marcar como ganho". O cartão vai para a etapa de ganho do funil, aqui "Em tratamento", e conta como negócio fechado. Sem ajuste no funil, se depois ele voltar para uma etapa aberta, o negócio é reaberto.
5. **O cartão foi para a etapa de ganho** — O cartão da Juliana saiu de "Consulta agendada" e agora está em "Em tratamento", a etapa de ganho. O da avaliação do Roberto, que você marcou como perdido, foi para "Cancelado", no fim do quadro.
6. **Selecionar vários cartões** — Para mexer em vários negócios de uma vez, passe o mouse no cartão e marque a caixinha ao lado do título. Para marcar a etapa inteira, use a caixinha que aparece no topo da coluna. Segurar Ctrl (Cmd no Mac) e clicar no cartão também marca.
7. **A barra de ações em grupo** — Com cartões marcados, aparece uma barra embaixo. "Mover para…" muda todos de etapa, "Responsável…" passa todos para alguém, "Tag…" põe uma etiqueta, "Marcar como perdido…" fecha todos com um motivo e "Excluir" apaga. "Cancelar", ou a tecla Esc, desmarca tudo.

## A ficha do negócio

**Objetivo:** Abrir um cartão e usar a ficha: conversa, contato, dados do negócio, tarefas e histórico.

**Quem pode:** admin

**Palavras de busca:** abrir cartão, detalhes do negócio, ficha do lead, histórico do negócio, editar valor, tarefas do cliente

1. **Clique no cartão** — Clique no título do cartão para abrir a ficha do negócio, que desliza pela direita. Vamos abrir a avaliação do Roberto.
   - Rota: `/app/kanban`
2. **O topo da ficha** — No topo ficam o título, o valor, a etapa e o responsável. Logo abaixo, "Abrir conversa no Inbox" leva direto para a conversa com esse cliente, com a última mensagem à mostra. "Editar campos" pula para os dados do negócio.
3. **Os dados do contato** — A parte "Contato" mostra telefone e e-mail de quem está negociando; a aba "Links" guarda Instagram, site e outros endereços. "Abrir no WhatsApp" abre o WhatsApp do seu computador ou celular, fora do sistema: para a conversa ficar guardada aqui, prefira "Abrir conversa no Inbox". "Ver ficha completa do contato" leva para a tela do contato. Em "Pessoas relacionadas", "Adicionar participante" liga outras pessoas ao negócio, como quem paga.
4. **Editar os dados do negócio** — Em "Dados do negócio" você corrige título, descrição, valor, data de fechamento prevista e etiquetas. Troque o valor e clique em "Salvar". A ficha continua aberta, para você ver a mudança entrar no histórico.
5. **Tarefas e histórico** — Em "Tarefas", "Nova tarefa" anota o próximo passo combinado com o cliente, com prazo e responsável. A "Linha do tempo", no fim da ficha, registra tudo o que aconteceu com o negócio: aqui já aparece "Dados do negócio alterados", avisando que o valor mudou agora há pouco.

## Criar, renomear e arquivar funis

**Objetivo:** Criar um funil novo, mudar o nome dele, arquivar e excluir um funil que não serve mais.

**Quem pode:** admin

**Palavras de busca:** criar funil, novo funil, renomear funil, arquivar funil, excluir funil, funis arquivados

1. **Dê um nome ao funil** — Clique em "Novo funil" e escreva o nome, por exemplo "Pilates". Depois clique em "Criar funil". O funil novo já nasce com quatro etapas: "Novo", "Em andamento", "Ganho" e "Perdido". Você troca os nomes delas na tela "Etapas do funil".
   - Rota: `/app/kanban`
2. **O funil novo na lista** — O funil aparece no fim da lista. As setinhas à esquerda mudam a ordem dos funis. "Tornar padrão" faz quem escreve pela primeira vez no WhatsApp da clínica entrar por este funil, no lugar do atual; só use quando quiser mesmo trocar.
3. **Renomear** — Clique em "Renomear" na linha do funil, mude o nome e aperte Enter (ou clique em "Salvar"). O nome muda na lista e no quadro.
4. **Arquivar** — "Arquivar" tira o funil da lista e ele para de receber negócios novos, mas nada é apagado. A pergunta aparece logo abaixo do funil. "Excluir de vez" só funciona em funil que não tem nenhum negócio, nem aberto nem encerrado; se tiver, o sistema recusa e explica por quê.
5. **A gaveta dos arquivados** — O funil arquivado vai para "Funis arquivados", embaixo da lista. Clique para abrir a gaveta. "Tirar do arquivo" traz o funil de volta para a lista; "Excluir de vez" apaga e libera o nome.
6. **Excluir de vez** — Antes de apagar, o sistema pergunta de novo, porque não tem volta: o funil e as etapas dele somem. Clique em "Excluir de vez" para confirmar, ou "Cancelar" para desistir.
7. **De volta ao começo** — Pronto: o funil de teste sumiu e a lista voltou a ter só "Pacientes". Quando não sobra nenhum funil arquivado, a gaveta "Funis arquivados" também some.

