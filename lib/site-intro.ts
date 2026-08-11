export const SITE_INTRO_KEY = "zb-intro-v8";
export const SITE_INTRO_DONE_EVENT = "zb-site-intro-done";

/**
 * Simple boot: hold + (≥1s) → hollow square → expand → site ready.
 * Always plays — never skipped just because the page/assets are cached.
 */
/** Hold spinning + (≥1s) → unfold to hollow square → expand → name */
export const BOOT = {
  /** Spinning + hold — minimum 1s */
  plusHold: 1000,
  /** + unfolds into hollow square (match CSS edge morph) */
  toSquare: 800,
  /** Hollow square grows to fill the screen */
  expand: 1000,
  /** After copy settle finishes, wait this long before navbar */
  beforeNav: 1000,
} as const;

export const BOOT_EXPAND_DONE_MS =
  BOOT.plusHold + BOOT.toSquare + BOOT.expand;

/** Only skip when explicitly requested — NOT when the page is already loaded. */
export function shouldSkipSiteIntro(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get("skipIntro") === "1";
  } catch {
    return false;
  }
}

export function markSiteIntroSeen(): void {
  // Kept for analytics/debug; does not gate the animation anymore.
  try {
    window.localStorage.setItem(SITE_INTRO_KEY, "1");
  } catch {
    /* private mode */
  }
}

export function notifySiteIntroDone(): void {
  window.dispatchEvent(new Event(SITE_INTRO_DONE_EVENT));
}

export function clearIntroPendingHold(): void {
  if (typeof document === "undefined") return;
  delete document.documentElement.dataset.intro;
}
