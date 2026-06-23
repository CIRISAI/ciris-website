// Localized federation page (/es/federation, /am/federation, etc.). Thin entry
// point over Shell + SimpleContent, fed the locale's dictionary.
// hreflang alternates point search engines at every locale's /federation so
// the right one surfaces per reader.

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import FederationV2 from "@/app/federation/FederationV2";
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
  return localizedSeo("/federation", locale);
}

export default async function LocalizedFederation({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : "en");
  return <FederationV2 t={t} locale={locale} />;
}
