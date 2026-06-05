import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The CIRIS Federation: Advanced",
  description:
    "A decentralized ethical superintelligence: the system claim, the architecture (identity, events, federation, verification, safety, lens, persistence), the four-clause ethical postulate, what this is and is not, where to engage.",
  alternates: { canonical: "/federation/advanced" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/federation/advanced",
    title: "The CIRIS Federation: Advanced",
    description:
      "The system claim, the architecture, and the bets being made. Full technical articulation.",
  },
};

export default function FederationAdvancedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
