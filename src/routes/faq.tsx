import { createFileRoute } from "@tanstack/react-router";
import { faq, site, SITE_URL, OG_IMAGE } from "@/data/site";
import { Section, CTASection } from "@/components/site/Section";
import { FaqList } from "@/components/site/FaqList";


export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: `Вопросы и ответы — ${site.name}` },
      {
        name: "description",
        content:
          "Стоимость консультации, сроки дел, нужно ли идти в суд, конфиденциальность и что подготовить к первой встрече с адвокатом.",
      },
      { property: "og:title", content: `Вопросы и ответы — ${site.name}` },
      {
        property: "og:description",
        content: "Ответы на частые вопросы доверителей о работе с адвокатом.",
      },
      { property: "og:url", content: `${SITE_URL}/faq/` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "628" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/faq/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <Section
        eyebrow="FAQ"
        title="Вопросы, которые задают чаще всего"
        lead="Если ответа на ваш вопрос здесь нет — напишите в Telegram, отвечу лично."
      >
        <div className="mt-12 max-w-[860px]">
          <FaqList items={faq} />
        </div>
      </Section>
      <CTASection />
    </>
  );
}

