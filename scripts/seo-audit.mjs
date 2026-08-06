/**
 * Lighthouse audit against a running production build.
 *
 *   npm run build && npm start &
 *   node scripts/seo-audit.mjs http://localhost:3100
 *
 * Runs the mobile form factor, which is what Google scores. Exits non-zero if
 * the SEO category is below 100 so it can gate a release.
 */
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer";
import fs from "node:fs";

const url = process.argv[2] ?? "http://localhost:3100";
const categories = ["seo", "accessibility", "best-practices", "performance"];

// puppeteer 25 resolves the browser path asynchronously.
const chromePath = await puppeteer.executablePath();

const chrome = await chromeLauncher.launch({
  chromePath,
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
});

const runnerResult = await lighthouse(url, {
  port: chrome.port,
  output: "json",
  logLevel: "error",
  onlyCategories: categories,
});

const lhr = runnerResult.lhr;
await chrome.kill();

fs.writeFileSync("lighthouse-report.json", JSON.stringify(lhr, null, 2));

console.log(`\n${lhr.finalDisplayedUrl}`);
console.log("-".repeat(64));
for (const key of categories) {
  const cat = lhr.categories[key];
  if (!cat) continue;
  const score = Math.round((cat.score ?? 0) * 100);
  console.log(`${cat.title.padEnd(18)} ${String(score).padStart(3)}`);
}

/** Anything that did not score a clean pass, per category. */
for (const key of categories) {
  const cat = lhr.categories[key];
  if (!cat) continue;
  const failures = cat.auditRefs
    .map((ref) => lhr.audits[ref.id])
    .filter(
      (a) =>
        a &&
        a.score !== null &&
        a.score < 1 &&
        a.scoreDisplayMode !== "informative" &&
        a.scoreDisplayMode !== "notApplicable",
    );
  if (!failures.length) continue;
  console.log(`\n${cat.title} — ${failures.length} audit(s) not passing:`);
  for (const a of failures) {
    console.log(`  · [${a.id}] ${a.title}`);
    const items = a.details?.items ?? [];
    for (const item of items.slice(0, 4)) {
      const label =
        item.node?.snippet ??
        item.node?.selector ??
        item.source?.url ??
        item.url ??
        JSON.stringify(item).slice(0, 160);
      console.log(`      ${String(label).slice(0, 150)}`);
    }
    if (items.length > 4) console.log(`      …and ${items.length - 4} more`);
  }
}

const seo = Math.round((lhr.categories.seo?.score ?? 0) * 100);
console.log(`\nSEO: ${seo}/100\n`);
if (seo < 100) process.exit(1);
