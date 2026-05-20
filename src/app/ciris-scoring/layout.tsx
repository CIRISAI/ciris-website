import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "CIRIS Scoring: Live Trace Compendium and Effective-Dimensionality Dashboard",
  description:
    "Public window into the live CIRIS trace compendium. Effective-dimensionality measurement, completion corridors, refusal boundaries, and override fringe, visible on production agents in real time. Built on the Capacity Score, a deterministic function of identity hash and signed trace corpus.",
  alternates: { canonical: "/ciris-scoring" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/ciris-scoring",
    title: "CIRIS Scoring: Live Trace Compendium",
    description:
      "Effective-dimensionality measurement and behavioral structure on production AI agents in real time.",
  },
};

export default function CirisScoringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
