"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { useRealtimeChannel } from "@/hooks/realtime/useRealtimeChannel";
import { apiClient } from "@/lib/api/client";
import type { TransferenciaDoFio } from "@/lib/inbox/transferencias-da-conversa";

/**
 * AS TRANSFERÊNCIAS DAQUELA CONVERSA — a linha "transferida para X, por Y" do fio.
 *
 * Mora em `conversations.metadata`, então o canal escuta `conversations` (já na
 * publicação `supabase_realtime`): quem transfere grava o metadata e a conversa
 * muda no mesmo instante — a linha aparece para todo mundo que está com a
 * conversa aberta, sem recarregar. Mesma carona de `usePassagensDaConversa`; a
 * explicação completa de por que NÃO escutar uma tabela de fora da publicação
 * está lá.
 *
 * Falha de leitura é silenciosa: o fio é o que a pessoa veio ler, e um toast por
 * causa de uma linha de histórico atrapalharia mais do que ajuda.
 */
export function useTransferenciasDaConversa(conversationId: string | null): TransferenciaDoFio[] {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["transferencias", conversationId] as const,
    enabled: !!conversationId,
    queryFn: () =>
      apiClient.get<{ data: TransferenciaDoFio[] }>(
        `/api/v1/conversations/${conversationId}/transferencias`,
      ),
    select: (res) => res.data,
  });

  const onChange = useCallback(() => {
    if (conversationId) qc.invalidateQueries({ queryKey: ["transferencias", conversationId] });
  }, [qc, conversationId]);

  useRealtimeChannel({
    name: conversationId
      ? `conversation-transferencias-${conversationId}`
      : "conversation-transferencias-disabled",
    postgresChanges: conversationId
      ? {
          event: "UPDATE",
          schema: "public",
          table: "conversations",
          filter: `id=eq.${conversationId}`,
        }
      : undefined,
    onChange,
    enabled: !!conversationId,
  });

  return query.data ?? [];
}
