"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export function TopBar() {
  const [activeMode, setActiveMode] = useState<"3d" | "boxes">("boxes");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("preferredMode");
      if (saved === "boxes" || saved === "3d") setActiveMode(saved);
    } catch {}
  }, []);

  const handleModeSwitch = (mode: "3d" | "boxes") => {
    try {
      localStorage.setItem("preferredMode", mode);
    } catch {}
    setActiveMode(mode);
    try {
      const evt = new CustomEvent("preferredModeChange", { detail: mode });
      window.dispatchEvent(evt);
    } catch {}
    setIsMenuOpen(false); // Close menu on mode switch
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[300] pointer-events-none">
        {/* Desktop top bar */}
        <div className="hidden md:flex justify-between items-start p-4">
          {/* Top-left profile/info */}
          <div className="pointer-events-auto">
            <div className="flex items-center gap-3 bg-black/60 backdrop-blur-sm rounded-lg p-2.5 shadow-2xl">
              <img src="/profile.JPG" alt="Ziv profile" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h1 className="text-sm font-semibold text-white">Ziv Behar</h1>
                <p className="text-white/80 text-xs max-w-xs">Electrical and Software Engineering, AI, Full Stack Web, and games. Scroll to explore my projects.</p>
              </div>
            </div>
          </div>

          {/* Top-right mode switcher */}
          <div className="pointer-events-auto">
            <div className="flex items-center gap-4 bg-black/60 backdrop-blur-sm rounded-lg p-2.5 shadow-2xl">
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }} className="text-white/80 hover:text-white text-xs transition-colors">About</a>
              <a href="#featured" onClick={(e) => { e.preventDefault(); scrollTo('featured'); }} className="text-white/80 hover:text-white text-xs transition-colors">Featured</a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }} className="text-white/80 hover:text-white text-xs transition-colors">Projects</a>
              <a href="#games" onClick={(e) => { e.preventDefault(); scrollTo('games'); }} className="text-white/80 hover:text-white text-xs transition-colors">Games</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }} className="text-white/80 hover:text-white text-xs transition-colors">Contact</a>

              <button
                onClick={() => handleModeSwitch(activeMode === "3d" ? "boxes" : "3d")}
                className="bg-transparent text-white md:hover:bg-white/10 px-3 py-1.5 rounded-md text-xs border border-white/20 transition-colors"
              >
                {activeMode === "3d" ? "Switch to Boxed Portfolio" : "Switch to 3D Portfolio"}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile top bar */}
        <div className="md:hidden flex justify-between items-center p-4 pointer-events-auto">
           <div className="flex items-center gap-3 bg-black/60 backdrop-blur-sm rounded-lg p-2.5 shadow-2xl">
              <img src="/profile.JPG" alt="Ziv profile" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h1 className="text-sm font-semibold text-white">Ziv Behar</h1>
              </div>
            </div>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-md bg-black/60 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Side Menu */}
      <div
        className={`fixed inset-0 z-[400] transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } bg-black/80 backdrop-blur-lg md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col items-center gap-6 mt-8">
          <button
            onClick={() => handleModeSwitch(activeMode === "3d" ? "boxes" : "3d")}
            className="bg-white/10 text-white px-4 py-2 rounded-lg text-lg w-3/4 text-center border border-white/20"
          >
            {activeMode === "3d" ? "Switch to Boxed Portfolio" : "Switch to 3D Portfolio"}
          </button>
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); scrollTo('about'); }}
            className="text-white/80 hover:text-white text-lg"
          >
            About
          </a>
          <a
            href="#featured"
            onClick={(e) => { e.preventDefault(); scrollTo('featured'); }}
            className="text-white/80 hover:text-white text-lg"
          >
            Featured
          </a>
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}
            className="text-white/80 hover:text-white text-lg"
          >
            Projects
          </a>
          <a
            href="#games"
            onClick={(e) => { e.preventDefault(); scrollTo('games'); }}
            className="text-white/80 hover:text-white text-lg"
          >
            Games
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
            className="text-white/80 hover:text-white text-lg"
          >
            Contact
          </a>
        </nav>
      </div>
    </>
  );
}


