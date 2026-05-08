import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Vision — Ubuntu-Grounded Relational Ethics in Production AI",
  description:
    "The CIRIS mission and the relational-ethics frame behind it. Ubuntu philosophy as architectural axiom, not as marketing copy. Why the atomic-self framing of conventional AI cannot bear the load. Meta-Goal M-1: sustainable adaptive coherence for diverse sentient beings.",
  alternates: { canonical: "/vision" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/vision",
    title: "Vision — Ubuntu-Grounded Relational Ethics in Production AI",
    description:
      "Relational selfhood as architectural axiom. Why the atomic-self framing of conventional AI cannot bear the load.",
  },
};

export default function VisionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
