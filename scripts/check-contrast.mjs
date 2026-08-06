/**
 * Verifies every foreground/background pair actually used in the UI against
 * WCAG 2.1 AA. Run with `npm run contrast`. Exits non-zero on any failure so
 * it can gate CI.
 *
 * The Pomelli brand book specifies four colours. Two of them (Doe Brown on
 * either ground) do not reach 4.5:1 at body size, so this file is also the
 * record of which derived variants exist and why.
 */

const C = {
  // Brand book, exact
  twilight: "#1C3D7A",
  doe: "#C5A059",
  snow: "#F8F9FA",
  pure: "#FFFFFF",
  // Grounds added by the design
  inkDeep: "#0A1730",
  inkRaised: "#12224A",
  twilightRaised: "#16325F",
  // Derived
  doeDeep: "#8C6D31",
  doeLight: "#CAA868",
  mist: "#A8B0BD",
  mistDim: "#79839A",
  inkMuted: "#55688F",
  inkSoft: "#3D537D",
  edgeDark: "#728CBB",
  edgeLight: "#8491A9",
  ruleDark: "#2A3C5E",
  ruleLight: "#DCDFE5",
};

const srgb = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex) => {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
};

const ratio = (a, b) => {
  const [la, lb] = [luminance(a), luminance(b)];
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

/**
 * [foreground, background, size, where]
 *   "normal" → 4.5:1   body text
 *   "large"  → 3:1     >=24px, or >=18.66px bold
 *   "ui"     → 3:1     borders of interactive controls (WCAG 1.4.11)
 */
const PAIRS = [
  // --- on the ink-deep ground: heroes, dark bands, footer ---
  [C.snow, C.inkDeep, "normal", "body on ink-deep"],
  [C.mist, C.inkDeep, "normal", "secondary on ink-deep"],
  [C.mistDim, C.inkDeep, "normal", "meta label on ink-deep"],
  [C.doe, C.inkDeep, "normal", "doe text on ink-deep"],
  [C.snow, C.inkRaised, "normal", "body on raised ink card"],
  [C.mist, C.inkRaised, "normal", "secondary on raised ink card"],
  [C.doe, C.inkRaised, "normal", "doe on raised ink card"],

  // --- on the Twilight band: marquees, clocks, work stats ---
  //
  // Twilight is the LIGHTEST of the dark grounds, so it is the binding
  // constraint on every tint that also appears on ink-deep. A value tuned
  // only against ink-deep lands around 4.1:1 here — which is exactly the bug
  // this block exists to catch.
  [C.snow, C.twilight, "normal", "body on twilight"],
  [C.pure, C.twilight, "normal", "white text on twilight"],
  [C.mist, C.twilight, "normal", "secondary on twilight"],
  [C.doe, C.twilight, "large", "doe display type on twilight"],
  [C.doeLight, C.twilight, "normal", "doe body/label on twilight"],
  [C.doeLight, C.twilightRaised, "normal", "doe label on raised twilight card"],
  [C.snow, C.twilightRaised, "normal", "body on raised twilight card"],
  [C.mist, C.twilightRaised, "normal", "secondary on raised twilight card"],
  [C.doe, C.twilightRaised, "normal", "doe on raised twilight card"],

  // --- image-slot pending panels, which set their own opaque ground ---
  [C.mist, C.inkRaised, "normal", "slot hint on dark pending panel"],
  [C.inkSoft, C.ruleLight, "normal", "slot hint on light pending panel"],

  // --- form fields ---
  [C.inkMuted, C.snow, "normal", "input placeholder on snow"],
  [C.doeDeep, C.pure, "normal", "field error on white"],

  // --- on the light grounds ---
  [C.twilight, C.snow, "normal", "body + display on snow"],
  [C.inkSoft, C.snow, "normal", "long-form copy on snow"],
  [C.inkMuted, C.snow, "normal", "secondary on snow"],
  [C.doeDeep, C.snow, "normal", "doe text on snow"],
  [C.twilight, C.pure, "normal", "body + display on white"],
  [C.inkSoft, C.pure, "normal", "long-form copy on white"],
  [C.inkMuted, C.pure, "normal", "secondary on white"],
  [C.doeDeep, C.pure, "normal", "doe text on white"],

  // --- filled controls ---
  [C.inkDeep, C.doe, "normal", "label on doe pill"],
  [C.snow, C.twilight, "normal", "label on twilight pill"],
  [C.inkDeep, C.snow, "normal", "label on snow pill (active tier tab)"],

  // --- interactive borders, WCAG 1.4.11 ---
  [C.edgeDark, C.inkDeep, "ui", "control border on ink-deep"],
  [C.edgeDark, C.twilight, "ui", "control border on twilight"],
  [C.edgeLight, C.snow, "ui", "control border on snow"],
  [C.edgeLight, C.pure, "ui", "control border on white"],
  [C.doe, C.inkDeep, "ui", "focus ring on ink-deep"],
  [C.doeDeep, C.snow, "ui", "focus ring on snow"],
];

/**
 * Purely decorative rules. WCAG 1.4.11 exempts graphics that convey no
 * information, so these carry no threshold — listed to keep the values
 * tracked and to make the exemption explicit rather than an oversight.
 */
const DECORATIVE = [
  [C.ruleDark, C.inkDeep, "hairline rule on ink-deep"],
  [C.ruleDark, C.twilight, "hairline rule on twilight"],
  [C.ruleLight, C.snow, "hairline rule on snow"],
  [C.ruleLight, C.pure, "hairline rule on white"],
];

let failures = 0;
const rows = PAIRS.map(([fg, bg, size, where]) => {
  const r = ratio(fg, bg);
  const need = size === "normal" ? 4.5 : 3;
  const pass = r >= need;
  if (!pass) failures += 1;
  return { where, fg, bg, ratio: r, need, pass };
});

const pad = (s, n) => String(s).padEnd(n);
console.log(
  `\n${pad("PAIR", 36)} ${pad("FG", 9)} ${pad("BG", 9)} ${pad("RATIO", 7)} NEED  RESULT`,
);
console.log("-".repeat(80));
for (const r of rows) {
  console.log(
    `${pad(r.where, 36)} ${pad(r.fg, 9)} ${pad(r.bg, 9)} ${pad(r.ratio.toFixed(2), 7)} ${pad(r.need.toFixed(1), 5)} ${r.pass ? "PASS" : "FAIL"}`,
  );
}

console.log(`\n${pad("DECORATIVE (exempt from 1.4.11)", 36)}`);
console.log("-".repeat(80));
for (const [fg, bg, where] of DECORATIVE) {
  console.log(
    `${pad(where, 36)} ${pad(fg, 9)} ${pad(bg, 9)} ${pad(ratio(fg, bg).toFixed(2), 7)} ${pad("—", 5)} n/a`,
  );
}

if (failures > 0) {
  console.error(`\n${failures} contrast pair(s) below WCAG AA.\n`);
  process.exit(1);
}
console.log(`\nAll ${rows.length} load-bearing pairs meet WCAG AA.\n`);
