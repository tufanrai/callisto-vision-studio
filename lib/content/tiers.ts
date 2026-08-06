/**
 * The three service tiers. This is the spine of the whole site: every price
 * table is a row of three tier cells, and the hero's orbital diagram maps
 * each tier's delivery window to an orbital period (closer ring = faster).
 *
 * Delivery windows and revision counts are quoted verbatim from the proposal's
 * "Design Delivery & Revision Policy", which is identical across all five
 * service categories.
 */

export type TierId = "basic" | "standard" | "premium";

export interface Tier {
  id: TierId;
  name: string;
  /** Human-readable delivery window, as published. */
  delivery: string;
  /** Delivery window in hours — drives the orbital period in the diagram. */
  deliveryHours: number;
  revisions: number;
  revisionsLabel: string;
  /** One line on who the tier is for. */
  fit: string;
}

export const tiers: readonly Tier[] = [
  {
    id: "basic",
    name: "Basic",
    delivery: "Within 3 days",
    deliveryHours: 72,
    revisions: 0,
    revisionsLabel: "No revisions",
    fit: "A single, well-briefed deliverable where the direction is already settled.",
  },
  {
    id: "standard",
    name: "Standard",
    delivery: "Within 2 days",
    deliveryHours: 48,
    revisions: 2,
    revisionsLabel: "2 free revisions",
    fit: "The default. Room to react to the first draft without renegotiating scope.",
  },
  {
    id: "premium",
    name: "Premium",
    delivery: "Within 1 hour",
    deliveryHours: 1,
    revisions: 5,
    revisionsLabel: "5 free revisions",
    fit: "Priority queue for campaign deadlines and same-day turnarounds.",
  },
] as const;

export const tierById = (id: TierId): Tier =>
  tiers.find((t) => t.id === id) ?? tiers[1];

/** Format a USD figure the way the proposal does: $1,275 — no decimals. */
export const usd = (n: number): string =>
  `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
