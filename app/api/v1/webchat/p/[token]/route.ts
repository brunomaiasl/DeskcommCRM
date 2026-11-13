/**
 * GET /api/v1/webchat/p/<token> — o que a página do Web Chat mostra.
 *
 * Público (sem sessão): o TOKEN é a credencial. Organização, conversa e contato
 * saem da linha do link achada pelo hash do token, nunca da requisição.
 *
 * `?depois=<ISO>` traz só o que chegou depois — a página pergunta a cada poucos
 * segundos. Cada pergunta também é o sinal de presença ("o paciente está na
 * página"), que decide se o aviso pelo WhatsApp sai ou não.
 */
import { randomUUID } from "node:crypto";
import { type NextRequest } from "next/server";

import { checkRateLimit } from "@/lib/ai/dispatcher/rate-limit";
import { fail, ok } from "@/lib/api/wrappers";
import { clientIp } from "@/lib/plataformas-de-anuncio/pagina-de-captura";
import { createAdminClient } from "@/lib/supabase/admin";
import { abrirLink, cabecalho, marcarLidas, mensagensDaPagina, registrarPresenca } from "@/lib/webchat/pagina";
import { tokenValido } from "@/lib/webchat/token";

export const dynamic = "force-dynamic";

const SEM_CACHE = { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" };

export async function GET(req: NextRequest, ctx: { params: Promise<{ token: string }> }) {
  const requestId = randomUUID();
  const { token } = await ctx.params;
  if (!tokenValido(token)) {
    return fail("not_found", "Link não encontrado.", 404, { requestId, headers: SEM_CACHE });
  }
  // A página pergunta a cada ~3 s: 60 por minuto por IP e link sobra para ela e
  // corta quem tentar varrer.
  const ip = clientIp(req) ?? "sem-ip";
  if (!(await checkRateLimit(`webchat:ler:${ip}`, 120, 60)).allowed) {
    return fail("rate_limited", "Muitas requisições. Aguarde um instante.", 429, {
      requestId,
      headers: { ...SEM_CACHE, "Retry-After": "30" },
    });
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

  const link = aberto.link;
  const depois = req.nextUrl.searchParams.get("depois");
  const [cab, mensagens] = await Promise.all([
    cabecalho(admin, link),
    mensagensDaPagina(admin, link, depois && !Number.isNaN(Date.parse(depois)) ? depois : null),
  ]);
  await registrarPresenca(admin, link);
  await marcarLidas(admin, link);

  return ok({ ...cab, mensagens }, { requestId, headers: SEM_CACHE });
}
