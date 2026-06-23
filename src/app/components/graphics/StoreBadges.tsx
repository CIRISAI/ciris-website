// App Store + Google Play install badges. Recognizable platform glyph + a
// two-line label pulled from the dictionary (so the wording localizes). Links
// go straight to the live store listings — CIRIS ships today.

import styles from "./store-badges.module.css";

const APP_STORE = "https://apps.apple.com/us/app/cirisagent/id6758524415";
const GOOGLE_PLAY = "https://play.google.com/store/apps/details?id=ai.ciris.mobile";

export type StoreLabels = {
  appleTop: string;
  appleBottom: string;
  googleTop: string;
  googleBottom: string;
};

export default function StoreBadges({
  labels,
  className,
}: {
  labels: StoreLabels;
  className?: string;
}) {
  return (
    <div className={`${styles.row} ${className ?? ""}`}>
      <a
        className={styles.badge}
        href={APP_STORE}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${labels.appleTop} ${labels.appleBottom}`}
      >
        <svg className={styles.glyph} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
        <span className={styles.text}>
          <span className={styles.top}>{labels.appleTop}</span>
          <span className={styles.bottom}>{labels.appleBottom}</span>
        </span>
      </a>

      <a
        className={styles.badge}
        href={GOOGLE_PLAY}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${labels.googleTop} ${labels.googleBottom}`}
      >
        <svg className={styles.glyph} viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id="ciris-play" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22C0E8" />
              <stop offset="55%" stopColor="#7A6FD6" />
              <stop offset="100%" stopColor="#E14B7F" />
            </linearGradient>
          </defs>
          <path d="M3.7 2.3 14.5 12 3.7 21.7c-.43-.2-.7-.62-.7-1.13V3.43c0-.5.27-.93.7-1.13z" fill="url(#ciris-play)" />
          <path d="M14.5 12 17.9 8.6l2.9 1.67c.78.45.78 1.6 0 2.05l-2.9 1.67L14.5 12z" fill="url(#ciris-play)" opacity="0.85" />
          <path d="M3.7 2.3c.13-.06.28-.08.43-.06.2.03.4.12.6.23l9.77 5.6L14.5 12 3.7 2.3z" fill="#ffffff" opacity="0.12" />
        </svg>
        <span className={styles.text}>
          <span className={styles.top}>{labels.googleTop}</span>
          <span className={styles.bottom}>{labels.googleBottom}</span>
        </span>
      </a>
    </div>
  );
}
