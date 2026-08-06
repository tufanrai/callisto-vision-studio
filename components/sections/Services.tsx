import Link from "next/link";
import { Animate, AnimateGroup } from "@/components/motion/Animate";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillLink } from "@/components/ui/Pill";
import { servicePillars } from "@/lib/content/services";

/**
 * The five disciplines as full-bleed rows. Each row wipes up to the ink ground
 * on hover, which is the whole interaction — no icons, no cards.
 *
 * The blurbs are written for this row rather than reusing the pillar's
 * catalogue `blurb`, because at this width the line has to carry the scale of
 * the offer ("30 deliverables") rather than describe it.
 */
const rowBlurb: Record<string, string> = {
  "graphic-design":
    "Social sets, print, packaging and decks. 30 deliverables, one visual language.",
  branding:
    "Logo systems, identities and guidelines built to survive a decade of use.",
  "motion-graphics":
    "Logo animation, explainers and kinetic type, engineered for the feed.",
  "video-editing":
    "Reels, long-form, podcasts and commercials, with grade and sound design.",
  "digital-marketing":
    "Social management, content calendars, ad creative and campaign design.",
};

export function Services() {
  return (
    <section id="services" className="on-light bg-pure pt-[clamp(4.5rem,8vw,8.125rem)]">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6 pb-[clamp(2.5rem,5vw,4.5rem)]">
          <div className="flex-[1_1_min(100%,33.75rem)]">
            <Animate variant="rise-sm">
              <Eyebrow tone="light" className="mb-5.5">
                What we do
              </Eyebrow>
            </Animate>
            <SplitHeading className="text-[clamp(2.125rem,4.6vw,4.75rem)]">
              Five disciplines.
              <br />
              One accountable team.
            </SplitHeading>
          </div>
          <Animate variant="rise-sm" delay={0.15}>
            <PillLink href="/our-services" variant="outline" className="py-4 px-7">
              All services &amp; pricing
            </PillLink>
          </Animate>
        </div>
      </div>

      <AnimateGroup variant="rise-sm" stagger={0.06} className="border-t border-twilight/14">
        {servicePillars.map((pillar, i) => (
          <Link
            key={pillar.id}
            href={`/our-services#${pillar.id}`}
            className="row-wipe group block border-b border-twilight/14 bg-pure text-twilight transition-colors duration-[550ms] ease-brand hover:text-snow"
          >
            <div className="shell flex flex-wrap items-center gap-x-[clamp(1.5rem,3vw,3.5rem)] gap-y-5 py-[clamp(1.625rem,2.6vw,2.5rem)]">
              <span
                aria-hidden="true"
                className="tabular w-8.5 shrink-0 font-display text-sm tracking-[0.1em] opacity-55 transition-opacity duration-500 group-hover:opacity-100"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="flex-[1_1_min(100%,18.75rem)] text-[clamp(1.625rem,3.4vw,3.375rem)] leading-[1.05] tracking-[-0.025em] text-inherit transition-transform duration-[600ms] ease-brand motion-safe:group-hover:translate-x-2">
                {pillar.name}
              </h3>
              <p className="max-w-[38ch] flex-[1_1_min(100%,17.5rem)] text-[13px] leading-[1.8] font-light text-balance opacity-70">
                {rowBlurb[pillar.id] ?? pillar.blurb}
              </p>
              <span
                aria-hidden="true"
                className="inline-flex size-11.5 shrink-0 items-center justify-center rounded-full border border-current text-[15px] opacity-50 transition-[transform,opacity,background-color,color] duration-500 ease-brand group-hover:bg-doe group-hover:text-ink-deep group-hover:opacity-100 motion-safe:group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </div>
          </Link>
        ))}
      </AnimateGroup>
    </section>
  );
}
