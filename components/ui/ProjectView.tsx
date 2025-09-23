"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState, useCallback } from "react";

export const ProjectView = ({ project, onClose }) => {
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
              className="absolute top-6 right-6 md:top-8 md:right-8 text-4xl text-white hover:text-gray-300 transition-colors z-30"
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
                  <div className="lg:col-span-5">
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

                  {/* Right: Media gallery */}
                  <div className="lg:col-span-7">
                    {images.length === 0 && (
                      <div className="w-full h-64 rounded-xl bg-white/5 border border-white/10" />
                    )}

                    {images.length === 1 && (
                      <div className="w-full overflow-hidden rounded-xl bg-black/30 border border-white/10">
                        <img
                          src={images[0]}
                          alt={project.name}
                          className="w-full h-auto max-h-[70vh] object-contain"
                        />
                      </div>
                    )}

                    {images.length > 1 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map((src, idx) => (
                          <button
                            key={src + idx}
                            className="group relative overflow-hidden rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            onClick={() => openLightbox(idx)}
                            aria-label={`Open image ${idx + 1}`}
                          >
                            <div className="h-36 md:h-40 lg:h-44 w-full">
                              <img
                                src={src}
                                alt={`Screenshot ${idx + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
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
