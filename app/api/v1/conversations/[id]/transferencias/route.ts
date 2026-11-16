/**
 * GET /api/v1/conversations/[id]/transferencias — as transferências da conversa,
 * para o fio mostrar "Fulano transferiu a conversa para Beltrana / para a fila X".
 *
 * Lê `conversations.metadata.transferencias` (ver `lib/inbox/transferencias-da-conversa`)
 * pelo cliente da SESSÃO: quem não enxerga a conversa não lê o histórico dela. O
 * admin entra em um lugar só — resolver os nomes (o endpoint de usuários do GoTrue
 * recusa o token comum), como nas passagens.
 *
 * Só leitura ⇒ sem audit.
 */
import { randomUUID } from "node:crypto";
import { type NextRequest } from "next/server";

import { fail, ok } from "@/lib/api/wrappers";
import { requireRole } from "@/lib/auth/require-role";
import { traduzir } from "@/lib/i18n/dicionario";
import {
  lerTransferencias,
  type TransferenciaDoFio,
} from "@/lib/inbox/transferencias-da-conversa";
import { createClient } from "@/lib/supabase/server";
import { nomesDosAtendentes } from "@/lib/users/nome-do-atendente";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams): Promise<Response> {
  const requestId = randomUUID();
  const authz = await requireRole("viewer", { requestId, resource: "conversations" });
  if (!authz.ok) return authz.response;
  const t = (texto: string) => traduzir(texto, authz.user.idioma);
  const { org } = authz;
  const { id } = await params;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("conversations")
    .select("id, metadata")
    .eq("id", id)
    .eq("organization_id", org.orgId)
    .maybeSingle();
  if (error) return fail("internal_error", error.message, 500, { requestId });
  if (!data) return fail("not_found", t("Conversa não encontrada."), 404, { requestId });

  const registros = lerTransferencias((data as { metadata: unknown }).metadata);
  const nomes = await nomesDosAtendentes(
    org.orgId,
    registros.flatMap((r) => [r.por_user_id, r.de_user_id, r.para_user_id]),
  );
  const nomeDe = (uid: string | null): string | null => (uid ? (nomes.get(uid) ?? null) : null);

  const itens: TransferenciaDoFio[] = registros.map((r) => ({
    id: r.id,
    em: r.em,
    por_nome: nomeDe(r.por_user_id),
    de_nome: nomeDe(r.de_user_id),
    para_nome: nomeDe(r.para_user_id),
    para_fila_nome: r.para_fila_nome,
    motivo: r.motivo,
  }));

  return ok(itens, { requestId });
}
