import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The papers — empirical and formal backing for CIRIS",
  description:
    "Four papers under the CIRIS architecture: Corridor Dynamics (synthesis), Coherence Collapse Analysis (formal), Constrained Reasoning Chains (empirical, 6,465 traces), and the CIRISAgent Framework (22-service architecture). Each with permanent DOI; scope limits named explicitly.",
  alternates: { canonical: "/papers" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/papers",
    title: "The papers — empirical and formal backing for CIRIS",
    description:
      "Four papers, one /papers page. Corridor Dynamics, Coherence Collapse Analysis, Constrained Reasoning Chains, CIRISAgent Framework. With permanent DOIs and explicit scope limits.",
    images: [{ url: "/og/og-papers.gif", type: "image/gif", width: 1200, height: 630, alt: "The papers — empirical and formal backing for CIRIS" }],
    videos: [{ url: "https://ciris.ai/og/og-papers.mp4", type: "video/mp4", width: 1200, height: 630 }],
  },
};

export default function PapersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
