// Built-in topology dataset for /cewp. Small enough to ship in the
// page bundle; large enough that the centralized vs CEWP contrast is
// visually obvious. When the Rust simulation engine lands, snapshot
// streams replace this; the rendering layer stays the same.
//
// Sources for the lat/lon picks:
//   - Hyperscale facility metros: public AWS/Azure/GCP region
//     announcements, Meta/Apple campus disclosures.
//   - Population metros: GeoNames cities1000 top entries.
//   - Submarine landings: TeleGeography submarinecablemap.com
//     (well-known landing stations, illustrative subset).
//
// Coordinates are approximate to the metro, not to the facility
// address. The simulation engine FSD §2.2 names the production data
// sources; this is the illustrative scaffold.

export type GeoNode = {
  id: string;
  name: string;
  lat: number;
  lon: number;
};

export type Hyperscale = GeoNode & {
  operator: "AWS" | "Azure" | "GCP" | "Meta" | "Apple";
};

export type Metro = GeoNode & {
  population_m: number; // millions
};

export type CableLanding = GeoNode & {
  cable: string;
};

// Top ~14 hyperscale concentration metros. Five operators, ~70% of
// global hyperscale capacity per the scaling model.
export const HYPERSCALE_FACILITIES: Hyperscale[] = [
  { id: "hs-iad", name: "Ashburn VA", operator: "AWS", lat: 39.04, lon: -77.49 },
  { id: "hs-pdx", name: "The Dalles OR", operator: "AWS", lat: 45.59, lon: -121.18 },
  { id: "hs-dub", name: "Dublin", operator: "AWS", lat: 53.34, lon: -6.27 },
  { id: "hs-nrt", name: "Tokyo", operator: "AWS", lat: 35.69, lon: 139.69 },
  { id: "hs-bom", name: "Mumbai", operator: "AWS", lat: 19.08, lon: 72.88 },
  { id: "hs-gru", name: "Sao Paulo", operator: "AWS", lat: -23.55, lon: -46.63 },
  { id: "hs-ams", name: "Amsterdam", operator: "Azure", lat: 52.37, lon: 4.89 },
  { id: "hs-bdn", name: "Boydton VA", operator: "Azure", lat: 36.67, lon: -78.39 },
  { id: "hs-sgp", name: "Singapore", operator: "Azure", lat: 1.35, lon: 103.82 },
  { id: "hs-cbf", name: "Council Bluffs IA", operator: "GCP", lat: 41.26, lon: -95.86 },
  { id: "hs-ems", name: "Eemshaven", operator: "GCP", lat: 53.45, lon: 6.83 },
  { id: "hs-pvu", name: "Prineville OR", operator: "Meta", lat: 44.30, lon: -120.83 },
  { id: "hs-mdn", name: "Maiden NC", operator: "Apple", lat: 35.69, lon: -81.18 },
  { id: "hs-syd", name: "Sydney", operator: "AWS", lat: -33.87, lon: 151.21 },
];

// Top metros by population. Each becomes a CEWP node cluster; we draw
// one dot per metro and scale its size by population. List is broad
// on purpose — at ~120 metros the globe reads as the populated and
// connected world, not a constellation.
export const METROS: Metro[] = [
  // East Asia
  { id: "m-tyo", name: "Tokyo", lat: 35.69, lon: 139.69, population_m: 37.4 },
  { id: "m-sha", name: "Shanghai", lat: 31.23, lon: 121.47, population_m: 29.2 },
  { id: "m-bj", name: "Beijing", lat: 39.90, lon: 116.41, population_m: 21.8 },
  { id: "m-osa", name: "Osaka", lat: 34.69, lon: 135.50, population_m: 19.0 },
  { id: "m-chq", name: "Chongqing", lat: 29.56, lon: 106.55, population_m: 16.4 },
  { id: "m-can", name: "Guangzhou", lat: 23.13, lon: 113.26, population_m: 13.8 },
  { id: "m-szx", name: "Shenzhen", lat: 22.54, lon: 114.06, population_m: 12.5 },
  { id: "m-tia", name: "Tianjin", lat: 39.08, lon: 117.20, population_m: 13.5 },
  { id: "m-hgh", name: "Hangzhou", lat: 30.27, lon: 120.16, population_m: 7.2 },
  { id: "m-sel", name: "Seoul", lat: 37.57, lon: 126.98, population_m: 9.9 },
  { id: "m-bsn", name: "Busan", lat: 35.18, lon: 129.08, population_m: 3.4 },
  { id: "m-tpe", name: "Taipei", lat: 25.03, lon: 121.57, population_m: 7.0 },
  { id: "m-hkg", name: "Hong Kong", lat: 22.32, lon: 114.17, population_m: 7.5 },
  { id: "m-hnoi", name: "Hanoi", lat: 21.03, lon: 105.85, population_m: 5.2 },
  { id: "m-hcm", name: "Ho Chi Minh City", lat: 10.76, lon: 106.66, population_m: 9.3 },
  { id: "m-mfm", name: "Macau", lat: 22.20, lon: 113.55, population_m: 0.6 },
  // South Asia
  { id: "m-del", name: "Delhi", lat: 28.61, lon: 77.21, population_m: 32.9 },
  { id: "m-mum", name: "Mumbai", lat: 19.08, lon: 72.88, population_m: 21.3 },
  { id: "m-kol", name: "Kolkata", lat: 22.57, lon: 88.36, population_m: 15.1 },
  { id: "m-blr", name: "Bangalore", lat: 12.97, lon: 77.59, population_m: 13.6 },
  { id: "m-maa", name: "Chennai", lat: 13.08, lon: 80.27, population_m: 11.2 },
  { id: "m-hyd", name: "Hyderabad", lat: 17.39, lon: 78.49, population_m: 10.5 },
  { id: "m-ahm", name: "Ahmedabad", lat: 23.02, lon: 72.57, population_m: 8.4 },
  { id: "m-pnq", name: "Pune", lat: 18.52, lon: 73.86, population_m: 7.4 },
  { id: "m-dac", name: "Dhaka", lat: 23.81, lon: 90.41, population_m: 23.2 },
  { id: "m-cgp", name: "Chittagong", lat: 22.36, lon: 91.78, population_m: 4.5 },
  { id: "m-kar", name: "Karachi", lat: 24.86, lon: 67.00, population_m: 16.4 },
  { id: "m-lhe", name: "Lahore", lat: 31.55, lon: 74.34, population_m: 13.5 },
  { id: "m-isb", name: "Islamabad", lat: 33.69, lon: 73.05, population_m: 1.1 },
  { id: "m-cmb", name: "Colombo", lat: 6.93, lon: 79.85, population_m: 0.8 },
  { id: "m-ktm", name: "Kathmandu", lat: 27.72, lon: 85.32, population_m: 1.5 },
  // Southeast Asia & Oceania
  { id: "m-cgk", name: "Jakarta", lat: -6.21, lon: 106.85, population_m: 11.3 },
  { id: "m-sub", name: "Surabaya", lat: -7.25, lon: 112.75, population_m: 3.0 },
  { id: "m-mnl", name: "Manila", lat: 14.60, lon: 120.98, population_m: 14.4 },
  { id: "m-bkk", name: "Bangkok", lat: 13.76, lon: 100.50, population_m: 10.5 },
  { id: "m-sin", name: "Singapore", lat: 1.35, lon: 103.82, population_m: 5.9 },
  { id: "m-kul", name: "Kuala Lumpur", lat: 3.14, lon: 101.69, population_m: 7.8 },
  { id: "m-rgn", name: "Yangon", lat: 16.85, lon: 96.16, population_m: 5.4 },
  { id: "m-pnh", name: "Phnom Penh", lat: 11.55, lon: 104.92, population_m: 2.1 },
  { id: "m-syd", name: "Sydney", lat: -33.87, lon: 151.21, population_m: 5.4 },
  { id: "m-mel", name: "Melbourne", lat: -37.81, lon: 144.96, population_m: 5.2 },
  { id: "m-bne", name: "Brisbane", lat: -27.47, lon: 153.03, population_m: 2.6 },
  { id: "m-per", name: "Perth", lat: -31.95, lon: 115.86, population_m: 2.1 },
  { id: "m-akl", name: "Auckland", lat: -36.85, lon: 174.76, population_m: 1.7 },
  // Middle East & Central Asia
  { id: "m-iss", name: "Istanbul", lat: 41.01, lon: 28.98, population_m: 15.6 },
  { id: "m-thr", name: "Tehran", lat: 35.69, lon: 51.39, population_m: 9.4 },
  { id: "m-bgw", name: "Baghdad", lat: 33.31, lon: 44.36, population_m: 7.5 },
  { id: "m-ruh", name: "Riyadh", lat: 24.71, lon: 46.68, population_m: 7.7 },
  { id: "m-jed", name: "Jeddah", lat: 21.49, lon: 39.19, population_m: 4.7 },
  { id: "m-dxb", name: "Dubai", lat: 25.20, lon: 55.27, population_m: 3.6 },
  { id: "m-auh", name: "Abu Dhabi", lat: 24.47, lon: 54.37, population_m: 1.5 },
  { id: "m-doh", name: "Doha", lat: 25.29, lon: 51.53, population_m: 2.4 },
  { id: "m-amm", name: "Amman", lat: 31.95, lon: 35.93, population_m: 4.0 },
  { id: "m-tlv", name: "Tel Aviv", lat: 32.08, lon: 34.78, population_m: 4.4 },
  { id: "m-tas", name: "Tashkent", lat: 41.30, lon: 69.24, population_m: 2.6 },
  // Africa
  { id: "m-cai", name: "Cairo", lat: 30.04, lon: 31.23, population_m: 22.2 },
  { id: "m-los", name: "Lagos", lat: 6.52, lon: 3.38, population_m: 15.4 },
  { id: "m-kano", name: "Kano", lat: 12.00, lon: 8.52, population_m: 4.2 },
  { id: "m-add", name: "Addis Ababa", lat: 9.03, lon: 38.74, population_m: 5.2 },
  { id: "m-naj", name: "Nairobi", lat: -1.29, lon: 36.82, population_m: 5.1 },
  { id: "m-dar", name: "Dar es Salaam", lat: -6.79, lon: 39.21, population_m: 7.0 },
  { id: "m-kin", name: "Kinshasa", lat: -4.44, lon: 15.27, population_m: 15.6 },
  { id: "m-lad", name: "Luanda", lat: -8.84, lon: 13.23, population_m: 8.3 },
  { id: "m-jnb", name: "Johannesburg", lat: -26.20, lon: 28.04, population_m: 6.1 },
  { id: "m-cpt", name: "Cape Town", lat: -33.92, lon: 18.42, population_m: 4.6 },
  { id: "m-cas", name: "Casablanca", lat: 33.57, lon: -7.59, population_m: 3.8 },
  { id: "m-tun", name: "Tunis", lat: 36.81, lon: 10.18, population_m: 2.3 },
  { id: "m-alg", name: "Algiers", lat: 36.75, lon: 3.06, population_m: 3.2 },
  { id: "m-acc", name: "Accra", lat: 5.60, lon: -0.19, population_m: 2.5 },
  { id: "m-abj", name: "Abidjan", lat: 5.36, lon: -4.01, population_m: 5.5 },
  // Europe
  { id: "m-lon", name: "London", lat: 51.51, lon: -0.13, population_m: 9.5 },
  { id: "m-par", name: "Paris", lat: 48.86, lon: 2.35, population_m: 11.1 },
  { id: "m-mad", name: "Madrid", lat: 40.42, lon: -3.70, population_m: 6.7 },
  { id: "m-bcn", name: "Barcelona", lat: 41.39, lon: 2.17, population_m: 5.6 },
  { id: "m-rom", name: "Rome", lat: 41.90, lon: 12.50, population_m: 4.3 },
  { id: "m-mil", name: "Milan", lat: 45.46, lon: 9.19, population_m: 3.1 },
  { id: "m-ber", name: "Berlin", lat: 52.52, lon: 13.40, population_m: 3.8 },
  { id: "m-frm", name: "Frankfurt", lat: 50.11, lon: 8.68, population_m: 2.9 },
  { id: "m-muc", name: "Munich", lat: 48.14, lon: 11.58, population_m: 2.6 },
  { id: "m-ams", name: "Amsterdam", lat: 52.37, lon: 4.89, population_m: 2.5 },
  { id: "m-bru", name: "Brussels", lat: 50.85, lon: 4.35, population_m: 2.1 },
  { id: "m-vie", name: "Vienna", lat: 48.21, lon: 16.37, population_m: 2.0 },
  { id: "m-zrh", name: "Zurich", lat: 47.38, lon: 8.54, population_m: 1.4 },
  { id: "m-cph", name: "Copenhagen", lat: 55.68, lon: 12.57, population_m: 1.4 },
  { id: "m-sto", name: "Stockholm", lat: 59.33, lon: 18.07, population_m: 1.7 },
  { id: "m-osl", name: "Oslo", lat: 59.91, lon: 10.75, population_m: 1.1 },
  { id: "m-hel", name: "Helsinki", lat: 60.17, lon: 24.94, population_m: 1.3 },
  { id: "m-dub", name: "Dublin", lat: 53.34, lon: -6.27, population_m: 1.4 },
  { id: "m-lis", name: "Lisbon", lat: 38.72, lon: -9.14, population_m: 2.9 },
  { id: "m-ath", name: "Athens", lat: 37.98, lon: 23.73, population_m: 3.2 },
  { id: "m-waw", name: "Warsaw", lat: 52.23, lon: 21.01, population_m: 3.1 },
  { id: "m-buh", name: "Bucharest", lat: 44.44, lon: 26.10, population_m: 2.1 },
  { id: "m-bud", name: "Budapest", lat: 47.50, lon: 19.04, population_m: 1.8 },
  { id: "m-prg", name: "Prague", lat: 50.08, lon: 14.44, population_m: 1.3 },
  { id: "m-mos", name: "Moscow", lat: 55.75, lon: 37.62, population_m: 12.6 },
  { id: "m-led", name: "Saint Petersburg", lat: 59.94, lon: 30.34, population_m: 5.4 },
  { id: "m-iev", name: "Kyiv", lat: 50.45, lon: 30.52, population_m: 3.0 },
  // North America
  { id: "m-nyc", name: "New York", lat: 40.71, lon: -74.01, population_m: 18.8 },
  { id: "m-laz", name: "Los Angeles", lat: 34.05, lon: -118.24, population_m: 13.3 },
  { id: "m-ord", name: "Chicago", lat: 41.88, lon: -87.63, population_m: 9.5 },
  { id: "m-dfw", name: "Dallas", lat: 32.78, lon: -96.80, population_m: 7.6 },
  { id: "m-hou", name: "Houston", lat: 29.76, lon: -95.37, population_m: 7.1 },
  { id: "m-mia", name: "Miami", lat: 25.76, lon: -80.19, population_m: 6.3 },
  { id: "m-atl", name: "Atlanta", lat: 33.75, lon: -84.39, population_m: 6.1 },
  { id: "m-phx", name: "Phoenix", lat: 33.45, lon: -112.07, population_m: 4.9 },
  { id: "m-bos", name: "Boston", lat: 42.36, lon: -71.06, population_m: 4.9 },
  { id: "m-phl", name: "Philadelphia", lat: 39.95, lon: -75.17, population_m: 5.7 },
  { id: "m-was", name: "Washington DC", lat: 38.91, lon: -77.04, population_m: 6.4 },
  { id: "m-sfo", name: "San Francisco", lat: 37.77, lon: -122.42, population_m: 4.7 },
  { id: "m-sea", name: "Seattle", lat: 47.61, lon: -122.33, population_m: 4.0 },
  { id: "m-den", name: "Denver", lat: 39.74, lon: -104.99, population_m: 3.0 },
  { id: "m-yto", name: "Toronto", lat: 43.65, lon: -79.38, population_m: 6.4 },
  { id: "m-yul", name: "Montreal", lat: 45.50, lon: -73.57, population_m: 4.3 },
  { id: "m-yvr", name: "Vancouver", lat: 49.28, lon: -123.12, population_m: 2.6 },
  { id: "m-mex", name: "Mexico City", lat: 19.43, lon: -99.13, population_m: 22.1 },
  { id: "m-gdl", name: "Guadalajara", lat: 20.66, lon: -103.35, population_m: 5.3 },
  { id: "m-mty", name: "Monterrey", lat: 25.69, lon: -100.32, population_m: 5.1 },
  { id: "m-hav", name: "Havana", lat: 23.13, lon: -82.38, population_m: 2.1 },
  // South America
  { id: "m-sao", name: "Sao Paulo", lat: -23.55, lon: -46.63, population_m: 22.6 },
  { id: "m-rio", name: "Rio de Janeiro", lat: -22.91, lon: -43.17, population_m: 13.6 },
  { id: "m-bhz", name: "Belo Horizonte", lat: -19.92, lon: -43.94, population_m: 6.0 },
  { id: "m-bsb", name: "Brasilia", lat: -15.79, lon: -47.88, population_m: 4.7 },
  { id: "m-bue", name: "Buenos Aires", lat: -34.60, lon: -58.38, population_m: 15.4 },
  { id: "m-bog", name: "Bogota", lat: 4.71, lon: -74.07, population_m: 11.3 },
  { id: "m-lim", name: "Lima", lat: -12.05, lon: -77.04, population_m: 11.0 },
  { id: "m-scl", name: "Santiago", lat: -33.45, lon: -70.66, population_m: 6.8 },
  { id: "m-ccs", name: "Caracas", lat: 10.48, lon: -66.90, population_m: 2.9 },
  { id: "m-uio", name: "Quito", lat: -0.18, lon: -78.47, population_m: 2.0 },
];

// Representative submarine cable landings drawn as a faint underlay.
// These are well-known landing-station pairs — they imply the cable
// without us hauling the full 1712-landing TeleGeography KML into
// the bundle.
export const SUBMARINE_PAIRS: Array<[GeoNode, GeoNode]> = [
  // Transatlantic
  [{ id: "c-bos", name: "Boston", lat: 42.36, lon: -71.06 }, { id: "c-bil", name: "Bilbao", lat: 43.26, lon: -2.93 }],
  [{ id: "c-vir", name: "Virginia Beach", lat: 36.85, lon: -75.98 }, { id: "c-uk", name: "Bude UK", lat: 50.83, lon: -4.55 }],
  [{ id: "c-nyc", name: "New York", lat: 40.71, lon: -74.01 }, { id: "c-fr", name: "Le Porge", lat: 44.87, lon: -1.16 }],
  // Transpacific
  [{ id: "c-or", name: "Bandon OR", lat: 43.12, lon: -124.41 }, { id: "c-jp", name: "Maruyama", lat: 35.13, lon: 140.10 }],
  [{ id: "c-laz", name: "Los Angeles", lat: 34.05, lon: -118.24 }, { id: "c-tw", name: "Toucheng", lat: 24.86, lon: 121.83 }],
  [{ id: "c-sf", name: "San Francisco", lat: 37.77, lon: -122.42 }, { id: "c-sg", name: "Tuas", lat: 1.31, lon: 103.65 }],
  // Asia-Europe via Mediterranean
  [{ id: "c-mar", name: "Marseille", lat: 43.30, lon: 5.37 }, { id: "c-egy", name: "Alexandria", lat: 31.20, lon: 29.92 }],
  [{ id: "c-egy2", name: "Suez", lat: 29.97, lon: 32.55 }, { id: "c-ind", name: "Mumbai", lat: 19.08, lon: 72.88 }],
  [{ id: "c-ind2", name: "Chennai", lat: 13.08, lon: 80.27 }, { id: "c-sg2", name: "Singapore", lat: 1.35, lon: 103.82 }],
  // South America
  [{ id: "c-mia", name: "Miami", lat: 25.76, lon: -80.19 }, { id: "c-for", name: "Fortaleza", lat: -3.73, lon: -38.53 }],
  [{ id: "c-for2", name: "Fortaleza", lat: -3.73, lon: -38.53 }, { id: "c-eur", name: "Sines PT", lat: 37.96, lon: -8.87 }],
  // Africa
  [{ id: "c-pt", name: "Lisbon", lat: 38.72, lon: -9.14 }, { id: "c-jnb", name: "Cape Town", lat: -33.92, lon: 18.42 }],
  [{ id: "c-eg2", name: "Suez", lat: 29.97, lon: 32.55 }, { id: "c-mom", name: "Mombasa", lat: -4.04, lon: 39.67 }],
  // Australia / NZ
  [{ id: "c-syd", name: "Sydney", lat: -33.87, lon: 151.21 }, { id: "c-hi", name: "Honolulu", lat: 21.31, lon: -157.86 }],
  [{ id: "c-syd2", name: "Sydney", lat: -33.87, lon: 151.21 }, { id: "c-sg3", name: "Singapore", lat: 1.35, lon: 103.82 }],
];

// Centralized internet flows: for each metro, pick the nearest
// hyperscale facility. Every byte the metro produces or consumes
// stops at that facility. The visualization just draws these chords;
// the simulation engine will compute real bandwidth per edge.
export function nearestHyperscale(metro: Metro): Hyperscale {
  let best = HYPERSCALE_FACILITIES[0];
  let bestD = haversine(metro, best);
  for (const h of HYPERSCALE_FACILITIES) {
    const d = haversine(metro, h);
    if (d < bestD) {
      bestD = d;
      best = h;
    }
  }
  return best;
}

export function haversine(a: GeoNode, b: GeoNode): number {
  const R = 6371; // km
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(x));
}

// CEWP trust edges: a small-world graph between metros with
// metro-locality bias. Each metro connects to its k nearest plus a
// few long-range edges. Reproduces the "65% local" cohort
// distribution from the scaling model.
export function buildCewpTrustGraph(): Array<[Metro, Metro]> {
  const edges: Array<[Metro, Metro]> = [];
  const seen = new Set<string>();
  const k = 3;
  for (const m of METROS) {
    const others = METROS.filter((o) => o.id !== m.id)
      .map((o) => ({ o, d: haversine(m, o) }))
      .sort((a, b) => a.d - b.d);
    for (let i = 0; i < k && i < others.length; i++) {
      const a = m.id < others[i].o.id ? m.id : others[i].o.id;
      const b = m.id < others[i].o.id ? others[i].o.id : m.id;
      const key = `${a}|${b}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([m, others[i].o]);
    }
    // One long-range edge per metro for the small-world rewiring.
    const far = others[others.length - 1 - (m.id.charCodeAt(2) % 5)]?.o;
    if (far) {
      const a = m.id < far.id ? m.id : far.id;
      const b = m.id < far.id ? far.id : m.id;
      const key = `${a}|${b}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([m, far]);
      }
    }
  }
  return edges;
}
