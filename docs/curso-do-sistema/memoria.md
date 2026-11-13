# Memória

- **Tela:** `/app/ai/memory`
- **Resumo:** As regras da casa e os aprendizados que todos os agentes de IA da empresa seguem em qualquer conversa: escrever, publicar, voltar a uma versão antiga e arquivar o que não vale mais.
- **Fonte:** `curso/licoes/memoria.json`

## Conhecendo a tela de Memória

**Objetivo:** Entender o que a Memória da IA guarda, onde ela fica e de onde vem cada aprendizado.

**Quem pode:** admin

**Palavras de busca:** memória da ia, regras da casa, regras para todos os agentes, o que o agente aprendeu, política da clínica para o agente, ensinar o agente, aprendizados do agente

1. **Onde fica a tela** — Memória não aparece direto no menu lateral. No grupo "Agente de IA" do menu, clique em "Ver tudo em IA". Na parte "Ensinar o agente" está o cartão "Memória". O caminho completo é: Agente de IA › Ver tudo em IA › Memória.
   - Rota: `/app/ai`
2. **Para que serve** — O agente de IA é o atendente virtual que conversa com os pacientes. A "Memória da IA" guarda as regras e os aprendizados que TODOS os agentes de IA da clínica seguem. Ela não é a configuração de um agente só: o que está aqui vale para todos de uma vez. Antes de cada resposta, o agente lê o que está em vigor nesta tela.
   - Rota: `/app/ai/memory`
3. **O documento da organização** — O primeiro quadro, "Documento da organização", é o texto-base com as regras gerais da clínica: endereço, horário, o que o agente nunca deve fazer. Escreva como você explicaria a um atendente novo. O selo "v2 ativa" diz que os agentes estão lendo a versão 2 deste texto.
4. **O histórico de versões** — Cada vez que alguém publica o documento, nasce uma versão nova, com número, data e hora. A anterior não é apagada: fica guardada em "Histórico de versões". O selo "ativa" marca a versão que os agentes estão lendo. Clicar numa versão mostra o texto dela.
5. **Os aprendizados** — O segundo quadro, "Aprendizados", guarda fatos e correções pontuais, um por item, como o estacionamento conveniado. Cada item tem um título, um selo de origem, a data em que entrou e, embaixo, o texto que o agente lê. Os agentes levam em conta todos os aprendizados ativos, junto com o documento.
6. **De onde veio cada aprendizado** — O selo ao lado do título diz quem escreveu o aprendizado. "manual": alguém da equipe escreveu nesta tela. "aprendido automaticamente": o sistema revisou conversas reais, sugeriu o aprendizado, e um administrador aprovou a sugestão. "anotado pelo agente": um agente de IA anotou sozinho, durante o trabalho.

## Escrever e publicar as regras da casa

**Objetivo:** Mudar o texto-base que todos os agentes seguem e colocar a versão nova em vigor.

**Quem pode:** admin

**Palavras de busca:** publicar regras, mudar as regras do agente, editar memória, regra nova para o agente, agente não segue regra, publicar versão, política da casa

1. **O que escrever aqui** — Tudo o que está neste quadro vai junto em cada resposta do agente. Por isso, guarde aqui só regras curtas que valem para qualquer atendimento: endereço, horário, o que nunca prometer. Uma regra por linha, em frases diretas. Material longo, como perguntas frequentes ou o preparo de exames, fica melhor em "Conhecimento", onde o agente procura o trecho que tem a ver com a pergunta.
   - Rota: `/app/ai/memory`
2. **Escrever a regra nova** — Clique no quadro e escreva. Aqui, a clínica acrescentou no fim uma regra sobre remarcação. Embaixo, o contador mostra quantos caracteres o texto tem. Enquanto você escreve, nada muda para os agentes. O botão "Publicar versão" só acende quando o texto está diferente da versão ativa e não está vazio.
3. **A versão nova vale para todos** — Depois do clique, o texto vira a versão 3, e o selo passa a dizer "v3 ativa". Um aviso rápido confirma a publicação. Na próxima resposta, todos os agentes já seguem o texto novo. A versão 2 continua guardada no histórico, logo abaixo.

## Voltar a uma versão anterior

**Objetivo:** Recuperar o texto de uma versão antiga do documento sem apagar nenhuma versão.

**Quem pode:** admin

**Palavras de busca:** voltar versão, desfazer regra, versão anterior da memória, restaurar regras, histórico de versões, regra nova deu problema

1. **Abrir uma versão antiga** — Se uma regra nova deu problema, dá para voltar a um texto antigo. Em "Histórico de versões", clique na versão que você quer ver. Aqui, a v1.
   - Rota: `/app/ai/memory`
2. **Ler o texto da versão** — Abre uma janela com o título "Versão v1", a data em que ela foi publicada e o texto exato daquela versão. Para fechar sem mudar nada, clique no X. Para voltar a esse texto, clique em "Restaurar como nova versão".
3. **Conferir e publicar** — O texto da v1 é copiado para o quadro, e a janela fecha. Por enquanto nada mudou para os agentes: o selo ainda diz "v2 ativa", e um aviso rápido lembra de clicar em "Publicar versão" para confirmar. Confira o texto, ajuste se quiser e publique. Ele entra como uma versão nova, a v3. A v2 continua no histórico: nenhuma versão é apagada.

## Ensinar, arquivar e reativar aprendizados

**Objetivo:** Ensinar aos agentes um fato pontual e tirar de uso o que não vale mais, sem perder nada.

**Quem pode:** admin

**Palavras de busca:** novo aprendizado, ensinar um fato ao agente, corrigir o agente, arquivar aprendizado, reativar aprendizado, apagar aprendizado, o que o agente anotou

1. **Abrir o formulário** — Um aprendizado é um fato ou uma correção pontual, como "o retorno em até 30 dias não é cobrado". Ao contrário do documento, ele não tem versão nem precisa ser publicado. Para ensinar um, clique em "Novo aprendizado", no quadro "Aprendizados".
   - Rota: `/app/ai/memory`
2. **Escrever o aprendizado** — Em "Título", escreva um resumo curto, de até 200 caracteres. Em "O que o agente deve saber", escreva a regra em texto simples, do jeito que você explicaria a um colega. Os dois campos são obrigatórios. Depois, clique em "Salvar aprendizado". "Cancelar" fecha o formulário sem guardar.
3. **O aprendizado já vale** — O aprendizado novo aparece no topo da lista, com o selo "manual" e a data de hoje. Ele já vale: na próxima resposta, todos os agentes o levam em conta.
4. **Arquivar o que não vale mais** — Quando um aprendizado deixa de valer, ou quando você não concorda com algo que um agente anotou, clique em "Arquivar", no pé do item. Aqui, vamos arquivar a anotação do agente sobre o pilates.
5. **Onde ficam os arquivados** — O item sai da lista, e os agentes deixam de considerá-lo a partir da próxima resposta. Ele não foi apagado: fica entre os arquivados. Para vê-los, clique em "Ver aprendizados arquivados". Essa opção só aparece quando existe pelo menos um aprendizado arquivado.
6. **Reativar um aprendizado** — Agora a lista mostra só os arquivados, cada um com o botão "Reativar". Reativar devolve o aprendizado à lista dos ativos, e os agentes voltam a levá-lo em conta. Para voltar à lista dos ativos, clique em "Ver aprendizados ativos".

