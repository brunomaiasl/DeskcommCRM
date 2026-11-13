# Incidents (Admin)

- **Tela:** `/admin/incidents`
- **Resumo:** A lista de problemas do servidor que pedem atenção: o que aconteceu, em qual empresa, quão grave é, e o lugar onde você anota como resolveu.
- **Fonte:** `curso/licoes/admin-incidents.json`

## Conhecendo a lista de incidentes

**Objetivo:** Abrir a lista de incidentes e entender o que cada coluna diz.

**Quem pode:** admin

**Palavras de busca:** incidentes, problemas no servidor, falhas registradas na instalação, alerta crítico, o que deu errado no sistema, lista de erros

1. **A lista de problemas do servidor** — "Incidents" é a lista de incidentes: o lugar feito para registrar problemas do servidor que pedem a atenção de quem administra, como um número de WhatsApp que caiu. Nesta versão, porém, nada no sistema abre um incidente sozinho, então numa instalação nova a lista vem vazia. A tela abre mostrando só os incidentes abertos, ou seja, os que ainda ninguém resolveu. Abaixo do título aparece quantos estão na lista.
   - Rota: `/admin/incidents`
2. **O que cada coluna diz** — Cada linha é um incidente. "Quando" diz há quanto tempo ele foi aberto. "Tipo" é o código do problema, em inglês. "Tenant" é a empresa onde aconteceu; o traço quer dizer que o problema é do servidor inteiro, não de uma empresa. "Severidade" diz a gravidade: "Crítico", "Atenção" ou "Info" (só para você saber). "Status" diz em que pé está: "Aberto" ou "Resolvido".
3. **Abrir um incidente** — No fim de cada linha, "Ver" abre a página do incidente, com os detalhes do problema e o botão para resolvê-lo. Você aprende essa página na última lição.

## Filtrando por situação e gravidade

**Objetivo:** Ver os incidentes já resolvidos, recortar só os críticos e desligar o filtro.

**Quem pode:** admin

**Palavras de busca:** ver incidentes resolvidos, filtrar incidentes críticos, histórico de problemas resolvidos, filtrar por gravidade, limpar filtros de incidentes

1. **Escolher a situação** — O primeiro filtro escolhe a situação dos incidentes. Ele começa em "Abertos". "Resolvidos" mostra os que alguém já resolveu. "Reconhecidos" é para os que alguém já viu mas ainda não resolveu; nesta versão nenhum botão da tela marca um incidente assim, então essa lista fica vazia. Clique em "Resolvidos".
   - Rota: `/admin/incidents`
2. **O histórico do que foi resolvido** — Agora a lista mostra só os incidentes resolvidos, com o selo verde "Resolvido". Abrindo um deles em "Ver", você lê a anotação de quem resolveu, explicando o que foi feito.
3. **Escolher a gravidade** — O segundo filtro recorta pela gravidade: "Crítico", "Atenção" ou "Info". Ele começa em "Todas severidades". Vamos voltar para os abertos e ver só os críticos, os que pedem ação primeiro. Clique em "Crítico".
4. **Os dois filtros juntos, e limpar** — Os filtros se somam: agora a lista mostra só os incidentes abertos e críticos. Com a gravidade escolhida aparece "Limpar filtros", que volta para todas as gravidades. A situação escolhida no primeiro filtro continua como está.

## Lendo e resolvendo um incidente

**Objetivo:** Ler a página de um incidente, registrar como ele foi resolvido e ver que ele saiu da lista de abertos.

**Quem pode:** admin

**Palavras de busca:** resolver incidente, marcar problema como resolvido, nota de resolução, detalhes do incidente, whatsapp caiu no servidor, fechar alerta crítico

1. **A página do incidente** — Esta é a página que abre ao clicar em "Ver": aqui, o número de WhatsApp da Clínica Bem Viver que caiu. No alto ficam o código do problema, os selos de gravidade e de situação, o apelido da empresa e a data em que foi aberto. "Incidentes", acima do título, volta para a lista.
   - Rota: `/admin/incidents`
2. **Os detalhes e o histórico** — "Payload" guarda os detalhes do problema, do jeito que foram anotados: aqui, qual número caiu e há quantos minutos. "Audit Trail" é o histórico deste incidente. Ele ainda está vazio porque é a primeira vez que alguém abre esta página. Cada visita fica anotada como "platform_admin.incident_viewed", e a resolução, como "incident.resolved": você vê as duas linhas daqui a pouco.
3. **Anotar como foi resolvido** — Depois de resolver o problema de verdade (aqui, reconectar o número na tela Conexões da própria empresa, não no Admin), clique em "Resolver incidente". Abre uma janela para você escrever o que causou o problema e o que foi feito. O botão "Confirmar resolução" só libera com pelo menos 10 caracteres escritos, e a anotação pode ter no máximo 1000.
4. **Incidente resolvido** — Ao confirmar, aparece o aviso "Incidente resolvido com sucesso". O selo de situação muda para "Resolvido", o botão "Resolver incidente" some e surge o quadro "Resolução", com a sua anotação e a data. No "Audit Trail" já aparecem a sua visita e a resolução, com dia e hora.
5. **Fora da lista de abertos** — Volte para a lista em "Incidentes". O incidente resolvido saiu da lista de abertos, e o número abaixo do título diminuiu. Ele continua guardado: escolha "Resolvidos" no primeiro filtro para encontrá-lo de novo.

