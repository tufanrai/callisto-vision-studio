/**
 * Builds `public/media/` from the masters in `assets/`.
 *
 *   npm run media           # only what is missing
 *   npm run media -- --force  # rebuild everything
 *
 * `assets/` is 2.8 GB of 4K camera originals and print-resolution artwork. It
 * is the studio's archive, not a web directory — it is read here and never
 * written to. Everything the site serves is derived, so `public/media/` can be
 * deleted and regenerated at any time.
 *
 * What each master becomes:
 *
 *   image  →  .jpg capped at 1600px on the long edge
 *             Next/Image negotiates AVIF/WebP per request, so the job here is
 *             only to stop a 6250px print master being the source of that.
 *
 *   video  →  -loop.mp4 + -loop.webm   8s, silent, ≤720p, for the grid
 *             -poster.jpg              first frame of the loop
 *             -full.mp4                the whole reel, 1080p, with audio
 *
 * The loop is what autoplays; the full reel is only fetched when someone asks
 * for it. Encoding them as separate files is the entire reason the grid can
 * move without costing the page its performance budget.
 */
import { execFile } from "node:child_process";
import { mkdir, readdir, stat, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { images, videos } from "./media.manifest.mjs";

const run = promisify(execFile);
const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "assets");
const OUT = path.join(ROOT, "public", "media");
const force = process.argv.includes("--force");

const LOOP_SECONDS = 8;
const IMAGE_MAX = 1600;

const ff = (args) =>
  run("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], {
    maxBuffer: 1024 * 1024 * 32,
  });

const kb = (n) => `${Math.round(n / 1024).toLocaleString()} KB`;

async function sizeOf(file) {
  try {
    return (await stat(file)).size;
  } catch {
    return 0;
  }
}

/** Skip work already done, unless --force. */
const done = (file) => !force && existsSync(file);

async function buildImage([rel, slug]) {
  const src = path.join(SRC, rel);
  const out = path.join(OUT, "img", `${slug}.jpg`);
  if (done(out)) return { slug, skipped: true, bytes: await sizeOf(out) };

  if (!existsSync(src)) {
    return { slug, error: `master not found: ${rel}` };
  }

  await ff([
    "-i",
    src,
    // Only ever shrink. `force_original_aspect_ratio=decrease` fits the image
    // inside the box, and -1 on either axis would upscale a small master.
    "-vf",
    `scale=${IMAGE_MAX}:${IMAGE_MAX}:force_original_aspect_ratio=decrease:flags=lanczos`,
    "-q:v",
    "4",
    "-pix_fmt",
    "yuvj420p",
    out,
  ]);
  return { slug, bytes: await sizeOf(out) };
}

async function buildVideo({ src: rel, slug, at = 0 }) {
  const src = path.join(SRC, rel);
  const dir = path.join(OUT, "video");
  const loopMp4 = path.join(dir, `${slug}-loop.mp4`);
  const loopWebm = path.join(dir, `${slug}-loop.webm`);
  const poster = path.join(dir, `${slug}-poster.jpg`);
  const full = path.join(dir, `${slug}-full.mp4`);

  if (done(loopMp4) && done(loopWebm) && done(poster) && done(full)) {
    return { slug, skipped: true, bytes: await sizeOf(loopMp4) };
  }
  if (!existsSync(src)) return { slug, error: `master not found: ${rel}` };

  /**
   * Fit inside 1280x720 without assuming orientation — a lot of this work is
   * shot vertical for the feed, and a fixed `-2:720` would blow a 1080x1920
   * reel up to 405x720 in a frame meant for landscape.
   */
  const fit = (w, h) =>
    `scale=w=${w}:h=${h}:force_original_aspect_ratio=decrease:flags=lanczos,` +
    // H.264 requires even dimensions; odd ones fail the encode outright.
    `scale=trunc(iw/2)*2:trunc(ih/2)*2`;

  // --- the silent grid loop ---
  const loopArgs = (extra) => [
    "-ss",
    String(at),
    "-t",
    String(LOOP_SECONDS),
    "-i",
    src,
    "-an",
    "-vf",
    `${fit(1280, 720)},fps=24`,
    ...extra,
  ];

  await ff(
    loopArgs([
      "-c:v",
      "libx264",
      "-profile:v",
      "high",
      "-crf",
      "30",
      "-preset",
      "slow",
      // The loop is decoded on first paint in a grid of them, so keyframes
      // stay frequent — seeking back to 0 must not stall.
      "-g",
      "48",
      "-movflags",
      "+faststart",
      loopMp4,
    ]),
  );

  await ff(
    loopArgs([
      "-c:v",
      "libvpx-vp9",
      "-crf",
      "40",
      "-b:v",
      "0",
      "-deadline",
      "good",
      "-cpu-used",
      "2",
      "-row-mt",
      "1",
      loopWebm,
    ]),
  );

  // --- poster: the loop's own first frame, so there is no jump on play ---
  await ff([
    "-ss",
    String(at),
    "-i",
    src,
    "-frames:v",
    "1",
    "-vf",
    fit(1280, 720),
    "-q:v",
    "4",
    poster,
  ]);

  // --- the full reel, with sound ---
  await ff([
    "-i",
    src,
    "-vf",
    fit(1920, 1080),
    "-c:v",
    "libx264",
    "-profile:v",
    "high",
    "-crf",
    "26",
    "-preset",
    "slow",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    "-ac",
    "2",
    "-movflags",
    "+faststart",
    full,
  ]);

  return {
    slug,
    bytes: await sizeOf(loopMp4),
    webm: await sizeOf(loopWebm),
    full: await sizeOf(full),
  };
}

/** Bounded parallelism — ffmpeg already saturates cores on a single encode. */
async function pool(items, worker, limit) {
  const results = [];
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await worker(items[i]);
      }
    }),
  );
  return results;
}

async function main() {
  try {
    await run("ffmpeg", ["-version"]);
  } catch {
    console.error("ffmpeg not found. Install it with `brew install ffmpeg`.");
    process.exit(1);
  }

  if (force && existsSync(OUT)) await rm(OUT, { recursive: true });
  await mkdir(path.join(OUT, "img"), { recursive: true });
  await mkdir(path.join(OUT, "video"), { recursive: true });

  console.log(`\nImages — ${images.length}`);
  const imgResults = await pool(images, buildImage, 4);
  for (const r of imgResults) {
    if (r.error) console.log(`  !! ${r.slug}: ${r.error}`);
    else console.log(`  ${r.skipped ? "·" : "+"} ${r.slug.padEnd(28)} ${kb(r.bytes)}`);
  }

  console.log(`\nVideos — ${videos.length}`);
  const vidResults = await pool(videos, buildVideo, 2);
  for (const r of vidResults) {
    if (r.error) console.log(`  !! ${r.slug}: ${r.error}`);
    else if (r.skipped) console.log(`  · ${r.slug.padEnd(28)} ${kb(r.bytes)}`);
    else
      console.log(
        `  + ${r.slug.padEnd(28)} loop ${kb(r.bytes)} / webm ${kb(r.webm)} / full ${kb(r.full)}`,
      );
  }

  const errors = [...imgResults, ...vidResults].filter((r) => r.error);

  let total = 0;
  for (const sub of ["img", "video"]) {
    for (const f of await readdir(path.join(OUT, sub))) {
      total += await sizeOf(path.join(OUT, sub, f));
    }
  }
  console.log(`\npublic/media total: ${(total / 1024 / 1024).toFixed(1)} MB`);

  if (errors.length) {
    console.error(`\n${errors.length} master(s) missing — see !! above.\n`);
    process.exit(1);
  }
}

await main();
