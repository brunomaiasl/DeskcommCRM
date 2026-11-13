# Destinos internos (Admin)

- **Tela:** `/admin/destinos-internos`
- **Resumo:** Onde quem cuida do servidor libera, um por um, os endereços da rede interna da própria máquina que o sistema pode chamar, como um serviço que você mesmo instalou ao lado dele.
- **Fonte:** `curso/licoes/admin-destinos-internos.json`

## Conhecendo os destinos internos

**Objetivo:** Entender por que o sistema recusa endereços da rede interna, o que esta lista libera e o que ela não libera.

**Quem pode:** admin

**Palavras de busca:** destinos internos, liberar endereço da rede interna, endereço 10.0.0 recusado, serviço rodando no próprio servidor, rede local do servidor, ip interno bloqueado, admin

1. **Onde fica a tela** — No Admin, o item "Destinos internos" do menu abre esta tela. Por proteção, o sistema não fala com endereços da rede interna do próprio servidor, como 10.0.0.5 ou 192.168.1.20: ele recusa antes de qualquer dado ou chave sair daqui. Aqui você abre exceções, endereço por endereço. Ela vale para o servidor inteiro, por isso só quem administra a instalação vê esta tela.
   - Rota: `/admin/destinos-internos`
2. **O que a lista libera, e só isso** — O quadro "Endereços liberados" explica o alcance da lista. Um endereço que está nela deixa de ser recusado só por ser da rede interna, e o resto das regras continua valendo. No servidor de verdade, o endereço ainda precisa começar com https e ter certificado válido: um serviço que só responde em http continua recusado, mesmo estando na lista. A lista também só vale para serviços que quem instalou o servidor apontou no arquivo de configuração, como o buscador de empresas da tela "Prospecção" ou o serviço que transcreve áudios. Esses serviços são instalados à parte, e a lista sozinha não liga nenhum deles. O endereço que uma empresa escolhe no painel dela, como o de um provedor de IA, continua sem poder apontar para dentro, esteja aqui ou não.
3. **Como escrever um endereço** — No campo "Um endereço por linha", cada linha é uma exceção. Vale um endereço exato, como 10.1.2.7, ou uma faixa, como 10.1.0.0/16, que libera todos os endereços que começam com 10.1. O texto clarinho no campo vazio é só um exemplo. Nome de máquina não entra: o sistema confere o endereço para o qual o nome aponta na hora da chamada, e não o nome.
4. **Libere só o necessário** — O aviso amarelo, no pé do quadro, é o conselho mais importante da tela. Cada endereço da lista é uma porta que o servidor passa a poder abrir para dentro da própria rede, levando junto a chave da instalação. Libere só o endereço exato do serviço que você mesmo colocou lá. Nunca libere uma faixa inteira só para não ter trabalho.

## Liberar um endereço

**Objetivo:** Escrever um endereço na lista, entender a recusa de uma linha errada, salvar e conferir o registro da mudança.

**Quem pode:** admin

**Palavras de busca:** liberar endereço interno, adicionar ip na lista, não entendi estas linhas, salvar destinos internos, buscador de empresas no próprio servidor, quem liberou o endereço

1. **Uma linha com erro** — Digamos que o buscador de empresas roda numa máquina da rede do servidor, no endereço 10.1.2.7, e que alguém escreveu também o nome dessa máquina, "servidor-de-busca". Ao clicar em "Salvar", nada é gravado: a tela mostra em vermelho "Não entendi estas linhas:" seguido da linha recusada. Assim você acha o erro sem conferir a lista inteira.
   - Rota: `/admin/destinos-internos`
2. **Salvar a lista certa** — Apague a linha com o nome, deixe só 10.1.2.7 e clique em "Salvar". Ao lado do botão aparece "Lista salva.". Em até meio minuto, esse endereço deixa de ser recusado para os serviços que o arquivo de configuração do servidor aponta para ele, desde que o endereço use https. Se você repetir uma linha, ela é gravada uma vez só.
3. **A mudança fica registrada** — Cada "Salvar" que dá certo vira uma linha no registro do servidor, a tela "Audit" do menu do Admin. A linha aparece como "platform.internal_destinations_updated" e mostra quando a mudança foi feita. O botão "Ver", no fim da linha, abre os detalhes. Em "Metadata", "de" é a lista de antes e "para" é a de depois. "vinha_do_env" verdadeiro quer dizer que, até ali, valia o que estava no arquivo de configuração. No quadro "Actor" aparece o e-mail de quem mudou, com parte escondida. Assim, se um dia alguém perguntar desde quando o servidor fala com a rede interna, a resposta está aqui.
   - Rota: `/admin/audit`

