// English first-contact page (site root). Thin entry point over the shared
// FirstContactContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/first-contact/.

import type { Metadata } from "next";
import FirstContactContent from "@/app/components/FirstContactContent";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/first-contact",
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [l.code, localizedPath("/first-contact", l.code)]),
      ),
      "x-default": "/first-contact",
    },
  },
};

export default function FirstContactPage() {
  return <FirstContactContent t={getDictionary("en")} />;
}
