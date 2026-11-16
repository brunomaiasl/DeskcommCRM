"use client";
/**
 * A aba "Fila" do diálogo Transferir: escolhe a FILA (setor) em vez de uma
 * pessoa. A conversa sai de quem a tinha e passa a esperar na fila — é o gesto
 * que o Clinia chama de transferir para o setor.
 *
 * Mora num componente próprio, montado SÓ com o módulo Setores ligado, por duas
 * razões: os hooks de consulta (`useSectors`, `useTransferirParaFila`) não
 * existem para quem não usa filas, e o diálogo de transferir é montado em todo
 * cabeçalho de conversa — inclusive nos testes que não têm `QueryClient`.
 */
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useT } from "@/hooks/i18n/useT";
import { useTransferirParaFila } from "@/hooks/inbox/useTransferirParaFila";
import { useSectors } from "@/hooks/team/useSectors";
import { ApiError } from "@/lib/api/types";
import { cn } from "@/lib/utils";

interface Props {
  conversationId: string;
  /** Fecha o diálogo (Cancelar, ou depois de transferir). */
  onClose: () => void;
}

export function TransferirParaFila({ conversationId, onClose }: Props) {
  const t = useT();
  const { data: respostaDasFilas } = useSectors(true);
  const filas = respostaDasFilas?.data ?? [];
  const transferir = useTransferirParaFila();
  const [escolhida, setEscolhida] = useState<string | null>(null);
  const [motivo, setMotivo] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  async function confirmar() {
    if (escolhida === null || transferir.isPending) return;
    setErro(null);
    try {
      await transferir.mutateAsync({
        conversationId,
        sectorId: escolhida,
        reason: motivo.trim() || undefined,
      });
      onClose();
    } catch (err) {
      // A mensagem da rota já vem traduzida no idioma de quem clicou; o
      // fallback cobre o que não é `ApiError` (rede, proxy).
      setErro(
        err instanceof ApiError ? err.message : t("Não foi possível transferir a conversa para a fila."),
      );
    }
  }

  return (
    <>
      <div className="space-y-4" data-testid="painel-transferir-fila">
        <div className="space-y-1.5">
          <Label>{t("Transferir para a fila")}</Label>
          {/* Rolagem própria: com muitas filas a lista não estica o diálogo. */}
          <div className="max-h-56 space-y-1 overflow-y-auto">
            {filas.map((fila) => (
              <button
                key={fila.id}
                type="button"
                data-fila={fila.id}
                aria-pressed={escolhida === fila.id}
                onClick={() => setEscolhida(fila.id)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md border px-2 py-1.5 text-left text-xs transition-colors",
                  "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
                  escolhida === fila.id
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-border bg-transparent hover:bg-surface-elevated",
                )}
              >
                {/* Sem cor declarada (migration 9084), o ponto não é desenhado. */}
                {fila.color != null && (
                  <span
                    aria-hidden
                    className="inline-block size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: fila.color }}
                  />
                )}
                <span className="min-w-0 flex-1 truncate">{fila.name}</span>
              </button>
            ))}
            {filas.length === 0 && (
              <p className="px-1 py-2 text-xs text-muted-foreground">{t("Nenhuma fila cadastrada.")}</p>
            )}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="reassign-reason-fila">{t("Motivo (opcional)")}</Label>
          <Textarea
            id="reassign-reason-fila"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder={t("Ex.: cliente pediu falar com o financeiro")}
            maxLength={500}
            rows={2}
          />
        </div>
        {erro !== null && (
          <p role="alert" className="text-xs text-destructive" data-testid="erro-ao-transferir-para-fila">
            {erro}
          </p>
        )}
      </div>
      <DialogFooter>
        <Button variant="ghost" onClick={onClose}>
          {t("Cancelar")}
        </Button>
        <Button
          disabled={escolhida === null || transferir.isPending}
          onClick={() => void confirmar()}
          data-testid="btn-transferir-para-fila"
        >
          {transferir.isPending ? t("Transferindo…") : t("Transferir para a fila")}
        </Button>
      </DialogFooter>
    </>
  );
}
