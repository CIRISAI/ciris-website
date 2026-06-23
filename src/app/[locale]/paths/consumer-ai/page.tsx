import type { Metadata } from "next";
import PathStaircase from "@/app/components/PathStaircase";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath, PREFIXED_LOCALES, isLocale } from "@/i18n/config";

const SLUG = "consumer-ai";
const BASE = "/paths/" + SLUG;

export function generateStaticParams() { return PREFIXED_LOCALES.map((locale) => ({ locale })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const p = getDictionary(isLocale(locale) ? locale : "en").paths[SLUG as "consumer-ai" | "superalignment" | "misinformation" | "big-tech"];
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l.code] = localizedPath(BASE, l.code);
  languages["x-default"] = BASE;
  const url = localizedPath(BASE, locale);
  return {
    title: p.metaTitle,
    description: p.metaDesc,
    alternates: { canonical: url, languages },
    openGraph: { type: "article", title: p.metaTitle, description: p.metaDesc, url: "https://ciris.ai" + url },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return <PathStaircase t={dict} slug={SLUG} />;
}
