# Segurança

- **Tela:** `/app/settings/security`
- **Resumo:** Onde você protege a sua conta com um código do celular, decide quem da equipe precisa fazer o mesmo e encerra o acesso em todos os aparelhos.
- **Fonte:** `curso/licoes/seguranca.json`

## Conhecendo a tela de Segurança

**Objetivo:** Achar a tela de Segurança e reconhecer cada quadro: verificação em duas etapas, regra para a equipe, códigos de recuperação, chamada de voz e sessões.

**Quem pode:** admin

**Palavras de busca:** segurança da conta, proteger minha conta, senha vazada, código no celular, sair de todos os aparelhos, onde fica a segurança, autenticação em dois fatores

1. **Onde fica a Segurança** — Abra "Configurações", no rodapé do menu lateral. Na parte "Sua conta" fica o cartão "Segurança". Clique nele.
   - Rota: `/app/settings`
2. **A verificação em duas etapas** — O primeiro quadro é a "Verificação em duas etapas". Com ela ligada, além da senha o sistema pede um código de 6 dígitos que só aparece no seu celular. Assim, se alguém descobrir a sua senha, ainda não consegue entrar. O selo do lado direito mostra a situação da sua conta: aqui está "Desativada". Logo abaixo fica o quadro "Exigir da equipe", que só o administrador vê. Ele é explicado na lição "Exigindo a verificação da equipe".
3. **Códigos de recuperação** — Os códigos de recuperação são a sua saída se você perder o celular. Na tela que pede o código, clique em "Perdi acesso ao autenticador" e digite um deles: o sistema desliga a verificação da sua conta, e você entra só com a senha e cadastra o celular novo. Cada código vale uma vez só. Enquanto a verificação em duas etapas está desligada, o botão "Regenerar códigos de recuperação" fica cinza. Com ela ligada, o botão gera códigos novos e os antigos deixam de valer na mesma hora. A frase "Habilite MFA antes de gerar códigos." quer dizer isso: ligue primeiro a verificação.
4. **Chamada de voz pelo WhatsApp** — Este quadro autoriza as chamadas de voz pelo número de WhatsApp da empresa. Leia o aviso amarelo antes: para fazer as chamadas, o sistema conecta um segundo aparelho ao número da empresa por um caminho que não é o oficial do WhatsApp, e o WhatsApp pode bloquear a conta inteira. Nesta instalação aparece a frase de que o servidor não tem a chamada de voz instalada: quem cuida da instalação precisa ligá-la primeiro.
5. **Sair de todos os aparelhos** — Em "Sessões ativas" você encerra o acesso da sua conta em todos os aparelhos de uma vez: no computador da recepção, no celular, em qualquer lugar. Use quando perder um aparelho ou suspeitar que alguém entrou na sua conta. A lista de cada aparelho ainda não existe: por enquanto, só o botão de sair de todos. Clique em "Sair de todos os dispositivos".
6. **Confirmar antes de sair** — O sistema pede confirmação. Ao clicar em "Confirmar", a sua conta sai de todos os aparelhos, inclusive deste, e você volta para a tela de entrada. Junto, os avisos no celular param e os navegadores marcados como confiáveis voltam a pedir o código. Para desistir, clique em "Cancelar".

## Ativando a verificação em duas etapas

**Objetivo:** Saber o que acontece em cada etapa ao ligar o código do celular na sua conta.

**Quem pode:** admin

**Palavras de busca:** ativar verificação em duas etapas, código do celular para entrar, google authenticator, configurar autenticador, qr code de segurança, códigos de recuperação, proteger login

1. **O botão Ativar** — Antes de começar, instale no celular um aplicativo autenticador, como Google Authenticator, Authy, 1Password ou Bitwarden. Depois, na tela de Segurança, clique em "Ativar".
   - Rota: `/app/settings/security`
2. **As etapas do cadastro** — Abre a janela "Configure a verificação em duas etapas". Ao clicar em "Iniciar configuração", aparece um QR code: no aplicativo autenticador, adicione uma conta nova e aponte a câmera para ele. Se não der para apontar a câmera, clique em "Não consegue escanear? Digite o código manual" e copie a sequência no aplicativo. O aplicativo passa a mostrar um código de 6 dígitos que muda a cada 30 segundos. Digite esse código na janela: ao digitar o sexto número ela confere sozinha (o botão "Confirmar" faz o mesmo).
3. **Depois de confirmar** — Com o código certo, a janela mostra 10 códigos de recuperação. Eles não aparecem de novo: use "Copiar todos" ou "Baixar .txt", guarde num lugar seguro, marque "Salvei meus códigos em local seguro." e clique em "Concluir". A página recarrega. A foto mostra esta tela antes da ativação. Depois de concluir, o selo "Desativada" passa para "Ativada" e o botão cinza "Regenerar códigos de recuperação" passa a funcionar. O botão "Ativar" vira "Desligar", a não ser que a empresa exija a verificação de você. A partir daí, toda entrada pede o código do aplicativo.
   - Rota: `/app/settings/security`

## Exigindo a verificação da equipe

**Objetivo:** Escolher quem da equipe precisa ligar a verificação em duas etapas e quantos dias de prazo cada um tem.

**Quem pode:** admin

**Palavras de busca:** obrigar equipe a usar código, exigir verificação dos funcionários, segurança da equipe, prazo para ativar verificação, dias de carência, proteger dados dos clientes

1. **O quadro Exigir da equipe** — Só quem é administrador da empresa vê o quadro "Exigir da equipe". Nele você decide quem precisa ligar a verificação em duas etapas. Vale ligar se a sua equipe mexe com dados de clientes: uma senha vazada vira só um susto, não um vazamento. Aqui a clínica ainda está em "Não exigir de ninguém".
   - Rota: `/app/settings/security`
2. **Quem e em quanto tempo** — Em "Nível mínimo", escolha o cargo a partir do qual a verificação passa a ser obrigatória. Aqui foi escolhido "Atendente": vale para atendentes, gerentes e administradores. Em "Dias de carência", diga quantos dias cada um tem para ativar, de 0 a 30; aqui, 7. O botão "Salvar" só acende quando algo mudou.
3. **Como a regra funciona** — As duas frases debaixo dos campos resumem a regra. A primeira diz quem é alcançado: o cargo escolhido e todos os acima dele. A segunda diz como corre o prazo: durante os dias de carência ninguém é bloqueado; depois deles, quem foi alcançado e ainda não ativou vê a tela travada até fazer o cadastro. O prazo conta a partir da mudança da regra, ou da entrada da pessoa na empresa, o que vier depois. Por isso, mudar a regra de novo reinicia a contagem de todos. Ao clicar em "Salvar", a regra é gravada e a página recarrega com a escolha nova nos campos.

