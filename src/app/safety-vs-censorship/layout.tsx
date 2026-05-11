import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Safety Infrastructure vs Censorship Infrastructure | How CIRIS Stays on the Right Side",
  description:
    "Both crowdsource. Only one is honest about what. CIRIS crowdsources rules (machine-applicable, dated, signed, reversible); verdicts are machined from those rules deterministically. The architectural commitment that keeps a safety platform from sliding into a censorship platform — and where the line can still fail if discipline lapses.",
  alternates: { canonical: "/safety-vs-censorship" },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/safety-vs-censorship",
    title:
      "Safety Infrastructure vs Censorship Infrastructure",
    description:
      "Rules are crowdsourced. Verdicts are machined. The line between safety and censorship is operational language discipline plus structural appeal paths.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Safety Infrastructure vs Censorship Infrastructure",
    description:
      "Rules are crowdsourced. Verdicts are machined. How CIRIS stays on the right side of the line.",
  },
};

export default function SafetyVsCensorshipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
