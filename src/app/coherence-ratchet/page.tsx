// English coherence-ratchet page (site root). Thin entry point over Shell + SimpleContent,
// fed the English dictionary. Localized variants live at src/app/[locale]/coherence-ratchet/.

import type { Metadata } from "next";
import Shell from "./Shell";
import SimpleContent from "./SimpleContent";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, localizedPath } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/coherence-ratchet",
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [l.code, localizedPath("/coherence-ratchet", l.code)]),
      ),
      "x-default": "/coherence-ratchet",
    },
  },
};

export default function CoherenceRatchetPage() {
  const t = getDictionary("en");
  return (
    <Shell level="simple" locale="en">
      <SimpleContent t={t} />
    </Shell>
  );
}
