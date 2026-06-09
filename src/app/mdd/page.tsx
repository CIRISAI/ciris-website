// English MDD page (site root). Thin entry point over the shared
// MddContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/mdd/.

import type { Metadata } from "next";
import MddContent from "@/app/components/MddContent";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/mdd",
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [l.code, localizedPath("/mdd", l.code)]),
      ),
      "x-default": "/mdd",
    },
  },
};

export default function MddPage() {
  return <MddContent t={getDictionary("en")} />;
}
