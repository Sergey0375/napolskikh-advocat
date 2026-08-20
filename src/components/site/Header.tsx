import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Send } from "lucide-react";
import { site } from "@/data/site";
import { Container, buttonStyles } from "@/components/site/Section";
import { cn } from "@/lib/utils";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-200",
        scrolled
          ? "border-b border-border/60 bg-background/94 backdrop-blur-[12px]"
          : "border-b border-transparent bg-background",
      )}
    >
      <Container className="flex h-[76px] items-center justify-between gap-6">
        <Link
          to="/"
          className="group flex flex-col leading-tight"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-[18px] tracking-tight text-foreground transition-colors group-hover:text-neon">
            {surname}
          </span>
          <span className="text-[11px] tracking-[0.08em] text-muted-foreground">{firstName}</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="text-[15px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
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
            className={cn(buttonStyles.secondary, "hidden h-11 px-5 text-sm sm:inline-flex")}
          >
            <Send className="size-4" strokeWidth={1.6} />
            Telegram
          </a>
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать в Telegram"
            className="inline-flex size-11 items-center justify-center rounded-[10px] border border-border text-foreground transition-colors hover:border-neon/50 hover:text-neon sm:hidden"
          >
            <Send className="size-[18px]" strokeWidth={1.6} />
          </a>
          <button
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-[10px] border border-border text-foreground transition-colors hover:border-neon/50 lg:hidden"
          >
            {open ? (
              <X className="size-5" strokeWidth={1.6} />
            ) : (
              <Menu className="size-5" strokeWidth={1.6} />
            )}
          </button>
        </div>
      </Container>

      {open && (
        <nav className="border-t border-border/60 bg-background lg:hidden">
          <Container className="py-2">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="block border-b border-border/50 py-4 text-[15px] text-muted-foreground last:border-0"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
