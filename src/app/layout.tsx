import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
});

const TITLE =
  "CIRIS — Verifiable Ethical AI Agent | Coherence-Grounded, AGPL, Production-Deployed";

const DESCRIPTION =
  "Open-source ethical AI framework with post-quantum cryptographic attestation (Ed25519 + ML-DSA-65 dual signatures), runtime conscience, Kish-formula effective-dimensionality measurement, Ubuntu-grounded relational ethics, and Mission Driven Development methodology. AGPL-3.0, L3C mission-locked. Live on Google Play and App Store.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s | CIRIS",
  },
  description: DESCRIPTION,
  authors: [{ name: "CIRIS L3C" }],
  creator: "CIRIS L3C",
  publisher: "CIRIS L3C",
  metadataBase: new URL("https://ciris.ai"),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ciris.ai",
    siteName: "CIRIS",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CIRIS — Verifiable Ethical AI Agent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ciris.ai/#organization",
      name: "CIRIS",
      legalName: "CIRIS L3C",
      url: "https://ciris.ai",
      logo: "https://ciris.ai/og-image.png",
      description:
        "Mission-locked low-profit limited-liability company (L3C) building open-source ethical AI infrastructure under AGPL-3.0. Structurally constrained against profit-driven mission drift.",
      foundingDate: "2025",
      sameAs: [
        "https://github.com/CIRISAI",
        "https://www.linkedin.com/company/cirisai/",
      ],
    },
    {
      "@type": "Product",
      "@id": "https://ciris.ai/#product",
      name: "CIRIS Agent",
      description:
        "Open-source ethical AI agent with post-quantum cryptographic attestation (Ed25519 + ML-DSA-65 dual signatures), runtime conscience module, and coherence-grounded alignment. Built on Mission Driven Development methodology.",
      brand: { "@id": "https://ciris.ai/#organization" },
      license: "https://www.gnu.org/licenses/agpl-3.0.html",
      url: "https://ciris.ai",
    },
    {
      "@type": "MobileApplication",
      "@id": "https://ciris.ai/#mobile-android",
      name: "CIRIS Agent (Android)",
      operatingSystem: "Android",
      applicationCategory: "ProductivityApplication",
      downloadUrl:
        "https://play.google.com/store/apps/details?id=ai.ciris.mobile",
      publisher: { "@id": "https://ciris.ai/#organization" },
    },
    {
      "@type": "MobileApplication",
      "@id": "https://ciris.ai/#mobile-ios",
      name: "CIRIS Agent (iOS)",
      operatingSystem: "iOS",
      applicationCategory: "ProductivityApplication",
      downloadUrl:
        "https://apps.apple.com/us/app/cirisagent/id6758524415",
      publisher: { "@id": "https://ciris.ai/#organization" },
    },
    {
      "@type": "ScholarlyArticle",
      "@id": "https://zenodo.org/records/18217688",
      name: "Coherence Collapse Analysis",
      description:
        "Engineering risk framework for correlation-driven diversity collapse in complex systems. Mathematical foundation for coherence-based alignment, including the Kish-formula effective-dimensionality measurement and the singularity boundary.",
      author: { "@type": "Person", "name": "Eric Moore" },
      publisher: { "@id": "https://ciris.ai/#organization" },
      url: "https://zenodo.org/records/18217688",
      sameAs: "https://doi.org/10.5281/zenodo.18217688",
    },
    {
      "@type": "ScholarlyArticle",
      "@id": "https://zenodo.org/records/19839280",
      name: "Constrained Reasoning Chains",
      description:
        "Empirical telemetry study of LLM coherence under standardized ethical tracing. Validates the effective-dimensionality measurement on production traces.",
      author: { "@type": "Person", "name": "Eric Moore" },
      publisher: { "@id": "https://ciris.ai/#organization" },
      url: "https://zenodo.org/records/19839280",
      sameAs: "https://doi.org/10.5281/zenodo.19839280",
    },
    {
      "@type": "TechArticle",
      "@id": "https://ciris.ai/mdd",
      name: "Mission Driven Development",
      description:
        "A software engineering methodology that embeds mission as the fourth structural foundation alongside logic, schemas, and protocols. Worked example: CIRIS.",
      url: "https://ciris.ai/mdd",
      author: { "@id": "https://ciris.ai/#organization" },
      publisher: { "@id": "https://ciris.ai/#organization" },
    },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
