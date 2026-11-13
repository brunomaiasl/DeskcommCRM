/**
 * O rótulo de origem (`EntradaDeMensagem.origem`) da mensagem que veio da página
 * do Web Chat. Arquivo próprio e sem dependências: a pós-entrada o importa, e
 * importar `pagina.ts` de lá fecharia um ciclo (a página chama a pós-entrada).
 */
export const ORIGEM_WEBCHAT = "webchat";
