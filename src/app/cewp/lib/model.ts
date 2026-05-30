// CEWP federation scaling model.
//
// TypeScript port of the load-bearing math from
// CIRISNodeCore/examples/scale_model.rs (v0.3 single-pool, CEG-organic).
// Constants are taken from the substrate-sister benchmark suites cited
// in the original. The web page exposes the knobs as sliders so the
// reader can move from "bootstrap" to "full internet replacement" and
// watch the numbers update live.
//
// What it computes per scenario:
//   - per-actor steady-state (storage, bandwidth, CPU) for client /
//     proxy / server tiers
//   - federation rollup at N users
//   - feasibility gates against 1 TB disk / 1 Gbps / 1 core per server
//
// Everything is pure: no I/O, no allocations on hot path. Cheap enough
// to recompute on every slider tick.

export const KB = 1024;
export const MB = 1024 * KB;
export const GB = 1024 * MB;
export const TB = 1024 * GB;
export const PB = 1024 * TB;
export const EB = 1024 * PB;

// ── Empirical constants ──────────────────────────────────────────
// From CIRISVerify v2.8.0 + CIRISEdge v0.10.0 + CIRISPersist v3.3.0.
export const HYBRID_SIGN_US = 466.0;
export const HYBRID_VERIFY_US = 276.0;
export const DISPATCH_OVERHEAD_US = 120.0;
export const CANONICALIZE_NS_PER_KIB = 250.0;
export const AES_GCM_ENCRYPT_NS_PER_BYTE = 0.175;
export const AES_GCM_DECRYPT_NS_PER_BYTE = 0.161;
export const SCRUB_NS_PER_BYTE = 10.0;
export const H3ERE_TRACE_BYTES_PER_DECISION = 14.0 * KB;

// Per-server feasibility gates (v1 design).
export const SERVER_DISK_GATE_BYTES = 1024 * GB;
export const SERVER_BANDWIDTH_GATE_BYTES_PER_DAY = 10.8 * TB; // ~1 Gbps
export const SERVER_CPU_GATE_SECONDS_PER_DAY = 86_400;
export const STEADY_STATE_UTILIZATION = 0.92;

export type Tier = "client" | "proxy" | "server";

export type CohortDist = {
  self_: number;
  family: number;
  community: number;
  affiliations: number;
  species: number;
  planet: number;
  federation: number;
};

export const COHORT_DEFAULT: CohortDist = {
  self_: 0.50,
  family: 0.15,
  community: 0.15,
  affiliations: 0.10,
  species: 0.05,
  planet: 0.03,
  federation: 0.02,
};

export const COHORT_LOCAL_HEAVY: CohortDist = {
  self_: 0.45,
  family: 0.25,
  community: 0.20,
  affiliations: 0.07,
  species: 0.02,
  planet: 0.005,
  federation: 0.005,
};

export const COHORT_GLOBAL_HEAVY: CohortDist = {
  self_: 0.30,
  family: 0.10,
  community: 0.15,
  affiliations: 0.20,
  species: 0.10,
  planet: 0.08,
  federation: 0.07,
};

// Linear interp between local-heavy, default, global-heavy. The
// slider takes a value in [0, 1]: 0 = local-heavy, 0.5 = default,
// 1 = global-heavy.
export function cohortFromLocality(t: number): CohortDist {
  const lerp = (a: number, b: number, x: number) => a + (b - a) * x;
  if (t <= 0.5) {
    const x = t * 2; // 0..1 within local..default
    return {
      self_: lerp(COHORT_LOCAL_HEAVY.self_, COHORT_DEFAULT.self_, x),
      family: lerp(COHORT_LOCAL_HEAVY.family, COHORT_DEFAULT.family, x),
      community: lerp(COHORT_LOCAL_HEAVY.community, COHORT_DEFAULT.community, x),
      affiliations: lerp(COHORT_LOCAL_HEAVY.affiliations, COHORT_DEFAULT.affiliations, x),
      species: lerp(COHORT_LOCAL_HEAVY.species, COHORT_DEFAULT.species, x),
      planet: lerp(COHORT_LOCAL_HEAVY.planet, COHORT_DEFAULT.planet, x),
      federation: lerp(COHORT_LOCAL_HEAVY.federation, COHORT_DEFAULT.federation, x),
    };
  }
  const x = (t - 0.5) * 2;
  return {
    self_: lerp(COHORT_DEFAULT.self_, COHORT_GLOBAL_HEAVY.self_, x),
    family: lerp(COHORT_DEFAULT.family, COHORT_GLOBAL_HEAVY.family, x),
    community: lerp(COHORT_DEFAULT.community, COHORT_GLOBAL_HEAVY.community, x),
    affiliations: lerp(COHORT_DEFAULT.affiliations, COHORT_GLOBAL_HEAVY.affiliations, x),
    species: lerp(COHORT_DEFAULT.species, COHORT_GLOBAL_HEAVY.species, x),
    planet: lerp(COHORT_DEFAULT.planet, COHORT_GLOBAL_HEAVY.planet, x),
    federation: lerp(COHORT_DEFAULT.federation, COHORT_GLOBAL_HEAVY.federation, x),
  };
}

export function cohortPublishable(c: CohortDist): number {
  return c.community + c.affiliations + c.species + c.planet + c.federation;
}

export function cohortLocalOnly(c: CohortDist): number {
  return c.self_ + c.family;
}

// Effective trust set multiplier as a function of recursion depth.
// Calibrated against small-world / six-degrees research per the toy.
export function effectiveTrustSetMultiplier(depth: number): number {
  if (depth <= 0) return 1.0;
  if (depth <= 1) return 1.0 + depth * 3.0;
  if (depth <= 2) return 4.0 + (depth - 1) * 16.0;
  if (depth <= 3) return 20.0 + (depth - 2) * 80.0;
  return 100.0 * Math.pow(1.5, depth - 3);
}

export type Scenario = {
  n_users: number;
  tier_mix: { client: number; proxy: number; server: number };
  trust_radius: number;
  trust_depth_avg: number;
  daily_bytes: number;
  avg_envelope_bytes: number;
  disk_budget_client: number;
  disk_budget_proxy: number;
  disk_budget_server: number;
  cohort: CohortDist;
  daily_fetch_bytes: number;
  cache_hit_rate: number;
  external_fetch_fraction: number;
  agent_decisions_per_day: number;
  trace_publishable_fraction: number;
};

export type ActorCosts = {
  storage_own: number;
  storage_admitted_trust: number;
  storage_hot_cache: number;
  storage_traces: number;
  storage_total: number;
  storage_utilization: number;
  effective_retention_days: number;
  bandwidth_out_per_day: number;
  bandwidth_in_per_day: number;
  sign_ops_per_day: number;
  verify_ops_per_day: number;
  cpu_seconds_per_day: number;
};

export function perActor(tier: Tier, s: Scenario): ActorCosts {
  const trace_bytes_per_day = s.agent_decisions_per_day * H3ERE_TRACE_BYTES_PER_DECISION;
  const envs_per_day = s.daily_bytes / s.avg_envelope_bytes;
  const trace_envs_per_day = trace_bytes_per_day / s.avg_envelope_bytes;
  const sign_ops_own = envs_per_day + trace_envs_per_day;

  const own_accumulation_cap_days = 3650;
  const storage_own_uncapped = s.daily_bytes * own_accumulation_cap_days;
  const storage_traces_own = trace_bytes_per_day * 365;

  const disk_budget =
    tier === "client" ? s.disk_budget_client : tier === "proxy" ? s.disk_budget_proxy : s.disk_budget_server;
  const usable_budget = disk_budget * STEADY_STATE_UTILIZATION;

  const storage_own = Math.min(storage_own_uncapped, usable_budget * 0.5);
  const storage_traces = Math.min(storage_traces_own, (usable_budget - storage_own) * 0.3);
  const remaining_budget = Math.max(0, usable_budget - storage_own - storage_traces);

  let storage_admitted_trust = 0;
  let storage_hot_cache = 0;
  let in_bps = 0;
  let verify_ops = 0;
  let scrub_extra = 0;
  let fanout = 1.0;
  let effective_retention_days = 0;

  if (tier === "client") {
    const verify_from_fetch = s.daily_fetch_bytes / s.avg_envelope_bytes;
    in_bps = s.daily_fetch_bytes;
    verify_ops = verify_from_fetch;
  } else if (tier === "proxy") {
    const effective_R = s.trust_radius * effectiveTrustSetMultiplier(0);
    const daily_admitted = effective_R * s.daily_bytes * cohortPublishable(s.cohort);
    const trust_share_of_remaining = 0.85;
    const trust_budget = remaining_budget * trust_share_of_remaining;
    const cache_budget = remaining_budget - trust_budget;
    const effective_days = daily_admitted > 0 ? trust_budget / daily_admitted : 0;
    const admitted_trust_held = Math.min(daily_admitted * effective_days, trust_budget);
    const cache_hit_rate = Math.max(0.1, s.cache_hit_rate - 0.1);
    const inline_fetch = s.daily_fetch_bytes * (1 - s.external_fetch_fraction);
    const cache_inbound = inline_fetch * (1 - cache_hit_rate);
    const cache_held = Math.min(cache_inbound, cache_budget);
    verify_ops = (daily_admitted + cache_inbound) / s.avg_envelope_bytes;
    in_bps = daily_admitted + s.daily_fetch_bytes * (1 - cache_hit_rate);
    const wide = s.cohort.species + s.cohort.planet + s.cohort.federation;
    const narrow = s.cohort.community + s.cohort.affiliations;
    fanout = 1 + narrow * 4 + wide * 64;
    storage_admitted_trust = admitted_trust_held;
    storage_hot_cache = cache_held;
    effective_retention_days = effective_days;
  } else {
    // server (L1)
    //
    // A home server serves multiple humans, not one. Each of those
    // humans drags their own trust set + their own fetch load onto
    // the box. The toy's baseline is 10 humans per L1 server (the
    // README's headline); load scales linearly with that ratio so
    // that pushing humans-per-server up visibly stresses the gates.
    const users_per_server = 1 / Math.max(0.001, s.tier_mix.server);
    const BASELINE_USERS_PER_SERVER = 10;
    const load_scale = users_per_server / BASELINE_USERS_PER_SERVER;

    const effective_R = s.trust_radius * effectiveTrustSetMultiplier(s.trust_depth_avg);
    const daily_admitted = effective_R * s.daily_bytes * cohortPublishable(s.cohort) * load_scale;
    const traces_in_per_day = effective_R * trace_bytes_per_day * s.trace_publishable_fraction * load_scale;
    const daily_admitted_plus_traces = daily_admitted + traces_in_per_day;
    const trust_share_of_remaining = 0.85;
    const trust_budget = remaining_budget * trust_share_of_remaining;
    const cache_budget = remaining_budget - trust_budget;
    const effective_days = daily_admitted_plus_traces > 0 ? trust_budget / daily_admitted_plus_traces : 0;
    const admitted_trust_held = Math.min(daily_admitted * effective_days, trust_budget * 0.85);
    const replicated_traces_held = Math.min(traces_in_per_day * effective_days, trust_budget * 0.15);
    const cache_hit_rate = s.cache_hit_rate;
    const inline_fetch = s.daily_fetch_bytes * (1 - s.external_fetch_fraction) * load_scale;
    const cache_inbound = inline_fetch * (1 - cache_hit_rate);
    const cache_held = Math.min(cache_inbound, cache_budget);
    const total_fetch_bw = s.daily_fetch_bytes * (1 - cache_hit_rate) * load_scale;
    verify_ops = (daily_admitted_plus_traces + cache_inbound) / s.avg_envelope_bytes;
    scrub_extra = traces_in_per_day;
    const wide = s.cohort.species + s.cohort.planet + s.cohort.federation;
    const narrow = s.cohort.community + s.cohort.affiliations;
    fanout = 1 + narrow * 4 + wide * 64;
    in_bps = daily_admitted_plus_traces + total_fetch_bw;
    storage_admitted_trust = admitted_trust_held + replicated_traces_held;
    storage_hot_cache = cache_held;
    effective_retention_days = effective_days;
  }

  const outbound = s.daily_bytes * fanout;
  const storage_total = storage_own + storage_admitted_trust + storage_hot_cache + storage_traces;
  const storage_utilization = storage_total / disk_budget;

  const sign_cpu = sign_ops_own * HYBRID_SIGN_US * 1e-6;
  const verify_cpu = verify_ops * HYBRID_VERIFY_US * 1e-6;
  const dispatch_cpu = verify_ops * DISPATCH_OVERHEAD_US * 1e-6;
  const canon_bytes = (sign_ops_own + verify_ops) * s.avg_envelope_bytes;
  const canon_cpu = (canon_bytes / KB) * CANONICALIZE_NS_PER_KIB * 1e-9;
  const scrub_total_bytes = trace_bytes_per_day + scrub_extra;
  const scrub_cpu = scrub_total_bytes * SCRUB_NS_PER_BYTE * 1e-9;
  const encrypt_in = (in_bps + outbound) * 0.5;
  const encrypt_cpu = encrypt_in * AES_GCM_ENCRYPT_NS_PER_BYTE * 1e-9;
  const decrypt_cpu = in_bps * AES_GCM_DECRYPT_NS_PER_BYTE * 1e-9;
  const cpu_total = sign_cpu + verify_cpu + dispatch_cpu + canon_cpu + scrub_cpu + encrypt_cpu + decrypt_cpu;

  return {
    storage_own,
    storage_admitted_trust,
    storage_hot_cache,
    storage_traces,
    storage_total,
    storage_utilization,
    effective_retention_days,
    bandwidth_out_per_day: outbound,
    bandwidth_in_per_day: in_bps,
    sign_ops_per_day: sign_ops_own,
    verify_ops_per_day: verify_ops,
    cpu_seconds_per_day: cpu_total,
  };
}

export type FedRollup = {
  total_storage_bytes: number;
  total_bandwidth_in_bytes_per_day: number;
  total_bandwidth_out_bytes_per_day: number;
  total_verify_ops_per_day: number;
  total_sign_ops_per_day: number;
  aggregate_cpu_cores_full_util: number;
  per_tier: { client: ActorCosts; proxy: ActorCosts; server: ActorCosts };
};

export function rollup(s: Scenario): FedRollup {
  const cli = perActor("client", s);
  const prx = perActor("proxy", s);
  const srv = perActor("server", s);
  const n_cli = s.n_users * s.tier_mix.client;
  const n_prx = s.n_users * s.tier_mix.proxy;
  const n_srv = s.n_users * s.tier_mix.server;
  return {
    total_storage_bytes: n_cli * cli.storage_total + n_prx * prx.storage_total + n_srv * srv.storage_total,
    total_bandwidth_in_bytes_per_day: n_cli * cli.bandwidth_in_per_day + n_prx * prx.bandwidth_in_per_day + n_srv * srv.bandwidth_in_per_day,
    total_bandwidth_out_bytes_per_day: n_cli * cli.bandwidth_out_per_day + n_prx * prx.bandwidth_out_per_day + n_srv * srv.bandwidth_out_per_day,
    total_verify_ops_per_day: n_cli * cli.verify_ops_per_day + n_prx * prx.verify_ops_per_day + n_srv * srv.verify_ops_per_day,
    total_sign_ops_per_day: n_cli * cli.sign_ops_per_day + n_prx * prx.sign_ops_per_day + n_srv * srv.sign_ops_per_day,
    aggregate_cpu_cores_full_util: (n_cli * cli.cpu_seconds_per_day + n_prx * prx.cpu_seconds_per_day + n_srv * srv.cpu_seconds_per_day) / 86_400,
    per_tier: { client: cli, proxy: prx, server: srv },
  };
}

// Feasibility result. `ratio` > 1 means the gate is exceeded by that
// factor; the UI uses it to label "needs 2.3x the bandwidth" rather
// than just a red checkmark. ok is just ratio <= 1 for convenience.
export type GateResult = { ok: boolean; ratio: number };

export type Feasibility = {
  disk: GateResult;
  bandwidth: GateResult;
  cpu: GateResult;
  retention: GateResult;
};

export function feasible(srv: ActorCosts): Feasibility {
  const bw = srv.bandwidth_in_per_day + srv.bandwidth_out_per_day;
  // Retention: if the trust pool churns faster than a day or two, the
  // server is mostly a pass-through cache and the federation has lost
  // the persistence the trust gate was supposed to give it. Floor at
  // 2 days as "ok"; under that, we mark a soft failure.
  const RETENTION_FLOOR_DAYS = 2.0;
  return {
    disk: {
      ok: srv.storage_total <= SERVER_DISK_GATE_BYTES,
      ratio: srv.storage_total / SERVER_DISK_GATE_BYTES,
    },
    bandwidth: {
      ok: bw <= SERVER_BANDWIDTH_GATE_BYTES_PER_DAY,
      ratio: bw / SERVER_BANDWIDTH_GATE_BYTES_PER_DAY,
    },
    cpu: {
      ok: srv.cpu_seconds_per_day <= SERVER_CPU_GATE_SECONDS_PER_DAY,
      ratio: srv.cpu_seconds_per_day / SERVER_CPU_GATE_SECONDS_PER_DAY,
    },
    retention: {
      ok: srv.effective_retention_days >= RETENTION_FLOOR_DAYS,
      ratio: RETENTION_FLOOR_DAYS / Math.max(0.01, srv.effective_retention_days),
    },
  };
}

// ── Latency estimate ────────────────────────────────────────────
//
// A first-order latency model parameterized by the same slider
// inputs that drive storage and bandwidth. Numbers come from
// measured residential ISP RTTs, CDN edge cache RTTs, and great-
// circle backbone delays — not from the substrate benchmarks. They
// shift with the sliders so the reader can see the cache and
// locality dividends as time savings, not just bytes.
//
// CEWP path:
//   - cache hit → reply from same box / metro: a few ms
//   - cache miss, local cohort (self/family/community): metro hop
//   - regional cohort (affiliations): same continent
//   - global cohort (species/planet/federation): cross-ocean
//   - trust depth > 0 adds friend-of-friends resolution hops
//
// Centralized path:
//   - cache hit at CDN edge: low (still TLS + auth)
//   - cache miss: origin round trip through hyperscale facility
const L_CACHE_LOCAL_MS = 2;
const L_LOCAL_HOP_MS = 18;
const L_REGIONAL_MS = 55;
const L_GLOBAL_MS = 195;
const L_TRUST_HOP_MS = 14;
const L_CDN_EDGE_MS = 28;
const L_ORIGIN_FETCH_MS = 180;

export type LatencyEstimate = {
  cewp_p50_ms: number;
  internet_p50_ms: number;
  // Breakdown for the panel.
  cewp_breakdown: {
    from_cache_ms: number;
    from_local_ms: number;
    from_regional_ms: number;
    from_global_ms: number;
    trust_hop_penalty_ms: number;
  };
};

// ── Environmental footprint ────────────────────────────────────
//
// Replaces an earlier "50W per L1 home server" constant that
// quietly assumed a single dedicated box class. The honest unit is
// idle_W * marginal_share * device_count per device class, summed
// across the fleet. Most CEWP participation rides hardware that's
// already on for other reasons (phones, laptops) — those contribute
// sub-watt marginal power and zero net-new buildout. The L1 always-
// on sliver (ARM boxes, home x86) is where the real new-hardware
// power lives, and it is small because most metros only need a
// handful of always-on servers to anchor the trust graph.
//
// The page can also show a hyperscale efficiency premium so a
// reader sees what happens when CEWP pays the commodity-vs-custom
// penalty — and whether the win still holds.
//
// Numbers and sources — all rough, uncertainty bars are wide. The
// page shows the math so anyone can disagree with the inputs.
//
//   TODAY_DC_COUNT_AT_5B = 10_000.
//     SemiAnalysis 2024 DC census: ~10K facilities ("hyperscale +
//     edge + colocation"). Scale linearly with user slider.
//
//   HYPERSCALE_DC_AVG_MW = 5.
//     Weighted average across the 10K facility population. True
//     hyperscale campuses run 20-50 MW; edge and colocation are
//     1-10 MW. Calibrated so the model reproduces IEA's 2024 global
//     DC electricity estimate (~415 TWh/yr) when n_users = 5B.
//
//   GRID_CO2_KG_PER_KWH = 0.4.
//     IEA global average 2023. Regions: ~0.05 (Iceland), ~0.9
//     (coal-heavy India).
//
//   HOURS_PER_YEAR = 8760.
//
//   HOME_SERVER_W = 50.
//     ARM SoC + 1 TB SSD continuous draw.
//
//   L0_PROXY_ATTRIBUTABLE_W = 4.
//     Most of a phone's or laptop's power goes to what the human is
//     doing on the device. We count only the marginal substrate share.
//
//   EXTRACTION_OVERHEAD = 0.40.
//     Rough estimate of compute on today's substrate that goes to
//     value extraction: ad targeting, recommender training,
//     surveillance analytics, A/B test platforms. Anchors are
//     several wide ranges:
//       - Sandvine 2024: recommender-driven traffic dominates.
//       - SemiAnalysis ML breakdowns at large ad-funded platforms
//         show 30-50% of accelerator hours on personalization /
//         targeting workloads.
//       - Reported AI training shares at Meta/Google ad businesses.
//     30-50% is a defensible band across platforms; 40% midpoint.
//     CEWP removes this layer architecturally.
//
// The central bet: CEWP makes far better use of the world's existing
// hardware by removing the value-extraction layer. Today's substrate
// burns a large share of its compute on ads, recommenders, and
// surveillance, plus needs dedicated facilities to host them. CEWP
// folds into hardware that already exists in homes and pockets, and
// every joule it does spend goes to the user's actual task.

export const GRID_CO2_KG_PER_KWH = 0.4;
export const HOURS_PER_YEAR = 8760;
export const HYPERSCALE_DC_AVG_MW = 5;
export const TODAY_DC_COUNT_AT_5B = 10_000;
export const DC_FLOOR = 100;

// ── Device class table ─────────────────────────────────────────
//
// Each spec has:
//   idle_W           — typical continuous idle floor
//   marginal_share   — fraction of that power attributable to the
//                      substrate vs whatever else the device is doing.
//                      A phone serving as a CEWP client costs ~5%
//                      of its idle draw, not 100%.
//   always_on        — does it stay reachable (no sleep, no NAT)?
//                      Phones and laptops do not; ARM mini-PCs do.
//   efficiency_factor— useful-work-per-watt vs the hyperscale baseline
//                      of 1.0. Commodity SoCs at low utilization are
//                      worse than a custom-silicon facility with PUE 1.1
//                      and pooled cooling. Numbers are best-of-breed
//                      estimates with wide error bars.
//   net_new          — does taking on a CEWP role require buying a
//                      new device? Phones / laptops / old desktops
//                      don't; dedicated boxes do.

export type DeviceClass =
  | "phone"
  | "laptop"
  | "arm_box"
  | "home_x86"
  | "old_desktop";

export type DeviceSpec = {
  label: string;
  idle_W: number;
  marginal_share: number;
  always_on: boolean;
  efficiency_factor: number;
  net_new: boolean;
};

export const DEVICE_SPECS: Record<DeviceClass, DeviceSpec> = {
  phone:       { label: "phone",        idle_W: 2.5, marginal_share: 0.05, always_on: false, efficiency_factor: 0.5, net_new: false },
  laptop:      { label: "laptop",       idle_W: 10,  marginal_share: 0.10, always_on: false, efficiency_factor: 0.4, net_new: false },
  arm_box:     { label: "ARM mini-PC",  idle_W: 5,   marginal_share: 1.00, always_on: true,  efficiency_factor: 0.6, net_new: true  },
  home_x86:    { label: "home x86",     idle_W: 25,  marginal_share: 1.00, always_on: true,  efficiency_factor: 0.4, net_new: true  },
  old_desktop: { label: "old desktop",  idle_W: 60,  marginal_share: 1.00, always_on: true,  efficiency_factor: 0.2, net_new: false },
};

// A tier's device composition. Fractions sum to 1.0.
export type DeviceMix = Partial<Record<DeviceClass, number>>;

// Fleet presets. The slider on the page picks a style; each style
// describes the device mix for the always-on L1 server tier (the
// only tier where device class actually moves the bill). Clients
// and proxies are mostly phones in every style; phones don't appear
// in the L1 mix because they're poor at always-on reachability
// (sleep, cellular NAT), so phone-as-server is held at a small
// share even in the phone-first style.
export type FleetStyle = "phone_first" | "realistic" | "homelab";

export const FLEET_PRESETS: Record<FleetStyle, {
  label: string;
  description: string;
  client_mix: DeviceMix;
  proxy_mix: DeviceMix;
  server_mix: DeviceMix;
}> = {
  phone_first: {
    label: "Phone-first",
    description: "Most of the fleet rides hardware that's already on. L1 server slice runs on ARM mini-PCs; very few dedicated x86 boxes.",
    client_mix: { phone: 0.95, laptop: 0.05 },
    proxy_mix:  { phone: 0.70, laptop: 0.30 },
    server_mix: { phone: 0.05, laptop: 0.15, arm_box: 0.70, home_x86: 0.05, old_desktop: 0.05 },
  },
  realistic: {
    label: "Realistic 2026",
    description: "What you'd see today: phones for clients and proxies; L1 is a mix of dedicated ARM boxes, laptops left on, and some x86 home servers.",
    client_mix: { phone: 0.85, laptop: 0.15 },
    proxy_mix:  { phone: 0.50, laptop: 0.40, arm_box: 0.10 },
    server_mix: { phone: 0.05, laptop: 0.20, arm_box: 0.40, home_x86: 0.25, old_desktop: 0.10 },
  },
  homelab: {
    label: "Homelab",
    description: "Dedicated home servers everywhere. Worst case for net-new buildout and per-watt efficiency.",
    client_mix: { phone: 0.70, laptop: 0.30 },
    proxy_mix:  { phone: 0.30, laptop: 0.40, arm_box: 0.30 },
    server_mix: { laptop: 0.10, arm_box: 0.30, home_x86: 0.45, old_desktop: 0.15 },
  },
};

export type Footprint = {
  datacenters: number;
  power_MW: number;
  electricity_TWh_per_year: number;
  co2_Mt_per_year: number;
  /** Substrate power spent on hardware that exists for other reasons too. */
  marginal_power_MW: number;
  /** Substrate power on net-new dedicated hardware. */
  new_buildout_power_MW: number;
  /** Useful work delivered per watt, in arbitrary units relative to
   *  the hyperscale baseline (1.0). For CEWP this is the weighted
   *  average device efficiency factor; for the internet column it's
   *  always 1.0. */
  useful_work_per_watt: number;
  /** Breakdown for the show-the-math panel. */
  by_class?: Array<{ cls: DeviceClass; count: number; power_MW: number; net_new: boolean }>;
};

function envelope(power_MW: number) {
  const electricity_TWh = (power_MW * 1000 * HOURS_PER_YEAR) / 1e9;
  const co2_Mt = electricity_TWh * GRID_CO2_KG_PER_KWH;
  return { electricity_TWh, co2_Mt };
}

export function internetFootprint(s: Scenario): Footprint {
  const dcs = Math.max(DC_FLOOR, (s.n_users / 5e9) * TODAY_DC_COUNT_AT_5B);
  const power_MW = dcs * HYPERSCALE_DC_AVG_MW;
  const { electricity_TWh, co2_Mt } = envelope(power_MW);
  return {
    datacenters: dcs,
    power_MW,
    electricity_TWh_per_year: electricity_TWh,
    co2_Mt_per_year: co2_Mt,
    marginal_power_MW: 0,             // hyperscale serves only the substrate
    new_buildout_power_MW: power_MW,  // every facility is dedicated
    useful_work_per_watt: 1.0,        // baseline
  };
}

function tierPower(count: number, mix: DeviceMix) {
  let power_MW = 0;
  let marginal_MW = 0;
  let new_buildout_MW = 0;
  let weighted_efficiency = 0;
  let mix_sum = 0;
  const by_class: Footprint["by_class"] = [];
  for (const cls of Object.keys(DEVICE_SPECS) as DeviceClass[]) {
    const frac = mix[cls] ?? 0;
    if (frac <= 0) continue;
    const spec = DEVICE_SPECS[cls];
    const tier_count = count * frac;
    const tier_W = tier_count * spec.idle_W * spec.marginal_share;
    const tier_MW = tier_W / 1e6;
    power_MW += tier_MW;
    if (spec.marginal_share < 1.0 || !spec.net_new) marginal_MW += tier_MW;
    if (spec.net_new && spec.marginal_share >= 0.5) new_buildout_MW += tier_MW;
    weighted_efficiency += frac * spec.efficiency_factor;
    mix_sum += frac;
    by_class.push({ cls, count: tier_count, power_MW: tier_MW, net_new: spec.net_new });
  }
  const efficiency = mix_sum > 0 ? weighted_efficiency / mix_sum : 1.0;
  return { power_MW, marginal_MW, new_buildout_MW, efficiency, by_class };
}

export function cewpFootprint(s: Scenario, style: FleetStyle = "realistic"): Footprint {
  const preset = FLEET_PRESETS[style];
  const n_cli = s.n_users * s.tier_mix.client;
  const n_prx = s.n_users * s.tier_mix.proxy;
  const n_srv = s.n_users * s.tier_mix.server;
  const cli = tierPower(n_cli, preset.client_mix);
  const prx = tierPower(n_prx, preset.proxy_mix);
  const srv = tierPower(n_srv, preset.server_mix);
  const power_MW = cli.power_MW + prx.power_MW + srv.power_MW;
  const marginal_MW = cli.marginal_MW + prx.marginal_MW + srv.marginal_MW;
  const new_buildout_MW = cli.new_buildout_MW + prx.new_buildout_MW + srv.new_buildout_MW;
  // Weight efficiency by power share so the L1 box (the largest
  // share of new-build power) dominates the headline number.
  const efficiency =
    power_MW > 0
      ? (cli.efficiency * cli.power_MW +
          prx.efficiency * prx.power_MW +
          srv.efficiency * srv.power_MW) /
        power_MW
      : 1.0;
  const { electricity_TWh, co2_Mt } = envelope(power_MW);
  return {
    datacenters: 0,
    power_MW,
    electricity_TWh_per_year: electricity_TWh,
    co2_Mt_per_year: co2_Mt,
    marginal_power_MW: marginal_MW,
    new_buildout_power_MW: new_buildout_MW,
    useful_work_per_watt: efficiency,
    by_class: [...cli.by_class!, ...prx.by_class!, ...srv.by_class!].filter(
      (x) => x.power_MW > 0,
    ),
  };
}

export function estimateLatency(s: Scenario): LatencyEstimate {
  const cache = s.cache_hit_rate;
  const miss = 1 - cache;
  // For CEWP, cohort_scope determines where a missed fetch is sourced
  // from. self/family stay local; community is metro; affiliations
  // are continent-scope; species+ is global.
  const localScope = s.cohort.self_ + s.cohort.family + s.cohort.community;
  const regionalScope = s.cohort.affiliations;
  const globalScope = s.cohort.species + s.cohort.planet + s.cohort.federation;
  const trustHop = s.trust_depth_avg * L_TRUST_HOP_MS;

  // Locality penalty for sparser server-to-population ratios. At the
  // baseline of 10 humans per L1 server, the closest server is in your
  // building / block. At 100 / 1000, it's farther away. Adds ~5 ms
  // per decade above the baseline.
  const usersPerServer = 1 / Math.max(0.001, s.tier_mix.server);
  const sparsenessPenalty =
    Math.max(0, Math.log10(usersPerServer / 10)) * 5;

  const from_cache_ms = cache * L_CACHE_LOCAL_MS;
  const from_local_ms = miss * localScope * (L_LOCAL_HOP_MS + sparsenessPenalty);
  const from_regional_ms = miss * regionalScope * L_REGIONAL_MS;
  const from_global_ms = miss * globalScope * L_GLOBAL_MS;
  const trust_hop_penalty_ms = miss * trustHop;
  const cewp = from_cache_ms + from_local_ms + from_regional_ms + from_global_ms + trust_hop_penalty_ms;

  // Centralized: cache_hit_rate here is the rough CDN edge hit rate.
  // Misses traverse the hyperscale origin path.
  const internet = cache * L_CDN_EDGE_MS + miss * L_ORIGIN_FETCH_MS;

  return {
    cewp_p50_ms: cewp,
    internet_p50_ms: internet,
    cewp_breakdown: {
      from_cache_ms,
      from_local_ms,
      from_regional_ms,
      from_global_ms,
      trust_hop_penalty_ms,
    },
  };
}

// ── Preset scenarios (subset; the page exposes sliders). ────────
export const PRESETS = {
  bootstrap: (): Scenario => ({
    n_users: 10_000,
    tier_mix: { client: 0.30, proxy: 0.65, server: 0.05 },
    trust_radius: 50, trust_depth_avg: 1,
    daily_bytes: 20 * KB, avg_envelope_bytes: 1.5 * KB,
    disk_budget_client: 32 * GB, disk_budget_proxy: 256 * GB, disk_budget_server: 1 * TB,
    cohort: COHORT_DEFAULT,
    daily_fetch_bytes: 5 * MB, cache_hit_rate: 0.5, external_fetch_fraction: 0,
    agent_decisions_per_day: 20, trace_publishable_fraction: 0.15,
  }),
  dunbar: (): Scenario => ({
    n_users: 1_000_000,
    tier_mix: { client: 0.40, proxy: 0.55, server: 0.05 },
    trust_radius: 150, trust_depth_avg: 1,
    daily_bytes: 50 * KB, avg_envelope_bytes: 1.5 * KB,
    disk_budget_client: 64 * GB, disk_budget_proxy: 256 * GB, disk_budget_server: 1 * TB,
    cohort: COHORT_DEFAULT,
    daily_fetch_bytes: 50 * MB, cache_hit_rate: 0.6, external_fetch_fraction: 0,
    agent_decisions_per_day: 50, trace_publishable_fraction: 0.15,
  }),
  full_internet: (): Scenario => ({
    n_users: 5_000_000_000,
    tier_mix: { client: 0.35, proxy: 0.55, server: 0.10 },
    trust_radius: 250, trust_depth_avg: 1,
    daily_bytes: 50 * MB, avg_envelope_bytes: 50 * KB,
    disk_budget_client: 256 * GB, disk_budget_proxy: 256 * GB, disk_budget_server: 1 * TB,
    cohort: COHORT_DEFAULT,
    daily_fetch_bytes: 1 * GB, cache_hit_rate: 0.6, external_fetch_fraction: 0,
    agent_decisions_per_day: 200, trace_publishable_fraction: 0.10,
  }),
  full_internet_with_video: (): Scenario => ({
    n_users: 5_000_000_000,
    tier_mix: { client: 0.35, proxy: 0.55, server: 0.10 },
    trust_radius: 250, trust_depth_avg: 1,
    daily_bytes: 11 * MB, avg_envelope_bytes: 50 * KB,
    disk_budget_client: 256 * GB, disk_budget_proxy: 256 * GB, disk_budget_server: 1 * TB,
    cohort: COHORT_DEFAULT,
    daily_fetch_bytes: 1700 * MB, cache_hit_rate: 0.55, external_fetch_fraction: 0.88,
    agent_decisions_per_day: 200, trace_publishable_fraction: 0.10,
  }),
};

// ── Display helpers ─────────────────────────────────────────────
export function fmtBytes(b: number): string {
  if (b >= EB) return `${(b / EB).toFixed(2)} EB`;
  if (b >= PB) return `${(b / PB).toFixed(2)} PB`;
  if (b >= TB) return `${(b / TB).toFixed(2)} TB`;
  if (b >= GB) return `${(b / GB).toFixed(2)} GB`;
  if (b >= MB) return `${(b / MB).toFixed(2)} MB`;
  if (b >= KB) return `${(b / KB).toFixed(2)} KB`;
  return `${b.toFixed(0)} B`;
}

export function fmtCount(c: number): string {
  if (c >= 1e12) return `${(c / 1e12).toFixed(2)} T`;
  if (c >= 1e9) return `${(c / 1e9).toFixed(2)} B`;
  if (c >= 1e6) return `${(c / 1e6).toFixed(2)} M`;
  if (c >= 1e3) return `${(c / 1e3).toFixed(2)} K`;
  return c.toFixed(0);
}
