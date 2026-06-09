// English /about page. Thin server entry point over the shared AboutContent,
// fed the English dictionary. Localized variants live at src/app/[locale]/about/.

import type { Metadata } from "next";
import AboutContent from "@/app/components/AboutContent";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/about",
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [l.code, localizedPath("/about", l.code)]),
      ),
      "x-default": "/about",
    },
  },
};

export default function AboutPage() {
  return <AboutContent t={getDictionary("en")} />;
}
