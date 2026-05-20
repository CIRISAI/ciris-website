import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "How It Works: H3ERE Pipeline for Auditable AI Agents",
  description:
    "The H3ERE pipeline: how every CIRIS agent decision flows through observation, context, analysis, conscience checks, and execution. Auditable, replayable, signed end to end. Four conscience faculties, ten action handlers, message-bus architecture.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/how-it-works",
    title: "How It Works: The H3ERE Pipeline",
    description:
      "Every decision flows through observation, context, analysis, conscience checks, and execution. Auditable and replayable.",
  },
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
