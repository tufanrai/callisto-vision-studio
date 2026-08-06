/**
 * Privacy and terms, as content rather than markup.
 *
 * Both documents describe what this codebase actually does, not what a
 * template assumes. Where a claim here is enforced by code, the file that
 * enforces it is named in a comment — if that code changes, this copy is
 * wrong and should change with it.
 *
 * `effective` is the date the current wording took effect. Update it whenever
 * a clause changes; it is rendered on both pages.
 */

import { site } from "../site";

export const effective = "6 August 2026";

export interface Clause {
  n: string;
  title: string;
  /** Each string renders as its own paragraph. */
  body: readonly string[];
  /** Optional bulleted list beneath the paragraphs. */
  points?: readonly string[];
}

export const privacyClauses: readonly Clause[] = [
  {
    n: "01",
    title: "What this policy covers",
    body: [
      `This policy explains what ${site.name} does with personal information collected through this website. It does not cover information you send us directly by email, phone or WhatsApp, which we handle under the same principles but outside this site.`,
      `We are the data controller. You can reach us at ${site.contact.email} or ${site.contact.phoneDisplay}.`,
    ],
  },
  {
    n: "02",
    title: "What we collect",
    body: [
      "Only what you type into the enquiry form on the contact page, and only when you submit it. Nothing on this site collects information in the background.",
    ],
    // Fields mirror components/ui/ContactForm.tsx.
    points: [
      "Your name and email address, which are required so we can reply",
      "Your company or brand, and where you are based, if you provide them",
      "The disciplines you selected, your budget range and your timeline",
      "The brief you write, and anything you choose to include in it",
    ],
  },
  {
    n: "03",
    title: "What we do not collect",
    body: [
      "This site sets no cookies and uses no analytics, advertising or tracking scripts of any kind. There is no third-party pixel and no session recording.",
      "Typefaces are served from this domain rather than from a font CDN, so simply reading a page does not disclose your visit to anyone else.",
    ],
  },
  {
    n: "04",
    title: "Your IP address",
    body: [
      "When you submit the enquiry form, the receiving endpoint briefly holds your IP address in memory to limit how many submissions can arrive from one address in a minute. It is used for nothing else, is never written to disk or attached to your enquiry, and is discarded within about a minute.",
    ],
    // Enforced by the sliding window in app/api/contact/route.ts.
  },
  {
    n: "05",
    title: "Why we may use it",
    body: [
      "To read and answer your enquiry, to quote and deliver work you ask us for, and to keep the enquiry form usable by preventing automated abuse. We do not use your details for marketing, and we do not send newsletters.",
    ],
  },
  {
    n: "06",
    title: "Who else sees it",
    body: [
      "Your enquiry is delivered to our own inbox through Resend, an email delivery provider acting on our instructions. It passes through their systems in the course of delivery.",
      "We do not sell personal information, and we do not share it with anyone else except where the law requires it.",
    ],
  },
  {
    n: "07",
    title: "How long we keep it",
    body: [
      "Enquiries stay in our inbox for as long as the conversation is live and for up to two years afterwards, so we can pick up where we left off if you return. Project records are kept for as long as we need them for tax and contractual purposes. Ask us to delete an enquiry and we will.",
    ],
  },
  {
    n: "08",
    title: "Your rights",
    body: [
      `You can ask us for a copy of what we hold about you, ask us to correct it, or ask us to delete it. Write to ${site.contact.email} and we will respond within 30 days.`,
      "If you are in a jurisdiction with statutory data protection rights, such as the UK or EU, those rights apply to your information regardless of where we process it.",
    ],
  },
  {
    n: "09",
    title: "Where your information is held",
    body: [
      `${site.name} operates from ${site.contact.address.locality}, ${site.contact.address.countryName}, and our email provider operates internationally. Your enquiry may therefore be processed outside your own country.`,
    ],
  },
  {
    n: "10",
    title: "Changes",
    body: [
      `We update this policy when what we do changes. The date above is when the current wording took effect.`,
    ],
  },
];

export const termsClauses: readonly Clause[] = [
  {
    n: "01",
    title: "These terms",
    body: [
      `These terms apply to work carried out by ${site.name}. Where we issue a written scope, quotation or contract for a specific project, that document takes precedence over anything here that conflicts with it.`,
    ],
  },
  {
    n: "02",
    title: "Quotes and scope",
    body: [
      "Rates are quoted per project. Every engagement begins with a written scope setting out the deliverables, the formats, the number of revision rounds and the timeline, along with a fixed figure.",
      "A quotation is valid for 30 days. Work outside the agreed scope is quoted separately rather than absorbed, and we will tell you before starting it — you will never receive an invoice for something you did not approve.",
    ],
  },
  {
    n: "03",
    title: "Payment",
    body: [
      "50% of the agreed figure confirms the project and reserves the slot. The remaining 50% falls due before final files are delivered.",
      `Invoices are issued in ${site.currency} and exclude any local VAT, GST or withholding tax that applies in your jurisdiction, which remains your responsibility. We accept international wire transfer, PayPal and Wise; card payment is available on request.`,
    ],
  },
  {
    n: "04",
    title: "Timelines",
    body: [
      "Timelines are quoted in business days from the point at which we hold everything we need from you — brief, brand assets and content. Our working week is Sunday to Friday, 09:00–18:00 NPT, with cover across GMT, GST and AEST hours.",
      "Delays in feedback, approvals or supply of materials move the delivery date by at least the length of the delay. We will tell you when that happens rather than letting a date slip quietly.",
    ],
  },
  {
    n: "05",
    title: "Revisions",
    body: [
      "Each engagement includes a set number of revision rounds, stated in the scope. A round means one consolidated set of feedback, not an open thread.",
      "Additional rounds, and changes of direction after a concept has been approved, are quoted as further work.",
    ],
  },
  {
    n: "06",
    title: "What we need from you",
    body: [
      "To hold the timeline we quoted, we need brand assets at the start, a clear brief with references and content, one designated point of contact for approvals, and feedback inside the agreed window.",
      "You confirm that any material you supply — logos, photography, copy, fonts, music — is yours to use, or that you hold the necessary licence. We rely on that confirmation.",
    ],
  },
  {
    n: "07",
    title: "Ownership and licensing",
    body: [
      "Ownership of the final approved deliverables passes to you once the project is paid in full. Until then we retain them.",
      "Working files — layered PSD, AI and Premiere Pro projects — are not included by default and are available as a priced add-on. Third-party assets such as stock imagery, music and licensed typefaces remain under their own licences, which we will name so you know what you hold.",
      "We may show completed work in our portfolio and on social media unless you ask us not to, or unless an NDA says otherwise.",
    ],
  },
  {
    n: "08",
    title: "Confidentiality",
    body: [
      "We treat your brand assets, commercial information and unreleased work as confidential, and we will sign an NDA on request before you send anything sensitive. Projects covered by one are kept out of the public portfolio entirely.",
    ],
  },
  {
    n: "09",
    title: "Cancellation",
    body: [
      "You may cancel at any time. The advance covers work already carried out and is non-refundable once production has begun; anything invoiced beyond the work completed is refunded.",
      "Monthly retainers run to the end of the paid period, and either side may decline to renew.",
    ],
  },
  {
    n: "10",
    title: "Liability",
    body: [
      "We are responsible for delivering the work described in the scope to a professional standard. We are not liable for commercial outcomes such as sales, reach or engagement, which depend on factors outside a design engagement.",
      "Our total liability for any project is limited to the fees paid for that project. Nothing here limits liability that cannot be limited by law.",
    ],
  },
  {
    n: "11",
    title: "Governing law",
    body: [
      `These terms are governed by the laws of ${site.contact.address.countryName}. We would always rather resolve a disagreement by talking to you first — ${site.contact.email} reaches us directly.`,
    ],
  },
];
