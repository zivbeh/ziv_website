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

/** Module singleton — survives Strict Mode remounts */
let snap: BootChrome = { ...INITIAL };
let started = false;
let timer: number | null = null;
const listeners = new Set<(s: BootChrome) => void>();

function publish(next: BootChrome) {
  snap = next;
  listeners.forEach((fn) => fn(snap));
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

  const advance = () => {
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
  };

  timer = window.setTimeout(advance, DWELL.plus);
}

/**
 * Always runs the boot (≥1s on the +, then square, then expand).
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
