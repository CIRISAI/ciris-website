// Geographic math for the CEWP globe view.
//
// Convention: latitude in [-90, 90] (north positive), longitude in
// [-180, 180] (east positive). All angles converted to radians here.
// The sphere is centered at the origin with the north pole at +Y, so
// (lat=0, lon=0) — the equator at the prime meridian — sits on +X.

import * as THREE from "three";

const DEG = Math.PI / 180;

export const GLOBE_RADIUS = 1.0;

// lat/lon -> 3D point on a sphere of given radius.
export function latLonToVec3(
  lat: number,
  lon: number,
  radius = GLOBE_RADIUS,
): THREE.Vector3 {
  const phi = (90 - lat) * DEG;
  const theta = (lon + 180) * DEG;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

// Spherical great-circle interpolation between two surface points.
// Bows the arc slightly above the surface (altitude lift) so it reads
// as a flow, not as a chord cutting through the planet.
export function greatCircleArc(
  a: THREE.Vector3,
  b: THREE.Vector3,
  segments = 32,
  altitudeLift = 0.18,
): THREE.Vector3[] {
  const startR = a.length();
  const peakR = startR * (1 + altitudeLift);
  const angle = a.angleTo(b);
  if (angle < 1e-6) return [a.clone(), b.clone()];
  const axis = new THREE.Vector3().crossVectors(a, b).normalize();
  const out: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    // Slerp on the unit sphere, then scale up by an arc altitude that
    // bows in the middle. Peaks at t=0.5.
    const slerpAngle = angle * t;
    const dir = a
      .clone()
      .applyAxisAngle(axis, slerpAngle)
      .normalize();
    const bow = 1 - Math.abs(2 * t - 1);
    const r = startR + (peakR - startR) * bow;
    out.push(dir.multiplyScalar(r));
  }
  return out;
}

// Emit a flat Float32Array of [x,y,z, x,y,z, ...] line segment pairs
// suitable for THREE.LineSegments. Each arc contributes 2*segments
// vertices (one pair per segment).
export function packArcsAsLineSegments(
  pairs: Array<[THREE.Vector3, THREE.Vector3]>,
  segments = 32,
  altitudeLift = 0.18,
): Float32Array {
  const arr: number[] = [];
  for (const [a, b] of pairs) {
    const pts = greatCircleArc(a, b, segments, altitudeLift);
    for (let i = 0; i < pts.length - 1; i++) {
      arr.push(pts[i].x, pts[i].y, pts[i].z);
      arr.push(pts[i + 1].x, pts[i + 1].y, pts[i + 1].z);
    }
  }
  return new Float32Array(arr);
}
