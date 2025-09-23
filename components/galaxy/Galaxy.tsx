"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useState } from "react";
import { Planet } from "./Planet";
import { Stars, Html, useProgress } from "@react-three/drei";
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
}

export const Galaxy = ({
  onPlanetClick,
  projects,
  cameraTarget,
  onCameraYChange,
  showVehicles = false,
  showEffects = false,
}: GalaxyProps) => {
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
      jitterX = 0.8,
      jitterY = 1.2,
      jitterZ = 3
    ) => {
      const rng = seededRandom(seed);
      items.forEach((p, index) => {
        const col = index % 3;
        const row = Math.floor(index / 3);
        const xBase = columnsX[col] + (rng() * 2 - 1) * jitterX;
        const x = Math.max(-9.5, Math.min(9.5, xBase));
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
  }, [projects]);

  const minY = useMemo(() => {
    if (planetLayout.length === 0) return -20;
    return planetLayout.reduce((acc, p) => Math.min(acc, p.position[1]), 0);
  }, [planetLayout]);
  const contactY = Math.floor(minY - 10);
  const aboutY = 10; // position About Me higher for a hero-like opening
  const introOffsetY = 3; // start a bit higher for a gentle settle

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      dpr={showEffects ? [1, 2] : 1}
      gl={{ powerPreference: "high-performance" }}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Suspense fallback={null}>
        <SceneLights />
        {showEffects && (
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        )}
        {showVehicles && (
          <>
            <ISSLazy orbitParams={{ radius: 15, speed: 0.1, yOffset: 5 }} />
            <ISSLazy
              orbitParams={{ radius: 20, speed: 0.08, yOffset: -5 }}
              color="lightblue"
            />
          </>
        )}
        <Selection>
          {showEffects && (
            <EffectComposer multisampling={2} autoClear={false}>
              <Outline
                blur
                visibleEdgeColor={0x42a5f5}
                edgeStrength={5}
                width={1000 as unknown as number}
              />
            </EffectComposer>
          )}
          {planetLayout.map((project) => {
            const diffY = Math.abs(project.position[1] - cameraY);
            const loadRange = 22; // planets within this Y-distance should start loading
            const priorityRange = 10; // closest planets load textures eagerly
            const labelRange = 28; // show labels a bit earlier
            const shouldLoadTexture = diffY <= loadRange;
            const eagerTextureLoad = diffY <= priorityRange;
            const showLabel = diffY <= labelRange;
            return (
              <Planet
                key={project.id}
                project={project}
                position={project.position}
                onClick={(position) => onPlanetClick(position, project.id)}
                showVehicle={showVehicles && shouldLoadTexture}
                shouldLoadTexture={shouldLoadTexture}
                eagerTextureLoad={eagerTextureLoad}
                showLabel={showLabel}
                animate={eagerTextureLoad}
              />
            );
          })}
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
        {showVehicles && <SpaceshipLazy planetLayout={planetLayout} />}
        <CameraControls
          targetPosition={cameraTarget}
          yRange={[Math.floor(minY - 6), 13]}
          initialY={aboutY}
          introHold={true}
          introOffsetY={introOffsetY}
          introTrigger={!active}
          wheelEnabled={!active}
          onCameraYChange={(y) => {
            setCameraY(y);
            if (onCameraYChange) onCameraYChange(y);
          }}
        />
      </Suspense>
    </Canvas>
  );
};
