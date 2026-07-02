// Localized route (/{locale}/compliance/owasp-agentic-top-10). Body localized via t.owaspAgentic; metadata
// stays English (localized OG cards can follow). Same page tier as /compare.

import type { Metadata } from "next";
import OwaspAgenticV2 from "@/app/components/OwaspAgenticV2";
import { getDictionary } from "@/i18n/dictionaries";
import { PREFIXED_LOCALES, isLocale } from "@/i18n/config";

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}
export const dynamicParams = false;

const TITLE = 'OWASP Top 10 for Agentic Applications, Mapped to CIRIS | CIRIS';
const DESC = 'A cited, honest mapping of the OWASP Top 10 for Agentic Applications to the CIRIS mechanism that addresses each risk, with coverage levels and gaps marked.';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: TITLE,
    description: DESC,
    alternates: { canonical: `/${locale}/compliance/owasp-agentic-top-10` },
    openGraph: { type: "article", url: `https://ciris.ai/${locale}/compliance/owasp-agentic-top-10`, title: TITLE, description: DESC },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "en";
  return <OwaspAgenticV2 t={getDictionary(resolved)} locale={resolved} />;
}
