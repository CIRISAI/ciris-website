// The homepage. The underwater hero (schools of fish, a whale shark the
// visitor can steer with the pointer, and glowing fish that gather into the
// CIRIS signet, drift apart and gather again; Franco's design, CIRISAI/
// ciris-website PR 38, engine in ./ocean), then the redesign's sections in
// order: what it already does, the missing layer and the idea under
// everything, the receipt, go deeper, use it today. Header and footer by
// audience come from RdShell. Copy: rd.home.* and homeHero.{kicker,h1,sub}.

import Link from "next/link";
import { shellCopy } from "./redesign/shellCopy";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import StoreBadges from "./graphics/StoreBadges";
import RdShell from "./redesign/RdShell";
import { CALLS_AND_VOTES_CONFIRMED_SHIPPING, StatusChip } from "./redesign/StatusChip";
import HeroWater from "./HeroWater";
import s from "./redesign/rd.module.css";
import h from "./home.module.css";

/** Order and targets of the "go deeper" cards; the copy is rd.home.deeper. */
const DEEPER = [
  { key: "s1", href: "/architecture" },
  { key: "s2", href: "/web4" },
  { key: "s3", href: "/constitution" },
  { key: "s4", href: "/cewpos" },
] as const;

const INSTALL_COMMAND = "pip install ciris-agent";

export default function HomeHero({ t, locale }: { t: Dictionary; locale: string }) {
  const hero = t.homeHero;
  const c = t.rd.home;
  const chips = t.rd.chips;
  const lh = (href: string) => localizeHref(href, locale);
  const callsChip = CALLS_AND_VOTES_CONFIRMED_SHIPPING ? (
    <StatusChip kind="shipping" label={chips.inApp} />
  ) : (
    <StatusChip kind="inDev" label={chips.inDev} />
  );

  return (
    <RdShell t={shellCopy(t)} locale={locale} overlayHeader>
      <section className={h.hero} aria-labelledby="hero-h">
        <HeroWater />
        <div className={h.claim}>
          <p className={`${s.px} ${h.kicker}`}>{hero.kicker}</p>
          <h1 id="hero-h" className={s.h1}>
            {hero.h1}
          </h1>
          <p className={`${s.lede} ${h.lede}`}>{hero.sub}</p>
          <div className={`${s.ctas} ${h.ctas}`}>
            <Link href={lh("/architecture")} className={s.btnPrimary}>
              {c.ctaHow}
            </Link>
            <a href="#today" className={s.btnSecondary}>
              {c.ctaToday}
            </a>
          </div>
        </div>
      </section>

      <section className={s.sec} aria-labelledby="does-h">
        <p className={`${s.kicker} ${s.mono}`}>{c.doesKicker}</p>
        <h2 id="does-h" className={s.h2} style={{ maxWidth: "22ch" }}>
          {c.doesTitle}
        </h2>
        <div className={s.grid3}>
          <article className={s.card}>
            <div className={s.cardHead}>
              <span className={`${s.cardLabel} ${s.mono}`}>{c.callsLabel}</span>
              {callsChip}
            </div>
            <h3 className={s.cardTitle}>{c.callsTitle}</h3>
            <p className={s.cardBody}>{c.callsBody}</p>
          </article>
          <article className={s.card}>
            <div className={s.cardHead}>
              <span className={`${s.cardLabel} ${s.mono}`}>{c.votesLabel}</span>
              {callsChip}
            </div>
            <h3 className={s.cardTitle}>{c.votesTitle}</h3>
            <p className={s.cardBody}>{c.votesBody}</p>
          </article>
          <article className={s.card}>
            <div className={s.cardHead}>
              <span className={`${s.cardLabel} ${s.mono}`}>{c.scaleLabel}</span>
              <StatusChip kind="modelled" label={chips.modelled} />
            </div>
            <h3 className={s.cardTitle}>{c.scaleTitle}</h3>
            <p className={s.cardBody}>{c.scaleBody}</p>
            <a href="https://cirisai.github.io/CEWP/" className={s.more}>
              {c.scaleCta}
            </a>
          </article>
        </div>
      </section>

      <section className={s.sec} aria-labelledby="problem-h">
        <div className={h.split}>
          <div className={h.splitWide}>
            <p className={`${s.kicker} ${s.mono}`}>{c.problemKicker}</p>
            <h2 id="problem-h" className={s.h2}>
              {c.problemTitle}
            </h2>
          </div>
          <p className={`${s.body} ${h.splitNarrow}`}>{c.problemBody}</p>
        </div>
        <div className={`${s.rule} ${h.split}`}>
          <div className={h.splitWide}>
            <p className={`${s.px} ${h.ideaKicker}`}>{c.ideaKicker}</p>
            <p className={h.idea}>{c.idea}</p>
          </div>
          <dl className={`${h.layers} ${h.splitNarrow}`}>
            {Object.values(c.layers).map((l) => (
              <div key={l.term} style={{ display: "contents" }}>
                <dt>{l.term}</dt>
                <dd>{l.def}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={`${s.sec} ${h.receiptSec}`} aria-labelledby="row-h">
        <div className={h.splitNarrow}>
          <p className={`${s.kicker} ${s.mono}`}>{c.receiptKicker}</p>
          <h2 id="row-h" className={s.h2}>
            {c.receiptTitle}
          </h2>
          <p className={s.body} style={{ margin: "22px 0 0" }}>
            {c.receiptBody}
          </p>
        </div>
        <figure className={h.receipt} aria-label={c.receiptLabel}>
          <div className={`${h.receiptHead} ${s.mono}`}>
            <span style={{ letterSpacing: "0.1em", color: "var(--mute)" }}>{c.receiptHead}</span>
            <span className={s.ok}>{c.receiptVerified}</span>
          </div>
          <dl className={h.receiptRows}>
            {Object.values(c.receiptRows).map((r) => (
              <div key={r.k} className={h.receiptRow}>
                <dt>{r.k}</dt>
                <dd className={s.mono}>{r.v}</dd>
              </div>
            ))}
          </dl>
          <div className={`${h.receiptFoot} ${s.mono}`}>
            {Object.values(c.receiptFoot).map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
        </figure>
      </section>

      <section className={s.sec} aria-labelledby="deeper-h">
        <h2 id="deeper-h" className={s.h2s}>
          {c.deeperTitle}
        </h2>
        <div className={s.grid4} style={{ marginTop: 28 }}>
          {DEEPER.map(({ key, href }) => ({ ...c.deeper[key], href })).map((d) => (
            <Link key={d.href} href={lh(d.href)} className={`${s.card} ${h.deeper}`}>
              <span className={`${s.cardLabel} ${s.mono}`}>
                {d.label}
                {d.href === "/cewpos" && (
                  <>
                    {" · "}
                    <span className={s.warn}>{chips.inDev}</span>
                  </>
                )}
              </span>
              <span className={h.deeperTitle}>{d.title}</span>
              <span className={h.deeperBody}>{d.body}</span>
              <span className={s.more} aria-hidden>
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="today" className={s.sec} aria-labelledby="today-h">
        <h2 id="today-h" className={s.h2s}>
          {c.todayTitle}
        </h2>
        <div className={s.grid3} style={{ marginTop: 28 }}>
          <div className={s.card}>
            <div className={h.appHead}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/apple-touch-icon.png" alt="" width={48} height={48} />
              <h3 className={h.todayTitle}>{c.appTitle}</h3>
            </div>
            <p className={h.todayBody}>{c.appBody}</p>
            <StoreBadges labels={t.lobby.store} className={h.badges} />
          </div>
          <div className={s.card}>
            <h3 className={h.todayTitle}>{c.scoutTitle}</h3>
            <p className={h.todayBody}>{c.scoutBody}</p>
            <a href="https://scout.ciris.ai" className={h.pill}>
              {c.scoutCta}
            </a>
          </div>
          <div className={s.card}>
            <h3 className={h.todayTitle}>{c.ownTitle}</h3>
            <p className={h.todayBody}>{c.ownBody}</p>
            <code className={`${h.code} ${s.mono}`}>{INSTALL_COMMAND}</code>
          </div>
        </div>
        <p className={`${h.legend} ${s.mono}`}>
          <span className={s.ok}>● {chips.shipping}</span> {c.legendShipping} &#160;·&#160;{" "}
          <span className={s.warn}>● {chips.inDev}</span> {c.legendInDev} &#160;·&#160;{" "}
          <span className={s.violet}>● {chips.research}</span> {c.legendResearch}
        </p>
      </section>
    </RdShell>
  );
}
