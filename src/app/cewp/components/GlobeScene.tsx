"use client";

// GlobeScene — three.js / R3F rendering of the CEWP topology.
//
// Architecture mirrors AlephScene's pattern: one InstancedMesh per
// node tier, one LineSegments per flow class. Geometry is allocated
// once; per-frame work is matrix + color attribute updates only.
// Frameloop is "demand" but the globe auto-rotates so the scene
// stays painted while the user reads the panel below.

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import {
  HYPERSCALE_FACILITIES,
  METROS,
  SUBMARINE_PAIRS,
  buildCewpTrustGraph,
  buildTierGraph,
  nearestHyperscale,
  type Metro,
  type TierKey,
} from "../lib/dataset";
import type { CohortDist } from "../lib/model";
import { COHORT_ABUSE_SUSCEPTIBILITY } from "../lib/model";
import {
  GLOBE_RADIUS,
  greatCircleArc,
  latLonToVec3,
  packArcsAsLineSegments,
} from "../lib/geo";

export type CewpMode = "internet" | "cewp" | "both";

// Traffic intensity comes from the scaling-model output. Higher value
// = more particles travelling each arc each frame. 0..1.
export type TrafficIntensity = {
  internet: number;
  cewp: number;
};

// Earth shell. Ocean-blue sphere + continent outlines drawn from the
// Natural Earth 110m land polygon set (public domain) + a very faint
// lat/lon grid. No texture image — coastlines are vector lines so
// they stay sharp at any zoom.
function Earth() {
  return (
    <group>
      {/* Ocean. */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 0.998, 64, 64]} />
        <meshBasicMaterial color="#0c2243" />
      </mesh>
      {/* Faint lat/lon grid for shape readability. */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 1.001, 36, 18]} />
        <meshBasicMaterial
          color="#1e40af"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>
      <Coastlines />
      <Equator />
      <PrimeMeridian />
    </group>
  );
}

// Coastlines — fetched once at mount from /cewp/land-110m.json. We
// parse only the geometry rings and emit them as a single
// LineSegments mesh so the whole continent set is one draw call.
function Coastlines() {
  const [geom, setGeom] = useState<THREE.BufferGeometry | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/cewp/land-110m.json", { cache: "force-cache" });
        if (!res.ok) return;
        const json = (await res.json()) as {
          features: Array<{
            geometry: {
              type: "Polygon" | "MultiPolygon";
              coordinates: number[][][] | number[][][][];
            };
          }>;
        };
        if (cancelled) return;
        const pts: number[] = [];
        const r = GLOBE_RADIUS * 1.004;
        const pushRing = (ring: number[][]) => {
          for (let i = 0; i < ring.length - 1; i++) {
            const [lon1, lat1] = ring[i];
            const [lon2, lat2] = ring[i + 1];
            const a = latLonToVec3(lat1, lon1, r);
            const b = latLonToVec3(lat2, lon2, r);
            pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
          }
        };
        for (const f of json.features) {
          const g = f.geometry;
          if (g.type === "Polygon") {
            for (const ring of g.coordinates as number[][][]) pushRing(ring);
          } else if (g.type === "MultiPolygon") {
            for (const poly of g.coordinates as number[][][][]) {
              for (const ring of poly) pushRing(ring);
            }
          }
        }
        const bg = new THREE.BufferGeometry();
        bg.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(new Float32Array(pts), 3),
        );
        if (!cancelled) setGeom(bg);
      } catch {
        /* asset missing — sphere alone is fine */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  if (!geom) return null;
  return (
    <lineSegments>
      <primitive object={geom} attach="geometry" />
      <lineBasicMaterial color="#7dd3fc" transparent opacity={0.75} />
    </lineSegments>
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
// around each metro to suggest L1 home server density. Per-metro
// count scales with population AND inversely with humans-per-server
// so dragging the slider visibly thickens or thins the halo.
function CewpServerHalo({ humansPerServer }: { humansPerServer: number }) {
  const positions = useMemo(() => {
    const out: THREE.Vector3[] = [];
    const density = 10 / Math.max(1, humansPerServer); // 10 hp/server = baseline
    for (const m of METROS) {
      const center = latLonToVec3(m.lat, m.lon, GLOBE_RADIUS * 1.006);
      const count = Math.min(
        80,
        Math.max(2, Math.floor((4 + m.population_m * 2) * density)),
      );
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

// TierFlows — five layers, one per publishable cohort tier
// (affiliations, species, planet, federation; community is rendered
// as halos by CewpServerHalo). Each tier's opacity scales with the
// cohort dist (more local = quieter outer tiers) and its color tints
// red proportional to the adversarial-traffic susceptibility of that
// tier. Self + family don't render — they never emit holds_bytes.
const TIER_BASE_COLOR = "#67e8f9";
const TIER_FAIL_COLOR = "#ef4444";

function lerpColor(a: string, b: string, t: number): string {
  const ai = parseInt(a.slice(1), 16);
  const bi = parseInt(b.slice(1), 16);
  const ar = (ai >> 16) & 0xff,
    ag = (ai >> 8) & 0xff,
    ab = ai & 0xff;
  const br = (bi >> 16) & 0xff,
    bg = (bi >> 8) & 0xff,
    bb = bi & 0xff;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `#${((r << 16) | (g << 8) | bl).toString(16).padStart(6, "0")}`;
}

function TierFlows({
  cohort,
  maliciousFraction,
}: {
  cohort: CohortDist;
  maliciousFraction: number;
}) {
  const tierGraph = useMemo(() => buildTierGraph(), []);
  const TIERS: Array<{ key: TierKey; cohortKey: keyof CohortDist; altitudeLift: number }> = [
    { key: "affiliations", cohortKey: "affiliations", altitudeLift: 0.05 },
    { key: "species", cohortKey: "species", altitudeLift: 0.10 },
    { key: "planet", cohortKey: "planet", altitudeLift: 0.18 },
    { key: "federation", cohortKey: "federation", altitudeLift: 0.28 },
  ];
  return (
    <>
      {TIERS.map(({ key, cohortKey, altitudeLift }) => {
        const share = cohort[cohortKey] ?? 0;
        // Opacity floor so low-share tiers still glow faintly.
        const opacity = Math.max(0.12, Math.min(0.85, 0.2 + share * 5));
        const susceptibility = COHORT_ABUSE_SUSCEPTIBILITY[cohortKey];
        const redMix = Math.min(1, maliciousFraction * susceptibility * 1.4);
        const color = lerpColor(TIER_BASE_COLOR, TIER_FAIL_COLOR, redMix);
        return (
          <TierLine
            key={key}
            pairs={tierGraph[key]}
            color={color}
            opacity={opacity}
            altitudeLift={altitudeLift}
          />
        );
      })}
    </>
  );
}

function TierLine({
  pairs,
  color,
  opacity,
  altitudeLift,
}: {
  pairs: Array<[Metro, Metro]>;
  color: string;
  opacity: number;
  altitudeLift: number;
}) {
  const geom = useMemo(() => {
    const vecPairs: Array<[THREE.Vector3, THREE.Vector3]> = pairs.map(
      ([a, b]) =>
        [
          latLonToVec3(a.lat, a.lon, GLOBE_RADIUS * 1.01),
          latLonToVec3(b.lat, b.lon, GLOBE_RADIUS * 1.01),
        ] as [THREE.Vector3, THREE.Vector3],
    );
    const buf = packArcsAsLineSegments(vecPairs, 22, altitudeLift);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(buf, 3));
    return g;
  }, [pairs, altitudeLift]);
  return (
    <lineSegments>
      <primitive object={geom} attach="geometry" />
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
}

// CEWP flows: small-world trust graph between metros. Lots of short
// local edges, a few long-range ones. No central convergence node.
// When the model says any per-server gate fails, the arcs flip to
// red so the failure mode is visible on the globe too.
function CewpFlows({ failed }: { failed: boolean }) {
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
      <lineBasicMaterial
        color={failed ? "#ef4444" : "#5eead4"}
        transparent
        opacity={0.6}
      />
    </lineSegments>
  );
}

// TrafficParticles — animated dots traveling along arc paths. Each
// arc gets `density` particles evenly phased; each particle's
// position is sampled from the great-circle arc at t in [0, 1) and
// advanced each frame. Pure InstancedMesh, one draw call.
function TrafficParticles({
  pairs,
  color,
  speed,
  density,
  altitudeLift,
  size,
}: {
  pairs: Array<[THREE.Vector3, THREE.Vector3]>;
  color: string;
  speed: number;
  density: number;
  altitudeLift: number;
  size: number;
}) {
  // Pre-sample each arc into N control points so per-frame work is a
  // lerp between adjacent points + scalar arithmetic.
  const arcs = useMemo(
    () => pairs.map(([a, b]) => greatCircleArc(a, b, 48, altitudeLift)),
    [pairs, altitudeLift],
  );
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tmp = useMemo(() => new THREE.Object3D(), []);
  const phases = useMemo(() => {
    const out: number[] = [];
    for (let i = 0; i < arcs.length; i++) {
      for (let p = 0; p < density; p++) {
        out.push(p / density);
      }
    }
    return out;
  }, [arcs.length, density]);

  const count = arcs.length * density;

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh || count === 0) return;
    const t = clock.getElapsedTime() * speed;
    for (let arcIdx = 0; arcIdx < arcs.length; arcIdx++) {
      const arc = arcs[arcIdx];
      const N = arc.length - 1;
      for (let p = 0; p < density; p++) {
        const id = arcIdx * density + p;
        const u = (t + phases[id]) % 1;
        const f = u * N;
        const i0 = Math.floor(f);
        const frac = f - i0;
        const a = arc[i0];
        const b = arc[Math.min(i0 + 1, N)];
        tmp.position.set(
          a.x + (b.x - a.x) * frac,
          a.y + (b.y - a.y) * frac,
          a.z + (b.z - a.z) * frac,
        );
        tmp.scale.setScalar(size);
        tmp.updateMatrix();
        mesh.setMatrixAt(id, tmp.matrix);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  if (count === 0) return null;
  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </instancedMesh>
  );
}

export default function GlobeScene({
  mode,
  intensity = { internet: 0.5, cewp: 0.5 },
  humansPerServer = 10,
  cewpFailed = false,
  cohort,
  maliciousFraction = 0,
}: {
  mode: CewpMode;
  intensity?: TrafficIntensity;
  /** Affects the L1 server halo density on the globe. */
  humansPerServer?: number;
  /** When true, CEWP arcs render red to signal a gate failure. */
  cewpFailed?: boolean;
  /** Per-cohort share. Drives which tier bands are visible. */
  cohort?: CohortDist;
  /** Adversarial traffic share. Tints affected tier bands red. */
  maliciousFraction?: number;
}) {
  const groupRef = useRef<THREE.Group | null>(null);
  const dpr: [number, number] = useMemo(() => {
    if (typeof window === "undefined") return [1, 2];
    return "ontouchstart" in window ? [1, 1.5] : [1, 2];
  }, []);
  const showInternet = mode === "internet" || mode === "both";
  const showCewp = mode === "cewp" || mode === "both";

  // Endpoints for traffic particles. Centralized: each metro -> its
  // nearest hyperscale facility. CEWP: along trust-graph edges.
  const internetPairs = useMemo(
    () =>
      METROS.map((m) => {
        const h = nearestHyperscale(m);
        return [
          latLonToVec3(m.lat, m.lon, GLOBE_RADIUS * 1.01),
          latLonToVec3(h.lat, h.lon, GLOBE_RADIUS * 1.01),
        ] as [THREE.Vector3, THREE.Vector3];
      }),
    [],
  );
  const cewpPairs = useMemo(
    () =>
      buildCewpTrustGraph().map(
        ([a, b]) =>
          [
            latLonToVec3(a.lat, a.lon, GLOBE_RADIUS * 1.01),
            latLonToVec3(b.lat, b.lon, GLOBE_RADIUS * 1.01),
          ] as [THREE.Vector3, THREE.Vector3],
      ),
    [],
  );

  const internetDensity = Math.max(1, Math.round(2 + intensity.internet * 6));
  const cewpDensity = Math.max(1, Math.round(1 + intensity.cewp * 3));

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
        {showCewp && <CewpServerHalo humansPerServer={humansPerServer} />}
        {showCewp && cohort ? (
          <TierFlows cohort={cohort} maliciousFraction={maliciousFraction} />
        ) : showCewp ? (
          <CewpFlows failed={cewpFailed} />
        ) : null}
        <MetroNodes color={showInternet && !showCewp ? "#fde68a" : "#fef3c7"} />
        {showInternet && <HyperscaleNodes />}
        {showInternet && <InternetFlows />}
        {showInternet && (
          <TrafficParticles
            pairs={internetPairs}
            color="#fde68a"
            speed={0.18}
            density={internetDensity}
            altitudeLift={0.22}
            size={0.0055}
          />
        )}
        {showCewp && (
          <TrafficParticles
            pairs={cewpPairs}
            color={cewpFailed ? "#ef4444" : "#67e8f9"}
            speed={0.12}
            density={cewpDensity}
            altitudeLift={0.08}
            size={0.0035}
          />
        )}
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
