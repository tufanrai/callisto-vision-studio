"use client";

import { useRef } from "react";
import { MOTION_OK, gsap, useGSAP } from "./gsap";

/**
 * A hairline of Doe Brown across the top of the viewport, tracking how far
 * through the document the reader is.
 *
 * These pages are long — the work index and the services catalogue both run
 * past 9,000px — and the header retracts on the way down, so there is no other
 * persistent cue for position.
 *
 * Purely decorative: it duplicates information the scrollbar already carries,
 * so it is aria-hidden rather than exposed as a progressbar, and it is not
 * drawn at all under reduced motion.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set(el, { opacity: 1 });
        const tween = gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              start: 0,
              end: "max",
              // A touch of smoothing, so a flick does not strobe the bar.
              scrub: 0.3,
            },
          },
        );
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(el, { opacity: 0, scaleX: 0 });
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left scale-x-0 bg-doe opacity-0"
    />
  );
}
