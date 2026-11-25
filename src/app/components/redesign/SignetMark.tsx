// The CIRIS signet alone, as a solid mark in the current text colour: the
// logo.svg lockup carries its own tiny wordmark and subtitle, which beside the
// shell's wordmark read as clutter at header size.

import { SIGNET_INTERIORS, SIGNET_OUTLINE } from "@/app/components/ocean/signetGeometry";

const D = [SIGNET_OUTLINE, ...SIGNET_INTERIORS].join(" ");

export function SignetMark({ size, className }: { size: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="62 2 108 108" aria-hidden="true" focusable="false">
      <path d={D} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
