import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accountability | CIRIS Architecture",
  description: "Architectural accountability features: parasocial prevention, cryptographic kill switch, on-device identity, tamper-evident attestation, and privacy by design.",
  keywords: [
    "AI accountability architecture",
    "runtime conscience",
    "AI kill switch",
    "cryptographic attestation",
    "AI accountability features",
    "auditable AI",
  ],
};

export default function SafetyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
