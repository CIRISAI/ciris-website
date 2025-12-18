import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CIRIS - Ethical AI Framework",
    template: "%s | CIRIS",
  },
  description:
    "Open source AI that earns your trust. Auditable ethical framework with Zero Data Retention. 100% transparent, yours to verify.",
  keywords: [
    "ethical AI",
    "open source AI",
    "AI framework",
    "trustworthy AI",
    "AI safety",
    "zero data retention",
    "auditable AI",
  ],
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
    title: "CIRIS - Ethical AI Framework",
    description:
      "Open source AI that earns your trust. Auditable ethical framework with Zero Data Retention.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CIRIS - Ethical AI Framework",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CIRIS - Ethical AI Framework",
    description:
      "Open source AI that earns your trust. Auditable ethical framework with Zero Data Retention.",
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

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
