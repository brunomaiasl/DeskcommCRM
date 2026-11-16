import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const sectors = vi.hoisted(() => ({
  data: { data: [] as Array<{ id: string; name: string; color: string | null }> },
}));
const counts = vi.hoisted(() => ({ data: { por_fila: {} as Record<string, number> } }));
const nav = vi.hoisted(() => ({ pathname: "/app/inbox", fila: null as string | null }));

vi.mock("next/navigation", () => ({
  usePathname: () => nav.pathname,
  useSearchParams: () => new URLSearchParams(nav.fila ? { fila: nav.fila } : {}),
}));
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));
vi.mock("@/hooks/auth/AuthProvider", () => ({
  useAuth: () => ({ activeOrg: { orgId: "org-1" } }),
}));
vi.mock("@/hooks/i18n/useT", () => ({ useT: () => (s: string) => s }));
vi.mock("@/hooks/team/useSectors", () => ({ useSectors: () => ({ data: sectors.data }) }));
vi.mock("@/hooks/inbox/useConversationCounts", () => ({
  useConversationCounts: () => ({ data: counts.data }),
}));

import { FilasNoMenu } from "@/components/shell/FilasNoMenu";

describe("FilasNoMenu", () => {
  it("não desenha nada sem fila criada", () => {
    sectors.data = { data: [] };
    const { container } = render(<FilasNoMenu />);
    expect(container).toBeEmptyDOMElement();
  });

  it("lista cada fila numa área com rolagem, com a contagem de quem espera", () => {
    sectors.data = {
      data: [
        { id: "a", name: "Agendamentos", color: "#16a34a" },
        { id: "b", name: "Cartão Anchieta", color: null },
      ],
    };
    counts.data = { por_fila: { a: 3, b: 0 } };
    nav.fila = null;
    render(<FilasNoMenu />);

    const lista = screen.getByTestId("filas-no-menu-lista");
    expect(lista.className).toContain("overflow-y-auto");
    expect(within(lista).getByText("Agendamentos")).toBeInTheDocument();
    expect(within(lista).getByText("Cartão Anchieta")).toBeInTheDocument();
    expect(screen.getByTestId("fila-no-menu-contagem-a")).toHaveTextContent("3");
    // Zero não é desenhado: "0" ao lado de toda fila vazia é ruído.
    expect(screen.queryByTestId("fila-no-menu-contagem-b")).toBeNull();
    expect(screen.getByTestId("fila-no-menu-a")).toHaveAttribute(
      "href",
      "/app/inbox?filter=unassigned&fila=a",
    );
  });

  it("marca a fila aberta na Inbox", () => {
    sectors.data = { data: [{ id: "a", name: "Agendamentos", color: null }] };
    counts.data = { por_fila: {} };
    nav.pathname = "/app/inbox";
    nav.fila = "a";
    render(<FilasNoMenu />);
    expect(screen.getByTestId("fila-no-menu-a")).toHaveAttribute("aria-current", "page");
  });
});
