// /reviews — outside reviews of CIRIS, linked as they exist, favorable or
// not. English-only (the reviews themselves are English), same pattern as
// /verification: ContentShell with locale="en" and code-side copy. Entries
// are verified before listing: every URL here was fetched and characterized
// honestly, including access-gated ones, which are listed as existence
// records rather than dressed up as published findings.

import type { Metadata } from "next";
import Link from "next/link";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";

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
      "A structured assessment of CIRIS as an alignment research agenda. It records what is measured and names the limits plainly, including that “signed protocol logs do not imply that the represented reasoning produced the action” — exactly the kind of outside precision this project asks for.",
    status: "Published assessment",
    cls: s.cCyan,
  },
  {
    name: "Nullworks",
    who: "Operational Intelligence",
    url: "https://nullworks.systems/ciris-review",
    body:
      "A private preliminary review is in progress. The report is access-gated by the reviewer and none of its content is public yet; it is listed here because the review's existence is part of the record, and the record is the point.",
    status: "Private preliminary review, in progress",
    cls: s.cBrass,
  },
];

export default function ReviewsPage() {
  return (
    <ContentShell
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
    </ContentShell>
  );
}
