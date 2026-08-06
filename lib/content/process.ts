/**
 * The nine-stage delivery process and the workflow timeline, verbatim from
 * the proposal. This genuinely is a sequence — each stage gates the next —
 * so numbering it is information, not decoration.
 */

export interface ProcessStage {
  n: number;
  name: string;
  detail: string;
  /** Which timeline band this stage falls in, for the duration column. */
  duration?: string;
}

export const processStages: readonly ProcessStage[] = [
  {
    n: 1,
    name: "Discovery",
    detail:
      "Your brand, goals and audience, through a detailed briefing call.",
    duration: "1 day",
  },
  {
    n: 2,
    name: "Research",
    detail:
      "Market, competitor and trend research behind the creative direction.",
    duration: "1–2 days",
  },
  {
    n: 3,
    name: "Planning",
    detail: "Scope, timeline and deliverables, agreed in writing.",
    duration: "1–2 days",
  },
  {
    n: 4,
    name: "Concept",
    detail: "Initial creative directions, brought back for review.",
    duration: "2–3 days",
  },
  {
    n: 5,
    name: "Design",
    detail:
      "Full production of the approved concept.",
    duration: "3–10 days",
  },
  {
    n: 6,
    name: "Revision",
    detail: "Structured revision rounds based on your feedback.",
    duration: "1–3 days per round",
  },
  {
    n: 7,
    name: "Approval",
    detail: "Final sign-off from you before delivery.",
  },
  {
    n: 8,
    name: "Delivery",
    detail: "Final files in every agreed format and resolution.",
    duration: "1 day after approval",
  },
  {
    n: 9,
    name: "Support",
    detail: "Post-delivery support for minor adjustments.",
  },
] as const;

export const workflowTimeline: readonly {
  stage: string;
  duration: string;
}[] = [
  { stage: "Discovery & briefing", duration: "1 day" },
  { stage: "Research & planning", duration: "1–2 days" },
  { stage: "Concept development", duration: "2–3 days" },
  { stage: "Design / production", duration: "3–10 days, per scope" },
  { stage: "Revisions", duration: "1–3 days per round" },
  { stage: "Final delivery", duration: "1 day after approval" },
] as const;

/** What the studio needs from the client to hold those timelines. */
export const clientResponsibilities: readonly string[] = [
  "Brand assets — logo, guidelines, past work — at project start",
  "Clear briefs, references and content, on time",
  "One point of contact for feedback and approvals",
  "Feedback inside the agreed revision window",
  "Payment on the agreed schedule",
] as const;

export const paymentTerms: readonly string[] = [
  "50% advance to confirm and begin the project — wire transfer, PayPal, Wise or card",
  "50% balance due before final file delivery",
  "Late fee of 2% per week on overdue balances",
  "Retainer clients are billed on the 1st of every month, in USD",
  "All payments are non-transferable to unrelated projects",
  "Prices exclude local VAT/GST where applicable — UK VAT, Australian GST, UAE VAT",
] as const;

export const revisionPolicy: readonly string[] = [
  "Included revisions depend on the selected tier — Basic, Standard or Premium",
  "Revisions must be requested within 5 days of file delivery",
  "Revision requests should be consolidated into a single round where possible",
  "Additional rounds beyond those included are charged per the add-on list",
  "A new concept or new brief is treated as a new project, not a revision",
] as const;

export const deliveryPolicy: readonly string[] = [
  "Final files delivered via Google Drive, WeTransfer or Dropbox",
  "Standard formats: JPG, PNG and PDF for design; MP4 for video and motion",
  "Source files available on request",
  "Timelines are quoted in business days and account for UK, Australia and UAE overlap",
  "Rush delivery available at the published add-on rate",
  "Delayed feedback extends the original delivery timeline accordingly",
] as const;
