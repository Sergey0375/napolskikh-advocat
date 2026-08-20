import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X, ExternalLink, Maximize2 } from "lucide-react";
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
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Подтверждённая квалификация: профильное образование, статус адвоката и регулярное
          повышение квалификации. Нажмите на документ, чтобы рассмотреть его целиком.
        </p>

        <Carousel
          opts={{ align: "start", loop: true }}
          setApi={setApi}
          className="mt-10"
        >
          <CarouselContent className="-ml-2">
            {diplomas.map((d, i) => (
              <CarouselItem
                key={d.title}
                className="basis-[48%] pl-2 sm:basis-[31%] lg:basis-1/4"
              >
                <button
                  type="button"
                  onClick={() => setFull(i)}
                  aria-label={`Открыть документ: ${d.title}`}
                  className="group relative flex h-full w-full gap-2 overflow-hidden rounded-lg border border-border/70 bg-surface/40 p-2 text-left transition-all duration-300 hover:-translate-y-1 hover:border-neon/45 hover:bg-surface/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/60"
                >
                  <div className="relative w-[45%] shrink-0 overflow-hidden rounded-md bg-white">
                    <div className="aspect-[4/3] w-full">
                      <img
                        src={imageMap[d.file]}
                        alt={`${d.title}, ${d.org}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <span className="absolute left-1.5 top-1.5 rounded bg-background/85 px-1 py-0.5 font-display text-[10px] tracking-wide text-neon">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-background/85 via-background/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="mb-1.5 inline-flex items-center gap-1 rounded border border-neon/40 bg-background/80 px-2 py-1 text-[10px] text-neon">
                        <Maximize2 className="size-3" />
                        Открыть
                      </span>
                    </span>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                    <p className="text-[11px] font-medium leading-snug text-foreground">{d.title}</p>
                    <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">{d.org}</p>
                    <span className="mt-auto text-[10px] uppercase tracking-[0.15em] text-neon/80">
                      {d.year}
                    </span>
                  </div>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              {diplomas.map((d, i) => (
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
