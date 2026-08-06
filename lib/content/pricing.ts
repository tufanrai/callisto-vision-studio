/**
 * Every published price, transcribed verbatim from the proposal's
 * "Detailed Price List". All figures are USD and already include the
 * 15% welcome discount noted in the source document.
 *
 * Parentheticals in the source ("Carousel Post (5-8 slides)") are split into
 * `note` so the table can set them at a smaller size without re-parsing text.
 */

import type { TierId } from "./tiers";

export interface PriceRow {
  service: string;
  note?: string;
  /** null = not offered at this tier (rendered as an em dash). */
  basic: number | null;
  standard: number | null;
  premium: number | null;
  /** Suffix such as "per hour" when the figure is a rate, not a fee. */
  unit?: string;
}

export interface PriceTable {
  id: string;
  /** Which service pillar this table belongs to. */
  pillarId: string;
  title: string;
  intro?: string;
  rows: readonly PriceRow[];
}

export const priceOf = (row: PriceRow, tier: TierId): number | null =>
  tier === "basic" ? row.basic : tier === "standard" ? row.standard : row.premium;

export const priceTables: readonly PriceTable[] = [
  {
    id: "graphic-design",
    pillarId: "graphic-design",
    title: "Graphic Design",
    intro:
      "Per-item pricing for flat and print work. Set prices, not estimates.",
    rows: [
      { service: "Social Media Post", basic: 20, standard: 40, premium: 70 },
      {
        service: "Carousel Post",
        note: "5–8 slides",
        basic: 170,
        standard: 300,
        premium: 475,
      },
      { service: "Story Design", basic: 40, standard: 80, premium: 130 },
      { service: "Facebook Banner", basic: 80, standard: 150, premium: 240 },
      { service: "LinkedIn Banner", basic: 80, standard: 150, premium: 240 },
      { service: "YouTube Thumbnail", basic: 60, standard: 100, premium: 170 },
      { service: "YouTube Banner", basic: 100, standard: 170, premium: 260 },
      {
        service: "Instagram Highlight Cover",
        note: "set of 5",
        basic: 80,
        standard: 150,
        premium: 240,
      },
      { service: "Poster Design", basic: 130, standard: 240, premium: 375 },
      { service: "Flyer Design", basic: 100, standard: 190, premium: 300 },
      {
        service: "Brochure",
        note: "bi-fold / tri-fold",
        basic: 300,
        standard: 500,
        premium: 800,
      },
      {
        service: "Menu Design",
        note: "restaurant",
        basic: 260,
        standard: 475,
        premium: 725,
      },
      {
        service: "Roll-up Banner",
        note: "standee",
        basic: 170,
        standard: 270,
        premium: 400,
      },
      { service: "Billboard Design", basic: 350, standard: 550, premium: 850 },
      {
        service: "Packaging Design",
        basic: 425,
        standard: 775,
        premium: 1275,
      },
      { service: "Label Design", basic: 210, standard: 375, premium: 600 },
      { service: "Business Card", basic: 70, standard: 130, premium: 210 },
      { service: "Letterhead Design", basic: 70, standard: 130, premium: 210 },
      {
        service: "Company Profile",
        note: "10–15 pages",
        basic: 675,
        standard: 1200,
        premium: 1875,
      },
      {
        service: "Presentation / Pitch Deck Design",
        basic: 500,
        standard: 850,
        premium: 1350,
      },
      {
        service: "Magazine Design",
        note: "per issue",
        basic: 850,
        standard: 1525,
        premium: 2375,
      },
      { service: "Book Cover Design", basic: 300, standard: 500, premium: 800 },
      {
        service: "Product Mockup Design",
        basic: 100,
        standard: 190,
        premium: 300,
      },
      {
        service: "Photo Editing",
        note: "per image",
        basic: 25,
        standard: 50,
        premium: 80,
      },
      {
        service: "Background Removal",
        note: "per image",
        basic: 15,
        standard: 25,
        premium: 40,
      },
      {
        service: "Image Retouching",
        note: "per image",
        basic: 35,
        standard: 70,
        premium: 120,
      },
      {
        service: "AI Image Generation",
        note: "per set of 5",
        basic: 80,
        standard: 150,
        premium: 260,
      },
      {
        service: "Restaurant Menu",
        note: "digital + print",
        basic: 300,
        standard: 500,
        premium: 800,
      },
      { service: "Price List Design", basic: 80, standard: 150, premium: 240 },
      {
        service: "Event Graphics",
        note: "invite / poster / post set",
        basic: 210,
        standard: 375,
        premium: 600,
      },
    ],
  },
  {
    id: "branding",
    pillarId: "branding",
    title: "Branding",
    intro:
      "Identity work priced individually. Bundled equivalents sit under Packages.",
    rows: [
      {
        service: "Logo Design",
        note: "3 concepts",
        basic: 425,
        standard: 775,
        premium: 1275,
      },
      {
        service: "Brand Identity",
        note: "logo + basics",
        basic: 1025,
        standard: 1700,
        premium: 2725,
      },
      {
        service: "Brand Guidelines Document",
        basic: 500,
        standard: 850,
        premium: 1350,
      },
      {
        service: "Colour Palette Development",
        basic: 130,
        standard: 210,
        premium: 350,
      },
      {
        service: "Typography Selection & Pairing",
        basic: 130,
        standard: 210,
        premium: 350,
      },
      {
        service: "Stationery Set",
        note: "card / letterhead / envelope",
        basic: 260,
        standard: 475,
        premium: 725,
      },
      {
        service: "Merchandise Design",
        note: "tee / mug / bag",
        basic: 210,
        standard: 375,
        premium: 650,
      },
      {
        service: "Complete Brand Kit",
        basic: 1275,
        standard: 2200,
        premium: 3575,
      },
    ],
  },
  {
    id: "motion-graphics",
    pillarId: "motion-graphics",
    title: "Motion Graphics",
    intro: "Animation priced per finished piece.",
    rows: [
      { service: "Logo Animation", basic: 260, standard: 475, premium: 775 },
      {
        service: "Social Media Motion Post",
        basic: 210,
        standard: 375,
        premium: 650,
      },
      {
        service: "Promo Video",
        note: "motion",
        basic: 675,
        standard: 1200,
        premium: 1875,
      },
      {
        service: "Product Animation",
        basic: 850,
        standard: 1525,
        premium: 2375,
      },
      {
        service: "Explainer Video",
        note: "up to 90s",
        basic: 1275,
        standard: 2125,
        premium: 3400,
      },
      {
        service: "Kinetic Typography Video",
        basic: 500,
        standard: 850,
        premium: 1350,
      },
      {
        service: "Infographic Animation",
        basic: 600,
        standard: 1025,
        premium: 1625,
      },
      {
        service: "GIF Animation",
        note: "set of 3",
        basic: 170,
        standard: 300,
        premium: 475,
      },
      {
        service: "Event Promo",
        note: "motion",
        basic: 425,
        standard: 775,
        premium: 1200,
      },
      {
        service: "Restaurant Promo",
        note: "motion",
        basic: 375,
        standard: 675,
        premium: 1100,
      },
      {
        service: "Corporate Motion Video",
        basic: 1025,
        standard: 1700,
        premium: 2725,
      },
      {
        service: "Reels Motion Design",
        basic: 210,
        standard: 375,
        premium: 650,
      },
    ],
  },
  {
    id: "video-duration",
    pillarId: "video-editing",
    title: "Video Editing — by duration",
    intro: "Priced on finished runtime, whatever the source format.",
    rows: [
      { service: "60 seconds", basic: 80, standard: 150, premium: 260 },
      { service: "120 seconds", basic: 150, standard: 270, premium: 425 },
      { service: "180 seconds", basic: 210, standard: 375, premium: 600 },
      { service: "5 minutes", basic: 350, standard: 600, premium: 925 },
      { service: "8 minutes", basic: 500, standard: 900, premium: 1400 },
      { service: "10 minutes", basic: 850, standard: 1500, premium: 2300 },
      {
        service: "Editor hourly rate",
        basic: 130,
        standard: 210,
        premium: 350,
        unit: "per hour",
      },
    ],
  },
  {
    id: "video-type",
    pillarId: "video-editing",
    title: "Video Editing — by format",
    intro: "Priced on deliverable type where runtime varies.",
    rows: [
      {
        service: "Instagram Reel Editing",
        basic: 80,
        standard: 150,
        premium: 260,
      },
      {
        service: "Facebook Reel Editing",
        basic: 80,
        standard: 150,
        premium: 260,
      },
      {
        service: "TikTok Video Editing",
        basic: 80,
        standard: 150,
        premium: 260,
      },
      {
        service: "YouTube Shorts Editing",
        basic: 80,
        standard: 150,
        premium: 260,
      },
      {
        service: "YouTube Long-form Editing",
        basic: 300,
        standard: 550,
        premium: 925,
      },
      {
        service: "Podcast Editing",
        note: "per episode",
        basic: 210,
        standard: 375,
        premium: 650,
      },
      { service: "Vlog Editing", basic: 210, standard: 375, premium: 650 },
      {
        service: "Documentary Editing",
        note: "per 10 min",
        basic: 675,
        standard: 1200,
        premium: 1875,
      },
      {
        service: "Commercial Advertisement Editing",
        basic: 500,
        standard: 850,
        premium: 1350,
      },
      { service: "Interview Editing", basic: 260, standard: 475, premium: 775 },
      {
        service: "Event Highlight Video",
        basic: 500,
        standard: 850,
        premium: 1350,
      },
      {
        service: "Wedding Highlight Video",
        basic: 850,
        standard: 1525,
        premium: 2375,
      },
      {
        service: "Real Estate Video Editing",
        basic: 350,
        standard: 600,
        premium: 925,
      },
      {
        service: "Food Promo Video Editing",
        basic: 300,
        standard: 500,
        premium: 800,
      },
      {
        service: "Colour Grading",
        note: "per project",
        basic: 170,
        standard: 350,
        premium: 600,
      },
      {
        service: "Sound Design",
        note: "per project",
        basic: 170,
        standard: 350,
        premium: 600,
      },
      {
        service: "Subtitle / Captioning",
        note: "per 10 min",
        basic: 70,
        standard: 130,
        premium: 210,
      },
      {
        service: "Thumbnail Design",
        note: "per video",
        basic: 40,
        standard: 80,
        premium: 130,
      },
    ],
  },
  {
    id: "digital-marketing",
    pillarId: "digital-marketing",
    title: "Digital Marketing Design",
    intro: "Retained work billed monthly, or one-off strategy deliverables.",
    rows: [
      {
        service: "Social Media Management",
        note: "per month, per platform",
        basic: 675,
        standard: 1275,
        premium: 2125,
      },
      {
        service: "Content Planning",
        note: "strategy doc",
        basic: 260,
        standard: 475,
        premium: 775,
      },
      {
        service: "Monthly Content Calendar",
        basic: 210,
        standard: 375,
        premium: 600,
      },
      {
        service: "Ad Creative",
        note: "per set of 3",
        basic: 170,
        standard: 325,
        premium: 500,
      },
      {
        service: "Campaign Design",
        note: "full campaign set",
        basic: 850,
        standard: 1525,
        premium: 2375,
      },
    ],
  },
] as const;

/** Hourly / daily rate card for time-and-materials engagements. */
export const rateCard: readonly {
  role: string;
  hourly: number | null;
  daily: number | null;
}[] = [
  { role: "Junior Graphic Designer", hourly: 130, daily: 1025 },
  { role: "Senior Graphic Designer", hourly: 210, daily: 1700 },
  { role: "Motion Graphics Artist", hourly: 260, daily: 2050 },
  { role: "Video Editor", hourly: 210, daily: 1700 },
  { role: "Brand Strategist / Consultant", hourly: 300, daily: 2375 },
  { role: "Photographer / Videographer", hourly: null, daily: 1275 },
  { role: "Drone Operator", hourly: 1025, daily: null },
  { role: "Copywriter", hourly: 150, daily: 1200 },
] as const;

/** Add-ons, quoted as published — some are percentages, some flat ranges. */
export const addOns: readonly { name: string; charge: string }[] = [
  { name: "Rush delivery (24–48 hrs)", charge: "+50% of service price" },
  { name: "Weekend / holiday delivery", charge: "+30% of service price" },
  { name: "Emergency support (same day)", charge: "+75% of service price" },
  { name: "Extra revision round", charge: "15% of service price" },
  {
    name: "Source file (PSD / AI / Premiere project)",
    charge: "10–15% of service price",
  },
  { name: "Commercial licence upgrade", charge: "$90 – $260 flat" },
  { name: "Voice over (per 60s)", charge: "$130 – $260" },
  { name: "Stock music licensing", charge: "$45 – $130" },
] as const;

/** Lowest published figure anywhere in the price list — used in the hero. */
export const lowestPublishedPrice = 15;

/** Total number of individually priced line items, computed not guessed. */
export const publishedLineItems = priceTables.reduce(
  (n, t) => n + t.rows.length,
  0,
);
