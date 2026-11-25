// The hosted infrastructure, moved intact from the old /architecture page so
// its content survives the redesign (handoff: it may move lower on the page,
// it must not be deleted). Wording is unchanged and stays English-only, as it
// was; only the styling moved to the redesign tokens. The shell supplies the
// header and footer, so the old FloatingNav / Footer are gone.

import { localizeHref } from "@/i18n/config";
import { StatusChip } from "../StatusChip";
import rd from "../rd.module.css";
import s from "./ArchitecturePage.module.css";

const REPOS: { name: string; what: string }[] = [
  { name: "CIRISAgent", what: "Core agent framework" },
  { name: "CIRISManager", what: "Scout, research agents, Discord mods" },
  { name: "CIRISBridge", what: "Terraform + Ansible orchestration" },
  { name: "CIRISBilling", what: "Credits and payments" },
  { name: "CIRISProxy", what: "LLM routing with ZDR" },
  { name: "CIRISLens", what: "Observability and status" },
  { name: "ciris-website", what: "This website" },
];

const REGION_SERVICES = ["CIRISBilling", "CIRISProxy", "PostgreSQL", "Redis", "Caddy (TLS)"];

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function ArchitectureInfrastructure({
  locale,
  shippingLabel,
}: {
  locale: string;
  /** The shell's "Shipping" chip label (the hosted path runs today). */
  shippingLabel: string;
}) {
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <section id="infrastructure" aria-labelledby="infrastructure-h" className={s.infra} lang="en">
      {/* Hero */}
      <div className={s.infraHead}>
        <h2 id="infrastructure-h" className={s.h2}>
          Infrastructure
        </h2>
        <StatusChip kind="shipping" label={shippingLabel} pill />
      </div>
      <p className={s.infraLede}>Multi-region, privacy-first infrastructure. Designed to be deleted.</p>

      {/* Philosophy Banner */}
      <div className={s.callout}>
        <h3 className={s.calloutTitle}>Designed to Be Deleted</h3>
        <p className={s.p}>
          The CIRIS infrastructure is meant to be temporary. Every part of it is built knowing it will be
          retired once the peer-to-peer network meant to replace it is ready. That is the plan, not an
          accident. We avoid anything that ties CIRIS to one company, or that assumes a central hub has to
          exist forever.
        </p>
        <p className={s.small}>
          This is the <strong>hosted path</strong>: the two rented regions below keep CIRIS free for everyone
          today. Run a small model on your own device and you skip them entirely. The substrate that replaces
          them is{" "}
          <a href={lh("/cewp")} className={s.link}>
            CEWP
          </a>
          .
        </p>
        <div className={s.replace}>
          <div>
            <strong>DNS</strong> → Veilid DHT
          </div>
          <div>
            <strong>Proxy</strong> → Veilid private routes
          </div>
          <div>
            <strong>Billing</strong> → TBD (may persist longest)
          </div>
        </div>
      </div>

      {/* Architecture Diagram */}
      <h3 className={s.infraSub}>Two Regions, Both Always On</h3>
      <div className={s.diagram}>
        <div className={s.clients}>
          <span className={s.clientsName}>Clients</span>
          <span className={s.tiny}>Americas / Europe</span>
        </div>
        <div className={s.drops} aria-hidden="true">
          <span />
          <span />
        </div>
        <p className={`${s.tiny} ${s.split}`}>separate domains per region</p>

        <div className={s.regions}>
          <div className={`${s.region} ${s.regionUs}`}>
            <div className={s.regionHead}>
              <h4 className={s.regionName}>Vultr US</h4>
              <div className={s.tiny}>Chicago</div>
              <div className={`${rd.mono} ${s.domain}`}>ciris-services-1.ai</div>
              <div className={s.regionVia}>via Cloudflare</div>
            </div>
            <ul className={s.svcList}>
              {REGION_SERVICES.map((svc) => (
                <li key={svc}>
                  <span className={s.dot} aria-hidden="true" />
                  {svc}
                </li>
              ))}
              <li className={s.usOnly}>
                <span className={s.dot} aria-hidden="true" />+ CIRISLens
              </li>
            </ul>
          </div>

          <div className={`${s.region} ${s.regionEu}`}>
            <div className={s.regionHead}>
              <h4 className={s.regionName}>Hetzner EU</h4>
              <div className={s.tiny}>Falkenstein, Germany</div>
              <div className={`${rd.mono} ${s.domain}`}>ciris-services-2.ai</div>
              <div className={s.regionDirect}>direct DNS</div>
            </div>
            <ul className={s.svcList}>
              {REGION_SERVICES.map((svc) => (
                <li key={svc}>
                  <span className={s.dot} aria-hidden="true" />
                  {svc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={s.sync}>
          <span className={s.syncLine} aria-hidden="true" />
          <span className={s.syncPill}>
            PostgreSQL sync
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </span>
          <span className={s.syncLine} aria-hidden="true" />
        </div>

        <div className={s.legend}>
          <span className={s.regionUs}>
            <span className={s.swatch} aria-hidden="true" />
            US Region (Americas)
          </span>
          <span className={s.regionEu}>
            <span className={s.swatch} aria-hidden="true" />
            EU Region (Europe)
          </span>
          <span>
            <span className={s.legendDot} aria-hidden="true" />
            US-only service
          </span>
        </div>
      </div>

      {/* Services */}
      <h3 className={s.infraSub}>Services</h3>
      <div className={s.cards}>
        <div className={s.card}>
          <h4 className={s.cardTitle}>Split DNS</h4>
          <p className={s.cardP}>
            The US site and the EU site reach the internet two different ways, so no single failure can take
            both down.
          </p>
          <ul className={s.list}>
            <li>The US site goes through Cloudflare, which also absorbs attacks</li>
            <li>The EU site connects directly</li>
            <li>If Cloudflare has trouble, the EU site still works</li>
          </ul>
        </div>
        <div className={s.card}>
          <h4 className={s.cardTitle}>CIRISBilling</h4>
          <p className={s.cardP}>Keeps CIRIS running without ads and without selling your data.</p>
          <ul className={s.list}>
            <li>You buy credits ahead of time</li>
            <li>Each credit is counted exactly once, never twice</li>
            <li>You sign in with Google</li>
          </ul>
        </div>
        <div className={s.card}>
          <h4 className={s.cardTitle}>CIRISProxy</h4>
          <p className={s.cardP}>Passes requests to the AI model. Your conversations are never stored.</p>
          <ul className={s.list}>
            <li>Works with standard AI model providers</li>
            <li>Every provider is set to keep no data</li>
            <li>Nothing you send or receive is logged</li>
          </ul>
        </div>
        <div className={s.card}>
          <h4 className={s.cardTitle}>PostgreSQL</h4>
          <p className={s.cardP}>
            The database. Both regions keep matching copies, and either one can be written to.
          </p>
          <ul className={s.list}>
            <li>The two copies stay in step with each other</li>
            <li>If they ever disagree, the most recent change wins</li>
            <li>A person, not a script, switches regions (safer for money)</li>
          </ul>
        </div>
      </div>

      {/* Performance */}
      <h3 className={s.infraSub}>Performance</h3>
      <div className={s.metrics}>
        <h4 className={s.metricsTitle}>Production Metrics (scout.ciris.ai)</h4>
        <dl className={s.metricGrid}>
          {[
            ["368 MB", "Memory Usage"],
            ["5%", "CPU Usage"],
            ["5-10s", "Response Time"],
            ["22", "Core Services"],
          ].map(([value, name]) => (
            <div key={name} style={{ display: "flex", flexDirection: "column-reverse" }}>
              <dt className={s.metricLabel}>{name}</dt>
              <dd className={s.metricValue} style={{ margin: 0 }}>
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className={s.cards}>
        <div className={s.card}>
          <h4 className={s.cardTitle}>Edge Device Support</h4>
          <p className={s.cardP}>
            CIRIS runs on ordinary Android phones, answering in about 15 to 20 seconds, with the whole app under
            100 MB.
          </p>
          <ul className={s.list}>
            <li>Runs fully on the phone, no cloud needed</li>
            <li>Keeps its data on the device</li>
          </ul>
        </div>
        <a href={lh("/coherence-ratchet")} className={s.card}>
          <h4 className={s.cardTitle}>Coherence Ratchet</h4>
          <p className={s.cardP}>
            Being honest is cheap. Keeping a lie going is expensive. An honest agent can point back at what it
            already said. A lying agent has to keep every past record lined up, and that gets harder over time.
          </p>
          <ul className={s.list}>
            <li>Honesty: just point back at the record</li>
            <li>Lying: keep an ever-growing pile of records in step</li>
            <li>The longer it runs, the more honesty is the easy path</li>
          </ul>
        </a>
      </div>
      <div className={s.note}>
        <h4 className={s.noteTitle}>Bending Instead of Breaking</h4>
        <ul className={s.list} style={{ marginTop: 0 }}>
          <li>
            <strong>Backup AI providers:</strong> if the main one is down, it falls back to another
          </li>
          <li>
            <strong>Careful startup:</strong> the must-have parts load first, the optional parts can fail without
            stopping the rest
          </li>
          <li>
            <strong>Adapts:</strong> copes with a patchy network or limited power
          </li>
        </ul>
      </div>

      {/* Key Design Decisions */}
      <h3 className={s.infraSub}>Key Design Decisions</h3>
      <div className={s.stackCards}>
        <div className={s.card}>
          <h4 className={s.cardTitle}>Both Regions Run at Once</h4>
          <p className={s.cardP}>
            Both regions handle real traffic at the same time, so neither is a single point of failure. Each has
            its own web address. If one region goes down, people can switch to the other right away, with no
            waiting.
          </p>
        </div>
        <div className={s.card}>
          <h4 className={s.cardTitle}>Two Separate Hosting Companies</h4>
          <p className={s.cardP}>
            One US company (Vultr) and one German company (Hetzner), under two different countries&apos; laws. No
            single company can take CIRIS down, and because nothing is locked to either one, we can switch if their
            prices or policies change.
          </p>
        </div>
        <div className={s.card}>
          <h4 className={s.cardTitle}>Split DNS Strategy</h4>
          <p className={s.cardP}>
            US traffic goes through Cloudflare, which absorbs attacks and speeds things up. EU traffic connects
            straight to Hetzner. Splitting it this way means no single failure can take both down: if Cloudflare
            has trouble, the EU site still works.
          </p>
        </div>
        <div className={s.card}>
          <h4 className={s.cardTitle}>A Person Switches the Database, Not a Script</h4>
          <p className={s.cardP}>
            For money data, like credit balances and payments, a person makes the call to switch regions, not an
            automatic script. This avoids the case where both regions think they are in charge at once. When money
            is involved, careful beats clever.
          </p>
        </div>
      </div>

      {/* Safety Integration */}
      <h3 className={s.infraSub}>Safety Integration</h3>
      <div className={`${s.callout} ${s.calloutWarn}`} style={{ marginTop: 0 }}>
        <p className={s.p}>
          The infrastructure follows the{" "}
          <a href={lh("/safety")} className={s.link}>
            safety policy
          </a>
          :<strong> &ldquo;Fix it if we can. Pause only if we cannot.&rdquo;</strong>
        </p>
        <div className={s.pauses}>
          <div className={s.pause}>
            <h4 className={s.pauseTitle}>Global Pause</h4>
            <p className={s.small} style={{ marginTop: 6 }}>
              Stops the whole service across both regions. The database is kept safe. A clear written reason is
              required.
            </p>
          </div>
          <div className={s.pause}>
            <h4 className={s.pauseTitle}>Regional Pause</h4>
            <p className={s.small} style={{ marginTop: 6 }}>
              Pauses one region while the other keeps serving. Used for a problem that only affects one place.
            </p>
          </div>
        </div>
        <p className={s.small} style={{ marginTop: 16 }}>
          Trust artifacts are public AGPL-3.0 in the CIRISBridge repository:{" "}
          <a href="https://github.com/CIRISAI/CIRISBridge/blob/main/SECURITY.md" {...ext} className={s.link}>
            SECURITY.md
          </a>
          {", "}
          <a href="https://github.com/CIRISAI/CIRISBridge/blob/main/OPERATIONS.md" {...ext} className={s.link}>
            OPERATIONS.md
          </a>
          , and{" "}
          <a href="https://github.com/CIRISAI/CIRISBridge/tree/main/ansible/runbooks" {...ext} className={s.link}>
            26 named Ansible runbooks
          </a>{" "}
          (incident-response, intrusion-response, cert-rotate, backup-verify, e2e-smoke-test, image-update,
          disk-cleanup, billing-rollback, add-region, and others). The repository itself is also public:{" "}
          <a href="https://github.com/CIRISAI/CIRISBridge" {...ext} className={s.link}>
            CIRISAI/CIRISBridge
          </a>
          .
        </p>
      </div>

      {/* Open Source */}
      <h3 className={s.infraSub}>100% AGPL-3.0 Open Source</h3>
      <div className={`${s.callout} ${s.calloutViolet}`} style={{ marginTop: 0 }}>
        <h4 className={s.calloutTitle} style={{ fontSize: 18 }}>
          Why AGPL-3.0?
        </h4>
        <p className={s.p}>
          Every CIRIS component uses the GNU Affero General Public License v3.0. This isn&apos;t just &quot;open
          source&quot;. It&apos;s <strong>network copyleft</strong>. If anyone modifies CIRIS and offers it as a
          service, they must release their modifications under the same license.
        </p>
        <ul className={s.list}>
          <li>
            <strong>Prevents cloud appropriation:</strong> No company can take CIRIS, modify it, and offer it as a
            closed service
          </li>
          <li>
            <strong>Ensures transparency:</strong> Any deployed version&apos;s source must be available to users
          </li>
          <li>
            <strong>Protects the commons:</strong> Improvements flow back to the community, not into proprietary
            forks
          </li>
        </ul>
      </div>
      <div className={s.panel} style={{ marginTop: 16 }}>
        <p className={s.p}>
          Every component of CIRIS infrastructure is open source under AGPL-3.0. You can audit our claims, reproduce
          our setup, or fork it, and if you serve it to others, you share your improvements.
        </p>
        <div className={s.repos}>
          {REPOS.map((r) => (
            <div key={r.name} className={s.repo}>
              <div className={s.repoHead}>
                <h4 className={s.repoName}>{r.name}</h4>
                <span className={`${rd.mono} ${s.license}`}>AGPL-3.0</span>
              </div>
              <p className={s.small} style={{ marginTop: 0 }}>
                {r.what}
              </p>
              <div className={s.repoLinks}>
                <a href={`https://github.com/CIRISAI/${r.name}`} {...ext} aria-label={`${r.name} on GitHub`}>
                  GitHub
                </a>
                <span aria-hidden="true">|</span>
                <a
                  href={`https://sonarcloud.io/project/overview?id=CIRISAI_${r.name}`}
                  {...ext}
                  aria-label={`${r.name} on SonarCloud`}
                >
                  SonarCloud
                </a>
                <span aria-hidden="true">|</span>
                <a href={`https://deepwiki.com/CIRISAI/${r.name}`} {...ext} aria-label={`${r.name} on DeepWiki`}>
                  DeepWiki
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className={s.infraCtas}>
        <a href={lh("/status")} className={rd.btnPrimary}>
          View Live Status
        </a>
        <a href="https://github.com/CIRISAI/CIRISBridge" {...ext} className={rd.btnSecondary}>
          View Source Code
        </a>
      </div>

      <p className={s.closing}>&ldquo;This infrastructure exists to be deleted. That is the whole point.&rdquo;</p>
    </section>
  );
}
