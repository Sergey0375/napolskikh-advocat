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
const VIRTUAL_PREFIX = "\0static-lovable-asset:";

function staticLovableAssets(): Plugin {
  return {
    name: "static-lovable-assets",
    enforce: "pre",
    async resolveId(source, importer) {
      if (!source.endsWith(".asset.json")) return null;
      const resolved = await this.resolve(source, importer, { skipSelf: true });
      if (!resolved) return null;
      // ".js" suffix keeps the built-in JSON plugin from re-parsing our JS output.
      return `${VIRTUAL_PREFIX}${resolved.id}.js`;
    },
    async load(id) {
      if (!id.startsWith(VIRTUAL_PREFIX)) return null;
      const file = id.slice(VIRTUAL_PREFIX.length).split("?")[0].replace(/\.js$/, "");

      const meta = JSON.parse(await readFile(file, "utf8"));
      const url = meta?.asset_id && meta?.original_filename
        ? `${BASE}media/${meta.asset_id}/${meta.original_filename}`
        : meta.url;

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
