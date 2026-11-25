// English plain-answers page (/plain-answers). Thin entry point over the redesign's PlainAnswersPage,
// fed the English dictionary. The localized twin lives at src/app/[locale]/plain-answers/.

import { localizedSeo } from "@/lib/seo";
import PlainAnswersPage from "@/app/components/redesign/pages/PlainAnswersPage";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/plain-answers", "en");

export default function PlainAnswers() {
  return <PlainAnswersPage t={getDictionary("en")} locale="en" />;
}
