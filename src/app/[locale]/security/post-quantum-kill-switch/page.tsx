// Localized route (/{locale}/security/post-quantum-kill-switch). Body localized via t.securityKillSwitch; metadata
// stays English (localized OG cards can follow). Same page tier as /compare.

import type { Metadata } from "next";
import SecurityKillSwitchV2 from "@/app/components/SecurityKillSwitchV2";
import { getDictionary } from "@/i18n/dictionaries";
import { PREFIXED_LOCALES, isLocale } from "@/i18n/config";

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}
export const dynamicParams = false;

const TITLE = 'Post-Quantum AI Agent Kill Switch, Independently Verifiable | CIRIS';
const DESC = 'CIRIS ships a constitutional AI agent kill switch on FIPS-certified YubiKey hardware with a hybrid Ed25519 + ML-DSA-65 (post-quantum) quorum. Verify the keys yourself with one command.';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: TITLE,
    description: DESC,
    alternates: { canonical: `/${locale}/security/post-quantum-kill-switch` },
    openGraph: { type: "article", url: `https://ciris.ai/${locale}/security/post-quantum-kill-switch`, title: TITLE, description: DESC },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "en";
  return <SecurityKillSwitchV2 t={getDictionary(resolved)} locale={resolved} />;
}
