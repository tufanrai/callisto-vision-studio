"use client";

import { useRef } from "react";
import { ScrollTrigger, gsap, useGSAP } from "@/components/motion/gsap";
import { tiers } from "@/lib/content/tiers";

/**
 * The signature element: the three service tiers drawn as orbits.
 *
 * Ring order encodes delivery speed — the faster the published turnaround, the
 * tighter the orbit — so the diagram teaches the tier system rather than
 * decorating it. The exact window is annotated on each ring, because the
 * ordering alone is not the information; the numbers are.
 *
 * Rings draw themselves in with DrawSVG, then the bodies begin orbiting.
 * Rotation periods are ambient, not proportional: the real ratio
 * (1h : 48h : 72h) would leave two rings visually static.
 */

const RADII = [66, 112, 158] as const; // premium -> standard -> basic
const PERIODS = [16, 24, 32] as const; // seconds per revolution
const CX = 200;
const CY = 200;
const TICKS = 24; // delivery is quoted in hours, so the outer scale is a clock

export function OrbitDiagram({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rings = [...tiers].reverse(); // innermost ring is the fastest tier

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = ref.current;
        if (!root) return;

        // Paused, then started by a ScrollTrigger that immediately kills
        // itself — the timeline is never re-rendered by a refresh.
        const tl = gsap.timeline({ paused: true });

        /**
         * SVG children are transformed in the viewBox's user space, so GSAP
         * needs `svgOrigin` — a px `transformOrigin` would be measured against
         * the rendered box and throw every rotation off centre.
         *
         * The dashed Basic ring is animated by opacity rather than DrawSVG:
         * DrawSVG drives stroke-dasharray itself, which would overwrite the
         * dash pattern that distinguishes that tier.
         */
        tl.from(root.querySelectorAll("[data-tick]"), {
          opacity: 0,
          duration: 0.6,
          stagger: 0.015,
          ease: "power2.out",
        })
          .from(
            root.querySelectorAll("[data-ring][data-draw]"),
            { drawSVG: "0%", duration: 1.5, stagger: 0.18, ease: "power2.inOut" },
            "-=0.35",
          )
          .from(
            root.querySelectorAll("[data-ring][data-dashed]"),
            { opacity: 0, duration: 1.1, ease: "power2.out" },
            "-=1.2",
          )
          .from(
            root.querySelectorAll("[data-core]"),
            {
              scale: 0,
              svgOrigin: `${CX} ${CY}`,
              duration: 0.7,
              ease: "back.out(2)",
            },
            "-=0.9",
          )
          .from(
            root.querySelectorAll("[data-body]"),
            { opacity: 0, duration: 0.5, stagger: 0.1 },
            "-=0.5",
          );

        // Ambient orbit, started after the draw-in.
        const spins = Array.from(
          root.querySelectorAll<SVGGElement>("[data-orbit]"),
        ).map((g, i) =>
          gsap.to(g, {
            rotation: 360,
            duration: PERIODS[i],
            repeat: -1,
            ease: "none",
            svgOrigin: `${CX} ${CY}`,
            delay: 1.4,
          }),
        );

        const st = ScrollTrigger.create({
          trigger: root,
          start: "top 85%",
          once: true,
          onEnter: () => tl.play(),
        });

        return () => {
          st.kill();
          tl.kill();
          spins.forEach((s) => s.kill());
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <figure ref={ref} className={className}>
      <svg
        viewBox="0 0 400 400"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-labelledby="orbit-title orbit-desc"
      >
        <title id="orbit-title">Service tiers drawn as orbits</title>
        <desc id="orbit-desc">
          {rings
            .map(
              (t) =>
                `${t.name}: delivery ${t.delivery.toLowerCase()}, ${t.revisionsLabel.toLowerCase()}`,
            )
            .join(". ")}
          .
        </desc>

        <g stroke="currentColor" className="text-doe/45">
          {Array.from({ length: TICKS }, (_, i) => {
            const a = (i / TICKS) * Math.PI * 2 - Math.PI / 2;
            const major = i % 6 === 0;
            const r0 = 176;
            const r1 = major ? 192 : 183;
            return (
              <line
                key={i}
                data-tick
                x1={CX + Math.cos(a) * r0}
                y1={CY + Math.sin(a) * r0}
                x2={CX + Math.cos(a) * r1}
                y2={CY + Math.sin(a) * r1}
                strokeWidth={major ? 3 : 1.5}
              />
            );
          })}
        </g>

        {rings.map((tier, i) => {
          const r = RADII[i];
          const isPremium = tier.id === "premium";
          return (
            <g key={tier.id}>
              <circle
                data-ring
                {...(tier.id === "basic"
                  ? { "data-dashed": "" }
                  : { "data-draw": "" })}
                cx={CX}
                cy={CY}
                r={r}
                fill="none"
                stroke="currentColor"
                strokeWidth={isPremium ? 3 : 1.75}
                className={isPremium ? "text-doe" : "text-mist/55"}
                strokeDasharray={tier.id === "basic" ? "3 9" : undefined}
              />
              <g data-orbit>
                <circle
                  data-body
                  cx={CX + r}
                  cy={CY}
                  r={isPremium ? 8 : 5}
                  className={isPremium ? "fill-doe" : "fill-snow"}
                />
              </g>
            </g>
          );
        })}

        {/* The brief, at the centre of the system. */}
        <circle data-core cx={CX} cy={CY} r={11} className="fill-snow" />
        <circle
          data-core
          cx={CX}
          cy={CY}
          r={24}
          fill="none"
          strokeWidth="2"
          className="stroke-snow/35"
        />
      </svg>

      <figcaption className="mt-9 grid border-t-2 border-doe sm:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className="border-b border-rule-dark py-5 sm:border-b-0 sm:pr-4 sm:last:pr-0"
          >
            <p className={`label ${tier.id === "premium" ? "text-doe" : "text-mist"}`}>
              {tier.name}
            </p>
            <p
              className={`mt-3 font-display text-[1.6rem] leading-none font-bold ${
                tier.id === "premium" ? "text-doe" : "text-snow"
              }`}
            >
              {tier.delivery.replace("Within ", "")}
            </p>
            <p className="label mt-3 whitespace-nowrap text-mist/80">
              {tier.revisions} rev.
            </p>
          </div>
        ))}
      </figcaption>
    </figure>
  );
}
