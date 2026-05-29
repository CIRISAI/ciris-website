"use client";

// AlephScene — Phase 2.5 rewrite.
//
// Architecture per the agent's research notes:
//   - One InstancedMesh per node group (primitive / family / component /
//     prefix / attester / claim). Scales linearly with node count and gives
//     us a single draw call per group.
//   - One LineSegments mesh for all forward TSVF arcs, one for all backward.
//     Replaces the per-edge BufferGeometry + per-edge useMemo that was
//     allocating O(edges) geometries on every state change.
//   - frameloop="demand" + invalidate() on input change. Stops the GPU
//     spinning at idle and prevents React/Three contention.
//   - Hover via Raycaster on the InstancedMesh, returning instanceId. One
//     pointer event per move, not per node.
//   - Stable scene structure: only attribute updates between renders.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type {
  KernelGraph,
  KernelNode,
  InstanceMeta,
  EdgeGeom,
} from "./AlephView";
import { nodeColor } from "./AlephView";
import { iconForNode, familyBadgeForNode } from "../lib/icons";

const BAND_LABELS = [
  "key",
  "occurrence",
  "agent",
  "fleet",
  "cell",
  "federation",
];
const BAND_Z = [0.2, 0.36, 0.52, 0.68, 0.84, 1.0];

// Per-group base sphere size. InstancedMesh uses a unit-sphere geometry and
// scales each instance via setMatrixAt; these are the per-group scale
// factors.
const GROUP_SIZE: Record<string, number> = {
  primitive: 0.05,
  family: 0.038,
  component: 0.032,
  prefix: 0.018,
  attester: 0.045,
  claim: 0.022,
};
const GROUP_ORDER = [
  "primitive",
  "family",
  "component",
  "prefix",
  "attester",
  "claim",
];

const ARC_SEGMENTS = 16;

// Scene-coordinate from kernel position. The kernel emits Poincaré disk
// (x, y) in [-1, 1] and band height z in [0.2, 1.0]. Three.js scene uses
// y as up, so we swap z↔y here once for the whole scene.
function instancePos(
  positions: Float32Array,
  instanceIdx: number,
): THREE.Vector3 {
  const x = positions[instanceIdx * 3 + 0];
  const y = positions[instanceIdx * 3 + 1];
  const z = positions[instanceIdx * 3 + 2];
  return new THREE.Vector3(x, z, y);
}

function GroundPlane() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <circleGeometry args={[1.05, 96]} />
        <meshBasicMaterial color="#cbd5e1" transparent opacity={0.18} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[1.03, 1.05, 96]} />
        <meshBasicMaterial color="#475569" transparent opacity={0.7} />
      </mesh>
    </>
  );
}

function BandRings() {
  // Band labels were drawn with drei's <Text> (Troika SDF text). Troika
  // hits cdn.jsdelivr.net for unicode-font-resolver data and runs a
  // worker pool, both of which trip CSP. For six ASCII words we don't
  // need any of that — drei's <Html> portals plain DOM into world
  // space, no workers, no external fetches, sharper at any zoom.
  return (
    <>
      {BAND_Z.map((z, i) => (
        <group key={i} position={[0, z, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.98, 1.0, 96]} />
            <meshBasicMaterial
              color={i === 4 ? "#0d9488" : "#94a3b8"}
              transparent
              opacity={i === 4 ? 0.55 : 0.25}
            />
          </mesh>
          <Html
            position={[1.05, 0, 0]}
            center={false}
            zIndexRange={[20, 0]}
            distanceFactor={1.2}
            style={{
              pointerEvents: "none",
              userSelect: "none",
              whiteSpace: "nowrap",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: i === 4 ? "#0d9488" : "#64748b",
              transform: "translate(8px, -50%)",
            }}
          >
            {BAND_LABELS[i]}
          </Html>
        </group>
      ))}
      <VerticalSpine />
    </>
  );
}

function VerticalSpine() {
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 1.0, 0),
    ]);
    return g;
  }, []);
  return (
    <line>
      <primitive object={geom} attach="geometry" />
      <lineBasicMaterial color="#94a3b8" transparent opacity={0.4} />
    </line>
  );
}

// Arc midpoint computation matching the kernel's geometric intent. Forward
// arc bows above the chord (or radially outward for cross-band); backward
// bows below (or radially inward).
function arcMid(
  start: THREE.Vector3,
  end: THREE.Vector3,
  curvature: number,
  forward: boolean,
): THREE.Vector3 {
  const mid = start.clone().add(end).multiplyScalar(0.5);
  const len = end.clone().sub(start).length();
  const sameBand = Math.abs(start.y - end.y) < 0.001;
  if (sameBand) {
    return mid.add(
      new THREE.Vector3(0, len * curvature * (forward ? 1 : -1), 0),
    );
  }
  const radial = new THREE.Vector3(mid.x, 0, mid.z);
  if (radial.lengthSq() < 1e-6) radial.set(1, 0, 0);
  radial.normalize().multiplyScalar(len * curvature * (forward ? 1 : -1));
  return mid.add(radial);
}

// Sample a quadratic Bezier between start/end with control = midpoint
// offset, emitting line-segment pairs into `out` for THREE.LineSegments.
function sampleArc(
  start: THREE.Vector3,
  end: THREE.Vector3,
  curvature: number,
  forward: boolean,
  out: number[],
) {
  const ctrl = arcMid(start, end, curvature, forward);
  // Sample ARC_SEGMENTS+1 points, then emit each consecutive pair.
  const pts: number[] = new Array((ARC_SEGMENTS + 1) * 3);
  for (let i = 0; i <= ARC_SEGMENTS; i++) {
    const t = i / ARC_SEGMENTS;
    const oneT = 1 - t;
    const w0 = oneT * oneT;
    const w1 = 2 * oneT * t;
    const w2 = t * t;
    pts[i * 3 + 0] = w0 * start.x + w1 * ctrl.x + w2 * end.x;
    pts[i * 3 + 1] = w0 * start.y + w1 * ctrl.y + w2 * end.y;
    pts[i * 3 + 2] = w0 * start.z + w1 * ctrl.z + w2 * end.z;
  }
  for (let i = 0; i < ARC_SEGMENTS; i++) {
    out.push(
      pts[i * 3],
      pts[i * 3 + 1],
      pts[i * 3 + 2],
      pts[(i + 1) * 3],
      pts[(i + 1) * 3 + 1],
      pts[(i + 1) * 3 + 2],
    );
  }
}

// Group instances by node group. Returns Map<group, instance-index[]> for
// the InstancedMesh assembly.
function groupInstances(
  graph: KernelGraph,
  instanceMeta: InstanceMeta[],
): Record<string, number[]> {
  const out: Record<string, number[]> = {};
  for (const g of GROUP_ORDER) out[g] = [];
  instanceMeta.forEach((inst, i) => {
    const node = graph.nodes[inst.node_idx];
    if (!node) return;
    (out[node.group] ?? (out[node.group] = [])).push(i);
  });
  return out;
}

// One InstancedMesh for each node group. Each instance maps back to a
// (node_idx, band) pair via instanceMeta. Geometry + material are
// pre-allocated and passed via `args` rather than reflecting via JSX
// children — that path was leaving the InstancedMesh with no
// renderable geometry on first mount.
const SHARED_SPHERE_GEOM = new THREE.SphereGeometry(1.0, 14, 12);

function NodeGroup({
  group,
  instanceIndices,
  positions,
  instanceMeta,
  graph,
  hoverInstanceId,
  selectedNodeId,
  setHoverNodeId,
  onPickNode,
}: {
  group: string;
  instanceIndices: number[];
  positions: Float32Array;
  instanceMeta: InstanceMeta[];
  graph: KernelGraph;
  hoverInstanceId: number | null;
  selectedNodeId: string | null;
  setHoverNodeId: (id: string | null) => void;
  onPickNode?: (id: string) => void;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tmpObj = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.95,
        toneMapped: false,
      }),
    [],
  );
  const baseSize = GROUP_SIZE[group] ?? 0.02;

  // Write matrices + colors imperatively after every layout/hover change.
  // setColorAt creates mesh.instanceColor lazily; we then mark it dirty.
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const hoveredNodeId =
      hoverInstanceId !== null
        ? instanceMeta[hoverInstanceId]?.node_id
        : null;
    instanceIndices.forEach((instIdx, i) => {
      const p = instancePos(positions, instIdx);
      const inst = instanceMeta[instIdx];
      const node = graph.nodes[inst.node_idx];
      const sameLogicalHover = hoveredNodeId === inst.node_id;
      const sameLogicalSelected = selectedNodeId === inst.node_id;
      // Selected > hovered > default
      const scale = sameLogicalSelected
        ? baseSize * 2.4
        : sameLogicalHover
          ? baseSize * 1.6
          : baseSize;
      tmpObj.position.copy(p);
      tmpObj.scale.setScalar(scale);
      tmpObj.updateMatrix();
      mesh.setMatrixAt(i, tmpObj.matrix);
      // Selected glows yellow; otherwise the node's normal color.
      if (sameLogicalSelected) {
        tmpColor.set("#fbbf24");
      } else {
        tmpColor.set(nodeColor(node));
      }
      mesh.setColorAt(i, tmpColor);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [
    positions,
    instanceIndices,
    instanceMeta,
    baseSize,
    hoverInstanceId,
    selectedNodeId,
    graph,
    tmpObj,
    tmpColor,
  ]);

  if (instanceIndices.length === 0) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[SHARED_SPHERE_GEOM, material, instanceIndices.length]}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        const i = e.instanceId;
        if (typeof i === "number") {
          const instIdx = instanceIndices[i];
          const meta = instanceMeta[instIdx];
          if (meta) setHoverNodeId(meta.node_id);
        }
      }}
      onPointerOut={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHoverNodeId(null);
      }}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        if (!onPickNode) return;
        e.stopPropagation();
        const i = e.instanceId;
        if (typeof i === "number") {
          const instIdx = instanceIndices[i];
          const meta = instanceMeta[instIdx];
          if (meta) onPickNode(meta.node_id);
        }
      }}
    />
  );
}

// NodeIconOverlays — drei <Html> portals that stamp an emoji glyph above
// each non-trivial node. Per the CEG icon language: attesters get a fun
// character icon (🐺 🧒 👵 …) with a small family badge; primitives get
// the verb glyph (⚖️ 🤲 ♻️ 🫥 💌); family nodes get the family icon
// (🏛️ ⚙️ 🔍 🤝 🔧). Claims and prefix dots are left bare so the canvas
// doesn't drown in DOM nodes.
const ICON_GROUPS = new Set([
  "attester",
  "primitive",
  "family",
  "component",
]);

function NodeIconOverlays({
  graph,
  instanceMeta,
  positions,
  selectedNodeId,
}: {
  graph: KernelGraph;
  instanceMeta: InstanceMeta[];
  positions: Float32Array;
  selectedNodeId: string | null;
}) {
  const items = useMemo(() => {
    const out: Array<{
      key: string;
      pos: THREE.Vector3;
      icon: string;
      badge: string;
      group: string;
      isSelected: boolean;
      nodeId: string;
    }> = [];
    const seenNodeIds = new Set<string>();
    instanceMeta.forEach((inst, instIdx) => {
      const node = graph.nodes[inst.node_idx];
      if (!node) return;
      if (!ICON_GROUPS.has(node.group)) return;
      // Only one glyph per logical node even if multi-scale duplicated it.
      if (seenNodeIds.has(inst.node_id)) return;
      seenNodeIds.add(inst.node_id);
      const icon = iconForNode(node);
      if (!icon) return;
      const badge = node.group === "attester" ? familyBadgeForNode(node) : "";
      out.push({
        key: `${inst.node_id}-${instIdx}`,
        pos: instancePos(positions, instIdx),
        icon,
        badge,
        group: node.group,
        isSelected: selectedNodeId === inst.node_id,
        nodeId: inst.node_id,
      });
    });
    return out;
  }, [graph, instanceMeta, positions, selectedNodeId]);

  return (
    <>
      {items.map((it) => {
        const baseSize = GROUP_SIZE[it.group] ?? 0.04;
        const yOffset = baseSize * 1.8;
        const fontSize =
          it.group === "primitive"
            ? 22
            : it.group === "family"
              ? 18
              : it.group === "attester"
                ? 18
                : 14;
        return (
          <Html
            key={it.key}
            position={[it.pos.x, it.pos.y + yOffset, it.pos.z]}
            center
            zIndexRange={[15, 0]}
            distanceFactor={1.4}
            style={{
              pointerEvents: "none",
              userSelect: "none",
              whiteSpace: "nowrap",
              lineHeight: 1,
              fontSize: `${fontSize}px`,
              filter: it.isSelected
                ? "drop-shadow(0 0 6px #fbbf24)"
                : "drop-shadow(0 1px 1px rgba(0,0,0,0.25))",
              transform: it.isSelected ? "scale(1.25)" : undefined,
            }}
          >
            <span>
              {it.icon}
              {it.badge ? (
                <span style={{ fontSize: "0.55em", marginLeft: 2 }}>
                  {it.badge}
                </span>
              ) : null}
            </span>
          </Html>
        );
      })}
    </>
  );
}

// All forward arcs in one LineSegments; all backward arcs in another. Each
// arc contributes ARC_SEGMENTS line segments (= 2 * ARC_SEGMENTS verts).
function EdgeRibbons({
  edgeGeoms,
  positions,
  hoverInstanceId,
}: {
  edgeGeoms: EdgeGeom[];
  positions: Float32Array;
  hoverInstanceId: number | null;
}) {
  const { fwdGeom, bwdGeom } = useMemo(() => {
    const fwd: number[] = [];
    const bwd: number[] = [];
    for (const e of edgeGeoms) {
      const s = instancePos(positions, e.source_instance);
      const t = instancePos(positions, e.target_instance);
      sampleArc(s, t, e.curvature, true, fwd);
      sampleArc(s, t, e.curvature, false, bwd);
    }
    const fwdGeom = new THREE.BufferGeometry();
    fwdGeom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(new Float32Array(fwd), 3),
    );
    const bwdGeom = new THREE.BufferGeometry();
    bwdGeom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(new Float32Array(bwd), 3),
    );
    return { fwdGeom, bwdGeom };
  }, [edgeGeoms, positions]);

  // Hover-dim with a simple opacity boost. Real per-edge highlight comes in
  // Phase 3 when we attribute-pack the hover flag.
  const litOpacity = hoverInstanceId === null ? 0.32 : 0.5;

  return (
    <>
      <lineSegments>
        <primitive object={fwdGeom} attach="geometry" />
        <lineBasicMaterial
          color="#0d9488"
          transparent
          opacity={litOpacity}
        />
      </lineSegments>
      <lineSegments>
        <primitive object={bwdGeom} attach="geometry" />
        <lineBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={litOpacity * 0.85}
        />
      </lineSegments>
    </>
  );
}

// PerfReporter — sits inside the Canvas so it can read renderer.info
// every frame and feed the bench harness when ?bench=1 is on.
function PerfReporter() {
  const gl = useThree((s) => s.gl);
  useFrame((_, dt) => {
    try {
      const fn = (globalThis as { __perfTick?: (now: number, info: unknown) => void }).__perfTick;
      if (fn) fn(performance.now(), gl.info);
    } catch {
      /* harness off */
    }
    void dt;
  });
  return null;
}

// ZoomTracker — exposes the OrbitControls' current camera-to-target
// distance to the UI so the zoom in/out buttons can drive it. Stored
// in a module-scope ref for cross-component access (avoids prop
// drilling out through the Canvas boundary).
const zoomCmdRef: { current: ((delta: number) => void) | null } = {
  current: null,
};
function ZoomTracker() {
  const camera = useThree((s) => s.camera);
  const controls = useThree(
    (s) => s.controls as { update?: () => void; object?: THREE.Camera; target?: THREE.Vector3 } | null,
  );
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    zoomCmdRef.current = (delta: number) => {
      // delta > 0 → zoom out (move farther); delta < 0 → zoom in
      const target = controls?.target ?? new THREE.Vector3(0, 0.5, 0);
      const dir = new THREE.Vector3()
        .copy(camera.position)
        .sub(target)
        .normalize();
      const dist = camera.position.distanceTo(target);
      const newDist = THREE.MathUtils.clamp(dist * (1 + delta), 0.4, 8);
      camera.position
        .copy(target)
        .addScaledVector(dir, newDist);
      controls?.update?.();
      invalidate();
    };
    return () => {
      zoomCmdRef.current = null;
    };
  }, [camera, controls, invalidate]);
  return null;
}

export function nudgeZoom(delta: number): void {
  zoomCmdRef.current?.(delta);
}

// Re-invalidate the frameloop whenever the visible inputs change. Required
// for frameloop="demand". Triple-pump on mount because we have seen the
// first invalidate land before InstancedMesh's matrix/color attributes are
// uploaded, leaving the canvas blank on initial paint.
function InvalidateOnChange({ signal }: { signal: unknown }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidate();
    const a = requestAnimationFrame(() => invalidate());
    const b = requestAnimationFrame(() => invalidate());
    return () => {
      cancelAnimationFrame(a);
      cancelAnimationFrame(b);
    };
  }, [signal, invalidate]);
  return null;
}

export default function AlephScene({
  graph,
  positions,
  instanceMeta,
  edgeGeoms,
  selectedNodeId = null,
  hiddenNodeIds,
  onHoverChange,
  onPickNode,
}: {
  graph: KernelGraph;
  positions: Float32Array;
  instanceMeta: InstanceMeta[];
  edgeGeoms: EdgeGeom[];
  selectedNodeId?: string | null;
  hiddenNodeIds?: Set<string>;
  onHoverChange?: (nodeId: string | null) => void;
  onPickNode?: (nodeId: string) => void;
}) {
  // Cap dpr at 1.5 on touch devices — per the research, the single biggest
  // mobile win. Retina phones at dpr=3 with the LineSegments mesh blow
  // fillrate; 1.5 keeps the scene crisp enough without melting.
  const dpr: [number, number] = useMemo(() => {
    if (typeof window === "undefined") return [1, 2];
    return "ontouchstart" in window ? [1, 1.5] : [1, 2];
  }, []);
  const [hoverInstanceId, setHoverInstanceId] = useState<number | null>(null);
  const [hoverNodeId, setHoverNodeId] = useState<string | null>(null);

  useEffect(() => {
    onHoverChange?.(hoverNodeId);
  }, [hoverNodeId, onHoverChange]);

  // Map hover node id → first instance for size-bump
  useEffect(() => {
    if (hoverNodeId === null) {
      setHoverInstanceId(null);
      return;
    }
    const idx = instanceMeta.findIndex((m) => m.node_id === hoverNodeId);
    setHoverInstanceId(idx >= 0 ? idx : null);
  }, [hoverNodeId, instanceMeta]);

  const grouped = useMemo(
    () => groupInstances(graph, instanceMeta),
    [graph, instanceMeta],
  );

  // Apply runtime hides: drop any instance whose node_id is in the hide
  // set. Edges that touch a hidden node also drop. The kernel still
  // computed everything; we just skip drawing.
  const filteredGrouped = useMemo(() => {
    if (!hiddenNodeIds || hiddenNodeIds.size === 0) return grouped;
    const out: Record<string, number[]> = {};
    for (const g of Object.keys(grouped)) {
      out[g] = grouped[g].filter((instIdx) => {
        const meta = instanceMeta[instIdx];
        return meta && !hiddenNodeIds.has(meta.node_id);
      });
    }
    return out;
  }, [grouped, hiddenNodeIds, instanceMeta]);
  const filteredEdgeGeoms = useMemo(() => {
    if (!hiddenNodeIds || hiddenNodeIds.size === 0) return edgeGeoms;
    return edgeGeoms.filter((e) => {
      const sMeta = instanceMeta[e.source_instance];
      const tMeta = instanceMeta[e.target_instance];
      if (!sMeta || !tMeta) return false;
      return (
        !hiddenNodeIds.has(sMeta.node_id) && !hiddenNodeIds.has(tMeta.node_id)
      );
    });
  }, [edgeGeoms, instanceMeta, hiddenNodeIds]);

  return (
    <Canvas
      camera={{ position: [2.6, 1.6, 2.6], fov: 50 }}
      dpr={dpr}
      // Belt-and-braces WebGL hardening for mobile Chrome / Safari:
      //   - antialias=false drops MSAA which some tile-based GPUs (Mali,
      //     Adreno) silently fail to allocate at touchscreen DPRs
      //   - powerPreference defaults to "default" so we don't kick the
      //     discrete GPU on hybrid laptops
      //   - preserveDrawingBuffer=false is the Three.js default but we
      //     spell it out so future readers know we tolerate buffer swap
      //   - failIfMajorPerformanceCaveat=false lets WebGL run on the
      //     software rasteriser when no GPU is available (the alternative
      //     is the black box the user just reported)
      gl={{
        antialias: false,
        alpha: true,
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false,
      }}
      onCreated={({ gl, scene, camera }) => {
        // Surface basic ready-state to the page so SceneFrame can show a
        // "stuck loading" banner if no first paint arrives within 2s.
        try {
          (
            globalThis as { __alephSceneCreated?: boolean }
          ).__alephSceneCreated = true;
          void scene; void camera; void gl;
        } catch {
          /* harmless */
        }
      }}
      onError={(e) => {
        // R3F surfaces context creation / first-paint errors here.
        // Re-throw into a module-scope so the SceneFrame can render it.
        try {
          (
            globalThis as { __alephSceneError?: string }
          ).__alephSceneError = String(e);
        } catch {
          /* harmless */
        }
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 3]} intensity={0.6} />
      <GroundPlane />
      <BandRings />
      <EdgeRibbons
        edgeGeoms={filteredEdgeGeoms}
        positions={positions}
        hoverInstanceId={hoverInstanceId}
      />
      {GROUP_ORDER.map((g) => (
        <NodeGroup
          key={g}
          group={g}
          instanceIndices={filteredGrouped[g] ?? []}
          positions={positions}
          instanceMeta={instanceMeta}
          graph={graph}
          hoverInstanceId={hoverInstanceId}
          selectedNodeId={selectedNodeId}
          setHoverNodeId={setHoverNodeId}
          onPickNode={onPickNode}
        />
      ))}
      <NodeIconOverlays
        graph={graph}
        instanceMeta={instanceMeta}
        positions={positions}
        selectedNodeId={selectedNodeId}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        // Explicit touch mapping: one finger rotates the scene, two
        // fingers pinch-to-zoom AND two-finger drag also dollies
        // (since pan is disabled). Without this explicit mapping,
        // some mobile browsers silently drop the second-finger event
        // because the dpr cap above changes the pixel ratio mid-tap.
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_ROTATE,
        }}
        minDistance={0.4}
        maxDistance={8}
        zoomSpeed={1.0}
        rotateSpeed={0.9}
        target={[0, 0.5, 0]}
      />
      <PerfReporter />
      <ZoomTracker />
      <InvalidateOnChange
        signal={`${positions.length}-${edgeGeoms.length}-${hoverInstanceId}`}
      />
    </Canvas>
  );
}
