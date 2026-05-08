import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Install — Auditable Open-Source Ethical AI Agent (AGPL-3.0, Android & iOS)",
  description:
    "Install CIRIS Agent on Android (Google Play), iOS (App Store), or via pip. Open-source AGPL-3.0 ethical AI with cryptographic attestation, runtime conscience, and verifiable reasoning traces. Mission-locked L3C structure.",
  alternates: { canonical: "/install" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/install",
    title: "Install CIRIS Agent — Android, iOS, or pip",
    description:
      "Auditable open-source ethical AI agent. AGPL-3.0, Ed25519-attested, runtime conscience.",
  },
};

export default function InstallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
