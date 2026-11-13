# Comandas

- **Tela:** `/app/comandas`
- **Resumo:** O balcão da clínica: cada comanda junta o que foi feito no atendimento, quanto o paciente paga e como pagou.
- **Fonte:** `curso/licoes/comandas.json`

## Conhecendo o balcão

**Objetivo:** Saber onde ficam as comandas, ler a lista e abrir uma comanda para ver o que foi cobrado.

**Quem pode:** agent

**Palavras de busca:** comanda, comandas, balcão, conta do paciente, o que o paciente pagou, comanda finalizada, comanda cancelada

1. **Onde fica a tela** — Comandas não aparece direto no menu lateral. No grupo "CRM" do menu, clique em "Ver tudo em CRM". Na parte "O dia a dia da venda" está o cartão "Comandas". O caminho completo é: CRM › Ver tudo em CRM › Comandas.
   - Rota: `/app/crm`
2. **A lista do balcão** — À esquerda fica a lista de comandas, a mais nova em cima. Cada linha mostra o número, a situação e o valor. "Aberta" ainda está recebendo itens. "Finalizada" já foi paga. "Cancelada" foi desfeita antes de ser paga. À direita aparece a comanda que você escolher na lista. Para começar uma comanda do zero, use "Nova comanda".
   - Rota: `/app/comandas`
3. **Por dentro de uma comanda** — Clique numa comanda para abri-la. No alto vêm o número e a situação. Embaixo, cada linha é um item cobrado, com o valor, e no fim vem o total. Esta já foi finalizada: ninguém muda mais os itens, e o dinheiro já entrou na conta da forma de pagamento escolhida.

## Lançar itens e fechar a comanda

**Objetivo:** Acrescentar um serviço a uma comanda aberta, conferir o total e fechar com a forma de pagamento.

**Quem pode:** agent

**Palavras de busca:** lançar na comanda, incluir item na comanda, fechar comanda, finalizar comanda, forma de pagamento, cancelar comanda, forma de pagamento sem conta de destino

1. **Abrir a comanda do atendimento** — A comanda #43 está aberta: o paciente fez a sessão de fisioterapia e ainda está no balcão. Clique nela para abrir.
   - Rota: `/app/comandas`
2. **O que já foi lançado** — A comanda mostra o que já foi lançado e o total até agora. Como ela ainda está aberta, aparecem embaixo os campos para lançar mais um item. Em "Serviço", escolha um serviço da clínica, ou deixe "Avulso" para lançar algo que não é um serviço cadastrado, como um produto vendido no balcão.
3. **Lançar um serviço** — Escolhendo "Aula de pilates", a "Descrição" e o "Valor" se preenchem sozinhos com o nome e o preço do serviço. Os dois podem ser mudados antes de incluir, por exemplo para dar um desconto. Com "Avulso", você escreve os dois. Depois, clique em "Incluir".
4. **O total muda na hora** — A aula de pilates entrou na lista e o total já soma os dois itens. Lançou errado? Enquanto a comanda estiver aberta, o "×" no fim da linha tira o item.
5. **Fechar a comanda** — Na hora de pagar, escolha em "Forma de pagamento" como o paciente pagou e clique em "Finalizar". O dinheiro entra na conta ligada a essa forma (o Pix cai na conta do banco) e a comanda não muda mais. Se a forma escolhida ainda não tiver conta, aparece em vermelho: "Esta forma de pagamento ainda não tem conta de destino. Defina em Configurações › Financeiro.", e a comanda não fecha até você definir.

## Cobrar os atendimentos que ficaram sem comanda

**Objetivo:** Conferir os atendimentos da agenda que já aconteceram e ninguém cobrou, e faturar vários de uma vez.

**Quem pode:** agent

**Palavras de busca:** atendimentos sem comanda, faturar atendimentos, faturar em lote, esqueceram de cobrar, sem preço no serviço, cobrar sessões da agenda

1. **O que ninguém cobrou** — Embaixo da lista fica "Atendimentos sem comanda": os atendimentos da agenda dos últimos 30 dias que já aconteceram, não foram cancelados nem tiveram falta, e ainda não viraram comanda. Nada vem marcado: você confere e marca o que vai cobrar. O atendimento de um serviço sem preço aparece com o aviso "sem preço no serviço" e não pode ser marcado. Abra uma comanda à mão para ele, ou ponha o preço no serviço em Configurações › Tipos de agendamento.
   - Rota: `/app/comandas`
2. **Faturar de uma vez** — Marque os atendimentos que vai cobrar e escolha a forma de pagamento. O botão "Faturar" mostra a soma do que está marcado. Ao clicar, o sistema abre e fecha uma comanda para cada atendimento, com o preço do serviço. Confira antes: não dá para desfazer tudo de uma vez. Cada comanda errada precisa ser estornada, uma por uma, por um gerente.

