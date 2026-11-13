# Marca (Admin)

- **Tela:** `/admin/marca`
- **Resumo:** Onde quem instalou o sistema troca o nome, a cor, o logo e o ícone que aparecem para todas as empresas do servidor, inclusive na tela de entrada.
- **Fonte:** `curso/licoes/admin-marca.json`

## Conhecendo a marca da instalação

**Objetivo:** Achar a tela "Marca" do Admin, entender que ela vale para todas as empresas e ler de onde vem o nome, o logo e a cor de hoje.

**Quem pode:** admin

**Palavras de busca:** mudar o nome do sistema, marca própria do revendedor, trocar a cor do sistema inteiro, personalizar a tela de login, white label, logo da instalação

1. **Onde fica a tela** — No Admin, o item "Marca" do menu abre a marca da instalação inteira: o nome, a cor, o logo e o ícone que o sistema mostra para todo mundo deste servidor. Ela vale para todas as empresas, e também para telas que vêm antes de qualquer empresa, como a de entrada.
   - Rota: `/admin/marca`
2. **O nome do sistema** — O primeiro quadro é o nome do sistema. Se o campo estiver vazio, o texto clarinho dentro dele é o nome que está valendo hoje. Se a instalação já gravou um nome, ele aparece escrito no campo. Esse nome aparece no título da aba do navegador, na tela de entrada, nos menus e, quando o envio de e-mails estiver configurado, nos e-mails das empresas que não escolheram um nome próprio. Deixar o campo em branco volta para o nome dado na instalação do servidor ou, se não houver, para o nome padrão.
3. **A cor, o logo e o ícone** — Logo abaixo ficam a cor da marca e, no quadro seguinte, o logo; o ícone fica no fim desse mesmo quadro. O código clarinho "#7a5cd6" é um exemplo: enquanto o quadradinho estiver cinza, nenhuma cor foi escolhida e vale a cor padrão do sistema. A cor só vale depois de "Salvar". O logo e o ícone são gravados assim que você escolhe o arquivo.
4. **De onde vem cada coisa** — Em "Como está agora", o quadro "De onde vem cada coisa" diz, para o nome, o logo e a cor, quem decidiu o que está valendo: esta tela ("definido nesta tela"), o arquivo de instalação do servidor ("veio do arquivo de instalação do servidor") ou o padrão do sistema ("padrão do sistema"). Numa instalação nova, o nome costuma aparecer como vindo do arquivo de instalação, e o logo e a cor como padrão do sistema.

## Trocar o nome e a cor

**Objetivo:** Escrever o nome e a cor da sua marca, entender a prévia que o sistema monta e saber o que acontece ao salvar.

**Quem pode:** admin

**Palavras de busca:** trocar a cor dos botões, colocar a cor da minha marca, mudar o nome que aparece no sistema, código da cor hexadecimal, cor no modo escuro, contraste do botão

1. **Escreva o nome** — Clique em "Nome do sistema", apague o que estiver escrito e escreva o nome da sua marca. Aqui usamos "Bem Viver Saúde". Até 120 letras.
   - Rota: `/admin/marca`
2. **Escreva o código da cor** — Em "Cor da marca", escreva o código da sua cor, que começa com # (aqui, "#1f8a70", um verde). Também dá para clicar no quadradinho ao lado do campo e escolher a cor com o mouse. Assim que a cor está certa, o sistema monta uma escala de tons a partir dela e marca quais tons vão para os botões no modo claro e no modo escuro.
3. **Dá para ler o botão?** — Mais abaixo, "O texto em cima dos botões" mede se o que está escrito nos botões fica fácil de ler com a sua cor, no modo claro e no modo escuro. "passa em AA" quer dizer que está dentro do mínimo recomendado. Em "O que o sistema ajustou", ele conta se precisou escurecer ou clarear o tom. A linha em amarelo avisa que, para quem tem dificuldade de distinguir cores, a sua ficou parecida com a cor de erro do sistema.
4. **Uma cor para o modo escuro** — O campo "Cor da marca no tema escuro (opcional)" serve para quando a sua marca tem uma versão própria para fundo escuro. Aqui usamos "#5fd3b0", um verde mais claro. Com ela, a prévia mostra uma segunda escala, só do modo escuro. Deixando em branco, os dois modos usam a cor de cima.
5. **Salvar** — Nada disso vale até você clicar em "Salvar", no fim do formulário. Depois do clique, aparece por alguns segundos "Marca salva.", e o nome e a cor passam a valer na tela de entrada e nas empresas que não escolheram uma marca própria. "De onde vem cada coisa" passa a dizer "definido nesta tela". A linha amarela é um alerta e não impede salvar. Se a cor estiver escrita errado, o botão fica apagado.

## Quando a cor não serve

**Objetivo:** Reconhecer os avisos que a tela dá antes de salvar: código de cor errado, cor clara demais e cor neutra.

**Quem pode:** admin

**Palavras de busca:** cor não aparece nos botões, use um código de cor, cor amarela ficou escura, cor cinza não funciona, botão salvar apagado, aviso da cor da marca

1. **Código escrito errado** — O campo da cor só aceita o código com #, como "#1f8a70". Se você escrever o nome da cor ("verde", por exemplo), aparece em vermelho "Use um código de cor como #7a5cd6." e o botão "Salvar" fica apagado até você corrigir.
   - Rota: `/admin/marca`
2. **Cor clara demais** — Com uma cor clara, como o amarelo "#f5c518", o texto dos botões ficaria difícil de ler no modo claro. Então, no modo claro, o sistema escolhe sozinho um tom mais escuro da mesma escala para os botões e conta isso em "O que o sistema ajustou". A sua cor original continua no logo e nos destaques.
3. **Cor neutra** — Cinza, preto ou branco não destacam nada na tela. Com uma cor assim (aqui, "#808080"), o aviso diz que os botões seguem com a cor padrão do sistema e que a sua fica guardada só para o logo.

## Logo e ícone da aba

**Objetivo:** Saber como subir o logo (claro e escuro) e o ícone, e conferir a prévia nas duas aparências.

**Quem pode:** admin

**Palavras de busca:** colocar meu logo no sistema, trocar o ícone da aba, logo para fundo escuro, tamanho do logo, favicon, logo some no modo escuro

1. **O arquivo do logo** — Em "Logo", clique no botão de escolher arquivo e selecione a imagem do seu logo: PNG ou JPG, de até 512 KB, de preferência com fundo transparente. SVG não é aceito. O logo é gravado na hora, sem passar pelo "Salvar": aparece "Logo atualizado." e, ao lado, o botão "Remover". Se o arquivo for grande, o sistema tenta cortar as bordas vazias e diminuir a imagem antes de enviar.
   - Rota: `/admin/marca`
2. **A prévia nas duas aparências** — As duas caixas mostram como o logo fica no fundo claro e no fundo escuro do sistema. Sem logo próprio, aparece o nome em texto, como na foto. Depois que você sobe um logo, se não houver a versão escura, a prévia escura o mostra sobre uma plaquinha branca, para um logo escuro com fundo transparente não sumir. Para evitar a plaquinha, use "Logo para o tema escuro (opcional)".
3. **O ícone da aba** — "Ícone do aplicativo e do navegador" é a figurinha que aparece na aba do navegador e no aplicativo instalado. Use uma imagem quadrada, de 512×512 ou maior, PNG ou JPG, de até 512 KB. Aqui o sistema não diminui a imagem por você. Assim como o logo, ela vale assim que você escolhe o arquivo. Depois de subir, aparece o botão "Remover ícone", que volta para o ícone que o sistema desenha a partir da sua marca.

## Ajustes finos com CSS

**Objetivo:** Conhecer o quadro "CSS personalizado", para quem tem um designer que quer ajustar detalhes visuais.

**Quem pode:** admin

**Palavras de busca:** css personalizado, mudar fonte do sistema, arredondar os botões, ajuste visual avançado, designer personalizar o visual, regras css

1. **O quadro de CSS** — No fim da tela fica "CSS personalizado". É para ajustes finos que um designer escreve em código: cor de um texto, borda arredondada, tipo de letra (só os que já existem no computador de quem usa: não dá para carregar uma fonte nova). Eles valem em todas as telas, inclusive na de entrada, para todas as empresas do servidor. Se você não tem quem escreva isso, pode deixar em branco.
   - Rota: `/admin/marca`
2. **Ver um exemplo** — Clique em "Ver exemplo" para ver duas regras prontas: uma troca a cor de parte dos textos clarinhos e outra arredonda mais os cantos. Por segurança, o sistema só aceita regras de aparência (cores, bordas, sombras e letras): nada que mude o lugar das coisas na tela, nada de endereços de internet. Até 16 KB.
3. **Salvar o CSS** — O CSS tem botão próprio, "Salvar CSS". Ele confere as regras antes de gravar: se alguma não for permitida, aparece um aviso dizendo o tipo de problema (por exemplo, uma propriedade que não é aceita) e nada é gravado. Se der certo, aparece "CSS personalizado salvo.". Para tirar todos os ajustes, apague o texto e salve vazio.

