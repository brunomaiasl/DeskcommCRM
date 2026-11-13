# Organização

- **Tela:** `/app/settings/tenant`
- **Resumo:** Onde você cadastra os dados da sua empresa, decide por quanto tempo guardar fotos e áudios das conversas, ajusta o menu da equipe e, se precisar, apaga os dados de teste para recomeçar.
- **Fonte:** `curso/licoes/organizacao.json`

## Conhecendo a tela Organização

**Objetivo:** Achar a tela Organização e reconhecer os quadros que ela reúne.

**Quem pode:** admin

**Palavras de busca:** dados da empresa, configurações da empresa, onde mudo o nome da empresa, cadastro da clínica, organização, razão social e cnpj

1. **Onde fica a tela** — Abra "Configurações", no rodapé do menu lateral. Na parte "Sua empresa" está o cartão "Organização". Clique nele.
   - Rota: `/app/settings`
2. **O cadastro da empresa** — O primeiro quadro guarda o cadastro da sua empresa: o nome que a equipe vê, a razão social, o CNPJ, o fuso horário, o idioma, a moeda e o país, o e-mail do encarregado de dados, o endereço da sua política de privacidade e por quanto tempo guardar as fotos e os áudios das conversas. Nada muda enquanto você não clicar em "Salvar", no fim do quadro.
3. **Os outros quadros** — Rolando a tela aparecem mais três quadros. "Menu lateral" escolhe quais áreas a empresa mostra no menu. "Inbox" guarda uma regra de atendimento que vale para todos. "Zona de perigo" apaga os dados de teste. O cadastro, o menu e a regra da Inbox têm cada um o seu botão de gravar: salvar um não salva os outros.

## Preencher os dados da empresa

**Objetivo:** Conferir o nome, a razão social e o CNPJ, cadastrar o encarregado de dados e salvar.

**Quem pode:** admin

**Palavras de busca:** mudar nome da empresa, cadastrar cnpj, razão social, encarregado de dados lgpd, email do dpo, política de privacidade da clínica, fuso horário da empresa

1. **Nome, razão social e CNPJ** — "Nome de exibição" é como a empresa aparece para a equipe dentro do sistema. "Razão social" e "CNPJ" são os dados oficiais: é a razão social que aparece no relatório que o cliente recebe quando pede uma cópia dos dados dele.
   - Rota: `/app/settings/tenant`
2. **Fuso, idioma, moeda e país** — "Fuso horário" e "Idioma" são os padrões da empresa. "Moeda" vale para todo preço do catálogo, mas um produto já cadastrado continua com a moeda com que foi criado. "País" decide qual documento o contato usa e qual lei aparece no relatório de dados do cliente. Trocar o país já sugere o fuso dele no campo "Fuso horário".
3. **O encarregado de dados e a política de privacidade** — "DPO email" é o e-mail do encarregado de dados, a pessoa que responde quando um cliente pergunta o que a empresa guarda sobre ele. Esse e-mail sai no relatório de dados que o cliente recebe. Em "URL política de privacidade", cole o endereço completo da página de privacidade da sua empresa, começando com https://. Quem da sua equipe abrir a página de privacidade do sistema passa a ser levado para a sua.
4. **Salvar** — Clique em "Salvar", no canto do quadro. O botão mostra "Salvando…" enquanto grava. A confirmação "Organização atualizada." aparece por alguns segundos e não está na foto; o próximo passo reabre a tela para conferir o que ficou salvo. Se um campo estiver mal preenchido, como um e-mail sem @, o próprio navegador aponta o campo e não deixa salvar até você corrigir.
5. **Conferindo o que ficou gravado** — Ao abrir a tela de novo, os campos mostram o que ficou gravado: o e-mail do encarregado e o endereço da política de privacidade agora fazem parte do cadastro da empresa.
   - Rota: `/app/settings/tenant`

## Por quanto tempo guardar fotos e áudios

**Objetivo:** Entender a retenção de mídia e a limpeza automática das fotos, áudios e anexos antigos.

**Quem pode:** admin

**Palavras de busca:** apagar fotos antigas, guardar áudios do whatsapp, retenção de mídia, espaço de armazenamento cheio, limpeza automática, por quanto tempo guarda os arquivos

1. **A retenção de mídia** — "Retenção de mídia (dias)" é por quanto tempo o sistema guarda as fotos, áudios e documentos que chegam pelas conversas. O padrão é 365 dias. O valor aceito vai de 30 a 3650 dias (dez anos).
   - Rota: `/app/settings/tenant`
2. **Trocar o prazo** — Digite um prazo novo, por exemplo 180. A frase abaixo da chave "Limpeza automática de mídia antiga" já mostra o resultado: com ela ligada, a mídia das conversas e os anexos das notas internas com mais de 180 dias passam a ser apagados. Só vale depois de clicar em "Salvar".
3. **Ligar e desligar a limpeza** — Clique na chave para desligar a limpeza: a frase muda para "Desligado", e nenhum arquivo é apagado por idade. Ao ligar de novo, o navegador pede uma confirmação, porque a partir daí os arquivos mais antigos que o prazo começam a ser apagados. Como sempre nesta tela, a mudança só vale depois de "Salvar".

## O menu da empresa e a regra da Inbox

**Objetivo:** Escolher quais áreas aparecem no menu para toda a empresa e conhecer o bloqueio da caixa de mensagem até assumir.

**Quem pode:** admin

**Palavras de busca:** esconder itens do menu, menu simplificado para a equipe, deixar o menu mais simples, atendente só responde depois de assumir, bloquear resposta sem assumir, personalizar menu lateral

1. **O quadro Menu lateral** — Aqui você escolhe as áreas que a empresa mostra no menu lateral. Isso não muda o que cada pessoa pode fazer: quem tem permissão ainda chega a uma área escondida por um link ou um aviso. Depois, em "Equipe", você ainda pode deixar o menu de uma pessoa com menos áreas, mas nunca com mais do que a empresa escolheu aqui.
   - Rota: `/app/settings/tenant`
2. **Completa ou Simplificada** — Em "Perfil de interface", "Completa" mostra todas as áreas que o papel de cada pessoa permite. "Simplificada" deixa no menu só o dia a dia: Inbox, Agenda, Funis, Contatos e Tarefas, e Conexões para quem administra. Perfil, Segurança, Notificações e App no celular ficam sempre lá, e, para quem administra, também Equipe e Organização. Trocar de perfil desfaz a escolha feita área por área.
3. **Escolher área por área** — Clique em "Personalizar áreas visíveis" para marcar e desmarcar cada área, separadas por grupo. A lista rola: descendo dentro dela aparecem as outras áreas, como Contatos, Tarefas e Conexões. Ao mexer numa caixa, o título ganha "(personalizada)". Para valer, clique em "Aplicar interface" (até lá, o menu da esquerda continua igual): aparece o aviso "Menu lateral da empresa salvo.".
4. **Bloquear a caixa até assumir** — No quadro "Inbox", marque "Bloquear a caixa de mensagem até o atendente assumir a conversa" e clique em "Aplicar regras de atendimento". A partir daí, só o responsável pela conversa consegue digitar. Quem abre uma conversa sem responsável, ou que está com um colega, não consegue digitar nem enviar até clicar em "Assumir". Quem já assumiu continua respondendo normalmente.

## Apagar os dados de teste

**Objetivo:** Saber o que a Zona de perigo apaga, o que ela mantém e como a confirmação protege contra um clique sem querer.

**Quem pode:** admin

**Palavras de busca:** apagar tudo e começar de novo, limpar dados de teste, zerar conversas e contatos, zona de perigo, excluir todos os contatos, recomeçar do zero

1. **O que a Zona de perigo faz** — No fim da tela fica a "Zona de perigo". Ela apaga de vez as mensagens, conversas, negócios, propostas, contatos, agendamentos e pedidos da empresa, com tudo o que estava ligado a eles, como notas e histórico. Serve para limpar os testes antes de começar a atender de verdade. Continuam de pé a equipe, as configurações, os funis e etapas, os agentes de IA e os números de WhatsApp conectados.
   - Rota: `/app/settings/tenant`
2. **A confirmação** — O botão "Apagar todos os dados de atendimento" não apaga nada sozinho: ele abre uma janela avisando que a ação é irreversível. Enquanto o nome da empresa, como aparece em negrito na janela, não for digitado igualzinho, com as mesmas maiúsculas e acentos, o botão "Apagar de vez" fica desativado.
3. **Nome digitado: botão liberado** — Com "Clínica Bem Viver" digitado, o botão "Apagar de vez" fica liberado. Ao clicar nele, tudo é apagado e aparece um aviso com quantas mensagens, conversas, negócios e contatos saíram. Não dá para desfazer. Se mudou de ideia, clique em "Cancelar" e nada acontece.

