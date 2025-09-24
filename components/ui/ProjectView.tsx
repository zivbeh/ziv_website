"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Project } from "@/lib/types";

type ProjectViewProps = {
  project: Project | null;
  onClose: () => void;
};

export const ProjectView = ({ project, onClose }: ProjectViewProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [project]);

  const images: string[] = useMemo(() => {
    if (!project) return [];
    if (project.images && project.images.length > 0) return project.images;
    if (project.image) return [project.image];
    return [];
  }, [project]);

  const videos: string[] = useMemo(() => {
    if (!project) return [];
    if (Array.isArray((project as any).videos)) return (project as any).videos as string[];
    return [];
  }, [project]);

  const hasImages = images.length > 0;

  const getDisplayName = useCallback((src: string) => {
    const base = (src.split("/").pop() ?? src).replace(/\.[^/.]+$/, "");
    return base.replace(/[-_]+/g, " ");
  }, []);

  const getSpanClasses = useCallback((idx: number, src: string) => {
    // 1) Explicit overrides via project.imageSpans (index, basename, or substring match)
    const spansMap = (project?.imageSpans ?? undefined) as Record<string, string> | undefined;
    if (spansMap) {
      const byIndex = spansMap[String(idx)];
      if (byIndex) return byIndex;

      const baseLower = (src.split("/").pop() ?? src).toLowerCase();
      if (spansMap[baseLower]) return spansMap[baseLower];

      for (const [key, value] of Object.entries(spansMap)) {
        if (baseLower.includes(key.toLowerCase())) return value;
      }
    }

    // 2) Heuristic big tiles by filename keywords
    const lower = src.toLowerCase();
    const isHero = [
      "hero",
      "cover",
      "entire",
      "entirepage",
      "full",
      "start",
      "floor",
      "map",
      "datapath",
      "version1",
      "websitelook",
      "screenshot",
    ].some((k) => lower.includes(k));

    if (isHero) {
      return "col-span-2 row-span-2 md:col-span-3 md:row-span-3";
    }

    // 3) Quilted pattern fallback by index
    const pattern = [
      "col-span-2 row-span-2 md:col-span-3 md:row-span-2",
      "col-span-2 row-span-1 md:col-span-2 md:row-span-2",
      "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
      "col-span-1 row-span-1 md:col-span-2 md:row-span-1",
      "col-span-2 row-span-2 md:col-span-3 md:row-span-2",
      "col-span-1 row-span-1 md:col-span-1 md:row-span-2",
    ];
    return pattern[idx % pattern.length];
  }, [project]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    if (lightboxIndex === null || images.length === 0) return;
    setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length);
  }, [lightboxIndex, images.length]);

  const showNext = useCallback(() => {
    if (lightboxIndex === null || images.length === 0) return;
    setLightboxIndex((prev) => (prev! + 1) % images.length);
  }, [lightboxIndex, images.length]);

  // Keyboard controls for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-20 bg-black bg-opacity-80 backdrop-blur-sm"
        >
          <div className="h-full w-full overflow-y-auto">
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-12 right-6 md:top-14 md:right-8 text-4xl text-white hover:text-gray-300 transition-colors z-30"
            >
              &times;
            </button>
            <div className="container mx-auto px-6 md:px-8 py-10 md:py-16 max-w-7xl">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Left: Textual content */}
                  <div className={`${hasImages ? "lg:col-span-5" : "lg:col-span-12"}`}>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                      {project.name}
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                      {project.description}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">Tools</h3>
                    <div className="flex flex-wrap gap-2.5 mb-8">
                      {project.tools.map((tool: string, index: number) => (
                        <span
                          key={index}
                          className="bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-sm md:text-base font-medium text-white border border-white/10"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-cyan-300 hover:underline text-lg font-semibold"
                        >
                          Live Site
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-cyan-300 hover:underline text-lg font-semibold"
                        >
                          Repo
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right: Media gallery (videos first if present) */}
                  {(hasImages || videos.length > 0) && (
                    <div className="lg:col-span-7">
                      {/* Single video */}
                      {videos.length === 1 && images.length === 0 && (
                        <div className="w-full overflow-hidden rounded-xl bg-black/30 border border-white/10">
                          <video
                            controls
                            className="w-full h-auto max-h-[70vh]"
                            preload="metadata"
                            src={videos[0]}
                          />
                          <div className="px-3 py-2 text-sm md:text-base text-gray-300 bg-black/40 border-t border-white/10 truncate">
                            {getDisplayName(videos[0])}
                          </div>
                        </div>
                      )}

                      {/* Multiple videos grid */}
                      {videos.length > 1 && (
                        <div className="grid grid-cols-2 md:grid-cols-6 auto-rows-[7rem] sm:auto-rows-[8rem] md:auto-rows-[7.5rem] lg:auto-rows-[8rem] gap-4 mb-4">
                          {videos.map((src, idx) => (
                            <div
                              key={src + idx}
                              className={`relative overflow-hidden rounded-lg bg-black/40 border border-white/10 ${getSpanClasses(idx, src)}`}
                            >
                              <video
                                controls
                                className="absolute inset-0 w-full h-full object-cover"
                                preload="metadata"
                                src={src}
                              />
                              <div className="absolute bottom-0 left-0 right-0 px-2 py-1 text-xs md:text-sm text-gray-200 bg-black/40 border-t border-white/10 truncate">
                                {getDisplayName(src)}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Images below videos */}
                      {images.length === 1 && (
                        <button
                          className="w-full overflow-hidden rounded-xl bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                          onClick={() => openLightbox(0)}
                          aria-label={`Open image 1`}
                        >
                          <div className="flex h-full flex-col">
                            <div className="relative">
                              <img
                                src={images[0]}
                                alt={project.name}
                                className="w-full h-auto max-h-[70vh] object-contain"
                              />
                            </div>
                            <div className="px-3 py-2 text-sm md:text-base text-gray-300 bg-black/40 border-t border-white/10 truncate">
                              {getDisplayName(images[0])}
                            </div>
                          </div>
                        </button>
                      )}

                      {images.length > 1 && (
                        <div className="grid grid-cols-2 md:grid-cols-6 auto-rows-[7rem] sm:auto-rows-[8rem] md:auto-rows-[7.5rem] lg:auto-rows-[8rem] gap-4">
                          {images.map((src, idx) => (
                            <button
                              key={src + idx}
                              className={`group relative overflow-hidden rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${getSpanClasses(idx, src)}`}
                              onClick={() => openLightbox(idx)}
                              aria-label={`Open image ${idx + 1}`}
                            >
                              <div className="flex h-full flex-col min-h-0">
                                <div className="relative flex-1">
                                  <img
                                    src={src}
                                    alt={`Screenshot ${idx + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                  />
                                </div>
                                <div className="px-2 py-1 text-xs md:text-sm text-gray-300 bg-black/40 border-t border-white/10 truncate">
                                  {getDisplayName(src)}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightboxIndex !== null && images.length > 0 && (
              <motion.div
                key="lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-30 flex items-center justify-center bg-black/70"
                onClick={closeLightbox}
              >
                <div className="absolute inset-0" />
                <div className="relative z-10 max-w-[90vw] max-h-[85vh]">
                  <img
                    src={images[lightboxIndex]}
                    alt={`Screenshot ${lightboxIndex + 1}`}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/10"
                  />
                  {/* Controls */}
                  {images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-2 md:px-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); showPrev(); }}
                        className="p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur border border-white/10"
                        aria-label="Previous image"
                      >
                        ‹
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); showNext(); }}
                        className="p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur border border-white/10"
                        aria-label="Next image"
                      >
                        ›
                      </button>
                    </div>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                    aria-label="Close lightbox"
                    className="absolute -top-4 -right-4 md:-top-5 md:-right-5 h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl backdrop-blur border border-white/10"
                  >
                    ×
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
