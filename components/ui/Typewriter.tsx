"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type TypewriterProps = {
  words: string[];
  /** Typed word + cursor color */
  accentClassName?: string;
  /** When false, hold empty / paused until the hero sequence reaches this step */
  active?: boolean;
};

/** Type/delete cycle with blinking caret — skips motion when reduced-motion is on. */
export function Typewriter({
  words,
  accentClassName = "text-cyan-400 font-bold",
  active = true,
}: TypewriterProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (!active) {
      setIndex(0);
      setSubIndex(0);
      setReverse(false);
    }
  }, [active]);

  useEffect(() => {
    if (reduce || !active) return;
    const t = setTimeout(() => setBlink((b) => !b), 500);
    return () => clearTimeout(t);
  }, [blink, reduce, active]);

  useEffect(() => {
    if (reduce || !active || words.length === 0) return;

    const currentWord = words[index % words.length];

    if (subIndex === currentWord.length + 1 && !reverse) {
      const t = setTimeout(() => setReverse(true), 1500);
      return () => clearTimeout(t);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () => setSubIndex((prev) => prev + (reverse ? -1 : 1)),
      reverse ? 50 : 100
    );
    return () => clearTimeout(t);
  }, [subIndex, index, reverse, words, reduce, active]);

  if (reduce) {
    return (
      <span className={accentClassName}>
        {words[0] ?? ""}
        <span className="ml-1 opacity-100">|</span>
      </span>
    );
  }

  if (!active) {
    return (
      <span className={accentClassName}>
        {"\u200B"}
        <span className="ml-1 opacity-100" aria-hidden>
          |
        </span>
      </span>
    );
  }

  const word = words[index % words.length] ?? "";

  return (
    <span>
      <span className={accentClassName}>
        {word.substring(0, subIndex) || "\u200B"}
      </span>
      <span
        className={`${blink ? "opacity-100" : "opacity-0"} ml-1 ${accentClassName}`}
        aria-hidden
      >
        |
      </span>
    </span>
  );
}
