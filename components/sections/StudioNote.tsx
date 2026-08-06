import { Animate } from "@/components/motion/Animate";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RuleLink } from "@/components/ui/Pill";
import { site } from "@/lib/site";

/**
 * The founder's line, set as the largest body of type on the light ground.
 * It is the page's only first-person claim, so it is attributed.
 */
export function StudioNote() {
  return (
    <section
      id="studio"
      className="on-light bg-snow px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(5rem,10vw,10.625rem)]"
    >
      <div className="mx-auto flex max-w-400 flex-wrap gap-[clamp(2.25rem,6vw,6.875rem)]">
        <Animate className="flex flex-[0_1_min(100%,15rem)] flex-col gap-4.5">
          <Eyebrow tone="light">The studio</Eyebrow>
          <p className="text-[13px] leading-[1.9] font-light text-ink-muted">
            Founded in Kathmandu. Trusted from London to Dubai to Melbourne.
          </p>
        </Animate>

        <div className="flex flex-[1_1_min(100%,35rem)] flex-col gap-[clamp(1.75rem,3vw,2.75rem)]">
          {/* No `text-balance` here: the quote is line-split for the reveal,
              and balancing re-flows it at a different line count than the
              split measured. See SplitHeading. */}
          <SplitHeading
            as="blockquote"
            stagger={0.075}
            className="font-display text-[clamp(1.6875rem,3.6vw,3.625rem)] leading-[1.14] tracking-[-0.025em] text-twilight"
          >
            Every project we take on is treated as an extension of our own
            reputation — which means <em>your success is our success</em>.
          </SplitHeading>

          <Animate delay={0.1} className="flex flex-wrap items-center gap-x-7 gap-y-3.5">
            <span className="label-tight text-xs text-twilight">
              {site.founder.name}
            </span>
            <span aria-hidden="true" className="block h-px w-9 bg-twilight/30" />
            <span className="text-xs font-light tracking-[0.06em] text-ink-muted">
              Founder &amp; CEO, {site.name}
            </span>
          </Animate>

          <Animate delay={0.16} className="flex flex-col gap-[clamp(1.75rem,3vw,2.75rem)]">
            <p className="max-w-[62ch] text-[clamp(0.875rem,1.05vw,1rem)] leading-[1.85] font-light text-balance text-ink-soft">
              Designers, editors and strategists under one roof — so nothing is
              lost in the handoff.
            </p>

            <RuleLink href="/about-us">More about the studio</RuleLink>
          </Animate>
        </div>
      </div>
    </section>
  );
}
