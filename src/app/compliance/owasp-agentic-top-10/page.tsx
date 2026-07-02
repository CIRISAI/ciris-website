// English-only mapping route (/compliance/owasp-agentic-top-10), in the English-
// only technical tier with /compliance and /verification. Keyword-matched to the
// OWASP Agentic taxonomy practitioners are standardizing on.

import type { Metadata } from "next";
import OwaspAgenticV2 from "@/app/components/OwaspAgenticV2";
import { getDictionary } from "@/i18n/dictionaries";

const TITLE = "OWASP Top 10 for Agentic Applications, Mapped to CIRIS | CIRIS";
const DESC =
  "A cited, honest mapping of the OWASP Top 10 for Agentic Applications (goal hijack, tool misuse, identity abuse, memory poisoning, cascading failures, rogue agents, and more) to the specific CIRIS mechanism that addresses each risk, with coverage levels and gaps marked.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/compliance/owasp-agentic-top-10" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/compliance/owasp-agentic-top-10",
    title: TITLE,
    description: DESC,
  },
};

export default function Page() {
  return <OwaspAgenticV2 t={getDictionary("en")} locale="en" />;
}
