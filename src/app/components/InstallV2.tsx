// v2 "dark-blueprint" install page. Renders the same t.install.* dictionary keys
// the old InstallContent did — no copy is rewritten or re-translated here — inside
// the reusable ContentShell, cyan accent. The app-store install is made prominent
// up top via the shared StoreBadges component (live App Store + Google Play
// listings). Every install method (pip, Docker, git clone, CIRISManager), the
// hello-world snippets, and the troubleshooting steps are mapped onto the shared
// content.module vocabulary; all commands and links are preserved verbatim.
//
// Client component: the code panels carry copy-to-clipboard buttons. Strings that
// carry typographic emphasis (<strong>/<code>/<a>) are stored as HTML in the
// dictionary and injected with dangerouslySetInnerHTML. The content is authored
// and machine-translated by us (never user input), so this is safe.

"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";
import StoreBadges from "@/app/components/graphics/StoreBadges";

/** Inline raw HTML from the dictionary. Content is authored/machine-translated by us, never user input. */
const h = (str: string) => ({ __html: str });

const PRE_STYLE: React.CSSProperties = {
  position: "relative",
  overflowX: "auto",
  borderRadius: 10,
  border: "1px solid var(--color-line)",
  background: "rgba(0,0,0,0.35)",
  padding: "14px 16px",
  margin: "0 0 6px",
  fontFamily: "ui-monospace, monospace",
  fontSize: 13.5,
  lineHeight: 1.6,
  color: "var(--color-text)",
};

/** A code panel with a copy button, styled for the dark-blueprint shell. */
function CodeBlock({
  code,
  copyLabel,
  copiedLabel,
}: {
  code: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ position: "relative", margin: "0 0 6px" }}>
      <pre style={PRE_STYLE}>
        <code>{code}</code>
      </pre>
      <button
        onClick={copy}
        style={{
          position: "absolute",
          right: 8,
          top: 8,
          borderRadius: 8,
          border: "1px solid var(--color-line)",
          background: "rgba(255,255,255,0.06)",
          color: "var(--color-dim)",
          padding: "4px 10px",
          fontFamily: "ui-monospace, monospace",
          fontSize: 12,
          cursor: "pointer",
        }}
      >
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  );
}

const pipCommand = "pip install ciris-agent";
const dockerCommand = "docker compose up -d";
const gitCommand = "git clone https://github.com/CIRISAI/CIRISAgent.git";

const helloStep1Code = `pip install ciris-agent
ciris-agent --adapter api --port 8080`;

const helloStep2Code = `pip install ciris-sdk

# hello_ciris.py
import asyncio
from ciris_sdk import CIRISClient

async def main():
    async with CIRISClient(
        base_url="http://localhost:8080",
    ) as client:
        response = await client.interact(
            "Hello, CIRIS!"
        )
        print(response.response)
        print(
            f"[{response.state}] "
            f"{response.processing_time_ms}ms"
        )

asyncio.run(main())`;

export default function InstallV2({ t, locale }: { t: Dictionary; locale: string }) {
  const i = t.install;

  return (
    <ContentShell
      locale={locale}
      accent="cyan"
      kicker={i.heroPara2}
      title={i.h1}
      lede={i.heroPara1}
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {/* Mobile app — the prominent, fastest path. */}
      <div className={s.callout}>
        <h2 className={s.h2}>{i.mobileBannerTitle}</h2>
        <p className={s.paragraph}>{i.mobileBannerSub}</p>
        <StoreBadges labels={t.lobby.store} />
      </div>

      {/* Method 1: pip (recommended). */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{i.recommendedBadge}</p>
        <h2 className={s.h2}>{i.method1Heading}</h2>
        <p className={s.paragraph}>{i.method1Desc}</p>
        <CodeBlock code={pipCommand} copyLabel={i.copyBtn} copiedLabel={i.copiedBtn} />
        <div className={`${s.card} ${s.cOk}`} style={{ marginTop: 12 }}>
          <p dangerouslySetInnerHTML={h(i.method1ThenRun)} />
        </div>
        <p className={s.footnote} dangerouslySetInnerHTML={h(i.method1Req)} />
      </section>

      {/* Other methods. */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{i.otherMethodsHeading}</p>
        <h2 className={s.h2}>{i.otherMethodsHeading}</h2>

        {/* Method 2: Docker. */}
        <div style={{ marginBottom: 24 }}>
          <h3 className={s.h2} style={{ fontSize: "clamp(18px, 2.4vw, 22px)" }}>
            {i.method2Heading}
          </h3>
          <p className={s.paragraph}>{i.method2Desc}</p>
          <CodeBlock code={dockerCommand} copyLabel={i.copyBtn} copiedLabel={i.copiedBtn} />
          <p className={s.footnote} dangerouslySetInnerHTML={h(i.method2Req)} />
        </div>

        {/* Method 3: GitHub clone. */}
        <div style={{ marginBottom: 24 }}>
          <h3 className={s.h2} style={{ fontSize: "clamp(18px, 2.4vw, 22px)" }}>
            {i.method3Heading}
          </h3>
          <p className={s.paragraph}>{i.method3Desc}</p>
          <CodeBlock code={gitCommand} copyLabel={i.copyBtn} copiedLabel={i.copiedBtn} />
          <div className={`${s.card} ${s.cCyan}`} style={{ marginTop: 12 }}>
            <p dangerouslySetInnerHTML={h(i.method3Then)} />
          </div>
        </div>

        {/* Method 4: CIRISManager. */}
        <div>
          <h3 className={s.h2} style={{ fontSize: "clamp(18px, 2.4vw, 22px)" }}>
            {i.method4Heading}
          </h3>
          <p className={s.paragraph}>{i.method4Desc}</p>
          <div className={`${s.card} ${s.cCyan}`}>
            <p>{i.method4Body}</p>
          </div>
          <p className={s.footnote} dangerouslySetInnerHTML={h(i.method4Best)} />
        </div>
      </section>

      {/* Hello world. */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{i.helloHeading}</p>
        <h2 className={s.h2}>{i.helloHeading}</h2>
        <p className={s.paragraph}>{i.helloSub}</p>

        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{i.helloStep1Heading}</h3>
            <p style={{ marginBottom: 12 }}>{i.helloStep1Desc}</p>
            <CodeBlock code={helloStep1Code} copyLabel={i.copyBtn} copiedLabel={i.copiedBtn} />
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{i.helloStep2Heading}</h3>
            <p style={{ marginBottom: 12 }} dangerouslySetInnerHTML={h(i.helloStep2Desc)} />
            <CodeBlock code={helloStep2Code} copyLabel={i.copyBtn} copiedLabel={i.copiedBtn} />
          </div>
        </div>

        <p className={s.footnote} dangerouslySetInnerHTML={h(i.sdkNote)} />
      </section>

      {/* Troubleshooting. */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{i.troubleshootingHeading}</p>
        <h2 className={s.h2}>{i.troubleshootingHeading}</h2>

        <div style={{ marginBottom: 16 }}>
          <h3 className={s.h2} style={{ fontSize: "clamp(17px, 2.2vw, 20px)" }}>
            {i.ts1Summary}
          </h3>
          <p className={s.paragraph}>{i.ts1Step1}</p>
          <CodeBlock code="python --version" copyLabel={i.copyBtn} copiedLabel={i.copiedBtn} />
          <p className={s.paragraph} style={{ marginTop: 12 }}>
            {i.ts1Step2}
          </p>
          <CodeBlock code="pip install --upgrade pip" copyLabel={i.copyBtn} copiedLabel={i.copiedBtn} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <h3 className={s.h2} style={{ fontSize: "clamp(17px, 2.2vw, 20px)" }}>
            {i.ts2Summary}
          </h3>
          <p className={s.paragraph}>{i.ts2Step1}</p>
          <CodeBlock code="docker logs ciris-agent" copyLabel={i.copyBtn} copiedLabel={i.copiedBtn} />
          <p className={s.paragraph} style={{ marginTop: 12 }}>
            {i.ts2Step2}
          </p>
          <CodeBlock
            code="docker compose -f ~/ciris/docker-compose.yml ps"
            copyLabel={i.copyBtn}
            copiedLabel={i.copiedBtn}
          />
        </div>

        <div>
          <h3 className={s.h2} style={{ fontSize: "clamp(17px, 2.2vw, 20px)" }}>
            {i.ts3Summary}
          </h3>
          <p className={s.paragraph}>
            <a
              href="https://github.com/CIRISAI/CIRISAgent/blob/main/docs/README.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              {i.ts3Link1}
            </a>
          </p>
          <p className={s.paragraph}>
            <a href="https://github.com/CIRISAI/CIRISAgent/issues" target="_blank" rel="noopener noreferrer">
              {i.ts3Link2}
            </a>
          </p>
          <p className={s.paragraph}>
            <a href="https://discord.gg/SWGM7Gsvrv" target="_blank" rel="noopener noreferrer">
              {i.ts3Link3}
            </a>
          </p>
        </div>
      </section>
    </ContentShell>
  );
}
