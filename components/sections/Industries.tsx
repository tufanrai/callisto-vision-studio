import { Animate } from "@/components/motion/Animate";
import { Marquee } from "@/components/motion/Marquee";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { industryTerms } from "@/lib/content/positioning";

/**
 * A Twilight band naming the sectors the studio works in, set at display
 * scale and scrolling. The full sector detail sits in the industry packages
 * on the services page; here it is a claim of range, not a list to read.
 */
export function Industries({
  label = "Industries we serve",
  duration = 46,
}: {
  label?: string;
  duration?: number;
}) {
  return (
    <section className="overflow-hidden bg-twilight py-[clamp(4rem,7vw,6.875rem)] text-snow">
      <Animate variant="rise-sm" className="shell block pb-[clamp(2.25rem,4vw,3.5rem)]">
        <Eyebrow>{label}</Eyebrow>
      </Animate>
      {/* Doubled so one copy of the track is wider than any viewport — see
          the note in ServiceBand. */}
      <Marquee
        items={[...industryTerms, ...industryTerms]}
        duration={duration}
        itemClassName="font-display text-[clamp(1.75rem,4.4vw,4.5rem)] tracking-[-0.02em]"
      />
    </section>
  );
}
