# Aviso no WhatsApp

- **Tela:** `/app/ai/cases/avisos`
- **Resumo:** Toda vez que a IA trava e abre um caso para a equipe, um celular de plantão recebe na hora uma mensagem de WhatsApp com o resumo e o link do caso.
- **Fonte:** `curso/licoes/aviso-no-whatsapp.json`

## Conhecendo o Aviso no WhatsApp

**Objetivo:** Entender para que serve o aviso, ler os alertas do alto da tela e saber o que cada campo da configuração decide.

**Quem pode:** admin

**Palavras de busca:** aviso no whatsapp, aviso de caso, receber aviso no celular, plantão, avisar a equipe quando a ia travar, número que recebe os avisos, aviso de teste

1. **Onde fica a tela** — Aviso no WhatsApp não aparece direto no menu lateral. No grupo "Agente de IA" do menu, clique em "Ver tudo em IA". Na parte "Acompanhar o agente" está o cartão "Aviso no WhatsApp". O caminho completo é: Agente de IA › Ver tudo em IA › Aviso no WhatsApp.
   - Rota: `/app/ai`
2. **Para que serve** — Quando a IA não consegue resolver um pedido, ela abre um caso para a equipe decidir (é o que a tela Casos mostra). Esta tela faz esse caso chegar no WhatsApp de alguém da equipe na mesma hora, com o resumo e o link para abrir o caso. Assim ninguém precisa ficar de olho no sistema para saber que um cliente está esperando. Aqui a clínica já configurou o aviso para o celular do plantão da recepção.
   - Rota: `/app/ai/cases/avisos`
3. **Os quadros do alto** — Antes do formulário, a tela avisa quando o aviso não vai funcionar como você espera. Um quadro com borda vermelha impede o aviso de sair até ser resolvido; os outros são alertas. Aqui aparece "Nenhum assistente está autorizado a abrir casos": enquanto nenhum agente puder abrir caso, nenhum aviso sai, e o link "Ir para os assistentes" leva aonde isso se liga. E "Este é o mesmo número que fala com seus clientes": funciona, mas os avisos contam no mesmo limite diário de mensagens desse número. No alto pode aparecer também "Este sistema ainda não tem um endereço na internet": o aviso leva um link para o caso, e sem o endereço do sistema (o domínio) esse link não abriria nada. Instalações feitas pelo guia já têm domínio; esta foto é de um sistema de testes, sem ele.
4. **Quem envia e quem recebe** — Em "Conexão que envia os avisos" você escolhe qual número de WhatsApp da clínica manda a mensagem. Só aparecem os números que conseguem mandar mensagem a qualquer hora. Em "Número que recebe os avisos" vai o celular da pessoa da equipe, começando por +55 e o DDD. "Como chamar esse número" é opcional: é só um apelido para a equipe reconhecer o número.
5. **Ligar, salvar e testar** — A chave "Receber avisos no WhatsApp" liga e desliga o envio. O aviso sai na hora, inclusive de noite e no fim de semana, porque quem recebe é a equipe, não um cliente. Nada muda até você clicar em "Salvar". Depois de salvo, "Enviar aviso de teste" manda uma mensagem de verdade para o número, para você conferir se chegou. Essa mensagem conta no limite diário do número que envia.

## Conferindo se os avisos chegaram

**Objetivo:** Ler a lista dos últimos avisos, entender por que um aviso não saiu e saber se o aviso está ajudando a equipe.

**Quem pode:** admin

**Palavras de busca:** últimos avisos enviados, aviso não saiu, aviso não chegou, tentando enviar, histórico de avisos, o aviso está funcionando

1. **A lista dos últimos avisos** — Mais abaixo fica "Últimos avisos enviados". Cada linha é um aviso que o sistema tentou mandar, do mais novo para o mais antigo: o dia e a hora, a situação, o número que recebeu (só com os 4 últimos dígitos, para proteger o celular de quem está de plantão) e o link "Abrir o atendimento", que abre o caso na tela Casos. Esta lista não some quando alguém resolve um alerta: ela é o registro do que saiu.
   - Rota: `/app/ai/cases/avisos`
2. **Entregue, tentando ou não saiu** — "Entregue" quer dizer que a mensagem saiu. "Tentando enviar" quer dizer que o sistema ainda está insistindo: se a conexão estiver fora do ar, ele tenta de novo por até 24 horas. "Não saiu" quer dizer que ele desistiu, e uma frase logo abaixo explica o motivo.
3. **Por que não saiu** — Aqui um aviso não saiu porque "A conexão de WhatsApp escolhida para os avisos está fora do ar.". O caso não se perde por isso: ele continua esperando na tela Casos, e a falha também aparece na Central de alertas. Clique em "Abrir o atendimento" nessa linha para responder o caso direto por lá.
4. **O aviso está ajudando?** — No fim do quadro, a tela compara os casos dos últimos 30 dias: quanto tempo a equipe leva para agir quando o aviso chegou e quando não chegou. É assim que você sabe se o aviso está adiantando o atendimento. Enquanto não houver casos suficientes para comparar, aparece "Ainda não há casos suficientes nos últimos 30 dias para comparar.", e a comparação aparece sozinha depois.

## Responder pelo WhatsApp e remover o destinatário

**Objetivo:** Saber quando ligar a resposta de casos pelo WhatsApp e a diferença entre desligar o aviso e remover o destinatário.

**Quem pode:** admin

**Palavras de busca:** responder caso pelo whatsapp, responder perguntar, remover destinatário, parar de receber avisos, desligar aviso de caso, trocar o número do plantão

1. **Responder casos pelo WhatsApp** — Com a chave "Responder casos por este WhatsApp" ligada, quem está de plantão responde o caso sem abrir o sistema: basta responder o aviso com RESPONDER, o código do caso e a orientação para a IA, ou com PERGUNTAR, o código do caso e a pergunta que a IA deve fazer ao cliente. Desligada, que é o padrão, tudo o que esse número mandar é ignorado. Para valer, clique em "Salvar".
   - Rota: `/app/ai/cases/avisos`
2. **Desligar não é remover** — Para parar os avisos por um tempo, desligue a chave "Receber avisos no WhatsApp" e salve: o número continua guardado e continua sendo só da equipe. "Remover destinatário", no fim do quadro, é outra coisa: apaga a configuração, e o número volta a ser um número comum.
3. **A tela pergunta antes** — Antes de remover, a tela pergunta "Remover o destinatário dos avisos?" e explica o que acontece: a configuração é apagada, o que esse número mandar volta a virar atendimento na Inbox, e também param de sair os avisos da Agenda que usam o mesmo número e as automações com a ação "Mensagem para a equipe". O histórico de entregas continua na tela. "Remover destinatário" confirma; "Manter" desiste.

