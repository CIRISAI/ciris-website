// /verification — the "factory floor": the continuous-verification matrix that
// mechanically enforces CIRIS's safety boundaries before any image is minted.
// Developer-facing and English-only (like /compliance); the technical depth is
// the point, so copy is hardcoded here rather than run through the 29-locale
// machine-translation path. v2 dark-blueprint via ContentShell.

import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";

const REPO = (name: string) => `https://github.com/CIRISAI/${name}`;

// The build cascade, foundation up. Each layer must satisfy its conformance
// matrix before any combination above it is allowed to boot.
const CASCADE = [
  { name: "CIRISVerify", note: "crypto + trust" },
  { name: "CIRISPersist", note: "data + state" },
  { name: "CIRISEdge", note: "mesh + federation" },
  { name: "CIRISServer", note: "headless ops" },
  { name: "CIRISAgent", note: "client + mobile" },
];

const STATS = [
  { v: "15,000+", l: "tests, bottom-up" },
  { v: "6", l: "projects in the chain" },
  { v: "2.9.7+", l: "verified image" },
  { v: "x86_64 · aarch64", l: "multi-arch" },
  { v: "29", l: "locales, parity-checked" },
];

const COMPONENTS = [
  {
    name: "CIRISConformance",
    repo: "CIRISConformance",
    cls: s.cBrass,
    role: "Ecosystem matrix and contract governance",
    body:
      "Not a deployable binary. It defines the integration boundaries and testing contracts for the whole CI lifecycle, the reference matrices the substrate layers must satisfy before any combination is allowed to boot.",
    stages: [
      ["Adversarial fire-tests", "isolated attack vectors against the substrate data-access surfaces, so caller-scope admission and hardware-backed attestation hold under duress."],
      ["Matrix alignment validation", "strict compatibility floors between dependent projects, to prevent cross-library (PyO3 / UniFFI) initialization skew."],
    ],
    tests: null,
    focus: null,
  },
  {
    name: "CIRISVerify",
    repo: "CIRISVerify",
    cls: s.cCyan,
    role: "Cryptographic and trust foundation",
    body:
      "The bedrock. Structural evidence, attestation, and cryptographic signing. Code cannot progress unless the trust layer is flawless.",
    stages: [
      ["Pre-flight", "AST-level verification and D27 conformance gates, so runtime code never depends on .md documentation."],
      ["Static analysis", "strict mypy type checking across all cryptographic modules."],
      ["Multi-arch compilation", "builds the C / Rust FFI extensions (.so, .dylib, .dll) for x86_64 and aarch64."],
    ],
    tests: "~1,500",
    focus: "key generation, signature determinism, isolated TPM2 mock testing.",
  },
  {
    name: "CIRISPersist",
    repo: "CIRISPersist",
    cls: s.cTeal,
    role: "Data and state management",
    body:
      "Durability, secure local storage, and schema compatibility across every platform, immediately above the trust layer.",
    stages: [
      ["Dual-backend conformance sweep", "every test runs against both Dockerized PostgreSQL (distributed) and SQLite (local / mobile) for absolute functional parity."],
      ["Upgrade-compat fixture capture", "legacy schema snapshots are loaded and migrated, to guarantee zero data loss across upgrades."],
      ["Cross-platform parity assertion", "data serialized on Windows x64 is read losslessly on macOS ARM64 and Linux."],
    ],
    tests: "~2,500",
    focus: "ACID compliance, concurrent locking, multi-threaded isolation, I/O regressions.",
  },
  {
    name: "CIRISEdge",
    repo: "CIRISEdge",
    cls: s.cViolet,
    role: "Mesh networking and federation",
    body:
      "The routing tier. Deep integration with external transport vendors and the decentralized peer-to-peer logic.",
    stages: [
      ["Leviculum vendor integration", "integration testing with the Reticulum-rs and Leviculum Rust libraries, validating the PyO3 / UniFFI boundary for TCP-loopback, LoRa, and packet-radio transport stubs."],
      ["Network mesh simulation", "virtualized local topologies test CIRIS-V1 NodeCode peer discovery and cryptographic routing-table propagation."],
      ["Latency and drain assertions", "checks event-loop stalls and asserts flush() and stop() drain their queues within strict millisecond thresholds."],
    ],
    tests: "~3,000",
    focus: "byte-level packet encoding, async stream handling, SAS verification, network-boundary fuzzing.",
  },
  {
    name: "CIRISServer",
    repo: "CIRISServer",
    cls: s.cRose,
    role: "Headless operations and administration",
    body:
      "The headless engine orchestrating persistence and edge: API requests, agent-to-agent negotiations, and heavy background tasks.",
    stages: [
      ["API conformance", "full HTTP / REST and Server-Sent Events surface testing (/v1/federation/*, /a2a), validating token-tier gating (Observer vs. Admin)."],
      ["Headless generation", "optimized headless binaries via PyInstaller, tuned for Docker and headless Linux."],
      ["Docker multi-arch images", "container logic creates, layers, signs, and pushes amd64 / arm64 images to the GitHub Container Registry."],
    ],
    tests: "~3,500",
    focus: "rate-limiting, CORS policies, streaming event serialization, concurrent asyncio task processing.",
  },
  {
    name: "CIRISAgent",
    repo: "CIRISAgent",
    cls: s.cOk,
    role: "User experience and mobile interfaces",
    body:
      "The culmination: every lower service folded into one user-facing client across desktop and mobile.",
    stages: [
      ["Localization guard", "a stdlib-only guard guarantees reference coverage and mirror parity across 29 locales for the Android / iOS Kotlin / Swift bundles, so no raw key ever renders."],
      ["Staged QA (qa_runner)", "full UI, agent-mode capability (CLIENT / PROXY / SERVER), and workflow simulation: a byte-for-byte install-parity check mimicking exactly what a user installs."],
      ["CIRISRegistry verification", "canonical hashes of the resources and Python runtime tree, signed with ciris-build-sign to satisfy the CIRISVerify v2.0.3+ contract."],
      ["Final output", "cross-platform wheels, the Chaquopy Android APK, the Desktop UberJar, and the Inno Setup Windows installer, aggregated into the GitHub Release."],
    ],
    tests: "~4,500+",
    focus: "sharded 8 ways. UI bridging, capability execution, safety-interpretation sweeps, end-to-end across all five projects.",
  },
];

export default function VerificationV2() {
  return (
    <ContentShell
      locale="en"
      accent="teal"
      kicker="Continuous verification"
      title="Show people how the sausage gets made."
      lede="Most AI-safety groups publish ethics whitepapers. We publish the CI matrix that mechanically enforces the safety boundaries, before a single image is minted. Over 15,000 tests run from the foundation up across six projects to produce one verified build. The safety constraints are not promises. They are continuously machined, tested, and cryptographically signed code."
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

      {/* the build cascade, foundation up */}
      <section className={s.section}>
        <p className={s.sectionLabel}>The dependency chain, from the foundation up</p>
        <p className={s.paragraph}>
          The matrix evaluates the chain bottom-up. Each layer must satisfy its conformance matrix
          before any combination above it is allowed to boot.
        </p>
        <div className={`${s.cardGrid}`}>
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
      </section>

      {/* the nonce — why the matrix exists */}
      <div className={s.callout}>
        <p className={s.paragraph}>
          This matrix is what keeps runtime code drift from undermining the{" "}
          <b>Coherence Ratchet</b> or sneaking un-vetted capabilities past the apophatic bounds.
          It runs concurrent release waves horizontally, with no flaky environment failures.
        </p>
      </div>

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
          {c.tests && (
            <p className={s.footnote}>
              <b>{c.tests} tests</b> · {c.focus}
            </p>
          )}
        </section>
      ))}

      {/* close */}
      <section className={s.cta}>
        <p className={s.ctaPara}>
          CIRIS is not a wrapper. It is a fully engineered computing paradigm, verified end to end.
        </p>
        <div className={s.ctaRow}>
          <a href="https://cirisai.github.io/CIRISServer" target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnP}`}>
            See the measured fabric →
          </a>
          <a href={REPO("CIRISAgent")} target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnS}`}>
            Read the source
          </a>
        </div>
      </section>
    </ContentShell>
  );
}
