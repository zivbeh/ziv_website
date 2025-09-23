"use client";

import { Galaxy } from "@/components/galaxy/Galaxy";
import { ProjectView } from "@/components/ui/ProjectView";
import { Preloader } from "@/components/ui/Preloader";
// import AboutMe from "@/components/ui/AboutMe";
import { projects } from "@/lib/projects";
import { Project } from "@/lib/types";
import { useState } from "react";
import { Vector3 } from "three";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cameraTarget, setCameraTarget] = useState<Vector3 | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

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

  return (
    <main className="min-h-screen bg-black">
      <Preloader />
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
      <Galaxy
        onPlanetClick={handlePlanetClick}
        projects={projects}
        cameraTarget={cameraTarget}
      />
      <ProjectView project={selectedProject} onClose={handleClose} />
      {/* ContactMe is now rendered inside the 3D galaxy below the Games section */}
    </main>
  );
}
