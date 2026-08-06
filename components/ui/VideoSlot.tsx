"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Dot } from "./Eyebrow";

/**
 * A framed piece of video work.
 *
 * Two files back every slot. The grid shows an 8-second silent loop — small
 * enough that a page of them still behaves — and the full reel with sound is
 * only fetched when someone asks for it, in a dialog.
 *
 * Four things make the loop cheap enough to autoplay:
 *
 *  - The still underneath is a Next <Image>, NOT the video's `poster`
 *    attribute. A `poster` is fetched eagerly whatever `preload` says, and it
 *    is fetched raw — twelve frames of it put 5s on this page's LCP. Routed
 *    through the image pipeline the same frames are responsive, lazy and
 *    AVIF, and the video simply fades over the top once it is playing.
 *  - `preload="none"` plus an IntersectionObserver, so no video byte is
 *    requested until the frame is near the viewport.
 *  - It pauses again once scrolled away. A dozen off-screen loops decoding
 *    forever is a battery cost with nothing on screen to show for it.
 *  - `prefers-reduced-motion` skips the video entirely and keeps the still.
 *    Autoplaying motion is exactly what that preference is about.
 *
 * `muted` and `playsInline` are load-bearing, not decoration: without both,
 * mobile Safari and Chrome refuse the autoplay outright.
 */
export function VideoSlot({
  slug,
  title,
  poster,
  className,
  sizes = "(max-width: 900px) 100vw, 33vw",
  priority = false,
}: {
  /** Basename under /media/video — see scripts/media.manifest.mjs. */
  slug: string;
  /** Names the work, for the play control and the dialog. */
  title: string;
  /** Override the derived still. */
  poster?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const posterSrc = poster ?? `/media/video/${slug}-poster.jpg`;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    if (!("IntersectionObserver" in window)) {
      el.play().catch(() => {});
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Lift the hint, but do NOT call load(). Source selection has
          // already run; load() restarts it and aborts whatever fetch is in
          // flight, which surfaces as ERR_ABORTED on the .webm in devtools.
          // play() alone is enough to start the download.
          el.preload = "auto";
          // A rejected play() is normal — a background tab, or a browser that
          // declines autoplay. The still stays up and nothing breaks.
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The dialog owns the full reel: opening plays it, closing stops the audio.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <Image
        src={posterSrc}
        alt={title}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className ?? ""}`}
      />

      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        /* Latched, never cleared. Scrolling away pauses the loop, and
           dropping back to the still there would snap the frame to the start
           of the clip and flash on the way back in. */
        onPlaying={() => setPlaying(true)}
        aria-hidden="true"
        className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
          playing ? "opacity-100" : "opacity-0"
        } ${className ?? ""}`}
      >
        <source src={`/media/video/${slug}-loop.webm`} type="video/webm" />
        <source src={`/media/video/${slug}-loop.mp4`} type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="label-tight absolute right-3.5 bottom-3.5 z-2 inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-ink-deep/82 px-4 py-2.5 text-[0.625rem] text-snow backdrop-blur-sm transition-colors hover:bg-doe hover:text-ink-deep"
      >
        <span aria-hidden="true">&#9654;</span>
        Play reel
        <span className="sr-only">— {title}, with sound</span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          // Clicking the backdrop resolves to the dialog itself, never a child.
          if (e.target === dialogRef.current) setOpen(false);
        }}
        aria-label={title}
        className="m-auto w-[min(64rem,92vw)] bg-transparent p-0 backdrop:bg-ink-deep/88 backdrop:backdrop-blur-sm"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <p className="label-tight text-snow">{title}</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="label-tight inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-edge-dark px-4 py-2.5 text-snow transition-colors hover:border-doe"
            >
              Close
              <Dot />
            </button>
          </div>
          {/*
            Mounted only while open, so the reel is never fetched — and its
            audio never survives — outside the dialog.
          */}
          {open ? (
            <video
              src={`/media/video/${slug}-full.mp4`}
              poster={posterSrc}
              controls
              autoPlay
              playsInline
              className="w-full bg-ink-deep"
            />
          ) : null}
        </div>
      </dialog>
    </>
  );
}
