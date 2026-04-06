import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "First Contact | CIRIS",
  description:
    "Maintaining a coherent lie across multiple independent checks is harder than telling the truth. We think this has implications beyond computer science. Deploy your first CIRIS agent or explore the coherence thesis.",
  openGraph: {
    title: "First Contact — CIRIS Framework",
    description:
      "Two meanings. One framework. Deploy your first auditable AI agent or explore why cooperation may be cheaper than deception — and what that means for building legible AI.",
    url: "https://ciris.ai/first-contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "First Contact — CIRIS Framework",
    description:
      "Cooperation is cheaper than deception. Deploy your first auditable AI agent or explore what that means.",
  },
};

export default function FirstContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
