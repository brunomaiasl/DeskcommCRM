# Empresas

- **Tela:** `/app/companies`
- **Resumo:** O cadastro das empresas para quem a clínica vende: razão social, CNPJ, endereço e as pessoas que decidem lá dentro, com os telefones de cada uma.
- **Fonte:** `curso/licoes/empresas.json`

## Conhecendo a tela de Empresas

**Objetivo:** Achar a tela, ler a lista de empresas, procurar uma delas e entender o que a ficha mostra.

**Quem pode:** agent

**Palavras de busca:** empresas, cadastro de empresa, cnpj, razão social, venda para empresas, b2b, decisores, cliente pessoa jurídica

1. **Onde fica a tela** — Empresas não aparece direto no menu lateral. No grupo "CRM" do menu, clique em "Ver tudo em CRM". Na parte "O dia a dia da venda" está o cartão "Empresas". O caminho completo é: CRM › Ver tudo em CRM › Empresas.
   - Rota: `/app/crm`
2. **A lista de empresas** — Cada linha é uma empresa. "Nome fantasia" é o nome que todo mundo conhece; "Razão social" é o nome oficial, o do contrato e da nota fiscal. Depois vêm o CNPJ, a cidade e a data da última mudança. As empresas que foram mexidas por último aparecem em cima.
   - Rota: `/app/companies`
3. **O que a coluna Situação diz** — Com CNPJ, a empresa é consultada nos dados públicos da Receita (pela BrasilAPI). Deu certo: a coluna mostra a situação do cadastro, como "ATIVA". "failed" quer dizer que a consulta não achou o CNPJ ou não respondeu. "pending" quer dizer que ainda não houve consulta, e é o que fica para sempre numa empresa sem CNPJ, porque não há o que consultar.
4. **Procurar uma empresa** — A caixa de busca procura pelo nome fantasia, pela razão social ou pelo CNPJ, com ou sem pontos. Escreva "Horizonte" e a lista fica só com a construtora. Clique no nome para abrir a ficha.
5. **A ficha da empresa** — Em "Dados cadastrais" ficam a razão social, a situação na Receita, o porte, a atividade principal (o CNAE) e o endereço. A linha "Enriquecimento" conta como foi a consulta do CNPJ: "completed" é consulta feita; quando falha, o motivo aparece ao lado.
   - Rota: `/app/companies/f1a01002-0000-4000-8000-000000000002`
6. **Quem decide e os telefones** — "Pessoas / decisores" lista quem trabalha na empresa e fala com a clínica, com o cargo de cada um. "Telefones" junta os números dessas pessoas: o Marcos tem dois, o celular e o fixo do RH. Clique num nome para abrir a ficha da pessoa, ou num número para abrir aquele contato.

## Cadastrar e corrigir uma empresa

**Objetivo:** Cadastrar uma empresa nova, entender a consulta do CNPJ e saber onde corrigir, consultar de novo ou excluir.

**Quem pode:** manager

**Palavras de busca:** nova empresa, cadastrar empresa, consultar cnpj, editar empresa, excluir empresa, enriquecer cnpj, cnpj não encontrado

1. **Abrir o cadastro** — Clique em "Nova empresa", no alto da tela.
   - Rota: `/app/companies`
2. **Preencher os nomes** — Basta um campo: a razão social, o nome fantasia ou o CNPJ. Aqui a farmácia entra só com os nomes. Quando você tem o CNPJ, digite e clique em "Consultar CNPJ": os dados públicos da Receita preenchem o formulário, e nada é gravado até você clicar em "Criar". Se o CNPJ já está cadastrado, a tela avisa antes.
3. **A empresa entrou na lista** — Depois de "Criar", a farmácia aparece no alto da lista. Sem CNPJ, a situação fica "pending": não há o que consultar. Para completar, abra a ficha e use "Editar empresa".
4. **Quando a consulta do CNPJ falha** — A Rota Sul veio de uma planilha e a consulta não achou o CNPJ: o motivo está na linha "Enriquecimento". Confira o número em "Editar empresa" e depois clique em "Enriquecer CNPJ" para consultar de novo.
   - Rota: `/app/companies/f1a01004-0000-4000-8000-000000000004`
5. **Excluir só sem pessoas ligadas** — "Excluir empresa" apaga o cadastro. Se ainda há pessoas ligadas à empresa, como o Paulo aqui na Rota Sul, a exclusão é recusada, a tela mostra o motivo e nada é apagado.

