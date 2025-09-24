"use client";

import dynamic from "next/dynamic";
import { BoxesView } from "@/components/ui/BoxesView";
import { Stars2D } from "@/components/ui/Stars2D";
import { ProjectView } from "@/components/ui/ProjectView";
import { Preloader } from "@/components/ui/Preloader";
// import AboutMe from "@/components/ui/AboutMe";
import { projects } from "@/lib/projects";
import { Project } from "@/lib/types";
import { startTransition, useEffect, useMemo, useState } from "react";
import { Vector3 } from "three";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cameraTarget, setCameraTarget] = useState<Vector3 | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showVehicles, setShowVehicles] = useState(false);
  const [showEffects, setShowEffects] = useState(false);
  const [useBoxes, setUseBoxes] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [enableShip2D, setEnableShip2D] = useState(true);

  // Determine mode on mount (avoid SSR/client mismatch)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get("mode");
    const urlBoxes = params.get("boxes");
    let prefersBoxes = false;
    try {
      const saved = localStorage.getItem("preferredMode");
      if (saved === "boxes") prefersBoxes = true;
      if (saved === "3d") prefersBoxes = false;
    } catch {}
    if (urlBoxes === "1" || urlMode === "boxes") prefersBoxes = true;
    if (urlMode === "3d") prefersBoxes = false;
    setUseBoxes(prefersBoxes);
    setIsReady(true);
  }, []);

  // Lazy-load Galaxy to avoid pulling three.js when in boxes mode
  const GalaxyLazy = useMemo(
    () => dynamic(() => import("@/components/galaxy/Galaxy").then((m) => m.Galaxy), { ssr: false }),
    []
  );

  // Force a full reload when the user leaves and returns (tab hidden → visible, or BFCache restore)
  useEffect(() => {
    if (useBoxes) return; // skip in boxes mode to avoid unnecessary listeners
    let wasHidden = false;

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        wasHidden = true;
      } else if (document.visibilityState === "visible" && wasHidden) {
        window.location.reload();
      }
    };

    const onPageShow = (e: PageTransitionEvent) => {
      // If restored from bfcache, force a reload to release GPU/JS resources and start clean
      if ((e as any).persisted) {
        window.location.reload();
      }
    };

    const onFocus = () => {
      if (wasHidden) {
        window.location.reload();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("focus", onFocus);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("focus", onFocus);
    };
  }, [useBoxes]);

  const handlePlanetClick = (position: Vector3, projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setCameraTarget(new Vector3(position.x, position.y, position.z + 5));
      setIsZoomed(true);
      setTimeout(() => {
        setSelectedProject(project);
      }, 2000); // Wait for zoom-in animation
    }
  };

  const handleClose = () => {
    setSelectedProject(null);
    setIsZoomed(false);
    setCameraTarget((prev) => new Vector3(0, (prev?.y ?? 0), 10));
  };

  const handleModeSwitch = (mode: "3d" | "boxes") => {
    try {
      localStorage.setItem("preferredMode", mode);
    } catch {}
    setUseBoxes(mode === "boxes");
    if (mode === "boxes") {
      setSelectedProject(null);
      setIsZoomed(false);
      setCameraTarget(null);
    }
  };

  return (
    <main className="min-h-screen bg-black">
      {isReady && !useBoxes && (
        <Preloader
          minDurationMs={2000}
          showModeSelector={false}
          onModeSelected={(mode) => {
            // Immediately switch mode based on user choice
            setUseBoxes(mode === "boxes");
          }}
          onHidden={() => {
            const schedule = (cb: () => void, delay = 800) => {
              const anyWindow = window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void };
              if (anyWindow.requestIdleCallback) {
                anyWindow.requestIdleCallback(() => { setTimeout(cb, 0); }, { timeout: 1200 });
              } else {
                setTimeout(cb, delay);
              }
            };
            schedule(() => startTransition(() => setShowVehicles(true)), 800);
            schedule(() => startTransition(() => setShowEffects(true)), 1200);
          }}
        />
      )}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-sm rounded-lg p-2.5 shadow-2xl">
          <img
            src="/profile.JPG"
            alt="Ziv profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h1 className="text-sm font-semibold text-white">Ziv Beh</h1>
            <p className="text-white/80 text-xs max-w-xs">AI, web, and games. Scroll to explore.</p>
          </div>
        </div>
      </div>
      {/* Top-right mode switcher */}
      <div className="absolute top-4 right-4 z-[200] pointer-events-auto">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-lg p-2.5 shadow-2xl">
          <button
            onClick={() => handleModeSwitch("3d")}
            className={`${!useBoxes ? "bg-white text-black" : "bg-transparent text-white hover:bg-white/10"} px-3 py-1.5 rounded-md text-xs border border-white/20 transition-colors`}
            aria-pressed={!useBoxes}
          >
            3D
          </button>
          <button
            onClick={() => handleModeSwitch("boxes")}
            className={`${useBoxes ? "bg-white text-black" : "bg-transparent text-white hover:bg-white/10"} px-3 py-1.5 rounded-md text-xs border border-white/20 transition-colors`}
            aria-pressed={useBoxes}
          >
            Boxes
          </button>
        </div>
      </div>
      {isReady && (
        useBoxes ? (
          <div key="boxes">
            <Stars2D />
            <BoxesView
              projects={projects}
              onSelect={(project) => {
                setSelectedProject(project);
              }}
            />
          </div>
        ) : (
          <GalaxyLazy
            key="3d"
            onPlanetClick={handlePlanetClick}
            projects={projects}
            cameraTarget={cameraTarget}
            showVehicles={showVehicles}
            showEffects={showEffects}
            useBoxes={false}
          />
        )
      )}
      <ProjectView project={selectedProject} onClose={handleClose} />
      {/* ContactMe is now rendered inside the 3D galaxy below the Games section */}
    </main>
  );
}
