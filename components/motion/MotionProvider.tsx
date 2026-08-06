"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "./gsap";

/**
 * Cancels the failsafe planted by the inline bootstrap in the layout.
 *
 * That bootstrap sets data-js="on" before first paint (so animated elements
 * start hidden without a flash) and arms a timer that flips it back to "off".
 * If this component never mounts — bundle failure, a runtime error, JS
 * disabled — the timer fires and every [data-anim] element becomes visible
 * again. Content is never permanently stranded at opacity 0.
 */
export function MotionProvider() {
  useEffect(() => {
    const w = window as Window & { __animFailsafe?: ReturnType<typeof setTimeout> };
    if (w.__animFailsafe) {
      clearTimeout(w.__animFailsafe);
      delete w.__animFailsafe;
    }

    // Section heights change as fonts settle and reveals run.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}
