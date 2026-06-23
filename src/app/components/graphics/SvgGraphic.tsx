// Renders a text-free, CSS-animated SVG graphic from the design team's set.
// Each graphic is a raw SVG string in ./svg/<id>.ts; its keyframes live in
// ./css/<id>.css (selectors scoped under .<id>). Language-neutral — one render
// serves every locale; all labels are supplied by the page, not baked in.
//
// To add a graphic: drop svg/<id>.ts + css/<id>.css, then register both here.

import "./css/g02.css";
import "./css/g03.css";
import "./css/g04.css";
import "./css/g05.css";
import "./css/g06.css";
import "./css/g07.css";
import "./css/g08.css";
import "./css/g09.css";
import "./css/g10.css";
import g02 from "./svg/g02";
import g03 from "./svg/g03";
import g04 from "./svg/g04";
import g05 from "./svg/g05";
import g06 from "./svg/g06";
import g07 from "./svg/g07";
import g08 from "./svg/g08";
import g09 from "./svg/g09";
import g10 from "./svg/g10";

const REGISTRY: Record<string, string> = {
  g02,
  g03,
  g04,
  g05,
  g06,
  g07,
  g08,
  g09,
  g10,
};

export default function SvgGraphic({ id, className }: { id: string; className?: string }) {
  const svg = REGISTRY[id];
  if (!svg) return null;
  return (
    <div
      className={`${id} ${className ?? ""}`}
      aria-hidden="true"
      style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

// Maps a path slug to its hero graphic id.
export const PATH_GRAPHIC: Record<string, string> = {
  "consumer-ai": "g02",
  superalignment: "g03",
  misinformation: "g04",
  "big-tech": "g05",
};
