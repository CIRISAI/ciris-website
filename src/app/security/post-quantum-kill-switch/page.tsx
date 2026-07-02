// English-only technical/SEO route (/security/post-quantum-kill-switch), in the
// same English-only tier as /compliance and /verification. Keyword-matched to
// CISO/auditor search: post-quantum AI agent security, AI agent kill switch,
// FIPS YubiKey, quantum-safe audit trail, ML-DSA-65.

import type { Metadata } from "next";
import SecurityKillSwitchV2 from "@/app/components/SecurityKillSwitchV2";
import { getDictionary } from "@/i18n/dictionaries";

const TITLE = "Post-Quantum AI Agent Kill Switch, Independently Verifiable | CIRIS";
const DESC =
  "CIRIS ships a constitutional AI agent kill switch on FIPS-certified YubiKey hardware with a hybrid Ed25519 + ML-DSA-65 (post-quantum) quorum. Verify the keys yourself with one command. Quantum-safe, signed audit trail, no trust required.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/security/post-quantum-kill-switch" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/security/post-quantum-kill-switch",
    title: TITLE,
    description: DESC,
  },
};

export default function Page() {
  return <SecurityKillSwitchV2 t={getDictionary("en")} locale="en" />;
}
