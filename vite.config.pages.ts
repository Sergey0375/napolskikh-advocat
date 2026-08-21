// Static build for GitHub Pages (https://sergey0375.github.io/napolskikh-advocat/).
// The default vite.config.ts is untouched so the Lovable deployment keeps working.
import { readFile } from "node:fs/promises";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

const BASE = "/napolskikh-advocat/";

/**
 * Lovable images are served through the `/__l5e/assets-v1/...` proxy, which does
 * not exist on GitHub Pages. `scripts/fetch-lovable-assets.mjs` mirrors them into
 * `public/media/<asset_id>/<filename>`; this plugin points the imports there.
 */
function staticLovableAssets(): Plugin {
  return {
    name: "static-lovable-assets",
    enforce: "pre",
    async load(id) {
      const [file] = id.split("?");
      if (!file.endsWith(".asset.json")) return null;

      const meta = JSON.parse(await readFile(file, "utf8"));
      if (!meta?.asset_id || !meta?.original_filename) return null;

      const url = `${BASE}media/${meta.asset_id}/${meta.original_filename}`;
      return `export default ${JSON.stringify({ ...meta, url })};`;
    },
  };
}

export default defineConfig({
  plugins: [staticLovableAssets()],
  vite: {
    base: BASE,
  },
  tanstackStart: {
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
  // GitHub Pages serves plain files — no server bundle/deploy adapter needed.
  nitro: false,
});
