"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

/**
 * Single registration point. Importing plugins from more than one module
 * registers them repeatedly and makes tree-shaking unpredictable.
 */
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin, CustomEase);

/**
 * House easing, defined once as a curve rather than twice as a name.
 *
 * `--ease-brand` in globals.css is `cubic-bezier(0.16, 1, 0.3, 1)`. Naming a
 * built-in like `power3.out` here would put CSS transitions and GSAP tweens on
 * visibly different curves — the pill's hover lift and its reveal would not
 * agree — so the same four control points are registered as a CustomEase and
 * both sides run the identical curve.
 */
CustomEase.create("brand", "0.16,1,0.3,1");

export const EASE = "brand";

/** Slower settle, for large type and media that should feel weighted. */
export const EASE_SOFT = "power4.out";

/**
 * Default ScrollTrigger start for reveals.
 *
 * Deliberately "enters the viewport" rather than a percentage like "top 82%":
 * for elements inside the final viewport-height of a document, the page runs
 * out of scroll before their top ever reaches 82%, so a percentage start
 * never fires and they stay hidden forever.
 */
export const REVEAL_START = "top bottom-=40";

/**
 * Pointer-driven flourishes — magnetism, tilt — are opt-in on hardware that
 * actually has a pointer. On a touch screen they either never fire or fire
 * once on tap and stick, which reads as a rendering fault.
 */
export const FINE_POINTER =
  "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)";

/** Everything scroll-driven runs behind this. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, CustomEase, useGSAP };
