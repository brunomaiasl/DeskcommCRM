# Operação do atendocrm.com — guia da instalação da clínica

Guia prático desta instalação (fork `brunomaiasl/DeskcommCRM`, branch
`feat/feegow-agenda`, base v1.109.0). Reúne as orientações dadas durante a
atualização de 13/11/2026.

> **Sem segredos neste arquivo.** O repositório é público. Senhas, tokens,
> chaves, IP do servidor e números de conta ficam só no `.env` do servidor e
> nas telas do sistema — nunca aqui.

---

## 1. Como a instalação está montada

| Peça | Onde |
|---|---|
| App, worker e scheduler | VPS Hostinger, pasta `/root/DeskcommCRM`, branch `deploy/v1109-webchat` |
| Banco | Supabase (projeto `whatsapp_CRM`, sa-east-1) |
| Imagens Docker | `ghcr.io/brunomaiasl/{deskcommcrm,deskcomm-worker,deskcomm-scheduler}:feat-feegow-agenda` (pacotes públicos) |
| Proxy/HTTPS | Traefik do EasyPanel (`docker-compose.traefik.yml`) |
| WhatsApp por QR | WAHA (`deskcommcrm-waha-1`) — **não atualizado** junto, versão fixa em `WAHA_IMAGE` |

A VPS é **compartilhada** com n8n, Chatwoot, Evolution e EasyPanel. Só se
mexe nos containers `deskcommcrm-*`.

O branch antigo do servidor (`deploy/vps-local`) foi mantido e há backups do
`.env` (`.env.bak-*`) para voltar atrás.

## 2. Como atualizar a produção

> **Não use o botão "Atualizar" de dentro do sistema.** Ele baixa a imagem do
> projeto original (`melgarafael`), sem Web Chat e sem Feegow.

1. Commit e push no fork, no branch `feat/feegow-agenda`.
2. Gerar as imagens no GitHub Actions (não no servidor — a VPS tem pouca CPU):
   ```bash
   gh workflow run publish-image.yml -R brunomaiasl/DeskcommCRM --ref feat/feegow-agenda
   ```
3. Na VPS:
   ```bash
   cd /root/DeskcommCRM
   git fetch fork feat/feegow-agenda && git merge --ff-only fork/feat/feegow-agenda
   docker compose -f docker-compose.prod.yml -f docker-compose.traefik.yml pull worker scheduler
   # O app tem `pull_policy: never` no compose: o `pull` do compose o PULA
   # ("app Skipped") e ele continuaria na imagem velha. Baixe a do app à mão:
   docker pull ghcr.io/brunomaiasl/deskcommcrm:feat-feegow-agenda
   docker compose -f docker-compose.prod.yml -f docker-compose.traefik.yml up -d --no-deps app worker scheduler
   ```
4. Conferir: `docker ps | grep deskcommcrm` (todos `healthy`), que o app roda a
   imagem nova (`docker inspect deskcommcrm-app-1 --format '{{.Image}}'` igual ao
   `Id` de `docker image inspect` da tag) e abrir o site.

**Mudança de banco (migration)** nunca vai avulsa em produção: backup antes e
aplicação na ordem do `supabase/baseline.sql`.

**Permissões do GHCR:** os pacotes nasceram do repositório privado
`AtendoCRM`. Em cada pacote, "Manage Actions access" precisa ter o
`DeskcommCRM` com papel **Write** — sem isso o build falha com
`permission_denied: read_package`.

## 3. WhatsApp: QR (WAHA) × API oficial

- **WAHA** = WhatsApp comum conectado por QR Code ("Números por QR" em
  Conexões). Sem custo por mensagem da Meta, mas não é oficial: risco de
  bloqueio e queda quando o celular desconecta.
- **API oficial (Meta)** — objetivo da clínica:
  1. Uma vez, em **Admin › API Oficial (Meta)** (`/admin/meta`): colar a chave
     secreta do app da Meta (Configurações do app › Básico) e copiar o token de
     verificação gerado para a Meta (WhatsApp › Configuração › Webhook →
     "Verificar token").
  2. Em **Conexões › API Oficial (Meta)** (`/app/connections?aba=oficial`):
     ID do número, ID da conta WhatsApp Business (WABA) e token de acesso →
     "Validar e conectar" → copiar a "URL de callback" para a Meta.
  3. Número registrado na API oficial normalmente deixa de funcionar no app do
     celular.

### Modelos de mensagem (Marketing, Utilidade, Autenticação)

Só aparecem **depois** de conectar a API oficial: Conexões › API Oficial ›
sub-aba **"Templates da Meta"**. Dá para criar o modelo no próprio sistema,
escolher a categoria e mandar para aprovação; "Sincronizar com a Meta"
atualiza o status. Nome, idioma e categoria não mudam depois de criado.

## 4. Web Chat (economia na API oficial)

- Na API oficial, toda mensagem enviada pela clínica é cobrada (Marketing é a
  mais cara; desde 01/10/2026 também as de serviço, com franquia mensal por
  número). Mensagens do paciente não são cobradas.
- No Web Chat a conversa continua numa página do próprio site
  (`https://atendocrm.com/chat/<token>`), **sem cobrança da Meta**, salva na
  mesma conversa, com agente e automações funcionando.
- O que ainda passa pelo WhatsApp: o convite com o link (1 por atendimento) e
  o aviso de "nova mensagem" (no máximo 1 por hora). Se o paciente voltar a
  escrever no WhatsApp, a conversa volta para lá.
- Link vale 24h; conversa encerrada exige link novo.

**Ativar:** Configurações › Atendimento › quadro "Web Chat" › "Ativo". O
botão do Web Chat dentro da conversa (ao lado da lupa) **só aparece com isso
ligado**. Para testar sem enviar link automático, deixe "convite automático"
desligado e use "Enviar link" na conversa.

**Modelos para fora das 24h:** dois modelos de **Utilidade** (convite e aviso),
com botão de URL `https://atendocrm.com/chat/{{1}}`; escolhê-los no quadro do
Web Chat.

## 5. Filas (Setores)

Equivalem às "filas" do Clinia. Módulo opcional, vem desligado.

1. Ligar: **Admin › Sistema** (`/admin/sistema`) → "Setores".
2. Criar: **Equipe › aba "Setores"** (`/app/team?aba=setores`) — nome, cor,
   descrição e atendentes.
3. Usar: filtro de fila na Inbox e botão **"Mover para fila"** na conversa. O
   agente de IA também move a conversa de setor quando não consegue agendar.

Ideia em aberto: deixar a Inbox no estilo Clinia (lista de filas com contador
na lateral, um único botão de filtro com menu e "Nova conversa" como ícone
"+" compacto no topo).

## 6. "Liberar" × "Devolver ao automático"

- **Liberar** — só para quem assumiu. Solta a conversa (fica sem dono). Se
  nunca houve passagem para humano, a IA volta; se já houve, a conversa vai
  para a **fila** esperando atendente.
- **Devolver ao automático** — qualquer pessoa da equipe. Religa a IA mesmo
  depois de passagem para humano, até em conversa encerrada. Se a trava for do
  **cliente**, religa em todas as conversas dele.
- Passe o mouse sobre o botão: a dica diz o efeito naquela conversa.

## 7. Google Ads (devolver a venda ao anúncio)

**Servidor (já feito em 13/11):** `.env` com `GOOGLE_ADS_OAUTH_CLIENT_ID`,
`GOOGLE_ADS_OAUTH_CLIENT_SECRET` e `GOOGLE_ADS_DEVELOPER_TOKEN` (o
desenvolvedor é opcional; com ele a lista de ações de conversão aparece
pronta). `REFRESH_TOKEN` e `CUSTOMER_ID` **não** vão no `.env`: o sistema gera
o próprio refresh token ao conectar e a conta é informada na tela.

**Google Cloud Console (mesmo projeto do Client ID):**
1. "Data Manager API" **ativada**.
2. Tela de consentimento OAuth configurada; se estiver "Em teste", o e-mail
   de quem vai autorizar em **"Usuários de teste"**.
3. Em "URIs de redirecionamento autorizados", exatamente:
   `https://atendocrm.com/api/v1/plataformas-de-anuncio/google/callback`

**No sistema:** Configurações › **Conversões**
(`/app/settings/conversoes`) → cartão do Google Ads → conectar/autorizar →
informar a conta e a ação de conversão → opcional "Lead qualificado". A aba
"Diagnóstico" mostra a saúde da ligação.

**Se a página do Google ficar só carregando:** feche a aba, abra o
atendocrm.com em aba nova, confira os 3 itens do Cloud Console acima e tente
em janela anônima (evita conflito entre contas Google logadas).

## 8. Meta Ads (ler resultados das campanhas)

Não vai no servidor — é na tela **Configurações › Meta Ads**
(`/app/settings/meta-ads`): token de acesso (com permissão `ads_read`) e conta
padrão `act_<números>`.

- **Trocar só a conta:** deixe o token em branco, escreva a conta nova com
  `act_` na frente e salve.
- **Trocar o token:** cole o novo no mesmo campo e salve.
- **Recomeçar:** "Desconectar" apaga token e conta na hora, sem confirmação.

Enviar a venda de volta para a Meta é na tela **Conversões**, com outro token.
`META_APP_ID`/`META_APP_SECRET` no `.env` só servem de reserva para a API
oficial do WhatsApp; o caminho certo é `/admin/meta`.

## 9. Feegow

Código presente, desligado até o token ser informado. O token (vence a cada ~3
meses) é colado em **Admin › Configuração da instalação** › "Agenda da clínica
(Feegow)" — cifrado, vale em até 30 s, sem reiniciar. Depois, ligar o pacote
"Agendar na agenda da clínica" nas capacidades do agente. Guia em
`docs/integrations/feegow.md`.

## 10. Pendências e segurança

- Ativar Web Chat e Setores; conectar a API oficial; criar os modelos.
- Revisar 2 correções antigas que só existiam no servidor: atividade da tag
  por regra (`add-tag.ts`) e "Devolver ao automático" em conversa fechada.
- **Trocar** as credenciais que circularam em chat: senha do banco, segredo
  OAuth e refresh token do Google, segredo do app e token da Meta.
- Remover a chave SSH de acesso do hPanel quando não for mais necessária.
- O worker manda relatórios de erro anônimos ao Sentry da comunidade por
  padrão; `SENTRY_DSN=off` no `.env` desliga.
