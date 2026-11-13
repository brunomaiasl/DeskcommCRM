// @vitest-environment node
/**
 * `crm_list_sectors` é a metade de leitura de `crm_set_conversation_sector`: sem
 * ela o agente não tem de onde tirar o `sector_id` e a triagem por setor só
 * funciona se o dono colar ids no prompt.
 *
 * Guarda: filtra pela organização do CONTEXTO (service role ignora RLS), devolve
 * só nome/descrição, e lista vazia vira aviso — não erro.
 */
import { describe, expect, it } from "vitest";

import { catalogEntry } from "@/lib/mcp/tools/catalog";
import { crmListSectors } from "@/lib/mcp/tools/governance";
import type { McpContext } from "@/lib/mcp/types";

function ctxCom(linhas: unknown[], filtros: Array<[string, unknown]>): McpContext {
  const cadeia = {
    select: () => cadeia,
    eq: (col: string, val: unknown) => {
      filtros.push([col, val]);
      return cadeia;
    },
    order: async () => ({ data: linhas, error: null }),
  };
  return {
    organizationId: "org-1",
    supabase: { from: (t: string) => (t === "attendant_sectors" ? cadeia : null) },
  } as unknown as McpContext;
}

describe("crm_list_sectors", () => {
  it("lista os setores da organização do contexto", async () => {
    const filtros: Array<[string, unknown]> = [];
    const r = await crmListSectors.handler(
      {},
      ctxCom([{ id: "s1", name: "Recepção", description: "Agenda e cadastro" }], filtros),
    );
    expect(filtros).toContainEqual(["organization_id", "org-1"]);
    expect(r).toEqual({ setores: [{ sector_id: "s1", nome: "Recepção", descricao: "Agenda e cadastro" }] });
  });

  it("sem setores: avisa em vez de falhar", async () => {
    const r = await crmListSectors.handler({}, ctxCom([], []));
    expect(r).toMatchObject({ setores: [], aviso: expect.any(String) });
  });

  it("só existe com o módulo de setores ligado", () => {
    expect(catalogEntry("crm_list_sectors")?.modulo).toBe("setores");
  });
});
