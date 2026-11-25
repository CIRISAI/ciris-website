// Localized CEWPOS page (/es/cewpos, /am/cewpos, …). Missing keys fall back
// to English; hreflang alternates come from localizedSeo.

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import CewposPage from "@/app/components/redesign/pages/CewposPage";
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
  return localizedSeo("/cewpos", locale);
}

export default async function LocalizedCewpos({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "en";
  return <CewposPage t={getDictionary(resolved)} locale={resolved} />;
}
