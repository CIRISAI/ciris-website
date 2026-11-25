// Localized /architecture/ (/es/architecture, /am/architecture, …). Thin entry
// point over the redesign's ArchitecturePage, fed the locale's dictionary.
// hreflang alternates point search engines at every locale's page.

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import ArchitecturePage from "@/app/components/redesign/pages/ArchitecturePage";
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
  return localizedSeo("/architecture", locale);
}

export default async function LocalizedArchitecture({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "en";
  const dict = getDictionary(resolved);
  return <ArchitecturePage t={dict} locale={resolved} />;
}
