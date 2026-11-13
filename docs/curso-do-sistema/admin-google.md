# Google Agenda (Admin)

- **Tela:** `/admin/google`
- **Resumo:** Onde quem instalou o sistema cadastra, uma vez só, o aplicativo do Google que deixa cada pessoa da equipe ligar a própria agenda do Google à Agenda do CRM.
- **Fonte:** `curso/licoes/admin-google.json`

## Conhecendo a tela do Google Agenda

**Objetivo:** Saber para que serve o cadastro do Google desta instalação e o que é cada parte da tela.

**Quem pode:** admin

**Palavras de busca:** google agenda, google calendar, sincronizar agenda com o google, credenciais do google, endereço de retorno, conectar google, admin

1. **Onde fica a tela** — No Admin, o item "Google Agenda" do menu abre o cadastro do aplicativo do Google desta instalação. Com ele cadastrado, cada pessoa da equipe consegue ligar a própria agenda do Google à Agenda do sistema. O cadastro vale para todas as empresas deste servidor e é feito uma vez só. Depois, cada pessoa conecta a conta dela, sozinha.
   - Rota: `/admin/google`
2. **O endereço de retorno** — "Endereço de retorno" é o endereço para onde o Google devolve a pessoa depois que ela autoriza a agenda. Ele já vem pronto e não dá para editar: só copiar. Cole exatamente isto em "URIs de redirecionamento autorizados", na tela de credenciais do Google Cloud. O Google compara letra por letra; se algo for diferente, ele recusa a conexão.
3. **As duas informações do Google** — "ID do cliente" e "Chave secreta do cliente" são as duas informações que o Google Cloud mostra quando você cria o aplicativo. Copie cada valor para o campo correspondente. O texto clarinho que aparece nos campos vazios é só um exemplo do formato. A chave é guardada cifrada e nunca mais aparece nesta tela, nem para você.
4. **O aviso e a situação** — O quadro de aviso, logo acima do "Salvar", explica: se você trocar uma credencial que já está em uso, quem já conectou a agenda pode precisar conectar de novo, porque as autorizações antigas foram dadas ao aplicativo anterior. Ninguém perde compromisso por isso. Na mesma linha do "Salvar", à esquerda, "Nunca configurado por aqui." diz que ninguém salvou nada nesta tela ainda. Depois do primeiro "Salvar", ali aparece "Última alteração em" com a data e a hora.
5. **Também se chega pela Agenda** — Enquanto o aplicativo do Google não está cadastrado, a tela Agenda mostra o quadro "Sincronizar com o Google ainda não está disponível". A Agenda funciona normalmente; só não troca compromissos com o Google. Quem administra a instalação vê ali o link "Cadastrar as credenciais do Google", que traz direto para a tela do Admin. As outras pessoas da equipe veem só o aviso, sem o link. O quadro também lembra de registrar o endereço de retorno no Google, o mesmo do passo 2.
   - Rota: `/app/agenda`

## Cadastrar o aplicativo do Google

**Objetivo:** Preencher o ID e a chave do Google, saber quando o "Salvar" acende e o que muda depois de salvar.

**Quem pode:** admin

**Palavras de busca:** cadastrar credenciais do google, id do cliente google, chave secreta google, chave secreta do Google, salvar google agenda, botão salvar apagado

1. **Cole o ID do cliente** — Copie o ID do cliente no Google Cloud e cole no campo "ID do cliente". O botão "Salvar" continua apagado: no primeiro cadastro, o ID e a chave são obrigatórios juntos.
   - Rota: `/admin/google`
2. **Cole a chave e salve** — Agora cole a chave secreta. O campo mostra bolinhas no lugar das letras. Com as duas informações, o "Salvar" acende: clique nele para gravar. Depois de salvar, o campo da chave fica vazio e mostra "(já cadastrada)", e aparece a data da última alteração. Na Agenda, cada pessoa pode conectar a própria conta pelo botão "Conectar Google".
3. **Quando a chave vem colada errado** — Um erro comum é copiar a chave junto com o resto da linha do arquivo do Google, com aspas e vírgula no fim. Aqui, o marcador de demonstração foi colado desse jeito. A tela percebe na hora: aparece o aviso para copiar só o valor da chave, e o "Salvar" volta a ficar apagado. Tire as aspas e a vírgula para corrigir.

