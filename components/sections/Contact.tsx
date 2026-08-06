import { Animate, AnimateGroup } from "@/components/motion/Animate";
import { ParallaxMedia } from "@/components/motion/Parallax";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { site } from "@/lib/site";

const nextSteps = [
  {
    n: "01",
    title: "We read it properly",
    body: "A reply within one working day — from a person, not an autoresponder.",
  },
  {
    n: "02",
    title: "Discovery call",
    body: "Booked within 24 hours, around your local hours.",
  },
  {
    n: "03",
    title: "Scope and quote",
    body: "A written scope, timeline and fixed price in USD.",
  },
  {
    n: "04",
    title: "We start",
    body: "50% advance confirms the slot. Concepts begin the same week.",
  },
];

const payments = [
  { name: "Wire transfer", note: "For UK, Australian and UAE clients." },
  { name: "PayPal", note: "Fast for one-off projects and first briefs." },
  { name: "Wise", note: "Lowest FX spread on monthly retainers." },
  { name: "Card", note: "On request, for confirmed invoices." },
];

/** The brief form, with the studio's own details alongside it. */
export function Contact() {
  const details = [
    {
      k: "Office",
      v: `${site.contact.address.street}, ${site.contact.address.locality} 44600, ${site.contact.address.countryName}`,
    },
    { k: "Hours", v: "Sun–Fri · 09:00–18:00 NPT" },
    { k: "Response", v: "Within 1 working day" },
    { k: "Coverage", v: site.markets.map((m) => m.code).join(" · ") },
    { k: "Currency", v: `Invoiced in ${site.currency}` },
  ];

  return (
    <section className="on-light bg-snow px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(4rem,7.5vw,8.125rem)]">
      <div className="mx-auto flex max-w-400 flex-wrap gap-[clamp(2.25rem,5vw,5.625rem)]">
        <Animate className="flex-[1_1_min(100%,32.5rem)]">
          <ContactForm />
        </Animate>

        <Animate
          as="aside"
          delay={0.14}
          className="flex flex-[1_1_min(100%,20rem)] flex-col gap-[clamp(1.625rem,3vw,2.75rem)]"
        >
          <div className="bg-ink-deep p-[clamp(1.625rem,2.6vw,2.5rem)] text-snow">
            <h2 className="mb-6 text-[clamp(1.375rem,2vw,1.875rem)] tracking-[-0.02em]">
              What happens next
            </h2>
            <ol>
              {nextSteps.map((step) => (
                <li
                  key={step.n}
                  className="group flex gap-4.5 border-b border-snow/14 py-3.75"
                >
                  <span
                    aria-hidden="true"
                    className="tabular w-5.5 shrink-0 pt-0.75 font-display text-[13px] text-doe transition-transform duration-500 ease-brand motion-safe:group-hover:translate-x-0.5"
                  >
                    {step.n}
                  </span>
                  <div className="flex flex-col gap-1.25">
                    <span className="text-[13.5px] font-medium text-snow">
                      {step.title}
                    </span>
                    <span className="text-[12.5px] leading-[1.75] font-light text-mist">
                      {step.body}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative aspect-4/3 w-full overflow-hidden bg-rule-light">
            <ParallaxMedia speed={0.8}>
              <ImageSlot
                hint="Office / Kathmandu photo"
                sizes="(max-width: 900px) 100vw, 30vw"
              />
            </ParallaxMedia>
          </div>

          <div>
            <h2 className="mb-4.5 text-[clamp(1.25rem,1.8vw,1.625rem)] tracking-[-0.02em]">
              Studio
            </h2>
            <dl className="border-t border-twilight/16">
              {details.map((row) => (
                <div
                  key={row.k}
                  className="flex justify-between gap-4.5 border-b border-twilight/12 py-3.25"
                >
                  <dt className="label-tight shrink-0 tracking-[0.14em] text-ink-muted">
                    {row.k}
                  </dt>
                  <dd className="text-right text-[13px] font-light text-twilight">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Animate>
      </div>
    </section>
  );
}

/** Payment methods and the 50/50 schedule. */
export function Payments() {
  return (
    <section className="on-light border-t border-twilight/10 bg-pure px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(4rem,7.5vw,8.125rem)]">
      <div className="mx-auto flex max-w-400 flex-wrap gap-[clamp(2rem,5vw,5rem)]">
        <div className="flex-[0_1_min(100%,20rem)]">
          <Animate variant="rise-sm">
            <Eyebrow tone="light" className="mb-5.5">
              Payments
            </Eyebrow>
          </Animate>
          <SplitHeading className="mb-5.5 text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.05]">
            Simple terms,
            <br />
            written down.
          </SplitHeading>
          <Animate variant="rise-sm" delay={0.16}>
            <p className="max-w-[40ch] text-sm leading-[1.85] font-light text-balance text-ink-soft">
              50% to confirm, 50% before final delivery. Invoiced in{" "}
              {site.currency}, excluding local VAT or GST.
            </p>
          </Animate>
        </div>

        <AnimateGroup
          delay={0.12}
          stagger={0.07}
          className="rule-grid flex-[1_1_min(100%,26.25rem)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,12.5rem),1fr))]"
        >
          {payments.map((method) => (
            <div
              key={method.name}
              className="rule-cell-light group flex min-h-45 flex-col gap-2.75 bg-pure p-[clamp(1.5rem,2.2vw,2.125rem)] transition-colors duration-500 hover:bg-snow"
            >
              <span className="font-display text-[clamp(1.25rem,1.8vw,1.625rem)] tracking-[-0.018em]">
                {method.name}
              </span>
              <span className="text-[12.5px] leading-[1.8] font-light text-balance text-ink-muted">
                {method.note}
              </span>
              <span
                aria-hidden="true"
                className="mt-auto block h-px w-full origin-left scale-x-0 bg-doe-deep/50 transition-transform duration-[650ms] ease-brand motion-safe:group-hover:scale-x-100"
              />
            </div>
          ))}
        </AnimateGroup>
      </div>
    </section>
  );
}
