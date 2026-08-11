"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CursorShip2D } from "@/components/ui/CursorShip2D";
import { Typewriter } from "@/components/ui/Typewriter";
import { useMediaQuery } from "@/hooks/use-media-query";
import LogoLoop from "@/components/react-bits/Animations/LogoLoop/LogoLoop";
import DecryptedText from "@/components/react-bits/TextAnimations/DecryptedText/DecryptedText";
import { HeroBootReveal } from "@/components/ui/HeroBootReveal";
import { HeroAboutSection } from "@/components/ui/HeroAboutSection";
import { HeroProjectsSection } from "@/components/ui/HeroProjectsSection";
import { HeroContactArchiveStage } from "@/components/ui/HeroContactArchiveStage";
import type { ContactDeckPanel } from "@/components/ui/HeroContactArchiveStage";
import { useHeroBoot } from "@/hooks/useHeroBoot";
import { BOOT } from "@/lib/site-intro";

/** Emil Kowalski strong ease-out — instant feedback, no sluggish ease-in */
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const NAME = "Ziv Behar";

const SHIP_SRC = "/ship-options/ship-line-sym.png";

/** Sequential decrypt settle — gates line / bio / CTAs */
const NAME_DECRYPT = {
  speed: 45,
  sequential: true,
  revealDirection: "start" as const,
};
/** Name finishes decrypt → short beat → copy box starts */
const NAME_SETTLE_MS = NAME.length * NAME_DECRYPT.speed + 220;
/** Last FadeUp delay (0.3s) + duration (0.28s) — copy box fully in */
const COPY_SETTLE_MS = 600;

const Dither = dynamic(
  () => import("@/components/react-bits/Backgrounds/Dither/Dither"),
  { ssr: false }
);

const OFF = { enableMouseInteraction: false as const, mouseRadius: 0 };

/** Locked Desk −1 visual */
const DESK = {
  veil: 0.65,
  /** Face-forward; bottom crop eats studio gray, not the jacket */
  focus: "50% 18%",
  ditherOpacity: 1,
  ditherBlend: "normal" as const,
  dither: {
    ...OFF,
    waveColor: [0.24, 0.24, 0.24] as [number, number, number],
    disableAnimation: false,
    colorNum: 3,
    pixelSize: 2,
    waveAmplitude: 0.46,
    waveFrequency: 2.5,
    waveSpeed: 0.03,
  },
};

/** Top + left rise; late bottom dissolve so the jacket stays deep */
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

const LINE = "UC Berkeley EECS Honors ’27";

/** Noir Signal voice — muted prefix, signal-white typed suffix */
const LIKE_WORDS = [
  "shipping products people actually use.",
  "building real-world AI.",
  "turning ideas into reality.",
  "building my own AI models.",
  "creating websites and apps.",
  "squeezing performance from silicon.",
  "solving problems people didn't know they had.",
];

const NAV = [
  { label: "Projects", href: "#projects" },
  { label: "Academics", href: "#academics" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

/** Locked Fr·Sp pairing + size +4 */
const FONT = {
  display: "var(--font-fraunces), serif",
  body: "var(--font-space-grotesk), sans-serif",
  nameWeight: 400,
  nameTracking: "-0.02em",
} as const;

const SIZE = {
  col: "max-w-2xl md:max-w-3xl",
  name: "text-7xl md:text-9xl",
  line: "text-2xl md:text-3xl",
  bio: "text-lg md:text-xl",
  bioMax: "max-w-lg",
  cta: "text-base",
  ctaPad: "px-7 py-3.5",
  gapName: "mt-7",
  gapLine: "mt-5",
  gapBio: "mt-10",
  /** ~60% of previous strip width (was max-w-xl / 36rem → ~22rem) */
  marqueeMax: "w-[22rem] max-w-[22rem]",
} as const;

type LogoMeta = {
  src: string;
  alt: string;
  href?: string;
  /** Override display height (default LOGO_H). BSAC reads small at the shared size. */
  height?: number;
  /** Black-ink assets → invert to white on the dark strip */
  invert?: boolean;
  /** Extra CSS filter (e.g. brightness for washed seals) */
  filter?: string;
};

const LOGO_H = 26;

function logoNode({
  src,
  alt,
  href,
  height = LOGO_H,
  invert = false,
  filter,
}: LogoMeta) {
  const parts = [
    invert ? "invert(1)" : null,
    filter || null,
  ].filter(Boolean);
  return {
    node: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        draggable={false}
        className="block w-auto object-contain"
        style={{
          height,
          filter: parts.length ? parts.join(" ") : undefined,
        }}
      />
    ),
    title: alt,
    ariaLabel: alt,
    href,
  };
}

/** Natural widths + fixed gap. All marks ~same optical height (LOGO_H). */
const LOGO_STRIP = [
  // AWS wordmark reads small at LOGO_H — bump optical size
  logoNode({ src: "/logos/aws.svg", alt: "AWS", height: 34 }),
  logoNode({ src: "/logos/bsac.png?v=11", alt: "BSAC" }),
  logoNode({
    src: "/logos/liftr.png",
    alt: "LIFTR",
    href: "https://apps.apple.com/us/app/liftr-get-jacked/id6748885669",
  }),
  logoNode({
    src: "/logos/moffitt-bw.png",
    alt: "MoffittStatus",
    href: "https://github.com/zivbeh/MoffittStatus",
  }),
  logoNode({
    src: "/logos/ordercubic.svg",
    alt: "OrderCubic",
    href: "https://github.com/zivbeh/OrderCubic",
  }),
  // White-baked seal (no CSS invert — that made it vanish on black)
  logoNode({
    src: "/logos/berkeley-bw.png?v=10",
    alt: "UC Berkeley",
    filter: "brightness(1.35) contrast(1.15)",
  }),
];
function FadeUp({
  children,
  delay = 0,
  className = "",
  ready = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  ready?: boolean;
}) {
  const reduce = useReducedMotion();
  // CRITICAL: !ready stays hidden — never treat "waiting" as "show final"
  const visible = !!reduce || ready;
  return (
    <motion.div
      className={className}
      initial={false}
      animate={
        visible
          ? { opacity: 1, transform: "translateY(0px)" }
          : { opacity: 0, transform: "translateY(10px)" }
      }
      transition={{
        duration: reduce ? 0 : 0.28,
        delay: reduce || !ready ? 0 : delay,
        ease: EASE_OUT,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Floating glass pill — common dark-portfolio pattern
 * (shadcn floating-pill / glassmorph nav): centered, blurred, brand + links.
 */
function TopNav({
  ready = false,
  onHome,
  onAbout,
  onProjects,
  onContact,
  onAcademics,
}: {
  ready?: boolean;
  onHome?: () => void;
  onAbout?: () => void;
  onProjects?: () => void;
  onContact?: () => void;
  onAcademics?: () => void;
}) {
  const reduce = useReducedMotion();
  const visible = !!reduce || ready;
  const [menuOpen, setMenuOpen] = useState(false);
  const isNarrow = useMediaQuery("(max-width: 720px)");

  useEffect(() => {
    if (!isNarrow) setMenuOpen(false);
  }, [isNarrow]);

  const handleAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href === "#about") {
      e.preventDefault();
      onAbout?.();
      return;
    }
    if (href === "#projects") {
      e.preventDefault();
      onProjects?.();
      return;
    }
    if (href === "#contact") {
      e.preventDefault();
      onContact?.();
      return;
    }
    if (href === "#academics") {
      e.preventDefault();
      onAcademics?.();
    }
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[300] flex justify-center px-3 pt-3 md:pt-4">
      <motion.div
        className="w-auto max-w-[calc(100%-1.5rem)]"
        style={{
          fontFamily: FONT.body,
          pointerEvents: visible ? "auto" : "none",
        }}
        initial={false}
        animate={
          visible
            ? { opacity: 1, transform: "translateY(0px)" }
            : { opacity: 0, transform: "translateY(-10px)" }
        }
        transition={{
          duration: reduce ? 0 : 0.32,
          delay: reduce || !ready ? 0 : 0.06,
          ease: EASE_OUT,
        }}
      >
        <nav className="hero-nav" aria-label="Primary">
          <a
            href="/"
            className="hero-nav-brand"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              onHome?.();
            }}
          >
            Ziv Behar
          </a>
          <span className="hero-nav-sep" aria-hidden />
          {!isNarrow ? (
            <div className="hero-nav-links">
              {NAV.map((item) =>
                item.href.startsWith("#") ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="hero-nav-link"
                    onClick={(e) => handleAnchor(e, item.href)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.label} href={item.href} className="hero-nav-link">
                    {item.label}
                  </Link>
                )
              )}
            </div>
          ) : (
            <button
              type="button"
              className="hero-nav-menu-btn"
              aria-expanded={menuOpen}
              aria-controls="hero-nav-panel"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          )}
        </nav>
        {isNarrow && menuOpen ? (
          <div id="hero-nav-panel" className="hero-nav-panel">
            {NAV.map((item) =>
              item.href.startsWith("#") ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="hero-nav-panel-link"
                  onClick={(e) => {
                    handleAnchor(e, item.href);
                    setMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hero-nav-panel-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        ) : null}
      </motion.div>
    </header>
  );
}

function HeroContent({
  nameReady = false,
  onCopyReady,
}: {
  nameReady?: boolean;
  onCopyReady?: () => void;
}) {
  const ink = "#F4F4F4";
  const reduce = useReducedMotion();
  const [copyReady, setCopyReady] = useState(false);

  useEffect(() => {
    if (!nameReady) {
      setCopyReady(false);
      return;
    }
    if (reduce) {
      setCopyReady(true);
      onCopyReady?.();
      return;
    }
    setCopyReady(false);
    const timers: number[] = [];
    // Copy starts slightly after the name decrypt finishes
    timers.push(
      window.setTimeout(() => setCopyReady(true), NAME_SETTLE_MS)
    );
    // Nav waits until the copy box has finished settling
    timers.push(
      window.setTimeout(
        () => onCopyReady?.(),
        NAME_SETTLE_MS + COPY_SETTLE_MS
      )
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [nameReady, reduce, onCopyReady]);

  const showName = !!reduce || nameReady;
  const showCopy = !!reduce || copyReady;

  return (
    <div
      className="relative z-20 flex h-[100dvh] w-full items-center px-6 pb-10 pt-8 md:px-12"
      style={{ pointerEvents: showName ? "auto" : "none" }}
    >
      <div className={`w-full ${SIZE.col}`}>
        <FadeUp delay={0} ready={showName}>
          <h1
            className={`${SIZE.name} leading-[0.94]`}
            style={{
              color: ink,
              fontFamily: FONT.display,
              fontWeight: FONT.nameWeight,
              letterSpacing: FONT.nameTracking,
            }}
          >
            {showName && !reduce ? (
              <DecryptedText
                key="boot-name"
                text={NAME}
                animateOn="view"
                sequential={NAME_DECRYPT.sequential}
                revealDirection={NAME_DECRYPT.revealDirection}
                speed={NAME_DECRYPT.speed}
                maxIterations={12}
                className="text-[#F4F4F4]"
                encryptedClassName="text-white/35"
                parentClassName="inline"
              />
            ) : (
              NAME
            )}
          </h1>
        </FadeUp>
        <FadeUp delay={0.04} ready={showCopy}>
          <p
            className={`${SIZE.gapName} ${SIZE.line}`}
            style={{ color: ink, fontFamily: FONT.display }}
          >
            {LINE}
          </p>
        </FadeUp>
        <FadeUp delay={0.12} ready={showCopy}>
          <p
            className={`${SIZE.gapLine} ${SIZE.bioMax} ${SIZE.bio} leading-relaxed`}
            style={{ fontFamily: FONT.body }}
          >
            <span className="text-[#8A8A8A]">I like</span>{" "}
            <Typewriter
              words={LIKE_WORDS}
              active={showCopy}
              accentClassName="text-[#F4F4F4] font-medium"
            />
          </p>
        </FadeUp>
        <FadeUp
          delay={0.2}
          ready={showCopy}
          className={`${SIZE.gapBio} flex flex-wrap gap-3`}
        >
          <a
            href="#projects"
            className={`hero-cta hero-pressable ${SIZE.ctaPad} ${SIZE.cta} font-medium`}
            style={{ fontFamily: FONT.body }}
          >
            View projects
          </a>
          <a
            href="#contact"
            className={`hero-cta-ghost hero-pressable ${SIZE.ctaPad} ${SIZE.cta}`}
            style={{ fontFamily: FONT.body }}
          >
            Contact
          </a>
        </FadeUp>
        <FadeUp delay={0.3} ready={showCopy}>
          <div
            className={`mt-8 ${SIZE.marqueeMax} border-t border-white/15 pt-4 text-white/55`}
          >
            <div
              className="overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
              }}
            >
              <LogoLoop
                logos={LOGO_STRIP}
                speed={50}
                direction="left"
                logoHeight={LOGO_H}
                gap={36}
                pauseOnHover={false}
                fadeOut={false}
                ariaLabel="Affiliations and tools"
              />
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}

export function HomeHeroLab() {
  const [hydrated, setHydrated] = useState(false);
  const boot = useHeroBoot();
  const [navReady, setNavReady] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reduce = useReducedMotion();
  const navTimer = useRef<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [cueVisible, setCueVisible] = useState(true);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [contactPanel, setContactPanel] =
    useState<ContactDeckPanel>("contact");

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash === "academics" || hash === "archive") {
      setContactPanel(hash);
    }
  }, []);
  /** During expand: portrait is inside the boot window. After settle: clipped to hero. */
  const portraitInBoot = boot.live && boot.visual !== "done";
  const portraitInHero = boot.bypass || boot.visual === "done";
  /** Ship as soon as the hollow square starts expanding (not after nav delay) */
  const shipLive =
    !isMobile &&
    hydrated &&
    !projectModalOpen &&
    (boot.bypass || boot.visual === "expand" || boot.visual === "done");

  useEffect(() => {
    setHydrated(true);
    // Warm the ship asset during + / square so expand isn't waiting on the PNG
    const img = new Image();
    img.src = SHIP_SRC;
  }, []);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const onScroll = () => {
      setCueVisible(root.scrollTop < root.clientHeight * 0.18);
    };
    onScroll();
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => root.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!shipLive) {
      if (projectModalOpen) {
        document.body.style.cursor = "";
      }
      return;
    }
    const prev = document.body.style.cursor;
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = prev;
    };
  }, [shipLive, projectModalOpen]);

  useEffect(() => {
    if (!boot.nameReady) setNavReady(false);
  }, [boot.nameReady]);

  const onCopyReady = useCallback(() => {
    if (navTimer.current) window.clearTimeout(navTimer.current);
    if (reduce) {
      setNavReady(true);
      return;
    }
    navTimer.current = window.setTimeout(
      () => setNavReady(true),
      BOOT.beforeNav
    );
  }, [reduce]);

  useEffect(() => {
    return () => {
      if (navTimer.current) window.clearTimeout(navTimer.current);
    };
  }, []);

  const scrollToId = useCallback(
    (id: string) => {
      const root = scrollerRef.current;
      const el = document.getElementById(id);
      if (!root || !el) return;
      root.scrollTo({
        top: el.offsetTop,
        behavior: reduce ? "auto" : "smooth",
      });
    },
    [reduce]
  );

  const scrollToHome = useCallback(() => {
    setContactPanel("contact");
    const root = scrollerRef.current;
    if (!root) return;
    root.scrollTo({
      top: 0,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [reduce]);

  const scrollToAbout = useCallback(() => scrollToId("about"), [scrollToId]);
  const scrollToProjects = useCallback(
    () => scrollToId("projects"),
    [scrollToId]
  );
  const scrollToContact = useCallback(() => {
    setContactPanel("contact");
    scrollToId("contact");
  }, [scrollToId]);

  const scrollToAcademics = useCallback(() => {
    setContactPanel("academics");
    scrollToId("contact");
  }, [scrollToId]);

  useEffect(() => {
    const root = scrollerRef.current;
    const el = document.getElementById("contact");
    if (!root || !el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) setContactPanel("contact");
      },
      { root, threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const field = (
    <>
      <div
        className="absolute inset-0"
        style={{ opacity: DESK.ditherOpacity, mixBlendMode: DESK.ditherBlend }}
      >
        {hydrated ? (
          <Dither
            {...DESK.dither}
            enableMouseInteraction={false}
            mouseRadius={0}
          />
        ) : null}
      </div>

      {portraitInBoot ? (
        <div className="absolute inset-0" style={{ zIndex: 2 }}>
          <div
            className="pointer-events-none absolute -bottom-[10vh] right-0 h-[108%] w-[54%] md:w-[48%]"
            style={RISE_MASK}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile-classic.png"
              alt=""
              className="h-full w-full object-cover grayscale"
              style={{ objectPosition: DESK.focus }}
              draggable={false}
            />
          </div>
        </div>
      ) : null}

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          zIndex: 4,
          background: `linear-gradient(105deg, rgba(0,0,0,${0.5 + DESK.veil * 0.4}) 0%, rgba(0,0,0,${0.2 + DESK.veil * 0.25}) 36%, rgba(0,0,0,0.08) 58%, transparent 76%)`,
        }}
      />
    </>
  );

  return (
    <div
      ref={scrollerRef}
      className="relative h-[100dvh] overflow-x-hidden overflow-y-auto bg-black text-white snap-y snap-mandatory overscroll-y-contain"
    >
      {shipLive ? (
        <CursorShip2D
          src={SHIP_SRC}
          headingOffsetDeg={-90}
          size={104}
          fx={{
            trail: "#F4F4F4",
            exhaust: ["#6E6E6E", "#C8C8C8", "#FFFFFF"],
          }}
        />
      ) : null}

      <HeroBootReveal
        visual={boot.visual}
        live={boot.live}
        bypass={boot.bypass}
      >
        {field}
      </HeroBootReveal>

      <TopNav
        ready={navReady}
        onHome={scrollToHome}
        onAbout={scrollToAbout}
        onProjects={scrollToProjects}
        onContact={scrollToContact}
        onAcademics={scrollToAcademics}
      />

      <div className="relative z-20">
        <section className="relative h-[100dvh] w-full shrink-0 snap-start overflow-hidden">
          {portraitInHero ? (
            <div
              className="pointer-events-none absolute -bottom-[10vh] right-0 z-[2] h-[108%] w-[54%] md:w-[48%]"
              style={RISE_MASK}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile-classic.png"
                alt=""
                className="h-full w-full object-cover grayscale"
                style={{ objectPosition: DESK.focus }}
                draggable={false}
              />
            </div>
          ) : null}
          <HeroContent nameReady={boot.nameReady} onCopyReady={onCopyReady} />

          {navReady ? (
            <a
              href="#about"
              className="hero-scroll-cue"
              data-hidden={cueVisible ? undefined : "true"}
              onClick={(e) => {
                e.preventDefault();
                scrollToAbout();
              }}
            >
              <span>About</span>
              <span className="hero-scroll-cue-mark" aria-hidden>
                ↓
              </span>
            </a>
          ) : null}
        </section>

        <HeroAboutSection />
        <HeroProjectsSection
          onModalOpenChange={setProjectModalOpen}
        />
        <HeroContactArchiveStage
          panel={contactPanel}
          onPanelChange={setContactPanel}
          onModalOpenChange={setProjectModalOpen}
        />
      </div>
    </div>
  );
}
