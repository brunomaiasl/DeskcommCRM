# Etapas do funil

- **Tela:** `/app/settings/tenant/pipelines`
- **Resumo:** Onde você monta as colunas de cada funil, do primeiro contato até a venda ou a desistência, e decide os motivos de perda.
- **Fonte:** `curso/licoes/etapas-do-funil.json`

## Conhecendo a tela de Etapas do funil

**Objetivo:** Achar a tela, entender o que é cada coluna do funil e reconhecer os ajustes de cada etapa.

**Quem pode:** admin

**Palavras de busca:** etapas do funil, colunas do funil, configurar funil, etapas do quadro, chance de fechamento, esfriando, onde mudo as etapas

1. **Onde fica a tela** — Etapas do funil é onde você monta as colunas de cada funil, ou seja, os passos que o cliente percorre até fechar com você. Ela não aparece direto no menu. No grupo "CRM" do menu, clique em "Ver tudo em CRM". Na parte "Preparar a venda" está o cartão "Etapas do funil". O caminho completo é: CRM › Ver tudo em CRM › Etapas do funil.
   - Rota: `/app/crm`
2. **Um cartão para cada funil** — Um funil é o caminho que o cliente faz até fechar, dividido em etapas. Cada etapa vira uma coluna no quadro do funil. Esta tela mostra um cartão para cada funil ativo da empresa. A Clínica Bem Viver tem dois: "Pacientes", aqui no alto, e "Pilates", que aparece quando você rola a tela. Nas próximas lições você mexe no "Pilates", para não mudar o funil principal.
   - Rota: `/app/settings/tenant/pipelines`
3. **Cada linha é uma coluna do quadro** — Em "Etapas deste funil", cada linha é uma coluna do quadro, na ordem em que o cliente avança: a linha 1 é a primeira coluna, à esquerda. Em cada linha você vê o nome da coluna, a chance de fechamento, as setas de ordem, o papel da coluna e o botão "Arquivar".
4. **A coluna de fechamento e a de perda** — Duas colunas têm papel especial. A de fechamento, marcada "Aqui o cliente fecha", é onde o negócio vira venda: no Pilates, "Matrícula feita". A de perda, "Aqui o cliente desiste", é onde ele se perde: "Não seguiu". O negócio que chega nelas é dado como ganho ou como perdido. Todo funil precisa de uma de cada. As outras colunas ficam em "Nada especial".
5. **A chance de fechamento** — "Chance de fechamento" é um número de 0 a 100: de cada 100 negócios nesta coluna, quantos costumam fechar. A tela Desempenho usa esse número no quadro "Previsão", que estima quanto deve entrar. Embaixo do campo, o sistema conta o que já aconteceu no último ano: 13 negócios encerrados passaram por "Aula experimental marcada" e 8 foram ganhos (62%). Com 10 casos ou mais aparece o botão "Usar 62%?", que grava o número para você. Com menos, a tela avisa "Poucos casos para sugerir".
6. **Esfriando e aviso para a equipe** — Embaixo de cada etapa ficam mais dois ajustes. "Janela de esfriando" é quanto tempo um negócio pode ficar parado na coluna, sem conversa nem mudança, antes de aparecer como esfriando no quadro e no Radar. Vazio vale 24 horas; em "Aula experimental feita" são 2 dias. Com a chave "Avisar a equipe na Central" ligada, todo negócio que entra na coluna abre um aviso na Central de avisos, o sino do alto da tela.
7. **Para onde o agente leva o cartão** — Mais abaixo, "Para onde o card vai em cada passo" liga o agente de IA às suas colunas. Cada linha é um momento do atendimento, como "Em negociação" ou "Ganho". Quando o agente chega nesse momento, o cartão do cliente anda sozinho para a etapa escolhida. "Não mover o card" também vale: o cartão fica onde está. Depois de mudar, clique em "Salvar estas escolhas".

## Renomear, criar e reordenar etapas

**Objetivo:** Trocar o nome de uma coluna, acrescentar uma etapa nova e colocá-la no lugar certo do funil.

**Quem pode:** admin

**Palavras de busca:** renomear etapa, criar etapa, nova coluna no funil, mudar ordem das etapas, acrescentar etapa, trocar nome da coluna

1. **Trocar o nome de uma coluna** — O funil Pilates começa com uma coluna chamada "Novo". Para trocar o nome, clique no nome, apague e escreva o novo. Aqui escrevemos "Pediu informação".
   - Rota: `/app/settings/tenant/pipelines`
2. **Gravar o nome** — Aperte Enter ou clique fora do campo: o nome é gravado na hora, sem botão de salvar. Se mudar de ideia antes disso, aperte Esc e o nome antigo volta. O nome novo vale em todo lugar: no quadro do funil e também aqui embaixo, em "Para onde o card vai em cada passo", onde "Novo lead" já aponta para "Pediu informação".
3. **Acrescentar uma etapa** — A clínica quer uma coluna para quem já escolheu o plano, mas ainda não pagou. No fim da lista de etapas do Pilates, clique em "Acrescentar etapa ao fim".
4. **O nome da etapa nova** — Escreva o nome da coluna, aqui "Aguardando pagamento", e clique em "Criar" (ou aperte Enter). "Cancelar" fecha sem criar nada.
5. **A etapa entra no fim** — A etapa nova sempre entra no fim do funil, depois até da coluna de perda. Para levá-la para o lugar certo, use a seta para cima: cada clique sobe a etapa uma posição, ou seja, uma coluna para a esquerda no quadro.
6. **No lugar certo** — Com dois cliques na seta para cima, "Aguardando pagamento" ficou entre "Aula experimental feita" e "Matrícula feita". É nessa posição que a coluna aparece no quadro do funil. A seta para baixo faz o caminho contrário.

## Mudar o papel de uma coluna e arquivar uma etapa

**Objetivo:** Entender como a coluna de fechamento muda de lugar e tirar do funil uma etapa que não serve mais, sem perder os negócios dela.

**Quem pode:** admin

**Palavras de busca:** arquivar etapa, apagar coluna do funil, excluir etapa, etapa de ganho, etapa de perda, mudar etapa de fechamento

1. **Escolher o papel da coluna** — O seletor "O que acontece nesta coluna" tem três escolhas: "Nada especial", "Aqui o cliente fecha" (a coluna de fechamento) e "Aqui o cliente desiste" (a coluna de perda). Veja o que acontece quando você abre o seletor de "Aula experimental feita" e escolhe "Aqui o cliente fecha".
   - Rota: `/app/settings/tenant/pipelines`
2. **A marcação muda de lugar** — Só uma coluna pode ser a de fechamento. Por isso a tela pede confirmação e diz qual coluna perde a marcação: aqui, "Matrícula feita". "Marcar mesmo assim" muda a marcação de lugar. Na clínica, quem fecha a venda é a matrícula, então clique em "Cancelar" e nada muda.
3. **Arquivar uma etapa** — A clínica não usa mais a coluna "Lista de espera". Arquivar é o jeito de tirar uma etapa do funil. Clique em "Arquivar" na linha dela. A tela explica antes: a coluna sai do quadro e para de receber negócios novos, nada é apagado, mas não dá para trazer a coluna de volta por esta tela.
4. **Para onde vão os negócios** — Quando a coluna tem negócios, a tela pergunta para onde eles vão. Aqui são 2 alunos na lista de espera. Clique em "Escolha a etapa" e escolha "Novo". A lista só oferece colunas comuns: a de fechamento e a de perda ficam de fora, porque mandar os negócios para lá os daria como ganhos ou perdidos.
5. **Mover e arquivar** — O botão "Mover os negócios e arquivar" fica apagado até você escolher o destino. Depois de escolher, clique nele: os negócios mudam de coluna primeiro, e só depois a etapa sai do funil.
6. **A etapa saiu do funil** — "Lista de espera" sumiu da lista e do quadro, e os 2 negócios dela foram para "Novo". A mudança fica registrada no histórico de cada negócio. A conta de negócios que aparece embaixo de cada etapa só se atualiza quando você recarrega a página.

## Cadastrar os motivos de perda

**Objetivo:** Trocar a lista pronta de motivos de perda pelos motivos da sua clínica, com uma categoria para cada um.

**Quem pode:** admin

**Palavras de busca:** motivos de perda, por que perdi o cliente, cadastrar motivo de perda, categoria de perda, vocabulário do funil, marcar como perdido, campos do negócio

1. **Abrir o editor do funil** — No fim do cartão de cada funil fica o botão "Editar vocabulário e campos deste funil". Ele abre os ajustes do funil que só o administrador muda, como os motivos de perda. Clique nele no cartão do Pilates.
   - Rota: `/app/settings/tenant/pipelines`
2. **Escrever os motivos** — Motivo de perda é a resposta para "por que este negócio não fechou?". Sem nada cadastrado, a janela "Marcar como perdido" mostra uma lista pronta, com motivos de loja como "Produto indisponível". Em "Motivos de perda (separados por vírgula)", escreva os motivos da sua clínica, separados por vírgula. Para cada motivo escrito aparece uma linha com o seletor de categoria.
3. **A categoria e salvar** — Ao lado de cada motivo, escolha a categoria: "Cliente", "Concorrência", "Mérito", "Nós" ou "Ausência". Ela junta motivos parecidos no relatório "Perdas" da tela Desempenho e no filtro "Categoria" que o quadro mostra quando você filtra os perdidos. Pense em quem fez o negócio se perder: "Achou caro" vai em "Nós", porque quem define o preço é a clínica; "Preferiu outro estúdio" vai em "Concorrência". "Sem categoria" também vale. Depois clique em "Salvar vocabulário e campos", no fim do editor: nada do editor vale antes disso.
4. **Os seus motivos na hora de perder** — Depois de salvar, abra o quadro do Pilates (menu "Funis" › "Pilates"), passe o mouse num cartão, clique nos três pontinhos e em "Marcar como perdido". A janela agora mostra os motivos da clínica no lugar da lista pronta, mais "Outro motivo" para o caso que não está na lista.

