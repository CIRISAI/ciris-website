// Localized values page (/es/values, /am/values, ...). Thin entry point over
// the shared ValuesV2, fed the locale's dictionary.

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import ValuesV2 from "@/app/components/ValuesV2";
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
  return localizedSeo("/values", locale);
}

export default async function LocalizedValues({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  return <ValuesV2 t={getDictionary(safeLocale)} locale={safeLocale} />;
}
