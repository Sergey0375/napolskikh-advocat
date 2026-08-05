import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import photo from "@/assets/advokat.jpg.asset.json";
import d1 from "@/assets/doc-1.jpg.asset.json";
import d2 from "@/assets/doc-2.jpg.asset.json";
import d3 from "@/assets/doc-3.jpg.asset.json";
import d5 from "@/assets/doc-5.jpg.asset.json";
import d6 from "@/assets/doc-6.jpg.asset.json";
import d7 from "@/assets/doc-7.jpg.asset.json";
import d8 from "@/assets/doc-8.jpg.asset.json";
import { site, diplomas, publications, SITE_URL } from "@/data/site";
import { Section, CtaBand } from "@/components/site/Section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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

  return (
    <>
      <Section eyebrow="Об адвокате" title={site.name.replace("Адвокат ", "")}>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4 text-muted-foreground">
            <p>
              {site.role}. {site.reg}. В юриспруденции с 2019 года, статус адвоката — с 2024-го.
            </p>
            <p>
              Начинала работу в судебном отделе Росимущества, затем работала в юридических фирмах,
              после чего получила статус адвоката и продолжила развивать частную практику.
            </p>
            <p>Сегодня моя специализация делится на следующие группы:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                недвижимость и земельное право, что включает выявление рисков, сопровождение сделок,
                работу с земельными участками и строительством, в том числе судебное сопровождение.
                Уникальной специализацией являются споры с государственными органами при изъятии объектов,
                а также при различных способах аренды и покупки таких объектов;
              </li>
              <li>
                семейное и наследственное право, в частности большой опыт разрешения семейных конфликтов
                путём переговоров и заключения соглашений, что является приоритетной задачей, а также судебная защита;
              </li>
              <li>
                защита предпринимателей и бизнеса на различных этапах работы. В частности, сопровождаю
                онлайн-школы и различные проекты в образовательной сфере от начала создания бизнеса,
                получения образовательных лицензий до создания комфортной и законной деятельности на постлицензионном этапе.
              </li>
            </ul>
            <p>
              Принцип простой: сначала считаем, что выгоднее — переговоры или суд, и только потом
              выбираем инструменты. Я не берусь за дело, если не вижу для вас реального результата.
            </p>
          </div>
          <img
            src={photo.url}
            alt={`${site.name}, портрет`}
            loading="lazy"
            width={659}
            height={878}
            className="w-full rounded-xl border border-border object-cover"
          />
        </div>
      </Section>

      <Section eyebrow="Квалификация" title="Дипломы и удостоверения" className="pt-0">
        <Carousel opts={{ align: "start", loop: true }} className="mt-10">
          <CarouselContent className="-ml-4">
            {diplomas.map((d, i) => (
              <CarouselItem
                key={d.title}
                className="basis-[85%] pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <button
                  type="button"
                  onClick={() => setFull(i)}
                  aria-label={`Открыть документ: ${d.title}`}
                  className="group flex h-full w-full flex-col text-left transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/60"
                >
                  <div className="relative flex-1 overflow-hidden rounded-md border border-border/60 bg-white shadow-sm">
                    <img
                      src={imageMap[d.file]}
                      alt={`${d.title}, ${d.org}`}
                      loading="lazy"
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-background/85 px-3 py-1.5 text-center text-xs text-neon opacity-0 transition-opacity group-hover:opacity-100">
                      Открыть во весь экран
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-snug text-foreground">{d.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {d.org} · {d.year}
                  </p>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="static mt-6 mr-2 inline-flex translate-y-0 sm:absolute sm:-left-5 sm:mt-0 sm:mr-0 sm:-translate-y-1/2" />
          <CarouselNext className="static mt-6 inline-flex translate-y-0 sm:absolute sm:-right-5 sm:mt-0 sm:-translate-y-1/2" />
        </Carousel>
        <p className="mt-4 text-xs text-muted-foreground sm:hidden">
          Листайте карточки свайпом или стрелками — нажмите, чтобы открыть документ целиком.
        </p>
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

      <Section eyebrow="Медиа" title="Мои публикации" className="pt-0">
        <ul className="mt-10 divide-y divide-border border-t border-border">
          {publications.map((p) => (
            <li key={p.title}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1 py-5 transition-colors hover:text-neon sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-base">{p.title}</span>
                <span className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
                  {p.source} · {p.year} <ExternalLink className="size-4 text-neon" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
