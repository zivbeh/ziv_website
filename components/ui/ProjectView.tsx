"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { Project } from "@/lib/types";
import { getTagStyle } from "@/lib/utils";
import { Academics } from "./Academics";

type ProjectViewProps = {
  project: Project | null;
  onClose: () => void;
};


export function ProjectView({ project, onClose }: ProjectViewProps) {
  // All hooks must be called before any conditional returns
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxMediaIndex, setLightboxMediaIndex] = useState<number | null>(null);
  const [mutedVideos, setMutedVideos] = useState<Set<string>>(new Set());
  const [videoTimeStates, setVideoTimeStates] = useState<Map<string, number>>(new Map());

  // Compute derived values safely
  const images = project?.images ?? (project?.image ? [project.image] : []);
  const videos = project?.videos ?? [];
  
  // Combine all media into a single array for unified rendering
  const allMedia = [...videos.map(v => ({ type: 'video', src: v })), ...images.map(i => ({ type: 'image', src: i }))];

  // Initialize all videos as muted
  useEffect(() => {
    if (videos.length > 0) {
      setMutedVideos(new Set(videos));
    }
  }, [videos]);

  useEffect(() => {
    // Hide body overflow when project is open
    if (project) {
      document.body.style.overflow = "hidden";
      // Restore cursor when project demo is open
      document.body.style.cursor = "";
    } else {
      // Immediately restore overflow when project is null
      document.body.style.overflow = "auto";
    }

    // Cleanup function to restore overflow when component unmounts or project changes
    return () => {
      document.body.style.overflow = "auto";
      // Restore cursor hiding when project demo is closed (if still in boxes view)
      // The BoxesView component will handle re-hiding it if needed
    };
  }, [project]);

  // Additional cleanup on unmount to ensure scrolling is restored
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Remove browser extension injected attributes after hydration
  useEffect(() => {
    if (!project) return;
    
    const removeExtensionAttributes = () => {
      const allElements = document.querySelectorAll('[bis_skin_checked]');
      allElements.forEach((el) => {
        el.removeAttribute('bis_skin_checked');
      });
    };
    
    // Run after a short delay to ensure hydration is complete
    const timeoutId = setTimeout(removeExtensionAttributes, 0);
    return () => clearTimeout(timeoutId);
  }, [project]);

  const hasMedia = allMedia.length > 0;

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
      return "col-span-2 row-span-2 md:col-span-3 md:row-span-2";
    }

    // 3) Smart aspect ratio-based layout
    const baseName = (src.split("/").pop() ?? src).toLowerCase();
    
    // Detect video files (likely 16:9)
    if (baseName.includes('.mp4') || baseName.includes('video') || baseName.includes('gameplay')) {
      return "col-span-2 row-span-2 md:col-span-3 md:row-span-3"; // Stack videos vertically for larger size
    }
    
    // Detect square-ish images
    if (baseName.includes('logo') || baseName.includes('icon') || baseName.includes('avatar')) {
      return "col-span-1 row-span-1 md:col-span-2 md:row-span-1"; // Compact square
    }
    
    // Detect portrait images
    if (baseName.includes('screenshot') || baseName.includes('mobile') || baseName.includes('phone')) {
      return "col-span-1 row-span-2 md:col-span-1 md:row-span-2"; // Compact tall
    }

    // 4) Adaptive pattern based on total media count
    const totalMedia = allMedia.length;
    if (totalMedia <= 2) {
      return "col-span-2 row-span-2 md:col-span-2 md:row-span-2"; // Compact for few items
    } else if (totalMedia <= 4) {
      return "col-span-1 row-span-1 md:col-span-1 md:row-span-1"; // Compact medium size
    } else {
      return "col-span-1 row-span-1 md:col-span-1 md:row-span-1"; // Standard size for many items
    }
  }, [project, allMedia]);

  const handleVideoClick = useCallback((videoSrc: string, videoElement: HTMLVideoElement, mediaIndex: number) => {
    // Save current video time
    setVideoTimeStates(prev => new Map(prev).set(videoSrc, videoElement.currentTime));
    
    // Open lightbox
    setLightboxMediaIndex(mediaIndex);
  }, []);

  const openLightbox = useCallback((mediaIndex: number) => {
    setLightboxMediaIndex(mediaIndex);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxMediaIndex(null);
  }, []);

  const handleClose = useCallback(() => {
    // Immediately restore scrolling when close is clicked
    document.body.style.overflow = "auto";
    onClose();
  }, [onClose]);

  const showPrev = useCallback(() => {
    if (lightboxMediaIndex === null || allMedia.length === 0) return;
    setLightboxMediaIndex((prev) => (prev! - 1 + allMedia.length) % allMedia.length);
  }, [lightboxMediaIndex, allMedia.length]);

  const showNext = useCallback(() => {
    if (lightboxMediaIndex === null || allMedia.length === 0) return;
    setLightboxMediaIndex((prev) => (prev! + 1) % allMedia.length);
  }, [lightboxMediaIndex, allMedia.length]);

  // Keyboard controls for lightbox and project view
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxMediaIndex !== null) {
          closeLightbox();
        } else {
          handleClose();
        }
      }
      if (lightboxMediaIndex !== null) {
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "ArrowRight") showNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxMediaIndex, closeLightbox, showPrev, showNext, handleClose]);

  // Early return after all hooks have been called
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-20 bg-black bg-opacity-80 backdrop-blur-sm"
          suppressHydrationWarning
        >
          <div className="h-full w-full overflow-y-auto" suppressHydrationWarning>
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-20 right-6 md:top-14 md:right-8 text-4xl text-white hover:text-gray-300 transition-colors z-[500]"
            >
              &times;
            </button>
            <div className="container mx-auto px-6 md:px-8 pt-28 pb-16 max-w-7xl">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10" style={{ alignItems: 'stretch' }}>
                  {/* Left: Textual content */}
                  <div className={`${hasMedia ? "lg:col-span-5" : "lg:col-span-12"}`}>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                      {project.name}
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                      {project.description}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                      Tools
                    </h3>
                    <div className="flex flex-wrap gap-2.5 mb-8">
                      {project.tools.map((tool: string, index: number) => (
                        <span
                          key={index}
                          className={`px-3 py-1.5 rounded-full text-sm md:text-base font-medium border backdrop-blur ${getTagStyle(tool)}`}
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
                          {project.id === "java-game-room" ? "Read more about the project" : "Live Site"}
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
                      {project.customLink && (
                        <a
                          href={project.customLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-cyan-300 hover:underline text-lg font-semibold"
                        >
                          {project.customLink.label}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right: Media gallery */}
                  {hasMedia && (
                    <div className="lg:col-span-7 flex flex-col">
                      {/* Combined media grid */}
                      {(() => {
                        // Single media item - check if it has specific span override to use grid instead
                        const useGridForSingle = allMedia.length === 1 && project?.imageSpans && Object.keys(project.imageSpans).length > 0;

                        // Single media item default view (fills container)
                        if (allMedia.length === 1 && !useGridForSingle) {
                          const media = allMedia[0];
                          return (
                            <button
                              className="w-full h-full overflow-hidden rounded-xl bg-black focus:outline-none focus:ring-2 focus:ring-cyan-400 flex flex-col"
                              style={{ minHeight: 0 }}
                                  onClick={() => openLightbox(0)}
                              aria-label={`Open ${media.type} 1`}
                            >
                              <div className="flex-1 min-h-0 relative bg-black">
                                {media.type === 'video' ? (
                                  <video
                                    src={media.src}
                                    className="w-full h-full object-contain"
                                    playsInline
                                    autoPlay
                                    muted
                                    loop
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleVideoClick(media.src, e.currentTarget, 0);
                                    }}
                                  />
                                ) : (
                                  <img
                                    src={media.src}
                                    alt={project.name}
                                    className="w-full h-full object-cover"
                                    style={{ objectPosition: '10% center' }}
                                    suppressHydrationWarning
                                  />
                                )}
                              </div>
                              <div className="px-3 py-2 text-sm md:text-base text-gray-300 bg-black/40 border-t border-white/10 truncate flex-shrink-0">
                                {getDisplayName(media.src)}
                              </div>
                            </button>
                          );
                        }

                        // Multiple media items OR single item with custom spans - responsive layout
                        return (
                          <>
                            {/* Mobile: Vertical list - part of page scroll */}
                            <div className="lg:hidden flex flex-col gap-4 w-full">
                              {allMedia.map((media, idx) => {
                                const isImage = media.type === 'image';
                                
                                return (
                                  <button
                                    key={`${media.type}-${media.src}-${idx}`}
                                    className="group relative overflow-hidden rounded-lg bg-black focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full flex-shrink-0"
                                    onClick={() => openLightbox(idx)}
                                    aria-label={`Open ${media.type} ${idx + 1}`}
                                  >
                                    <div className="flex flex-col w-full">
                                      <div className="relative w-full bg-black">
                                        {isImage ? (
                                          <img
                                            src={media.src}
                                            alt={`Screenshot ${idx + 1}`}
                                            className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                            loading="lazy"
                                            style={{ maxHeight: '60vh' }}
                                            suppressHydrationWarning
                                          />
                                        ) : (
                                          <video
                                            src={media.src}
                                            className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                            playsInline
                                            autoPlay
                                            muted
                                            loop
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleVideoClick(media.src, e.currentTarget, idx);
                                            }}
                                            style={{ maxHeight: '60vh' }}
                                          />
                                        )}
                                      </div>
                                      <div className="px-3 py-2 text-sm text-gray-300 bg-black/40 border-t border-white/10 truncate">
                                        {getDisplayName(media.src)}
                                      </div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Desktop: Grid layout */}
                            <div className="hidden lg:grid grid-cols-9 gap-2 h-full w-full" style={{
                              gridAutoRows: 'minmax(0, 1fr)',
                            }}>
                              {allMedia.map((media, idx) => {
                                const isImage = media.type === 'image';
                                const imageIndex = allMedia.slice(0, idx).filter(m => m.type === 'image').length;
                                
                                return (
                                  <button
                                    key={`${media.type}-${media.src}-${idx}`}
                                    className={`group relative overflow-hidden rounded-lg bg-black focus:outline-none focus:ring-2 focus:ring-cyan-400 h-full w-full ${getSpanClasses(
                                      idx,
                                      media.src
                                    )}`}
                                    onClick={() => openLightbox(idx)}
                                    aria-label={`Open ${media.type} ${idx + 1}`}
                                  >
                                    <div className="flex h-full flex-col min-h-0">
                                      <div className="relative flex-1 min-h-0 bg-black">
                                        {isImage ? (
                                          <img
                                            src={media.src}
                                            alt={`Screenshot ${idx + 1}`}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            loading="lazy"
                                            suppressHydrationWarning
                                          />
                                        ) : (
                                          <video
                                            src={media.src}
                                            className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                                            playsInline
                                            autoPlay
                                            muted
                                            loop
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleVideoClick(media.src, e.currentTarget, idx);
                                            }}
                                          />
                                        )}
                                      </div>
                                      <div className="px-2 py-1 text-xs md:text-sm text-gray-300 bg-black/40 border-t border-white/10 truncate flex-shrink-0">
                                        {getDisplayName(media.src)}
                                      </div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
          {/* Lightbox */}
          <AnimatePresence>
            {lightboxMediaIndex !== null && allMedia.length > 0 && (
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
                <div className="relative z-10 max-w-[70vw] max-h-[70vh] w-fit h-fit group">
                  {allMedia[lightboxMediaIndex].type === 'video' ? (
                    <video
                      ref={(video) => {
                        if (video && videoTimeStates.has(allMedia[lightboxMediaIndex].src)) {
                          video.currentTime = videoTimeStates.get(allMedia[lightboxMediaIndex].src)!;
                        }
                      }}
                      src={allMedia[lightboxMediaIndex].src}
                      className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={allMedia[lightboxMediaIndex].src}
                      alt={`Media ${lightboxMediaIndex + 1}`}
                      className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                      suppressHydrationWarning
                    />
                  )}
                  {/* Controls - only show on hover */}
                  {allMedia.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => { e.stopPropagation(); showPrev(); }}
                        className="p-3 md:p-4 rounded-full bg-black/70 hover:bg-black/80 text-white backdrop-blur border-2 border-black/50 hover:border-black/70 text-2xl md:text-3xl font-bold shadow-lg hover:shadow-xl transition-all duration-200"
                        aria-label="Previous media"
                      >
                        ‹
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); showNext(); }}
                        className="p-3 md:p-4 rounded-full bg-black/70 hover:bg-black/80 text-white backdrop-blur border-2 border-black/50 hover:border-black/70 text-2xl md:text-3xl font-bold shadow-lg hover:shadow-xl transition-all duration-200"
                        aria-label="Next media"
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