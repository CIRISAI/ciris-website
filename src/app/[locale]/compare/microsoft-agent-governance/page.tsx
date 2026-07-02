// Localized route (/{locale}/compare/microsoft-agent-governance). Body localized via t.compareMicrosoft; metadata
// stays English (localized OG cards can follow). Same page tier as /compare.

import type { Metadata } from "next";
import CompareMicrosoftV2 from "@/app/components/CompareMicrosoftV2";
import { getDictionary } from "@/i18n/dictionaries";
import { PREFIXED_LOCALES, isLocale } from "@/i18n/config";

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}
export const dynamicParams = false;

const TITLE = 'CIRIS vs Microsoft Agent Governance Toolkit | CIRIS';
const DESC = 'An honest, cited comparison of CIRIS and the Microsoft Agent Governance Toolkit on eight AI-agent accountability criteria.';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: TITLE,
    description: DESC,
    alternates: { canonical: `/${locale}/compare/microsoft-agent-governance` },
    openGraph: { type: "article", url: `https://ciris.ai/${locale}/compare/microsoft-agent-governance`, title: TITLE, description: DESC },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "en";
  return <CompareMicrosoftV2 t={getDictionary(resolved)} locale={resolved} />;
}
