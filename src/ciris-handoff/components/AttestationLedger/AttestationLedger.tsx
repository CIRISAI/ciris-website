import styles from './AttestationLedger.module.css';

export interface AttestationLedgerProps {
  accent?: string;          // claim/seal accent (hex). Default cyan #22C0E8
  className?: string;
  claim?: string;           // the signed claim text
  hash?: string;            // signature line
  agreed?: number;          // number of "Agreed" checkmarks (default 3)
  pushedBackLabel?: string; // pill text (default "loses trust")
}

const Check = () => (
  <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 11 L9.5 15.5 L17 7.5" /></svg>
);

/**
 * AttestationLedger — a signed-claim row, an "Agreed" line of checkmarks, and a
 * "Pushed back" row with a loses-trust pill. From deck slide 6. The checkmarks
 * pop in on a loop and the seal + pill pulse; under prefers-reduced-motion they
 * render static and visible.
 */
export default function AttestationLedger({
  accent = '#22C0E8',
  className,
  claim = '"Here\'s the safest dose for that."',
  hash = 'signed · ed25519+pq · 0xA17F…9C2',
  agreed = 3,
  pushedBackLabel = 'loses trust',
}: AttestationLedgerProps) {
  return (
    <div className={[styles.ledger, className].filter(Boolean).join(' ')} style={{ ['--accent' as any]: accent }}>
      <div className={styles.row}>
        <span className={styles.tag} style={{ color: accent }}>Claim</span>
        <div className={styles.main}>
          <div className={styles.claim}>{claim}</div>
          <div className={styles.hash}>{hash}</div>
        </div>
        <span className={styles.seal}>
          <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth={1.75}><circle cx="7.5" cy="8.25" r="3.5" /><path d="M9.75 10.5 L17.5 18.25" /><path d="M14.25 15 L16 13.25" /><path d="M16.25 17 L18 15.25" /></svg>
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.tag}>Agreed</span>
        <div className={styles.votes}>
          {Array.from({ length: agreed }).map((_, i) => (
            <span key={i} className={[styles.vchip, styles.ok, styles['p' + (i + 1)]].filter(Boolean).join(' ')}><Check /></span>
          ))}
          <span className={styles.count}>{agreed} agreed</span>
        </div>
      </div>
      <div className={styles.row}>
        <span className={styles.tag}>Pushed back</span>
        <div className={styles.votes}>
          <span className={[styles.vchip, styles.bad, styles.p4].join(' ')}>
            <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 6 L16 16 M16 6 L6 16" /></svg>
          </span>
          <span className={styles.pill}>{pushedBackLabel}</span>
        </div>
      </div>
    </div>
  );
}
