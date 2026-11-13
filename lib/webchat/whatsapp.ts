/**
 * Manda o LINK do Web Chat pelo WhatsApp — o convite e o aviso de nova mensagem.
 *
 * A régua da janela é a do sistema (`estadoDaJanela`, a mesma da tela):
 *  - janela aberta (ou canal sem janela) → texto livre com o link no fim;
 *  - janela fechada → o MODELO aprovado, com o token no sufixo do botão de URL
 *    (`https://<instalação>/chat/{{1}}`). Sem modelo configurado, não sai nada:
 *    a Meta recusaria o texto livre (131047) e a falha só apareceria depois.
 *
 * Sai SEMPRE pelo WhatsApp (`rotaForcada`): o convite existe para tirar o
 * paciente do WhatsApp, e o aviso para chamá-lo de volta à página que ele não
 * está olhando.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

import { estadoDaJanela } from "@/lib/channels/janela";
import { linhaDoEspelho } from "@/lib/channels/linha-do-espelho";
import { slotKey } from "@/lib/channels/meta/build-components";
import { deriveTemplateContract } from "@/lib/channels/meta/template-contract";
import { sendMessageSchema } from "@/lib/schemas";

import type { ConfigDoWebChat } from "./config";

export type DesfechoDoEnvio =
  | { enviado: true; via: "texto" | "modelo"; messageId: string }
  | { enviado: false; motivo: "janela_fechada_sem_modelo" | "conversa_nao_encontrada" | "falhou"; detalhe?: string };

/** Autoria AUTOMAÇÃO: ninguém digitou, é o Web Chat da organização mandando. */
const ATOR = { type: "webhook_source" as const, id: "webchat" };

/**
 * Os valores do modelo: o TOKEN em todo sufixo de botão de URL; o nome da
 * organização em qualquer variável de texto (o modelo do Web Chat costuma não ter
 * nenhuma — se tiver, o nome da clínica é o valor menos errado). Sem o modelo no
 * espelho local, aposta no formato comum (`button0:1`) e deixa a Meta responder.
 */
async function valoresDoModelo(
  admin: SupabaseClient,
  args: { organizationId: string; channelSessionId: string; nome: string; idioma: string; token: string; nomeDaOrganizacao: string },
): Promise<Record<string, string>> {
  try {
    const { data } = await linhaDoEspelho(admin, "name, language, components, parameter_format", {
      organizationId: args.organizationId,
      channelSessionId: args.channelSessionId,
      name: args.nome,
      language: args.idioma,
    });
    if (data) {
      const linha = data as { name: string; language: string; components: unknown; parameter_format?: string };
      const contrato = deriveTemplateContract({
        name: linha.name,
        language: linha.language,
        parameter_format: linha.parameter_format,
        components: linha.components as Parameters<typeof deriveTemplateContract>[0]["components"],
      });
      const valores: Record<string, string> = {};
      for (const slot of contrato.slots) {
        if (slot.expects === "url_suffix") valores[slotKey(slot.address, slot.key)] = args.token;
        else if (slot.expects === "text") valores[slotKey(slot.address, slot.key)] = args.nomeDaOrganizacao;
      }
      return valores;
    }
  } catch {
    // espelho indisponível: cai no formato comum abaixo
  }
  return { "button0:1": args.token };
}

export async function enviarLinkPeloWhatsapp(
  admin: SupabaseClient,
  args: {
    organizationId: string;
    conversationId: string;
    token: string;
    url: string;
    texto: string;
    modelo: ConfigDoWebChat["modelo_convite"];
    requestId: string;
    chaveDeIdempotencia: string;
  },
): Promise<DesfechoDoEnvio> {
  const { data: conv } = await admin
    .from("conversations")
    .select("id, channel_session_id, last_inbound_at, channel_sessions:channel_session_id(provider), organizations:organization_id(name)")
    .eq("organization_id", args.organizationId)
    .eq("id", args.conversationId)
    .maybeSingle();
  if (!conv) return { enviado: false, motivo: "conversa_nao_encontrada" };
  const c = conv as unknown as {
    channel_session_id: string;
    last_inbound_at: string | null;
    channel_sessions: { provider: string | null } | null;
    organizations: { name: string | null } | null;
  };

  const janela = estadoDaJanela(c.channel_sessions?.provider ?? null, c.last_inbound_at, new Date());
  const ctx = {
    organization_id: args.organizationId,
    actor: ATOR,
    requestId: args.requestId,
    rotaForcada: "whatsapp" as const,
  };
  // Import tardio: o handler de envio importa o aviso do Web Chat, que importa
  // este arquivo. O ciclo só existe em tempo de carga — aqui, em uso, já fechou.
  const { sendMessageHandler } = await import("@/app/api/v1/messages/_handler");

  try {
    if (janela.tipo !== "fechada") {
      const input = sendMessageSchema.parse({
        conversation_id: args.conversationId,
        type: "text",
        body: `${args.texto}\n\n${args.url}`,
        metadata: { idempotency_key: args.chaveDeIdempotencia, webchat_link: true },
      });
      const msg = await sendMessageHandler(admin as never, ctx, input);
      if (msg.status === "failed") return { enviado: false, motivo: "falhou", detalhe: msg.error_code ?? undefined };
      return { enviado: true, via: "texto", messageId: msg.id };
    }

    if (!args.modelo) return { enviado: false, motivo: "janela_fechada_sem_modelo" };

    const valores = await valoresDoModelo(admin, {
      organizationId: args.organizationId,
      channelSessionId: c.channel_session_id,
      nome: args.modelo.nome,
      idioma: args.modelo.idioma,
      token: args.token,
      nomeDaOrganizacao: c.organizations?.name ?? "",
    });
    const input = sendMessageSchema.parse({
      conversation_id: args.conversationId,
      type: "template",
      template_name: args.modelo.nome,
      template_language: args.modelo.idioma,
      template_values: valores,
      metadata: { idempotency_key: args.chaveDeIdempotencia, webchat_link: true },
    });
    const msg = await sendMessageHandler(admin as never, ctx, input);
    if (msg.status === "failed") return { enviado: false, motivo: "falhou", detalhe: msg.error_code ?? undefined };
    return { enviado: true, via: "modelo", messageId: msg.id };
  } catch (err) {
    return { enviado: false, motivo: "falhou", detalhe: err instanceof Error ? err.message.slice(0, 200) : "erro" };
  }
}
