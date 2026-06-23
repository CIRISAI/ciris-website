// Localized /trust page (/es/trust, /am/trust, /ha/trust, /yo/trust).
// Thin entry point over the shared TrustContent, fed the locale's dictionary.
// hreflang alternates point search engines at every locale's page so the
// right one surfaces per reader.

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import TrustV2 from "@/app/components/TrustV2";
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
  return localizedSeo("/trust", locale);
}

export default async function LocalizedTrust({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "en";
  const dict = getDictionary(resolved);
  return <TrustV2 t={dict} locale={resolved} />;
}
