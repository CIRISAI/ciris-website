// Localized coherence-collapse-analysis page (/es/coherence-collapse-analysis, etc.).
// Thin entry point over the shared CoherenceCollapseAnalysisContent, fed the
// locale's dictionary. hreflang alternates point search engines at every
// locale's page so the right one surfaces per reader.

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import CoherenceCollapseAnalysisV2 from "@/app/components/CoherenceCollapseAnalysisV2";
import { getDictionary } from "@/i18n/dictionaries";
import {
  PREFIXED_LOCALES,
  LOCALES,
  localizedPath,
  isLocale,
} from "@/i18n/config";

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return localizedSeo("/coherence-collapse-analysis", locale);
}

export default async function LocalizedCoherenceCollapseAnalysis({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "en";
  const dict = getDictionary(resolved);
  return <CoherenceCollapseAnalysisV2 t={dict} locale={resolved} />;
}
