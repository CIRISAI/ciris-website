import styles from './MeshFlow.module.css';

export interface MeshFlowProps {
  /** Node / link / trace accent (hex). Default: teal #419CA0 */
  accent?: string;
  className?: string;
}

/**
 * MeshFlow — a small-world trust-graph: linked nodes that twinkle, links that
 * flow, two trace packets routing peer-to-peer, and radar pings on the hubs.
 * From the deck cover + slide 10. Decorative/atmospheric; freezes static under
 * prefers-reduced-motion: reduce.
 */
export default function MeshFlow({ accent = '#419CA0', className }: MeshFlowProps) {
  return (
    <svg
      className={[styles.mesh, className].filter(Boolean).join(' ')}
      style={{ ['--accent' as any]: accent }}
      viewBox="0 0 620 420"
      role="img"
      aria-label="A small-world mesh of trusted devices exchanging data peer to peer"
    >
      <g className={styles.links}>
        <path d="M90 120 L230 70 M230 70 L330 170 M90 120 L180 250 M180 250 L330 170 M180 250 L120 360 M120 360 L300 380 M300 380 L330 170 M230 70 L420 110 M420 110 L520 220 M520 220 L300 380 M420 110 L560 90 M330 170 L420 110" />
      </g>
      <g className={styles.nodes}>
        <circle cx="90" cy="120" r="7" /><circle cx="230" cy="70" r="9" /><circle cx="330" cy="170" r="11" />
        <circle cx="180" cy="250" r="7" /><circle cx="120" cy="360" r="7" /><circle cx="300" cy="380" r="9" />
        <circle cx="420" cy="110" r="8" /><circle cx="520" cy="220" r="7" /><circle cx="560" cy="90" r="6" />
      </g>
      <circle className={styles.trace} r="5" style={{ ['--p' as any]: "path('M90 120 L230 70 L330 170 L420 110 L520 220')", ['--d' as any]: '6s' }} />
      <circle className={styles.trace2} r="5" style={{ ['--p' as any]: "path('M300 380 L330 170 L230 70 L420 110 L560 90')", ['--d' as any]: '5s' }} />
      <circle className={styles.ping} cx="330" cy="170" r="11" />
      <circle className={[styles.ping, styles.ping2].join(' ')} cx="230" cy="70" r="9" />
      <circle className={[styles.ping, styles.ping3].join(' ')} cx="300" cy="380" r="9" />
    </svg>
  );
}
