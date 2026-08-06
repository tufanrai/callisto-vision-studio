"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Animate } from "@/components/motion/Animate";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { EASE, gsap } from "@/components/motion/gsap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { faqs } from "@/lib/content/faq";

/**
 * The FAQ, as a single-open accordion.
 *
 * Every answer is rendered into the DOM and collapsed to zero height, not
 * conditionally mounted: the same questions and answers are serialised into
 * FAQPage structured data, and a crawler that sees only one answer in the
 * markup while the JSON-LD claims seven is an invalid-content flag.
 *
 * A closed panel is marked `inert` rather than `hidden`. Both keep the text in
 * the markup and out of the accessibility tree, but `hidden` sets
 * `display: none`, which cannot be animated from — the panel would snap open.
 * `inert` leaves the box layable-out, so its height can be tweened.
 */
export function Faq() {
  const [open, setOpen] = useState(0);
  const base = useId();
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  /** The first pass matches the server's markup, so it must not animate. */
  const settled = useRef(false);

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    panels.current.forEach((el, i) => {
      if (!el) return;
      const shows = i === open;
      const to = { height: shows ? "auto" : 0, opacity: shows ? 1 : 0 };
      if (still || !settled.current) gsap.set(el, to);
      else gsap.to(el, { ...to, duration: 0.5, ease: EASE, overwrite: true });
    });

    settled.current = true;
  }, [open]);

  return (
    <section
      id="faq"
      className="on-light bg-snow px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(5rem,9vw,9.375rem)]"
    >
      <div className="mx-auto flex max-w-400 flex-wrap gap-[clamp(2.25rem,5vw,6rem)]">
        <div className="flex-[0_1_min(100%,21.25rem)] self-start lg:sticky lg:top-30">
          <Animate variant="rise-sm">
            <Eyebrow tone="light" className="mb-5.5">
              FAQ
            </Eyebrow>
          </Animate>
          <SplitHeading className="mb-6.5 text-[clamp(2rem,3.8vw,3.75rem)] leading-[1.04]">
            Answers, before
            <br />
            you have to ask.
          </SplitHeading>
          <Animate variant="rise-sm" delay={0.16}>
            <p className="max-w-[38ch] text-sm leading-[1.85] font-light text-balance text-ink-muted">
              Scope, timelines and payments — written down, before the invoice.
            </p>
          </Animate>
        </div>

        <Animate
          delay={0.12}
          className="flex-[1_1_min(100%,32.5rem)] border-t border-twilight/16"
        >
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="group border-b border-twilight/16">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`${base}-${i}`}
                    className="flex w-full cursor-pointer items-start gap-6 py-[clamp(1.375rem,2vw,1.875rem)] text-left text-twilight transition-colors duration-400 hover:text-doe-deep"
                  >
                    <span className="flex-1 font-display text-[clamp(1.125rem,1.7vw,1.625rem)] leading-[1.3] tracking-[-0.015em]">
                      {faq.q}
                    </span>
                    {/*
                      Drawn as two rules rather than a "+"/"–" text swap: the
                      vertical one collapses into the horizontal one, so the
                      control animates between states instead of replacing one
                      glyph with another on the frame the state flips.
                    */}
                    <span
                      aria-hidden="true"
                      className="relative inline-flex size-8.5 shrink-0 items-center justify-center rounded-full border border-twilight/24 text-doe-deep transition-colors duration-400 group-hover:border-doe-deep"
                    >
                      <span className="absolute h-px w-3 bg-current" />
                      <span
                        className={`absolute h-3 w-px bg-current transition-transform duration-500 ease-brand ${
                          isOpen ? "scale-y-0" : "scale-y-100"
                        }`}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={`${base}-${i}`}
                  ref={(el) => {
                    panels.current[i] = el;
                  }}
                  inert={!isOpen}
                  className="overflow-hidden"
                  style={{ height: i === 0 ? "auto" : 0, opacity: i === 0 ? 1 : 0 }}
                >
                  <p className="max-w-[70ch] pr-[clamp(2.5rem,6vw,5rem)] pb-[clamp(1.625rem,2.4vw,2.125rem)] text-[clamp(0.875rem,1.02vw,0.9375rem)] leading-[1.9] font-light text-balance text-ink-soft">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </Animate>
      </div>
    </section>
  );
}
