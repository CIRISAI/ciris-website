import styles from './CaughtLyingCascade.module.css';

export interface CaughtLyingCascadeProps {
  className?: string;
  sourceLabel?: string;        // default "A trusted source"
  misleadingLabel?: string;    // default "caught misleading"
  claims?: string[];           // up to 3 shown; default sample claims
  conclusionLabel?: string;    // default "A conclusion"
}

const DEFAULT_CLAIMS = ['"This is safe to take."', '"That report is solid."', '"This source checks out."'];

/**
 * CaughtLyingCascade — a trusted source feeds claims into a conclusion; on an
 * 8.5s loop the source is "caught misleading" (turns red), every claim strikes
 * through and goes moot, and the conclusion flips to "re-open". From deck
 * slide 7. Under prefers-reduced-motion it shows the calm pre-cascade state.
 */
export default function CaughtLyingCascade({
  className,
  sourceLabel = 'A trusted source',
  misleadingLabel = 'caught misleading',
  claims = DEFAULT_CLAIMS,
  conclusionLabel = 'A conclusion',
}: CaughtLyingCascadeProps) {
  return (
    <div className={[styles.collapse, className].filter(Boolean).join(' ')}>
      <div className={styles.actor}>
        <span className={styles.ava}>
          <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth={1.75}><circle cx="11" cy="7.5" r="3.4" /><path d="M4.8 17.5 C4.8 13.6 7.7 12 11 12 C14.3 12 17.2 13.6 17.2 17.5" /></svg>
        </span>
        <div className={styles.who}>{sourceLabel}</div>
        <div className={styles.tag}>
          <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><path d="M6 6 L16 16 M16 6 L6 16" /></svg>
          {misleadingLabel}
        </div>
      </div>
      <div className={[styles.conn, styles.c1].join(' ')} />
      <div className={styles.claims}>
        {claims.slice(0, 3).map((c, i) => (
          <div key={i} className={styles.cl}><span className={styles.cdt} />{c}<span className={styles.strike} /></div>
        ))}
        <div className={styles.moot}>every claim → moot</div>
      </div>
      <div className={[styles.conn, styles.c2].join(' ')} />
      <div className={styles.concl}>{conclusionLabel}
        <div className={styles.reopen}>
          <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 7 A7 7 0 1 0 18.4 11.5" /><path d="M17.8 3.5 L17.8 7.2 L14.1 7.2" /></svg>
          re-open
        </div>
      </div>
    </div>
  );
}
