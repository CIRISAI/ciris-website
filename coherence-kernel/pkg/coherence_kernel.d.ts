/* tslint:disable */
/* eslint-disable */

export class CoherenceKernel {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Add an edge. Idempotent.
     */
    add_edge(source: string, target: string, kind: string): void;
    /**
     * Z height of a band by its 0..5 ordinal.
     */
    static band_z(band: number): number;
    /**
     * Clear all attester/claim/vote nodes and edges. Keeps the CEG
     * namespace anchors.
     */
    clear_runtime(): void;
    /**
     * Per-graph corridor metric: { k, rho_estimate, k_eff }.
     * Phase 1 heuristic; Phase 2 makes it precise.
     */
    corridor(): any;
    /**
     * Edge geometry export: for each edge, emit the source and target
     * instance indices PLUS the curvature parameter the renderer should
     * use for the paired forward/backward TSVF arc. Curvature binds to
     * the per-edge ρ proxy: tightly-coupled edges (high ρ) draw tightly
     * curved; weakly coupled edges (low ρ) draw straight.
     */
    edge_geometry(): any;
    /**
     * Return per-instance metadata as JSON: [{node_idx, band, node_id}, ...].
     * The JS side uses this to map hover events back to logical nodes
     * (multi-scale nodes share one logical id across bands).
     */
    instance_meta(): any;
    /**
     * Return the laid-out positions as a typed array the JS side can map
     * straight into a Float32Array view of WASM linear memory. Three floats
     * per node-instance. Multi-scale nodes contribute one instance per
     * band; scale-pinned nodes contribute one instance at their band. The
     * JS side reads the matching instance_meta() to know which input node
     * each instance belongs to.
     */
    layout(): Float32Array;
    constructor();
    /**
     * Composition Policy A — Direct Trust.
     * Given a set of pinned attester ids, compute the composed verdict on
     * a dimension: weighted mean of (score × confidence) over claims by
     * pinned attesters, ignoring others.
     */
    policy_a(pinned_attester_ids_json: string, dimension: string): any;
    /**
     * Remove an edge.
     */
    remove_edge(source: string, target: string, kind: string): void;
    /**
     * Load a graph from a JSON-serialized GraphInput.
     */
    set_graph(json: string): void;
    /**
     * Add or replace a node. Returns the input-array index.
     */
    upsert_node(json: string): number;
    /**
     * Total instance count (multi-scale nodes contribute multiple instances).
     */
    readonly instance_count: number;
    /**
     * Number of input nodes in the loaded graph.
     */
    readonly node_count: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_coherencekernel_free: (a: number, b: number) => void;
    readonly coherencekernel_add_edge: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
    readonly coherencekernel_band_z: (a: number) => number;
    readonly coherencekernel_clear_runtime: (a: number) => void;
    readonly coherencekernel_corridor: (a: number, b: number) => void;
    readonly coherencekernel_edge_geometry: (a: number, b: number) => void;
    readonly coherencekernel_instance_count: (a: number) => number;
    readonly coherencekernel_instance_meta: (a: number, b: number) => void;
    readonly coherencekernel_layout: (a: number, b: number) => void;
    readonly coherencekernel_new: () => number;
    readonly coherencekernel_node_count: (a: number) => number;
    readonly coherencekernel_policy_a: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly coherencekernel_remove_edge: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
    readonly coherencekernel_set_graph: (a: number, b: number, c: number, d: number) => void;
    readonly coherencekernel_upsert_node: (a: number, b: number, c: number, d: number) => void;
    readonly __wbindgen_export: (a: number, b: number) => number;
    readonly __wbindgen_export2: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
    readonly __wbindgen_export3: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
