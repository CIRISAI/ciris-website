import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safety Policy",
  description:
    "CIRIS operational safety policy. Kill-switch protocol, deferral cascades, conscience-veto behavior, hash-chained audit trails, and the documented mechanisms by which the agent refuses mission-violating actions.",
  alternates: { canonical: "/safety-policy" },
};

export default function SafetyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
