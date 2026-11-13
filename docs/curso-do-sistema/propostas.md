# Propostas

- **Tela:** `/app/settings/tenant/proposals`
- **Resumo:** Onde você liga as propostas comerciais da sua empresa e define o prazo de validade, as condições de pagamento e o aviso que a equipe recebe quando a IA prepara uma proposta.
- **Fonte:** `curso/licoes/propostas.json`

## Ligar as propostas da clínica

**Objetivo:** Encontrar a tela de Propostas em Configurações e ligar as propostas comerciais para a sua empresa.

**Quem pode:** admin

**Palavras de busca:** ligar propostas, ativar proposta comercial, orçamento para cliente, onde fica propostas, configurar propostas, mandar orçamento

1. **Propostas mora em Configurações** — Abra "Configurações", no rodapé do menu lateral. Na parte "Sua empresa" está o cartão "Propostas". É ali que você decide se a sua empresa usa propostas comerciais: orçamentos que você monta, revisa e manda para o cliente aceitar.
   - Rota: `/app/settings`
2. **A chave que liga tudo** — A tela começa com a chave "Ligar propostas comerciais para esta organização". Ela vem desligada. Enquanto estiver assim, o cartão "Propostas" não aparece em "Ver tudo em CRM" e ninguém da equipe consegue criar uma proposta.
3. **Ligar e salvar** — Clique na chave para ligá-la. Ela muda de cor, mas nada foi gravado ainda: a mudança só vale depois que você clica em "Salvar", no fim da tela.
4. **Propostas ligadas** — Depois de salvar, aparece no alto o link "Modelos de proposta". Ele é o sinal de que a mudança foi gravada, porque a tela não mostra mensagem de confirmação. É a mesma tela do cartão "Modelos de proposta" em Configurações: lá você escolhe e personaliza os modelos que dão a cara das suas propostas.
5. **Onde ficam as propostas no dia a dia** — Com as propostas ligadas, o cartão "Propostas" passa a aparecer em "Ver tudo em CRM", na parte "Fechar a venda". É por ele que você e a equipe criam, revisam e enviam as propostas. O envio vai pelo WhatsApp, na conversa que o paciente já tem com a clínica, então é preciso ter um número de WhatsApp conectado.
   - Rota: `/app/crm`

## Validade e condições padrão

**Objetivo:** Definir a validade que a IA usa ao rascunhar propostas e o texto de condições de pagamento que entra nas propostas sem você digitar de novo.

**Quem pode:** admin

**Palavras de busca:** validade da proposta, prazo do orçamento, condições de pagamento padrão, parcelamento na proposta, texto padrão da proposta, quantos dias vale o orçamento

1. **Os dois campos de padrão** — Logo abaixo da chave ficam dois campos que valem para todas as propostas da empresa: "Validade padrão (dias)" e "Condições padrão". A validade vem com 15 dias e as condições vêm em branco.
   - Rota: `/app/settings/tenant/proposals`
2. **Quantos dias a proposta vale** — Em "Validade padrão (dias)", digite por quantos dias o paciente pode aceitar a proposta, de 1 a 365. Aqui a clínica usa 10 dias. Esse número vale para as propostas que a IA rascunha. Quando você cria uma proposta à mão, confira o campo "Validade da proposta": lá a data já vem com 15 dias.
3. **As condições que se repetem** — Em "Condições padrão", escreva o que vale para quase todo orçamento: formas de pagamento, desconto à vista, prazo dos pacotes. Esse texto entra nas propostas que a IA rascunha e também nas que você cria sem preencher o campo "Condições de pagamento / Observações".
4. **Salvar** — Clique em "Salvar". Enquanto grava, o botão mostra "Salvando…" e depois volta a "Salvar", sem mensagem de confirmação. Se a validade estiver fora de 1 a 365 dias, nada é gravado e aparece o aviso "Campos inválidos.". As propostas que já existem não mudam: os novos padrões valem para as próximas.

## Aviso quando a IA prepara uma proposta

**Objetivo:** Entender o aviso no WhatsApp da equipe quando a IA rascunha uma proposta, e saber desligá-lo.

**Quem pode:** admin

**Palavras de busca:** aviso de proposta no whatsapp, ia fez proposta, notificação de orçamento, desligar aviso da proposta, rascunho da ia, revisar proposta da ia

1. **O aviso para a equipe** — A última chave é "Avisar no WhatsApp da equipe quando a IA rascunhar uma proposta". Ela vem ligada. Quando a IA prepara uma proposta, a equipe recebe no WhatsApp o título, o primeiro nome do paciente e um link para revisar e enviar. O paciente não recebe nada: a proposta só vai para ele depois que alguém da equipe revisar.
   - Rota: `/app/settings/tenant/proposals`
2. **Para onde o aviso vai** — O aviso usa o número escolhido na tela "Aviso no WhatsApp", em "Ver tudo em IA" (não é o "Aviso de agendamento" de Configurações, e só o administrador abre essa tela). Se esse aviso não estiver configurado e ligado lá, ou se o número estiver desconectado, nada é enviado, mesmo com esta chave ligada.
3. **Desligar o aviso** — Prefere conferir as propostas da IA só pela tela? Clique na chave para desligá-la e depois em "Salvar". As propostas continuam sendo rascunhadas e continuam aparecendo em "Alertas" como prontas para revisão; só a mensagem no WhatsApp da equipe deixa de ser enviada.

