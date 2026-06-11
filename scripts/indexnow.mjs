// IndexNow submitter — pushes the site's URLs to the IndexNow network in one
// call, which fans out to Bing, Yandex, Naver, Seznam, Yahoo (everyone EXCEPT
// Google — Google indexing is handled separately via Search Console + sitemap).
//
// Reads the already-generated out/sitemap-0.xml (so it runs after next-sitemap)
// and POSTs every <loc> to https://api.indexnow.org. The key is public by
// design: ownership is proven by hosting it at https://ciris.ai/<key>.txt.
//
// Runs automatically on Cloudflare Pages production builds (CF_PAGES is set
// there). For a one-off manual submit from anywhere: INDEXNOW_SUBMIT=1 node
// scripts/indexnow.mjs. Otherwise it no-ops (so local/CI builds don't ping).
// Never throws: a submission failure must not fail the deploy build.

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HOST = "ciris.ai";
const KEY = "def92beddd51bd7066f97dc9c13a771d";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_PER_REQUEST = 10000; // IndexNow per-request cap

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function shouldRun() {
  if (process.env.INDEXNOW_SUBMIT === "1") return true; // explicit manual run
  if (process.env.CF_PAGES) return true; // Cloudflare Pages production build
  return false;
}

function readSitemapUrls() {
  const xml = readFileSync(resolve(root, "out/sitemap-0.xml"), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function submit(urlList) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  // 200 OK or 202 Accepted both mean success; 4xx tells us the key/host is off.
  return res.status;
}

async function main() {
  if (!shouldRun()) {
    console.log("[indexnow] skipped (set INDEXNOW_SUBMIT=1 to force; auto-runs on CF_PAGES)");
    return;
  }
  let urls;
  try {
    urls = readSitemapUrls();
  } catch (e) {
    console.warn("[indexnow] could not read out/sitemap-0.xml — skipping:", e.message);
    return;
  }
  if (!urls.length) {
    console.warn("[indexnow] no URLs in sitemap — skipping");
    return;
  }
  for (let i = 0; i < urls.length; i += MAX_PER_REQUEST) {
    const batch = urls.slice(i, i + MAX_PER_REQUEST);
    try {
      const status = await submit(batch);
      console.log(`[indexnow] submitted ${batch.length} URLs -> HTTP ${status}`);
    } catch (e) {
      console.warn("[indexnow] submit failed (non-fatal):", e.message);
    }
  }
}

main();
