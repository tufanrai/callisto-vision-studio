import { Animate, AnimateGroup } from "@/components/motion/Animate";
import { Counter } from "@/components/motion/Counter";
import { ParallaxMedia } from "@/components/motion/Parallax";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { differentiators } from "@/lib/content/positioning";
import { clientResponsibilities } from "@/lib/content/process";
import { industries } from "@/lib/content/services";
import { clients, team } from "@/lib/content/portfolio";
import { site } from "@/lib/site";

/** Mission and vision as a facing pair — the studio's two-sentence brief. */
export function MissionVision() {
  const panels = [
    { label: "Our mission", body: site.mission },
    { label: "Our vision", body: site.vision },
  ];

  return (
    <section className="on-light bg-snow px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(4.5rem,8vw,8.75rem)]">
      <div className="mx-auto max-w-400 rule-grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,23.75rem),1fr))]">
        {panels.map((panel, i) => (
          <div
            key={panel.label}
            className="rule-cell-light flex flex-col gap-5 bg-snow px-[clamp(1.625rem,2.6vw,2.75rem)] py-[clamp(1.875rem,3vw,3.25rem)]"
          >
            <Animate variant="rise-sm" delay={i * 0.1}>
              <span className="label text-doe-deep">{panel.label}</span>
            </Animate>
            <SplitHeading
              as="p"
              delay={i * 0.1}
              stagger={0.07}
              className="font-display text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.18] tracking-[-0.022em]"
            >
              {panel.body}
            </SplitHeading>
          </div>
        ))}
      </div>
    </section>
  );
}

/** The three claims that separate the studio from a freelancer roster. */
export function Differentiators() {
  return (
    <section className="on-light border-t border-twilight/10 bg-pure px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(4.5rem,8vw,8.75rem)]">
      <div className="mx-auto max-w-400">
        <div className="flex flex-wrap items-end justify-between gap-x-15 gap-y-6 pb-[clamp(2.375rem,4.4vw,4rem)]">
          <SplitHeading className="flex-[1_1_min(100%,27.5rem)] text-[clamp(2rem,4.4vw,4.5rem)]">
            What makes us
            <br />
            different.
          </SplitHeading>
          <Animate
            variant="rise-sm"
            delay={0.18}
            className="max-w-[44ch] flex-[1_1_min(100%,20rem)]"
          >
            <p className="text-sm leading-[1.85] font-light text-balance text-ink-soft">
              {site.stats.experienceYears} years of combined experience, built so
              we&rsquo;re never the reason a launch slips.
            </p>
          </Animate>
        </div>

        <AnimateGroup
          as="ol"
          stagger={0.09}
          className="rule-grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,18.75rem),1fr))]"
        >
          {differentiators.map((claim) => (
            <li
              key={claim.n}
              className="rule-cell-light group flex min-h-54 flex-col gap-4 bg-pure px-[clamp(1.5rem,2.2vw,2.25rem)] py-[clamp(1.75rem,2.8vw,2.75rem)] transition-colors duration-500 hover:bg-snow"
            >
              <span
                aria-hidden="true"
                data-numeral={claim.n}
                className="numeral-ghost tabular font-display text-[clamp(2.375rem,4vw,3.625rem)] leading-none text-twilight/16 transition-colors duration-500 group-hover:text-doe/45"
              />
              <h3 className="text-[clamp(1.375rem,2vw,1.8125rem)] leading-[1.18] tracking-[-0.018em]">
                {claim.title}
              </h3>
              <p className="text-[13px] leading-[1.85] font-light text-balance text-ink-muted">
                {claim.body}
              </p>
            </li>
          ))}
        </AnimateGroup>
      </div>
    </section>
  );
}

/** The studio's figures, on the ink ground. */
export function StudioStats() {
  const stats = [
    { value: site.stats.projects, label: "Projects delivered" },
    {
      value: `${site.stats.experienceYears} yrs`,
      label: "Combined industry experience",
    },
    { value: String(clients.length), label: "Named clients" },
    { value: String(industries.length), label: "Industries served" },
  ];

  return (
    <section className="bg-ink-deep px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(3.75rem,7vw,6.875rem)] text-snow">
      <AnimateGroup
        variant="rise-sm"
        stagger={0.07}
        className="mx-auto max-w-400 rule-grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,12.5rem),1fr))]"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rule-cell-dark flex flex-col gap-2.5 bg-ink-deep px-[clamp(1.375rem,2vw,1.875rem)] py-[clamp(1.625rem,2.6vw,2.375rem)]"
          >
            <Counter
              value={stat.value}
              className="tabular font-display text-[clamp(2.25rem,3.8vw,3.625rem)] leading-none text-doe"
            />
            <span className="label leading-[1.6] text-mist">{stat.label}</span>
          </div>
        ))}
      </AnimateGroup>
    </section>
  );
}

/** The team, one frame each. */
export function Team() {
  return (
    <section
      id="team"
      className="on-light scroll-mt-30 border-t border-twilight/10 bg-pure px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(4.5rem,8vw,8.75rem)]"
    >
      <div className="mx-auto max-w-400">
        <div className="flex flex-wrap items-end justify-between gap-x-15 gap-y-6 pb-[clamp(2.375rem,4.4vw,4rem)]">
          <div className="flex-[1_1_min(100%,26.25rem)]">
            <Animate variant="rise-sm">
              <Eyebrow tone="light" className="mb-5.5">
                The team
              </Eyebrow>
            </Animate>
            <SplitHeading className="text-[clamp(2rem,4.4vw,4.5rem)]">
              One roof.
              <br />
              One point of contact.
            </SplitHeading>
          </div>
          <Animate
            variant="rise-sm"
            delay={0.18}
            className="max-w-[42ch] flex-[1_1_min(100%,18.75rem)]"
          >
            <p className="text-sm leading-[1.85] font-light text-balance text-ink-soft">
              You brief one person. Behind them: designers, motion artists,
              editors and strategists.
            </p>
          </Animate>
        </div>

        <AnimateGroup
          variant="clip"
          duration={1.1}
          stagger={0.08}
          className="grid gap-[clamp(1rem,1.6vw,1.625rem)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,15rem),1fr))]"
        >
          {team.map((member) => (
            <div key={member.id} className="group flex flex-col gap-4">
              <div className="relative aspect-4/5 w-full overflow-hidden bg-twilight/6">
                <ParallaxMedia speed={0.7}>
                  <ImageSlot
                    hint={member.hint}
                    src={member.src}
                    alt={member.alt}
                    sizes="(max-width: 900px) 100vw, 20vw"
                  />
                </ParallaxMedia>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[clamp(1.1875rem,1.7vw,1.5625rem)] tracking-[-0.015em]">
                  {member.name}
                </h3>
                <span className="label-tight text-doe-deep">{member.role}</span>
              </div>
            </div>
          ))}
        </AnimateGroup>
      </div>
    </section>
  );
}

/**
 * What the studio needs from the client. Publishing this alongside the
 * process is what makes the quoted timelines a two-way commitment rather
 * than a promise the studio alone can break.
 */
export function ClientDuties() {
  return (
    <section className="on-light bg-snow px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(4.5rem,8vw,8.75rem)]">
      <div className="mx-auto flex max-w-400 flex-wrap gap-[clamp(2rem,5vw,5.625rem)]">
        <div className="flex-[0_1_min(100%,22.5rem)]">
          <Animate variant="rise-sm">
            <Eyebrow tone="light" className="mb-5.5">
              Working together
            </Eyebrow>
          </Animate>
          <SplitHeading className="mb-5.5 text-[clamp(1.75rem,3.4vw,3.25rem)] leading-[1.05]">
            What we need
            <br />
            from you.
          </SplitHeading>
          <Animate variant="rise-sm" delay={0.16}>
            <p className="max-w-[40ch] text-sm leading-[1.85] font-light text-balance text-ink-soft">
              Good work is a two-way contract. These{" "}
              {clientResponsibilities.length} keep a project on the quoted
              timeline.
            </p>
          </Animate>
        </div>

        <AnimateGroup
          as="ul"
          variant="slide-left"
          stagger={0.07}
          className="flex-[1_1_min(100%,27.5rem)] border-t border-twilight/16"
        >
          {clientResponsibilities.map((duty) => (
            <li
              key={duty}
              className="group flex gap-5 border-b border-twilight/12 py-[clamp(1rem,1.6vw,1.375rem)] transition-[padding] duration-450 hover:pl-2"
            >
              <span
                aria-hidden="true"
                className="mt-2.25 block size-1.5 shrink-0 rounded-full bg-doe transition-transform duration-500 ease-brand motion-safe:group-hover:scale-150"
              />
              <p className="text-[14.5px] leading-[1.75] font-light text-balance text-ink-soft">
                {duty}
              </p>
            </li>
          ))}
        </AnimateGroup>
      </div>
    </section>
  );
}
