# Produtos

- **Tela:** `/app/products`
- **Resumo:** A lista do que a empresa vende, com preço e estoque: é nela que o atendente de IA procura o valor quando um cliente pergunta quanto custa.
- **Fonte:** `curso/licoes/produtos.json`

## Conhecendo a tela de Produtos

**Objetivo:** Achar o catálogo, entender para que ele serve e o que cada linha mostra.

**Quem pode:** admin

**Palavras de busca:** produtos, catálogo, lista de preços, tabela de preços, cadastro de produtos, estoque, preço que a IA responde

1. **Onde fica a tela** — Produtos não aparece direto no menu lateral. No grupo "CRM" do menu, clique em "Ver tudo em CRM". Na parte "Preparar a venda" está o cartão "Produtos". O caminho completo é: CRM › Ver tudo em CRM › Produtos.
   - Rota: `/app/crm`
2. **Para que serve o catálogo** — Produtos é a lista do que a clínica vende, cada um com o seu preço. Entram aqui serviços, como uma consulta ou um pacote de sessões, e itens de prateleira, como um suplemento. Quando um cliente pergunta "quanto custa?" no WhatsApp, o atendente de IA procura o produto nesta lista e responde com o preço cadastrado, em vez de chutar um valor.
   - Rota: `/app/products`
3. **O que cada linha mostra** — Cada linha é um produto. Em cima vem o nome. Embaixo vêm o código, a marca (quando tem) e o estoque. "12 em estoque" é quantas unidades a clínica tem. "Sem controle de estoque" quer dizer que ninguém conta unidades daquele item, como num pacote de sessões: ele sempre conta como disponível. À direita fica o preço de venda. Se o produto tem foto, a primeira aparece pequena no começo da linha.
4. **Os comandos do alto da tela** — No alto ficam os comandos. A caixa de busca procura um produto. "Novo produto" abre o formulário para cadastrar um item. "Importar planilha" traz vários produtos de uma vez, de um arquivo. "Baixar planilha modelo" baixa um exemplo de planilha com as colunas certas.
5. **Procurar um produto** — Digite um pedaço do nome, do código, da marca ou da categoria. Aqui, "nutri" achou a consulta nutricional pelo nome e os dois suplementos pela marca NutriVida. Embaixo da lista, "1–3 de 3" diz quantos produtos a busca achou. A tela mostra 50 produtos por vez; quando há mais, aparecem os botões "Página anterior" e "Próxima página".
   - Rota: `/app/products?busca=nutri`

## Cadastrar um produto

**Objetivo:** Pôr um produto novo no catálogo, com preço e estoque, para o atendente de IA poder responder o valor.

**Quem pode:** admin

**Palavras de busca:** cadastrar produto, novo produto, adicionar produto, colocar preço, controlar estoque, código do produto, preço de custo

1. **Abrir o formulário** — A clínica começou a vender faixas elásticas para os exercícios da fisioterapia. Para pôr um produto novo no catálogo, clique em "Novo produto". O formulário abre logo abaixo, em cima da lista.
   - Rota: `/app/products`
2. **Código e nome** — "Código" é a identificação do produto na clínica, como a etiqueta da prateleira. Ele não pode se repetir: se já existir um produto com o mesmo código, a tela avisa e não salva. "Nome" é como o produto aparece na lista e para o atendente de IA. Escreva do jeito que um cliente pediria. Código e Nome são obrigatórios: sem eles a tela avisa e não salva.
3. **Marca, categoria e preço** — "Marca" e "Categoria" são opcionais e ajudam a achar o produto na busca. Em "Preço de venda", escreva o valor do jeito que você já escreve, como 39,90 ou 1.299,90. Esse campo é obrigatório: sem um preço que dê para ler, a tela avisa "Preço inválido" e não salva. "Custo" é quanto o produto custa para a clínica. Ele é opcional e não aparece para o cliente.
4. **Estoque** — A caixa "Controlar estoque deste produto" já vem marcada. Deixe marcada para itens de prateleira e escreva em "Quantidade" quantas unidades a clínica tem; aqui são 15. Desmarque para serviços e itens feitos sob encomenda, como uma consulta ou uma palmilha sob medida. Desmarcada, o campo "Quantidade" some e o produto sempre conta como disponível para o atendente de IA.
5. **Salvar** — Confira tudo e clique em "Salvar produto". Repare que o botão que antes dizia "Novo produto" agora diz "Cancelar": ele fecha o formulário sem salvar.
6. **O produto entrou na lista** — O formulário fecha e a faixa elástica aparece na lista, em ordem alfabética, com o código, a marca, as 15 unidades em estoque e o preço. A partir de agora, o atendente de IA já consegue encontrá-la quando um cliente perguntar.

## Corrigir um produto e tirá-lo de venda

**Objetivo:** Mudar o preço, o estoque ou a descrição de um produto e desativar o que a clínica parou de vender.

**Quem pode:** admin

**Palavras de busca:** mudar preço, alterar preço, editar produto, atualizar estoque, descrição do produto, desativar produto, parar de vender, reativar produto

1. **Abrir a edição** — Chegou um lote novo de escovas ortodônticas, e o fornecedor aumentou o preço. Para atualizar o produto, clique em "Editar" na linha dele.
   - Rota: `/app/products`
2. **Trocar o preço e o estoque** — O formulário abre embaixo da linha, já preenchido com o que está cadastrado. Troque o que mudou: aqui, o preço passou para 27,90 e a quantidade para 50. A edição tem um campo que o cadastro não tem, a "Descrição". Escreva nela o que os clientes costumam perguntar. O atendente de IA recebe a descrição junto com o preço quando procura o produto.
3. **Salvar as alterações** — Clique em "Salvar alterações". Se você não mudou nada, a tela avisa "Nada para alterar." e não grava. "Cancelar" fecha o formulário sem gravar.
4. **Produto atualizado** — O formulário fecha e a linha já mostra o preço novo e as 50 unidades em estoque. Na próxima vez que um cliente perguntar, o atendente de IA responde com o preço novo.
5. **Desativar o que saiu de venda** — O fornecedor parou de fabricar o ômega 3 que a clínica vendia. A tela não tem botão de apagar produto: clique em "Desativar". O produto continua guardado, mas sai da venda, porque o atendente de IA só procura entre os produtos ativos.
6. **Riscado, no fim da lista** — O nome fica riscado e o produto vai para o fim da lista, junto com os outros desativados. O botão da linha passa a dizer "Reativar": é por ele que o produto volta a ser vendido.

## Fotos e planilha

**Objetivo:** Pôr fotos num produto e trazer o catálogo inteiro de uma planilha.

**Quem pode:** admin

**Palavras de busca:** foto do produto, imagem do produto, importar planilha, importar produtos, planilha modelo, excel, csv, atualizar preços de uma vez

1. **Abrir as fotos de um produto** — O número entre parênteses no botão "Fotos" diz quantas fotos o produto tem. Clique em "Fotos (2)" na linha do whey para ver as dele.
   - Rota: `/app/products`
2. **A primeira foto é a capa** — As fotos abrem embaixo da linha. A primeira é a capa: é ela que aparece pequena na lista. Quando o atendente de IA apresenta um produto com foto, ele pode mandar as fotos junto, e elas vão nesta ordem. As setas mudam a foto de lugar e o "✕" remove a foto.
3. **Adicionar uma foto** — "Adicionar foto" abre o seu computador para você escolher a imagem. Vale foto JPG ou PNG de até 5 MB. Cada produto guarda no máximo 5 fotos; com 5, o botão fica apagado.
4. **Trazer os produtos de uma planilha** — Se a clínica já tem os produtos numa planilha, não precisa cadastrar um por um. Clique em "Baixar planilha modelo" para ver as colunas que a tela entende: código, nome, marca, categoria, preço, custo e estoque. Só nome e preço são obrigatórios. A tela também reconhece nomes parecidos, como "SKU", "valor" ou "qtd". No Excel, use "Salvar como" e escolha "CSV UTF-8". Depois clique em "Importar planilha" e escolha o arquivo.
   - Rota: `/app/products`
5. **Importar de novo atualiza** — O código liga cada linha da planilha a um produto. Importar de novo um código que já existe atualiza aquele produto, sem criar outro. Se a planilha não tem coluna de código, o nome faz esse papel. A importação não mexe na descrição, nas fotos nem em quem está desativado. Todo o resto do produto passa a ser o que está na planilha: coluna que falta ou célula vazia apaga a marca, a categoria e o custo, e sem a coluna de estoque o produto deixa de controlar estoque. Para corrigir só os preços, baixe a planilha completa, troque os preços e importe de volta com todas as colunas.

