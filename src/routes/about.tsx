import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X, ExternalLink } from "lucide-react";
import photo from "@/assets/advokat.jpg.asset.json";
import portrait from "@/assets/tatiana-portrait.png.asset.json";
import d1 from "@/assets/doc-1.jpg.asset.json";
import d2 from "@/assets/doc-2.jpg.asset.json";
import d3 from "@/assets/doc-3.jpg.asset.json";
import d5 from "@/assets/doc-5.jpg.asset.json";
import d6 from "@/assets/doc-6.jpg.asset.json";
import d7 from "@/assets/doc-7.jpg.asset.json";
import d8 from "@/assets/doc-8.jpg.asset.json";
import { site, diplomas, publications, SITE_URL } from "@/data/site";
import { Section, CTASection } from "@/components/site/Section";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const imageMap: Record<string, string> = {
  "doc-1": d1.url,
  "doc-2": d2.url,
  "doc-3": d3.url,
  "doc-5": d5.url,
  "doc-6": d6.url,
  "doc-7": d7.url,
  "doc-8": d8.url,
};


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `Об адвокате — ${site.name}` },
      {
        name: "description",
        content:
          "Опыт, образование и квалификация адвоката: дипломы, удостоверение адвокатской палаты, публикации в деловых медиа.",
      },
      { property: "og:title", content: `Об адвокате — ${site.name}` },
      {
        property: "og:description",
        content: "Квалификация, дипломы и публикации адвоката.",
      },
      { property: "og:url", content: `${SITE_URL}/about` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Person",
            "@id": `${SITE_URL}/#attorney`,
            name: "Напольских Татьяна Сергеевна",
            jobTitle: "Адвокат",
            description: `${site.role}. ${site.reg}.`,
            url: `${SITE_URL}/about`,
            telephone: site.phone,
            email: site.email,
            identifier: site.registryNumber,
            memberOf: { "@type": "Organization", name: "Московская коллегия адвокатов" },
            sameAs: [site.telegram],
            hasCredential: diplomas.map((d) => ({
              "@type": "EducationalOccupationalCredential",
              name: d.title,
              credentialCategory: "diploma",
              recognizedBy: { "@type": "Organization", name: d.org },
              dateCreated: String(d.year),
            })),
          },
        }),
      },
    ],

  }),
  component: AboutPage,
});

function AboutPage() {
  const [full, setFull] = useState<number | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <>
      <Section eyebrow="Об адвокате" title={site.name.replace("Адвокат ", "")}>
        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[58fr_42fr] lg:gap-16">
          <div className="max-w-[680px] space-y-5 text-muted-foreground">
            <p>
              Начинала работу в судебном отделе Росимущества, затем работала в юридических фирмах,
              после чего получила статус адвоката и продолжила развивать частную практику.
            </p>
            <p className="text-foreground">Сегодня моя специализация делится на следующие группы:</p>
            <ul className="space-y-5 border-t border-border/60 pt-5">
              <li className="border-b border-border/60 pb-5">
                <span className="font-display text-[17px] text-foreground">
                  Недвижимость и земельное право
                </span>
                <p className="mt-2">
                  Выявление рисков, сопровождение сделок, работа с земельными участками и
                  строительством, в том числе судебное сопровождение. Уникальной специализацией
                  являются споры с государственными органами при изъятии объектов, а также при
                  различных способах аренды и покупки таких объектов.
                </p>
              </li>
              <li className="border-b border-border/60 pb-5">
                <span className="font-display text-[17px] text-foreground">
                  Семейное и наследственное право
                </span>
                <p className="mt-2">
                  Большой опыт разрешения семейных конфликтов путём переговоров и заключения
                  соглашений, что является приоритетной задачей, а также судебная защита.
                </p>
              </li>
              <li>
                <span className="font-display text-[17px] text-foreground">
                  Защита предпринимателей и бизнеса
                </span>
                <p className="mt-2">
                  Сопровождаю онлайн-школы и различные проекты в образовательной сфере от начала
                  создания бизнеса, получения образовательных лицензий до создания комфортной и
                  законной деятельности на постлицензионном этапе.
                </p>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <img
              src={photo.url}
              alt={`${site.name}, портрет`}
              loading="lazy"
              width={659}
              height={878}
              className="w-full rounded-2xl border border-border/70 object-cover object-top"
            />
            <img
              src={portrait.url}
              alt={`${site.name} — адвокат`}
              loading="lazy"
              width={623}
              height={831}
              className="w-full rounded-2xl border border-border/60 object-cover object-top"
            />
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Квалификация"
        title="Дипломы и удостоверения"
        lead="Подтверждённая квалификация: профильное образование, статус адвоката и регулярное повышение квалификации. Нажмите на документ, чтобы рассмотреть его целиком."
        tone="subtle"
      >
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {diplomas.slice(0, 2).map((d, i) => (
            <button
              key={d.title}
              type="button"
              onClick={() => setFull(i)}
              aria-label={`Открыть документ: ${d.title}`}
              className="panel panel-hover group flex gap-5 p-5 text-left"
            >
              <span className="w-[38%] shrink-0 overflow-hidden rounded-[10px] bg-white">
                <img
                  src={imageMap[d.file]}
                  alt={`${d.title}, ${d.org}`}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="font-display text-[17px] leading-snug">{d.title}</span>
                <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.org}</span>
                <span className="mt-auto pt-3 text-[11px] uppercase tracking-[0.2em] text-neon">
                  {d.year}
                </span>
              </span>
            </button>
          ))}
        </div>

        <p className="mt-12 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Повышение квалификации
        </p>

        <Carousel opts={{ align: "start", loop: true }} setApi={setApi} className="mt-5">
          <CarouselContent className="-ml-2">
            {diplomas.slice(2).map((d, i) => (
              <CarouselItem key={d.title} className="basis-[48%] pl-2 sm:basis-[31%] lg:basis-1/4">
                <button
                  type="button"
                  onClick={() => setFull(i + 2)}
                  aria-label={`Открыть документ: ${d.title}`}
                  className="group flex h-full w-full gap-2.5 rounded-[10px] border border-border/60 p-2.5 text-left transition-colors duration-200 hover:border-neon/40"
                >
                  <span className="w-[42%] shrink-0 overflow-hidden rounded-md bg-white">
                    <img
                      src={imageMap[d.file]}
                      alt={`${d.title}, ${d.org}`}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-[12px] font-medium leading-snug">{d.title}</span>
                    <span className="mt-auto pt-2 text-[11px] text-muted-foreground">{d.year}</span>
                  </span>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              {diplomas.slice(2).map((d, i) => (
                <button
                  key={d.title}
                  type="button"
                  aria-label={`Перейти к документу ${i + 1}`}
                  onClick={() => api?.scrollTo(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-neon" : "w-1 bg-border hover:bg-neon/50"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>
        </Carousel>
      </Section>




      {full !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр документа"
          onClick={() => setFull(null)}
        >
          <button
            type="button"
            aria-label="Закрыть"
            onClick={() => setFull(null)}
            className="absolute right-5 top-5 rounded-md border border-border p-2 text-muted-foreground"
          >
            <X className="size-5" />
          </button>
          <img
            src={imageMap[diplomas[full]!.file]}
            alt={diplomas[full]?.title ?? "Документ"}
            className="max-h-[88vh] max-w-full rounded-lg border border-border object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Section id="publications" eyebrow="Медиа" title="Мои публикации">
        <ul className="mt-12 border-t border-border/60">
          {publications.map((p) => (
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
      </Section>

      <CTASection />

    </>
  );
}
