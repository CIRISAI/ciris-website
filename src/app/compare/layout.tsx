import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare | Runtime Governance for Agentic AI",
  description: "Six requirements for verifiably ethical AI. See how CIRIS implements runtime governance with published principles, conscience-checked actions, and cryptographic audit.",
  keywords: [
    "runtime governance",
    "AI governance comparison",
    "ethical AI requirements",
    "agentic AI safety",
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
