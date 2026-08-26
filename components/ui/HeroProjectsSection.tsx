"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/projects";
import type { Project } from "@/lib/types";
import { ProjectView } from "@/components/ui/ProjectView";

/** Strong ease-out — scroll / UI enter (Emil / animate skill) */
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** Skip the long Balloons Pop intro */
const BALLOONS_POP_VIDEO_START = 6;

const FONT = {
  display: "var(--font-fraunces), serif",
  body: "var(--font-space-grotesk), sans-serif",
} as const;

/**
 * Top 5 — excluded from archive.
 * Each row is a full snap stage: copy + 1–3 media plates.
 */
export const FEATURED_PROJECT_IDS = [
  "liftr",
  "library-seat-radar",
  "bsac-liwei-lin-lab",
  "balloons-pop",
  "strata-bb-hacks",
] as const;

type FeaturedMedia = {
  type: "image" | "video";
  src: string;
  /** Seek offset in seconds (videos only) */
  startAt?: number;
};

type FeaturedMeta = {
  id: (typeof FEATURED_PROJECT_IDS)[number];
  short: string;
  lede: string;
  body: string;
  tag: string;
  media: FeaturedMedia[];
};

const FEATURED: FeaturedMeta[] = [
  {
    id: "liftr",
    short: "LIFTR",
    lede: "On-device vision for real-time iOS form coaching at ~30 FPS.",
    body: "Shipped an acquired revenue-generating mobile fitness app using on-device ML to process exercise-form pose signals at 30 FPS and transform them into personalized real-time coaching feedback.",
    tag: "Acquired",
    media: [
      { type: "image", src: "/liftr/pullup with score.png" },
      { type: "image", src: "/liftr/liftr home.png" },
      { type: "image", src: "/liftr/liftr body rankings.png" },
    ],
  },
  {
    id: "library-seat-radar",
    short: "Library-Seat Radar",
    lede: "Live campus occupancy, acquired by UC Berkeley, SkyDeck Pad-13.",
    body: "Wi-Fi AP sensors into a REST API and a live floor map students actually checked before walking across campus. ~3.5k MAU in month one, an Instagram that hit 200k+ views, then an ASUC acquisition.",
    tag: "Acquired",
    media: [
      { type: "image", src: "/status/Status Website Look.png" },
      {
        type: "image",
        src: "/status/Outreach Stats One Month After Launch.png",
      },
      { type: "image", src: "/status/Berkeley Skydeck Incubator.jpeg" },
    ],
  },
  {
    id: "bsac-liwei-lin-lab",
    short: "PIML 3D Reconstruction",
    lede:
      "Invented the first physics-informed learned reconstruction method for in-air 3D ultrasonic imaging.",
    body: "Uses just 8 PMUT sensors (vs. hundreds conventionally) and cuts acquisition time by 10–100×, reconstructing target position, size, and orientation with 34 mm median surface error to ground truth.",
    tag: "Research",
    media: [
      { type: "image", src: "/research/ultrasound-rig-desk.jpg" },
      { type: "image", src: "/research/cal-reconstruction.png" },
      { type: "image", src: "/research/pcb-layout.jpg" },
    ],
  },
  {
    id: "balloons-pop",
    short: "Balloons Pop",
    lede: "Canvas tower defense: place units, ride waves, pop balloons.",
    body: "Built pre-AI with a teammate overseas: Canvas rendering, upgrade paths, and a game loop tuned for feel. Data structures set up so new maps and unit types stay easy to add.",
    tag: "Game",
    media: [
      {
        type: "video",
        src: "/balloonspopgame/Balloons Pop Gamelplay.mp4",
        startAt: BALLOONS_POP_VIDEO_START,
      },
      { type: "image", src: "/balloonspopgame/Example Map.png" },
      { type: "image", src: "/balloonspopgame/Choose World Screen.png" },
    ],
  },
  {
    id: "strata-bb-hacks",
    short: "STRATA",
    lede: "Conflict news → Polymarket trades. B&B Hacks 1st place.",
    body: "Telegram conflict channels into structured events, implication maps, and ranked contracts, with a live terminal UI showing the agent think. Built with Roy Ruppin at Blockchain@Berkeley.",
    tag: "1st Place",
    media: [
      { type: "image", src: "/hackathonBAB/winning photo.jpg" },
      { type: "image", src: "/hackathonBAB/view.png" },
      { type: "image", src: "/hackathonBAB/ziv and roy b@b hacks seating.jpg" },
    ],
  },
].map((item) => ({
  ...item,
  media: item.media.map((m) => ({ ...m, src: encodeURI(m.src) })),
}));

function MediaFrame({
  item,
  alt,
  className,
  reduce,
  delay = 0,
}: {
  item: FeaturedMedia;
  alt: string;
  className?: string;
  reduce: boolean | null;
  delay?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (item.type !== "video" || item.startAt == null) return;
    const video = videoRef.current;
    if (!video) return;

    const seek = () => {
      if (video.currentTime < (item.startAt ?? 0)) {
        video.currentTime = item.startAt ?? 0;
      }
    };

    if (video.readyState >= 1) seek();
    else video.addEventListener("loadedmetadata", seek, { once: true });
  }, [item.type, item.startAt, item.src]);

  return (
    <motion.div
      className={`project-photo ${className ?? ""}`}
      initial={
        reduce
          ? false
          : { opacity: 0, transform: "translateY(12px)" }
      }
      whileInView={
        reduce
          ? undefined
          : { opacity: 1, transform: "translateY(0px)" }
      }
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reduce ? 0 : 0.28,
        delay: reduce ? 0 : delay,
        ease: EASE_OUT,
      }}
    >
      {item.type === "video" ? (
        <video
          ref={videoRef}
          className="project-photo-video"
          src={item.src}
          muted
          loop
          playsInline
          autoPlay={!reduce}
          preload="metadata"
          aria-label={alt}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.src} alt={alt} draggable={false} />
      )}
    </motion.div>
  );
}

function ProjectMedia({
  media,
  title,
  reduce,
}: {
  media: FeaturedMedia[];
  title: string;
  reduce: boolean | null;
}) {
  const items = media.slice(0, 3);
  const n = items.length;

  if (n === 1) {
    return (
      <MediaFrame
        item={items[0]}
        alt={`${title} preview`}
        className="project-photo--hero"
        reduce={reduce}
      />
    );
  }

  if (n === 2) {
    return (
      <div className="project-photos project-photos--pair">
        {items.map((item, i) => (
          <MediaFrame
            key={`${item.type}-${item.src}`}
            item={item}
            alt={`${title} ${i + 1}`}
            reduce={reduce}
            delay={i * 0.05}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="project-photos project-photos--trio">
      <MediaFrame
        item={items[0]}
        alt={`${title} primary`}
        className="project-photo--primary"
        reduce={reduce}
      />
      <div className="project-photos-stack">
        {items.slice(1, 3).map((item, i) => (
          <MediaFrame
            key={`${item.type}-${item.src}`}
            item={item}
            alt={`${title} ${i + 2}`}
            reduce={reduce}
            delay={0.05 + i * 0.05}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectRow({
  meta,
  index,
  project,
  onOpen,
  reduce,
  isFirst,
}: {
  meta: FeaturedMeta;
  index: number;
  project: Project;
  onOpen: (p: Project) => void;
  reduce: boolean | null;
  isFirst?: boolean;
}) {
  /** Zig-zag: even = copy left / media right; odd = flipped */
  const flip = index % 2 === 1;

  return (
    <article
      className="project-row relative z-20 flex h-[100dvh] w-full shrink-0 snap-start flex-col justify-center overflow-hidden px-5 pb-8 pt-20 md:px-10 md:pb-10 md:pt-24 lg:px-12"
      aria-labelledby={`project-row-${meta.id}`}
    >
      <div
        aria-hidden
        className={`field-veil${flip ? " field-veil--flip" : ""}`}
      />

      <div className="project-row-shell relative flex flex-col justify-center">
        {isFirst ? (
          <motion.div
            className="mb-4 max-w-xl md:mb-7"
            initial={
              reduce
                ? false
                : { opacity: 0, transform: "translateY(12px)" }
            }
            whileInView={
              reduce
                ? undefined
                : { opacity: 1, transform: "translateY(0px)" }
            }
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: EASE_OUT }}
          >
            <p
              className="mb-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#8A8A8A]"
              style={{ fontFamily: FONT.body }}
            >
              Projects
            </p>
            <h2
              className="text-[1.45rem] leading-none tracking-[-0.02em] text-[#F4F4F4] md:text-[1.85rem]"
              style={{ fontFamily: FONT.display, fontWeight: 400 }}
            >
              Selected works
            </h2>
          </motion.div>
        ) : null}

        <div
          className={`project-row-grid${flip ? " is-flipped" : ""}`}
        >
          <motion.div
            className="project-row-copy relative z-10 flex flex-col"
            initial={
              reduce
                ? false
                : { opacity: 0, transform: "translateY(12px)" }
            }
            whileInView={
              reduce
                ? undefined
                : { opacity: 1, transform: "translateY(0px)" }
            }
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: reduce ? 0 : 0.28,
              ease: EASE_OUT,
            }}
          >
            <p
              className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#8A8A8A] md:mb-3"
              style={{ fontFamily: FONT.body }}
            >
              {String(index + 1).padStart(2, "0")}
              <span className="mx-2 text-[#4A4A4A]" aria-hidden>
                /
              </span>
              {meta.tag}
            </p>

            <h3
              id={`project-row-${meta.id}`}
              className="text-[clamp(1.75rem,6vw,3.35rem)] leading-[1.02] tracking-[-0.03em] text-[#F4F4F4]"
              style={{ fontFamily: FONT.display, fontWeight: 400 }}
            >
              {meta.short}
            </h3>

            <div
              className="mt-3 space-y-3 text-[0.95rem] leading-relaxed text-[#C8C8C8] md:mt-4 lg:mt-5 lg:space-y-3.5 lg:text-lg"
              style={{ fontFamily: FONT.body }}
            >
              <p className="project-row-lede">{meta.lede}</p>
              <p className="project-row-body-detail">{meta.body}</p>
            </div>

            <button
              type="button"
              className="project-row-cta mt-5 w-fit md:mt-6 lg:mt-8"
              style={{ fontFamily: FONT.body }}
              onClick={() => onOpen(project)}
            >
              View project
              <span aria-hidden className="project-row-cta-arrow">
                →
              </span>
            </button>
          </motion.div>

          <motion.div
            className="project-row-media"
            initial={
              reduce
                ? false
                : { opacity: 0, transform: "translateY(12px)" }
            }
            whileInView={
              reduce
                ? undefined
                : { opacity: 1, transform: "translateY(0px)" }
            }
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: reduce ? 0 : 0.28,
              delay: reduce ? 0 : 0.05,
              ease: EASE_OUT,
            }}
          >
            <button
              type="button"
              className="project-media-hit text-left"
              onClick={() => onOpen(project)}
              aria-label={`Open ${meta.short}`}
            >
              <ProjectMedia
                media={meta.media}
                title={meta.short}
                reduce={reduce}
              />
            </button>
          </motion.div>
        </div>
      </div>
    </article>
  );
}

export function HeroProjectsSection({
  onModalOpenChange,
}: {
  onModalOpenChange?: (open: boolean) => void;
} = {}) {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<Project | null>(null);

  const rows = FEATURED.flatMap((meta) => {
    const project = projects.find((p) => p.id === meta.id);
    if (!project) return [];
    return [{ meta, project }];
  });

  useEffect(() => {
    onModalOpenChange?.(!!selected);
  }, [selected, onModalOpenChange]);

  useEffect(() => {
    if (!selected) return;
    const prev = document.body.style.cursor;
    document.body.style.cursor = "";
    return () => {
      document.body.style.cursor = prev;
    };
  }, [selected]);

  return (
    <>
      <div id="projects" className="projects-stage relative">
        {rows.map(({ meta, project }, index) => (
          <ProjectRow
            key={meta.id}
            meta={meta}
            index={index}
            project={project}
            onOpen={setSelected}
            reduce={reduce}
            isFirst={index === 0}
          />
        ))}
      </div>

      <ProjectView project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
