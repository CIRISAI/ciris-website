import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore the grammar | CIRIS",
  description:
    "An interactive workshop on the CIRIS Epistemic Grammar. Pin attesters, make claims, run a composition policy, and watch the corridor metric move. Phase 2 of the Coherence game per CIRISAgent#835.",
  alternates: { canonical: "/grammar/explore" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/grammar/explore",
    title: "Explore the CIRIS grammar",
    description:
      "Build a small attestation chain and watch the corridor math move.",
  },
};

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
