# Importações

- **Tela:** `/app/imports`
- **Resumo:** Traz de uma planilha, de uma vez, as empresas, as pessoas que decidem nelas e os telefones de cada uma, e mostra linha por linha o que entrou e o que não entrou.
- **Fonte:** `curso/licoes/importacoes.json`

## Conhecendo a tela de Importações

**Objetivo:** Achar a tela, montar a planilha com as colunas certas e saber como enviá-la.

**Quem pode:** manager

**Palavras de busca:** importar planilha, importar empresas, importar contatos de empresas, csv, excel, xlsx, subir lista de clientes, colunas da planilha

1. **Onde fica a tela** — Importações não aparece direto no menu lateral. No grupo "CRM" do menu, clique em "Ver tudo em CRM". Na parte "Preparar a venda" está o cartão "Importações". O caminho completo é: CRM › Ver tudo em CRM › Importações.
   - Rota: `/app/crm`
2. **Cada envio vira um lote** — Cada planilha enviada vira uma linha desta lista, chamada lote. Ela mostra o nome do arquivo, quantas linhas tinha e quantas deram certo ("Sucesso"), entraram com um conflito ("Conflitos") ou não entraram ("Falhas"). "completed" na coluna "Status" quer dizer que a planilha inteira já foi lida.
   - Rota: `/app/imports`
3. **Como montar a planilha** — Cada linha da planilha é uma pessoa de uma empresa, com um telefone. A primeira linha leva os nomes das colunas, e a tela reconhece estes: "empresa", "cnpj", "pessoa", "cargo", "telefone" e "email". Também valem "nome" ou "contato" (para a pessoa), "e-mail", "razão social", "nome fantasia", "celular" e "whatsapp". Coluna com outro nome é ignorada. Uma pessoa com dois telefones ocupa duas linhas, repetindo a empresa e o nome.
4. **Enviar o arquivo** — Clique no campo "Arquivo" e escolha a planilha no computador: vale CSV ou Excel (.xlsx), com até 2 MB e 2.000 linhas. Depois clique em "Importar". A tela lê tudo na hora, mostra um resumo como "Lote processado: 5 ok, 1 conflitos, 2 falhas." e o lote novo aparece no alto da lista.

## Revisar um lote

**Objetivo:** Abrir um lote, entender cada linha que deu certo, que entrou com conflito e que falhou, e saber como corrigir.

**Quem pode:** manager

**Palavras de busca:** conflito na importação, linha com erro, telefone já vinculado a outra pessoa, cnpj inválido, telefone inválido, corrigir importação, importar de novo

1. **Abrir o lote** — Clique no nome do arquivo para ver o que aconteceu com cada linha da planilha.
   - Rota: `/app/imports`
2. **Linha por linha** — O número de cada linha é o mesmo da planilha: a linha 1 é a dos nomes das colunas, então os dados começam na 2. "success" é linha que entrou inteira. "conflict" entrou em parte, e "failed" não entrou. A coluna "Erro" diz o porquê. As três últimas colunas mostram o começo do código da empresa, da pessoa e do contato que a linha criou ou encontrou.
   - Rota: `/app/imports/f1a05001-0000-4000-8000-000000000001`
3. **Ver só os conflitos** — Marque "Só conflitos" para a lista ficar só com as linhas que pedem uma decisão sua. Aqui, o Paulo da Rota Sul veio com o mesmo telefone do Marcos, da construtora. A pessoa e a empresa entraram, mas o telefone continua do Marcos: a importação nunca troca o dono de um número. Confira em Contatos de quem é o número e corrija a planilha, se foi erro de digitação.
4. **Corrigir as falhas** — Desmarque "Só conflitos" para ver tudo de novo. "CNPJ inválido: confira as 12 posições…" é um CNPJ digitado errado: os dígitos verificadores não fecham. "Telefone inválido." é um número curto demais ou sem DDD. Corrija essas linhas na planilha e envie um arquivo só com elas.

