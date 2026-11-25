// /plain-answers: what the network is like for a person, in short questions
// and answers, from one device out to the world (the shape of the CEWPOS
// story). Copy is t.plainPage; answers follow CC 1.0-rc22, and the "today" list
// is what the released app offers (client 0.5.242).

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import RdShell from "../RdShell";
import { shellCopy } from "../shellCopy";
import { StatusChip } from "../StatusChip";
import s from "../rd.module.css";
import c from "./PlainAnswersPage.module.css";

const STORY = "https://cirisai.github.io/CEWPOS/";
const ORDER = ["you", "family", "town", "ai", "world"] as const;
type Scale = (typeof ORDER)[number];

/** Answers the released app does not offer yet carry the amber chip. */
const NOT_YET = new Set(["you.s4", "family.s2", "town.s4", "town.s5", "town.s6"]);

/** One small drawing per scale: a device, a circle, a hall, a hand on a
 *  switch, a ring of places. Same strokes, so they read as one set. */
function Mark({ scale }: { scale: Scale }) {
  const common = { className: c.mark, viewBox: "0 0 120 120", "aria-hidden": true, focusable: false } as const;
  switch (scale) {
    case "you":
      return (
        <svg {...common}>
          <rect x="30" y="18" width="36" height="66" rx="7" />
          <rect x="54" y="46" width="48" height="32" rx="4" className={c.fill} />
          <path d="M46 92 H110" />
          <circle cx="48" cy="38" r="6" className={c.accent} />
          <path d="M48 44 V60 M48 54 H54" className={c.accent} />
        </svg>
      );
    case "family":
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="44" strokeDasharray="3 6" />
          <path d="M60 26 L94 70 L36 88 Z" />
          <circle cx="60" cy="26" r="9" className={c.fill} />
          <circle cx="94" cy="70" r="9" className={c.fill} />
          <circle cx="36" cy="88" r="9" className={c.accentFill} />
        </svg>
      );
    case "town":
      return (
        <svg {...common}>
          <path d="M20 54 L60 24 L100 54" />
          <path d="M28 54 V94 H92 V54" />
          <path d="M50 94 V70 H70 V94" className={c.accent} />
          <path d="M12 94 H108" />
          <circle cx="60" cy="44" r="5" className={c.accentFill} />
        </svg>
      );
    case "ai":
      return (
        <svg {...common}>
          <circle cx="42" cy="50" r="24" />
          <path d="M33 50 H51 M42 41 V59" className={c.accent} />
          <path d="M66 50 H86" strokeDasharray="3 5" />
          <circle cx="98" cy="38" r="9" className={c.fill} />
          <path d="M84 72 C84 54 112 54 112 72" />
          <path d="M26 98 H94" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="40" />
          <ellipse cx="60" cy="60" rx="18" ry="40" />
          <path d="M20 60 H100" />
          <circle cx="60" cy="20" r="6" className={c.accentFill} />
          <circle cx="100" cy="60" r="6" className={c.fill} />
          <circle cx="26" cy="82" r="6" className={c.fill} />
        </svg>
      );
  }
}

export default function PlainAnswersPage({ t, locale }: { t: Dictionary; locale: string }) {
  const p = t.plainPage;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <RdShell t={shellCopy(t)} locale={locale}>
      <div className={c.page}>
        <section className={c.hero} aria-labelledby="plain-h1">
          <p className={`${s.px} ${c.heroKicker}`}>{p.kicker}</p>
          <h1 id="plain-h1" className={s.h1}>
            {p.h1}
          </h1>
          <p className={s.lede}>{p.lede}</p>
          <div className={`${s.ctas} ${c.ctas}`}>
            <a href={STORY} className={s.btnPrimary} target="_blank" rel="noopener noreferrer">
              {p.ctaStory}
            </a>
            <Link href={lh("/install")} className={s.btnSecondary}>
              {p.ctaInstall}
            </Link>
          </div>
          <ol className={c.trail}>
            {ORDER.map((k) => (
              <li key={k}>
                <a href={`#${k}`}>{p.sections[k].scale}</a>
              </li>
            ))}
          </ol>
        </section>

        {ORDER.map((k) => {
          const sec = p.sections[k];
          return (
            <section key={k} id={k} className={c.sec} aria-labelledby={`${k}-h`}>
              <header className={c.side}>
                <Mark scale={k} />
                <p className={`${s.mono} ${s.kicker} ${c.scale}`}>{sec.scale}</p>
                <h2 id={`${k}-h`} className={c.h2}>
                  {sec.title}
                </h2>
              </header>
              <dl className={c.qa}>
                {Object.entries(sec.qa).map(([id, x]) => (
                  <div key={id} className={c.pair}>
                    <dt>
                      {x.q}
                      {NOT_YET.has(`${k}.${id}`) && (
                        <span className={c.notYet}>
                          <StatusChip kind="inDev" label={t.rd.chips.inDev} />
                        </span>
                      )}
                    </dt>
                    <dd>{x.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        })}

        <section className={c.block} aria-labelledby="today-h">
          <p className={`${s.mono} ${s.kicker}`}>{p.todayKicker}</p>
          <h2 id="today-h" className={s.h2}>
            {p.todayTitle}
          </h2>
          <div className={s.grid2}>
            <div className={s.card}>
              <StatusChip kind="shipping" label={p.nowLabel} />
              <ul className={c.list}>
                {Object.values(p.now).map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className={s.card}>
              <StatusChip kind="inDev" label={p.nextLabel} />
              <ul className={c.list}>
                {Object.values(p.next).map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={c.limits}>
            <h3>{p.limitsTitle}</h3>
            <p>{p.limitsBody}</p>
            <Link href={lh("/constitutional-mesh")}>{p.limitsCta}</Link>
          </div>
        </section>

        <section className={c.final} aria-labelledby="plain-final">
          <h2 id="plain-final" className={c.h2}>
            {p.finalTitle}
          </h2>
          <div className={s.ctas}>
            <Link href={lh("/constitution")} className={s.btnPrimary}>
              {p.ctaConstitution}
            </Link>
            <Link href={lh("/constitutional-mesh")} className={s.btnSecondary}>
              {p.ctaMesh}
            </Link>
          </div>
        </section>
      </div>
    </RdShell>
  );
}
