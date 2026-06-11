import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "Warrant Canary: Public Attestation of Operational Integrity",
  description:
    "CIRIS warrant canary: a public, signed, regularly-updated statement of what has not happened. Part of the AGPL-3.0 / L3C structural commitments that make capture by adversarial actors structurally visible if it ever occurs.",
  alternates: { canonical: "/canary" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/canary",
    title: "Warrant Canary: Public Attestation of Operational Integrity",
    description:
      "A signed public statement of what has not happened. Part of the structural commitments that make capture visible.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function CanaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
