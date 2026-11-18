// @vitest-environment node
/**
 * Integração Feegow — o que estes testes guardam:
 *
 *  1. A disponibilidade vem em DUAS formas documentadas (lista e objeto por
 *     local). Ler só uma faria o agente dizer "sem horário" com a agenda cheia.
 *  2. "Primeiro horário" anda em janelas e para no primeiro achado — não pede
 *     90 dias de agenda para achar amanhã.
 *  3. Recusa de negócio volta como RESPOSTA ao modelo, nunca exceção.
 *  4. Cancelar/remarcar conferem o dono: agendamento de outro paciente não é
 *     tocado, e nenhum POST sai.
 *  5. O token vai no header e nunca aparece em mensagem.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// O token agora vem do RESOLVEDOR da instalação (banco primeiro, `.env` de
// reserva). Aqui o "banco" está vazio: o resolvedor devolve o que o ambiente
// tem — que é o que cada caso configura em `process.env`.
vi.mock("@/lib/instalacao/config", () => ({
  valorDaInstalacao: async (chave: string) => ({
    valor: process.env[chave] ?? null,
    fonte: process.env[chave] ? "ambiente" : "ausente",
  }),
}));

import { esquecerFeegowConfig } from "@/lib/feegow/config";
import {
  escolherConsultaDaEspecialidade,
  filtrarEspecialidades,
  variantesDoTelefone,
  limparCacheDoFeegow,
  normalizarDisponibilidade,
  primeirosHorarios,
  type FiltroDeHorarios,
  type Horario,
} from "@/lib/feegow/agenda";
import { escritaCabeNoTurno } from "@/lib/ai/runtime/escopo-das-escritas";
import { feegowGet, FeegowError } from "@/lib/feegow/client";
import { agoraEmSaoPaulo, isoParaBR, paraIso, somarDias } from "@/lib/feegow/datas";
import {
  crmFeegowBookAppointment,
  crmFeegowCancelAppointment,
  crmFeegowFindPatientByPhone,
  crmFeegowListUnits,
  crmFeegowNextAvailable,
} from "@/lib/mcp/tools/feegow";
import type { McpContext } from "@/lib/mcp/types";

const TOKEN = "tok-de-teste-123";
const ctx = { organizationId: "org", requestId: "req" } as unknown as McpContext;

/** O tipo do handler exige os opcionais explícitos; o Zod da ponte é quem os preenche em produção. */
function executar(tool: { handler: (input: never, ctx: McpContext) => Promise<unknown> }, input: object) {
  return tool.handler(input as never, ctx);
}

// Datas no futuro distante: o filtro de "já passou" usa o relógio real.
const DIA = "2099-03-10";
const DIA_BR = "10-03-2099";

interface Chamada {
  metodo: string;
  path: string;
  query: URLSearchParams;
  body: unknown;
  token: string | null;
}

type Rota = (c: Chamada) => { status?: number; body: unknown } | undefined;

let chamadas: Chamada[] = [];

function simularFeegow(rota: Rota) {
  chamadas = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init: RequestInit) => {
      const u = new URL(url);
      const headers = init.headers as Record<string, string>;
      const c: Chamada = {
        metodo: init.method ?? "GET",
        path: u.pathname.replace("/v1/api/", ""),
        query: u.searchParams,
        body: init.body ? JSON.parse(String(init.body)) : undefined,
        token: headers["x-access-token"] ?? null,
      };
      chamadas.push(c);
      const r = rota(c) ?? { status: 404, body: { success: false, content: "rota não simulada" } };
      return new Response(JSON.stringify(r.body), { status: r.status ?? 200 });
    }),
  );
}

const ok = (content: unknown) => ({ body: { success: true, content } });

const PROFISSIONAIS = ok([
  { profissional_id: 7, nome: "Dra. Ana", especialidades: [{ especialidade_id: 95, nome_especialidade: "Dermatologia" }] },
  { profissional_id: 9, nome: "Dr. Beto", especialidades: [{ especialidade_id: 95, nome_especialidade: "Dermatologia" }] },
]);

beforeEach(() => {
  process.env.FEEGOW_API_TOKEN = TOKEN;
  delete process.env.FEEGOW_CANAL_ID;
  delete process.env.FEEGOW_UNIDADE_ID;
  limparCacheDoFeegow();
  esquecerFeegowConfig();
});

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.FEEGOW_API_TOKEN;
  esquecerFeegowConfig();
});

// ─── datas ──────────────────────────────────────────────────────────────────

describe("datas", () => {
  it("converte entre ISO e o formato do Feegow", () => {
    expect(isoParaBR("2026-11-12")).toBe("12-11-2026");
    expect(paraIso("12-11-2026")).toBe("2026-11-12");
    expect(paraIso("2026-11-12")).toBe("2026-11-12");
    expect(paraIso("lixo")).toBeNull();
    expect(somarDias("2026-12-30", 3)).toBe("2027-01-02");
  });

  it("'hoje' é o de São Paulo, não o do servidor em UTC", () => {
    // 02:30 UTC do dia 13 ainda é 23:30 do dia 12 em Brasília.
    expect(agoraEmSaoPaulo(new Date("2026-11-13T02:30:00Z"))).toEqual({ data: "2026-11-12", hora: "23:30" });
  });
});

// ─── especialidades: o jeito que o paciente fala ────────────────────────────

describe("filtrarEspecialidades", () => {
  // Nomes reais da Med Anchieta (Feegow, 17/11/2026).
  const ESP = [
    [227, "Clínica Geral"],
    [296, "ODONTOLOGIA ( CLINICO GERAL)"],
    [90, "Cirurgia Geral"],
    [96, "Cardiologia"],
    [126, "Oftalmologia"],
    [141, "Psiquiatria"],
    [271, "Ginecologia"],
    [134, "Pediatria Geral"],
    [254, "Odontologia (dentística)"],
  ].map(([id, nome]) => ({ especialidade_id: id as number, nome: nome as string, consulta_id: null }));
  const ids = (termo: string) => filtrarEspecialidades(ESP, termo).map((e) => e.especialidade_id);

  it("'clínico geral' é a Clínica Geral — não o dentista nem a cirurgia", () => {
    for (const t of ["clinico geral", "clínico geral", "Clínico", "clínica geral", "médico clínico", "consulta com clinico geral"])
      expect(ids(t), t).toEqual([227]);
  });

  it("nome da profissão casa com o da especialidade", () => {
    expect(ids("cardiologista")).toEqual([96]);
    expect(ids("oftalmologista")).toEqual([126]);
    expect(ids("oculista")).toEqual([126]);
    expect(ids("psiquiatra")).toEqual([141]);
    expect(ids("ginecologista")).toEqual([271]);
    expect(ids("pediatra")).toEqual([134]);
  });

  it("odontologia só aparece quando o pedido fala em dente", () => {
    expect(ids("dentista").every((id) => id === 296 || id === 254)).toBe(true);
    expect(ids("dentista").length).toBeGreaterThan(0);
    expect(ids("geral")).not.toContain(296);
  });

  it("sem termo devolve todas; termo sem par devolve vazio", () => {
    expect(filtrarEspecialidades(ESP).length).toBe(ESP.length);
    expect(ids("astronauta")).toEqual([]);
  });
});

// ─── a consulta da especialidade, pelo nome ─────────────────────────────────

describe("escolherConsultaDaEspecialidade", () => {
  // Nomes e ids REAIS do Feegow da Med Anchieta (18/11/2026).
  const PROCS = [
    { procedimento_id: 2151, nome: "TESTE IMPLANTAÇÃO", valor: 0 },
    { procedimento_id: 11, nome: "CONSULTA - CLÍNICO GERAL", valor: 15000 },
    { procedimento_id: 16, nome: "CONSULTA OFTALMOLOGISTA", valor: 19000 },
    { procedimento_id: 1873, nome: "CONSULTA - OFTALMOLOGISTA (OFTCAMP)", valor: 20160 },
    { procedimento_id: 17, nome: "CONSULTA - ORTOPEDISTA", valor: 19000 },
    { procedimento_id: 20, nome: "CONSULTA - PEDIATRA", valor: 19000 },
    { procedimento_id: 1941, nome: "CONSULTA - CIRURGIA GERAL", valor: 19000 },
    { procedimento_id: 1777, nome: "US ABDOME TOTAL", valor: 12000 },
    { procedimento_id: 500, nome: "CONSULTA RETORNO CLÍNICO GERAL", valor: 0 },
  ];
  const id = (esp: string) => escolherConsultaDaEspecialidade(esp, PROCS)?.procedimento_id ?? null;

  it("acha a consulta de verdade quando a padrão é 'TESTE IMPLANTAÇÃO' (o caso da Clínica Geral)", () => {
    expect(id("Clínica Geral")).toBe(11);
  });

  it("especialidade → consulta pelo radical, sem confundir as que dividem 'geral'", () => {
    expect(id("Oftalmologia")).toBe(16); // o nome mais curto, não o "(OFTCAMP)"
    expect(id("Ortopedia e Traumatologia")).toBe(17);
    expect(id("Pediatria Geral")).toBe(20);
    expect(id("Cirurgia Geral")).toBe(1941);
  });

  it("nunca escolhe teste, retorno nem exame; sem par devolve null", () => {
    expect(id("Radiologia e Diagnóstico por Imagem")).toBeNull();
    expect(PROCS.filter((p) => [2151, 500, 1777].includes(p.procedimento_id)).map((p) => p.procedimento_id)).not.toContain(id("Clínica Geral"));
  });
});

// ─── paciente pelo celular da conversa ──────────────────────────────────────

describe("variantesDoTelefone", () => {
  it("tira o 55 (o Feegow não casa com ele) e cobre o cadastro sem o nono dígito", () => {
    expect(variantesDoTelefone("+5519999798080")).toEqual(["19999798080", "1999798080"]);
    expect(variantesDoTelefone("19999798080")).toEqual(["19999798080", "1999798080"]);
    expect(variantesDoTelefone("1932345678")).toEqual(["1932345678", "19932345678"]);
    expect(variantesDoTelefone("123")).toEqual([]);
  });
});

describe("crm_feegow_find_patient_by_phone", () => {
  /** O "banco" do contato: só a linha do contato do turno, na organização do turno. */
  function ctxCom(telefone: string | null, contatoDoTurno: string | undefined) {
    const filtros: Array<[string, string]> = [];
    const consulta = {
      select: () => consulta,
      eq: (col: string, val: string) => (filtros.push([col, val]), consulta),
      maybeSingle: async () => ({ data: { phone_number: telefone }, error: null }),
    };
    return {
      ctx: { ...ctx, contatoDoTurno, supabase: { from: () => consulta } } as unknown as McpContext,
      filtros,
    };
  }

  // Formas reais do Feegow da Med Anchieta (18/11): a 4 é a tabela do Cartão.
  const TABELAS = ok([
    { tabela_id: 4, nome_tabela: "Tabela Cartão Saúde Anchieta" },
    { tabela_id: 2, nome_tabela: "Tabela Particular" },
  ]);

  it("usa o celular do CONTATO DO TURNO (não um número do modelo); devolve id, primeiro nome e o Cartão", async () => {
    simularFeegow((c) => {
      if (c.path === "patient/list-privates") return TABELAS;
      return c.path === "patient/list" && c.query.get("telefone") === "19999798080"
        ? ok([
            { patient_id: 91282, nome: "BRUNO MAIA DA SILVA", tabela_id: 4, celular: "19999798080", email: "x@y.z" },
            { patient_id: 91283, nome: "ANA MAIA", tabela_id: 2, celular: "19999798080" },
          ])
        : ok([]);
    });
    const { ctx: c, filtros } = ctxCom("+5519999798080", "contato-1");
    const r = await crmFeegowFindPatientByPhone.handler({} as never, c);
    expect(r).toEqual({
      ok: true,
      encontrado: true,
      pacientes: [
        { paciente_id: 91282, primeiro_nome: "BRUNO", possui_cartao_saude: true },
        { paciente_id: 91283, primeiro_nome: "ANA", possui_cartao_saude: false },
      ],
    });
    // Nada da ficha além disso (e-mail, celular) vai para o modelo.
    expect(JSON.stringify(r)).not.toContain("x@y.z");
    expect(filtros).toContainEqual(["id", "contato-1"]);
    expect(filtros).toContainEqual(["organization_id", "org"]);
  });

  it("sem a lista de tabelas, o Cartão fica null (não sei) e o resto continua", async () => {
    simularFeegow((c) => {
      if (c.path === "patient/list-privates") return { status: 500, body: { success: false } };
      return c.path === "patient/list" ? ok([{ patient_id: 91282, nome: "BRUNO", tabela_id: 4 }]) : ok([]);
    });
    const { ctx: c } = ctxCom("19999798080", "contato-1");
    expect(await crmFeegowFindPatientByPhone.handler({} as never, c)).toMatchObject({
      encontrado: true,
      pacientes: [{ paciente_id: 91282, possui_cartao_saude: null }],
    });
  });

  it("sem contato do turno (rota externa, Testar): recusa e manda pedir o CPF", async () => {
    simularFeegow(() => ok([]));
    const { ctx: c } = ctxCom("+5519999798080", undefined);
    expect(await crmFeegowFindPatientByPhone.handler({} as never, c)).toMatchObject({ ok: false, motivo: "sem_conversa" });
    expect(chamadas).toHaveLength(0);
  });

  it("número sem cadastro: encontrado false, sem inventar paciente", async () => {
    simularFeegow(() => ok([]));
    const { ctx: c } = ctxCom("+5519999798080", "contato-1");
    expect(await crmFeegowFindPatientByPhone.handler({} as never, c)).toMatchObject({ ok: true, encontrado: false });
  });
});

// ─── disponibilidade ────────────────────────────────────────────────────────

describe("normalizarDisponibilidade", () => {
  it("lê as duas formas documentadas de local_id", () => {
    const horarios = normalizarDisponibilidade({
      profissional_id: {
        "1": { local_id: [{ "2018-08-10": ["08:00:00", "08:30:00"] }], age_restriction: null },
        "39": { local_id: { "15": { "2018-08-11": ["09:00:00"] } }, age_restriction: null },
      },
    });
    expect(horarios).toEqual([
      { profissional_id: 1, local_id: 0, data: "2018-08-10", hora: "08:00" },
      { profissional_id: 1, local_id: 0, data: "2018-08-10", hora: "08:30" },
      { profissional_id: 39, local_id: 15, data: "2018-08-11", hora: "09:00" },
    ]);
  });

  it("agenda vazia (`[]`, `null`) vira lista vazia, não exceção", () => {
    expect(normalizarDisponibilidade([])).toEqual([]);
    expect(normalizarDisponibilidade(null)).toEqual([]);
    expect(normalizarDisponibilidade({ profissional_id: [] })).toEqual([]);
  });
});

describe("primeirosHorarios", () => {
  it("anda em janelas e para na primeira que tem horário", async () => {
    const janelas: Array<[string, string]> = [];
    const achado: Horario = { profissional_id: 7, local_id: 0, data: "2099-01-20", hora: "10:00" };
    const buscar = async (f: FiltroDeHorarios) => {
      janelas.push([f.de, f.ate]);
      return f.de <= achado.data && achado.data <= f.ate ? [achado] : [];
    };
    const r = await primeirosHorarios({ especialidade_id: 95, de: "2099-01-01" }, buscar);
    expect(r.horarios).toEqual([achado]);
    expect(janelas).toEqual([
      ["2099-01-01", "2099-01-15"],
      ["2099-01-16", "2099-01-30"],
    ]);
  });

  it("desiste no teto de dias em vez de buscar para sempre", async () => {
    let n = 0;
    const r = await primeirosHorarios({ especialidade_id: 95, de: "2099-01-01" }, async () => {
      n += 1;
      return [];
    });
    expect(r.horarios).toEqual([]);
    expect(r.buscou_ate).toBe(somarDias("2099-01-01", 90));
    expect(n).toBeLessThanOrEqual(7);
  });
});

// ─── cliente ────────────────────────────────────────────────────────────────

describe("cliente HTTP", () => {
  it("manda o token no header x-access-token", async () => {
    simularFeegow(() => ok([]));
    await feegowGet("specialties/list");
    expect(chamadas[0]?.token).toBe(TOKEN);
  });

  it("sem token: falha de configuração, sem chamar a rede", async () => {
    delete process.env.FEEGOW_API_TOKEN;
    simularFeegow(() => ok([]));
    await expect(feegowGet("specialties/list")).rejects.toMatchObject({ kind: "nao_configurado" });
    expect(chamadas).toHaveLength(0);
  });

  it("403 vira token_invalido e a mensagem não carrega o token", async () => {
    simularFeegow(() => ({ status: 403, body: { success: false } }));
    const err = await feegowGet("specialties/list").catch((e: unknown) => e);
    expect(err).toBeInstanceOf(FeegowError);
    expect((err as FeegowError).kind).toBe("token_invalido");
    expect((err as FeegowError).message).not.toContain(TOKEN);
  });

  it("409 vira conflito com o texto do Feegow", async () => {
    simularFeegow(() => ({ status: 409, body: { success: false, content: "Horário ocupado" } }));
    await expect(feegowGet("x")).rejects.toMatchObject({ kind: "conflito", message: "Horário ocupado" });
  });
});

// ─── tools ──────────────────────────────────────────────────────────────────

describe("crm_feegow_list_units — só as unidades configuradas", () => {
  it("com FEEGOW_UNIDADE_ID=1,2, as de outras empresas não aparecem", async () => {
    process.env.FEEGOW_UNIDADE_ID = "1,2";
    simularFeegow((c) => {
      if (c.path === "company/list-unity") {
        return ok({
          matriz: [{ unidade_id: 0, nome_fantasia: "CARTÃO SAÚDE ANCHIETA" }],
          unidades: [
            { unidade_id: 1, nome_fantasia: "MED ANCHIETA - PD ANCHIETA" },
            { unidade_id: 2, nome_fantasia: "MED ANCHIETA - MATÃO" },
            { unidade_id: 3, nome_fantasia: "PICELLO" },
          ],
        });
      }
      return undefined;
    });
    const r = (await executar(crmFeegowListUnits, {})) as { unidades: Array<{ nome: string }> };
    expect(r.unidades.map((u) => u.nome)).toEqual(["MED ANCHIETA - PD ANCHIETA", "MED ANCHIETA - MATÃO"]);
    delete process.env.FEEGOW_UNIDADE_ID;
  });
});

describe("crm_feegow_list_units", () => {
  it("lista matriz e filiais com endereço montado, sem repetir", async () => {
    simularFeegow((c) => {
      if (c.path === "company/list-unity") {
        return ok({
          matriz: [
            {
              unidade_id: 0,
              nome_fantasia: "Padre Anchieta - Campinas",
              endereco: "Rua Padre Anchieta",
              numero: "100",
              bairro: "Centro",
              cidade: "Campinas",
              estado: "SP",
              cep: "13000-000",
              complemento: "",
              telefone_1: "(19) 3333-0000",
            },
          ],
          unidades: [
            { unidade_id: 2, nome_fantasia: "Matão - Sumaré", endereco: "", numero: "", bairro: "", cidade: "", estado: "" },
          ],
        });
      }
      return undefined;
    });
    const r = (await executar(crmFeegowListUnits, {})) as {
      ok: boolean;
      unidades: Array<{ unidade_id: number; nome: string; endereco: string | null; telefone: string | null }>;
    };
    expect(r.ok).toBe(true);
    expect(r.unidades).toEqual([
      {
        unidade_id: 0,
        nome: "Padre Anchieta - Campinas",
        endereco: "Rua Padre Anchieta, 100 - Centro, Campinas/SP - CEP 13000-000",
        telefone: "(19) 3333-0000",
      },
      // Sem endereço no cadastro: endereço nulo, e o agente não inventa.
      { unidade_id: 2, nome: "Matão - Sumaré", endereco: null, telefone: null },
    ]);
  });
});

describe("crm_feegow_next_available", () => {
  it("devolve o mais próximo e o primeiro de cada profissional, com nome", async () => {
    simularFeegow((c) => {
      if (c.path === "appoints/available-schedule") {
        expect(c.query.get("tipo")).toBe("E");
        expect(c.query.get("especialidade_id")).toBe("95");
        return ok({
          profissional_id: {
            "9": { local_id: { "0": { "2099-01-02": ["14:00:00"] } } },
            "7": { local_id: { "0": { "2099-01-02": ["09:00:00", "09:30:00"] } } },
          },
        });
      }
      if (c.path === "professional/list") return PROFISSIONAIS;
      return undefined;
    });
    const r = (await executar(crmFeegowNextAvailable, 
      { especialidade_id: 95, quantidade: 2, a_partir_de: "2099-01-01" })) as { encontrou: boolean; mais_proximos: Array<{ profissional: string; hora: string }>; primeiro_de_cada_profissional: Array<{ profissional: string }> };

    expect(r.encontrou).toBe(true);
    expect(r.mais_proximos.map((h) => [h.profissional, h.hora])).toEqual([
      ["Dra. Ana", "09:00"],
      ["Dra. Ana", "09:30"],
    ]);
    expect(r.primeiro_de_cada_profissional.map((h) => h.profissional)).toEqual(["Dra. Ana", "Dr. Beto"]);
  });

  it("cada horário diz a UNIDADE (local → unidade → nome), em todas as unidades", async () => {
    simularFeegow((c) => {
      if (c.path === "appoints/available-schedule") {
        // Sem unidade configurada, a busca não filtra unidade: vê todas.
        expect(c.query.get("unidade_id")).toBeNull();
        return ok({
          profissional_id: {
            "9": { local_id: { "12": { "2099-01-02": ["08:00:00"] } } },
            "7": { local_id: { "3": { "2099-01-02": ["10:00:00"] } } },
          },
        });
      }
      if (c.path === "professional/list") return PROFISSIONAIS;
      if (c.path === "company/list-local") {
        return ok([
          { id: 3, local: "Sala 01", unidade_id: 0 },
          { id: 12, local: "Consultório 2", unidade_id: 2 },
        ]);
      }
      if (c.path === "company/list-unity") {
        return ok({
          matriz: [{ unidade_id: 0, nome_fantasia: "Padre Anchieta - Campinas" }],
          unidades: [{ unidade_id: 2, nome_fantasia: "Matão - Sumaré" }],
        });
      }
      return undefined;
    });
    const r = (await executar(crmFeegowNextAvailable, {
      especialidade_id: 95,
      quantidade: 2,
      a_partir_de: "2099-01-01",
    })) as { mais_proximos: Array<{ profissional: string; hora: string; unidade: string | null }> };

    expect(r.mais_proximos.map((h) => [h.profissional, h.hora, h.unidade])).toEqual([
      ["Dr. Beto", "08:00", "Matão - Sumaré"],
      ["Dra. Ana", "10:00", "Padre Anchieta - Campinas"],
    ]);
  });

  it("com unidades configuradas (1,2), consulta cada uma, junta, e nunca olha as outras", async () => {
    process.env.FEEGOW_UNIDADE_ID = "1, 2";
    const pedidas: Array<string | null> = [];
    simularFeegow((c) => {
      if (c.path === "appoints/available-schedule") {
        const u = c.query.get("unidade_id");
        pedidas.push(u);
        const porUnidade: Record<string, unknown> = {
          "1": { profissional_id: { "7": { local_id: { "3": { "2099-01-02": ["10:00:00"] } } } } },
          "2": { profissional_id: { "9": { local_id: { "12": { "2099-01-02": ["08:00:00"] } } } } },
        };
        return ok(porUnidade[u ?? ""] ?? { profissional_id: {} });
      }
      if (c.path === "professional/list") return PROFISSIONAIS;
      return undefined;
    });
    const r = (await executar(crmFeegowNextAvailable, {
      especialidade_id: 95,
      quantidade: 2,
      a_partir_de: "2099-01-01",
    })) as { mais_proximos: Array<{ profissional: string; hora: string }> };
    expect([...new Set(pedidas)].sort()).toEqual(["1", "2"]);
    expect(r.mais_proximos.map((h) => [h.profissional, h.hora])).toEqual([
      ["Dr. Beto", "08:00"],
      ["Dra. Ana", "10:00"],
    ]);
    delete process.env.FEEGOW_UNIDADE_ID;
  });

  it("unidade escolhida FORA das configuradas não devolve horário (não abre exceção)", async () => {
    process.env.FEEGOW_UNIDADE_ID = "1,2";
    simularFeegow((c) => {
      if (c.path === "appoints/available-schedule") throw new Error("não devia consultar a agenda");
      if (c.path === "professional/list") return PROFISSIONAIS;
      return undefined;
    });
    const r = (await executar(crmFeegowNextAvailable, {
      especialidade_id: 95,
      unidade_id: 3,
      quantidade: 1,
      a_partir_de: "2099-01-01",
    })) as { encontrou: boolean };
    expect(r.encontrou).toBe(false);
    delete process.env.FEEGOW_UNIDADE_ID;
  });

  it("com a unidade escolhida pelo paciente, a busca filtra só ela", async () => {
    simularFeegow((c) => {
      if (c.path === "appoints/available-schedule") {
        expect(c.query.get("unidade_id")).toBe("2");
        return ok({ profissional_id: { "9": { local_id: { "12": { "2099-01-02": ["08:00:00"] } } } } });
      }
      if (c.path === "professional/list") return PROFISSIONAIS;
      return undefined;
    });
    const r = (await executar(crmFeegowNextAvailable, {
      especialidade_id: 95,
      unidade_id: 2,
      quantidade: 1,
      a_partir_de: "2099-01-01",
    })) as { encontrou: boolean };
    expect(r.encontrou).toBe(true);
  });

  it("sem a lista de locais, o horário sai do mesmo jeito (unidade nula)", async () => {
    simularFeegow((c) => {
      if (c.path === "appoints/available-schedule") {
        return ok({ profissional_id: { "7": { local_id: { "3": { "2099-01-02": ["10:00:00"] } } } } });
      }
      if (c.path === "professional/list") return PROFISSIONAIS;
      if (c.path.startsWith("company/")) return { status: 500, body: { success: false } };
      return undefined;
    });
    const r = (await executar(crmFeegowNextAvailable, {
      especialidade_id: 95,
      quantidade: 1,
      a_partir_de: "2099-01-01",
    })) as { encontrou: boolean; mais_proximos: Array<{ hora: string; unidade: string | null }> };
    expect(r.encontrou).toBe(true);
    expect(r.mais_proximos[0]).toMatchObject({ hora: "10:00", unidade: null });
  });

  it("agenda fora do ar volta como resposta ao modelo, não exceção", async () => {
    simularFeegow(() => ({ status: 503, body: {} }));
    const r = (await executar(crmFeegowNextAvailable, { especialidade_id: 95, quantidade: 3 })) as {
      ok: boolean;
      motivo: string;
      mensagem: string;
    };
    expect(r).toMatchObject({ ok: false, motivo: "feegow_indisponivel" });
    // "Não consegui agendar" tem destino: o setor que cuida de agenda, e depois uma pessoa.
    expect(r.mensagem).toContain("crm_list_sectors");
    expect(r.mensagem).toContain("crm_set_conversation_sector");
    expect(r.mensagem).toContain("crm_request_human_handoff");
  });

  it("conflito de negócio NÃO manda passar para pessoa — o modelo resolve com o paciente", async () => {
    simularFeegow(() => ({ status: 409, body: { success: false, content: "Paciente não encontrado" } }));
    const r = (await executar(crmFeegowNextAvailable, { especialidade_id: 95, quantidade: 3 })) as {
      mensagem: string;
    };
    expect(r.mensagem).toBe("Paciente não encontrado");
  });
});

describe("crm_feegow_book_appointment", () => {
  const pedido = {
    paciente_id: 5,
    profissional_id: 7,
    especialidade_id: 95,
    data: DIA,
    hora: "09:00",
  };

  function agendaCom(horas: string[]): Rota {
    return (c) => {
      if (c.path === "appoints/available-schedule") {
        return ok({ profissional_id: { "7": { local_id: { "3": { [DIA]: horas } } } } });
      }
      if (c.path === "professional/list") return PROFISSIONAIS;
      if (c.path === "specialties/list") return ok([{ especialidade_id: 95, nome: "Dermatologia", consulta_id: 740 }]);
      if (c.path === "procedures/list") return ok([{ procedimento_id: 740, valor: 25000 }]);
      if (c.path === "appoints/new-appoint") return ok({ agendamento_id: 43, link: null });
      return undefined;
    };
  }

  it("marca no formato do Feegow, com a consulta padrão e o valor da tabela", async () => {
    simularFeegow(agendaCom(["09:00:00", "09:30:00"]));
    const r = await executar(crmFeegowBookAppointment, pedido);

    expect(r).toMatchObject({ ok: true, agendamento_id: 43 });
    const post = chamadas.find((c) => c.path === "appoints/new-appoint");
    expect(post?.metodo).toBe("POST");
    expect(post?.body).toMatchObject({
      paciente_id: 5,
      profissional_id: 7,
      procedimento_id: 740,
      local_id: 3,
      data: DIA_BR,
      horario: "09:00:00",
      plano: 0,
      valor: 25000,
    });
  });

  it("com convênio, valor vai 0 e plano 1 (regra da API)", async () => {
    simularFeegow(agendaCom(["09:00:00"]));
    await executar(crmFeegowBookAppointment, { ...pedido, convenio_id: 13, convenio_plano_id: 3 });
    const post = chamadas.find((c) => c.path === "appoints/new-appoint");
    expect(post?.body).toMatchObject({ valor: 0, plano: 1, convenio_id: 13, convenio_plano_id: 3 });
    // A tabela de VALOR não é consultada com convênio (a busca de valor manda o
    // paciente_id). A única ida a procedures/list é a conferência do NOME do
    // procedimento, que vale para todo agendamento.
    expect(
      chamadas.some((c) => c.path === "procedures/list" && c.query.get("paciente_id") !== null),
    ).toBe(false);
  });

  it("consulta padrão mal cadastrada ('TESTE IMPLANTAÇÃO'): recusa e NÃO marca", async () => {
    simularFeegow((c) => {
      if (c.path === "procedures/list") {
        return ok([{ procedimento_id: 740, nome: "TESTE IMPLANTAÇÃO", valor: 5000 }]);
      }
      return agendaCom(["09:00:00"])(c);
    });
    const r = (await executar(crmFeegowBookAppointment, pedido)) as { ok: boolean; motivo: string };
    expect(r).toMatchObject({ ok: false, motivo: "procedimento_invalido" });
    expect(chamadas.some((c) => c.path === "appoints/new-appoint")).toBe(false);
  });

  it("consulta padrão 'TESTE' mas a consulta de verdade existe: MARCA com ela (o caso de 18/11)", async () => {
    simularFeegow((c) => {
      if (c.path === "procedures/list") {
        const id = c.query.get("procedimento_id");
        if (id === "740") return ok([{ procedimento_id: 740, nome: "TESTE IMPLANTAÇÃO", valor: 0 }]);
        if (id === "13") return ok([{ procedimento_id: 13, nome: "CONSULTA - DERMATOLOGISTA", valor: 19000 }]);
        return ok([
          { procedimento_id: 740, nome: "TESTE IMPLANTAÇÃO", valor: 0 },
          { procedimento_id: 13, nome: "CONSULTA - DERMATOLOGISTA", valor: 19000 },
        ]);
      }
      return agendaCom(["09:00:00"])(c);
    });
    const r = await executar(crmFeegowBookAppointment, pedido);
    expect(r).toMatchObject({ ok: true, agendamento_id: 43 });
    const post = chamadas.find((c) => c.path === "appoints/new-appoint");
    expect(post?.body).toMatchObject({ procedimento_id: 13, valor: 19000 });
  });

  it("horário que deixou de estar livre: recusa com alternativas e NÃO marca", async () => {
    simularFeegow(agendaCom(["10:00:00", "11:00:00"]));
    const r = (await executar(crmFeegowBookAppointment, pedido)) as {
      ok: boolean;
      motivo: string;
      alternativas_no_mesmo_dia: Array<{ hora: string }>;
    };
    expect(r.ok).toBe(false);
    expect(r.motivo).toBe("horario_indisponivel");
    expect(r.alternativas_no_mesmo_dia.map((h) => h.hora)).toEqual(["10:00", "11:00"]);
    expect(chamadas.some((c) => c.path === "appoints/new-appoint")).toBe(false);
  });

  it("ids inventados (modelo esqueceu os da busca): recusa 'ids_invalidos', manda buscar de novo e NÃO marca", async () => {
    simularFeegow(agendaCom(["09:00:00"]));
    // Visto em 18/11: profissional 2594 / especialidade 11 no lugar de 150 / 227.
    const semProfissional = (await executar(crmFeegowBookAppointment, { ...pedido, profissional_id: 2594 })) as {
      ok: boolean;
      motivo: string;
      mensagem: string;
    };
    expect(semProfissional).toMatchObject({ ok: false, motivo: "ids_invalidos" });
    expect(semProfissional.mensagem).toContain("crm_feegow_next_available");
    expect(semProfissional.mensagem).toContain("Não transfira");

    const semEspecialidade = await executar(crmFeegowBookAppointment, { ...pedido, especialidade_id: 11 });
    expect(semEspecialidade).toMatchObject({ ok: false, motivo: "ids_invalidos" });
    expect(chamadas.some((c) => c.path === "appoints/new-appoint")).toBe(false);
  });

  it("convenio_id 0 é particular: usa o valor da tabela e não manda convênio ao Feegow", async () => {
    simularFeegow(agendaCom(["09:00:00"]));
    const r = await executar(crmFeegowBookAppointment, { ...pedido, convenio_id: 0 });
    expect(r).toMatchObject({ ok: true, agendamento_id: 43 });
    const post = chamadas.find((c) => c.path === "appoints/new-appoint");
    expect(post?.body).toMatchObject({ valor: 25000, plano: 0 });
    expect((post?.body as { convenio_id?: number }).convenio_id ?? 0).toBe(0);
  });

  it("data no passado é recusada sem chamar o Feegow", async () => {
    simularFeegow(agendaCom(["09:00:00"]));
    const r = await executar(crmFeegowBookAppointment, { ...pedido, data: "2000-01-01" });
    expect(r).toMatchObject({ ok: false, motivo: "data_no_passado" });
    expect(chamadas).toHaveLength(0);
  });
});

describe("ponte do turno — ids do Feegow são `externo`", () => {
  it("passa sem consultar o CRM (não há linha do CRM a conferir); o dono é conferido no handler", async () => {
    const semBanco = { from: () => { throw new Error("id externo não consulta o CRM"); } };
    for (const [tool, args] of [
      ["crm_feegow_cancel_appointment", { agendamento_id: 41, paciente_id: 5 }],
      ["crm_feegow_book_appointment", { paciente_id: 5, profissional_id: 7, especialidade_id: 95 }],
      ["crm_feegow_create_patient", { nome_completo: "Ana", cpf: "12345678901" }],
    ] as const) {
      expect(await escritaCabeNoTurno(semBanco as never, "org", "contato", tool, args)).toEqual({ permitido: true });
    }
  });
});

describe("crm_feegow_cancel_appointment", () => {
  function agendamentoDe(paciente_id: number): Rota {
    return (c) => {
      if (c.path === "appoints/search") {
        return ok([{ agendamento_id: 41, paciente_id, profissional_id: 7, especialidade_id: 95, data: DIA_BR, horario: "09:00:00" }]);
      }
      if (c.path === "appoints/motives") return ok([{ id: 2, motivo: "Solicitado pelo profissional" }, { id: 1, motivo: "Solicitado pelo paciente" }]);
      if (c.path === "appoints/cancel-appoint") return ok("Agendamento cancelado");
      return undefined;
    };
  }

  it("agendamento de OUTRO paciente: recusa e nenhum cancelamento sai", async () => {
    simularFeegow(agendamentoDe(999));
    const r = await executar(crmFeegowCancelAppointment, { agendamento_id: 41, paciente_id: 5 });
    expect(r).toMatchObject({ ok: false, motivo: "agendamento_de_outro_paciente" });
    expect(chamadas.some((c) => c.path === "appoints/cancel-appoint")).toBe(false);
  });

  it("do próprio paciente: cancela com o motivo 'solicitado pelo paciente'", async () => {
    simularFeegow(agendamentoDe(5));
    const r = await executar(crmFeegowCancelAppointment, { agendamento_id: 41, paciente_id: 5 });
    expect(r).toMatchObject({ ok: true, cancelado: true });
    const post = chamadas.find((c) => c.path === "appoints/cancel-appoint");
    expect(post?.body).toMatchObject({ agendamento_id: 41, motivo_id: 1 });
  });
});
