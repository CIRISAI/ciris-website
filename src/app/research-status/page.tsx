// English research-status page (site root). Thin entry point over the shared
// ResearchStatusContent, fed the English dictionary. Localized variants live
// at src/app/[locale]/research-status/.

import type { Metadata } from "next";
import ResearchStatusContent from "@/app/components/ResearchStatusContent";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/research-status",
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [l.code, localizedPath("/research-status", l.code)]),
      ),
      "x-default": "/research-status",
    },
  },
};

export default function ResearchStatusPage() {
  return <ResearchStatusContent t={getDictionary("en")} />;
}
