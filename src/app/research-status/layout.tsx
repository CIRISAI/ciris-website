import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Research Status — Effective Dimensionality, Kish-Formula Measurement on Production AI Traces",
  description:
    "Live research surface for coherence-based alignment. Effective-dimensionality (Neff) measurement on 6,465+ production traces using the Kish design effect formula. Includes the Alignment Manifold and Coherence Singularity formal foundations from the CIRIS RATCHET Lean 4 work.",
  alternates: { canonical: "/research-status" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/research-status",
    title:
      "Research Status — Effective Dimensionality on Production AI Traces",
    description:
      "Kish-formula effective-dimensionality measurement on production agent traces, plus the Alignment Manifold and Coherence Singularity formal foundations.",
  },
};

export default function ResearchStatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
