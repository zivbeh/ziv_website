"use client";

import { useEffect, useMemo, useState } from "react";
import { useProgress } from "@react-three/drei";

interface PreloaderProps {
  /**
   * If true, keeps the preloader visible regardless of loading state
   * Useful if you need to hold the screen for an initial hero animation.
   */
  forceShow?: boolean;
  /** Minimum time to show the loader (ms) to avoid flash */
  minDurationMs?: number;
  /** Callback when the preloader has fully hidden (after fade out) */
  onHidden?: () => void;
  /** Optional callback when the user explicitly chooses a mode */
  onModeSelected?: (mode: "3d" | "boxes") => void;
  /** Control whether the mode selection UI is shown at all */
  showModeSelector?: boolean;
}

export function Preloader({ forceShow = false, minDurationMs = 600, onHidden, onModeSelected, showModeSelector = true }: PreloaderProps) {
  const { active, progress } = useProgress();
  const [mountedAt] = useState(() => performance.now());
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [userChoseMode, setUserChoseMode] = useState<null | "3d" | "boxes">(null);
  const [hasPreferredMode, setHasPreferredMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("preferredMode");
      return saved === "3d" || saved === "boxes";
    } catch {
      return false;
    }
  });

  const messages = useMemo(
    () => [
      "Booting thrusters",
      "Plotting orbits",
      "Warming up shaders",
      "Calibrating camera",
      "Loading projects",
    ],
    []
  );

  // Gate hiding until both loading is inactive and minimum duration elapsed
  useEffect(() => {
    if (forceShow) return;
    if (!active) {
      const elapsed = performance.now() - mountedAt;
      const remaining = Math.max(0, minDurationMs - elapsed);
      const t = window.setTimeout(() => setReady(true), remaining);
      return () => window.clearTimeout(t);
    }
  }, [active, forceShow, minDurationMs, mountedAt]);

  // After we flag ready, delay a bit to let CSS fade complete, then unmount
  useEffect(() => {
    if (ready) {
      const t = window.setTimeout(() => setHidden(true), 500);
      return () => window.clearTimeout(t);
    }
  }, [ready]);

  // Notify when fully hidden
  useEffect(() => {
    if (hidden && onHidden) {
      onHidden();
    }
  }, [hidden, onHidden]);

  const pct = useMemo(() => Math.round(progress), [progress]);

  // Rotate loading messages while active
  useEffect(() => {
    if (ready) return;
    const t = window.setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, 1400);
    return () => window.clearInterval(t);
  }, [messages.length, ready]);

  // Lightweight device heuristic to suggest a mode
  const recommendedMode = useMemo(() => {
    const navAny = navigator as any;
    const deviceMemory = typeof navAny.deviceMemory === "number" ? navAny.deviceMemory : undefined; // in GB
    const cores = typeof navigator.hardwareConcurrency === "number" ? navigator.hardwareConcurrency : undefined;
    const isLowEnd =
      (deviceMemory !== undefined && deviceMemory <= 4) ||
      (cores !== undefined && cores <= 4) ||
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    return isLowEnd ? "boxes" : "3d";
  }, []);

  const handleChoose = (mode: "3d" | "boxes") => {
    try {
      localStorage.setItem("preferredMode", mode);
    } catch {}
    setUserChoseMode(mode);
    setHasPreferredMode(true);
    // Inform parent immediately so it can swap views without reload
    if (onModeSelected) onModeSelected(mode);
    // If user chose boxes, we can fade out immediately since we won't wait on 3D assets
    if (mode === "boxes") {
      setReady(true);
    }
  };

  if (hidden) return null;

  return (
    <div
      aria-hidden={ready}
      className="fixed inset-0 z-[100] grid place-items-center bg-black transition-opacity duration-500"
      style={{
        opacity: ready ? 0 : 1,
        pointerEvents: ready ? "none" : "auto",
      }}
    >
      <div className="flex flex-col items-center gap-5 select-none">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-2 border-white/15" />
          <div
            className="absolute inset-0 rounded-full border-2 border-white"
            style={{
              // simple spinner
              clipPath: "polygon(50% 0%, 100% 0, 100% 100%, 50% 100%)",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
        <div className="text-white text-base font-medium tracking-wide">{messages[msgIndex]}…</div>
        <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white"
            style={{ width: `${Math.max(4, pct)}%`, transition: "width 0.2s ease-out" }}
          />
        </div>
        <div className="text-white/70 text-xs">{pct}%</div>

        {/* Mode selection: show only if no saved preference exists */}
        {showModeSelector && !hasPreferredMode && (
          <div className="mt-4 w-[min(92vw,640px)] text-center">
            <div className="text-white/80 text-xs mb-2">
              {recommendedMode === "boxes" ? (
                <span>
                  Based on your device, <span className="text-white font-medium">Light Mode</span> is recommended.
                </span>
              ) : (
                <span>
                  Your device can likely handle the <span className="text-white font-medium">3D Experience</span>.
                </span>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2">
              <button
                onClick={() => handleChoose("3d")}
                className={`px-4 py-2 rounded-md border text-sm transition-colors ${
                  recommendedMode === "3d"
                    ? "bg-white text-black border-white"
                    : "bg-black/40 text-white border-white/20 hover:bg-white/10"
                }`}
              >
                3D Experience
                {recommendedMode === "3d" && <span className="ml-2 text-[10px] uppercase">(Recommended)</span>}
              </button>
              <button
                onClick={() => handleChoose("boxes")}
                className={`px-4 py-2 rounded-md border text-sm transition-colors ${
                  recommendedMode === "boxes"
                    ? "bg-white text-black border-white"
                    : "bg-black/40 text-white border-white/20 hover:bg-white/10"
                }`}
              >
                Light Mode (Boxes)
                {recommendedMode === "boxes" && <span className="ml-2 text-[10px] uppercase">(Recommended)</span>}
              </button>
            </div>
            {userChoseMode && (
              <div className="mt-1 text-white/60 text-[11px]">Preference saved. You can change it next time.</div>
            )}
          </div>
        )}
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}


