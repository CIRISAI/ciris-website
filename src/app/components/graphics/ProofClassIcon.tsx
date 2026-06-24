// The five proof-class line icons, shipped by the design team
// (CIRIS Icon Redesign · emoji-icons/proof-*.svg). Text-free, 22x22, drawn with
// stroke="currentColor" so each inherits its card's accent color via CSS.
// One <ProofClassIcon name=…/> per proof class on the /proof page.

import type { ReactNode } from "react";

const PATHS: Record<string, ReactNode> = {
  // shield + check
  safety: (
    <>
      <path d="M11 2.5 L18.25 5 L18.25 11 C18.25 15.25 15 18.5 11 19.75 C7 18.5 3.75 15.25 3.75 11 L3.75 5 Z" />
      <path d="M7.75 11 L10.25 13.5 L14.5 8.5" />
    </>
  ),
  // gear hex + hub
  engineering: (
    <>
      <path d="M18.5 11 L14.75 4.5 L7.25 4.5 L3.5 11 L7.25 17.5 L14.75 17.5 Z" />
      <circle cx="11" cy="11" r="3" />
    </>
  ),
  // open book / proof sheet
  theory: (
    <>
      <path d="M11 6 C8 4.5 5 4.5 3.5 5.5 L3.5 16 C5 15 8 15 11 16.5" />
      <path d="M11 6 C14 4.5 17 4.5 18.5 5.5 L18.5 16 C17 15 14 15 11 16.5" />
      <path d="M11 6 L11 16.5" />
    </>
  ),
  // clipboard + check
  compliance: (
    <>
      <path d="M5 4.5 L17 4.5 L17 19.25 L5 19.25 Z" />
      <path d="M8.5 2.75 L13.5 2.75 L13.5 5.5 L8.5 5.5 Z" />
      <path d="M7.75 11.5 L10.25 14 L14.5 9" />
    </>
  ),
  // open eye / signed record
  transparency: (
    <>
      <path d="M3.5 11 C6 6.5 16 6.5 18.5 11 C16 15.5 6 15.5 3.5 11 Z" />
      <circle cx="11" cy="11" r="2.75" />
    </>
  ),
};

export default function ProofClassIcon({
  name,
  className,
}: {
  name: keyof typeof PATHS | string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      {PATHS[name] ?? null}
    </svg>
  );
}
