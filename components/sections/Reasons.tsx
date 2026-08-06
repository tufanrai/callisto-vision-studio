import { Animate, AnimateGroup } from "@/components/motion/Animate";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { reasons } from "@/lib/content/positioning";

/** Home — the retention argument, six cards on the ink ground. */
export function Reasons() {
  return (
    <section className="bg-ink-deep px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(5rem,9vw,9.375rem)] text-snow">
      <div className="mx-auto max-w-400">
        <div className="flex flex-wrap items-end justify-between gap-x-15 gap-y-6 pb-[clamp(2.75rem,5vw,5rem)]">
          <SplitHeading className="flex-[1_1_min(100%,30rem)] text-[clamp(2rem,4.4vw,4.5rem)] leading-[1.04]">
            Why brands stay
            <br />
            longer than one brief.
          </SplitHeading>
          <Animate
            variant="rise-sm"
            delay={0.18}
            className="max-w-[44ch] flex-[1_1_min(100%,21.25rem)]"
          >
            <p className="text-[clamp(0.875rem,1.05vw,1rem)] leading-[1.8] font-light text-balance text-mist">
              A fixed quote before the work starts, honest timelines, and a team
              that brings ideas.
            </p>
          </Animate>
        </div>

        <AnimateGroup className="rule-grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,18.75rem),1fr))]">
          {reasons.map((reason) => (
            <div
              key={reason.n}
              className="rule-cell-dark group flex min-h-46 flex-col gap-4 bg-ink-deep px-[clamp(1.5rem,2.2vw,2.25rem)] py-[clamp(1.75rem,2.6vw,2.625rem)] transition-colors duration-500 hover:bg-ink-raised"
            >
              <span
                aria-hidden="true"
                className="tabular font-display text-[13px] tracking-[0.14em] text-doe transition-transform duration-500 ease-brand motion-safe:group-hover:translate-x-1"
              >
                {reason.n}
              </span>
              <h3 className="text-[clamp(1.3125rem,1.9vw,1.75rem)] leading-[1.2] tracking-[-0.015em]">
                {reason.title}
              </h3>
              <p className="text-[13px] leading-[1.85] font-light text-balance text-mist">
                {reason.body}
              </p>
              {/* The rule draws in from the left on hover — the card's only
                  reward for the pointer landing on it, since these are not
                  links and must not look like one. */}
              <span
                aria-hidden="true"
                className="mt-auto block h-px w-full origin-left scale-x-0 bg-doe/60 transition-transform duration-[650ms] ease-brand motion-safe:group-hover:scale-x-100"
              />
            </div>
          ))}
        </AnimateGroup>
      </div>
    </section>
  );
}
