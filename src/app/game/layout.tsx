import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import { VT323 } from "next/font/google";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "The Cascadia Reach Case File | CIRIS",
  description:
    "Everyone tells a different story. Can you figure out who to trust to find the truth? A Clue-style mystery game at a space-colony school, built on the CIRIS Epistemic Grammar.",
  alternates: { canonical: "/game" },
  openGraph: {
    type: "website",
    url: "https://ciris.ai/game",
    title: "The Cascadia Reach Case File",
    description:
      "Everyone tells a different story. Can you figure out who to trust?",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return <div className={vt323.variable}>{children}</div>;
}
