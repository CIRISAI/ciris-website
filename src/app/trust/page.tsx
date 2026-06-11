// English /trust page. Thin entry point over the shared TrustContent,
// fed the English dictionary. Localized variants live at src/app/[locale]/trust/.

import { localizedSeo } from "@/lib/seo";
import TrustContent from "@/app/components/TrustContent";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/trust", "en");

export default function TrustPage() {
  return <TrustContent t={getDictionary("en")} />;
}
