import Link from "next/link";
import { Animate } from "@/components/motion/Animate";
import { Parallax } from "@/components/motion/Parallax";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Wordmark } from "@/components/brand/Wordmark";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillLink } from "@/components/ui/Pill";
import { mailtoHref, site, telHref } from "@/lib/site";

const serviceLinks = [
  { label: "Graphic Design", href: "/our-services#graphic-design" },
  { label: "Branding", href: "/our-services#branding" },
  { label: "Motion Graphics", href: "/our-services#motion-graphics" },
  { label: "Video Editing", href: "/our-services#video-editing" },
  { label: "Digital Marketing", href: "/our-services#digital-marketing" },
];

/**
 * Destinations must stay distinct — the column is keyed by href, and two
 * entries pointing at the same page is both a duplicate React key and a
 * pointless second route to the same place. "Pricing" used to sit here; with
 * rates no longer published, "Contact" already covers asking for a quote.
 */
const companyLinks = [
  { label: "About the studio", href: "/about-us" },
  { label: "Selected work", href: "/projects" },
  { label: "Process", href: "/about-us#process" },
  { label: "Contact", href: "/contact-us" },
];

const socials = ["Instagram", "Behance", "LinkedIn", "Facebook"];

const columnLink =
  "link-sweep w-fit text-sm font-light leading-[1.9] text-mist transition-colors duration-400 hover:text-snow";

/**
 * Site footer. Carries the closing call to action for every page, which is
 * why no page ends with a separate CTA band.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-deep text-snow">
      {/* The orbital rings from the brand book, run off the top-left corner. */}
      <Parallax
        aria-hidden="true"
        speed={0.26}
        className="pointer-events-none absolute -top-[10vw] -left-[14vw] size-[44vw] rounded-full border border-doe/16"
      />
      <Parallax
        aria-hidden="true"
        speed={0.44}
        className="pointer-events-none absolute -top-[5vw] -left-[9vw] size-[34vw] rounded-full border border-snow/6"
      />

      <section className="shell relative pt-[clamp(4.5rem,10vw,9.375rem)] pb-[clamp(3.5rem,6vw,6rem)]">
        <Eyebrow rule className="mb-[clamp(1.75rem,3vw,2.75rem)]">
          Get in touch
        </Eyebrow>

        <div className="grid items-end gap-[clamp(2rem,5vw,5rem)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,21.25rem),1fr))]">
          <SplitHeading
            stagger={0.1}
            className="text-[clamp(2.375rem,5.6vw,5.375rem)] leading-[1.02]"
          >
            Let&rsquo;s make your brand
            <br />
            <em>impossible</em> to ignore.
          </SplitHeading>

          <Animate delay={0.18} className="flex max-w-[27.5rem] flex-col gap-[26px]">
            <p className="text-[clamp(0.875rem,1.1vw,1rem)] leading-[1.75] font-light text-balance text-mist">
              We design, animate and edit for brands across the UK, Australia and
              the UAE.
            </p>
            <div className="flex flex-wrap gap-3">
              <PillLink href="/contact-us" variant="accent">
                Start a project
              </PillLink>
              <PillLink href={mailtoHref} variant="ghost" dot={false}>
                Email the studio
              </PillLink>
            </div>
          </Animate>
        </div>
      </section>

      <div className="h-px bg-snow/10" />

      <section className="shell relative grid gap-[clamp(2rem,4vw,3.5rem)] py-[clamp(3rem,5vw,5rem)] [grid-template-columns:repeat(auto-fit,minmax(11.875rem,1fr))]">
        <div className="flex min-w-0 flex-col gap-3.5">
          <h3 className="label font-sans text-doe">Studio</h3>
          <p className="text-sm leading-[1.8] font-light text-mist">
            {site.contact.address.street}
            <br />
            {site.contact.address.locality} 44600, {site.contact.address.countryName}
          </p>
          <p className="text-[13px] leading-[1.8] font-light text-mist-dim">
            Sun–Fri · 09:00–18:00 NPT
            <br />
            Cover across GMT, GST &amp; AEST
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-3.5">
          <h3 className="label font-sans text-doe">Services</h3>
          {serviceLinks.map((item) => (
            <Link key={item.href} href={item.href} className={columnLink}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex min-w-0 flex-col gap-3.5">
          <h3 className="label font-sans text-doe">Company</h3>
          {companyLinks.map((item) => (
            <Link key={item.href} href={item.href} className={columnLink}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex min-w-0 flex-col gap-3.5">
          <h3 className="label font-sans text-doe">Direct</h3>
          <a href={mailtoHref} className={`${columnLink} break-all`}>
            {site.contact.email}
          </a>
          <a href={telHref} className={columnLink}>
            {site.contact.phoneDisplay}
          </a>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {socials.map((name) => (
              <a
                key={name}
                href="#"
                className="label-tight inline-flex h-[38px] min-w-[38px] items-center justify-center rounded-full border border-snow/16 px-3 text-[0.625rem] text-mist transition-colors hover:border-doe hover:text-snow"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="shell relative pb-[clamp(1.75rem,3vw,2.75rem)]">
        {/* The wordmark at full width, dropped to a watermark. */}
        <Wordmark decorative className="block w-full text-snow/13" />
        <div className="mt-[clamp(1.25rem,2.4vw,2.125rem)] flex flex-wrap items-center justify-between gap-x-7 gap-y-4 border-t border-snow/10 pt-[22px]">
          <p className="text-xs font-light tracking-[0.04em] text-mist-dim">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          {/* `py-2` is not decorative: at 12px these links are only 16px tall,
              under the 24px minimum target size of WCAG 2.2 (2.5.8). The
              padding raises the hit area without moving the baseline. */}
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="inline-flex items-center py-2 text-xs font-light text-mist-dim hover:text-snow"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center py-2 text-xs font-light text-mist-dim hover:text-snow"
            >
              Terms
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
}
