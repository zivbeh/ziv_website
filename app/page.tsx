// @ts-nocheck
"use client";

import { BoxesView } from "@/components/ui/BoxesView";
import { Stars2D } from "@/components/ui/Stars2D";
import { ProjectView } from "@/components/ui/ProjectView";
import { projects } from "@/lib/projects";
import { Project } from "@/lib/types";
import { useEffect, useState } from "react";
import { TopBar } from "@/components/ui/TopBar";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Initialize and handle section navigation
  useEffect(() => {
    setIsReady(true);
    
    // Handle section navigation after a delay to ensure DOM is ready
    const params = new URLSearchParams(window.location.search);
    const urlSection = params.get("section");
    if (urlSection) {
      setTimeout(() => {
        const el = document.getElementById(urlSection);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          // Try again after a longer delay
          setTimeout(() => {
            const el2 = document.getElementById(urlSection);
            if (el2) {
              el2.scrollIntoView({ behavior: "smooth" });
            }
          }, 500);
        }
      }, 300);
    }
  }, []);

  const handleClose = () => {
    setSelectedProject(null);
  };


  return (
    <main className="min-h-screen bg-black">
      <TopBar
        onNavigate={(section) => {
          const el = document.getElementById(section);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {isReady && (
        <div key="boxes">
          <Stars2D />
          <BoxesView
            projects={projects}
            onSelect={(project) => {
              setSelectedProject(project);
            }}
          />
        </div>
      )}
      <ProjectView project={selectedProject} onClose={handleClose} />
    </main>
  );
}
