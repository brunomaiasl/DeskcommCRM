"use client";

import { format } from "date-fns";

import { useLocaleDeData } from "@/hooks/i18n/useLocaleDeData";
import { useT } from "@/hooks/i18n/useT";
import { UsersThree } from "@/lib/ui/icons";
import type { TransferenciaDoFio } from "@/lib/inbox/transferencias-da-conversa";

/**
 * A linha de histórico de uma TRANSFERÊNCIA no fio da conversa — centralizada,
 * discreta, no desenho de "Conversa atribuída a [Fulano] / Por Fulano às 15:35":
 *
 *   Conversa transferida de Ana para [B] Beltrana
 *   Por Ana às 15:35 · Motivo: cliente pediu o financeiro
 *
 * Destino fila: "Conversa transferida para a fila [●] Agendamentos". Não é
 * mensagem e nunca vai ao cliente: é o rastro interno de quem passou a conversa
 * a quem, e fica no histórico para qualquer pessoa da equipe que a abra depois.
 */
export function TransferenciaLinha({ transferencia }: { transferencia: TransferenciaDoFio }) {
  const t = useT();
  const locale = useLocaleDeData();
  const hora = format(new Date(transferencia.em), "HH:mm", { locale });
  const quem = transferencia.por_nome ?? t("Alguém");
  const destino = transferencia.para_fila_nome ?? transferencia.para_nome ?? t("outro atendente");
  const paraFila = transferencia.para_fila_nome != null;

  return (
    <div
      className="flex w-full min-w-0 flex-col items-center gap-0.5 px-4 py-2 text-center"
      data-testid="transferencia-no-fio"
    >
      <p className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-muted-foreground">
        <span>
          {paraFila
            ? t("Conversa transferida para a fila")
            : transferencia.de_nome
              ? `${t("Conversa transferida de")} ${transferencia.de_nome} ${t("para")}`
              : t("Conversa transferida para")}
        </span>
        <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
          <span
            aria-hidden
            className="flex size-4 shrink-0 items-center justify-center rounded-full bg-muted text-[9px] font-bold text-muted-foreground"
          >
            {paraFila ? <UsersThree size={10} weight="bold" /> : [...destino][0]?.toUpperCase()}
          </span>
          {destino}
        </span>
      </p>
      <p className="text-xs text-muted-foreground/80">
        {t("Por")} {quem} {t("às")} {hora}
        {transferencia.motivo ? ` · ${t("Motivo")}: ${transferencia.motivo}` : ""}
      </p>
    </div>
  );
}
