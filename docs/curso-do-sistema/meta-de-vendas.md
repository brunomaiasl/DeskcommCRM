# Meta de vendas

- **Tela:** `/app/settings/metas`
- **Resumo:** Dizer quantas vendas a clínica quer fechar no mês, para a tela de Desempenho mostrar quanto já foi feito e quanto falta.
- **Fonte:** `curso/licoes/meta-de-vendas.json`

## Definindo a meta do mês

**Objetivo:** Achar a tela Meta de vendas, entender os dois campos e salvar a meta do mês.

**Quem pode:** admin

**Palavras de busca:** meta de vendas, meta do mês, definir meta, quanto quero vender no mês, objetivo de vendas, alvo de vendas da equipe, cadastrar meta mensal

1. **Onde fica a tela** — Clique em "Configurações", no rodapé do menu lateral. Na parte "Sua empresa" fica o cartão "Meta de vendas". É ali que você diz quantas vendas a clínica quer fechar no mês. A tela de Desempenho usa esse número para mostrar quanto já foi feito e quanto falta.
   - Rota: `/app/settings`
2. **As partes da tela** — No alto, o título e a frase logo abaixo dele explicam para que serve a meta. No meio fica o quadro com os dois campos e o botão "Salvar meta". Embaixo, uma nota avisa o que entra na conta: a meta é da clínica inteira e conta a quantidade de vendas ganhas no mês, e não o valor delas.
3. **Preenchendo os campos** — O campo "Mês" já vem no mês atual: a meta vale do dia 1º ao último dia dele. Em "Vendas ganhas no mês", digite quantos negócios a clínica quer fechar como ganhos. Aqui a Helena digitou 20. Use um número inteiro maior que zero: com o campo vazio ou em zero, o botão "Salvar meta" fica apagado. Embaixo do número, a frase "Ainda não há meta para este mês." confirma que este mês ainda não tem meta salva.
4. **Salvando a meta** — Clique em "Salvar meta". Um aviso rápido, "Meta salva.", pisca por alguns segundos no canto de baixo da tela (some sozinho), e a frase embaixo do número muda para "Salvar de novo corrige a meta deste mês — nada é duplicado.". A partir de agora a tela de Desempenho mostra o progresso da clínica contra essas 20 vendas.

## Acompanhando e corrigindo a meta

**Objetivo:** Ver no Desempenho quanto da meta já foi feito e corrigir o número quando o plano do mês mudar.

**Quem pode:** admin

**Palavras de busca:** acompanhar meta de vendas, quanto falta para a meta, percentual da meta, progresso das vendas do mês, mudar a meta, corrigir meta do mês, meta no desempenho

1. **Quando ainda não há meta** — Abra "Desempenho", no grupo Análise do menu, e desça até o quadro "Meta do mês". Sem meta cadastrada, ele diz "Nenhuma meta cadastrada para este mês." e não mostra zero: a clínica pode ter vendido, só não tem alvo. O link "Definir a meta" leva direto à tela de cadastro.
   - Rota: `/app/metrics`
2. **Cadastrando pelo atalho** — O link abre a tela Meta de vendas. A Helena digitou 20 em "Vendas ganhas no mês" e clicou em "Salvar meta". O aviso "Meta salva." pisca no canto de baixo e some sozinho, e a frase embaixo do número passa a dizer que salvar de novo corrige a meta.
3. **Lendo o progresso** — De volta ao Desempenho, o quadro mostra o mês ao lado do título e, na linha "Empresa", quanto da meta já foi feito: "45% da meta". A barra enche conforme as vendas entram. Embaixo, "9 de 20 Vendas ganhas" e "Faltam 11 para a meta". Quando a meta é batida, a barra fica verde e a frase vira "Meta atingida.".
   - Rota: `/app/metrics`
4. **Corrigindo a meta** — O plano mudou? Volte em Configurações, "Meta de vendas". O campo já mostra a meta atual. Troque o número e clique em "Salvar meta" de novo: pisca o aviso "Meta salva.", que some sozinho, e a meta do mês é corrigida, sem criar outra. Aqui a Helena baixou de 20 para 15, porque uma fisioterapeuta entrou de férias. Uma meta não pode ser apagada, só corrigida.
   - Rota: `/app/settings/metas`
5. **O progresso com a meta nova** — No Desempenho, o quadro já usa a meta nova: as mesmas 9 vendas agora são "60% da meta", e "Faltam 6 para a meta". Se ainda aparecer o número antigo, recarregue a página.
   - Rota: `/app/metrics`

