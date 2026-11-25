import type { Metadata } from "next";
import { ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "Explore a Trace: Reasoning-Trace Inspector for Auditable AI Agents",
  description:
    "Inspect a real CIRIS reasoning trace step by step. Every observation, conscience check, decision, and tool call is signed, ordered, and replayable. The auditable AI agent thesis made concrete on a single decision.",
  alternates: { canonical: "/explore-a-trace" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/explore-a-trace",
    title: "Explore a Trace: Reasoning-Trace Inspector",
    description:
      "Inspect a real CIRIS reasoning trace step by step. Every conscience check and tool call signed and replayable.",
    images: [ogImage("/explore-a-trace")],
  },
};

export default function ExploreATraceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
