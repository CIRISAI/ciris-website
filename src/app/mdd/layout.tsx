import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mission Driven Development | Methodology for Mission-as-Architecture",
  description:
    "Mission Driven Development (MDD) is a software engineering methodology that embeds mission as the fourth structural foundation alongside logic, schemas, and protocols. Every architectural decision must demonstrate alignment with the stated mission. Worked example: CIRIS — 22 services, 10,000+ tests, minimal untyped data structures in production.",
  alternates: {
    canonical: "/mdd",
  },
  openGraph: {
    type: "article",
    url: "https://ciris.ai/mdd",
    title: "Mission Driven Development | Methodology for Mission-as-Architecture",
    description:
      "A software engineering methodology that treats mission as the load-bearing fourth foundation of system architecture. Active worked example: CIRIS.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mission Driven Development | Methodology for Mission-as-Architecture",
    description:
      "Mission as the fourth foundation of software architecture, alongside logic, schemas, and protocols. Worked example: CIRIS.",
  },
};

export default function MddLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
