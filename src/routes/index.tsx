import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import photo from "@/assets/advokat.jpg.asset.json";
import { site, services, stages, cases, faq, publications, SITE_URL } from "@/data/site";
import {
  Section,
  Container,
  SectionHeader,
  TelegramButton,
  CTASection,
  buttonStyles,
} from "@/components/site/Section";
import { PracticeCard, CaseCard, TrustStat } from "@/components/site/cards";
import { FaqList } from "@/components/site/FaqList";

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

  const pluralize = (n: number, one: string, few: string, many: string) => {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return `${n} ${one}`;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${n} ${few}`;
    return `${n} ${many}`;
  };

  const mediaSources = Array.from(new Set(publications.map((p) => p.source)));

  return (
    <>
      {/* 01 — Hero */}
      <section className="pb-16 pt-14 md:pb-24 md:pt-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[58fr_42fr] lg:gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-neon">{site.role}</p>
              <h1 className="mt-6 text-balance">
                {site.name.replace("Адвокат ", "")}
              </h1>
              <p className="mt-6 max-w-[560px] font-display text-[1.35rem] leading-snug text-neon md:text-[1.6rem]">
                {site.tagline}
              </p>

              <p className="mt-6 max-w-[560px] text-muted-foreground">
                Веду дела предпринимателей и компаний, а также частные семейные и имущественные
                споры. Работаю по всей России: документы, переговоры и большая часть заседаний —
                дистанционно.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TelegramButton className="w-full sm:w-auto" />
                <Link to="/cases" className={`${buttonStyles.secondary} w-full sm:w-auto`}>
                  Смотреть кейсы <ArrowRight className="size-4" strokeWidth={1.6} />
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
                className="w-full rounded-2xl border border-border/70 object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — Trust bar */}
      <section className="border-y border-border/60 bg-surface/30 py-10">
        <Container>
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <TrustStat label="Адвокат" value={`Реестр Москвы № ${site.registryNumber}`} />
            <TrustStat
              label="Практика"
              value={`с ${site.experienceSince} года`}
              note={pluralize(yearsInLaw, "год", "года", "лет")}
            />
            <TrustStat label="География" value="Москва / вся Россия" />
            <TrustStat label="Формат" value="Очно и онлайн" />
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
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{i.d}</p>
            </div>
          ))}
        </div>

        <ol className="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {stages.map((s) => (
            <li key={s.n} className="border-t border-border/60 pt-5">
              <span className="font-display text-sm text-neon">{s.n}</span>
              <h4 className="mt-3 text-[17px]">{s.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 05 — Кейсы */}
      <Section
        eyebrow="Кейсы"
        title="Избранные дела"
        lead="Детали изменены и обезличены в силу адвокатской тайны — суммы и результаты реальные."
      >
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {cases.slice(0, 4).map((c) => (
            <CaseCard key={c.title} item={c} />
          ))}
        </div>
        <Link to="/cases" className={`${buttonStyles.link} mt-10`}>
          Все кейсы <ArrowRight className="size-4" strokeWidth={1.6} />
        </Link>
      </Section>

      {/* 06 — Об адвокате */}
      <Section tone="subtle">
        <div className="grid items-center gap-12 lg:grid-cols-[42fr_58fr]">
          <img
            src={photo.url}
            alt={`${site.name}, портрет`}
            loading="lazy"
            width={659}
            height={878}
            className="w-full rounded-2xl border border-border/70 object-cover"
          />
          <div>
            <SectionHeader eyebrow="Об адвокате" title="Личная практика, а не конвейер" />
            <p className="mt-6 max-w-[680px] text-muted-foreground">
              {site.role}. {site.reg}. В юриспруденции с {site.experienceSince} года, статус
              адвоката — с {site.advocateSince}-го. Начинала работу в судебном отделе Росимущества,
              затем — в юридических фирмах, сегодня веду частную практику.
            </p>
            <p className="mt-4 max-w-[680px] text-muted-foreground">
              Принцип простой: сначала считаем, что выгоднее — переговоры или суд, и только потом
              выбираем инструменты. Я не берусь за дело, если не вижу для вас реального результата.
            </p>
            <Link to="/about" className={`${buttonStyles.link} mt-8`}>
              Подробнее об адвокате <ArrowRight className="size-4" strokeWidth={1.6} />
            </Link>
          </div>
        </div>
      </Section>

      {/* 07 — СМИ */}
      <Section
        eyebrow="Медиа"
        title="Комментирую право для деловых изданий"
        lead="Публикации и экспертные комментарии в федеральных и отраслевых медиа."
      >
        <p className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-display text-lg text-muted-foreground">
          {mediaSources.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </p>
        <ul className="mt-10 border-t border-border/60">
          {publications.slice(0, 4).map((p) => (
            <li key={p.title} className="border-b border-border/60">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1 py-5 transition-colors duration-200 hover:text-neon sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <span className="min-w-0 text-[17px]">{p.title}</span>
                <span className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
                  {p.source} · {p.year}
                  <ExternalLink className="size-4" strokeWidth={1.6} />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <Link to="/about" hash="publications" className={`${buttonStyles.link} mt-10`}>
          Все публикации <ArrowRight className="size-4" strokeWidth={1.6} />
        </Link>
      </Section>

      {/* 08 — FAQ */}
      <Section eyebrow="Вопросы" title="Коротко о главном" tone="subtle">
        <div className="mt-12 max-w-[860px]">
          <FaqList items={faq.slice(0, 6)} />
        </div>
        <Link to="/faq" className={`${buttonStyles.link} mt-10`}>
          Все вопросы <ArrowRight className="size-4" strokeWidth={1.6} />
        </Link>
      </Section>

      {/* 09 — Final CTA */}
      <CTASection />
    </>
  );
}
