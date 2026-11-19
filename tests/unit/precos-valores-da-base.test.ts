// @vitest-environment node
/**
 * O VALOR EXATO pela tabela (18/11): o agente disse duas vezes R$ 69,00 (cirurgia
 * geral) para a consulta de clínico geral, que custa R$ 29,90 com o Cartão. Aqui,
 * com linhas no formato REAL da tabela da Med Anchieta.
 */
import { describe, expect, it } from "vitest";

import { buscarValor, extrairValores } from "@/lib/precos/valores-da-base";

const TABELA = `
CONSULTA DE CLÍNICO GERAL — clínico geral, clínico, médico geral, check-up, consulta geral.
Pergunta: Quanto custa a consulta de clínico geral? Resposta: A consulta de clínico geral custa R$ 150,00 no particular e R$ 29,90 com o Cartão Saúde Anchieta. Economia de R$ 120,10 (80%) usando o cartão.

CONSULTA DE CIRURGIA GERAL — cirurgia geral, cirurgião geral.
Pergunta: Quanto custa a consulta de cirurgia geral? Resposta: A consulta de cirurgia geral custa R$ 190,00 no particular e R$ 69,00 com o Cartão Saúde Anchieta. Economia de R$ 121,00 (64%).

CONSULTA DE OFTALMOLOGIA — oftalmologista, oculista, médico dos olhos.
Pergunta: Quanto custa a consulta de oftalmologia? Resposta: A consulta de oftalmologia custa R$ 190,00 no particular e R$ 69,00 com o Cartão Saúde Anchieta.

- HEMOGRAMA COMPLETO — Particular: R$ 16,75 | Com Cartão Saúde Anchieta: R$ 8,43 | Economia com o cartão: R$ 8,32 (50%)
- US ABDOME TOTAL — Particular: R$ 198,06 | Com Cartão Saúde Anchieta: R$ 138,83 | Economia com o cartão: R$ 59,23 (30%)
- US ABDOME SUPERIOR — Particular: R$ 153,01 | Com Cartão Saúde Anchieta: R$ 107,25 | Economia com o cartão: R$ 45,76 (30%)
- TC CRANIO — Particular: R$ 380,00 | Com Cartão Saúde Anchieta: R$ 333,00 | Economia com o cartão: R$ 47,00 (12%)
`;
const tabela = extrairValores(TABELA);
const um = (q: string) => buscarValor(q, tabela);

describe("valor exato da tabela", () => {
  it("clínico geral é R$ 150,00 / R$ 29,90 — NUNCA o da cirurgia geral (o erro de 18/11)", () => {
    for (const q of ["clínico geral", "Clínica Geral", "consulta de clínico geral", "médico geral", "quanto custa a consulta com clínico"]) {
      const r = um(q);
      expect(r[0], q).toMatchObject({ tipo: "consulta", nome: "clínico geral", particular: "R$ 150,00", cartao: "R$ 29,90" });
      expect(r.some((v) => v.nome === "cirurgia geral"), q).toBe(false);
    }
  });
  it("cirurgia geral e oftalmologia pelo nome e pelo apelido", () => {
    expect(um("cirurgia geral")).toEqual([expect.objectContaining({ nome: "cirurgia geral", cartao: "R$ 69,00" })]);
    expect(um("oculista")[0]).toMatchObject({ nome: "oftalmologia", particular: "R$ 190,00" });
  });
  it("exames pelo nome, com sigla (ultrassom = US, tomografia = TC)", () => {
    expect(um("hemograma completo")[0]).toMatchObject({ tipo: "exame", nome: "HEMOGRAMA COMPLETO", cartao: "R$ 8,43" });
    expect(um("ultrassom de abdome total")[0]).toMatchObject({ nome: "US ABDOME TOTAL", particular: "R$ 198,06" });
    expect(um("tomografia de crânio")[0]).toMatchObject({ nome: "TC CRANIO" });
  });
  it("pedido genérico devolve as opções parecidas; item que não existe devolve nada", () => {
    expect(um("ultrassom abdome").map((v) => v.nome)).toEqual(expect.arrayContaining(["US ABDOME TOTAL", "US ABDOME SUPERIOR"]));
    expect(um("transplante de coração")).toEqual([]);
  });
});
