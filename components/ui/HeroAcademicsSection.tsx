"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { academics, type ClassInfo } from "@/lib/academics";
import { getTagStyle } from "@/lib/utils";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const FONT = {
  display: "var(--font-fraunces), serif",
  body: "var(--font-space-grotesk), sans-serif",
} as const;

function extractTags(classInfo: ClassInfo) {
  const tools =
    classInfo.toolsSoftware
      .join(" ")
      .match(
        /\b(Python|C\+\+|Java|RISC-V|SPICE|MATLAB|Scheme|React|Logisim|Verilog|Git|NumPy|Pandas|SQL)\b/gi
      ) || [];

  const knowledge =
    classInfo.coreKnowledge
      .join(" ")
      .match(
        /\b(Algorithms|Data Structures|Circuits|Linear Algebra|Machine Learning|AI|OS|Networking|Security|Databases|Markov|Probability|Multivariable Calculus)\b/gi
      ) || [];

  const unique = new Map<string, string>();
  for (const tag of [...tools, ...knowledge]) {
    const key = tag.toLowerCase();
    if (!unique.has(key)) unique.set(key, tag);
  }
  return Array.from(unique.values()).slice(0, 4);
}

function shortTitle(title: string) {
  const dash = title.indexOf(" - ");
  if (dash === -1) return title;
  return {
    code: title.slice(0, dash),
    name: title.slice(dash + 3),
  };
}

function ClassModal({
  classInfo,
  onClose,
}: {
  classInfo: ClassInfo;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const parts = shortTitle(classInfo.title);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const overlay = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.2, ease: EASE_OUT }}
      className="fixed inset-0 z-[500] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={
          reduce ? { opacity: 0 } : { opacity: 0, transform: "scale(0.98)" }
        }
        animate={
          reduce ? { opacity: 1 } : { opacity: 1, transform: "scale(1)" }
        }
        exit={
          reduce ? { opacity: 0 } : { opacity: 0, transform: "scale(0.985)" }
        }
        transition={{ duration: reduce ? 0 : 0.24, ease: EASE_OUT }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[86vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0c0c0c] p-6 md:p-8"
        style={{ fontFamily: FONT.body }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-2xl text-white/60 transition-[transform,color,background-color] duration-150 ease-out hover:bg-white/10 hover:text-white active:scale-[0.97]"
        >
          ×
        </button>

        {typeof parts === "string" ? (
          <h2
            className="pr-10 text-2xl text-[#F4F4F4] md:text-3xl"
            style={{ fontFamily: FONT.display, fontWeight: 400 }}
          >
            {parts}
          </h2>
        ) : (
          <div className="pr-10">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8A8A8A]">
              {parts.code}
            </p>
            <h2
              className="mt-2 text-2xl text-[#F4F4F4] md:text-3xl"
              style={{ fontFamily: FONT.display, fontWeight: 400 }}
            >
              {parts.name}
            </h2>
          </div>
        )}

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#C8C8C8]">
          {(
            [
              ["Core knowledge", classInfo.coreKnowledge],
              ["Tools / software", classInfo.toolsSoftware],
              ["Applications", classInfo.applicationsUsed],
              ["Devices", classInfo.physicalDevices],
            ] as const
          ).map(([label, items]) => (
            <div key={label}>
              <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-[#8A8A8A]">
                {label}
              </h3>
              <ul className="list-disc space-y-1.5 pl-5 marker:text-[#6E6E6E]">
                {items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(overlay, document.body);
}

export function HeroAcademicsSection({
  onBack,
  onModalOpenChange,
}: {
  onBack?: () => void;
  onModalOpenChange?: (open: boolean) => void;
}) {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<ClassInfo | null>(null);

  useEffect(() => {
    onModalOpenChange?.(!!selected);
  }, [selected, onModalOpenChange]);

  return (
    <>
      <div className="academics-stage relative z-20 min-h-full w-full px-5 pb-24 pt-20 md:px-10 md:pb-28 md:pt-24 lg:px-14">
        <div aria-hidden className="field-veil" />

        <div className="relative mx-auto w-full max-w-[1200px]">
          {onBack ? (
            <div className="mb-6 flex justify-end">
              <button
                type="button"
                className="archive-back archive-back--forward hero-pressable"
                style={{ fontFamily: FONT.body }}
                onClick={onBack}
              >
                Back
                <span aria-hidden className="archive-back-arrow">
                  →
                </span>
              </button>
            </div>
          ) : null}

          <motion.header
            className="max-w-xl"
            initial={
              reduce ? false : { opacity: 0, transform: "translateY(12px)" }
            }
            whileInView={
              reduce ? undefined : { opacity: 1, transform: "translateY(0px)" }
            }
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: EASE_OUT }}
          >
            <p
              className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[#8A8A8A]"
              style={{ fontFamily: FONT.body }}
            >
              Academics
            </p>
            <h2
              className="text-4xl leading-[1.05] text-[#F4F4F4] md:text-5xl"
              style={{
                fontFamily: FONT.display,
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              Coursework
            </h2>
            <p
              className="mt-4 text-base text-[#C8C8C8] md:text-lg"
              style={{ fontFamily: FONT.body }}
            >
              {academics.units} units
              {academics.honorStudent
                ? " · GPA 3.957 · Engineering Honor Student"
                : null}
            </p>
          </motion.header>

          <ul className="academics-grid mt-12 md:mt-14">
            {academics.classes.map((classInfo, index) => {
              const tags = extractTags(classInfo);
              const parts = shortTitle(classInfo.title);
              return (
                <li key={classInfo.title}>
                  <motion.button
                    type="button"
                    className="academics-card hero-pressable"
                    style={{ fontFamily: FONT.body }}
                    onClick={() => setSelected(classInfo)}
                    initial={
                      reduce
                        ? false
                        : { opacity: 0, transform: "translateY(10px)" }
                    }
                    whileInView={
                      reduce
                        ? undefined
                        : { opacity: 1, transform: "translateY(0px)" }
                    }
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: reduce ? 0 : 0.26,
                      delay: reduce ? 0 : Math.min(index * 0.03, 0.24),
                      ease: EASE_OUT,
                    }}
                  >
                    {typeof parts === "string" ? (
                      <h3 className="academics-card-title">{parts}</h3>
                    ) : (
                      <>
                        <p className="academics-card-code">{parts.code}</p>
                        <h3 className="academics-card-title">{parts.name}</h3>
                      </>
                    )}
                    {tags.length ? (
                      <div className="academics-card-tags">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${getTagStyle(tag)}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {selected ? (
          <ClassModal
            key={selected.title}
            classInfo={selected}
            onClose={() => setSelected(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
