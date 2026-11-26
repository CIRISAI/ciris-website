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
import PageShell from "@/app/components/PageShell";
import { contentStyles as s, type ContentAccent } from "@/app/components/v2/ContentShell";
import { ContextualIntegrityCrossLink } from "@/app/components/ContextualIntegrityV2";

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

const CONTENT: Record<Exclude<SafetyStubVariant, "ai-welfare">, StubContent> = {
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

// /ai-welfare is no longer a stub: its copy lives in the dictionary
// (aiWelfarePage) so the localization lane translates it.
function welfareContent(t: Dictionary): StubContent & { sections: Point[]; safeguardsLabel: string; safeguards: Point[] } {
  const a = t.aiWelfarePage;
  return {
    accent: "violet",
    kicker: a.kicker,
    title: a.title,
    lede: a.lede,
    points: [],
    sections: [
      { label: a.stanceLabel, body: a.stanceBody },
      { label: a.whyLabel, body: a.whyBody },
    ],
    safeguardsLabel: a.safeguardsLabel,
    safeguards: [
      { label: a.g1Label, body: a.g1Body },
      { label: a.g2Label, body: a.g2Body },
      { label: a.g3Label, body: a.g3Body },
      { label: a.g4Label, body: a.g4Body },
      { label: a.g5Label, body: a.g5Body },
    ],
    noteTitle: a.noteTitle,
    noteBody: a.noteBody,
    noteHref: "/constitution",
    noteCta: a.noteCta,
  };
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
  const w = variant === "ai-welfare" ? welfareContent(t) : null;
  const c = w ?? CONTENT[variant as Exclude<SafetyStubVariant, "ai-welfare">];
  const a = t.aiWelfarePage;
  const lh = (href: string) => localizeHref(href, locale);
  return (
    <PageShell
      nav={t.homeHero}
      locale={locale}
      accent={c.accent}
      kicker={c.kicker}
      title={c.title}
      lede={c.lede}
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {w && (
        <>
          {w.sections.map((p) => (
            <section key={p.label} className={s.section}>
              <p className={s.sectionLabel}>{p.label}</p>
              <p className={s.paragraph}>{p.body}</p>
            </section>
          ))}
          <section className={s.section}>
            <p className={s.sectionLabel}>{w.safeguardsLabel}</p>
            {w.safeguards.map((g) => (
              <p key={g.label} className={s.paragraph}>
                <strong>{g.label}.</strong> {g.body}
              </p>
            ))}
          </section>
          <section className={s.section}>
            <p className={s.sectionLabel}>{a.caseLabel}</p>
            <p className={s.paragraph}>{a.caseBody}</p>
          </section>
        </>
      )}
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

      {/* Concept tag: structural privacy IS contextual integrity enforced in the
          substrate; the anchor page holds the full mapping. */}
      {variant === "structural-privacy" && <ContextualIntegrityCrossLink t={t} locale={locale} />}
    </PageShell>
  );
}
