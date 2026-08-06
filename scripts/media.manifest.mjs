/**
 * The bridge between the studio's raw masters in `assets/` and the web-ready
 * files the site actually serves from `public/media/`.
 *
 * `assets/` holds 4K camera originals and print-resolution artwork — 2.8 GB of
 * it — and none of that can go near a page. This file names which masters the
 * site uses, what each becomes, and where. `npm run media` reads it and
 * regenerates `public/media/` from scratch; nothing in `assets/` is ever
 * written to or moved.
 *
 * To publish a new piece: add a row here, run `npm run media`, then reference
 * the slug from lib/content/portfolio.ts.
 *
 * VIDEO ROWS
 *   `at` is where the loop starts, in seconds. Pick a moment that reads
 *   without context — the grid shows an 8-second excerpt with no sound, so a
 *   title card or a mid-sentence cut to a talking head is wasted. The full
 *   reel is always encoded from the top regardless.
 */

/** Images: master → slug. Everything is capped and re-encoded. */
export const images = [
  // --- Liberty College -----------------------------------------------------
  ["Static Post/College/Liberty/liberty college.jpg", "liberty-republic-day"],
  ["Static Post/College/Liberty/ADMISSION open.jpg", "liberty-admissions"],
  ["Static Post/College/Liberty/liberty college (1).jpg", "liberty-post-1"],
  ["Static Post/College/Liberty/liberty college (2).jpg", "liberty-post-2"],
  ["Static Post/College/Liberty/liberty college (3).jpg", "liberty-post-3"],
  ["Static Post/College/Liberty/6x4ft standee.jpg", "liberty-standee"],
  ["Static Post/College/Liberty/#Freedom2Grow.jpg", "liberty-freedom-to-grow"],
  ["Static Post/College/Liberty/1.jpg", "liberty-campaign-1"],
  ["Static Post/College/Liberty/2.jpg", "liberty-campaign-2"],
  ["Static Post/College/Liberty/3.jpg", "liberty-campaign-3"],

  // --- Prime Institute -----------------------------------------------------
  [
    "Static Post/College/Prime/Prime Institute of Hotel Management and Engineering Training Pvt. Ltd..jpg",
    "prime-perfect-plate",
  ],
  [
    "Static Post/College/Prime/Prime Institute of Hotel Management and Engineering Training Pvt. Ltd. (1).jpg",
    "prime-post-1",
  ],
  [
    "Static Post/College/Prime/Prime Institute of Hotel Management and Engineering Training Pvt. Ltd. (2).jpg",
    "prime-post-2",
  ],
  [
    "Static Post/College/Prime/Prime Institute of Hotel Management and Engineering Training Pvt. Ltd. (3).jpg",
    "prime-post-3",
  ],
  [
    "Static Post/College/Prime/Prime Institute of Hotel Management and Engineering Training Pvt. Ltd. (4).jpg",
    "prime-post-4",
  ],
  [
    "Static Post/College/Prime/Prime Institute of Hotel Management and Engineering Training Pvt. Ltd. (5).jpg",
    "prime-post-5",
  ],

  // --- TechX ---------------------------------------------------------------
  ["Static Post/College/TECHX/learning.jpg", "techx-fathers-day"],
  ["Static Post/College/TECHX/Certificate .jpg", "techx-certificate"],

  // --- Rotaract ------------------------------------------------------------
  ["Static Post/College/ROTRACT/Rotaract.jpg", "rotaract-post-1"],
  ["Static Post/College/ROTRACT/HOST  RAC LIBERTY.jpg", "rotaract-host"],
  ["Static Post/College/ROTRACT/Rotaract (2).jpg", "rotaract-post-2"],
  ["Static Post/College/ROTRACT/Rotaract (4).jpg", "rotaract-post-3"],
  ["Static Post/College/ROTRACT/Rotaract (6).jpg", "rotaract-post-4"],
  ["Static Post/College/ROTRACT/Rotaract (9).jpg", "rotaract-post-5"],
  ["Static Post/College/ROTRACT/Rotaract3.jpg", "rotaract-post-6"],

  // --- Ample International Education ---------------------------------------
  [
    "Static Post/Consultancy/Ample/Ample International Education.jpg",
    "ample-new-year",
  ],
  [
    "Static Post/Consultancy/Ample/Ample International Education (1).jpg",
    "ample-post-1",
  ],

  // --- Dreamlink -----------------------------------------------------------
  [
    "Static Post/Consultancy/Dreamlink/710781875_1310166547896134_7293327414864977823_n.jpg",
    "dreamlink-post-1",
  ],
  [
    "Static Post/Consultancy/Dreamlink/684295087_1281787150734074_2384498559030131116_n.jpg",
    "dreamlink-post-2",
  ],
  [
    "Static Post/Consultancy/Dreamlink/682712332_1281876740725115_6274294449113091219_n.jpg",
    "dreamlink-post-3",
  ],
  [
    "Static Post/Consultancy/Dreamlink/718854804_1317909873788468_3313624365469427875_n.jpg",
    "dreamlink-post-4",
  ],
  [
    "Static Post/Consultancy/Dreamlink/718362164_1317064880539634_8154569254115570033_n.jpg",
    "dreamlink-post-5",
  ],
];

/** Videos: master → slug, with the in-point for the silent grid loop. */
export const videos = [
  // --- Product -------------------------------------------------------------
  { src: "video editing /Product/Melodica.mp4", slug: "melodica", at: 6 },
  { src: "video editing /Product/Shocks.mp4", slug: "shocks", at: 5 },
  { src: "video editing /Product/Gloss 2,1.mp4", slug: "gloss-launch", at: 4 },
  {
    src: "video editing /Product/gloss Parents.mp4",
    slug: "gloss-parents",
    at: 3,
  },
  { src: "video editing /Product/IMG_9818.mp4", slug: "product-macro", at: 2 },

  // --- Motion graphics -----------------------------------------------------
  {
    src: "video editing /Motion Graphic/7 money lesson.mp4",
    slug: "money-lessons",
    at: 5,
  },
  {
    src: "video editing /Motion Graphic/ugc-video (2)_2.mp4",
    slug: "ugc-spot",
    at: 3,
  },
  {
    src: "video editing /Motion Graphic/binit dai.mp4",
    slug: "creator-feature",
    at: 12,
  },

  // --- Test prep -----------------------------------------------------------
  { src: "video editing /Sat/Sat exam.mp4", slug: "sat-exam", at: 8 },
  {
    src: "video editing /Sat/Our Student sat.mp4",
    slug: "sat-student-result",
    at: 4,
  },

  // --- Consultancy ---------------------------------------------------------
  {
    src: "video editing /Consultancy/Riona mam Duolungo .mp4",
    slug: "consultancy-duolingo",
    at: 6,
  },
  {
    src: "video editing /Consultancy/12 students.mp4",
    slug: "consultancy-cohort",
    at: 8,
  },
  {
    src: "video editing /Consultancy/things know before apply usa.mp4",
    slug: "consultancy-usa-guide",
    at: 5,
  },

  // --- Education, square social cuts ---------------------------------------
  {
    src: "Static Post/College/Liberty/liberty college.mp4",
    slug: "liberty-reel",
    at: 2,
  },
  {
    src: "Static Post/College/Horizon Technology/Horizon Technology.mp4",
    slug: "horizon-reel",
    at: 1,
  },
];
