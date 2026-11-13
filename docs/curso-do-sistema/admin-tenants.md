# Tenants (Admin)

- **Tela:** `/admin/tenants`
- **Resumo:** A lista de todas as empresas instaladas no seu servidor: onde você cria uma empresa nova, abre a ficha de cada uma, confere a saúde e o agente dela e, quando precisa, suspende o acesso.
- **Fonte:** `curso/licoes/admin-tenants.json`

## Conhecendo a lista de empresas

**Objetivo:** Ler a lista de empresas do servidor, entender a situação de cada uma e filtrar a lista pela situação.

**Quem pode:** admin

**Palavras de busca:** lista de empresas, tenants, clientes do servidor, empresas instaladas, ver empresas suspensas, situação da empresa

1. **Todas as empresas do servidor** — No Admin, "Tenants" é o nome dado às empresas instaladas no seu servidor. Cada clínica que usa o sistema aqui é um tenant. Esta tela lista todas elas, das mais novas para as mais antigas. Logo abaixo do título aparece quantas empresas a lista mostra.
   - Rota: `/admin/tenants`
2. **O que cada coluna diz** — Cada linha é uma empresa. "Slug" é o apelido curto dela no sistema, sem espaços nem acentos. "Nome" é como ela aparece para a equipe. "CNPJ" mostra só o começo do número. "Users" conta os acessos ligados à empresa, inclusive os de quem já perdeu o acesso. "Conversas" conta as conversas dela. "Criado em" é o dia em que a empresa foi criada no servidor.
3. **A situação de cada empresa** — A coluna "Status" diz como a empresa está. "Ativo": funcionando normalmente. "Onboarding": a empresa existe, mas a configuração inicial ainda não foi concluída. "Suspenso": o acesso foi cortado, e a equipe dela não entra. "Redigido": os dados pessoais da empresa foram apagados por pedido de LGPD.
4. **Os atalhos de cada linha** — No fim de cada linha há três atalhos. O olho abre a página de saúde da empresa. O lápis abre a ficha, onde você também edita os dados. O botão de pausa abre a confirmação para suspender a empresa, sem sair da lista. Numa empresa suspensa pelo admin, ele vira um botão de "Reativar". Se a empresa foi suspensa por falta de pagamento, ele vira um ícone de recibo que leva à ficha. Numa empresa redigida, só existe o link "Ver", que abre a ficha.
5. **Filtrando pela situação** — O seletor ao lado do campo de busca mostra só as empresas de uma situação. Ele começa em "Todos os status". Escolha "Ativo", "Onboarding", "Suspenso" ou "Redigido" para ver só aquelas empresas.
6. **Só as suspensas** — Com "Suspenso" escolhido, a lista mostra só as empresas com o acesso cortado. Para voltar a ver todas, abra o seletor de novo e escolha "Todos os status".

## Criando uma empresa nova

**Objetivo:** Preencher o cadastro de uma empresa nova e saber o que acontece quando ela é criada.

**Quem pode:** admin

**Palavras de busca:** criar empresa nova, novo tenant, cadastrar cliente no servidor, nova organização, convidar dono da empresa, adicionar clínica

1. **O botão de criar** — Para colocar uma empresa nova no servidor, clique em "Novo tenant", no alto da lista.
   - Rota: `/admin/tenants`
2. **O nome e o slug** — Comece pelo "Nome de exibição", que é como a equipe vê a empresa. Enquanto você digita, o sistema monta o "Slug" sozinho: o mesmo nome em minúsculas, sem acentos e com hífens no lugar dos espaços. Você pode trocar o slug à mão. Se ele já existir em outra empresa, o sistema avisa ao criar.
3. **Os dados da empresa e do responsável** — "Razão social" e "CNPJ" são opcionais; sem razão social, o sistema usa o nome de exibição. O "Plano" (Standard, Pro ou Enterprise) é só uma etiqueta para você organizar: ele não cobra nem limita nada. Se a Cobrança estiver ligada no seu servidor, no lugar dele aparece "Plano de cobrança", e aí o plano escolhido cobra de verdade. Em "E-mail do responsável", coloque o e-mail da pessoa que vai ser a dona da empresa no sistema.
4. **O que o responsável vai ver no menu** — Em "Interface" você escolhe quais áreas aparecem no menu do responsável. "Completa" mostra todas; "Simplificada" mostra menos áreas, para quem está começando. Em "Personalizar áreas visíveis" dá para marcar uma a uma. Isso só muda o menu: o que a pessoa pode fazer continua definido pelo cargo dela.
5. **Criar a empresa** — Confira os dados e clique em "Criar organização". A empresa é criada e aparece na lista como "Onboarding" até a configuração inicial ser concluída. Você entra nela como administrador, para fazer essa configuração. O responsável recebe um convite para ser o dono: a tela mostra o link do convite e o botão "Copiar convite", e, se o servidor tiver e-mail configurado, o convite também vai por e-mail. O convite tem prazo de validade. O seu acesso à empresa é provisório e sai quando o dono aceitar.

## Lendo a ficha de uma empresa

**Objetivo:** Abrir a ficha de uma empresa e entender os dados, os números, as integrações e a equipe dela.

**Quem pode:** admin

**Palavras de busca:** ficha da empresa, detalhes do tenant, quantas conversas a empresa tem, equipe de uma empresa, alterar e-mail de acesso, dados da empresa no admin

1. **Abrindo a ficha** — Para ver tudo sobre uma empresa, clique no lápis da linha dela. Aqui vamos abrir a ficha da Clínica Bem Viver.
   - Rota: `/admin/tenants`
2. **O topo da ficha** — No topo ficam o nome da empresa, o slug e a situação. Logo abaixo, as abas: "Visão Geral" (esta), "Saúde" e "Agente". As abas "Equipe" e "Uso" ainda não funcionam e mostram "em breve". O link "Tenants", acima do nome, volta para a lista.
3. **Informações e volumes** — O quadro "Informações" mostra o plano, a razão social, o CNPJ, "Onboarding concluído" (o dia em que a configuração inicial terminou) e "Criado em". Numa empresa suspensa, aparece também "Suspenso em". Em "Volumes" ficam os totais da empresa: usuários, conversas, mensagens, leads e pedidos.
4. **Integrações, LGPD e IA** — Em "Integrações", você vê a situação da loja Nuvemshop e, em "WAHA sessions", quantos canais de atendimento a empresa tem cadastrados, conectados ou não. Em "Compliance & IA", ficam os pedidos de LGPD ainda abertos, que ganham um alerta amarelo quando existem, e quantas vezes a IA foi usada nos últimos 30 dias.
5. **A equipe e os e-mails de acesso** — "Membros e e-mails de acesso" lista as pessoas ligadas a esta empresa, com o e-mail de login e o cargo. Selos mostram quem é o "Dono", quem é "Admin da plataforma" e quem teve o "Acesso revogado". É aqui que você corrige o e-mail de quem se cadastrou errado: "Alterar e-mail" troca o endereço de login e de recuperação de senha, e a empresa recebe um aviso. O botão fica apagado para quem é admin da plataforma, que só troca o e-mail pela própria conta, e para quem já teve o acesso revogado.

## Editando e acompanhando uma empresa

**Objetivo:** Usar o quadro de ações da ficha para corrigir os dados de uma empresa e para entrar nela como ela vê.

**Quem pode:** admin

**Palavras de busca:** editar dados da empresa, entrar como a empresa, acompanhar organização, ver o sistema como o cliente, corrigir cnpj da empresa, suporte ao cliente

1. **O quadro de ações** — À direita da ficha fica o quadro "Ações". "Acompanhar organização" deixa você entrar na empresa para ver o que a equipe vê. "Editar dados" corrige o cadastro. "Suspender tenant" corta o acesso; ele tem uma lição só para ele. Para excluir uma empresa, é preciso suspendê-la primeiro.
   - Rota: `/admin/tenants/a7000000-0000-4000-8000-000000000001`
2. **Corrigindo os dados** — "Editar dados" abre os mesmos campos que o administrador da empresa vê em Configurações › Empresa: nome, razão social, CNPJ, e-mail do responsável pelos dados pessoais (DPO), fuso horário, idioma, moeda, país, a limpeza automática da mídia antiga (e depois de quantos dias ela apaga) e o endereço da política de privacidade. Altere o que precisar e clique em "Salvar". Fechar a janela não muda nada.
3. **Entrando na empresa para ajudar** — "Acompanhar organização" pede confirmação antes. Ao clicar em "Confirmar e entrar", você vai para a Inbox da empresa, com a sua própria identidade: tudo o que você fizer fica registrado no seu nome. O acesso dura até uma hora. Marque "Somente leitura" para só olhar, sem poder mudar nada.
   - Rota: `/admin/tenants/a7000000-0000-4000-8000-000000000001`

## Conferindo a saúde e o agente de uma empresa

**Objetivo:** Ler os quatro cartões de saúde de uma empresa e ver qual agente de IA ela tem publicado.

**Quem pode:** admin

**Palavras de busca:** saúde da empresa, whatsapp da empresa desconectado, gasto de ia do cliente, agente publicado da empresa, empresa com problema, teto de gasto ia

1. **Abrindo a saúde pela lista** — O olho, no fim da linha, abre direto a página de saúde da empresa. Vamos ver a FisioVida Reabilitação.
   - Rota: `/admin/tenants`
2. **Os quatro cartões** — A aba "Saúde" tem quatro cartões, cada um com um selo: "OK" em verde, "Atenção" em amarelo ou "Crítico" em vermelho. A página se atualiza sozinha a cada minuto, e o horário da última leitura fica no canto.
3. **O WhatsApp e a loja** — O cartão "WAHA" mostra quantos canais de WhatsApp da empresa estão conectados, do total. Aqui é "0/1 conectada": o único número está parado, por isso o selo é "Crítico". Sem nenhum número, o selo é "Atenção". O cartão "Nuvemshop" diz se a loja virtual está ligada e quando o acesso a ela vence. Empresa que não usa loja virtual aparece como "Não conectado", com selo "Atenção": nesse caso, não há nada a resolver.
4. **O gasto com IA e os registros** — "Orçamento IA" compara o gasto do mês com o teto da empresa, em dólares. A FisioVida já usou 92%. O selo fica em "Atenção" a partir de 80%. Só vira "Crítico" quando chega a 100% e o teto está no modo que para a IA; aqui o "Limite" é "Só avisa". Com o limite "Não aplicado", o selo fica sempre em "OK". "Audit Lag" mostra há quanto tempo foi gravado o último registro de atividade da empresa: até 2 minutos é "OK", e acima de 10 minutos vira "Crítico".
5. **O agente de IA da empresa** — A aba "Agente" lista os agentes de IA da empresa. Cada um mostra se está ativo e qual versão está publicada. Na FisioVida, o agente está "Inativo" e nunca foi publicado, por isso aparece "Nenhum agente publicado": a IA dela não atende ninguém. "Tipo" mostra um nome técnico; "rag_bot" é o agente de atendimento. Esta aba é só para consultar: mudar o agente se faz dentro da empresa.
6. **Um agente no ar** — Na Odonto Sorriso Leve, o agente "Lia — Atendimento Sorriso Leve" está "Ativo". Em "Versão publicada", "v3 · anthropic · claude-sonnet-4-6" quer dizer: versão 3, usando a IA da Anthropic, no modelo claude-sonnet-4-6. "Publicado em" diz desde quando essa é a versão em uso. Para ela responder de fato, a empresa também precisa estar com o WhatsApp conectado.
   - Rota: `/admin/tenants/a7000000-0000-4000-8000-000000000001/agent`

## Suspendendo, reativando e excluindo

**Objetivo:** Saber cortar o acesso de uma empresa, devolver o acesso e, no fim, excluí-la de vez.

**Quem pode:** admin

**Palavras de busca:** suspender empresa, cortar acesso do cliente, reativar empresa suspensa, excluir empresa do servidor, apagar tenant, cliente cancelou contrato

1. **Suspender pela lista** — O botão de pausa, no fim da linha, suspende a empresa sem sair da lista. Ele abre uma confirmação com o nome da empresa, para não suspender a errada.
   - Rota: `/admin/tenants`
2. **O que a suspensão faz** — Leia o aviso com atenção: a equipe da empresa perde o acesso, e a IA, os envios e as automações dela param. Mensagens na fila e tarefas agendadas são descartadas e não saem quando ela voltar; os follow-ups em andamento ficam parados e retomam de onde pararam quando ela for reativada. As mensagens que chegarem continuam gravadas. Escreva o motivo (pelo menos 10 caracteres) e clique em "Confirmar suspensão". Para desistir, use "Cancelar".
3. **Uma empresa suspensa** — Na ficha de uma empresa suspensa aparece uma faixa amarela no topo, com quando ela foi suspensa. No quadro "Ações", a frase "Suspensão administrativa" diz que foi o admin que suspendeu. No lugar de "Suspender tenant", aparecem "Reativar tenant" e "Excluir tenant".
   - Rota: `/admin/tenants/a7000000-0000-4000-8000-000000000004`
4. **Devolvendo o acesso** — "Reativar tenant" pede o motivo da reativação, que fica registrado no histórico do Admin. Ao clicar em "Confirmar reativação", a equipe volta a entrar.
5. **Excluindo de vez** — "Excluir tenant" apaga a empresa e todos os dados dela, sem volta: conversas, mensagens, leads, arquivos, agentes e integrações. Os números de WhatsApp são desconectados, e os logins de quem só trabalhava nesta empresa são removidos; quem participa de outra empresa continua. Para liberar "Excluir definitivamente", escreva o motivo e digite o slug da empresa, que aparece logo acima do campo.
   - Rota: `/admin/tenants/a7000000-0000-4000-8000-000000000004`

