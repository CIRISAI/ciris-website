// Localized first-contact literature page (/es/first-contact/theory, ...).

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import FirstContactTheoryV2 from "@/app/components/FirstContactTheoryV2";
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
  return localizedSeo("/first-contact/theory", locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "en";
  return <FirstContactTheoryV2 t={getDictionary(resolved)} locale={resolved} />;
}
