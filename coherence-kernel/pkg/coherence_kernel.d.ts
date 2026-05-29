/* tslint:disable */
/* eslint-disable */

export class CoherenceKernel {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Z height of a band by its 0..5 ordinal.
     */
    static band_z(band: number): number;
    /**
     * Per-graph corridor metric: { k, rho_estimate, k_eff }.
     * Phase 1 heuristic; Phase 2 makes it precise.
     */
    corridor(): any;
    /**
     * Return the laid-out positions as a typed array the JS side can map
     * straight into a Float32Array view of WASM linear memory. Three floats
     * per node, in input order: [x0, y0, z0, x1, y1, z1, ...].
     */
    layout(): Float32Array;
    constructor();
    /**
     * Load a graph from a JSON-serialized GraphInput.
     */
    set_graph(json: string): void;
    /**
     * Number of nodes in the loaded graph.
     */
    readonly node_count: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_coherencekernel_free: (a: number, b: number) => void;
    readonly coherencekernel_band_z: (a: number) => number;
    readonly coherencekernel_corridor: (a: number, b: number) => void;
    readonly coherencekernel_layout: (a: number, b: number) => void;
    readonly coherencekernel_new: () => number;
    readonly coherencekernel_node_count: (a: number) => number;
    readonly coherencekernel_set_graph: (a: number, b: number, c: number, d: number) => void;
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
