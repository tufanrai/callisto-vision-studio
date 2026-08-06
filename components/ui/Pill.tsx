"use client";

import Link from "next/link";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { Dot } from "./Eyebrow";

/**
 * The design's call to action, in its four grounds.
 *
 * `accent`  — Doe Brown fill, for the primary action on a dark ground.
 * `solid`   — Twilight fill, for the primary action on a light ground.
 * `ghost`   — outlined, inverting to a fill on hover.
 * `outline` — outlined on a light ground, inverting to Twilight.
 *
 * Every variant carries the trailing dot except the plain outline links, so
 * `dot` is opt-out rather than opt-in.
 *
 * A client component solely so the magnetic hover can attach to the anchor
 * itself. Wrapping it instead would put an extra box between the pill and its
 * flex parent and change how the button rows wrap.
 */
type Variant = "accent" | "solid" | "ghost" | "outline";

const VARIANTS: Record<Variant, string> = {
  accent: "bg-doe text-ink-deep hover:bg-snow",
  solid: "bg-twilight text-snow hover:bg-doe hover:text-ink-deep",
  ghost: "border border-edge-dark text-snow hover:border-doe",
  outline:
    "border border-edge-light text-twilight hover:border-twilight hover:bg-twilight hover:text-snow",
};

export function PillLink({
  href,
  children,
  variant = "accent",
  dot = true,
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  dot?: boolean;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const ref = useMagnetic<HTMLAnchorElement>();
  const cls = `pill pill-lift ${VARIANTS[variant]} ${className ?? ""}`;
  const body = (
    <>
      {children}
      {dot ? <Dot /> : null}
    </>
  );

  // mailto:/tel:/# targets are not routes — next/link would prefetch them.
  if (!href.startsWith("/")) {
    return (
      <a ref={ref} href={href} className={cls} {...rest}>
        {body}
      </a>
    );
  }

  return (
    <Link ref={ref} href={href} className={cls} {...rest}>
      {body}
    </Link>
  );
}

/**
 * A text link that sits on a hairline and lifts the rule to Doe Brown on
 * hover — the design's secondary, in-flow call to action.
 *
 * The dot travels to the right as the rule recolours, so the control reads as
 * pointing somewhere rather than merely highlighting.
 */
export function RuleLink({
  href,
  children,
  tone = "light",
  className,
}: {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`label-tight group inline-flex items-center gap-3.5 self-start border-b pb-2.5 text-xs transition-colors duration-400 hover:border-doe ${
        tone === "dark"
          ? "border-snow/25 text-snow"
          : "border-twilight/25 text-twilight"
      } ${className ?? ""}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="block size-[5px] rounded-full bg-doe transition-transform duration-500 ease-brand motion-safe:group-hover:translate-x-1.5"
      />
    </Link>
  );
}
