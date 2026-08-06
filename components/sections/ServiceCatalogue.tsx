import Link from "next/link";
import { Animate, AnimateGroup } from "@/components/motion/Animate";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { pillarShowcase } from "@/lib/content/portfolio";
import { servicePillars } from "@/lib/content/services";

/**
 * The five disciplines in full: a jump nav that sticks under the header, then
 * one block per discipline with its complete deliverable list.
 *
 * The deliverable lists are the point of this page — a client arrives asking
 * "do you do X", and the answer has to be visible without a click. So they
 * are set as a plain multi-column list rather than hidden behind an
 * accordion.
 */
const SLOT_HINT: Record<string, string> = {
  "graphic-design": "Graphic design showcase",
  branding: "Brand identity showcase",
  "motion-graphics": "Motion graphics frame",
  "video-editing": "Video edit still",
  "digital-marketing": "Campaign showcase",
};

export function ServiceCatalogue() {
  return (
    <>
      {/*
        Sticks directly beneath the header, and follows it: --header-offset is
        the header's height normally and 0 once it retracts on downward
        scroll, so this bar rises to meet the top of the viewport instead of
        hanging with a header-sized hole above it. The transition matches the
        header's own, so the two move as one piece.
      */}
      <nav
        aria-label="Service categories"
        className="on-light frosted sticky top-(--header-offset) z-30 border-b border-twilight/12 transition-[top] duration-[550ms] ease-brand"
      >
        <div className="shell flex gap-2.5 overflow-x-auto py-3.5">
          {servicePillars.map((pillar, i) => (
            <Link
              key={pillar.id}
              href={`#${pillar.id}`}
              className="label-tight inline-flex shrink-0 items-center gap-2.25 rounded-full border border-edge-light px-4.5 py-2.5 whitespace-nowrap transition-[color,background-color,border-color,transform] duration-350 hover:border-twilight hover:bg-twilight hover:text-snow motion-safe:hover:-translate-y-0.5"
            >
              <span aria-hidden="true" className="tabular font-display text-doe-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              {pillar.name}
            </Link>
          ))}
        </div>
      </nav>

      <section className="on-light bg-pure">
        {servicePillars.map((pillar, i) => (
          <div
            key={pillar.id}
            id={pillar.id}
            className="scroll-mt-[9.375rem] border-b border-twilight/12 px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(3.75rem,7vw,7.5rem)]"
          >
            <div className="mx-auto flex max-w-400 flex-wrap gap-[clamp(2rem,5vw,5.625rem)]">
              <Animate className="flex flex-[0_1_min(100%,18.75rem)] flex-col gap-4.5">
                <span
                  aria-hidden="true"
                  data-numeral={String(i + 1).padStart(2, "0")}
                  className="numeral-ghost tabular font-display text-[clamp(3.25rem,6vw,5.75rem)] leading-[0.9] text-twilight/14"
                />
                <SplitHeading className="text-[clamp(1.75rem,3.2vw,2.875rem)] leading-[1.06]">
                  {pillar.name}
                </SplitHeading>
                <p className="text-[13px] leading-[1.9] font-light text-balance text-ink-muted">
                  {pillar.blurb}
                </p>
                {/* Was "From $15 per asset", anchored to the price list.
                    Both are gone, so this routes to the quote instead. */}
                <Link
                  href="/contact-us"
                  className="label-tight inline-flex items-center gap-2.75 self-start border-b border-twilight/25 pt-2 pb-2 transition-colors hover:border-doe"
                >
                  Get a quote
                  <span
                    aria-hidden="true"
                    className="block size-[5px] rounded-full bg-doe"
                  />
                </Link>
              </Animate>

              <Animate
                delay={0.14}
                className="flex flex-[1_1_min(100%,32.5rem)] flex-col gap-[clamp(1.5rem,3vw,2.5rem)]"
              >
                <div className="relative aspect-16/7 w-full overflow-hidden bg-rule-light">
                  <MediaFrame
                    {...pillarShowcase[pillar.id]}
                    title={`${pillar.name} — selected work`}
                    hint={SLOT_HINT[pillar.id] ?? `${pillar.name} showcase`}
                    sizes="(max-width: 900px) 100vw, 60vw"
                    /* On a phone the first block clears the fold, which makes
                       this the LCP element. Lazy-loading it costs ~2s. */
                    priority={i === 0}
                  />
                </div>
                {/* Up to thirty rows: the stagger has to stay tiny or the
                    last deliverable arrives seconds after the first. */}
                <AnimateGroup
                  as="ul"
                  variant="fade"
                  duration={0.5}
                  stagger={0.018}
                  className="grid gap-x-[clamp(1.25rem,2.4vw,2.5rem)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,11.875rem),1fr))]"
                >
                  {pillar.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.75 border-b border-twilight/10 py-2.75 text-[12.5px] text-ink-soft transition-colors duration-300 hover:text-twilight"
                    >
                      <span
                        aria-hidden="true"
                        className="block size-1 shrink-0 rounded-full bg-doe"
                      />
                      {item}
                    </li>
                  ))}
                </AnimateGroup>
              </Animate>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
