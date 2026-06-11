// Localized /crowdsourcing-alignment page (/es/crowdsourcing-alignment, etc.).
// Thin entry point over the shared CrowdsourcingAlignmentContent, fed the
// locale's dictionary. hreflang alternates point search engines at every
// locale's page so the right one surfaces per reader.

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import CrowdsourcingAlignmentContent from "@/app/components/CrowdsourcingAlignmentContent";
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
  return localizedSeo("/crowdsourcing-alignment", locale);
}

export default async function LocalizedCrowdsourcingAlignment({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return <CrowdsourcingAlignmentContent t={dict} />;
}
