# Users (Admin)

- **Tela:** `/admin/users`
- **Resumo:** A lista de todas as pessoas que fazem parte de alguma empresa do seu servidor, em todas as empresas: quem é, em qual empresa trabalha, com que papel, quando entrou pela última vez e se ainda tem acesso.
- **Fonte:** `curso/licoes/admin-users.json`

## Conhecendo a lista de pessoas

**Objetivo:** Ler a lista de pessoas do servidor: o que cada coluna diz, por que a mesma pessoa pode aparecer duas vezes e o que quer dizer "Revogado".

**Quem pode:** admin

**Palavras de busca:** lista de usuários, todas as pessoas do servidor, quem tem conta, users admin, ver equipe de todas as empresas, último acesso

1. **Todas as pessoas do servidor** — No Admin, "Users" é a lista de todas as pessoas que fazem parte de alguma empresa do seu servidor, de todas as empresas juntas. Aqui você só consulta: nada se muda nesta tela. Logo abaixo do título aparece quantas linhas a lista mostra. Quem entrou no sistema mais recentemente aparece primeiro; quem nunca entrou fica no fim.
   - Rota: `/admin/users`
2. **O que cada coluna diz** — Cada linha é uma pessoa dentro de uma empresa. "Email" e "Nome" são os da conta. "Tenant" é a empresa, com o nome curto que a identifica no sistema embaixo. "Role" é o papel da pessoa naquela empresa: Admin, Manager, Agente ou Viewer (este último só olha, não mexe). "Último acesso" diz há quanto tempo a conta entrou no sistema pela última vez, em qualquer empresa; um traço quer dizer que ela ainda não entrou nenhuma vez.
3. **A mesma pessoa em duas empresas** — Uma pessoa pode trabalhar em mais de uma empresa do servidor com a mesma conta. Nesse caso ela aparece numa linha para cada empresa, e o papel pode ser diferente em cada uma. Aqui, a consultora Marina Lopes é Viewer na Odonto Sorriso Leve e Manager na FisioVida. Por isso o número no alto conta linhas, e não pessoas.
4. **Quem ainda tem acesso** — A coluna "Status" diz se a pessoa ainda entra naquela empresa. "Ativo": entra normalmente. "Revogado": alguém tirou o acesso dela na tela Equipe, em Configurações, daquela empresa. A conta continua existindo, mas ela não entra mais ali. Para ver tudo sobre uma pessoa, clique em "Ver", no fim da linha.

## Encontrando uma pessoa

**Objetivo:** Achar alguém pelo nome ou e-mail e filtrar a lista por empresa e por papel.

**Quem pode:** admin

**Palavras de busca:** buscar usuário, achar pessoa pelo email, filtrar por empresa, quem é admin, filtrar por papel, pessoas de uma clínica

1. **Buscar pelo nome ou e-mail** — Digite parte do nome ou do e-mail na busca. Não precisa apertar Enter: a lista se ajusta sozinha logo depois que você para de digitar. Aqui, "marina" trouxe as duas linhas da Marina Lopes, uma para cada empresa.
   - Rota: `/admin/users`
2. **Ver só uma empresa** — O primeiro filtro, que começa em "Todos os tenants", mostra a lista de empresas do servidor. Escolha uma para ver só a equipe dela.
   - Rota: `/admin/users`
3. **A equipe de uma empresa** — Com "FisioVida Reabilitação" escolhida, a lista mostra só as pessoas dessa clínica, inclusive quem teve o acesso revogado.
4. **Somar o filtro de papel** — O segundo filtro, que começa em "Todos os roles", separa as pessoas pelo papel: Admin, Manager, Agente ou Viewer. Ele soma com o filtro de empresa. Aqui, empresa FisioVida e papel Admin mostram quem administra aquela clínica. Para desfazer, volte cada filtro para "Todos os tenants" e "Todos os roles".
5. **Quando ninguém aparece** — Se nenhuma pessoa bate com a busca e os filtros, a lista mostra "Nenhum usuário encontrado". Confira se o nome está escrito certo (com acento) ou volte os filtros para "Todos os tenants" e "Todos os roles".
   - Rota: `/admin/users`

## A ficha de uma pessoa

**Objetivo:** Abrir a ficha de uma pessoa e ler os dados da conta, as empresas em que ela está e o que ela fez por último no sistema.

**Quem pode:** admin

**Palavras de busca:** detalhes do usuário, em quais empresas a pessoa está, verificação em duas etapas ativa, e-mail confirmado, histórico do usuário, o que a pessoa fez

1. **Os dados da conta** — Clicando em "Ver" numa linha, abre a ficha da pessoa. No alto ficam o nome, o e-mail e o código da conta. O quadro "Informações do usuário" mostra quando o e-mail foi confirmado (ou "Pendente", se ainda não foi), o último acesso, o dia em que a conta foi criada e o "MFA": "Ativo" quando a pessoa usa a verificação em duas etapas, "Inativo" quando não usa.
   - Rota: `/admin/users`
2. **Em quais empresas ela está** — O quadro "Memberships" lista as empresas em que a pessoa está, com o papel em cada uma, o dia em que ela aceitou o convite e se o acesso está "Ativo" ou "Revogado". O nome da empresa é um link: ele abre a ficha da empresa, em "Tenants".
3. **O que a pessoa fez por último** — O último quadro, "Audit recente", lista as últimas ações dessa pessoa que ficaram registradas no sistema, até 50, da mais nova para a mais antiga. Cada linha traz o código da ação (por exemplo, "platform_admin.users_listed" é abrir ou filtrar esta lista de pessoas) e o dia e a hora. Na foto, a ficha da Helena, que usa o sistema todo dia, rolada até o fim. Quem ainda não fez nada que fique registrado, como a Marina, aparece com "Nenhuma entrada de auditoria encontrada para este usuário."
   - Rota: `/admin/users`

