// Localized first-contact page (/es/first-contact, /am/first-contact, etc.).
// Thin entry point over the shared FirstContactContent, fed the locale's
// dictionary. hreflang alternates point search engines at every locale's
// first-contact page so the right one surfaces per reader.

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import FirstContactV2 from "@/app/components/FirstContactV2";
import { getDictionary } from "@/i18n/dictionaries";
import {
  PREFIXED_LOCALES,
  LOCALES,
  localizedPath,
  isLocale,
} from "@/i18n/config";

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
  return localizedSeo("/first-contact", locale);
}

export default async function LocalizedFirstContact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return <FirstContactV2 t={dict} locale={locale} />;
}
