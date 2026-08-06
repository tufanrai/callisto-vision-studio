/**
 * Dev-only layout probe: reports the bounding box of every section and flags
 * elements that overflow the viewport horizontally. Useful for catching
 * runaway heights and mobile overflow without eyeballing screenshots.
 *
 *   node scripts/audit-layout.mjs http://localhost:3100 [width]
 */
import puppeteer from "puppeteer";

const url = process.argv[2] ?? "http://localhost:3100";
const width = Number(process.argv[3] ?? 1440);

const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width, height: 900 });

const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(e.message));

await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

const report = await page.evaluate(() => {
  const sections = [...document.querySelectorAll("main > section, footer")].map(
    (el) => {
      const r = el.getBoundingClientRect();
      return {
        id: el.id || el.tagName.toLowerCase(),
        top: Math.round(r.top + window.scrollY),
        height: Math.round(r.height),
      };
    },
  );

  const docWidth = document.documentElement.clientWidth;
  const overflowing = [...document.querySelectorAll("body *")]
    .filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && (r.right > docWidth + 1 || r.left < -1);
    })
    .slice(0, 12)
    .map((el) => {
      const r = el.getBoundingClientRect();
      return `${el.tagName.toLowerCase()}.${(el.className || "").toString().split(" ").slice(0, 3).join(".")} → left ${Math.round(r.left)} right ${Math.round(r.right)}`;
    });

  return {
    sections,
    overflowing,
    docWidth,
    scrollHeight: document.documentElement.scrollHeight,
    bodyScrollW: document.body.scrollWidth,
  };
});

console.log(`\nviewport ${width}px · page height ${report.scrollHeight}px`);
console.log(
  `horizontal scroll: body ${report.bodyScrollW} vs doc ${report.docWidth} → ${report.bodyScrollW > report.docWidth ? "OVERFLOW" : "ok"}`,
);
console.log("\nSECTION            TOP      HEIGHT");
console.log("-".repeat(40));
for (const s of report.sections) {
  console.log(
    `${s.id.padEnd(18)} ${String(s.top).padEnd(8)} ${s.height}`,
  );
}
if (report.overflowing.length) {
  console.log("\nElements past the viewport edge:");
  for (const o of report.overflowing) console.log("  " + o);
}
if (errors.length) {
  console.log("\nConsole errors:");
  for (const e of errors) console.log("  " + e);
}

await browser.close();
if (errors.length) process.exit(1);
