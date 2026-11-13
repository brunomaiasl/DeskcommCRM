# Audit (Admin)

- **Tela:** `/admin/audit`
- **Resumo:** O caderno de registro do servidor: cada coisa que muda em qualquer empresa fica anotada aqui, com o quê, quem fez e quando, para você conferir depois.
- **Fonte:** `curso/licoes/admin-audit.json`

## Conhecendo o registro

**Objetivo:** Abrir o registro de auditoria, entender o que cada coluna diz e carregar eventos mais antigos.

**Quem pode:** admin

**Palavras de busca:** registro de auditoria, audit log, quem mudou o quê, histórico de alterações, o que aconteceu no sistema, rastrear ação de usuário

1. **O caderno de registro do servidor** — "Audit" é o registro de auditoria: um caderno onde o sistema anota sozinho cada coisa importante que acontece no servidor, em todas as empresas. Uma conversa transferida, um convite feito, um agente publicado, uma empresa suspensa: tudo vira uma linha aqui. Pelo sistema, ninguém consegue editar nem apagar uma linha. Só a limpeza automática tira as muito antigas, por padrão depois de 5 anos. Abaixo do título aparece quantos eventos a lista está mostrando.
   - Rota: `/admin/audit`
2. **O que cada coluna diz** — Cada linha é um evento. "Quando" diz há quanto tempo ele aconteceu. "Action" é o código do que aconteceu, em inglês: "auth.login_success" é uma entrada no sistema, "conversation.transferred" é uma conversa transferida. "Tenant" é o apelido da empresa onde aconteceu. "Actor" é o código de quem fez, e "Recurso" é o tipo da coisa mexida, com o começo do código dela. Um traço quer dizer que a informação não existe: sem empresa (como uma entrada no sistema, ou quando a empresa já foi apagada) ou sem pessoa (quando foi o próprio sistema ou uma integração ligada por chave de acesso).
3. **Ver os detalhes de um evento** — No fim de cada linha, o botão "Ver" abre a página do evento, com tudo o que foi anotado: a data e a hora exatas, quem fez (com parte do e-mail escondida), a empresa e os detalhes da mudança. Você aprende a ler essa página na última lição.
4. **Eventos mais antigos** — Role a lista até o fim. Quando existem mais eventos do que os 50 mostrados, aparece o botão "Carregar mais": cada clique traz os 50 seguintes, mais antigos, para baixo da lista. Para achar algo específico sem rolar tanto, use os filtros, que você vê na próxima lição.

## Achando um evento com os filtros

**Objetivo:** Recortar o registro por empresa e por tipo de ação, conhecer os filtros de pessoa e de data e limpar tudo.

**Quem pode:** admin

**Palavras de busca:** filtrar auditoria por empresa, procurar evento no registro, quem transferiu a conversa, filtrar por data, filtrar por usuário, limpar filtros

1. **Só uma empresa** — Clique em "Tenants" para escolher de quais empresas ver os eventos. Abre uma lista com as empresas do servidor, nome e apelido, e uma busca no alto. Clique numa empresa para marcá-la; dá para marcar mais de uma. Aqui vamos marcar a Clínica Bem Viver.
   - Rota: `/admin/audit`
2. **O filtro ligado** — Com a empresa marcada, o botão "Tenants" mostra quantas estão escolhidas e a lista passa a trazer só os eventos dela. Clique fora da caixinha para fechá-la. O mesmo botão desmarca: abra de novo e clique na empresa, ou use "Limpar seleção".
3. **Só um tipo de ação** — "Actions" filtra pelo que aconteceu. A lista traz todos os códigos que o sistema registra, e a busca recorta por família: digite "conversation." para ver só os eventos de conversa. "conversation.transferred" é a transferência de uma conversa para outra pessoa da equipe.
4. **Os dois filtros juntos** — Os filtros se somam: agora a lista mostra só as transferências de conversa da Clínica Bem Viver. Cada linha diz há quanto tempo foi e o código de quem fez. Para saber quem recebeu a conversa e por quê, abra o evento em "Ver".
5. **Pessoa, datas e limpar** — No campo "Actor (user ID)" você cola o código completo de uma pessoa para ver só o que ela fez; o código aparece na coluna "Actor" e na página de cada evento. Os dois campos de data limitam o período: o primeiro é o início e o segundo, o fim. Com qualquer filtro ligado aparece "Limpar", que desliga tudo de uma vez: empresas, ações, pessoa e datas.

## Lendo a página de um evento

**Objetivo:** Ler tudo o que foi anotado sobre um evento: o quê, quando, quem, em qual empresa e o que mudou, e ir até a coisa que foi mexida.

**Quem pode:** admin

**Palavras de busca:** detalhes do evento de auditoria, quem fez essa alteração, e-mail de quem mudou, o que mudou exatamente, abrir conversa pelo registro, ver empresa do evento

1. **O que aconteceu e quando** — Esta é a página que abre ao clicar em "Ver" numa linha do registro. Aqui, a transferência de uma conversa na Clínica Bem Viver. No alto ficam o código da ação, o apelido da empresa e, logo abaixo, a data e a hora exatas, seguidas de há quanto tempo foi. "Audit Log", acima do título, volta para a lista.
   - Rota: `/admin/audit/ad100000-0000-4000-8000-000000000001`
2. **O que mudou** — "Metadata" guarda os detalhes da mudança, do jeito que o sistema anotou. Nesta transferência, "to_user_id" é o código da pessoa que recebeu a conversa e "note" é o motivo escrito por quem transferiu. Logo abaixo, "Resource Type" e "Resource ID" dizem qual coisa foi mexida; aqui, uma conversa. "negocio_aberto" diz o que aconteceu com o negócio do contato: "sem_negocio_aberto" quer dizer que ele não tinha negócio aberto, então nada mudou no funil.
3. **Quem fez e em qual empresa** — O quadro "Actor" mostra quem fez: o código da pessoa e o e-mail dela, com o começo trocado por asteriscos por segurança. O quadro "Tenant" mostra a empresa onde aconteceu: nome, apelido e situação ("active" é ativa, "suspended" é suspensa, "archived" é arquivada). O botão "Ver tenant" abre a ficha dessa empresa.
4. **Ir até a conversa** — Quando a coisa mexida é uma conversa ou uma empresa, aparece o quadro "Recurso". O botão "Abrir recurso" leva direto até ela: aqui, abre a conversa na Inbox do Admin, para você ler o que aconteceu antes e depois da transferência.

