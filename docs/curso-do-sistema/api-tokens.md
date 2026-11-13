# API Tokens

- **Tela:** `/app/settings/api-tokens`
- **Resumo:** Onde você cria as chaves que deixam outro sistema (uma agenda online, um prontuário, um assistente de IA) conversar com o seu CRM, escolhe o que cada chave pode fazer e desliga a que não usa mais.
- **Fonte:** `curso/licoes/api-tokens.json`

## Conhecendo a tela de API Tokens

**Objetivo:** Achar a tela de API Tokens e ler a lista de chaves: o nome, o começo da chave, o que cada uma pode fazer, se está ligada e até quando vale.

**Quem pode:** admin

**Palavras de busca:** api tokens, chave de integração, ligar outro sistema ao crm, integrar agenda online, token de acesso, conectar assistente de ia

1. **Onde ficam as chaves** — Abra "Configurações", no rodapé do menu lateral. Na parte "Dados e acesso" fica o cartão "API Tokens". Clique nele.
   - Rota: `/app/settings`
2. **Uma chave para cada sistema** — Um token é uma chave. Você entrega a chave a outro sistema, como a agenda online do site ou um assistente de IA, e ele passa a ler e gravar no seu CRM sem ninguém digitar nada. Cada linha da lista é uma chave. A frase do topo avisa: a chave completa aparece uma única vez, no momento em que você cria.
3. **Nome, começo da chave e permissões** — Em "Nome" fica o apelido que você deu à chave. Em "Prefixo" aparece só o começo dela: o sistema não guarda a chave inteira, então este pedaço serve para você conferir qual chave um sistema está usando. Em "Escopos" estão as permissões da chave, com o nome curto de cada uma. O assistente de IA, por exemplo, pode ler o CRM ("mcp:read"), agir nele ("mcp:write") e age com poder de gerente ("role:manager").
4. **Ligada, desligada e validade** — A coluna "Status" diz se a chave funciona: "Ativo" quer dizer ligada, "Revogado" quer dizer desligada para sempre. A coluna "Expira" mostra a data em que a chave deixa de valer sozinha. Um traço ("—") quer dizer que ela não tem data para vencer: vale até alguém revogar.

## Criar uma chave para outro sistema

**Objetivo:** Criar uma chave com nome, permissões e validade, e guardar a chave completa antes de fechar a janela.

**Quem pode:** admin

**Palavras de busca:** criar token, gerar chave de api, integrar prontuário com o crm, nova chave de integração, copiar token, permissões do token

1. **Começar uma chave nova** — Neste exemplo, o prontuário eletrônico da clínica vai consultar a lista de pacientes do CRM. Ele precisa de uma chave. Clique em "Criar token", no alto da tela.
   - Rota: `/app/settings/api-tokens`
2. **Dê um nome que diga de quem é** — Abre a janela "Criar novo token". Em "Nome", escreva para qual sistema é a chave, aqui "Prontuário eletrônico da clínica". O nome precisa ter pelo menos 2 letras. É ele que vai te dizer, meses depois, se a chave ainda está em uso.
3. **Marque só o que o sistema precisa** — Em "Escopos" ficam as permissões. Cada botão traz o nome curto e, ao lado, o que ele libera. Clique para marcar: o botão marcado ganha uma borda colorida. O prontuário só precisa consultar os pacientes, então marque só "mcp:read". Apesar de a descrição falar em agentes de IA, é esta permissão que deixa qualquer sistema ler o CRM. Quanto menos permissões, menor o estrago se a chave cair em mãos erradas.
4. **Validade e criar** — Em "Expira em (dias) — opcional" você diz por quantos dias a chave vale, de 1 a 365. Aqui, 180. O "365" apagado no campo vazio é um exemplo: sem digitar nada, a chave vale até você revogar. Depois clique em "Criar".
5. **Copie a chave agora** — Abre a janela "Token criado" com a chave completa. Clique em "Copiar para clipboard" e cole a chave no outro sistema, ou num lugar seguro. Esta é a única vez que ela aparece: o CRM guarda só uma impressão da chave, não a chave, e não consegue mostrá-la de novo. Se você perder, crie outra e revogue esta.
6. **A chave nova na lista** — Clique em "Fechar". A chave nova aparece no topo da lista, "Ativo", com as permissões que você marcou e a data em que vence. Daqui para frente, a lista mostra só o começo dela.

## Desligar uma chave que não se usa mais

**Objetivo:** Saber quando e como revogar uma chave, o que acontece depois e como trocar uma chave sem deixar o outro sistema parado.

**Quem pode:** admin

**Palavras de busca:** revogar token, desligar chave de api, cancelar integração, chave vazou, trocar token, parar outro sistema de acessar o crm

1. **O botão Revogar** — Cada chave ligada tem o botão "Revogar" no fim da linha. Ele desliga a chave na hora, sem pedir confirmação, e não tem volta. A partir daí, o sistema que usava a chave é recusado e não lê nem grava mais nada no CRM. Use quando parar de usar um sistema ou quando desconfiar que a chave vazou.
   - Rota: `/app/settings/api-tokens`
2. **Depois de revogada** — A chave revogada continua na lista, com o selo "Revogado" e sem o botão "Revogar". Ela fica ali como registro de que existiu. Revogada não volta a funcionar: se o sistema precisar de acesso de novo, crie outra chave.
3. **Trocar uma chave sem parar nada** — Para trocar a chave de um sistema, siga esta ordem: crie a chave nova em "Criar token", cole a chave nova no outro sistema e só então revogue a antiga. Revogando primeiro, o sistema fica sem acesso no intervalo.

