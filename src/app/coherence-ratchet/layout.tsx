import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Coherence Ratchet",
  description:
    "Why a powerful AI system has to show its work, and what CIRIS is trying to do about it. Read in plain English or in the full technical register.",
  alternates: { canonical: "/coherence-ratchet" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/coherence-ratchet",
    title: "The Coherence Ratchet",
    description:
      "Why a powerful AI system has to show its work, and what CIRIS is trying to do about it. Read in plain English or in the full technical register.",
  },
};

export default function CoherenceRatchetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
