// Localized route (/{locale}/compliance/eu-ai-act). Body localized via t.euAiAct; metadata
// stays English (localized OG cards can follow). Same page tier as /compare.

import type { Metadata } from "next";
import EuAiActV2 from "@/app/components/EuAiActV2";
import { getDictionary } from "@/i18n/dictionaries";
import { PREFIXED_LOCALES, isLocale } from "@/i18n/config";

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}
export const dynamicParams = false;

const TITLE = 'EU AI Act for AI Agents, Article by Article, Mapped to CIRIS | CIRIS';
const DESC = 'An informative, cited mapping of the EU AI Act high-risk articles to the shipped CIRIS mechanism that corresponds to each. Pending legal review, not certified compliance.';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: TITLE,
    description: DESC,
    alternates: { canonical: `/${locale}/compliance/eu-ai-act` },
    openGraph: { type: "article", url: `https://ciris.ai/${locale}/compliance/eu-ai-act`, title: TITLE, description: DESC },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "en";
  return <EuAiActV2 t={getDictionary(resolved)} locale={resolved} />;
}
