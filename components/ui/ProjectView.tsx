"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import { Project } from "@/lib/types";
import { getTagStyle } from "@/lib/utils";
import { AutoMediaGallery } from "./AutoMediaGallery";

const LetterGlitch = dynamic(
  () => import("@/components/react-bits/Backgrounds/LetterGlitch/LetterGlitch"),
  { ssr: false }
);

const LightRays = dynamic(
  () => import("@/components/react-bits/Backgrounds/LightRays/LightRays"),
  { ssr: false }
);

/** Noir letter field — no green/cyan from the default demo */
const GLITCH_COLORS = ["#1a1a1a", "#4a4a4a", "#8a8a8a", "#c8c8c8"];

const BALLOONS_POP_VIDEO_START = 6;

type ProjectViewProps = {
  project: Project | null;
  onClose: () => void;
};

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

function seekVideoStart(video: HTMLVideoElement, startAt: number) {
  if (video.currentTime < startAt) video.currentTime = startAt;
}

export function ProjectView({ project, onClose }: ProjectViewProps) {
  const shouldReduceMotion = useReducedMotion();
  const galleryRef = useRef<HTMLDivElement>(null);
  const [lightboxMediaIndex, setLightboxMediaIndex] = useState<number | null>(
    null
  );
  const [videoTimeStates, setVideoTimeStates] = useState<Map<string, number>>(
    new Map()
  );
  const [galleryFillHeight, setGalleryFillHeight] = useState(480);
  const [descExpanded, setDescExpanded] = useState(false);

  const images = project?.images ?? (project?.image ? [project.image] : []);
  const videos = project?.videos ?? [];
  const videoStartAt =
    project?.id === "balloons-pop" ? BALLOONS_POP_VIDEO_START : null;
  /** 1 video + 2 stills → video sits center as the large plate */
  const centerVideoTrio = videos.length === 1 && images.length === 2;
  const allMedia = centerVideoTrio
    ? [
        { type: "image" as const, src: images[0] },
        { type: "video" as const, src: videos[0] },
        { type: "image" as const, src: images[1] },
      ]
    : [
        ...videos.map((v) => ({ type: "video" as const, src: v })),
        ...images.map((i) => ({ type: "image" as const, src: i })),
      ];

  useEffect(() => {
    setDescExpanded(false);
  }, [project?.id]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      document.body.style.cursor = "";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [project]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Gallery always owns the remaining viewport band — same for every project
  useEffect(() => {
    if (!project) return;
    const el = galleryRef.current;
    if (!el) return;

    const update = () => {
      const h = Math.floor(el.getBoundingClientRect().height);
      if (h > 0) setGalleryFillHeight(h);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [project, allMedia.length, descExpanded]);

  useEffect(() => {
    if (!project) return;
    const timeoutId = setTimeout(() => {
      document.querySelectorAll("[bis_skin_checked]").forEach((el) => {
        el.removeAttribute("bis_skin_checked");
      });
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [project]);

  const hasMedia = allMedia.length > 0;

  const videoStartHandlers =
    videoStartAt == null
      ? {}
      : {
          onLoadedMetadata: (e: SyntheticEvent<HTMLVideoElement>) =>
            seekVideoStart(e.currentTarget, videoStartAt),
          onTimeUpdate: (e: SyntheticEvent<HTMLVideoElement>) =>
            seekVideoStart(e.currentTarget, videoStartAt),
        };

  const getDisplayName = useCallback((src: string) => {
    const base = (src.split("/").pop() ?? src).replace(/\.[^/.]+$/, "");
    const labels: Record<string, string> = {
      "pullup with score": "Form coaching",
      "liftr home": "Home",
      "liftr body rankings": "Body rankings",
      "data analytics": "Analytics",
    };
    return labels[base] ?? base.replace(/[-_]+/g, " ");
  }, []);

  const handleVideoClick = useCallback(
    (videoSrc: string, videoElement: HTMLVideoElement, mediaIndex: number) => {
      setVideoTimeStates((prev) =>
        new Map(prev).set(videoSrc, videoElement.currentTime)
      );
      setLightboxMediaIndex(mediaIndex);
    },
    []
  );

  const openLightbox = useCallback((mediaIndex: number) => {
    setLightboxMediaIndex(mediaIndex);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxMediaIndex(null);
  }, []);

  const handleClose = useCallback(() => {
    document.body.style.overflow = "auto";
    onClose();
  }, [onClose]);

  const showPrev = useCallback(() => {
    if (lightboxMediaIndex === null || allMedia.length === 0) return;
    setLightboxMediaIndex(
      (prev) => (prev! - 1 + allMedia.length) % allMedia.length
    );
  }, [lightboxMediaIndex, allMedia.length]);

  const showNext = useCallback(() => {
    if (lightboxMediaIndex === null || allMedia.length === 0) return;
    setLightboxMediaIndex((prev) => (prev! + 1) % allMedia.length);
  }, [lightboxMediaIndex, allMedia.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxMediaIndex !== null) closeLightbox();
        else handleClose();
      }
      if (lightboxMediaIndex !== null) {
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "ArrowRight") showNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxMediaIndex, closeLightbox, showPrev, showNext, handleClose]);

  if (!project) return null;

  const enterTransition = shouldReduceMotion
    ? { duration: 0.15 }
    : { duration: 0.28, ease: EASE_OUT };

  const summary = project.punchline?.trim() || project.description;
  const hasLongDescription =
    project.description.length > 160 &&
    project.punchline &&
    project.punchline !== project.description;

  /** Portal to body — fixed breaks inside transformed ancestors (contact↔archive slide) */
  const overlay = (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, transform: "scale(0.98)" }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, transform: "scale(1)" }
          }
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, transform: "scale(0.985)" }
          }
          transition={enterTransition}
          className="fixed inset-0 z-[400] bg-black"
          suppressHydrationWarning
        >
          {!shouldReduceMotion ? (
            <div
              className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
              aria-hidden
            >
              <div className="absolute inset-0 opacity-[0.5]">
                <LetterGlitch
                  glitchColors={GLITCH_COLORS}
                  glitchSpeed={65}
                  smooth
                  outerVignette
                  centerVignette={false}
                />
              </div>
              <div className="absolute inset-0 opacity-80 mix-blend-screen">
                <LightRays
                  raysOrigin="top-center"
                  raysColor="#e8e8e8"
                  raysSpeed={0.65}
                  lightSpread={0.9}
                  rayLength={1.35}
                  pulsating={false}
                  fadeDistance={1.1}
                  saturation={0.55}
                  followMouse={false}
                  mouseInfluence={0}
                  noiseAmount={0.04}
                  distortion={0.12}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/70 to-black/85" />
            </div>
          ) : null}

          <div
            className="relative z-10 flex h-dvh w-full flex-col overflow-y-auto lg:overflow-hidden"
            suppressHydrationWarning
          >
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute right-5 top-20 z-[500] flex h-10 w-10 items-center justify-center rounded-full text-3xl leading-none text-white/80 transition-[transform,color,background-color] duration-150 ease-out hover:bg-white/10 hover:text-white active:scale-[0.97] md:right-8 md:top-14"
            >
              &times;
            </button>

            {/* Shared frame: compact meta band → gallery fills the rest */}
            <div className="mx-auto flex h-full w-full max-w-6xl flex-col px-5 pb-5 pt-[5.25rem] md:px-8 md:pb-7 md:pt-24 lg:min-h-0">
              <header className="shrink-0 pb-5 md:pb-6">
                <div className="flex flex-col gap-3 md:gap-3.5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
                    <h2 className="max-w-3xl text-[1.65rem] font-semibold leading-[1.12] tracking-tight text-white md:text-[2.15rem]">
                      {project.name}
                    </h2>

                    {(project.liveUrl ||
                      project.repoUrl ||
                      project.customLink) && (
                      <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-cyan-300 transition-colors duration-150 ease-out hover:text-cyan-200"
                          >
                            {project.id === "java-game-room"
                              ? "Read more"
                              : "Live Site"}
                          </a>
                        )}
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-cyan-300 transition-colors duration-150 ease-out hover:text-cyan-200"
                          >
                            Repo
                          </a>
                        )}
                        {project.customLink && (
                          <a
                            href={project.customLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-cyan-300 transition-colors duration-150 ease-out hover:text-cyan-200"
                          >
                            {project.customLink.label}
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="max-w-3xl">
                    <p
                      className={`text-sm leading-relaxed text-zinc-300 md:text-[15px] md:leading-6 ${
                        descExpanded ? "" : "line-clamp-2"
                      }`}
                    >
                      {descExpanded ? project.description : summary}
                    </p>
                    {(hasLongDescription ||
                      (!project.punchline &&
                        project.description.length > 140)) && (
                      <button
                        type="button"
                        onClick={() => setDescExpanded((v) => !v)}
                        className="mt-1.5 text-xs font-medium text-zinc-500 transition-colors duration-150 ease-out hover:text-zinc-300"
                      >
                        {descExpanded ? "Show less" : "More"}
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((tool: string, index: number) => (
                      <span
                        key={index}
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium backdrop-blur md:text-xs ${getTagStyle(
                          tool
                        )}`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </header>

              {hasMedia ? (
                <div
                  ref={galleryRef}
                  className="min-h-[240px] min-w-0 flex-1 lg:min-h-0 lg:overflow-hidden"
                >
                  {allMedia.length === 1 ? (
                    <button
                      className="group flex h-full w-full overflow-hidden rounded-xl bg-zinc-950 ring-1 ring-white/10 transition-[transform,opacity] duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/80 active:scale-[0.99]"
                      style={{ height: galleryFillHeight || "100%" }}
                      onClick={() => openLightbox(0)}
                      aria-label={`Open ${allMedia[0].type} 1`}
                    >
                      <div className="relative h-full w-full bg-black">
                        {allMedia[0].type === "video" ? (
                          <video
                            src={allMedia[0].src}
                            className="h-full w-full object-contain"
                            playsInline
                            autoPlay
                            muted
                            loop
                            {...videoStartHandlers}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVideoClick(
                                allMedia[0].src,
                                e.currentTarget,
                                0
                              );
                            }}
                          />
                        ) : (
                          <img
                            src={allMedia[0].src}
                            alt={project.name}
                            className="h-full w-full object-cover"
                            style={{ objectPosition: "10% center" }}
                            suppressHydrationWarning
                          />
                        )}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-3 pb-2.5 pt-10 text-left">
                          <span className="block truncate text-xs font-medium tracking-wide text-white/85">
                            {getDisplayName(allMedia[0].src)}
                          </span>
                        </div>
                      </div>
                    </button>
                  ) : centerVideoTrio ? (
                    <div
                      className="pv-media-trio"
                      style={{ height: galleryFillHeight || "100%" }}
                    >
                      {allMedia.map((item, index) => {
                        const isCenter = index === 1;
                        return (
                          <button
                            key={`${item.type}-${item.src}`}
                            type="button"
                            className={`pv-media-trio-cell group ${isCenter ? "pv-media-trio-cell--center" : ""}`}
                            onClick={() => openLightbox(index)}
                            aria-label={`Open ${item.type} ${index + 1}`}
                          >
                            <div className="relative h-full w-full bg-black">
                              {item.type === "video" ? (
                                <video
                                  src={item.src}
                                  className="h-full w-full object-cover"
                                  playsInline
                                  autoPlay
                                  muted
                                  loop
                                  {...videoStartHandlers}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleVideoClick(
                                      item.src,
                                      e.currentTarget,
                                      index
                                    );
                                  }}
                                />
                              ) : (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={item.src}
                                  alt={getDisplayName(item.src)}
                                  className="h-full w-full object-cover"
                                  suppressHydrationWarning
                                />
                              )}
                              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-2.5 pb-2 pt-8 text-left">
                                <span className="block truncate text-[11px] font-medium tracking-wide text-white/85 md:text-xs">
                                  {getDisplayName(item.src)}
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <AutoMediaGallery
                      media={allMedia}
                      onOpen={openLightbox}
                      getLabel={getDisplayName}
                      onVideoClick={handleVideoClick}
                      fillHeight={galleryFillHeight}
                    />
                  )}
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-center text-sm text-zinc-500">
                  No media for this project
                </div>
              )}
            </div>
          </div>

          <AnimatePresence>
            {lightboxMediaIndex !== null && allMedia.length > 0 && (
              <motion.div
                key="lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: EASE_OUT }}
                className="fixed inset-0 z-30 flex items-center justify-center bg-black/75 backdrop-blur-sm"
                onClick={closeLightbox}
              >
                <div className="relative z-10 max-h-[78vh] max-w-[78vw] group">
                  {allMedia[lightboxMediaIndex].type === "video" ? (
                    <video
                      ref={(video) => {
                        if (!video) return;
                        const saved = videoTimeStates.get(
                          allMedia[lightboxMediaIndex].src
                        );
                        if (saved != null) {
                          video.currentTime = Math.max(
                            saved,
                            videoStartAt ?? 0
                          );
                        } else if (videoStartAt != null) {
                          seekVideoStart(video, videoStartAt);
                        }
                      }}
                      src={allMedia[lightboxMediaIndex].src}
                      className="max-h-[78vh] max-w-full rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      {...videoStartHandlers}
                    />
                  ) : (
                    <img
                      src={allMedia[lightboxMediaIndex].src}
                      alt={`Media ${lightboxMediaIndex + 1}`}
                      className="max-h-[78vh] max-w-full rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
                      suppressHydrationWarning
                    />
                  )}
                  {allMedia.length > 1 && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3 opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 md:px-5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          showPrev();
                        }}
                        className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/70 text-2xl text-white backdrop-blur transition-[transform,background-color] duration-150 ease-out hover:bg-black/85 active:scale-[0.97]"
                        aria-label="Previous media"
                      >
                        ‹
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          showNext();
                        }}
                        className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/70 text-2xl text-white backdrop-blur transition-[transform,background-color] duration-150 ease-out hover:bg-black/85 active:scale-[0.97]"
                        aria-label="Next media"
                      >
                        ›
                      </button>
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeLightbox();
                    }}
                    aria-label="Close lightbox"
                    className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xl text-white backdrop-blur transition-[transform,background-color] duration-150 ease-out hover:bg-white/20 active:scale-[0.97] md:-right-4 md:-top-4"
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

  if (typeof document === "undefined") return null;
  return createPortal(overlay, document.body);
}
