import type { Metadata } from "next";
import PathStaircase from "@/app/components/PathStaircase";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath } from "@/i18n/config";

const SLUG = "consumer-ai";
const BASE = "/paths/" + SLUG;

export function generateMetadata(): Metadata {
  const locale = "en";
  const p = getDictionary("en").paths[SLUG as "consumer-ai" | "superalignment" | "misinformation" | "big-tech"];
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

export default function Page() {
  return <PathStaircase t={getDictionary("en")} slug={SLUG} />;
}
