"use client";

import { useState } from "react";
import { Animate } from "@/components/motion/Animate";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { priceOf, priceTables } from "@/lib/content/pricing";
import { servicePillars } from "@/lib/content/services";
import { tierById, tiers, usd, type TierId } from "@/lib/content/tiers";

/**
 * The published price list, filtered by discipline and tier.
 *
 * Two independent controls drive one table. The tier selection is the more
 * consequential of the two — it changes every figure on screen — so it also
 * drives the four policy cards underneath, which is what stops a visitor
 * reading a Premium price against a Standard delivery window.
 *
 * Every discipline's rows are rendered and the unselected ones hidden with
 * `hidden`, rather than only the selected list being mounted. The page's
 * entire proposition is that the prices are public; a crawler that finds one
 * of five lists in the markup indexes a fifth of the argument.
 *
 * The controls are `aria-pressed` buttons, not a tablist. A tablist commits
 * to roving-tabindex arrow navigation and a labelled tabpanel per tab; this
 * is a filter over one list, and mislabelled ARIA is worse than none.
 *
 * Video editing is the one discipline with two published tables (by format
 * and by runtime); they are concatenated rather than made a third control,
 * because "how long is your video" and "what kind of video is it" are the
 * same question asked twice.
 */
export function Pricing() {
  const [pillarId, setPillarId] = useState(servicePillars[0].id);
  const [tier, setTier] = useState<TierId>("standard");

  const selected = tierById(tier);
  const selectedPillar = servicePillars.find((p) => p.id === pillarId);

  const policy = [
    { label: "Selected tier", value: selected.name, accent: false },
    { label: "Delivery", value: selected.delivery, accent: true },
    { label: "Revisions", value: selected.revisionsLabel, accent: true },
    { label: "Rush options", value: "+50% / 24–48h", accent: true },
  ];

  return (
    <section
      id="pricing"
      className="bg-ink-deep px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(4.5rem,8vw,8.75rem)] text-snow"
    >
      <div className="mx-auto max-w-400">
        <Animate className="flex flex-wrap items-end justify-between gap-x-15 gap-y-6 pb-[clamp(2rem,4vw,3.5rem)]">
          <div className="flex-[1_1_min(100%,27.5rem)]">
            <Eyebrow className="mb-5.5">Transparent price list</Eyebrow>
            <h2 className="text-[clamp(2rem,4.4vw,4.5rem)]">
              Pick a tier.
              <br />
              See the real number.
            </h2>
          </div>
          <p className="max-w-[46ch] flex-[1_1_min(100%,20rem)] text-sm leading-[1.85] font-light text-balance text-mist">
            All rates in USD, calibrated to UK, Australian and UAE market rates
            — with a 15% welcome discount already applied. Custom quotes for
            bulk or long-term engagements.
          </p>
        </Animate>

        <Animate
          variant="fade"
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3.5 pb-[clamp(1.5rem,2.6vw,2.25rem)]"
        >
          <div
            role="group"
            aria-label="Service category"
            className="flex gap-2 overflow-x-auto pb-0.5"
          >
            {servicePillars.map((pillar) => {
              const on = pillar.id === pillarId;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setPillarId(pillar.id)}
                  className={`label-tight shrink-0 cursor-pointer rounded-full border px-5 py-2.75 whitespace-nowrap transition-colors duration-350 ${
                    on
                      ? "border-doe bg-doe text-ink-deep"
                      : "border-edge-dark text-mist hover:text-snow"
                  }`}
                >
                  {pillar.name}
                </button>
              );
            })}
          </div>

          <div
            role="group"
            aria-label="Service tier"
            className="flex gap-1.5 rounded-full border border-snow/16 p-1.5"
          >
            {tiers.map((t) => {
              const on = t.id === tier;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setTier(t.id)}
                  className={`label-tight cursor-pointer rounded-full px-5.5 py-2.5 transition-colors duration-350 ${
                    on ? "bg-snow text-ink-deep" : "text-mist hover:text-snow"
                  }`}
                >
                  {t.name}
                </button>
              );
            })}
          </div>
        </Animate>

        <p aria-live="polite" className="sr-only">
          Showing {selectedPillar?.name} prices at the {selected.name} tier.
        </p>

        {servicePillars.map((pillar) => (
          <div
            key={pillar.id}
            data-price-list={pillar.id}
            hidden={pillar.id !== pillarId}
            className="border-t border-snow/14"
          >
            {priceTables
              .filter((table) => table.pillarId === pillar.id)
              .flatMap((table) => table.rows)
              .map((row) => {
                const amount = priceOf(row, tier);
                return (
                  <div
                    key={`${row.service}-${row.note ?? ""}`}
                    data-price-row
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-snow/10 py-[clamp(0.875rem,1.4vw,1.25rem)] transition-[padding] duration-400 hover:pl-3.5"
                  >
                    <span className="flex-[1_1_min(100%,16.25rem)] text-[clamp(0.8125rem,1vw,0.9375rem)] text-snow/85">
                      {row.service}
                      {row.note ? (
                        <span className="text-mist-dim"> ({row.note})</span>
                      ) : null}
                    </span>
                    <span
                      data-price
                      className="tabular font-display text-[clamp(1.25rem,1.9vw,1.75rem)] tracking-[-0.01em] text-doe"
                    >
                      {amount === null ? "—" : usd(amount)}
                      {row.unit ? (
                        <span className="label-tight ml-2 font-sans text-mist-dim">
                          {row.unit}
                        </span>
                      ) : null}
                    </span>
                  </div>
                );
              })}
          </div>
        ))}

        <div className="rule-grid mt-[clamp(2.25rem,4vw,3.75rem)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,15rem),1fr))]">
          {policy.map((card) => (
            <div
              key={card.label}
              className="rule-cell-dark flex flex-col gap-2.25 bg-ink-deep px-6 py-6.5"
            >
              <span className="label text-mist-dim">{card.label}</span>
              <span
                className={`font-display text-[clamp(1.5rem,2.2vw,2rem)] ${
                  card.accent ? "text-doe" : "text-snow"
                }`}
              >
                {card.value}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-5 max-w-[80ch] text-xs leading-[1.8] font-light text-mist-dim">
          {selected.fit} Prices exclude local VAT or GST where applicable to
          your jurisdiction.
        </p>
      </div>
    </section>
  );
}
