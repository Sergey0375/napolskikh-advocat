// Static build for GitHub Pages (https://sergey0375.github.io/napolskikh-advocat/).
// The default vite.config.ts is untouched so the Lovable deployment keeps working.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/napolskikh-advocat/",
  },
  tanstackStart: {
    server: { entry: "server" },
    // Render every route to static HTML so each URL works as a real file on Pages.
    prerender: { enabled: true, crawlLinks: true, autoSubfolderIndex: true },
    pages: [
      { path: "/" },
      { path: "/services" },
      { path: "/cases" },
      { path: "/about" },
      { path: "/faq" },
      { path: "/contact" },
    ],
  },
  nitro: { preset: "static" },
});
