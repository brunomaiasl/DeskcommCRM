# API Oficial da Meta (Admin)

- **Tela:** `/admin/meta`
- **Resumo:** Onde quem instalou o sistema cadastra a chave secreta do aplicativo da Meta e recebe o token que liga o WhatsApp oficial a este servidor, para todas as empresas.
- **Fonte:** `curso/licoes/admin-meta.json`

## Conhecendo a tela da Meta

**Objetivo:** Achar a tela "API Oficial (Meta)" do Admin e reconhecer os dois quadros: a chave secreta e o token de verificação.

**Quem pode:** admin

**Palavras de busca:** whatsapp oficial da meta, api oficial do whatsapp, configurar app da meta, chave secreta do aplicativo meta, token de verificação do webhook, whatsapp business api

1. **Onde fica a tela** — No Admin, o item "API Oficial (Meta)" do menu abre esta tela. Ela guarda duas coisas: a chave secreta do aplicativo que você criou na Meta, que o sistema usa para conferir se cada mensagem recebida pelo número oficial veio mesmo da Meta, e um token de verificação, que a Meta usa para confirmar o endereço do seu servidor. As duas valem para a instalação inteira: cada empresa conecta o próprio número depois, em "Conexões".
   - Rota: `/admin/meta`
2. **O quadro da chave secreta** — O primeiro quadro é a "Chave secreta do aplicativo", que você copia do painel da Meta. Vazio, o campo mostra "32 letras e números", o tamanho da chave. O que você digita aparece como bolinhas, e a chave nunca volta a aparecer na tela depois de salva. Embaixo, "Nunca configurado por aqui." quer dizer que ninguém salvou nada nesta tela ainda. O botão "Salvar" fica apagado até o campo ter pelo menos 16 caracteres.
3. **O quadro do token** — O segundo quadro é o "Token de verificação", um código que a Meta pede para confirmar o endereço do seu servidor. Você não inventa esse código: o sistema cria um sozinho na primeira vez que você salva a chave secreta. Por enquanto o quadro diz que ele "Ainda não existe".

## Cadastrar a chave e copiar o token

**Objetivo:** Salvar a chave secreta do aplicativo da Meta e copiar o token de verificação que o sistema cria na hora.

**Quem pode:** admin

**Palavras de busca:** onde colocar a chave secreta da meta, salvar app secret da meta, gerar token de verificação do whatsapp, copiar token do webhook da meta, cadastrar aplicativo da meta

1. **Cole a chave secreta** — Cole no campo a chave secreta que você copiou do painel da Meta. Ela tem 32 letras e números e aparece como bolinhas. Assim que o campo tem pelo menos 16 caracteres, o botão "Salvar" acende.
   - Rota: `/admin/meta`
2. **Copie o token na hora** — Ao clicar em "Salvar", a chave é guardada embaralhada no seu servidor e aparece por alguns segundos o aviso "Chave secreta salva.". Como é a primeira vez, o sistema já cria o token de verificação e mostra ele no quadro de baixo. O botão "Copiar" leva o token para a área de transferência, pronto para colar no painel da Meta.
3. **A chave ficou guardada** — O quadro de cima mudou: o campo mostra "(já cadastrada)" e embaixo aparece a data da "Última alteração". Para trocar a chave depois, é só digitar uma nova e salvar. Deixar o campo em branco mantém a que já está guardada.

## Gerar um novo token

**Objetivo:** Criar outro token de verificação quando o anterior se perdeu, sabendo o que muda na Meta.

**Quem pode:** admin

**Palavras de busca:** perdi o token de verificação da meta, gerar outro token do webhook, trocar token de verificação whatsapp, token da meta não aparece mais

1. **O botão "Gerar novo token"** — Depois que a chave secreta está salva, o quadro do token mostra quando ele foi "Gerado em" e ganha o botão "Gerar novo token". O token em si só aparece logo depois de ser criado: quando você sai da página, ele some e fica só a data. Se você perdeu o token antes de colar no painel da Meta, o caminho é criar outro com esse botão.
   - Rota: `/admin/meta`
2. **Leia o aviso antes de confirmar** — Antes de trocar, o sistema pergunta. O token atual deixa de valer na hora. As mensagens que já chegam continuam chegando, porque elas são conferidas pela chave secreta. O que muda é que, se você colou o token à mão no painel da Meta, precisa colar o novo lá também. Sem isso, a Meta não consegue confirmar o endereço do seu servidor de novo. "Cancelar" fecha sem mudar nada.
3. **O token novo aparece** — Ao confirmar, o token novo surge no quadro, no lugar do anterior, com o botão "Copiar" ao lado. Copie e cole no painel da Meta logo em seguida, no lugar do antigo. A data de "Gerado em" sempre mostra quando o token que está valendo foi criado.

## O que levar para o painel da Meta

**Objetivo:** Saber onde achar a chave secreta no painel da Meta, onde colar o token e onde pegar o endereço de cada número.

**Quem pode:** admin

**Palavras de busca:** onde achar a chave secreta no painel da meta, onde colar o token de verificação, url de callback do webhook da meta, configurar webhook do whatsapp oficial

1. **Onde achar a chave secreta** — Enquanto nenhuma chave foi salva, o texto embaixo do campo diz onde ela fica: no painel da Meta, em "Configurações do app › Básico". Copie de lá e cole aqui. O sistema guarda a chave embaralhada e ela nunca volta a aparecer nesta tela.
   - Rota: `/admin/meta`
2. **Onde colar o token** — O texto do quadro do token explica o resto. No painel da Meta, em "WhatsApp › Configuração › Webhook", o token vai no campo "Verificar token". O outro campo, "URL de callback", é de cada número: ele aparece em "Conexões" › "API Oficial (Meta)", depois que o número da empresa é conectado.
3. **Abrir Conexões sem perder o token** — O link "Abrir Conexões em outra aba" abre a tela de Conexões já na parte da API oficial, numa aba nova. Assim o token continua aberto nesta página enquanto você pega o endereço do número na outra.

