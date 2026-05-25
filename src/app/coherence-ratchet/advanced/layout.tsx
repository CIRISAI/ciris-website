import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Coherence Ratchet — Advanced",
  description:
    "Why hidden state in scaling cognitive systems becomes a structural liability. Full technical articulation with grounding cases from engineering, statecraft, scientific institutions, and industry.",
  alternates: { canonical: "/coherence-ratchet/advanced" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/coherence-ratchet/advanced",
    title: "The Coherence Ratchet — Advanced",
    description:
      "Why hidden state in scaling cognitive systems becomes a structural liability. Full technical articulation.",
  },
};

export default function CoherenceRatchetAdvancedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
