# Servidor MCP externo

- **Tela:** `/app/settings/servidor-mcp-externo`
- **Resumo:** Onde o dono da instalação cadastra e testa o endereço e a chave de um sistema de fora (um prontuário, um sistema de gestão).
- **Fonte:** `curso/licoes/servidor-mcp-externo.json`

## Conhecendo a tela do servidor externo

**Objetivo:** Achar a tela do servidor MCP externo e reconhecer os dois campos e os três botões dela.

**Quem pode:** admin

**Palavras de busca:** servidor mcp externo, ligar a ia a outro sistema, ia consultar meu prontuário, conectar sistema de gestão à ia, endereço e chave do sistema de fora, integrar erp com a ia

1. **Onde fica a tela** — Abra "Configurações", no rodapé do menu lateral. Na parte "Dados e acesso" fica o cartão "Servidor MCP externo". Clique nele.
   - Rota: `/app/settings`
2. **Para que serve** — Esta tela guarda o endereço e a senha de acesso (a chave) de um sistema de fora, como o prontuário ou o sistema de gestão da clínica. MCP é o nome do jeito padrão de a IA conversar com outro sistema. Guardar aqui ainda não faz a IA usar esse sistema: aqui você só cadastra e testa a ligação. A frase do cartão já avisa a regra: o endereço precisa começar com https e ser de um servidor público na internet.
3. **Os campos e os botões** — Em "Endereço do servidor MCP" vai o endereço que o fornecedor do seu sistema passou. Em "Chave de acesso" vai a senha de acesso; ela aparece em bolinhas enquanto você digita. Logo abaixo ficam "Salvar", que guarda os dois, e "Testar conexão", que pergunta ao sistema de fora o que ele oferece. Mais embaixo, separado, fica "Remover", que apaga o cadastro. O texto cinza que aparece no endereço (https://erp.example.com/mcp) é só um exemplo de formato: o campo está vazio.

## Cadastrar o endereço e a chave

**Objetivo:** Preencher o endereço e a chave do sistema de fora, salvar e conferir o fim da chave que ficou gravada.

**Quem pode:** admin

**Palavras de busca:** cadastrar servidor mcp, salvar endereço e chave, colocar a chave do sistema, ligar prontuário na ia, onde ponho a chave de acesso

1. **Preencha os dois campos** — Cole em "Endereço do servidor MCP" o endereço que o fornecedor do sistema passou. Aqui usamos o do prontuário da Clínica Bem Viver. Depois cole a chave em "Chave de acesso". Os dois são obrigatórios.
   - Rota: `/app/settings/servidor-mcp-externo`
2. **Salve** — Clique em "Salvar". A tela confirma com "Configuração salva". O campo da chave fica vazio de novo e aparece um aviso com só os quatro últimos caracteres dela, aqui "7Q4x". É a única vez que você vê esse pedaço: a chave é guardada de forma embaralhada e não volta para a tela.
3. **O próximo passo é testar** — Com o cadastro salvo, o próximo passo é "Testar conexão": a tela pergunta ao seu sistema o que ele oferece e mostra a resposta. O que aparece quando o teste não encontra resposta está na lição "Testar e remover".

## O que a tela recusa

**Objetivo:** Entender as duas recusas mais comuns ao salvar: campo vazio e endereço que não é seguro.

**Quem pode:** admin

**Palavras de busca:** endereço recusado por segurança, não consigo salvar o servidor mcp, erro ao salvar endereço, preencha o endereço e a chave, por que precisa de https

1. **Faltou a chave** — Se você preencher só o endereço e clicar em "Salvar", a tela avisa em vermelho que precisa dos dois. Nada é gravado. Para apagar um cadastro, o caminho é o botão "Remover", não salvar com um campo vazio.
   - Rota: `/app/settings/servidor-mcp-externo`
2. **Endereço da rede interna** — Aqui o endereço aponta para um computador dentro da clínica (um número que começa com 192.168) e não usa https. Ao clicar em "Salvar", a tela recusa e explica: o endereço precisa ser de um servidor na internet, em https, sem rede interna, sem "localhost" e sem segredo colado nele. Nada é gravado.
   - Rota: `/app/settings/servidor-mcp-externo`

## Testar e remover

**Objetivo:** Usar "Testar conexão" para ver se o sistema de fora responde e "Remover" para apagar o cadastro.

**Quem pode:** admin

**Palavras de busca:** testar conexão servidor mcp, nenhum servidor externo respondeu, ver ferramentas do sistema de fora, remover servidor mcp, apagar o cadastro do sistema externo

1. **Testar a conexão** — "Testar conexão" usa o endereço e a chave já salvos, não o que está digitado nos campos. Quando o sistema responde, aparece embaixo o cartão "O que o servidor oferece", com o nome do servidor consultado (só a parte principal do endereço) e a lista de ferramentas que ele anuncia.
   - Rota: `/app/settings/servidor-mcp-externo`
2. **Quando nada responde** — Aqui o teste não encontrou resposta, e a tela avisa "Nenhum servidor externo respondeu". Esse aviso aparece tanto quando não há nada salvo quanto quando o sistema de fora não atende ou recusa a chave. Confira o endereço e a chave com o fornecedor, salve de novo e teste outra vez.
3. **Remover o cadastro** — Com um servidor cadastrado, clique em "Remover" para apagar o cadastro. Não há pergunta de confirmação: o endereço e a chave desta empresa são apagados na hora. A tela confirma com "Servidor externo removido".

