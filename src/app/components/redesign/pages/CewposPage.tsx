// /cewpos: the federated operating environment (designs/cewpos.dc.html).
// CEWPOS is always labelled "In development"; the rest of the stack carries
// its own status chip. Copy lives in the dictionary under cewposPage.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import RdShell from "../RdShell";
import { shellCopy } from "../shellCopy";
import { StatusChip, type ChipKind } from "../StatusChip";
import s from "../rd.module.css";
import c from "./CewposPage.module.css";

/** The kernel's five operators are identifiers, not prose: never translated. */
const OPERATORS = ["scores", "delegates_to", "supersedes", "withdraws", "recants"];

/** Status and emphasis per stack layer, bottom (01) to top (06). */
const LAYER_KIND: { kind: ChipKind; hi?: boolean }[] = [
  { kind: "shipping" },
  { kind: "research" },
  { kind: "shipping" },
  { kind: "shipping" },
  { kind: "shipping" },
  { kind: "inDev", hi: true },
];

export default function CewposPage({ t, locale }: { t: Dictionary; locale: string }) {
  const p = t.cewposPage;
  const net = t.rd.groups.network;
  // Rows 1 to 5 are the same stack /architecture shows; only the top row differs.
  const { s6: _top, ...shared } = t.architecturePage.stack.rows;
  const layers = [...Object.values(shared), p.osLayer];
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <RdShell t={shellCopy(t)} locale={locale}>
      <div className={c.page}>
        <div className={c.wrap}>
          <nav aria-label={p.breadcrumbLabel} className={`${s.mono} ${c.crumb}`}>
            <Link href={lh("/web4")}>{net.label}</Link> / <span aria-current="page">{net.cewpos}</span>
          </nav>

          {/* hero */}
          <section aria-labelledby="cewpos-h1" className={c.hero}>
            <div className={c.heroText}>
              <span className={c.heroChip}>
                <StatusChip kind="inDev" label={p.status} />
              </span>
              <h1 id="cewpos-h1" className={c.h1}>
                {p.h1}
              </h1>
              <p className={s.lede}>{p.lede}</p>
            </div>
            <aside className={c.stands} aria-label={p.standsKicker}>
              <p className={`${s.mono} ${c.smallKicker}`}>{p.standsKicker}</p>
              <p className={c.standsBody}>
                <b>{p.standsLead}</b> {p.standsBody}
              </p>
            </aside>
          </section>

          {/* the inversion */}
          <section aria-labelledby="cewpos-inv" className={c.sec}>
            <p className={`${s.mono} ${s.kicker}`}>{p.invKicker}</p>
            <h2 id="cewpos-inv" className={`${c.h2} ${c.narrow}`}>
              {p.invTitle}
            </h2>
            <div className={c.inv}>
              <figure className={c.usual}>
                <figcaption className={`${s.mono} ${c.caption}`}>{p.usualCaption}</figcaption>
                <div className={c.flow}>
                  <div className={c.box}>{p.usualModel}</div>
                  <span className={`${s.mono} ${c.arrow} ${s.arrowMark}`} aria-hidden="true">
                    →
                  </span>
                  <div className={c.box}>{p.usualControls}</div>
                </div>
                <p className={c.figNote}>{p.usualNote}</p>
              </figure>
              <figure className={c.ours}>
                <figcaption className={`${s.mono} ${c.caption} ${c.accentText}`}>{p.cewposCaption}</figcaption>
                <div className={`${c.flow} ${c.flowWrap}`}>
                  <div className={`${c.box} ${c.boxPanel}`}>{p.cewposProposal}</div>
                  <span className={`${s.mono} ${c.arrow} ${s.arrowMark} ${c.accentText}`} aria-hidden="true">
                    →
                  </span>
                  <div className={`${c.box} ${c.boxPanel} ${c.gate}`}>{p.cewposGate}</div>
                  <span className={`${s.mono} ${c.arrow} ${s.arrowMark} ${c.accentText}`} aria-hidden="true">
                    →
                  </span>
                  <div className={c.outcomes}>
                    <span className={`${s.mono} ${c.outcome} ${c.admitted}`}>{p.cewposAdmitted}</span>
                    <span className={`${s.mono} ${c.outcome} ${c.refused}`}>{p.cewposRefused}</span>
                  </div>
                </div>
                <p className={c.figNote}>{p.cewposNote}</p>
              </figure>
            </div>
          </section>

          {/* four steps */}
          <section aria-labelledby="cewpos-steps" className={c.sec}>
            <h2 id="cewpos-steps" className={c.h2}>
              {p.stepsTitle}
            </h2>
            <ol className={c.steps}>
              {Object.values(p.steps).map((step, i) => (
                <li key={i} className={c.step}>
                  <span className={`${s.px} ${c.stepN}`} aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className={c.stepTitle}>{step.title}</h3>
                  <p className={c.stepBody}>{step.body}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* small kernel */}
          <section aria-labelledby="cewpos-kernel" className={`${c.sec} ${c.kernelRow}`}>
            <div className={c.kernel}>
              <p className={`${s.px} ${c.kernelKicker}`}>{p.kernelKicker}</p>
              <h2 id="cewpos-kernel" className={c.h2k}>
                {p.kernelTitle}
              </h2>
              <ul className={c.ops} aria-label={p.operatorsLabel}>
                {OPERATORS.map((op) => (
                  <li key={op} className={`${s.mono} ${c.op}`}>
                    {op}
                  </li>
                ))}
              </ul>
              <p className={c.kernelBody}>{p.kernelBody}</p>
            </div>
            <div className={c.bet}>
              <p className={`${s.mono} ${c.smallKicker}`}>{p.betKicker}</p>
              <p className={c.betTitle}>{p.betTitle}</p>
              <p className={c.betBody}>{p.betBody}</p>
            </div>
          </section>

          {/* stack */}
          <section aria-labelledby="cewpos-stack" className={`${c.sec} ${c.last}`}>
            <p className={`${s.mono} ${s.kicker}`}>{p.stackKicker}</p>
            <h2 id="cewpos-stack" className={c.h2}>
              {p.stackTitle}
            </h2>
            <ol className={c.stack}>
              {layers.map((l, i) => {
                const meta = LAYER_KIND[i] ?? { kind: "shipping" as ChipKind };
                return (
                  <li key={i} className={`${c.layer} ${meta.hi ? c.layerHi : ""}`}>
                    <span className={`${s.mono} ${c.layerN}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={c.layerName}>{l.name}</span>
                    <span className={c.layerWhat}>{l.what}</span>
                    <span className={c.layerStatus}>
                      <StatusChip kind={meta.kind} label={l.status} pill />
                    </span>
                  </li>
                );
              })}
            </ol>
            <p className={c.related}>
              <Link href={lh("/cewp")} className={s.more}>
                {p.cewpLink}
              </Link>
            </p>
          </section>
        </div>
      </div>
    </RdShell>
  );
}
