/**
 * crm_consultar_valor — o VALOR de consultas e exames, exato, da tabela da base.
 *
 * Existe porque o preço não pode vir da busca semântica (18/11: R$ 69,00 da
 * cirurgia geral no lugar de R$ 29,90 do clínico geral, duas vezes). A leitura
 * e a busca pelo nome estão em `lib/precos/valores-da-base.ts`.
 */
import { z } from "zod";

import { buscarValor, tabelaDeValores } from "@/lib/precos/valores-da-base";

import type { McpToolDefinition } from "../types";

const valorShape = {
  itens: z
    .array(z.string().trim().min(2).max(120))
    .min(1)
    .max(20)
    .describe('Consultas (pela especialidade, ex.: "clínico geral") e/ou exames (ex.: "ultrassom de abdome total"), um por item.'),
};

export const crmConsultarValor: McpToolDefinition<typeof valorShape> = {
  name: "crm_consultar_valor",
  description:
    "Valor EXATO (particular e com Cartão Saúde) de consultas e exames, da tabela da clínica. Use SEMPRE antes de " +
    "dizer qualquer valor e diga só o que ela devolver. Vários parecidos: pergunte qual. Nada: não invente.",
  inputSchema: valorShape,
  category: "read",
  requiresRole: "agent",
  requiresScope: "mcp:read",
  handler: async (input, ctx) => {
    const tabela = await tabelaDeValores(ctx.supabase, ctx.organizationId);
    if (tabela.length === 0) {
      return { ok: false, motivo: "tabela_indisponivel", mensagem: "A tabela de valores não está disponível. Não informe valor: passe para a fila \"Orçamentos\"." };
    }
    return {
      ok: true,
      resultados: input.itens.map((item) => {
        const achados = buscarValor(item, tabela, 5);
        if (achados.length === 0) {
          return { pedido: item, encontrado: false, mensagem: "Não está na tabela. Não invente valor: a equipe de Orçamentos confere." };
        }
        return {
          pedido: item,
          encontrado: true,
          ...(achados.length > 1 ? { aviso: "mais de um item parecido: confirme com o paciente qual é" } : {}),
          valores: achados.map((v) => ({ tipo: v.tipo, nome: v.nome, particular: v.particular, com_cartao: v.cartao })),
        };
      }),
    };
  },
};
