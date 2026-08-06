"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import {
  EASE,
  MOTION_OK,
  REVEAL_START,
  ScrollTrigger,
  SplitText,
  gsap,
  useGSAP,
} from "./gsap";

/**
 * Heading whose lines rise out of a mask, one after another.
 *
 * SplitText is configured with `mask: "lines"` (it builds the clipping wrapper
 * itself) and `aria: "auto"`, which labels the container with the original
 * text and hides the generated line spans — otherwise a screen reader would
 * announce the heading in fragments.
 *
 * `autoSplit` re-splits on resize so a reflowed heading keeps clean lines.
 *
 * Note for call sites: do not put `text-wrap: balance` on a split heading.
 * Balancing resolves against the un-split text and then fights the re-split
 * autoSplit performs at each width, so the line count changes under the mask.
 * Headings here break on explicit `<br>` or on their own measure instead.
 */
export function SplitHeading({
  children,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.09,
  duration = 1.05,
  /** Play immediately instead of waiting for scroll — for above-the-fold use. */
  immediate = false,
  start = REVEAL_START,
  id,
  hero = false,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  immediate?: boolean;
  start?: string;
  id?: string;
  /** Above the fold — needs the CSS pre-paint hide. See Animate. */
  hero?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          aria: "auto",
          autoSplit: true,
          linesClass: "split-line",
          /**
           * As in Animate: ScrollTrigger fires the tween rather than owning
           * it, so a refresh can never reset the lines back under the mask.
           */
          onSplit: (self) => {
            // Above-the-fold headings are hidden pre-paint by CSS; nothing
            // else writes an inline opacity on the container, so claim it.
            gsap.set(el, { opacity: 1 });
            gsap.set(self.lines, { yPercent: 115 });
            const play = () =>
              gsap.to(self.lines, {
                yPercent: 0,
                duration,
                ease: EASE,
                stagger,
                delay,
              });
            if (immediate) return play();
            const st = ScrollTrigger.create({
              trigger: el,
              start,
              once: true,
              onEnter: play,
            });
            return () => st.kill();
          },
        });

        return () => split.revert();
      });

      // Reduced motion: no split runs, so release the pre-paint hide.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { opacity: 1 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      {...(hero ? { "data-anim-hero": "" } : {})}
    >
      {children}
    </Tag>
  );
}
