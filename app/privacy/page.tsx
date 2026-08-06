import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { effective, privacyClauses } from "@/lib/content/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles personal information collected through this website — what the enquiry form collects, who it reaches, and how long we keep it. No cookies, no analytics, no tracking.`,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy Policy — ${site.name}`,
    description:
      "What we collect, what we don't, and what you can ask us to delete.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow={`Privacy · in effect from ${effective}`}
        ring="top-left"
        title={
          <>
            What we collect, and what we <em>don&rsquo;t</em>.
          </>
        }
        lead="This site sets no cookies, runs no analytics and carries no tracking scripts. The only personal information it collects is what you type into the enquiry form — here is exactly what happens to it."
        className="pb-[clamp(3rem,5vw,5rem)]"
      />
      <LegalDocument clauses={privacyClauses} />
    </>
  );
}
