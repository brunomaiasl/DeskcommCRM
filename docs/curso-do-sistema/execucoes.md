# Execuções

- **Tela:** `/app/ai/runs`
- **Resumo:** Tudo o que a IA fez, uma linha por vez — e, quando algo falhou, o que o cliente viveu, o que fazer e a mensagem original do provedor.
- **Fonte:** `curso/licoes/execucoes.json`

## Conhecendo a tela de Execuções

**Objetivo:** Saber onde fica a tela, ler o resumo que responde se está tudo bem e entender uma execução que deu certo.

**Quem pode:** manager

**Palavras de busca:** execuções, execuções de ia, o que a ia fez, a ia parou de responder, falha da ia, log da ia, tokens e custo por resposta

1. **Onde fica a tela** — Execuções não aparece direto no menu lateral. No grupo "Agente de IA" do menu, clique em "Ver tudo em IA". Na parte "Acompanhar o agente" está o cartão "Execuções". O caminho completo é: Agente de IA › Ver tudo em IA › Execuções.
   - Rota: `/app/ai`
2. **O resumo responde primeiro** — Cada vez que a IA trabalha (responde um cliente, identifica a etapa de um negócio) vira uma linha nesta tela. Ela existe para responder uma pergunta: "a IA parou de responder, o que aconteceu?". Por isso abre pelo resumo. Quando nada falhou, ele diz "Nenhuma falha". Aqui ele diz quantas das últimas execuções falharam e, embaixo, o que fazer para cada motivo, com quantas vezes cada um aconteceu.
   - Rota: `/app/ai/runs`
3. **Uma execução que deu certo** — Logo abaixo vem a lista, da mais nova para a mais antiga. No alto de cada cartão está o que a IA fez (aqui, "Responder o cliente") e, à direita, o provedor e o modelo usados. Embaixo, quantos tokens (pedaços de texto) a IA leu e escreveu, quanto tempo levou e quanto custou, em dólar. Na última linha, a data e por que esse modelo foi o escolhido.

## Entendendo uma falha

**Objetivo:** Ler o que aconteceu numa execução que falhou, o que fazer a respeito, e filtrar só as falhas.

**Quem pode:** manager

**Palavras de busca:** execução falhou, chave recusada, provedor fora do ar, mensagem técnica do provedor, ver só as falhas, por que a ia não respondeu

1. **Um cartão de falha** — Uma execução que falhou ganha borda vermelha e o selo "falhou". O cartão conta três coisas, nesta ordem. "O que aconteceu" diz o que o cliente viveu: aqui, ele mandou mensagem e ninguém respondeu. "O que fazer" diz o caminho: neste caso, o provedor não aceitou a chave da IA, e é preciso conferir em Credenciais se ela ainda vale.
   - Rota: `/app/ai/runs`
2. **A mensagem técnica** — Só no fim vem "Mensagem técnica do provedor", fechada. Clique para abrir: é o texto original que o provedor de IA devolveu, com o código do erro. Você não precisa entender essa parte; ela serve para quem for investigar, como o suporte de quem instalou o sistema.
3. **Ver só as falhas** — O botão "Ver só as falhas" esconde o que deu certo e deixa na lista apenas as execuções que falharam. Ligado, ele passa a dizer "Mostrando só as falhas"; clique de novo para ver tudo. Aqui ficam três: duas vezes o provedor esteve fora do ar ou demorou demais (costuma se resolver sozinho) e uma vez a chave foi recusada.

