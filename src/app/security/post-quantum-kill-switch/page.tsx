// English-only technical/SEO route (/security/post-quantum-kill-switch), in the
// same English-only tier as /compliance and /verification. Keyword-matched to
// CISO/auditor search: post-quantum AI agent security, AI agent kill switch,
// FIPS YubiKey, quantum-safe audit trail, ML-DSA-65.

import type { Metadata } from "next";
import { ogImages } from "@/lib/seo";
import SecurityKillSwitchV2 from "@/app/components/SecurityKillSwitchV2";
import { getDictionary } from "@/i18n/dictionaries";

const TITLE = "Post-Quantum AI Agent Kill Switch, Independently Verifiable | CIRIS";
const DESC =
  "Any one of three people can pause CIRIS agents with one signed row. The classical key half is on FIPS 140-3 YubiKey hardware, the post-quantum half (ML-DSA-65) on separate storage. Check the keys yourself with one command.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/security/post-quantum-kill-switch" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/security/post-quantum-kill-switch",
    title: TITLE,
    description: DESC, images: ogImages("/security/post-quantum-kill-switch", "en", TITLE)
  },
};

export default function Page() {
  return <SecurityKillSwitchV2 t={getDictionary("en")} locale="en" />;
}
