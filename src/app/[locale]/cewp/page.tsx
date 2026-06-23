// Localized CEWP landing (/es/cewp, /am/cewp, …). Thin entry point over the
// shared CewpBaseContent, fed the locale's dictionary. hreflang alternates
// point search engines at every locale's CEWP page.

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import CewpV2 from "@/app/components/CewpV2";
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
  return localizedSeo("/cewp", locale);
}

export default async function LocalizedCewp({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "en";
  const dict = getDictionary(resolved);
  return <CewpV2 t={dict} locale={resolved} />;
}
