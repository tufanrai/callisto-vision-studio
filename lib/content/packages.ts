/**
 * Bundled offerings, verbatim from the proposal. Anything expressed as a
 * recurring commitment carries an explicit `cadence` so the UI never has to
 * infer "/month" from the price string.
 */

export type Cadence = "one-time" | "month" | "campaign" | "event";

export interface Bundle {
  id: string;
  name: string;
  /** Short line on who it suits — written for the web. */
  fit?: string;
  includes: readonly string[];
  price: number;
  cadence: Cadence;
  /** Some bundles have a setup fee plus a retainer. */
  secondaryPrice?: { amount: number; cadence: Cadence; label: string };
  featured?: boolean;
}

export const cadenceLabel: Record<Cadence, string> = {
  "one-time": "one-time",
  month: "per month",
  campaign: "per campaign",
  event: "per event",
};

/** Branding packages. */
export const brandingBundles: readonly Bundle[] = [
  {
    id: "starter-brand",
    name: "Starter Brand",
    fit: "A new business that needs to look legitimate on day one.",
    includes: ["Logo — 3 concepts", "Business card", "Letterhead"],
    price: 1525,
    cadence: "one-time",
  },
  {
    id: "growth-brand",
    name: "Growth Brand",
    fit: "An established business outgrowing its first identity.",
    includes: [
      "Logo",
      "Full stationery",
      "Brand guidelines",
      "Social media kit",
    ],
    price: 2975,
    cadence: "one-time",
    featured: true,
  },
  {
    id: "signature-brand",
    name: "Signature Brand",
    fit: "A brand going to market with product, packaging and merchandise.",
    includes: [
      "Full brand identity",
      "Brand guidelines",
      "Merchandise design",
      "Complete brand kit",
      "Packaging concepts",
    ],
    price: 5525,
    cadence: "one-time",
  },
] as const;

/** Logo-only packages, differentiated by designer count and revisions. */
export const logoBundles: readonly {
  id: string;
  name: string;
  designers: number;
  concepts: number;
  revisions: string;
  formats: string;
  extras: readonly string[];
  price: number;
}[] = [
  {
    id: "basic-logo",
    name: "Basic Logo",
    designers: 1,
    concepts: 2,
    revisions: "2 revisions",
    formats: "JPG + PNG",
    extras: [],
    price: 375,
  },
  {
    id: "standard-logo",
    name: "Standard Logo",
    designers: 2,
    concepts: 4,
    revisions: "3 revisions",
    formats: "All file formats",
    extras: ["Basic guideline"],
    price: 725,
  },
  {
    id: "premium-logo",
    name: "Premium Logo",
    designers: 3,
    concepts: 6,
    revisions: "Unlimited revisions",
    formats: "All file formats",
    extras: ["Full brand guideline", "Social kit"],
    price: 1350,
  },
] as const;

/** Monthly social media packages — a true comparison matrix. */
export const socialPlans = ["Starter", "Business", "Professional", "Enterprise"] as const;

export interface SocialFeatureRow {
  feature: string;
  /** One value per plan, in `socialPlans` order. */
  values: readonly [string, string, string, string];
  /** Marks the row as the headline figure. */
  isPrice?: boolean;
}

export const socialMatrix: readonly SocialFeatureRow[] = [
  { feature: "Posts", values: ["8", "16", "24", "30+"] },
  { feature: "Motion posts", values: ["1", "3", "6", "10"] },
  { feature: "Reels", values: ["2", "4", "8", "12"] },
  { feature: "Stories", values: ["4", "8", "12", "20"] },
  { feature: "Ad creatives", values: ["—", "2", "4", "8"] },
  {
    feature: "Monthly content calendar",
    values: ["Yes", "Yes", "Yes", "Yes"],
  },
  {
    feature: "Copywriting",
    values: ["Basic", "Included", "Included", "Premium"],
  },
  { feature: "Hashtag research", values: ["Yes", "Yes", "Yes", "Yes"] },
  {
    feature: "Analytics & reporting",
    values: ["—", "Monthly", "Bi-weekly", "Weekly"],
  },
  {
    feature: "Dedicated account manager",
    values: ["—", "—", "Yes", "Yes"],
  },
  {
    feature: "Price per month",
    values: ["$1,275", "$2,375", "$3,825", "$5,950"],
    isPrice: true,
  },
] as const;

/** Industry-specific retainers. */
export const industryBundles: readonly Bundle[] = [
  {
    id: "restaurant",
    name: "Restaurant",
    includes: [
      "Menu design — print + digital",
      "20 social posts / month",
      "4 motion posts / month",
      "2 reels / month",
      "Food photography editing — 30 images",
      "Table tent / standee design",
      "Google & delivery-app banner set",
    ],
    price: 2725,
    cadence: "month",
  },
  {
    id: "hotel",
    name: "Hotel",
    includes: [
      "Property photo retouching — 50 images",
      "Room & amenity motion reels — 4",
      "Website banner set",
      "25 social posts / month",
      "Booking promotion ad creatives",
      "Brochure & tariff card design",
    ],
    price: 3400,
    cadence: "month",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    includes: [
      "Property listing graphics — 10 sets",
      "Drone shot editing (add-on)",
      "Real estate video editing — 4 properties",
      "Brochure & floor plan layout",
      "Social post set — 20",
      "Virtual tour motion teaser",
    ],
    price: 3225,
    cadence: "month",
  },
  {
    id: "education",
    name: "Education Institute",
    includes: [
      "Admission campaign creatives",
      "Prospectus / brochure design",
      "20 social posts / month",
      "Event coverage — 1 event / month",
      "Faculty & notice board graphics",
      "Website banner set",
    ],
    price: 2550,
    cadence: "month",
  },
  {
    id: "corporate",
    name: "Corporate",
    includes: [
      "Company profile design",
      "Corporate motion video",
      "30 social posts / month",
      "Annual report layout support",
      "Internal communication graphics",
      "Quarterly brand audit",
    ],
    price: 4675,
    cadence: "month",
  },
  {
    id: "startup",
    name: "Startup",
    includes: [
      "Logo + basic brand identity",
      "Pitch deck design",
      "12 social posts / month",
      "Business card & letterhead",
      "Landing page graphics",
      "1 explainer / promo video",
    ],
    price: 3825,
    cadence: "one-time",
    secondaryPrice: { amount: 1525, cadence: "month", label: "then" },
  },
  {
    id: "festival-campaign",
    name: "Festival Campaign",
    includes: [
      "Festival theme creative set — 10 posts",
      "2 motion posts",
      "1 festival promo reel",
      "Greeting card / e-card design",
      "WhatsApp broadcast creative",
    ],
    price: 1525,
    cadence: "campaign",
  },
  {
    id: "event-coverage",
    name: "Event Coverage",
    includes: [
      "On-site photography — up to 4 hrs",
      "Event highlight video — 2–3 min",
      "20 edited photos",
      "Same-day reel — 1",
      "Full gallery delivery within 48 hrs",
    ],
    price: 1875,
    cadence: "event",
  },
] as const;

/** Cross-discipline monthly combos. */
export const comboBundles: readonly Bundle[] = [
  {
    id: "growth-starter",
    name: "Growth Starter",
    includes: ["20 social posts", "8 motion posts", "10 reels", "2 posters"],
    price: 2975,
    cadence: "month",
  },
  {
    id: "momentum",
    name: "Momentum",
    includes: [
      "30 social posts",
      "15 motion posts",
      "15 reels",
      "1 logo animation",
    ],
    price: 4675,
    cadence: "month",
    featured: true,
  },
  {
    id: "all-access",
    name: "All-Access",
    includes: [
      "Unlimited design support",
      "Priority turnaround",
      "Dedicated creative team",
      "Weekly strategy call",
    ],
    price: 8075,
    cadence: "month",
  },
] as const;

/** Photography and drone capture, with turnaround attached. */
export const captureBundles: readonly {
  group: string;
  rows: readonly {
    name: string;
    deliverable: string;
    turnaround: string;
    price: number;
  }[];
}[] = [
  {
    group: "Photography + editing",
    rows: [
      {
        name: "Photography only",
        deliverable: "Up to 3 hrs on site",
        turnaround: "—",
        price: 1025,
      },
      {
        name: "Photography + basic editing",
        deliverable: "30 images",
        turnaround: "1 day",
        price: 1525,
      },
      {
        name: "Photography + premium editing",
        deliverable: "50 images",
        turnaround: "2 days",
        price: 2375,
      },
    ],
  },
  {
    group: "Drone + editing",
    rows: [
      {
        name: "Drone shoot only",
        deliverable: "Raw footage, up to 1 hr flight",
        turnaround: "—",
        price: 1275,
      },
      {
        name: "Drone + basic editing",
        deliverable: "2–3 min edited video",
        turnaround: "2 days",
        price: 2125,
      },
      {
        name: "Drone + premium editing + colour grade",
        deliverable: "4–5 min cinematic video",
        turnaround: "4 days",
        price: 3225,
      },
    ],
  },
] as const;

/** Commitment discounts. */
export const billingCycles: readonly {
  cycle: string;
  terms: string;
  discount: string;
  discountPct: number;
}[] = [
  {
    cycle: "Monthly",
    terms: "Standard pricing, cancel anytime",
    discount: "—",
    discountPct: 0,
  },
  {
    cycle: "Quarterly",
    terms: "Paid every 3 months",
    discount: "5% off",
    discountPct: 5,
  },
  {
    cycle: "Half-yearly",
    terms: "Paid every 6 months",
    discount: "10% off",
    discountPct: 10,
  },
  {
    cycle: "Annual",
    terms: "Paid every 12 months",
    discount: "18% off",
    discountPct: 18,
  },
] as const;

export const retainerPlans: readonly {
  plan: string;
  commitment: string;
  savings: string;
  bonus: string;
}[] = [
  {
    plan: "Monthly retainer",
    commitment: "Month to month, cancel anytime",
    savings: "As per package",
    bonus: "—",
  },
  {
    plan: "Quarterly retainer",
    commitment: "3-month commitment",
    savings: "5% savings",
    bonus: "1 free motion post",
  },
  {
    plan: "Yearly retainer",
    commitment: "12-month commitment",
    savings: "18% savings + priority support",
    bonus: "3 free motion posts + 1 free explainer video",
  },
] as const;

/** Annual maintenance contracts — ongoing design capacity. */
export const amcPlans: readonly {
  plan: string;
  includes: string;
  turnaround: string;
  price: number;
}[] = [
  {
    plan: "Basic AMC",
    includes: "4 design requests / month",
    turnaround: "48-hour turnaround",
    price: 1700,
  },
  {
    plan: "Standard AMC",
    includes: "8 design requests / month + 2 motion",
    turnaround: "24-hour turnaround",
    price: 3225,
  },
  {
    plan: "Premium AMC",
    includes: "Unlimited requests, dedicated manager",
    turnaround: "Same-day turnaround",
    price: 5950,
  },
] as const;

/** Loyalty, referral and seasonal offers. */
export const offers: readonly { offer: string; benefit: string }[] = [
  { offer: "New client welcome", benefit: "15% off first project" },
  { offer: "Referral", benefit: "10% off for both parties" },
  { offer: "Loyalty — 12+ months", benefit: "12% off renewal" },
  { offer: "Seasonal festive", benefit: "20% off branding packages" },
  { offer: "New year", benefit: "Free social media audit + 10% off" },
  { offer: "Bundle booking", benefit: "Book 3 services, get 1 free add-on" },
] as const;
