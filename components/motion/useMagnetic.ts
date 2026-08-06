"use client";

import { useRef } from "react";
import { FINE_POINTER, gsap, useGSAP } from "./gsap";

/**
 * Magnetic hover: the control leans toward the cursor while it is over it and
 * springs back on exit.
 *
 * Returned as a ref rather than a wrapper component so it can be attached to
 * the control itself. A wrapping element would sit between the pill and its
 * flex parent and quietly change how the row wraps.
 *
 * Two details keep it from feeling like a bug:
 *
 *  - the pull is clamped in pixels, not left proportional. Without a clamp a
 *    full-width pill on a narrow layout swings by a third of the viewport;
 *  - `data-magnetic` is written onto the element while the effect is live, so
 *    the stylesheet can drop `transform` from the pill's transition list.
 *    Leaving it in would run every quickTo update through a 500ms CSS
 *    transition as well, and the control would trail the cursor through
 *    treacle instead of tracking it.
 *
 * Gated on FINE_POINTER: on a touch screen this never fires, and on a tap it
 * would fire once and stick.
 */
export function useMagnetic<T extends HTMLElement>({
  strength = 0.28,
  max = 11,
  duration = 0.55,
}: { strength?: number; max?: number; duration?: number } = {}) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(FINE_POINTER, () => {
        el.dataset.magnetic = "on";

        const xTo = gsap.quickTo(el, "x", { duration, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration, ease: "power3.out" });
        const clamp = gsap.utils.clamp(-max, max);

        const onMove = (event: PointerEvent) => {
          const box = el.getBoundingClientRect();
          xTo(clamp((event.clientX - (box.left + box.width / 2)) * strength));
          yTo(clamp((event.clientY - (box.top + box.height / 2)) * strength));
        };
        const release = () => {
          xTo(0);
          yTo(0);
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", release);
        // A keyboard user tabbing away never fires pointerleave, and a click
        // that navigates can leave the control parked off-centre.
        el.addEventListener("blur", release);

        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", release);
          el.removeEventListener("blur", release);
          delete el.dataset.magnetic;
          gsap.set(el, { x: 0, y: 0 });
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return ref;
}
