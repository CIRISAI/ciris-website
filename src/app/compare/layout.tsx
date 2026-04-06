import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare | Accountability Infrastructure for Autonomous AI",
  description: "Seven requirements for verifiably accountable AI. See how CIRIS implements accountability infrastructure with published principles, runtime conscience, and cryptographic attestation.",
  keywords: [
    "accountability infrastructure",
    "AI accountability comparison",
    "auditable AI requirements",
    "autonomous AI accountability",
    "AI compliance",
    "EU AI Act compliance",
  ],
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
