// English anchor page for contextual integrity (/contextual-integrity). The
// cited concept/SEO landing the site-wide "contextual integrity" tagging points
// at. Thin entry over the shared ContextualIntegrityV2; localized variants live
// at src/app/[locale]/contextual-integrity/.

import { localizedSeo } from "@/lib/seo";
import ContextualIntegrityV2 from "@/app/components/ContextualIntegrityV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/contextual-integrity", "en");

export default function Page() {
  return <ContextualIntegrityV2 t={getDictionary("en")} locale="en" />;
}
