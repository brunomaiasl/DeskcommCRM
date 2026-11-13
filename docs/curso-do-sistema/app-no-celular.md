# App no celular

- **Tela:** `/app/settings/aplicativo`
- **Resumo:** Como colocar o sistema na tela de início do celular, como um aplicativo, e onde ligar os avisos de mensagem nova depois de instalar.
- **Fonte:** `curso/licoes/app-no-celular.json`

## Conhecendo a tela App no celular

**Objetivo:** Achar a tela App no celular em Configurações e entender o que ela mostra no computador e no celular.

**Quem pode:** admin

**Palavras de busca:** app no celular, instalar o aplicativo, baixar o app, usar no celular, atalho na tela de início, aplicativo para iPhone, aplicativo para Android

1. **Onde fica a tela** — Clique em "Configurações", no rodapé do menu lateral. Na parte "Sua conta" fica o cartão "App no celular". Não existe app para baixar em loja: o próprio sistema vira um ícone na tela de início do celular, e abre como um aplicativo. Cada pessoa da equipe faz isso no próprio aparelho.
   - Rota: `/app/settings`
2. **A tela se ajusta ao seu aparelho** — A tela tem uma caixa só, e o que está escrito nela depende de onde você a abriu: computador, iPhone ou Android. O sistema descobre isso sozinho, então você não precisa escolher nada. Nesta foto, aberta num navegador de computador que não oferece instalação, ela pede para você abrir o mesmo endereço no celular. Se o seu Chrome ou Edge oferecer a instalação, aparece o botão "Instalar app".
3. **No computador** — Num computador cujo navegador não oferece instalação, a caixa diz: "Abra este endereço no celular. No computador, Chrome e Edge instalam pelo ícone na barra de endereço." Ou seja: copie o endereço que está no alto do navegador e abra no celular. Se quiser o sistema como programa no computador, use o Chrome ou o Edge: a caixa mostra o botão "Instalar app" ou, se não mostrar, clique no ícone de instalar no canto da barra de endereço.
4. **No celular** — Esta foto ainda é a do computador. Aberta no celular, essa mesma caixa troca de texto e vira o passo a passo daquele aparelho. No iPhone: tocar em Compartilhar, escolher "Adicionar à Tela de Início", abrir pelo ícone novo e entrar de novo com e-mail e senha. No Android: aparece o botão "Instalar app" ou, se ele não aparecer, a tela ensina a usar o menu (⋮) do navegador e tocar em "Instalar app" ou "Adicionar à tela inicial".

## Do app aos avisos de mensagem nova

**Objetivo:** Saber onde ligar os avisos depois de instalar o app e como voltar para a tela de instalação a partir de Notificações.

**Quem pode:** admin

**Palavras de busca:** avisos no celular, notificação de mensagem nova, receber aviso com o app fechado, ligar notificações, push no celular, celular não avisa

1. **Notificações e o atalho para o app** — Depois de instalar, o passo a passo do celular manda você ligar os avisos em "Notificações", também em Configurações. No alto dessa tela, o link "Receber no celular: instalar o app" traz de volta para a tela App no celular. A caixa de aviso logo abaixo diz se o sistema consegue avisar mesmo fechado. Aqui ela diz que os avisos só aparecem com o site aberto: falta um ajuste no servidor, que quem administra o servidor faz rodando a atualização da instalação. Os comandos que aparecem nela são para quem cuida do servidor, não para você. A última linha avisa que os avisos por e-mail ainda não existem: por isso a coluna Email da tabela fica apagada.
   - Rota: `/app/settings/notifications`
2. **O interruptor que liga os avisos** — Na tabela, a linha "Nova mensagem" tem a coluna "Push". É esse interruptor que liga os avisos no aparelho em que você está: ao ligá-lo, o navegador pergunta se pode mostrar notificações, e você toca em permitir. Ele vale só para aquele aparelho, então faça isso no celular, já dentro do app. Nesta foto o navegador tinha bloqueado as notificações: por isso aparece "O navegador bloqueou as notificações. Libere-as nas configurações do site e recarregue." e o interruptor fica cinza e não responde ao clique. Ele parece ligado, mas o aparelho não mostra aviso nenhum até você liberar as notificações no navegador. Logo abaixo, a linha avisa que desligar esse Push desliga todos os avisos daquele aparelho fora do app.
3. **Voltando para a instalação** — Clique em "Receber no celular: instalar o app" para abrir a tela App no celular. É o caminho mais curto quando alguém da equipe diz que o celular não está avisando. Confira três coisas: se a caixa de aviso de Notificações diz que os avisos só aparecem com o site aberto (aí quem resolve é quem administra o servidor), se o app foi instalado naquele celular, e se o Push de "Nova mensagem" está ligado nele.

