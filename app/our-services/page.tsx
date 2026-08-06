import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCatalogue } from "@/components/sections/ServiceCatalogue";
import { IndustryPackages } from "@/components/sections/Packages";
import { Process } from "@/components/sections/Process";
import { PillLink } from "@/components/ui/Pill";
import { servicePillars } from "@/lib/content/services";

/**
 * Services.
 *
 * Rates are no longer published. The page's job is now to show the range of
 * what the studio makes and route the visitor to a quote, so the deliverable
 * lists carry the weight the price tables used to — a client asking "do you
 * do X" still gets an answer without a call.
 */
export const metadata: Metadata = {
  title: "Services",
  description: `Everything Callisto Vision Studio makes, across ${servicePillars.length} disciplines — graphic design, branding, motion graphics, video editing and digital marketing. One accountable team, quoted per project.`,
  alternates: { canonical: "/our-services" },
  openGraph: {
    title: "Services — Callisto Vision Studio",
    description:
      "Five disciplines under one roof, with the full deliverable list for each.",
    url: "/our-services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        ring="bottom-left"
        title={
          <>
            Everything creative, <em>under one roof</em>.
          </>
        }
        lead="No juggling three agencies. Five disciplines, one accountable team, and a fixed quote before anything starts."
        aside={
          <div className="flex flex-wrap gap-3">
            <PillLink href="/contact-us" variant="accent">
              Request a quote
            </PillLink>
            <PillLink href="/projects" variant="ghost" dot={false}>
              See the work
            </PillLink>
          </div>
        }
        className="pb-[clamp(3.5rem,6vw,6.25rem)]"
      />
      <ServiceCatalogue />
      <IndustryPackages />
      <Process />
    </>
  );
}
