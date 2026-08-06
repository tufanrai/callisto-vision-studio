import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import {
  ClientStrip,
  PortfolioNote,
  WorkStats,
} from "@/components/sections/WorkShowcase";
import { WorkIndex } from "@/components/sections/WorkIndex";
import {
  clients,
  projectIndex,
  sectorsRepresented,
} from "@/lib/content/portfolio";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work",
  description: `Selected work from Callisto Vision Studio — campaigns, motion and video for ${clients.slice(0, 4).join(", ")} and others across education, consultancy, product and community.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Our Work — Callisto Vision Studio",
    description: `${projectIndex.length} projects across ${sectorsRepresented} sectors, for ${clients.length} named clients.`,
    url: "/projects",
  },
};

export default function ProjectsPage() {
  const figures = [
    { value: site.stats.projects, label: "Projects delivered" },
    {
      value: String(sectorsRepresented).padStart(2, "0"),
      label: "Sectors represented",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={
          <>
            What we&rsquo;re most <em>proud</em> of.
          </>
        }
        lead={`Campaigns, motion and video for colleges, consultancies, consumer brands and community organisations — built in ${site.contact.address.locality}.`}
        aside={
          <div className="flex items-end gap-[clamp(1.75rem,3vw,3.25rem)]">
            {figures.map((figure) => (
              <div key={figure.label} className="flex flex-col gap-1">
                <span
                  className={`tabular font-display text-[clamp(3.5rem,7vw,6.875rem)] leading-[0.86] ${
                    figure.label === "Projects delivered"
                      ? "text-doe"
                      : "text-snow"
                  }`}
                >
                  {figure.value}
                </span>
                <span className="label text-mist">{figure.label}</span>
              </div>
            ))}
          </div>
        }
        className="pb-[clamp(3rem,5vw,5rem)]"
      />
      <ClientStrip />
      <WorkIndex />
      <WorkStats />
      <PortfolioNote />
    </>
  );
}
