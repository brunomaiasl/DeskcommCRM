import { requireSupportWrite } from "@/lib/impersonate/support";
/**
 * /api/v1/conversations/[id]/webchat — o botão "Web Chat" da conversa.
 *
 *   GET  → o estado: rota atual, se está desativado, os links desta conversa
 *          (quando foi enviado, aberto, visto) e o endereço do link ativo.
 *   POST → { acao }:
 *          `enviar_link`     manda um link novo pelo WhatsApp (o anterior deixa
 *                            de valer — "1 ativo");
 *          `voltar_whatsapp` a resposta volta a sair pelo WhatsApp e os links
 *                            são revogados;
 *          `desativar`       desliga o Web Chat NESTA conversa (sem convite
 *                            automático, sem rota web) até mandar link de novo.
 *
 * Auth: cookie session, agent+ (mesma régua das outras ações da conversa). A
 * conversa é lida pelo client do REQUEST, para a policy de visibilidade valer —
 * quem não enxerga a conversa não mexe no Web Chat dela. Só depois disso o admin
 * entra, porque a tabela de links não tem escrita para `authenticated`.
 */
import { randomUUID } from "node:crypto";
import type { NextRequest } from "next/server";
import { z } from "zod";

import { audit } from "@/lib/audit";
import { fail, ok } from "@/lib/api/wrappers";
import { requireRole } from "@/lib/auth/require-role";
import { traduzir } from "@/lib/i18n/dicionario";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { lerConfigDoWebChat } from "@/lib/webchat/config";
import { enviarConvite } from "@/lib/webchat/convite";
import {
  basePublica,
  definirRota,
  linksDaConversa,
  revogarLinks,
  rotaDaConversa,
  tokenDoLink,
  urlDoLink,
} from "@/lib/webchat/links";
import { linkAtivo } from "@/lib/webchat/rota";

export const dynamic = "force-dynamic";

interface RouteCtx {
  params: Promise<{ id: string }>;
}

const MENSAGEM_DO_CONVITE: Record<string, string> = {
  webchat_desligado: "O Web Chat está desligado. Ligue em Configurações › Web Chat.",
  sem_endereco_publico:
    "A instalação não tem endereço público configurado (NEXT_PUBLIC_APP_URL): o paciente não conseguiria abrir o link.",
  janela_fechada_sem_modelo:
    "A janela de 24 horas está fechada e não há modelo aprovado para o convite. Configure o modelo em Configurações › Web Chat.",
  grupo: "Web Chat não se aplica a conversas de grupo.",
  conversa_nao_encontrada: "Conversa não encontrada.",
  falhou: "O link não pôde ser enviado pelo WhatsApp.",
};

async function lerConversa(id: string, orgId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("conversations")
    .select("id, organization_id, contact_id, status, is_group, webchat_rota, webchat_desativado")
    .eq("id", id)
    .eq("organization_id", orgId)
    .maybeSingle();
  return {
    conversa: data as {
      id: string;
      organization_id: string;
      contact_id: string;
      status: string;
      is_group: boolean;
      webchat_rota: string | null;
      webchat_desativado: boolean | null;
    } | null,
    error,
  };
}

export async function GET(_req: NextRequest, ctx: RouteCtx): Promise<Response> {
  const requestId = randomUUID();
  const { id } = await ctx.params;
  const authz = await requireRole("agent", { requestId, resource: "conversations" });
  if (!authz.ok) return authz.response;
  const t = (texto: string) => traduzir(texto, authz.user.idioma);

  const { conversa, error } = await lerConversa(id, authz.org.orgId);
  if (error) return fail("internal_error", error.message, 500, { requestId });
  if (!conversa) return fail("not_found", t("Conversa não encontrada."), 404, { requestId });

  const admin = createAdminClient();
  const { data: org } = await admin.from("organizations").select("settings").eq("id", authz.org.orgId).maybeSingle();
  const config = lerConfigDoWebChat((org as { settings: unknown } | null)?.settings);

  const agora = new Date();
  const [links, rota] = await Promise.all([
    linksDaConversa(admin, authz.org.orgId, id),
    rotaDaConversa(admin, conversa, agora),
  ]);
  const ativo = links.find((l) => linkAtivo(l, agora)) ?? null;
  const base = basePublica();
  const tokenAtivo = ativo ? await tokenDoLink(admin, authz.org.orgId, ativo.id) : null;

  return ok(
    {
      webchat_ligado: config.ativo,
      desativado: conversa.webchat_desativado === true,
      rota: rota.rota,
      url_ativa: ativo && base && tokenAtivo ? urlDoLink(base, tokenAtivo) : null,
      ultimo_link: links[0] ?? null,
      links: links.map((l) => ({ ...l, ativo: linkAtivo(l, agora) })),
    },
    { requestId },
  );
}

const corpoSchema = z.object({
  acao: z.enum(["enviar_link", "voltar_whatsapp", "desativar"]),
});

export async function POST(req: NextRequest, ctx: RouteCtx): Promise<Response> {
  const supportDenied = await requireSupportWrite();
  if (supportDenied) return supportDenied;

  const requestId = randomUUID();
  const { id } = await ctx.params;
  const authz = await requireRole("agent", { requestId, resource: "conversations" });
  if (!authz.ok) return authz.response;
  const t = (texto: string) => traduzir(texto, authz.user.idioma);

  const corpo = corpoSchema.safeParse(await req.json().catch(() => null));
  if (!corpo.success) return fail("validation_error", t("Ação inválida."), 422, { requestId });

  const { conversa, error } = await lerConversa(id, authz.org.orgId);
  if (error) return fail("internal_error", error.message, 500, { requestId });
  if (!conversa) return fail("not_found", t("Conversa não encontrada."), 404, { requestId });

  const admin = createAdminClient();
  const acao = corpo.data.acao;

  if (acao === "enviar_link") {
    if (["resolved", "closed", "archived"].includes(conversa.status)) {
      return fail("state_conflict", t("Esta conversa está encerrada."), 409, { requestId });
    }
    const r = await enviarConvite(admin, {
      organizationId: authz.org.orgId,
      conversationId: id,
      userId: authz.user.id,
      requestId,
    });
    if (!r.ok) {
      return fail("webchat_" + r.motivo, t(MENSAGEM_DO_CONVITE[r.motivo] ?? "O link não pôde ser enviado."), 422, {
        requestId,
        details: r.detalhe ? { detalhe: r.detalhe } : undefined,
      });
    }
    await audit({
      action: "conversation.webchat_link_sent",
      actorUserId: authz.user.id,
      organizationId: authz.org.orgId,
      resourceType: "conversation",
      resourceId: id,
      requestId,
      metadata: { link_id: r.link.id, via: r.envio.via },
    });
    return ok({ enviado: true, via: r.envio.via, link_id: r.link.id }, { requestId });
  }

  await revogarLinks(admin, authz.org.orgId, id, acao === "desativar" ? "desativado_pela_equipe" : "voltou_ao_whatsapp");
  await definirRota(admin, authz.org.orgId, id, "whatsapp");
  if (acao === "desativar") {
    await admin
      .from("conversations")
      .update({ webchat_desativado: true })
      .eq("organization_id", authz.org.orgId)
      .eq("id", id);
  }
  await audit({
    action: acao === "desativar" ? "conversation.webchat_disabled" : "conversation.webchat_back_to_whatsapp",
    actorUserId: authz.user.id,
    organizationId: authz.org.orgId,
    resourceType: "conversation",
    resourceId: id,
    requestId,
  });
  return ok({ rota: "whatsapp", desativado: acao === "desativar" }, { requestId });
}
