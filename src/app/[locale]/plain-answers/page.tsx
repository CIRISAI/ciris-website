// Localized plain-answers page (/es/plain-answers, /am/plain-answers, …). Thin entry point over the
// redesign's PlainAnswersPage, fed the locale's dictionary (missing keys fall back to
// English). hreflang alternates come from localizedSeo.

import type { Metadata } from "next";
import { localizedSeo } from "@/lib/seo";
import PlainAnswersPage from "@/app/components/redesign/pages/PlainAnswersPage";
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
  return localizedSeo("/plain-answers", locale);
}

export default async function LocalizedPlainAnswers({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "en";
  return <PlainAnswersPage t={getDictionary(resolved)} locale={resolved} />;
}
