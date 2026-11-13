# Propostas da IA

- **Tela:** `/app/ai/proposals`
- **Resumo:** Os próximos passos que a IA sugere para cada negócio aberto, numa lista só, esperando alguém da equipe aprovar ou ignorar.
- **Fonte:** `curso/licoes/propostas-da-ia.json`

## Conhecendo as Propostas da IA

**Objetivo:** Saber onde ficam as sugestões de próximo passo da IA e o que cada linha da lista mostra.

**Quem pode:** agent

**Palavras de busca:** propostas da ia, próximo passo sugerido, sugestão da ia, próxima ação, o que a ia sugere fazer, aguardando decisão

1. **Onde fica a tela** — Propostas da IA não aparece direto no menu lateral. No grupo "Agente de IA" do menu, clique em "Ver tudo em IA". Na parte "Acompanhar o agente" está o cartão "Propostas". O caminho completo é: Agente de IA › Ver tudo em IA › Propostas.
   - Rota: `/app/ai`
2. **Para que serve** — Enquanto conversa com os clientes, a Bia, a IA da clínica, anota qual deveria ser o próximo passo de cada negócio: ligar, pedir um documento, confirmar um horário. Ela não faz isso sozinha; sugere, e alguém da equipe decide. A mesma sugestão aparece no cartão do negócio no funil, mas aqui ficam todas juntas, para nenhuma ficar esquecida. A aba "Aguardando decisão" mostra quantas esperam, e as mais antigas vêm primeiro.
   - Rota: `/app/ai/proposals`
3. **Lendo uma sugestão** — Cada linha começa pelo nome do negócio, seguido do cliente, da etapa do funil em que ele está e de há quanto tempo a IA fez a sugestão. Logo abaixo vem o próximo passo, com as palavras da IA. Aqui a Bia sugere confirmar com a Fernanda o retorno de quinta com o Dr. Paulo.

## Aprovando ou ignorando uma sugestão

**Objetivo:** Decidir uma sugestão da IA e conferir a decisão no histórico.

**Quem pode:** agent

**Palavras de busca:** aprovar proposta da ia, ignorar sugestão, recusar sugestão da ia, já decididas, histórico de decisões

1. **Aprovar ou Ignorar** — Embaixo de cada sugestão há dois botões. "Aprovar" diz que a equipe concorda com o próximo passo. "Ignorar" diz que ele não serve. Os dois ficam registrados no histórico do negócio: ignorar também é uma decisão, não um esquecimento. Quem tem só permissão de leitura vê a lista, mas os botões ficam apagados.
   - Rota: `/app/ai/proposals`
2. **A sugestão sai da lista** — Ao aprovar, a sugestão da Fernanda sai da lista e o número da aba "Aguardando decisão" diminui. Ela também some do cartão do negócio no funil. Aprovar não manda nada ao cliente: quem faz o que foi combinado é a equipe. Para ver o que já foi decidido, abra a aba "Já decididas".
3. **As decisões ficam registradas** — A aba "Já decididas" mostra cada decisão, da mais nova para a mais antiga, com o selo "Aprovada" ou "Ignorada", o negócio, quem decidiu e quando. No topo está a que você acabou de aprovar. Mais abaixo, uma sugestão que a Ana ignorou: oferecer à Juliana o pacote de 10 sessões.

