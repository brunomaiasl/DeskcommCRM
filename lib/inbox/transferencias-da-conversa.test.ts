import { describe, expect, it, vi } from "vitest";

import {
  comTransferencia,
  lerTransferencias,
  LIMITE_DE_TRANSFERENCIAS,
  registrarTransferenciaNaConversa,
  type TransferenciaRegistrada,
} from "@/lib/inbox/transferencias-da-conversa";

function entrada(n: number, over: Partial<TransferenciaRegistrada> = {}): TransferenciaRegistrada {
  return {
    id: `t${n}`,
    em: new Date(2026, 10, 16, 15, n).toISOString(),
    por_user_id: "u-por",
    de_user_id: "u-de",
    para_user_id: "u-para",
    para_fila_id: null,
    para_fila_nome: null,
    motivo: null,
    ...over,
  };
}

describe("histórico de transferências da conversa", () => {
  it("acrescenta ao fim e preserva as outras chaves do metadata", () => {
    const meta = { setor_origem: "manual" };
    const novo = comTransferencia(meta, entrada(1));
    expect(novo["setor_origem"]).toBe("manual");
    expect(lerTransferencias(novo).map((t) => t.id)).toEqual(["t1"]);
    // Não muta o original.
    expect(meta).toEqual({ setor_origem: "manual" });
  });

  it("guarda só as últimas — as mais antigas saem primeiro", () => {
    let meta: unknown = {};
    for (let i = 0; i < LIMITE_DE_TRANSFERENCIAS + 5; i++) meta = comTransferencia(meta, entrada(i));
    const lidas = lerTransferencias(meta);
    expect(lidas).toHaveLength(LIMITE_DE_TRANSFERENCIAS);
    expect(lidas[0]!.id).toBe("t5");
  });

  it("descarta lixo no metadata sem lançar", () => {
    expect(lerTransferencias(null)).toEqual([]);
    expect(lerTransferencias({ transferencias: "x" })).toEqual([]);
    expect(
      lerTransferencias({ transferencias: [null, { id: "a" }, { id: "b", em: "não é data" }] }),
    ).toEqual([]);
  });

  it("destino fila guarda o NOME da fila na hora (apagar a fila não reescreve o passado)", () => {
    const lidas = lerTransferencias(
      comTransferencia({}, entrada(1, { para_user_id: null, para_fila_id: "f1", para_fila_nome: "Agendamentos" })),
    );
    expect(lidas[0]).toMatchObject({ para_fila_nome: "Agendamentos", para_user_id: null });
  });

  it("gravar lê o metadata e escreve a lista; falha de escrita devolve false sem lançar", async () => {
    const update = vi.fn(() => ({ eq: () => ({ eq: async () => ({ error: null }) }) }));
    const supabase = {
      from: () => ({
        select: () => ({
          eq: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { metadata: { a: 1 } }, error: null }) }) }),
        }),
        update,
      }),
    };
    const ok = await registrarTransferenciaNaConversa({
      supabase,
      organizationId: "o",
      conversationId: "c",
      entrada: entrada(1),
    });
    expect(ok).toBe(true);
    const escrito = (update.mock.calls[0] as unknown as [{ metadata: Record<string, unknown> }])[0].metadata;
    expect(escrito["a"]).toBe(1);
    expect(lerTransferencias(escrito)).toHaveLength(1);

    const quebrado = {
      from: () => {
        throw new Error("banco fora");
      },
    };
    await expect(
      registrarTransferenciaNaConversa({ supabase: quebrado, organizationId: "o", conversationId: "c", entrada: entrada(2) }),
    ).resolves.toBe(false);
  });
});
