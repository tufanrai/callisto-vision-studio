import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { effective, termsClauses } from "@/lib/content/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms ${site.name} works under — scope and quotes, the 50/50 payment schedule, revision rounds, ownership of final files, confidentiality and cancellation.`,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `Terms of Service — ${site.name}`,
    description:
      "Scope, payment, revisions, ownership and confidentiality — written plainly.",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow={`Terms · in effect from ${effective}`}
        ring="bottom-right"
        title={
          <>
            The terms, in <em>plain</em> language.
          </>
        }
        lead="Scope, payment, revisions and who owns what at the end. Every project also gets its own written scope and quotation — where that document and this page disagree, yours wins."
        className="pb-[clamp(3rem,5vw,5rem)]"
      />
      <LegalDocument clauses={termsClauses} />
    </>
  );
}
