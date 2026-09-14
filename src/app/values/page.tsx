// English values page (site root). Thin entry point over the shared ValuesV2,
// fed the English dictionary. Localized variants live at src/app/[locale]/values/.

import { localizedSeo } from "@/lib/seo";
import ValuesV2 from "@/app/components/ValuesV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/values", "en");

export default function ValuesPage() {
  return <ValuesV2 t={getDictionary("en")} locale="en" />;
}
