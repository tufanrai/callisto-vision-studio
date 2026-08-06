import Link from "next/link";
import { Animate } from "@/components/motion/Animate";
import { Counter } from "@/components/motion/Counter";
import { ParallaxMedia } from "@/components/motion/Parallax";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { PillLink } from "@/components/ui/Pill";
import {
  clients,
  featuredWork,
  sectorsRepresented,
} from "@/lib/content/portfolio";
import { site } from "@/lib/site";

/**
 * Home — three featured projects at deliberately unequal widths, so the row
 * reads as an edit rather than a grid.
 */
export function WorkShowcase() {
  return (
    <section
      id="work"
      className="on-light bg-snow px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(5rem,9vw,9.375rem)]"
    >
      <div className="mx-auto max-w-400">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6 pb-[clamp(2.25rem,4vw,4rem)]">
          <div>
            <Animate variant="rise-sm">
              <Eyebrow tone="light" className="mb-5.5">
                Selected work
              </Eyebrow>
            </Animate>
            <SplitHeading className="text-[clamp(2.125rem,4.6vw,4.75rem)]">
              Work we&rsquo;re proud
              <br />
              to put our name on.
            </SplitHeading>
          </div>
          <Animate variant="rise-sm" delay={0.16}>
            <PillLink href="/projects" variant="outline" className="py-4 px-7">
              All projects
            </PillLink>
          </Animate>
        </div>

        <div className="flex flex-wrap gap-[clamp(1rem,1.6vw,1.625rem)]">
          {featuredWork.map((project, i) => (
            <Animate
              key={project.id}
              variant="clip"
              duration={1.15}
              delay={i * 0.12}
              className="flex min-w-[min(100%,18.75rem)] flex-col"
              style={{ flex: `1 1 ${project.basis}` }}
            >
              {/*
                The frame sits outside the link. A video slot owns its own
                controls — play, and the reel dialog — and nesting those
                inside an anchor makes every click a navigation instead.
              */}
              <div className="group flex flex-col gap-5 text-twilight">
                <div
                  className="relative w-full overflow-hidden bg-rule-light"
                  style={{ aspectRatio: project.ratio }}
                >
                  {/*
                    Not parallaxed. Half of these frames are video slots, and
                    the reel button is positioned against this box — drifting
                    the plate would carry the control off the corner it is
                    pinned to. The hover push is the motion here instead.
                  */}
                  <MediaFrame
                    video={project.video}
                    title={project.title}
                    hint={project.hint}
                    src={project.src}
                    alt={project.alt}
                    sizes="(max-width: 900px) 100vw, 55vw"
                    className="motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-brand motion-safe:group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3.5">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[clamp(1.375rem,2.1vw,2rem)] leading-[1.15]">
                      <Link
                        href="/projects"
                        className="link-sweep transition-colors duration-400 hover:text-doe-deep"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <span className="text-xs font-light tracking-[0.06em] text-ink-muted">
                      {project.sector} · {project.tags.join(" · ")}
                    </span>
                  </div>
                  <span className="label-tight text-[0.6875rem] text-doe-deep">
                    {project.region}
                  </span>
                </div>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * The clients, directly under the work hero and on the same ground, so the
 * strip reads as part of the opening claim rather than as a logo wall.
 *
 * Set in type rather than as marks. The studio holds these clients' artwork,
 * not their logo files — and a row of six empty frames says less than a row
 * of names that can actually be read, at any size, with no request.
 */
export function ClientStrip() {
  return (
    <section
      aria-label="Clients we've worked with"
      className="border-t border-snow/12 bg-ink-deep px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(1.75rem,3vw,2.75rem)]"
    >
      <div className="mx-auto max-w-400">
        <p className="label mb-5.5 text-mist-dim">
          Clients we&rsquo;ve worked with
        </p>
        <ul className="flex flex-wrap items-baseline gap-x-[clamp(1.25rem,2.6vw,2.75rem)] gap-y-3.5">
          {clients.map((name, i) => (
            <li
              key={name}
              className="inline-flex items-baseline gap-[clamp(1.25rem,2.6vw,2.75rem)] font-display text-[clamp(1.0625rem,1.9vw,1.6875rem)] tracking-[-0.015em] text-snow"
            >
              {name}
              {i < clients.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="block size-1.5 shrink-0 rounded-full bg-doe"
                />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Four figures on the Twilight band, closing the index. */
export function WorkStats() {
  const stats = [
    { value: site.stats.projects, label: "Projects delivered" },
    { value: String(clients.length), label: "Named clients in the index" },
    { value: String(sectorsRepresented), label: "Sectors represented" },
    { value: "48h", label: "Full gallery delivery on events" },
  ];

  return (
    <section className="bg-twilight px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(3.75rem,7vw,6.875rem)] text-snow">
      <div className="mx-auto max-w-400 rule-grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,13.75rem),1fr))]">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-2.5 bg-twilight px-[clamp(1.375rem,2vw,1.875rem)] py-[clamp(1.625rem,2.6vw,2.375rem)] shadow-[0_0_0_1px_--alpha(var(--color-snow)/18%)]"
          >
            <Counter
              value={stat.value}
              className="tabular font-display text-[clamp(2.125rem,3.6vw,3.375rem)] leading-none text-doe"
            />
            <span className="label leading-[1.6] text-mist">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * The confidentiality note. Most studios bury this; putting it in the index
 * turns an absence — the projects that are not shown — into a reason to get
 * in touch.
 */
export function PortfolioNote() {
  return (
    <section className="on-light bg-pure px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(4.5rem,8vw,8.75rem)]">
      <div className="mx-auto flex max-w-400 flex-wrap items-center gap-[clamp(2rem,5vw,5.625rem)]">
        <div className="flex flex-[1_1_min(100%,26.25rem)] flex-col gap-6.5">
          <Animate variant="rise-sm">
            <Eyebrow tone="light">Portfolio note</Eyebrow>
          </Animate>
          <SplitHeading className="text-[clamp(1.75rem,3.4vw,3.375rem)] leading-[1.06]">
            Some of our best work
            <br />
            you&rsquo;ll never see here.
          </SplitHeading>
          <Animate variant="rise-sm" delay={0.14} className="flex flex-col gap-6.5">
            <p className="max-w-[56ch] text-[clamp(0.875rem,1.05vw,1rem)] leading-[1.85] font-light text-balance text-ink-soft">
              Client assets stay confidential, and we sign NDAs on request. If a
              project isn&rsquo;t in the index, ask.
            </p>
            <PillLink href="/contact-us" variant="solid" className="self-start">
              Request a private walkthrough
            </PillLink>
          </Animate>
        </div>

        <Animate
          variant="clip"
          duration={1.2}
          delay={0.14}
          className="relative aspect-4/3 flex-[1_1_min(100%,22.5rem)] overflow-hidden bg-twilight/6"
        >
          <ParallaxMedia>
            <ImageSlot
              hint="Studio / process photo"
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          </ParallaxMedia>
        </Animate>
      </div>
    </section>
  );
}
