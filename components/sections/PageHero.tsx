import { Animate } from "@/components/motion/Animate";
import { Parallax } from "@/components/motion/Parallax";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * The shared inner-page opening: ink-deep ground, one orbital ring bled off a
 * corner, the eyebrow, the headline, and a footer row of lead copy against
 * whatever that page's opening evidence is — pills on Services, figures on
 * Work, contact details on Contact.
 *
 * The headline plays on mount rather than on scroll: it is already in view
 * when the route renders, so a scroll trigger would either fire instantly
 * anyway or, on a short viewport, never fire at all.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  aside,
  children,
  /** Which corner the ring runs off. */
  ring = "top-right",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  /** The right-hand half of the footer row. */
  aside?: React.ReactNode;
  /** Full-width content below the footer row, e.g. a wide image. */
  children?: React.ReactNode;
  ring?: "top-right" | "top-left" | "bottom-left" | "bottom-right";
  className?: string;
}) {
  const RINGS = {
    "top-right": "-top-[20vw] -right-[14vw] size-[50vw]",
    "top-left": "-top-[14vw] -left-[16vw] size-[48vw]",
    "bottom-left": "-bottom-[26vw] -left-[18vw] size-[52vw]",
    "bottom-right": "-bottom-[24vw] -right-[15vw] size-[50vw]",
  } as const;

  return (
    <section
      className={`relative overflow-hidden bg-ink-deep pt-[clamp(6.875rem,11vw,11.875rem)] text-snow ${className ?? ""}`}
    >
      <Parallax
        aria-hidden="true"
        speed={0.34}
        className={`pointer-events-none absolute rounded-full border border-doe/13 ${RINGS[ring]}`}
      />

      <div className="shell relative">
        <Eyebrow className="mb-[clamp(1.625rem,3vw,2.625rem)]">{eyebrow}</Eyebrow>

        <SplitHeading
          as="h1"
          hero
          immediate
          stagger={0.11}
          className="max-w-[17ch] text-[clamp(2.625rem,7.4vw,8.125rem)]"
        >
          {title}
        </SplitHeading>

        <div className="flex flex-wrap items-end justify-between gap-[clamp(1.875rem,5vw,5rem)] pt-[clamp(2.25rem,4vw,4rem)]">
          <Animate
            hero
            variant="blur"
            delay={0.3}
            className="flex-[1_1_min(100%,27.5rem)] text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-[1.78] font-light text-balance text-mist"
          >
            {lead}
          </Animate>
          {aside ? (
            <Animate hero delay={0.42}>
              {aside}
            </Animate>
          ) : null}
        </div>
      </div>

      {children}
    </section>
  );
}
