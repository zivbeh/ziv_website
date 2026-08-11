"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  clearIntroPendingHold,
  markSiteIntroSeen,
  notifySiteIntroDone,
  shouldSkipSiteIntro,
} from "@/lib/site-intro";

/**
 * Non-home pages: clear the pre-paint hold.
 * `/` owns the plus→square reveal inside HomeHeroLab.
 */
export function SiteIntro() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      return;
    }

    clearIntroPendingHold();
    if (!shouldSkipSiteIntro()) {
      markSiteIntroSeen();
    }
    notifySiteIntroDone();
  }, [pathname]);

  return null;
}
