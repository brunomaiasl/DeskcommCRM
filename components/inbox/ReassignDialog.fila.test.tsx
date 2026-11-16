import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const estado = vi.hoisted(() => ({
  modulos: ["setores"] as string[],
  filas: [
    { id: "f1", name: "Agendamentos", color: "#16a34a" },
    { id: "f2", name: "Cartão Anchieta", color: null },
  ],
  mutateAsync: vi.fn(async (_: unknown) => ({})),
}));

vi.mock("@/hooks/auth/AuthProvider", () => ({
  useAuth: () => ({
    user: { id: "u1" },
    activeOrg: { orgId: "o1", modulos_ligados: estado.modulos },
  }),
}));
vi.mock("@/hooks/i18n/useT", () => ({ useT: () => (s: string) => s }));
vi.mock("@/hooks/inbox/useAssignableMembers", () => ({
  useAssignableMembers: () => ({ data: [], isLoading: false }),
}));
vi.mock("@/hooks/inbox/useTransferConversation", () => ({
  useTransferConversation: () => ({ mutate: vi.fn(), isPending: false }),
}));
vi.mock("@/hooks/inbox/useContinuarPorOutroNumero", () => ({
  useContinuarPorOutroNumero: () => ({ mutate: vi.fn(), isPending: false }),
}));
vi.mock("@/hooks/inbox/useNumeroDaTransferencia", () => ({
  useNumeroDaTransferencia: () => ({ data: null, isSuccess: false }),
}));
vi.mock("@/hooks/channels/useChannelSessions", () => ({
  useChannelSessions: () => ({ data: [] }),
  channelLabel: () => "",
}));
vi.mock("@/hooks/team/useSectors", () => ({
  useSectors: () => ({ data: { data: estado.filas } }),
}));
vi.mock("@/hooks/inbox/useTransferirParaFila", () => ({
  useTransferirParaFila: () => ({ mutateAsync: estado.mutateAsync, isPending: false }),
}));

import { ReassignDialog } from "@/components/inbox/ReassignDialog";

function abrir() {
  return render(<ReassignDialog conversationId="c1" open onOpenChange={() => {}} />);
}

describe("ReassignDialog — aba Fila", () => {
  beforeEach(() => {
    estado.modulos = ["setores"];
    estado.mutateAsync.mockClear();
  });

  it("com Setores ligado abre na Fila, mostrando as filas e não os atendentes", () => {
    abrir();
    expect(screen.getByTestId("painel-transferir-fila")).toBeInTheDocument();
    expect(screen.getByText("Agendamentos")).toBeInTheDocument();
    expect(screen.getByText("Cartão Anchieta")).toBeInTheDocument();
    expect(screen.queryByText("Escolha o atendente")).toBeNull();
  });

  it("transfere para a fila escolhida", async () => {
    abrir();
    const botao = screen.getByTestId("btn-transferir-para-fila");
    expect(botao).toBeDisabled();
    fireEvent.click(screen.getByText("Agendamentos"));
    expect(botao).not.toBeDisabled();
    fireEvent.click(botao);
    await waitFor(() =>
      expect(estado.mutateAsync).toHaveBeenCalledWith({
        conversationId: "c1",
        sectorId: "f1",
        reason: undefined,
      }),
    );
  });

  it("sem Setores o diálogo é o de sempre: só atendente, sem aba Fila", () => {
    estado.modulos = [];
    abrir();
    expect(screen.queryByTestId("aba-transferir-fila")).toBeNull();
    expect(screen.queryByTestId("painel-transferir-fila")).toBeNull();
    expect(screen.getByText("Escolha o atendente")).toBeInTheDocument();
  });
});
