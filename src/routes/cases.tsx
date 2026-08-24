import { createFileRoute } from "@tanstack/react-router";
import { cases, site, SITE_URL, OG_IMAGE } from "@/data/site";
import { Section, CTASection } from "@/components/site/Section";
import { CaseCard } from "@/components/site/cards";


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
      { property: "og:url", content: `${SITE_URL}/cases/` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "628" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/cases/` }],
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
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {cases.map((c) => (
            <CaseCard key={c.title} item={c} as="h2" />
          ))}
        </div>
      </Section>
      <CTASection />
    </>
  );
}

