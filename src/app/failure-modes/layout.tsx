import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Failure modes — what CIRIS covers, what it does not",
  description:
    "Each safety claim with the executable mechanism behind it (signed records, rubric pipeline, kill switch, three-person humanity accord, k_eff independence measurement). Plus the failure modes named explicitly out of scope: undetectable emergent deception, adaptive-adversary manipulation, supply-chain attacks, and the system measuring itself.",
  alternates: { canonical: "/failure-modes" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/failure-modes",
    title: "Failure modes — what CIRIS covers, what it does not",
    description:
      "Mechanism, not ritual. Each safety claim with its executable backing, and the failure modes named explicitly out of scope.",
  },
};

export default function FailureModesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
