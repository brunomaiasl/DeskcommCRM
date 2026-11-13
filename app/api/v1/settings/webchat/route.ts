/**
 * GET   /api/v1/settings/webchat — a configuração do Web Chat (migration 9348).
 * PATCH /api/v1/settings/webchat — grava (manager+).
 *
 * Mesma forma de `settings/assinatura`: merge NÃO destrutivo do jsonb (as outras
 * chaves de `settings` ficam como estão), e leitura que falhou PARA a gravação —
 * tratá-la como `{}` regravaria o settings inteiro só com esta chave.
 */
import { randomUUID } from "node:crypto";

import type { NextRequest } from "next/server";

import { fail, ok } from "@/lib/api/wrappers";
import { audit } from "@/lib/audit";
import { requireRole } from "@/lib/auth/require-role";
import { traduzir } from "@/lib/i18n/dicionario";
import { requireSupportWrite } from "@/lib/impersonate/support";
import { createAdminClient } from "@/lib/supabase/admin";
import { configDoWebChatSchema, lerConfigDoWebChat } from "@/lib/webchat/config";
import { basePublica, CAMINHO_DA_PAGINA } from "@/lib/webchat/links";

export const dynamic = "force-dynamic";

async function lerSettings(orgId: string) {
  const { data, error } = await createAdminClient()
    .from("organizations")
    .select("settings")
    .eq("id", orgId)
    .maybeSingle();
  if (error) return { error };
  return { settings: ((data as { settings?: Record<string, unknown> } | null)?.settings ?? {}) as Record<string, unknown> };
}

/** O endereço que o botão de URL do modelo da Meta precisa ter, com `{{1}}` no fim. */
function urlDoModelo(): string | null {
  const base = basePublica();
  return base ? `${base}${CAMINHO_DA_PAGINA}{{1}}` : null;
}

export async function GET(): Promise<Response> {
  const requestId = randomUUID();
  const authz = await requireRole("manager", { requestId, resource: "webchat_settings" });
  if (!authz.ok) return authz.response;

  const lido = await lerSettings(authz.org.orgId);
  if ("error" in lido) return fail("internal_error", lido.error?.message ?? "", 500, { requestId });
  return ok({ ...lerConfigDoWebChat(lido.settings), url_do_modelo: urlDoModelo() }, { requestId });
}

export async function PATCH(req: NextRequest): Promise<Response> {
  const negado = await requireSupportWrite();
  if (negado) return negado;

  const requestId = randomUUID();
  const authz = await requireRole("manager", { requestId, resource: "webchat_settings" });
  if (!authz.ok) return authz.response;
  const t = (texto: string) => traduzir(texto, authz.user.idioma);

  const parsed = configDoWebChatSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return fail("validation_failed", t("Dados inválidos."), 422, {
      requestId,
      details: parsed.error.flatten().fieldErrors as Record<string, unknown>,
    });
  }
  const lido = await lerSettings(authz.org.orgId);
  if ("error" in lido) return fail("internal_error", lido.error?.message ?? "", 500, { requestId });

  // Cliente admin: a RLS de `organizations` só deixa platform admin escrever.
  const { error } = await createAdminClient()
    .from("organizations")
    .update({ settings: { ...lido.settings, webchat: parsed.data } })
    .eq("id", authz.org.orgId);
  if (error) return fail("internal_error", error.message, 500, { requestId });

  void audit({
    action: "settings.webchat_updated",
    actorUserId: authz.user.id,
    organizationId: authz.org.orgId,
    resourceType: "organization",
    resourceId: authz.org.orgId,
    requestId,
    metadata: { ativo: parsed.data.ativo, convite_automatico: parsed.data.convite_automatico },
  });

  return ok({ ...parsed.data, url_do_modelo: urlDoModelo() }, { requestId });
}
