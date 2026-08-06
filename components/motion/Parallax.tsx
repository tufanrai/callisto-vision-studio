"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { MOTION_OK, gsap, useGSAP } from "./gsap";

/**
 * Scrub-linked drift for decorative layers — the orbital rings, ghost
 * numerals and watermarks.
 *
 * The travel is measured against the viewport rather than the element, so a
 * tall section and a small ring drift by the same visible amount. Function
 * based values plus `invalidateOnRefresh` re-measure on resize; without them a
 * phone rotated to landscape keeps the portrait travel and the layer slides
 * out of its section.
 */
export function Parallax({
  children,
  as: Tag = "div",
  speed = 0.16,
  className,
  style,
  "aria-hidden": ariaHidden,
}: {
  /** Optional — a decorative ring is itself the drifting element. */
  children?: ReactNode;
  as?: ElementType;
  /** Fraction of viewport height travelled across the whole pass. */
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  "aria-hidden"?: boolean | "true" | "false";
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const reach = () => (window.innerHeight * speed) / 2;
        const tween = gsap.fromTo(
          el,
          { y: () => reach() },
          {
            y: () => -reach(),
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} style={style} aria-hidden={ariaHidden}>
      {children}
    </Tag>
  );
}

/**
 * Parallax for a filled frame.
 *
 * The caller owns an `overflow-hidden` frame at a fixed aspect ratio; this
 * lays an oversized plate inside it and drifts that. The plate is inset 8%
 * beyond the frame top and bottom and never travels more than it has slack
 * for, so no edge of the artwork can ever enter the frame — the failure mode
 * that makes most parallax look broken at the extremes of the scroll.
 *
 * Sized in percentages rather than pixels so a resize needs no re-measure.
 */
const SLACK = 8;
/** Percent of the plate's own height. 6.8% of 116% ≈ 7.9% of the frame. */
const TRAVEL = 6.8;

export function ParallaxMedia({
  children,
  speed = 1,
  className,
}: {
  children: ReactNode;
  /** Scales the default travel. 0 parks the plate. */
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const reach = Math.min(TRAVEL * speed, TRAVEL);
        const tween = gsap.fromTo(
          el,
          { yPercent: -reach },
          {
            yPercent: reach,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className={`absolute inset-x-0 ${className ?? ""}`}
      style={{ top: `-${SLACK}%`, bottom: `-${SLACK}%` }}
    >
      {children}
    </div>
  );
}
