# Recursos opcionais (Admin)

- **Tela:** `/admin/sistema`
- **Resumo:** O lugar onde quem instalou o sistema liga os recursos extras, decide como ele se comporta e vê o que depende do servidor, para todas as empresas de uma vez.
- **Fonte:** `curso/licoes/admin-sistema.json`

## Conhecendo a tela de Recursos opcionais

**Objetivo:** Saber o que a tela de Recursos opcionais controla e reconhecer as suas três partes.

**Quem pode:** admin

**Palavras de busca:** recursos opcionais, onde ligar recursos do sistema, ligar e desligar funções, configuração da instalação, módulos do sistema, admin recursos opcionais

1. **Onde fica a tela** — No Admin, o item "Recursos opcionais" do menu abre a tela que junta tudo o que se liga e desliga neste sistema. O que você escolhe aqui vale para todas as empresas hospedadas no seu servidor, não para uma só. Por isso só quem administra a instalação vê esta tela.
   - Rota: `/admin/sistema`
2. **Primeira parte: Módulos** — A primeira parte, "Módulos", lista os recursos extras que a maioria das instalações não usa. Todos vêm desligados. Desligado, um módulo não aparece para nenhuma empresa: nem tela, nem item no menu. Cada um tem uma chave à direita, e o texto ao lado conta o que ligar abre.
3. **Segunda parte: Comportamento** — A segunda parte, "Comportamento", reúne as escolhas sobre como o sistema age no dia a dia, como o que acontece quando uma empresa passa do teto de gasto com a IA. Elas ficam no quadro "O que esta instalação faz". A lição "Decidir como o sistema se comporta" explica cada uma.
4. **Terceira parte: Depende do servidor** — A última parte, "Depende do servidor", só mostra, não liga nada. São recursos que precisam de uma senha de outro serviço ou de um ajuste no servidor, como o envio de e-mail. O selo de cada linha diz se ele está "Configurado" ou "Não configurado". Quando a tela não consegue conferir, o selo diz "Não dá para ver daqui". Nenhuma senha aparece aqui.

## Ligar um módulo para as empresas

**Objetivo:** Ligar um módulo opcional, saber onde ele aparece depois e como desligar.

**Quem pode:** admin

**Palavras de busca:** ligar módulo, ativar propostas comerciais, como liberar recurso para as empresas, módulo não aparece no menu, desligar módulo, liguei e não apareceu

1. **Escolha o módulo** — Cada módulo tem um quadro com o nome, o que ele faz e onde vai aparecer. Aqui, "Propostas comerciais" deixa a IA montar propostas pelos modelos da empresa. A linha de baixo diz onde ele aparece no menu depois de ligado. Para ligar, clique na chave à direita.
   - Rota: `/admin/sistema`
2. **Ligou, salvou** — Não há botão de salvar: o módulo fica ligado assim que você clica, e a chave fica colorida. A linha de baixo passa a dizer "Aparece no menu em:", com o caminho no menu das empresas. Cada troca fica registrada no item "Audit" do menu, com quem ligou e quando.
3. **Módulo que vira tela no Admin** — A "Cobrança dos seus clientes" é diferente: quem controla é você. Ligada, ela cria o item "Cobrança" no menu do Admin, onde você monta planos e decide quais empresas passam a pagar. As empresas que já existem ficam isentas até você escolher. Para receber de verdade, a tela Cobrança pede que você conecte uma conta do Asaas ou da Stripe, e o sistema precisa estar num endereço com https. As empresas que pagam veem o próprio plano em "Plano e cobrança". Clique na chave para ver.
4. **O item novo no menu do Admin** — Com a cobrança ligada, o item "Cobrança" passa a aparecer no fim do menu do Admin. Para desligar qualquer módulo, clique de novo na chave. Desligar a cobrança faz os limites dos planos deixarem de valer e libera as empresas que estavam suspensas por falta de pagamento.
5. **Módulos que se instalam em outra tela** — Abaixo das chaves ficam "Honorários" e "Comandas". Esses não ligam por chave: eles se instalam na tela "Módulos" do Admin. O selo mostra se estão ligados, e o botão "Ajustar" leva até lá.

## Decidir como o sistema se comporta

**Objetivo:** Entender as quatro escolhas de comportamento e onde ficam as que moram em outras telas.

**Quem pode:** admin

**Palavras de busca:** proteção de gasto de IA, IA parou de responder teto de gasto, assinatura nas entregas do canal, divulgação de pagamento, conferência de promessa, comportamento do sistema

1. **O quadro de comportamento** — O quadro "O que esta instalação faz" tem quatro escolhas. Elas valem para todas as empresas daqui, com uma exceção que a lição mostra adiante. Como nos módulos, cada escolha salva na hora, sem botão de salvar, e fica registrada no item "Audit" do menu, com o valor de antes e o de depois.
   - Rota: `/admin/sistema`
2. **Proteção de gasto de IA** — Cada empresa escolhe um teto de gasto com a IA. Esta escolha decide o que acontece quando ela passa dele. "Respeita o teto de cada empresa" é o padrão: vale o que cada empresa escolheu. "Só avisa, nunca para a IA" avisa a empresa, mas deixa a IA seguir respondendo. "Desligada" ignora o teto: nem avisa, nem para. Esta escolha nunca liga a proteção de uma empresa: só pode afrouxá-la.
3. **Exigir assinatura nas entregas do canal** — Ligada, esta chave faz o sistema recusar toda mensagem do WhatsApp conectado por QR code que chegar sem a assinatura secreta da conexão. Ela vem desligada porque nem todo servidor de WhatsApp assina: ligar sem que ele assine corta a entrada de mensagens. Logo abaixo, a tela conta se as últimas mensagens chegaram assinadas. Se nenhuma mensagem chegou na última semana, aparece "Nenhuma entrega do WhatsApp na última semana para conferir a assinatura.". Quando aparecer "Pode ligar: o WhatsApp já assina.", é seguro ligar.
4. **Divulgação e conferência de promessa** — "Divulgação de pagamento no atendimento" decide o que fazer quando a primeira mensagem a um contato sai sem o aviso de que quem atende é um assistente virtual. "Injetar" acrescenta o aviso, e "Vetar" barra o envio e pede à IA para reescrever. Ela só age se a empresa tiver um texto de aviso cadastrado. Já a "Conferência de promessa antes de enviar", ligada, faz a IA reler cada mensagem para não prometer o que a empresa não cumpre. Ela se soma a uma conferência fixa que sempre roda, e cada releitura custa uma chamada a mais à IA. Aqui você escolhe o padrão: cada empresa pode mudar o dela no painel de segurança do agente. Aqui a divulgação está em "Injetar", e a conferência de promessa vem ligada de fábrica.
5. **Escolhas que moram em outra tela** — Abaixo do quadro ficam duas escolhas da instalação que têm tela própria: "Quem pode criar conta" e "Destinos internos". O selo "Veja na tela dele" quer dizer que esta lista não mostra o valor. Clique em "Ajustar" para abrir a tela e ver ou mudar.

## O que depende do servidor

**Objetivo:** Ler o estado dos recursos que dependem do servidor e saber o caminho para configurar cada um.

**Quem pode:** admin

**Palavras de busca:** e-mail não configurado, o que falta configurar no servidor, recursos que dependem do servidor, configurar google agenda, notificação com a aba fechada, arquivo de ambiente do servidor

1. **Como ler uma linha** — Cada linha diz o nome do recurso e o que ele faz. Embaixo, em letra menor, aparece quem decide e se ele vem ligado ou desligado. O selo à direita é o estado agora: aqui o e-mail aparece "Não configurado", então convite de equipe e recuperação de senha ainda não chegam por e-mail.
   - Rota: `/admin/sistema`
2. **O botão Ajustar leva até a tela** — Clicar em "Ajustar" abre a tela onde o recurso se configura. No caso do e-mail, é a tela "E-mail" do Admin, onde você cadastra o servidor que vai enviar os e-mails do sistema. Depois de salvar lá, o selo em "Recursos opcionais" passa a dizer "Configurado".
3. **Recursos sem tela** — Alguns recursos não têm botão "Ajustar": eles só ligam no arquivo de configuração do servidor, e a linha diz o que fazer. Mostre esse texto a quem cuida do seu servidor. Depois do ajuste e de reiniciar o sistema, o selo muda para "Configurado". A "Telefonia por SIP" mostra "Não dá para ver daqui": ela é montada fora deste sistema, e a tela não tem como saber se está pronta. Isso não quer dizer que está desligada.
   - Rota: `/admin/sistema`

