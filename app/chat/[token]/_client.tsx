"use client";

/**
 * O chat do paciente. Feito para celular: é dali que ele abre o link do
 * WhatsApp.
 *
 * Pergunta à API a cada 3 s (só o que é novo, por `?depois=`). Polling e não
 * Realtime de propósito: o paciente não tem sessão no banco, e abrir o Realtime
 * para um anônimo exigiria uma política de leitura pública na tabela de
 * mensagens — exatamente o que a rota por token existe para evitar.
 */
import { useCallback, useEffect, useRef, useState } from "react";

import { useT } from "@/hooks/i18n/useT";

interface Mensagem {
  id: string;
  de: "paciente" | "clinica";
  tipo: string;
  texto: string | null;
  midia: { url: string; mime: string | null } | null;
  em: string;
  /** Só no navegador: enviada, esperando a confirmação do servidor. */
  pendente?: boolean;
  falhou?: boolean;
}

type Estado =
  | { tipo: "carregando" }
  | { tipo: "aberto"; nomeDaClinica: string }
  | { tipo: "expirado"; mensagem: string }
  | { tipo: "inexistente" };

const INTERVALO_MS = 3000;
const MAX = 2000;
/**
 * "Digitando…" (pedido de 18/11): o paciente abre o link logo depois do "Olá" e a
 * primeira resposta leva alguns segundos (espera de rajada + o agente pensar).
 * Página vazia nesse meio parecia que ninguém ia responder. Enquanto a última
 * mensagem é DELE (ou a página acabou de abrir vazia) e faz menos que isto, a
 * página mostra que a resposta está a caminho.
 */
const ESPERA_DA_RESPOSTA_MS = 120_000;

function hora(iso: string): string {
  return new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function juntar(atuais: Mensagem[], novas: Mensagem[]): Mensagem[] {
  const porId = new Map(atuais.map((m) => [m.id, m]));
  for (const n of novas) porId.set(n.id, n);
  return [...porId.values()].sort((a, b) => a.em.localeCompare(b.em));
}

export function ChatDoPaciente({ token }: { token: string }) {
  const t = useT();
  const [estado, setEstado] = useState<Estado>({ tipo: "carregando" });
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const ultimaRef = useRef<string | null>(null);
  const fimRef = useRef<HTMLDivElement | null>(null);
  const [abertoEm] = useState(() => Date.now());
  const [agora, setAgora] = useState(() => Date.now());

  const buscar = useCallback(async () => {
    const qs = ultimaRef.current ? `?depois=${encodeURIComponent(ultimaRef.current)}` : "";
    try {
      const res = await fetch(`/api/v1/webchat/p/${token}${qs}`, { cache: "no-store" });
      if (res.status === 404) return setEstado({ tipo: "inexistente" });
      if (res.status === 410) {
        const corpo = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
        return setEstado({
          tipo: "expirado",
          mensagem: corpo?.error?.message ?? t("Este link expirou. Mande uma mensagem pelo WhatsApp para receber um novo."),
        });
      }
      if (!res.ok) return; // falha passageira: tenta de novo no próximo ciclo
      const { data } = (await res.json()) as { data: { nomeDaClinica: string; mensagens: Mensagem[] } };
      setEstado({ tipo: "aberto", nomeDaClinica: data.nomeDaClinica });
      if (data.mensagens.length > 0) {
        ultimaRef.current = data.mensagens[data.mensagens.length - 1]!.em;
        setMensagens((atuais) => juntar(atuais.filter((m) => !m.pendente || m.falhou), data.mensagens));
      }
    } catch {
      // sem rede: o próximo ciclo tenta de novo
    }
  }, [token, t]);

  useEffect(() => {
    // A primeira busca vai por um timer de 0 ms, como as seguintes: o setState
    // acontece no retorno da rede, nunca no corpo do efeito.
    const primeira = setTimeout(() => void buscar(), 0);
    const t = setInterval(() => {
      setAgora(Date.now());
      // Aba escondida não conta como "na página": o aviso pelo WhatsApp deve sair.
      if (document.visibilityState === "visible") void buscar();
    }, INTERVALO_MS);
    const aoVoltar = () => document.visibilityState === "visible" && void buscar();
    document.addEventListener("visibilitychange", aoVoltar);
    return () => {
      clearTimeout(primeira);
      clearInterval(t);
      document.removeEventListener("visibilitychange", aoVoltar);
    };
  }, [buscar]);

  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [mensagens.length]);

  async function enviar(conteudo: string, idExistente?: string) {
    const limpo = conteudo.trim();
    if (!limpo || enviando) return;
    const id = idExistente ?? crypto.randomUUID();
    const provisoria: Mensagem = {
      id,
      de: "paciente",
      tipo: "text",
      texto: limpo,
      midia: null,
      em: new Date().toISOString(),
      pendente: true,
    };
    setMensagens((atuais) => juntar(atuais.filter((m) => m.id !== id), [provisoria]));
    if (!idExistente) setTexto("");
    setEnviando(true);
    try {
      const res = await fetch(`/api/v1/webchat/p/${token}/mensagens`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: limpo, id }),
      });
      if (res.status === 410) {
        const corpo = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
        setEstado({ tipo: "expirado", mensagem: corpo?.error?.message ?? t("Este link expirou") });
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      const { data } = (await res.json()) as { data: Mensagem };
      // Troca a provisória pela do servidor (o id do servidor é outro).
      setMensagens((atuais) => juntar(atuais.filter((m) => m.id !== id), [data]));
    } catch {
      setMensagens((atuais) => atuais.map((m) => (m.id === id ? { ...m, pendente: false, falhou: true } : m)));
    } finally {
      setEnviando(false);
    }
  }

  if (estado.tipo === "carregando") {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-background p-6 text-muted-foreground">
        {t("Carregando a conversa…")}
      </main>
    );
  }

  if (estado.tipo === "inexistente" || estado.tipo === "expirado") {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-background p-6">
        <div className="max-w-sm text-center">
          <h1 className="mb-2 text-lg font-semibold text-foreground">
            {estado.tipo === "expirado" ? t("Este link expirou") : t("Link não encontrado")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {estado.tipo === "expirado"
              ? estado.mensagem
              : t("Confira se o link está completo, ou mande uma mensagem pelo WhatsApp para receber um novo.")}
          </p>
        </div>
      </main>
    );
  }

  const ultima = mensagens[mensagens.length - 1];
  const esperandoResposta = ultima
    ? ultima.de === "paciente" && !ultima.falhou && agora - new Date(ultima.em).getTime() < ESPERA_DA_RESPOSTA_MS
    : agora - abertoEm < ESPERA_DA_RESPOSTA_MS;
  const digitando = (
    <div className="flex justify-start" role="status" aria-label={t("Digitando…")} data-testid="webchat-digitando">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-muted px-3 py-3 shadow-sm">
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
      </div>
    </div>
  );

  return (
    <main className="flex h-dvh flex-col bg-background text-foreground">
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {estado.nomeDaClinica.slice(0, 1).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold">{estado.nomeDaClinica}</p>
          <p className="text-xs text-muted-foreground">{t("Conversa segura · o link vale por 24 horas")}</p>
        </div>
      </header>

      <section className="flex-1 overflow-y-auto px-3 py-4" aria-live="polite">
        {mensagens.length === 0 ? (
          esperandoResposta ? (
            <div className="flex flex-col gap-3">
              <p className="mt-4 text-center text-sm text-muted-foreground">
                {t("Já recebemos sua mensagem. A resposta chega aqui em instantes.")}
              </p>
              {digitando}
            </div>
          ) : (
            <p className="mt-8 text-center text-sm text-muted-foreground">
              {t("Escreva sua mensagem abaixo. A gente responde por aqui.")}
            </p>
          )
        ) : (
          <ul className="flex flex-col gap-2">
            {mensagens.map((m) => (
              <li key={m.id} className={m.de === "paciente" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    "max-w-[85%] rounded-2xl px-3 py-2 text-[15px] leading-snug shadow-sm " +
                    (m.de === "paciente"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm bg-muted text-foreground")
                  }
                >
                  {m.midia && m.midia.mime?.startsWith("image/") ? (
                    // eslint-disable-next-line @next/next/no-img-element -- URL assinada e temporária do storage
                    <img src={m.midia.url} alt={t("Imagem enviada")} className="mb-1 max-h-72 rounded-lg" />
                  ) : m.midia ? (
                    <a href={m.midia.url} target="_blank" rel="noreferrer" className="mb-1 block underline">
                      {t("Abrir arquivo")}
                    </a>
                  ) : null}
                  {m.texto ? <p className="whitespace-pre-wrap break-words">{m.texto}</p> : null}
                  <p className="mt-1 text-right text-[11px] opacity-70">
                    {m.falhou ? t("Não enviada") : m.pendente ? t("Enviando…") : hora(m.em)}
                  </p>
                  {m.falhou ? (
                    <button
                      type="button"
                      onClick={() => void enviar(m.texto ?? "", m.id)}
                      className="mt-1 text-xs font-semibold underline"
                    >
                      {t("Tentar de novo")}
                    </button>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
        {mensagens.length > 0 && esperandoResposta ? <div className="mt-2">{digitando}</div> : null}
        <div ref={fimRef} />
      </section>

      <form
        className="flex items-end gap-2 border-t border-border p-3"
        onSubmit={(e) => {
          e.preventDefault();
          void enviar(texto);
        }}
      >
        <label htmlFor="mensagem" className="sr-only">
          {t("Mensagem")}
        </label>
        <textarea
          id="mensagem"
          value={texto}
          onChange={(e) => setTexto(e.target.value.slice(0, MAX))}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void enviar(texto);
            }
          }}
          rows={1}
          placeholder={t("Escreva sua mensagem")}
          className="max-h-32 min-h-11 flex-1 resize-none rounded-2xl border border-border bg-background px-4 py-2.5 text-base outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={!texto.trim() || enviando}
          className="h-11 rounded-full bg-primary px-5 font-semibold text-primary-foreground disabled:opacity-50"
        >
          {t("Enviar")}
        </button>
      </form>
    </main>
  );
}
