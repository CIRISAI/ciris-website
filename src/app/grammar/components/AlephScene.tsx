"use client";

// The Three.js scene for the Aleph view. Separated from AlephView so it can
// be dynamically imported without dragging Three.js into the static
// pre-render path.

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
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
const BAND_Z = [0.0, 0.36, 0.52, 0.68, 0.84, 1.0]; // band 0 (key) lifts to 0.2 in the kernel, but the ground plane sits at 0
const BAND_ACTUAL_Z = [0.2, 0.36, 0.52, 0.68, 0.84, 1.0];

const BAND_COLOR = "#94a3b8";

// Soft pulsing ring at the cell band — the “you are here” affordance for
// Phase 1 since the namespace currently lives at cell.
function ScalingRing({ z }: { z: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_state, delta) => {
    if (!ref.current) return;
    const t = performance.now() / 1000;
    const s = 1.0 + 0.04 * Math.sin(t * 1.2);
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.98, 1.0, 96]} />
      <meshBasicMaterial color="#0d9488" transparent opacity={0.45} />
    </mesh>
  );
}

function GroundPlane() {
  return (
    <>
      {/* The biosphere plane — the floor every other band sits on. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.02]}>
        <circleGeometry args={[1.05, 96]} />
        <meshBasicMaterial color="#cbd5e1" transparent opacity={0.18} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[1.03, 1.05, 96]} />
        <meshBasicMaterial color="#475569" transparent opacity={0.7} />
      </mesh>
      <Text
        position={[0, -0.01, 1.18]}
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
    <group position={[0, 0, z]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.98, 1.0, 96]} />
        <meshBasicMaterial
          color={lit ? "#0d9488" : BAND_COLOR}
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
  // Faint vertical line connecting the bands at the disk centre — the same
  // self at every scale sits here.
  const points = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 1.0),
  ];
  const geom = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line>
      <primitive object={geom} attach="geometry" />
      <lineBasicMaterial color="#94a3b8" transparent opacity={0.4} />
    </line>
  );
}

function NodeMeshes({
  graph,
  positions,
}: {
  graph: KernelGraph;
  positions: Float32Array;
}) {
  // Group nodes by what colour they want so we can use a single
  // InstancedMesh per colour. Phase 1 keeps it simple with one Mesh per node;
  // we'll move to InstancedMesh in Phase 2 when the node count grows.
  return (
    <group>
      {graph.nodes.map((n, i) => {
        const x = positions[i * 3 + 0];
        const y = positions[i * 3 + 1];
        const z = positions[i * 3 + 2];
        // The Poincaré disk lays out in the X-Y plane at each band's Z.
        // Map to Three.js scene coordinates: graph-X → scene-X,
        // graph-Y → scene-Z (so the disk lies flat), graph-Z (band height)
        // → scene-Y.
        const sx = x;
        const sy = z; // band height
        const sz = y;
        return (
          <NodeDot key={n.id} node={n} position={[sx, sy, sz]} />
        );
      })}
    </group>
  );
}

function NodeDot({
  node,
  position,
}: {
  node: KernelNode;
  position: [number, number, number];
}) {
  const size = (() => {
    if (node.group === "primitive") return 0.05;
    if (node.group === "family") return 0.038;
    if (node.group === "component") return 0.032;
    return 0.018;
  })();
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={nodeColor(node)} />
    </mesh>
  );
}

function EdgeLines({
  graph,
  positions,
}: {
  graph: KernelGraph;
  positions: Float32Array;
}) {
  // Indexed mapping
  const idx = useMemo(() => {
    const m = new Map<string, number>();
    graph.nodes.forEach((n, i) => m.set(n.id, i));
    return m;
  }, [graph]);

  const geom = useMemo(() => {
    const points: number[] = [];
    for (const e of graph.edges) {
      const a = idx.get(e.source);
      const b = idx.get(e.target);
      if (a == null || b == null) continue;
      const ax = positions[a * 3];
      const ay = positions[a * 3 + 1];
      const az = positions[a * 3 + 2];
      const bx = positions[b * 3];
      const by = positions[b * 3 + 1];
      const bz = positions[b * 3 + 2];
      // Same coord remap as NodeMeshes
      points.push(ax, az, ay, bx, bz, by);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(points, 3),
    );
    return g;
  }, [graph, positions, idx]);

  return (
    <lineSegments>
      <primitive object={geom} attach="geometry" />
      <lineBasicMaterial color="#64748b" transparent opacity={0.18} />
    </lineSegments>
  );
}

export default function AlephScene({
  graph,
  positions,
}: {
  graph: KernelGraph;
  positions: Float32Array;
}) {
  return (
    <Canvas
      camera={{ position: [2.6, 1.4, 2.6], fov: 50 }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 3]} intensity={0.6} />
      <GroundPlane />
      {BAND_ACTUAL_Z.map((z, i) => (
        <Band key={i} z={z} label={BAND_LABELS[i]} lit={i === 4 /* cell */} />
      ))}
      <VerticalSpine />
      <ScalingRing z={BAND_ACTUAL_Z[4]} />
      <EdgeLines graph={graph} positions={positions} />
      <NodeMeshes graph={graph} positions={positions} />
      <OrbitControls
        enablePan={false}
        minDistance={1.5}
        maxDistance={6}
        target={[0, 0.5, 0]}
      />
    </Canvas>
  );
}
