// Localized install page (/es/install, /am/install, /ha/install, /yo/install).
// Thin entry point over the shared InstallContent, fed the locale's dictionary.
// hreflang alternates point search engines at every locale's install page so
// the right one surfaces per reader.

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import InstallV2 from "@/app/components/InstallV2";
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
  return localizedSeo("/install", locale);
}

export default async function LocalizedInstall({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(safeLocale);
  return <InstallV2 t={dict} locale={safeLocale} />;
}
