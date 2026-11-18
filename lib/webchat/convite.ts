/**
 * O CONVITE do Web Chat: cria o link e manda pelo WhatsApp.
 *
 * Duas portas:
 *  - AUTOMÁTICA, na primeira mensagem do paciente em cada atendimento
 *    (`conviteNaPrimeiraMensagem`, chamado da pós-entrada);
 *  - MANUAL, o "Enviar outro link" da tela da conversa (`enviarConvite`).
 *
 * Depois do convite a conversa passa para a rota `web`: a próxima resposta (do
 * agente ou da atendente) já vai para a página, que é onde o paciente vai estar
 * quando clicar. Se ele preferir responder pelo WhatsApp, a pós-entrada devolve
 * a rota ao WhatsApp — a resposta sai sempre por onde ele falou por último.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

import { logger } from "@/lib/logger";

import { lerConfigDoWebChat, type ConfigDoWebChat } from "./config";
import { basePublica, criarLink, definirRota, revogarLinks, urlDoLink, type LinhaDoLink } from "./links";
import { enviarLinkPeloWhatsapp, type DesfechoDoEnvio } from "./whatsapp";

export type DesfechoDoConvite =
  | { ok: true; link: LinhaDoLink; envio: Extract<DesfechoDoEnvio, { enviado: true }> }
  | {
      ok: false;
      motivo:
        | "webchat_desligado"
        | "sem_endereco_publico"
        | "conversa_nao_encontrada"
        | "grupo"
        | "janela_fechada_sem_modelo"
        | "falhou";
      detalhe?: string;
    };

interface ConversaDoConvite {
  id: string;
  organization_id: string;
  contact_id: string;
  is_group: boolean;
  webchat_desativado: boolean | null;
  service_closed_at: string | null;
  organizations: { settings: unknown } | null;
}

async function lerConversa(
  admin: SupabaseClient,
  organizationId: string,
  conversationId: string,
): Promise<ConversaDoConvite | null> {
  const { data } = await admin
    .from("conversations")
    .select("id, organization_id, contact_id, is_group, webchat_desativado, service_closed_at, organizations:organization_id(settings)")
    .eq("organization_id", organizationId)
    .eq("id", conversationId)
    .maybeSingle();
  return (data as unknown as ConversaDoConvite | null) ?? null;
}

async function convidar(
  admin: SupabaseClient,
  conversa: ConversaDoConvite,
  config: ConfigDoWebChat,
  args: { origem: LinhaDoLink["origem"]; criadoPor: string | null; requestId: string },
): Promise<DesfechoDoConvite> {
  const base = basePublica();
  if (!base) return { ok: false, motivo: "sem_endereco_publico" };

  // Um link ativo por conversa: o convite novo aposenta os anteriores ("Links
  // desta conversa: 1 ativo"), e quem tinha o antigo pede de novo pelo WhatsApp.
  await revogarLinks(admin, conversa.organization_id, conversa.id, "substituido");
  const { link, token } = await criarLink(admin, {
    organizationId: conversa.organization_id,
    conversationId: conversa.id,
    contactId: conversa.contact_id,
    origem: args.origem,
    criadoPor: args.criadoPor,
  });

  const envio = await enviarLinkPeloWhatsapp(admin, {
    organizationId: conversa.organization_id,
    conversationId: conversa.id,
    token,
    url: urlDoLink(base, token),
    texto: config.convite_texto,
    modelo: config.modelo_convite,
    requestId: args.requestId,
    chaveDeIdempotencia: `webchat:convite:${link.id}`,
  });

  if (!envio.enviado) {
    // Convite manual ou automático: o motivo REAL (visto em 18/11: "falhou" sem dizer por quê).
    logger.warn("webchat: link não enviado pelo WhatsApp", {
      organization_id: conversa.organization_id,
      conversation_id: conversa.id,
      origem: args.origem,
      motivo: envio.motivo,
      detalhe: envio.detalhe ?? null,
      request_id: args.requestId,
    });
    // O link que ninguém recebeu não fica valendo.
    await revogarLinks(admin, conversa.organization_id, conversa.id, "convite_nao_enviado");
    return {
      ok: false,
      motivo: envio.motivo === "janela_fechada_sem_modelo" ? envio.motivo : "falhou",
      ...(envio.detalhe ? { detalhe: envio.detalhe } : {}),
    };
  }

  await definirRota(admin, conversa.organization_id, conversa.id, "web");
  return { ok: true, link, envio };
}

/** "Enviar outro link" — a atendente pediu. Vale mesmo com o convite automático desligado. */
export async function enviarConvite(
  admin: SupabaseClient,
  args: { organizationId: string; conversationId: string; userId: string | null; requestId: string },
): Promise<DesfechoDoConvite> {
  const conversa = await lerConversa(admin, args.organizationId, args.conversationId);
  if (!conversa) return { ok: false, motivo: "conversa_nao_encontrada" };
  if (conversa.is_group) return { ok: false, motivo: "grupo" };
  const config = lerConfigDoWebChat(conversa.organizations?.settings);
  if (!config.ativo) return { ok: false, motivo: "webchat_desligado" };
  // Mandar link manualmente religa a conversa que estava desativada: é o gesto
  // explícito de quem atende.
  if (conversa.webchat_desativado) {
    await admin
      .from("conversations")
      .update({ webchat_desativado: false })
      .eq("organization_id", args.organizationId)
      .eq("id", args.conversationId);
  }
  return convidar(admin, conversa, config, { origem: "manual", criadoPor: args.userId, requestId: args.requestId });
}

/**
 * O convite AUTOMÁTICO: primeira mensagem do paciente neste atendimento.
 *
 * "Primeira" = não existe link criado desde que o atendimento atual começou
 * (`service_closed_at`, o carimbo do último encerramento). Assim cada atendimento
 * novo ganha um convite, e o paciente que ignorou o link e seguiu pelo WhatsApp
 * não recebe convite a cada mensagem.
 *
 * Nunca lança: roda dentro da pós-entrada, onde a mensagem do cliente já está
 * gravada.
 */
export async function conviteNaPrimeiraMensagem(
  admin: SupabaseClient,
  args: { organizationId: string; conversationId: string; requestId: string },
): Promise<void> {
  try {
    const conversa = await lerConversa(admin, args.organizationId, args.conversationId);
    if (!conversa || conversa.is_group || conversa.webchat_desativado) return;
    const config = lerConfigDoWebChat(conversa.organizations?.settings);
    if (!config.ativo || !config.convite_automatico) return;

    let q = admin
      .from("webchat_links")
      .select("id", { count: "exact", head: true })
      .eq("organization_id", args.organizationId)
      .eq("conversation_id", args.conversationId);
    if (conversa.service_closed_at) q = q.gt("created_at", conversa.service_closed_at);
    const { count, error } = await q;
    if (error) return; // banco sem a 9348, ou leitura recusada: sem convite
    if ((count ?? 0) > 0) return;

    const r = await convidar(admin, conversa, config, {
      origem: "convite_automatico",
      criadoPor: null,
      requestId: args.requestId,
    });
    if (!r.ok) {
      logger.info("webchat: convite automático não saiu", {
        organization_id: args.organizationId,
        conversation_id: args.conversationId,
        motivo: r.motivo,
        // Sem o detalhe, "falhou" não diz POR QUÊ (visto em 18/11: link revogado 0,15 s depois de criado).
        ...(r.detalhe ? { detalhe: r.detalhe } : {}),
      });
    }
  } catch (err) {
    logger.warn("webchat: convite automático falhou (a mensagem do paciente segue normal)", {
      organization_id: args.organizationId,
      conversation_id: args.conversationId,
      detail: err instanceof Error ? err.message.slice(0, 160) : "desconhecido",
    });
  }
}
