import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How CIRIS handles user data. Privacy-preserving trace schemas, BYOK support, zero-retention options, and the structural commitments that keep the system inspectable without exposing private reasoning content.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
