"use client";
/**
 * O botão "Web Chat" do cabeçalho da conversa (migration 9348).
 *
 * Mostra por onde a conversa está sendo atendida agora — a página do Web Chat
 * ou o WhatsApp — e dá as três ações da equipe: voltar para o WhatsApp, mandar
 * outro link (o link vale 24 h, e conversa encerrada pede link novo) e desativar
 * o Web Chat nesta conversa.
 *
 * Some quando o Web Chat está desligado na organização (Configurações › Web
 * Chat), em grupo e em conversa encerrada: nesses casos não há nada a fazer aqui.
 */
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAcaoDoWebChat, useWebChatDaConversa, type LinkDoWebChat } from "@/hooks/inbox/useWebChatDaConversa";
import { useT } from "@/hooks/i18n/useT";
import { ChatCircle, Copy, PaperPlaneTilt } from "@/lib/ui/icons";

function quando(iso: string | null): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function LinhaDoLink({ link }: { link: LinkDoWebChat }) {
  const t = useT();
  const enviado = quando(link.created_at);
  const aberto = quando(link.opened_at);
  return (
    <li className="flex items-center justify-between gap-2 py-1 text-xs">
      <span className="text-muted-foreground">
        {t("Enviado")} {enviado}
        {aberto ? ` · ${t("aberto")} ${aberto}` : ` · ${t("não aberto")}`}
      </span>
      <Badge variant={link.ativo ? "default" : "outline"} className="h-4 shrink-0 px-1.5 text-[10px]">
        {link.ativo ? t("Ativo") : t("Encerrado")}
      </Badge>
    </li>
  );
}

export function WebChatDaConversa({
  conversationId,
  encerrada,
  grupo,
}: {
  conversationId: string;
  encerrada: boolean;
  grupo: boolean;
}) {
  const t = useT();
  const [aberto, setAberto] = useState(false);
  const [verLinks, setVerLinks] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const habilitado = !grupo && !encerrada;
  const { data: estado } = useWebChatDaConversa(conversationId, habilitado);
  const acao = useAcaoDoWebChat(conversationId);

  if (!habilitado || !estado || !estado.webchat_ligado) return null;

  const noWeb = estado.rota === "web";
  const ultimo = estado.ultimo_link;
  const ativos = estado.links.filter((l) => l.ativo).length;

  async function copiar() {
    if (!estado?.url_ativa) return;
    try {
      await navigator.clipboard.writeText(estado.url_ativa);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // sem permissão de área de transferência: nada a fazer
    }
  }

  return (
    <Popover open={aberto} onOpenChange={setAberto}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant={noWeb ? "secondary" : "ghost"}
          className="gap-1.5"
          aria-label={t("Web Chat")}
          title={t("Web Chat")}
          data-testid="webchat-da-conversa"
        >
          <ChatCircle size={16} aria-hidden />
          {noWeb ? <span className="text-xs font-semibold">{t("Web Chat")}</span> : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="p-4">
          <div className="mb-1 flex items-center justify-between gap-2">
            <p className="font-semibold">{t("Web Chat")}</p>
            <Badge variant="secondary" className="shrink-0 text-[11px]">
              {noWeb ? t("No Web Chat") : estado.desativado ? t("Desativado") : t("No WhatsApp")}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {noWeb
              ? t("As respostas chegam ao paciente pela página, sem custo de mensagem.")
              : estado.desativado
                ? t("O Web Chat está desligado nesta conversa. Mandar um link religa.")
                : t("As respostas saem pelo WhatsApp.")}
            {ultimo ? (
              <>
                {" "}
                {t("Último link enviado")} {quando(ultimo.created_at)}
                {ultimo.opened_at ? `, ${t("aberto")} ${quando(ultimo.opened_at)}` : `, ${t("ainda não aberto")}`}.
              </>
            ) : null}
          </p>
        </div>

        <div className="flex flex-col gap-2 border-t border-border p-4">
          {noWeb ? (
            <Button
              variant="outline"
              className="w-full"
              disabled={acao.isPending}
              onClick={() => acao.mutate("voltar_whatsapp")}
            >
              {t("Voltar para o WhatsApp")}
            </Button>
          ) : null}
          <div className="flex items-center justify-between gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="gap-1.5"
              disabled={acao.isPending}
              onClick={() => acao.mutate("enviar_link")}
            >
              <PaperPlaneTilt size={14} aria-hidden />
              {ultimo ? t("Enviar outro link") : t("Enviar link")}
            </Button>
            {!estado.desativado ? (
              <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground"
                disabled={acao.isPending}
                onClick={() => acao.mutate("desativar")}
              >
                {t("Desativar nesta conversa")}
              </Button>
            ) : null}
          </div>
          {estado.url_ativa ? (
            <Button size="sm" variant="ghost" className="justify-start gap-1.5" onClick={() => void copiar()}>
              <Copy size={14} aria-hidden />
              {copiado ? t("Link copiado") : t("Copiar link ativo")}
            </Button>
          ) : null}
        </div>

        {estado.links.length > 0 ? (
          <div className="border-t border-border px-4 py-2">
            <button
              type="button"
              className="flex w-full items-center justify-between py-1 text-xs text-muted-foreground"
              onClick={() => setVerLinks((v) => !v)}
              aria-expanded={verLinks}
            >
              <span>{t("Links desta conversa")}</span>
              <span>
                {ativos} {ativos === 1 ? t("ativo") : t("ativos")}
              </span>
            </button>
            {verLinks ? (
              <ul className="divide-y divide-border">
                {estado.links.map((l) => (
                  <LinhaDoLink key={l.id} link={l} />
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}
