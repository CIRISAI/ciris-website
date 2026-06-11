import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "Infrastructure: Multi-Region, Privacy-First, Designed to Be Deleted",
  description:
    "CIRIS infrastructure topology. Active/active deployment across US (Vultr, Chicago, Cloudflare-proxied) and EU (Hetzner, Falkenstein, direct DNS). Zero single point of failure, no geo-routing: separate domains per region with bidirectional PostgreSQL replication. Designed to be deleted when no longer needed.",
  alternates: { canonical: "/architecture" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/architecture",
    title: "Infrastructure: Multi-Region, Privacy-First",
    description:
      "Active/active deployment across US and EU. Designed to be deleted.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function ArchitectureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
