"use client";

import { useState } from "react";
import { Animate, AnimateGroup } from "@/components/motion/Animate";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { MediaFrame } from "@/components/ui/MediaFrame";
import {
  disciplineFilters,
  projectIndex,
  type Discipline,
} from "@/lib/content/portfolio";

/**
 * The full project index, filtered by discipline.
 *
 * The count is rendered from the filtered list rather than tracked in state:
 * one source of truth means the two can never disagree, and it is also the
 * live region a keyboard user needs, since filtering otherwise changes the
 * page silently.
 */
export function WorkIndex() {
  const [filter, setFilter] = useState<Discipline | "all">("all");

  const visible =
    filter === "all"
      ? projectIndex
      : projectIndex.filter((project) => project.keys.includes(filter));

  return (
    <section
      id="all-projects"
      className="on-light scroll-mt-30 bg-snow px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(3.75rem,7vw,6.875rem)]"
    >
      <div className="mx-auto max-w-400">
        <Animate className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5 pb-[clamp(1.75rem,3vw,2.75rem)]">
          <SplitHeading className="text-[clamp(1.75rem,3.4vw,3.25rem)] leading-[1.04]">
            The full index
          </SplitHeading>
          <p aria-live="polite" className="label text-ink-muted">
            Showing {visible.length}{" "}
            {visible.length === 1 ? "project" : "projects"}
          </p>
        </Animate>

        <Animate
          variant="fade"
          className="flex gap-2 overflow-x-auto pb-[clamp(1.5rem,2.6vw,2.375rem)]"
        >
          {disciplineFilters.map((option) => {
            const on = option.key === filter;
            return (
              <button
                key={option.key}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(option.key)}
                className={`label-tight shrink-0 cursor-pointer rounded-full border px-5 py-2.75 whitespace-nowrap transition-[color,background-color,border-color,transform] duration-350 motion-safe:hover:-translate-y-0.5 ${
                  on
                    ? "border-twilight bg-twilight text-snow"
                    : "border-edge-light text-ink-soft hover:border-twilight"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </Animate>

        {/*
          Keyed by the active filter so a change remounts the group and the
          new set staggers in. Without the key the reveal runs once on mount
          and every later filter swaps the cards in with no motion at all.
        */}
        <AnimateGroup
          key={filter}
          variant="rise-sm"
          stagger={0.055}
          className="grid gap-[clamp(1.125rem,1.8vw,1.875rem)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,20rem),1fr))]"
        >
          {visible.map((project, i) => (
            <article key={project.id} className="flex flex-col gap-4.5">
              <div className="group relative aspect-4/5 w-full overflow-hidden bg-rule-light">
                <MediaFrame
                  video={project.video}
                  title={project.title}
                  hint={project.hint}
                  src={project.src}
                  alt={project.alt}
                  sizes="(max-width: 900px) 100vw, 25vw"
                  /* One card fills a phone viewport, so the first is the LCP
                     element on the form factor Lighthouse actually scores. */
                  priority={i === 0}
                  className="motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-brand motion-safe:group-hover:scale-[1.05]"
                />
                <span className="label-tight absolute top-3.5 left-3.5 z-2 rounded-full bg-ink-deep/82 px-3 py-1.75 text-[0.625rem] text-snow">
                  {project.year}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-[clamp(1.3125rem,1.9vw,1.8125rem)] leading-[1.16]">
                    {project.title}
                  </h3>
                  <span className="label-tight text-[0.625rem] whitespace-nowrap text-doe-deep">
                    {project.region}
                  </span>
                </div>
                <p className="label-tight text-[0.625rem] text-ink-muted">
                  {project.sector}
                </p>
                <ul className="flex flex-wrap gap-1.75">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="label-tight rounded-full border border-twilight/16 px-3 py-1.5 text-[0.625rem] font-medium tracking-[0.1em] text-ink-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <p className="text-[13px] leading-[1.75] font-light text-balance text-ink-muted">
                  {project.note}
                </p>
              </div>
            </article>
          ))}
        </AnimateGroup>

        {visible.length === 0 ? (
          <p className="py-15 font-display text-[clamp(1.25rem,2vw,1.75rem)] text-ink-muted">
            No projects in this discipline yet — but we&rsquo;d love to make
            yours the first.
          </p>
        ) : null}
      </div>
    </section>
  );
}
