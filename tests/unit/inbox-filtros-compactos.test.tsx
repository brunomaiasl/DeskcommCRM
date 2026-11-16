/**
 * A barra de filtros COMPACTA (estilo Clinia): à vista ficam só a busca e um
 * ícone de filtro. Os filtros moram num painel que abre ao clicar, e o ícone diz
 * quantos estão ligados — com o painel fechado, um filtro ativo sem sinal nenhum
 * faria a lista parecer vazia sem explicação.
 *
 * O painel é escondido por CSS (classe `hidden`), não desmontado: os controles de
 * dentro guardam estado próprio. Por isso o teste olha a CLASSE do painel e o
 * `aria-expanded` do botão, que é o contrato acessível do gesto.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { InboxFilters, type InboxFiltersValue } from "@/components/inbox/InboxFilters";

vi.mock("@/hooks/auth/AuthProvider", () => ({
  useAuth: () => ({ activeOrg: { orgId: "org-1", name: "Org", role: "admin", visibility_mode: "all" } }),
}));
vi.mock("@/hooks/channels/useChannelSessions", () => ({
  useChannelSessions: () => ({ data: [] }),
  channelLabel: () => "",
}));
vi.mock("@/hooks/inbox/useConversationTags", () => ({
  useConversationTagVocabulary: () => ({ data: [] }),
}));
vi.mock("@/hooks/contacts/useContactTagVocabulary", () => ({
  useContactTagVocabulary: () => ({ data: [] }),
}));
vi.mock("@/hooks/inbox/useConversationCounts", () => ({
  useConversationCounts: () => ({ data: { unassigned: 0, mine: 0, all: 0 } }),
}));
vi.mock("@/components/inbox/SeletorDeAtendente", () => ({ SeletorDeAtendente: () => null }));

const VALUE: InboxFiltersValue = { tab: "unassigned", search: "", onlyUnread: false };

describe("barra de filtros compacta", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  afterEach(cleanup);

  it("começa recolhida: só a busca e o ícone de filtro à vista", () => {
    render(<InboxFilters value={VALUE} onChange={() => {}} />);
    const botao = screen.getByTestId("botao-filtros-da-inbox");
    expect(botao).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("painel-de-filtros-da-inbox").className).toContain("hidden");
  });

  it("o clique abre o painel e a escolha fica lembrada no navegador", () => {
    render(<InboxFilters value={VALUE} onChange={() => {}} />);
    fireEvent.click(screen.getByTestId("botao-filtros-da-inbox"));
    expect(screen.getByTestId("botao-filtros-da-inbox")).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("painel-de-filtros-da-inbox").className).not.toContain("hidden");
    expect(window.localStorage.getItem("inbox-painel-de-filtros-aberto")).toBe("1");
  });

  it("o ícone conta os filtros ligados, mesmo com o painel fechado", () => {
    render(
      <InboxFilters
        value={{ ...VALUE, onlyUnread: true, onlyGroups: true, sector_id: "f1" }}
        onChange={() => {}}
      />,
    );
    const botao = screen.getByTestId("botao-filtros-da-inbox");
    expect(botao).toHaveTextContent("3");
    expect(botao).toHaveAccessibleName("Filtros (3 ligados)");
  });

  it("sem filtro ligado, o ícone não mostra número", () => {
    render(<InboxFilters value={VALUE} onChange={() => {}} />);
    expect(screen.getByTestId("botao-filtros-da-inbox")).toHaveAccessibleName("Filtros");
    expect(screen.getByTestId("botao-filtros-da-inbox").textContent).toBe("");
  });
});
