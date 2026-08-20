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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${SITE_URL}/contact`,
          mainEntity: {
            "@type": ["LegalService", "Attorney"],
            "@id": `${SITE_URL}/#legalservice`,
            name: site.name,
            telephone: site.phone,
            email: site.email,
            url: SITE_URL,
            sameAs: [site.telegram],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Москва",
              addressCountry: "RU",
            },
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "customer service",
                telephone: site.phone,
                email: site.email,
                availableLanguage: "Russian",
                areaServed: "RU",
              },
            ],
          },
        }),
      },
    ],

  }),
  component: ContactPage,
});

function ContactPage() {
  const items = [
    { Icon: Phone, label: "Телефон", value: site.phone, href: site.phoneHref },
    { Icon: Mail, label: "E-mail", value: site.email, href: `mailto:${site.email}` },
    { Icon: MapPin, label: "География", value: site.city },
    { Icon: Clock, label: "Часы работы", value: site.hours },
  ];

  return (
    <Section
      eyebrow="Контакты"
      title="Напишите — разберём вашу ситуацию"
      lead="Самый быстрый способ связи — Telegram. Форма ниже подготовит сообщение автоматически."
    >
      <div className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonStyles.primary} w-full sm:w-auto`}
          >
            <Send className="size-[18px]" strokeWidth={1.6} /> {site.telegramLabel}
          </a>

          <dl className="mt-10 border-t border-border/60">
            {items.map(({ Icon, label, value, href }) => (
              <div key={label} className="flex gap-4 border-b border-border/60 py-5">
                <Icon className="mt-1 size-[18px] shrink-0 text-neon" strokeWidth={1.6} />
                <div className="min-w-0">
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="mt-1.5 text-[15px] leading-relaxed">
                    {href ? (
                      <a href={href} className="transition-colors hover:text-neon">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <p className="mt-6 max-w-[420px] text-sm text-muted-foreground">
            {site.role}. {site.reg}. С момента заключения соглашения действует адвокатская тайна.
          </p>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}

