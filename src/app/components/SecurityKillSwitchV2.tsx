// Security/SEO page (/security/post-quantum-kill-switch), localized. Prose from
// t.killSwitch (29 locales); the numbers, commands and URLs stay in code.
// Framing is exact: the Ed25519 half is attested by a FIPS YubiKey; the
// ML-DSA-65 half is stated by the holder and is not attested. Releases still
// read the June 2026 root; the November bundle is not used by any release as
// of 23.7.0 (checked: engine.rs, validation.rs), so never call it "in force". The URL
// keeps "kill switch"; body copy says "pause" (CC 1.13.2, 4.2.1.1). Holders
// are never named. Sources: CC 1.0-rc22 part 4, genesis/humanity-accord-v1,
// CIRISVerify 23.7.0.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE, localizeHref } from "@/i18n/config";
import PageShell from "@/app/components/PageShell";
import { contentStyles as s } from "@/app/components/v2/ContentShell";
import sec from "@/app/components/security.module.css";

const A = { target: "_blank", rel: "noopener noreferrer" } as const;
const CMD = "cargo test -p ciris-verify-core --test accord_ceremony_custody -- --nocapture";
// Run from genesis/humanity-accord-v1/package in CIRISConstitution.
const CEREMONY_RECORD = "https://github.com/CIRISAI/CIRISConstitution/tree/main/genesis/humanity-accord-v1";
const CEREMONY_CMDS = ["sha256sum -c SHA256SUMS", "python3 -I ../../../formal/ceremony/check_trace.py trace.json"];
// Measured values pinned to CIRISServer/bench_results.json (commit 0b73486). Order matches t.killSwitch.measuredLabels.
const MEASURED_V = ["4,946/s", "5.11 GiB/s", "67.6 µs", "0"];

export default function SecurityKillSwitchV2({ t, locale }: { t: Dictionary; locale: string }) {
  const k = t.killSwitch;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <PageShell
      nav={t.homeHero}
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
        <p className={s.paragraph}>{k.s1p0}</p>
        <p className={s.paragraph}>{k.s1p1}</p>
        <p className={s.paragraph}>{k.s1p1b}</p>
        <p className={s.paragraph}>{k.s1p1c}</p>
        <p className={s.paragraph}>{k.s1p2}</p>
        <p className={s.paragraph}>{k.s1p2b}</p>
      </section>

      <section className={s.section}>
        <p className={s.sectionLabel}>{k.s2label}</p>
        <h2 className={s.h2}>{k.s2h2}</h2>
        <p className={s.paragraph}>
          {k.s2p1}{" "}
          <a href="https://github.com/CIRISAI/CIRISVerify" {...A}>github.com/CIRISAI/CIRISVerify</a>
        </p>
        <code className={sec.cmd} dir="ltr">{CMD}</code>
        <p className={sec.cmdCaption}>
          {k.cmdCaption}{" "}
          <a href="https://developers.yubico.com/PKI/yubico-ca-1.pem" {...A}>developers.yubico.com/PKI/yubico-ca-1.pem</a>
        </p>

        <h2 className={s.h2}>{k.ceremonyH}</h2>
        <p className={s.paragraph}>{k.ceremonyP}</p>
        {CEREMONY_CMDS.map((c) => (
          <code className={sec.cmd} dir="ltr" key={c}>{c}</code>
        ))}
        <p className={sec.cmdCaption}>
          <a href={CEREMONY_RECORD} {...A}>{k.ceremonyLink}</a>
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
    </PageShell>
  );
}
