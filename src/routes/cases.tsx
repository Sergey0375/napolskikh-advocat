import { createFileRoute } from "@tanstack/react-router";
import { cases, site } from "@/data/site";
import { Section, CtaBand } from "@/components/site/Section";

export const Route = createFileRoute("/cases")({
  head: () => ({
    meta: [
      { title: `Кейсы адвоката — ${site.name}` },
      {
        name: "description",
        content:
          "Реальные дела: споры с контрагентами, защита прав на бренд, взыскание долгов, раздел бизнеса при разводе, доследственные проверки.",
      },
      { property: "og:title", content: `Кейсы адвоката — ${site.name}` },
      {
        property: "og:description",
        content: "Результаты по делам бизнеса, арбитража, семейных и экономических споров.",
      },
      { property: "og:url", content: "/cases" },
    ],
    links: [{ rel: "canonical", href: "/cases" }],
  }),
  component: CasesPage,
});

function CasesPage() {
  return (
    <>
      <Section
        eyebrow="Практика"
        title="Кейсы"
        lead="Детали изменены и обезличены в силу адвокатской тайны — суммы и результаты реальные."
      >
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {cases.map((c) => (
            <article key={c.title} className="panel p-6 md:p-8">
              <span className="text-[11px] uppercase tracking-[0.18em] text-neon">{c.tag}</span>
              <h2 className="mt-3 text-xl">{c.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{c.text}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Результат
                  </dt>
                  <dd className="mt-1 text-neon">{c.result}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Срок
                  </dt>
                  <dd className="mt-1">{c.term}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
