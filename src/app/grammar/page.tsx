// English CEG landing (/grammar). Thin entry point over the shared
// GrammarBaseContent, fed the English dictionary plus the live spec figures.
// Localized variants live at src/app/[locale]/grammar/. The spec reader
// (/grammar/details) and workshop (/grammar/explore) stay English-only.

import { localizedSeo } from "@/lib/seo";
import GrammarBaseContent from "@/app/components/GrammarBaseContent";
import { getDictionary } from "@/i18n/dictionaries";
import { getRegistrySource, CEG_READER_PDF, CEG_FULL_PDF } from "./lib/source";

export const metadata = localizedSeo("/grammar", "en");

export default async function GrammarPage() {
  const source = await getRegistrySource();
  return (
    <GrammarBaseContent
      t={getDictionary("en")}
      specVersion={source.specVersion}
      releasedDate={source.fsdLastUpdated}
      totalPrefixes={source.totalPrefixes}
      readerPdf={CEG_READER_PDF}
      fullPdf={CEG_FULL_PDF}
    />
  );
}
