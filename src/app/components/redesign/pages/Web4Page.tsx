// /web4/ — "A web built around relationships, not platforms." The page for the
// network audience (designs/web4.dc.html). Server component: all state (theme,
// menus) lives in the shell. Copy is t.web4Page.

import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import RdShell from "../RdShell";
import { shellCopy } from "../shellCopy";
import { StatusChip } from "../StatusChip";
import s from "../rd.module.css";
import w from "./Web4Page.module.css";

/** The design's sky band: five roof-top nodes joined by arcs over the ground. */
function SkyBand() {
  return (
    <div className={w.sky}>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice">
        <g className={w.edges}>
          <path d="M90 230 Q 240 140 380 210" />
          <path d="M380 210 Q 520 120 690 190" />
          <path d="M690 190 Q 860 110 1010 200" />
          <path d="M1010 200 Q 1180 130 1350 222" />
          <path d="M380 210 Q 700 280 1010 200" strokeDasharray="4 5" />
        </g>
        <g className={w.nodes}>
          <circle cx="90" cy="230" r="5" />
          <circle cx="380" cy="210" r="5" />
          <circle cx="690" cy="190" r="5" />
          <circle cx="1010" cy="200" r="5" />
          <circle cx="1350" cy="222" r="5" />
        </g>
        <g shapeRendering="crispEdges">
          <path className={w.g0} d="M0 262 H160 V256 H360 V250 H600 V256 H840 V250 H1080 V256 H1300 V262 H1440 V300 H0 Z" />
          <path className={w.g2} d="M0 280 H240 V274 H520 V280 H860 V274 H1160 V280 H1440 V300 H0 Z" />
        </g>
      </svg>
    </div>
  );
}

const FURTHER = [
  { key: "s1", href: "/epistemic-web" },
  { key: "s2", href: "/paths/misinformation" },
  { key: "s3", href: "/paths/big-tech" },
  { key: "s4", href: "/vision" },
] as const;

export default function Web4Page({ t, locale }: { t: Dictionary; locale: string }) {
  const p = t.web4Page;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <RdShell t={shellCopy(t)} locale={locale} overlayHeader>
      <div className={w.page}>
        <SkyBand />

        <main className={w.main}>
          <section aria-labelledby="w4-h1" className={w.hero}>
            <p className={`${s.px} ${w.heroKicker}`}>{p.kicker}</p>
            <h1 id="w4-h1" className={w.h1}>
              {p.h1}
            </h1>
            <p className={w.lede}>{p.lede}</p>
          </section>

          <section className={w.essay}>
            <p>{p.essay1}</p>
            <p>
              {p.essay2}{" "}
              <b>{p.essay2Strong}</b>
            </p>
          </section>

          <section aria-labelledby="w4-moves" className={w.section}>
            <p className={`${s.mono} ${w.kicker}`}>{p.movesKicker}</p>
            <h2 id="w4-moves" className={w.h2}>
              {p.movesTitle}
            </h2>
            <ol className={w.moves}>
              {Object.values(p.moves).map((m, i) => (
                <li key={m.title} className={w.move}>
                  <p className={`${s.mono} ${w.moveNum}`} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className={w.moveTitle}>{m.title}</h3>
                  <p className={w.moveBody}>{m.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="w4-changes" className={w.section}>
            <h2 id="w4-changes" className={w.h2}>
              {p.changesTitle}
            </h2>
            <div role="table" aria-label={p.changesTableLabel} className={w.table}>
              <div role="row" className={w.headRow}>
                <span role="columnheader" className={`${s.mono} ${w.colHead}`}>
                  {p.changesColA}
                </span>
                <span role="columnheader" className={`${s.mono} ${w.colHead} ${w.colHeadB}`}>
                  {p.changesColB}
                </span>
              </div>
              {Object.values(p.changes).map((r) => (
                <div role="row" key={r.a} className={w.row}>
                  <span role="cell" className={w.cellA}>
                    {r.a}
                  </span>
                  <span role="cell" className={w.cellB}>
                    {r.b}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="w4-coord" className={w.coord}>
            <div className={w.coordMain}>
              <p className={`${s.px} ${w.coordKicker}`}>{p.coordKicker}</p>
              <h2 id="w4-coord" className={w.coordTitle}>
                {p.coordTitle}
              </h2>
              <p className={w.coordBody}>{p.coordBody}</p>
            </div>
            <div className={w.nots}>
              <p className={`${s.mono} ${w.notsKicker}`}>{p.notKicker}</p>
              {Object.values(p.nots).map((n) => (
                <p key={n} className={w.not}>
                  {n}
                </p>
              ))}
              <p className={w.notBody}>{p.notBody}</p>
            </div>
          </section>

          <section aria-labelledby="w4-protects" className={w.section}>
            <p className={`${s.mono} ${w.kicker}`}>{p.protectsKicker}</p>
            <h2 id="w4-protects" className={w.h2}>
              {p.protectsTitle}
            </h2>
            <div className={w.protects}>
              {Object.values(p.protects).map((x) => (
                <div key={x.title} className={w.protect}>
                  <h3 className={w.protectTitle}>{x.title}</h3>
                  <p className={w.protectBody}>{x.body}</p>
                </div>
              ))}
            </div>

            <nav aria-label={p.furtherLabel} className={w.further}>
              <span className={`${s.mono} ${w.furtherLabel}`}>{p.furtherLabel}</span>
              {FURTHER.map(({ key, href }) => ({ label: p.further[key], href })).map((f) => (
                <a key={f.href} href={lh(f.href)}>
                  {f.label}
                </a>
              ))}
            </nav>
          </section>

          <section aria-labelledby="w4-next" className={w.next}>
            <div className={w.nextBox}>
              <div className={w.nextText}>
                <p className={w.nextChip}>
                  <StatusChip kind="inDev" label={p.statusChip} />
                </p>
                <h2 id="w4-next" className={w.nextTitle}>
                  {p.nextTitle}
                </h2>
                <p className={w.nextBody}>{p.nextBody}</p>
              </div>
              <div className={w.nextCtas}>
                <a href={lh("/install")} className={w.btnPrimary}>
                  {p.ctaApp}
                </a>
                <a href={lh("/cewpos")} className={w.btnSecondary}>
                  {p.ctaFabric}
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </RdShell>
  );
}
