// English services page (site root). Thin entry point over the shared
// ServicesContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/services/.

import type { Metadata } from "next";
import ServicesContent from "@/app/components/ServicesContent";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/services",
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [l.code, localizedPath("/services", l.code)]),
      ),
      "x-default": "/services",
    },
  },
};

export default function ServicesPage() {
  return <ServicesContent t={getDictionary("en")} />;
}
