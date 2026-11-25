// /architecture/ redesigned as "How it fits together" (designs/architecture):
// the three layers, the life of one act, the full stack bottom to top, and
// what a person meets. The hosted infrastructure that used to be this whole
// page follows as its own section (#infrastructure), content intact.

import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import RdShell from "../RdShell";
import { StatusChip, type ChipKind } from "../StatusChip";
import rd from "../rd.module.css";
import s from "./ArchitecturePage.module.css";
import ArchitectureInfrastructure from "./ArchitectureInfrastructure";

const LAYERS: { key: "agent" | "constitution" | "substrate"; chip: ChipKind; href: string }[] = [
  { key: "agent", chip: "shipping", href: "/how-it-works" },
  { key: "constitution", chip: "shipping", href: "/constitution" },
  // CEWPOS is always "In development": the substrate card leads with it.
  { key: "substrate", chip: "inDev", href: "/cewpos" },
];

/** Status of each stack row, bottom (01) to top (06). */
const STACK_KINDS: ChipKind[] = ["shipping", "research", "shipping", "shipping", "shipping", "inDev"];

export default function ArchitecturePage({ t, locale }: { t: Dictionary; locale: string }) {
  const a = t.architecturePage;
  const lh = (href: string) => localizeHref(href, locale);
  const builders = t.rd.groups.builders;

  return (
    <RdShell t={t} locale={locale}>
      <div className={s.page}>
        <nav aria-label={a.breadcrumbLabel} className={`${rd.mono} ${s.crumbs}`}>
          {builders.label} / <span aria-current="page">{builders.architecture}</span>
        </nav>

        <section aria-labelledby="arch-h1" className={s.hero}>
          <p className={`${rd.px} ${s.heroKicker}`}>{a.kicker}</p>
          <h1 id="arch-h1" className={s.h1}>
            {a.title}
          </h1>
          <p className={s.lede}>{a.lede}</p>
        </section>

        <section aria-label={a.layersLabel} className={s.layers}>
          {LAYERS.map(({ key, chip, href }) => {
            const l = a.layers[key];
            return (
              <article key={key} className={s.layer}>
                <div className={s.layerHead}>
                  <span className={`${rd.mono} ${s.layerLabel}`}>{l.label}</span>
                  <StatusChip kind={chip} label={l.chip} pill />
                </div>
                <h2 className={s.layerName}>{l.name}</h2>
                <p className={s.tagline}>{l.tagline}</p>
                <p className={s.layerBody}>{l.body}</p>
                <a href={lh(href)} className={s.layerCta}>
                  {l.cta}
                </a>
              </article>
            );
          })}
        </section>

        <section aria-labelledby="life-h" className={s.block}>
          <p className={`${rd.mono} ${s.kicker}`}>{a.life.kicker}</p>
          <h2 id="life-h" className={s.h2}>
            {a.life.title}
          </h2>
          <ol className={s.steps}>
            {a.life.steps.map((step, i) => (
              <li key={step.title} className={s.step}>
                <span className={`${rd.px} ${s.stepN}`} aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className={s.stepTitle}>{step.title}</h3>
                <p className={s.stepBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="stack-h" className={s.block}>
          <p className={`${rd.mono} ${s.kicker}`}>{a.stack.kicker}</p>
          <h2 id="stack-h" className={s.h2}>
            {a.stack.title}
          </h2>
          {/* In reading order 01→06; drawn bottom to top. */}
          <ol className={s.stack}>
            {a.stack.rows.map((row, i) => (
              <li key={row.n} className={s.row}>
                <span className={`${rd.mono} ${s.rowN}`}>{row.n}</span>
                <span className={s.rowName}>{row.name}</span>
                <span className={s.rowWhat}>{row.what}</span>
                <span className={s.rowChip}>
                  <StatusChip kind={STACK_KINDS[i] ?? "inDev"} label={row.status} pill />
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-label={a.meetLabel} className={s.meet}>
          <div className={s.meetCard}>
            <p className={`${rd.mono} ${s.kicker}`}>{a.circles.kicker}</p>
            <h2 className={s.meetTitle}>{a.circles.title}</h2>
            <p className={s.meetBody}>{a.circles.body}</p>
          </div>
          <div className={s.meetCard}>
            <p className={`${rd.mono} ${s.kicker} ${s.rose}`}>{a.halt.kicker}</p>
            <h2 className={s.meetTitle}>{a.halt.title}</h2>
            <p className={s.meetBody}>{a.halt.body}</p>
          </div>
        </section>

        <ArchitectureInfrastructure locale={locale} shippingLabel={t.rd.chips.shipping} />
      </div>
    </RdShell>
  );
}
