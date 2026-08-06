/**
 * The five service pillars, verbatim from the proposal's "Our Services".
 * `blurb` and `role` are written for the web — the proposal only lists
 * deliverables, and a bare list of 30 nouns is not a value proposition.
 */

export interface ServicePillar {
  id: string;
  /** Plate number — these are catalogue divisions, not a sequence. */
  ref: string;
  name: string;
  role: string;
  blurb: string;
  deliverables: readonly string[];
  /** Cheapest published price in this pillar, for the "from" line. */
  fromPrice: number;
}

export const servicePillars: readonly ServicePillar[] = [
  {
    id: "graphic-design",
    ref: "A",
    name: "Graphic Design",
    role: "Everything flat, printed or posted",
    blurb:
      "The day-to-day output that keeps a brand visible, all drawn from one system.",
    deliverables: [
      "Social Media Post",
      "Carousel Post",
      "Story Design",
      "Facebook Banner",
      "LinkedIn Banner",
      "YouTube Thumbnail",
      "YouTube Banner",
      "Instagram Highlight Cover",
      "Poster",
      "Flyer",
      "Brochure",
      "Menu Design",
      "Roll-up Banner",
      "Billboard",
      "Packaging Design",
      "Label Design",
      "Business Card",
      "Letterhead",
      "Company Profile",
      "Presentation Design",
      "Magazine Design",
      "Book Cover",
      "Product Mockup",
      "Photo Editing",
      "Background Removal",
      "Image Retouching",
      "AI Image Generation",
      "Restaurant Menu",
      "Price List",
      "Event Graphics",
    ],
    fromPrice: 15,
  },
  {
    id: "branding",
    ref: "B",
    name: "Branding",
    role: "The system everything is built from",
    blurb:
      "Identity documented well enough that the tenth designer decides like the first.",
    deliverables: [
      "Logo Design",
      "Brand Identity",
      "Brand Guidelines",
      "Colour Palette",
      "Typography",
      "Stationery",
      "Merchandise",
      "Brand Kit",
    ],
    fromPrice: 130,
  },
  {
    id: "motion-graphics",
    ref: "C",
    name: "Motion Graphics",
    role: "Static work, set moving",
    blurb:
      "Logo stings, explainers and product animation, built for the first two seconds.",
    deliverables: [
      "Logo Animation",
      "Social Media Motion Post",
      "Promo Video",
      "Product Animation",
      "Explainer Video",
      "Kinetic Typography",
      "Infographic Animation",
      "GIF Animation",
      "Event Promo",
      "Restaurant Promo",
      "Corporate Motion Video",
      "Reels Motion Design",
    ],
    fromPrice: 170,
  },
  {
    id: "video-editing",
    ref: "D",
    name: "Video Editing",
    role: "Footage in, finished cut out",
    blurb:
      "Long and short form, with grading, sound and captions in the same pass.",
    deliverables: [
      "Instagram Reel",
      "Facebook Reel",
      "TikTok Video",
      "YouTube Shorts",
      "YouTube Long-form",
      "Podcast Editing",
      "Vlog Editing",
      "Documentary Editing",
      "Commercial Advertisement",
      "Interview Editing",
      "Event Highlight",
      "Wedding Highlight",
      "Real Estate Video",
      "Food Promo",
      "Colour Grading",
      "Sound Design",
      "Subtitles",
      "Thumbnail",
    ],
    fromPrice: 40,
  },
  {
    id: "digital-marketing",
    ref: "E",
    /**
     * The proposal heads this division "Digital Marketing Design". Shortened
     * here because the pillar name is the label on the nav chips, the pricing
     * filter and the service rows, and the trailing "Design" made it the only
     * one of the five that wrapped — and disagreed with the footer, the
     * ticker and its own price table, all of which say "Digital Marketing".
     */
    name: "Digital Marketing",
    role: "The calendar behind the output",
    blurb:
      "Calendars, planning and ad creative, managed month to month.",
    deliverables: [
      "Social Media Management",
      "Content Planning",
      "Monthly Content Calendar",
      "Ad Creative",
      "Campaign Design",
    ],
    fromPrice: 170,
  },
] as const;

/** Industries named in the proposal, with the package that maps to each. */
export const industries: readonly {
  name: string;
  note: string;
  packageId?: string;
}[] = [
  {
    name: "Corporate & Professional Services",
    note: "Profiles, reports, internal comms",
    packageId: "corporate",
  },
  {
    name: "Hotels & Hospitality",
    note: "Property retouching, tariff cards, reels",
    packageId: "hotel",
  },
  {
    name: "Real Estate & Construction",
    note: "Listing graphics, floor plans, walkthroughs",
    packageId: "real-estate",
  },
  {
    name: "Educational Institutions",
    note: "Admission campaigns, prospectus, events",
    packageId: "education",
  },
  {
    name: "Startups & E-commerce",
    note: "Identity, pitch decks, launch assets",
    packageId: "startup",
  },
  {
    name: "Events & Entertainment",
    note: "Promo reels, coverage, same-day edits",
    packageId: "event-coverage",
  },
] as const;

/** "Why Choose Us", verbatim from the proposal. */
export const whyChooseUs: readonly string[] = [
  "Dedicated team of designers, editors and strategists under one roof",
  "Fast turnaround without compromising on quality",
  "Transparent pricing with no hidden costs",
  "Flexible packages for freelancer-level to enterprise-level budgets",
  "Proven experience across diverse industries",
  "Unlimited revision options on premium tiers",
  "Dedicated international account support across UK, AUS and UAE time zones",
  "Invoicing in USD with international payment options",
] as const;

/** "Why Clients Stay With Us", verbatim from the proposal. */
export const whyClientsStay: readonly string[] = [
  "Consistent quality across every project, big or small",
  "A single point of contact for smooth communication",
  "Transparent pricing and honest timelines",
  "Proactive creative suggestions, not just execution",
  "Long-term brand understanding that improves with every project",
  "Flexible packages that scale with your business",
] as const;
