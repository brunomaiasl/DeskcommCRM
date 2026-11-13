# Alertas

- **Tela:** `/app/ai/inbox`
- **Resumo:** A Central de avisos reúne o que a IA percebeu e precisa de uma pessoa da equipe: uma resposta que não chegou, um cliente que pediu para falar com gente, um gasto que passou do limite.
- **Fonte:** `curso/licoes/alertas-da-ia.json`

## Conhecendo a Central de avisos

**Objetivo:** Saber onde fica a Central de avisos, como ler cada aviso e reconhecer os avisos que são assunto do gerente.

**Quem pode:** agent

**Palavras de busca:** alertas, central de avisos, sino, avisos da ia, o que a ia precisa de mim, resposta que não chegou, aviso crítico

1. **Onde fica a tela** — Alertas não aparece direto no menu lateral. No grupo "Agente de IA" do menu, clique em "Ver tudo em IA". Na parte "Acompanhar o agente" está o cartão "Alertas". O caminho completo é: Agente de IA › Ver tudo em IA › Alertas.
   - Rota: `/app/ai`
2. **A Central de avisos** — A tela se chama "Central de avisos". Cada linha é um assunto que a Bia, a IA da clínica, não conseguiu resolver sozinha e deixou para a equipe: uma resposta que não chegou ao cliente, um cliente que pediu para falar com uma pessoa, um retorno prometido que ficou sem dono. A lista mostra primeiro os avisos mais graves e, entre os de mesma gravidade, os mais recentes.
   - Rota: `/app/ai/inbox`
3. **Lendo um aviso** — À esquerda, o selo diz a gravidade: "crítico", "atenção" ou "informativo". Ao lado vem o título e, logo embaixo, o tipo do assunto e há quanto tempo o aviso chegou. Depois vem o que aconteceu e uma orientação do que fazer. Neste aviso crítico, uma resposta da Bia ficou presa e não chegou ao cliente. O link no fim, "Abrir uma conversa afetada", leva direto à conversa desse cliente.
4. **Um aviso que é do gerente** — Alguns avisos são assunto do gerente ou de quem administra. O aviso de gasto de IA, por exemplo, aparece para toda a equipe, mas quem atende não recebe o botão que leva a resolver o problema: no lugar dele vem "Peça ao gestor para revisar este contexto.". O "Marcar resolvido" continua lá para todos. Assim todo mundo sabe o que está acontecendo, e quem resolve é o gerente, na tela de uso de IA.
5. **Abertos, Resolvidos e o sino** — A aba "Abertos" mostra o que ainda espera alguém, com o total entre parênteses. A aba "Resolvidos" guarda os avisos que alguém da equipe já marcou como resolvidos. O sino no alto da tela traz você para cá de qualquer lugar do sistema, e o número vermelho nele é o total de avisos em aberto.

## Resolvendo um aviso

**Objetivo:** Ir até o assunto de um aviso, marcá-lo como resolvido e reabri-lo se for preciso.

**Quem pode:** agent

**Palavras de busca:** marcar resolvido, resolver aviso, reabrir aviso, marcar todos resolvidos, limpar alertas, abrir conversa do aviso

1. **Ir até o assunto** — O link no fim de cada aviso leva direto ao que precisa de atenção. Em "Abrir uma conversa afetada" você abre a conversa do cliente que não recebeu a resposta, confere o que faltou e responde você mesmo, se for o caso. No aviso da Mariana Souza, que pediu para falar com uma pessoa, o botão é "Abrir conversa".
   - Rota: `/app/ai/inbox`
2. **Marcar como resolvido** — Depois de cuidar do assunto, clique em "Marcar resolvido" na linha do aviso. Ele sai da aba "Abertos" e o número do sino diminui. Marcar como resolvido não muda nada na conversa nem avisa o cliente: só conta para a equipe que alguém já cuidou disso.
3. **Na aba Resolvidos** — O aviso passa para a aba "Resolvidos", junto com os que já tinham sido resolvidos antes. Ali ele ganha o botão "Reabrir": use se marcou o aviso por engano ou se o problema voltou, e ele volta para "Abertos".
4. **Resolver todos de uma vez** — De volta à aba "Abertos", o botão "Marcar todos resolvidos" resolve de uma vez todos os avisos em aberto da clínica, inclusive os que não aparecem na tela. Use só depois de conferir a lista: um aviso resolvido sem ninguém olhar continua sendo um problema, só que escondido.

## O lembrete de caso parado

**Objetivo:** Ligar, desligar e ajustar de quanto em quanto tempo a Central volta a avisar sobre um caso que espera a equipe.

**Quem pode:** admin

**Palavras de busca:** lembrete de caso parado, caso parado, lembrar a equipe, avisar de novo, caso esperando decisão, frequência do lembrete

1. **O cartão do lembrete** — Quem administra vê, no alto da Central, o cartão "Lembrete de caso parado". Ele cuida dos casos que a IA abre para a equipe decidir: enquanto ninguém responde, a Central volta a avisar de tempos em tempos, com o aviso "Um atendimento espera decisão da equipe". O relógio começa quando o caso chega à equipe e recomeça quando o cliente responde.
   - Rota: `/app/ai/inbox`
2. **Ligar e escolher o ritmo** — A caixa "Lembrar a equipe dos casos parados" liga e desliga o lembrete. Em "Lembrar a cada" você escolhe de quanto em quanto tempo a Central volta a avisar, de 1 hora a 3 dias. Em "Avisos por espera" você escolhe quantas vezes ela avisa sobre o mesmo caso antes de parar, para a lista não encher de repetição. Com a caixa desmarcada, as duas escolhas ficam apagadas.
3. **Salvar o lembrete** — Aqui o intervalo foi trocado para 12 horas: um caso parado volta a aparecer na Central duas vezes por dia. Nada muda até você clicar em "Salvar lembrete". Ao salvar, aparece por alguns segundos a confirmação "Lembrete de caso parado salvo.".

