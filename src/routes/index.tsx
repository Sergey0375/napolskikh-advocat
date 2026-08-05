import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Scale, Clock3, BadgeCheck, CalendarDays } from "lucide-react";
import photo from "@/assets/advokat.jpg.asset.json";
import { site, services, stages, cases, faq, SITE_URL } from "@/data/site";
import { Section, TelegramButton, CtaBand } from "@/components/site/Section";
import { serviceIcons, fallbackServiceIcon } from "@/components/site/serviceIcons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Адвокат Напольских Татьяна — Москва, защита бизнеса и семьи" },
      {
        name: "description",
        content:
          "Адвокат в Москве: защита предпринимателей, арбитражные споры, недвижимость и земля, семейные и наследственные дела. Разбор ситуации — 30 минут.",
      },
      { property: "og:title", content: "Адвокат Напольских Татьяна — Москва" },
      {
        property: "og:description",
        content:
          "Защита бизнеса, недвижимости и семьи: арбитраж, сделки, споры с госорганами, семейные и наследственные дела.",
      },
      { property: "og:type", content: "website" },

      { property: "og:url", content: `${SITE_URL}/` },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "preload", as: "image", href: photo.url },
    ],
  }),
  component: Home,
});

function Home() {
  const currentYear = new Date().getFullYear();
  const yearsInLaw = currentYear - site.experienceSince;
  const yearsAdvocate = currentYear - site.advocateSince;

  const pluralize = (n: number, one: string, few: string, many: string) => {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return `${n} ${one}`;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${n} ${few}`;
    return `${n} ${many}`;
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute -top-40 right-0 size-[560px] rounded-full bg-neon/8 blur-[170px]" />
        <div className="pointer-events-none absolute -bottom-52 -left-24 size-[520px] rounded-full bg-primary/6 blur-[170px]" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-neon">{site.role}</p>
            <h1 className="mt-6 text-[2.15rem] leading-[1.08] tracking-[-0.02em] md:text-[3.4rem]">
              {site.name.replace("Адвокат ", "")}
              <span className="mt-4 block text-[0.62em] font-normal leading-snug tracking-normal neon-text">{site.tagline}</span>
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface/50 px-3 py-1.5 text-xs text-muted-foreground">
                <BadgeCheck className="size-3.5 text-neon" />
                Реестр № {site.registryNumber}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface/50 px-3 py-1.5 text-xs text-muted-foreground">
                <CalendarDays className="size-3.5 text-neon" />
                В юриспруденции с {site.experienceSince}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface/50 px-3 py-1.5 text-xs text-muted-foreground">
                <Scale className="size-3.5 text-neon" />
                Адвокат с {site.advocateSince}
              </span>
            </div>

            <p className="mt-6 max-w-xl text-muted-foreground">
              Веду дела предпринимателей и компаний, а также частные семейные и имущественные
              споры. Работаю по всей России: документы, переговоры и большая часть заседаний —
              дистанционно.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <TelegramButton />
              <Link
                to="/cases"
                className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-neon/60 hover:text-neon"
              >
                Смотреть кейсы <ArrowRight className="size-4" />
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8">
              {[
                { k: pluralize(yearsInLaw, "год", "года", "лет"), v: "в юриспруденции" },
                { k: pluralize(yearsAdvocate, "год", "года", "лет"), v: "статус адвоката" },
                { k: "180+", v: "завершённых дел" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="font-display text-2xl text-neon md:text-3xl">{s.k}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-2xl border border-neon/25" aria-hidden />
            <img
              src={photo.url}
              alt={`${site.name}, адвокат`}
              width={659}
              height={878}
              fetchPriority="high"
              className="relative w-full rounded-xl border border-border object-cover"
            />
          </div>
        </div>
      </section>

      <Section
        eyebrow="Специализация"
        title="С какими задачами ко мне приходят"
        lead="Шесть направлений, в которых у меня есть системная практика, а не единичные дела."
      >
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = serviceIcons[s.slug] ?? fallbackServiceIcon;
            return (
              <Link
                key={s.slug}
                to="/services"
                hash={s.slug}
                className="panel group relative flex flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neon/60 hover:shadow-[0_18px_44px_-30px_var(--neon)]"
              >
                <span className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-neon/8 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative inline-flex size-11 items-center justify-center rounded-lg border border-neon/25 bg-neon/10 text-neon transition-colors duration-300 group-hover:bg-neon group-hover:text-neon-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="relative mt-5 text-lg leading-snug">{s.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.short}
                </p>
                <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-medium text-neon">
                  Подробнее
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Принципы" title="Как я работаю" className="pt-0">
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              t: "Адвокатская тайна",
              d: "Статус адвоката защищает вашу информацию сильнее, чем договор с юристом.",
            },
            {
              icon: Scale,
              t: "Честный прогноз",
              d: "Называю реальные шансы и худший сценарий до того, как вы заплатите.",
            },
            {
              icon: Clock3,
              t: "Связь без ожидания",
              d: "Отвечаю в Telegram в рабочее время, отчитываюсь после каждого действия.",
            },
          ].map((i) => (
            <div key={i.t} className="panel p-6">
              <i.icon className="size-6 text-neon" />
              <h3 className="mt-4 text-lg">{i.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Процесс"
        title="Этапы работы"
        lead="Понятная последовательность: вы всегда знаете, что происходит и сколько это стоит."
        className="pt-0"
      >
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {stages.map((s) => (
            <li key={s.n} className="panel p-5">
              <span className="font-display text-sm text-neon">{s.n}</span>
              <h3 className="mt-3 text-base">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand />

      <Section eyebrow="Практика" title="Избранные дела" className="pb-0">
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {cases.slice(0, 3).map((c) => (
            <article key={c.title} className="panel p-6">
              <span className="text-[11px] uppercase tracking-[0.18em] text-neon">{c.tag}</span>
              <h3 className="mt-3 text-lg">{c.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{c.text}</p>
              <p className="mt-4 border-t border-border pt-4 text-sm">
                <span className="text-neon">{c.result}</span>
                <span className="text-muted-foreground"> · {c.term}</span>
              </p>
            </article>
          ))}
        </div>
        <Link
          to="/cases"
          className="mt-8 inline-flex items-center gap-2 text-sm text-neon hover:underline"
        >
          Все кейсы <ArrowRight className="size-4" />
        </Link>
      </Section>

      <Section eyebrow="Вопросы" title="Коротко о главном">
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {faq.slice(0, 4).map((f) => (
            <div key={f.q} className="panel p-6">
              <h3 className="text-base">{f.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
        <Link
          to="/faq"
          className="mt-8 inline-flex items-center gap-2 text-sm text-neon hover:underline"
        >
          Все вопросы <ArrowRight className="size-4" />
        </Link>
      </Section>
    </>
  );
}
