import { Marquee } from "@/components/motion/Marquee";
import { disciplines } from "@/lib/content/positioning";

/**
 * The discipline ticker directly under the hero — a Twilight band that names
 * all six practices before the page starts explaining any of them.
 */
export function ServiceBand() {
  return (
    <section
      aria-label="What the studio does"
      className="overflow-hidden bg-twilight py-5 text-snow"
    >
      {/* Doubled before it reaches the marquee: the track loops by translating
          exactly one copy's width, so a copy narrower than the viewport shows
          a gap at the wrap. Six terms at this size do not span a wide display,
          twelve do. */}
      <Marquee
        items={[...disciplines, ...disciplines]}
        duration={34}
        itemClassName="font-display text-[clamp(1.0625rem,1.7vw,1.625rem)] tracking-[-0.01em]"
        gapClassName="gap-[2.125rem] pr-[2.125rem]"
        dotClassName="size-[5px]"
      />
    </section>
  );
}
