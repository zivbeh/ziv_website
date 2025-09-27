"use client";

import { useEffect, useState } from "react";

export function TopBar() {
  const [activeMode, setActiveMode] = useState<"3d" | "boxes">("boxes");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("preferredMode");
      if (saved === "boxes" || saved === "3d") setActiveMode(saved);
    } catch {}
  }, []);

  const handleModeSwitch = (mode: "3d" | "boxes") => {
    try {
      localStorage.setItem("preferredMode", mode);
    } catch {}
    setActiveMode(mode);
    try {
      const evt = new CustomEvent("preferredModeChange", { detail: mode });
      window.dispatchEvent(evt);
    } catch {}
  };

  return (
    <div className="fixed inset-x-0 top-0 z-[300] pointer-events-none">
      {/* Top-left profile/info */}
      <div className="absolute top-4 left-4 pointer-events-auto">
        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-sm rounded-lg p-2.5 shadow-2xl">
          <img src="/profile.JPG" alt="Ziv profile" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h1 className="text-sm font-semibold text-white">Ziv Behar</h1>
            <p className="text-white/80 text-xs max-w-xs">Electrical and Software Engineering, AI, Full Stack Web, and games. Scroll to explore my projects.</p>
          </div>
        </div>
      </div>

      {/* Top-right mode switcher */}
      <div className="absolute top-4 right-4 pointer-events-auto">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-lg p-2.5 shadow-2xl">
          <button
            onClick={() => handleModeSwitch(activeMode === "3d" ? "boxes" : "3d")}
            className="bg-transparent text-white md:hover:bg-white/10 px-3 py-1.5 rounded-md text-xs border border-white/20 transition-colors"
          >
            {activeMode === "3d" ? "Switch to Boxed Portfolio" : "Switch to 3D Portfolio"}
          </button>
        </div>
      </div>
    </div>
  );
}


