// English homepage (site root). Thin entry point over the shared HomeContent,
// fed the English dictionary. Localized variants live at src/app/[locale]/.

import type { Metadata } from "next";
import HomeContent from "@/app/components/HomeContent";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [l.code, localizedPath("/", l.code)]),
      ),
      "x-default": "/",
    },
  },
};

export default function Homepage() {
  return <HomeContent t={getDictionary("en")} />;
}
