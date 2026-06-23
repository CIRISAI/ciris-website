import type { Metadata } from "next";
import PathStaircase from "@/app/components/PathStaircase";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath, PREFIXED_LOCALES, isLocale } from "@/i18n/config";
import { ogImage, ogVideo } from "@/lib/seo";

const SLUG = "misinformation";
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
    openGraph: {
      type: "article", title: p.metaTitle, description: p.metaDesc, url: "https://ciris.ai" + url,
      images: [{ url: ogImage(BASE, locale), type: "image/gif", width: 1200, height: 630, alt: p.metaTitle }],
      ...(ogVideo(BASE, locale) ? { videos: [{ url: ogVideo(BASE, locale)!, type: "video/mp4", width: 1200, height: 630 }] } : {}),
    },
    twitter: { card: "summary_large_image", title: p.metaTitle, description: p.metaDesc, images: [{ url: ogImage(BASE, locale), alt: p.metaTitle }] },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return <PathStaircase t={dict} slug={SLUG} />;
}
