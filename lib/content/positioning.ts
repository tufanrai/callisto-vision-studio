/**
 * The studio's argument for itself.
 *
 * `whyClientsStay` in ./services.ts is the proposal's own bullet list; these
 * are the same six claims written out for the page, each with the evidence
 * that makes it checkable. Keeping both means the terse list stays available
 * for structured data and the long form stays available for layout.
 */

export interface Claim {
  n: string;
  title: string;
  body: string;
}

/** Home — "Why brands stay longer than one brief." */
export const reasons: readonly Claim[] = [
  {
    n: "01",
    title: "One roof, no handoffs",
    body: "Designers, editors and strategists in-house. Never a freelancer chain.",
  },
  {
    n: "02",
    title: "Fast without the compromise",
    body: "Standard delivery in two days. Priority turnaround on premium tiers.",
  },
  {
    n: "03",
    title: "One quote, no surprises",
    body: "A written scope and a fixed figure before anything starts. No hidden costs.",
  },
  {
    n: "04",
    title: "Built for your time zone",
    body: "Account support across UK, Australian and UAE hours. Invoiced in USD.",
  },
  {
    n: "05",
    title: "Proactive, not reactive",
    body: "We bring ideas to the table instead of waiting for instructions.",
  },
  {
    n: "06",
    title: "Scales with you",
    body: "From a single brief to an enterprise retainer, without changing team.",
  },
];

/** About — "What makes us different." The three that carry the most weight. */
export const differentiators: readonly Claim[] = [
  {
    n: "01",
    title: "Design, motion and video in one team",
    body: "Designers, editors and strategists under one roof. Never a freelancer chain assembled after the deposit clears.",
  },
  {
    n: "02",
    title: "Quoted before you commit",
    body: "A written scope and a fixed figure in USD. The budget picks the tier, never the standard.",
  },
  {
    n: "03",
    title: "Built for your working day",
    body: "Account support across UK, Australian and UAE hours. Wire, PayPal and Wise on the invoice.",
  },
];

/** The values that run across the About marquee. */
export const values: readonly string[] = [
  "Reliability",
  "Creativity",
  "Results",
  "Transparency",
  "Quality",
];

/** The disciplines that run across the home ticker. */
export const disciplines: readonly string[] = [
  "Graphic Design",
  "Branding",
  "Motion Graphics",
  "Video Editing",
  "Digital Marketing",
  "Photography",
];

/** Short industry names, for the marquees. */
export const industryTerms: readonly string[] = [
  "Corporate",
  "Hospitality",
  "Real Estate",
  "Education",
  "Startups",
  "Events",
];

/** The brand character, as three statements. About page. */
export const character: readonly { title: string; body: string }[] = [
  {
    title: "Tone of voice",
    body: "Professional and transparent — in the proposal, the revision thread and the invoice.",
  },
  {
    title: "Aesthetic",
    body: "Structured modernism. Polished, strategically clear, built to stay useful for years.",
  },
  {
    title: "Industries",
    body: "Corporate, hospitality, real estate, education, startups, e-commerce and events.",
  },
];
