// English-only mapping route (/compliance/eu-ai-act), in the English-only technical
// tier with /compliance and /verification. Keyword-matched to the compliance-officer
// search that spikes ahead of the August 2026 high-risk deadline.

import type { Metadata } from "next";
import EuAiActV2 from "@/app/components/EuAiActV2";
import { getDictionary } from "@/i18n/dictionaries";

const TITLE = "EU AI Act for AI Agents, Article by Article, Mapped to CIRIS | CIRIS";
const DESC =
  "An informative, cited mapping of the EU AI Act high-risk articles (9 risk management, 12 record-keeping, 13 transparency, 14 human oversight, 15 robustness, 16 provider obligations, 50 AI disclosure, 72 post-market monitoring) to the shipped CIRIS mechanism that corresponds to each. Pending legal review, not certified compliance.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/compliance/eu-ai-act" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/compliance/eu-ai-act",
    title: TITLE,
    description: DESC,
  },
};

export default function Page() {
  return <EuAiActV2 t={getDictionary("en")} locale="en" />;
}
