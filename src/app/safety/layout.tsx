import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safety | Runtime Governance Architecture",
  description: "Architectural safety features: parasocial prevention, cryptographic kill switch, on-device identity, tamper-evident audit trails, and privacy by design.",
  keywords: [
    "AI safety architecture",
    "runtime governance",
    "AI kill switch",
    "cryptographic audit",
    "AI safety features",
    "ethical AI safety",
  ],
};

export default function SafetyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
