"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroContactSection } from "@/components/ui/HeroContactSection";
import { HeroArchiveSection } from "@/components/ui/HeroArchiveSection";
import { HeroAcademicsSection } from "@/components/ui/HeroAcademicsSection";

/** On-screen move — ease-in-out; slight vertical arc mid-path */
const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;
const SLIDE_MS = 0.52;
const ARC = "14px";

export type ContactDeckPanel = "academics" | "contact" | "archive";

/** translateX % of the 300%-wide track (one panel = 33.333%) */
const PANEL_X: Record<ContactDeckPanel, number> = {
  academics: 0,
  contact: -100 / 3,
  archive: -200 / 3,
};

function slideFrames(from: ContactDeckPanel, to: ContactDeckPanel) {
  const a = PANEL_X[from];
  const b = PANEL_X[to];
  const mid = (a + b) / 2;
  return [
    `translateX(${a}%) translateY(0px)`,
    `translateX(${mid}%) translateY(${ARC})`,
    `translateX(${b}%) translateY(0px)`,
  ];
}

export function HeroContactArchiveStage({
  onModalOpenChange,
  panel,
  onPanelChange,
}: {
  onModalOpenChange?: (open: boolean) => void;
  panel: ContactDeckPanel;
  onPanelChange: (panel: ContactDeckPanel) => void;
}) {
  const reduce = useReducedMotion();
  const archivePaneRef = useRef<HTMLDivElement>(null);
  const academicsPaneRef = useRef<HTMLDivElement>(null);
  const [projectOpen, setProjectOpen] = useState(false);
  const [classModalOpen, setClassModalOpen] = useState(false);
  const [slide, setSlide] = useState<{
    from: ContactDeckPanel;
    to: ContactDeckPanel;
  }>({ from: "contact", to: "contact" });

  useEffect(() => {
    setSlide((prev) => {
      if (prev.to === panel) return prev;
      return { from: prev.to, to: panel };
    });
  }, [panel]);

  useEffect(() => {
    if (panel === "archive") {
      archivePaneRef.current?.scrollTo({ top: 0 });
    }
    if (panel === "academics") {
      academicsPaneRef.current?.scrollTo({ top: 0 });
    }
  }, [panel]);

  useEffect(() => {
    if (panel === "contact") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (projectOpen || classModalOpen) return;
      onPanelChange("contact");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel, onPanelChange, projectOpen, classModalOpen]);

  return (
    <section
      id="contact"
      className="contact-archive-stage relative z-20 h-[100dvh] w-full shrink-0 snap-start overflow-hidden"
      aria-label="Academics, contact, and archive"
    >
      <motion.div
        className="flex h-full w-[300%] will-change-transform"
        initial={false}
        animate={
          reduce || slide.from === slide.to
            ? { transform: `translateX(${PANEL_X[slide.to]}%)` }
            : { transform: slideFrames(slide.from, slide.to) }
        }
        transition={
          reduce || slide.from === slide.to
            ? { duration: 0 }
            : {
                duration: SLIDE_MS,
                ease: EASE_IN_OUT,
                times: [0, 0.48, 1],
              }
        }
      >
        <div
          id="academics"
          ref={academicsPaneRef}
          className="relative h-full w-1/3 shrink-0 overflow-y-auto overscroll-y-contain"
        >
          <HeroAcademicsSection
            onBack={() => onPanelChange("contact")}
            onModalOpenChange={(open) => {
              setClassModalOpen(open);
              onModalOpenChange?.(open);
            }}
          />
        </div>

        <div className="relative h-full w-1/3 shrink-0 overflow-hidden">
          <HeroContactSection
            onMoreWorks={() => onPanelChange("archive")}
          />
        </div>

        <div
          id="archive"
          ref={archivePaneRef}
          className="relative h-full w-1/3 shrink-0 overflow-y-auto overscroll-y-contain"
        >
          <HeroArchiveSection
            onBack={() => onPanelChange("contact")}
            onModalOpenChange={(open) => {
              setProjectOpen(open);
              onModalOpenChange?.(open);
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
