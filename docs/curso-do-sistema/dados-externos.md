# Dados externos

- **Tela:** `/app/integracao-dados`
- **Resumo:** Onde você liga o CRM ao banco de dados de outro sistema da clínica, para o agente de IA consultar essas informações sem poder mudar nada lá.
- **Fonte:** `curso/licoes/dados-externos.json`

## Conhecendo a tela de Dados externos

**Objetivo:** Achar a tela e ler, em cada conexão, se ela está funcionando e o que o assistente já pode consultar.

**Quem pode:** admin

**Palavras de busca:** dados externos, banco de dados, outro sistema, integração, ERP, sistema da clínica, agente consultar dados, conectar banco

1. **Onde fica** — Abra "Configurações", no rodapé do menu lateral. Na parte "Dados e acesso" fica o cartão "Dados externos". Clique nele.
   - Rota: `/app/settings`
2. **Para que serve** — Aqui você liga o CRM ao banco de dados de outro sistema que a clínica já usa, como o sistema de agendamentos ou o cadastro de convênios. Só funciona com bancos PostgreSQL ou MySQL, e o servidor do CRM precisa conseguir chegar até esse banco pela rede. A ligação é só de leitura: nada que o agente faz muda o sistema de origem. Cada cartão da lista é uma conexão.
3. **Uma conexão recém-cadastrada** — O nome em cima é o que você deu à conexão. Ao lado aparecem dois selos: o primeiro diz se ela funciona ("Não testada" quer dizer que ninguém clicou em "Testar" ainda) e o segundo diz o tipo do banco, PostgreSQL ou MySQL. Embaixo ficam o endereço do servidor, a porta, o nome do banco e o usuário usado para entrar.
4. **Os avisos em laranja** — As frases em laranja embaixo do cartão dizem o que falta. "O assistente ainda não enxerga nada deste banco" quer dizer que nenhuma tabela foi liberada: o link "Escolher o que ele pode ler" leva direto a essa escolha. O segundo aviso diz que, nas conversas, o assistente consultaria o banco sem se limitar ao paciente que está falando. Para corrigir, use "Editar" e diga qual coluna identifica o cliente.
5. **Uma conexão desativada** — O cartão "Cadastro de convênios" mostra o selo "Desativada": o cadastro continua salvo, mas o agente não usa esse banco. Ele também mostra "2 tabelas liberadas", que é o que o assistente pode ler quando a conexão estiver ativa. Como esta conexão já diz qual coluna identifica o paciente, o aviso em laranja sobre o cliente não aparece.
6. **Os botões de cada conexão** — "Explorar" abre a conexão para ver as tabelas e escolher o que o assistente lê. "Testar" confere se o CRM consegue entrar no banco. O lápis ("Editar") muda os dados da conexão e a lixeira ("Remover") apaga a conexão. Você usa cada um deles nas próximas lições.

## Cadastrar uma conexão nova

**Objetivo:** Preencher o formulário de conexão com os dados que o responsável pelo outro sistema passar, com segurança e limites certos.

**Quem pode:** admin

**Palavras de busca:** conectar banco de dados, nova conexão, cadastrar banco, mysql, postgresql, usuário só leitura, senha do banco, host e porta

1. **Começar uma conexão** — Peça a quem cuida do outro sistema (o fornecedor ou o técnico de informática) o endereço do servidor, a porta, o nome do banco e um usuário com senha que só consiga ler. Com esses dados em mãos, clique em "Nova conexão".
   - Rota: `/app/integracao-dados`
2. **O tipo de banco** — Abre a janela "Conectar banco de dados". Comece pelo "Tipo de banco": PostgreSQL ou MySQL. Pergunte ao responsável qual é o do seu sistema. A frase de cima avisa que a senha é guardada embaralhada e nunca aparece de novo na tela.
3. **O guia para quem usa MySQL** — Ao escolher MySQL, aparece o "Como criar um acesso só de leitura (guia rápido)". Clique nele para abrir: são comandos prontos para você mandar a quem administra o banco. Eles criam um usuário novo que só lê e liberam somente as informações que o assistente pode ver. A porta muda sozinha para 3306, a porta comum do MySQL.
4. **Os dados de acesso** — Em "Nome da conexão", dê um nome que a equipe reconheça. Em "Host" vai o endereço do servidor e em "Porta", o número que o responsável informar. "Banco de dados" é o nome do banco lá dentro. "Usuário" e "Senha" são os do acesso só de leitura criado para o CRM.
5. **A segurança da conexão** — Em "Segurança da conexão (TLS)" você escolhe se a conversa entre o CRM e o banco vai protegida. Deixe em "Obrigatório (padrão)", a não ser que o responsável peça outra opção. "Sem TLS" só serve para um banco dentro da mesma rede, que você confia.
6. **Quem é o cliente na conversa** — No quadro 'Cliente nas conversas', em 'O que identifica o cliente', escolha 'Telefone do cliente' ou 'E-mail do cliente'. Em 'Nome da coluna', escreva o nome do campo onde o outro sistema guarda esse dado. Assim, quando um paciente escreve no WhatsApp, o assistente só lê as linhas desse paciente. Escolhendo telefone, o aviso logo abaixo explica em que formato o número precisa estar gravado.
7. **Limites e salvar** — Os "Limites de leitura" dizem quanto o assistente pode ler de uma vez: quantas linhas por consulta, quantos filtros e o tamanho da resposta. Os valores que já vêm preenchidos servem para quase todo mundo. Ao clicar em "Salvar", o CRM guarda a conexão e abre a página dela para você escolher o que o assistente pode ler.

## Testar, editar e remover uma conexão

**Objetivo:** Conferir se o CRM alcança o banco, entender a falha, ajustar a conexão e saber o que acontece ao removê-la.

**Quem pode:** admin

**Palavras de busca:** testar conexão, falha no teste, não conecta, editar conexão, trocar senha do banco, desativar conexão, remover conexão, apagar banco

1. **Testar a conexão** — Depois de cadastrar, clique em "Testar". O CRM tenta entrar no banco com o usuário e a senha guardados e mostra o resultado no próprio cartão.
   - Rota: `/app/integracao-dados`
2. **Quando o teste falha** — Neste exemplo, o servidor 192.168.0.50 não respondeu. O selo virou 'Falha no último teste' e a linha vermelha mostra o motivo, em inglês. Mande essa linha para quem cuida do outro sistema: em geral é endereço, porta, senha ou um bloqueio de rede. Quando o teste dá certo, o selo vira 'Conectada'. Se nenhuma tabela foi escolhida ainda, a página da conexão abre sozinha para você fazer isso.
3. **Corrigir os dados** — O lápis abre a janela "Editar conexão" com os dados já preenchidos. O tipo de banco fica travado. A senha nunca volta para a tela: o campo diz "Guardada — preencha só para trocar". Deixe em branco para manter a senha atual.
4. **Desativar sem apagar** — A chave "Conexão ativa" para o uso do banco sem apagar o cadastro. Desligada e salva, o cartão mostra "Desativada" e o agente deixa de consultar esse banco. Para voltar, é só ligar a chave de novo e clicar em "Salvar".
5. **Remover uma conexão** — A lixeira pede confirmação antes. Ao clicar em 'Remover', a conexão inteira é apagada: a senha guardada, as tabelas escolhidas e os ajustes. O agente deixa de enxergar esse banco. O banco do outro sistema não é tocado: só some a ligação com o CRM. Se quiser só pausar, prefira desativar. Aqui, clique em 'Cancelar'.

## Escolher o que o assistente pode ver

**Objetivo:** Abrir uma conexão, decidir quais informações do outro sistema o assistente pode ler e saber onde consultar os dados.

**Quem pode:** admin

**Palavras de busca:** o que o assistente pode ver, liberar tabelas, escolher tabelas, esconder dados sensíveis, explorar dados, ver dados do outro sistema, tudo liberado

1. **Abrir a conexão** — Clique em "Explorar" no cartão da conexão. O link em laranja "Escolher o que ele pode ler" leva para a mesma página.
   - Rota: `/app/integracao-dados`
2. **A página da conexão** — No topo ficam o nome, o endereço e o lembrete 'somente leitura'. Logo abaixo vem o quadro 'O que o assistente pode ver'. O selo à direita resume a escolha atual: 'Nada liberado', o número de tabelas liberadas ou 'Tudo liberado'. Numa conexão em que nada foi liberado ainda, o quadro já vem aberto.
3. **Só o que você marcar** — Deixe marcado 'Só o que eu marcar (recomendado)'. Quando o CRM alcança o banco, aparece aqui a lista das tabelas, cada uma com uma caixinha para liberar. Depois de marcar uma tabela, o botão 'Detalhes' deixa escolher as colunas e escrever uma descrição para o assistente. Neste exemplo o banco não respondeu, por isso aparece o aviso de que o catálogo não pôde ser lido e o botão 'Tentar de novo'.
4. **Liberar tudo, com cuidado** — A opção "Tudo que o usuário do banco enxerga" libera de uma vez tudo o que o usuário do banco consegue ler. O aviso amarelo explica o risco: se houver senhas ou outros dados sensíveis, o assistente passa a enxergá-los. Nada muda até você clicar em "Salvar". Até lá, aparece "Alterações não salvas" ao lado dos botões, e "Descartar alterações" volta para o que estava salvo.
5. **Consultar os dados** — Antes, clique em "Descartar alterações" para voltar ao modo recomendado. Mais abaixo fica o explorador. À esquerda, em "Tabelas", aparecem as tabelas liberadas. Clique numa delas e, à direita, os dados aparecem numa grade, página por página, só para leitura. Aqui a lista mostra "Não foi possível ler o catálogo." porque o banco de exemplo não respondeu.

