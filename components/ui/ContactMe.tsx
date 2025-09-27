"use client";

import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function ContactMe() {
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.section
      id="contact"
      className="relative z-20 w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: isMobile ? 0.1 : 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-6 pt-6 pb-10">
        <div className="bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 md:p-10">
            <motion.h2
              variants={itemVariants}
              className="text-white text-2xl md:text-3xl font-extrabold tracking-tight mb-6"
            >
              Contact Me
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
              <motion.div variants={itemVariants}>
                <p className="text-white/90">Ziv Behar</p>
                <p className="text-white/70 text-sm">UC Berkeley 2027 — Electrical Engineering and Computer Science</p>
                <div className="mt-3 space-y-2 text-sm">
                  <div>
                    <span className="text-white/60 mr-2">Email:</span>
                    <a href="mailto:zivbeh@gmail.com" className="text-cyan-400 hover:text-cyan-300 underline decoration-dotted">zivbeh@gmail.com</a>
                  </div>
                  <div>
                    <span className="text-white/60 mr-2">Phone:</span>
                    <a href="tel:+14083387640" className="text-cyan-400 hover:text-cyan-300 underline decoration-dotted">+1-408-338-7640</a>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="flex flex-wrap items-center gap-4"
                variants={containerVariants}
              >
                <motion.a
                  href="https://github.com/zivbeh"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  variants={itemVariants}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.893 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.95 0-1.093.39-1.988 1.03-2.688-.103-.253-.447-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.027 2.748-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.846-2.338 4.694-4.566 4.943.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.58.688.481A10.019 10.019 0 0 0 22 12.017C22 6.484 17.523 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">GitHub</span>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/ziv-behar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  variants={itemVariants}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.027-3.058-1.863-3.058-1.864 0-2.149 1.454-2.149 2.957v5.705h-3v-10h2.881v1.367h.041c.401-.759 1.379-1.561 2.838-1.561 3.036 0 3.598 2.001 3.598 4.604v5.59z"/>
                  </svg>
                  <span className="hidden sm:inline">LinkedIn</span>
                </motion.a>
                <motion.a
                  href="mailto:zivbeh@gmail.com"
                  aria-label="Email"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  variants={itemVariants}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path fillRule="evenodd" d="M1.5 5.25A2.25 2.25 0 0 1 3.75 3h16.5A2.25 2.25 0 0 1 22.5 5.25v13.5A2.25 2.25 0 0 1 20.25 21H3.75A2.25 2.25 0 0 1 1.5 18.75V5.25Zm1.68-.75a.75.75 0 0 0-.93 1.17l7.5 6a.75.75 0 0 0 .94 0l7.5-6a.75.75 0 0 0-.93-1.17l-7.03 5.62-7.03-5.62Z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">Email</span>
                </motion.a>
                <motion.a
                  href="tel:+14083387640"
                  aria-label="Phone"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  variants={itemVariants}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path fillRule="evenodd" d="M1.5 4.5A3 3 0 0 1 4.5 1.5h3A1.5 1.5 0 0 1 9 3v3a1.5 1.5 0 0 1-1.5 1.5H6.78a13.5 13.5 0 0 0 9.94 9.94V16.5A1.5 1.5 0 0 1 18.22 15h3a1.5 1.5 0 0 1 1.5 1.5v3a3 3 0 0 1-3 3h-.75C9.268 22.5 1.5 14.732 1.5 5.25V4.5z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">Phone</span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}


