// Localized coherence-collapse-analysis page (/es/coherence-collapse-analysis, etc.).
// Thin entry point over the shared CoherenceCollapseAnalysisContent, fed the
// locale's dictionary. hreflang alternates point search engines at every
// locale's page so the right one surfaces per reader.

import type { Metadata } from "next";
import CoherenceCollapseAnalysisContent from "@/app/components/CoherenceCollapseAnalysisContent";
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
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l.code] = localizedPath("/coherence-collapse-analysis", l.code);
  }
  languages["x-default"] = "/coherence-collapse-analysis";
  return {
    alternates: {
      canonical: localizedPath("/coherence-collapse-analysis", locale),
      languages,
    },
  };
}

export default async function LocalizedCoherenceCollapseAnalysis({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return <CoherenceCollapseAnalysisContent t={dict} />;
}
