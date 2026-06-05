import styles from './Convergence.module.css';

export interface ConvergenceInput { label: string; color: string; }
export interface ConvergenceProps {
  accent?: string;            // core accent (hex). Default teal #419CA0
  className?: string;
  coreTitle?: string;         // Default "every byte is signed"
  coreSub?: string;           // Default "who made it · whether it can leave"
  /** Exactly 3 inputs: [top-left, right, bottom-left]. */
  inputs?: [ConvergenceInput, ConvergenceInput, ConvergenceInput];
}

const DEFAULT_INPUTS: [ConvergenceInput, ConvergenceInput, ConvergenceInput] = [
  { label: 'No data centers', color: '#419CA0' },
  { label: 'AI you can check', color: '#22C0E8' },
  { label: "Privacy that can't leak", color: '#7A6FD6' },
];

/**
 * Convergence — three labeled inputs whose connector lines flow inward, with a
 * colored dot travelling each line into a softly pulsing core. From deck slide 8
 * ("The three can't be pulled apart"). Freezes static under reduced-motion.
 */
export default function Convergence({
  accent = '#419CA0',
  className,
  coreTitle = 'every byte is signed',
  coreSub = 'who made it · whether it can leave',
  inputs = DEFAULT_INPUTS,
}: ConvergenceProps) {
  return (
    <div className={[styles.wrap, className].filter(Boolean).join(' ')} style={{ ['--accent' as any]: accent }}>
      <svg className={styles.svg} viewBox="0 0 1680 560" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <g className={styles.flow}>
          <path d="M360 80 C620 120 700 230 840 270" />
          <path d="M1320 280 C1080 280 980 280 840 280" />
          <path d="M360 480 C620 440 700 330 840 290" />
        </g>
        <g className={styles.endDots}>
          <circle cx="360" cy="80" r="7" /><circle cx="1320" cy="280" r="7" /><circle cx="360" cy="480" r="7" />
        </g>
        <circle className={styles.cdot} r="7" style={{ fill: inputs[0].color, ['--p' as any]: "path('M360 80 C620 120 700 230 840 270')", ['--d' as any]: '3.4s' }} />
        <circle className={styles.cdot} r="7" style={{ fill: inputs[1].color, ['--p' as any]: "path('M1320 280 C1080 280 980 280 840 280')", ['--d' as any]: '3.0s' }} />
        <circle className={styles.cdot} r="7" style={{ fill: inputs[2].color, ['--p' as any]: "path('M360 480 C620 440 700 330 840 290')", ['--d' as any]: '3.8s' }} />
      </svg>
      <div className={styles.core}>
        <div className={styles.coreTitle}>{coreTitle}</div>
        <div className={styles.coreSub}>{coreSub}</div>
      </div>
      <div className={[styles.inp, styles.i1].join(' ')}><span className={styles.idot} style={{ background: inputs[0].color }} />{inputs[0].label}</div>
      <div className={[styles.inp, styles.i2].join(' ')}><span className={styles.idot} style={{ background: inputs[1].color }} />{inputs[1].label}</div>
      <div className={[styles.inp, styles.i3].join(' ')}><span className={styles.idot} style={{ background: inputs[2].color }} />{inputs[2].label}</div>
    </div>
  );
}
