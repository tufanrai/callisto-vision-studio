/**
 * Single source of truth for agency facts. Everything here is drawn from the
 * brand proposal in /docs — nothing is invented. Update it in one place and
 * the page copy, structured data, sitemap and metadata all follow.
 */

export const site = {
  name: "Callisto Vision Studio",
  shortName: "Callisto Vision",
  legalName: "Callisto Vision Studio",
  tagline: "Creative Design · Motion · Video · Branding · Digital Marketing",

  /**
   * Canonical origin. Override per-environment with NEXT_PUBLIC_SITE_URL —
   * metadataBase, the sitemap, robots.txt and every JSON-LD @id derive from it.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://callistovisionstudio.com",

  description:
    "Callisto Vision Studio is a full-service creative and digital marketing agency. Graphic design, branding, motion graphics, video editing and social media — designers, editors and strategists under one roof, with a written scope and a fixed quote before any project starts.",

  founder: {
    name: "Tek Raj Awasthi",
    role: "Founder & Chief Executive",
  },

  contact: {
    email: "hirendraawasthi1@gmail.com",
    phoneDisplay: "+977 976 856 7011",
    phoneE164: "+9779768567011",
    whatsapp: "9779768567011",
    address: {
      street: "Mid-Baneshwor",
      locality: "Kathmandu",
      country: "NP",
      countryName: "Nepal",
    },
  },

  /** Markets the studio explicitly supports, with time-zone overlap. */
  markets: [
    { code: "UK", label: "United Kingdom", tz: "Europe/London" },
    { code: "AU", label: "Australia", tz: "Australia/Sydney" },
    { code: "AE", label: "United Arab Emirates", tz: "Asia/Dubai" },
  ],

  stats: {
    projects: "70+",
    experienceYears: "2+",
    marketsServed: 3,
    fastestDelivery: "1 hour",
  },

  mission:
    "To empower businesses with design and marketing that drives real, measurable growth.",
  vision:
    "To become a trusted creative partner across the UK, Australia and the UAE — known for reliability and results.",

  /** Currency every quote and invoice is issued in. */
  currency: "USD",
} as const;

export type Market = (typeof site.markets)[number];

/** Primary navigation — real routes, so these use next/link. */
export const nav = [
  { href: "/our-services", label: "Services" },
  { href: "/projects", label: "Work" },
  { href: "/about-us", label: "About" },
] as const;

/** Every indexable route, used by the sitemap and the footer. */
export const routes = [
  { path: "/", label: "Home", priority: 1, changeFrequency: "monthly" },
  {
    path: "/our-services",
    label: "Services",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/projects",
    label: "Work",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/about-us",
    label: "About",
    priority: 0.7,
    changeFrequency: "yearly",
  },
  {
    path: "/contact-us",
    label: "Contact",
    priority: 0.8,
    changeFrequency: "yearly",
  },
  {
    path: "/privacy",
    label: "Privacy Policy",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  {
    path: "/terms",
    label: "Terms of Service",
    priority: 0.3,
    changeFrequency: "yearly",
  },
] as const;

export const whatsappHref = `https://wa.me/${site.contact.whatsapp}`;
export const mailtoHref = `mailto:${site.contact.email}`;
export const telHref = `tel:${site.contact.phoneE164}`;
