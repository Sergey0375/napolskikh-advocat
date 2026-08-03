import { createFileRoute } from "@tanstack/react-router";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";
import { site, SITE_URL } from "@/data/site";
import { Section } from "@/components/site/Section";
import { ContactForm } from "@/components/site/ContactForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Контакты адвоката — ${site.name}` },
      {
        name: "description",
        content:
          "Связаться с адвокатом: Telegram, телефон, e-mail. Бесплатный разбор ситуации 30 минут, работа по всей России онлайн.",
      },
      { property: "og:title", content: `Контакты адвоката — ${site.name}` },
      { property: "og:description", content: "Telegram, телефон и форма обращения к адвокату." },
      { property: "og:url", content: `${SITE_URL}/contact` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Section
      eyebrow="Контакты"
      title="Напишите — разберём вашу ситуацию"
      lead="Самый быстрый способ связи — Telegram. Форма ниже подготовит сообщение автоматически."
    >
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="panel space-y-5 p-6 md:p-8">
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-md bg-neon px-5 py-4 text-sm font-semibold text-neon-foreground"
          >
            <Send className="size-5 shrink-0" /> {site.telegramLabel} — написать сейчас
          </a>

          <a href={site.phoneHref} className="flex items-center gap-4 text-sm">
            <Phone className="size-5 shrink-0 text-neon" /> {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-4 text-sm">
            <Mail className="size-5 shrink-0 text-neon" /> {site.email}
          </a>
          <p className="flex items-center gap-4 text-sm text-muted-foreground">
            <MapPin className="size-5 shrink-0 text-neon" /> {site.city}
          </p>
          <p className="flex items-start gap-4 text-sm text-muted-foreground">
            <Clock className="mt-0.5 size-5 shrink-0 text-neon" /> {site.hours}
          </p>

          <p className="border-t border-border pt-5 text-xs text-muted-foreground">
            {site.role}. {site.reg}. С момента заключения соглашения действует адвокатская тайна.
          </p>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
