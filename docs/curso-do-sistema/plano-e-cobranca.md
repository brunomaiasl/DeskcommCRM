# Plano e cobrança

- **Tela:** `/app/settings/billing`
- **Resumo:** Onde você vê o plano da sua empresa, quanto dele já usa, a situação do pagamento, e onde troca de plano ou cancela a assinatura.
- **Fonte:** `curso/licoes/plano-e-cobranca.json`

## Conhecendo seu plano

**Objetivo:** Achar a tela, ler o plano contratado, a situação do pagamento e quanto do plano a empresa já usa.

**Quem pode:** admin

**Palavras de busca:** meu plano, plano e cobrança, assinatura, mensalidade, quanto eu pago, limite do plano, faturas, pagamento do sistema

1. **Onde fica a tela** — Abra "Configurações", no rodapé do menu lateral. Na parte "Sua empresa" está o cartão "Plano e cobrança". Clique nele.
   - Rota: `/app/settings`
2. **Seu plano e a situação do pagamento** — O quadro "Seu plano" mostra o nome do plano que a sua empresa assina e quanto ele custa por mês (ou por ano, se o plano for anual). Logo abaixo vem a situação do pagamento em poucas palavras. "Em dia" quer dizer que está tudo pago. Quando algo muda, a frase muda junto: "Em atraso desde" uma data, "Cancelada, acesso até" uma data, ou "Teste grátis até" uma data.
3. **Quanto do plano você já usa** — Embaixo, três linhas comparam o que a empresa usa com o limite do plano. "Pessoas" conta quem tem acesso ao sistema. "Números conectados" conta os canais cadastrados em Conexões que não foram excluídos, mesmo os que estão desconectados no momento. "Uso de IA no mês" mostra quanto todas as funções de inteligência artificial do sistema gastaram neste mês, em dólar, e volta a zero no começo de cada mês. Quando um plano não tem limite, aparece "sem limite".
4. **Trocar o cartão e ver as faturas** — O botão "Gerenciar pagamento" leva você, nesta mesma aba, à página da empresa que faz a cobrança. Lá você troca o cartão de crédito e vê as faturas. Ao terminar, ela traz você de volta. A troca de plano não fica lá: ela é feita aqui mesmo, no botão "Trocar de plano". Se a cobrança da sua empresa é por boleto ou Pix (Asaas), esse botão não aparece: a fatura chega por um link.

## Trocar de plano

**Objetivo:** Comparar o plano atual com outro, ver quanto custa subir de plano e o que acontece ao descer.

**Quem pode:** admin

**Palavras de busca:** trocar de plano, mudar plano, plano maior, aumentar limite de pessoas, fazer upgrade, plano mais barato, diminuir plano

1. **Abrir a troca** — Na tela "Plano e cobrança", clique em "Trocar de plano". Abre um quadro logo abaixo dos botões, e o botão some enquanto o quadro está aberto. Para desistir, saia da tela sem confirmar.
   - Rota: `/app/settings/billing`
2. **Comparar os planos lado a lado** — Em "Novo plano", escolha o plano que você quer. Aqui escolhemos "Clínica Completa". Logo abaixo, o plano atual e o novo aparecem lado a lado, com o preço e os limites de pessoas, de números conectados e de IA por mês. Só aparecem os outros planos que quem administra o sistema oferece, com a mesma forma de cobrança (mensal ou anual) do plano de hoje.
3. **Subir de plano: o valor proporcional** — Quando o plano novo é mais caro, a tela já mostra uma estimativa do ajuste: a diferença de preço só pelos dias que faltam até a próxima renovação. A data da renovação não muda. Ao confirmar, abre o pagamento desse ajuste (no boleto/Pix, aparece o botão "Abrir a fatura"). Os limites novos passam a valer depois que o pagamento é confirmado. Até lá, ficam os limites de hoje.
4. **Descer de plano: vale na renovação** — Escolha agora um plano mais barato, como o "Essencial". A troca para baixo não cobra nada hoje: o plano novo e os limites dele passam a valer na próxima renovação, e a fatura atual continua com o mesmo valor e a mesma data. Depois de confirmar, o quadro "Seu plano" mostra "Novo plano a partir de" com a data e o nome do plano.

## Cancelar a assinatura

**Objetivo:** Saber onde se cancela a assinatura e o que acontece com o acesso depois.

**Quem pode:** admin

**Palavras de busca:** cancelar assinatura, cancelar plano, parar de pagar, encerrar contrato do sistema, reembolso, até quando tenho acesso

1. **O botão de cancelar** — Na tela "Plano e cobrança", o último botão da fileira é "Cancelar assinatura". Clicar nele ainda não cancela nada: só abre a confirmação.
   - Rota: `/app/settings/billing`
2. **Leia antes de confirmar** — A confirmação avisa: você continua usando o sistema até o fim do período que já pagou, e não há devolução do valor proporcional. Só depois de clicar em "Confirmar cancelamento" o pedido vai para a empresa que faz a cobrança. Se mudar de ideia, basta sair da tela sem clicar.
3. **Depois de cancelar** — A foto mostra a tela antes do cancelamento. Depois que você confirma, a tela diz até que dia mantém o acesso, e a frase da situação, que hoje diz "Em dia", passa a dizer "Cancelada, acesso até" essa data. Até lá, os administradores veem uma faixa no alto do sistema: "Sua assinatura termina em" e a data. Os botões "Trocar de plano" e "Cancelar assinatura" deixam de aparecer.
   - Rota: `/app/settings/billing`

