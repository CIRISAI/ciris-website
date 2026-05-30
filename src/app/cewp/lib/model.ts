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
    // server
    const effective_R = s.trust_radius * effectiveTrustSetMultiplier(s.trust_depth_avg);
    const daily_admitted = effective_R * s.daily_bytes * cohortPublishable(s.cohort);
    const traces_in_per_day = effective_R * trace_bytes_per_day * s.trace_publishable_fraction;
    const daily_admitted_plus_traces = daily_admitted + traces_in_per_day;
    const trust_share_of_remaining = 0.85;
    const trust_budget = remaining_budget * trust_share_of_remaining;
    const cache_budget = remaining_budget - trust_budget;
    const effective_days = daily_admitted_plus_traces > 0 ? trust_budget / daily_admitted_plus_traces : 0;
    const admitted_trust_held = Math.min(daily_admitted * effective_days, trust_budget * 0.85);
    const replicated_traces_held = Math.min(traces_in_per_day * effective_days, trust_budget * 0.15);
    const cache_hit_rate = s.cache_hit_rate;
    const inline_fetch = s.daily_fetch_bytes * (1 - s.external_fetch_fraction);
    const cache_inbound = inline_fetch * (1 - cache_hit_rate);
    const cache_held = Math.min(cache_inbound, cache_budget);
    const total_fetch_bw = s.daily_fetch_bytes * (1 - cache_hit_rate);
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

export function feasible(srv: ActorCosts): {
  disk: boolean;
  bandwidth: boolean;
  cpu: boolean;
} {
  return {
    disk: srv.storage_total <= SERVER_DISK_GATE_BYTES,
    bandwidth:
      srv.bandwidth_in_per_day + srv.bandwidth_out_per_day <=
      SERVER_BANDWIDTH_GATE_BYTES_PER_DAY,
    cpu: srv.cpu_seconds_per_day <= SERVER_CPU_GATE_SECONDS_PER_DAY,
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
