// Security/SEO page (/security/post-quantum-kill-switch), localized. Prose from
// t.killSwitch (29 locales); the measured numbers, the command, and citation URLs
// stay in code. Framing is exact: the Ed25519 half is hardware-rooted on a FIPS
// YubiKey; the ML-DSA-65 half is software, seal-wrapped to USB. It states plainly
// what the cargo-test receipt does and does not cover. Sources: CIRISVerify recon
// + CIRISServer bench_results.json.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE, localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";
import sec from "@/app/components/security.module.css";

const A = { target: "_blank", rel: "noopener noreferrer" } as const;
const CMD = "cargo test -p ciris-verify-core --test accord_ceremony_custody -- --nocapture";
// Measured values pinned to CIRISServer/bench_results.json (commit 0b73486). Order matches t.killSwitch.measuredLabels.
const MEASURED_V = ["4,946/s", "5.11 GiB/s", "67.6 µs", "0"];

export default function SecurityKillSwitchV2({ t, locale }: { t: Dictionary; locale: string }) {
  const k = t.killSwitch;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <ContentShell
      locale={locale}
      accent="teal"
      kicker={k.kicker}
      title={k.title}
      lede={k.lede}
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={locale !== DEFAULT_LOCALE ? t.common.mtBanner : undefined}
    >
      <section className={s.section}>
        <p className={s.sectionLabel}>{k.s1label}</p>
        <h2 className={s.h2}>{k.s1h2}</h2>
        <p className={s.paragraph}>{k.s1p1}</p>
        <p className={s.paragraph}>{k.s1p2}</p>
      </section>

      <section className={s.section}>
        <p className={s.sectionLabel}>{k.s2label}</p>
        <h2 className={s.h2}>{k.s2h2}</h2>
        <p className={s.paragraph}>
          {k.s2p1}{" "}
          <a href="https://github.com/CIRISAI/CIRISVerify" {...A}>github.com/CIRISAI/CIRISVerify</a>
        </p>
        <code className={sec.cmd}>{CMD}</code>
        <p className={sec.cmdCaption}>
          {k.cmdCaption}{" "}
          <a href="https://developers.yubico.com/PKI/yubico-ca-1.pem" {...A}>developers.yubico.com/PKI/yubico-ca-1.pem</a>
        </p>

        <div className={sec.split}>
          <div className={sec.proves}>
            <h4>{k.provesH}</h4>
            <p>{k.provesP}</p>
          </div>
          <div className={sec.notProves}>
            <h4>{k.notProvesH}</h4>
            <p>{k.notProvesP}</p>
          </div>
        </div>
      </section>

      <section className={s.section}>
        <p className={s.sectionLabel}>{k.s3label}</p>
        <h2 className={s.h2}>{k.s3h2}</h2>
        <div className={s.scoreboard}>
          {k.measuredLabels.map((label, i) => (
            <div className={s.scoreStat} key={label}>
              <div className={s.scoreV} dir="ltr">{MEASURED_V[i]}</div>
              <div className={s.scoreL}>
                {label} <span className={`${s.scoreTag} ${s.scoreMeasured}`}>{k.measuredTag}</span>
              </div>
            </div>
          ))}
        </div>
        <p className={s.paragraph}>{k.s3p1}</p>
        <p className={s.footnote}>
          <a href="https://cirisai.github.io/CIRISServer" {...A}>{k.benchLink} &rarr;</a>
        </p>
      </section>

      <section className={s.cta}>
        <p className={s.ctaPara}>{k.ctaPara}</p>
        <div className={s.ctaRow}>
          <a className={`${s.btn} ${s.btnP}`} href="https://github.com/CIRISAI/CIRISVerify" {...A}>{k.btnGithub}</a>
          <Link className={`${s.btn} ${s.btnS}`} href={lh("/trust")}>{k.btnTrust}</Link>
          <Link className={`${s.btn} ${s.btnS}`} href={lh("/verification")}>{k.btnVerif}</Link>
        </div>
        <p className={s.footnote}>{k.sources}</p>
      </section>
    </ContentShell>
  );
}
