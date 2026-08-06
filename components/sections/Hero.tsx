import { Animate, AnimateGroup } from "@/components/motion/Animate";
import { Counter } from "@/components/motion/Counter";
import { Parallax } from "@/components/motion/Parallax";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { PillLink } from "@/components/ui/Pill";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  clients,
  heroRail,
  sectorsRepresented,
} from "@/lib/content/portfolio";
import { servicePillars } from "@/lib/content/services";
import { site } from "@/lib/site";

/**
 * Every figure is counted from the work itself. Nothing here is a round
 * number chosen to look good — a stat a visitor can disprove by scrolling is
 * worse than no stat.
 */
const stats = [
  { value: site.stats.projects, label: "Projects delivered" },
  { value: String(clients.length), label: "Named clients" },
  { value: String(sectorsRepresented), label: "Sectors served" },
  { value: String(servicePillars.length), label: "Disciplines, one roof" },
];

/**
 * Home hero. Ink-deep ground, the headline at its largest anywhere on the
 * site, and a five-frame rail across the fold line — the rail is the first
 * proof, before a single claim is made.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-deep pt-[clamp(6rem,9vw,8.75rem)] text-snow">
      {/* Orbital rings from the brand book, drifting at different rates so the
          ground behind the headline has depth as the page moves. */}
      <Parallax
        aria-hidden="true"
        speed={0.3}
        className="pointer-events-none absolute -top-[18vw] -right-[16vw] size-[56vw] rounded-full border border-doe/14"
      />
      <Parallax
        aria-hidden="true"
        speed={0.5}
        className="pointer-events-none absolute -top-[9vw] -right-[8vw] size-[40vw] rounded-full border border-snow/5"
      />

      <div className="shell relative">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 pb-[clamp(2.125rem,4vw,4rem)]">
          <Eyebrow>Creative &amp; Digital Marketing Studio</Eyebrow>
          <span className="label text-mist-dim">
            Kathmandu, Nepal — Working worldwide
          </span>
        </div>

        <SplitHeading
          as="h1"
          hero
          immediate
          stagger={0.12}
          className="max-w-[19ch] text-[clamp(2.875rem,8.2vw,9.25rem)] leading-[0.94]"
        >
          Design with purpose.
          <br />
          Growth you can <em>measure</em>.
        </SplitHeading>

        <div className="flex flex-wrap items-end justify-between gap-[clamp(2rem,5vw,5.625rem)] pt-[clamp(2.5rem,5vw,5rem)] pb-[clamp(2.75rem,5vw,4.75rem)]">
          <Animate
            hero
            variant="blur"
            delay={0.32}
            className="flex flex-[1_1_min(100%,28.75rem)] flex-col gap-[30px]"
          >
            <p className="text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-[1.78] font-light text-balance text-mist">
              Design, branding, motion, video and marketing — for work that
              performs, not just work that looks good.
            </p>
            <div className="flex flex-wrap gap-3">
              <PillLink href="/contact-us" variant="accent">
                Start a project
              </PillLink>
              <PillLink href="/projects" variant="ghost" dot={false}>
                See the work
              </PillLink>
            </div>
          </Animate>

          <AnimateGroup
            variant="fade"
            delay={0.4}
            className="rule-grid flex-[0_1_min(100%,32.5rem)] [grid-template-columns:repeat(auto-fit,minmax(9.375rem,1fr))]"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rule-cell-dark flex flex-col gap-[7px] bg-ink-deep px-5 pt-[22px] pb-5"
              >
                <Counter
                  value={stat.value}
                  className="tabular font-display text-[clamp(1.875rem,3vw,2.625rem)] leading-none text-doe"
                />
                <span className="label leading-[1.5] text-mist">
                  {stat.label}
                </span>
              </div>
            ))}
          </AnimateGroup>
        </div>
      </div>

      {/*
        Deliberately not revealed on scroll. The first two frames are the LCP
        candidates on a laptop, and any entrance that starts them at opacity 0
        or under a clip moves the largest paint to the end of the animation.
        They get a hover response instead, which costs nothing before paint.
      */}
      <div className="rule-grid relative border-t border-snow/12 [grid-template-columns:repeat(auto-fit,minmax(min(100%,15rem),1fr))]">
        {heroRail.map((slot, i) => (
          /*
            A filled frame gets a white plate, an empty one keeps the ink
            ground. Artwork arriving here is as likely to be a logo or a
            packaging mockup on transparency as it is a photograph, and a
            transparent PNG over ink-deep loses everything drawn in the
            brand's own blues. The plate costs nothing behind an opaque image.
          */
          <div
            key={slot.id}
            className={`rule-cell-dark group relative aspect-4/3 min-h-45 overflow-hidden ${
              slot.src ? "bg-pure" : "bg-ink-deep"
            }`}
          >
            <ImageSlot
              tone="dark"
              hint={slot.hint}
              src={slot.src}
              alt={slot.alt}
              sizes="(max-width: 900px) 100vw, 20vw"
              /* The rail straddles the fold on a laptop; the first two frames
                 are LCP candidates and must not wait on the lazy queue. */
              priority={i < 2}
              className="motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-brand motion-safe:group-hover:scale-[1.06]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
