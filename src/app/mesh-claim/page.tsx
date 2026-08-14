// English Mesh Claim anchor (/mesh-claim). Thin entry over the shared
// MeshClaimV2; localized variants live at src/app/[locale]/mesh-claim/.

import { localizedSeo } from "@/lib/seo";
import MeshClaimV2 from "@/app/components/MeshClaimV2";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = localizedSeo("/mesh-claim", "en");

export default function Page() {
  return <MeshClaimV2 t={getDictionary("en")} locale="en" />;
}
