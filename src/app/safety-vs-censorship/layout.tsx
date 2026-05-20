import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Where Crowdsourced Safety Can Drift | Naming a Risk in Our Own Design",
  description:
    "Naming a risk in our own design. A crowdsourced safety system can drift into something else if we're not careful. CIRIS crowdsources rules (machine-applicable, dated, signed, reversible); verdicts are machined from those rules deterministically. Honest about where the line can still fail if discipline lapses.",
  alternates: { canonical: "/safety-vs-censorship" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/safety-vs-censorship",
    title:
      "Where crowdsourced safety can drift, and how we're trying not to.",
    description:
      "A risk we see in our own design. Rules are crowdsourced; verdicts are machined. The discipline we're committing to, and where it can still fail.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Where crowdsourced safety can drift, and how we're trying not to.",
    description:
      "Naming a risk in our own design. Rules crowdsourced, verdicts machined, appeals through Reconsideration.",
  },
};

export default function SafetyVsCensorshipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
