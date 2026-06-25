// English-only /verification — the continuous-verification (CI) matrix. Like
// /compliance, this is a developer-facing technical surface and is not in the
// localized [locale] tree.

import { localizedSeo } from "@/lib/seo";
import VerificationV2 from "@/app/components/VerificationV2";

export const metadata = localizedSeo("/verification", "en");

export default function VerificationPage() {
  return <VerificationV2 />;
}
