# Cadastro (Admin)

- **Tela:** `/admin/cadastro`
- **Resumo:** Onde quem instalou o sistema decide quem pode criar conta: qualquer pessoa, só quem recebeu convite, ou quem você aprovar um por um.
- **Fonte:** `curso/licoes/admin-cadastro.json`

## Conhecendo a tela de Cadastro

**Objetivo:** Saber o que a tela de Cadastro controla e como ela vem quando o sistema é instalado.

**Quem pode:** admin

**Palavras de busca:** quem pode criar conta, cadastro aberto, fechar cadastro, novas contas no sistema, criar conta, admin cadastro

1. **Onde fica a tela** — No Admin, o item "Cadastro" do menu abre a tela que decide quem pode criar uma conta neste sistema. A regra vale para o servidor inteiro, não para uma empresa só. Por isso ela fica no Admin, e só quem administra a instalação vê esta tela.
   - Rota: `/admin/cadastro`
2. **As duas chaves** — A tela tem duas chaves. "Cadastro apenas por convite" fecha a porta: só entra quem foi convidado. "Cadastro com aprovação" deixa a pessoa criar a conta, mas a empresa dela só é aberta depois que você aprovar. Com as duas desligadas, como vem na instalação, qualquer pessoa pode criar uma conta e abrir a própria empresa. Quem já tem conta continua entrando normalmente, seja qual for a escolha.
3. **Salva na hora, e fica registrado** — Não há botão de salvar: a escolha vale assim que você clica na chave, e dá para voltar atrás com outro clique. Cada troca fica registrada no item "Audit" do menu, com data e hora e o e-mail (parcialmente escondido) de quem trocou. A tela de Audit é técnica e está em inglês: a troca aparece como "platform.signup_mode_updated", e, abrindo o registro, o quadro "Metadata" mostra o modo de antes em "de" e o de depois em "para". É ali que se descobre por que, de repente, ninguém mais consegue criar conta.

## Deixar entrar só quem foi convidado

**Objetivo:** Fechar o cadastro para que só entre quem recebeu convite, e reabrir quando quiser.

**Quem pode:** admin

**Palavras de busca:** fechar cadastro, só por convite, impedir que estranhos criem conta, bloquear novas contas, cadastro fechado, convite obrigatório

1. **Ligar o convite obrigatório** — Para fechar a porta, clique na chave "Cadastro apenas por convite". Faça isso quando o sistema for só da sua clínica e você não quer que um desconhecido crie conta e abra uma empresa no seu servidor.
   - Rota: `/admin/cadastro`
2. **O que muda com a chave ligada** — Ligada, a chave fica colorida e o texto muda: quem abrir a tela de cadastro sem convite vê o aviso "Cadastro apenas por convite" e um botão "Entrar", que leva ao login, no lugar do formulário. A chave "Cadastro com aprovação" fica apagada, porque não há ninguém sem convite para aprovar. O quadro amarelo de baixo lembra que isso vale até para você: se um dia precisar de uma conta nova, ela também terá de vir por convite.
3. **O aviso do servidor** — Logo depois da troca, pode aparecer no alto o aviso "A troca de modo ainda não chegou ao servidor.". O sistema já segue a regra nova, mas o serviço que guarda as senhas e cria as contas continua com a regra antiga, e esta tela só avisa: não corrige sozinha. Na instalação comum, com tudo num servidor só, o aviso mostra um comando para rodar no servidor, e a troca chega lá na próxima atualização. Quando o banco de dados fica num serviço separado, como nesta foto, atualização nenhuma resolve: é preciso trocar a opção à mão no painel do Supabase, e o aviso diz onde. Os termos técnicos que aparecem no quadro (como "GoTrue" e "DISABLE_SIGNUP") são para quem cuida do servidor.
4. **Reabrir o cadastro** — Para voltar a aceitar qualquer pessoa, clique de novo na chave. Ela desliga, o texto volta a dizer "Desligado: qualquer pessoa pode criar uma conta e abrir a própria empresa" e os quadros amarelos somem. A chave "Cadastro com aprovação" volta a poder ser ligada.

## Aprovar quem quer abrir uma empresa

**Objetivo:** Ligar o cadastro com aprovação e decidir, pedido por pedido, quem pode abrir uma empresa no sistema.

**Quem pode:** admin

**Palavras de busca:** aprovar cadastro, pedidos de empresa nova, aprovar nova empresa, recusar cadastro, fila de aprovação, quem pediu para entrar

1. **Ligar a aprovação** — Se você hospeda o sistema para várias clínicas e quer escolher quem entra, clique na chave "Cadastro com aprovação". Com ela ligada, a pessoa cria a conta normalmente, mas no lugar de abrir a empresa ela envia um pedido, e o pedido espera por você nesta tela. O sistema não avisa quando chega pedido novo: passe por aqui de tempos em tempos.
   - Rota: `/admin/cadastro`
2. **A fila de pedidos** — Com a chave ligada, aparece o quadro "Pedidos aguardando aprovação". Cada linha é um pedido: em cima, o nome da empresa que a pessoa quer abrir; embaixo, o e-mail dela. O pedido mais antigo fica no alto. Aqui há três clínicas esperando.
3. **Aprovar ou recusar** — "Aprovar" cria a empresa com o nome do pedido e torna quem pediu administrador dela. "Recusar" fecha a porta para aquela conta enquanto a aprovação estiver ligada: ela vê o aviso "Pedido não aprovado" e não consegue pedir outra vez. Se ela tiver um convite, ainda pode entrar pelo link do convite. Nos dois casos o sistema não avisa a pessoa: combine com ela. Se foi aprovada, basta entrar de novo para começar a usar.
4. **Depois de decidir** — Assim que você decide, o pedido sai da fila. Aqui o pedido da "OdontoVita Sorrisos" foi recusado e sumiu da lista; ficaram os outros dois. Cada aprovação e cada recusa fica registrada no item "Audit" do menu.
5. **Desligar a aprovação** — Clique de novo na chave para voltar ao cadastro aberto. Atenção: a partir daí, quem estava esperando aprovação, e até quem você recusou, pode abrir a própria empresa sozinho na próxima vez que entrar, sem passar por você. A fila some desta tela, mas os pedidos não decididos continuam guardados: se você ligar a chave outra vez, eles voltam a aparecer.

