# Curso do DeskcommCRM — índice

Gerado a partir de `curso/licoes/*.json` (a fonte que alimenta https://www.deskcomm.com.br/curso). O site público mostra a 1.94.0; esta cópia acompanha a versão do repositório (v1.109.0, 12/11/2026).

Uso: abra o módulo da tela sobre a qual a pergunta é; cada lição traz objetivo, quem pode usar, palavras de busca e os passos, com a rota da tela. Para achar por assunto: busque o termo em `docs/curso-do-sistema/`.

| Módulo | Tela | Lições | O que é |
|---|---|---|---|
| [Audit (Admin)](admin-audit.md) | `/admin/audit` | 3 | O caderno de registro do servidor: cada coisa que muda em qualquer empresa fica anotada aqui, com o quê, quem fez e quando, para você conferir depois. |
| [Cadastro (Admin)](admin-cadastro.md) | `/admin/cadastro` | 3 | Onde quem instalou o sistema decide quem pode criar conta: qualquer pessoa, só quem recebeu convite, ou quem você aprovar um por um. |
| [Cobrança (Admin)](admin-cobranca.md) | `/admin/cobranca` | 5 | Onde quem revende o sistema cobra as empresas clientes: conecta a conta de pagamento, cria os planos, define quantos dias de atraso tolerar e acompanha quem está em dia. |
| [Credenciais (Admin)](admin-configuracao.md) | `/admin/configuracao` | 3 | Onde quem instalou o sistema confere as senhas e chaves do servidor e preenche os contatos que todas as empresas veem: o e-mail de suporte e o do encarregado de dados. |
| [Dashboard (Admin)](admin-dashboard.md) | `/admin/dashboard` | 2 | O painel de quem cuida do servidor: em uma tela, os números e os alertas de todas as empresas da instalação. |
| [Destinos internos (Admin)](admin-destinos-internos.md) | `/admin/destinos-internos` | 2 | Onde quem cuida do servidor libera, um por um, os endereços da rede interna da própria máquina que o sistema pode chamar, como um serviço que você mesmo instalou ao lado dele. |
| [E-mail (Admin)](admin-email.md) | `/admin/email` | 3 | Onde quem instalou o sistema escolhe por onde saem os e-mails de todas as empresas deste servidor: convites da equipe, entrega de dados da LGPD e avisos de prazo. |
| [Extensões (Admin)](admin-extensoes.md) | `/admin/extensoes` | 2 | Onde quem instalou o sistema confere, sem mexer em nada, de onde vêm as extensões do servidor, quais estão instaladas e em quantas empresas cada uma está ligada. |
| [Google Agenda (Admin)](admin-google.md) | `/admin/google` | 2 | Onde quem instalou o sistema cadastra, uma vez só, o aplicativo do Google que deixa cada pessoa da equipe ligar a própria agenda do Google à Agenda do CRM. |
| [Inbox (Admin)](admin-inbox.md) | `/admin/inbox` | 3 | Onde quem cuida do servidor lê as conversas de todas as empresas da instalação, sem responder, para dar suporte. |
| [Incidents (Admin)](admin-incidents.md) | `/admin/incidents` | 3 | A lista de problemas do servidor que pedem atenção: o que aconteceu, em qual empresa, quão grave é, e o lugar onde você anota como resolveu. |
| [LGPD (Admin)](admin-lgpd.md) | `/admin/lgpd` | 3 | A lista dos pedidos de LGPD de todas as empresas do seu servidor (clientes que pedem uma cópia dos seus dados ou que eles sejam apagados), com o prazo e o risco de cada um, para você cobrar quem está atrasado. |
| [Marca (Admin)](admin-marca.md) | `/admin/marca` | 5 | Onde quem instalou o sistema troca o nome, a cor, o logo e o ícone que aparecem para todas as empresas do servidor, inclusive na tela de entrada. |
| [API Oficial da Meta (Admin)](admin-meta.md) | `/admin/meta` | 4 | Onde quem instalou o sistema cadastra a chave secreta do aplicativo da Meta e recebe o token que liga o WhatsApp oficial a este servidor, para todas as empresas. |
| [Módulos (Admin)](admin-modulos.md) | `/admin/modulos` | 2 | Onde quem instalou o sistema acrescenta partes extras ao servidor, como Comandas e Honorários, que passam a valer para todas as empresas dele. |
| [Platform Admins (Admin)](admin-platform-admins.md) | `/admin/platform-admins` | 2 | A lista de quem tem a chave do Admin do seu servidor: quem pode mexer em tudo, quem só olha, quem precisa do código do celular e quem já perdeu o acesso. |
| [Recursos opcionais (Admin)](admin-sistema.md) | `/admin/sistema` | 4 | O lugar onde quem instalou o sistema liga os recursos extras, decide como ele se comporta e vê o que depende do servidor, para todas as empresas de uma vez. |
| [Tenants (Admin)](admin-tenants.md) | `/admin/tenants` | 6 | A lista de todas as empresas instaladas no seu servidor: onde você cria uma empresa nova, abre a ficha de cada uma, confere a saúde e o agente dela e, quando precisa, suspende o acesso. |
| [Usage (Admin)](admin-usage.md) | `/admin/usage` | 3 | Quanto cada empresa do servidor conversou e gastou com IA, dia a dia e somado, para você saber quem usa mais e quanto custa. |
| [Users (Admin)](admin-users.md) | `/admin/users` | 3 | A lista de todas as pessoas que fazem parte de alguma empresa do seu servidor, em todas as empresas: quem é, em qual empresa trabalha, com que papel, quando entrou pela última vez e se ainda tem acesso. |
| [Agenda](agenda.md) | `/app/agenda` | 7 | Onde ficam as consultas, sessões e reuniões da equipe: ver a semana, marcar, remarcar, cancelar e registrar quem veio. |
| [Agentes](agentes.md) | `/app/ai/agents` | 7 | Onde você monta os atendentes virtuais que respondem seus clientes no WhatsApp: as instruções, o que eles podem fazer, o material que consultam e a hora de entrar no ar. |
| [Alertas](alertas-da-ia.md) | `/app/ai/inbox` | 3 | A Central de avisos reúne o que a IA percebeu e precisa de uma pessoa da equipe: uma resposta que não chegou, um cliente que pediu para falar com gente, um gasto que passou do limite. |
| [API Tokens](api-tokens.md) | `/app/settings/api-tokens` | 3 | Onde você cria as chaves que deixam outro sistema (uma agenda online, um prontuário, um assistente de IA) conversar com o seu CRM, escolhe o que cada chave pode fazer e desliga a que não usa mais. |
| [App no celular](app-no-celular.md) | `/app/settings/aplicativo` | 2 | Como colocar o sistema na tela de início do celular, como um aplicativo, e onde ligar os avisos de mensagem nova depois de instalar. |
| [Atividades](atividades.md) | `/app/activities` | 4 | O relatório do que aconteceu no CRM num período: quanto foi a equipe, quanto foram os agentes de IA, quem fez cada coisa e quais assuntos mais ocuparam o atendimento. |
| [Atualização do sistema](atualizacao.md) | `/app/settings/atualizacao` | 1 | Onde quem instalou o sistema vê a versão em uso, descobre que saiu uma versão nova, lê o que muda e pede a atualização sem abrir o servidor. |
| [Automações](automacoes.md) | `/app/settings/automacoes` | 3 | Um interruptor só, que decide se a IA pode escolher o caminho dentro das suas automações, para a empresa inteira. |
| [Aviso de agendamento](aviso-de-agendamento.md) | `/app/agenda/avisos` | 5 | Receber no seu WhatsApp cada horário marcado, remarcado ou cancelado, e às 7h o resumo do dia, para nunca marcar duas pessoas no mesmo horário. |
| [Aviso no WhatsApp](aviso-no-whatsapp.md) | `/app/ai/cases/avisos` | 3 | Toda vez que a IA trava e abre um caso para a equipe, um celular de plantão recebe na hora uma mensagem de WhatsApp com o resumo e o link do caso. |
| [Campanhas](campanhas.md) | `/app/campaigns` | 4 | Mande uma mensagem de WhatsApp para uma lista de contatos que você escolhe, no ritmo do número, e acompanhe quem recebeu e quem respondeu. |
| [Casos](casos.md) | `/app/ai/cases` | 6 | Os pedidos que a IA não consegue resolver sozinha e deixa para a equipe decidir, enquanto continua falando com o cliente. |
| [Chamadas](chamadas.md) | `/app/calls` | 2 | O histórico das ligações por telefone que a IA de voz fez e recebeu, com a conversa escrita de cada uma. |
| [Comandas](comandas.md) | `/app/comandas` | 3 | O balcão da clínica: cada comanda junta o que foi feito no atendimento, quanto o paciente paga e como pagou. |
| [Conexões](conexoes.md) | `/app/connections` | 6 | Onde você liga e acompanha os números de WhatsApp e os outros canais da empresa: se cada um está funcionando, para quem a IA responde, pausas e proteção contra bloqueio. |
| [Conhecimento](conhecimento.md) | `/app/ai/knowledge/sources` | 4 | O material da sua empresa que o agente de IA lê antes de responder: perguntas frequentes, preparos, políticas. Aqui você ensina, confere e tira do ar. |
| [Contatos](contatos.md) | `/app/contacts` | 7 | A lista de todos os clientes da empresa: achar, cadastrar, corrigir, juntar repetidos e trazer contatos de planilha ou do celular. |
| [Conversões](conversoes.md) | `/app/settings/conversoes` | 6 | Onde você liga a conta de anúncios para avisar à Meta quais clientes do anúncio viraram venda, confere o que chegou e marca a origem de quem vem pelo site. |
| [Credenciais](credenciais.md) | `/app/ai/credentials` | 4 | Onde você guarda a chave da sua conta de inteligência artificial, a que os agentes usam para pensar, e confere se ela está funcionando. |
| [Dados externos](dados-externos.md) | `/app/integracao-dados` | 4 | Onde você liga o CRM ao banco de dados de outro sistema da clínica, para o agente de IA consultar essas informações sem poder mudar nada lá. |
| [Desempenho](desempenho.md) | `/app/metrics` | 7 | Os números do atendimento e das vendas dos últimos 30 dias: o que o resultado custou, por que se perdeu, quanto deve entrar e como cada pessoa da equipe está indo. |
| [Distribuição de atendimento](distribuicao-de-atendimento.md) | `/app/settings/atendimento` | 6 | Onde você decide quem da equipe recebe cada cliente novo, o que cada atendente enxerga e quando a IA volta a responder. |
| [Empresas](empresas.md) | `/app/companies` | 2 | O cadastro das empresas para quem a clínica vende: razão social, CNPJ, endereço e as pessoas que decidem lá dentro, com os telefones de cada uma. |
| [Equipe](equipe.md) | `/app/team` | 6 | Quem trabalha no sistema, com qual papel, o que cada um vê no menu, como as conversas são divididas e o horário de cada atendente. |
| [Etapas do funil](etapas-do-funil.md) | `/app/settings/tenant/pipelines` | 4 | Onde você monta as colunas de cada funil, do primeiro contato até a venda ou a desistência, e decide os motivos de perda. |
| [Execuções](execucoes.md) | `/app/ai/runs` | 2 | Tudo o que a IA fez, uma linha por vez — e, quando algo falhou, o que o cliente viveu, o que fazer e a mensagem original do provedor. |
| [Extensões](extensoes.md) | `/app/extensions` | 4 | Onde você instala e liga guias prontos que orientam a equipe no CRM, como o roteiro da primeira consulta, vendo antes quais telas cada guia pode abrir. |
| [Financeiro](financeiro.md) | `/app/settings/tenant/financeiro` | 5 | Onde você diz onde o dinheiro da clínica fica, como o cliente paga, como cada entrada e saída é classificada e quais contas se repetem todo mês. |
| [Fluxos de atendimento](fluxos-de-atendimento.md) | `/app/ai/atendimento` | 3 | Roteiros de perguntas que a IA faz durante a conversa, uma de cada vez, guardando cada resposta na ficha do cliente. |
| [Follow-ups](follow-ups.md) | `/app/ai/followups` | 7 | Mensagens de retorno que saem sozinhas para o paciente que parou de responder: os fluxos prontos, o construtor e a fila de quem está sendo acompanhado. |
| [Funis](funis.md) | `/app/kanban` | 7 | Onde você acompanha cada negócio da empresa num quadro: cada cliente é um cartão que anda pelas etapas, do primeiro contato até ganhar ou perder. |
| [Importações](importacoes.md) | `/app/imports` | 2 | Traz de uma planilha, de uma vez, as empresas, as pessoas que decidem nelas e os telefones de cada uma, e mostra linha por linha o que entrou e o que não entrou. |
| [Inbox](inbox.md) | `/app/inbox` | 9 | Onde você e a IA atendem os clientes do WhatsApp lado a lado: a fila de quem espera, a conversa, a ficha do cliente e os atalhos do dia a dia. |
| [LGPD](lgpd.md) | `/app/lgpd/requests` | 4 | Onde chegam os pedidos dos clientes da loja virtual para receber uma cópia dos próprios dados ou apagá-los, com o prazo de cada um. |
| [Marca](marca.md) | `/app/settings/marca` | 4 | Onde você coloca o nome, a cor e o logo da sua empresa dentro do sistema, e escolhe o nome que aparece nos e-mails que as automações mandam aos seus clientes. |
| [Memória](memoria.md) | `/app/ai/memory` | 4 | As regras da casa e os aprendizados que todos os agentes de IA da empresa seguem em qualquer conversa: escrever, publicar, voltar a uma versão antiga e arquivar o que não vale mais. |
| [Meta Ads](meta-ads.md) | `/app/ads/meta` | 3 | Onde você acompanha quanto gastou e quanto custou cada resultado dos anúncios do Facebook e do Instagram, depois de ligar a sua conta de anúncios. |
| [Meta Ads (conexão)](meta-ads-conexao.md) | `/app/settings/meta-ads` | 3 | A página onde o administrador liga, troca ou desliga a conta de anúncios do Facebook e do Instagram, para o sistema poder ler os resultados das campanhas. |
| [Meta de vendas](meta-de-vendas.md) | `/app/settings/metas` | 2 | Dizer quantas vendas a clínica quer fechar no mês, para a tela de Desempenho mostrar quanto já foi feito e quanto falta. |
| [Modelos de proposta](modelos-de-proposta.md) | `/app/settings/tenant/proposals/modelos` | 5 | Onde você escolhe quais modelos de proposta a clínica usa, cria os seus e ajusta os textos que vão para o paciente. |
| [Notificações](notificacoes.md) | `/app/settings/notifications` | 3 | Onde você escolhe sobre o que quer ser avisado, como o aviso aparece na tela e no celular, os lembretes de tarefa e os sons da equipe. |
| [Organização](organizacao.md) | `/app/settings/tenant` | 5 | Onde você cadastra os dados da sua empresa, decide por quanto tempo guardar fotos e áudios das conversas, ajusta o menu da equipe e, se precisar, apaga os dados de teste para recomeçar. |
| [Perfil](perfil.md) | `/app/settings/profile` | 3 | Onde você acha todas as Configurações e ajusta o que é só seu: o nome que a equipe vê, a foto, o idioma e o fuso horário. |
| [Pessoas](pessoas.md) | `/app/people` | 2 | As pessoas que decidem dentro das empresas clientes: em que empresa trabalham, com que cargo, e por quais telefones se fala com elas. |
| [Plano e cobrança](plano-e-cobranca.md) | `/app/settings/billing` | 3 | Onde você vê o plano da sua empresa, quanto dele já usa, a situação do pagamento, e onde troca de plano ou cancela a assinatura. |
| [Planos de tarefa](planos-de-tarefa.md) | `/app/tasks/planos` | 4 | Sequências de tarefas que se repetem, montadas uma vez só: uma automação aplica o plano a cada negócio e ninguém esquece o próximo passo. |
| [Produtos](produtos.md) | `/app/products` | 4 | A lista do que a empresa vende, com preço e estoque: é nela que o atendente de IA procura o valor quando um cliente pergunta quanto custa. |
| [Propostas](propostas.md) | `/app/settings/tenant/proposals` | 3 | Onde você liga as propostas comerciais da sua empresa e define o prazo de validade, as condições de pagamento e o aviso que a equipe recebe quando a IA prepara uma proposta. |
| [Propostas da IA](propostas-da-ia.md) | `/app/ai/proposals` | 2 | Os próximos passos que a IA sugere para cada negócio aberto, numa lista só, esperando alguém da equipe aprovar ou ignorar. |
| [Propostas do dia a dia](propostas-do-crm.md) | `/app/proposals` | 3 | Onde a equipe cria, revisa e envia as propostas para os pacientes, confere os rascunhos que a IA preparou e registra se o paciente aceitou ou recusou. |
| [Prospecção](prospeccao.md) | `/app/prospecting` | 4 | Onde você procura empresas no Google Maps, escolhe quais abordar e deixa um agente de IA começar a conversa com elas pelo WhatsApp, aos poucos, acompanhando quem responde. |
| [Provedores](provedores.md) | `/app/ai/providers` | 3 | Onde você vê qual inteligência artificial atende cada parte do sistema, troca o modelo de uma parte e liga o Jev, a IA das decisões rápidas. |
| [Radar](radar.md) | `/app/radar` | 5 | A lista dos clientes que esfriaram e ainda estão em aberto, para você agir antes de perder a venda. |
| [Recursos opcionais](recursos-opcionais.md) | `/app/settings/recursos` | 4 | Uma lista única de tudo o que se liga e desliga no sistema: o que cada recurso faz, quem decide, se está ligado e o botão que leva até a tela onde ele se ajusta. |
| [Respostas rápidas](respostas-rapidas.md) | `/app/templates` | 5 | Textos, imagens e áudios prontos que você e a equipe usam na Inbox com um clique, para não digitar a mesma coisa toda vez. |
| [Roteadores](roteadores.md) | `/app/ai/routers` | 4 | Quando um mesmo número de WhatsApp tem mais de um agente de IA, o roteador lê o que o cliente quer e entrega a conversa ao agente certo. |
| [Segurança](seguranca.md) | `/app/settings/security` | 3 | Onde você protege a sua conta com um código do celular, decide quem da equipe precisa fazer o mesmo e encerra o acesso em todos os aparelhos. |
| [Servidor MCP externo](servidor-mcp-externo.md) | `/app/settings/servidor-mcp-externo` | 4 | Onde o dono da instalação cadastra e testa o endereço e a chave de um sistema de fora (um prontuário, um sistema de gestão). |
| [Skills](skills.md) | `/app/ai/skills` | 4 | Manuais curtos de como agir em situações específicas, que o agente de IA consulta quando o assunto aparece na conversa: instalar do catálogo, editar e manter atualizados. |
| [Tags](tags.md) | `/app/settings/tags` | 6 | Onde você arruma as etiquetas da empresa: vê onde cada uma é usada, dá cor, corrige o nome, junta as repetidas e tira as que não servem mais. |
| [Tarefas](tarefas.md) | `/app/tasks` | 6 | A lista do que a equipe combinou de fazer, com prazo e responsável: anotar, concluir, filtrar e ver tudo num calendário. |
| [Tipos de agendamento](tipos-de-agendamento.md) | `/app/settings/tenant/agenda` | 6 | Onde você cadastra o que os clientes podem marcar: quanto dura, onde acontece, quem atende, o preço e o lembrete que vai pelo WhatsApp. |
| [Trunk SIP](trunk-sip.md) | `/app/settings/voip-trunk` | 2 | Onde você guarda os dados da linha de telefone contratada com um provedor, para a IA fazer ligações de voz, e pega o bloco de configuração que vai para o servidor. |
| [Uso e orçamento](uso-e-orcamento.md) | `/app/ai/usage` | 3 | Quanto a inteligência artificial custou, quantas vezes trabalhou, quanto demorou e qual é o teto de gasto do mês. |
| [Webhooks](webhooks.md) | `/app/webhooks` | 6 | Onde você liga os formulários do seu site ao funil, vê cada contato que chegou por eles e cria avisos automáticos para outros sistemas quando algo acontece no CRM. |
