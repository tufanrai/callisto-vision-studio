import type { ReactNode } from "react";
import { Animate } from "@/components/motion/Animate";
import { SplitHeading } from "@/components/motion/SplitHeading";

type Tone = "dark" | "light";

/**
 * Section header. A heavy Doe Brown bar, a wide-tracked label, then the
 * headline at full scale — structured modernism, so the hierarchy is carried
 * by weight and size rather than ornament.
 */
export function SectionHeading({
  label,
  title,
  lede,
  meta,
  tone = "dark",
  align = "left",
  as = "h2",
  id,
  className,
}: {
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  meta?: string;
  tone?: Tone;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}) {
  const muted = tone === "light" ? "text-ink-muted" : "text-mist";
  const accent = tone === "light" ? "text-doe-deep" : "text-doe";
  const bar = tone === "light" ? "bg-doe-deep" : "bg-doe";
  const heading = tone === "light" ? "text-ink" : "text-snow";
  const centered = align === "center";

  return (
    <header className={`${centered ? "text-center" : ""} ${className ?? ""}`}>
      <Animate variant="slide-left" duration={0.7}>
        <div
          className={`flex items-center gap-4 ${centered ? "justify-center" : ""}`}
        >
          <span className={`h-3 w-10 shrink-0 ${bar}`} aria-hidden="true" />
          <span className={`label ${accent}`}>{label}</span>
          {meta ? (
            <>
              <span className={`${muted} opacity-40`} aria-hidden="true">
                /
              </span>
              <span className={`label ${muted}`}>{meta}</span>
            </>
          ) : null}
        </div>
      </Animate>

      <SplitHeading
        as={as}
        id={id}
        className={`mt-7 max-w-[22ch] text-balance ${
          as === "h1"
            ? "text-[clamp(2.9rem,7.4vw,6.5rem)]"
            : "text-[clamp(2.3rem,5.2vw,4.5rem)]"
        } ${heading} ${centered ? "mx-auto" : ""}`}
      >
        {title}
      </SplitHeading>

      {lede ? (
        <Animate delay={0.15}>
          <p
            className={`mt-7 max-w-[58ch] text-pretty text-[1.05rem] leading-relaxed ${muted} ${
              centered ? "mx-auto" : ""
            }`}
          >
            {lede}
          </p>
        </Animate>
      ) : null}
    </header>
  );
}
