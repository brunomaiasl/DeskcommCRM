# Tags

- **Tela:** `/app/settings/tags`
- **Resumo:** Onde você arruma as etiquetas da empresa: vê onde cada uma é usada, dá cor, corrige o nome, junta as repetidas e tira as que não servem mais.
- **Fonte:** `curso/licoes/tags.json`

## Conhecendo a tela de Tags

**Objetivo:** Achar a tela de Tags e entender o que cada número da lista diz sobre uma etiqueta.

**Quem pode:** admin

**Palavras de busca:** tags, etiquetas, onde ficam as etiquetas, lista de etiquetas, quantos clientes têm a etiqueta, marcadores dos clientes, organizar etiquetas

1. **Onde fica** — Clique em "Configurações", no rodapé do menu lateral, para abrir a lista de todas as configurações. "Tags" fica no grupo "Sua empresa". Clique no cartão para abrir a tela.
   - Rota: `/app/settings`
2. **Todas as etiquetas num lugar só** — Etiquetas são as marcas que ficam nos clientes, nos negócios do funil e nas conversas, como "convenio" ou "particular". Esta tela reúne todas as da empresa, em ordem alfabética: as que a equipe coloca à mão, as que as regras automáticas colocam e as que você cadastrou. Cada linha é uma etiqueta. Acima da lista aparece quantas existem e em que página você está; cada página mostra até 100.
   - Rota: `/app/settings/tags`
3. **Onde cada etiqueta está** — Os números de cada linha dizem onde a etiqueta aparece. "Contatos" conta os clientes que têm a etiqueta, "Leads" conta os negócios do funil e "Conversas" conta as conversas da Inbox. Aqui, "convenio" está em 3 clientes e em nenhum negócio ou conversa.
4. **A coluna que evita surpresa** — "Regras de agente" conta quantas regras automáticas da empresa têm a ação de colocar essa etiqueta, ligadas ou desligadas. Aqui, "aguardando-exame" tem 1. Enquanto uma regra dessas estiver ligada, ela coloca a etiqueta de novo toda vez que rodar, mesmo que você tenha tirado de todo mundo. Olhe esta coluna antes de mexer numa etiqueta.
5. **Cor, selo e botões** — As etiquetas coloridas, como "convenio", já foram cadastradas com uma cor. O selo "em uso, fora do vocabulário", como em "Fisio", marca as que estão em uso (em clientes, negócios, conversas ou numa regra) mas nunca foram cadastradas: alguém ou alguma regra escreveu, e pronto. No fim de cada linha ficam os botões "Cor", "Renomear", "Juntar" e "Excluir". Cada um abre um quadro logo abaixo da lista, e as próximas lições mostram um por um.

## Dar cor a uma etiqueta

**Objetivo:** Escolher a cor de uma etiqueta para achá-la de longe nas listas e nos filtros.

**Quem pode:** admin

**Palavras de busca:** cor da etiqueta, mudar cor da tag, pintar etiqueta, etiqueta colorida, destacar etiqueta, etiqueta cinza

1. **Uma etiqueta sem cor** — A etiqueta "pos-operatorio" está cinza e com o selo "em uso, fora do vocabulário". Uma cor ajuda a equipe a achar esses pacientes de longe. Clique em "Cor" na linha dela.
   - Rota: `/app/settings/tags`
2. **Oito cores para escolher** — Abaixo da lista abre o quadro da cor. São oito bolinhas de cor fixas, escolhidas para serem fáceis de distinguir e de ler. Na ordem: amarelo, âmbar, vermelho, verde-água, azul, índigo, roxo e cinza. Quem usa leitor de tela ouve o nome de cada uma. "Sem cor" tira a cor da etiqueta.
3. **Veja antes de salvar** — Clique numa bolinha, como a vermelha (a terceira). A "Prévia" mostra na hora como a etiqueta vai ficar, antes de salvar. Gostou? Clique em "Confirmar".
4. **Pronto, colorida** — A etiqueta ficou vermelha e o selo "em uso, fora do vocabulário" sumiu: dar cor também cadastra a etiqueta. A nova cor aparece onde a etiqueta aparece, como nas listas de conversas e de clientes e nos filtros.

## Corrigir o nome de uma etiqueta

**Objetivo:** Renomear uma etiqueta em todos os clientes e nas regras automáticas de uma vez só.

**Quem pode:** admin

**Palavras de busca:** renomear etiqueta, mudar nome da tag, corrigir nome da etiqueta, etiqueta escrita errada, trocar nome da etiqueta

1. **Um nome feio de ler** — A etiqueta "aguardando-exame" foi escrita com hífen e está em 2 clientes. Ela também tem 1 regra automática que a coloca sozinha. Para escrever do jeito certo, clique em "Renomear" na linha dela.
   - Rota: `/app/settings/tags`
2. **Digite o novo nome** — No quadro que abre abaixo da lista, escreva o nome novo no campo "Novo nome", aqui "Aguardando exame". Depois clique em "Confirmar".
3. **Trocado em todo lugar** — A linha agora se chama "Aguardando exame" e continua com os 2 clientes. A troca vale para todos os clientes, negócios e conversas que tinham a etiqueta. E a regra automática também passou a escrever o nome novo, então o nome antigo não volta.

## Juntar etiquetas repetidas

**Objetivo:** Achar duas etiquetas que querem dizer a mesma coisa e transformar as duas numa só.

**Quem pode:** admin

**Palavras de busca:** etiquetas repetidas, juntar etiquetas, tag duplicada, duas etiquetas iguais, unir tags, mesclar etiquetas

1. **Procure por um pedaço do nome** — Etiqueta repetida acontece: cada pessoa escreve de um jeito. Para achar as parecidas, digite um pedaço do nome no campo "Buscar etiquetas", aqui "fisio", e clique em "Buscar".
   - Rota: `/app/settings/tags`
2. **Duas grafias, uma ideia** — A busca achou "Fisio" e "fisioterapia". As duas querem dizer a mesma coisa, mas para o sistema são etiquetas diferentes: um filtro por "fisioterapia" deixa de fora quem foi marcado com "Fisio". Fique com a mais clara, "fisioterapia", e clique em "Juntar" na linha de "Fisio".
   - Rota: `/app/settings/tags?page=1&busca=fisio`
3. **Diga qual etiqueta fica** — No quadro que abre, escreva em "Etiqueta de destino" o nome exato da etiqueta que fica, "fisioterapia". Juntar só aceita uma etiqueta que já existe: se o nome não existir, a tela avisa e não deixa confirmar. Depois clique em "Confirmar".
   - Rota: `/app/settings/tags?page=1&busca=fisio`
4. **Agora é uma só** — "Fisio" sumiu da lista. Os 2 clientes que tinham "Fisio" passaram a ter "fisioterapia", que agora está em 4 clientes e manteve a cor roxa. Se alguma regra automática escrevesse "Fisio", ela também passaria a escrever "fisioterapia".
   - Rota: `/app/settings/tags?page=1&busca=fisio`

## Excluir uma etiqueta

**Objetivo:** Tirar de todos os clientes uma etiqueta que não serve mais, sem ser pego de surpresa por uma regra automática.

**Quem pode:** admin

**Palavras de busca:** excluir etiqueta, apagar tag, remover etiqueta de todos, etiqueta que não uso mais, tirar etiqueta

1. **Uma campanha que acabou** — A etiqueta "promo-julho" marcou quem veio por uma promoção que já terminou. Ela está em 2 clientes e nenhuma regra a coloca (a coluna "Regras de agente" mostra 0). Para tirá-la de todo mundo, use "Excluir" na linha dela.
   - Rota: `/app/settings/tags`
2. **Confira o que sai** — O quadro diz exatamente de onde a etiqueta vai sair: 2 clientes, nenhum negócio e nenhuma conversa. Excluir não tem volta, por isso o botão "Confirmar" fica vermelho. Os clientes continuam lá: só a etiqueta sai deles.
3. **Saiu da lista** — Depois de confirmar, "promo-julho" some da lista: a contagem no alto passa de 13 para 12 etiquetas.
4. **Quando uma regra ainda escreve** — Agora veja "Excluir" na "aguardando-exame". O quadro mostra um aviso amarelo: 1 regra automática ainda tem a ação de colocar essa etiqueta. Excluir aqui não apaga a regra: se ela estiver ligada, vai colocar a etiqueta de volta da próxima vez que rodar. Nesse caso, clique em "Cancelar" e mude a regra primeiro, em "Webhooks", na aba "Automações".

## Etiquetas de contato interno

**Objetivo:** Marcar etiquetas de quem não é cliente (equipe, família, fornecedor) para não virar negócio no funil nem receber resposta da IA.

**Quem pode:** admin

**Palavras de busca:** contato interno, fornecedor no funil, equipe no whatsapp, IA não responder família, não virar card, contato que não é cliente

1. **Quem não é cliente** — No mesmo WhatsApp também escrevem pessoas que não são clientes: equipe, sócio, família, fornecedor. No fim da tela fica o quadro "Etiquetas de contato interno". O contato marcado com uma dessas etiquetas não vira negócio no funil e não recebe resposta da IA. A conversa continua normal na Inbox, e você pode responder à mão. Numa instalação nova o campo vem vazio: "interno", "equipe" e "familia" em cinza são só um exemplo.
   - Rota: `/app/settings/tags`
2. **Uma etiqueta por linha** — Escreva no campo as etiquetas que marcam quem não é cliente, uma por linha. Aqui a clínica usa "fornecedor", que já está na "Distribuidora Vida Natural", e "equipe". Depois clique em "Salvar".
3. **Lista salva** — Depois de salvar, a lista volta arrumada: tudo em letras minúsculas e sem repetição, por isso "Fornecedor" virou "fornecedor". Maiúsculas não fazem diferença na hora de reconhecer a etiqueta no contato.

