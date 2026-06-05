import styles from './Funnel.module.css';

export interface FunnelProps {
  /** Strain / bottleneck + server accent (hex). Default: rose #E14B7F */
  accent?: string;
  className?: string;
}

/**
 * Funnel — 5B people dot-cloud -> a single red bottleneck -> a 3-rack server
 * stack. From deck slide 1 ("The internet runs through a few giant buildings").
 * Recurring motion: converging + exit lines flow, bottleneck breathes, rack LEDs
 * blink. Freezes to a static diagram under prefers-reduced-motion: reduce.
 */
export default function Funnel({ accent = '#E14B7F', className }: FunnelProps) {
  return (
    <svg
      className={[styles.funnel, className].filter(Boolean).join(' ')}
      style={{ ['--accent' as any]: accent }}
      viewBox="0 0 760 460"
      role="img"
      aria-label="Five billion people funnelling through a single bottleneck into a small stack of data-center servers"
    >
      <g className={styles.people}>
        <circle cx="40" cy="70" r="6" /><circle cx="80" cy="120" r="6" /><circle cx="40" cy="180" r="6" />
        <circle cx="90" cy="220" r="6" /><circle cx="45" cy="280" r="6" /><circle cx="85" cy="330" r="6" />
        <circle cx="40" cy="390" r="6" /><circle cx="130" cy="90" r="6" /><circle cx="135" cy="180" r="6" />
        <circle cx="140" cy="270" r="6" /><circle cx="130" cy="360" r="6" />
      </g>
      <g className={styles.flow}>
        <path d="M150 70 C300 120 300 200 360 215" /><path d="M150 120 C300 150 300 205 360 220" />
        <path d="M150 180 C300 190 320 210 360 225" /><path d="M150 270 C300 250 320 220 360 230" />
        <path d="M150 330 C300 300 320 235 360 232" /><path d="M150 390 C300 340 320 245 360 238" />
      </g>
      <rect className={styles.neck} x="358" y="196" width="44" height="64" rx="8" />
      <g className={styles.racks}>
        <rect x="540" y="150" width="170" height="44" rx="7" />
        <rect x="540" y="208" width="170" height="44" rx="7" />
        <rect x="540" y="266" width="170" height="44" rx="7" />
      </g>
      <g className={styles.leds}>
        <circle cx="560" cy="172" r="4" /><circle cx="560" cy="230" r="4" /><circle cx="560" cy="288" r="4" />
      </g>
      <g className={styles.barLines}>
        <rect x="585" y="167" width="100" height="4" rx="2" /><rect x="585" y="179" width="70" height="4" rx="2" />
        <rect x="585" y="225" width="100" height="4" rx="2" /><rect x="585" y="237" width="70" height="4" rx="2" />
        <rect x="585" y="283" width="100" height="4" rx="2" /><rect x="585" y="295" width="70" height="4" rx="2" />
      </g>
      <g className={styles.flow}>
        <path d="M402 215 L540 180" /><path d="M402 228 L540 230" /><path d="M402 242 L540 282" />
      </g>
    </svg>
  );
}
