/**
 * Dynamic copyright year utility
 * Shows "2025" if current year is 2025, otherwise "2025-{currentYear}"
 */

const FOUNDING_YEAR = 2025;

export function getCopyrightYears(): string {
  const currentYear = new Date().getFullYear();
  if (currentYear <= FOUNDING_YEAR) {
    return String(FOUNDING_YEAR);
  }
  return `${FOUNDING_YEAR}-${currentYear}`;
}

export function getCopyrightNotice(): string {
  return `© ${getCopyrightYears()} Eric Moore and CIRIS L3C`;
}

export function getCopyrightNoticeFull(): string {
  return `© ${getCopyrightYears()} Eric Moore and CIRIS L3C | AGPL-3.0 License`;
}

export function getCopyrightNoticeShort(): string {
  return `© ${getCopyrightYears()} CIRIS.AI | AGPL-3.0 License`;
}
