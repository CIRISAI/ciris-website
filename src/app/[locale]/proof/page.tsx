// Localized proof page (/es/proof, /am/proof,
// /ha/proof, /yo/proof, etc.).
// Thin entry point over the shared ResearchStatusContent, fed the locale's
// dictionary. hreflang alternates point search engines at every locale's
// proof page so the right one surfaces per reader.

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import ResearchStatusV2 from "@/app/components/ResearchStatusV2";
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
  return localizedSeo("/proof", locale);
}

export default async function LocalizedResearchStatus({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "en";
  const dict = getDictionary(resolved);
  return <ResearchStatusV2 t={dict} locale={resolved} />;
}
