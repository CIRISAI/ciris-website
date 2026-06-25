import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { PREFIXED_LOCALES, LOCALIZED_ROUTES } from "@/i18n/config";
import { DEFAULT_OG_IMAGE, DEFAULT_OG_VIDEO } from "@/lib/seo";
import V1Banner from "@/app/components/V1Banner";

// Universal language persistence: a locale chosen anywhere (marketing pages or
// the /sections reader) is stored, and this guard redirects localizable pages to
// it before paint, so the language "sticks" across the whole site. Built from
// config so the path/locale lists never drift.
const LOCALE_GUARD = `(function(){try{
var s=localStorage.getItem('ciris-locale');if(!s)return;
var P=${JSON.stringify(PREFIXED_LOCALES)},M=${JSON.stringify([...LOCALIZED_ROUTES])};
var path=location.pathname;while(path.length>1&&path.charAt(path.length-1)==='/')path=path.slice(0,-1);
var segs=path.split('/').filter(function(x){return x.length>0;});
var cur=(segs.length>0&&P.indexOf(segs[0])>=0)?segs[0]:'en';
if(cur===s)return;
var base=(cur==='en')?path:('/'+segs.slice(1).join('/'));if(base==='')base='/';
var ok=M.indexOf(base)>=0||base==='/sections'||base.indexOf('/sections/')===0;
if(!ok)return;
var t=(s==='en')?base:('/'+s+base);if(t!=='/')t=t+'/';
var curFull=path==='/'?'/':path+'/';
if(t!==curFull)location.replace(t);
}catch(e){}})();`;

// The site's fonts live here, on the ONE root layout. Previously the (home) and
// /about route groups each rendered their own <html><body> with these fonts,
// which produced a second <html> with no `dark` class — on client navigation
// React reconciled <html> to that version and wiped `.dark`, flashing the page
// white. There is now exactly one <html>; the theme can't be wiped.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const fontBrandRegular = localFont({
  src: "../fonts/AspektaVF.woff2",
  variable: "--font-brand-regular",
  display: "swap",
  style: "normal",
  weight: "100 900",
  preload: true,
  fallback: ["sans-serif"],
});

const TITLE =
  "CIRIS: Verifiable Ethical AI Agent | Coherence-Grounded, AGPL, Production-Deployed";

const DESCRIPTION =
  "Safe by structure, open by principle, kind by design. Open-source ethical AI framework with post-quantum cryptographic attestation (Ed25519 + ML-DSA-65 dual signatures), runtime conscience, Kish-formula effective-dimensionality measurement, Ubuntu-grounded relational ethics, and Mission Driven Development methodology. AGPL-3.0, L3C mission-locked. Live on Google Play and App Store.";

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
        url: DEFAULT_OG_IMAGE,
        type: "image/gif",
        width: 1200,
        height: 630,
        alt: "CIRIS: Verifiable Ethical AI Agent",
      },
    ],
    videos: [
      { url: DEFAULT_OG_VIDEO, type: "video/mp4", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
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
      "@type": "WebSite",
      "@id": "https://ciris.ai/#website",
      url: "https://ciris.ai",
      name: "CIRIS",
      alternateName: "CIRIS L3C",
      description: DESCRIPTION,
      publisher: { "@id": "https://ciris.ai/#organization" },
      inLanguage: "en",
    },
    {
      "@type": "Product",
      "@id": "https://ciris.ai/#product",
      name: "CIRIS Agent",
      description:
        "Open-source ethical AI agent with post-quantum cryptographic attestation (Ed25519 + ML-DSA-65 dual signatures), runtime conscience module, and coherence-grounded alignment. Built on Mission Driven Development methodology.",
      image: "https://ciris.ai/og-image.png",
      brand: { "@id": "https://ciris.ai/#organization" },
      license: "https://www.gnu.org/licenses/agpl-3.0.html",
      url: "https://ciris.ai",
      offers: [
        {
          "@type": "Offer",
          name: "Self-hosted (AGPL-3.0)",
          description:
            "Free self-hosted deployment under AGPL-3.0. pip, Docker, or git install. Includes mobile apps on Google Play and the App Store.",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://ciris.ai/install",
          seller: { "@id": "https://ciris.ai/#organization" },
        },
        {
          "@type": "Offer",
          name: "Hosted CIRIS Agent",
          description:
            "Hosted ethical AI agent service. Same price everywhere, no enterprise tiers, no contact-sales. Free with bring-your-own-key.",
          price: "0.10",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://ciris.ai/services",
          seller: { "@id": "https://ciris.ai/#organization" },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "0.10",
            priceCurrency: "USD",
            unitText: "per request",
          },
        },
      ],
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`flex flex-col min-h-screen antialiased ${fontBrandRegular.className} ${geistSans.variable} ${geistMono.variable}`}
      >
        <script dangerouslySetInnerHTML={{ __html: LOCALE_GUARD }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* The site is dark by design (canvas/video backgrounds are black).
            Force the theme dark so it never follows the OS preference. */}
        <RootProvider theme={{ defaultTheme: "dark", forcedTheme: "dark", enableSystem: false }}>
          <V1Banner />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
