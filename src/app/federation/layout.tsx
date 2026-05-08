import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Federation — Proof of Benefit and the Federated Ratchet (3.X plan)",
  description:
    "The federation primitive proposed for the CIRIS 3.X line: Proof of Benefit, where the cost of network membership is producing the benefit the network exists to enable. Sovereign and registered tier semantics, score-as-pure-function, and a multi-medium transport (Reticulum-rs) for reach beyond datacenter fiber.",
  alternates: { canonical: "/federation" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/federation",
    title: "Federation — Proof of Benefit and the Federated Ratchet",
    description:
      "Proof of Benefit: where membership cost is the benefit the network produces. The 3.X architectural direction for sovereign and registered AI agents.",
  },
};

export default function FederationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
