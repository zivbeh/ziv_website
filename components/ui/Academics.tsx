"use client";

import { useState, useRef, useEffect } from "react";
import { academics, ClassInfo } from "@/lib/academics";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const extractTags = (classInfo: ClassInfo) => {
  const tools =
    classInfo.toolsSoftware
      .join(" ")
      .match(/\b(Python|C\+\+|Java|RISC-V|SPICE|MATLAB|Scheme|React|Logisim|Verilog|Git|NumPy|Pandas|SQL)\b/gi) || [];

  const knowledge =
    classInfo.coreKnowledge
      .join(" ")
      .match(/\b(Algorithms|Data Structures|Circuits|Linear Algebra|Machine Learning|AI|OS|Networking|Security|Databases)\b/gi) || [];

  const allTags = [...new Set([...tools, ...knowledge])];
  return allTags.slice(0, 4);
};

const AcademicCard = ({ classInfo, onSelect }: { classInfo: ClassInfo; onSelect: () => void }) => {
  const tags = extractTags(classInfo);
  const ref = useRef<HTMLDivElement>(null);
  
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);
  
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        motionX.set(-rect.left);
        motionY.set(-rect.top);
      }
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [motionX, motionY]);

  const hoverScale = 1.03;

  return (
    <motion.div
      ref={ref}
      layoutId={`academic-card-${classInfo.title}`}
      onClick={onSelect}
      className="relative p-6 rounded-2xl cursor-pointer overflow-hidden min-h-[12rem] flex flex-col justify-between group"
      whileHover={{ scale: hoverScale }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="absolute top-0 left-0 w-screen h-screen"
        style={{
          backgroundImage: "url('/berk.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          x: motionX,
          y: motionY,
        }}
        animate={{ scale: isHovered ? 1 / hoverScale : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-white/20 transition-all duration-300" />
      <div className="relative z-10 flex flex-col h-full">
        <h3 className="text-xl font-bold text-white">{classInfo.title}</h3>
        <div className="flex-grow" />
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/90 border border-white/10">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ClassModal = ({ classInfo, onClose }: { classInfo: ClassInfo; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] bg-black/80 backdrop-blur-lg flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900/80 border border-white/20 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">{classInfo.title}</h2>

        <div className="space-y-4 text-white/90">
          <div>
            <h3 className="font-semibold text-lg text-cyan-400 mb-2">Core Knowledge</h3>
            <ul className="list-disc list-outside pl-5 space-y-1 text-sm">
              {classInfo.coreKnowledge.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-cyan-400 mb-2">Tools/Software</h3>
            <ul className="list-disc list-outside pl-5 space-y-1 text-sm">
              {classInfo.toolsSoftware.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-cyan-400 mb-2">Applications Used</h3>
            <ul className="list-disc list-outside pl-5 space-y-1 text-sm">
              {classInfo.applicationsUsed.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-cyan-400 mb-2">Physical Devices/Instrumentation</h3>
            <ul className="list-disc list-outside pl-5 space-y-1 text-sm">
              {classInfo.physicalDevices.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export function Academics({ isModal = false }: { isModal?: boolean }) {
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);

  return (
    <>
      <div id="academics" className={isModal ? "" : "py-16 sm:py-24"}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Academics</h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Units: {academics.units}
              {academics.honorStudent && " | Engineering Honor Student"}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {academics.classes.map((classInfo) => (
              <AcademicCard key={classInfo.title} classInfo={classInfo} onSelect={() => setSelectedClass(classInfo)} />
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedClass && <ClassModal classInfo={selectedClass} onClose={() => setSelectedClass(null)} />}
      </AnimatePresence>
    </>
  );
}
