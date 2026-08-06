import { Hero } from "@/components/sections/Hero";
import { ServiceBand } from "@/components/sections/ServiceBand";
import { StudioNote } from "@/components/sections/StudioNote";
import { Services } from "@/components/sections/Services";
import { Reasons } from "@/components/sections/Reasons";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { Process } from "@/components/sections/Process";
import { Industries } from "@/components/sections/Industries";
import { Faq } from "@/components/sections/Faq";

/**
 * The page alternates ground deliberately: ink-deep, twilight, snow, pure,
 * ink-deep, snow, pure, twilight, snow. No two adjacent sections share a
 * background, which is what gives the scroll its rhythm without needing a
 * rule between sections.
 *
 * There is no closing CTA band — the footer carries it on every page.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ServiceBand />
      <StudioNote />
      <Services />
      <Reasons />
      <WorkShowcase />
      <Process />
      <Industries />
      <Faq />
    </>
  );
}
