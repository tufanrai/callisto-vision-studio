/**
 * Dev-only visual check. Screenshots either a local URL or an inline SVG file.
 *
 *   node scripts/shot.mjs url  http://localhost:3000  out.png [width] [height]
 *   node scripts/shot.mjs svg  public/wordmark.svg    out.png
 */
import puppeteer from "puppeteer";
import fs from "node:fs";

const [mode, input, out, w = "1440", h = "900"] = process.argv.slice(2);
if (!mode || !input || !out) {
  console.error("usage: node scripts/shot.mjs <url|svg> <input> <out.png>");
  process.exit(1);
}

const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage();
await page.setViewport({
  width: Number(w),
  height: Number(h),
  deviceScaleFactor: 2,
});

const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`console.error: ${m.text()}`);
});
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));

if (mode === "svg") {
  const svg = fs.readFileSync(input, "utf8");
  await page.setContent(
    `<body style="margin:0;background:#EDEAE2;display:grid;place-items:center;height:${h}px">
       <div style="width:${Number(w) - 200}px;color:#221F88">${svg}</div>
     </body>`,
  );
} else {
  await page.goto(input, { waitUntil: "networkidle0", timeout: 60000 });

  // Scroll the whole page so every IntersectionObserver-driven reveal fires,
  // then return to the top. Without this a full-page capture shows every
  // below-the-fold section at opacity 0.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 400));
    window.scrollTo(0, 0);
  });

  // Let the entrance animation settle so screenshots are deterministic.
  await new Promise((r) => setTimeout(r, 1200));
}

await page.screenshot({ path: out, fullPage: mode !== "svg" && w !== "0" });
await browser.close();

if (errors.length) {
  console.error(`\n${errors.length} runtime error(s):`);
  for (const e of errors) console.error("  " + e);
  process.exit(1);
}
console.log(`wrote ${out} — no console errors`);
