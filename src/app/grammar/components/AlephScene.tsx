"use client";

// The Three.js scene for the Aleph view.
//
// Phase 2 additions:
//   - Multi-scale nodes rendered at every band (one instance per band)
//   - Hover synchronisation: pointer over any node lights up every instance
//     of the same logical id across all bands
//   - Paired TSVF arcs: forward (karma) above the chord, backward (grace)
//     below, with curvature parameter bound to ρ from the kernel
//
// Separated from AlephView so it can be dynamically imported without
// dragging Three.js into the static pre-render path.

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import type { KernelGraph, KernelNode } from "./AlephView";
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

export type InstanceMeta = {
  node_idx: number;
  band: number;
  node_id: string;
};

export type EdgeGeom = {
  source_instance: number;
  target_instance: number;
  curvature: number;
  kind: string;
};

const ARC_SEGMENTS = 24;

function PulsingRing({ z }: { z: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    const t = performance.now() / 1000;
    const s = 1.0 + 0.04 * Math.sin(t * 1.2);
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref} position={[0, z, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.98, 1.0, 96]} />
      <meshBasicMaterial color="#0d9488" transparent opacity={0.45} />
    </mesh>
  );
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
      <Text
        position={[0, 0, 1.18]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.06}
        color="#475569"
        anchorX="center"
        anchorY="middle"
      >
        biosphere · ground plane
      </Text>
    </>
  );
}

function Band({ z, label, lit }: { z: number; label: string; lit: boolean }) {
  return (
    <group position={[0, z, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.98, 1.0, 96]} />
        <meshBasicMaterial
          color={lit ? "#0d9488" : "#94a3b8"}
          transparent
          opacity={lit ? 0.55 : 0.25}
        />
      </mesh>
      <Text
        position={[1.05, 0, 0]}
        fontSize={0.045}
        color={lit ? "#0d9488" : "#64748b"}
        anchorX="left"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function VerticalSpine() {
  const points = useMemo(
    () => [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1.0, 0)],
    [],
  );
  const geom = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points],
  );
  return (
    <line>
      <primitive object={geom} attach="geometry" />
      <lineBasicMaterial color="#94a3b8" transparent opacity={0.4} />
    </line>
  );
}

// Scene-coordinate from kernel position. The kernel emits Poincaré disk
// (x, y) in [-1, 1] and band height z in [0.2, 1.0]. Three.js scene uses
// y as up.
function instancePos(
  positions: Float32Array,
  instanceIdx: number,
): THREE.Vector3 {
  const x = positions[instanceIdx * 3 + 0];
  const y = positions[instanceIdx * 3 + 1];
  const z = positions[instanceIdx * 3 + 2];
  return new THREE.Vector3(x, z, y);
}

// Build paired forward+backward arcs for a given chord. Forward sits above
// the midpoint, backward below. Curvature is set by the kernel — higher ρ
// → tighter bundle.
function arcCurve(
  start: THREE.Vector3,
  end: THREE.Vector3,
  curvature: number,
  forward: boolean,
): THREE.QuadraticBezierCurve3 {
  const mid = start.clone().add(end).multiplyScalar(0.5);
  // Direction perpendicular to the chord in the Y direction (band-vertical).
  // For same-band edges that vertical bow is the only one that reads; for
  // cross-band edges the vertical is already covered by the height
  // difference and we offset in the radial outward direction instead.
  const chord = end.clone().sub(start);
  const len = chord.length();
  const sameBand = Math.abs(start.y - end.y) < 0.001;

  let offset: THREE.Vector3;
  if (sameBand) {
    // bow vertically: lifts above the band (forward) or dips below (backward).
    offset = new THREE.Vector3(0, len * curvature * (forward ? 1 : -1), 0);
  } else {
    // bow radially outward: spreads the pair away from the spine.
    const radial = mid.clone();
    radial.y = 0;
    if (radial.lengthSq() < 1e-6) {
      radial.set(1, 0, 0);
    }
    radial.normalize().multiplyScalar(len * curvature * (forward ? 1 : -1));
    offset = radial;
  }
  return new THREE.QuadraticBezierCurve3(
    start,
    mid.clone().add(offset),
    end,
  );
}

function TsvfArc({
  start,
  end,
  curvature,
  highlighted,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  curvature: number;
  highlighted: boolean;
}) {
  const fwd = useMemo(
    () => arcCurve(start, end, curvature, true).getPoints(ARC_SEGMENTS),
    [start, end, curvature],
  );
  const bwd = useMemo(
    () => arcCurve(start, end, curvature, false).getPoints(ARC_SEGMENTS),
    [start, end, curvature],
  );
  const fwdGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setFromPoints(fwd);
    return g;
  }, [fwd]);
  const bwdGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setFromPoints(bwd);
    return g;
  }, [bwd]);
  const opacity = highlighted ? 0.9 : 0.22;
  return (
    <group>
      <line>
        <primitive object={fwdGeom} attach="geometry" />
        <lineBasicMaterial color="#0d9488" transparent opacity={opacity} />
      </line>
      <line>
        <primitive object={bwdGeom} attach="geometry" />
        <lineBasicMaterial color="#8b5cf6" transparent opacity={opacity * 0.85} />
      </line>
    </group>
  );
}

function NodeDot({
  node,
  position,
  size,
  highlighted,
  onPointerOver,
  onPointerOut,
}: {
  node: KernelNode;
  position: THREE.Vector3;
  size: number;
  highlighted: boolean;
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut: (e: ThreeEvent<PointerEvent>) => void;
}) {
  return (
    <mesh
      position={position}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <sphereGeometry args={[highlighted ? size * 1.5 : size, 16, 16]} />
      <meshBasicMaterial
        color={nodeColor(node)}
        transparent
        opacity={highlighted ? 1.0 : 0.85}
      />
    </mesh>
  );
}

function sizeFor(node: KernelNode) {
  if (node.group === "primitive") return 0.05;
  if (node.group === "family") return 0.038;
  if (node.group === "component") return 0.032;
  if (node.group === "attester") return 0.045;
  if (node.group === "claim") return 0.022;
  return 0.018;
}

export default function AlephScene({
  graph,
  positions,
  instanceMeta,
  edgeGeoms,
  onHoverChange,
}: {
  graph: KernelGraph;
  positions: Float32Array;
  instanceMeta: InstanceMeta[];
  edgeGeoms: EdgeGeom[];
  onHoverChange?: (nodeId: string | null) => void;
}) {
  const [hoverId, setHoverId] = useState<string | null>(null);

  useEffect(() => {
    onHoverChange?.(hoverId);
  }, [hoverId, onHoverChange]);

  return (
    <Canvas camera={{ position: [2.6, 1.6, 2.6], fov: 50 }} dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 3]} intensity={0.6} />
      <GroundPlane />
      {BAND_Z.map((z, i) => (
        <Band key={i} z={z} label={BAND_LABELS[i]} lit={i === 4 /* cell */} />
      ))}
      <VerticalSpine />
      <PulsingRing z={BAND_Z[4]} />

      {/* Paired forward/backward TSVF arcs */}
      <group>
        {edgeGeoms.map((e, i) => {
          const start = instancePos(positions, e.source_instance);
          const end = instancePos(positions, e.target_instance);
          const sId = instanceMeta[e.source_instance]?.node_id;
          const tId = instanceMeta[e.target_instance]?.node_id;
          const highlighted =
            hoverId !== null && (sId === hoverId || tId === hoverId);
          return (
            <TsvfArc
              key={i}
              start={start}
              end={end}
              curvature={e.curvature}
              highlighted={highlighted}
            />
          );
        })}
      </group>

      {/* Node instances. Each instance has its own mesh in Phase 2; Phase 3
          moves to InstancedMesh when we cross ~1000 instances. */}
      <group>
        {instanceMeta.map((inst, i) => {
          const node = graph.nodes[inst.node_idx];
          if (!node) return null;
          const pos = instancePos(positions, i);
          const highlighted = node.id === hoverId;
          return (
            <NodeDot
              key={i}
              node={node}
              position={pos}
              size={sizeFor(node)}
              highlighted={highlighted}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoverId(node.id);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoverId(null);
              }}
            />
          );
        })}
      </group>

      <OrbitControls
        enablePan={false}
        minDistance={1.5}
        maxDistance={6}
        target={[0, 0.5, 0]}
      />
    </Canvas>
  );
}
