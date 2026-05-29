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
     * Composition Policy B — One-hop Transitive Trust.
     * Pinned attesters at full weight, attesters vouched-for by any pinned
     * attester at 0.5 weight, others ignored. Vouches are encoded as edges
     * of kind "vouches_for" between attester nodes.
     */
    policy_b(pinned_attester_ids_json: string, dimension: string): any;
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
