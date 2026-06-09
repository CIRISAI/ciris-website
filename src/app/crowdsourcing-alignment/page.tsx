// English /crowdsourcing-alignment page. Thin entry point over the shared
// CrowdsourcingAlignmentContent, fed the English dictionary. Localized variants
// live at src/app/[locale]/crowdsourcing-alignment/.

import type { Metadata } from "next";
import CrowdsourcingAlignmentContent from "@/app/components/CrowdsourcingAlignmentContent";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/crowdsourcing-alignment",
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [l.code, localizedPath("/crowdsourcing-alignment", l.code)]),
      ),
      "x-default": "/crowdsourcing-alignment",
    },
  },
};

export default function CrowdsourcingAlignmentPage() {
  return <CrowdsourcingAlignmentContent t={getDictionary("en")} />;
}
