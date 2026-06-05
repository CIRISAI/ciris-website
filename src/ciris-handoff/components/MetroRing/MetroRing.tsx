import styles from './MetroRing.module.css';

export interface MetroRingProps {
  /** Local-link + node accent (hex). Default: teal #419CA0 */
  accent?: string;
  className?: string;
}

/**
 * MetroRing — a dashed "your city" ring with dense local links (accent) and a
 * couple of dim links leaving the metro. From deck slide 4 (locality dividend).
 * Recurring motion: ring rotates slowly, local + exit links flow, nodes twinkle.
 * Freezes to a static diagram under prefers-reduced-motion: reduce.
 */
export default function MetroRing({ accent = '#419CA0', className }: MetroRingProps) {
  return (
    <svg
      className={[styles.metro, className].filter(Boolean).join(' ')}
      style={{ ['--accent' as any]: accent }}
      viewBox="0 0 620 480"
      role="img"
      aria-label="Most links stay inside a local metro ring; only a few dim links leave it"
    >
      <circle className={styles.ring} cx="300" cy="240" r="210" />
      <g className={styles.localLinks}>
        <path d="M300 240 L200 150" /><path d="M300 240 L410 170" /><path d="M300 240 L380 330" />
        <path d="M300 240 L190 320" /><path d="M200 150 L410 170" /><path d="M380 330 L190 320" />
        <path d="M410 170 L380 330" /><path d="M200 150 L190 320" />
      </g>
      <g className={styles.exitLinks}>
        <path d="M410 170 L580 110" /><path d="M380 330 L585 400" />
      </g>
      <g className={styles.nodes}>
        <circle cx="300" cy="240" r="13" /><circle cx="200" cy="150" r="9" /><circle cx="410" cy="170" r="9" />
        <circle cx="380" cy="330" r="9" /><circle cx="190" cy="320" r="9" />
      </g>
      <g className={styles.exitNodes}>
        <circle cx="580" cy="110" r="7" /><circle cx="585" cy="400" r="7" />
      </g>
    </svg>
  );
}
