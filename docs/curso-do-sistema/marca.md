# Marca

- **Tela:** `/app/settings/marca`
- **Resumo:** Onde você coloca o nome, a cor e o logo da sua empresa dentro do sistema, e escolhe o nome que aparece nos e-mails que as automações mandam aos seus clientes.
- **Fonte:** `curso/licoes/marca.json`

## Conhecendo a tela Marca

**Objetivo:** Achar a tela Marca e reconhecer os quadros que ela reúne.

**Quem pode:** admin

**Palavras de busca:** mudar a cor do sistema, colocar o nome da minha empresa, personalizar o sistema com minha marca, onde troco o logo, marca da clínica, identidade visual

1. **Onde fica a tela** — Abra "Configurações", no rodapé do menu lateral. Na parte "Sua empresa" está o cartão "Marca". Clique nele.
   - Rota: `/app/settings`
2. **Como sua empresa aparece** — O primeiro quadro guarda o nome, a cor e o logo da sua empresa. Com eles, o menu lateral e os botões passam a ter a sua cara para quem trabalha na sua empresa, e os e-mails do sistema, como o convite da equipe, saem com o nome da sua empresa.
3. **Os e-mails e a origem de cada coisa** — Rolando a tela, "Como seus e-mails saem" muda o nome que o cliente vê nos e-mails das automações. "De onde vem cada coisa" diz, para o nome, a cor e o logo, se foi você que definiu aqui, se veio de quem instalou o sistema ou se é o padrão.
4. **O que a marca ainda não muda** — O último quadro avisa onde a sua marca ainda não aparece: o título da aba do navegador e a tela de entrada continuam com o nome do sistema. Os e-mails de convite da equipe e de pedidos de dados já saem com o nome da sua empresa, quando o envio de e-mails está ligado no sistema. O relatório de LGPD entregue ao cliente leva a razão social, que fica em Configurações › Organização. O nome, a cor e o nome nos e-mails só são gravados quando você clica em "Salvar", no fim da página. O logo é diferente: ele é gravado assim que você escolhe o arquivo.

## Colocar o nome e a cor da empresa

**Objetivo:** Escrever o nome da empresa, escolher a cor da marca, conferir a prévia e salvar.

**Quem pode:** admin

**Palavras de busca:** mudar a cor dos botões, trocar o nome no menu, cor da minha marca no sistema, personalizar cores, nome da clínica no topo do menu, código da cor da marca

1. **O nome da empresa** — Em "Nome da sua empresa", escreva o nome como você quer que a equipe veja. Quando a empresa não tem logo, é ele que aparece no alto do menu lateral. Com logo, o logo ocupa esse lugar. Deixando em branco, fica o nome que já aparece em cinza dentro do campo.
   - Rota: `/app/settings/marca`
2. **A cor da marca** — Em "Cor da sua marca", cole o código da cor, como #0e7c66. Se preferir escolher no olho, clique no quadradinho colorido ao lado: ele abre o seletor de cores do computador e preenche o código para você.
3. **A escala de tons** — Logo abaixo aparece a escala que o sistema monta a partir da sua cor. Os tons com contorno são os que vão de fato para a tela, e a legenda diz qual é qual: "Sua cor", "Botões no modo claro" e "Botões no modo escuro". Aqui, no modo claro, o botão usa exatamente a sua cor. No modo escuro, usa um tom mais claro da mesma escala, para não se perder no fundo escuro. Com algumas cores, o modo claro também troca por um tom vizinho, para o texto em cima do botão continuar legível.
4. **Conferir antes de salvar** — Em "De onde vem cada coisa", o nome e a cor agora dizem "você definiu aqui". Logo abaixo podem aparecer avisos sobre a cor. Com este verde, o aviso lembra que ele ficou parecido com o verde que o sistema usa para indicar sucesso: vale conferir se os avisos continuam fáceis de distinguir.
5. **Salvar e ver no menu** — Clique em "Salvar", no fim da página. Um aviso rápido "Marca salva." confirma e, sem recarregar nada, os botões passam a usar a sua cor, ou o tom dela que o sistema escolheu na escala. Se a empresa ainda não tem logo, o alto do menu lateral passa a mostrar o nome da empresa.

## Quando o sistema ajusta a sua cor

**Objetivo:** Entender os avisos sobre a cor, usar uma cor diferente no tema escuro e corrigir um código de cor errado.

**Quem pode:** admin

**Palavras de busca:** cor do botão ficou diferente, minha cor não apareceu, cor amarela ficou escura, cor para o modo escuro, cor cinza não funciona, código de cor inválido

1. **Uma cor clara demais** — Com uma cor bem clara, como este amarelo, o texto em cima dos botões ficaria difícil de ler. Por isso, no modo claro, o sistema usa um tom mais escuro da mesma escala. No modo escuro, a sua cor vai como está. As frases em "De onde vem cada coisa" contam isso. A última, em laranja, lembra que este amarelo ficou parecido com a cor que o sistema usa para indicar erro: vale conferir se os avisos de erro continuam fáceis de distinguir.
   - Rota: `/app/settings/marca`
2. **Uma cor neutra** — Cinza, preto ou branco não destacam nada na tela. Com uma cor assim, o aviso diz que os botões seguem com a cor padrão do sistema.
3. **Uma cor só para o tema escuro** — Se a sua marca tem uma versão para fundo escuro, coloque-a em "Cor da sua marca no tema escuro (opcional)". Deixando em branco, os dois modos usam a cor de cima. A legenda embaixo da escala, em "Botões no modo escuro", passa a seguir essa cor. O código pode sair um pouco diferente do que você digitou, porque o sistema escolhe na escala o tom que deixa o texto do botão legível.
4. **Código de cor errado** — O campo aceita só o código da cor, como #0e7c66. Se você escrever outra coisa, como o nome da cor, aparece em vermelho "Use um código de cor como #7a5cd6." e o botão "Salvar", no fim da página, fica apagado até você corrigir.

## Logo e nome nos e-mails

**Objetivo:** Saber como subir o logo da empresa e escolher o nome e o endereço de resposta dos e-mails das automações.

**Quem pode:** admin

**Palavras de busca:** colocar o logo da empresa, trocar logo do sistema, logo para fundo escuro, nome que aparece no email, resposta do cliente no meu email, remetente dos emails automáticos

1. **O logo** — Em "Logo", clique no botão de escolher arquivo (no seu computador ele pode aparecer como "Escolher arquivo" ou "Choose File") e selecione a imagem. Ela sobe na hora, sem precisar do "Salvar", e aparece o aviso "Logo atualizado.". Use PNG ou JPG de até 512 KB, de preferência com fundo transparente. Depois disso surge o botão "Remover", para tirar o logo.
   - Rota: `/app/settings/marca`
2. **A prévia nos dois fundos** — Embaixo, a prévia mostra como o logo fica no fundo claro e no fundo escuro do sistema. Sem logo próprio, ela mostra o que aparece hoje no lugar dele.
3. **O nome nos e-mails** — Em "Como seus e-mails saem", "Nome de exibição" é o remetente que o cliente lê nos e-mails das automações. "Responder para" é o e-mail que recebe a resposta quando o cliente responde. O endereço de envio continua sendo o do sistema. Isso vale para as automações que mandam e-mail, e só quando quem instalou o sistema já ligou o envio de e-mails.
4. **E-mail escrito errado** — Um endereço sem @ ou sem o final, como .com.br, mostra em vermelho "Use um endereço de e-mail como contato@suaempresa.com" e deixa o "Salvar" apagado. Corrija e clique em "Salvar". O nome e o endereço passam a valer nos próximos e-mails das suas automações, se o envio de e-mails do sistema estiver ligado.

