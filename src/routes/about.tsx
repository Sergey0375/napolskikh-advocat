import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import photo from "@/assets/advokat.png.asset.json";
import d1 from "@/assets/doc-1.jpg.asset.json";
import d2 from "@/assets/doc-2.jpg.asset.json";
import d3 from "@/assets/doc-3.jpg.asset.json";
import d5 from "@/assets/doc-5.jpg.asset.json";
import d6 from "@/assets/doc-6.jpg.asset.json";
import d7 from "@/assets/doc-7.jpg.asset.json";
import d8 from "@/assets/doc-8.jpg.asset.json";
import { site, diplomas, publications } from "@/data/site";
import { Section, CtaBand } from "@/components/site/Section";

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
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const [full, setFull] = useState<number | null>(null);

  return (
    <>
      <Section eyebrow="Об адвокате" title={site.name.replace("Адвокат ", "")}>
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <img
            src={photo.url}
            alt={`${site.name}, портрет`}
            loading="lazy"
            width={574}
            height={738}
            className="w-full rounded-xl border border-border object-cover"
          />
          <div className="space-y-4 text-muted-foreground">
            <p>
              {site.role}. {site.reg}. В праве с 2013 года, статус адвоката — с 2017-го. Начинала
              в арбитражной практике юридической фирмы, затем сосредоточилась на защите
              предпринимателей и цифровых проектов.
            </p>
            <p>
              Сегодня основная часть практики — онлайн-школы, продюсерские центры и эксперты:
              оферты и договоры, споры с учениками, защита прав на контент, налоговые и банковские
              вопросы. Параллельно веду семейные и имущественные дела частных доверителей, где
              важна конфиденциальность.
            </p>
            <p>
              Принцип простой: сначала считаем, что выгоднее — переговоры или суд, и только потом
              выбираем инструменты. Я не берусь за дело, если не вижу для вас реального результата.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Квалификация" title="Дипломы и удостоверения" className="pt-0">
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {diplomas.map((d, i) => (
            <button
              key={d.title}
              type="button"
              onClick={() => setFull(i)}
              className="panel group overflow-hidden p-3 text-left transition-colors hover:border-neon/50"
            >
              <img
                src={imageMap[d.file]}
                alt={`${d.title}, ${d.org}`}
                loading="lazy"
                className="aspect-4/3 w-full rounded-md bg-white object-contain"
              />

              <p className="mt-3 text-sm">{d.title}</p>
              <p className="text-xs text-muted-foreground">
                {d.org} · {d.year}
              </p>
              <span className="mt-2 block text-xs text-neon opacity-0 transition-opacity group-hover:opacity-100">
                Открыть во весь экран
              </span>
            </button>
          ))}
        </div>
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
            src={images[full]}
            alt={diplomas[full]?.title ?? "Документ"}
            className="max-h-[88vh] max-w-full rounded-lg border border-border object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Section eyebrow="Медиа" title="Публикации" className="pt-0">
        <ul className="mt-10 divide-y divide-border panel">
          {publications.map((p) => (
            <li key={p.title}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1 p-6 transition-colors hover:bg-accent/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-base">{p.title}</span>
                <span className="flex shrink-0 items-center gap-2 text-sm text-neon">
                  {p.source} · {p.year} <ExternalLink className="size-4" />
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
