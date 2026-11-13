# Contatos

- **Tela:** `/app/contacts`
- **Resumo:** A lista de todos os clientes da empresa: achar, cadastrar, corrigir, juntar repetidos e trazer contatos de planilha ou do celular.
- **Fonte:** `curso/licoes/contatos.json`

## Conhecendo a lista de contatos

**Objetivo:** Reconhecer as partes da tela de Contatos e ler o que cada linha da lista conta sobre o cliente.

**Quem pode:** admin

**Palavras de busca:** contatos, lista de clientes, cadastro de clientes, pacientes, telefone do cliente, status do contato, bloqueado, última atividade

1. **As três partes da tela** — Em Contatos ficam todas as pessoas que a sua empresa atende, mesmo as que ainda não mandaram mensagem. No alto ficam os botões para cadastrar, juntar repetidos, trazer e levar contatos. Logo abaixo fica a barra de busca e filtros. Embaixo fica a lista, com um cliente por linha.
   - Rota: `/app/contacts`
2. **O que cada coluna mostra** — Cada linha mostra o nome, o e-mail, o telefone e as etiquetas do cliente (aqui chamadas de "Tags"). "Última atividade" diz quando houve o último movimento com ele, como uma mensagem: hoje e ontem aparecem com a hora, os dias mais antigos com a data. A coluna "Status" usa selos: "Ativo" é o cliente normal e "Bloqueado" é quem pediu para não receber mais mensagens.
3. **Os atalhos no fim da linha** — No fim de cada linha ficam até três atalhos. O balão abre a conversa desse cliente na Inbox. Quando o cliente tem telefone mas nunca conversou, o balão começa uma conversa nova na Inbox, para você escrever primeiro. Isso precisa de um número de WhatsApp conectado em "Conexões". Sem telefone e sem conversa, o balão não aparece. O lápis edita o cadastro sem sair da lista, e a lixeira exclui o contato. Clicar no nome abre a ficha completa do cliente.
4. **Quantos contatos há** — No pé da lista aparece quantos contatos estão na tela. A lista mostra 25 de cada vez. Quando há mais, aparece "carregados — há mais resultados" e o botão "Carregar mais", que traz os próximos.

## Achando um contato

**Objetivo:** Encontrar um cliente pela busca e pelos filtros de etiqueta, origem e pessoais, e colocar a lista na ordem que você quiser.

**Quem pode:** admin

**Palavras de busca:** buscar contato, procurar cliente, pesquisar telefone, filtro, etiqueta, tag, origem do contato, pessoais, ordenar por nome, limpar filtros

1. **Buscar pelo nome** — Digite parte do nome, do e-mail ou do telefone na busca. Aqui digitamos "Fern" e a lista já mostra a Fernanda Oliveira. A lista filtra logo depois que você para de digitar.
   - Rota: `/app/contacts`
2. **Filtrar por etiqueta** — Clique em "Limpar filtros" para apagar a busca. Depois clique no botão "Tag: todas" e marque uma etiqueta, como "convenio", para ver só os clientes marcados com ela. O menu fica aberto enquanto você marca.
3. **Duas etiquetas: todas ou qualquer uma** — Marcamos "convenio" e "retorno". Com duas ou mais etiquetas marcadas, aparecem duas opções: "Todas (E)" mostra só quem tem todas as etiquetas, e "Qualquer uma (OU)" mostra quem tem pelo menos uma.
4. **O resultado do filtro** — Fechamos o menu. O botão agora diz "Tag: convenio +1": a primeira etiqueta escolhida e quantas mais. Com "Todas (E)", só a Fernanda Oliveira tem as duas etiquetas.
5. **Filtrar pela origem** — O botão "Todas as origens" mostra de onde o contato veio: cadastro à mão ("Manual"), WhatsApp, site, planilha ("Importado (CSV)"), agenda do celular ou anúncio. Aqui escolhemos "Importado (CSV)" e a lista mostra só quem entrou por planilha.
6. **Os contatos pessoais** — Contatos marcados como pessoais, como um parente, ficam fora da lista normal. Ligue o botão "Pessoais" para ver só eles. Ligado, ele fica colorido.
7. **Quem está parado há mais tempo** — A lista começa pelos contatos com movimento mais recente. Os títulos de coluna com setinhas mudam a ordem: clicando de novo no mesmo título, a ordem inverte. Aqui desligamos "Pessoais" e clicamos em "Última atividade": agora quem está há mais tempo sem movimento aparece primeiro, bom para lembrar de chamar de volta.

## Cadastrando um contato

**Objetivo:** Cadastrar à mão um cliente que ainda não falou com a empresa.

**Quem pode:** admin

**Palavras de busca:** novo contato, cadastrar cliente, adicionar paciente, criar contato, incluir telefone, cadastro manual

1. **O botão Novo contato** — Para cadastrar alguém que ainda não escreveu para a empresa, clique em "Novo contato", no canto de cima.
   - Rota: `/app/contacts`
2. **Preencher o cadastro** — Preencha o nome e pelo menos o e-mail ou o telefone. O telefone vai com DDD; não precisa digitar o +55. Em "Tags", escolha as etiquetas sugeridas ou digite uma por vez e aperte Enter. Se abrir a escolha de cor, confira e clique em "Adicionar tag" para confirmar. O CPF é opcional. Para cadastrar e já falar com a pessoa, use "Salvar e iniciar conversa": o contato é salvo e a conversa com ele abre em seguida.
3. **O contato na lista** — Clicamos em "Criar contato". A janela fecha e o contato entra na lista, com as etiquetas que você digitou. Ele fica registrado com a origem "Manual", e dá para achá-lo no filtro de origem. Aqui buscamos "Carolina" para encontrá-la.

## Editando e excluindo pela lista

**Objetivo:** Corrigir o cadastro de um cliente e saber o que acontece ao excluir, sem sair da lista.

**Quem pode:** admin

**Palavras de busca:** editar contato, corrigir telefone, mudar nome do cliente, data de nascimento, adicionar etiqueta, excluir contato, apagar cliente

1. **O lápis da linha** — O lápis no fim da linha abre o cadastro para editar, sem sair da lista. Vamos completar o cadastro da Gabriela Duarte.
   - Rota: `/app/contacts`
2. **Mudar os dados** — Na janela "Editar contato" você muda nome, e-mail, telefone e data de nascimento. Para pôr uma etiqueta, digite no campo de baixo e aperte Enter, ou clique numa sugestão. Se abrir a escolha de cor, confirme em "Adicionar tag". Para tirar uma etiqueta, clique no X dela. Aqui pusemos a etiqueta "nutricao". No fim, clique em "Salvar".
3. **O cadastro atualizado** — Clicamos em "Salvar". A janela fecha e a linha já mostra a etiqueta nova.
4. **Excluir pede confirmação** — A lixeira pergunta antes de apagar. Excluir apaga o contato, as conversas e as mensagens dele, e não tem como desfazer. Os negócios dele no funil continuam, mas ficam sem cliente. Se o cliente tem ou já teve compromisso na Agenda, mesmo cancelado, a janela avisa e a exclusão não acontece. Aqui clicamos em "Cancelar".

## A ficha do contato

**Objetivo:** Abrir a ficha de um cliente, achar a conversa e os dados dele, escolher o vendedor dono e ver o histórico.

**Quem pode:** admin

**Palavras de busca:** ficha do cliente, detalhes do contato, histórico do cliente, timeline, carteira, vendedor dono, marcar como pessoal, sempre humano, LGPD, anonimizar

1. **Abrir a ficha** — Clique no nome de um cliente na lista para abrir a ficha completa dele. Vamos abrir a da Fernanda Oliveira.
   - Rota: `/app/contacts`
2. **O topo da ficha** — No topo ficam o nome, o e-mail, o telefone e as etiquetas. "Marcar como pessoal" tira o contato do atendimento: as conversas fecham e param a IA, as mensagens automáticas de retomada, as campanhas e os envios. "Marcar como sempre humano" faz a IA parar de responder este cliente até alguém clicar em "Remover marca de humano". Os dois pedem confirmação antes. "Editar" abre a janela de edição, com os campos personalizados a mais.
3. **A conversa e os dados** — Se o cliente já conversou com a empresa, logo abaixo aparece a última mensagem. Clique ali para abrir a conversa na Inbox. A aba "Visão geral" mostra os dados do cadastro: nome, nome no WhatsApp, e-mail, telefone, data de nascimento, origem, última atividade, data do cadastro e etiquetas.
4. **O vendedor dono** — O quadro "Carteira" diz qual pessoa da equipe é dona deste cliente. Com um dono, os negócios novos do cliente já nascem no nome dessa pessoa. Se o cliente escrever numa conversa que está com outra pessoa, o dono recebe uma tarefa avisando. Escolha o nome na lista e clique em "Salvar carteira". Sem dono, o atendimento segue como sempre.
5. **O histórico do cliente** — A aba "Timeline" conta o que aconteceu com este cliente, do mais novo para o mais antigo, separado por dia. Entram aqui os movimentos dos negócios dele, como a entrada no funil ("Entrou no funil") e a troca de etapa ("Mudou de estágio"), e as anotações da equipe. Ao lado de cada linha aparece quem fez.
6. **Apagar os dados a pedido do cliente** — A aba "LGPD" serve para quando o cliente pede que a empresa apague os dados dele. "Anonimizar contato" troca o nome por "Cliente Anonimizado" seguido de um número e apaga e-mail, telefone e documento. Antes, a janela pede o motivo e que você digite ANONIMIZAR. Não tem como desfazer: use só com o pedido formal do cliente ou ordem judicial.

## Mexendo em vários contatos de uma vez

**Objetivo:** Marcar vários contatos e pôr uma etiqueta em todos com um clique só.

**Quem pode:** admin

**Palavras de busca:** vários contatos, em massa, selecionar todos, etiqueta em lote, mudar responsável, marcar contatos, ação em lote

1. **Marcar os contatos** — A caixinha no começo de cada linha marca o contato. Marcamos a Mariana Souza e a Gabriela Duarte. Assim que um contato é marcado, aparece uma barra acima da lista dizendo quantos estão marcados.
   - Rota: `/app/contacts`
2. **O que dá para fazer** — Clique em "Mais ações". Dá para adicionar ou remover uma etiqueta, mudar o vendedor dono de todos ("Mudar responsável") e preencher um campo personalizado. O X no fim da barra desmarca todos.
3. **Escolher a etiqueta** — Em "Adicionar etiqueta", digite a etiqueta e clique em "Adicionar". Aqui digitamos "nutricao". Ela entra em todos os contatos marcados, e a etiqueta que eles já tinham continua.
4. **Pronto para todos** — Clicamos em "Adicionar". A etiqueta "nutricao" já aparece nas duas linhas, e a marcação some sozinha.

## Repetidos, planilhas e agenda do celular

**Objetivo:** Juntar contatos repetidos, trazer clientes de uma planilha ou da agenda do celular e baixar a lista.

**Quem pode:** admin

**Palavras de busca:** contato duplicado, juntar contatos, importar planilha, importar csv, excel, agenda do celular, sincronizar contatos, exportar contatos, baixar lista

1. **Contatos repetidos** — O botão "Duplicados" procura a mesma pessoa cadastrada duas vezes, pelo mesmo telefone ou e-mail. Aqui a Juliana Castro foi cadastrada de novo por uma planilha, com o mesmo celular. Escolha qual cadastro fica: o outro é absorvido por ele. O sistema já deixa marcado o cadastro com movimento mais recente.
   - Rota: `/app/contacts`
2. **Juntar não tem volta** — "Juntar" pede confirmação e diz quem fica e quem é absorvido. Conversas, mensagens, negócios e histórico passam para o cadastro que fica, e o outro sai da lista. Não tem como desfazer. Aqui clicamos em "Cancelar".
3. **Trazer de uma planilha** — "Importar CSV" traz contatos de uma planilha. O arquivo precisa ter uma linha de títulos com colunas como nome, telefone, email, cpf, nascimento e tags. No Excel, use "Salvar como" e escolha "CSV UTF-8". Cabem até 500 linhas por arquivo. No fim, a janela mostra quantos entraram, quantos já existiam e quais linhas deram problema.
   - Rota: `/app/contacts`
4. **Trazer da agenda do celular** — "Sincronizar agenda" traz os contatos salvos na agenda do celular conectado ao número da empresa, só os que têm WhatsApp. Quem já está cadastrado não é repetido. No fim, a janela mostra quantos entraram e quantos foram deixados de fora. Atenção ao aviso com o triângulo: vêm também os contatos pessoais do celular, e só pode receber campanha quem autorizou.
5. **Baixar a lista** — "Exportar" baixa os contatos num arquivo. "Exportar CSV" é uma planilha, que pode ser aberta no Excel ou no Google Planilhas. "Exportar vCard" é o formato que o celular importa. Sai a lista inteira com os filtros que estiverem ligados na tela, não só a página que você está vendo, até 10.000 contatos.

