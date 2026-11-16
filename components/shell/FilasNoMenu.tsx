"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/auth/AuthProvider";
import { useConversationCounts } from "@/hooks/inbox/useConversationCounts";
import { useT } from "@/hooks/i18n/useT";
import { useSectors, type Sector } from "@/hooks/team/useSectors";
import { CaretDown } from "@/lib/ui/icons";
import { cn } from "@/lib/utils";

/** Campo Filas recolhido — preferência por navegador, como os grupos do menu. */
const CHAVE_FILAS_RECOLHIDAS = "sidebar-filas-recolhidas";

/**
 * A fila que fica SEMPRE em primeiro: a porta de entrada dos leads de anúncio
 * (Meta Ads, Google Ads, grupos de WhatsApp… → automação "Definir o setor da
 * conversa" → fila). Casada pelo NOME, sem acento nem caixa, para a clínica
 * criá-la em Equipe › Setores sem configurar mais nada. "Lead Campanhas" ficou
 * como sinônimo: foi o primeiro nome combinado.
 */
export const FILAS_FIXAS_NO_TOPO = ["leads anuncios", "lead anuncios", "lead campanhas", "leads campanhas"];

function normalizar(nome: string): string {
  return nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * A ordem do menu: "Leads Anúncios" primeiro (se existir), o resto na ordem que
 * a rota devolveu. Ordenação estável — só a fila fixa muda de lugar.
 */
export function ordenarFilas<T extends Pick<Sector, "name">>(filas: readonly T[]): T[] {
  const ehFixa = (f: T) => FILAS_FIXAS_NO_TOPO.includes(normalizar(f.name));
  return [...filas.filter(ehFixa), ...filas.filter((f) => !ehFixa(f))];
}

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

  /**
   * Recolher/abrir, igual aos grupos do menu: começa ABERTO em toda renderização
   * (servidor, hidratação, testes) e só lê a preferência depois de montar — o
   * mesmo desenho de `gruposFechados` em `Sidebar.tsx`, que evita o HTML do
   * servidor divergir do primeiro render do cliente.
   */
  const [recolhida, setRecolhida] = useState(false);
  useEffect(() => {
    try {
      if (window.localStorage.getItem(CHAVE_FILAS_RECOLHIDAS) === "1") setRecolhida(true);
    } catch {
      // Armazenamento bloqueado: fica aberto, que é o padrão.
    }
  }, []);
  const alternar = () =>
    setRecolhida((atual) => {
      try {
        window.localStorage.setItem(CHAVE_FILAS_RECOLHIDAS, atual ? "0" : "1");
      } catch {
        // Vale nesta sessão; só não sobrevive a um F5.
      }
      return !atual;
    });

  const filas = ordenarFilas(setores?.data ?? []);
  if (filas.length === 0) return null;

  const naInbox = pathname === "/app/inbox" || pathname.startsWith("/app/inbox/");
  const filaAtual = naInbox ? searchParams.get("fila") : null;
  // Recolhido, o total esperando continua à vista no cabeçalho: esconder a lista
  // não pode esconder que há gente esperando.
  const totalEsperando = filas.reduce((s, f) => s + (contagens?.por_fila?.[f.id] ?? 0), 0);

  return (
    <li data-testid="filas-no-menu">
      <h3>
        <button
          type="button"
          onClick={alternar}
          aria-expanded={!recolhida}
          aria-controls="filas-no-menu-lista"
          data-testid="filas-no-menu-cabecalho"
          className="flex w-full items-center justify-between gap-2 rounded-md px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
        >
          <span>{t("Filas")}</span>
          <span className="ml-auto flex items-center gap-1.5">
            {recolhida && totalEsperando > 0 && (
              <span
                data-testid="filas-no-menu-total"
                className="rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white tabular-nums"
              >
                {totalEsperando}
              </span>
            )}
            <CaretDown
              size={12}
              weight="bold"
              aria-hidden
              className={cn("shrink-0 text-text-subtle transition-transform", recolhida && "-rotate-90")}
            />
          </span>
        </button>
      </h3>
      {/* Área própria com ROLAGEM: cabem 8 filas à vista (8 × 28px + 7 × 2px de
          espaço = 238px); da 9ª em diante a lista rola dentro do campo em vez de
          empurrar o resto do menu. */}
      <ul
        id="filas-no-menu-lista"
        aria-label={t("Filas")}
        data-testid="filas-no-menu-lista"
        hidden={recolhida}
        className="max-h-[15rem] space-y-0.5 overflow-y-auto overscroll-contain pr-0.5"
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
