# Extensões (Admin)

- **Tela:** `/admin/extensoes`
- **Resumo:** Onde quem instalou o sistema confere, sem mexer em nada, de onde vêm as extensões do servidor, quais estão instaladas e em quantas empresas cada uma está ligada.
- **Fonte:** `curso/licoes/admin-extensoes.json`

## Conhecendo a tela de Extensões do Admin

**Objetivo:** Saber para que serve a tela de Extensões do Admin e ler as suas duas partes: o catálogo de onde as extensões vêm e as extensões instaladas no servidor.

**Quem pode:** admin

**Palavras de busca:** extensões do servidor, de onde vêm as extensões, catálogo de extensões admitido, extensões instaladas na instalação, guias prontos do crm, admin

1. **Onde fica a tela** — No Admin, o item "Extensões" do menu abre as "Extensões da instalação": a visão do servidor inteiro, e não só da sua clínica. Extensões são guias prontos que orientam a equipe dentro do CRM. Esta tela só mostra: aqui não há botão para instalar, ligar ou configurar nada. Isso continua sendo feito dentro de cada empresa.
   - Rota: `/admin/extensoes`
2. **De onde vêm as extensões** — O primeiro quadro mostra os catálogos aceitos neste servidor. Catálogo é o arquivo com a lista de extensões que podem ser instaladas. Para cada um você vê o endereço de onde ele vem, a "Revisão" do arquivo, a data em que foi admitido e a "impressão digital": o começo de um código que identifica exatamente aquele arquivo, útil numa conversa com o suporte. O sistema não confere quem escreveu o catálogo: só admita arquivo de uma fonte em que você confia. Numa instalação nova aparece "Nenhum catálogo admitido ainda": enquanto for assim, não há extensão para instalar.
3. **As extensões instaladas** — O segundo quadro, "Instaladas neste servidor", lista cada extensão com o nome curto de quem a publica, uma barra, o nome dela e a versão em uso. Em "guias-clinica/retorno-de-pacientes v1.0.0", quem publica é "guias-clinica" e o guia é o "Retorno de pacientes". Uma extensão é instalada uma vez só, para o servidor todo; depois, cada empresa decide se a liga. Uma extensão removida some desta lista.

## Quem está usando cada extensão

**Objetivo:** Ler em quantas empresas cada extensão está ligada e saber onde ir para instalar ou configurar.

**Quem pode:** admin

**Palavras de busca:** quantas empresas usam a extensão, extensão ligada em quais clínicas, extensão instalada mas desligada, onde instalar uma extensão, configurar extensão da empresa, admin

1. **Instalada, mas desligada** — Embaixo de cada extensão, uma frase conta as empresas. No "Roteiro da primeira consulta", "0 de 2" quer dizer que duas empresas já mexeram nesse guia (ligaram ou desligaram em algum momento) e nenhuma está com ele ligado agora: ninguém está vendo esse guia. As empresas que nunca mexeram nele não entram na conta, e também não o veem. "Ligada" aqui é o mesmo que "Ativa" na tela da empresa. Ao lado vem a data em que a extensão foi instalada.
   - Rota: `/admin/extensoes`
2. **Ligada em uma empresa** — Já o "Retorno de pacientes" mostra "1 de 2": das duas empresas que já mexeram nesse guia, uma está com ele ligado. A tela diz quantas, não quais. Quando nenhuma empresa nunca ligou nem desligou a extensão, a frase muda para "Nenhuma empresa usa esta extensão".
3. **Para instalar ou configurar** — Admitir um catálogo, instalar, trocar de versão e ligar uma extensão são feitos na tela "Extensões" de dentro da empresa. O link "Extensões da empresa →", no fim desta tela, leva até lá. Clique nele.
4. **A tela da empresa** — Abriu a tela "Extensões" da empresa em que você está, aqui a Clínica Bem Viver. Como você administra o servidor, aparece o quadro "Oriente o trabalho com novos guias", marcado como "Responsável pela instalação", com "Escolher arquivo JSON" e "Admitir catálogo": é por ele que um catálogo entra no servidor. Embaixo, na aba "Instaladas", o administrador de cada empresa liga um guia para a própria equipe no interruptor "Ativa no CRM" e depois em "Salvar configuração". Aqui os dois aparecem "Desativada". O módulo "Extensões" ensina cada ação.

