"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/types";
import { getTagStyle } from "@/lib/utils";
import AboutMe from "@/components/ui/AboutMe";
import ContactMe from "@/components/ui/ContactMe";
import RealAboutMe from "@/components/ui/RealAboutMe";
import { useMediaQuery } from "@/hooks/use-media-query";
import { CursorShip2D } from "@/components/ui/CursorShip2D";
import { FeaturedCarousel } from "@/components/ui/FeaturedCarousel";

type BoxesViewProps = {
  projects: Project[];
  onSelect: (project: Project) => void;
};

const carouselProjectIds = ["stealth-founder", "library-seat-radar", "balloons-pop"];

const Section = ({
  title,
  items,
  hoveredId,
  isMobile,
  onSelect,
  handleMouseEnter,
  handleMouseLeave,
}: {
  title: string;
  items: Project[];
  hoveredId: string | null;
  isMobile: boolean;
  onSelect: (project: Project) => void;
  handleMouseEnter: (id: string) => void;
  handleMouseLeave: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const isSectionHovered = items.some((p) => p.id === hoveredId);
  
  const shouldLimit = isMobile && !expanded && items.length > 3;
  const visibleItems = shouldLimit ? items.slice(0, 3) : items;
  const remainingCount = items.length - 3;

  const gridLayout = "inline-grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section id={title.toLowerCase()} className={`w-[90vw] md:w-[70vw] mx-auto mb-10 ${isSectionHovered ? "relative z-20" : ""}`}>
      <h2 className={`text-3xl md:text-4xl font-bold text-white mb-5 tracking-wide text-center`}>{title}</h2>
      <div
        className="text-center"
      >
        <div className={gridLayout}>
          {visibleItems.map((p, i) => {
            const video = (p as any).videos?.[0] ?? null;
            const thumb = (p as any).images?.[0] ?? (p as any).image ?? null;
            const originBase = "origin-center";
            const mdOrigin = i % 2 === 0 ? "md:origin-left" : "md:origin-right";
            const xlMod = i % 3;
            const xlOrigin = xlMod === 0
              ? "xl:origin-left"
              : xlMod === 1
              ? "xl:origin-center"
              : "xl:origin-right";
            const originClasses = `${originBase} ${mdOrigin} ${xlOrigin}`;
            const isHovered = !isMobile && hoveredId === p.id;
            return (
              <motion.div
                key={p.id}
                className={`relative h-80 ${isHovered ? "z-20" : "z-0"}`}
                onMouseEnter={() => handleMouseEnter(p.id)}
                onMouseLeave={handleMouseLeave}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
              >
                <button
                  onClick={() => onSelect(p)}
                  onFocus={() => handleMouseEnter(p.id)}
                  onBlur={handleMouseLeave}
                  className={`w-full h-full text-left rounded-2xl border border-white/10 shadow-xl overflow-hidden transition-transform duration-500 ease-in-out transform-gpu focus:outline-none focus:ring-2 focus:ring-white/20 ${originClasses} ${isHovered ? "scale-[1.4]" : "scale-100"}`}
                >
                  <div
                    className={`absolute inset-0`}
                  >
                    {video ? (
                      <video
                        src={video}
                        className="absolute inset-0 w-full h-full object-cover"
                        muted
                        playsInline
                        autoPlay
                        loop
                        preload={video.includes('BalloonsPopGamelplay') ? "none" : "metadata"}
                      />
                    ) : thumb ? (
                      <img src={thumb} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 bg-black/75" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/75 to-black/50" />
                  </div>

                  <div className="relative p-6 h-full flex flex-col justify-between">
                    <div>
                      <div
                        className={`text-white font-semibold mb-2 leading-snug transition-all duration-300 ease-in-out ${isHovered || isMobile ? "text-lg md:text-xl" : "text-4xl md:text-5xl"}`}
                      >
                        {p.name}
                      </div>
                      {(p.punchline || p.description) && (
                        <div
                          className={`text-white/85 text-base md:text-lg leading-relaxed flex-grow transition-all duration-200 ${isHovered || isMobile ? "line-clamp-4" : "line-clamp-2"}`}
                        >
                          {isHovered || isMobile ? p.description : p.punchline}
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      {Array.isArray(p.tools) && p.tools.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {p.tools.slice(0, 6).map((t, i) => (
                            <span
                              key={i}
                              className={`px-2 py-0.5 rounded-full text-[11px] md:text-xs border ${getTagStyle(t)}`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className={`mt-4 transition-opacity duration-200 ${isHovered || isMobile ? "opacity-100" : "opacity-0"}`}>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs md:text-sm font-medium text-black bg-white/90 border border-white/10">
                          View demo →
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {shouldLimit && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setExpanded(true)}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
            >
              <span className="text-base font-medium tracking-wide">Tap to see {remainingCount} more</span>
              <div className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={2} 
                  stroke="currentColor" 
                  className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export function BoxesView({ projects, onSelect }: BoxesViewProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [hasSeenProjects, setHasSeenProjects] = useState(false);
  const [hasSeenGames, setHasSeenGames] = useState(false);

  // Hide default cursor when spaceship cursor is active
  useEffect(() => {
    if (!isMobile) {
      document.body.style.cursor = "none";
      return () => {
        document.body.style.cursor = "";
      };
    }
  }, [isMobile]);

  // Handle scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      const projectsEl = document.getElementById("projects");
      const gamesEl = document.getElementById("games");
      const viewportHeight = window.innerHeight;

      // --- Projects Logic ---
      let projectsVisible = false;
      if (projectsEl) {
        const rect = projectsEl.getBoundingClientRect();
        // Considered "seen" if the top is well within the viewport (70% from top)
        if (rect.top < viewportHeight * 0.7) {
          projectsVisible = true;
        }
      }

      if (projectsVisible && !hasSeenProjects) {
        setHasSeenProjects(true);
      }

      // --- Games Logic ---
      let gamesVisible = false;
      let closeToGames = false;

      if (gamesEl) {
        const rect = gamesEl.getBoundingClientRect();
        const distToViewportBottom = rect.top - viewportHeight;

        // Considered "seen" if the top is well within the viewport
        if (rect.top < viewportHeight * 0.7) {
          gamesVisible = true;
        }
        
        // Reappear when approaching Games (within 600px) but not yet fully entered
        if (distToViewportBottom < 600 && !gamesVisible) {
          closeToGames = true;
        }
      }

      if (gamesVisible && !hasSeenGames) {
        setHasSeenGames(true);
      }

      // --- Visibility Decision ---
      let shouldShow = false;

      if (!hasSeenProjects) {
        // Phase 1: Haven't seen projects yet.
        // Show unless currently viewing projects
        shouldShow = !projectsVisible;
      } else if (!hasSeenGames) {
        // Phase 2: Seen projects, waiting for games.
        // Show only when close to games
        shouldShow = closeToGames;
      } else {
        // Phase 3: Seen both. Never show again.
        shouldShow = false;
      }

      setShowScrollIndicator(shouldShow);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasSeenProjects, hasSeenGames]);

  const handleMouseEnter = (id: string) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  const { carouselItems, grouped } = useMemo(() => {
    const carousel: Project[] = [];
    // Find items for carousel
    for (const id of carouselProjectIds) {
      const p = projects.find((proj) => proj.id === id);
      if (p) carousel.push(p);
    }

    const buckets: Record<"Projects" | "Games", Project[]> = {
      Projects: [],
      Games: [],
    };

    for (const p of projects) {
      if (p.id === "academics") continue;
      // Everything that is not "Games" goes to Projects (including "Other", which now holds Percepta, Stealth, Status)
      if (p.category === "Games") buckets.Games.push(p);
      else buckets.Projects.push(p);
    }
    return { carouselItems: carousel, grouped: buckets };
  }, [projects]);

  return (
    <div className="relative z-10 pt-20 pb-32" style={{ cursor: "none" }}>
      {!isMobile && <CursorShip2D />}
      <section id="home" className="w-[90vw] md:w-[70vw] mx-auto transition-opacity duration-500 mt-10 mb-10">
        <AboutMe />
      </section>

      {/* Carousel Section */}
      {carouselItems.length > 0 && (
        <FeaturedCarousel items={carouselItems} onSelect={onSelect} />
      )}

      {grouped.Projects.length > 0 && (
        <Section
          title="Projects"
          items={grouped.Projects}
          hoveredId={hoveredId}
          isMobile={isMobile}
          onSelect={onSelect}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      )}
      {grouped.Games.length > 0 && (
        <Section
          title="Games"
          items={grouped.Games}
          hoveredId={hoveredId}
          isMobile={isMobile}
          onSelect={onSelect}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      )}
      <section className="w-[90vw] md:w-[70vw] mx-auto mt-12">
        <RealAboutMe />
      </section>
      <section id="contact" className="w-[90vw] md:w-[70vw] mx-auto mt-12">
        <ContactMe />
      </section>

      {/* Footer */}
      <div className="fixed bottom-4 left-6 text-white/30 text-[10px] z-50 pointer-events-none font-light tracking-wider">
        &copy; {new Date().getFullYear()} Ziv Behar. All rights reserved.
      </div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none text-white/60"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-light text-cyan-300 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                Scroll Down
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                >
                  <path d="M7 13l5 5 5-5" />
                  <path d="M7 6l5 5 5-5" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
