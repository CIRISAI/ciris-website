// Localized "Epistemic Web" concept hub (/es/epistemic-web, …). Thin entry point
// over the shared EpistemicWebContent, fed the locale's dictionary.

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import EpistemicWebContent from "@/app/components/EpistemicWebContent";
import { getDictionary } from "@/i18n/dictionaries";
import { PREFIXED_LOCALES, isLocale } from "@/i18n/config";

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
  return localizedSeo("/epistemic-web", locale);
}

export default async function LocalizedEpistemicWeb({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return <EpistemicWebContent t={dict} />;
}
