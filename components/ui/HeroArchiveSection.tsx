"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/projects";
import type { Project } from "@/lib/types";
import { ProjectView } from "@/components/ui/ProjectView";
import { FEATURED_PROJECT_IDS } from "@/components/ui/HeroProjectsSection";

/** Emil strong ease-out — match About / Projects */
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const FONT = {
  display: "var(--font-fraunces), serif",
  body: "var(--font-space-grotesk), sans-serif",
} as const;

const SKIP = new Set<string>([...FEATURED_PROJECT_IDS, "academics"]);

/**
 * Manual rows — 4 tiles each. Sectioned by row number, not by topic.
 * Edit these arrays to rearrange.
 */
const ARCHIVE_ROWS: string[][] = [
  [
    "stealth-founder",
    "ordercubic",
    "ai-video-generator",
    "cs61c-cpu",
  ],
  [
    "percepta",
    "music-generator",
    "sticky-fred",
    "moneyportal",
  ],
  [
    "electric-guitar-amplifier",
    "cad-designs",
    "chatup",
    "graph-reader-extension",
  ],
  [
    "capiros-ventures-website",
    "todolist",
    "monopolsolver",
    "java-game-room",
  ],
  [
    "birthday-game",
    "dj-game",
    "flappy-bird-clone",
    "summer-friends-map",
  ],
];

const ARCHIVE_CAPTION: Record<string, string> = {
  "stealth-founder": "Sorts a whole camera roll with CV",
  percepta: "Agents that edit and verify code",
  ordercubic: "Live seating plans for offices",
  "ai-video-generator": "Prompt in, YouTube video out",
  "cs61c-cpu": "Pipelined RISC-V in Logisim",
  "music-generator": "Classical MIDI from Markov chains",
  "electric-guitar-amplifier": "Multi-stage amp from op-amps",
  chatup: "Secure messenger with 2FA",
  "graph-reader-extension": "Slopes on badly scaled charts",
  "capiros-ventures-website": "SEO site for a venture studio",
  todolist: "Auth, reminders, full stack",
  "summer-friends-map": "Summer meetup map for friends",
  "sticky-fred": "Platformer with wall-stick physics",
  moneyportal: "Portals and gravity sandbox",
  monopolsolver: "Monopoly with a strategy solver",
  "flappy-bird-clone": "Browser game-loop study",
  "birthday-game": "Arcade gift for my dad",
  "dj-game": "Low-latency browser beats",
  "java-game-room": "Procedural rooms in Java",
  "cad-designs": "Printable mechanical parts",
};

const ARCHIVE_TITLE: Record<string, string> = {
  percepta: "Percepta",
  "cs61c-cpu": "RISC-V CPU",
  "electric-guitar-amplifier": "Guitar Amp",
  "graph-reader-extension": "Graph Reader",
  "capiros-ventures-website": "Capiros",
  "summer-friends-map": "Meetup Map",
  "flappy-bird-clone": "Flappy Bird",
  "java-game-room": "Game Room",
  "birthday-game": "Birthday Game",
  "cad-designs": "CAD Designs",
  "music-generator": "Music Gen",
  "ai-video-generator": "AI Video",
  ordercubic: "OrderCubic",
};

function displayName(p: Project) {
  if (ARCHIVE_TITLE[p.id]) return ARCHIVE_TITLE[p.id];
  return p.name
    .replace(/\s*\(acquired\)\s*/i, "")
    .replace(/\s*—.*$/, "")
    .replace(/\s*\(.*\)$/, "")
    .trim();
}

function coverMedia(
  p: Project
): { type: "image" | "video"; src: string } | null {
  /** AI Video Generator — show the generated clip, not the texture */
  if (p.id === "ai-video-generator" && p.videos?.[0]) {
    return { type: "video", src: encodeURI(p.videos[0]) };
  }
  const src = p.images?.[0] || p.image || p.texture;
  return src ? { type: "image", src: encodeURI(src) } : null;
}

type ShelfItem =
  | { kind: "band"; index: number; count: number }
  | { kind: "tile"; project: Project; stagger: number };

function ArchiveTile({
  project,
  index,
  reduce,
  onOpen,
}: {
  project: Project;
  index: number;
  reduce: boolean | null;
  onOpen: (p: Project) => void;
}) {
  const cover = coverMedia(project);
  const caption = ARCHIVE_CAPTION[project.id] ?? project.category;
  const name = displayName(project);

  return (
    <motion.li
      className="archive-cell"
      initial={
        reduce
          ? false
          : {
              opacity: 0,
              clipPath: "inset(10% 0 0 0)",
              transform: "translateY(8px)",
            }
      }
      whileInView={
        reduce
          ? undefined
          : {
              opacity: 1,
              clipPath: "inset(0 0 0 0)",
              transform: "translateY(0px)",
            }
      }
      viewport={{ once: true, amount: 0.15, margin: "-30px" }}
      transition={{
        duration: reduce ? 0 : 0.26,
        delay: reduce ? 0 : Math.min(index * 0.03, 0.2),
        ease: EASE_OUT,
      }}
    >
      <button
        type="button"
        className="archive-tile"
        onClick={() => onOpen(project)}
        aria-label={`Open ${name}`}
      >
        <span className="archive-tile-media" aria-hidden>
          {cover?.type === "video" ? (
            <video
              className="archive-tile-video"
              src={cover.src}
              muted
              loop
              playsInline
              autoPlay={!reduce}
              preload="metadata"
            />
          ) : cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover.src} alt="" loading="lazy" draggable={false} />
          ) : (
            <span className="archive-tile-fallback">{name.slice(0, 1)}</span>
          )}
          <span className="archive-tile-frame">
            <span className="archive-tile-corner archive-tile-corner--tl" />
            <span className="archive-tile-corner archive-tile-corner--tr" />
            <span className="archive-tile-corner archive-tile-corner--bl" />
            <span className="archive-tile-corner archive-tile-corner--br" />
          </span>
        </span>

        <span className="archive-tile-meta" style={{ fontFamily: FONT.body }}>
          <span className="archive-tile-name">{name}</span>
          <span className="archive-tile-cap">{caption}</span>
        </span>
      </button>
    </motion.li>
  );
}

export function HeroArchiveSection({
  onModalOpenChange,
  onBack,
}: {
  onModalOpenChange?: (open: boolean) => void;
  onBack?: () => void;
} = {}) {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<Project | null>(null);

  const byId = useMemo(() => {
    const map = new Map<string, Project>();
    for (const p of projects) {
      if (!SKIP.has(p.id)) map.set(p.id, p);
    }
    return map;
  }, []);

  const shelf = useMemo(() => {
    const items: ShelfItem[] = [];
    const placed = new Set<string>();
    let stagger = 0;

    ARCHIVE_ROWS.forEach((ids, index) => {
      const rowProjects = ids
        .map((id) => byId.get(id))
        .filter((p): p is Project => Boolean(p) && !placed.has(p.id));

      if (!rowProjects.length) return;

      for (const p of rowProjects) placed.add(p.id);

      items.push({ kind: "band", index, count: rowProjects.length });
      for (const project of rowProjects) {
        items.push({ kind: "tile", project, stagger: stagger++ });
      }
    });

    return items;
  }, [byId]);

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
      <div className="archive-stage relative z-20 min-h-full w-full px-5 pb-24 pt-20 md:px-10 md:pb-28 md:pt-24 lg:px-14">
        <div aria-hidden className="field-veil field-veil--flip" />

        <div className="relative mx-auto w-full max-w-[1200px]">
          <motion.header
            className="max-w-xl"
            initial={
              reduce ? false : { opacity: 0, transform: "translateY(12px)" }
            }
            whileInView={
              reduce ? undefined : { opacity: 1, transform: "translateY(0px)" }
            }
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: EASE_OUT }}
          >
            {onBack ? (
              <button
                type="button"
                className="archive-back hero-pressable mb-6"
                style={{ fontFamily: FONT.body }}
                onClick={onBack}
              >
                <span aria-hidden className="archive-back-arrow">
                  ←
                </span>
                Back
              </button>
            ) : null}
            <p
              className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[#8A8A8A]"
              style={{ fontFamily: FONT.body }}
            >
              Archive
            </p>
            <h2
              className="text-4xl leading-[1.05] text-[#F4F4F4] md:text-5xl"
              style={{
                fontFamily: FONT.display,
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              More work
            </h2>
          </motion.header>

          <ul className="archive-grid mt-12 md:mt-14">
            {shelf.map((item) => {
              if (item.kind === "band") {
                return (
                  <li
                    key={`band-${item.index}`}
                    className="archive-band"
                    style={{ fontFamily: FONT.body }}
                  >
                    <span className="archive-band-index">
                      {String(item.index + 1).padStart(2, "0")}
                    </span>
                    <span className="archive-band-rule" aria-hidden />
                    <span className="archive-band-count">
                      {String(item.count).padStart(2, "0")}
                    </span>
                  </li>
                );
              }

              return (
                <ArchiveTile
                  key={item.project.id}
                  project={item.project}
                  index={item.stagger}
                  reduce={reduce}
                  onOpen={setSelected}
                />
              );
            })}
          </ul>
        </div>
      </div>

      <ProjectView project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
