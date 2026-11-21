#!/usr/bin/env node
// Renders the docs video and its poster:
//   ../videos/how-greybeam-works.mp4        H.264, muted, 1920×1080, 30 fps, 22 s loop
//   ../images/how-greybeam-works-poster.png  a lossless still at POSTER_SECONDS
import { chmodSync, copyFileSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";
import { PROJECT_DIR, hf } from "./hf.mjs";

const VIDEO = join(PROJECT_DIR, "..", "videos", "how-greybeam-works.mp4");
const POSTER = join(PROJECT_DIR, "..", "images", "how-greybeam-works-poster.png");
// Frame 157: the first query is mid-inspection, so the poster shows the whole diagram at work.
const POSTER_SECONDS = 157 / 30;
// CRF 20 keeps small text crisp and the file well under the 4 MB budget.
const CRF = "20";
const MAX_BYTES = 4 * 1024 * 1024;

hf(["check"]);
hf(["render", "--strict", "--fps", "30", "--crf", CRF, "-o", VIDEO]);

const size = statSync(VIDEO).size;
if (size >= MAX_BYTES) {
  console.error(`Video is ${(size / 1024 / 1024).toFixed(2)} MB; the docs budget is 4 MB. Raise CRF.`);
  process.exit(1);
}

const stills = join(PROJECT_DIR, "out", "poster");
rmSync(stills, { recursive: true, force: true });
mkdirSync(stills, { recursive: true });
hf(["snapshot", "--at", POSTER_SECONDS.toFixed(4), "--no-end", "-o", stills]);
const png = readdirSync(stills).find((f) => f.endsWith(".png") && !f.includes("sheet"));
if (!png) {
  console.error(`No poster still was written to ${stills}.`);
  process.exit(1);
}
copyFileSync(join(stills, png), POSTER);
chmodSync(POSTER, 0o644); // snapshots are written owner-only
console.log(`Wrote ${VIDEO} (${(size / 1024 / 1024).toFixed(2)} MB) and ${POSTER}`);
