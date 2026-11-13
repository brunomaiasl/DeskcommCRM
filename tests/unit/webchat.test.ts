/**
 * WEB CHAT (migration 9348) — as regras que decidem por onde a conversa anda.
 *
 * O que estes testes guardam:
 *
 *  1. **O token é segredo de portador.** 256 bits, formato fixo de 43
 *     caracteres (a âncora do caminho público depende disso), e o banco só vê o
 *     hash.
 *  2. **A rota `web` só vale com link ativo.** Intenção gravada sem link vivo
 *     (vencido, revogado, ou conversa desativada) é WhatsApp — senão a resposta
 *     iria para uma página que ninguém consegue abrir.
 *  3. **Desligado por padrão, e configuração estragada é desligado.** Na dúvida o
 *     paciente continua no WhatsApp como sempre.
 *  4. **O aviso sai só para quem saiu da página, e no máximo um por hora.**
 *  5. **A janela de 24h do agente não vale na página** — mas continua valendo
 *     para o WhatsApp, e o template continua livre (controle).
 *  6. **O caminho público é exato.** Só a página e as duas rotas com token de 43
 *     caracteres; nada de sub-caminho de carona.
 */
import { describe, expect, it } from "vitest";

import { messagingWindowGate, type GateContext } from "@/lib/agent-engine/guardrails/before-send";
import { PACING_DEFAULTS } from "@/lib/agent-engine/pacing/defaults";
import { SPINNING_DEFAULTS } from "@/lib/agent-engine/spinning/defaults";
import { isPublicPath } from "@/lib/auth/public-paths";
import { avisoLiberado, pacientePresente } from "@/lib/webchat/aviso";
import { CONFIG_PADRAO, lerConfigDoWebChat } from "@/lib/webchat/config";
import { viaWebchat } from "@/lib/webchat/marca";
import { decidirRota, linkAtivo } from "@/lib/webchat/rota";
import { gerarToken, hashDoToken, tokenValido, TAMANHO_DO_TOKEN } from "@/lib/webchat/token";

const AGORA = new Date("2026-11-13T12:00:00Z");
const minutos = (n: number) => new Date(AGORA.getTime() + n * 60_000).toISOString();

describe("token do link", () => {
  it("tem 43 caracteres base64url, e cada um é diferente", () => {
    const a = gerarToken();
    const b = gerarToken();
    expect(a).toHaveLength(TAMANHO_DO_TOKEN);
    expect(tokenValido(a)).toBe(true);
    expect(a).not.toBe(b);
  });

  it("o hash é determinístico e não é o token", () => {
    const t = gerarToken();
    expect(hashDoToken(t)).toBe(hashDoToken(t));
    expect(hashDoToken(t)).not.toContain(t);
    expect(hashDoToken(t)).toMatch(/^[0-9a-f]{64}$/);
  });

  it("formato errado nem é aceito (curto, longo, caractere fora do alfabeto)", () => {
    expect(tokenValido("a".repeat(42))).toBe(false);
    expect(tokenValido("a".repeat(44))).toBe(false);
    expect(tokenValido("a".repeat(42) + "/")).toBe(false);
  });
});

describe("rota da conversa", () => {
  const ativo = { id: "l1", expires_at: minutos(60), revoked_at: null };

  it("web com link ativo vai pela página", () => {
    expect(decidirRota({ webchat_rota: "web", webchat_desativado: false }, ativo, AGORA)).toEqual({
      rota: "web",
      linkId: "l1",
    });
  });

  it("web com link VENCIDO volta ao WhatsApp", () => {
    const vencido = { ...ativo, expires_at: minutos(-1) };
    expect(linkAtivo(vencido, AGORA)).toBe(false);
    expect(decidirRota({ webchat_rota: "web", webchat_desativado: false }, vencido, AGORA)).toEqual({ rota: "whatsapp" });
  });

  it("web com link REVOGADO volta ao WhatsApp", () => {
    const revogado = { ...ativo, revoked_at: minutos(-5) };
    expect(decidirRota({ webchat_rota: "web", webchat_desativado: false }, revogado, AGORA)).toEqual({ rota: "whatsapp" });
  });

  it("web sem link nenhum volta ao WhatsApp", () => {
    expect(decidirRota({ webchat_rota: "web", webchat_desativado: false }, null, AGORA)).toEqual({ rota: "whatsapp" });
  });

  it("desativado na conversa é WhatsApp mesmo com link ativo", () => {
    expect(decidirRota({ webchat_rota: "web", webchat_desativado: true }, ativo, AGORA)).toEqual({ rota: "whatsapp" });
  });

  it("rota whatsapp com link ativo continua WhatsApp (o paciente escreveu por lá)", () => {
    expect(decidirRota({ webchat_rota: "whatsapp", webchat_desativado: false }, ativo, AGORA)).toEqual({
      rota: "whatsapp",
    });
  });
});

describe("configuração", () => {
  it("nasce DESLIGADA, com convite automático pronto para quando ligar", () => {
    expect(CONFIG_PADRAO.ativo).toBe(false);
    expect(CONFIG_PADRAO.convite_automatico).toBe(true);
    expect(CONFIG_PADRAO.modelo_convite).toBeNull();
  });

  it("settings sem a chave = padrão", () => {
    expect(lerConfigDoWebChat({ outra: 1 })).toEqual(CONFIG_PADRAO);
    expect(lerConfigDoWebChat(null)).toEqual(CONFIG_PADRAO);
  });

  it("configuração estragada vira o padrão (desligado), nunca lança", () => {
    expect(lerConfigDoWebChat({ webchat: { ativo: "sim", convite_texto: 42 } })).toEqual(CONFIG_PADRAO);
  });

  it("lê o que foi gravado", () => {
    const c = lerConfigDoWebChat({
      webchat: { ativo: true, modelo_convite: { nome: "webchat_retomada", idioma: "pt_BR" } },
    });
    expect(c.ativo).toBe(true);
    expect(c.modelo_convite).toEqual({ nome: "webchat_retomada", idioma: "pt_BR" });
    expect(c.modelo_aviso).toBeNull();
  });
});

describe("aviso de nova mensagem", () => {
  it("paciente com sinal há menos de 1 minuto está na página", () => {
    expect(pacientePresente(minutos(-0.5), AGORA)).toBe(true);
    expect(pacientePresente(minutos(-2), AGORA)).toBe(false);
    expect(pacientePresente(null, AGORA)).toBe(false);
  });

  it("no máximo um por hora", () => {
    expect(avisoLiberado(null, AGORA)).toBe(true);
    expect(avisoLiberado(minutos(-30), AGORA)).toBe(false);
    expect(avisoLiberado(minutos(-60), AGORA)).toBe(true);
  });
});

describe("marca 'via Web Chat'", () => {
  it("só com a chave preenchida", () => {
    expect(viaWebchat({ webchat: { link_id: "l1" } })).toBe(true);
    expect(viaWebchat({ webchat: null })).toBe(false);
    expect(viaWebchat({})).toBe(false);
    expect(viaWebchat(null)).toBe(false);
  });
});

describe("janela de 24h do agente", () => {
  const horasAtras = (n: number) => new Date(AGORA.getTime() - n * 3_600_000);
  function ctx(over: Partial<GateContext>): GateContext {
    return {
      now: AGORA,
      body: "oi",
      optedOut: false,
      provider: "meta_cloud",
      pacing: {
        knobs: PACING_DEFAULTS,
        state: { lastSentAt: null, sentToday: 0, numberActivatedAt: null },
        crmDailyLimit: null,
        rng: () => 0,
      },
      spinning: { knobs: SPINNING_DEFAULTS, window: [] },
      lgpd: null,
      promise: { table: null },
      semanticPromise: null,
      ...over,
    } as GateContext;
  }

  it("janela FECHADA no oficial, mas na página: passa (skipped, para o trace provar)", () => {
    const v = messagingWindowGate.evaluate(
      ctx({ messagingWindow: { lastInboundAt: horasAtras(30), rotaWeb: true } }),
    );
    expect(v.pass).toBe(true);
    if (!v.pass) throw new Error("inalcançável");
    expect(v.skipped).toBe("not_applicable");
  });

  it("CONTROLE: a mesma janela fechada sem a página continua vetando", () => {
    const v = messagingWindowGate.evaluate(ctx({ messagingWindow: { lastInboundAt: horasAtras(30) } }));
    expect(v.pass).toBe(false);
  });
});

describe("caminhos públicos do Web Chat", () => {
  const token = "A".repeat(43);

  it("a página e as duas rotas com token de 43 caracteres são públicas", () => {
    expect(isPublicPath(`/chat/${token}`)).toBe(true);
    expect(isPublicPath(`/api/v1/webchat/p/${token}`)).toBe(true);
    expect(isPublicPath(`/api/v1/webchat/p/${token}/mensagens`)).toBe(true);
  });

  it("nada de carona: tamanho errado, sub-caminho ou a rota da equipe", () => {
    expect(isPublicPath(`/chat/${"A".repeat(42)}`)).toBe(false);
    expect(isPublicPath(`/chat/${token}/x`)).toBe(false);
    expect(isPublicPath(`/api/v1/webchat/p/${token}/outra`)).toBe(false);
    expect(isPublicPath("/api/v1/conversations/x/webchat")).toBe(false);
    expect(isPublicPath("/api/v1/settings/webchat")).toBe(false);
  });
});
