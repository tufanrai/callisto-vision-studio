"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { EASE, MOTION_OK, REVEAL_START, ScrollTrigger, gsap, useGSAP } from "./gsap";

type Variant =
  | "rise"
  | "rise-sm"
  | "fade"
  | "slide-left"
  | "scale"
  | "blur"
  | "clip";

const FROM: Record<Variant, gsap.TweenVars> = {
  rise: { y: 44, opacity: 0 },
  /** For dense rows, where a 44px throw reads as the layout settling badly. */
  "rise-sm": { y: 18, opacity: 0 },
  fade: { opacity: 0 },
  "slide-left": { x: -40, opacity: 0 },
  scale: { scale: 0.94, opacity: 0, transformOrigin: "center" },
  /**
   * Depth-of-field entrance for hero copy. `filter` is the expensive property
   * here, so this variant is reserved for one or two elements per page.
   */
  blur: { y: 26, opacity: 0, filter: "blur(14px)" },
  /**
   * A wipe rather than a move — for media, where translating the frame
   * detaches it from the grid rule it is supposed to sit on.
   */
  clip: { clipPath: "inset(0% 0% 100% 0%)", scale: 1.06, transformOrigin: "center" },
};

/** Every variant lands here, so one `to` clears whatever the from-state set. */
const TO: gsap.TweenVars = {
  x: 0,
  y: 0,
  scale: 1,
  opacity: 1,
  filter: "blur(0px)",
  clipPath: "inset(0% 0% 0% 0%)",
};

/**
 * Only the properties a variant actually disturbed are worth animating back.
 * Tweening `filter` and `clipPath` on every reveal would put a paint-bound
 * property on tweens that only ever needed a transform.
 */
function landing(variant: Variant): gsap.TweenVars {
  const from = FROM[variant];
  const to: gsap.TweenVars = {};
  for (const key of Object.keys(from)) {
    if (key in TO) to[key] = TO[key];
  }
  // A from-state that moved on one axis still has to land on the other at 0,
  // because a shared timeline may have left a stale transform behind.
  if ("y" in from || "x" in from) {
    to.x = 0;
    to.y = 0;
  }
  return to;
}

/**
 * Shared reveal behaviour.
 *
 * ScrollTrigger only *fires* the tween here — it does not own it. When a
 * ScrollTrigger owns a fromTo, every refresh re-renders that tween at the
 * trigger's current progress, so scrolling back above the start point resets
 * the element to its hidden from-state and it vanishes again. Firing a
 * detached tween from `onEnter` (with `once`, so the trigger then kills
 * itself) means nothing can re-hide the element afterwards.
 */
function useReveal(
  ref: React.RefObject<HTMLElement | null>,
  targets: () => Element | Element[] | null,
  from: gsap.TweenVars,
  vars: gsap.TweenVars,
  start: string,
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = targets();
        if (!items || (Array.isArray(items) && items.length === 0)) return;

        gsap.set(items, from);
        const st = ScrollTrigger.create({
          trigger: ref.current,
          start,
          once: true,
          onEnter: () => {
            gsap.to(items, {
              ...vars,
              /**
               * Composited layers are promoted for the length of the reveal
               * and dropped at the end. Leaving `will-change` on every
               * revealed element permanently is what turns a long page into a
               * memory problem on a phone.
               */
              onComplete: () => gsap.set(items, { clearProps: "filter,willChange" }),
            });
          },
        });
        return () => st.kill();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
}

export function Animate({
  children,
  as: Tag = "div",
  variant = "rise",
  delay = 0,
  duration = 0.9,
  className,
  style,
  start = REVEAL_START,
  /**
   * Above the fold. Server HTML paints before React hydrates, so these need
   * the CSS pre-paint hide to avoid a flash; below the fold nothing is on
   * screen yet when useGSAP (a layout effect) applies the from-state.
   */
  hero = false,
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  /**
   * For layout values a utility class cannot express — a per-item flex basis
   * or aspect ratio that comes from content. GSAP writes opacity and
   * transform, so it never collides with what is set here.
   */
  style?: React.CSSProperties;
  start?: string;
  hero?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useReveal(
    ref,
    () => ref.current,
    FROM[variant],
    { ...landing(variant), duration, delay, ease: EASE },
    start,
  );

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      {...(hero ? { "data-anim-hero": "" } : {})}
    >
      {children}
    </Tag>
  );
}

/** Staggered reveal across direct children — for grids, lists and tables. */
export function AnimateGroup({
  children,
  as: Tag = "div",
  className,
  stagger = 0.08,
  variant = "rise",
  duration = 0.8,
  delay = 0,
  start = REVEAL_START,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  stagger?: number;
  variant?: Variant;
  duration?: number;
  delay?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useReveal(
    ref,
    () => (ref.current ? Array.from(ref.current.children) : []),
    FROM[variant],
    { ...landing(variant), duration, delay, ease: EASE, stagger },
    start,
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
