// English vision page (site root). Thin entry point over the shared
// VisionContent, fed the English dictionary. Localized variants live at
// src/app/[locale]/vision/.

import type { Metadata } from "next";
import VisionContent from "@/app/components/VisionContent";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/vision",
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [l.code, localizedPath("/vision", l.code)]),
      ),
      "x-default": "/vision",
    },
  },
};

export default function VisionPage() {
  return <VisionContent t={getDictionary("en")} />;
}
