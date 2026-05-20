import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "First Contact | CIRIS",
  description:
    "A new kind of intelligence is not arriving from another planet. It is being built here, alongside us. Start with CIRIS: install a free, auditable AI agent in minutes, or read the idea behind it. Includes the six first-contact protocols from the CIRIS Accord.",
  openGraph: {
    title: "First Contact: Start with CIRIS",
    description:
      "A new kind of intelligence is co-emerging with us, not landing from space. Install a free, auditable AI agent, or read the vision behind it.",
    url: "https://ciris.ai/first-contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "First Contact: Start with CIRIS",
    description:
      "Meeting a new kind of intelligence well means staying in the corridor with it. Install a free, auditable AI agent, or read the idea.",
  },
};

export default function FirstContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
