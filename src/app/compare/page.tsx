// English compare page (site root). Thin entry point over the shared
// CompareContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/compare/.

import type { Metadata } from "next";
import CompareContent from "@/app/components/CompareContent";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/compare",
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [l.code, localizedPath("/compare", l.code)]),
      ),
      "x-default": "/compare",
    },
  },
};

export default function ComparePage() {
  return <CompareContent t={getDictionary("en")} />;
}
