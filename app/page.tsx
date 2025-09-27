"use client";

import dynamic from "next/dynamic";
import { BoxesView } from "@/components/ui/BoxesView";
import { Stars2D } from "@/components/ui/Stars2D";
import { ProjectView } from "@/components/ui/ProjectView";
import { Preloader } from "@/components/ui/Preloader";
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
  const [useBoxes, setUseBoxes] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [enableShip2D, setEnableShip2D] = useState(true);
  const [modeChosen, setModeChosen] = useState(true);

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

  // Listen for global mode changes from TopBar
  useEffect(() => {
    const handler = (e: Event) => {
      const anyEvent = e as unknown as { detail?: string };
      const mode = anyEvent.detail === "boxes" ? "boxes" : "3d";
      setUseBoxes(mode === "boxes");
      setModeChosen(true);
      if (mode === "boxes") {
        setSelectedProject(null);
        setIsZoomed(false);
        setCameraTarget(null);
      }
    };
    window.addEventListener("preferredModeChange", handler as EventListener);
    return () => window.removeEventListener("preferredModeChange", handler as EventListener);
  }, []);

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
    setModeChosen(true);
    if (mode === "boxes") {
      setSelectedProject(null);
      setIsZoomed(false);
      setCameraTarget(null);
    }
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Mode selection gate BEFORE any heavy preload */}

      {/* Only show the 3D preloader when 3D mode is chosen */}
      {isReady && modeChosen && !useBoxes && (
        <Preloader
          minDurationMs={2000}
          showModeSelector={false}
          onModeSelected={(mode) => {
            // Not used when showModeSelector=false, but keep for safety
            handleModeSwitch(mode);
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
          modeChosen ? (
            <GalaxyLazy
              key="3d"
              onPlanetClick={handlePlanetClick}
              projects={projects}
              cameraTarget={cameraTarget}
              showVehicles={showVehicles}
              showEffects={showEffects}
              useBoxes={false}
            />
          ) : null
        )
      )}
      <ProjectView project={selectedProject} onClose={handleClose} />
      {/* ContactMe is now rendered inside the 3D galaxy below the Games section */}
    </main>
  );
}
