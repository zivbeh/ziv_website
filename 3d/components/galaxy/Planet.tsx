// @ts-nocheck
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, TextureLoader, Vector3, BackSide } from "three";
import { Html } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import dynamic from "next/dynamic";
import { Project } from "@/lib/types";

interface PlanetProps {
  project: Project & { position: [number, number, number] };
  onClick: (position: Vector3, id: string) => void;
  position: [number, number, number];
  showVehicle?: boolean;
  shouldLoadTexture?: boolean;
  eagerTextureLoad?: boolean;
  showLabel?: boolean;
  animate?: boolean;
  segments?: number;
}

export const Planet = ({ project, onClick, position, showVehicle = false, shouldLoadTexture = true, eagerTextureLoad = false, showLabel = true, animate = true, segments = 32 }: PlanetProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  // Delay texture loading and prioritize nearby planets
  const [allowTextureLoad, setAllowTextureLoad] = useState(eagerTextureLoad);
  const texture = useLoader(
    TextureLoader,
    allowTextureLoad ? (project.texture || "/textures/planets/2k_moon.jpg") : "/textures/planets/2k_moon.jpg"
  );
  // Improve texture sampling progressively as it loads
  useEffect(() => {
    if (texture && (texture as any).anisotropy !== undefined) {
      // Start with low anisotropy; increase when eager/nearby
      const gl = (document.querySelector('canvas') as HTMLCanvasElement | null)?.getContext('webgl2') as WebGL2RenderingContext | null;
      const max = (gl && (gl as any).getParameter) ? (gl as any).getParameter((gl as any).MAX_TEXTURE_MAX_ANISOTROPY_EXT ?? 8) : 8;
      (texture as any).anisotropy = eagerTextureLoad ? Math.min(8, max || 8) : 2;
      texture.needsUpdate = true;
    }
  }, [texture, eagerTextureLoad]);
  useEffect(() => {
    if (!allowTextureLoad && shouldLoadTexture) {
      const anyWindow = window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void };
      const schedule = (cb: () => void) => {
        if (eagerTextureLoad) {
          cb();
          return;
        }
        if (anyWindow.requestIdleCallback) {
          anyWindow.requestIdleCallback(cb, { timeout: 1200 });
        } else {
          setTimeout(cb, 400);
        }
      };
      schedule(() => setAllowTextureLoad(true));
    }
  }, [allowTextureLoad, shouldLoadTexture, eagerTextureLoad]);
  const PlanetVehicle = useMemo(
    () => dynamic(() => import("./PlanetVehicle").then((m) => m.PlanetVehicle), { ssr: false }),
    []
  );

  const sizeMap = {
    large: 3.5,
    medium: 2.5,
    small: 1.5,
  } as const;

  // Deterministic size jitter per planet id
  const baseSize = sizeMap[(project.size as keyof typeof sizeMap) || "small"] || 1.5;
  let hash = 0;
  for (let i = 0; i < project.id.length; i++) {
    hash = (hash * 31 + project.id.charCodeAt(i)) >>> 0;
  }
  const rand = ((hash % 1000) / 1000) * 2 - 1; // [-1,1]
  const planetSize = Math.max(1, baseSize + rand * 0.6);

  useFrame((state, delta) => {
    if (meshRef.current && animate) {
      meshRef.current.rotation.y += 0.05 * delta;
    }
  });

  return (
    <group
      position={position}
      onClick={() => onClick(new Vector3(...position), project.id)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Select enabled={hovered}>
        <mesh ref={meshRef}>
        <sphereGeometry args={[planetSize, segments, segments]} />
          <meshStandardMaterial
            map={texture}
          />
          {showVehicle && <PlanetVehicle project={project} planetSize={planetSize} />}
        </mesh>
      </Select>
      {showLabel && (
        <Html position={[0, planetSize + 1, 0]} center style={{ pointerEvents: "none" }}>
        <div
          className="text-white text-center text-lg font-bold whitespace-normal break-words max-w-[220px] px-2"
          style={{ textShadow: "0 0 8px black, 0 0 8px black" }}
        >
          {project.name}
        </div>
        </Html>
      )}
    </group>
  );
};
