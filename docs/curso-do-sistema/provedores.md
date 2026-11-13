# Provedores

- **Tela:** `/app/ai/providers`
- **Resumo:** Onde você vê qual inteligência artificial atende cada parte do sistema, troca o modelo de uma parte e liga o Jev, a IA das decisões rápidas.
- **Fonte:** `curso/licoes/provedores.json`

## Conhecendo a tela de Provedores

**Objetivo:** Achar a tela, entender o que é o modelo padrão e como a tela agrupa as partes do sistema que usam IA.

**Quem pode:** manager

**Palavras de busca:** provedor de ia, qual ia o sistema usa, trocar o modelo, modelo padrão, claude ou gpt, onde configuro a inteligência artificial

1. **Onde fica a tela** — Provedores não aparece direto no menu lateral. No grupo "Agente de IA" do menu, clique em "Ver tudo em IA". Na parte "Montar o agente" está o cartão "Provedores". O caminho completo é: Agente de IA › Ver tudo em IA › Provedores.
   - Rota: `/app/ai`
2. **Para que serve a tela** — O sistema usa inteligência artificial em vários lugares: para responder o cliente, para perceber se ele está irritado, para resumir uma conversa longa e outros. Cada empresa de IA é um provedor, como a Anthropic (Claude) ou a OpenAI (GPT). Esta tela mostra qual provedor e qual modelo atende cada lugar, e deixa trocar.
   - Rota: `/app/ai/providers`
3. **O modelo padrão** — O "Modelo padrão" vale para toda parte que ninguém configurou à parte. A frase do cartão diz quantas partes seguem o padrão hoje. Em "Provedor" fica a empresa de IA, e em "Modelo", qual modelo dela. Trocar aqui muda todas essas partes de uma vez.
4. **As partes, agrupadas pelo que fazem** — Mais abaixo, as partes que usam IA vêm em grupos, pelo que cada uma faz: "Atender o cliente", "Entender a conversa", "Proteger a operação" e outros. Cada grupo diz, em "Usando:", quais modelos atendem as partes dele. Se uma parte precisa de atenção, aparece uma frase em amarelo. "Configuração avançada" abre o grupo para ver cada parte sozinha.

## Trocar a IA de uma parte do sistema

**Objetivo:** Abrir uma parte, entender o que acontece se ela falhar e escolher outro provedor, modelo e chave só para ela.

**Quem pode:** admin

**Palavras de busca:** modelo diferente para uma tarefa, trocar o modelo de uma parte, configuração avançada da ia, se falhar, modelo mais barato

1. **Abrir uma parte** — No grupo "Entender a conversa", clique em "Configuração avançada". Cada parte vira um cartão. Este é "Medir o clima da conversa", a parte que percebe se o cliente está satisfeito ou irritado. À direita ficam o modelo que atende hoje e de onde veio essa escolha.
   - Rota: `/app/ai/providers`
2. **O que acontece se falhar** — A faixa cinza "Se falhar:" conta o que você vai notar no dia a dia se esta parte parar. Aqui: cliente irritado deixa de ser passado para uma pessoa. É o que ajuda a decidir se vale pôr um modelo mais forte ou se um mais barato dá conta.
3. **Escolher provedor, modelo e chave** — Em "Provedor", escolha a empresa de IA. Em "Modelo", o modelo dela. Em "Chave", qual das chaves cadastradas em Credenciais paga esta parte: em branco, vale a chave da instalação. Depois, clique em "Salvar". A troca vale só para esta parte; as outras continuam como estavam.
4. **A resposta ao cliente vem do agente** — No grupo "Atender o cliente", a parte "Responder o cliente" não tem os campos de troca. Ela usa o modelo escolhido no próprio agente, na versão publicada dele. Para trocar, clique em "Configurar no agente".

## Ligar o Jev, a IA das decisões rápidas

**Objetivo:** Entender o que o Jev faz, de onde pegar a chave dele e como colá-la no sistema.

**Quem pode:** admin

**Palavras de busca:** jev, typesafe, cliente irritado, decisões rápidas, chave do jev, ligar o jev

1. **O cartão do Jev** — O Jev não conversa com o cliente. Ele só toma decisões pequenas e rápidas, como perceber se o cliente está irritado, geralmente em menos de um segundo, e trabalha junto com a sua IA principal. O selo no canto diz a situação: aqui, "Desligado". O aviso amarelo vale para clínicas: as mensagens que o Jev lê podem ter dado de saúde, que a LGPD trata como sensível.
   - Rota: `/app/ai/providers`
2. **De onde o Jev responde** — Em "De onde o Jev responde", escolha o caminho. "TypeSafe AI (chave própria)" usa uma conta só para o Jev, na TypeSafe. "OpenRouter" reaproveita a chave da OpenRouter que a empresa já usa na conversa, sem segunda conta. A frase embaixo explica o caminho escolhido.
3. **Pegar a chave** — O Jev é pago à parte, numa conta da TypeSafe AI: cada mensagem medida custa uma fração de centavo de dólar, cobrada lá. Clique em "Pegar a chave na TypeSafe", crie a conta, ponha crédito e copie a chave. Ela começa com "apikey_".
4. **Colar a chave** — De volta aqui, clique em "Colar a chave". Abre o mesmo formulário da tela Credenciais, já com "Jev (TypeSafe AI)" escolhido em "Provedor". Dê um nome e cole a chave em "Chave"; ela aparece como bolinhas. Clique em "Salvar e validar": o sistema guarda a chave e confere com a TypeSafe se ela vale.

