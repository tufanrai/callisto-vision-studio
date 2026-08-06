/**
 * Interaction smoke test across every route. Fails on any console error,
 * page error, horizontal overflow, or broken behaviour.
 *
 *   node scripts/smoke.mjs http://localhost:3100
 */
import puppeteer from "puppeteer";

const base = (process.argv[2] ?? "http://localhost:3100").replace(/\/$/, "");
const ROUTES = [
  "/",
  "/our-services",
  "/projects",
  "/about-us",
  "/contact-us",
  "/privacy",
  "/terms",
];

const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
const failures = [];
const check = (name, ok, detail = "") => {
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures.push(name);
};

const newPage = async (w, h) => {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  return { page, errors };
};

/** Every animated element must end up actually visible. */
const hiddenCount = (page) =>
  page.evaluate(async () => {
    // Scroll at a pace a person could actually produce, and let the reveal
    // tweens finish. Strobing the page faster than the animations can play
    // measures the test harness, not the site.
    const s = window.innerHeight * 0.5;
    for (let y = 0; y < document.body.scrollHeight; y += s) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 220));
    }
    await new Promise((r) => setTimeout(r, 1600));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 1200));
    return [...document.querySelectorAll("section *")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return (
          el.offsetParent !== null &&
          r.height > 24 &&
          el.textContent.trim().length > 0 &&
          Number(getComputedStyle(el).opacity) < 0.05
        );
      }).length;
  });

for (const route of ROUTES) {
  console.log(`\n${route}  (desktop 1440)`);
  const { page, errors } = await newPage(1440, 950);
  const res = await page.goto(base + route, { waitUntil: "networkidle0" });
  check("HTTP 200", res.status() === 200, String(res.status()));
  check("no console errors", errors.length === 0, errors.slice(0, 2).join(" | "));

  const stuck = await hiddenCount(page);
  check("no element stuck hidden after scroll", stuck === 0, `${stuck} hidden`);

  const heads = await page.evaluate(() => ({
    h1: document.querySelectorAll("h1").length,
    title: document.title,
    desc:
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content")?.length ?? 0,
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
  }));
  check("exactly one h1", heads.h1 === 1, `${heads.h1}`);
  check("has title + description", Boolean(heads.title) && heads.desc > 50);
  check("has canonical", Boolean(heads.canonical), heads.canonical ?? "none");

  await page.close();
}

// ---------------------------------------------------- route-specific checks --
{
  console.log("\n/our-services  (interaction)");
  const { page, errors } = await newPage(1440, 950);
  await page.goto(base + "/our-services", { waitUntil: "networkidle0" });

  /**
   * The page no longer publishes rates, so no figure may appear on it. This
   * is the guard against a price creeping back in via a content module — it
   * ignores the React Flight payload in the trailing <script>s, which is full
   * of `$1`-style chunk references that are not currency.
   */
  const prices = await page.evaluate(() => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (n) =>
          n.parentElement?.closest("script")
            ? NodeFilter.FILTER_REJECT
            : NodeFilter.FILTER_ACCEPT,
      },
    );
    const found = [];
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const m = n.textContent.match(/\$\s?\d[\d,]*/g);
      if (m) found.push(...m);
    }
    return found;
  });
  check("no prices rendered on the page", prices.length === 0,
    prices.slice(0, 4).join(", "));

  /**
   * The category sub-nav sticks under the header and must follow it when the
   * header retracts — otherwise it hangs with a header-sized gap above it and
   * the page scrolls through the hole.
   */
  const subnav = await page.evaluate(async () => {
    const nav = document.querySelector('nav[aria-label="Service categories"]');
    const top = () => Math.round(nav.getBoundingClientRect().top);

    window.scrollTo(0, 200);
    await new Promise((r) => setTimeout(r, 700));
    const parked = top();

    for (let y = 200; y < 1800; y += 140) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    await new Promise((r) => setTimeout(r, 900));
    const withHeaderHidden = top();

    window.scrollBy(0, -400);
    await new Promise((r) => setTimeout(r, 1000));
    const withHeaderShown = top();

    // Jumping to a category must clear the sticky bar, not hide under it.
    const chips = [...nav.querySelectorAll("a")];
    chips[3].click();
    await new Promise((r) => setTimeout(r, 1200));
    const target = document.getElementById("video-editing");
    const clears =
      target.getBoundingClientRect().top >=
      nav.getBoundingClientRect().bottom - 1;

    return { parked, withHeaderHidden, withHeaderShown, clears,
      chipCount: chips.length };
  });
  check("sub-nav has all five categories", subnav.chipCount === 5,
    `${subnav.chipCount}`);
  check("sub-nav rises when the header retracts", subnav.withHeaderHidden === 0,
    `top ${subnav.withHeaderHidden}`);
  check("sub-nav drops back when the header returns",
    subnav.withHeaderShown > 60, `top ${subnav.withHeaderShown}`);
  check("category anchor clears the sticky bar", subnav.clears === true);
  check("no console errors after interaction", errors.length === 0,
    errors.slice(0, 2).join(" | "));
  await page.close();
}

{
  console.log("\n/privacy + /terms  (legal)");
  const { page, errors } = await newPage(1440, 950);
  for (const route of ["/privacy", "/terms"]) {
    await page.goto(base + route, { waitUntil: "networkidle0" });
    const doc = await page.evaluate(() => {
      const links = [...document.querySelectorAll('nav[aria-label="Contents"] a')];
      // Every entry in the index must resolve to a clause on the page. The
      // length guard matters: `[].every()` is true, so an index that failed
      // to render at all would otherwise pass this check.
      const resolves =
        links.length > 0 &&
        links.every((a) =>
          document.getElementById(a.getAttribute("href").slice(1)),
        );
      return {
        clauses: document.querySelectorAll("article[id]").length,
        indexed: links.length,
        resolves,
        dated: /In effect from/.test(document.body.textContent),
      };
    });
    check(`${route} has clauses`, doc.clauses > 5, `${doc.clauses}`);
    check(`${route} index matches clause count`, doc.indexed === doc.clauses,
      `${doc.indexed} vs ${doc.clauses}`);
    check(`${route} every index link resolves`, doc.resolves === true);
    check(`${route} states an effective date`, doc.dated === true);
  }
  check("no console errors on legal pages", errors.length === 0,
    errors.slice(0, 2).join(" | "));
  await page.close();
}

{
  console.log("\n/  (FAQ + skip link)");
  const { page } = await newPage(1440, 950);
  await page.goto(base + "/", { waitUntil: "networkidle0" });
  const faq = await page.evaluate(async () => {
    const buttons = [...document.querySelectorAll("#faq button[aria-controls]")];
    // The first answer is open on load, so exercise a closed one.
    const btn = buttons[1];
    const answer = document.getElementById(btn.getAttribute("aria-controls"));
    // Every answer must be in the DOM — the same text feeds FAQPage JSON-LD.
    const answers = document.querySelectorAll("#faq p[id]").length;
    btn.click();
    await new Promise((r) => setTimeout(r, 120));
    return {
      opens: btn.getAttribute("aria-expanded") === "true" && !answer.hidden,
      // Single-open accordion: opening one must close the other.
      othersClosed:
        buttons.filter((b) => b.getAttribute("aria-expanded") === "true")
          .length === 1,
      allRendered: answers === buttons.length,
    };
  });
  check("FAQ disclosure opens", faq.opens === true);
  check("only one FAQ answer open at a time", faq.othersClosed === true);
  check("every FAQ answer is in the markup", faq.allRendered === true);
  const skip = await page.evaluate(() => {
    const a = document.querySelector('a[href="#main"]');
    a.focus();
    const r = a.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height) };
  });
  check("skip link visible on focus", skip.w > 40 && skip.h > 20, `${skip.w}x${skip.h}`);
  await page.close();
}

// ------------------------------------------------------------------ mobile --
for (const route of ROUTES) {
  const { page, errors } = await newPage(390, 844);
  await page.goto(base + route, { waitUntil: "networkidle0" });
  const overflow = await page.evaluate(() => ({
    body: document.body.scrollWidth,
    doc: document.documentElement.clientWidth,
  }));
  console.log(`\n${route}  (mobile 390)`);
  check("no horizontal overflow", overflow.body <= overflow.doc,
    `${overflow.body} vs ${overflow.doc}`);
  check("no console errors", errors.length === 0, errors.slice(0, 2).join(" | "));
  await page.close();
}

{
  console.log("\nMobile navigation");
  const { page } = await newPage(390, 844);
  await page.goto(base + "/", { waitUntil: "networkidle0" });
  const menu = await page.evaluate(async () => {
    const btn = [...document.querySelectorAll("button")].find(
      (b) => b.getAttribute("aria-controls") === "mobile-nav",
    );
    const panel = document.getElementById("mobile-nav");
    const closedFirst = panel.hasAttribute("hidden");
    btn.click();
    await new Promise((r) => setTimeout(r, 250));
    const open = {
      expanded: btn.getAttribute("aria-expanded"),
      visible: !panel.hasAttribute("hidden"),
      locked: document.body.style.overflow === "hidden",
      focusInside: panel.contains(document.activeElement),
    };
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );
    await new Promise((r) => setTimeout(r, 250));
    return {
      closedFirst,
      ...open,
      closedAfterEscape: panel.hasAttribute("hidden"),
      unlocked: document.body.style.overflow !== "hidden",
    };
  });
  check("menu starts closed", menu.closedFirst);
  check("menu opens", menu.expanded === "true" && menu.visible);
  check("body scroll locked", menu.locked);
  check("focus moves into panel", menu.focusInside);
  check("Escape closes menu", menu.closedAfterEscape);
  check("body scroll restored", menu.unlocked);
  await page.close();
}

await browser.close();
console.log(
  failures.length
    ? `\n${failures.length} check(s) failed:\n  ${failures.join("\n  ")}\n`
    : "\nAll checks passed.\n",
);
process.exit(failures.length ? 1 : 0);
