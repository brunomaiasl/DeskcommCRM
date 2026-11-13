"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { showApiError } from "@/components/feedback/ApiErrorToast";
import { apiClient } from "@/lib/api/client";

export interface LinkDoWebChat {
  id: string;
  origem: "convite_automatico" | "manual";
  created_at: string;
  expires_at: string;
  revoked_at: string | null;
  revoked_reason: string | null;
  opened_at: string | null;
  last_seen_at: string | null;
  ativo: boolean;
}

export interface EstadoDoWebChat {
  webchat_ligado: boolean;
  desativado: boolean;
  rota: "web" | "whatsapp";
  url_ativa: string | null;
  ultimo_link: LinkDoWebChat | null;
  links: LinkDoWebChat[];
}

export type AcaoDoWebChat = "enviar_link" | "voltar_whatsapp" | "desativar";

const chave = (conversationId: string) => ["conversation-webchat", conversationId] as const;

/**
 * O estado do Web Chat da conversa aberta. Relê a cada 30 s: "aberto há pouco"
 * e "o paciente voltou para o WhatsApp" mudam sem ninguém clicar.
 */
export function useWebChatDaConversa(conversationId: string, habilitado: boolean) {
  return useQuery({
    queryKey: chave(conversationId),
    enabled: habilitado,
    refetchInterval: 30_000,
    queryFn: async () =>
      (await apiClient.get<{ data: EstadoDoWebChat }>(`/api/v1/conversations/${conversationId}/webchat`)).data,
  });
}

export function useAcaoDoWebChat(conversationId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (acao: AcaoDoWebChat) =>
      apiClient.post<{ data: unknown }>(`/api/v1/conversations/${conversationId}/webchat`, { acao }),
    onError: (err) => showApiError(err),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: chave(conversationId) });
      qc.invalidateQueries({ queryKey: ["conversation", conversationId] });
    },
  });
}
