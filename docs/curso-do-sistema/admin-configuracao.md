# Credenciais (Admin)

- **Tela:** `/admin/configuracao`
- **Resumo:** Onde quem instalou o sistema confere as senhas e chaves do servidor e preenche os contatos que todas as empresas veem: o e-mail de suporte e o do encarregado de dados.
- **Fonte:** `curso/licoes/admin-configuracao.json`

## Conhecendo a tela de Credenciais

**Objetivo:** Saber para que serve a tela de Credenciais do Admin, como ela se divide e o que dizem os selos de cada item.

**Quem pode:** admin

**Palavras de busca:** credenciais da instalação, senhas e chaves do servidor, configuração da instalação admin, onde vejo as chaves do sistema, arquivo de instalação do servidor, admin

1. **Onde fica a tela** — No Admin, o item "Credenciais" do menu abre a "Configuração da instalação". Ela reúne o que este servidor precisa saber para funcionar: contatos, senhas e chaves. Vale para todas as empresas do servidor, não só para a sua clínica. O que dá para trocar aqui vale na hora, sem mexer no servidor.
   - Rota: `/admin/configuracao`
2. **Os quadros por assunto** — A tela é dividida em quadros: "E-mail", "Segurança e privacidade", "WhatsApp", "Banco de dados", "Fila de tarefas" e "Inteligência artificial". Cada quadro tem uma frase que explica para que ele serve. O de e-mail vem primeiro, mas aqui dentro só ficou o e-mail de suporte. O que faz o sistema enviar convites e recuperação de senha fica na tela "E-mail", pelo link que aparece logo no topo do quadro.
3. **Onde fica o envio de e-mail** — A chave do serviço que envia os e-mails e o endereço remetente não ficam nesta tela. O link "O serviço de envio de e-mail — próprio ou externo — fica em E-mail →" leva para a tela "E-mail" do Admin, onde está tudo sobre como os e-mails saem. A faixa amarela "Sem SMTP configurado", no alto, é um aviso geral do Admin: o envio de e-mails ainda não está configurado. O item "E-mail" do menu leva ao ajuste.
4. **De onde vem cada valor** — Ao lado do nome de cada item, um selo diz de onde vem o valor. "Não configurado", em amarelo: ninguém definiu ainda. "Vem do arquivo de instalação do servidor", em cinza: o valor foi escrito quando o servidor foi instalado. "Definido aqui nesta tela", em verde: alguém salvou o valor por esta tela, e ele vale no lugar do arquivo.

## Preenchendo os contatos da instalação

**Objetivo:** Cadastrar o e-mail de suporte e o e-mail do encarregado de dados, e saber voltar ao valor do arquivo de instalação.

**Quem pode:** admin

**Palavras de busca:** e-mail de suporte do sistema, cadastrar encarregado de dados dpo, contato da lgpd da instalação, onde muda o e-mail de ajuda, voltar ao padrão credenciais, admin

1. **O e-mail de suporte** — "E-mail de suporte" é o endereço que o administrador de cada empresa vê quando precisa de ajuda com a conta: na tela de conta suspensa e na tela "Plano e cobrança" (enquanto a cobrança automática das empresas não estiver ligada). Se ninguém preencher, essas telas só dizem para falar com quem administra o sistema, sem endereço. Escreva o e-mail no campo.
   - Rota: `/admin/configuracao`
2. **Salvo e valendo** — Cada item tem o seu próprio botão "Salvar". Ao clicar, um aviso rápido confirma "Pronto, já está valendo.". Em seguida, a linha "Agora:" mostra o endereço gravado e o selo passa a dizer "Definido aqui nesta tela". Daqui em diante, este valor vale no lugar do que estiver no arquivo de instalação.
3. **O encarregado de dados (DPO)** — No quadro "Segurança e privacidade", "E-mail do encarregado de dados (DPO)" é o contato que a LGPD exige para pedidos de privacidade. Ele aparece nos documentos de privacidade e na entrega dos dados pedidos por um paciente, e recebe o aviso quando um pedido passa do prazo. Se a empresa preencheu o encarregado dela em Configurações, vale o dela. Este é o contato usado quando ela não preencheu. Escreva o e-mail e clique no "Salvar" ao lado dele.
4. **Voltar ao padrão** — Depois que um item é salvo por aqui, aparece ao lado o botão "Voltar ao padrão". Ele serve para desfazer: apaga o que foi gravado nesta tela, e o sistema volta a usar o valor do arquivo de instalação do servidor.
5. **De volta ao valor do arquivo** — Depois do clique, um aviso aparece por alguns segundos no canto de baixo da tela: "Voltou para o valor do arquivo de instalação.". Como nesta demonstração o arquivo não tem e-mail de suporte, a linha "Agora:" some e o selo volta a "Não configurado". O botão "Voltar ao padrão" também some até você salvar outra vez. Aqui desfizemos também o do encarregado de dados.

## Os itens que só se conferem

**Objetivo:** Entender por que a maioria das senhas e chaves aparece só para conferir e onde elas são trocadas.

**Quem pode:** admin

**Palavras de busca:** trocar senha do whatsapp do servidor, por que não consigo editar a chave, chave que tranca as credenciais, senha do banco de dados, conferir chave guardada no servidor, admin

1. **Guardado, mas sem campo** — A maioria dos itens não tem campo para escrever. Eles servem para conferir: o selo diz se o valor existe, e a linha "Guardado, terminando em" mostra só os quatro últimos caracteres da senha, nunca ela inteira. Assim você confirma qual senha está em uso sem expô-la.
   - Rota: `/admin/configuracao`
2. **O porquê de cada um** — Embaixo de cada item, uma frase curta diz por que ele não se troca por aqui, seguida de "por quê?". Clique nela para ler a explicação completa. Na "Chave que tranca as credenciais", por exemplo: ela é a chave do cofre onde ficam as outras senhas, e por isso mora no arquivo do servidor, fora do banco de dados. Clique de novo, em "ocultar", para fechar.
3. **As senhas do WhatsApp** — No quadro "WhatsApp", as duas senhas têm um par no programa que conecta o WhatsApp. Trocar só de um lado deixaria os dois falando senhas diferentes, e o WhatsApp cairia. Por isso a troca é feita no arquivo de instalação do servidor, seguida de reinício dos dois programas: um pedido para quem cuida da sua hospedagem.
4. **Banco, fila e inteligência artificial** — Os últimos quadros seguem a mesma ideia. O endereço e a senha do banco de dados aparecem com "Necessária para o sistema ligar": sem eles o sistema não abre nem esta tela. A senha da fila tem um par em outro programa. O "Modo de distribuição das conversas da IA" é lido por outro programa só quando ele liga. Todos se trocam no arquivo de instalação do servidor.

