import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/hooks/i18n/useT", () => ({ useT: () => (s: string) => s }));
vi.mock("@/hooks/i18n/useLocaleDeData", () => ({ useLocaleDeData: () => undefined }));

import { TransferenciaLinha } from "@/components/inbox/TransferenciaLinha";
import { mergeThreadItems } from "@/components/inbox/ChatThread";
import type { TransferenciaDoFio } from "@/lib/inbox/transferencias-da-conversa";

const base: TransferenciaDoFio = {
  id: "t1",
  em: new Date(2026, 10, 16, 15, 35).toISOString(),
  por_nome: "Tauany Linck",
  de_nome: null,
  para_nome: "Beltrana",
  para_fila_nome: null,
  motivo: null,
};

describe("TransferenciaLinha", () => {
  it("mostra quem transferiu, para quem e a hora", () => {
    render(<TransferenciaLinha transferencia={base} />);
    const linha = screen.getByTestId("transferencia-no-fio");
    expect(linha).toHaveTextContent("Conversa transferida para");
    expect(linha).toHaveTextContent("Beltrana");
    expect(linha).toHaveTextContent("Por Tauany Linck às 15:35");
  });

  it("diz de quem a conversa saiu, quando havia dono", () => {
    render(<TransferenciaLinha transferencia={{ ...base, de_nome: "Ana" }} />);
    expect(screen.getByTestId("transferencia-no-fio")).toHaveTextContent(
      "Conversa transferida de Ana para",
    );
  });

  it("destino fila mostra o nome da fila, e o motivo quando há", () => {
    render(
      <TransferenciaLinha
        transferencia={{ ...base, para_nome: null, para_fila_nome: "Agendamentos", motivo: "cliente pediu o financeiro" }}
      />,
    );
    const linha = screen.getByTestId("transferencia-no-fio");
    expect(linha).toHaveTextContent("Conversa transferida para a fila");
    expect(linha).toHaveTextContent("Agendamentos");
    expect(linha).toHaveTextContent("Motivo: cliente pediu o financeiro");
  });

  it("entra no fio por horário, entre as mensagens", () => {
    const msg = (id: string, sent_at: string) => ({ id, sent_at }) as never;
    const itens = mergeThreadItems(
      [msg("m1", new Date(2026, 10, 16, 15, 30).toISOString()), msg("m2", new Date(2026, 10, 16, 15, 40).toISOString())],
      [],
      [],
      [base],
    );
    expect(itens.map((i) => i.kind)).toEqual(["message", "transferencia", "message"]);
  });
});
