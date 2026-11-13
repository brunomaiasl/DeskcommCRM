/**
 * POST /api/v1/webchat/p/<token>/mensagens — o paciente escreveu na página.
 *
 * Público: o token é a credencial (ver a rota irmã). A mensagem entra na MESMA
 * conversa do WhatsApp e acorda o agente como qualquer mensagem do paciente.
 *
 * `id` vem do navegador, um por mensagem: reenviar o mesmo (rede instável,
 * clique duplo) devolve a mesma linha — nunca duas mensagens, nunca dois turnos.
 */
import { randomUUID } from "node:crypto";
import { type NextRequest } from "next/server";
import { z } from "zod";

import { checkRateLimit } from "@/lib/ai/dispatcher/rate-limit";
import { fail, ok } from "@/lib/api/wrappers";
import { clientIp } from "@/lib/plataformas-de-anuncio/pagina-de-captura";
import { createAdminClient } from "@/lib/supabase/admin";
import { abrirLink, MAX_MENSAGEM, receberDaPagina } from "@/lib/webchat/pagina";
import { tokenValido } from "@/lib/webchat/token";

export const dynamic = "force-dynamic";

const SEM_CACHE = { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" };

const corpoSchema = z.object({
  texto: z.string().max(MAX_MENSAGEM),
  id: z.string().uuid(),
});

export async function POST(req: NextRequest, ctx: { params: Promise<{ token: string }> }) {
  const requestId = randomUUID();
  const { token } = await ctx.params;
  if (!tokenValido(token)) {
    return fail("not_found", "Link não encontrado.", 404, { requestId, headers: SEM_CACHE });
  }
  const ip = clientIp(req) ?? "sem-ip";
  if (!(await checkRateLimit(`webchat:escrever:${ip}`, 30, 60)).allowed) {
    return fail("rate_limited", "Você enviou muitas mensagens seguidas. Aguarde um instante.", 429, {
      requestId,
      headers: { ...SEM_CACHE, "Retry-After": "30" },
    });
  }

  let corpo: z.infer<typeof corpoSchema>;
  try {
    const r = corpoSchema.safeParse(await req.json());
    if (!r.success) return fail("validation_error", "Mensagem inválida.", 422, { requestId, headers: SEM_CACHE });
    corpo = r.data;
  } catch {
    return fail("validation_error", "Mensagem inválida.", 422, { requestId, headers: SEM_CACHE });
  }

  const admin = createAdminClient();
  const aberto = await abrirLink(admin, token);
  if (aberto.estado === "inexistente") {
    return fail("not_found", "Link não encontrado.", 404, { requestId, headers: SEM_CACHE });
  }
  if (aberto.estado !== "ativo") {
    return fail(
      "link_expirado",
      "Este link expirou. Mande uma mensagem pelo WhatsApp para receber um novo.",
      410,
      { requestId, headers: SEM_CACHE },
    );
  }
  // Por link também: um link vazado não vira canhão de mensagens na conversa.
  if (!(await checkRateLimit(`webchat:escrever:link:${aberto.link.id}`, 20, 60)).allowed) {
    return fail("rate_limited", "Você enviou muitas mensagens seguidas. Aguarde um instante.", 429, {
      requestId,
      headers: { ...SEM_CACHE, "Retry-After": "30" },
    });
  }

  const r = await receberDaPagina(admin, aberto.link, { texto: corpo.texto, idDoCliente: corpo.id, requestId });
  if (!r.ok) {
    if (r.motivo === "texto_vazio") return fail("validation_error", "Escreva uma mensagem.", 422, { requestId, headers: SEM_CACHE });
    if (r.motivo === "texto_longo")
      return fail("validation_error", `A mensagem passou de ${MAX_MENSAGEM} caracteres.`, 422, { requestId, headers: SEM_CACHE });
    return fail("internal_error", "Não foi possível enviar agora. Tente de novo.", 500, { requestId, headers: SEM_CACHE });
  }
  return ok(r.mensagem, { status: r.duplicada ? 200 : 201, requestId, headers: SEM_CACHE });
}
