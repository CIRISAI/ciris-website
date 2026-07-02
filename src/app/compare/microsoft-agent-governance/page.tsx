// English-only comparison route (/compare/microsoft-agent-governance). Keyword-
// matched to the exact decision query a practitioner types when choosing between
// CIRIS and Microsoft's agent governance stack.

import type { Metadata } from "next";
import CompareMicrosoftV2 from "@/app/components/CompareMicrosoftV2";
import { getDictionary } from "@/i18n/dictionaries";

const TITLE = "CIRIS vs Microsoft Agent Governance Toolkit | CIRIS";
const DESC =
  "An honest, cited comparison of CIRIS and the Microsoft Agent Governance Toolkit (Agent Mesh / Agent Control Specification) on eight AI-agent accountability criteria: runtime enforcement, signed decision records, cryptographic identity, kill switch, enforced constitution, independent verification, open source, and production shipping.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/compare/microsoft-agent-governance" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/compare/microsoft-agent-governance",
    title: TITLE,
    description: DESC,
  },
};

export default function Page() {
  return <CompareMicrosoftV2 t={getDictionary("en")} locale="en" />;
}
