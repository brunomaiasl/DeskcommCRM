# Platform Admins (Admin)

- **Tela:** `/admin/platform-admins`
- **Resumo:** A lista de quem tem a chave do Admin do seu servidor: quem pode mexer em tudo, quem só olha, quem precisa do código do celular e quem já perdeu o acesso.
- **Fonte:** `curso/licoes/admin-platform-admins.json`

## Quem administra o servidor

**Objetivo:** Entender o que é um administrador da plataforma, por que esta tela não tem botões de mudar e o que cada coluna da lista mostra.

**Quem pode:** admin

**Palavras de busca:** platform admins, administradores da plataforma, quem administra o servidor, quem tem acesso ao admin, dono da instalação, super admin, acesso total ao sistema

1. **A lista de quem tem a chave do Admin** — No Admin, "Platform Admins" quer dizer administradores da plataforma: as pessoas que entram nesta área do Admin e enxergam todas as empresas do seu servidor, não só a clínica delas. Para chegar aqui, clique em "Platform Admins" no menu do Admin. A tela mostra quem tem essa chave hoje e quem já teve.
   - Rota: `/admin/dashboard`
2. **Por que não há botão de mudar** — O aviso azul explica que esta tela só mostra. Não existe botão para incluir, tirar ou mudar ninguém aqui, de propósito: quem dá ou tira essa chave é a pessoa técnica que cuida do banco de dados do servidor (o "DBA" do aviso), direto no banco, e o aviso pede que ela deixe uma nota explicando a mudança no registro de auditoria. Assim, ninguém ganha acesso a todas as empresas com um clique.
3. **O que cada coluna diz** — Cada linha é uma pessoa, da chave mais nova para a mais antiga. "Usuário" mostra o e-mail e o nome. "Concedido em" diz há quanto tempo a chave foi dada, e "Concedido por" mostra o e-mail de quem deu. "Scope" diz o que a pessoa pode fazer, "MFA" diz se ela é obrigada a usar a verificação em duas etapas e "Status" diz se o acesso ainda vale. "Motivo" é a explicação escrita quando a chave foi dada.
4. **Lendo um motivo comprido** — Quando o motivo passa de 40 letras, ele aparece cortado, com "…" no fim e um sublinhado pontilhado. Pare o mouse em cima para ler o texto inteiro. O da Helena diz "Bootstrap inicial do self-host (dono da instância)": é a linha que o próprio sistema criou na instalação do servidor, dando a chave para a dona.

## O que cada acesso permite

**Objetivo:** Diferenciar acesso total de acesso só de leitura, saber quem é obrigado a usar o código do celular e reconhecer um acesso revogado.

**Quem pode:** admin

**Palavras de busca:** acesso só de leitura no admin, scope full support_readonly, verificação em duas etapas obrigatória, mfa do administrador, acesso revogado, tirar acesso de administrador, quem deu o acesso

1. **Acesso total ou só de leitura** — Abra "Platform Admins" no menu do Admin. A coluna "Scope" diz o tamanho da chave. "full" é acesso total: a pessoa vê e muda tudo no Admin, como criar ou suspender empresas. "support_readonly" é só de leitura: a pessoa abre o painel e vê tudo, mas qualquer tentativa de mudar algo é recusada. Aqui, o Carlos acompanha o painel sem poder alterar nada.
   - Rota: `/admin/dashboard`
2. **Quem precisa do código do celular** — A coluna "MFA" fala da verificação em duas etapas: além da senha, um código de 6 números do aplicativo autenticador do celular. "Sim" quer dizer que a pessoa é obrigada: enquanto ela não cadastrar o código, o sistema não a deixa seguir, nem no Admin nem no resto do DeskComm. "Não" quer dizer que não é obrigada. Esse "Sim" ou "Não" também só muda direto no banco, como o resto desta tela.
3. **Acesso ativo e acesso revogado** — A coluna "Status" diz se a chave ainda vale. "Ativo": a pessoa entra no Admin normalmente. "Revogado": a chave foi tirada e ela não entra mais no Admin (cai na tela de acesso negado). A linha não some: ela fica na lista, mais apagada, como histórico. Aqui, o Marcos Teixeira, que cuidava da informática da clínica, perdeu o acesso. Atenção: a tela não mostra quando, por quem nem por que a chave foi tirada. O "Motivo" da linha continua sendo o de quando ela foi dada.
4. **Quando e por quem** — "Concedido em" diz há quanto tempo a chave foi dada, e "Concedido por" mostra o e-mail de quem deu, sem o final do endereço (".com.br"). A chave do Carlos foi dada pela Helena. Na linha da própria Helena, quem deu foi ela mesma: o sistema registra a dona como autora da chave criada na instalação.

