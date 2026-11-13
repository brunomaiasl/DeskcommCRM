# Extensões

- **Tela:** `/app/extensions`
- **Resumo:** Onde você instala e liga guias prontos que orientam a equipe no CRM, como o roteiro da primeira consulta, vendo antes quais telas cada guia pode abrir.
- **Fonte:** `curso/licoes/extensoes.json`

## Conhecendo a tela de Extensões

**Objetivo:** Achar a tela de Extensões e ler o cartão de uma extensão instalada: se está ativa, a versão, de onde veio e quais telas ela pode abrir.

**Quem pode:** admin

**Palavras de busca:** extensões, guias do crm, o que é extensão, instalar guia no crm, complementos, permissões da extensão

1. **Onde ficam as extensões** — Abra "Configurações", no rodapé do menu lateral. Na parte "Sua empresa" fica o cartão "Extensões". Clique nele.
   - Rota: `/app/settings`
2. **Guias que orientam o trabalho** — Uma extensão é um guia pronto: um passo a passo que aparece no CRM para orientar a equipe, como o roteiro para marcar a primeira consulta. Ela não recebe os dados dos seus pacientes e não roda programa de ninguém: no máximo, um botão do guia abre uma tela do CRM, como a Agenda. A tela tem duas abas: "Instaladas", o que já está no seu CRM, e "Catálogo", o que pode ser instalado.
3. **O cartão de uma extensão** — Cada extensão instalada ganha um cartão. Ao lado do nome, o selo diz se ela está "Ativa" ou "Desativada" na sua empresa. O quadro cinza mostra a "Versão", a "Origem" (o endereço de onde ela veio) e a "Permissão": as telas do CRM que o guia pode abrir. Aqui, o "Roteiro da primeira consulta" só abre a Agenda e não lê seus dados.
4. **Procurar uma extensão** — Com muitas extensões, use a busca: digite parte do nome ou da descrição e a lista mostra só as que combinam. Aqui, "retorno" deixou só o guia "Retorno de pacientes". A busca vale nas duas abas.
5. **Filtrar por categoria** — Ao lado da busca, a lista de categorias separa as extensões pelo assunto: "Produtividade", "Vendas" ou "Atendimento". Escolha uma para ver só as daquele assunto, ou "Todas as categorias" para ver tudo de novo.

## Ativar um guia e usá-lo

**Objetivo:** Ligar uma extensão instalada na sua empresa, abrir o guia dela e achar os cartões do guia no CRM.

**Quem pode:** admin

**Palavras de busca:** ativar extensão, ligar guia, abrir guia, usar extensão no crm, guia da recepção, orientações instaladas

1. **Ligar a extensão** — No cartão do "Roteiro da primeira consulta", a chave "Ativa no CRM" liga a extensão só na sua empresa. Desligada, a frase embaixo avisa que a configuração fica guardada. Clique na chave.
   - Rota: `/app/extensions`
2. **Salvar a mudança** — A chave ligou e a frase mudou para "Os guias aparecem no hub do CRM." (o "hub do CRM" é a tela CRM, que vamos ver no fim desta lição). Mas nada vale antes de salvar: clique em "Salvar configuração".
3. **Extensão ativa** — Salvo. O selo passou para "Ativa" e aparece a frase "Configuração salva.". Agora surgiu o botão "Abrir guia", que leva ao conteúdo do guia. Clique nele.
4. **O conteúdo do guia** — O guia mostra o nome, a versão e as telas que ele pode abrir. Embaixo vêm os cartões com o passo a passo, como "Marcar a primeira consulta". O botão do cartão, aqui "Abrir a Agenda", confere de novo se a extensão continua ativa e então leva você à Agenda do CRM.
5. **O guia no dia a dia** — A equipe não precisa vir até Extensões. Na tela "CRM" (no menu lateral, o link "Ver tudo em CRM") aparece a parte "Orientações instaladas", com um cartão para cada passo a passo das extensões ativas. Clicar no cartão abre o guia com esse passo em primeiro lugar. O link "Gerenciar extensões" volta para esta configuração.
   - Rota: `/app/crm`

## Ajustar como os cartões aparecem

**Objetivo:** Deixar os cartões de um guia mais compactos e sem a descrição, e conferir o resultado na tela inicial do CRM.

**Quem pode:** admin

**Palavras de busca:** cartões compactos, densidade dos cards, esconder descrição do guia, aparência da extensão, configurar extensão, deixar guia menor

1. **As duas opções de aparência** — Abaixo da chave "Ativa no CRM" ficam duas opções que mudam só a aparência dos cartões do guia. "Densidade dos cards" escolhe entre "Confortável", com mais espaço, e "Compacta". "Mostrar descrição nos cards" liga ou desliga a frase curta embaixo do título de cada cartão.
   - Rota: `/app/extensions`
2. **Escolher a densidade** — Clique em "Densidade dos cards" e escolha "Compacta".
3. **Esconder a descrição e salvar** — Desligue "Mostrar descrição nos cards". Como a extensão está desativada, ligue também "Ativa no CRM": só os guias ativos aparecem para a equipe. Por fim, clique em "Salvar configuração".
4. **Configuração salva** — Pronto: apareceu a frase "Configuração salva.". A extensão está ativa, com a densidade "Compacta" e sem a descrição nos cartões. As escolhas ficaram gravadas na sua empresa.
5. **O resultado na tela inicial** — Agora abra a tela "CRM" (link "Ver tudo em CRM" no menu lateral). Em "Orientações instaladas", o cartão "Marcar a primeira consulta" ficou mais baixo e perdeu a frase de descrição embaixo do título. O nome do guia, no alto, e a linha "Abre Agenda; não lê seus dados." continuam lá.
   - Rota: `/app/crm`

## Catálogo, versões e remoção

**Objetivo:** Para quem administra a instalação: entender o catálogo, instalar e trocar a versão de uma extensão, desfazer uma troca e remover.

**Quem pode:** admin

**Palavras de busca:** catálogo de extensões, instalar extensão, atualizar extensão, voltar versão anterior, remover extensão, admitir catálogo

1. **Admitir um catálogo** — Este quadro só aparece para quem administra a instalação do CRM. Um catálogo é um arquivo com a lista de extensões que alguém oferece para instalar. Clique em "Escolher arquivo JSON", escolha o arquivo e depois em "Admitir catálogo". O CRM guarda quem admitiu, quando, o endereço de origem e o número da versão do arquivo, e as extensões dele passam a aparecer na aba "Catálogo". Admitir não instala nada: instalar é o passo seguinte.
   - Rota: `/app/extensions`
2. **A aba Catálogo** — Na aba "Catálogo" cada cartão é uma versão de uma extensão. O quadro mostra a "Identidade" (um código com o editor, o nome e a versão), a "Origem revisada", o "Publicado por" e "O que ela abre". Aqui o "Roteiro da primeira consulta" aparece em duas versões: a 1.1.0 já está instalada, e a 1.0.0 oferece "Trocar para 1.0.0".
3. **Instalar uma extensão nova** — "Orientações pós-consulta" ainda não está instalada. O botão "Instalar versão revisada" baixa o pacote do endereço do catálogo, confere se é o mesmo arquivo revisado e instala para a instalação inteira. Depois disso, o administrador de cada empresa decide se ativa.
4. **Trocar de versão** — Ao clicar em "Trocar para 1.0.0", o CRM pede confirmação. A versão escolhida substitui a atual em todas as empresas, e quem estava com a extensão ativa continua com ela ativa. Ao confirmar em "Trocar", o pacote é baixado de novo do endereço do catálogo; se ele estiver fora do ar, a troca falha e a versão atual continua. Aqui vamos só ler e clicar em "Cancelar".
5. **Desfazer a última troca** — De volta à aba "Instaladas", quem administra a instalação vê no cartão o quadro "Em todas as organizações", que conta quantas empresas estão com a extensão ativa. O botão "Desfazer a última troca (volta para 1.0.0)" devolve a versão anterior em todas as empresas sem baixar nada, então funciona mesmo com o catálogo fora do ar. Ele também pede confirmação.
6. **Remover da instalação** — "Remover da instalação" tira a extensão de todas as empresas: quem a usava deixa de ver os guias, e a configuração de cada empresa fica guardada. Não há desfazer: para voltar, é preciso reinstalar pelo catálogo, o que só funciona se o endereço do catálogo estiver no ar e ainda listar a versão. Depois, cada empresa ativa de novo. Aqui só abrimos a confirmação; para sair sem remover, clique em "Cancelar".
7. **Atividade recente** — No fim da tela, "Atividade recente" guarda o recibo de cada pedido: catálogo admitido, instalação, atualização ou troca de versão, troca desfeita, remoção e configuração. Cada um mostra o resultado ("Concluída", "Falhou" ou "Cancelada"), a data e a hora. Um pedido ainda em andamento aparece como "Preparando": quem o fez pode verificar ou cancelar; os outros responsáveis só podem cancelar.

