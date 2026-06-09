// English install page (site root). Thin entry point over the shared
// InstallContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/install/.

import type { Metadata } from "next";
import InstallContent from "@/app/components/InstallContent";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/install",
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [l.code, localizedPath("/install", l.code)]),
      ),
      "x-default": "/install",
    },
  },
};

export default function InstallPage() {
  return <InstallContent t={getDictionary("en")} />;
}
