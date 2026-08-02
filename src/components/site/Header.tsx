import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Send } from "lucide-react";
import { site } from "@/data/site";

const nameWithoutTitle = site.name.replace(/^Адвокат\s+/, "");
const [surname, ...firstNameParts] = nameWithoutTitle.split(" ");
const firstName = firstNameParts.join(" ");

const nav = [
  { to: "/", label: "Главная" },
  { to: "/services", label: "Услуги" },
  { to: "/cases", label: "Кейсы" },
  { to: "/about", label: "Об адвокате" },
  { to: "/faq", label: "Вопросы" },
  { to: "/contact", label: "Контакты" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="group flex flex-col leading-tight" onClick={() => setOpen(false)}>
          <span className="font-display text-[17px] font-semibold tracking-tight text-foreground transition-colors group-hover:text-neon">
            {surname}
          </span>
          <span className="text-[11px] tracking-wide text-muted-foreground">
            {firstName}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-md border border-neon/50 px-4 py-2 text-sm font-medium text-neon transition-colors hover:bg-neon hover:text-neon-foreground sm:inline-flex"
          >
            <Send className="size-4" />
            Написать в Telegram
          </a>
          <button
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-surface px-5 py-3 lg:hidden">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="block border-b border-border/60 py-3 text-sm text-muted-foreground last:border-0"
              activeProps={{ className: "text-neon" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-neon px-4 py-3 text-sm font-semibold text-neon-foreground"
          >
            <Send className="size-4" /> Написать в Telegram
          </a>
        </nav>
      )}
    </header>
  );
}
