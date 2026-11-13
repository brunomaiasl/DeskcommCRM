# Chamadas

- **Tela:** `/app/calls`
- **Resumo:** O histórico das ligações por telefone que a IA de voz fez e recebeu, com a conversa escrita de cada uma.
- **Fonte:** `curso/licoes/chamadas.json`

## Conhecendo a tela de Chamadas

**Objetivo:** Saber onde fica o histórico de ligações, o que cada linha mostra e para que serve o botão Nova ligação.

**Quem pode:** manager

**Palavras de busca:** chamadas, ligações, histórico de ligações, ligação perdida, ligação não atendida, telefone, voz por ia, ia que liga

1. **Onde fica a tela** — Chamadas não aparece direto no menu lateral. No grupo "CRM" do menu, clique em "Ver tudo em CRM". Na parte "O dia a dia da venda" está o cartão "Chamadas". O caminho completo é: CRM › Ver tudo em CRM › Chamadas.
   - Rota: `/app/crm`
2. **Uma linha para cada ligação** — Aqui ficam as ligações por telefone da clínica, a mais recente em cima. Cada linha é uma ligação: o dia e a hora, a direção ("Entrada" quando o paciente ligou, "Saída" quando a clínica ligou), o número do paciente em "Quem é", como terminou, quem atendeu e quanto tempo durou. Em "Atendido por", "IA" quer dizer que a IA de voz conduziu a conversa sozinha.
   - Rota: `/app/calls`
3. **Como cada ligação terminou** — A coluna "Status" diz o que aconteceu. "Concluída" é uma conversa que foi até o fim. "Não atendida" é uma ligação que tocou e ninguém atendeu: vale retornar para esse paciente. "Ocupado" quer dizer que a linha do outro lado estava em uso. Quando ninguém conversou, a duração aparece como "—".
4. **Pedir para a IA ligar** — "Nova ligação", no alto da tela, abre esta janela. Digite o número em "Número" e clique em "Ligar com IA": a IA de voz liga para o paciente e conduz a conversa. O botão só acende depois de pelo menos 8 dígitos. Por enquanto não dá para você mesmo falar na ligação, só a IA. Para desistir, aperte Esc ou clique fora da janela.

## Ler o que foi conversado

**Objetivo:** Abrir uma ligação e ler, por escrito, o que a IA e o paciente disseram.

**Quem pode:** manager

**Palavras de busca:** transcrição da ligação, o que a ia falou no telefone, conversa da ligação, gravação da ligação, sem transcrição

1. **Abrir uma ligação** — Para ver o que foi conversado numa ligação, clique na linha dela. Esta foi uma ligação recebida que a IA atendeu e que terminou com uma consulta marcada.
   - Rota: `/app/calls`
2. **A conversa por escrito** — A janela mostra, no alto, com quem foi a ligação, o dia, a direção e como terminou. Embaixo vem a conversa inteira, por escrito, na ordem em que foi falada. Os balões cinza, à esquerda, são a IA; os coloridos, à direita, são o paciente. É assim que você confere o que a IA prometeu sem ter de ouvir nada. Para fechar, aperte Esc ou clique fora da janela.
3. **Ligação sem conversa** — Uma ligação que ninguém atendeu, ou que deu ocupado, não tem conversa para mostrar. A janela avisa "Sem transcrição pra esta chamada.". Nesse caso, o que vale é o horário e o número: use-os para retornar a ligação.

