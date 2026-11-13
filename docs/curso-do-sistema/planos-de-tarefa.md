# Planos de tarefa

- **Tela:** `/app/tasks/planos`
- **Resumo:** Sequências de tarefas que se repetem, montadas uma vez só: uma automação aplica o plano a cada negócio e ninguém esquece o próximo passo.
- **Fonte:** `curso/licoes/planos-de-tarefa.json`

## Conhecendo a tela de Planos de tarefa

**Objetivo:** Achar a tela, entender o que é um plano de tarefa e o que cada cartão mostra.

**Quem pode:** admin

**Palavras de busca:** planos de tarefa, sequência de tarefas, modelo de tarefas, tarefas que se repetem, roteiro de acompanhamento, passos depois da avaliação, checklist do negócio

1. **Onde fica a tela** — Planos de tarefa não aparece direto no menu lateral. No grupo "CRM" do menu, clique em "Ver tudo em CRM". Na parte "O dia a dia da venda" está o cartão "Planos de tarefa". O caminho completo é: CRM › Ver tudo em CRM › Planos de tarefa.
   - Rota: `/app/crm`
2. **Para que serve um plano** — Muitos atendimentos pedem sempre os mesmos passos. Na clínica, depois da avaliação de fisioterapia, alguém liga no dia seguinte, manda os horários livres e, dias depois, pergunta se o paciente quer fechar o pacote. Um plano de tarefa guarda essa sequência uma vez só. Quando o plano é aplicado a um negócio do funil, cada passo vira uma tarefa na tela "Tarefas", com prazo e responsável.
   - Rota: `/app/tasks/planos`
3. **O que cada cartão mostra** — Cada plano salvo vira um cartão: o nome em cima, a descrição logo abaixo e os passos numerados, na ordem em que as tarefas serão criadas. "Vence em (dias)" é o prazo de cada tarefa, contado a partir do momento em que o plano é aplicado: 1 quer dizer um dia depois, no mesmo horário; 0 quer dizer na mesma hora.
4. **Editar e Excluir** — Cada cartão tem dois botões. "Editar" abre o plano no formulário, para mudar o que for preciso. "Excluir" apaga o plano. Os dois aparecem na lição "Editar e excluir um plano".

## Criar um plano

**Objetivo:** Montar um plano novo, passo a passo, e salvá-lo para as automações usarem.

**Quem pode:** admin

**Palavras de busca:** criar plano de tarefa, novo plano, montar sequência de tarefas, adicionar passo, prazo da tarefa em dias, responsável pela tarefa, nome do paciente na tarefa

1. **Abrir o formulário** — Clique em "Novo plano", no alto, à direita. O formulário abre logo abaixo do título da tela, em cima da lista de planos.
   - Rota: `/app/tasks/planos`
2. **Nome e descrição** — Em "Nome do plano", escreva um nome que a equipe reconheça: é ele que aparece na lista de planos das automações. A "Descrição (opcional)" conta quando usar o plano. O contador embaixo mostra quantos dos 300 caracteres você já usou.
3. **O primeiro passo** — Cada passo vira uma tarefa. Em "Título", escreva o que precisa ser feito. Dá para usar dois códigos, que o sistema troca na hora de criar a tarefa: {{contact.name}} vira o nome do contato (o paciente) e {{lead.title}} vira o nome do negócio. Assim a tarefa já nasce dizendo com quem falar.
4. **Prazo, prioridade e responsável** — "Vence em (dias)" diz quantos dias depois da aplicação a tarefa vence; aqui, 25. "Prioridade" vai de Baixa a Urgente e começa em Média; escolhemos Alta. Em "Atribuir a", "Dono do negócio" entrega a tarefa a quem for o responsável pelo negócio quando o plano for aplicado. Também dá para escolher uma pessoa fixa da equipe.
5. **Mais um passo** — Clique em "Adicionar passo" para pôr outra tarefa na sequência. Aqui, o passo 2 é conferir se o paciente confirmou o retorno, três dias depois do passo 1, e ele vai sempre para a Ana Ribeiro, da recepção. Um plano pode ter até 30 passos. "Remover passo" tira um passo da lista.
6. **Salvar** — Confira e clique em "Salvar plano". Se faltar o nome do plano ou o título de algum passo, nada é salvo e aparece um aviso vermelho no alto da tela, acima do formulário. "Cancelar" fecha o formulário sem guardar nada.
7. **O plano entrou na lista** — O formulário fecha e o plano novo aparece no fim da lista, com os dois passos e os seus prazos. A partir de agora ele já pode ser escolhido nas automações.

## Editar e excluir um plano

**Objetivo:** Mudar um plano que já existe e apagar um que não serve mais.

**Quem pode:** admin

**Palavras de busca:** editar plano de tarefa, mudar prazo do plano, remover passo, excluir plano, apagar plano de tarefa, trocar responsável do passo

1. **Abrir o plano** — Para mudar um plano, clique em "Editar" no cartão dele. Vamos editar o "Pós-avaliação de fisioterapia".
   - Rota: `/app/tasks/planos`
2. **O formulário já vem preenchido** — O mesmo formulário de "Novo plano" abre no alto da tela, com tudo o que o plano já tem, inclusive a prioridade e a pessoa de cada passo. Aqui mudamos o prazo do passo 2, o de enviar os horários livres, de 2 para 3 dias.
3. **Tirar um passo** — "Remover passo" tira o passo da sequência. Vamos tirar o passo 3. Se ele estiver no meio, os passos de baixo sobem e são numerados de novo.
4. **Salvar a mudança** — O passo 3 saiu do formulário. Clique em "Salvar plano". A mudança vale para as próximas vezes que o plano for aplicado; as tarefas que ele já criou continuam como estão.
5. **O cartão mudou** — O formulário fecha e o cartão mostra o plano com dois passos. O passo 2 agora vence em 3 dias.
6. **Excluir um plano** — Para apagar um plano, clique em "Excluir" no cartão dele. Atenção: não há pergunta de confirmação, o plano some na hora e não volta.
7. **O plano saiu da lista** — O cartão "Boas-vindas ao paciente novo" sumiu e só ficou o outro plano. As tarefas que o plano apagado já tinha criado continuam na tela "Tarefas".

## Aplicar o plano com uma automação

**Objetivo:** Fazer o plano virar tarefas sozinho, quando algo acontece com o negócio.

**Quem pode:** admin

**Palavras de busca:** aplicar plano de tarefa, automação de tarefas, criar tarefas automaticamente, quando o negócio for ganho, regra de automação, usar o plano no negócio

1. **Onde o plano é aplicado** — O plano vira tarefas por meio de uma automação: uma regra do tipo "quando acontecer isto, faça aquilo". As automações ficam no menu "Webhooks", aba "Automações". Clique em "Nova automação".
   - Rota: `/app/webhooks?aba=automacoes`
2. **Quando aplicar** — Dê um nome à automação. Em "QUANDO", escolha o que dispara a regra. Aqui, "Quando um negócio for ganho": quando o paciente fecha o tratamento e o negócio é marcado como ganho no funil, a regra roda.
3. **Escolher o plano** — Em "ENTÃO", abra "Adicionar ação" e escolha "Aplicar um plano de tarefas ao negócio". No campo "Plano de tarefa" aparece a lista dos planos salvos na tela Planos de tarefa. Escolha "Boas-vindas ao paciente novo".
4. **O que acontece quando a regra roda** — A cada negócio ganho, o plano cria as suas tarefas na ordem dos passos, com os prazos contados a partir daquele momento. O mesmo plano não é aplicado duas vezes no mesmo negócio, e a linha do tempo do negócio registra que o plano foi aplicado. A automação nasce pausada: depois de "Criar automação", ligue a chave dela na lista de automações.

