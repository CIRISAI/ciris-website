import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "First Contact | CIRIS",
  description:
    "The world's first open-source ethical AI framework with built-in first-contact protocols. Whether you're deploying your first CIRIS agent or preparing autonomous systems for the radically unknown — start here.",
  openGraph: {
    title: "First Contact — CIRIS Framework",
    description:
      "The only open-source AI governance framework with first-contact protocols built in. From deploying your first ethical agent to preparing for the radically unknown.",
    url: "https://ciris.ai/first-contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "First Contact — CIRIS Framework",
    description:
      "The only open-source AI governance framework with first-contact protocols built in.",
  },
};

export default function FirstContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
