// English first-contact literature page (/first-contact/theory). The cited
// lineage for the corridor prediction. Thin entry over the shared
// FirstContactTheoryV2; localized variants live at
// src/app/[locale]/first-contact/theory/.

import { localizedSeo } from "@/lib/seo";
import FirstContactTheoryV2 from "@/app/components/FirstContactTheoryV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/first-contact/theory", "en");

export default function Page() {
  return <FirstContactTheoryV2 t={getDictionary("en")} locale="en" />;
}
