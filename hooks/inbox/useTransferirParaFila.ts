"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient } from "@/lib/api/client";
import { useT } from "@/hooks/i18n/useT";

/**
 * "Transferir" para uma FILA (setor) — a conversa sai de quem a tinha e passa a
 * esperar na fila escolhida (`POST /transferir-para-fila`).
 *
 * Invalida a lista, a conversa aberta e as contagens: o número da fila de
 * destino sobe no menu lateral e o da aba Fila acompanha. O erro NÃO vira toast
 * aqui — o diálogo mostra a mesma frase junto do botão, onde o gesto começou.
 */
export function useTransferirParaFila() {
  const qc = useQueryClient();
  const t = useT();

  const invalidar = (conversationId: string) => {
    qc.invalidateQueries({ queryKey: ["conversations"] });
    qc.invalidateQueries({ queryKey: ["conversation", conversationId] });
    qc.invalidateQueries({ queryKey: ["conversation-counts"] });
    qc.invalidateQueries({ queryKey: ["transferencias", conversationId] });
  };

  return useMutation({
    mutationFn: async ({
      conversationId,
      sectorId,
      reason,
    }: {
      conversationId: string;
      sectorId: string;
      reason?: string;
    }) =>
      apiClient.post<{
        data: { id: string; sector_id: string; soltou_o_dono: boolean; redistribuiu: boolean };
      }>(`/api/v1/conversations/${conversationId}/transferir-para-fila`, {
        sector_id: sectorId,
        ...(reason ? { reason } : {}),
      }),
    onError: (_err, args) => invalidar(args.conversationId),
    onSuccess: (_res, args) => {
      invalidar(args.conversationId);
      toast.success(t("Conversa transferida para a fila."));
    },
  });
}
