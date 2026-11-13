import type { Metadata } from "next";

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
export const metadata: Metadata = {
  title: "Conversa",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default async function PaginaDoWebChat({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <ChatDoPaciente token={token} />;
}
