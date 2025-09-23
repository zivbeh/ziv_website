"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export const ISS = ({
  orbitParams = { radius: 15, speed: 0.1, yOffset: 2 },
  color = "hotpink",
}) => {
  const { scene } = useGLTF("/models/iss.glb");
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const issRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Keep only the largest visible group in the model to remove stray pieces
    const removeSmallerGroups = (parent: THREE.Object3D) => {
      const sizedChildren = parent.children
        .map((child) => {
          const box = new THREE.Box3().setFromObject(child);
          const size = new THREE.Vector3();
          box.getSize(size);
          const volume = size.x * size.y * size.z;
          return { child, volume };
        })
        .filter(({ volume }) => Number.isFinite(volume) && volume > 0);

      if (sizedChildren.length <= 1) return false;

      sizedChildren.sort((a, b) => b.volume - a.volume);
      for (let i = 1; i < sizedChildren.length; i++) {
        parent.remove(sizedChildren[i].child);
      }
      return true;
    };

    // Try to clean at root; if only one candidate, try one level deeper
    let cleaned = removeSmallerGroups(clonedScene);
    if (!cleaned && clonedScene.children[0]) {
      cleaned = removeSmallerGroups(clonedScene.children[0]);
    }

    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color: color,
        });
      }
    });
  }, [clonedScene, color]);

  useFrame(({ clock }) => {
    if (issRef.current) {
      const t = clock.getElapsedTime() * orbitParams.speed;
      issRef.current.position.x = Math.sin(t) * orbitParams.radius;
      issRef.current.position.z = Math.cos(t) * orbitParams.radius;
      issRef.current.position.y = Math.sin(t * 0.5) * orbitParams.yOffset;
      issRef.current.rotation.y += 0.002;
    }
  });

  return <primitive object={clonedScene} ref={issRef} scale={0.05} />;
};
