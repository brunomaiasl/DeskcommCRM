/**
 * Configuração do Web Chat de uma organização — `organizations.settings.webchat`.
 *
 * Desligado por padrão: nada muda para quem não liga. Os textos têm padrão em
 * português de gente (o que a clínica já usa no mercado), e os MODELOS
 * aprovados na Meta são opcionais — sem eles, fora da janela de 24h o convite e
 * o aviso simplesmente não saem (a plataforma recusaria texto livre).
 *
 * Client-safe: só zod. A tela de configuração importa daqui.
 */
import { z } from "zod";

export const MAX_TEXTO = 1024;
export const MAX_BOTAO = 25;

const modeloSchema = z
  .object({
    nome: z.string().trim().min(1).max(512),
    idioma: z.string().trim().min(2).max(16),
  })
  .nullable();

export const configDoWebChatSchema = z.object({
  ativo: z.boolean().default(false),
  /** Manda o convite sozinho na primeira mensagem de cada atendimento. */
  convite_automatico: z.boolean().default(true),
  convite_texto: z
    .string()
    .trim()
    .min(1)
    .max(MAX_TEXTO)
    .default(
      "Olá! Para continuar conversando com a gente, você pode clicar no link abaixo?\n\nAssim conseguimos fazer seu agendamento, orçamento e tirar suas dúvidas.",
    ),
  convite_botao: z.string().trim().min(1).max(MAX_BOTAO).default("Abrir conversa"),
  aviso_texto: z
    .string()
    .trim()
    .min(1)
    .max(MAX_TEXTO)
    .default("Você tem novas mensagens. Toque no link para continuar a conversa."),
  aviso_botao: z.string().trim().min(1).max(MAX_BOTAO).default("Ver mensagens"),
  /** Modelo aprovado para o convite FORA da janela de 24h (botão de URL com `{{1}}`). */
  modelo_convite: modeloSchema.default(null),
  /** Modelo do aviso fora da janela. Sem ele, usa o do convite. */
  modelo_aviso: modeloSchema.default(null),
});

export type ConfigDoWebChat = z.infer<typeof configDoWebChatSchema>;

export const CONFIG_PADRAO: ConfigDoWebChat = configDoWebChatSchema.parse({});

/**
 * Lê `settings.webchat` sem nunca lançar: configuração estragada (alguém editou
 * o JSON à mão) vira o padrão — que é DESLIGADO. Falha fechada: na dúvida, o
 * paciente continua no WhatsApp como sempre.
 */
export function lerConfigDoWebChat(settings: unknown): ConfigDoWebChat {
  const bruto =
    settings && typeof settings === "object" ? (settings as Record<string, unknown>).webchat : undefined;
  const r = configDoWebChatSchema.safeParse(bruto ?? {});
  return r.success ? r.data : CONFIG_PADRAO;
}

/** Validade do link: 24h, como o paciente já conhece. */
export const VALIDADE_DO_LINK_MS = 24 * 60 * 60 * 1000;

/** O paciente "está na página" se ela deu sinal nos últimos 60 s. */
export const PRESENCA_MS = 60 * 1000;

/** No máximo um aviso de "nova mensagem" por hora, por conversa. */
export const INTERVALO_DO_AVISO_MS = 60 * 60 * 1000;
