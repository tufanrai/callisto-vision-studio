import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import {
  ClientDuties,
  Differentiators,
  MissionVision,
  StudioStats,
  Team,
} from "@/components/sections/About";
import { ProcessFull } from "@/components/sections/Process";
import { Values } from "@/components/sections/Values";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { PillLink } from "@/components/ui/Pill";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About the Studio",
  description:
    "Callisto Vision Studio is a creative and digital marketing team in Kathmandu working with clients across the UK, Australia and the UAE — designers, editors and strategists under one roof.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About the Studio — Callisto Vision Studio",
    description:
      "Designers, editors and strategists under one roof, with account support across three time zones.",
    url: "/about-us",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the studio"
        ring="top-left"
        title={
          <>
            We treat your reputation like <em>our own</em>.
          </>
        }
        lead={`A creative and digital marketing studio in ${site.contact.address.locality}. Designers, editors and strategists under one roof, working across GMT, GST and AEST.`}
        aside={
          <PillLink href="/contact-us" variant="accent">
            Book a free consultation
          </PillLink>
        }
      >
        <div className="relative mx-auto mt-[clamp(3rem,5vw,5.25rem)] aspect-21/8 max-w-400 border border-b-0 border-snow/10 bg-snow/5">
          <ImageSlot
            tone="dark"
            hint="Studio / team photograph"
            sizes="100vw"
            priority
          />
        </div>
      </PageHero>
      <MissionVision />
      <Differentiators />
      <StudioStats />
      <ProcessFull />
      <Team />
      <Values />
      <ClientDuties />
    </>
  );
}
