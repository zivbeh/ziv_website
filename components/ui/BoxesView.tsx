"use client";

import { useMemo } from "react";
import { Project } from "@/lib/types";
import AboutMe from "@/components/ui/AboutMe";
import ContactMe from "@/components/ui/ContactMe";

type BoxesViewProps = {
  projects: Project[];
  onSelect: (project: Project) => void;
};

const featuredProjectIds = ["stealth-founder", "library-seat-radar"];

export function BoxesView({ projects, onSelect }: BoxesViewProps) {
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

  const Section = ({ title, items }: { title: string; items: Project[] }) => (
    <section className="w-[min(96vw,1400px)] mx-auto mb-10">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 tracking-wide">{title}</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            className="text-left rounded-2xl border border-white/10 shadow-xl overflow-hidden group"
          >
            {(() => {
              const thumb = (p as any).images?.[0] ?? (p as any).image ?? null;
              if (thumb) {
                return (
                  <div className="relative min-h-[220px] md:min-h-[260px]">
                    <img src={thumb} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/30" />
                    <div className="relative p-6">
                      <div className="text-white text-xl md:text-2xl font-semibold mb-2 leading-snug">{p.name}</div>
                      {p.description && (
                        <div className="text-white/85 text-sm md:text-base leading-relaxed line-clamp-3">{p.description}</div>
                      )}
                      {Array.isArray(p.tools) && p.tools.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {p.tools.slice(0, 6).map((t, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-full text-[11px] md:text-xs bg-black/40 text-white/90 border border-white/10">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
              return (
                <div className="bg-black/55 backdrop-blur p-6 hover:bg-black/65 transition-colors min-h-[220px] md:min-h-[260px] flex flex-col">
                  <div className="text-white text-xl md:text-2xl font-semibold mb-2 leading-snug">{p.name}</div>
                  {p.description && (
                    <div className="text-white/80 text-sm md:text-base leading-relaxed line-clamp-4 flex-1">{p.description}</div>
                  )}
                  {Array.isArray(p.tools) && p.tools.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.tools.slice(0, 6).map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full text-[11px] md:text-xs bg-white/10 text-white/90 border border-white/10">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </button>
        ))}
      </div>
    </section>
  );

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


