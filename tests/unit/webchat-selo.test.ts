import { describe, expect, it } from "vitest";

import { JANELA_DE_PRESENCA_MS, seloDoWebchat } from "@/lib/webchat/selo";

/**
 * O SELO DO WEB CHAT da lista (pedido de 18/11): aparece quando a conversa é
 * atendida pela página, e a bolinha é verde só com o paciente na página agora.
 */
const AGORA = new Date("2026-11-18T16:00:00Z");
const vivo = (seen: string | null) => ({ last_seen_at: seen, revoked_at: null, expires_at: "2026-11-19T16:00:00Z" });

describe("seloDoWebchat", () => {
  it("sem link vivo e fora da rota web: sem selo", () => {
    expect(seloDoWebchat("whatsapp", false, [], AGORA)).toBeNull();
    expect(seloDoWebchat(null, false, [{ last_seen_at: null, revoked_at: "2026-11-18T10:00:00Z", expires_at: "2026-11-19T00:00:00Z" }], AGORA)).toBeNull();
  });

  it("link vivo com sinal recente: ativo e online (bolinha verde)", () => {
    expect(seloDoWebchat("web", false, [vivo("2026-11-18T15:59:30Z")], AGORA)).toEqual({ ativo: true, online: true });
  });

  it("link vivo sem sinal recente: ativo, fora da página (bolinha cinza)", () => {
    const antes = new Date(AGORA.getTime() - JANELA_DE_PRESENCA_MS - 1000).toISOString();
    expect(seloDoWebchat("web", false, [vivo(antes)], AGORA)).toEqual({ ativo: true, online: false });
    expect(seloDoWebchat("whatsapp", false, [vivo(null)], AGORA)).toEqual({ ativo: true, online: false });
  });

  it("link vencido não conta; Web Chat desativado na conversa esconde o selo", () => {
    expect(seloDoWebchat(null, false, [{ last_seen_at: AGORA.toISOString(), revoked_at: null, expires_at: "2026-11-18T15:00:00Z" }], AGORA)).toBeNull();
    expect(seloDoWebchat("web", true, [vivo(AGORA.toISOString())], AGORA)).toBeNull();
  });
});
