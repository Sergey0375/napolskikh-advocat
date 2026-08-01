import { Send } from "lucide-react";
import { site } from "@/data/site";

export function Section({
  eyebrow,
  title,
  lead,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-6xl px-5 py-16 md:py-24 ${className}`}>
      {eyebrow && (
        <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-neon">{eyebrow}</p>
      )}
      {title && <h2 className="max-w-3xl text-3xl md:text-4xl">{title}</h2>}
      {lead && <p className="mt-4 max-w-2xl text-muted-foreground">{lead}</p>}
      {children}
    </section>
  );
}

export function TelegramButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={site.telegram}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-neon px-6 py-3 text-sm font-semibold text-neon-foreground transition-transform hover:-translate-y-0.5 neon-ring ${className}`}
    >
      <Send className="size-4" />
      Написать в Telegram
    </a>
  );
}

export function CtaBand() {
  return (
    <section className="border-y border-border bg-surface/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl">Разберём вашу ситуацию за 30 минут</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Первичный разбор бесплатный. Отвечу честно о перспективах, сроках и стоимости — даже
            если дело окажется не в моей специализации.
          </p>
        </div>
        <TelegramButton className="shrink-0" />
      </div>
    </section>
  );
}
