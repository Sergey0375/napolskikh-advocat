import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { site, services, SITE_URL } from "@/data/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Страница не найдена</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Страница удалена или адрес указан неверно.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-neon px-4 py-2 text-sm font-semibold text-neon-foreground"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">Страница не загрузилась</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Произошла ошибка. Обновите страницу или напишите мне в Telegram.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-neon px-4 py-2 text-sm font-semibold text-neon-foreground"
          >
            Обновить
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium"
          >
            На главную
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Напольских Татьяна — адвокат в Москве" },
      {
        name: "description",
        content:
          "Адвокат в Москве: защита предпринимателей, арбитражные споры, недвижимость и земельное право, семейные и наследственные дела.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.name },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:title", content: "Напольских Татьяна — адвокат в Москве" },
      {
        property: "og:description",
        content:
          "Адвокат в Москве: защита предпринимателей, арбитражные споры, недвижимость и земельное право, семейные и наследственные дела.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Напольских Татьяна — адвокат в Москве" },
      {
        name: "twitter:description",
        content:
          "Адвокат в Москве: защита предпринимателей, арбитражные споры, недвижимость и земельное право, семейные и наследственные дела.",
      },
    ],
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Playfair+Display:wght@400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["LegalService", "Attorney"],
              "@id": `${SITE_URL}/#legalservice`,
              name: site.name,
              description: site.tagline,
              url: SITE_URL,
              telephone: site.phone,
              email: site.email,
              priceRange: "₽₽",
              areaServed: { "@type": "Country", name: "Россия" },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Москва",
                addressCountry: "RU",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "10:00",
                  closes: "19:00",
                },
              ],
              sameAs: [site.telegram],
              knowsLanguage: "ru",
              provider: { "@id": `${SITE_URL}/#attorney` },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Направления практики",
                itemListElement: services.map((s) => ({
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: s.title,
                    description: s.short,
                    serviceType: s.title,
                    url: `${SITE_URL}/services`,
                  },
                })),
              },
            },
            {
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
              worksFor: { "@id": `${SITE_URL}/#legalservice` },
              sameAs: [site.telegram],
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: SITE_URL,
              name: site.name,
              inLanguage: "ru-RU",
              publisher: { "@id": `${SITE_URL}/#legalservice` },
            },
          ],
        }),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          {/* Required: nested routes render here. */}
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
