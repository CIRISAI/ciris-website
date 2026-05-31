// WhyCewp — "Why CEWP? What about other decentralized projects?"
//
// Lifted from the CIRISConformance prior-art / SOTA comparison set
// (reference/comparison/01..04). The framing is the source's own:
// CEWP isn't claiming head-to-head wins against IPFS / Filecoin /
// Mastodon / Bluesky / Nostr / Solid. It's the *unification* of
// identity-aware byte storage, portable cryptographic identity,
// trust-graph governance, and AI participation on one substrate —
// and it composes with the prior art rather than replacing it.
//
// Each panel names where the field is genuinely better, per the
// source docs' "honest peer-strength admission" sections.

const CONFORMANCE_BLOB =
  "https://github.com/CIRISAI/CIRISConformance/blob/main/reference/comparison";

type Row = { peer: string; what_they_do: string; what_cewp_adds: string };

type Panel = {
  id: string;
  title: string;
  cewp_says: string;
  rows: Row[];
  honest_admission: string;
  source: string;
};

const PANELS: Panel[] = [
  {
    id: "storage",
    title: "Decentralized storage",
    cewp_says:
      "Identity-aware bytes plus per-actor eviction at the storage substrate. The combination is the property the field has not unified — IPFS is anonymous, Filecoin is contract-bound (eviction by design rejected), Hypercore and SSB carry feed-level identity but not byte-level author attribution. CEWP welds attribution and eviction into one primitive, and composes with the rest as a backing tier.",
    rows: [
      { peer: "IPFS / Kubo", what_they_do: "Anonymous content-addressing, LRU watermark GC", what_cewp_adds: "Identity-aware bytes + trust-driven admission + per-actor evict" },
      { peer: "Filecoin / Sia", what_they_do: "Contract-bound durability, slashing for drops", what_cewp_adds: "Federation of mutually-attesting peers; trust changes over time" },
      { peer: "Iroh / iroh-blobs", what_they_do: "Content-addressed blobs over QUIC, node identity (NodeId)", what_cewp_adds: "Author-of-byte attribution across the node boundary" },
      { peer: "Hypercore / Holepunch", what_they_do: "Feed-level identity, feed-level eviction", what_cewp_adds: "Byte-level identity across feeds" },
      { peer: "SSB (Scuttlebutt)", what_they_do: "Feed-level identity, gossip replication", what_cewp_adds: "Blob attribution decoupled from feed" },
      { peer: "Storj", what_they_do: "Erasure-coded durability with satellite coordination", what_cewp_adds: "Identity-tied recourse vs the satellite trust model" },
      { peer: "Freenet / Tor", what_they_do: "Anonymity by design", what_cewp_adds: "Identity-aware governance (anonymous content stays self-hosted via the locality dividend)" },
    ],
    honest_admission:
      "Erasure-coded durability at rest is a Storj/Filecoin strength CEWP v1 does not match. Paid-contract keep-guarantees are something CEWP deliberately does not offer. Maximal anonymity is what Freenet / Tor / IPFS-over-Tor are for; CEWP v1 is identity-aware by design.",
    source: "01_storage_replication.md",
  },
  {
    id: "federated",
    title: "Federated web and portable identity",
    cewp_says:
      "Self-held federation key (Ed25519 + ML-DSA-65) with post-quantum longevity and hardware rooting on mobile. The trust graph is computed over the key. Closest to Nostr or SSB (self-held key, no administrative root) but adds PQC, hardware rooting, and substrate-level trust computation — and the same wire format carries AI agents as first-class participants on the same substrate.",
    rows: [
      { peer: "ActivityPub / Mastodon", what_they_do: "Instance-bound identity (@user@instance); move means new actor URI", what_cewp_adds: "Self-held key; works across deployments" },
      { peer: "Bluesky / AT Protocol", what_they_do: "Portable DID, PDS data, composable labelers", what_cewp_adds: "PQC key longevity, trust as wire-format primitive" },
      { peer: "Nostr", what_they_do: "Raw secp256k1, fully portable, dumb relays", what_cewp_adds: "Native trust computation; reconsideration is structural" },
      { peer: "Solid (W3C)", what_they_do: "WebID + data pod, pod-portable", what_cewp_adds: "Self-held key (not a DNS URI); native trust + AI governance" },
      { peer: "SSB (social)", what_they_do: "Ed25519 feed key, gossip", what_cewp_adds: "Federation-wide trust + PQC + multi-transport" },
    ],
    honest_admission:
      "ActivityPub (millions), Bluesky (tens of millions) and Nostr are deployed at scale today; CEWP v1 is shipping, not at that scale. Nostr's 'dumb relays plus signed events' is radically simpler to implement than CEG's 18-section grammar. Bluesky's custom-feed / labeler marketplace is a mature composability surface.",
    source: "03_federated_web_identity.md",
  },
  {
    id: "alignment",
    title: "AI governance and alignment",
    cewp_says:
      "Alignment as runtime epistemic governance with cryptographic accountability — every load-bearing claim is a signed wire artifact, trust is computed from the attestation graph, misaligned actions become slashable, and reconsideration is first-class. Not a replacement for training-time alignment; a complementary surface the field structurally lacks.",
    rows: [
      { peer: "RLHF / Constitutional AI", what_they_do: "Align at training time", what_cewp_adds: "Runtime accountability; recourse post-deployment" },
      { peer: "Scalable oversight", what_they_do: "AI assists humans evaluating AI", what_cewp_adds: "Cryptographic accountability surface; oversight is checkable" },
      { peer: "Mechanistic interpretability", what_they_do: "Understand model internals", what_cewp_adds: "Governance system over emitted claims" },
      { peer: "EU AI Act / regulation", what_they_do: "Set rules, require compliance", what_cewp_adds: "Substrate to enforce: attestation chains, not text documents" },
      { peer: "Web3-AI", what_they_do: "Decentralize compute / model access", what_cewp_adds: "Governs reasoning and outputs, not just access" },
    ],
    honest_admission:
      "Training-time methods shape capability and disposition before the model emits a token — against a competently-misaligned system, post-hoc sanction is a weaker lever than having shaped the disposition. Mech-interp can catch deceptive cognition that never surfaces as a flawed epistemic claim, which is CEWP's blind spot. Centralized labs ship faster on frontier capability and first-pass safety tuning. The two layers are complementary, not substitutable.",
    source: "02_ai_governance_alignment.md",
  },
  {
    id: "crypto",
    title: "Cryptographic transparency",
    cewp_says:
      "Hybrid Ed25519 + ML-DSA-65 on every wire artifact; Merkle-anchored transparency log on the registry side. Hybrid post-quantum KEX (X25519 + ML-KEM-768) shipped in CIRISVerify 4.6.0 for federation transport — harvest-now-decrypt-later vulnerability closed. Composes with Sigstore / Certificate Transparency / KT rather than replacing them.",
    rows: [
      { peer: "Sigstore / Rekor", what_they_do: "Signed software supply chain with transparency log", what_cewp_adds: "Same shape over every federation claim, not just artifacts" },
      { peer: "Certificate Transparency", what_they_do: "Append-only log for CA-issued certs", what_cewp_adds: "Per-key federation log; transparency as substrate primitive" },
      { peer: "Trillian / Key Transparency", what_they_do: "Verifiable map for identity-to-key bindings", what_cewp_adds: "Key bindings live in the same trust-graph the governance reads" },
    ],
    honest_admission:
      "Sigstore is the deployed best-practice for software signing; CEWP is not trying to displace it for that use case. Certificate Transparency operates at the global web PKI scale CEWP doesn't aim at. KT addresses a tighter problem (key transparency for messaging) with a more mature deployment story.",
    source: "04_crypto_transparency.md",
  },
];

export default function WhyCewp() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <header className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
          Why CEWP
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          What about other decentralized projects?
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          CEWP is not claiming to beat IPFS at storage, Bluesky at
          social, or Constitutional AI at alignment. It is the
          unification: one substrate where the same cryptographic
          accountability property serves decentralized storage,
          portable identity, runtime governance, and AI participation
          at the same time. The prior art shows up as backing tiers
          and complementary layers, not as replaced competitors.
        </p>
      </header>

      {/* The load-bearing claim, surfaced not buried. */}
      <div className="mb-4 rounded-md border-l-4 border-teal-400 bg-teal-50/70 p-3 text-sm leading-6 text-slate-800 dark:bg-teal-950/30 dark:text-slate-200">
        <p className="font-semibold">
          The property the field has not unified
        </p>
        <p className="mt-1">
          Identity-aware bytes at the storage layer{" "}
          <i>plus</i> per-actor eviction as a substrate primitive.
          Closest analogs are SSB and Hypercore (feed-level), Iroh
          (node-level), and Mastodon (object-level at the application
          layer). None do it byte-level at the substrate. CEWP welds
          attribution and eviction into{" "}
          <code className="rounded bg-slate-100 px-1 dark:bg-gray-800">
            put_blob_signing
          </code>{" "}
          — which is what makes trust-driven admission and the
          popularity-times-freshness eviction discipline work at
          internet scale on commodity hardware, and the same property
          is what makes the AI-governance layer enforceable.
        </p>
      </div>

      {/* Progressive-disclosure panels, one per comparison domain. */}
      <div className="space-y-2">
        {PANELS.map((p) => (
          <details
            key={p.id}
            className="group rounded-md border border-slate-200 bg-slate-50 px-3 py-2 transition open:bg-white dark:border-gray-800 dark:bg-gray-950 dark:open:bg-gray-900"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
              <span>{p.title}</span>
              <span aria-hidden className="text-slate-400 transition group-open:rotate-90">
                ›
              </span>
            </summary>
            <div className="mt-3 space-y-3 text-[13px] leading-6 text-slate-700 dark:text-slate-300">
              <p>{p.cewp_says}</p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wide text-slate-500">
                      <th className="py-1.5 pr-3">Peer system</th>
                      <th className="py-1.5 pr-3">What it does</th>
                      <th className="py-1.5 pr-3 text-teal-700 dark:text-teal-300">
                        What CEWP adds
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.rows.map((r) => (
                      <tr
                        key={r.peer}
                        className="border-t border-slate-200 align-top dark:border-gray-800"
                      >
                        <td className="py-1.5 pr-3 font-semibold text-slate-800 dark:text-slate-200">
                          {r.peer}
                        </td>
                        <td className="py-1.5 pr-3 text-slate-600 dark:text-slate-400">
                          {r.what_they_do}
                        </td>
                        <td className="py-1.5 pr-3 text-teal-700 dark:text-teal-300">
                          {r.what_cewp_adds}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="rounded-md border border-amber-300 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/30">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
                  Where the prior art is genuinely better
                </p>
                <p className="mt-1 text-[13px] text-amber-900 dark:text-amber-100">
                  {p.honest_admission}
                </p>
              </div>
              <p className="text-[11px] italic text-slate-500">
                Source:{" "}
                <a
                  href={`${CONFORMANCE_BLOB}/${p.source}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-primary underline-offset-2 hover:underline"
                >
                  CIRISConformance / reference / comparison / {p.source}
                </a>
              </p>
            </div>
          </details>
        ))}
      </div>

      <p className="mt-4 text-[12px] italic text-slate-500">
        Full prior-art set lives at{" "}
        <a
          href="https://github.com/CIRISAI/CIRISConformance/tree/main/reference/comparison"
          target="_blank"
          rel="noreferrer"
          className="text-brand-primary underline-offset-2 hover:underline"
        >
          CIRISAI / CIRISConformance / reference / comparison
        </a>
        . Each substrate sister also carries a focused per-layer SOTA
        doc (Verify covers PQC, attestation; Edge covers transport and
        wire format).
      </p>
    </section>
  );
}
