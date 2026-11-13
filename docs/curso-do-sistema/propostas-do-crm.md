# Propostas do dia a dia

- **Tela:** `/app/proposals`
- **Resumo:** Onde a equipe cria, revisa e envia as propostas para os pacientes, confere os rascunhos que a IA preparou e registra se o paciente aceitou ou recusou.
- **Fonte:** `curso/licoes/propostas-do-crm.json`

## Conhecendo a lista de propostas

**Objetivo:** Saber onde ficam as propostas da clínica e ler, em cada linha, o número, a situação e o valor.

**Quem pode:** agent

**Palavras de busca:** propostas, lista de propostas, orçamento para o paciente, proposta comercial, aguardando revisão, proposta que a ia fez, proposta aceita, proposta recusada

1. **Onde fica a tela** — Propostas não aparece direto no menu lateral. No grupo "CRM" do menu, clique em "Ver tudo em CRM". Na parte "Fechar a venda" está o cartão "Propostas". O caminho completo é: CRM › Ver tudo em CRM › Propostas.
   - Rota: `/app/crm`
2. **Primeiro o que espera por você** — Cada linha é uma proposta para um paciente. As que a IA preparou sozinha durante o atendimento vêm primeiro, com o selo "Aguardando revisão": ninguém da equipe olhou ainda, e nada foi enviado ao paciente. Depois vêm as outras, da mais nova para a mais antiga. Clique no título para abrir a proposta.
   - Rota: `/app/proposals`
3. **Número, situação e valor** — Em "Número", o rascunho aparece só como "Rascunho". A proposta ganha número quando é enviada, como "0007/2026 v1": o número, o ano e a versão. Em "Status" você vê em que pé ela está: "Enviada" espera a resposta do paciente, "Aceita" e "Recusada" já foram respondidas. "Valor" é o total da proposta.

## Criar uma proposta

**Objetivo:** Começar uma proposta nova a partir de um negócio do funil, com título, validade e condições.

**Quem pode:** agent

**Palavras de busca:** nova proposta, criar proposta, fazer orçamento, proposta para um negócio, validade da proposta, nenhum negócio elegível

1. **O botão Nova proposta** — Para começar uma proposta, clique em "Nova proposta", no alto da tela.
   - Rota: `/app/proposals`
2. **Escolher o negócio** — Toda proposta nasce de um negócio do funil que tenha um paciente ligado a ele. Em "Negócio (Lead)", a lista mostra cada negócio assim: o nome do negócio e, depois do traço, o paciente. A proposta fica guardada nesse negócio e vai para esse paciente. Se a lista estiver vazia, a tela avisa "Nenhum negócio elegível encontrado": antes, crie o negócio do paciente no funil.
3. **O título** — Escolhido o negócio da Fernanda, escreva em "Título da proposta" um nome que o paciente entenda. O título aparece para ele e na lista de propostas da clínica.
4. **Validade e condições** — "Validade da proposta" já vem com 15 dias a partir de hoje: é até quando o preço e as condições valem. Mude a data se quiser outro prazo. Em "Condições de pagamento / Observações", escreva como o paciente pode pagar e qualquer aviso importante. Este campo é opcional.
5. **Criar o rascunho** — Clique em "Criar e abrir editor". A proposta nasce como rascunho, sem nada enviado ao paciente, e o editor abre em seguida: é lá que você coloca os itens, os valores e o modelo do documento. Para desistir, clique em "Cancelar".

## Revisar, enviar e acompanhar

**Objetivo:** Revisar o rascunho que a IA preparou, entender o que falta para enviar e registrar a resposta do paciente.

**Quem pode:** agent

**Palavras de busca:** revisar proposta da ia, confirmar modelo da proposta, enviar proposta ao cliente, enviar proposta pelo whatsapp, itens da proposta, marcar proposta como aceita, paciente recusou a proposta, revisar proposta enviada

1. **O modelo sugerido pela IA** — Este é o rascunho que a IA preparou para a Mariana. No alto fica o título, que você pode mudar. Logo abaixo, o documento que o paciente vai receber depende de um modelo: a IA sugeriu um, mas quem decide é você. Clique em "Usar este modelo" para aceitar a sugestão, ou escolha outro na lista "Ou escolha outro modelo".
   - Rota: `/app/proposals/f1b00002-0000-4000-8000-000000000001`
2. **Os itens e o total** — Na tabela ficam os itens: a descrição, a quantidade ("Qtd"), o preço de cada um, o desconto e o subtotal. Aqui a IA colocou três consultas com a nutricionista. "+ Item à mão" acrescenta uma linha para você preencher. Em "Buscar produto no catálogo…" você procura um produto já cadastrado, que entra com o preço do catálogo. Item sem preço aparece como "A definir". O total, embaixo, soma tudo.
3. **Salvar e enviar** — Mudou alguma coisa? Clique em "Salvar", no fim da página. "Enviar ao cliente" manda a proposta pelo WhatsApp, na conversa do paciente. Ele fica apagado enquanto o modelo não for confirmado, e a tela avisa: "Escolha e confirme o modelo da proposta antes de enviar.". "Ver como o cliente recebe" mostra o documento como o paciente vai ver, sem enviar nada.
4. **Registrar a resposta do paciente** — Depois de enviada, a proposta não muda mais: os campos ficam travados. Quando o paciente responder, registre aqui. "Marcar como aceita" e "Marcar como recusada" guardam a resposta. Na recusa, o sistema pergunta o motivo, que é opcional. Se o paciente pedir uma mudança, "Revisar esta proposta" cria uma versão nova para você editar e enviar de novo.
   - Rota: `/app/proposals/f1b00002-0000-4000-8000-000000000002`

