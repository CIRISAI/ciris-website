// Lightweight performance harness for /grammar/explore.
//
// Goals:
//   1. Capture per-mode baselines so optimizations can be measured.
//   2. Surface the right four numbers in real time: fps (avg + p1),
//      kernel build ms, scene draw calls, GPU vertex count.
//   3. Stay cheap when off — instrumentation runs only when ?bench=1
//      is in the URL.
//
// Design rules:
//   - No new deps. The existing R3F + Three already export everything we
//     need (renderer.info, performance.now, requestAnimationFrame).
//   - Ring buffer of frame deltas; no per-frame heap allocation.
//   - All timings in milliseconds, p1 = worst 1%.

const RING = 240; // ~4 seconds at 60fps

export interface BenchSample {
  fpsAvg: number;
  fps_p1: number;       // 1st percentile (worst 1%)
  frameAvg: number;     // ms
  frame_p99: number;    // ms
  drawCalls: number;
  triangles: number;
  lines: number;
  points: number;
  // Kernel pipeline timings — set externally via markKernelPhase().
  kernelBuildMs: number | null;
  kernelLayoutMs: number | null;
  graphNodes: number;
  graphEdges: number;
  graphEdgeGeoms: number;
}

const DEFAULT: BenchSample = {
  fpsAvg: 0,
  fps_p1: 0,
  frameAvg: 0,
  frame_p99: 0,
  drawCalls: 0,
  triangles: 0,
  lines: 0,
  points: 0,
  kernelBuildMs: null,
  kernelLayoutMs: null,
  graphNodes: 0,
  graphEdges: 0,
  graphEdgeGeoms: 0,
};

class PerfHarness {
  enabled = false;
  private buf: Float32Array = new Float32Array(RING);
  private idx = 0;
  private last = 0;
  private listeners = new Set<(s: BenchSample) => void>();
  private current: BenchSample = { ...DEFAULT };

  setEnabled(on: boolean): void {
    this.enabled = on;
    if (!on) this.current = { ...DEFAULT };
  }

  /** Called once per rAF tick from within the R3F frame loop. */
  recordFrame(now: number): void {
    if (!this.enabled) return;
    if (this.last > 0) {
      const dt = now - this.last;
      this.buf[this.idx] = dt;
      this.idx = (this.idx + 1) % RING;
    }
    this.last = now;
  }

  /** Called whenever the renderer info changes (set_graph etc.). */
  recordRendererInfo(info: {
    render: { calls: number; triangles: number; lines: number; points: number };
  }): void {
    if (!this.enabled) return;
    this.current.drawCalls = info.render.calls;
    this.current.triangles = info.render.triangles;
    this.current.lines = info.render.lines;
    this.current.points = info.render.points;
  }

  markGraph(
    nodes: number,
    edges: number,
    edgeGeoms: number,
  ): void {
    if (!this.enabled) return;
    this.current.graphNodes = nodes;
    this.current.graphEdges = edges;
    this.current.graphEdgeGeoms = edgeGeoms;
  }

  markKernelPhase(
    phase: "build" | "layout",
    ms: number,
  ): void {
    if (!this.enabled) return;
    if (phase === "build") this.current.kernelBuildMs = ms;
    if (phase === "layout") this.current.kernelLayoutMs = ms;
  }

  /** Snapshot the ring buffer. Calls subscribers. */
  flush(): BenchSample {
    if (!this.enabled) return DEFAULT;
    const filled: number[] = [];
    for (let i = 0; i < RING; i++) {
      const v = this.buf[i];
      if (v > 0) filled.push(v);
    }
    if (filled.length === 0) {
      // First flush before any frames.
      for (const fn of this.listeners) fn(this.current);
      return this.current;
    }
    const sum = filled.reduce((s, v) => s + v, 0);
    const avg = sum / filled.length;
    const sorted = filled.slice().sort((a, b) => a - b);
    const p99 = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.99))];
    const slowest = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.99))];
    this.current.frameAvg = avg;
    this.current.frame_p99 = p99;
    this.current.fpsAvg = 1000 / Math.max(0.001, avg);
    this.current.fps_p1 = 1000 / Math.max(0.001, slowest);
    for (const fn of this.listeners) fn(this.current);
    return this.current;
  }

  subscribe(fn: (s: BenchSample) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
}

export const perf = new PerfHarness();

// Auto-enable when the URL has ?bench=1 OR localStorage flag is set.
export function isBenchEnabled(): boolean {
  if (typeof window === "undefined") return false;
  const url = new URL(window.location.href);
  if (url.searchParams.get("bench") === "1") return true;
  try {
    return window.localStorage.getItem("ciris-bench") === "1";
  } catch {
    return false;
  }
}
