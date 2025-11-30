"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/types";

const AUTO_SWITCH_DURATION = 5500;
const BALLOONS_POP_VIDEO_START_TIME = 15;
const BALLOONS_POP_ID = 'balloons-pop';
const LIBRARY_SEAT_RADAR_ID = 'library-seat-radar';
const LIBRARY_STATS_IMAGE_KEYWORD = 'Outreach Stats';

type FeaturedCarouselProps = {
  items: Project[];
  onSelect: (project: Project) => void;
};

export function FeaturedCarousel({ items, onSelect }: FeaturedCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // State to track the current duration for the slide timer.
  const [currentDuration, setCurrentDuration] = useState(AUTO_SWITCH_DURATION);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % items.length);
      // Reset duration back to default after auto-switch
      setCurrentDuration(AUTO_SWITCH_DURATION);
    }, currentDuration);
    return () => clearInterval(timer);
  }, [index, items.length, isPaused, currentDuration]);

  // Handle video start time
  useEffect(() => {
    const currentProject = items[index];
    // If this is Balloons Pop (video), set start time
    if (currentProject.id === BALLOONS_POP_ID && videoRef.current) {
      // Slight delay to ensure video is loaded/ready
      const video = videoRef.current;
      const setTime = () => {
        if (video.currentTime < BALLOONS_POP_VIDEO_START_TIME) {
          video.currentTime = BALLOONS_POP_VIDEO_START_TIME;
        }
      };
      
      if (video.readyState >= 1) {
        setTime();
      } else {
        video.addEventListener('loadedmetadata', setTime, { once: true });
      }
    }
  }, [index, items]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + items.length) % items.length);
    // Double the wait time on manual interaction
    setCurrentDuration(AUTO_SWITCH_DURATION * 2);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const currentProject = items[index];
  
  // Determine media source
  let imageSrc = currentProject.images?.[0] ?? currentProject.image;
  let videoSrc = null;

  if (currentProject.id === LIBRARY_SEAT_RADAR_ID) {
     // Try to find the stats image specifically
     const statsImg = currentProject.images?.find(img => img.includes(LIBRARY_STATS_IMAGE_KEYWORD));
     if (statsImg) imageSrc = statsImg;
  } else if (currentProject.id === BALLOONS_POP_ID) {
    // Use video for Balloons Pop
    videoSrc = currentProject.videos?.[0];
  }

  return (
    <div 
      id="featured"
      className="relative w-[calc(90vw-2rem)] md:w-[calc(70vw-2rem)] md:max-w-5xl min-[1700px]:!w-[60vw] min-[1700px]:!max-w-none mx-auto h-[500px] md:h-[400px] mb-16 overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-black/50 backdrop-blur-sm group"
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0 flex flex-col md:flex-row h-full w-full"
        >
          {/* Content Side */}
          <div className="flex-1 p-8 md:p-10 flex flex-col justify-center relative z-10 bg-gradient-to-r from-black via-black/90 to-transparent md:w-1/2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-cyan-400 uppercase bg-cyan-400/10 rounded-full border border-cyan-400/20">
                  Featured Project
                </span>
                <span className="text-white/40 text-xs font-mono ml-auto border border-white/10 px-2 py-0.5 rounded-full">
                  {index + 1} / {items.length}
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                {currentProject.name}
              </h2>
              <p className="text-gray-300 text-sm md:text-base line-clamp-3 mb-5 max-w-lg leading-relaxed">
                {currentProject.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {currentProject.tools.slice(0, 3).map((tool, i) => (
                  <span key={i} className="text-[10px] md:text-xs text-white/70 bg-white/5 px-2 py-1 rounded border border-white/10">
                    {tool}
                  </span>
                ))}
              </div>
              <button
                onClick={() => onSelect(currentProject)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
              >
                View Details
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </motion.div>
          </div>

          {/* Image/Video Side */}
          <div className="absolute inset-0 md:static md:w-1/2 h-full w-full">
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:hidden z-0" />
             {/* Gradient overlay on desktop to blend image with text background */}
             <div className="hidden md:block absolute inset-y-0 left-1/2 w-20 -ml-10 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            {videoSrc ? (
              <video
                ref={videoRef}
                src={videoSrc}
                className="h-full w-full object-cover opacity-65 md:opacity-100 transition-opacity duration-500"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : imageSrc ? (
              <img
                src={imageSrc}
                alt={currentProject.name}
                className="h-full w-full object-cover opacity-65 md:opacity-100 transition-opacity duration-500"
              />
            ) : (
              <div className="h-full w-full bg-gray-900" />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls - Always visible and more prominent */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex gap-3 z-20">
        <button
          onClick={() => paginate(-1)}
          className="p-3 rounded-full bg-black/60 hover:bg-white/20 text-white backdrop-blur border border-white/20 transition-all hover:scale-110 active:scale-95 group"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          onClick={() => paginate(1)}
          className="p-3 rounded-full bg-black/60 hover:bg-white/20 text-white backdrop-blur border border-white/20 transition-all hover:scale-110 active:scale-95 group"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Progress Bar (Desktop & Mobile) */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <motion.div 
          key={`${index}-${currentDuration}-${isPaused}`}
          initial={{ width: isPaused ? "100%" : "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: isPaused ? 0 : currentDuration / 1000, ease: "linear" }}
          className="h-full bg-cyan-500"
        />
      </div>
      
      {/* Dots indicator */}
      <div className="absolute bottom-6 left-8 flex gap-2 z-20 md:hidden">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
              setCurrentDuration(AUTO_SWITCH_DURATION * 2);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "bg-cyan-400 w-6" : "bg-white/30 w-2 hover:bg-white/50"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
