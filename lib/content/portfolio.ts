/**
 * The studio's actual work.
 *
 * Every entry here corresponds to a real client and real files under
 * `public/media/`, generated from the masters in `assets/` by
 * `npm run media` (see scripts/media.manifest.mjs). Nothing in this file is
 * illustrative: if a project is listed, the imagery beside it is that
 * project's own.
 *
 * Slots that have no artwork yet carry a `hint` instead, which the frame
 * renders as a designed pending state. Adding a picture is a one-line change
 * here rather than an edit to a section component.
 */

const IMG = "/media/img";

export interface Slot {
  id: string;
  hint: string;
  src?: string;
  /** Required whenever `src` is set. */
  alt?: string;
}

/** The five-frame rail that closes the home hero. */
export const heroRail: readonly Slot[] = [
  {
    id: "home-rail-1",
    hint: "Brand identity shot",
    src: `${IMG}/liberty-republic-day.jpg`,
    alt: "Republic Day social post designed for Liberty College",
  },
  {
    id: "home-rail-2",
    hint: "Campaign graphic",
    src: `${IMG}/prime-perfect-plate.jpg`,
    alt: "Culinary breakdown post for Prime Institute of Hotel Management",
  },
  {
    id: "home-rail-3",
    hint: "Consultancy campaign",
    src: `${IMG}/ample-new-year.jpg`,
    alt: "New Year campaign post for Ample International Education",
  },
  {
    id: "home-rail-4",
    hint: "Event graphics",
    src: `${IMG}/rotaract-host.jpg`,
    alt: "Host announcement graphic for Rotaract Club",
  },
  {
    id: "home-rail-5",
    hint: "Social campaign grid",
    src: `${IMG}/techx-fathers-day.jpg`,
    alt: "Father's Day social post designed for TechX",
  },
];

/**
 * A project in the index.
 *
 * `video` names a slug under /media/video; when set, the frame plays the
 * silent loop and offers the full reel. `src` is the still alternative.
 */
export type Discipline =
  | "branding"
  | "graphic"
  | "motion"
  | "video"
  | "marketing";

export interface Project extends Slot {
  title: string;
  sector: string;
  region: string;
  year: string;
  tags: readonly string[];
  keys: readonly Discipline[];
  note: string;
  /** Slug under /media/video, for the work that moves. */
  video?: string;
}

export const projectIndex: readonly Project[] = [
  {
    id: "liberty-college",
    hint: "Liberty College campaign",
    src: `${IMG}/liberty-admissions.jpg`,
    alt: "Admissions campaign graphic for Liberty College",
    title: "Liberty College",
    sector: "Education",
    region: "Kathmandu",
    year: "2025",
    tags: ["Graphic Design", "Motion"],
    keys: ["graphic", "motion"],
    note: "Admissions campaign, occasion posts and the #Freedom2Grow identity, across a full academic year.",
  },
  {
    id: "liberty-reel",
    hint: "Liberty College reel",
    video: "liberty-reel",
    title: "Liberty College — Reels",
    sector: "Education",
    region: "Kathmandu",
    year: "2025",
    tags: ["Motion", "Video"],
    keys: ["motion", "video"],
    note: "Square motion cuts from the same campaign system, sized for the feed.",
  },
  {
    id: "prime-institute",
    hint: "Prime Institute posts",
    src: `${IMG}/prime-perfect-plate.jpg`,
    alt: "Plating breakdown post for Prime Institute of Hotel Management",
    title: "Prime Institute of Hotel Management",
    sector: "Education",
    region: "Tinkune, Kathmandu",
    year: "2025",
    tags: ["Graphic Design"],
    keys: ["graphic"],
    note: "Plating breakdowns, technique explainers and course promotion for a hospitality institute.",
  },
  {
    id: "techx",
    hint: "TechX social set",
    src: `${IMG}/techx-fathers-day.jpg`,
    alt: "Father's Day social post designed for TechX",
    title: "TechX",
    sector: "Education · Technology",
    region: "Kathmandu",
    year: "2025",
    tags: ["Graphic Design"],
    keys: ["graphic"],
    note: "Occasion posts and certification announcements, held to the parent college's language.",
  },
  {
    id: "rotaract",
    hint: "Rotaract event graphics",
    src: `${IMG}/rotaract-host.jpg`,
    alt: "Host announcement graphic for Rotaract Club",
    title: "Rotaract Club",
    sector: "Community · Events",
    region: "Kathmandu",
    year: "2025",
    tags: ["Graphic Design", "Events"],
    keys: ["graphic", "marketing"],
    note: "A thirteen-piece set of host announcements, ceremonies and project graphics.",
  },
  {
    id: "horizon-technology",
    hint: "Horizon Technology reel",
    video: "horizon-reel",
    title: "Horizon Technology",
    sector: "Education · Technology",
    region: "Kathmandu",
    year: "2025",
    tags: ["Motion Graphics"],
    keys: ["motion"],
    note: "A square motion post that animates the identity rather than sliding a layout.",
  },
  {
    id: "ample",
    hint: "Ample International Education",
    src: `${IMG}/ample-new-year.jpg`,
    alt: "New Year campaign post for Ample International Education",
    title: "Ample International Education",
    sector: "Consultancy",
    region: "Putalisadak, Kathmandu",
    year: "2026",
    tags: ["Graphic Design", "Digital Marketing"],
    keys: ["graphic", "marketing"],
    note: "Campaign creative for a consultancy placing students across four countries.",
  },
  {
    id: "dreamlink",
    hint: "Dreamlink campaign",
    src: `${IMG}/dreamlink-post-1.jpg`,
    alt: "Campaign post designed for Dreamlink",
    title: "Dreamlink",
    sector: "Consultancy",
    region: "Kathmandu",
    year: "2026",
    tags: ["Graphic Design", "Digital Marketing"],
    keys: ["graphic", "marketing"],
    note: "Announcements, results and intake campaigns on a monthly calendar.",
  },
  {
    id: "consultancy-films",
    hint: "Consultancy film series",
    video: "consultancy-duolingo",
    title: "Consultancy Film Series",
    sector: "Consultancy",
    region: "Kathmandu",
    year: "2026",
    tags: ["Video Editing", "Subtitles"],
    keys: ["video"],
    note: "Counsellor-led explainers, cut for retention and captioned throughout.",
  },
  {
    id: "sat-prep",
    hint: "SAT results series",
    video: "sat-student-result",
    title: "SAT Preparation",
    sector: "Education",
    region: "Kathmandu",
    year: "2026",
    tags: ["Video Editing"],
    keys: ["video"],
    note: "Result announcements and exam-day films, cut from 4K into vertical and square.",
  },
  {
    id: "gloss",
    hint: "Gloss product films",
    video: "gloss-launch",
    title: "Gloss",
    sector: "Product · Retail",
    region: "Kathmandu",
    year: "2026",
    tags: ["Video Editing", "Colour"],
    keys: ["video"],
    note: "Launch films, event coverage and a parents' campaign, graded as one set.",
  },
  {
    id: "motion-graphics",
    hint: "Motion graphics reel",
    video: "money-lessons",
    title: "Motion Graphics",
    sector: "Creator · Brand",
    region: "Kathmandu",
    year: "2026",
    tags: ["Motion Graphics", "Kinetic Type"],
    keys: ["motion", "video"],
    note: "Kinetic typography, UGC cuts and creator features — where the edit is the design.",
  },
];

/** Filter keys for the work index — the five disciplines, plus "all". */
export const disciplineFilters: readonly {
  key: Discipline | "all";
  label: string;
}[] = [
  { key: "all", label: "All projects" },
  { key: "graphic", label: "Graphic Design" },
  { key: "motion", label: "Motion Graphics" },
  { key: "video", label: "Video Editing" },
  { key: "marketing", label: "Digital Marketing" },
  { key: "branding", label: "Branding" },
];

/**
 * Distinct sectors represented in the index, derived rather than declared.
 *
 * The figure appears as a headline stat on three pages. Counting it from the
 * projects means adding or removing one cannot leave a number on the site
 * that the work below it no longer supports.
 */
export const sectorsRepresented = new Set(
  projectIndex.flatMap((p) => p.sector.split("·").map((s) => s.trim())),
).size;

/** The clients named across the top of the work index. */
export const clients: readonly string[] = [
  "Liberty College",
  "Prime Institute",
  "TechX",
  "Rotaract Club",
  "Horizon Technology",
  "Ample International Education",
  "Dreamlink",
  "Gloss",
];

/** Three projects pulled onto the home page, at deliberately unequal widths. */
export const featuredWork: readonly (Project & {
  basis: string;
  ratio: string;
})[] = [
  {
    ...projectIndex.find((p) => p.id === "liberty-college")!,
    basis: "58%",
    ratio: "4 / 3",
  },
  {
    ...projectIndex.find((p) => p.id === "gloss")!,
    basis: "34%",
    ratio: "4 / 5",
  },
  {
    ...projectIndex.find((p) => p.id === "consultancy-films")!,
    basis: "100%",
    ratio: "21 / 9",
  },
];

/** One representative piece per service pillar, for the catalogue blocks. */
export const pillarShowcase: Record<string, Slot & { video?: string }> = {
  "graphic-design": {
    id: "showcase-graphic",
    hint: "Graphic design showcase",
    src: `${IMG}/liberty-standee.jpg`,
    alt: "6×4ft standee designed for Liberty College",
  },
  branding: {
    id: "showcase-branding",
    hint: "Brand identity showcase",
    src: `${IMG}/liberty-freedom-to-grow.jpg`,
    alt: "#Freedom2Grow campaign identity for Liberty College",
  },
  "motion-graphics": {
    id: "showcase-motion",
    hint: "Motion graphics frame",
    video: "horizon-reel",
  },
  "video-editing": {
    id: "showcase-video",
    hint: "Video edit still",
    video: "shocks",
  },
  "digital-marketing": {
    id: "showcase-marketing",
    hint: "Campaign showcase",
    src: `${IMG}/dreamlink-post-2.jpg`,
    alt: "Campaign post from the Dreamlink monthly content calendar",
  },
};

export interface TeamMember extends Slot {
  name: string;
  role: string;
}

export const team: readonly TeamMember[] = [
  {
    id: "about-team-1",
    hint: "Portrait — CEO",
    name: "Tek Raj Awasthi",
    role: "Founder & CEO",
  },
  {
    id: "about-team-2",
    hint: "Portrait — design lead",
    name: "Design Lead",
    role: "Graphic design & branding",
  },
  {
    id: "about-team-3",
    hint: "Portrait — motion artist",
    name: "Motion Artist",
    role: "Motion graphics",
  },
  {
    id: "about-team-4",
    hint: "Portrait — video editor",
    name: "Video Editor",
    role: "Video & colour",
  },
  {
    id: "about-team-5",
    hint: "Portrait — strategist",
    name: "Brand Strategist",
    role: "Strategy & accounts",
  },
];
