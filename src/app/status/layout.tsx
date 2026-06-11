import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "Status: Live Infrastructure Health for Verifiable AI Agents",
  description:
    "Real-time operational status of the CIRIS hosted infrastructure across US and EU regions. Service health, signed-trace ingest, and the warrant canary surface in one place.",
  alternates: { canonical: "/status" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/status",
    title: "Status: Live Infrastructure Health",
    description:
      "Real-time operational status across US and EU regions.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function StatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
