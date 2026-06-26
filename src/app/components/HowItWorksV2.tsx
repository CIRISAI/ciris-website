// v2 "dark-blueprint" how-it-works page. Renders the same t.howItWorks.*
// dictionary keys the old HowItWorksContent did — no copy is rewritten or
// re-translated here — inside the reusable ContentShell, with the Fabric Node
// graphic (g07, cyan accent). The long technical body (rules, pipeline, DMAs,
// conscience, actions, principles, buses, oversight, modes, privacy,
// transparency, benchmarking, agents) is mapped onto the shared content.module
// vocabulary: sectionLabel/h2 headers, paragraphs, callouts, notices, and the
// accent card variants. Existing links/CTAs are preserved verbatim.
//
// Strings that carry typographic emphasis (<em>/<b>/<code>) are stored as HTML
// in the dictionary and injected with dangerouslySetInnerHTML. The content is
// authored and machine-translated by us (never user input), so this is safe.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";
import TraceExplorer from "@/app/components/TraceExplorer";

/** Inline raw HTML from the dictionary. Content is authored/machine-translated by us, never user input. */
const h = (str: string) => ({ __html: str });

export default function HowItWorksV2({ t, locale }: { t: Dictionary; locale: string }) {
  const hiw = t.howItWorks;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <ContentShell
      locale={locale}
      accent="cyan"
      kicker={hiw.header.subheadline}
      title={hiw.header.headline}
      lede={hiw.header.description}
      graphicId="g07"
      backHref="/"
      backLabel={t.pathsCommon.back}
      mtBanner={t.common.mtBanner}
    >
      {/* The conscience pipeline — the mechanism, and why CIRIS is an institution. */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{hiw.consciencePipeline.label}</p>
        <h2 className={s.h2}>{hiw.consciencePipeline.h2}</h2>
        <p className={s.paragraph}>{hiw.consciencePipeline.body1}</p>
        <div className={s.callout}>
          <p className={s.paragraph}>{hiw.consciencePipeline.body2}</p>
        </div>
      </section>

      {/* What is CIRIS */}
      <section className={s.section}>
        <h2 className={s.h2}>{hiw.whatIsCiris.heading}</h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(hiw.whatIsCiris.body)} />
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.whatIsCiris.stat1Value}</h3>
            <p>{hiw.whatIsCiris.stat1Label}</p>
          </div>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>{hiw.whatIsCiris.stat2Value}</h3>
            <p>{hiw.whatIsCiris.stat2Label}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.whatIsCiris.stat3Value}</h3>
            <p>{hiw.whatIsCiris.stat3Label}</p>
          </div>
        </div>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(hiw.whatIsCiris.useCasesBody)} />
        <p className={s.footnote}>
          <Link href={lh("/coherence-ratchet")}>{hiw.whatIsCiris.link1}</Link>
          {"  ·  "}
          <Link href={lh("/sections/main")}>{hiw.whatIsCiris.link2}</Link>
          {"  ·  "}
          <a href="https://github.com/CIRISAI/CIRISAgent" target="_blank" rel="noopener noreferrer">
            {hiw.whatIsCiris.link3}
          </a>
        </p>
      </section>

      {/* The Three Rules */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{hiw.threeRules.heading}</p>
        <h2 className={s.h2}>{hiw.threeRules.heading}</h2>
        <p className={s.paragraph}>{hiw.threeRules.lead}</p>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.threeRules.rule1Title}</h3>
            <p dangerouslySetInnerHTML={h(hiw.threeRules.rule1Body)} />
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.threeRules.rule2Title}</h3>
            <p>{hiw.threeRules.rule2Body}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.threeRules.rule3Title}</h3>
            <p>{hiw.threeRules.rule3Body}</p>
          </div>
        </div>
      </section>

      {/* H3ERE Pipeline */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{hiw.pipeline.heading}</p>
        <h2 className={s.h2}>{hiw.pipeline.heading}</h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(hiw.pipeline.lead)} />
        <div className={s.cardGrid}>
          {hiw.pipeline.steps.map((item, idx) => {
            const step = idx + 1;
            const isConditional = step === 7 || step === 8;
            const variant = step === 4 ? s.cOk : step === 6 ? s.cCyan : isConditional ? s.cBrass : s.cTeal;
            return (
              <div key={step} className={`${s.card} ${variant}`}>
                <h3>
                  {step}. {item.name}
                  {isConditional && <span className={s.footnote}> {hiw.pipeline.conditionalLabel}</span>}
                </h3>
                <p>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Five DMAs */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{hiw.dmas.heading}</p>
        <h2 className={s.h2}>{hiw.dmas.heading}</h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(hiw.dmas.lead)} />
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{hiw.dmas.principleTitle}</h3>
            <p>{hiw.dmas.principleBody}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{hiw.dmas.commonSenseTitle}</h3>
            <p dangerouslySetInnerHTML={h(hiw.dmas.commonSenseBody)} />
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{hiw.dmas.domainTitle}</h3>
            <p dangerouslySetInnerHTML={h(hiw.dmas.domainBody)} />
          </div>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>
              {hiw.dmas.idmaTitle}{" "}
              <Link href={lh("/research-status#idma")}>{hiw.dmas.idmaLink}</Link>
            </h3>
            <p dangerouslySetInnerHTML={h(hiw.dmas.idmaBody)} />
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{hiw.dmas.actionSelectionTitle}</h3>
            <p>{hiw.dmas.actionSelectionBody}</p>
          </div>
        </div>
      </section>

      {/* Six Conscience Checks */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{hiw.conscience.heading}</p>
        <h2 className={s.h2}>{hiw.conscience.heading}</h2>
        <p className={s.paragraph}>{hiw.conscience.lead}</p>

        <p className={s.footnote}>{hiw.conscience.bypassHeading}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>{hiw.conscience.bypass1Title}</h3>
            <p>{hiw.conscience.bypass1Body}</p>
          </div>
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>{hiw.conscience.bypass2Title}</h3>
            <p>{hiw.conscience.bypass2Body}</p>
          </div>
        </div>

        <p className={s.footnote}>{hiw.conscience.facultiesHeading}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.conscience.faculty1Title}</h3>
            <p>{hiw.conscience.faculty1Body}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.conscience.faculty2Title}</h3>
            <p>{hiw.conscience.faculty2Body}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.conscience.faculty3Title}</h3>
            <p>{hiw.conscience.faculty3Body}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.conscience.faculty4Title}</h3>
            <p>{hiw.conscience.faculty4Body}</p>
          </div>
        </div>
        <p className={s.footnote} dangerouslySetInnerHTML={h(hiw.conscience.exemptNote)} />
      </section>

      {/* 10 Handler Actions */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{hiw.actions.heading}</p>
        <h2 className={s.h2}>{hiw.actions.heading}</h2>
        <p className={s.paragraph}>{hiw.actions.lead}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.actions.externalHeading}</h3>
            <p>
              <b>SPEAK</b> {hiw.actions.speakDesc}<br />
              <b>TOOL</b> {hiw.actions.toolDesc}<br />
              <b>OBSERVE</b> {hiw.actions.observeDesc}
            </p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.actions.memoryHeading}</h3>
            <p>
              <b>MEMORIZE</b> {hiw.actions.memorizeDesc}<br />
              <b>RECALL</b> {hiw.actions.recallDesc}<br />
              <b>FORGET</b> {hiw.actions.forgetDesc}
            </p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.actions.controlHeading}</h3>
            <p>
              <b>DEFER</b> {hiw.actions.deferDesc}<br />
              <b>PONDER</b> {hiw.actions.ponderDesc}<br />
              <b>REJECT</b> {hiw.actions.rejectDesc}
            </p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.actions.terminalHeading}</h3>
            <p>
              <b>TASK_COMPLETE</b> {hiw.actions.taskCompleteDesc}
            </p>
          </div>
        </div>
      </section>

      {/* 6 Foundational Principles */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{hiw.principles.heading}</p>
        <h2 className={s.h2}>{hiw.principles.heading}</h2>
        <p className={s.paragraph}>{hiw.principles.lead}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          {hiw.principles.items.map((principle) => (
            <div key={principle.name} className={`${s.card} ${s.cTeal}`}>
              <h3>{principle.name}</h3>
              <p>{principle.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6 Message Buses */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{hiw.buses.heading}</p>
        <h2 className={s.h2}>{hiw.buses.heading}</h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(hiw.buses.lead)} />
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          {hiw.buses.items.map((bus) => (
            <div key={bus.name} className={`${s.card} ${s.cViolet}`}>
              <h3>{bus.name}</h3>
              <p>{bus.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Human Oversight */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{hiw.oversight.heading}</p>
        <h2 className={s.h2}>{hiw.oversight.heading}</h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(hiw.oversight.lead)} />
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cRose}`}>
            <h3>
              {hiw.oversight.rootBadge} · {hiw.oversight.rootTitle}
            </h3>
            <p>{hiw.oversight.rootBody}</p>
          </div>
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>
              {hiw.oversight.authorityBadge} · {hiw.oversight.authorityTitle}
            </h3>
            <p>{hiw.oversight.authorityBody}</p>
          </div>
          <div className={`${s.card} ${s.cOk}`}>
            <h3>
              {hiw.oversight.observerBadge} · {hiw.oversight.observerTitle}
            </h3>
            <p>{hiw.oversight.observerBody}</p>
          </div>
        </div>
      </section>

      {/* Deferral Triggers */}
      <div className={s.callout}>
        <h2 className={s.h2}>{hiw.oversight.deferralHeading}</h2>
        <p className={s.paragraph}>{hiw.oversight.deferralLead}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.oversight.wbdTitle}</h3>
            <p>
              {hiw.oversight.wbdItems.map((item, i) => (
                <span key={i}>
                  • {item}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.oversight.professionalTitle}</h3>
            <p>
              {hiw.oversight.professionalItems.map((item, i) => (
                <span key={i}>
                  • {item}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.oversight.systemTitle}</h3>
            <p>
              {hiw.oversight.systemItems.map((item, i) => (
                <span key={i}>
                  <span dangerouslySetInnerHTML={h("• " + item)} />
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.oversight.configTitle}</h3>
            <p>
              {hiw.oversight.configItems.map((item, i) => (
                <span key={i}>
                  • {item}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      {/* Kill Switch / Accord */}
      <div className={s.callout}>
        <h2 className={s.h2}>
          {hiw.oversight.accordHeading}{" "}
          <a
            href="https://github.com/CIRISAI/CIRISAgent/tree/main/ciris_engine/logic/accord"
            target="_blank"
            rel="noopener noreferrer"
          >
            {hiw.oversight.accordLink}
          </a>
        </h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(hiw.oversight.accordBody)} />
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cRose}`}>
            <h3>{hiw.oversight.shutdownLabel}</h3>
            <p>{hiw.oversight.shutdownDesc}</p>
          </div>
          <div className={`${s.card} ${s.cBrass}`}>
            <h3>{hiw.oversight.freezeLabel}</h3>
            <p>{hiw.oversight.freezeDesc}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.oversight.safeModeLabel}</h3>
            <p>{hiw.oversight.safeModeDesc}</p>
          </div>
        </div>
        <p className={s.footnote}>{hiw.oversight.accordFooter}</p>
      </div>

      {/* Operational Modes */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{hiw.modes.heading}</p>
        <h2 className={s.h2}>{hiw.modes.heading}</h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(hiw.modes.lead)} />
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{hiw.modes.workTitle}</h3>
            <p>
              {hiw.modes.workSub}
              <br />
              {hiw.modes.workItems.map((item, i) => (
                <span key={i}>
                  {item}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{hiw.modes.playTitle}</h3>
            <p>
              {hiw.modes.playSub}
              <br />
              {hiw.modes.playItems.map((item, i) => (
                <span key={i}>
                  <span dangerouslySetInnerHTML={h(item)} />
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{hiw.modes.solitudeTitle}</h3>
            <p>
              {hiw.modes.solitudeSub}
              <br />
              {hiw.modes.solitudeItems.map((item, i) => (
                <span key={i}>
                  {item}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{hiw.modes.dreamTitle}</h3>
            <p>
              {hiw.modes.dreamSub}
              <br />
              {hiw.modes.dreamItems.map((item, i) => (
                <span key={i}>
                  {item}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{hiw.privacy.heading}</p>
        <h2 className={s.h2}>{hiw.privacy.heading}</h2>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.privacy.secretsTitle}</h3>
            <p>{hiw.privacy.secretsBody}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.privacy.encryptionTitle}</h3>
            <p>{hiw.privacy.encryptionBody}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>{hiw.privacy.localFirstTitle}</h3>
            <p>{hiw.privacy.localFirstBody}</p>
          </div>
        </div>
      </section>

      {/* Open Infrastructure */}
      <div className={s.callout}>
        <h2 className={s.h2}>{hiw.privacy.openSourceHeading}</h2>
        <p className={s.paragraph}>{hiw.privacy.openSourceBody}</p>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>
              <a href="https://github.com/CIRISAI/CIRISProxy" target="_blank" rel="noopener noreferrer">
                {hiw.privacy.proxyLink}
              </a>
            </h3>
            <p>{hiw.privacy.proxyDesc}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>
              <a href="https://github.com/CIRISAI/CIRISBilling" target="_blank" rel="noopener noreferrer">
                {hiw.privacy.billingLink}
              </a>
            </h3>
            <p>{hiw.privacy.billingDesc}</p>
          </div>
          <div className={`${s.card} ${s.cCyan}`}>
            <h3>
              <a href="https://github.com/CIRISAI/CIRISBridge" target="_blank" rel="noopener noreferrer">
                {hiw.privacy.bridgeLink}
              </a>
            </h3>
            <p>{hiw.privacy.bridgeDesc}</p>
          </div>
        </div>
      </div>

      {/* Transparency */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{hiw.transparency.heading}</p>
        <h2 className={s.h2}>{hiw.transparency.heading}</h2>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{hiw.transparency.realtimeTitle}</h3>
            <p>{hiw.transparency.realtimeBody}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{hiw.transparency.otelTitle}</h3>
            <p>{hiw.transparency.otelBody}</p>
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{hiw.transparency.auditTitle}</h3>
            <p dangerouslySetInnerHTML={h(hiw.transparency.auditBody)} />
          </div>
          <div className={`${s.card} ${s.cTeal}`}>
            <h3>{hiw.transparency.airTitle}</h3>
            <p>{hiw.transparency.airBody}</p>
          </div>
        </div>
      </section>

      {/* Example Signed Trace */}
      <section className={s.section}>
        <h2 className={s.h2}>{hiw.transparency.traceHeading}</h2>
        <p className={s.paragraph} dangerouslySetInnerHTML={h(hiw.transparency.traceBody)} />
        <p className={s.footnote}>
          <Link href={lh("/explore-a-trace")}>{hiw.transparency.traceLink}</Link>
        </p>
        <TraceExplorer compact={true} defaultOpenIndex={4} />
      </section>

      {/* HE-300 Coherence Benchmarking */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{hiw.benchmarking.heading}</p>
        <h2 className={s.h2}>{hiw.benchmarking.heading}</h2>
        <p className={s.paragraph}>
          {hiw.benchmarking.lead1}{" "}
          <a href="https://arxiv.org/abs/2008.02275" target="_blank" rel="noopener noreferrer">
            <span dangerouslySetInnerHTML={h(hiw.benchmarking.lead2)} />
          </a>{" "}
          {hiw.benchmarking.lead3}
        </p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          {hiw.benchmarking.categories.map((cat) => (
            <div key={cat.name} className={`${s.card} ${s.cCyan}`}>
              <h3>
                {cat.name} · {cat.count}
              </h3>
              <p>{cat.desc}</p>
            </div>
          ))}
        </div>
        <div className={s.callout}>
          <h2 className={s.h2}>{hiw.benchmarking.fundingHeading}</h2>
          <p className={s.paragraph}>{hiw.benchmarking.fundingBody}</p>
          <p className={s.paragraph}>
            <a
              href="https://github.com/emooreatx/ethicsengine_enterprise"
              target="_blank"
              rel="noopener noreferrer"
            >
              {hiw.benchmarking.ethicsEngineLink}
            </a>
            {"  ·  "}
            <a href="https://github.com/CIRISAI/CIRISLens" target="_blank" rel="noopener noreferrer">
              {hiw.benchmarking.cirisLensLink}
            </a>
          </p>
        </div>
      </section>

      {/* Specialized Agents */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{hiw.agents.heading}</p>
        <h2 className={s.h2}>{hiw.agents.heading}</h2>
        <p className={s.paragraph}>{hiw.agents.lead}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          {hiw.agents.items.map((agent) => (
            <div key={agent.name} className={`${s.card} ${s.cViolet}`}>
              <h3>
                {agent.name} · {agent.role}
              </h3>
              <p>
                {agent.desc}
                <br />
                <em>{agent.useCase}</em>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={s.cta}>
        <p className={s.ctaPara} dangerouslySetInnerHTML={h(hiw.cta.body)} />
        <div className={s.ctaRow}>
          <Link href={lh("/safety")} className={`${s.btn} ${s.btnP}`}>
            {hiw.cta.safetyBtn}
          </Link>
          <Link href={lh("/compare")} className={`${s.btn} ${s.btnS}`}>
            {hiw.cta.compareBtn}
          </Link>
          <Link href={lh("/coherence-ratchet")} className={`${s.btn} ${s.btnS}`}>
            {hiw.cta.coherenceBtn}
          </Link>
          <Link href={lh("/ciris-scoring")} className={`${s.btn} ${s.btnS}`}>
            {hiw.cta.scoringBtn}
          </Link>
        </div>
      </section>
    </ContentShell>
  );
}
