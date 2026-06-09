// English safety page (site root). Thin server entry point over the shared
// SafetyContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/safety/.

import type { Metadata } from "next";
import SafetyContent from "@/app/components/SafetyContent";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/safety",
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [l.code, localizedPath("/safety", l.code)]),
      ),
      "x-default": "/safety",
    },
  },
};

export default function SafetyPage() {
  return <SafetyContent t={getDictionary("en")} />;
}
