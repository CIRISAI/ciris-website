// Persisted language choice, so a locale picked anywhere (marketing pages or the
// /sections reader) sticks across the whole site. Read by the redirect guard
// inlined in the root layout.
export const LOCALE_PREF_KEY = "ciris-locale";

export function setLocalePref(code: string) {
  try {
    localStorage.setItem(LOCALE_PREF_KEY, code);
    document.cookie = `${LOCALE_PREF_KEY}=${code};path=/;max-age=31536000;samesite=lax`;
  } catch {
    /* storage unavailable */
  }
}
