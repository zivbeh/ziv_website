"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import { useMediaDimensions } from "@/hooks/useMediaDimensions";

type MediaItem = { type: "image" | "video"; src: string };

type AutoMediaGalleryProps = {
  media: MediaItem[];
  onOpen: (index: number) => void;
  getLabel: (src: string) => string;
  onVideoClick?: (
    videoSrc: string,
    videoElement: HTMLVideoElement,
    mediaIndex: number
  ) => void;
  /** Hard vertical budget — gallery is sized to fit inside this height. */
  fillHeight?: number;
};

const MAX_PHOTOS_PER_ROW = 4;
const GAP = 8;

export function AutoMediaGallery({
  media,
  onOpen,
  getLabel,
  onVideoClick,
  fillHeight,
}: AutoMediaGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(720);
  const [fitScale, setFitScale] = useState(1);
  const { media: sized, ready } = useMediaDimensions(media);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = Math.floor(entries[0]?.contentRect.width ?? 0);
      if (w > 0) setContainerWidth(w);
    });
    ro.observe(el);
    setContainerWidth(Math.floor(el.clientWidth) || 720);
    return () => ro.disconnect();
  }, []);

  const count = Math.max(sized.length, media.length, 1);
  /** Phone / portrait strips — one full-height row, not a short justified ribbon */
  const phoneStrip =
    ready &&
    count >= 3 &&
    count <= 5 &&
    sized.every((m) => m.height >= m.width * 1.05);

  const targetRowHeight = useMemo(() => {
    if (!fillHeight || fillHeight < 120) {
      return containerWidth < 500 ? 180 : 240;
    }
    if (count <= 4) {
      return Math.max(260, Math.floor(fillHeight * 0.92));
    }
    const rows = Math.ceil(count / MAX_PHOTOS_PER_ROW);
    return Math.max(
      180,
      Math.floor((fillHeight - GAP * (rows - 1)) / rows)
    );
  }, [fillHeight, count, containerWidth]);

  // Only shrink when the album overflows — never leave a short ribbon in a tall stage
  useLayoutEffect(() => {
    if (!ready || !fillHeight || phoneStrip) {
      setFitScale(1);
      return;
    }
    const album = rootRef.current?.querySelector(
      ".react-photo-album"
    ) as HTMLElement | null;
    if (!album) return;
    const budget = fillHeight - 4;
    const h = album.offsetHeight;
    if (h < 1) return;
    const next = Number(
      (h > budget ? Math.min(1, budget / h) : 1).toFixed(3)
    );
    setFitScale((prev) => (prev === next ? prev : next));
  }, [ready, fillHeight, targetRowHeight, sized.length, containerWidth, phoneStrip]);

  if (!ready) {
    return (
      <div
        ref={rootRef}
        className="flex h-full w-full items-center justify-center rounded-xl border border-white/10 text-sm text-zinc-500"
        data-auto-gallery
        data-gallery-ready="false"
      >
        Loading gallery…
      </div>
    );
  }

  if (phoneStrip) {
    return (
      <div
        ref={rootRef}
        className="pv-phone-strip pv-phone-strip--lead"
        data-auto-gallery
        data-gallery-ready="true"
        style={
          {
            height: fillHeight || "100%",
            "--pv-phone-count": String(count),
          } as CSSProperties
        }
      >
        {sized.map((item, index) => (
          <button
            key={`${item.type}-${item.src}-${index}`}
            type="button"
            className={`pv-phone-strip-cell group${index === 0 ? " pv-phone-strip-cell--lead" : ""}`}
            onClick={() => onOpen(index)}
            aria-label={`Open ${item.type} ${index + 1}`}
          >
            <div className="relative h-full w-full bg-black">
              {item.type === "video" ? (
                <video
                  src={item.src}
                  className="h-full w-full object-cover transition-transform duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.02]"
                  playsInline
                  autoPlay
                  muted
                  loop
                  onClick={(e) => {
                    e.stopPropagation();
                    onVideoClick?.(item.src, e.currentTarget, index);
                  }}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.src}
                  alt={getLabel(item.src)}
                  className="h-full w-full object-cover transition-transform duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.02]"
                />
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-2.5 pb-2 pt-8 text-left">
                <span className="block truncate text-[11px] font-medium tracking-wide text-white/85 md:text-xs">
                  {getLabel(item.src)}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  }

  const photos = sized.map((m, index) => ({
    src: m.src,
    width: m.width,
    height: m.height,
    key: `${m.type}-${m.src}-${index}`,
    alt: getLabel(m.src),
    type: m.type,
  }));

  const singleRowMaxHeight = fillHeight
    ? Math.floor(fillHeight * (count <= 4 ? 0.98 : 0.72))
    : targetRowHeight + 80;

  return (
    <div
      ref={rootRef}
      className="flex h-full w-full min-h-0 items-start overflow-hidden"
      data-auto-gallery
      data-gallery-ready="true"
      style={fillHeight ? { maxHeight: fillHeight } : undefined}
    >
      <div
        className="w-full origin-top"
        style={{
          transform: fitScale < 0.999 ? `scale(${fitScale})` : undefined,
        }}
      >
        <RowsPhotoAlbum
          photos={photos}
          targetRowHeight={targetRowHeight}
          spacing={GAP}
          padding={0}
          rowConstraints={{
            maxPhotos: MAX_PHOTOS_PER_ROW,
            minPhotos: 1,
            singleRowMaxHeight,
          }}
          defaultContainerWidth={containerWidth}
          onClick={({ index }) => onOpen(index)}
          render={{
            button: ({ className, ...props }) => (
              <button
                {...props}
                className={[
                  className,
                  "group overflow-hidden rounded-xl bg-zinc-950 ring-1 ring-white/10 transition-[transform,opacity] duration-150 ease-out",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/80",
                  "active:scale-[0.98]",
                  "[@media(hover:hover)_and_(pointer:fine)]:hover:ring-white/20",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            ),
            image: ({ className, ...props }, { photo, index }) =>
              (photo as { type?: string }).type === "video" ? (
                <video
                  src={photo.src}
                  className={[
                    className,
                    "object-cover transition-transform duration-200 ease-out",
                    "[@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.02]",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  playsInline
                  autoPlay
                  muted
                  loop
                  onClick={(e) => {
                    e.stopPropagation();
                    onVideoClick?.(photo.src, e.currentTarget, index);
                  }}
                />
              ) : (
                // eslint-disable-next-line jsx-a11y/alt-text -- alt provided via photo.alt / props
                <img
                  {...props}
                  className={[
                    className,
                    "object-cover transition-transform duration-200 ease-out",
                    "[@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.02]",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
              ),
            extras: (_, { photo }) => (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-2.5 pb-2 pt-8 text-left">
                <span className="block truncate text-[11px] font-medium tracking-wide text-white/85 md:text-xs">
                  {getLabel(photo.src)}
                </span>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
}
