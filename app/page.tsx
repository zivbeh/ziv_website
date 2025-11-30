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
        if (urlSection === "about") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        const el = document.getElementById(urlSection);
        if (el) {
          if (urlSection === "featured") {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          } else {
            el.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          // Try again after a longer delay
          setTimeout(() => {
            const el2 = document.getElementById(urlSection);
            if (el2) {
              if (urlSection === "featured") {
                el2.scrollIntoView({ behavior: "smooth", block: "center" });
              } else {
                el2.scrollIntoView({ behavior: "smooth" });
              }
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
          // Close project view if open
          if (selectedProject) {
            setSelectedProject(null);
          }
          // Small delay to ensure overlay is closed before scrolling
          setTimeout(() => {
            if (section === "about") {
              window.scrollTo({ top: 0, behavior: "smooth" });
              return;
            }
            const el = document.getElementById(section);
            if (el) {
              if (section === "featured") {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
              } else {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }
          }, 100);
        }}
        onCloseOverlay={() => {
          // Close project view if open when navigating to academics page
          if (selectedProject) {
            setSelectedProject(null);
          }
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
