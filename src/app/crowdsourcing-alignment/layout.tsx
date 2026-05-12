import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Crowdsourcing Alignment | Proto safety.ciris.ai",
  description:
    "The surface where the CIRIS safety-evaluation loop is being built. Select one of 29 languages, browse the Accord and Comprehensive Guide in that language, view safety batteries and rubrics where they exist, see results when they're published, and propose edits via GitHub issues. Honest about what runs today vs what is in flight.",
  alternates: { canonical: "/crowdsourcing-alignment" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/crowdsourcing-alignment",
    title: "Crowdsourcing Alignment | Proto safety.ciris.ai",
    description:
      "Pick a language. Browse the Accord, the Guide, the safety batteries and rubrics. Propose edits via GitHub issues. Native-speaker review for soft cases is what this surface is being built for.",
  },
};

export default function CrowdsourcingAlignmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
