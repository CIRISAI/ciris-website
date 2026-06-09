// English safety-vs-censorship page (site root). Thin entry point over the
// shared SafetyVsCensorshipContent, fed the English dictionary. Localized
// variants live at src/app/[locale]/safety-vs-censorship/.

import type { Metadata } from "next";
import SafetyVsCensorshipContent from "@/app/components/SafetyVsCensorshipContent";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/safety-vs-censorship",
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [l.code, localizedPath("/safety-vs-censorship", l.code)]),
      ),
      "x-default": "/safety-vs-censorship",
    },
  },
};

export default function SafetyVsCensorshipPage() {
  return <SafetyVsCensorshipContent t={getDictionary("en")} />;
}
