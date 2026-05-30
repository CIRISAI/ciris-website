"use client";

// GlobeScene — three.js / R3F rendering of the CEWP topology.
//
// Architecture mirrors AlephScene's pattern: one InstancedMesh per
// node tier, one LineSegments per flow class. Geometry is allocated
// once; per-frame work is matrix + color attribute updates only.
// Frameloop is "demand" but the globe auto-rotates so the scene
// stays painted while the user reads the panel below.

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import {
  HYPERSCALE_FACILITIES,
  METROS,
  SUBMARINE_PAIRS,
  buildCewpTrustGraph,
  nearestHyperscale,
  type Metro,
} from "../lib/dataset";
import {
  GLOBE_RADIUS,
  latLonToVec3,
  packArcsAsLineSegments,
} from "../lib/geo";

export type CewpMode = "internet" | "cewp" | "both";

// Earth shell. Translucent dark sphere with a faint lat/lon wireframe
// on top. No texture — the data dots and arcs do the talking, and we
// keep the bundle small.
function Earth() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 0.998, 48, 48]} />
        <meshBasicMaterial color="#0b1a2a" transparent opacity={0.92} />
      </mesh>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 1.001, 36, 24]} />
        <meshBasicMaterial
          color="#1e3a8a"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
      {/* A bright equator + prime meridian for orientation. */}
      <Equator />
      <PrimeMeridian />
    </group>
  );
}

function ringGeometry(radius: number, segments = 128) {
  const g = new THREE.BufferGeometry();
  const pts: number[] = [];
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    const b = ((i + 1) / segments) * Math.PI * 2;
    pts.push(
      Math.cos(a) * radius, 0, Math.sin(a) * radius,
      Math.cos(b) * radius, 0, Math.sin(b) * radius,
    );
  }
  g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return g;
}

function Equator() {
  const geom = useMemo(() => ringGeometry(GLOBE_RADIUS * 1.003, 128), []);
  return (
    <lineSegments>
      <primitive object={geom} attach="geometry" />
      <lineBasicMaterial color="#94a3b8" transparent opacity={0.35} />
    </lineSegments>
  );
}

function PrimeMeridian() {
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pts: number[] = [];
    const r = GLOBE_RADIUS * 1.003;
    const segs = 64;
    for (let i = 0; i < segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      const b = ((i + 1) / segs) * Math.PI * 2;
      pts.push(0, Math.cos(a) * r, Math.sin(a) * r * -1);
      pts.push(0, Math.cos(b) * r, Math.sin(b) * r * -1);
    }
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);
  return (
    <lineSegments>
      <primitive object={geom} attach="geometry" />
      <lineBasicMaterial color="#94a3b8" transparent opacity={0.2} />
    </lineSegments>
  );
}

// AutoRotate — slow continuous spin of the globe so the audience can
// read the geography over time. OrbitControls disables auto-rotate
// while the user drags, then resumes on release.
function AutoRotate({ groupRef }: { groupRef: React.RefObject<THREE.Group | null> }) {
  useFrame((_, dt) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.06;
    }
  });
  return null;
}

// Submarine cable underlay. Drawn as faint white arcs, always
// visible so the reader sees "same fiber" in both modes.
function SubmarineUnderlay() {
  const geom = useMemo(() => {
    const pairs = SUBMARINE_PAIRS.map(
      ([a, b]) =>
        [
          latLonToVec3(a.lat, a.lon, GLOBE_RADIUS * 1.001),
          latLonToVec3(b.lat, b.lon, GLOBE_RADIUS * 1.001),
        ] as [THREE.Vector3, THREE.Vector3],
    );
    const buf = packArcsAsLineSegments(pairs, 28, 0.04);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(buf, 3));
    return g;
  }, []);
  return (
    <lineSegments>
      <primitive object={geom} attach="geometry" />
      <lineBasicMaterial color="#cbd5e1" transparent opacity={0.18} />
    </lineSegments>
  );
}

// HyperscaleNodes — bright orange dots at the ~14 facility locations.
// Sized by being slightly larger than metros so they read as
// chokepoints.
function HyperscaleNodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tmp = useMemo(() => new THREE.Object3D(), []);
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    HYPERSCALE_FACILITIES.forEach((h, i) => {
      const p = latLonToVec3(h.lat, h.lon, GLOBE_RADIUS * 1.012);
      tmp.position.copy(p);
      tmp.scale.setScalar(0.022);
      tmp.updateMatrix();
      mesh.setMatrixAt(i, tmp.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [tmp]);
  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, HYPERSCALE_FACILITIES.length]}
    >
      <sphereGeometry args={[1, 14, 12]} />
      <meshBasicMaterial color="#fb923c" toneMapped={false} />
    </instancedMesh>
  );
}

// MetroNodes — small pale dots at metro centers, scaled by population.
function MetroNodes({
  color = "#fef3c7",
  scaleMul = 1.0,
}: {
  color?: string;
  scaleMul?: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tmp = useMemo(() => new THREE.Object3D(), []);
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    METROS.forEach((m, i) => {
      const p = latLonToVec3(m.lat, m.lon, GLOBE_RADIUS * 1.008);
      tmp.position.copy(p);
      const s = (0.006 + Math.sqrt(m.population_m) * 0.0025) * scaleMul;
      tmp.scale.setScalar(s);
      tmp.updateMatrix();
      mesh.setMatrixAt(i, tmp.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [tmp, scaleMul]);
  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, METROS.length]}>
      <sphereGeometry args={[1, 12, 10]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </instancedMesh>
  );
}

// CEWP L1 server peppering — a halo of tiny teal dots scattered
// around each metro to suggest "~1 server per 10 humans" without
// rendering 500M. Population determines how many we draw per metro.
function CewpServerHalo() {
  const positions = useMemo(() => {
    const out: THREE.Vector3[] = [];
    for (const m of METROS) {
      const center = latLonToVec3(m.lat, m.lon, GLOBE_RADIUS * 1.006);
      const count = Math.min(60, 4 + Math.floor(m.population_m * 2));
      const tangent = new THREE.Vector3(-center.z, 0, center.x).normalize();
      const binormal = new THREE.Vector3().crossVectors(center, tangent).normalize();
      for (let i = 0; i < count; i++) {
        // Deterministic spread by hashing index.
        const h = ((m.id.charCodeAt(0) * 131 + i * 17) % 9973) / 9973;
        const h2 = ((m.id.charCodeAt(1) * 131 + i * 41) % 9973) / 9973;
        const r = 0.012 + h * 0.025;
        const theta = h2 * Math.PI * 2;
        const off = tangent
          .clone()
          .multiplyScalar(Math.cos(theta) * r)
          .add(binormal.clone().multiplyScalar(Math.sin(theta) * r));
        const p = center.clone().add(off).setLength(GLOBE_RADIUS * 1.005);
        out.push(p);
      }
    }
    return out;
  }, []);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tmp = useMemo(() => new THREE.Object3D(), []);
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    positions.forEach((p, i) => {
      tmp.position.copy(p);
      tmp.scale.setScalar(0.0028);
      tmp.updateMatrix();
      mesh.setMatrixAt(i, tmp.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [positions, tmp]);
  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, positions.length]}
    >
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#5eead4" toneMapped={false} />
    </instancedMesh>
  );
}

// Internet flows: every metro flows into its nearest hyperscale
// facility. Arcs rise from the metro, peak in the troposphere, and
// terminate at the facility. All flows converge on ~14 nodes; that
// convergence is the visible bottleneck.
function InternetFlows() {
  const geom = useMemo(() => {
    const pairs: Array<[THREE.Vector3, THREE.Vector3]> = METROS.map((m) => {
      const h = nearestHyperscale(m);
      return [
        latLonToVec3(m.lat, m.lon, GLOBE_RADIUS * 1.01),
        latLonToVec3(h.lat, h.lon, GLOBE_RADIUS * 1.01),
      ];
    });
    const buf = packArcsAsLineSegments(pairs, 24, 0.22);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(buf, 3));
    return g;
  }, []);
  return (
    <lineSegments>
      <primitive object={geom} attach="geometry" />
      <lineBasicMaterial color="#fb923c" transparent opacity={0.55} />
    </lineSegments>
  );
}

// CEWP flows: small-world trust graph between metros. Lots of short
// local edges, a few long-range ones. No central convergence node.
function CewpFlows() {
  const geom = useMemo(() => {
    const edges = buildCewpTrustGraph();
    const pairs: Array<[THREE.Vector3, THREE.Vector3]> = edges.map(
      ([a, b]) =>
        [
          latLonToVec3(a.lat, a.lon, GLOBE_RADIUS * 1.01),
          latLonToVec3(b.lat, b.lon, GLOBE_RADIUS * 1.01),
        ] as [THREE.Vector3, THREE.Vector3],
    );
    const buf = packArcsAsLineSegments(pairs, 20, 0.08);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(buf, 3));
    return g;
  }, []);
  return (
    <lineSegments>
      <primitive object={geom} attach="geometry" />
      <lineBasicMaterial color="#5eead4" transparent opacity={0.55} />
    </lineSegments>
  );
}

export default function GlobeScene({ mode }: { mode: CewpMode }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const dpr: [number, number] = useMemo(() => {
    if (typeof window === "undefined") return [1, 2];
    return "ontouchstart" in window ? [1, 1.5] : [1, 2];
  }, []);
  const showInternet = mode === "internet" || mode === "both";
  const showCewp = mode === "cewp" || mode === "both";

  return (
    <Canvas
      className="h-full w-full"
      dpr={dpr}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      }}
      camera={{ position: [0, 0.4, 2.6], fov: 45, near: 0.05, far: 50 }}
    >
      <color attach="background" args={["#020617"]} />
      <group ref={groupRef}>
        <Earth />
        <SubmarineUnderlay />
        {showCewp && <CewpServerHalo />}
        {showCewp && <CewpFlows />}
        <MetroNodes color={showInternet && !showCewp ? "#fde68a" : "#fef3c7"} />
        {showInternet && <HyperscaleNodes />}
        {showInternet && <InternetFlows />}
      </group>
      <AutoRotate groupRef={groupRef} />
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={1.6}
        maxDistance={5}
        rotateSpeed={0.7}
        zoomSpeed={0.8}
      />
    </Canvas>
  );
}

// Re-export the dataset Metro type so the consuming page can render
// a side-table without re-importing from /lib/dataset.
export type { Metro };
