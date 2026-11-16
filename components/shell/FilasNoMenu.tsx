"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { useAuth } from "@/hooks/auth/AuthProvider";
import { useConversationCounts } from "@/hooks/inbox/useConversationCounts";
import { useT } from "@/hooks/i18n/useT";
import { useSectors } from "@/hooks/team/useSectors";
import { cn } from "@/lib/utils";

/**
 * As FILAS (setores) no menu lateral, logo abaixo dos destinos do grupo
 * Atendimento — o desenho da lista de filas do Clinia: cada setor com a sua cor
 * e quantas conversas ESPERAM uma pessoa ali.
 *
 * O número é `por_fila` da rota de contagens: o mesmo predicado da aba Fila da
 * Inbox, recortado pelo setor — ou seja, aparece depois que o agente (ou alguém)
 * encaminha a conversa para a fila. É a MESMA consulta do contador ao lado de
 * "Inbox" (sem filtros, a chave do React Query é a mesma): este componente não
 * abre pedido novo ao servidor além da lista de setores, que o Inbox também usa.
 *
 * O clique abre a Inbox na aba Fila já recortada pelo setor (`?fila=<id>`),
 * lida por `InboxLayout`.
 *
 * Só é montado com o módulo Setores ligado e o menu aberto (`Sidebar.tsx`): com
 * ele desligado a rota de setores responderia 404, e no trilho recolhido de 64px
 * não há onde desenhar nome de fila. Sem fila criada, não desenha nada.
 */
export function FilasNoMenu({ onNavigate }: { onNavigate?: () => void }) {
  const t = useT();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { activeOrg } = useAuth();
  const { data: setores } = useSectors(true);
  const { data: contagens } = useConversationCounts(activeOrg?.orgId ?? null);

  const filas = setores?.data ?? [];
  if (filas.length === 0) return null;

  const naInbox = pathname === "/app/inbox" || pathname.startsWith("/app/inbox/");
  const filaAtual = naInbox ? searchParams.get("fila") : null;

  return (
    <li data-testid="filas-no-menu">
      <p className="px-3 pt-1 pb-0.5 text-[11px] font-medium uppercase tracking-wide text-text-subtle">
        {t("Filas")}
      </p>
      {/* Área própria com ROLAGEM: com muitas filas, a lista cresce dentro do campo
          (cerca de cinco linhas visíveis) em vez de empurrar o resto do menu — o
          menu inteiro tem de caber na dobra sem rolar (`navegacao.spec.ts`). */}
      <ul
        aria-label={t("Filas")}
        data-testid="filas-no-menu-lista"
        className="max-h-36 space-y-0.5 overflow-y-auto overscroll-contain pr-0.5"
      >
        {filas.map((fila) => {
          const esperando = contagens?.por_fila?.[fila.id] ?? 0;
          const ativa = filaAtual === fila.id;
          const rotulo =
            esperando === 0
              ? fila.name
              : esperando === 1
                ? `${fila.name}: ${t("1 conversa esperando")}`
                : `${fila.name}: ${esperando} ${t("conversas esperando")}`;
          return (
            <li key={fila.id}>
              <Link
                href={`/app/inbox?filter=unassigned&fila=${fila.id}`}
                onClick={onNavigate}
                aria-current={ativa ? "page" : undefined}
                aria-label={rotulo}
                title={rotulo}
                data-testid={`fila-no-menu-${fila.id}`}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-1 text-sm transition-colors",
                  ativa
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}
              >
                {/* Sem cor declarada (migration 9084) o ponto não é desenhado:
                    um cinza fixo transformaria "não escolhi cor" em "escolhi
                    cinza". O espaço fica reservado para os nomes alinharem. */}
                <span
                  aria-hidden
                  className="inline-block size-2 shrink-0 rounded-full"
                  style={fila.color != null ? { backgroundColor: fila.color } : undefined}
                />
                <span className="min-w-0 truncate">{fila.name}</span>
                {esperando > 0 && (
                  <span
                    data-testid={`fila-no-menu-contagem-${fila.id}`}
                    className="ml-auto rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white tabular-nums"
                  >
                    {esperando}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
