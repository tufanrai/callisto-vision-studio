import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Contact endpoint.
 *
 * Delivery is via Resend when RESEND_API_KEY is configured. When it is not,
 * this returns 503 with an explicit message rather than a fake success — a
 * form that silently swallows enquiries is worse than no form, and the UI
 * always shows the direct email and WhatsApp alongside it.
 */

export const runtime = "nodejs";

const MAX = { name: 120, email: 200, company: 160, budget: 60, message: 4000 };

interface Payload {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
  /** Honeypot — real users never fill this. */
  website?: string;
}

/**
 * Per-instance sliding window. Serverless instances are not shared, so this
 * blunts casual abuse only; put a real limiter at the edge for production.
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const LIMIT = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

function validate(body: Partial<Payload>): string[] {
  const errors: string[] = [];
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (name.length < 2) errors.push("Enter your name.");
  if (name.length > MAX.name) errors.push("That name is too long.");
  if (!isEmail(email)) errors.push("Enter a valid email address.");
  if (email.length > MAX.email) errors.push("That email address is too long.");
  if (message.length < 10)
    errors.push("Tell us a little more about the project.");
  if (message.length > MAX.message) errors.push("That message is too long.");
  if ((body.company ?? "").length > MAX.company)
    errors.push("That company name is too long.");
  if ((body.budget ?? "").length > MAX.budget)
    errors.push("That budget value is not valid.");

  return errors;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many enquiries from this address. Try again in a minute." },
      { status: 429 },
    );
  }

  let body: Partial<Payload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Could not read that request." },
      { status: 400 },
    );
  }

  // Honeypot: accept and discard, so bots get no signal from the response.
  if (body.website) return NextResponse.json({ ok: true });

  const errors = validate(body);
  if (errors.length) {
    return NextResponse.json({ error: errors[0], errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.contact.email;

  if (!apiKey) {
    return NextResponse.json(
      {
        error: `Enquiry delivery is not configured on this deployment. Please email ${site.contact.email} directly — we reply within one business day.`,
      },
      { status: 503 },
    );
  }

  const lines = [
    `Name: ${body.name}`,
    `Email: ${body.email}`,
    body.company ? `Company: ${body.company}` : null,
    body.budget ? `Budget: ${body.budget}` : null,
    "",
    body.message,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "enquiries@callistovisionstudio.com",
        to: [to],
        reply_to: body.email,
        subject: `New enquiry — ${body.name}`,
        text: lines,
      }),
    });

    if (!res.ok) {
      console.error("Resend rejected the enquiry", res.status, await res.text());
      return NextResponse.json(
        {
          error: `We could not send that just now. Please email ${site.contact.email} directly.`,
        },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Enquiry delivery failed", err);
    return NextResponse.json(
      {
        error: `We could not send that just now. Please email ${site.contact.email} directly.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
