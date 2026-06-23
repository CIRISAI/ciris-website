// Localized CEG landing (/es/grammar, /am/grammar, …). Thin entry point over
// the shared GrammarBaseContent, fed the locale's dictionary plus the live spec
// figures. The spec reader (/grammar/details) and workshop (/grammar/explore)
// stay English-only.

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import GrammarV2 from "@/app/components/GrammarV2";
import { getDictionary } from "@/i18n/dictionaries";
import { PREFIXED_LOCALES, isLocale } from "@/i18n/config";
import {
  getRegistrySource,
  CEG_READER_PDF,
  CEG_FULL_PDF,
} from "@/app/grammar/lib/source";

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
  return localizedSeo("/grammar", locale);
}

export default async function LocalizedGrammar({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const source = await getRegistrySource();
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return (
    <GrammarV2
      t={dict}
      specVersion={source.specVersion}
      releasedDate={source.fsdLastUpdated}
      totalPrefixes={source.totalPrefixes}
      readerPdf={CEG_READER_PDF}
      fullPdf={CEG_FULL_PDF}
    />
  );
}
