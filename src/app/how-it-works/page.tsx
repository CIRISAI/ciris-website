// English how-it-works page (site root). Thin entry point over the shared
// HowItWorksContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/how-it-works/.

import type { Metadata } from "next";
import HowItWorksContent from "@/app/components/HowItWorksContent";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/how-it-works",
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [l.code, localizedPath("/how-it-works", l.code)]),
      ),
      "x-default": "/how-it-works",
    },
  },
};

export default function HowItWorksPage() {
  return <HowItWorksContent t={getDictionary("en")} />;
}
