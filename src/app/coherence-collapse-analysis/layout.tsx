import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Coherence Collapse Analysis: Coherence-Based Alignment with Kish-Formula Effective Dimensionality",
  description:
    "Coherence-Based Alignment (CBA) is the architectural thesis behind CIRIS. The Coherence Collapse Analysis (CCA) paper formalizes when AI systems can become an echo chamber: above the singularity boundary K_req · ρ ≥ 1, time-to-truth diverges. The Kish design effect k_eff = k/(1+ρ(k−1)) measures effective independent constraints. Validated on 6,465+ production agent traces (Constrained Reasoning Chains).",
  alternates: { canonical: "/coherence-collapse-analysis" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/coherence-collapse-analysis",
    title:
      "Coherence Collapse Analysis: Coherence-Based Alignment, Kish Effect, Effective Dimensionality",
    description:
      "Mathematical foundation for coherence-based alignment. Kish-formula effective-dimensionality measurement on production AI traces, the singularity boundary, and the L-01 information-theoretic ceiling.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coherence Collapse Analysis: Coherence-Based Alignment for AI",
    description:
      "Kish-formula effective-dimensionality measurement on production AI agent traces. Validated on 6,465+ traces.",
  },
};

export default function CoherenceCollapseAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
