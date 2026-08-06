/**
 * FAQs from the proposal, tightened for the page. Also serialised into FAQPage
 * JSON-LD — keep the answers as plain text so the structured data stays valid,
 * and keep every answer self-contained, since a rich result shows one answer
 * without the question above it for context.
 */

export interface Faq {
  q: string;
  a: string;
}

export const faqs: readonly Faq[] = [
  {
    q: "How do I get started?",
    a: "Confirm the package and pay the 50% advance. We book a discovery call within 24 hours, in your time zone.",
  },
  {
    q: "Can I combine services from different categories?",
    a: "Yes. Most clients combine design, motion and video into one monthly package.",
  },
  {
    q: "Do you offer one-time projects or only retainers?",
    a: "Both. Book a single service, or a monthly, quarterly or annual retainer.",
  },
  {
    q: "What if I am not satisfied with the design?",
    a: "Every package includes revision rounds. We keep going until it matches the brief.",
  },
  {
    q: "Do you provide source files?",
    a: "PSD, AI and Premiere Pro files are an add-on, unless your package already includes them.",
  },
  {
    q: "What is your average turnaround time?",
    a: "Typically 1 to 10 business days, depending on the service. Rush delivery is available.",
  },
  {
    q: "How do international payments work?",
    a: "Wire transfer, PayPal and Wise for all overseas clients. Invoices are issued in USD.",
  },
] as const;
