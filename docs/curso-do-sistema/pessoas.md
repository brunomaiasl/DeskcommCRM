# Pessoas

- **Tela:** `/app/people`
- **Resumo:** As pessoas que decidem dentro das empresas clientes: em que empresa trabalham, com que cargo, e por quais telefones se fala com elas.
- **Fonte:** `curso/licoes/pessoas.json`

## Conhecendo a tela de Pessoas

**Objetivo:** Entender a diferença entre pessoa e contato, procurar alguém e ler a ficha da pessoa.

**Quem pode:** agent

**Palavras de busca:** pessoas, decisor, quem decide na empresa, contato da empresa, cargo, pessoa com vários telefones, b2b

1. **Onde fica a tela** — Pessoas não aparece direto no menu lateral. No grupo "CRM" do menu, clique em "Ver tudo em CRM". Na parte "O dia a dia da venda" está o cartão "Pessoas". O caminho completo é: CRM › Ver tudo em CRM › Pessoas.
   - Rota: `/app/crm`
2. **Pessoa não é contato** — Uma pessoa é alguém que trabalha numa empresa cliente, como o gerente de RH que contrata o programa de saúde. Um contato é um número de telefone, aquele que conversa no WhatsApp. Uma pessoa pode ter vários telefones, e cada telefone é um contato ligado a ela. Por isso a lista mostra o nome, o e-mail e quando o cadastro mudou, mas não o telefone: os números ficam em Contatos.
   - Rota: `/app/people`
3. **Procurar uma pessoa** — A caixa de busca procura pelo nome ou pelo e-mail. Escreva "Marcos" e clique no nome para abrir a ficha.
4. **A ficha da pessoa** — "Empresas" mostra onde a pessoa trabalha e o cargo dela. "Telefones (contacts)" lista os números ligados a ela: o Marcos tem o celular e o fixo do RH. Clique na empresa para abrir a ficha dela, ou num número para abrir aquele contato.
   - Rota: `/app/people/f1a02003-0000-4000-8000-000000000003`
5. **Pessoa sem empresa e sem telefone** — A Beatriz foi cadastrada à mão, com nome e e-mail. Por isso a ficha avisa "Sem vínculo empresarial." e "Nenhum telefone vinculado.". Quem liga uma pessoa a uma empresa e a um telefone é a importação de planilha, em Importações.
   - Rota: `/app/people/f1a02008-0000-4000-8000-000000000008`

## Cadastrar uma pessoa

**Objetivo:** Cadastrar uma pessoa pela tela e saber quando é melhor trazê-la por planilha.

**Quem pode:** manager

**Palavras de busca:** nova pessoa, cadastrar pessoa, cadastrar decisor, adicionar contato da empresa, ligar pessoa à empresa

1. **Abrir o cadastro** — Clique em "Nova pessoa", no alto da tela.
   - Rota: `/app/people`
2. **Nome e e-mail** — O formulário pede o nome completo, que é obrigatório, e o e-mail. Preencha e clique em "Criar".
3. **A pessoa entrou, ainda sem empresa** — A Patrícia aparece no alto da lista. Este formulário não liga a pessoa a uma empresa nem a um telefone: a ficha dela vai dizer "Sem vínculo empresarial.". Para isso, traga a pessoa numa planilha em Importações, com a empresa, o cargo e o telefone na mesma linha.

