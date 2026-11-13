# Automações

- **Tela:** `/app/settings/automacoes`
- **Resumo:** Um interruptor só, que decide se a IA pode escolher o caminho dentro das suas automações, para a empresa inteira.
- **Fonte:** `curso/licoes/automacoes.json`

## Conhecendo a tela de Automações

**Objetivo:** Achar a tela de Automações e entender o que o interruptor dela controla.

**Quem pode:** admin

**Palavras de busca:** automações, configurar automação, IA decide, desligar IA das regras, interruptor da IA, freio da IA

1. **Onde fica** — Clique em "Configurações", no rodapé do menu lateral, para abrir a lista de todas as configurações. "Automações" fica no grupo "Sua empresa". Só quem é gerente ou administrador vê e abre esta tela.
   - Rota: `/app/settings`
2. **Uma tela, um interruptor** — Esta tela tem uma chave só. Ela vale para um passo específico das suas automações, o "A IA decide": nele, a IA lê a situação e escolhe uma entre as opções que quem montou a regra deixou prontas. Esse passo só funciona se a IA estiver configurada na sua instalação. A chave vale para todas as regras da empresa de uma vez.
3. **Ligado é o padrão** — A chave vem ligada: as regras que têm o passo "A IA decide" deixam a IA escolher. Ela vem assim para não quebrar regras que já existem. O texto embaixo do nome da chave resume o que acontece se você desligar. Ali, "modelo" quer dizer a IA, e a chave vale só para o passo "A IA decide": a ação "Mensagem escrita pela IA" continua funcionando. Como desligar está na última lição.

## Onde a IA decide numa automação

**Objetivo:** Reconhecer, numa automação, o passo que o interruptor controla.

**Quem pode:** admin

**Palavras de busca:** onde a IA escolhe, passo A IA decide, automação com IA, ver regra no designer, opções da IA

1. **Uma regra com esse passo** — As automações ficam no menu "Webhooks", aba "Automações". Esta regra, "Separar o novo paciente por especialidade", tem um passo em que a IA decide. Para ver os passos dela, clique em "Abrir no designer", o primeiro dos três ícones no canto de baixo, à direita, do cartão.
   - Rota: `/app/webhooks?aba=automacoes`
2. **A caixa "A IA decide"** — No designer, cada caixa é um passo da regra. A caixa "A IA decide" lista as opções da IA: Nutrição, Fisioterapia ou Odontologia, cada uma pondo uma etiqueta no paciente. A caixa logo acima dela, "Adicionar tag", não usa IA e roda sempre. A frase "Hoje este passo só se edita pela API" quer dizer que ele foi criado por uma integração técnica: pela tela dá para ver o passo, mas não dá para criar nem mudar. Na lista da esquerda há também "Mensagem pela IA": é outro tipo de passo, e a chave de Automações não mexe nele.
3. **O que a IA lê** — Clique na caixa para abrir o painel ao lado. Ele mostra a "Instrução para a IA", o texto que ela segue para escolher, e as "Opções". Com o interruptor de Automações desligado, é este passo que deixa de rodar, em todas as regras da empresa.

## Desligar a IA das automações e conferir

**Objetivo:** Desligar o passo "A IA decide" para a empresa inteira, ver onde isso aparece e ligar de novo.

**Quem pode:** admin

**Palavras de busca:** desligar A IA decide, IA parar de escolher nas regras, IA decide pulado, por que a automação não rodou, ligar IA decide de novo

1. **Desligar** — Para tirar a IA das escolhas "A IA decide" de todas as suas automações, clique na chave. Não há botão de salvar: a mudança vale no clique.
   - Rota: `/app/settings/automacoes`
2. **Desligado** — A chave fica desligada e a mudança já está salva. A partir de agora, o passo "A IA decide" é pulado em todas as regras e nada daquele passo acontece. Os outros passos das regras continuam rodando igual, inclusive a "Mensagem escrita pela IA", que esta chave não desliga.
3. **Onde aparece o passo pulado** — Em "Webhooks", aba "Atividade", cada cartão é uma vez que uma regra rodou. Neste exemplo, de 3 horas atrás, a empresa estava com a chave desligada: a etiqueta entrou, mas o passo da IA, que aparece com o nome técnico "ai_decide", foi pulado. Por isso o cartão diz "Parcial", e a frase embaixo explica o motivo.
   - Rota: `/app/webhooks?aba=atividade`
4. **Ligar de novo** — Para devolver as escolhas à IA, volte a Configurações, Automações, e clique na chave outra vez. Ligada, a IA volta a decidir nas próximas vezes que as regras rodarem. O que foi pulado enquanto ela estava desligada não é refeito.
   - Rota: `/app/settings/automacoes`

