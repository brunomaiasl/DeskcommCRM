# Distribuição de atendimento

- **Tela:** `/app/settings/atendimento`
- **Resumo:** Onde você decide quem da equipe recebe cada cliente novo, o que cada atendente enxerga e quando a IA volta a responder.
- **Fonte:** `curso/licoes/distribuicao-de-atendimento.json`

## Conhecendo a tela

**Objetivo:** Achar a tela de Distribuição de atendimento e reconhecer as decisões que ficam nela.

**Quem pode:** admin

**Palavras de busca:** distribuição de atendimento, quem recebe o cliente, dividir clientes entre atendentes, configurações, rodízio, fila de atendimento

1. **Onde fica a tela** — Clique em "Configurações", no rodapé do menu lateral. Na parte "Sua empresa" fica o cartão "Distribuição de atendimento". Clique nele para abrir a tela.
   - Rota: `/app/settings`
2. **As duas decisões principais** — No alto ficam as duas decisões que andam juntas. A primeira é quem recebe o cliente novo: alguém pega da fila ou o sistema entrega sozinho. A segunda é o que cada atendente enxerga: tudo, ou só a própria carteira. A opção marcada, com a borda colorida, é a que vale hoje. Numa instalação nova, ninguém recebe nada sozinho e o atendente vê os próprios clientes mais os que ainda não têm dono.
3. **Quando a IA volta a responder** — Descendo a tela, três quadros cuidam da passagem entre a IA e a equipe: se a IA volta sozinha quando a pessoa some, quanto tempo a IA espera quando alguém responde pelo celular, e se a conversa fica com quem respondeu. Logo abaixo deles fica o botão "Salvar", que grava tudo o que você mudou nesta parte de cima da tela.
4. **Regras de cada número** — Em "Responsáveis por número" aparece um quadro para cada número ou rede social cadastrada na empresa. Aqui só existe o "Recepção Bem Viver". Nele você escolhe quem atende aquele número e se ele segue uma regra própria. Este quadro tem os próprios botões de salvar.
5. **Assinatura e telefone do cliente** — No fim da tela ficam mais duas escolhas. A primeira diz se o nome de quem escreveu aparece na mensagem que chega ao cliente. A segunda diz se o telefone que o cliente informa na conversa entra sozinho na ficha dele. As duas têm uma lição só delas no fim deste módulo.

## Quem recebe o cliente novo

**Objetivo:** Escolher entre a fila aberta, o rodízio e a entrega para quem tem menos conversas.

**Quem pode:** admin

**Palavras de busca:** rodízio de atendentes, distribuir clientes automaticamente, fila de atendimento, quem atende primeiro, dividir conversas, menos conversas

1. **Os três jeitos de distribuir** — Esta escolha vale para a conversa que chega sem dono. Em "Cada um pega o que quiser", o cliente novo cai numa fila aberta e o primeiro atendente que clicar assume. É o jeito que vem marcado numa instalação nova. Nos outros dois, o sistema escolhe quem recebe, e ninguém precisa pegar da fila.
   - Rota: `/app/settings/atendimento`
2. **Ligar o rodízio** — Clique em "Rodízio automático entre os atendentes". Cada cliente novo vai para quem está há mais tempo sem receber, só entre os atendentes disponíveis, dentro do horário e com espaço na capacidade. Ao marcar, aparecem dois campos. "Tentativas antes de desistir" diz quantas vezes o sistema tenta de novo quando não há ninguém disponível. "Espera entre tentativas (segundos)" diz o intervalo entre uma tentativa e outra. Quando as tentativas acabam, a conversa fica na fila, aparece um aviso em "Alertas" e o sistema continua tentando, mais devagar, a cada 15 minutos.
3. **Entregar para quem tem menos conversas** — A terceira opção, "Vai para quem tem menos conversas na mão", entrega cada cliente novo para quem está com menos conversas em aberto. Se duas pessoas empatam, recebe quem está há mais tempo sem receber, como no rodízio. É a melhor escolha para equipe grande, onde uma pessoa sobrecarregada e outra parada custam caro. Os dois campos de tentativas continuam valendo.
4. **Salvar a escolha** — Enquanto você não salva, aparece o aviso "Há mudanças não salvas." ao lado do botão. Clique em "Salvar" para gravar. Aparece a mensagem "Distribuição de atendimento salva." e a nova regra passa a valer para os próximos clientes que chegarem sem dono.

## O que cada atendente enxerga

**Objetivo:** Decidir se o atendente vê os clientes de todo mundo ou só os dele, sem deixar a fila sem ninguém.

**Quem pode:** admin

**Palavras de busca:** atendente vê só os clientes dele, esconder clientes de outro atendente, carteira de clientes, privacidade entre atendentes, quem vê o quê, visibilidade

1. **Três níveis de visão** — Esta escolha vale só para quem tem o papel de Atendente. Gerente e administrador continuam vendo tudo. Em "Todos veem tudo", qualquer atendente abre a conversa e o negócio de qualquer colega. Em "Os seus, mais os que ainda não têm dono", que vem marcado numa instalação nova, ele vê os próprios clientes e a fila de quem acabou de chegar. Em "Só os seus", ele vê apenas o que foi entregue a ele, nem a fila.
   - Rota: `/app/settings/atendimento`
2. **O aviso da combinação que trava tudo** — Clique em "Só os seus". Com a distribuição em "Cada um pega o que quiser", aparece um aviso logo abaixo das opções: nenhum atendente enxerga a fila para pegar o cliente, então ninguém é atendido. A tela avisa antes de você salvar.
3. **Combine com o rodízio** — Para usar "Só os seus", ligue uma distribuição automática. Suba até "Quem recebe o cliente novo" e clique em "Rodízio automático entre os atendentes": o sistema passa a entregar cada cliente novo a alguém, e o aviso some. "Só os seus" continua marcado mais abaixo. Depois, clique em "Salvar" no fim desta parte.

## Quando a IA volta a responder

**Objetivo:** Ajustar quando a IA retoma uma conversa que estava com uma pessoa da equipe.

**Quem pode:** admin

**Palavras de busca:** ia voltar a responder sozinha, devolver conversa para a ia, ia parou de responder, responder pelo celular, silêncio da ia, conversa fica com o atendente

1. **A IA volta sozinha?** — Quando alguém assume uma conversa, a IA para de responder nela até a conversa ser devolvida. Se ninguém devolve, o cliente que escreve de novo fica sem resposta. Esta caixa vem desmarcada: a IA só volta quando alguém clica em "Devolver ao automático", no alto da conversa.
   - Rota: `/app/settings/atendimento`
2. **Devolver depois de um tempo** — Marque a caixa "Devolver ao agente sozinho depois de um tempo sem resposta da equipe". Aparece o campo "Minutos sem resposta da equipe", que já vem com 60. O tempo conta a partir do último sinal de uma pessoa na conversa: assumir, responder pela tela ou pelo celular. Passado esse tempo, a IA volta a atender, mas só onde há um agente de IA publicado.
3. **Quando alguém responde pelo celular** — Se alguém da equipe responde o cliente direto pelo celular, fora do sistema, a IA fica calada naquela conversa por um tempo. Esse tempo é o deste campo, e o padrão é 60 minutos. Cada nova resposta pelo celular recomeça a contagem. Quem atende o dia inteiro pelo celular costuma preferir um prazo curto, como 15.
4. **A conversa fica com quem respondeu** — Marque "A conversa fica com quem atendeu". Assim, quem responde pela Inbox uma conversa sem dono passa a ser o dono dela, e a IA fica calada até alguém devolver. E quando o cliente volta a escrever numa conversa encerrada, ela vai direto para o último atendente, sem passar pela distribuição, se ele ainda faz parte da equipe. Clique em "Salvar" para gravar as mudanças.

## Responsáveis por número

**Objetivo:** Escolher quem atende cada número de WhatsApp e dar a ele uma regra própria.

**Quem pode:** admin

**Palavras de busca:** quem atende cada número, responsável pelo whatsapp, atendente de um número, dois números de whatsapp, regra por número, destino padrão

1. **O quadro do número** — Cada número conectado tem um quadro com o nome dele. A frase no alto diz como ele está agora: "Usa todos os atendentes elegíveis da organização." Ou seja, enquanto você não escolher ninguém, qualquer atendente que esteja disponível pode receber os clientes deste número.
   - Rota: `/app/settings/atendimento`
2. **Uma regra só para este número** — Em "Como este número distribui", escolha "Rodízio automático entre os atendentes". A regra vale só para este número; os outros seguem a da organização. Atenção: com uma regra própria, só recebem os clientes deste número as pessoas que você marcar logo abaixo. Com uma regra escolhida, a lista "Atendente de destino padrão" fica liberada: se você escolher uma pessoa nela, todo cliente novo deste número vai direto para ela, sem passar pela distribuição. Se ela estiver indisponível ou com a capacidade cheia, a conversa espera por ela e não vai para outra pessoa.
3. **Quem atende este número** — Marque quem pode receber os clientes deste número. Aqui, Ana Ribeiro e Carlos Mendes. A Helena fica de fora: a distribuição automática não entrega a ela os clientes deste número.
4. **Salvar os responsáveis** — Clique em "Salvar responsáveis". Logo abaixo aparece "Responsáveis salvos." e a frase do alto muda para "Somente as pessoas selecionadas recebem este número.". A partir de agora, a distribuição automática só entrega os clientes deste número para quem você marcou.
5. **Voltar ao padrão** — Para desfazer tudo, clique em "Voltar ao padrão da organização". O número perde a regra própria e a lista de responsáveis, e volta a usar todos os atendentes e a distribuição da organização. A frase do alto volta a ser "Usa todos os atendentes elegíveis da organização.". Logo abaixo aparece de novo "Responsáveis salvos.", confirmando a mudança.

## Assinatura das mensagens e telefone do cliente

**Objetivo:** Mostrar ao cliente quem escreveu cada mensagem e decidir se o telefone que ele informa entra sozinho na ficha.

**Quem pode:** admin

**Palavras de busca:** assinar mensagem com nome do atendente, nome do atendente na mensagem, nome da ia na mensagem, assinatura whatsapp, telefone na ficha do cliente, salvar telefone automático

1. **Quem fala aparece na mensagem?** — Ligada, a assinatura põe em negrito, na primeira linha da mensagem que chega ao cliente, o nome de quem escreveu. "Assinar as mensagens dos atendentes" usa o nome de cada atendente. "Assinar as mensagens da IA" usa o "Nome da IA", que vem como "Assistente Virtual". Numa instalação nova, as duas vêm desligadas.
   - Rota: `/app/settings/atendimento`
2. **A IA assina com o nome de cada agente** — Marque "Assinar as mensagens da IA". Isso libera a última caixa, "Assinar com o nome de cada agente". Marcada, cada mensagem da IA leva o nome do agente que a escreveu, como está no cadastro dele; aqui seria "Bia — Recepção virtual". Depois, clique em "Salvar assinatura".
3. **Telefone que entra sozinho na ficha** — Às vezes o cliente diz o telefone dele na conversa, e o agente de IA anota. Com esta opção desligada, que é como ela vem, o número vira uma sugestão na ficha e espera alguém da equipe confirmar. Se ninguém decidir em 7 dias, a sugestão é descartada.
   - Rota: `/app/settings/atendimento`
4. **Ligar a opção** — Clique na chave. Ela salva na hora, sem botão de salvar, e aparece por alguns segundos o aviso "Opção salva." no canto da tela. A frase abaixo passa a começar com "Ligado:". Ligada, quando a ficha do cliente está sem telefone e o agente de IA anota o número que ele disse, o número é gravado na hora. Se o cliente tem um negócio aberto, isso fica registrado no histórico dele. Um número que já está na ficha nunca é trocado sozinho: isso continua exigindo uma pessoa.

