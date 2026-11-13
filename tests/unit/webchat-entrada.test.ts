// @vitest-environment node
/**
 * A mensagem que o paciente escreve na PÁGINA do Web Chat vira atendimento como
 * qualquer mensagem do WhatsApp — o agente responde e as automações reagem.
 *
 * O que estes testes guardam:
 *
 *  1. A linha nasce na MESMA conversa, como entrada do paciente, com a marca do
 *     Web Chat — é ela que o gatilho `fn_emit_message_event` transforma em
 *     `message.received` (automações, follow-up, campanha) e que a reabertura de
 *     atendimento carimba no episódio (o histórico que o agente lê).
 *  2. A conversa é marcada pela função do Web Chat, NUNCA pela de sempre: a de
 *     sempre anda o relógio da janela de 24h do WhatsApp, e a página não abre
 *     janela na Meta.
 *  3. A pós-entrada roda com a origem `webchat` e o id da mensagem — é dela que
 *     sai o pedido de turno do agente (`ai_agent.dispatch_requested`).
 *  4. Reenvio do mesmo id (rede instável, clique duplo) não cria segunda
 *     mensagem nem segundo turno.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

const posEntrada = vi.fn();
vi.mock("@/lib/channels/pos-entrada", () => ({ aplicarEfeitosPosEntrada: (...a: unknown[]) => posEntrada(...a) }));

const { receberDaPagina } = await import("@/lib/webchat/pagina");
import type { LinhaDoLink } from "@/lib/webchat/links";

const LINK: LinhaDoLink = {
  id: "link-1",
  organization_id: "org-1",
  conversation_id: "conv-1",
  contact_id: "contato-1",
  origem: "manual",
  created_at: "2026-11-13T10:00:00Z",
  expires_at: "2026-11-14T10:00:00Z",
  revoked_at: null,
  revoked_reason: null,
  opened_at: null,
  last_seen_at: null,
  last_notice_at: null,
};

interface Registro {
  inserts: Array<{ tabela: string; linha: Record<string, unknown> }>;
  rpcs: Array<{ fn: string; args: Record<string, unknown> }>;
}

function bancoFalso(opcoes: { duplicada?: boolean } = {}) {
  const reg: Registro = { inserts: [], rpcs: [] };
  const from = (tabela: string) => {
    const cadeia: Record<string, unknown> = {};
    const devolve = () => cadeia;
    Object.assign(cadeia, {
      select: devolve,
      eq: devolve,
      update: devolve,
      maybeSingle: async () => {
        if (tabela === "conversations")
          return { data: { id: "conv-1", channel_session_id: "sessao-1", contact_id: "contato-1" }, error: null };
        if (tabela === "messages")
          return { data: { id: "msg-existente", sent_at: "2026-11-13T10:05:00Z", body: "oi" }, error: null };
        return { data: null, error: null };
      },
      insert: (linha: Record<string, unknown>) => {
        reg.inserts.push({ tabela, linha });
        return {
          select: () => ({
            single: async () =>
              opcoes.duplicada
                ? { data: null, error: { code: "23505", message: "duplicada" } }
                : { data: { id: "msg-nova", sent_at: "2026-11-13T10:05:00Z" }, error: null },
          }),
        };
      },
      then: (ok: (v: unknown) => unknown) => Promise.resolve({ data: null, error: null }).then(ok),
    });
    return cadeia;
  };
  const rpc = async (fn: string, args: Record<string, unknown>) => {
    reg.rpcs.push({ fn, args });
    return { data: null, error: null };
  };
  return { admin: { from, rpc } as never, reg };
}

beforeEach(() => posEntrada.mockReset());

describe("mensagem escrita na página do Web Chat", () => {
  it("entra na MESMA conversa como mensagem do paciente, com a marca do Web Chat", async () => {
    const { admin, reg } = bancoFalso();
    const r = await receberDaPagina(admin, LINK, { texto: "  quero agendar  ", idDoCliente: "c1", requestId: "req" });

    expect(r).toMatchObject({ ok: true, duplicada: false });
    const ins = reg.inserts.find((i) => i.tabela === "messages");
    expect(ins?.linha).toMatchObject({
      organization_id: "org-1",
      conversation_id: "conv-1",
      contact_id: "contato-1",
      channel_session_id: "sessao-1",
      direction: "inbound",
      type: "text",
      body: "quero agendar",
      metadata: { webchat: { link_id: "link-1" } },
    });
  });

  it("marca a conversa SEM andar o relógio da janela do WhatsApp", async () => {
    const { admin, reg } = bancoFalso();
    await receberDaPagina(admin, LINK, { texto: "oi", idDoCliente: "c1", requestId: "req" });

    const fns = reg.rpcs.map((r) => r.fn);
    expect(fns).toContain("fn_mark_conversation_web_message");
    expect(fns).not.toContain("fn_mark_conversation_message");
  });

  it("aciona a pós-entrada como mensagem do paciente — é o que acorda o agente e as automações", async () => {
    const { admin } = bancoFalso();
    await receberDaPagina(admin, LINK, { texto: "oi", idDoCliente: "c1", requestId: "req" });

    expect(posEntrada).toHaveBeenCalledTimes(1);
    expect(posEntrada.mock.calls[0]![1]).toMatchObject({
      organizationId: "org-1",
      conversationId: "conv-1",
      contactId: "contato-1",
      channelSessionId: "sessao-1",
      messageId: "msg-nova",
      texto: "oi",
      origem: "webchat",
    });
  });

  it("o mesmo envio repetido não vira segunda mensagem nem segundo turno", async () => {
    const { admin } = bancoFalso({ duplicada: true });
    const r = await receberDaPagina(admin, LINK, { texto: "oi", idDoCliente: "c1", requestId: "req" });

    expect(r).toMatchObject({ ok: true, duplicada: true });
    expect(posEntrada).not.toHaveBeenCalled();
  });

  it("texto vazio é recusado sem gravar nada", async () => {
    const { admin, reg } = bancoFalso();
    const r = await receberDaPagina(admin, LINK, { texto: "   ", idDoCliente: "c1", requestId: "req" });
    expect(r).toEqual({ ok: false, motivo: "texto_vazio" });
    expect(reg.inserts).toHaveLength(0);
    expect(posEntrada).not.toHaveBeenCalled();
  });
});
