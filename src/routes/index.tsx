import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Scale, Clock3 } from "lucide-react";
import photo from "@/assets/advokat.png.asset.json";
import { site, services, stages, cases, faq } from "@/data/site";
import { Section, TelegramButton, CtaBand } from "@/components/site/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} — адвокат для бизнеса, инфопроектов и семьи` },
      {
        name: "description",
        content:
          "Адвокат в Москве: защита инфобизнеса и предпринимателей, споры об интеллектуальной собственности, семейные и имущественные дела. Бесплатный разбор ситуации за 30 минут.",
      },
      { property: "og:title", content: `${site.name} — адвокат для бизнеса и семьи` },
      {
        property: "og:description",
        content: "Защита инфобизнеса, споров о правах, семейных и имущественных интересов.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: photo.url },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
        <div className="pointer-events-none absolute -top-40 right-0 size-[520px] rounded-full bg-neon/10 blur-[130px]" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-neon">{site.role}</p>
            <h1 className="mt-5 text-4xl leading-[1.05] md:text-6xl">
              {site.name.replace("Адвокат ", "")}
              <span className="mt-3 block neon-text">{site.tagline}</span>
            </h1>
            <p className="mt-6 max-w-xl text-muted-foreground">
              Веду дела предпринимателей, продюсеров и владельцев онлайн-школ, а также частные
              семейные и имущественные споры. Работаю по всей России: документы, переговоры и
              большая часть заседаний — онлайн.
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
                { k: "12 лет", v: "в праве, из них 9 в адвокатуре" },
                { k: "180+", v: "завершённых дел" },
                { k: "84%", v: "дел решены в пользу доверителя" },
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
              width={574}
              height={738}
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
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              to="/services"
              hash={s.slug}
              className="panel group p-6 transition-colors hover:border-neon/50"
            >
              <h3 className="text-lg">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.short}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-neon opacity-80 transition-opacity group-hover:opacity-100">
                Подробнее <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
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
