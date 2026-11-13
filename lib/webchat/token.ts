/**
 * O token do link do Web Chat.
 *
 * É um segredo de PORTADOR: quem tem o link entra na conversa, sem senha — o
 * mesmo modelo de qualquer link de convite. Por isso: 32 bytes aleatórios
 * (256 bits, sem chute possível), base64url (cabe na URL sem escape), e no
 * banco só o HASH para achar a linha. O token em claro nunca é logado.
 */
import { createHash, randomBytes } from "node:crypto";

/** 32 bytes em base64url = 43 caracteres, sem padding. */
export const TAMANHO_DO_TOKEN = 43;
export const FORMATO_DO_TOKEN = /^[A-Za-z0-9_-]{43}$/;

export function gerarToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashDoToken(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

export function tokenValido(token: string): boolean {
  return FORMATO_DO_TOKEN.test(token);
}
