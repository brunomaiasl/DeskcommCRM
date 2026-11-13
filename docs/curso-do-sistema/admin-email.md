# E-mail (Admin)

- **Tela:** `/admin/email`
- **Resumo:** Onde quem instalou o sistema escolhe por onde saem os e-mails de todas as empresas deste servidor: convites da equipe, entrega de dados da LGPD e avisos de prazo.
- **Fonte:** `curso/licoes/admin-email.json`

## Conhecendo a tela de E-mail

**Objetivo:** Saber para que serve a tela de E-mail do Admin, ler a situação atual do envio e reconhecer os dois caminhos possíveis.

**Quem pode:** admin

**Palavras de busca:** configurar e-mail do sistema, convite não chega no e-mail, servidor de e-mail smtp, por onde saem os e-mails, e-mail da instalação, admin

1. **Onde fica a tela** — No Admin, o item "E-mail" do menu abre o servidor de e-mail desta instalação. Convite de equipe, entrega de dados pedidos pela LGPD e aviso de prazo saem por aqui. O que você configura nesta tela vale para todas as empresas do servidor, não só para a sua clínica. Enquanto o seu servidor de e-mail próprio não estiver salvo, pode aparecer no alto de todas as telas do Admin a tarja amarela "Sem SMTP configurado" (SMTP é o nome técnico de um servidor de e-mail). O atalho "Configurar em /admin/email" dela traz para cá.
   - Rota: `/admin/email`
2. **A situação do envio** — No fim do quadro, ao lado dos botões, uma frase diz por onde o e-mail está saindo agora. Aqui ela avisa que nenhum caminho está configurado. Nesse caso, quem convida alguém para a equipe recebe um link para copiar e mandar à pessoa, em vez de o convite chegar na caixa de entrada dela. Quando o servidor próprio estiver salvo com o endereço e o e-mail do remetente preenchidos, a frase muda para "Em uso: o e-mail está saindo por este servidor.". Se o e-mail sair pelo serviço externo, ela avisa isso.
3. **Os dois caminhos** — Há dois jeitos de mandar e-mail. O primeiro é o seu próprio servidor de e-mail, no quadro de cima. O segundo é um "Serviço externo de envio", no quadro de baixo: uma empresa que entrega o e-mail por você. Basta um dos dois. Se os dois estiverem configurados, o servidor próprio tem preferência, mesmo que os dados dele estejam errados: o sistema não volta sozinho ao serviço externo. Por isso, depois de salvar o servidor próprio, teste sempre.

## Cadastrando o seu servidor de e-mail

**Objetivo:** Preencher os dados do servidor de e-mail próprio e entender o que os botões "Testar conexão" e "Salvar" fazem.

**Quem pode:** admin

**Palavras de busca:** cadastrar servidor smtp, porta 587 starttls, senha do e-mail do sistema, remetente dos e-mails, testar conexão do e-mail, e-mail da clínica

1. **Endereço e porta** — Os dados vêm de quem hospeda o seu e-mail (a empresa do seu domínio ou da sua caixa de e-mail). Em "Endereço do servidor", escreva só o nome do servidor, normalmente "smtp." seguido do seu domínio: sem "smtp://" na frente e sem a porta no fim. Em "Porta", o número que o provedor informar. O mais comum é 587.
   - Rota: `/admin/email`
2. **A segurança da conexão** — Em "Segurança", escolha o tipo de proteção que o provedor indicar. A própria lista ajuda: "STARTTLS" normalmente combina com a porta 587, e "TLS/SSL" com a porta 465. "Sem criptografia" só serve para um servidor dentro da sua própria rede.
3. **Usuário e senha** — "Usuário" e "Senha" são os da conta de e-mail que vai enviar as mensagens: normalmente o próprio endereço e a senha dele. Atenção: alguns provedores (como Gmail e Outlook) não aceitam a senha normal aqui e pedem uma "senha de app", que você gera nas configurações de segurança da sua conta de e-mail. A senha é guardada cifrada e nunca volta a aparecer nesta tela. Depois de salva, o campo fica vazio: deixe assim para manter a senha, ou digite outra para trocar.
4. **Quem aparece como remetente** — Os dois últimos campos dizem quem aparece como remetente. Em "E-mail que aparece como remetente", use de preferência o mesmo endereço da conta que envia (ou um que essa conta tenha permissão de usar), senão o seu servidor pode recusar a mensagem. "Nome que aparece como remetente" é um nome de reserva: convites e avisos da LGPD saem com o nome da marca da empresa.
5. **Salvar e testar** — "Salvar" grava os dados. Assim que o endereço do servidor e o e-mail do remetente estiverem salvos, todos os e-mails passam a sair por este servidor, mesmo que algum dado esteja errado. "Testar conexão" entra no seu servidor com o usuário e a senha e avisa se deu certo, sem mandar e-mail nenhum. Atenção: o teste confere o que já está SALVO, não o que está digitado. Se nada foi salvo ainda, ele responde "Preencha e salve o servidor e o remetente antes de testar.". Se já havia um servidor salvo, ele testa o antigo. Por isso: salve primeiro e teste logo em seguida.

## Usando um serviço externo de envio

**Objetivo:** Configurar o serviço externo de envio em vez do servidor próprio e saber voltar ao valor do arquivo de instalação.

**Quem pode:** admin

**Palavras de busca:** serviço externo de e-mail, chave do serviço de e-mail, trocar remetente dos e-mails, voltar ao padrão e-mail, e-mail sem servidor próprio, admin

1. **Os dois campos do serviço** — O quadro "Serviço externo de envio" tem dois campos, e os dois precisam estar preenchidos para funcionar. Hoje o sistema funciona com o serviço Resend (resend.com): é dele a chave aceita aqui. "Chave do serviço de e-mail" é o código que a Resend te dá; ele fica escondido e, depois de salvo, só aparecem os quatro últimos caracteres. "Endereço que aparece como remetente" é o e-mail que seus clientes veem, e precisa ser de um domínio que você confirmou na Resend. O selo "Não configurado" ao lado de cada um diz que nada foi definido ainda. A frase cinza abaixo da chave só vale se você não tiver salvo o servidor próprio, no quadro de cima.
   - Rota: `/admin/email`
2. **Salvando um campo** — Cada campo tem o seu próprio botão "Salvar": escreva e clique no botão da mesma linha. Na hora aparece o aviso "Pronto, já está valendo.". O campo de digitar volta a ficar vazio e, logo acima dele, surge a linha "Agora:" com o valor gravado. O selo passa a dizer "Definido aqui nesta tela" e aparece o botão "Voltar ao padrão". O que você salva aqui vale no lugar do que estiver no arquivo de instalação do servidor.
3. **Voltar ao padrão** — "Voltar ao padrão" apaga o que foi gravado nesta tela, e o sistema volta a usar o valor do arquivo de instalação do servidor. Aparece o aviso "Voltou para o valor do arquivo de instalação.". Como nesta demonstração o arquivo não tem esse valor, a linha "Agora:" some e o selo volta a "Não configurado". O botão "Voltar ao padrão" some até você salvar de novo.

