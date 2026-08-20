import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, ArrowRight } from "lucide-react";
import { services, site, type Service, SITE_URL } from "@/data/site";
import { Section, CTASection, TelegramButton, buttonStyles } from "@/components/site/Section";


export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: `Услуги адвоката — ${site.name}` },
      {
        name: "description",
        content:
          "Сопровождение предпринимателей, арбитражные и корпоративные споры, интеллектуальная собственность, семейные и имущественные дела, экономические статьи УК РФ.",
      },
      { property: "og:title", content: `Услуги адвоката — ${site.name}` },
      {
        property: "og:description",
        content: "Шесть направлений практики с понятным составом работ и стоимостью по этапам.",
      },
      { property: "og:url", content: `${SITE_URL}/services` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/services` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Направления практики адвоката",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: s.title,
              description: s.short,
              serviceType: s.title,
              url: `${SITE_URL}/services`,
              areaServed: { "@type": "Country", name: "Россия" },
              provider: { "@id": `${SITE_URL}/#legalservice` },
            },
          })),
        }),
      },
    ],

  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <>
      <Section
        eyebrow="Услуги"
        title="Направления практики"
        lead="Нажмите на услугу, чтобы увидеть состав работ. Если вашей ситуации нет в списке — напишите, подскажу профильного коллегу."
      >
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              className="panel panel-hover group flex scroll-mt-28 flex-col p-7 md:p-9"
            >
              <span className="font-display text-sm text-neon">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-6 text-balance text-[1.5rem] leading-snug">{s.title}</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{s.short}</p>
              <button
                type="button"
                onClick={() => setActive(s)}
                className={`${buttonStyles.link} mt-8 self-start`}
              >
                Состав работ
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={1.6}
                />
              </button>
            </article>
          ))}
        </div>
      </Section>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-background/90 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
        >
          <div
            className="panel max-h-[85vh] w-full max-w-xl overflow-y-auto p-7 md:p-9"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-[1.6rem]">{active.title}</h2>
              <button
                type="button"
                aria-label="Закрыть"
                onClick={() => setActive(null)}
                className="shrink-0 rounded-[10px] border border-border p-2.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-4" strokeWidth={1.6} />
              </button>
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              {active.details}
            </p>
            <ul className="mt-7 space-y-3.5">
              {active.points.map((p) => (
                <li key={p} className="flex gap-3 text-[15px] leading-relaxed">
                  <Check className="mt-1 size-4 shrink-0 text-neon" strokeWidth={1.6} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <TelegramButton className="mt-9 w-full" />
          </div>
        </div>
      )}

      <CTASection />

    </>
  );
}
