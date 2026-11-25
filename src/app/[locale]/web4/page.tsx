// Localized Web4 page (/es/web4, /am/web4, …). Thin entry point over the
// redesign's Web4Page, fed the locale's dictionary (missing keys fall back to
// English). hreflang alternates come from localizedSeo.

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import Web4Page from "@/app/components/redesign/pages/Web4Page";
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
  return localizedSeo("/web4", locale);
}

export default async function LocalizedWeb4({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "en";
  return <Web4Page t={getDictionary(resolved)} locale={resolved} />;
}
