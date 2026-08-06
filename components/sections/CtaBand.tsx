import Link from "next/link";
import { Animate } from "@/components/motion/Animate";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { mailtoHref, site } from "@/lib/site";

/**
 * Closing conversion band. Full Twilight field — the brand colour at full
 * bleed, so the last thing on every page reads as arrival rather than another
 * section.
 */
export function CtaBand({
  title = "Tell us what you need.",
  emphasis = "We reply within one business day.",
  lede = "Confirm a package and a 50% advance, and we schedule the discovery call within 24 hours — at a time that works in your time zone, not ours.",
}: {
  title?: string;
  emphasis?: string;
  lede?: string;
}) {
  return (
    <section className="bg-twilight py-24 lg:py-32">
      <div className="mx-auto max-w-[92rem] px-6 lg:px-12">
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <Animate variant="slide-left" duration={0.7}>
              <div className="flex items-center gap-4">
                <span className="h-3 w-10 bg-doe" aria-hidden="true" />
                <span className="label text-doe-light">Start a project</span>
              </div>
            </Animate>

            <SplitHeading className="mt-7 max-w-[18ch] text-balance text-[clamp(2.3rem,5.2vw,4.5rem)] text-snow">
              {title} <em className="text-doe not-italic">{emphasis}</em>
            </SplitHeading>

            <Animate delay={0.15}>
              <p className="mt-7 max-w-[54ch] text-pretty text-[1.05rem] leading-relaxed text-mist">
                {lede}
              </p>
            </Animate>
          </div>

          <Animate delay={0.2} className="flex flex-wrap gap-4">
            <Link
              href="/contact-us"
              className="label inline-flex min-h-14 items-center bg-doe px-9 text-twilight-deep transition-colors hover:bg-snow"
            >
              Book a discovery call
            </Link>
            <a
              href={mailtoHref}
              className="label inline-flex min-h-14 items-center border-2 border-edge-dark px-9 text-snow transition-colors hover:border-snow hover:bg-snow/10"
            >
              Email the studio
            </a>
          </Animate>
        </div>

        <p className="label mt-14 border-t border-rule-dark pt-8 text-mist">
          {site.contact.address.street}, {site.contact.address.locality} ·{" "}
          {site.contact.phoneDisplay} · Invoiced in {site.currency}
        </p>
      </div>
    </section>
  );
}
