// Every product claim carries one of these (handoff, copy rules): Shipping
// (green), In development (amber), Research or Modelled (violet / amber).

import s from "./rd.module.css";

export type ChipKind = "shipping" | "inDev" | "research" | "modelled";

const TONE: Record<ChipKind, string> = {
  shipping: s.ok,
  inDev: s.warn,
  research: s.violet,
  modelled: s.warn,
};

export function StatusChip({ kind, label, pill = false }: { kind: ChipKind; label: string; pill?: boolean }) {
  return (
    <span className={`${s.status} ${TONE[kind]} ${pill ? s.statusPill : ""}`}>
      {pill ? label : `● ${label}`}
    </span>
  );
}

/**
 * Calls and voting carry a Shipping chip only once the owner has confirmed
 * both are in today's store builds (handoff §5, open items). Until then they
 * read "In development". Flip this one constant when confirmed.
 */
export const CALLS_AND_VOTES_CONFIRMED_SHIPPING = false;
