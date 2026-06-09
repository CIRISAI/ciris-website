// Layout for the prefixed-locale subtree (/es, /am, /ha, /yo). Nests under the
// root layout (which owns <html>/<body>). generateStaticParams enumerates the
// non-default locales so the static export prerenders exactly those — any other
// segment falls through to the static English routes or 404s.

import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { PREFIXED_LOCALES, isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import HtmlLangSetter from "@/app/components/HtmlLangSetter";

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === DEFAULT_LOCALE) notFound();
  return (
    <>
      <HtmlLangSetter locale={locale} />
      {children}
    </>
  );
}
