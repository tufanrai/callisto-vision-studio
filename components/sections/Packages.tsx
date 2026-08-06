import { Animate, AnimateGroup } from "@/components/motion/Animate";
import { Marquee } from "@/components/motion/Marquee";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RuleLink } from "@/components/ui/Pill";
import { industryBundles } from "@/lib/content/packages";
import { industryTerms } from "@/lib/content/positioning";

/**
 * Industry retainers, behind a marquee of the sectors they serve.
 *
 * Scope without figures. The studio no longer publishes rates, so each card
 * states what a month in that sector actually produces and the quote follows
 * a conversation — which is also the more useful half of the information,
 * since "$2,725/month" never told anyone what they were getting.
 *
 * The rates themselves still live in lib/content/packages.ts. Nothing was
 * deleted; it simply is not rendered.
 */
export function IndustryPackages() {
  return (
    <section className="overflow-hidden bg-twilight py-[clamp(4rem,7vw,6.875rem)] text-snow">
      <Animate variant="rise-sm" className="shell block pb-[clamp(1.875rem,3.4vw,3rem)]">
        <Eyebrow>Industry retainers</Eyebrow>
      </Animate>

      <Marquee
        items={[...industryTerms, ...industryTerms]}
        duration={40}
        itemClassName="font-display text-[clamp(1.5rem,3.6vw,3.75rem)] tracking-[-0.02em]"
        gapClassName="gap-[clamp(1.25rem,2.6vw,2.75rem)] pr-[clamp(1.25rem,2.6vw,2.75rem)]"
        dotClassName="size-2"
      />

      <AnimateGroup
        variant="rise-sm"
        stagger={0.07}
        className="shell rule-grid pt-[clamp(2.5rem,4.4vw,4rem)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,16.25rem),1fr))]"
      >
        {industryBundles.map((bundle) => (
          <div
            key={bundle.id}
            className="rule-cell-dark group flex min-h-46 flex-col gap-3.5 bg-twilight p-[clamp(1.5rem,2.2vw,2rem)] transition-colors duration-500 hover:bg-twilight-raised"
          >
            <h3 className="text-[clamp(1.3125rem,1.9vw,1.6875rem)] tracking-[-0.02em]">
              {bundle.name}
            </h3>
            <ul className="flex flex-col gap-2">
              {bundle.includes.slice(0, 4).map((item) => (
                <li
                  key={item}
                  className="flex gap-2.75 text-[12.5px] leading-[1.6] font-light text-mist"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 block size-1 shrink-0 rounded-full bg-doe"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </AnimateGroup>

      <Animate variant="rise-sm" className="shell flex pt-[clamp(2rem,3.4vw,3rem)]">
        <RuleLink href="/contact-us" tone="dark">
          Ask for a quote on your sector
        </RuleLink>
      </Animate>
    </section>
  );
}
