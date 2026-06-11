import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Compliance | CIRIS",
  description:
    "Three layers across the CIRIS compliance graph: the four governance frameworks (Magnifica Humanitas, EU HLEG, IEEE EAD, ASEAN), the 27 structural-evidence dimensions (D01-D27), and the controls inside CIRISAgent that implement them. All content is fetched live from the public source-of-truth repos.",
  alternates: { canonical: "/compliance" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/compliance",
    title: "Compliance | CIRIS",
    description:
      "Walk the compliance graph: standards → dimension → control. 27 dimensions, four governance frameworks, one source of truth per layer.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function ComplianceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
