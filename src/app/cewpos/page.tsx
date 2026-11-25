// English CEWPOS page (/cewpos). Localized variants live at
// src/app/[locale]/cewpos/.

import { localizedSeo } from "@/lib/seo";
import CewposPage from "@/app/components/redesign/pages/CewposPage";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/cewpos", "en");

export default function Cewpos() {
  return <CewposPage t={getDictionary("en")} locale="en" />;
}
