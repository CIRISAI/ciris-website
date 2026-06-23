// Localized models page (/es/models, /am/models, /ha/models, /yo/models, …).
// Thin entry point over the shared ModelsContent, fed the locale's dictionary.
// hreflang alternates point search engines at every locale's models page so
// the right one surfaces per reader.

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import ModelsV2 from "@/app/components/ModelsV2";
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
  return localizedSeo("/models", locale);
}

export default async function LocalizedModels({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "en";
  const dict = getDictionary(resolved);
  return <ModelsV2 t={dict} locale={resolved} />;
}
