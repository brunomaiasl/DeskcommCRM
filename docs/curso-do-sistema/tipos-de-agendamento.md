# Tipos de agendamento

- **Tela:** `/app/settings/tenant/agenda`
- **Resumo:** Onde você cadastra o que os clientes podem marcar: quanto dura, onde acontece, quem atende, o preço e o lembrete que vai pelo WhatsApp.
- **Fonte:** `curso/licoes/tipos-de-agendamento.json`

## Conhecendo os tipos de agendamento

**Objetivo:** Achar a tela pelas Configurações e entender o que cada linha da lista mostra.

**Quem pode:** admin

**Palavras de busca:** tipos de agendamento, serviços da agenda, o que o cliente pode marcar, duração da consulta, cadastrar consulta, configurar agenda

1. **Onde fica** — Abra "Configurações" no rodapé do menu da esquerda. No grupo "Sua empresa" está o cartão "Tipos de agendamento". Para seguir, clique nele.
   - Rota: `/app/settings`
2. **A lista do que se pode marcar** — A página abre com o título "Agendamentos", que é o nome da área e pode ser mudado nas regras gerais. Cada linha é uma coisa que a clínica atende: uma consulta, um procedimento, um retorno. É desta lista que saem as opções da tela de marcar horário e do agente de IA. O botão "Novo tipo de agendamento" cadastra mais um.
3. **O que uma linha diz** — Na linha da "Limpeza dental" aparecem, nesta ordem: o nome, a categoria ("Procedimento"), a duração ("40 min") e onde acontece ("Presencial"). O trecho "avisa o cliente" mostra que este tipo manda lembrete pelo WhatsApp, e os números são minutos antes do horário: 1440 é um dia e 120 são duas horas. "texto próprio" quer dizer que a mensagem foi escrita pela clínica. À direita, "Configurar Limpeza dental" abre os horários próprios do serviço, "Editar" muda os dados do tipo e "Desativar" tira o tipo das opções.
4. **Os avisos em amarelo** — "sem responsável — definir quem atende" quer dizer que ninguém foi escolhido para atender aquele tipo. Sem isso, a agenda não tem horário nenhum para oferecer a esse tipo, nem na tela de marcar nem no agente de IA. Clicar no aviso abre o ajuste na hora. Um tipo com "desativado" fica apagadinho: some das opções de marcar, mas o histórico continua.
5. **Mais ajustes no fim da página** — Abaixo da lista ficam duas partes que abrem com um clique. "Regras gerais da agenda" reúne o nome da área da agenda, os prazos de confirmação de presença, quem mexe na agenda de quem e os dias fechados, e tem lição própria neste módulo. Para ver a outra, clique em "Contas e calendários Google".
6. **Sua agenda do Google** — Aqui cada pessoa da equipe ajusta a própria conta do Google, depois de conectada: escolhe quais agendas ocupam os horários dela e em qual agenda os compromissos novos aparecem. Sem conta conectada, aparece só o link "Conecte sua conta pela Agenda", que leva à tela da Agenda, onde a conexão é feita. Se lá aparecer "Sincronizar com o Google ainda não está disponível", quem instalou o sistema ainda precisa cadastrar o Google; até lá, a agenda funciona normalmente, só não conversa com o Google.

## Criar um tipo de agendamento

**Objetivo:** Cadastrar um atendimento novo com nome, categoria, duração, local e quem atende.

**Quem pode:** admin

**Palavras de busca:** criar tipo de agendamento, novo serviço na agenda, cadastrar retorno, duração do atendimento, quem atende a consulta, adicionar procedimento

1. **Começar um tipo novo** — Vamos cadastrar o "Retorno de fisioterapia", uma volta rápida do paciente depois do tratamento. Clique em "Novo tipo de agendamento".
   - Rota: `/app/settings/tenant/agenda`
2. **O formulário** — Abre um formulário curto. "Nome" é o que o cliente e a equipe vão ler. "Categoria" agrupa o tipo (consulta, retorno, procedimento…). "Duração (minutos)" diz quanto tempo o horário ocupa na agenda. "Onde acontece" pode ser presencial, por telefone, WhatsApp, link de vídeo ou Google Meet; o Google Meet só gera o link com a agenda do Google conectada. "Criar como serviço em rascunho" é para quem vai montar horários próprios antes de abrir as reservas: o tipo nasce desativado e sem quem atende, e você o ajusta depois pelo botão "Configurar" da linha dele.
3. **Preencher** — Escreva o nome, escolha a categoria "Retorno", a duração de 30 minutos e "Presencial". Em "Quem atende", escolha a pessoa da equipe que faz esse atendimento: aqui, a Ana Ribeiro. Na primeira vez, o campo já vem com o seu nome; confira sempre, porque se ele estiver em "Definir depois" o tipo fica sem horário para oferecer até alguém ser escolhido.
4. **Pronto para marcar** — Ao clicar em "Criar tipo", o formulário fecha e o "Retorno de fisioterapia" entra na lista, já com a categoria, a duração e o local. Como a Ana atende, a agenda já oferece horários desse tipo dentro da jornada de trabalho dela. Não dá para criar dois tipos com o mesmo nome, nem se o outro estiver desativado: o sistema avisa que já existe. Nesse caso, reative o antigo.

## Quem atende, preço e lembrete

**Objetivo:** Editar um tipo: escolher quem atende, pôr um preço padrão e ligar os lembretes pelo WhatsApp.

**Quem pode:** admin

**Palavras de busca:** editar tipo de agendamento, lembrete de consulta whatsapp, avisar cliente antes da consulta, preço padrão do serviço, sem responsável na agenda, mudar duração

1. **Resolver o aviso amarelo** — A "Avaliação odontológica" está sem ninguém para atender, então nenhum horário dela aparece para marcar. Clique no aviso "sem responsável — definir quem atende". O botão "Editar" da linha abre o mesmo ajuste.
   - Rota: `/app/settings/tenant/agenda`
2. **Quem atende e preço** — O ajuste abre logo abaixo da linha. Em "Quem atende", escolha o Carlos Mendes. "Preço padrão" é opcional: ele vira o valor sugerido na comanda e pode ser mudado lá. Aqui também dá para trocar o nome e a duração. Enquanto o ajuste está aberto, o botão "Editar" da linha vira "Fechar", que recolhe o ajuste.
3. **Ligar o lembrete** — Marque "Avisar o cliente antes do compromisso, pelo WhatsApp". Escolha quanto antes (aqui, 1 dia) e escreva a mensagem. As palavras entre chaves, como {{nome}} e {{hora}}, são trocadas pelos dados de cada cliente na hora do envio. Mensagem em branco usa o texto padrão do sistema. O lembrete só sai se a clínica tiver um número de WhatsApp conectado e funcionando.
4. **Mais de um lembrete** — "Adicionar lembrete" cria outro aviso, com antecedência e mensagem próprias: por exemplo, um no dia anterior e outro duas horas antes. Com mais de um, aparece "Remover" para tirar um deles. Em "Canal para enviar os lembretes", o padrão "Automático" usa o número da conversa da reserva ou, se a clínica tiver um número só, esse número. Se a clínica tiver mais de um número, escolha qual envia: no automático, uma reserva que não veio de conversa fica sem lembrete e a equipe recebe um aviso. Clique em "Salvar" para gravar tudo.
5. **O resultado na lista** — O ajuste fecha e a linha mostra o novo estado: o aviso amarelo sumiu, porque agora o Carlos atende, e aparece "avisa o cliente" com as antecedências em minutos (1440 é um dia, 120 são duas horas). O lembrete só sai para horários deste tipo que estejam confirmados e tenham um contato cadastrado.

## Desativar e reativar um tipo

**Objetivo:** Tirar um atendimento das opções de marcar sem perder o histórico, e trazê-lo de volta.

**Quem pode:** admin

**Palavras de busca:** desativar tipo de agendamento, parar de oferecer serviço, apagar tipo de consulta, reativar serviço na agenda, tirar opção de marcar

1. **Desativar** — A clínica parou de oferecer a orientação nutricional por vídeo. Tipo de agendamento não se apaga, se desativa: assim o histórico fica guardado. Clique em "Desativar" na linha dela.
   - Rota: `/app/settings/tenant/agenda`
2. **Desativado, não apagado** — A linha fica apagadinha, ganha a palavra "desativado" e vai para o fim da lista. O tipo some das opções de marcar horário. Os atendimentos já feitos continuam guardados com o nome certo, e os horários que já estavam marcados continuam marcados: desativar não cancela nada. O botão "Desativar" vira "Reativar".
3. **De volta à lista** — Clicando em "Reativar", o tipo volta para a lista normal, com a mesma configuração de antes, e passa de novo a aparecer para marcar.

## Aula em grupo com horário fixo

**Objetivo:** Transformar um tipo em serviço com horários próprios e vagas, como uma turma de pilates.

**Quem pode:** admin

**Palavras de busca:** aula em grupo com vagas, turma com capacidade, horário fixo da aula, configurar serviço na agenda, limite de pessoas por horário, pilates em grupo

1. **Abrir a configuração do serviço** — Alguns atendimentos têm horário fixo e várias pessoas ao mesmo tempo, como o pilates em grupo. Para isso existe o botão "Configurar" seguido do nome do tipo, à direita de cada linha. Clique em "Configurar Pilates em grupo".
   - Rota: `/app/settings/tenant/agenda`
2. **As quatro abas** — A configuração abre no alto da página, com quatro abas: "Serviço" (como se reserva), "Horários" (quando acontece), "Google" (publicar num calendário do Google, se a agenda do Google estiver conectada) e "Bloqueios" (impedir reservas num período). Mudar isto vale para as reservas novas; as que já existem ficam como estão. "Exigir confirmação humana" segura a vaga até alguém da equipe confirmar. No topo, "Nome e duração" volta aos dados do tipo e "Fechar" recolhe esta configuração.
3. **Turma com vagas** — Marque "Usar programação de serviço". Em "Como reservar", escolha "Coletivo com capacidade" e diga em "Capacidade padrão" quantas pessoas cabem na turma: aqui, 6. "Individual por profissional" é para atendimento de uma pessoa por vez; nesse caso, escolha também os profissionais em "Opções adicionais". "Coletivo sem limite automático" não conta vagas. "Ativar reservas deste serviço" já vem marcado; desmarcado, o serviço fica em rascunho, sem receber reservas. Para salvar com as reservas ativas, é preciso ter pelo menos um horário, que é o próximo passo.
4. **O horário da turma** — Na aba "Horários", clique em "Adicionar horário". Escolha "Toda semana", o dia ("Terça-feira") e o "Início" (19:00). "Horário fixo" é uma turma que começa naquela hora; "Faixa de atendimento" abre horários dentro de um intervalo. "Copiar horário" repete a linha para o dia seguinte.
5. **Programação salva** — Ao clicar em "Salvar programação", aparece a confirmação com quantas reservas futuras foram mantidas. Agora o pilates tem turma às terças, 19h, com até 6 vagas, e a linha dele na lista passa a mostrar "Coletivo com capacidade · 6". Abaixo, em "Conferir horários salvos", escolha uma data e clique em "Atualizar fontes e conferir" para ver os horários daquele dia antes de divulgar.

## Regras gerais da agenda

**Objetivo:** Conhecer as regras que valem para a clínica toda e fechar um dia de feriado.

**Quem pode:** admin

**Palavras de busca:** fechar agenda no feriado, bloquear dia na agenda, confirmação de presença, nome da agenda, cliente pela agenda etiqueta, atendente mexer na agenda do colega

1. **Abrir as regras** — No fim da página, clique em "Regras gerais da agenda". A primeira regra é o "Título da área da agenda": o nome que aparece no topo da tela da Agenda e desta página. Vazio, fica "Agendamentos". Escreva e clique em "Salvar título".
   - Rota: `/app/settings/tenant/agenda`
2. **Confirmação de presença** — Depois de cada horário, o sistema pede à equipe que confirme se o cliente veio. Sem essa confirmação, ele nunca presume falta. "Pedir confirmação após o fim" diz quantos minutos depois do fim esse pedido aparece. "Proteger de cobranças por silêncio" diz por quanto tempo as mensagens automáticas que cobram resposta do cliente ficam seguradas enquanto ninguém confirma. "Soltar o horário de um pedido não confirmado", que só vale para tipos que pedem confirmação, diz depois de quanto tempo um pedido de horário que ninguém aprovou solta a vaga; o cliente não é avisado disso. Ajuste e clique em "Salvar prazos".
3. **Clientes pela agenda** — Com "Quem tem horário marcado vira cliente" ligado, todo contato com horário marcado ganha a etiqueta "cliente"; horário cancelado e falta não contam. Ao ligar, o sistema pede confirmação, porque quem já teve horário também ganha a etiqueta na hora. Clique em "Ligar" para aplicar ou em "Cancelar" para desistir. Desligar depois não tira a etiqueta de ninguém. Só o administrador muda esta regra.
4. **Agenda dos colegas e Google Meet** — "Atendentes podem mexer na agenda dos colegas" vem ligado: qualquer atendente vê, cancela e remarca o horário de qualquer colega, e mexe nas tarefas da equipe. Desligado, cada um mexe só nos próprios; gerentes e administradores continuam mexendo em tudo. Essa regra vale assim que você clica. Logo abaixo, "O Meet da reunião nasce com o acesso aberto" deixa entrar quem tiver o link, sem pedir licença. Ela precisa da agenda do Google conectada, e quem já estava conectado precisa reconectar a agenda para a opção passar a valer.
5. **Fechar um dia** — Em "Dias fora da rotina", escolha "Fechar o dia", a data e um motivo, e clique em "Fechar este dia". Atenção: o dia fechado vale só para a agenda de quem está usando o sistema, e não para a clínica toda. Para fechar a agenda de outro gerente ou administrador, ele precisa entrar com a própria conta e fazer o mesmo. "Abrir para atendimento" faz o contrário: abre um dia fora da jornada, como um sábado. "Repetir toda semana até" fecha o mesmo dia da semana até a data escolhida.
6. **O dia na lista** — O dia entra na lista logo abaixo, com "o dia todo" e o motivo. Nesse dia, a agenda deixa de oferecer horários; o que já estava marcado continua marcado, para você decidir o que fazer com cada um. "Reabrir" desfaz o fechamento.

