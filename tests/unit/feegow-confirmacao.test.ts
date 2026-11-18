// @vitest-environment node
/**
 * A REGRA PRINCIPAL DA AGENDA (18/11): o agente NUNCA inventa CPF, cadastro nem
 * confirmação. Aqui as peças puras de `lib/feegow/confirmacao.ts`; o fluxo das
 * ferramentas está em `feegow-agenda.test.ts`.
 */
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  anoFoiDigitadoPeloPaciente,
  conferirConfirmacao,
  cpfFoiDigitadoPeloPaciente,
  emitirConfirmacao,
  nomeFoiDigitadoPeloPaciente,
  VALIDADE_DA_CONFIRMACAO_MS,
  type DadosDaConfirmacao,
} from "@/lib/feegow/confirmacao";

beforeEach(() => {
  process.env.INTERNAL_SECRET = "segredo-de-teste";
});
afterEach(() => {
  delete process.env.INTERNAL_SECRET;
});

const DADOS: DadosDaConfirmacao = {
  acao: "marcar",
  organizacao: "org",
  contato: "contato-1",
  dados: { paciente_id: 91282, profissional_id: 203, data: "2026-11-19", hora: "08:00" },
};

describe("cpfFoiDigitadoPeloPaciente", () => {
  it("casa com ou sem pontuação, só nas mensagens do paciente", () => {
    expect(cpfFoiDigitadoPeloPaciente("347.075.238-97", ["meu cpf é 34707523897"])).toBe(true);
    expect(cpfFoiDigitadoPeloPaciente("34707523897", ["CPF: 347.075.238-97"])).toBe(true);
  });
  it("CPF que ninguém digitou (o incidente de 18/11) não passa", () => {
    expect(cpfFoiDigitadoPeloPaciente("12345678909", ["quero agendar com clínico geral", "1"])).toBe(false);
    expect(cpfFoiDigitadoPeloPaciente("123", ["123"])).toBe(false);
  });
});

describe("nome e nascimento escritos pelo paciente", () => {
  it("nome: toda palavra do nome aparece no que ele escreveu (sem acento/caixa)", () => {
    expect(nomeFoiDigitadoPeloPaciente("Bruno Maia da Silva", ["meu nome é bruno maia da silva"])).toBe(true);
    expect(nomeFoiDigitadoPeloPaciente("José Antônio", ["jose antonio"])).toBe(true);
    expect(nomeFoiDigitadoPeloPaciente("Bruno Maia Santos", ["meu nome é bruno maia"])).toBe(false);
  });
  it("ano de nascimento precisa ter sido escrito", () => {
    expect(anoFoiDigitadoPeloPaciente("1990-03-05", ["nasci em 05/03/1990"])).toBe(true);
    expect(anoFoiDigitadoPeloPaciente("1990-03-05", ["nasci em março"])).toBe(false);
  });
});

describe("código de confirmação", () => {
  it("o código confere com os MESMOS dados", () => {
    const codigo = emitirConfirmacao(DADOS);
    expect(conferirConfirmacao(codigo, DADOS)).toMatchObject({ ok: true });
  });
  it("outro horário, outro paciente ou outra ação: recusa", () => {
    const codigo = emitirConfirmacao(DADOS);
    expect(conferirConfirmacao(codigo, { ...DADOS, dados: { ...DADOS.dados, hora: "09:00" } })).toEqual({ ok: false, motivo: "dados_mudaram" });
    expect(conferirConfirmacao(codigo, { ...DADOS, dados: { ...DADOS.dados, paciente_id: 22009 } })).toEqual({ ok: false, motivo: "dados_mudaram" });
    expect(conferirConfirmacao(codigo, { ...DADOS, acao: "cancelar" })).toEqual({ ok: false, motivo: "dados_mudaram" });
    expect(conferirConfirmacao(codigo, { ...DADOS, contato: "outro" })).toEqual({ ok: false, motivo: "dados_mudaram" });
  });
  it("forjado ou vencido: recusa", () => {
    expect(conferirConfirmacao("abc.def", DADOS)).toEqual({ ok: false, motivo: "codigo_invalido" });
    const velho = emitirConfirmacao(DADOS, new Date(Date.now() - VALIDADE_DA_CONFIRMACAO_MS - 1000));
    expect(conferirConfirmacao(velho, DADOS)).toEqual({ ok: false, motivo: "codigo_vencido" });
  });
  it("sem segredo configurado não emite (nunca um código sem assinatura)", () => {
    delete process.env.INTERNAL_SECRET;
    expect(() => emitirConfirmacao(DADOS)).toThrow();
  });
});
