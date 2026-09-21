// /reviews — outside reviews of CIRIS, linked as they exist, favorable or
// not. English-only (the reviews themselves are English), same pattern as
// /verification: ContentShell with locale="en" and code-side copy. Entries
// are verified before listing: every URL here was fetched and characterized
// honestly, including access-gated ones, which are listed as existence
// records rather than dressed up as published findings.

import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/app/components/PageShell";
import { getDictionary } from "@/i18n/dictionaries";
import { contentStyles as s } from "@/app/components/v2/ContentShell";

export const metadata: Metadata = {
  title: "Reviews: Outside Assessments of CIRIS",
  description:
    "Third-party reviews and assessments of CIRIS, linked as they exist, favorable or not. Findings that break the system are more valuable than findings that flatter it.",
  alternates: { canonical: "/reviews" },
};

const REVIEWS = [
  {
    name: "Towards Superintelligence Alignment",
    who: "Gunnar Zarncke's map of alignment research",
    url: "https://towards-alignment.com/cards/agenda/ciris/",
    body:
      "A structured assessment of CIRIS as an alignment research agenda. It records what is measured and names the limits plainly, including that “signed protocol logs do not imply that the represented reasoning produced the action”. That is exactly the kind of outside precision this project asks for.",
    status: "Published assessment",
    cls: s.cCyan,
  },
  {
    name: "Nullworks",
    who: "Operational Intelligence",
    url: "https://nullworks.systems/ciris-proof",
    body:
      "An independent operational assurance review of CIRISAgent, read-only and pinned to exact versions. The public page is not the full report and not a certification: it publishes the evidence classes, the test counts, the revisions that were checked, the artifact hashes, and conclusions on both sides. It calls the constitutional machinery substantive, and it names a real gap in plain words, that \u201crole is not the same as jurisdiction\u201d, because the core authorization surface it inspected was broader than the specific resource. The full report stays confidential with the reviewer.",
    status: "Public sanitized proof, August 2026",
    cls: s.cBrass,
  },
  {
    name: "Cut Off the Spigot",
    who: "A reader's guide to leaving Google and the big assistants",
    url: "https://cutoffthespigot.substack.com/p/de-google-series-part-1-search-and",
    body:
      "Not a technical audit, a consumer guide, and it is listed here because it checks the things a reader can check for themselves. It added CIRIS to its recommended alternatives in September 2026 after looking at who owns the company (an L3C with no major outside investors), what governs it (the constitution and the values page), what happens to your data (nothing sold or shared, research sharing is opt-in and anonymized first), which model answers you, and what one query costs in energy and water. It also records what it could not find, namely no OpenSecrets profile and no public diversity policy. Its on-device summary matches ours: with a local model nothing leaves your machine, and with a remote one the text goes to providers configured for zero data retention, processed and discarded rather than kept. There is no CIRIS cloud holding your chats, and the privacy page names every provider.",
    status: "Listed in a consumer guide, September 2026",
    cls: s.cViolet,
  },
];

export default function ReviewsPage() {
  return (
    <PageShell
      nav={getDictionary("en").homeHero}
      locale="en"
      accent="teal"
      kicker="Outside reviews"
      title="Reviewed by people who owe us nothing."
      lede="CIRIS invites outside review and links it here as it exists, favorable or not. Findings that break the system are more valuable to this project than findings that flatter it, so this page lists every third-party review we know about, in whatever state it is in."
      backHref="/"
      backLabel="back"
    >
      <section className={s.section}>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          {REVIEWS.map((r) => (
            <a
              key={r.url}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${s.card} ${r.cls}`}
            >
              <h3>{r.name}</h3>
              <p className={s.footnote}>{r.who} · {r.status}</p>
              <p>{r.body}</p>
            </a>
          ))}
        </div>
      </section>

      {/* The standing invitation: reviewing CIRIS is a way of keeping it. */}
      <div className={s.callout}>
        <h2 className={s.h2}>Review it yourself</h2>
        <p className={s.paragraph}>
          The strongest form of the claim, with its premises graded and its
          soft spots named first, is on the Constitutional Mesh page. Break
          the argument or break the artifact; a broken premise is worth as
          much to us as a broken protocol.
        </p>
        <div className={s.ctaRow}>
          <Link href="/constitutional-mesh" className={`${s.btn} ${s.btnP}`}>
            Read the Constitutional Mesh
          </Link>
          <a
            href="https://github.com/CIRISAI"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnS}`}
          >
            Open an issue on GitHub
          </a>
        </div>
      </div>
    </PageShell>
  );
}
