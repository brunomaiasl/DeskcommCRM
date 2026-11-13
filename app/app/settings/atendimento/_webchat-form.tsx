"use client";
/**
 * Web Chat (migration 9348): o paciente continua a conversa do WhatsApp numa
 * página do CRM por um link de 24 h — as mensagens dali não são cobradas pela
 * Meta. A regra mora em `lib/webchat/`; a gravação, em `/api/v1/settings/webchat`.
 */
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useT } from "@/hooks/i18n/useT";
import { apiClient } from "@/lib/api/client";
import { MAX_BOTAO, MAX_TEXTO, type ConfigDoWebChat } from "@/lib/webchat/config";

interface Formulario extends Omit<ConfigDoWebChat, "modelo_convite" | "modelo_aviso"> {
  modelo_convite_nome: string;
  modelo_convite_idioma: string;
  modelo_aviso_nome: string;
  modelo_aviso_idioma: string;
}

function paraFormulario(c: ConfigDoWebChat): Formulario {
  const { modelo_convite, modelo_aviso, ...resto } = c;
  return {
    ...resto,
    modelo_convite_nome: modelo_convite?.nome ?? "",
    modelo_convite_idioma: modelo_convite?.idioma ?? "pt_BR",
    modelo_aviso_nome: modelo_aviso?.nome ?? "",
    modelo_aviso_idioma: modelo_aviso?.idioma ?? "pt_BR",
  };
}

function paraConfig(f: Formulario): ConfigDoWebChat {
  const { modelo_convite_nome, modelo_convite_idioma, modelo_aviso_nome, modelo_aviso_idioma, ...resto } = f;
  return {
    ...resto,
    modelo_convite: modelo_convite_nome.trim()
      ? { nome: modelo_convite_nome.trim(), idioma: modelo_convite_idioma.trim() || "pt_BR" }
      : null,
    modelo_aviso: modelo_aviso_nome.trim()
      ? { nome: modelo_aviso_nome.trim(), idioma: modelo_aviso_idioma.trim() || "pt_BR" }
      : null,
  };
}

export function WebChatForm({ initial, urlDoModelo }: { initial: ConfigDoWebChat; urlDoModelo: string | null }) {
  const t = useT();
  const [form, setForm] = useState(() => paraFormulario(initial));
  const [salvo, setSalvo] = useState(() => paraFormulario(initial));
  const [isPending, startTransition] = useTransition();
  const sujo = JSON.stringify(form) !== JSON.stringify(salvo);

  function salvar(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      try {
        await apiClient.patch("/api/v1/settings/webchat", paraConfig(form));
        setSalvo(form);
        toast.success(t("Web Chat salvo."));
      } catch (err) {
        toast.error(err instanceof Error ? t(err.message) : t("Não consegui salvar."));
      }
    });
  }

  const campo = <K extends keyof Formulario>(k: K, v: Formulario[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <form onSubmit={salvar} className="flex max-w-3xl flex-col gap-4" data-testid="form-webchat">
      <Card className="space-y-4 p-4">
        <div>
          <h2 className="text-sm font-semibold">{t("Web Chat")}</h2>
          <p className="text-xs text-muted-foreground">
            {t(
              "O paciente recebe pelo WhatsApp um link e continua a MESMA conversa numa página, por 24 horas. As mensagens na página não são cobradas pela Meta; só o convite e o aviso de nova mensagem saem pelo WhatsApp.",
            )}
          </p>
        </div>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            data-testid="webchat-ativo"
            checked={form.ativo}
            disabled={isPending}
            onChange={(e) => campo("ativo", e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-primary"
          />
          <span className="space-y-1">
            <span className="block text-sm font-medium">{t("Ligar o Web Chat")}</span>
            <span className="block text-xs text-muted-foreground">
              {t("Desligado, ninguém recebe link e as conversas seguem só pelo WhatsApp.")}
            </span>
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            data-testid="webchat-convite-automatico"
            checked={form.convite_automatico}
            disabled={isPending || !form.ativo}
            onChange={(e) => campo("convite_automatico", e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-primary"
          />
          <span className="space-y-1">
            <span className="block text-sm font-medium">{t("Mandar o convite na primeira mensagem")}</span>
            <span className="block text-xs text-muted-foreground">
              {t("A cada atendimento novo o paciente recebe o link sozinho. Desligado, o link sai só quando a equipe manda pela conversa.")}
            </span>
          </span>
        </label>

        <div className="space-y-1">
          <Label htmlFor="webchat-convite-texto">{t("Texto do convite")}</Label>
          <Textarea
            id="webchat-convite-texto"
            value={form.convite_texto}
            maxLength={MAX_TEXTO}
            rows={4}
            disabled={isPending}
            onChange={(e) => campo("convite_texto", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            {t("O link vai no fim do texto, dentro da janela de 24 horas.")} {form.convite_texto.length}/{MAX_TEXTO}
          </p>
        </div>

        <div className="max-w-sm space-y-1">
          <Label htmlFor="webchat-convite-botao">{t("Texto do botão do convite")}</Label>
          <Input
            id="webchat-convite-botao"
            value={form.convite_botao}
            maxLength={MAX_BOTAO}
            disabled={isPending}
            onChange={(e) => campo("convite_botao", e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="webchat-aviso-texto">{t("Texto do aviso de nova mensagem")}</Label>
          <Textarea
            id="webchat-aviso-texto"
            value={form.aviso_texto}
            maxLength={MAX_TEXTO}
            rows={3}
            disabled={isPending}
            onChange={(e) => campo("aviso_texto", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            {t("Vai pelo WhatsApp quando chega mensagem nova e o paciente não está na página. No máximo um por hora.")}
          </p>
        </div>
      </Card>

      <Card className="space-y-4 p-4">
        <div>
          <h2 className="text-sm font-semibold">{t("Modelos aprovados para fora da janela de 24 horas")}</h2>
          <p className="text-xs text-muted-foreground">
            {t(
              "Fora da janela, a Meta só aceita modelo aprovado. Crie o modelo com um botão de URL e use exatamente o endereço abaixo. Sem modelo, o convite e o aviso não saem fora da janela.",
            )}
          </p>
          {urlDoModelo ? (
            <code className="mt-2 block break-all rounded bg-muted px-2 py-1 text-xs" data-testid="webchat-url-do-modelo">
              {urlDoModelo}
            </code>
          ) : (
            <p className="mt-2 text-xs text-destructive">
              {t("A instalação não tem endereço público configurado. Sem ele o paciente não consegue abrir o link.")}
            </p>
          )}
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_8rem]">
          <div className="space-y-1">
            <Label htmlFor="webchat-modelo-convite">{t("Modelo do convite")}</Label>
            <Input
              id="webchat-modelo-convite"
              value={form.modelo_convite_nome}
              disabled={isPending}
              onChange={(e) => campo("modelo_convite_nome", e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="webchat-modelo-convite-idioma">{t("Idioma")}</Label>
            <Input
              id="webchat-modelo-convite-idioma"
              value={form.modelo_convite_idioma}
              disabled={isPending}
              onChange={(e) => campo("modelo_convite_idioma", e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="webchat-modelo-aviso">{t("Modelo do aviso")}</Label>
            <Input
              id="webchat-modelo-aviso"
              value={form.modelo_aviso_nome}
              disabled={isPending}
              onChange={(e) => campo("modelo_aviso_nome", e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="webchat-modelo-aviso-idioma">{t("Idioma")}</Label>
            <Input
              id="webchat-modelo-aviso-idioma"
              value={form.modelo_aviso_idioma}
              disabled={isPending}
              onChange={(e) => campo("modelo_aviso_idioma", e.target.value)}
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{t("Sem modelo próprio, o aviso usa o do convite.")}</p>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending || !sujo}>
          {isPending ? t("Salvando…") : t("Salvar Web Chat")}
        </Button>
        {sujo ? <span className="text-xs text-muted-foreground">{t("Há mudanças não salvas.")}</span> : null}
      </div>
    </form>
  );
}
