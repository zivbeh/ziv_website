"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Emil strong ease-out */
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const FONT = {
  display: "var(--font-fraunces), serif",
  body: "var(--font-space-grotesk), sans-serif",
} as const;

const EMAIL = "zivbeh@gmail.com";

export function HeroContactSection({
  onMoreWorks,
}: {
  onMoreWorks?: () => void;
}) {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copyEmail = () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(EMAIL).then(
      () => setCopied(true),
      () => undefined
    );
  };

  return (
    <div className="hero-stage contact-stage relative flex h-full w-full flex-col justify-center overflow-hidden px-6 pb-10 pt-8 md:px-12">
      <div className="site-portrait" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/profile-classic.png"
          alt=""
          className="site-portrait-img"
          draggable={false}
        />
      </div>

      <div aria-hidden className="field-veil" />

      <div className="contact-copy relative z-10 mx-auto flex w-full max-w-[1200px] flex-col justify-center">
        <motion.div
          className="max-w-2xl md:max-w-3xl"
          initial={
            reduce ? false : { opacity: 0, transform: "translateY(12px)" }
          }
          whileInView={
            reduce ? undefined : { opacity: 1, transform: "translateY(0px)" }
          }
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduce ? 0 : 0.28, ease: EASE_OUT }}
        >
          <h2
            className="text-[2.85rem] leading-[0.94] tracking-[-0.02em] text-[#F4F4F4] sm:text-6xl md:text-8xl lg:text-9xl"
            style={{
              fontFamily: FONT.display,
              fontWeight: 400,
            }}
          >
            Let&apos;s talk
          </h2>

          <p
            className="mt-5 text-xl leading-snug text-[#F4F4F4] sm:mt-6 md:text-2xl"
            style={{ fontFamily: FONT.display }}
          >
            UC Berkeley EECS Honors ’27
          </p>

          <div
            className="mt-10 flex flex-wrap gap-3"
            style={{ fontFamily: FONT.body }}
          >
            <a
              href="/resume"
              className="hero-cta hero-pressable px-7 py-3.5 text-base font-medium"
            >
              Resume
            </a>
            <button
              type="button"
              className="hero-cta-ghost hero-pressable px-7 py-3.5 text-base"
              onClick={() => onMoreWorks?.()}
            >
              More works
            </button>
          </div>

          <div
            className="mt-8 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-5 text-[#8A8A8A]"
            style={{ fontFamily: FONT.body }}
          >
            <a
              href="https://github.com/zivbeh"
              target="_blank"
              rel="noopener noreferrer"
              className="project-row-cta text-[#C8C8C8]"
            >
              GitHub
              <span aria-hidden className="project-row-cta-arrow">
                →
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/ziv-behar/"
              target="_blank"
              rel="noopener noreferrer"
              className="project-row-cta text-[#C8C8C8]"
            >
              LinkedIn
              <span aria-hidden className="project-row-cta-arrow">
                →
              </span>
            </a>
            <button
              type="button"
              className="project-row-cta text-[#C8C8C8]"
              onClick={copyEmail}
            >
              {copied ? "Email copied" : "Email"}
              <span aria-hidden className="project-row-cta-arrow">
                →
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
