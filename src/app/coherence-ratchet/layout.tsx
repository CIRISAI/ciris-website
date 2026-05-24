import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Coherence Ratchet",
  description:
    "Why hidden state in scaling cognitive systems becomes a structural liability, and what powerful systems converge toward instead. Read in plain English or in full technical register.",
  alternates: { canonical: "/coherence-ratchet" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/coherence-ratchet",
    title: "The Coherence Ratchet",
    description:
      "Why hidden state in scaling cognitive systems becomes a structural liability. The CIRIS thesis, in plain English or full technical register.",
  },
};

export default function CoherenceRatchetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
