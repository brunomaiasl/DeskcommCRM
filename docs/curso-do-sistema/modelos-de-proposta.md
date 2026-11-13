# Modelos de proposta

- **Tela:** `/app/settings/tenant/proposals/modelos`
- **Resumo:** Onde você escolhe quais modelos de proposta a clínica usa, cria os seus e ajusta os textos que vão para o paciente.
- **Fonte:** `curso/licoes/modelos-de-proposta.json`

## Conhecendo os modelos

**Objetivo:** Encontrar a tela de Modelos de proposta e entender a diferença entre os modelos da plataforma e os da sua empresa.

**Quem pode:** admin

**Palavras de busca:** modelos de proposta, onde ficam os modelos de orçamento, modelo de proposta comercial, texto padrão da proposta, modelo de orçamento da clínica, lista de modelos

1. **Os modelos moram em Configurações** — Abra "Configurações", no rodapé do menu lateral. Na parte "Sua empresa" está o cartão "Modelos de proposta". Um modelo é o texto pronto que vira a proposta: as partes, a ordem e os campos que mudam de um paciente para outro.
   - Rota: `/app/settings`
2. **A lista de modelos** — Cada linha é um modelo. Embaixo do nome aparece de onde ele vem e quantas partes (seções) tem. "Da plataforma" são os modelos que já vêm prontos com o sistema, como o "Projeto personalizado". "Da empresa" são os que a clínica criou, como o "Pacote de nutrição — 3 meses".
3. **Os botões de cada tipo** — Num modelo da plataforma você tem "Não usar" e "Personalizar": o texto original não muda, mas você pode fazer uma cópia da clínica para editar. Num modelo da empresa você tem "Editar" e "Remover". "Não usar", "Personalizar" e "Editar" têm lições a seguir. "Remover" pergunta antes de agir e tira o modelo da lista. As propostas já enviadas não mudam.
4. **Duas formas de criar um modelo** — No alto da tela ficam as duas formas de criar um modelo da clínica. Em "Novo modelo em branco" você dá um nome e escreve as partes. Em "Criar a partir da proposta que a empresa já usa" você envia o arquivo da proposta que já usa (PDF ou arquivo de texto, até 5 MB), e a IA divide o texto em partes para você revisar antes de salvar.

## Deixar de usar um modelo

**Objetivo:** Tirar da lista de escolhas um modelo da plataforma que não serve para a clínica, e trazê-lo de volta se precisar.

**Quem pode:** admin

**Palavras de busca:** esconder modelo de proposta, desligar modelo que não uso, tirar modelo da lista, modelo não aparece para a IA, voltar a usar modelo

1. **Um modelo que não serve para a clínica** — O "Catálogo imobiliário" foi feito para imobiliárias. Para que ninguém escolha esse modelo por engano, clique em "Não usar" na linha dele.
   - Rota: `/app/settings/tenant/proposals/modelos`
2. **Desligado** — A linha passa a dizer "Desligado — não aparece para a IA nem no seletor". O modelo some da lista de escolhas ao criar uma proposta e a IA deixa de sugeri-lo. Propostas antigas feitas com ele continuam abrindo normalmente.
3. **Trazer de volta** — Mudou de ideia? Clique em "Usar" na mesma linha. O aviso de desligado some e o modelo volta para a lista de escolhas.

## Criar um modelo da clínica

**Objetivo:** Criar do zero um modelo de proposta para os planos de fisioterapia, com as partes e os campos que mudam de um paciente para outro.

**Quem pode:** admin

**Palavras de busca:** criar modelo de proposta, novo modelo de orçamento, proposta de plano de tratamento, escrever texto da proposta, campos que mudam por paciente, adicionar seção na proposta

1. **Dar um nome** — Em "Novo modelo em branco", escreva o nome do modelo, como "Plano de tratamento — Fisioterapia", e clique em "Criar". O botão só acende quando o nome tem pelo menos 2 letras.
   - Rota: `/app/settings/tenant/proposals/modelos`
2. **O modelo já nasce gravado** — Ao clicar em "Criar", o modelo é gravado com uma parte de exemplo, "Resumo da proposta", e abre para edição. O texto de exemplo só traz o nome do projeto e o do paciente. Por isso o aviso amarelo diz que o modelo ainda quase não pede nada ao paciente: com tão poucos campos, a IA não tem o que perguntar.
3. **Acrescentar uma parte** — Clique em "+ Seção" para acrescentar uma parte nova no fim. Dê um título e escreva o texto. O que muda de um paciente para outro vai entre chaves duplas, como {{project.objective}} (o objetivo) e {{included.list}} (o que está incluído). Na proposta, cada campo é trocado pelo dado daquele paciente.
4. **O que a IA vai perguntar** — Com os campos no texto, o aviso amarelo vira o quadro azul "Este modelo vai pedir ao cliente:", com cada campo e o nome dele. À direita, "Campos usados" lista todos os campos do modelo, inclusive os que o sistema preenche sozinho, como o nome do paciente.
5. **Salvar o modelo** — Clique em "Salvar modelo". Você volta para a lista, que confirma no alto "Modelo «Plano de tratamento — Fisioterapia» salvo.". O "×" da faixa fecha o aviso.
6. **O modelo novo na lista** — Descendo a lista, o modelo novo aparece junto dos outros da empresa, depois dos da plataforma e em ordem alfabética, com a marca "Da empresa" e 2 seções: a parte de exemplo e a que você acrescentou. A partir de agora ele pode ser escolhido ao criar uma proposta.

## Editar um modelo da clínica

**Objetivo:** Mudar a ordem das partes de um modelo, decidir quais aparecem sempre e salvar a mudança.

**Quem pode:** admin

**Palavras de busca:** editar modelo de proposta, mudar texto da proposta, ordem das seções da proposta, seção obrigatória ou opcional, remover parte do modelo

1. **Abrir o modelo** — Na lista, clique em "Editar" na linha do "Pacote de nutrição — 3 meses".
   - Rota: `/app/settings/tenant/proposals/modelos`
2. **Nome e para que serve** — No alto ficam o "Nome do modelo", que aparece na lista de escolhas ao criar uma proposta, e "Para que serve (opcional)", uma anotação sua sobre o modelo. Por enquanto essa anotação só aparece aqui, nesta tela.
3. **Os controles de cada parte** — Cada parte tem as setas ↑ e ↓, que sobem e descem a parte na proposta, e "Remover", que tira a parte do modelo. Embaixo do texto, "Só aparece se tiver dado" faz a parte sumir da proposta quando nenhum dos campos dela foi preenchido, como em "O que não está incluído". "Obrigatória" desmarca essa opção: a parte sai sempre. As duas não ficam marcadas juntas.
4. **Trocar a ordem** — Clicamos na seta ↑ de "Investimento": a parte subiu uma posição e agora vem antes de "O que não está incluído". A mudança aparece na hora, mas só vale depois de salvar.
5. **Salvar** — No fim da tela, clique em "Salvar modelo". Só depois de salvar a mudança passa a valer. Se você sair da tela sem salvar, ela se perde.
6. **Modelo salvo** — Você volta para a lista, com a confirmação "Modelo «Pacote de nutrição — 3 meses» salvo.". As próximas propostas feitas com este modelo já saem com a nova ordem.

## Personalizar um modelo da plataforma

**Objetivo:** Fazer uma cópia da clínica de um modelo da plataforma, ajustar o texto e saber como voltar ao original.

**Quem pode:** admin

**Palavras de busca:** personalizar modelo da plataforma, mudar modelo pronto, copiar modelo de proposta, voltar ao modelo original, ajustar texto do modelo

1. **Personalizar** — O texto de um modelo da plataforma não pode ser mudado. Para ajustar, clique em "Personalizar": a clínica ganha uma cópia própria, que abre na hora para edição. Aqui vamos personalizar o "Projeto personalizado".
   - Rota: `/app/settings/tenant/proposals/modelos`
2. **Ajustar o texto** — A cópia traz todas as partes do original. Troque o que não combina com a clínica. Aqui, o "Resumo da proposta" passou a falar em plano de cuidado em vez de design e desenvolvimento. Mantenha os campos entre chaves duplas: são eles que trazem o dado de cada paciente.
3. **Salvar a cópia** — Antes de salvar, desça pelas outras partes: "Garantia e suporte", por exemplo, ainda fala de desenvolvimento. Revise cada uma. Depois, no fim da tela, clique em "Salvar modelo" para gravar o texto ajustado. As próximas propostas com este modelo passam a usar o texto da clínica.
4. **Personalizado, com volta** — O modelo agora aparece como "Personalizado", com "Editar" para mudar de novo e o mesmo "Não usar" de antes. "Voltar ao modelo da plataforma" pergunta antes: "Voltar ao modelo da plataforma? As mudanças da empresa deixam de valer nas próximas propostas." Ao confirmar, a cópia da clínica é desativada e as próximas propostas voltam a usar o texto original.

