// Which routes wear the new look (day/night sky banner, no top navigation).
//
// Two readers: the migration banner hides on them, and the head script in
// layout.tsx paints day/night only on them, because the pages still on the old
// look are dark by design. Paths are locale-free, exactly as delocalizePath
// returns them.
//
// Derived from the components that actually render PageShell/SkyChrome; keep
// it in step when another page converts.

export const NEW_LOOK_ROUTES: ReadonlySet<string> = new Set([
  "/",
  "/about",
  "/ai-welfare",
  "/cewp",
  "/coherence-collapse-analysis",
  "/coherence-ratchet",
  "/compare",
  "/compare/microsoft-agent-governance",
  "/compliance/eu-ai-act",
  "/compliance/owasp-agentic-top-10",
  "/constitution",
  "/constitutional-mesh",
  "/contextual-integrity",
  "/crowdsourcing-alignment",
  "/epistemic-web",
  "/federation",
  "/first-contact",
  "/first-contact/theory",
  "/grammar",
  "/how-it-works",
  "/install",
  "/mdd",
  "/models",
  "/paths/big-tech",
  "/paths/consumer-ai",
  "/paths/misinformation",
  "/paths/superalignment",
  "/philosophy",
  "/proof",
  "/research-status",
  "/reviews",
  "/safety",
  "/safety-vs-censorship",
  "/security/post-quantum-kill-switch",
  "/services",
  "/stewardship",
  "/structural-privacy",
  "/trust",
  "/verification",
  "/vision"
]);

/** Routes whose content is a hard-coded dark scene: the chrome is dark there
 *  whatever the visitor picked, so the head script paints them dark. */
export const DARK_SCENE_ROUTES: ReadonlySet<string> = new Set([
  "/safety",
  "/epistemic-web",
  "/paths/big-tech",
  "/paths/consumer-ai",
  "/paths/misinformation",
  "/paths/superalignment",
]);
