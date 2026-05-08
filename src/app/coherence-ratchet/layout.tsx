import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "The Coherence Ratchet — Coherence-Based Alignment Architecture for AI",
  description:
    "Coherence-based alignment thesis: how independent constraints accumulate to make deception expensive over time. The architecture behind the Coherence Collapse Analysis paper, the Alignment Manifold, and the Coherence Singularity formalisms in CIRIS RATCHET.",
  alternates: { canonical: "/coherence-ratchet" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/coherence-ratchet",
    title: "The Coherence Ratchet — Coherence-Based Alignment Architecture",
    description:
      "How accumulating independent constraints make deception structurally expensive over time. The CIRIS thesis and its formal foundations.",
  },
};

export default function CoherenceRatchetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
