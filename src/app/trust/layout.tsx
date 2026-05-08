import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Trust & Identity — Post-Quantum Cryptographic Attestation (Ed25519 + ML-DSA-65)",
  description:
    "Verifiable AI agent identity built on post-quantum cryptographic attestation. Hybrid Ed25519 + ML-DSA-65 dual signatures — classical security from hardware, quantum resistance from software. Five-level trust stack, hardware-anchored signing keys, hash-chained audit ledger. Verify the agent, do not trust it.",
  alternates: { canonical: "/trust" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/trust",
    title: "Trust & Identity — Post-Quantum Cryptographic Attestation",
    description:
      "Hybrid Ed25519 + ML-DSA-65 dual signatures, hardware-anchored signing keys, hash-chained audit ledger. Verify the agent, do not trust it.",
  },
};

export default function TrustLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
