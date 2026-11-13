# Skills

- **Tela:** `/app/ai/skills`
- **Resumo:** Manuais curtos de como agir em situações específicas, que o agente de IA consulta quando o assunto aparece na conversa: instalar do catálogo, editar e manter atualizados.
- **Fonte:** `curso/licoes/skills.json`

## Conhecendo a tela de Skills

**Objetivo:** Entender o que é uma skill, quando o agente usa uma e o que cada parte da tela mostra.

**Quem pode:** admin

**Palavras de busca:** skills, habilidades da IA, ensinar procedimento ao agente, playbook do agente, o que a IA sabe fazer, skills instaladas, catálogo de skills

1. **Onde fica a tela** — Skills não aparece direto no menu lateral. No grupo "Agente de IA" do menu, clique em "Ver tudo em IA". Na parte "Ensinar o agente" está o cartão "Skills". O caminho completo é: Agente de IA › Ver tudo em IA › Skills.
   - Rota: `/app/ai`
2. **O que é uma skill** — Uma skill é um manual curto de como agir numa situação específica, como marcar um horário ou explicar o preparo para a primeira consulta. O agente de IA sempre sabe que a skill existe, pelo nome e pela descrição. O passo a passo completo entra na conversa quando o assunto aparece: quando o cliente escreve uma das palavras-chave da skill, ou quando a conversa ou o contato tem uma etiqueta escolhida. Assim o agente não precisa carregar todos os manuais em toda resposta. A tela tem duas partes: "Skills instaladas", as que a sua empresa instalou ou enviou, e "Catálogo", as prontas da plataforma.
   - Rota: `/app/ai/skills`
3. **O que cada skill instalada mostra** — Cada skill instalada mostra o nome, um selo de origem e, à direita, a data da última mudança, em "atualizada em". O selo "manual" quer dizer que a sua equipe enviou a skill num arquivo .zip. O selo "do catálogo" quer dizer que ela foi instalada do Catálogo. Embaixo vem a descrição, a frase que o agente lê para saber para que a skill serve. "Editar" abre o texto da skill e "Desinstalar" tira a cópia da sua empresa.
4. **Enviar uma skill da sua equipe** — "Enviar skill (.zip)" instala uma skill escrita pela sua equipe. O arquivo .zip precisa ter, na raiz, um arquivo chamado SKILL.md, com o nome, a descrição e as palavras-chave no começo e o passo a passo logo abaixo. Ele também pode trazer as pastas "references" e "assets", com material de apoio. Se você enviar um .zip com o nome de uma skill que já existe, a sua versão passa a valer no lugar dela.
5. **O Catálogo** — No "Catálogo" ficam as skills prontas que a plataforma mantém e que a sua empresa ainda não instalou. Aqui sobrou a "objecao-preco", que ensina o agente a lidar com o cliente que acha caro, sem dar desconto que não foi autorizado. Atenção: mesmo sem instalar, uma skill do catálogo já vale para os seus agentes. "Instalar" cria uma cópia da sua empresa, que você pode editar.

## Instalar e desinstalar uma skill do catálogo

**Objetivo:** Instalar uma skill pronta da plataforma e saber o que acontece quando ela é desinstalada.

**Quem pode:** admin

**Palavras de busca:** instalar skill, skill do catálogo, cliente achou caro, objeção de preço, desinstalar skill, remover skill, copiar skill pronta

1. **Instalar** — Para instalar uma skill do catálogo, clique em "Instalar" na linha dela. Vamos instalar a "objecao-preco".
   - Rota: `/app/ai/skills`
2. **A skill passou para Skills instaladas** — Pronto: a "objecao-preco" entrou em "Skills instaladas", com o selo "do catálogo", e aparece por alguns segundos uma mensagem confirmando. O "Catálogo" ficou vazio, porque a sua empresa já instalou tudo o que a plataforma oferece hoje. A cópia é da sua empresa: dá para editar sem mexer no catálogo.
3. **Desinstalar** — "Desinstalar" apaga na hora a cópia da sua empresa, sem pedir confirmação. Numa skill "do catálogo", como esta, a versão da plataforma volta a valer para os agentes, como antes de instalar. Numa skill "manual", o agente deixa de usá-la, a não ser que ela tenha o mesmo nome de uma skill do catálogo: aí volta a valer a do catálogo.
4. **De volta ao Catálogo** — A "objecao-preco" saiu de "Skills instaladas" e voltou para o "Catálogo", com o botão "Instalar". Os agentes seguem usando a versão da plataforma.

## Editar uma skill

**Objetivo:** Mudar quando uma skill entra na conversa e o que ela manda o agente fazer, sem perder a versão anterior.

**Quem pode:** admin

**Palavras de busca:** editar skill, palavras-chave da skill, quando a skill entra, etiqueta que ativa skill, mudar procedimento do agente, voltar versão da skill, histórico de versões

1. **Abrir a skill** — Vamos ajustar a "preparo-primeira-consulta", que a clínica escreveu para orientar quem vem pela primeira vez. Clique em "Editar", na linha dela.
   - Rota: `/app/ai/skills`
2. **Descrição e palavras-chave** — A janela "Editar skill" mostra a skill em partes. "Descrição" é a frase curta que o agente sempre lê, para saber que a skill existe e para que serve; ela ocupa uma linha só, com até 500 caracteres. "Palavras-chave de ativação" são as palavras que fazem o passo a passo entrar na conversa: basta uma delas aparecer nas mensagens mais recentes do cliente. Maiúsculas e acentos não fazem diferença. Separe as palavras por vírgula; é preciso ter pelo menos uma.
3. **Acrescentar uma palavra e usar etiquetas** — Os pacientes perguntam muito se precisam ir em jejum. O passo a passo já responde isso, mas a palavra "jejum" não estava na lista: acrescentamos no fim, depois de uma vírgula. "Etiquetas que ativam" é opcional: se a conversa ou o contato tiver uma dessas etiquetas, a skill entra mesmo sem nenhuma palavra-chave. Aqui, quem tem a etiqueta "primeira-consulta" recebe este preparo mesmo que só diga "oi". Escreva a etiqueta igual à usada nas conversas e nos contatos: ela precisa ser a mesma palavra, não vale só um pedaço.
4. **O passo a passo e o histórico** — "Corpo" é o passo a passo que o agente segue quando a skill entra na conversa. Ele cabe em até 200 linhas: o contador ao lado mostra quantas já foram usadas e fica vermelho quando passa do limite, e aí o botão "Salvar" fica desligado. Embaixo, "Histórico de versões" lista cada versão guardada, com dia e hora; "em uso" marca a que vale agora.
5. **Salvar** — Clique em "Salvar". Salvar não apaga nada: cria uma versão nova, e a anterior fica guardada no histórico. "Cancelar" fecha a janela sem guardar.
6. **Voltar a uma versão anterior** — A janela fecha e aparece por alguns segundos a mensagem de que a skill foi atualizada e já vale para os agentes. Abrindo "Editar" de novo, a palavra "jejum" está na lista e o "Histórico de versões" tem duas linhas: a versão nova, "em uso", e a anterior. Se a mudança não ficou boa, clique em "Restaurar" ao lado da versão anterior: ela volta a valer na hora, sem precisar salvar.

## Adotar a versão nova de uma skill do catálogo

**Objetivo:** Entender o aviso de versão nova, conferir o que muda e decidir se adota.

**Quem pode:** admin

**Palavras de busca:** versão nova da skill, atualizar skill, adotar versão nova, skill desatualizada, o que mudou na skill, perdi minha edição da skill

1. **O aviso de versão nova** — A clínica instalou a "agendamento" do catálogo há dois meses e depois acrescentou duas palavras-chave. Desde então, a plataforma publicou uma versão nova dessa skill. Por isso a linha dela ganhou este aviso. A cópia da sua empresa não muda sozinha: ela continua valendo até você decidir.
   - Rota: `/app/ai/skills`
2. **O que muda se você adotar** — O aviso resume o que muda se você adotar a versão do catálogo: aqui, a "Descrição", as "Palavras-chave de ativação" e o "Procedimento (corpo)", com quantas linhas entram (+) e quantas saem (−). Palavras-chave que entram aparecem com o sinal +; as que saem ficam em vermelho, com o sinal −. Aqui saem "avaliação" e "encaixe": a clínica acrescentou essas palavras, e elas não existem na versão do catálogo.
3. **Adotar** — Se quiser a versão nova, clique em "Adotar versão nova". A versão do catálogo passa a valer, e o que a clínica editou sai de uso, mas fica guardado no "Histórico de versões". Para não perder as palavras da clínica, você pode acrescentá-las de novo depois, em "Editar".
4. **A versão nova já vale** — O aviso sumiu, a descrição já é a da versão nova e a data em "atualizada em" passou a ser a de agora. Também aparece por alguns segundos uma mensagem confirmando. O selo continua "do catálogo": quando a plataforma publicar outra versão, o aviso volta.
5. **Nada se perdeu** — Em "Editar", o "Histórico de versões" agora tem três linhas: a versão que você acabou de adotar, "em uso", a que a clínica editou e a primeira cópia instalada. Para voltar às palavras-chave da clínica, clique em "Restaurar" ao lado da versão editada. Ao voltar para ela, o aviso de versão nova aparece de novo.

