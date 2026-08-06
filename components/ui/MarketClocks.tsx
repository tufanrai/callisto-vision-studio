"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/**
 * Live local time in the studio's own city and in each market it supports.
 * The claim on the page is time-zone overlap, so showing the actual clocks is
 * the proof.
 *
 * Times render only after mount — formatting a date on the server would
 * produce markup that cannot match the client's clock. The placeholder holds
 * the row's height through the swap.
 */
const CLOCKS = [
  {
    city: site.contact.address.locality,
    zone: "NPT · studio",
    tz: "Asia/Kathmandu",
  },
  { city: "London", zone: "GMT / BST", tz: "Europe/London" },
  { city: "Dubai", zone: "GST", tz: "Asia/Dubai" },
  { city: "Sydney", zone: "AEST", tz: "Australia/Sydney" },
];

export function MarketClocks() {
  const [times, setTimes] = useState<string[] | null>(null);

  useEffect(() => {
    const tick = () =>
      setTimes(
        CLOCKS.map((clock) => {
          try {
            return new Intl.DateTimeFormat("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: clock.tz,
              hour12: false,
            }).format(new Date());
          } catch {
            // A runtime without full ICU data has no zone tables to consult.
            return "--:--";
          }
        }),
      );

    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="border-t border-snow/14 bg-twilight text-snow">
      <dl className="rule-grid mx-auto max-w-400 [grid-template-columns:repeat(auto-fit,minmax(min(50%,9.375rem),1fr))]">
        {CLOCKS.map((clock, i) => (
          <div
            key={clock.city}
            className="flex flex-col gap-1.5 bg-twilight px-[clamp(1.125rem,1.8vw,1.625rem)] py-5.5 shadow-[0_0_0_1px_--alpha(var(--color-snow)/18%)]"
          >
            <dt className="label-tight text-[0.625rem] tracking-[0.18em] text-mist">
              {clock.city}
            </dt>
            {/*
              The zone caption belongs to the same term, so it lives inside
              the <dd> rather than beside it — a <dl> may only contain
              dt/dd groups (optionally wrapped in a div), and a stray <p>
              inside the wrapper invalidates the list.
            */}
            <dd className="flex flex-col gap-1.5">
              <span className="tabular font-display text-[clamp(1.375rem,2vw,1.875rem)] leading-none text-snow">
                {times ? times[i] : "--:--"}
              </span>
              <span className="label-tight text-[0.625rem] text-doe-light">
                {clock.zone}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
