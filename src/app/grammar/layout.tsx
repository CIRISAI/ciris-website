import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "CIRIS Epistemic Grammar (CEG) | CIRIS",
  description:
    "The federation's language for making structured, signed, machine-checkable claims. One workhorse attestation primitive (scores) + four structural composers (delegates_to, supersedes, withdraws, recants), five organizing families (STANDING / ACTION / DETECTION / CONSENSUS / CORRECTION), nine envelope fields, eight reasoning axes, eleven composition policies, and an open-extensible namespace. Auto-rendered from the FSD/CEG directory in the public CIRISRegistry repo.",
  alternates: { canonical: "/grammar" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/grammar",
    title: "CIRIS Epistemic Grammar (CEG)",
    description:
      "1 workhorse + 4 composers + 5 families + 9 envelope fields + 8 reasoning axes + 11 composition policies + an open namespace. The wire format the federation speaks.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function GrammarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
