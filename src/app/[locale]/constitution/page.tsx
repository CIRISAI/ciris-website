// Localized front-door for the unified CIRIS Constitution (/es/constitution, …).
// Thin entry over the shared ConstitutionV2, fed the locale's dictionary.

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import ConstitutionV2 from "@/app/components/ConstitutionV2";
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
  return localizedSeo("/constitution", locale);
}

export default async function LocalizedConstitution({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return <ConstitutionV2 t={dict} locale={isLocale(locale) ? locale : "en"} />;
}
