"use client";

import dynamic from "next/dynamic";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

const DriftWall = dynamic(
  () => import("@/components/react-bits/Components/DriftWall/DriftWall"),
  { ssr: false }
);

/** Strong ease-out — section enter (animate skill table) */
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const FONT = {
  display: "var(--font-fraunces), serif",
  body: "var(--font-space-grotesk), sans-serif",
} as const;

/**
 * Mixed columns — each tile should feel different from the ones around it
 * (UI ≠ PCB ≠ photo ≠ diagram). Avoid stacking the same project.
 */
const DRIFT_COLUMNS = [
  // Column 1
  [
    { image: "/logos/aws.svg", title: "AWS" },
    { image: "/research/ultrasound-target-setup.jpg", title: "Ultrasound setup" },
    { image: "/status/Website Engagment.png", title: "Status traction" },
    { image: "/c61cpu/RISC-V Datapath.png", title: "RISC-V CPU" },
    { image: "/hackathonBAB/winning photo.jpg", title: "B&B Hacks 1st" },
    { image: "/ordercubic/Floorplan for the App.png", title: "OrderCubic" },
  ],
  // Column 2
  [
    { image: "/status/Status Website Look.png", title: "Library-Seat Radar" },
    {
      image: "/research/reconstruction of the cross.jpeg",
      title: "3D ultrasound",
    },
    { image: "/liftr/pullup with score.png", title: "LIFTR scoring" },
    { image: "/balloonspopgame/Example Map.png", title: "Balloons Pop" },
    {
      image: "/guitarAMP/Breadboard In Progress.jpg",
      title: "Guitar amp lab",
    },
    { image: "/hackathonBAB/view.png", title: "STRATA" },
  ],
  // Column 3
  [
    { image: "/liftr/liftr home.png", title: "LIFTR" },
    { image: "/stickyfred/Example Game.png", title: "Sticky Fred" },
    { image: "/research/pcb-layout.jpg", title: "PCB layout" },
    { image: "/ordercubic/floorplan2.jpg", title: "Seating plans" },
    {
      image: "/status/Berkeley Skydeck Incubator.jpeg",
      title: "SkyDeck Pad-13",
    },
    { image: "/c61cpu/Arithmetic Unit of CPU.png", title: "ALU" },
  ],
  // Column 4
  [
    {
      image: "/status/Outreach Stats One Month After Launch.png",
      title: "Status outreach",
    },
    { image: "/research/pcb-preassembly.jpeg", title: "PCB bring-up" },
    { image: "/liftr/data analytics.JPG", title: "LIFTR analytics" },
    { image: "/MoneyPortal/Gameplay Start.png", title: "Money Portal" },
    { image: "/c61cpu/Data Path in Logisim.png", title: "CPU datapath" },
    {
      image: "/3dprojs/Basketball Hoop For My Desk.png",
      title: "Desk hoop CAD",
    },
  ],
].map((col) => col.map((item) => ({ ...item, image: encodeURI(item.image) })));

export function HeroAboutSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="about"
      className="relative z-20 min-h-[100dvh] w-full shrink-0 snap-start overflow-hidden px-6 py-24 md:px-12 md:py-28"
    >
      <div aria-hidden className="field-veil field-veil--about" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-stretch lg:block lg:min-h-[min(78vh,40rem)]">
        <motion.div
          className="relative z-10 max-w-xl"
          initial={
            reduce
              ? false
              : { opacity: 0, transform: "translateY(12px)" }
          }
          whileInView={
            reduce ? undefined : { opacity: 1, transform: "translateY(0px)" }
          }
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: reduce ? 0 : 0.28,
            ease: EASE_OUT,
          }}
        >
          <p
            className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[#8A8A8A]"
            style={{ fontFamily: FONT.body }}
          >
            About
          </p>
          <h2
            className="text-4xl leading-[1.05] text-[#F4F4F4] md:text-5xl lg:text-6xl"
            style={{
              fontFamily: FONT.display,
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            Engineer &amp; Builder
          </h2>
          <div
            className="mt-7 space-y-5 text-base leading-relaxed text-[#C8C8C8] md:text-lg"
            style={{ fontFamily: FONT.body }}
          >
            <p>
              I&apos;m a UC Berkeley EECS student who likes turning messy ideas
              into working systems. Recently that&apos;s meant working for AWS on the RDS platform, building an
              acquired gym exercise form feedback mobile app and a library-seat radar for my campus, researching machine learning
              applications for 3D ultrasound, and shipping an AI photo-intelligence pipeline.
            </p>
            <p>
              I care about projects that mix complex architecture, UX, and real
              users, tools people actually rely on, not demos that get
              abandoned.
            </p>
          </div>
          <div
            className="mt-9 flex flex-wrap gap-3"
            style={{ fontFamily: FONT.body }}
          >
            <a
              href="/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta hero-pressable px-6 py-3 text-sm font-medium"
            >
              View resume
            </a>
            <a
              href="https://www.linkedin.com/in/ziv-behar/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-ghost hero-pressable px-6 py-3 text-sm"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Breaks out of the text column — bleeds to the viewport edge */}
        <motion.div
          className="relative mt-12 h-[min(54vh,27rem)] w-full overflow-hidden lg:absolute lg:top-0 lg:bottom-0 lg:right-[calc(50%-50vw)] lg:my-auto lg:h-[min(77vh,41rem)] lg:w-[56vw]"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reduce ? 0 : 0.28,
            delay: reduce ? 0 : 0.05,
            ease: EASE_OUT,
          }}
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
            maskImage:
              "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          }}
        >
          <DriftWall
            columnItems={DRIFT_COLUMNS}
            columns={DRIFT_COLUMNS.length}
            tileWidth={189}
            tileHeight={126}
            gap={14}
            radius={11}
            tilt={14}
            turn={-13}
            depth={85}
            planeScale={1.15}
            speed={30}
            variance={0.3}
            parallax={0.35}
            lift={40}
            fade={0.72}
            dim={1}
            grayscale={false}
            overlayColor="#050505"
            className="h-full w-full"
            style={
              {
                ["--dw-overlay-alpha"]: "0.02",
              } as CSSProperties
            }
          />
        </motion.div>
      </div>
    </section>
  );
}
