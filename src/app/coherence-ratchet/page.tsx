// English coherence-ratchet page (site root). Thin entry point over Shell + SimpleContent,
// fed the English dictionary. Localized variants live at src/app/[locale]/coherence-ratchet/.

import { localizedSeo } from "@/lib/seo";
import Shell from "./Shell";
import SimpleContent from "./SimpleContent";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/coherence-ratchet", "en");

export default function CoherenceRatchetPage() {
  const t = getDictionary("en");
  return (
    <Shell level="simple" locale="en">
      <SimpleContent t={t} />
    </Shell>
  );
}
