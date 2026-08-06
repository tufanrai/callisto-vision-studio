import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Contact, Payments } from "@/components/sections/Contact";
import { MarketClocks } from "@/components/ui/MarketClocks";
import { mailtoHref, site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project with Callisto Vision Studio. Email ${site.contact.email} or message ${site.contact.phoneDisplay} on WhatsApp — we reply within one business day, in your time zone.`,
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: "Contact — Callisto Vision Studio",
    description:
      "Tell us what you need. We reply within one business day, in your time zone.",
    url: "/contact-us",
  },
};

export default function ContactPage() {
  const direct = [
    {
      label: "Email",
      value: site.contact.email,
      href: mailtoHref,
      wrap: "break-all",
    },
    {
      label: "Phone / WhatsApp",
      value: site.contact.phoneDisplay,
      href: telHref,
      wrap: "whitespace-nowrap",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        ring="bottom-right"
        title={
          <>
            Tell us what you&rsquo;re <em>building</em>.
          </>
        }
        lead="Send the brief, or just the problem. We reply within one working day, in your hours."
        aside={
          <div className="flex flex-wrap gap-[clamp(1.25rem,2.6vw,2.75rem)]">
            {direct.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex flex-col gap-1.75"
              >
                <span className="label-tight tracking-[0.18em] text-mist-dim">
                  {item.label}
                </span>
                <span
                  className={`font-display text-[clamp(1.0625rem,1.5vw,1.375rem)] text-doe ${item.wrap}`}
                >
                  {item.value}
                </span>
              </a>
            ))}
          </div>
        }
        className="pb-[clamp(3.25rem,5.6vw,5.5rem)]"
      />
      <MarketClocks />
      <Contact />
      <Payments />
    </>
  );
}
