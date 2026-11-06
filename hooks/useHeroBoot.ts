"use client";

import { useEffect, useState } from "react";
import {
  BOOT,
  clearIntroPendingHold,
  markSiteIntroSeen,
  shouldSkipSiteIntro,
} from "@/lib/site-intro";

/** plus (held ≥1s) → square → expand → done */
export type BootVisualPhase = "plus" | "square" | "expand" | "done";

export type BootChrome = {
  visual: BootVisualPhase;
  live: boolean;
  bypass: boolean;
  nameReady: boolean;
};

const PHASES: BootVisualPhase[] = ["plus", "square", "expand", "done"];

const DWELL: Record<BootVisualPhase, number> = {
  plus: BOOT.plusHold,
  square: BOOT.toSquare,
  expand: BOOT.expand,
  done: 0,
};

const INITIAL: BootChrome = {
  visual: "plus",
  live: false,
  bypass: false,
  nameReady: false,
};

/** What the + waits on before unfolding (capped by BOOT.maxAssetWait) */
export type BootAsset = "page" | "fonts" | "dither" | "ship";

/** Module singleton — survives Strict Mode remounts */
let snap: BootChrome = { ...INITIAL };
let started = false;
let timer: number | null = null;
let plusHeld = false;
const waitingOn = new Set<BootAsset>(["page", "fonts", "dither", "ship"]);
const listeners = new Set<(s: BootChrome) => void>();

function publish(next: BootChrome) {
  snap = next;
  listeners.forEach((fn) => fn(snap));
}

/** Report an asset as loaded; the + leaves once the hold and every asset are done. */
export function markBootAssetReady(asset: BootAsset) {
  waitingOn.delete(asset);
  maybeLeavePlus();
}

function maybeLeavePlus() {
  if (!plusHeld || waitingOn.size > 0) return;
  if (!snap.live || snap.visual !== "plus") return;
  advance();
}

function advance() {
  const idx = PHASES.indexOf(snap.visual);
  if (idx < 0 || snap.visual === "done") return;

  const next = PHASES[idx + 1];

  if (next === "done") {
    timer = null;
    publish({
      visual: "done",
      live: true,
      bypass: false,
      nameReady: true,
    });
    markSiteIntroSeen();
    document.body.style.overflow = "";
    return;
  }

  publish({
    visual: next,
    live: true,
    bypass: false,
    nameReady: false,
  });
  timer = window.setTimeout(advance, DWELL[next]);
}

function watchPageAssets() {
  if (document.readyState === "complete") {
    markBootAssetReady("page");
  } else {
    window.addEventListener("load", () => markBootAssetReady("page"), {
      once: true,
    });
  }

  if (document.fonts) {
    document.fonts.ready.then(
      () => markBootAssetReady("fonts"),
      () => markBootAssetReady("fonts")
    );
  } else {
    markBootAssetReady("fonts");
  }

  // Never strand the visitor on the + if an asset fails or WebGL is unavailable
  window.setTimeout(() => {
    waitingOn.clear();
    maybeLeavePlus();
  }, BOOT.maxAssetWait);
}

function ensureBoot() {
  if (started) return;
  started = true;

  if (timer != null) {
    window.clearTimeout(timer);
    timer = null;
  }

  clearIntroPendingHold();

  if (typeof window !== "undefined" && shouldSkipSiteIntro()) {
    publish({
      visual: "done",
      live: false,
      bypass: true,
      nameReady: true,
    });
    document.body.style.overflow = "";
    return;
  }

  document.body.style.overflow = "hidden";
  publish({
    visual: "plus",
    live: true,
    bypass: false,
    nameReady: false,
  });

  watchPageAssets();
  timer = window.setTimeout(() => {
    timer = null;
    plusHeld = true;
    maybeLeavePlus();
  }, DWELL.plus);
}

/**
 * Always runs the boot (≥1s on the +, held until assets load, then square, then expand).
 * Skip only for ?skipIntro=1.
 */
export function useHeroBoot(): BootChrome {
  const [state, setState] = useState<BootChrome>(snap);

  useEffect(() => {
    ensureBoot();
    listeners.add(setState);
    setState(snap);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return state;
}
