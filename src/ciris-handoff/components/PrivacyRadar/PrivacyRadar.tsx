import styles from './PrivacyRadar.module.css';

export interface PrivacyRadarProps {
  /** Inner-circle accent (hex). Default: violet #7A6FD6 */
  accent?: string;
  className?: string;
  /** Center label. Default: "self" */
  coreLabel?: string;
  /** Outermost label. Default: "global commons" */
  outerLabel?: string;
}

/**
 * PrivacyRadar — seven concentric circles from "self" out to "global commons",
 * with a filled violet inner boundary that glows and sonar pulses that radiate
 * from the core but DIE at the inner boundary (data that can't leave). From deck
 * slide 5. Freezes to the static rings under prefers-reduced-motion: reduce.
 */
export default function PrivacyRadar({
  accent = '#7A6FD6',
  className,
  coreLabel = 'self',
  outerLabel = 'global commons',
}: PrivacyRadarProps) {
  return (
    <svg
      className={[styles.radar, className].filter(Boolean).join(' ')}
      style={{ ['--accent' as any]: accent }}
      viewBox="0 0 460 460"
      role="img"
      aria-label="Concentric privacy circles from self out to the global commons; inner data never leaves its boundary"
    >
      <circle className={styles.faint} cx="230" cy="230" r="220" />
      <circle className={styles.faint} cx="230" cy="230" r="184" />
      <circle className={styles.faint} cx="230" cy="230" r="148" />
      <circle className={styles.midRing} cx="230" cy="230" r="112" />
      <circle className={styles.boundary} cx="230" cy="230" r="76" />
      <circle className={styles.core} cx="230" cy="230" r="40" />
      <circle className={styles.sonar} cx="230" cy="230" r="40" />
      <circle className={[styles.sonar, styles.s2].join(' ')} cx="230" cy="230" r="40" />
      <circle className={[styles.sonar, styles.s3].join(' ')} cx="230" cy="230" r="40" />
      <circle className={styles.coreDot} cx="230" cy="230" r="9" />
      <text className={styles.coreLabel} x="230" y="206" textAnchor="middle">{coreLabel}</text>
      <text className={styles.outerLabel} x="230" y="28" textAnchor="middle">{outerLabel}</text>
    </svg>
  );
}
