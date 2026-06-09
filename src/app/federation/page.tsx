// English federation page (site root). Thin entry point over Shell + SimpleContent,
// fed the English dictionary. Localized variants live at src/app/[locale]/federation/.

import type { Metadata } from "next";
import Shell from "./Shell";
import SimpleContent from "./SimpleContent";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/federation",
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [l.code, localizedPath("/federation", l.code)]),
      ),
      "x-default": "/federation",
    },
  },
};

export default function FederationPage() {
  const t = getDictionary("en");
  return (
    <Shell level="simple" locale="en">
      <SimpleContent t={t} />
    </Shell>
  );
}
