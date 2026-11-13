# Recursos opcionais

- **Tela:** `/app/settings/recursos`
- **Resumo:** Uma lista única de tudo o que se liga e desliga no sistema: o que cada recurso faz, quem decide, se está ligado e o botão que leva até a tela onde ele se ajusta.
- **Fonte:** `curso/licoes/recursos-opcionais.json`

## Conhecendo os Recursos opcionais

**Objetivo:** Achar a tela, entender que ela só mostra e ler as partes de cada linha da lista.

**Quem pode:** admin

**Palavras de busca:** recursos opcionais, onde ligar e desligar, o que está ligado, funções extras do sistema, ativar recurso, lista de configurações

1. **Onde fica a tela** — Abra "Configurações", no rodapé do menu lateral. Na parte "Sua empresa" está o cartão "Recursos opcionais". Clique nele.
   - Rota: `/app/settings`
2. **Uma tela que só mostra** — Aqui estão juntos os recursos que a sua empresa pode ligar e desligar, que antes ficavam espalhados por várias telas. Os que só quem administra o servidor configura, como o e-mail, não entram nesta lista. Esta tela não liga nada: ela mostra o estado de cada recurso e leva você até a tela dele pelo botão "Ajustar". É lá que a mudança é feita.
3. **As partes de uma linha** — Cada recurso é uma linha. Em cima vem o nome e, logo abaixo, o que ele faz. A linha pequena diz quem pode mudar (aqui, "Gerente ou administrador") e como o recurso vem de fábrica ("Padrão: desligado"). À direita, o selo mostra como ele está agora na sua empresa, e o botão "Ajustar" abre a tela onde ele se liga.
4. **Onde o recurso se liga de verdade** — O "Ajustar" de "A conversa fica com quem atendeu" abre a tela "Distribuição de atendimento". Desça até a opção: para ligar, marque a caixa e clique em "Salvar", logo abaixo dela. O botão "Salvar" fica apagado até você marcar a caixa. Depois, a tela de Recursos opcionais passa a mostrar o selo "Ligado" nessa linha.

## Ler o estado de cada recurso

**Objetivo:** Entender o que quer dizer cada selo: Ligado, Desligado, Varia em cada item e Veja na tela dele.

**Quem pode:** admin

**Palavras de busca:** o que significa ligado desligado, varia em cada item, veja na tela dele, recurso está ligado, como saber se está ativado

1. **Ligado e Desligado** — Na parte "Da sua empresa", o selo mostra o estado de cada recurso na sua empresa. "Atendentes podem mexer na agenda dos colegas" vem ligado de fábrica e continua "Ligado". "Quem tem horário marcado vira cliente" vem desligado e continua "Desligado". Para mudar qualquer um dos dois, use o "Ajustar" da linha.
   - Rota: `/app/settings/recursos`
2. **Varia em cada item e Veja na tela dele** — Alguns recursos não têm um estado só para a empresa toda. "Avisar a equipe quando o negócio entra na etapa" se liga em cada etapa do funil, por isso o selo diz "Varia em cada item". Já "Reportar vendas à Meta" mostra "Veja na tela dele": esta lista não consegue ler o estado dele, e só a tela do recurso sabe se está ligado.
3. **Os recursos de cada agente** — A última parte, "Em cada agente", reúne o que se ajusta agente por agente de IA. Como cada agente pode estar de um jeito, o selo diz "Varia em cada item". "Roteiro que não recomeça" mostra "Desligado por quem administra o servidor": ele depende do módulo "Fluxos de atendimento", que o servidor não ligou, e por isso não tem botão "Ajustar".

## Módulos da instalação

**Objetivo:** Saber quais módulos o servidor liberou para a sua empresa e como chegar a um módulo disponível.

**Quem pode:** admin

**Palavras de busca:** módulo desligado, liberar módulo no servidor, desligado por quem administra o servidor, propostas não aparece, módulos disponíveis

1. **Módulos que o servidor decide** — A primeira parte lista os módulos maiores do sistema, como "Banco de dados externo" e "Fluxos de atendimento". Quem decide se eles existem na sua instalação é quem administra o servidor, não a empresa. Desligado, o selo diz "Desligado por quem administra o servidor" e não há botão: para usar, peça a essa pessoa.
   - Rota: `/app/settings/recursos`
2. **Um módulo disponível** — Nesta instalação, quem administra o servidor liberou "Propostas comerciais". O selo diz "Disponível nesta instalação" e aparece o botão "Ajustar", que leva à tela onde a empresa usa o módulo.
3. **A chave da empresa** — O botão abre "Configurações › Propostas". O servidor ter liberado não basta: a empresa ainda precisa ligar as propostas para si, nesta primeira chave (a de cima, ainda desligada), e clicar em "Salvar". A chave verde mais abaixo é outra coisa: só avisa a equipe no WhatsApp quando a IA rascunha uma proposta. O módulo "Propostas" deste curso ensina o resto.
4. **As duas chaves na lista** — De volta aos Recursos opcionais, a linha "Proposta comercial da empresa", na parte "Da sua empresa", mostra a chave da empresa: ela segue "Desligado" até alguém ligar e salvar. As propostas só funcionam com as duas ligadas, a do servidor e a da empresa. Se o servidor desligar o módulo, esta linha passa a dizer "Desligado por quem administra o servidor".
   - Rota: `/app/settings/recursos`

## O que o gerente vê

**Objetivo:** Saber o que muda na tela para quem é gerente: a lista é a mesma, mas o botão Ajustar só aparece onde ele pode mexer.

**Quem pode:** manager

**Palavras de busca:** gerente não vê ajustar, permissão do gerente, sem botão ajustar, quem pode mudar recurso

1. **O gerente também acha a tela** — Entrando como gerente (aqui, o Carlos Mendes), o cartão "Recursos opcionais" também aparece em "Configurações", na parte "Sua empresa". Atendentes não veem este cartão.
   - Rota: `/app/settings`
2. **Ajustar só onde ele decide** — O gerente vê a lista inteira, mas o "Ajustar" só aparece onde ele pode mudar. "Avisar a equipe quando o negócio entra na etapa" é de "Gerente ou administrador" e tem o botão. "Reportar vendas à Meta" é do "Administrador da empresa" e fica sem botão: para mudar, peça a um administrador.
3. **Módulos para o gerente** — Nos módulos vale a mesma regra. "Propostas comerciais" tem "Ajustar" para o gerente, porque a tela de Propostas aceita gerente. Os módulos desligados no servidor ficam sem botão para todo mundo.
   - Rota: `/app/settings/recursos`

