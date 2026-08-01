import { Link } from "@tanstack/react-router";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-lg">{site.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">{site.role}</p>
          <p className="text-sm text-muted-foreground">{site.reg}</p>
        </div>

        <div className="space-y-3 text-sm">
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-neon transition-opacity hover:opacity-80"
          >
            <Send className="size-4 shrink-0" /> {site.telegramLabel}
          </a>
          <a
            href={site.phoneHref}
            className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Phone className="size-4 shrink-0" /> {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="size-4 shrink-0" /> {site.email}
          </a>
          <p className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="size-4 shrink-0" /> {site.city}
          </p>
          <p className="flex items-start gap-3 text-muted-foreground">
            <Clock className="mt-0.5 size-4 shrink-0" /> {site.hours}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <Link to="/services" className="block text-muted-foreground hover:text-foreground">
            Услуги
          </Link>
          <Link to="/cases" className="block text-muted-foreground hover:text-foreground">
            Кейсы
          </Link>
          <Link to="/about" className="block text-muted-foreground hover:text-foreground">
            Об адвокате
          </Link>
          <Link to="/faq" className="block text-muted-foreground hover:text-foreground">
            Вопросы и ответы
          </Link>
          <Link to="/contact" className="block text-muted-foreground hover:text-foreground">
            Контакты
          </Link>
        </div>
      </div>

      <div className="border-t border-border/70 px-5 py-6">
        <p className="mx-auto max-w-6xl text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name}. Информация на сайте не является публичной
          офертой и юридической консультацией.
        </p>
      </div>
    </footer>
  );
}
