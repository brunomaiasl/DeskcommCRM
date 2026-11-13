# Aviso de agendamento

- **Tela:** `/app/agenda/avisos`
- **Resumo:** Receber no seu WhatsApp cada horário marcado, remarcado ou cancelado, e às 7h o resumo do dia, para nunca marcar duas pessoas no mesmo horário.
- **Fonte:** `curso/licoes/aviso-de-agendamento.json`

## Conhecendo o Aviso de agendamento

**Objetivo:** Achar a tela e entender cada parte: para onde vai o aviso, a chave que liga, os botões e a lista dos últimos avisos.

**Quem pode:** admin

**Palavras de busca:** aviso de agendamento, receber agendamento no whatsapp, avisar quando marcar horário, aviso de consulta marcada, notificação de agenda no celular, resumo da agenda do dia

1. **Onde fica a tela** — Clique em "Configurações", no rodapé do menu lateral. Na parte "Sua empresa" fica o cartão "Aviso de agendamento". Ele serve para quem também marca horários fora do sistema (no caderno, no celular): cada horário que a IA ou a equipe marcar aqui chega no seu WhatsApp, e você não marca duas pessoas no mesmo horário.
   - Rota: `/app/settings`
2. **As partes da tela** — No alto fica o quadro de configuração: para onde o aviso vai e a chave que liga. Embaixo fica a lista "Últimos avisos", com o que já foi mandado. Nesta clínica o aviso já está ligado e vai para o celular da Helena. Repare que o menu lateral passa a marcar "Agenda": esta tela também fica dentro da Agenda.
3. **Usar o mesmo número do aviso de caso** — A primeira chave reaproveita o número que você já cadastrou no aviso de caso (o aviso que chega no seu WhatsApp quando a IA abre um caso). Aqui ela aparece travada, porque esse aviso ainda não tem número. Quando tiver, você pode ligar esta chave: os avisos da agenda vão para o mesmo número, e se você trocar o número lá, eles acompanham.
4. **Quem envia e quem recebe** — Em "Conexão que envia os avisos" você escolhe qual número de WhatsApp da clínica manda a mensagem. Só aparecem os números que podem mandar uma mensagem escrita na hora, sem precisar de modelo aprovado. Atenção: um número desconectado também aparece na lista, e por ele o aviso não sai. Em "Número que recebe os avisos" vai o celular de quem quer ser avisado, começando por +55 e o DDD.
5. **A chave que liga o aviso** — A chave "Receber avisos de agendamento no WhatsApp" liga e desliga o aviso. Ligada, cada horário marcado, remarcado ou cancelado vira uma mensagem curta com o primeiro nome do cliente, o serviço, o dia e a hora, quem atende e de onde veio: IA, equipe ou o próprio cliente. Se a agenda estiver ligada ao Google Agenda, um horário remarcado ou cancelado lá também gera aviso. Às 7h chega também o resumo do dia, com a agenda de hoje.
6. **Salvar e o horário de silêncio** — Nada muda até você clicar em "Salvar". Logo abaixo do quadro, a tela avisa: das 22h às 7h não sai aviso, para não acordar ninguém. O que for marcado nesse horário aparece no resumo das 7h. O horário é o da empresa. O botão "Enviar teste", ao lado, é explicado na lição "Pausar o aviso e mandar um teste".

## Escolher para onde vai o aviso

**Objetivo:** Escolher o número da clínica que envia, digitar o celular que recebe e salvar.

**Quem pode:** admin

**Palavras de busca:** trocar número do aviso de agendamento, mudar celular que recebe aviso, configurar aviso de agenda no whatsapp, escolher número que envia aviso, ligar aviso de agendamento

1. **Escolher o número que envia** — Clique em "Conexão que envia os avisos" para abrir a lista dos números da clínica. Aqui só existe a "Recepção Bem Viver". Se a clínica não tiver nenhum número que sirva, a lista fica travada e a tela pede para conectar um WhatsApp em Conexões antes.
   - Rota: `/app/agenda/avisos`
2. **Digitar o celular que recebe** — Em "Número que recebe os avisos", digite o celular começando pelo código do país: +55, o DDD e o número. O sistema tira sozinho espaços, traços e parênteses. Enquanto o número estiver incompleto, aparece "Esse número ainda não está completo." e o botão "Salvar" fica apagado.
3. **Número completo, ligar e salvar** — Com o número completo, o aviso some e o "Salvar" acende. Confira se a chave "Receber avisos de agendamento no WhatsApp" está ligada: ela só pode ser ligada depois de escolher a conexão e o número. Clique em "Salvar": aparece por alguns segundos, no canto de baixo da tela, a confirmação "Aviso salvo.".
4. **Conferir que ficou salvo** — Ao abrir a tela de novo, o número novo continua no campo e a chave segue ligada: a mudança foi gravada. A partir de agora os avisos vão para esse celular. Ele passa a ser um número da equipe: o que ele mandar para a clínica não vira atendimento na Inbox.
   - Rota: `/app/agenda/avisos`

## Quando o sistema estranha o número

**Objetivo:** Entender o que fazer quando o número digitado já é de um cliente ou é um número da própria clínica.

**Quem pode:** admin

**Palavras de busca:** número já é de um cliente, usar mesmo assim aviso, aviso de agendamento não salva, número conectado não pode receber aviso, erro ao salvar número do aviso

1. **Um número que já é de cliente** — Aqui foi digitado o celular da Juliana Castro, que é paciente da clínica. Ao clicar em "Salvar", o sistema confere se o número já está nos seus contatos antes de gravar.
   - Rota: `/app/agenda/avisos`
2. **O sistema pergunta antes** — Aparece um quadro com o aviso "Esse número já é de um cliente seu". Se você continuar, esse número passa a ser só da equipe: as mensagens que ele mandar param de chegar como atendimento. "Usar mesmo assim" grava assim mesmo. "Escolher outro número" fecha o quadro sem gravar nada.
3. **Um número da própria clínica** — E se você digitar o número da "Recepção Bem Viver", que é o próprio WhatsApp da clínica? Esse o sistema não aceita: um número ficaria respondendo o outro sem parar. Ao clicar em "Salvar", aparece por alguns segundos, no canto de baixo da tela, a mensagem "Esse é um dos números conectados da sua conta", e nada é gravado. Digite outro celular.

## Conferir se os avisos estão chegando

**Objetivo:** Ler a lista "Últimos avisos" e saber o que cada linha quer dizer.

**Quem pode:** admin

**Palavras de busca:** aviso de agendamento não chegou, conferir avisos enviados, histórico de avisos da agenda, aviso não saiu, resumo das 7h não chegou

1. **A lista dos últimos avisos** — Cada linha é um aviso, da mais nova para a mais antiga (aparecem as 20 últimas). À esquerda vem o tipo: "Novo agendamento", "Remarcado", "Cancelado" ou "Resumo do dia". À direita, o dia e a hora em que o aviso saiu (ou em que foi registrado, se não saiu). Não é a hora da consulta. Embaixo, o que aconteceu com ele ("Enviado", "Não saiu" ou "Entrou no resumo das 7h") e para qual celular, só com os quatro últimos números à mostra.
   - Rota: `/app/agenda/avisos`
2. **Um aviso que não saiu** — Quando uma linha diz "Não saiu", a frase em vermelho logo abaixo explica o motivo. Aqui foi "A conexão de WhatsApp escolhida para os avisos está fora do ar.": o número da clínica estava desconectado naquela hora. Esse aviso não é mandado de novo depois. Confira o número em Conexões. Se a lista estiver vazia, o aviso ainda não foi ligado ou acabou de ser ligado: com ele ligado, todo dia de manhã aparece pelo menos a linha do resumo.
3. **O que foi marcado de madrugada** — Quando alguém marca, remarca ou cancela um horário entre 22h e 7h (vale a hora em que isso foi feito, não a hora da consulta), o aviso não sai na hora. A linha mostra "Vai no resumo das 7h" e, depois que o resumo sai, muda para "Entrou no resumo das 7h". O "Resumo do dia" traz a agenda de hoje e, no fim, o que mudou durante a noite.

## Pausar o aviso e mandar um teste

**Objetivo:** Desligar o aviso por um tempo sem perder a configuração, e saber quando usar o botão de teste.

**Quem pode:** admin

**Palavras de busca:** desligar aviso de agendamento, parar de receber aviso da agenda, pausar aviso no whatsapp, testar aviso de agendamento, enviar teste do aviso

1. **Desligar a chave** — Para parar de receber os avisos, clique na chave "Receber avisos de agendamento no WhatsApp" para desligá-la. A conexão e o número continuam preenchidos, então para voltar basta ligar de novo. Ainda falta gravar: o próximo clique é em "Salvar".
   - Rota: `/app/agenda/avisos`
2. **Salvar para valer** — A chave só vale depois do "Salvar". Clique nele: aparece por alguns segundos, no canto de baixo da tela, a confirmação "Aviso salvo.". A partir daí nenhum aviso novo sai, nem o resumo das 7h. A lista "Últimos avisos" continua aí, com o que já foi mandado.
3. **A pausa ficou gravada, e o teste** — Abrindo a tela de novo, a chave continua desligada: a pausa foi gravada, e a conexão e o número seguem preenchidos para quando você quiser voltar. O botão "Enviar teste" manda uma mensagem de verdade para o número salvo, dizendo que o aviso está configurado e funcionando. Ele funciona mesmo com a chave desligada. Use quando trocar o número, para ter certeza de que chega. O teste conta no limite diário de mensagens do número da clínica, e dá para mandar até três por hora.
   - Rota: `/app/agenda/avisos`

