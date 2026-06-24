// English Proof page (/proof) — the five-class synthesis. Thin entry over the
// shared ProofV2; localized variants live at src/app/[locale]/proof/.

import { localizedSeo } from "@/lib/seo";
import ProofV2 from "@/app/components/ProofV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/proof", "en");

export default function ProofPage() {
  return <ProofV2 t={getDictionary("en")} locale="en" />;
}
