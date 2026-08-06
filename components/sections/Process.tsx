import { Animate, AnimateGroup } from "@/components/motion/Animate";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RuleLink } from "@/components/ui/Pill";
import { processStages, workflowTimeline } from "@/lib/content/process";

/**
 * Home — the four stages a client actually feels, lifted out of the nine.
 * The full sequence lives on the About page; repeating all nine here would
 * bury the four that answer "what happens in week one".
 */
const FELT = [1, 4, 5, 8] as const;

const HOME_COPY: Record<number, { title: string; body: string; time: string }> = {
  1: {
    title: "Discovery",
    body: "A briefing call on your brand, goals and audience — before a file is opened.",
    time: "1 day",
  },
  4: {
    title: "Concept",
    body: "Research shapes the first creative directions we bring back for review.",
    time: "2–3 days",
  },
  5: {
    title: "Production",
    body: "Full build of the approved concept, with structured revision rounds.",
    time: "3–10 days",
  },
  8: {
    title: "Delivery",
    body: "Final files in every agreed format, plus post-delivery support.",
    time: "1 day after sign-off",
  },
};

export function Process() {
  const steps = FELT.map((n, i) => ({
    num: String(i + 1).padStart(2, "0"),
    ...HOME_COPY[n],
  }));

  return (
    <section
      id="process"
      className="on-light border-t border-twilight/10 bg-pure px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(5rem,9vw,9.375rem)]"
    >
      <div className="mx-auto max-w-400">
        <div className="flex flex-wrap gap-[clamp(2rem,5vw,5.625rem)] pb-[clamp(2.5rem,4vw,4.25rem)]">
          <div className="flex-[0_1_min(100%,18.75rem)]">
            <Animate variant="rise-sm">
              <Eyebrow tone="light" className="mb-5.5">
                How it runs
              </Eyebrow>
            </Animate>
            <SplitHeading className="text-[clamp(2rem,3.8vw,3.75rem)] leading-[1.04]">
              A process with no
              <br />
              quiet weeks.
            </SplitHeading>
          </div>
          <Animate
            variant="rise-sm"
            delay={0.18}
            className="max-w-[52ch] flex-[1_1_min(100%,21.25rem)] self-end"
          >
            <p className="text-[clamp(0.875rem,1.05vw,1rem)] leading-[1.85] font-light text-balance text-ink-soft">
              {processStages.length} defined stages, quoted in business days.
              Here are the four you&rsquo;ll feel most.
            </p>
          </Animate>
        </div>

        {/* An <ol>, so the sequence is in the markup — the big figure on each
            card is a watermark, not the thing carrying the order. */}
        <AnimateGroup
          as="ol"
          stagger={0.09}
          className="rule-grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,15rem),1fr))]"
        >
          {steps.map((step) => (
            <li
              key={step.num}
              className="rule-cell-light group flex min-h-56 flex-col gap-3.5 bg-pure px-[clamp(1.375rem,2vw,2rem)] py-[clamp(1.625rem,2.4vw,2.375rem)] transition-colors duration-500 hover:bg-snow"
            >
              <span
                aria-hidden="true"
                data-numeral={step.num}
                className="numeral-ghost tabular font-display text-[clamp(2.375rem,4vw,3.625rem)] leading-none text-twilight/16 transition-colors duration-500 group-hover:text-doe/45"
              />
              <h3 className="text-[clamp(1.25rem,1.8vw,1.625rem)] tracking-[-0.015em]">
                {step.title}
              </h3>
              <p className="text-[13px] leading-[1.85] font-light text-balance text-ink-muted">
                {step.body}
              </p>
              <span className="label-tight mt-auto text-doe-deep">
                {step.time}
              </span>
            </li>
          ))}
        </AnimateGroup>

        <Animate variant="rise-sm" className="mt-[clamp(1.875rem,3vw,2.75rem)] flex">
          <RuleLink href="/about-us#process">
            See the full nine-step process
          </RuleLink>
        </Animate>
      </div>
    </section>
  );
}

/**
 * About — all nine stages as a rule-separated list, with the quoted timeline
 * pinned alongside.
 */
export function ProcessFull() {
  return (
    <section
      id="process"
      className="on-light bg-snow px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(4.5rem,8vw,8.75rem)]"
    >
      <div className="mx-auto max-w-400">
        <div className="pb-[clamp(2.375rem,4.4vw,4rem)]">
          <Animate variant="rise-sm">
            <Eyebrow tone="light" className="mb-5.5">
              Our process
            </Eyebrow>
          </Animate>
          <SplitHeading className="text-[clamp(2rem,4.4vw,4.5rem)]">
            Nine stages.
            <br />
            Nothing improvised.
          </SplitHeading>
        </div>

        <div className="flex flex-wrap gap-[clamp(2rem,5vw,5rem)]">
          <AnimateGroup
            variant="rise-sm"
            stagger={0.055}
            className="flex-[1_1_min(100%,32.5rem)] border-t border-twilight/16"
          >
            {processStages.map((stage) => (
              <div
                key={stage.n}
                className="group flex gap-[clamp(1.125rem,2.4vw,2.25rem)] border-b border-twilight/12 py-[clamp(1.125rem,1.8vw,1.625rem)] transition-[padding] duration-450 hover:pl-3"
              >
                <span
                  aria-hidden="true"
                  className="tabular w-7.5 shrink-0 pt-[5px] font-display text-[15px] tracking-[0.08em] text-doe-deep"
                >
                  {String(stage.n).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-[7px]">
                  <h3 className="text-[clamp(1.25rem,1.9vw,1.6875rem)] tracking-[-0.018em]">
                    {stage.name}
                  </h3>
                  <p className="max-w-[56ch] text-[13px] leading-[1.8] font-light text-balance text-ink-muted">
                    {stage.detail}
                  </p>
                </div>
              </div>
            ))}
          </AnimateGroup>

          <Animate
            delay={0.12}
            className="flex-[1_1_min(100%,18.75rem)] self-start bg-ink-deep p-[clamp(1.75rem,2.8vw,2.625rem)] text-snow"
          >
            <h3 className="mb-6 text-[clamp(1.375rem,2vw,1.875rem)] tracking-[-0.02em]">
              Workflow timeline
            </h3>
            <dl>
              {workflowTimeline.map((row) => (
                <div
                  key={row.stage}
                  className="flex justify-between gap-4.5 border-b border-snow/14 py-3.25"
                >
                  <dt className="text-[13px] font-light text-mist">
                    {row.stage}
                  </dt>
                  <dd className="tabular text-right text-[13px] font-medium whitespace-nowrap text-doe">
                    {row.duration}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5.5 text-xs leading-[1.8] font-light text-mist-dim">
              Quoted in business days, with overlap for UK, Australian and UAE
              hours.
            </p>
          </Animate>
        </div>
      </div>
    </section>
  );
}
