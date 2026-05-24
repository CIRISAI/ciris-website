import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The CIRIS Federation",
  description:
    "A network of AI agents that watches itself: the supervision chain, the signed records, and what CIRIS is actually building. Read in plain English or in the full technical register.",
  alternates: { canonical: "/federation" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/federation",
    title: "The CIRIS Federation",
    description:
      "A network of AI agents that watches itself: the supervision chain, the signed records, and what CIRIS is actually building. Read in plain English or in the full technical register.",
  },
};

export default function FederationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
