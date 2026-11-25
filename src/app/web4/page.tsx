// English Web4 page (/web4). Thin entry point over the redesign's Web4Page,
// fed the English dictionary. The localized twin lives at src/app/[locale]/web4/.

import { localizedSeo } from "@/lib/seo";
import Web4Page from "@/app/components/redesign/pages/Web4Page";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/web4", "en");

export default function Web4() {
  return <Web4Page t={getDictionary("en")} locale="en" />;
}
