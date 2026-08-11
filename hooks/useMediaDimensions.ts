"use client";

import { useEffect, useState } from "react";

export type SizedMedia = {
  src: string;
  type: "image" | "video";
  width: number;
  height: number;
};

function encodeMediaSrc(src: string) {
  // Encode path segments so filenames with spaces/resolve reliably
  return src
    .split("/")
    .map((part, i) => (i === 0 ? part : encodeURIComponent(decodeURIComponent(part)))
    )
    .join("/");
}

function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(fallback), ms);
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch(() => {
        clearTimeout(timer);
        resolve(fallback);
      });
  });
}

function loadImageSize(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () =>
      resolve({ width: img.naturalWidth || 1, height: img.naturalHeight || 1 });
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = encodeMediaSrc(src);
  });
}

function loadVideoSize(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      resolve({
        width: video.videoWidth || 16,
        height: video.videoHeight || 9,
      });
      video.removeAttribute("src");
      video.load();
    };
    video.onerror = () => reject(new Error(`Failed to load video: ${src}`));
    video.src = encodeMediaSrc(src);
  });
}

export function useMediaDimensions(
  items: Array<{ src: string; type: "image" | "video" }>
): { media: SizedMedia[]; ready: boolean } {
  const [media, setMedia] = useState<SizedMedia[]>([]);
  const [ready, setReady] = useState(false);
  const key = items.map((i) => `${i.type}:${i.src}`).join("|");

  useEffect(() => {
    let cancelled = false;
    setReady(false);

    (async () => {
      const sized = await Promise.all(
        items.map(async (item) => {
          const fallback = {
            width: item.type === "video" ? 16 : 4,
            height: item.type === "video" ? 9 : 3,
          };
          const dims = await withTimeout(
            item.type === "video"
              ? loadVideoSize(item.src)
              : loadImageSize(item.src),
            4000,
            fallback
          );
          return { ...item, ...dims };
        })
      );
      if (!cancelled) {
        setMedia(sized);
        setReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [key]);

  return { media, ready };
}
