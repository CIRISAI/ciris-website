// English models page (site root). Thin entry point over the shared
// ModelsContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/models/.

import type { Metadata } from "next";
import ModelsContent from "@/app/components/ModelsContent";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/models",
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [l.code, localizedPath("/models", l.code)]),
      ),
      "x-default": "/models",
    },
  },
};

export default function ModelsPage() {
  return <ModelsContent t={getDictionary("en")} />;
}
