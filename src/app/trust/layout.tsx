import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Trust & Identity — Verifiable AI Agent with Cryptographic Attestation (Ed25519)",
  description:
    "Verifiable AI agent identity built on Ed25519 cryptographic attestation. Five-level trust stack with hardware-anchored signing keys, per-decision signatures, and a hash-chained audit ledger. Verify the agent, do not trust it.",
  alternates: { canonical: "/trust" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/trust",
    title: "Trust & Identity — Verifiable AI Agent with Ed25519 Attestation",
    description:
      "Cryptographic attestation, hardware-anchored signing keys, hash-chained audit ledger. Verify the agent, do not trust it.",
  },
};

export default function TrustLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
