"use client";

import { useRef } from "react";
import { MOTION_OK, REVEAL_START, ScrollTrigger, gsap, useGSAP } from "./gsap";

/**
 * Splits a display figure into the part that can count and the parts that
 * cannot — "70+" is 70 with a trailing "+", "2+ yrs" is 2 with " yrs" after it.
 *
 * Taking the rendered string rather than a number and a separate suffix keeps
 * one spelling of each figure in lib/site.ts. A second, decomposed copy for
 * the sake of the animation is a copy that drifts.
 */
const FIGURE = /^(\D*?)(\d[\d,]*)(.*)$/s;

export function Counter({
  value,
  duration = 1.8,
  className,
}: {
  value: string | number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const text = String(value);
  const parts = FIGURE.exec(text);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !parts) return;

      const [, prefix, digits, suffix] = parts;
      const target = Number(digits.replace(/,/g, ""));
      // A grouped source figure keeps its separators while counting.
      const grouped = digits.includes(",");

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const counter = { n: 0 };
        const tween = gsap.to(counter, {
          n: target,
          duration,
          ease: "power2.out",
          paused: true,
          onUpdate: () => {
            const n = Math.round(counter.n);
            el.textContent = `${prefix}${grouped ? n.toLocaleString("en-US") : n}${suffix}`;
          },
          // Land on the source string exactly, rather than on whatever the
          // formatter produced — that is what the page promised to render.
          onComplete: () => {
            el.textContent = text;
          },
        });
        const st = ScrollTrigger.create({
          trigger: el,
          start: REVEAL_START,
          once: true,
          onEnter: () => tween.play(),
        });
        return () => {
          st.kill();
          tween.kill();
          el.textContent = text;
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [text] },
  );

  /**
   * The final value is rendered server-side and only overwritten once the
   * tween starts, so crawlers and reduced-motion users see the real figure and
   * the box never resizes as digits are added.
   */
  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
