// @ts-nocheck
"use client";

import { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, TextureLoader, Vector3, BackSide } from "three";
import { Html } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import { PlanetVehicle } from "./PlanetVehicle";
import { Project } from "@/lib/types";

interface PlanetProps {
  project: Project & { position: [number, number, number] };
  onClick: (position: Vector3, id: string) => void;
  position: [number, number, number];
}

export const Planet = ({ project, onClick, position }: PlanetProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useLoader(
    TextureLoader,
    project.texture || "/textures/planets/2k_moon.jpg"
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
    if (meshRef.current) {
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
          <sphereGeometry args={[planetSize, 32, 32]} />
          <meshStandardMaterial
            map={texture}
          />
          <PlanetVehicle project={project} planetSize={planetSize} />
        </mesh>
      </Select>
      <Html position={[0, planetSize + 1, 0]} center style={{ pointerEvents: "none" }}>
        <div
          className="text-white text-center text-lg font-bold whitespace-normal break-words max-w-[220px] px-2"
          style={{ textShadow: "0 0 8px black, 0 0 8px black" }}
        >
          {project.name}
        </div>
      </Html>
    </group>
  );
};
