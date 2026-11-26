// Localized /ai-welfare (/es/ai-welfare, …), copy from the aiWelfarePage dictionary.

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
  return localizedSeo("/ai-welfare", locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "en";
  return <SafetyStub variant="ai-welfare" t={getDictionary(resolved)} locale={resolved} />;
}
