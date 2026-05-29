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

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useThree, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import type {
  KernelGraph,
  KernelNode,
  InstanceMeta,
  EdgeGeom,
} from "./AlephView";
import { nodeColor } from "./AlephView";

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
          <Text
            position={[1.05, 0, 0]}
            fontSize={0.045}
            color={i === 4 ? "#0d9488" : "#64748b"}
            anchorX="left"
            anchorY="middle"
          >
            {BAND_LABELS[i]}
          </Text>
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
  onHoverChange,
  onPickNode,
}: {
  graph: KernelGraph;
  positions: Float32Array;
  instanceMeta: InstanceMeta[];
  edgeGeoms: EdgeGeom[];
  selectedNodeId?: string | null;
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

  return (
    <Canvas
      camera={{ position: [2.6, 1.6, 2.6], fov: 50 }}
      dpr={dpr}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 3]} intensity={0.6} />
      <GroundPlane />
      <BandRings />
      <EdgeRibbons
        edgeGeoms={edgeGeoms}
        positions={positions}
        hoverInstanceId={hoverInstanceId}
      />
      {GROUP_ORDER.map((g) => (
        <NodeGroup
          key={g}
          group={g}
          instanceIndices={grouped[g] ?? []}
          positions={positions}
          instanceMeta={instanceMeta}
          graph={graph}
          hoverInstanceId={hoverInstanceId}
          selectedNodeId={selectedNodeId}
          setHoverNodeId={setHoverNodeId}
          onPickNode={onPickNode}
        />
      ))}
      <OrbitControls
        enablePan={false}
        minDistance={0.6}
        maxDistance={6}
        target={[0, 0.5, 0]}
      />
      <InvalidateOnChange
        signal={`${positions.length}-${edgeGeoms.length}-${hoverInstanceId}`}
      />
    </Canvas>
  );
}
