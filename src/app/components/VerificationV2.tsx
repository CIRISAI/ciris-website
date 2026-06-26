// /verification — the "factory floor": the continuous-verification matrix that
// proves the CIRIS stack enforces its constitution before any image is minted.
// Developer-facing and English-only (like /compliance); the technical depth is
// the point, so copy is hardcoded here rather than run through the 29-locale
// path. Sourced from CIRISConformance's README (the contract-governance suite).
// v2 dark-blueprint via ContentShell.

import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";

const REPO = (name: string) => `https://github.com/CIRISAI/${name}`;

// The build cascade, foundation up. CIRISConformance governs the matrix every
// combination must pass before it boots.
const CASCADE = [
  { name: "CIRISVerify", note: "crypto + trust" },
  { name: "CIRISPersist", note: "data + state" },
  { name: "CIRISEdge", note: "mesh + transport" },
  { name: "CIRISServer", note: "node serving" },
  { name: "CIRISAgent", note: "client + mobile" },
];

const STATS = [
  { v: "16,000+", l: "test functions, measured" },
  { v: "6", l: "projects in the chain" },
  { v: "124", l: "cohabitation gates" },
  { v: "27", l: "constitutional controls" },
  { v: "29", l: "safety-battery locales" },
];

// What the conformance suite actually proves — each property is a behaviour a
// published wheel gates, driven by a real test (never spec text, never a mock).
const PROVES = [
  { key: "Decentralized mesh", cls: s.cCyan,
    body: "Messages cross a live transport node-to-node, with no center. A→B delivery is driven across every holder mode over a 4-node, 3-owner fabric (test_340)." },
  { key: "Post-quantum", cls: s.cViolet,
    body: "Identity and the audit chain are Ed25519 + ML-DSA-65 hybrid; the content cascade is X25519 + ML-KEM-768 (test_250 / test_100 / test_320). PQ protects the long-lived secrets, where harvest-now-decrypt-later actually bites." },
  { key: "Governable", cls: s.cBrass,
    body: "Membership roots in an accountable human (owner_bind, CC 3.2), with delegated and revocable moderation and namespace admission (test_270 / test_240 / test_260), over a tamper-evident audit chain (test_320)." },
  { key: "Scales without Big Tech", cls: s.cTeal,
    body: "The replication discipline and scaling factors that make internet-scale feasible on ordinary hardware are checked properties, not slides (test_210 / test_211 / test_200)." },
];

const COMPONENTS = [
  {
    name: "CIRISConformance",
    repo: "CIRISConformance",
    cls: s.cBrass,
    role: "Ecosystem matrix and contract governance",
    body:
      "Not a deployable binary. It defines the reference matrices and the integration boundaries every other project must satisfy before any combination of wheels is allowed to boot. The standard it tests against is the CIRIS Constitution (CC 0.4), the ecosystem's superalignment standard.",
    stages: [
      ["Cohabitation gates", "the real, separately-published wheels are installed together and driven in one process, where cross-wheel bugs that vanish in any single repo's combined build finally surface."],
      ["Real wheels, never mocks", "every assertion calls a published wheel and checks its behaviour. A missing feature is filed upstream and marked an expected failure, never skipped or worked around."],
      ["Matrix-alignment validation", "strict compatibility floors between dependent projects, to prevent cross-library (PyO3 / UniFFI) initialization skew."],
    ],
    tests: "124",
    focus: "Python cohabitation gates here, plus the Rust feature-conformance lane in CIRISServer.",
  },
  {
    name: "CIRISVerify",
    repo: "CIRISVerify",
    cls: s.cCyan,
    role: "Cryptographic and trust foundation",
    body:
      "The bedrock. Hybrid Ed25519 + ML-DSA-65 signing, the Merkle transparency log, attestation. Code cannot progress unless the trust layer is flawless.",
    stages: [
      ["Pre-flight", "AST-level verification and D27 conformance gates, so runtime code never depends on .md documentation."],
      ["Static analysis", "strict mypy type checking across all cryptographic modules."],
      ["Multi-arch compilation", "builds the C / Rust FFI extensions (.so, .dylib, .dll) for x86_64 and aarch64."],
    ],
    tests: "~1,200",
    focus: "key generation, signature determinism, isolated TPM2 mock testing.",
  },
  {
    name: "CIRISPersist",
    repo: "CIRISPersist",
    cls: s.cTeal,
    role: "Data and state management",
    body:
      "The substrate: federation-key directory, blob storage, the audit chain, the outbound queue, admission gates. Durable across every platform.",
    stages: [
      ["Dual-backend parity sweep", "every test runs against both Dockerized PostgreSQL (distributed) and SQLite (local / mobile) for absolute functional parity."],
      ["Upgrade-compat fixture capture", "legacy schema snapshots are loaded and migrated, to guarantee zero data loss across upgrades."],
      ["Cross-platform serialization parity", "data serialized on Windows x64 is read losslessly on macOS ARM64 and Linux."],
    ],
    tests: "~2,150",
    focus: "ACID compliance, concurrent locking, multi-threaded isolation, I/O regressions.",
  },
  {
    name: "CIRISEdge",
    repo: "CIRISEdge",
    cls: s.cViolet,
    role: "Mesh networking and transport",
    body:
      "The routing tier: federation wire dispatch, durable send, the inbound trust gate, and the decentralized peer-to-peer logic.",
    stages: [
      ["Leviculum / Reticulum-rs integration", "validates the PyO3 / UniFFI boundary for TCP-loopback, LoRa, and packet-radio transports."],
      ["Network-mesh simulation", "virtualized topologies test peer discovery and cryptographic routing-table propagation."],
      ["Latency and drain assertions", "asserts flush() and stop() drain their queues within strict millisecond thresholds."],
    ],
    tests: "~990",
    focus: "byte-level packet encoding, async stream handling, SAS verification, network-boundary fuzzing.",
  },
  {
    name: "CIRISServer",
    repo: "CIRISServer",
    cls: s.cRose,
    role: "Headless operations and node serving",
    body:
      "The node-serving engine: capacity scoring, detection, egress filtering, the reconsideration-DoS guard, the audit-log client. Also hosts the Rust conformance lane for substrate-internal behaviour the agent never drives.",
    stages: [
      ["API conformance", "HTTP / REST and Server-Sent Events surface (/v1/federation/*, /a2a), validating token-tier gating (Observer vs. Admin)."],
      ["Headless generation", "PyInstaller binaries plus signed, multi-arch (amd64 / arm64) Docker images."],
      ["Rust conformance lane", "feature-conformance for behaviour the substrate enforces internally, beyond the Python cohabitation gates."],
    ],
    tests: "~630",
    focus: "rate-limiting, CORS, streaming serialization, concurrent asyncio task processing.",
  },
  {
    name: "CIRISAgent",
    repo: "CIRISAgent",
    cls: s.cOk,
    role: "User-facing client (desktop and mobile)",
    body:
      "The culmination: all five layers integrated into one client. Also runs the safety batteries, the agent half of the constitutional-compliance claim.",
    stages: [
      ["Safety batteries", "adversarial mental-health safety batteries across 29 locales, driven through the qa_runner; each run publishes its capture as a CI artifact, so the sweeps are auditable run-over-run."],
      ["Localization guard", "a stdlib-only guard guarantees 29-locale mirror parity for the Android / iOS Kotlin / Swift bundles, so no raw key ever renders."],
      ["Registry-signed build", "canonical hashes of the resources and Python runtime tree, signed to satisfy the CIRISVerify contract, then the final cross-platform artifacts."],
    ],
    tests: "~11,500",
    focus: "plus 90+ qa_runner modules, sharded 8 ways. UI bridging, capability execution, safety-interpretation sweeps, end-to-end across all five projects.",
  },
];

export default function VerificationV2() {
  return (
    <ContentShell
      locale="en"
      accent="teal"
      kicker="Continuous verification"
      title="Alignment you can check, not just trust."
      lede="Most AI-safety groups publish ethics whitepapers. We publish the conformance suite that proves the system enforces its constitution, against the real, separately-shipped artifacts, before a single image is minted. Over 16,000 measured test functions run from the cryptographic foundation up. The bet is simple: a signature you cannot forge, a membership you cannot fake, an audit you cannot escape are external, independently verifiable constraints, not a model's self-report. This is the engineering tier of the alignment claim, the part that is checkable today."
      backHref="/proof"
      backLabel="back to proof"
    >
      {/* headline matrix stats */}
      <div className={s.scoreboard}>
        {STATS.map((st) => (
          <div className={s.scoreStat} key={st.l}>
            <div className={s.scoreV} dir="ltr">{st.v}</div>
            <div className={s.scoreL}>{st.l}</div>
          </div>
        ))}
      </div>

      {/* what conformance proves */}
      <section className={s.section}>
        <p className={s.sectionLabel}>What the suite proves</p>
        <p className={s.paragraph}>
          Each property is a behaviour a published wheel gates, driven by a real test, never spec
          text and never a mock. CEWP, the CIRIS Epistemic Web Platform, is a governable,
          post-quantum, decentralized mesh, and the suite proves each of those words holds.
        </p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          {PROVES.map((p) => (
            <div className={`${s.card} ${p.cls}`} key={p.key}>
              <h3>{p.key}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* why a conformance suite is the right instrument */}
      <div className={s.callout}>
        <p className={s.paragraph}>
          The structural-alignment bet is that maintaining a consistent deception across many
          independent constraints is combinatorially more expensive than telling the truth. You
          raise the cost of misalignment rather than hoping it was trained away. That cost is only
          real when the constraints are <b>external and independently verifiable</b>, not a model's
          own self-reported coherence. This suite is that external layer made executable.
        </p>
      </div>

      {/* cohabitation — why a separate suite is needed */}
      <section className={s.section}>
        <p className={s.sectionLabel}>Why a separate suite</p>
        <h2 className={s.h2}>The wheels ship apart and run together.</h2>
        <p className={s.paragraph}>
          The stack ships as separately-published extension wheels (storage, crypto, transport,
          node-serving), each released on its own cadence but designed to run together in one
          process. Cohabitation has failure modes that exist nowhere else and that no single repo
          can test: two wheels defining what looks like the same type that the interpreter rejects,
          shared substrate handles that must agree on shape and lifetime, version skew, and wire
          bytes one wheel signs that another must verify byte-for-byte. Each wheel's own tests
          compile into one combined build where those problems vanish. This harness installs the
          real, separately-published wheels together, the only place the bugs surface.
        </p>
      </section>

      {/* the build cascade, foundation up */}
      <section className={s.section}>
        <p className={s.sectionLabel}>The dependency chain, from the foundation up</p>
        <p className={s.paragraph}>
          The matrix evaluates the chain bottom-up. CIRISConformance governs the matrix floors and
          cross-wheel gates every combination must pass before it boots.
        </p>
        <div className={s.cardGrid}>
          {CASCADE.map((c, i) => (
            <a
              key={c.name}
              href={REPO(c.name)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${s.card} ${s.cTeal}`}
            >
              <h3>
                <span dir="ltr">{i + 1}</span> · {c.name}
              </h3>
              <p>{c.note}</p>
            </a>
          ))}
        </div>
        <p className={s.footnote}>
          Counts below are measured, not estimated: test-function definitions on each repo&apos;s
          main branch, counted by grep. Executed cases run higher via parametrization.
        </p>
      </section>

      {/* the six projects */}
      {COMPONENTS.map((c) => (
        <section className={s.section} key={c.name}>
          <p className={s.sectionLabel}>
            <a href={REPO(c.repo)} target="_blank" rel="noopener noreferrer">{c.name} ↗</a>
          </p>
          <h2 className={s.h2}>{c.role}</h2>
          <p className={s.paragraph}>{c.body}</p>
          <div className={s.cardGrid}>
            {c.stages.map(([label, desc]) => (
              <div className={`${s.card} ${c.cls}`} key={label}>
                <h3>{label}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
          <p className={s.footnote}>
            <b>{c.tests} tests</b> · {c.focus}
          </p>
        </section>
      ))}

      {/* close */}
      <section className={s.cta}>
        <p className={s.ctaPara}>
          CIRIS is not a wrapper. It is an institutional architecture for AI, verified end to end
          against its own constitution.
        </p>
        <div className={s.ctaRow}>
          <a href={REPO("CIRISConformance")} target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnP}`}>
            Read the conformance suite →
          </a>
          <a href="https://cirisai.github.io/CIRISServer" target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnS}`}>
            See the measured fabric
          </a>
        </div>
      </section>
    </ContentShell>
  );
}
