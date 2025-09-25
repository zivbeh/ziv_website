"use client";

import { useMemo, useState } from "react";
import { Project } from "@/lib/types";
import AboutMe from "@/components/ui/AboutMe";
import ContactMe from "@/components/ui/ContactMe";

type BoxesViewProps = {
  projects: Project[];
  onSelect: (project: Project) => void;
};

const featuredProjectIds = ["stealth-founder", "library-seat-radar"];

export function BoxesView({ projects, onSelect }: BoxesViewProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const grouped = useMemo(() => {
    const buckets: Record<"Featured" | "Projects" | "Games", Project[]> = {
      Featured: [],
      Projects: [],
      Games: [],
    };
    for (const p of projects) {
      if (featuredProjectIds.includes(p.id)) buckets.Featured.push(p);
      else if (p.category === "Games") buckets.Games.push(p);
      else buckets.Projects.push(p);
    }
    return buckets;
  }, [projects]);

  const Section = ({ title, items }: { title: string; items: Project[] }) => {
    const isFeatured = title === "Featured";
    const isSectionHovered = items.some((p) => p.id === hoveredId);
    const gridLayout = isFeatured
      ? "inline-grid grid-cols-1 md:grid-cols-2 gap-5"
      : "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3";

    return (
      <section className={`w-[min(96vw,1400px)] mx-auto mb-10 ${isSectionHovered ? "relative z-10" : ""}`}>
        <h2 className={`text-3xl md:text-4xl font-bold text-white mb-5 tracking-wide ${isFeatured ? "text-center" : ""}`}>{title}</h2>
        <div className={isFeatured ? "text-center" : ""}>
          <div className={gridLayout}>
            {items.map((p, i) => {
              const video = (p as any).videos?.[0] ?? null;
              const thumb = (p as any).images?.[0] ?? (p as any).image ?? null;
              const originBase = "origin-center";
              const mdOrigin = i % 2 === 0 ? "md:origin-left" : "md:origin-right";
              const xlMod = i % 3;
              const xlOrigin = xlMod === 0 ? "xl:origin-left" : xlMod === 1 ? "xl:origin-center" : "xl:origin-right";
              const originClasses = `${originBase} ${mdOrigin} ${xlOrigin}`;
              const isHovered = hoveredId === p.id;
              return (
                <div
                  key={p.id}
                  className={`relative h-80 ${isHovered ? "z-20" : "z-0"}`}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <button
                    onClick={() => onSelect(p)}
                    onFocus={() => setHoveredId(p.id)}
                    onBlur={() => setHoveredId(null)}
                    className={`w-full h-full text-left rounded-2xl border border-white/10 shadow-xl overflow-hidden transition-transform duration-1000 ease-in-out transform-gpu focus:outline-none focus:ring-2 focus:ring-white/20 ${originClasses} ${isHovered ? "scale-[1.4]" : "scale-100"}`}
                  >
                    <div
                      className={`absolute inset-0 transition-transform duration-1000 ease-in-out transform-gpu ${originClasses} ${isHovered ? "scale-[1.7]" : "scale-100"}`}
                    >
                      {video ? (
                        <video
                          src={video}
                          className="absolute inset-0 w-full h-full object-cover"
                          muted
                          playsInline
                          autoPlay
                          loop
                          preload="metadata"
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
                          className={`text-white font-semibold mb-2 leading-snug transition-all duration-1000 ease-in-out ${isHovered ? "text-lg md:text-xl" : "text-4xl md:text-5xl"}`}
                        >
                          {p.name}
                        </div>
                        {(p.punchline || p.description) && (
                          <div
                            className={`text-white/85 text-base md:text-lg leading-relaxed flex-grow transition-all duration-200 ${isHovered ? "" : "line-clamp-2"}`}
                          >
                            {isHovered ? p.description : p.punchline}
                          </div>
                        )}
                      </div>

                      <div className="mt-4">
                        {Array.isArray(p.tools) && p.tools.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {p.tools.slice(0, 6).map((t, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-full text-[11px] md:text-xs bg-black/40 text-white/90 border border-white/10"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className={`mt-4 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs md:text-sm font-medium text-black bg-white/90 border border-white/10">
                            View demo →
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="relative z-10 pt-20 pb-32">
      <section className="w-[min(92vw,900px)] mx-auto transition-opacity duration-500 mt-[-8vh] md:mt-[-10vh] mb-10">
        <AboutMe />
      </section>
      {grouped.Featured.length > 0 && (
        <Section title="Featured" items={grouped.Featured.slice(0, 2)} />
      )}
      {grouped.Projects.length > 0 && (
        <Section title="Projects" items={grouped.Projects} />
      )}
      {grouped.Games.length > 0 && <Section title="Games" items={grouped.Games} />}
      <section className="w-[min(96vw,1400px)] mx-auto mt-12">
        <ContactMe />
      </section>
    </div>
  );
}


