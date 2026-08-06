import { Animate } from "@/components/motion/Animate";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillLink } from "@/components/ui/Pill";
import type { Clause } from "@/lib/content/legal";
import { effective } from "@/lib/content/legal";
import { mailtoHref, site } from "@/lib/site";

/**
 * The shared body for the privacy and terms pages.
 *
 * Legal copy is the one place on a site where people arrive looking for a
 * specific clause rather than reading top to bottom, so it is set as a
 * numbered index down the left and the clauses on the right — the same
 * two-column device the About page uses for the nine-stage process. Each
 * clause is a real heading with its own anchor, so a paragraph can be linked
 * to directly.
 */
export function LegalDocument({ clauses }: { clauses: readonly Clause[] }) {
  const slug = (clause: Clause) =>
    clause.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  return (
    <>
      <section className="on-light bg-snow px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(3.5rem,7vw,7rem)]">
        <div className="mx-auto flex max-w-400 flex-wrap gap-[clamp(2rem,5vw,5.625rem)]">
          {/* The index. Sticky on desktop, so the reader keeps their place in
              a long document; a plain list on narrow screens.

              The <nav> is nested inside Animate rather than being Animate's
              own tag: Animate renders only the props it declares, so an
              aria-label passed to it is silently dropped and the landmark
              ends up unnamed — indistinguishable from the site's primary nav
              in a screen reader's landmark list. */}
          <Animate className="flex-[0_1_min(100%,17.5rem)] self-start lg:sticky lg:top-32">
            <nav aria-label="Contents">
              <Eyebrow tone="light" className="mb-5.5">
                Contents
              </Eyebrow>
              <ol className="flex flex-col">
                {clauses.map((clause) => (
                  <li key={clause.n}>
                    <a
                      href={`#${slug(clause)}`}
                      className="flex gap-4 border-b border-twilight/12 py-2.75 text-[13px] font-light text-ink-soft transition-colors hover:text-doe-deep"
                    >
                      <span
                        aria-hidden="true"
                        className="tabular w-5 shrink-0 text-doe-deep"
                      >
                        {clause.n}
                      </span>
                      {clause.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Animate>

          <Animate
            delay={0.12}
            className="flex-[1_1_min(100%,32.5rem)] border-t border-twilight/16"
          >
            {clauses.map((clause) => (
              <article
                key={clause.n}
                id={slug(clause)}
                className="scroll-mt-32 border-b border-twilight/12 py-[clamp(1.75rem,2.6vw,2.5rem)]"
              >
                <div className="flex gap-[clamp(1.125rem,2.4vw,2.25rem)]">
                  <span
                    aria-hidden="true"
                    className="tabular w-7.5 shrink-0 pt-1.5 font-display text-[15px] tracking-[0.08em] text-doe-deep"
                  >
                    {clause.n}
                  </span>
                  <div className="flex flex-col gap-3.5">
                    <h2 className="text-[clamp(1.25rem,1.9vw,1.6875rem)] tracking-[-0.018em]">
                      {clause.title}
                    </h2>
                    {clause.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="max-w-[68ch] text-[14.5px] leading-[1.85] font-light text-balance text-ink-soft"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {clause.points ? (
                      <ul className="mt-1 flex flex-col gap-2.5">
                        {clause.points.map((point) => (
                          <li
                            key={point}
                            className="flex max-w-[68ch] gap-3.5 text-[14px] leading-[1.75] font-light text-ink-muted"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2.5 block size-1 shrink-0 rounded-full bg-doe"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}

            <p className="pt-6 text-[13px] leading-[1.8] font-light text-ink-muted">
              In effect from {effective}.
            </p>
          </Animate>
        </div>
      </section>

      <section className="on-light border-t border-twilight/10 bg-pure px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(3.5rem,6vw,6rem)]">
        <div className="mx-auto flex max-w-400 flex-wrap items-end justify-between gap-x-15 gap-y-6">
          <div className="flex-[1_1_min(100%,26.25rem)]">
            <h2 className="mb-4.5 text-[clamp(1.5rem,2.8vw,2.5rem)] leading-[1.06]">
              Anything here unclear?
            </h2>
            <p className="max-w-[52ch] text-sm leading-[1.85] font-light text-balance text-ink-soft">
              Write to us and a person will answer — these terms are meant to
              be read, not clicked past.
            </p>
          </div>
          <PillLink href={mailtoHref} variant="solid">
            {site.contact.email}
          </PillLink>
        </div>
      </section>
    </>
  );
}
