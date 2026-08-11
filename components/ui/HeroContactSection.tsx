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

const RISE_BASE =
  "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.55) 14%, #000 32%), linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 12%, #000 28%, #000 90%, rgba(0,0,0,0.45) 97%, transparent 100%)";

const RIGHT_CUT =
  "linear-gradient(90deg, #000 0%, #000 62%, rgba(0,0,0,0.45) 78%, transparent 94%)";

const RISE_MASK: React.CSSProperties = {
  WebkitMaskImage: `${RISE_BASE}, ${RIGHT_CUT}`,
  maskImage: `${RISE_BASE}, ${RIGHT_CUT}`,
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

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
    <div className="contact-stage relative flex h-full w-full flex-col justify-center overflow-hidden px-6 pb-10 pt-8 md:px-12">
      <div
        className="pointer-events-none absolute -bottom-[10vh] right-0 z-[2] h-[108%] w-[54%] md:w-[48%]"
        style={RISE_MASK}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/profile-classic.png"
          alt=""
          className="h-full w-full object-cover grayscale"
          style={{ objectPosition: "50% 18%" }}
          draggable={false}
        />
      </div>

      <div aria-hidden className="field-veil" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col justify-center">
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
            className="text-6xl leading-[0.94] tracking-[-0.02em] text-[#F4F4F4] md:text-8xl lg:text-9xl"
            style={{
              fontFamily: FONT.display,
              fontWeight: 400,
            }}
          >
            Let&apos;s talk
          </h2>

          <p
            className="mt-6 text-xl leading-snug text-[#F4F4F4] md:text-2xl"
            style={{ fontFamily: FONT.display }}
          >
            UC Berkeley EECS Honors ’27
          </p>

          <div
            className="mt-10 flex flex-wrap gap-3"
            style={{ fontFamily: FONT.body }}
          >
            <button
              type="button"
              className="hero-cta hero-pressable px-7 py-3.5 text-base font-medium"
              onClick={copyEmail}
            >
              {copied ? "Email copied" : "Copy email"}
            </button>
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
            <a
              href="/CV.pdf"
              download="Ziv_Behar_Resume.pdf"
              className="project-row-cta text-[#C8C8C8]"
            >
              Resume
              <span aria-hidden className="project-row-cta-arrow">
                →
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
