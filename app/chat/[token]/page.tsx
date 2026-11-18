import type { Metadata } from "next";

import { createAdminClient } from "@/lib/supabase/admin";
import { abrirLink, cabecalho } from "@/lib/webchat/pagina";

import { ChatDoPaciente } from "./_client";

/**
 * A página do Web Chat — onde o paciente continua a conversa do WhatsApp.
 *
 * Pública e sem login: o token da URL é a credencial (ver
 * `lib/auth/public-paths.ts`). Não vive sob `app/app/**`, que é a área logada
 * da equipe. O nome da clínica vem da API, não do título: a página é da
 * clínica, e o nome do produto não aparece (catraca de marca,
 * `tests/unit/branding.test.ts`).
 */
const BASE: Metadata = {
  title: "Conversa",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

/**
 * O CARTÃO do link no WhatsApp (Open Graph). No número por QR o WhatsApp não
 * entrega botão — botão de URL só existe na API oficial, pelo modelo do convite.
 * O que dá para fazer aqui é o link chegar como cartão ("Med Anchieta — Abrir
 * conversa") em vez de endereço cru (pedido de 18/11). Só nome da clínica e texto
 * fixo: nada da conversa vai para quem gera a prévia. Link vencido ou inexistente
 * cai no título neutro, sem dizer de quem é.
 */
export async function generateMetadata({ params }: { params: Promise<{ token: string }> }): Promise<Metadata> {
  try {
    const { token } = await params;
    const admin = createAdminClient();
    const aberto = await abrirLink(admin, token);
    const nome = aberto.estado === "ativo" ? (await cabecalho(admin, aberto.link)).nomeDaClinica : null;
    const titulo = nome ? `${nome} — Abrir conversa` : "Abrir conversa";
    const descricao = "Toque para continuar seu atendimento: agendamento, orçamento e dúvidas.";
    return {
      ...BASE,
      openGraph: { title: titulo, description: descricao, type: "website", ...(nome ? { siteName: nome } : {}) },
      twitter: { card: "summary", title: titulo, description: descricao },
    };
  } catch {
    return BASE;
  }
}

export default async function PaginaDoWebChat({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <ChatDoPaciente token={token} />;
}
