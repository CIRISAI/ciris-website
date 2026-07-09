// Localized interim stub (/es/structural-privacy, …). Renders the shared SafetyStub in the
// locale's chrome; body copy is still English under the machine-translation
// banner until the Safety umbrella is built and localized.

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import SafetyStub from "@/app/components/SafetyStub";
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
  return localizedSeo("/structural-privacy", locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "en";
  return <SafetyStub variant="structural-privacy" t={getDictionary(resolved)} locale={resolved} />;
}
