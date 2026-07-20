// English grammar landing (/grammar). Thin entry over the shared GrammarV2,
// fed the English dictionary. Localized variants live at
// src/app/[locale]/grammar/. Since the CEG folded into the constitution this
// page no longer fetches the registry; the spec reader (/grammar/details) and
// workshop (/grammar/explore) stay English-only and keep their live fetch.

import { localizedSeo } from "@/lib/seo";
import GrammarV2 from "@/app/components/GrammarV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/grammar", "en");

export default function GrammarPage() {
  return <GrammarV2 t={getDictionary("en")} />;
}
