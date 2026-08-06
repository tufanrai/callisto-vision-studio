"use client";

import { useRef } from "react";
import { MOTION_OK, ScrollTrigger, gsap, useGSAP } from "./gsap";

/**
 * Seamless scrolling band of terms, set in the display face at scale.
 *
 * The list is duplicated once and the track translated by exactly -50%, which
 * loops without a seam. The duplicate is aria-hidden so each term is only
 * announced once.
 *
 * It runs as a CSS keyframe animation first and GSAP takes the loop over on
 * mount. That order matters both ways: the CSS animation is in the very first
 * paint and survives with JavaScript disabled, and the GSAP loop can then do
 * the thing CSS cannot — read scroll velocity, so the band accelerates with a
 * flick and reverses when the page scrolls back up.
 *
 * The handover reads the running CSS animation's own clock and seeds the tween
 * at the same progress. Without that, hydration snaps the band back to the
 * start of its cycle, which on a wide display is a visible jump of a term or
 * two. `prefers-reduced-motion` parks it (globals.css) and this never runs.
 */
export function Marquee({
  items,
  duration = 40,
  className,
  itemClassName,
  gapClassName = "gap-[clamp(1.5rem,3vw,3.25rem)] pr-[clamp(1.5rem,3vw,3.25rem)]",
  dotClassName = "size-[9px]",
}: {
  items: readonly string[];
  /** Seconds for one full pass. */
  duration?: number;
  className?: string;
  /** Type styling for each term. */
  itemClassName?: string;
  /** Spacing between a term and the dot that follows it. */
  gapClassName?: string;
  dotClassName?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Read the CSS animation's clock before switching it off.
        const css = track.getAnimations?.()[0];
        const elapsed = typeof css?.currentTime === "number" ? css.currentTime : 0;
        const seeded = ((elapsed / 1000 / duration) % 1 + 1) % 1;
        track.dataset.gsap = "on";

        const loop = gsap.to(track, {
          xPercent: -50,
          duration,
          ease: "none",
          repeat: -1,
        });
        loop.progress(seeded);

        let heading = 1;
        let settle: ReturnType<typeof setTimeout>;

        const st = ScrollTrigger.create({
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            if (velocity === 0) return;
            heading = velocity > 0 ? 1 : -1;
            // A hard flick multiplies the band's speed; a gentle scroll barely
            // touches it. Clamped so a trackpad fling cannot blur the type.
            const boost = gsap.utils.clamp(1, 5, Math.abs(velocity) / 420);
            gsap.to(loop, {
              timeScale: heading * boost,
              duration: 0.2,
              overwrite: true,
            });
            clearTimeout(settle);
            settle = setTimeout(() => {
              gsap.to(loop, {
                timeScale: heading,
                duration: 1.1,
                overwrite: true,
              });
            }, 140);
          },
        });

        return () => {
          clearTimeout(settle);
          st.kill();
          loop.kill();
          delete track.dataset.gsap;
        };
      });

      return () => mm.revert();
    },
    { scope: trackRef },
  );

  const row = (copy: boolean) =>
    items.map((item, i) => (
      <li
        key={`${copy ? "b" : "a"}-${item}-${i}`}
        className={`inline-flex shrink-0 items-center whitespace-nowrap ${gapClassName} ${itemClassName ?? ""}`}
      >
        {item}
        <span
          aria-hidden="true"
          className={`block shrink-0 rounded-full bg-doe ${dotClassName}`}
        />
      </li>
    ));

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div
        ref={trackRef}
        className="marquee-track"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <ul className="flex w-max items-center">{row(false)}</ul>
        <ul aria-hidden="true" className="flex w-max items-center">
          {row(true)}
        </ul>
      </div>
    </div>
  );
}
