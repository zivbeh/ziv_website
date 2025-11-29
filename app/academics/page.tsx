"use client";

import { useState, useEffect } from "react";
import { Academics } from "@/components/ui/Academics";
import { Stars2D } from "@/components/ui/Stars2D";
import { TopBar } from "@/components/ui/TopBar";

export default function AcademicsPage() {
  const [isReady, setIsReady] = useState(false);

  // Initialize
  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleNavigate = (section: string) => {
    const params = new URLSearchParams();
    if (section !== "home" && section !== "academics") {
      params.set("section", section);
    }
    const url = `/?${params.toString()}`;
    window.location.href = url;
  };

  const handleBackToPortfolio = () => {
    handleNavigate("home");
  };

  return (
    <main className="min-h-screen bg-black" suppressHydrationWarning>
      <Stars2D />
      <div className="fixed top-0 left-0 right-0 z-50" suppressHydrationWarning>
        <TopBar
          onNavigate={handleNavigate}
        />
      </div>
      <div className="fixed top-8 left-8 z-[100] pt-16" suppressHydrationWarning>
        <button
          onClick={handleBackToPortfolio}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all"
        >
          &larr; Back to Portfolio
        </button>
      </div>
      {isReady && <Academics />}
    </main>
  );
}
