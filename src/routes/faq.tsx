import { createFileRoute } from "@tanstack/react-router";
import { faq, site, SITE_URL } from "@/data/site";
import { Section, CtaBand } from "@/components/site/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/faq` }],
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
        <Accordion type="single" collapsible className="mt-10 panel px-6 md:px-8">
          {faq.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
      <CtaBand />
    </>
  );
}
