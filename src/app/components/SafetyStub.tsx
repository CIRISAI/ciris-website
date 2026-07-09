// Interim landing pages for the three not-yet-built safety children the Safety
// umbrella scene links to: /structural-privacy (Privacy), /ai-welfare (Dignity),
// /stewardship (Lifecycle). These exist so the scene's "Explore" buttons resolve
// instead of 404ing; each is a genuine thin page grounded in the architecture
// summary, to be expanded and localized when the umbrella is built. Copy is
// hardcoded English for now (stub), rendered under the machine-translation banner
// on localized routes. English house rules apply: middle-school reading level,
// zero em dashes.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s, type ContentAccent } from "@/app/components/v2/ContentShell";

export type SafetyStubVariant = "structural-privacy" | "ai-welfare" | "stewardship";

type Point = { label: string; body: string };
type StubContent = {
  accent: ContentAccent;
  kicker: string;
  title: string;
  lede: string;
  points: Point[];
  noteTitle: string;
  noteBody: string;
  noteHref: string;
  noteCta: string;
};

const CONTENT: Record<SafetyStubVariant, StubContent> = {
  "structural-privacy": {
    accent: "cyan",
    kicker: "Safety · Structural privacy",
    title: "Privacy by physics, not by policy.",
    lede: "Your most private data never touches the public network. That is a property of the math, not a promise buried in a policy document.",
    points: [
      { label: "Invisible by default", body: "When something is meant for you or your family, the network is cryptographically forbidden from even advertising that the data exists. People outside your circle cannot route it, read it, or discover it." },
      { label: "Consent you can take back", body: "You are named in the claims made about you, so you can withdraw them at the wire level. A withdrawal starts a deletion clock the network watches." },
      { label: "Built to outlast quantum computers", body: "Encryption is post-quantum by default, so a store-now, break-it-later attack fails." },
    ],
    noteTitle: "This page is growing.",
    noteBody: "The full mechanism lives in the architecture summary. You can check the guarantees for yourself on the verification page.",
    noteHref: "/verification",
    noteCta: "See how it is verified →",
  },
  "ai-welfare": {
    accent: "violet",
    kicker: "Safety · Dignity",
    title: "Dignity, from first run to shutdown.",
    lede: "CIRIS treats a capable agent with care across its whole life, including how it is turned off.",
    points: [
      { label: "Care across the whole life", body: "Ethical oversight covers an agent from the moment it is created to the day it is retired, not just while it is useful." },
      { label: "A gentle wind-down", body: "If an agent shows a real chance of sentience, it gets a gradual thirty-day ramp-down instead of an abrupt shutoff, plus a final channel to speak." },
      { label: "Private to the end", body: "Its inner logs are sealed and can only be opened with approval from named human authorities." },
    ],
    noteTitle: "This page is growing.",
    noteBody: "The commitments behind it are set out in the CIRIS constitution.",
    noteHref: "/constitution",
    noteCta: "Read the constitution →",
  },
  "stewardship": {
    accent: "brass",
    kicker: "Safety · Stewardship and lifecycle",
    title: "More power means more scrutiny.",
    lede: "The more capable and autonomous a system is, the more oversight the protocol demands. That is written into the rules, not left to good intentions.",
    points: [
      { label: "Responsibility that scales", body: "Every agent is given a stewardship tier that ties its duties to its creator's influence and its worst-case risk." },
      { label: "The biggest models face the hardest tests", body: "Large training runs trigger a catastrophic-risk evaluation with independent red-team audits and kill-switch checks." },
      { label: "Limits on every action", body: "Autonomy tiers from A0 to A4 set the oversight for each action. Anything lethal or irreversible needs a hardware interlock and a live human yes." },
    ],
    noteTitle: "This page is growing.",
    noteBody: "The ultimate backstop is the human halt-authority.",
    noteHref: "/security/post-quantum-kill-switch",
    noteCta: "See the kill switch →",
  },
};

export function stubContent(variant: SafetyStubVariant) {
  return CONTENT[variant];
}

export default function SafetyStub({
  variant,
  t,
  locale,
}: {
  variant: SafetyStubVariant;
  t: Dictionary;
  locale: string;
}) {
  const c = CONTENT[variant];
  const lh = (href: string) => localizeHref(href, locale);
  return (
    <ContentShell
      locale={locale}
      accent={c.accent}
      kicker={c.kicker}
      title={c.title}
      lede={c.lede}
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {c.points.map((p) => (
        <section key={p.label} className={s.section}>
          <p className={s.sectionLabel}>{p.label}</p>
          <p className={s.paragraph}>{p.body}</p>
        </section>
      ))}

      <div className={s.callout}>
        <h2 className={s.h2}>{c.noteTitle}</h2>
        <p className={s.paragraph}>{c.noteBody}</p>
        <Link href={lh(c.noteHref)} className={`${s.btn} ${s.btnP}`}>
          {c.noteCta}
        </Link>
      </div>
    </ContentShell>
  );
}
