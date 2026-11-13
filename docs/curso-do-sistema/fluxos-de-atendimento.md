# Fluxos de atendimento

- **Tela:** `/app/ai/atendimento`
- **Resumo:** Roteiros de perguntas que a IA faz durante a conversa, uma de cada vez, guardando cada resposta na ficha do cliente.
- **Fonte:** `curso/licoes/fluxos-de-atendimento.json`

## Conhecendo os Fluxos de atendimento

**Objetivo:** Achar a tela, entender o que é um roteiro de perguntas e ler o cartão de cada um.

**Quem pode:** manager

**Palavras de busca:** fluxo de atendimento, roteiro de perguntas, cadastro pelo whatsapp, ia fazer perguntas ao cliente, coletar cpf, perguntas da primeira consulta

1. **Onde fica a tela** — Fluxos de atendimento não aparece direto no menu lateral. No grupo "Agente de IA" do menu, clique em "Ver tudo em IA". Na parte "Montar o agente" está o cartão "Fluxos de atendimento". O caminho completo é: Agente de IA › Ver tudo em IA › Fluxos de atendimento.
   - Rota: `/app/ai`
2. **Para que serve um fluxo de atendimento** — Um fluxo de atendimento é um roteiro de perguntas que a IA segue durante a conversa no WhatsApp. Ela pergunta uma coisa por vez, entende a resposta e guarda o dado na ficha do cliente. Na Clínica Bem Viver, um roteiro faz o cadastro de quem vai à primeira consulta, e outro confere a carteirinha do convênio.
   - Rota: `/app/ai/atendimento`
3. **O cartão de um roteiro** — Cada roteiro é um cartão. No alto ficam o nome e o selo da situação. "Ativo" quer dizer publicado: a IA já usa o roteiro nas conversas. "Rascunho" quer dizer que ele ainda não foi publicado e não faz pergunta nenhuma. "Versão: publicada" aparece quando o roteiro já foi publicado ao menos uma vez.
4. **O guia rápido** — Em dúvida, clique em "Como usar os fluxos de atendimento (guia rápido)". Ele explica, em poucas linhas, como montar o roteiro e como a IA se comporta: ela só grava o que o cliente escreveu, não pergunta de novo o que ele já respondeu e para quando uma pessoa da equipe assume a conversa.

## Lendo um roteiro no construtor

**Objetivo:** Abrir um roteiro e entender o Início, as Perguntas e o Fim.

**Quem pode:** manager

**Palavras de busca:** palavra-gatilho, pergunta do roteiro, tipo da resposta, o que fazer ao concluir, construtor do fluxo de atendimento

1. **O construtor** — Clique no cartão de um roteiro para abrir o construtor. À esquerda, em "Adicionar nó", ficam as quatro peças de um roteiro: "Gatilho" (o Início), "Pergunta", "Skill" (um procedimento da clínica que a IA usa naquele passo) e "Fim". No meio fica o roteiro, lido da esquerda para a direita.
   - Rota: `/app/ai/atendimento/f1c00100-0000-4000-8000-000000000001`
2. **O Início e as palavras-gatilho** — Clique no "Início" para ver quando o roteiro começa. Em "Palavras-gatilho" ficam as palavras que ligam o roteiro sozinho: quando a mensagem do cliente tem uma delas, como "primeira consulta", a IA começa a perguntar. Ele também pode começar quando o card do cliente entra numa etapa do funil escolhida logo abaixo, ou por um roteador em IA › Roteadores.
3. **Quanto tempo o roteiro espera** — Mais abaixo, "Máximo de tentativas por pergunta" diz quantas vezes a IA repete uma pergunta sem resposta antes de desistir dela. Desistir de uma pergunta não trava o roteiro. "Encerrar o roteiro depois de quantas horas sem resposta" fecha o roteiro de quem sumiu: aqui, 48 horas. Em branco, são 72 horas.
4. **Uma pergunta** — Clique numa "Pergunta". Em "Pergunta" fica o que a IA deve perguntar. Em "Chave do campo" fica o nome curto onde a resposta é guardada na ficha do cliente. Em "Tipo da resposta" você diz o que esperar: texto, número, data, sim ou não, uma escolha numa lista, ou CPF, que já confere se o número é válido.
5. **Uma pergunta com opções** — Na pergunta do convênio, o tipo é "Escolha numa lista". Em "Opções" ficam as respostas aceitas, separadas por vírgula. A IA só grava uma resposta que esteja na lista.
6. **O Fim** — Clique no "Fim". Em "Ao concluir, o que fazer" você escolhe o que acontece quando o cliente responde tudo: nada, devolver à IA com uma orientação, chamar uma skill ou começar outro roteiro. Aqui, a IA agradece e oferece os horários livres da semana.

## Criar e publicar um roteiro

**Objetivo:** Dar nome a um roteiro novo e publicar um rascunho para a IA começar a usá-lo.

**Quem pode:** manager

**Palavras de busca:** criar fluxo de atendimento, novo roteiro, publicar roteiro, rascunho do fluxo

1. **Dar nome ao roteiro** — Clique em "Novo fluxo de atendimento" e escreva um nome em "Nome" que diga para que o roteiro serve. Clique em "Criar fluxo". Ele nasce como rascunho, e o cartão dele aparece na lista. No construtor, você põe as peças e liga cada uma na próxima, do Início ao Fim.
   - Rota: `/app/ai/atendimento`
2. **Um rascunho pronto para publicar** — Este roteiro, "Convênio · conferir a carteirinha", está como "Rascunho". Ele pergunta o número e a validade da carteirinha. "Salvar" guarda as mudanças sem publicar. Para a IA começar a usar o roteiro, clique em "Publicar".
   - Rota: `/app/ai/atendimento/f1c00100-0000-4000-8000-000000000002`
3. **Publicado** — Ao publicar, o sistema confere o roteiro inteiro. Se faltar algo, a peça com problema fica com a borda vermelha e o roteiro não é publicado. Deu certo: o selo virou "Ativo". Na próxima conversa em que o cliente falar "carteirinha", a IA começa a perguntar. As respostas aparecem na ficha do cliente.

