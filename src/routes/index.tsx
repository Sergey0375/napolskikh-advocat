import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import photo from "@/assets/advokat.jpg.asset.json";
import { site, services, stages, SITE_URL } from "@/data/site";
import {
  Section,
  Container,
  TelegramButton,
  CTASection,
  buttonStyles,
} from "@/components/site/Section";
import { PracticeCard, TrustStat } from "@/components/site/cards";

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

  return (
    <>
      {/* 01 — Hero */}
      <section className="pb-16 pt-14 md:pb-24 md:pt-20">
        <Container>
          <div className="grid items-stretch gap-12 lg:grid-cols-[58fr_42fr] lg:gap-16">
            <div className="flex flex-col">
              <h1 className="text-balance">
                Адвокат по бизнесу, недвижимости и частным активам
              </h1>
              <p className="mt-6 max-w-[600px] text-body-lg text-foreground">
                Помогаю предпринимателям и частным клиентам защищать бизнес, недвижимость и
                имущество в сложных переговорах, конфликтах и судебных спорах.
              </p>
              <p className="mt-4 max-w-[600px] text-body text-muted-foreground">
                Сначала оцениваю риски и экономический результат. Затем предлагаю юридическую
                стратегию.
              </p>

              <div className="mt-8 max-w-[600px] space-y-1 border-l-2 border-neon/40 pl-5">
                <p className="text-body font-medium text-foreground">
                  Напольских Татьяна Сергеевна
                </p>
                <p className="text-body-sm text-muted-foreground">
                  Адвокат · Член Московской коллегии адвокатов · Реестровый номер{" "}
                  {site.registryNumber}
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TelegramButton className="w-full sm:w-auto" label="Обсудить ситуацию" />
                <Link to="/cases" className={`${buttonStyles.secondary} w-full sm:w-auto`}>
                  Посмотреть кейсы <ArrowRight className="size-4" strokeWidth={1.6} />
                </Link>
              </div>
            </div>

            <div className="lg:pl-4">
              <img
                src={photo.url}
                alt={`${site.name}, адвокат`}
                width={659}
                height={878}
                fetchPriority="high"
                className="h-full max-h-[620px] w-full rounded-2xl border border-border/70 object-cover object-top"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — Trust bar */}
      <section className="border-y border-border/60 bg-surface/30 py-10">
        <Container>
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            <TrustStat label="Практика" value={`с ${site.experienceSince} года`} note="в юриспруденции" />
            <TrustStat
              label="Статус"
              value={`Адвокат с ${site.advocateSince} года`}
              note="Московская коллегия адвокатов"
            />
            <TrustStat
              label="Дела"
              value={site.completedProjects}
              note="завершённых проектов и дел"
            />
            <TrustStat label="География" value="Москва" note="работа по всей России" />
          </dl>
        </Container>
      </section>

      {/* 03 — Практики */}
      <Section
        eyebrow="Практика"
        title="С какими задачами ко мне приходят"
        lead="Направления, в которых у меня есть системная практика, а не единичные дела."
      >
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <PracticeCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </Section>

      {/* 04 — Подход */}
      <Section
        eyebrow="Подход"
        title="Как я работаю"
        lead="Понятная последовательность: вы всегда знаете, что происходит и сколько это стоит."
        tone="subtle"
      >
        <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {[
            {
              t: "Адвокатская тайна",
              d: "Статус адвоката защищает вашу информацию сильнее, чем договор с юристом.",
            },
            {
              t: "Честный прогноз",
              d: "Называю реальные шансы и худший сценарий до того, как вы заплатите.",
            },
            {
              t: "Связь без ожидания",
              d: "Отвечаю в Telegram в рабочее время, отчитываюсь после каждого действия.",
            },
          ].map((i) => (
            <div key={i.t} className="border-t border-border/60 pt-6">
              <h3>{i.t}</h3>
              <p className="mt-3 text-body text-muted-foreground">{i.d}</p>
            </div>
          ))}
        </div>

        <ol className="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {stages.map((s) => (
            <li key={s.n} className="border-t border-border/60 pt-5">
              <span className="font-display text-sm text-neon">{s.n}</span>
              <h4 className="mt-3">{s.title}</h4>
              <p className="mt-2 text-body-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 05 — Final CTA */}
      <CTASection />
    </>
  );
}
