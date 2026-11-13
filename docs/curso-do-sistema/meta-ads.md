# Meta Ads

- **Tela:** `/app/ads/meta`
- **Resumo:** Onde você acompanha quanto gastou e quanto custou cada resultado dos anúncios do Facebook e do Instagram, depois de ligar a sua conta de anúncios.
- **Fonte:** `curso/licoes/meta-ads.json`

## Conhecendo a tela de Meta Ads

**Objetivo:** Achar a tela de Meta Ads, entender de onde vêm os números e reconhecer o que ela mostra antes de a conta de anúncios ser ligada.

**Quem pode:** admin

**Palavras de busca:** meta ads, anúncios do facebook, anúncios do instagram, campanhas pagas, quanto gastei em anúncio, custo por resultado, tráfego pago

1. **Onde fica a tela** — Meta Ads fica no menu da esquerda, no grupo "Análise", logo abaixo de "Desempenho". É a tela dos anúncios pagos do Facebook e do Instagram: quanto você gastou em cada campanha e quanto custou cada resultado. Só administradores e gerentes veem este item no menu.
   - Rota: `/app/ads/meta`
2. **Os números vêm na hora** — A frase no alto avisa como a tela funciona: ela não guarda os números. Eles são buscados no Facebook na hora: quando a tela abre, quando você troca a conta ou o período, e quando você clica em "Atualizar". Esse botão só aparece depois que a conta de anúncios estiver ligada. Até lá, nada aparece aqui.
3. **Ainda sem conta ligada** — Numa instalação nova, a tela mostra "Nenhuma conta de anúncios conectada.". O botão "Conectar conta de anúncios" leva à página onde você cola o acesso da sua conta. Só quem é administrador vê esse botão. Para seguir, clique nele.

## Ligando a sua conta de anúncios

**Objetivo:** Saber onde e como colar o token de acesso da conta de anúncios, e o que cada campo da página de conexão pede.

**Quem pode:** admin

**Palavras de busca:** conectar facebook ads, ligar conta de anúncios, token de acesso meta, onde colo o token, ads_read, conta padrão de anúncios, integrar anúncios

1. **Pelo caminho das Configurações** — Além do botão da tela de Meta Ads, a página de conexão também abre por "Configurações", no rodapé do menu. Ela fica na seção "Sua empresa", no cartão "Meta Ads". Não confunda com o cartão "Conversões": ele serve para outra coisa e pede um token diferente. Clique no cartão "Meta Ads", na coluna da direita (não no item "Meta Ads" do menu).
   - Rota: `/app/settings`
2. **Uma ligação só para ler** — A frase do alto garante que a ligação é só de leitura: nada é criado, pausado ou alterado na sua conta de anúncios. O quadro azul diz o que você precisa trazer: um token de acesso, que é uma senha especial que o Facebook gera para o sistema poder ler os seus anúncios. Ele é gerado no site Meta for Developers e precisa da permissão "ads_read".
3. **O campo do token** — Cole o token no campo "Token de acesso". O "EAA..." cinza dentro do campo é só um exemplo de como o token começa: o campo ainda está vazio. Enquanto ele estiver vazio, ou curto demais para ser um token inteiro, o botão "Salvar" fica apagado e, ao lado, aparece "Cole o token para poder salvar.". Na primeira vez, o token é obrigatório.
4. **A conta que abre primeiro** — O campo "Conta padrão (opcional)" escolhe qual conta de anúncios a tela de Meta Ads abre primeiro. Escreva "act_" seguido dos números da conta, como no exemplo cinza dentro do campo. Se deixar em branco, a tela abre a primeira conta ativa que o token alcançar.
5. **Pronto para salvar** — Com o token colado, ele aparece como pontinhos, para ninguém ler por cima do seu ombro, e "Salvar" acende. Ao salvar, aparece "Conexão salva." e o campo do token fica vazio de novo, porque o token nunca é mostrado de volta. O sistema não testa o token na hora de salvar: se ele estiver vencido ou sem a permissão "ads_read", o aviso aparece na tela de Meta Ads, dizendo o que fazer.

## Quem vê e quem liga a conta

**Objetivo:** Entender o que o gerente vê na tela de Meta Ads e por que só o administrador liga a conta de anúncios.

**Quem pode:** manager

**Palavras de busca:** gerente não consegue conectar, sem permissão meta ads, 403 sem permissão, quem pode ver anúncios, atendente não vê meta ads, pedir para administrador

1. **O gerente também vê a tela** — Aqui você está como Carlos Mendes, gerente da clínica. Para ele, "Meta Ads" também aparece no menu, no grupo "Análise". Os números dos anúncios, como orçamento e custo de cada resultado, são da empresa inteira e não de um atendente só. Por isso só gerentes e administradores veem esta tela.
   - Rota: `/app/ads/meta`
2. **Sem botão para ligar** — Enquanto a conta não está ligada, o gerente não vê o botão "Conectar conta de anúncios". No lugar dele aparece o pedido: "Peça a quem administra a organização para conectar a conta de anúncios em Configurações.".
3. **A página de conexão é do administrador** — O gerente nem vê o cartão "Meta Ads" em Configurações. Se ele abrir a página de conexão pelo endereço, aparece "403 — Sem permissão". Ligar ou trocar o token é só para o administrador: o token dá acesso à conta de anúncios inteira da empresa, e escolher qual conta ligar é decisão de quem administra. O botão "Voltar pra Inbox" leva de volta ao trabalho.
   - Rota: `/app/settings/meta-ads`

