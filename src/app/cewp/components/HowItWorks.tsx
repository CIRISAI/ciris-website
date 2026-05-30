// HowItWorks — progressive-disclosure accordion for /cewp.
//
// Each section is a native <details> so it works without JS, keyboard
// navigates, and screen readers handle expand/collapse correctly. All
// sections start collapsed. The reader chooses how deep to go; the
// page surface stays short for the casual visitor.
//
// Topics are sequenced from "what am I looking at" → math → knobs →
// CEG mechanism → where this is going. Each section can be read in
// isolation; no cross-references that require expanding another panel.

const SECTIONS: Array<{ id: string; q: string; body: React.ReactNode }> = [
  {
    id: "globe",
    q: "What you are looking at on the globe",
    body: (
      <>
        <p>
          The dark sphere is Earth, drawn ocean-first with continent
          outlines in cyan from the public-domain Natural Earth 110m
          land dataset. The faint blue grid is latitude and longitude.
          Above the surface sit two kinds of node dots and one kind of
          arc, and which ones are drawn depends on the mode you picked.
        </p>
        <p>
          <b>Orange dots</b> are the roughly fourteen hyperscale
          metros that host most of today&rsquo;s internet substrate
          (AWS, Azure, GCP, Meta, Apple). <b>Pale yellow dots</b> are
          the top hundred-plus population metros, sized by how many
          people live there. <b>Cyan halos</b> around each metro suggest
          the CEWP server density (one server per ten humans, peppered
          across where the humans actually are).
        </p>
        <p>
          <b>Yellow particles</b> flowing along orange arcs are bytes
          in the centralized topology: every metro funnels its traffic
          toward its nearest hyperscale facility, which is exactly what
          today&rsquo;s internet does. <b>Cyan particles</b> on shorter
          edges are bytes in CEWP: they travel along the trust graph
          (small-world, with metro locality bias) rather than through
          any central party. The same submarine cables run underneath
          both modes, drawn faintly. Same fiber. Different middle.
        </p>
      </>
    ),
  },
  {
    id: "model",
    q: "The scaling-model math",
    body: (
      <>
        <p>
          The numbers panel reads a steady-state model of the
          federation. For each tier (client, proxy/L0 server, L1
          server) the model computes how much storage that tier holds,
          how much bandwidth it moves per day, and how much CPU it
          burns. Then it multiplies by how many of that tier exist at
          the user count you picked.
        </p>
        <p>
          The load-bearing formula is the same one the Rust toy uses:
        </p>
        <pre className="my-2 overflow-x-auto rounded bg-slate-100 p-3 text-[12px] leading-5 dark:bg-gray-950">
{`effective_R       = trust_radius * trust_multiplier(depth)
daily_admitted    = effective_R * daily_bytes * publishable_cohort
trust_budget      = 0.85 * (disk_budget - own - traces)
retention_days    = trust_budget / daily_admitted
admitted_held     = daily_admitted * retention_days   (capped)
inbound_bw        = daily_admitted + daily_fetch * (1 - cache_hit)
fanout            = 1 + narrow_cohort*4 + wide_cohort*64
outbound_bw       = daily_bytes * fanout`}
        </pre>
        <p>
          Each server only holds bytes from its <i>effective trust
          set</i> (direct trust R, expanded by the recursion depth
          knob via small-world overlap), and only for as long as the
          disk budget allows. There&rsquo;s no archive-vs-cache
          distinction in v0.3; both push and pull terminate at the
          same gate, and bytes that earn demand stay while everything
          else gets evicted when newer or more popular content arrives.
        </p>
        <p>
          Per-server feasibility is checked against three hard gates:
          one terabyte of disk, one gigabit per second of bandwidth
          (which is ten point eight terabytes per day), and one full
          CPU core. The ✓ or ⚠ next to each per-server stat tells you
          whether the scenario fits.
        </p>
      </>
    ),
  },
  {
    id: "sliders",
    q: "What each slider controls",
    body: (
      <>
        <ul className="space-y-2">
          <li>
            <b>Users</b> sets how many people are on the federation. Log
            scale from a thousand to five billion. Federation rollups
            multiply per-server numbers by this.
          </li>
          <li>
            <b>Daily bytes per user</b> is what each person produces in
            a day across all their content. Text scenarios are kilobytes;
            video scenarios are tens of megabytes.
          </li>
          <li>
            <b>Daily fetch bytes per user</b> is what each person
            consumes — reading, watching, scrolling. Drives bandwidth
            and cache pressure.
          </li>
          <li>
            <b>Trust radius (direct R)</b> is how many other people each
            person directly trusts. Around 150 is the Dunbar number.
          </li>
          <li>
            <b>Trust depth (server)</b> is how far past direct trust the
            server walks before admitting content. 0 is strict (direct
            only); 1 means friend-of-friends; 3 starts to feel like the
            open internet. Each hop expands the admittable source set
            by roughly 4x at depth 1, 20x at depth 2, 100x at depth 3.
          </li>
          <li>
            <b>Cache hit rate</b> is the fraction of fetches served from
            local cache. Tight communities give you 85% easily; loose
            global content with long tails sits closer to 30%.
          </li>
          <li>
            <b>Cohort locality</b> moves the cohort_scope distribution
            between local-heavy (mostly self/family/community traffic)
            and global-heavy (most traffic species/planet/federation
            scope). Local-heavy is the CEG locality dividend at work.
          </li>
          <li>
            <b>Server disk budget</b> is the disk each L1 server brings
            to the federation. The retention number falls out of this:
            more disk means content sits longer before eviction.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "locality",
    q: "The CEG locality dividend",
    body: (
      <>
        <p>
          The single most surprising number in the model is that
          something like sixty-five percent of typical activity never
          leaves the metro. That is not a routing optimization. It
          falls out of the wire format itself.
        </p>
        <p>
          In CEG, content that&rsquo;s scoped <code>self</code> or{" "}
          <code>family</code> never emits the{" "}
          <code>holds_bytes:sha256:*</code> attestation that would tell
          the rest of the federation it exists. So no peer can request
          it. So the trust gate is never reached. So the bytes never
          flow.
        </p>
        <p>
          Local content is local because the wire format will not carry
          it. You don&rsquo;t need a privacy policy to keep your family
          photos off Facebook; you can&rsquo;t accidentally publish
          them in the first place. That is what &ldquo;structural&rdquo;
          means in the README&rsquo;s claim that CEWP makes the
          centralized internet&rsquo;s failure modes structurally
          unavailable.
        </p>
      </>
    ),
  },
  {
    id: "engine",
    q: "How the simulation engine relates to this page",
    body: (
      <>
        <p>
          This page is a thin scaffold. It runs the same analytic
          formulas as the Rust toy at{" "}
          <a
            href="https://github.com/CIRISAI/CIRISNodeCore/blob/main/examples/scale_model.rs"
            target="_blank"
            rel="noreferrer"
            className="text-brand-primary underline-offset-2 hover:underline"
          >
            CIRISNodeCore / examples / scale_model.rs
          </a>{" "}
          and draws a hand-picked dataset on the globe. The real CEWP
          simulation engine is a separate Rust workspace specified in{" "}
          <a
            href="https://github.com/CIRISAI/CEWP/blob/main/FSD/SIMULATION_ENGINE.md"
            target="_blank"
            rel="noreferrer"
            className="text-brand-primary underline-offset-2 hover:underline"
          >
            CEWP / FSD / SIMULATION_ENGINE.md
          </a>
          .
        </p>
        <p>
          That engine runs both topologies at the same time over the
          same real-world data: PeeringDB for facilities and IXPs,
          CAIDA for AS-level peering, TeleGeography for submarine
          cables, GeoNames for metro populations. It scales from one
          thousand agents in the browser to five billion at 1:1 on a
          GPU cluster, and emits a snapshot stream in the format the
          rendering layer here already consumes.
        </p>
        <p>
          When that engine lands, the hand-picked dataset gets swapped
          for snapshot frames produced by the engine. The globe stays
          the same; the math gets the full topology underneath.
        </p>
      </>
    ),
  },
  {
    id: "constants",
    q: "Where the per-operation costs come from",
    body: (
      <>
        <p>
          The model is honest about its inputs. Every per-operation
          cost is a measured benchmark from the substrate sister repos,
          not a guess.
        </p>
        <ul className="space-y-1.5 text-[13px]">
          <li>
            <code>hybrid_sign</code> 466 microseconds — Ed25519 +
            ML-DSA-65, from{" "}
            <a
              href="https://github.com/CIRISAI/CIRISVerify/blob/main/docs/BENCHMARKS.md"
              target="_blank"
              rel="noreferrer"
              className="text-brand-primary underline-offset-2 hover:underline"
            >
              CIRISVerify v2.8.0 BENCHMARKS
            </a>
          </li>
          <li>
            <code>hybrid_verify</code> 276 microseconds — same source
          </li>
          <li>
            AES-GCM at 64 KiB blocks: 5.45 GiB/s encrypt, 5.91 GiB/s
            decrypt
          </li>
          <li>
            <code>dispatch_inbound</code> under 400 microseconds from{" "}
            <a
              href="https://github.com/CIRISAI/CIRISEdge/blob/main/docs/BENCHMARKS.md"
              target="_blank"
              rel="noreferrer"
              className="text-brand-primary underline-offset-2 hover:underline"
            >
              CIRISEdge v0.10.0 BENCHMARKS
            </a>
          </li>
          <li>
            Persist row write around 1.5 milliseconds from CIRISPersist
            v3.3.0
          </li>
          <li>
            H3ERE trace per agent decision around 14 kilobytes from{" "}
            <a
              href="https://github.com/CIRISAI/CIRISPersist/blob/main/docs/INTEGRATION_LENS.md"
              target="_blank"
              rel="noreferrer"
              className="text-brand-primary underline-offset-2 hover:underline"
            >
              CIRISPersist INTEGRATION_LENS
            </a>
          </li>
        </ul>
        <p className="mt-3">
          If you build a version of the substrate that is faster or
          slower, the math here moves with it. Nothing is hard-coded
          as a claim about &ldquo;CEWP can do this&rdquo; — it is
          always &ldquo;at these measured costs, the federation looks
          like this.&rdquo;
        </p>
      </>
    ),
  },
  {
    id: "seven",
    q: "The seven repos behind the platform",
    body: (
      <>
        <p>
          CEWP is the platform identity for the seven repos of CIRIS
          Agent 3.0. Each has a specific role; the platform is what
          they become together.
        </p>
        <p>
          <b>Substrate sisters</b> handle bytes, crypto, and transport:{" "}
          <a className="text-brand-primary underline-offset-2 hover:underline" href="https://github.com/CIRISAI/CIRISVerify" target="_blank" rel="noreferrer">CIRISVerify</a>,{" "}
          <a className="text-brand-primary underline-offset-2 hover:underline" href="https://github.com/CIRISAI/CIRISPersist" target="_blank" rel="noreferrer">CIRISPersist</a>,{" "}
          <a className="text-brand-primary underline-offset-2 hover:underline" href="https://github.com/CIRISAI/CIRISEdge" target="_blank" rel="noreferrer">CIRISEdge</a>.
        </p>
        <p>
          <b>Fabric sisters</b> handle federation semantics, detection,
          and spec:{" "}
          <a className="text-brand-primary underline-offset-2 hover:underline" href="https://github.com/CIRISAI/CIRISNodeCore" target="_blank" rel="noreferrer">CIRISNodeCore</a>,{" "}
          <a className="text-brand-primary underline-offset-2 hover:underline" href="https://github.com/CIRISAI/CIRISLensCore" target="_blank" rel="noreferrer">CIRISLensCore</a>,{" "}
          <a className="text-brand-primary underline-offset-2 hover:underline" href="https://github.com/CIRISAI/CIRISRegistry" target="_blank" rel="noreferrer">CIRISRegistry</a>.
        </p>
        <p>
          <b>Agent runtime + unified client</b>:{" "}
          <a className="text-brand-primary underline-offset-2 hover:underline" href="https://github.com/CIRISAI/CIRISAgent" target="_blank" rel="noreferrer">CIRISAgent</a>{" "}
          (the H3ERE reasoning pipeline plus the UI users interact with).
        </p>
        <p>
          All seven cohabit in one process at CIRIS 3.0 deployments. The
          substrate runs on commodity hardware down to a Jetson Orin
          home box and scales to the full internet on roughly one server
          per ten humans. No datacenters required.
        </p>
      </>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <header className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          How this works
        </h2>
        <p className="text-[11px] text-slate-500">
          Open the panels you want. Each is independent.
        </p>
      </header>
      <div className="space-y-2">
        {SECTIONS.map((s) => (
          <details
            key={s.id}
            className="group rounded-md border border-slate-200 bg-slate-50 px-3 py-2 transition open:bg-white dark:border-gray-800 dark:bg-gray-950 dark:open:bg-gray-900"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-1 text-sm font-medium text-slate-800 dark:text-slate-200">
              <span>{s.q}</span>
              <span
                aria-hidden
                className="text-slate-400 transition group-open:rotate-90"
              >
                ›
              </span>
            </summary>
            <div className="mt-2 space-y-2 text-[13px] leading-6 text-slate-700 dark:text-slate-300">
              {s.body}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
