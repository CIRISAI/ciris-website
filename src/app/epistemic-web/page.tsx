// English "Epistemic Web" hub (/epistemic-web). The interactive CIRIS Stack is
// the page: five strata over one signed primitive, each flowing through to the
// page that goes deep on it (/install, /crowdsourcing-alignment, /grammar,
// /cewp, /verification). Localized variants live at src/app/[locale]/epistemic-web/.

import { localizedSeo } from "@/lib/seo";
import CirisStackView from "@/app/components/stack/CirisStackView";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/epistemic-web", "en");

export default function EpistemicWebPage() {
  return <CirisStackView t={getDictionary("en")} locale="en" />;
}
