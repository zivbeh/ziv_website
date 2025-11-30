"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { getTagStyle } from "@/lib/utils";

const TAGS = ["AI", "Web", "Backend", "Low Level Systems"];

export default function RealAboutMe() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const textVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const paragraphVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 0.5,
      },
    },
  };

  const tagVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.section
      id="about"
      className="relative z-20 w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: isMobile ? 0.1 : 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-6 pt-6 pb-10">
        {/* Title Section outside the box */}
        <motion.div 
          variants={textVariants}
          className="text-center mb-8"
        >
          <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">About Me</h2>
          <p className="text-white/60 mt-2 text-sm md:text-base">
            My background, expertise, and what drives me to build things.
          </p>
        </motion.div>

        <div className="bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Image Side */}
            <motion.div 
              className="lg:w-1/3 relative min-h-[300px] lg:min-h-full"
              variants={imageVariants}
            >
              <Image
                src="/profile.JPG"
                alt="Ziv Behar"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              {/* Gradient overlay for better text integration if needed, or just style */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/60" />
            </motion.div>

            {/* Content Side */}
            <div className="lg:w-2/3 p-8 lg:p-12 flex flex-col justify-center">
              <motion.h3 
                variants={textVariants}
                className="text-2xl font-bold text-white mb-6"
              >
                Engineer & Builder
              </motion.h3>
              
              <div className="space-y-4 text-white/80 text-base leading-relaxed">
                <motion.p variants={paragraphVariants}>
                  I’m a UC Berkeley EECS student who likes turning messy ideas into working systems. Recently that’s meant building an acquired library-seat radar for my university campus, an AI photo-intelligence pipeline, and a personal AI IDE that edits code on its own. I care about projects that mix complex architecture, UX, and real users.
                </motion.p>
                
                <motion.p variants={paragraphVariants}>
                  Before Berkeley, I learned to build in hardware and software through robotics and side projects – what started as building video games and websites evolved into more complicated projects. Now I’m focusing on AI, developer tools, and human-computer interaction, and I’m always looking for teams where I can own real pieces of the stack and ship fast.
                </motion.p>
              </div>

              {/* Tags */}
              <motion.div 
                className="mt-8 flex flex-wrap gap-2"
                variants={paragraphVariants}
              >
                {TAGS.map((tag) => (
                  <motion.span
                    key={tag}
                    variants={tagVariants}
                    className={`inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full border ${getTagStyle(tag)}`}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              {/* Buttons */}
              <motion.div 
                className="mt-8 flex flex-wrap gap-4"
                variants={paragraphVariants}
              >
                <a
                  href="/CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition-colors text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                  </svg>
                  View Resume
                </a>
                <a
                  href="https://www.linkedin.com/in/ziv-behar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors text-sm"
                >
                  View LinkedIn
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

