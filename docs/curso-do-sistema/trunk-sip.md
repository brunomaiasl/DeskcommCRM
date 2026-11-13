# Trunk SIP

- **Tela:** `/app/settings/voip-trunk`
- **Resumo:** Onde você guarda os dados da linha de telefone contratada com um provedor, para a IA fazer ligações de voz, e pega o bloco de configuração que vai para o servidor.
- **Fonte:** `curso/licoes/trunk-sip.json`

## Conhecendo a tela do Trunk SIP

**Objetivo:** Achar a tela e saber para que serve cada campo do cadastro do provedor de telefone.

**Quem pode:** admin

**Palavras de busca:** trunk sip, ligação de voz pela ia, configurar telefone, provedor de telefonia, linha telefônica no sistema, credenciais sip

1. **Onde fica a tela** — Abra "Configurações", no rodapé do menu lateral. Na parte "Dados e acesso" está o cartão "Trunk SIP". Clique nele.
   - Rota: `/app/settings`
2. **Para que serve** — Para a IA fazer ligações de voz, a empresa contrata uma linha com um provedor de telefone pela internet (o "provedor SIP"). Aqui você guarda os dados de acesso dessa linha. Salvar aqui não liga nada sozinho: depois, quem cuida do servidor precisa colar um bloco de configuração no servidor de telefone, como diz o texto do topo.
3. **Os dados da linha** — Os quatro primeiros campos vêm do provedor, quando você contrata a linha. "Host" é o endereço do provedor (o texto cinza no campo é só um exemplo). "Porta" já vem com 5060, o número mais comum; só mude se o provedor pedir. "Usuário" e "Senha" são o login da sua linha.
4. **Campo opcional, chave e Salvar** — "From-domain (opcional)" só é preenchido se o provedor exigir: normalmente é o endereço público do seu servidor. A chave "Ativo" diz se as ligações que o sistema faz saem por esta linha. Desligada, os dados ficam guardados e o sistema para de ligar por ela; as ligações recebidas não mudam, porque dependem do que foi colado no servidor. O botão "Salvar" grava tudo.

## Cadastrar e alterar o provedor

**Objetivo:** Salvar os dados da linha, pegar o bloco para o servidor e alterar um dado depois.

**Quem pode:** admin

**Palavras de busca:** cadastrar provedor sip, salvar senha do telefone, bloco pjsip para o servidor, trocar porta do provedor, configurar ligação da ia, copiar configuração do telefone

1. **Preencha com os dados do provedor** — Copie para a tela o que o provedor enviou: o endereço em "Host", o login em "Usuário" e a senha em "Senha". Aqui a porta ficou com 5060 e o "From-domain (opcional)" ficou vazio. Depois clique em "Salvar".
   - Rota: `/app/settings/voip-trunk`
2. **O bloco para o servidor** — Logo depois de salvar aparece o quadro "Cole em asterisk/pjsip.conf". É o texto que quem cuida do servidor cola no arquivo de configuração do telefone. Clique em "Copiar" e mande para essa pessoa agora: ele leva a senha e só aparece neste momento.
3. **A senha fica guardada** — No cadastro, ao lado de "Senha", agora aparece "configurada, termina em 4821": são os quatro últimos caracteres da senha salva. O campo voltou a ficar vazio, porque a senha nunca é mostrada inteira de novo.
4. **Ao voltar à tela** — Quando você abre a tela de novo, os dados salvos aparecem preenchidos, mas o quadro do bloco não volta: sem a senha inteira, ele não pode ser montado outra vez. A senha continua guardada; o campo fica vazio.
   - Rota: `/app/settings/voip-trunk`
5. **Alterar um dado** — Para mudar um dado, como a porta, troque o campo, digite a senha da linha de novo e clique em "Salvar". O quadro "Cole em asterisk/pjsip.conf" aparece outra vez, já com a mudança e com a senha. Copie e mande de novo para quem cuida do servidor: a mudança só vale para as ligações depois que ele colar o bloco novo.

