# Callisto Vision Studio

Marketing site for Callisto Vision Studio — a creative and digital marketing
agency in Kathmandu working with clients across the UK, Australia and the UAE.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 and
GSAP. Five routes: `/`, `/our-services`, `/projects`, `/about-us`,
`/contact-us`.

## Getting started

```bash
npm install
cp .env.example .env.local     # then fill in the values you need
npm run dev                    # http://localhost:3000
```

## Scripts

| Script              | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Dev server with Turbopack                                  |
| `npm run build`     | Production build                                           |
| `npm start`         | Serve the production build                                 |
| `npm run lint`      | ESLint (flat config, `eslint-config-next` 16)              |
| `npm run typecheck` | `tsc --noEmit`                                             |
| `npm run contrast`  | Verifies every colour pair against WCAG AA; exits non-zero on failure |

Verification tooling under `scripts/` (needs a production build running):

```bash
npm run build && PORT=3100 npm start &

node scripts/seo-audit.mjs    http://localhost:3100   # Lighthouse, fails under SEO 100
node scripts/smoke.mjs        http://localhost:3100   # interaction + console-error checks
node scripts/audit-layout.mjs http://localhost:3100 390  # overflow / section geometry
node scripts/shot.mjs url     http://localhost:3100 out.png 1440 900
```

## Design system

Implements the Pomelli brand book (`docs/callisto_vision_studio_brand_book_by_pomelli.pdf`)
in a **structured-modernism** direction: Twilight Blue as the dominant field,
Doe Brown as the single decisive accent, heavy Playfair at display scale.

**Colour.** Tokens live in the `@theme` block of `app/globals.css`. The brand
book's four colours are used exactly. Two derived variants exist because Doe
Brown at its brand value is 4.28:1 on Twilight and 2.33:1 on Snow — fine as a
fill or at display size, short of AA for body text:

| Token | Use |
| --- | --- |
| `doe` `#C5A059` | fills, rules, display-size numerals |
| `doe-light` `#CAA868` | 12px labels on Twilight (4.66:1) |
| `doe-deep` `#8C6D31` | text on Snow / White (4.58:1) |

`twilight-deep`, `twilight-raised`, `ink`, `ink-muted`, `mist`, `edge-*` and
`rule-*` are likewise derived to make the four brand colours usable at AA.
`npm run contrast` enforces every pair and exits non-zero on failure — add any
new pair to `scripts/check-contrast.mjs`.

**Type.** Playfair Display (primary) and Montserrat (secondary), per the brand
book. Playfair has a weight axis but no optical size, so hierarchy is carried
by weight and scale: `h1` at 800, `h2`/`h3` at 700, and the `.label` class
(Montserrat 700, 0.2em tracking, 12px floor) for every eyebrow and table
header. The 12px floor is deliberate — Lighthouse's SEO pass flags smaller.

**Structure.** `.brand-rule` is the wordmark's underline rebuilt as a 2px bar
terminating in a Doe dot. The orbital tier diagram
(`components/ui/OrbitDiagram.tsx`) is the signature element: ring order
encodes delivery speed, and its dashed/solid/Doe ring vocabulary reappears as
the tier keys in the price tables.

## Motion

GSAP with ScrollTrigger, SplitText and DrawSVG (`components/motion/`).

- `Animate` / `AnimateGroup` — scroll reveals, single and staggered
- `SplitHeading` — masked line-by-line heading reveal
- `Counter` — figures counting up
- `Marquee` — the seamless service band

Three rules the whole layer depends on, each learned the hard way:

1. **ScrollTrigger fires tweens, it never owns them.** When a ScrollTrigger
   owns a `fromTo`, every refresh re-renders that tween at the trigger's
   current progress — scroll back above the start and the element resets to
   its hidden state and vanishes. Everything here uses `gsap.set()` for the
   from-state plus a detached `gsap.to()` fired from `onEnter` with `once`.
2. **Reveals start at `top bottom-=40`, not a percentage.** For elements in
   the final viewport-height of a document, the page runs out of scroll before
   their top ever reaches something like `top 82%`, so a percentage start
   never fires and they stay hidden permanently.
3. **A grid is one staggered reveal, not N independent triggers.** Siblings
   sharing a start position do not all fire reliably.

Only above-the-fold elements are hidden pre-paint by CSS (`[data-anim-hero]`),
because server HTML paints before React hydrates. Below the fold GSAP applies
the from-state in a layout effect, before anything is on screen. The inline
bootstrap in `app/layout.tsx` also arms a 4-second failsafe that `MotionProvider`
clears on mount — if the bundle fails or JS is off, everything becomes visible
rather than being stranded at opacity 0.

All motion is wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`,
so reduced-motion users get the page with no animation at all.


## Content

All copy and every figure lives in `lib/`, not in components:

- `lib/site.ts` — agency facts, contact details, navigation
- `lib/content/tiers.ts` — Basic / Standard / Premium, with delivery and revisions
- `lib/content/services.ts` — the five service divisions
- `lib/content/pricing.ts` — all 80 published line items, plus rate card and add-ons
- `lib/content/packages.ts` — bundles, retainers, AMC plans, offers
- `lib/content/process.ts` — the nine delivery stages and policies
- `lib/content/faq.ts` — FAQs, also serialised into FAQPage structured data

Everything is transcribed from `docs/International Report.pdf`. Change a price
in one place and the tables, the "from" lines, the hero counters and the
JSON-LD offer catalogue all follow.

## SEO

All five routes score **100 SEO, 100 accessibility, 100 best practices** on
Lighthouse mobile (performance 91–93). Re-check any route with
`node scripts/seo-audit.mjs http://localhost:3100/<route>`.

- Root metadata, Open Graph and Twitter cards in `app/layout.tsx`; per-route
  `title`, `description` and `canonical` in each `page.tsx`
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`
- JSON-LD in `lib/seo.ts` — `ProfessionalService` with a full `OfferCatalog`
  built from the price list, plus `WebSite` and `FAQPage`, emitted as one
  `@graph` so nodes cross-reference by `@id`
- Every price table panel is server-rendered and only toggled with `hidden`, so
  all 80 line items are in the initial HTML and crawlable

Set `NEXT_PUBLIC_SITE_URL` before deploying — canonical URLs, the sitemap and
every structured-data `@id` derive from it.

## Brand assets

`public/wordmark.svg` and `components/brand/wordmark-path.ts` are vector traces
of the supplied `docs/callisto.png`, recolourable via `currentColor`. The
crescent in `components/brand/Wordmark.tsx` is not traced but *fitted* — it is
a disc minus a larger offset disc, solved against the logo to under 1.5px RMS
error, which is why it is a few hundred bytes rather than a few kilobytes. Its
thickened variant exists because the true crescent thins out below ~32px.

Icons (`app/icon.svg`, `app/apple-icon.png`, `public/icon-*.png`) are generated
from the same geometry.

## Contact form

`POST /api/contact` validates, rate-limits per instance, and includes a
honeypot. Delivery goes through Resend when `RESEND_API_KEY` is set; when it is
not, the endpoint returns 503 with a message pointing at the studio email
rather than reporting a false success. The email and WhatsApp links are always
visible next to the form, so the form is never the only route in.

For production, add a real rate limiter at the edge — the in-process one only
blunts casual abuse and does not survive across serverless instances.

## Work page and case studies

`/projects` is built from real published scopes — the exact monthly
deliverables and figures for each sector — because the proposal contains no
case studies, client names, testimonials or project imagery. None of those
were invented. `CaseStudySlot` in `components/sections/WorkShowcase.tsx` is a
deliberate, designed empty state; replace it once real project assets and
client permission exist.
