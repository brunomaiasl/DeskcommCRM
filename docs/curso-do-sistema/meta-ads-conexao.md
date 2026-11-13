# Meta Ads (conexão)

- **Tela:** `/app/settings/meta-ads`
- **Resumo:** A página onde o administrador liga, troca ou desliga a conta de anúncios do Facebook e do Instagram, para o sistema poder ler os resultados das campanhas.
- **Fonte:** `curso/licoes/meta-ads-conexao.json`

## Conhecendo a página de conexão

**Objetivo:** Achar a página de conexão do Meta Ads em Configurações e entender o que ela pede antes de a conta ser ligada.

**Quem pode:** admin

**Palavras de busca:** conectar meta ads, ligar conta de anúncios facebook, configurar anúncios instagram, onde fica meta ads configurações, token de acesso meta, ads_read

1. **Onde fica** — Abra "Configurações", no rodapé do menu. A página fica na seção "Sua empresa", no cartão "Meta Ads". Não confunda com o cartão "Conversões": ele serve para outra coisa e pede um token diferente. Só o administrador da empresa vê este cartão. Clique nele.
   - Rota: `/app/settings`
2. **Uma ligação só para ler** — A frase do alto avisa que a ligação é só de leitura: o sistema lê o desempenho das campanhas e mostra em "Análise", na tela Meta Ads, mas nada é criado, pausado ou alterado na sua conta de anúncios. O quadro azul diz o que você precisa trazer: um token de acesso, uma senha especial que o Facebook gera para o sistema ler os seus anúncios. O token é gerado no site Meta for Developers, dentro de um aplicativo da sua conta de desenvolvedor da Meta. Na hora de gerar, marque a permissão "ads_read" (é ela que deixa o sistema ler os anúncios). Se quem cuida dos seus anúncios é outra pessoa ou agência, peça o token a ela.
3. **Os dois campos** — O campo "Token de acesso" recebe o token que você gerou. O "EAA…" cinza é só um exemplo de como ele começa: o campo está vazio. O mesmo vale para o "act_123456789012345" cinza do campo de baixo. O campo "Conta padrão (opcional)" diz qual conta de anúncios a tela de Meta Ads abre primeiro. Enquanto não houver um token colado no campo, o botão "Salvar" fica apagado e aparece "Cole o token para poder salvar.". Se você colou e o aviso continua, o token veio cortado: copie-o de novo, inteiro.

## Ligando a conta de anúncios

**Objetivo:** Colar o token, escolher a conta padrão, salvar e reconhecer a página com a conta já ligada.

**Quem pode:** admin

**Palavras de busca:** como colar o token do facebook, salvar conexão meta ads, conta padrão act, ligar anúncios ao sistema, conexão salva meta

1. **Cole o token** — Cole o token no campo "Token de acesso". Ele aparece como pontinhos, para ninguém ler por cima do seu ombro. Com o token colado, o botão "Salvar" acende. Na primeira vez, o token é obrigatório. O "act_123…" cinza no campo de baixo ainda é só um exemplo: a conta padrão fica para o próximo passo.
   - Rota: `/app/settings/meta-ads`
2. **Escolha a conta que abre primeiro** — Se você tem mais de uma conta de anúncios, escreva em "Conta padrão (opcional)" a que deve abrir primeiro: "act_" seguido dos números da conta, que aparecem no Gerenciador de Anúncios. Se deixar em branco, a tela de Meta Ads abre a primeira conta ativa que o token alcançar.
3. **Conexão salva** — Clique em "Salvar". Por alguns segundos aparece o aviso "Conexão salva." no canto de baixo da tela. O campo do token fica vazio de novo, agora com "Guardado — preencha só para trocar", e logo abaixo aparece "Já existe um token guardado.": o token foi guardado, mas nunca é mostrado de volta. O sistema não testa o token na hora de salvar. Se ele estiver vencido ou sem a permissão "ads_read", o aviso aparece na tela de Meta Ads, dizendo o que fazer.
4. **A página com a conta ligada** — Com a conta ligada, o "Salvar" funciona mesmo com o campo do token em branco, e surge o botão "Desconectar", que apaga o token guardado. A frase no fim da página lembra que, para trocar só a conta padrão, basta deixar o token em branco.

## Trocando a conta ou desligando

**Objetivo:** Trocar a conta padrão sem colar o token de novo, entender o aviso de formato errado e desligar a conta de anúncios.

**Quem pode:** admin

**Palavras de busca:** trocar conta de anúncios meta, trocar token facebook ads, desconectar meta ads, desligar conta de anúncios, token vencido meta

1. **Com a conta já ligada** — Aqui a conta da clínica já está ligada, com a conta padrão "act_284019573310482". Para trocar só a conta padrão, deixe o campo do token em branco: o token guardado é mantido. Para trocar o token, por exemplo quando ele vence, cole o novo no mesmo campo e salve.
   - Rota: `/app/settings/meta-ads`
2. **Cuidado com o formato** — A conta padrão precisa ter "act_" na frente dos números. Se você escrever só os números, como aqui, e clicar em "Salvar", aparece por alguns segundos o aviso "Confira os campos: algum valor não está no formato esperado." no canto de baixo da tela, e nada é gravado. A conta que estava salva continua valendo.
3. **Trocando a conta padrão** — Com "act_" na frente, clique em "Salvar": a nova conta padrão é gravada e aparece por alguns segundos o aviso "Conexão salva.". O token guardado não muda. Da próxima vez, a tela de Meta Ads já abre nesta conta.
4. **O botão Desconectar** — "Desconectar" apaga na hora, sem pedir confirmação, o token guardado e a conta padrão escolhida. Nada muda na sua conta de anúncios, e nenhum número de campanha se perde: o sistema não guarda esses números, só os lê da Meta quando você abre a tela. Depois disso, a tela de Meta Ads volta a pedir uma conexão. Atenção: o sistema nunca devolve o token. Para ligar de novo, você vai precisar dele; se não o guardou, gere outro no Meta for Developers.
5. **Conta desligada** — Aparece por alguns segundos o aviso "Conta desconectada." e a página volta ao começo: campos vazios (o "EAA…" e o "act_123…" cinzas são só exemplos), "Salvar" apagado e "Cole o token para poder salvar.". Para ligar de novo, cole um token e salve: o mesmo que você guardou, ou um novo gerado no Meta for Developers.

