"use client";
// The water behind the homepage headline. Mounted once the stored day/night
// choice is known, so a night visitor never sees a flash of daylight sea; the
// box has a fixed height either way, so nothing below it shifts.

import OceanCanvas from "./ocean/OceanCanvas";
import { useRdTheme } from "./redesign/RdShell";
import h from "./home.module.css";

export default function HeroWater() {
  const { dark, ready } = useRdTheme();
  return (
    <div className={h.water}>
      {ready && <OceanCanvas dark={dark} className={h.ocean} />}
      <div className={h.fade} />
    </div>
  );
}
