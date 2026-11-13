# Perfil

- **Tela:** `/app/settings/profile`
- **Resumo:** Onde você acha todas as Configurações e ajusta o que é só seu: o nome que a equipe vê, a foto, o idioma e o fuso horário.
- **Fonte:** `curso/licoes/perfil.json`

## Achando as Configurações

**Objetivo:** Saber chegar às Configurações de qualquer tela e entender como a lista de telas está dividida.

**Quem pode:** admin

**Palavras de busca:** configurações, onde ficam as configurações, ajustes do sistema, minha conta, dados da empresa, engrenagem, preferências

1. **A porta das Configurações** — O item "Configurações", com o desenho de uma engrenagem, fica no rodapé do menu da esquerda e aparece em todas as telas. Clicando nele, abre esta página, que lista todas as telas de ajuste do sistema. Cada cartão tem o nome da tela e uma frase dizendo para que ela serve. O primeiro grupo, "Sua empresa", vale para a clínica inteira: tipos de agendamento, equipe, marca, recursos que se ligam e desligam, plano e outros.
   - Rota: `/app/settings`
2. **Dados e acesso** — Rolando até o fim aparece "Dados e acesso": os pedidos de dados feitos pelos clientes ("LGPD"), as chaves para outros sistemas conversarem com o seu ("API Tokens"), os dados da linha telefônica para a IA fazer chamadas de voz ("Trunk SIP") e o endereço de um sistema de fora que a IA pode consultar ("Servidor MCP externo"). Cada pessoa só vê os cartões que o cargo dela permite usar, e alguns só aparecem quando o recurso está ligado na instalação: um atendente vê bem menos cartões que a dona da clínica.
3. **Sua conta** — Logo acima fica "Sua conta", com o que vale só para você: "Perfil" (nome, idioma, fuso e foto), "Segurança" (verificação em duas etapas e sessões), "Notificações" (sobre o que você quer ser avisado) e "App no celular" (instalar o sistema no telefone). Cada pessoa da equipe ajusta o seu, sem mexer no dos colegas. Para seguir, clique em "Perfil".

## Seu nome e sua foto

**Objetivo:** Mudar o nome com que você aparece no sistema e colocar uma foto no seu perfil.

**Quem pode:** admin

**Palavras de busca:** mudar meu nome, trocar nome do usuário, colocar foto de perfil, avatar, foto no canto da tela, meu perfil, trocar email

1. **A tela de Perfil** — O Perfil guarda os seus dados pessoais dentro do sistema. O "Email" ainda não dá para trocar: logo abaixo dele está escrito "Trocar email — em breve.". Em seguida ficam o "Nome completo", o "Idioma", o "Fuso horário" e o "Avatar URL", que é o endereço da sua foto.
   - Rota: `/app/settings/profile`
2. **Mudar o seu nome** — Apague o nome no campo "Nome completo" e escreva como você quer aparecer, com até 120 caracteres (espaços contam). Depois clique em "Salvar". Aparece o aviso "Perfil atualizado." e o novo nome passa a valer no menu do canto de cima, com as iniciais no círculo. Se ali ainda aparecer o nome antigo, recarregue a página.
3. **Colocar uma foto** — Ainda não dá para enviar um arquivo do computador. Para ter foto, cole no campo "Avatar URL" o endereço de uma imagem que já está na internet, aberta para qualquer pessoa (por exemplo, a foto da equipe no site da clínica). Prefira um endereço que comece com "https://". Depois de salvar, a foto entra no círculo do canto de cima, no lugar das iniciais. Se não aparecer, recarregue a página.
4. **Onde o nome e a foto aparecem** — Clique no círculo do canto de cima, à direita, para abrir o menu da sua conta. No alto dele aparecem o seu nome e o seu email, do jeito que estão gravados no Perfil. O círculo mostra a sua foto ou, sem foto, as iniciais do nome (aqui, "HP", de Helena Prado). Logo abaixo, quem administra o servidor vê "Modo administrador". "Sair" desconecta você de todos os aparelhos onde estava conectado, não só deste, e os avisos no celular também param.
   - Rota: `/app/settings/profile`

## Idioma e fuso horário

**Objetivo:** Escolher em que idioma o sistema aparece para você e conhecer o campo de fuso horário.

**Quem pode:** admin

**Palavras de busca:** mudar idioma, sistema em espanhol, trocar língua, fuso horário, horário errado, português ou espanhol

1. **Escolher o idioma** — Clique no campo "Idioma" para ver as opções. "Seguir o idioma da empresa" faz o sistema aparecer no idioma que a empresa escolheu para todos: se a empresa mudar, você muda junto. Escolhendo "Português (BR)" ou "Español" e clicando em "Salvar", vale a sua escolha, mesmo que a empresa use outro idioma.
   - Rota: `/app/settings/profile`
2. **O atalho do topo** — Há um jeito mais rápido de trocar o idioma, de qualquer tela: o botão com a sigla do idioma em uso ("PT"), no canto de cima, ao lado do botão de tema. Ao escolher outro idioma ali, a página recarrega na hora já no idioma novo, e a escolha fica gravada no seu perfil.
3. **O fuso horário** — O campo "Fuso horário" lista as cidades pelo nome técnico, como "America/Sao_Paulo" (horário de Brasília) ou "America/Manaus". A escolha fica guardada no seu perfil quando você clica em "Salvar", mas hoje ela ainda não muda os horários que você vê: a Agenda segue o fuso da empresa, para todos da equipe verem a mesma semana.

