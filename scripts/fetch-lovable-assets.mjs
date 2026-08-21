// Downloads Lovable-hosted images (src/assets/*.asset.json) into public/media/
// so the GitHub Pages build can serve them as ordinary static files.
import { mkdir, readFile, readdir, writeFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";

const ORIGIN = process.env.LOVABLE_ASSET_ORIGIN || "https://napolskikh-advocat.lovable.app";
const ASSETS_DIR = "src/assets";
const OUT_DIR = "public/media";

const exists = async (p) => {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
};

const files = (await readdir(ASSETS_DIR)).filter((f) => f.endsWith(".asset.json"));
if (files.length === 0) {
  console.log("[assets] nothing to download");
  process.exit(0);
}

for (const file of files) {
  const meta = JSON.parse(await readFile(join(ASSETS_DIR, file), "utf8"));
  const target = join(OUT_DIR, meta.asset_id, meta.original_filename);

  if (await exists(target)) {
    console.log(`[assets] cached  ${target}`);
    continue;
  }

  const url = new URL(meta.url, ORIGIN).toString();
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`);

  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, Buffer.from(await res.arrayBuffer()));
  console.log(`[assets] saved   ${target}`);
}
