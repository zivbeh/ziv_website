"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Planet } from "./Planet";
import { Stars, Html, useProgress, AdaptiveDpr } from "@react-three/drei";
import { CameraControls } from "./CameraControls";
import dynamic from "next/dynamic";
import { EffectComposer, Outline, Selection } from "@react-three/postprocessing";
import { Project } from "@/lib/types";
import type { Vector3 as ThreeVector3 } from "three";
import * as THREE from "three";
import ContactMe from "@/components/ui/ContactMe";
import AboutMe from "@/components/ui/AboutMe";

const SceneLights = () => {
  const { scene } = useThree();
  useMemo(() => {
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    const point = new THREE.PointLight(0xffffff, 1.5);
    point.position.set(10, 10, 10);
    scene.add(ambient);
    scene.add(point);
    return () => {
      scene.remove(ambient);
      scene.remove(point);
    };
  }, [scene]);
  return null;
};

type Category = "Featured" | "Projects" | "Games";

interface ComputedTitle {
  category: Category;
  title: string;
  position: [number, number, number];
}

const featuredProjectIds = ["stealth-founder", "library-seat-radar"];

interface GalaxyProps {
  onPlanetClick: (position: ThreeVector3, id: string) => void;
  projects: Project[];
  cameraTarget: ThreeVector3 | null;
  onCameraYChange?: (y: number) => void;
  showVehicles?: boolean;
  showEffects?: boolean;
  /** If true, render HTML boxes (like About Me) instead of 3D planets */
  useBoxes?: boolean;
  targetSection?: string | null;
  onSectionNavigated?: () => void;
}

export const Galaxy = ({
  onPlanetClick,
  projects,
  cameraTarget,
  onCameraYChange,
  showVehicles = false,
  showEffects = false,
  useBoxes = false,
  targetSection,
  onSectionNavigated,
}: GalaxyProps) => {
  const isCoarsePointer = useMemo(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return false;
    try {
      return window.matchMedia("(pointer: coarse)").matches;
    } catch {
      return false;
    }
  }, []);
  const ISSLazy = useMemo(
    () => dynamic(() => import("./ISS").then((m) => m.ISS), { ssr: false }),
    []
  );
  const SpaceshipLazy = useMemo(
    () => dynamic(() => import("./Spaceship").then((m) => m.Spaceship), { ssr: false }),
    []
  );
  const { active } = useProgress();
  const [cameraY, setCameraY] = useState(0);
  const [cameraTargetY, setCameraTargetY] = useState<number | null>(null);
  const cameraYRef = useRef(0);
  const lastCameraYUpdateRef = useRef(0);
  const pendingCameraYTimeout = useRef<number | null>(null);
  const { planetLayout, titles } = useMemo(() => {
    const placed: (Project & { position: [number, number, number] })[] = [];
    const titles: ComputedTitle[] = [];

    // Utility: simple seeded RNG for consistent jitter
    const seededRandom = (seedStr: string) => {
      let h = 1779033703,
        i = 0,
        ch;
      for (i = 0; i < seedStr.length; i++) {
        ch = seedStr.charCodeAt(i);
        h = Math.imul(h ^ ch, 2654435761);
      }
      return () => {
        h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909);
        return ((h >>> 0) % 1000) / 1000;
      };
    };

    // Group projects by display categories
    const buckets: Record<Category, Project[]> = { Featured: [], Projects: [], Games: [] };
    for (const p of projects) {
      if (featuredProjectIds.includes(p.id)) {
        buckets.Featured.push(p);
      } else if (p.category === "Games") {
        buckets.Games.push(p);
      } else {
        // Treat any non-featured, non-games as Projects
        buckets.Projects.push(p);
      }
    }

    // Mobile (coarse pointer): single-column vertical layout
    if (isCoarsePointer) {
      const rowSpacing = 7;
      const gapBetween = 6;

      // Featured stacked at the top
      const featuredTopY = 0;
      buckets.Featured.slice(0, 2).forEach((p, i) => {
        const y = featuredTopY - i * rowSpacing;
        placed.push({ ...p, position: [0, y, -1] });
      });
      titles.push({ category: "Featured", title: "Featured", position: [0, featuredTopY + 3, 0] });

      // Projects stacked below
      const projectsBaseY = -18; // increase gap from Featured to Projects on phones
      buckets.Projects.forEach((p, i) => {
        const y = projectsBaseY - i * rowSpacing;
        placed.push({ ...p, position: [0, y, 0] });
      });
      titles.push({ category: "Projects", title: "Projects", position: [0, projectsBaseY + 3, 0] });

      // Games stacked below projects
      const gamesBaseY = projectsBaseY - buckets.Projects.length * rowSpacing - gapBetween;
      buckets.Games.forEach((p, i) => {
        const y = gamesBaseY - i * rowSpacing;
        placed.push({ ...p, position: [0, y, 0] });
      });
      if (buckets.Games.length > 0) {
        titles.push({ category: "Games", title: "Games", position: [0, gamesBaseY + 3, 0] });
      }

      // Keep depth nudge for specific projects
      for (let i = 0; i < placed.length; i++) {
        if (placed[i].id === "ai-video-generator") {
          const [x, y, z] = placed[i].position;
          placed[i] = { ...placed[i], position: [x, y, Math.min(z, -2)] };
        }
      }

      return { planetLayout: placed, titles };
    }

    // Desktop/tablet: scattered 3-column grid
    // Featured (top, two planets)
    const featuredPositions: [number, number, number][] = [
      [-4, 0, -1],
      [4, 0, -1],
    ];
    buckets.Featured.slice(0, 2).forEach((p, i) => {
      placed.push({ ...p, position: featuredPositions[i % featuredPositions.length] });
    });
    titles.push({ category: "Featured", title: "Featured", position: [0, 3, 0] });

    // Helper to place a scattered 3-column grid with slight depth and side margins
    const placeScatteredGrid = (
      items: Project[],
      baseY: number,
      seed: string,
      columnsX: [number, number, number] = [-9, 0, 9],
      rowSpacing = 8,
      jitterX = 0,
      jitterY = 1.2,
      jitterZ = 3
    ) => {
      const rng = seededRandom(seed);
      items.forEach((p, index) => {
        const col = index % 3;
        const row = Math.floor(index / 3);
        const xBase = columnsX[col] + (rng() * 2 - 1) * jitterX;
        const x = Math.max(-8.5, Math.min(8.5, xBase));
        const y = baseY - row * rowSpacing + (rng() * 2 - 1) * jitterY;
        const z = (rng() * 2 - 1) * jitterZ;
        placed.push({ ...p, position: [x, y, z] });
      });
      const rows = Math.max(1, Math.ceil(items.length / 3));
      return { rows, rowSpacing };
    };

    // Projects section (scattered grid)
    const projectsBaseY = -12;
    const { rows: projectRows, rowSpacing: prRowSpace } = placeScatteredGrid(
      buckets.Projects,
      projectsBaseY,
      "Projects"
    );
    titles.push({ category: "Projects", title: "Projects", position: [0, projectsBaseY + 3, 0] });

    // Games section (scattered grid below projects)
    const gapBetween = 6;
    const gamesBaseY = projectsBaseY - projectRows * prRowSpace - gapBetween;
    placeScatteredGrid(buckets.Games, gamesBaseY, "Games");
    if (buckets.Games.length > 0) {
      titles.push({ category: "Games", title: "Games", position: [0, gamesBaseY + 3, 0] });
    }

    // Nudge specific project depths for better composition
    for (let i = 0; i < placed.length; i++) {
      if (placed[i].id === "ai-video-generator") {
        const [x, y, z] = placed[i].position;
        placed[i] = { ...placed[i], position: [x, y, Math.min(z, -2)] };
      }
    }

    return { planetLayout: placed, titles };
  }, [projects, isCoarsePointer]);

  const minY = useMemo(() => {
    if (planetLayout.length === 0) return -20;
    return planetLayout.reduce((acc, p) => Math.min(acc, p.position[1]), 0);
  }, [planetLayout]);
  const contactY = Math.floor(minY - 10);
  const aboutY = 10; // position About Me higher for a hero-like opening
  const introOffsetY = 3; // start a bit higher for a gentle settle

  useEffect(() => {
    if (targetSection) {
      let y = 0;
      if (targetSection === "about") {
        y = aboutY;
      } else if (targetSection === "contact") {
        y = contactY;
      } else {
        const title = titles.find(t => t.category.toLowerCase() === targetSection);
        if (title) {
          y = title.position[1];
        }
      }
      setCameraTargetY(y);
      if (onSectionNavigated) {
        onSectionNavigated();
      }
    }
  }, [targetSection, titles, aboutY, contactY, onSectionNavigated]);

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 75 }}
      dpr={isCoarsePointer ? 1 : showEffects ? [1, 2] : 1}
      gl={{ powerPreference: "high-performance" }}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        touchAction: "none",
      }}
    >
      <Suspense fallback={null}>
        {!useBoxes && <AdaptiveDpr pixelated />}
        <SceneLights />
        {!useBoxes && showEffects && (
          <Stars radius={100} depth={50} count={isCoarsePointer ? 2500 : 5000} factor={4} saturation={0} fade />
        )}
        {!useBoxes && showVehicles && (
          <>
            <ISSLazy orbitParams={{ radius: 15, speed: 0.1, yOffset: 5 }} />
            <ISSLazy
              orbitParams={{ radius: 20, speed: 0.08, yOffset: -5 }}
              color="lightblue"
            />
          </>
        )}
        <Selection>
          {!useBoxes && showEffects && !isCoarsePointer && (
            <EffectComposer multisampling={2} autoClear={false}>
              <Outline
                blur
                visibleEdgeColor={0x42a5f5}
                edgeStrength={5}
                width={1000 as unknown as number}
              />
            </EffectComposer>
          )}
          {useBoxes
            ? planetLayout.map((project) => (
                <Html key={project.id} position={project.position} center transform style={{ pointerEvents: "auto" }}>
                  <button
                    onClick={() => onPlanetClick(new THREE.Vector3(...project.position), project.id)}
                    className="block w-[min(90vw,420px)] rounded-xl bg-black/50 border border-white/10 shadow-2xl backdrop-blur p-4 text-left hover:bg-black/60 transition-colors"
                  >
                    <div className="text-white text-xl font-semibold mb-2">{project.name}</div>
                    {project.description && (
                      <div className="text-white/80 text-sm leading-relaxed line-clamp-3">{project.description}</div>
                    )}
                    {Array.isArray((project as any).tools) && (project as any).tools.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {(project as any).tools.slice(0, 6).map((t: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 rounded-full text-xs bg-white/10 text-white/90 border border-white/10">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                </Html>
              ))
            : planetLayout.map((project) => (
                <Planet
                  key={project.id}
                  project={project}
                  position={project.position}
                  onClick={(position) => onPlanetClick(position, project.id)}
                  showVehicle={showVehicles}
                />
              ))}
        </Selection>
        {titles.map(({ category, title, position }) => (
          <Html key={category} position={position} center style={{ pointerEvents: "none" }}>
            <h2
              className="text-6xl font-bold text-white tracking-wider"
              style={{ textShadow: "0 0 15px rgba(255, 255, 255, 0.5)" }}
            >
              {title}
            </h2>
          </Html>
        ))}

        {/* About Me panel, appears only after scrolling down a bit */}
        {cameraY >= -3 && (
          <Html position={[0, aboutY, 0]} center transform style={{ pointerEvents: "auto" }}>
            <div className="w-[min(92vw,900px)] mx-auto transition-opacity duration-500 mt-[-8vh] md:mt-[-10vh]">
              <AboutMe />
            </div>
          </Html>
        )}

        {/* Contact section placed below the Games planets */}
        <Html position={[0, contactY, 0]} center transform style={{ pointerEvents: "auto" }}>
          <div className="w-[min(92vw,980px)]">
            <ContactMe />
          </div>
        </Html>
        {!useBoxes && showVehicles && !isCoarsePointer && <SpaceshipLazy planetLayout={planetLayout} />}
        <CameraControls
          targetPosition={cameraTarget}
          yRange={[Math.floor(minY - 6), 13]}
          initialY={aboutY}
          introHold={true}
          introOffsetY={introOffsetY}
          introTrigger={!active}
          wheelEnabled={!active}
          targetYProp={cameraTargetY}
          onTargetReached={() => setCameraTargetY(null)}
          onCameraYChange={(y) => {
            cameraYRef.current = y;
            const now = performance.now();
            const throttleMs = 30;
            if (now - lastCameraYUpdateRef.current >= throttleMs) {
              lastCameraYUpdateRef.current = now;
              setCameraY(y);
              if (onCameraYChange) onCameraYChange(y);
            } else if (pendingCameraYTimeout.current === null) {
              const remaining = throttleMs - (now - lastCameraYUpdateRef.current);
              pendingCameraYTimeout.current = window.setTimeout(() => {
                lastCameraYUpdateRef.current = performance.now();
                pendingCameraYTimeout.current = null;
                setCameraY(cameraYRef.current);
                if (onCameraYChange) onCameraYChange(cameraYRef.current);
              }, Math.max(10, remaining));
            }
          }}
        />
      </Suspense>
    </Canvas>
  );
};
