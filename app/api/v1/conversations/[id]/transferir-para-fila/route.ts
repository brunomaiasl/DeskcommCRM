import { requireSupportWrite } from "@/lib/impersonate/support";
/**
 * POST /api/v1/conversations/[id]/transferir-para-fila — "Transferir" para uma
 * FILA (setor), e não para uma pessoa: a conversa passa a ESPERAR naquela fila
 * até alguém dela atender (ou a distribuição entregar a quem estiver disponível).
 *
 * ─── Por que não basta `PUT /sector` ─────────────────────────────────────────
 *
 * Aquela rota só CLASSIFICA: conversa com dono continua com ele ("mudar de fila
 * não tira a conversa de quem já está nela — isso é transferência"). Para quem
 * está dentro da conversa e clica em Transferir, o esperado é o contrário: sair
 * da minha mão e aparecer na fila. Então esta rota faz as três coisas juntas:
 *
 *  1. solta o dono (`fn_conversation_assign` com destino nulo, `transfer`, sem
 *     trava otimista — a mesma liberdade da transferência para pessoa);
 *  2. mantém o automático calado (`bot_silenced_until='infinity'`, o mesmo
 *     literal do handoff e do pause-ai). Sem isso o comando voltaria a ser
 *     "automático" e a conversa NÃO contaria na fila de espera nem no número da
 *     fila do menu — o cliente seria respondido por máquina depois de ter sido
 *     passado para uma equipe;
 *  3. grava a fila e pede a distribuição (`definirSetorDaConversa`, a MESMA
 *     régua da rota de setor e da IA).
 *
 * Módulo Setores desligado ⇒ 404 (como toda rota de setor). Papel mínimo
 * `agent`; a escrita passa pelo cliente da sessão, então a RLS vale.
 *
 * A conversa e a fila são validadas ANTES de soltar o dono: um destino inválido
 * nunca deixa a conversa sem ninguém.
 */
import { randomUUID } from "node:crypto";
import { type NextRequest } from "next/server";
import { z } from "zod";

import { audit } from "@/lib/audit";
import { ApiError } from "@/lib/api/types";
import { fail, ok } from "@/lib/api/wrappers";
import { seSetoresDesligado } from "@/lib/atendimento/setores-modulo";
import { definirSetorDaConversa } from "@/lib/atendimento/setor-da-conversa";
import { requireRole } from "@/lib/auth/require-role";
import { registrarTrocaDeComando } from "@/lib/inbox/atividade-de-comando";
import { registrarTransferenciaNaConversa } from "@/lib/inbox/transferencias-da-conversa";
import { traduzir } from "@/lib/i18n/dicionario";
import { validateRequest } from "@/lib/schemas";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const SILENCIO_DURAVEL = "infinity";

const transferirParaFilaSchema = z
  .object({
    sector_id: z.string().uuid(),
    reason: z.string().trim().min(1).max(500).optional(),
  })
  .strict();

interface RouteCtx {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, ctx: RouteCtx): Promise<Response> {
  const supportDenied = await requireSupportWrite();
  if (supportDenied) return supportDenied;

  const requestId = randomUUID();
  const { id } = await ctx.params;

  const moduloDesligado = await seSetoresDesligado(requestId);
  if (moduloDesligado) return moduloDesligado;

  const authz = await requireRole("agent", { requestId, resource: "conversations" });
  if (!authz.ok) return authz.response;
  const t = (texto: string) => traduzir(texto, authz.user.idioma);
  const user = authz.user;
  const orgId = authz.org.orgId; // fonte confiável (cookie validado), nunca o body

  let input;
  try {
    input = await validateRequest(transferirParaFilaSchema, req);
  } catch (err) {
    if (err instanceof ApiError) {
      return fail(err.code, err.message, err.status, {
        details: err.details as Record<string, unknown> | undefined,
        requestId,
      });
    }
    throw err;
  }

  const supabase = await createClient();
  const admin = createAdminClient();

  // 1) Valida ANTES de mexer em qualquer coisa.
  const { data: conversaCrua, error: erroConversa } = await supabase
    .from("conversations")
    .select("id, status, contact_id, assigned_to_user_id")
    .eq("id", id)
    .eq("organization_id", orgId)
    .maybeSingle();
  if (erroConversa) return fail("internal_error", erroConversa.message, 500, { requestId });
  if (!conversaCrua) return fail("not_found", t("Conversa não encontrada."), 404, { requestId });
  const conversa = conversaCrua as {
    id: string;
    status: string;
    contact_id: string | null;
    assigned_to_user_id: string | null;
  };
  if (["closed", "archived", "resolved"].includes(conversa.status)) {
    return fail("conflict", t("A conversa está encerrada e não aceita mais setor."), 409, {
      requestId,
    });
  }

  const { data: setor, error: erroSetor } = await admin
    .from("attendant_sectors")
    .select("id, name")
    .eq("organization_id", orgId)
    .eq("id", input.sector_id)
    .maybeSingle();
  if (erroSetor) return fail("internal_error", erroSetor.message, 500, { requestId });
  if (!setor) {
    return fail("unprocessable_entity", t("Setor inexistente nesta organização."), 422, {
      requestId,
    });
  }
  const nomeDaFila = (setor as { id: string; name: string }).name;

  // 2) Solta o dono (se houver) e mantém o automático calado.
  const soltou = conversa.assigned_to_user_id !== null;
  if (soltou) {
    const { data: solta, error: erroSolta } = await supabase.rpc("fn_conversation_assign", {
      p_organization_id: orgId,
      p_conversation_id: id,
      p_to_user_id: null as unknown as string,
      p_reason: "transfer",
      p_enforce_expected: false,
    });
    if (erroSolta) return fail("internal_error", erroSolta.message, 500, { requestId });
    if (!solta || (solta as unknown[]).length === 0) {
      return fail("not_found", t("Conversa não encontrada."), 404, { requestId });
    }
  }
  const { error: erroSilencio } = await supabase
    .from("conversations")
    .update({
      bot_silenced_until: SILENCIO_DURAVEL,
      last_handoff_reason: "Transferida para a fila pelo atendente",
    })
    .eq("id", id)
    .eq("organization_id", orgId);
  if (erroSilencio) return fail("internal_error", erroSilencio.message, 500, { requestId });

  // 3) Grava a fila e pede a distribuição (sem dono, em aberto).
  const resultado = await definirSetorDaConversa({
    db: supabase,
    admin,
    organizationId: orgId,
    conversationId: id,
    sectorId: input.sector_id,
    origem: "manual",
    sobrescreverSetorManual: true,
    ator: { tipo: "user", userId: user.id },
    requestId,
    moduloJaConferido: true,
  });
  if (!resultado.ok) {
    return fail("internal_error", resultado.mensagem, 500, { requestId });
  }
  // Mesma fila de antes (`mudou: false`): a régua não pediu distribuição, e a
  // conversa acabou de ficar sem dono — pede aqui, senão ela espera parada.
  let redistribuiu = resultado.redistribuiu;
  if (!redistribuiu && soltou) {
    const { error: erroFila } = await admin.rpc("fn_request_channel_routing", {
      p_org: orgId,
      p_conversation: id,
    });
    redistribuiu = !erroFila;
  }

  await audit({
    action: "conversation.transferred",
    actorUserId: user.id,
    organizationId: orgId,
    resourceType: "conversation",
    resourceId: id,
    requestId,
    metadata: {
      sector_id: input.sector_id,
      ...(input.reason ? { note: input.reason } : {}),
    },
  });

  // O fio da conversa: a linha "Fulano transferiu para a fila X" (rastro — falhar
  // aqui não desfaz a transferência).
  await registrarTransferenciaNaConversa({
    supabase,
    organizationId: orgId,
    conversationId: id,
    entrada: {
      id: randomUUID(),
      em: new Date().toISOString(),
      por_user_id: user.id,
      de_user_id: conversa.assigned_to_user_id,
      para_user_id: null,
      para_fila_id: input.sector_id,
      para_fila_nome: nomeDaFila,
      motivo: input.reason?.trim() || null,
    },
  });

  await registrarTrocaDeComando({
    supabase,
    organizationId: orgId,
    conversationId: id,
    contactId: conversa.contact_id,
    tipo: "conversation_transferred",
    actor: { type: "user", id: user.id, role: authz.org.role },
    // Canônico em português: quem traduz é a LEITURA (`t(item.reason)`).
    motivo: input.reason?.trim()
      ? `Transferiu a conversa para a fila ${nomeDaFila}: ${input.reason.trim()}`
      : `Transferiu a conversa para a fila ${nomeDaFila}`,
    payload: { sector_id: input.sector_id },
  });

  return ok(
    { id, sector_id: input.sector_id, soltou_o_dono: soltou, redistribuiu },
    { requestId },
  );
}
