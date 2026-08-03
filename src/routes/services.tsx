import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, ArrowRight } from "lucide-react";
import { services, site, type Service, SITE_URL } from "@/data/site";
import { Section, CtaBand, TelegramButton } from "@/components/site/Section";
import { serviceIcons, fallbackServiceIcon } from "@/components/site/serviceIcons";

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
      { property: "og:url", content: `${SITE_URL}/services/` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/services` }],
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
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map((s) => {
            const Icon = serviceIcons[s.slug] ?? fallbackServiceIcon;
            return (
              <article
                key={s.slug}
                id={s.slug}
                className="panel group relative scroll-mt-24 overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neon/60 hover:shadow-[0_24px_60px_-28px_var(--neon)] md:p-8"
              >
                <span className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-neon/10 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative inline-flex size-12 items-center justify-center rounded-lg border border-neon/25 bg-neon/10 text-neon transition-colors duration-300 group-hover:bg-neon group-hover:text-neon-foreground">
                  <Icon className="size-5" />
                </span>
                <h2 className="relative mt-5 text-xl leading-snug">{s.title}</h2>
                <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.short}
                </p>
                <button
                  type="button"
                  onClick={() => setActive(s)}
                  className="relative mt-6 inline-flex items-center gap-2 rounded-md border border-neon/50 px-4 py-2 text-sm font-medium text-neon transition-colors hover:bg-neon hover:text-neon-foreground"
                >
                  Состав работ
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </article>
            );
          })}
        </div>
      </Section>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-background/85 p-4 backdrop-blur sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
        >
          <div
            className="panel max-h-[85vh] w-full max-w-xl overflow-y-auto p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl">{active.title}</h2>
              <button
                type="button"
                aria-label="Закрыть"
                onClick={() => setActive(null)}
                className="rounded-md border border-border p-2 text-muted-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{active.details}</p>
            <ul className="mt-6 space-y-3">
              {active.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-neon" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <TelegramButton className="mt-8 w-full" />
          </div>
        </div>
      )}

      <CtaBand />
    </>
  );
}
