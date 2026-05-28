import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CIRIS Epistemic Grammar (CEG) | CIRIS",
  description:
    "The federation's language for making structured, signed, machine-checkable claims. One workhorse attestation primitive (scores) + four structural composers (delegates_to, supersedes, withdraws, recants), five organizing families (STANDING / ACTION / DETECTION / CONSENSUS / CORRECTION), eight envelope fields, eight reasoning axes, seven composition policies, and 83 prefix families across nine owning components. Auto-rendered from FSD/CEG.md in the public CIRISRegistry repo.",
  alternates: { canonical: "/grammar" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/grammar",
    title: "CIRIS Epistemic Grammar (CEG)",
    description:
      "1 workhorse + 4 composers + 5 families + 8 envelope fields + 8 reasoning axes + 6 composition policies + ~80 prefix families. The wire format the federation speaks.",
  },
};

export default function GrammarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
