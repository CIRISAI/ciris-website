// English /trust page. Thin entry point over the shared TrustContent,
// fed the English dictionary. Localized variants live at src/app/[locale]/trust/.

import type { Metadata } from "next";
import TrustContent from "@/app/components/TrustContent";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/trust",
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [l.code, localizedPath("/trust", l.code)]),
      ),
      "x-default": "/trust",
    },
  },
};

export default function TrustPage() {
  return <TrustContent t={getDictionary("en")} />;
}
