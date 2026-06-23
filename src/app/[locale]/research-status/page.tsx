// Localized research-status page (/es/research-status, /am/research-status,
// /ha/research-status, /yo/research-status, etc.).
// Thin entry point over the shared ResearchStatusContent, fed the locale's
// dictionary. hreflang alternates point search engines at every locale's
// research-status page so the right one surfaces per reader.

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
  return localizedSeo("/research-status", locale);
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
