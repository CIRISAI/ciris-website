import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Services: Hosted CIRIS Agent (AGPL-3.0, Mission-Locked, Same Price Everywhere)",
  description:
    "Hosted CIRIS Agent for organizations. Same price everywhere ($0.10/request, or free with bring-your-own-key), no enterprise tiers, no contact-sales. The L3C structure prevents profit extraction from overriding mission. AGPL-3.0 forever.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/services",
    title: "Services: Hosted CIRIS Agent",
    description:
      "Same price everywhere. No enterprise tiers. AGPL-3.0 mission-locked L3C.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
