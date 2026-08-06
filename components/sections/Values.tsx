import { Animate, AnimateGroup } from "@/components/motion/Animate";
import { Marquee } from "@/components/motion/Marquee";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { character, values } from "@/lib/content/positioning";

/**
 * The values marquee, with the brand's character set out beneath it. The five
 * values are single words, so they only carry weight at display scale — as a
 * bulleted list they read as filler.
 */
export function Values() {
  return (
    <section className="overflow-hidden bg-twilight py-[clamp(4rem,7vw,6.875rem)] text-snow">
      <Animate variant="rise-sm" className="shell block pb-[clamp(2rem,3.6vw,3.125rem)]">
        <Eyebrow>What we stand for</Eyebrow>
      </Animate>

      <Marquee
        items={[...values, ...values]}
        duration={38}
        itemClassName="font-display text-[clamp(1.75rem,4.6vw,4.75rem)] tracking-[-0.02em]"
        gapClassName="gap-[clamp(1.375rem,3vw,3.125rem)] pr-[clamp(1.375rem,3vw,3.125rem)]"
      />

      <AnimateGroup
        variant="rise-sm"
        stagger={0.1}
        className="shell flex flex-wrap gap-[clamp(1.75rem,4vw,4rem)] pt-[clamp(2.5rem,4.4vw,4rem)]"
      >
        {character.map((item) => (
          <div key={item.title} className="flex-[1_1_min(100%,18.75rem)]">
            <h3 className="mb-4.5 text-[clamp(1.375rem,2vw,1.875rem)] tracking-[-0.02em]">
              {item.title}
            </h3>
            <p className="max-w-[44ch] text-sm leading-[1.9] font-light text-balance text-mist">
              {item.body}
            </p>
          </div>
        ))}
      </AnimateGroup>
    </section>
  );
}
