/**
 * Structured data builders. Everything is derived from `site` and the content
 * modules so the markup can never drift from the copy on the page.
 *
 * Emitted as JSON-LD via a <script type="application/ld+json"> in layout.tsx.
 */

import { site } from "./site";
import { faqs } from "./content/faq";
import { servicePillars } from "./content/services";

const id = (fragment: string) => `${site.url}/#${fragment}`;

export const organizationLd = () => ({
  "@type": "ProfessionalService",
  "@id": id("organization"),
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: {
    "@type": "ImageObject",
    url: `${site.url}/icon-512.png`,
    width: 512,
    height: 512,
  },
  image: `${site.url}/opengraph-image`,
  description: site.description,
  slogan: site.tagline,
  email: site.contact.email,
  telephone: site.contact.phoneE164,
  /**
   * No `priceRange` and no priced Offers.
   *
   * Google requires markup to match what a visitor can see. The site no
   * longer publishes rates, so emitting them here would describe a page that
   * does not exist — which is a structured-data violation, not a shortcut to
   * richer results. The catalogue below still lists what the studio sells,
   * which is the part that is true.
   */
  currenciesAccepted: site.currency,
  paymentAccepted: "Wire transfer, PayPal, Wise, Credit card",
  founder: {
    "@type": "Person",
    name: site.founder.name,
    jobTitle: site.founder.role,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address.street,
    addressLocality: site.contact.address.locality,
    addressCountry: site.contact.address.country,
  },
  areaServed: site.markets.map((m) => ({
    "@type": "Country",
    name: m.label,
  })),
  knowsAbout: servicePillars.map((p) => p.name),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: site.contact.email,
    telephone: site.contact.phoneE164,
    availableLanguage: ["English", "Nepali"],
    areaServed: site.markets.map((m) => m.code),
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Creative and digital marketing services",
    itemListElement: servicePillars.map((pillar) => ({
      "@type": "OfferCatalog",
      name: pillar.name,
      itemListElement: pillar.deliverables.map((deliverable) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: deliverable,
          serviceType: pillar.name,
          provider: { "@id": id("organization") },
        },
      })),
    })),
  },
});

export const websiteLd = () => ({
  "@type": "WebSite",
  "@id": id("website"),
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { "@id": id("organization") },
  inLanguage: "en",
});

export const faqLd = () => ({
  "@type": "FAQPage",
  "@id": id("faq"),
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

/** One graph, so the nodes can reference each other by @id. */
export const jsonLdGraph = () => ({
  "@context": "https://schema.org",
  "@graph": [organizationLd(), websiteLd(), faqLd()],
});
