# Cobrança (Admin)

- **Tela:** `/admin/cobranca`
- **Resumo:** Onde quem revende o sistema cobra as empresas clientes: conecta a conta de pagamento, cria os planos, define quantos dias de atraso tolerar e acompanha quem está em dia.
- **Fonte:** `curso/licoes/admin-cobranca.json`

## Conhecendo a tela de Cobrança

**Objetivo:** Achar a Cobrança no Admin e ler a Visão geral: o que falta para a primeira cobrança, se a cobrança está funcionando e o que precisa de atenção.

**Quem pode:** admin

**Palavras de busca:** cobrança dos clientes, cobrar as empresas, mensalidade dos clientes, planos e faturas, revenda do sistema, assinatura das empresas, admin cobrança

1. **Onde fica a tela** — No Admin, o item "Cobrança" do menu abre a cobrança das empresas que usam o seu sistema. Aqui você cria os planos que vende, conecta a conta que recebe os pagamentos e acompanha quem está em dia.
   - Rota: `/admin/cobranca`
2. **A tela e as abas** — O título é "Cobrança dos seus clientes". Empresa sem plano é isenta: não paga e não tem limites. A tela tem cinco abas: "Visão geral", "Conexão", "Régua", "Planos" e "Clientes". Ela abre na "Visão geral", que você vê nesta lição.
   - Rota: `/admin/cobranca`
3. **O aviso de modo de teste** — Enquanto a conta de pagamento estiver conectada com a chave de teste, esta faixa de aviso, em tom de areia, aparece no alto de todas as abas. Ela avisa que as empresas reais ainda não conseguem pagar. Em modo de teste, nenhum pagamento é de verdade: serve para você conferir que tudo funciona antes de cobrar.
4. **O que falta para a primeira cobrança** — O cartão 'Primeira cobrança: o que falta' é a sua lista de tarefas. Passo feito aparece riscado, com um tique. Passo que falta vem com a explicação de como fazer. O próximo passo pendente ganha o link 'Fazer agora' quando há um lugar certo para resolvê-lo. Aqui falta configurar o envio de e-mail e, por último, trocar para a chave de produção. A faixa amarela "Sem SMTP configurado", no alto, é um aviso geral do Admin: o envio de e-mails ainda não está configurado. O item "E-mail" do menu leva ao ajuste.
5. **A cobrança está funcionando?** — O cartão 'Situação da cobrança' diz se a cobrança está viva. O selo mostra se você está em 'MODO DE TESTE' ou em 'PRODUÇÃO'. 'Último aviso do provedor' é a última vez que a empresa de pagamento mandou um aviso, como um pagamento ou uma assinatura nova. 'Última leitura bem-sucedida' é a última vez que o sistema conferiu as assinaturas sozinho, o que ele faz a cada 6 horas. Se essa leitura passar de 7 horas, a linha fica vermelha: a conferência automática parou, e quem cuida do seu servidor precisa olhar.
6. **Problemas para resolver** — Quando algo precisa de você, aparece o cartão "Problemas para resolver", com o que fazer em cada caso. Aqui uma empresa tem duas assinaturas ativas e pagaria em dobro: cancele uma delas no painel da empresa de pagamento. Sem problema nenhum, o cartão não aparece.

## Conectando a conta de pagamento

**Objetivo:** Escolher entre Asaas e Stripe e entender o que acontece ao colar a chave e clicar em "Testar e conectar".

**Quem pode:** admin

**Palavras de busca:** conectar stripe, conectar asaas, chave de api pagamento, receber por pix, trocar chave de teste para produção, provedor de pagamento

1. **A aba Conexão** — Na aba "Conexão" você liga o sistema à empresa que recebe os pagamentos por você. O selo ao lado de "Provedor de pagamento" mostra o modo atual. "Chave conectada" mostra só os 4 últimos caracteres da chave guardada: o resto fica escondido, por segurança.
   - Rota: `/admin/cobranca?aba=conexao`
2. **Asaas ou Stripe?** — No campo 'Provedor' você escolhe com quem vai receber. Com o Asaas, todo mês a empresa recebe a cobrança e paga por Pix, boleto ou cartão, informando o CPF ou CNPJ. É o recomendado se seus clientes estão no Brasil. Com a Stripe, o cartão é cobrado sozinho todo mês e não há Pix. O boleto só aparece se você ligá-lo no painel da Stripe. Ao escolher Asaas, o campo da chave passa a pedir a 'Chave de API do Asaas'.
3. **Colar a chave e conectar** — Com a Stripe escolhida de novo em 'Provedor', cole a chave que você copiou no painel dela (Desenvolvedores › Chaves de API) e clique em 'Testar e conectar'. O sistema confere a chave com o provedor antes de guardar qualquer coisa. Se ela for aceita, ele cadastra o aviso de pagamento e guarda a chave protegida. Comece pela chave de teste. Trocar para a chave de produção é o que faz a cobrança valer de verdade: se alguma empresa assinou em teste, o sistema pede confirmação no botão 'Publicar mesmo assim', porque ela volta para o teste grátis.

## Criando e cuidando dos planos

**Objetivo:** Ler a lista de planos, montar um plano novo e usar os botões de cada plano.

**Quem pode:** admin

**Palavras de busca:** criar plano, preço do plano, teste grátis, plano do cadastro, plano negociado com desconto, arquivar plano, limite de usuários do plano

1. **A lista de planos** — A aba "Planos" lista o que você vende. Cada plano mostra o preço, os dias de teste grátis e os limites: pessoas, números conectados e gasto com IA por mês. O selo "Plano do cadastro" marca o plano que quem se cadastra sozinho ganha, com teste grátis. O selo "Só você atribui" marca um plano negociado: as empresas não o veem, só você o coloca nelas.
   - Rota: `/admin/cobranca?aba=planos`
2. **Montando um plano novo** — No formulário 'Novo plano', dê um nome, o preço e o 'Intervalo de cobrança' ('Mensal' ou 'Anual'). Em 'Dias de teste grátis', 0 quer dizer entrada paga: a empresa fica suspensa até o primeiro pagamento. Os limites são opcionais e campo vazio é sem limite. O teto de IA é em dólar. Ao clicar em 'Salvar plano', ele entra na lista e aparece 'Plano salvo.'.
3. **Os botões de cada plano** — Cada plano tem os seus botões. 'Usar no cadastro' faz dele o plano de quem se cadastra. Só um plano tem esse papel: antes, clique em 'Tirar do cadastro' no plano atual. 'Esconder das empresas' o transforma em plano negociado. 'Arquivar' tira o plano do cadastro e da troca, mas quem já assina continua nele. Depois que alguém assina, o preço e o intervalo não mudam mais: o sistema recusa ao salvar. Para mudar, arquive e crie outro.
   - Rota: `/admin/cobranca?aba=planos`
4. **Editando um plano** — "Editar" leva o plano para o formulário, que vira "Editar plano". Nome, limites e dias de teste podem mudar sempre, e o limite novo já vale para quem assina. Clique em "Salvar alterações" para gravar, ou em "Cancelar edição" para desistir.

## A régua de atraso

**Objetivo:** Definir quantos dias de atraso tolerar antes de suspender uma empresa, e ler o calendário de avisos.

**Quem pode:** admin

**Palavras de busca:** dias de tolerância, suspender empresa que não pagou, cliente atrasado, aviso de pagamento atrasado, régua de cobrança, prazo para pagar

1. **O calendário do atraso** — A aba 'Régua' diz o que acontece com uma empresa que não pagou. 'Dias de tolerância' é quanto tempo ela tem antes de ser suspensa. A lista abaixo mostra o calendário: no dia 0 sai o primeiro aviso com o link para pagar, depois vem o aviso final e, por fim, a suspensão. Os avisos aparecem dentro do sistema da empresa e, se o envio de e-mail estiver configurado, chegam também por e-mail. Quando o pagamento é confirmado, a empresa volta a funcionar sozinha.
   - Rota: `/admin/cobranca?aba=regua`
2. **Mudando a tolerância** — Troque o número e o calendário se ajusta na hora, antes mesmo de salvar. Com 10 dias, o aviso final sai no dia 8 e a suspensão vem no dia 10. Vale de 5 a 30 dias. Clique em "Salvar régua" para gravar. A tolerância vale para pagamento atrasado: o teste grátis que acaba sem pagamento suspende a empresa 48 horas depois do aviso final.

## Acompanhando quem paga

**Objetivo:** Ler a situação de cada empresa na aba Clientes, mandar o link de pagamento a quem atrasou e abrir o painel da empresa.

**Quem pode:** admin

**Palavras de busca:** empresa em atraso, quem não pagou, link de pagamento, próximo vencimento, situação da assinatura, dar prazo para pagar, tornar empresa isenta

1. **A lista de clientes** — A aba 'Clientes' lista as empresas que têm plano. Para cada uma você vê o plano, a 'Situação' ('Teste grátis', 'Em dia', 'Em atraso' ou 'Cancelada') e o 'Próximo vencimento' (no teste grátis, o dia em que o teste acaba). A 'Última leitura' é a última vez que o sistema conferiu o pagamento, e a coluna 'Problema' mostra o que deu errado nessa conferência. Empresa sem plano não aparece aqui: ela é isenta.
   - Rota: `/admin/cobranca?aba=clientes`
2. **Uma empresa em atraso** — A FisioVida está "Em atraso": a coluna "Em atraso desde" mostra, em vermelho, desde quando ela deve. O botão "Copiar link de pagamento" copia o link da cobrança em aberto para você mandar pelo WhatsApp. Assim você recupera o pagamento sem esperar a régua.
3. **Troca de plano agendada** — Quando a coluna "Plano" mostra uma seta, como "Essencial → Profissional", a empresa vai trocar de plano. O novo plano vale a partir da próxima cobrança paga.
4. **Abrir o painel da empresa** — 'Abrir' leva ao painel da empresa, em Tenants. No cartão 'Cobrança' você troca o plano dela, dá um prazo de até 60 dias ('Dar prazo') ou a deixa sem cobrança ('Tornar isenta'). Para isentar quem ainda tem assinatura no provedor, cancele a assinatura lá antes. Para empresa que não está em dia, 'Gerar link de pagamento' cria um link novo para você mandar a ela. Se ela foi suspensa por falta de pagamento, dar prazo a reativa na hora.

