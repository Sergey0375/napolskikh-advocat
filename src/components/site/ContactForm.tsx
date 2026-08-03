import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { site } from "@/data/site";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Укажите имя" })
    .max(80, { message: "Не более 80 символов" }),
  contact: z
    .string()
    .trim()
    .min(5, { message: "Укажите телефон, e-mail или Telegram" })
    .max(120, { message: "Не более 120 символов" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Опишите ситуацию хотя бы в двух предложениях" })
    .max(1000, { message: "Не более 1000 символов" }),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const LIMITS = { name: 80, contact: 120, message: 1000 } as const;

function afterHours() {
  const msk = new Date(Date.now() + (new Date().getTimezoneOffset() + 180) * 60000);
  const day = msk.getDay();
  const hour = msk.getHours();
  return day === 0 || day === 6 || hour < 10 || hour >= 19;
}

export function ContactForm() {
  const [values, setValues] = useState({ name: "", contact: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [honey, setHoney] = useState("");
  const [busy, setBusy] = useState(false);

  function set(key: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [key]: value.slice(0, LIMITS[key]) }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;

    if (honey) {
      toast.error("Не удалось отправить заявку. Попробуйте написать в Telegram.");
      return;
    }

    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        next[issue.path[0] as keyof Errors] = issue.message;
      }
      setErrors(next);
      return;
    }

    setBusy(true);
    try {
      const text = `Заявка с сайта%0AИмя: ${encodeURIComponent(parsed.data.name)}%0AКонтакт: ${encodeURIComponent(parsed.data.contact)}%0AСитуация: ${encodeURIComponent(parsed.data.message)}`;
      window.localStorage.setItem(
        "advokat_last_request",
        JSON.stringify({ ...parsed.data, at: new Date().toISOString() }),
      );
      window.open(`${site.telegram}?text=${text}`, "_blank", "noopener,noreferrer");
      toast.success(
        afterHours()
          ? "Заявка сохранена. Сейчас нерабочее время — отвечу в ближайший рабочий день до 19:00 МСК."
          : "Заявка сохранена. Отвечу в течение рабочего дня.",
      );
      setValues({ name: "", contact: "", message: "" });
    } catch {
      toast.error("Не получилось открыть Telegram — напишите напрямую: " + site.telegramLabel);
    } finally {
      window.setTimeout(() => setBusy(false), 800);
    }
  }

  return (
    <form onSubmit={onSubmit} className="panel space-y-5 p-6 md:p-8" noValidate>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        className="hidden"
      />

      <Field label="Как к вам обращаться" error={errors.name} htmlFor="cf-name">
        <input
          id="cf-name"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          maxLength={LIMITS.name}
          placeholder="Имя"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "cf-name-error" : undefined}
          className={inputClass(!!errors.name)}
        />
      </Field>

      <Field label="Телефон, e-mail или Telegram" error={errors.contact} htmlFor="cf-contact">
        <input
          id="cf-contact"
          value={values.contact}
          onChange={(e) => set("contact", e.target.value)}
          maxLength={LIMITS.contact}
          placeholder="+7 ... или @nickname"
          aria-invalid={!!errors.contact}
          aria-describedby={errors.contact ? "cf-contact-error" : undefined}
          className={inputClass(!!errors.contact)}
        />
      </Field>

      <Field
        label="Кратко о ситуации"
        error={errors.message}
        htmlFor="cf-message"
        hint={`${values.message.length} / ${LIMITS.message}`}
      >
        <textarea
          id="cf-message"
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          maxLength={LIMITS.message}
          rows={5}
          placeholder="Что произошло, какие документы есть, чего хотите добиться"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          className={`${inputClass(!!errors.message)} resize-y`}
        />
      </Field>

      <button
        type="submit"
        disabled={busy}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-neon px-6 py-3 text-sm font-semibold text-neon-foreground shadow-[0_14px_36px_-18px_var(--neon)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-18px_var(--neon)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:translate-y-0 disabled:opacity-60"
      >
        {busy ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
        )}
        {busy ? "Отправляю…" : "Отправить и открыть Telegram"}
      </button>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных. Данные используются
        только для ответа на обращение.
      </p>

    </form>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string | undefined;
  hint?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-muted-foreground">
        {label}
        {hint && <span className="tracking-normal normal-case">{hint}</span>}
      </span>
      {children}
      {error && <span className="mt-2 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
