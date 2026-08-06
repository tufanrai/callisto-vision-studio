"use client";

import { useId, useState } from "react";
import { Dot } from "./Eyebrow";
import { site, telHref } from "@/lib/site";

const DISCIPLINES = [
  { key: "graphic", label: "Graphic Design" },
  { key: "branding", label: "Branding" },
  { key: "motion", label: "Motion Graphics" },
  { key: "video", label: "Video Editing" },
  { key: "marketing", label: "Digital Marketing" },
  { key: "photo", label: "Photo / Drone" },
] as const;

const BUDGETS = [
  "Under $1,000",
  "$1,000 – $3,000",
  "$3,000 – $6,000",
  "$6,000 – $12,000",
  "$12,000+",
  "Monthly retainer",
];

const TIMELINES = [
  "Rush — within 48 hours",
  "This week",
  "2–4 weeks",
  "Flexible",
  "Ongoing retainer",
];

type Errors = Partial<
  Record<"name" | "email" | "message" | "services" | "form", string>
>;

const FIELD =
  "border-0 border-b border-twilight/24 bg-transparent py-3 text-[15px] font-light text-twilight transition-colors placeholder:text-ink-muted focus:border-doe-deep focus:outline-none";

const FIELD_LABEL = "label-tight text-[0.6875rem] tracking-[0.16em] text-ink-muted";

/**
 * The project brief.
 *
 * Validation runs client-side for the immediate response, and the API route
 * validates again — the client pass is a courtesy, never the gate. Nothing is
 * reported as sent unless the endpoint says so: a form that shows a
 * confirmation it cannot back up loses the enquiry *and* the client's trust,
 * so a failed POST surfaces the error with the direct email beside it.
 */
export function ContactForm() {
  const [picked, setPicked] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const base = useId();

  const toggle = (key: string) =>
    setPicked((current) =>
      current.includes(key)
        ? current.filter((k) => k !== key)
        : [...current, key],
    );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const name = value("name");
    const email = value("email");
    const message = value("message");

    const next: Errors = {};
    if (name.length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = "A valid email keeps the reply out of the void.";
    if (message.length < 10)
      next.message = "A sentence or two is plenty to get started.";
    if (picked.length === 0) next.services = "Pick at least one discipline.";

    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    setErrors({});
    setStatus("sending");

    /**
     * The endpoint takes name/email/company/budget/message. The three fields
     * this form adds are folded into the message body rather than widening
     * the API contract — they are context for a human reading the enquiry,
     * not structured data anything downstream queries.
     */
    const disciplines = DISCIPLINES.filter((d) => picked.includes(d.key))
      .map((d) => d.label)
      .join(", ");

    const body = [
      message,
      "",
      `Disciplines: ${disciplines}`,
      value("location") ? `Based in: ${value("location")}` : null,
      `Timeline: ${value("timeline")}`,
    ]
      .filter((line) => line !== null)
      .join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: value("company"),
          budget: value("budget"),
          message: body,
          website: value("website"),
        }),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setStatus("idle");
        setErrors({
          form:
            payload?.error ??
            `We could not send that just now. Please email ${site.contact.email} directly.`,
        });
        return;
      }

      form.reset();
      setPicked([]);
      setStatus("sent");
    } catch {
      setStatus("idle");
      setErrors({
        form: `That request did not reach us — check your connection, or email ${site.contact.email} directly.`,
      });
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-5 border border-doe/50 bg-pure p-[clamp(2.125rem,4vw,3.75rem)]">
        <span
          aria-hidden="true"
          className="inline-flex size-11 items-center justify-center rounded-full bg-doe text-[19px] text-ink-deep"
        >
          &#10003;
        </span>
        <h2 className="text-[clamp(1.625rem,2.8vw,2.5rem)] tracking-[-0.025em]">
          Brief received. Thank you.
        </h2>
        <p className="max-w-[52ch] text-[14.5px] leading-[1.85] font-light text-balance text-ink-soft">
          We reply within one working day. If it&rsquo;s urgent, WhatsApp{" "}
          <a href={telHref} className="font-medium text-doe-deep">
            {site.contact.phoneDisplay}
          </a>{" "}
          instead.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="label-tight cursor-pointer self-start rounded-full border border-edge-light px-6.5 py-3.5 text-twilight transition-colors hover:border-doe-deep"
        >
          Send another brief
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-[clamp(1.375rem,2.4vw,2.125rem)]"
    >
      <h2 className="text-[clamp(1.75rem,3.2vw,2.875rem)] leading-[1.06]">
        Start a project
      </h2>

      <div className="grid gap-[clamp(1.125rem,2vw,1.75rem)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,13.75rem),1fr))]">
        <label className="flex flex-col gap-2.5">
          <span className={FIELD_LABEL}>Your name *</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Whitfield"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${base}-name` : undefined}
            className={FIELD}
          />
          {errors.name ? (
            <span id={`${base}-name`} className="text-[11px] font-medium text-doe-deep">
              {errors.name}
            </span>
          ) : null}
        </label>

        <label className="flex flex-col gap-2.5">
          <span className={FIELD_LABEL}>Email *</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${base}-email` : undefined}
            className={FIELD}
          />
          {errors.email ? (
            <span id={`${base}-email`} className="text-[11px] font-medium text-doe-deep">
              {errors.email}
            </span>
          ) : null}
        </label>

        <label className="flex flex-col gap-2.5">
          <span className={FIELD_LABEL}>Company</span>
          <input
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company or brand"
            className={FIELD}
          />
        </label>

        <label className="flex flex-col gap-2.5">
          <span className={FIELD_LABEL}>Where you&rsquo;re based</span>
          <input
            name="location"
            type="text"
            autoComplete="address-level2"
            placeholder="London, Dubai, Sydney…"
            className={FIELD}
          />
        </label>
      </div>

      <fieldset className="flex flex-col gap-3.5 border-0 p-0">
        <legend className={FIELD_LABEL}>What do you need? *</legend>
        <div className="flex flex-wrap gap-2.25">
          {DISCIPLINES.map((discipline) => {
            const on = picked.includes(discipline.key);
            return (
              <button
                key={discipline.key}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(discipline.key)}
                className={`label-tight cursor-pointer rounded-full border px-4.75 py-2.75 tracking-[0.1em] transition-colors duration-350 ${
                  on
                    ? "border-twilight bg-twilight text-snow"
                    : "border-edge-light text-ink-soft hover:border-twilight"
                }`}
              >
                {discipline.label}
              </button>
            );
          })}
        </div>
        {errors.services ? (
          <span className="text-[11px] font-medium text-doe-deep">
            {errors.services}
          </span>
        ) : null}
      </fieldset>

      <div className="grid gap-[clamp(1.125rem,2vw,1.75rem)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,13.75rem),1fr))]">
        <label className="flex flex-col gap-2.5">
          <span className={FIELD_LABEL}>Budget (USD)</span>
          <select name="budget" defaultValue={BUDGETS[1]} className={`${FIELD} cursor-pointer appearance-none`}>
            {BUDGETS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2.5">
          <span className={FIELD_LABEL}>Timeline</span>
          <select name="timeline" defaultValue={TIMELINES[2]} className={`${FIELD} cursor-pointer appearance-none`}>
            {TIMELINES.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2.5">
        <span className={FIELD_LABEL}>The brief *</span>
        <textarea
          name="message"
          rows={5}
          placeholder="What are you launching, who is it for, and what does success look like?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${base}-message` : undefined}
          className="resize-y border border-twilight/20 bg-transparent p-4 text-[15px] leading-[1.7] font-light text-twilight transition-colors placeholder:text-ink-muted focus:border-doe-deep focus:outline-none"
        />
        {errors.message ? (
          <span id={`${base}-message`} className="text-[11px] font-medium text-doe-deep">
            {errors.message}
          </span>
        ) : null}
      </label>

      {/* Honeypot. Off-screen rather than display:none, which some bots skip. */}
      <label className="sr-only" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      {errors.form ? (
        <p role="alert" className="border-l-2 border-doe pl-4 text-[13px] leading-[1.7] font-light text-ink-soft">
          {errors.form}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-x-6.5 gap-y-4.5">
        <button
          type="submit"
          disabled={status === "sending"}
          className="pill pill-lift cursor-pointer bg-twilight text-snow hover:bg-doe hover:text-ink-deep disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "Sending…" : "Send the brief"}
          <Dot />
        </button>
        <p className="max-w-[38ch] text-xs leading-[1.7] font-light text-ink-muted">
          Everything you share is confidential. NDAs signed on request.
        </p>
      </div>
    </form>
  );
}
