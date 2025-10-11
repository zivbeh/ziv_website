"use client";

import { useState, useEffect } from "react";
import { Academics } from "@/components/ui/Academics";
import { Stars2D } from "@/components/ui/Stars2D";
import { TopBar } from "@/components/ui/TopBar";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function AcademicsPage() {
  const [useBoxes, setUseBoxes] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Determine mode on mount (avoid SSR/client mismatch)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get("mode");
    const urlBoxes = params.get("boxes");
    let prefersBoxes = true;
    try {
      const saved = localStorage.getItem("preferredMode");
      if (saved === "3d") {
        prefersBoxes = false;
      }
    } catch {}
    if (urlBoxes === "1" || urlMode === "boxes") {
      prefersBoxes = true;
    }
    if (urlMode === "3d") {
      prefersBoxes = false;
    }
    setUseBoxes(prefersBoxes);
    setIsReady(true);
  }, []);

  // Listen for global mode changes from TopBar
  useEffect(() => {
    const handler = (e: Event) => {
      const anyEvent = e as unknown as { detail?: string };
      const mode = anyEvent.detail === "boxes" ? "boxes" : "3d";
      setUseBoxes(mode === "boxes");
    };
    window.addEventListener("preferredModeChange", handler as EventListener);
    return () => window.removeEventListener("preferredModeChange", handler as EventListener);
  }, []);

  const handleModeSwitch = (mode: "3d" | "boxes") => {
    try {
      localStorage.setItem("preferredMode", mode);
    } catch {}
    setUseBoxes(mode === "boxes");
  };

  const handleNavigate = (section: string) => {
    // Always switch to boxed view when navigating from academics page
    const params = new URLSearchParams();
    params.set("boxes", "1");
    
    if (section !== "home" && section !== "academics") {
      params.set("section", section);
    }
    const url = `/?${params.toString()}`;
    window.location.href = url;
  };

  const handleBackToPortfolio = () => {
    handleNavigate("home");
  };

  return (
    <main className="min-h-screen bg-black">
      <Stars2D />
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopBar
          onSwitch={handleModeSwitch}
          initialMode={useBoxes ? "boxes" : "3d"}
          onNavigate={handleNavigate}
        />
      </div>
      <div className="fixed top-8 left-8 z-[100] pt-16">
        <button
          onClick={handleBackToPortfolio}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all"
        >
          &larr; Back to Portfolio
        </button>
      </div>
      {isReady && <Academics />}
    </main>
  );
}
