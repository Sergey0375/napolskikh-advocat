import { Send, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("container-site", className)}>{children}</div>;
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string | undefined;
  title?: string | undefined;
  lead?: string | undefined;
  as?: "h1" | "h2";
  className?: string;
}) {
  if (!eyebrow && !title && !lead) return null;
  return (
    <header className={cn("max-w-[720px]", className)}>
      {eyebrow && (
        <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-neon">{eyebrow}</p>
      )}
      {title && <Tag className="text-balance">{title}</Tag>}
      {lead && <p className="mt-5 max-w-[660px] text-body-lg text-muted-foreground">{lead}</p>}
    </header>
  );
}

export function Section({
  eyebrow,
  title,
  lead,
  children,
  tone = "base",
  className = "",
  id,
}: {
  eyebrow?: string | undefined;
  title?: string | undefined;
  lead?: string | undefined;
  children?: React.ReactNode;
  tone?: "base" | "subtle";
  className?: string;
  id?: string;
}) {
  return (
    <section
      {...(id ? { id } : {})}
      className={cn(
        "py-16 md:py-24 lg:py-[7.5rem]",
        tone === "subtle" && "border-y border-border/60 bg-surface/35",
        className,
      )}
    >
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />
        {children}
      </Container>
    </section>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-[10px] text-[15px] font-medium transition-[color,background-color,border-color,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon";

export const buttonStyles = {
  primary: cn(
    buttonBase,
    "h-[52px] px-7 bg-neon text-neon-foreground font-semibold hover:bg-neon/90",
  ),
  secondary: cn(
    buttonBase,
    "h-[52px] px-7 border border-border text-foreground hover:border-neon/50 hover:text-neon",
  ),
  link: "inline-flex items-center gap-2 text-[15px] font-medium text-neon transition-opacity duration-200 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon",
};

export function TelegramButton({
  className = "",
  variant = "primary",
  label = "Написать в Telegram",
}: {
  className?: string;
  variant?: "primary" | "secondary";
  label?: string;
}) {
  return (
    <a
      href={site.telegram}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonStyles[variant], className)}
    >
      <Send className="size-[18px]" strokeWidth={1.6} />
      {label}
    </a>
  );
}

export function CTASection() {
  return (
    <section className="border-y border-border/60 bg-surface/40 py-16 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-[680px]">
            <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-neon">Консультация</p>
            <h2>Разберём вашу ситуацию за 30 минут</h2>
            <p className="mt-5 text-muted-foreground">
              Первичный разбор бесплатный. Отвечу честно о перспективах, сроках и стоимости — даже
              если дело окажется не в моей специализации.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <TelegramButton className="w-full sm:w-auto" />
            <a href={site.phoneHref} className={buttonStyles.link}>
              {site.phone}
              <ArrowUpRight className="size-4" strokeWidth={1.6} />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** @deprecated используйте CTASection */
export const CtaBand = CTASection;
