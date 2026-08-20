import { Link } from "@tanstack/react-router";
import { site } from "@/data/site";
import { Container } from "@/components/site/Section";

const nav = [
  { to: "/services", label: "Услуги" },
  { to: "/cases", label: "Кейсы" },
  { to: "/about", label: "Об адвокате" },
  { to: "/faq", label: "Вопросы и ответы" },
  { to: "/contact", label: "Контакты" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <Container className="grid gap-10 py-16 md:grid-cols-3">
        <div className="max-w-[320px]">
          <p className="font-display text-lg">{site.name}</p>
          <p className="mt-3 text-sm text-muted-foreground">{site.role}</p>
          <p className="text-sm text-muted-foreground">{site.reg}</p>
        </div>

        <div className="space-y-2.5 text-sm">
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-neon transition-opacity hover:opacity-75"
          >
            {site.telegramLabel}
          </a>
          <a
            href={site.phoneHref}
            className="block text-muted-foreground transition-colors hover:text-foreground"
          >
            {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="block text-muted-foreground transition-colors hover:text-foreground"
          >
            {site.email}
          </a>
          <p className="text-muted-foreground">{site.city}</p>
          <p className="text-muted-foreground">{site.hours}</p>
        </div>

        <nav className="space-y-2.5 text-sm">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="block text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </Container>

      <div className="border-t border-border/50">
        <Container className="py-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {site.name}. Информация на сайте не является публичной
            офертой и юридической консультацией.
          </p>
        </Container>
      </div>
    </footer>
  );
}
