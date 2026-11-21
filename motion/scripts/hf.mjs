#!/usr/bin/env node
// Runs the project-pinned HyperFrames CLI with the project-local FFmpeg/FFprobe binaries,
// so nothing needs to be installed system-wide. Usage: node scripts/hf.mjs <command> [args…]
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
export const PROJECT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..");

export function hfEnv() {
  return {
    ...process.env,
    HYPERFRAMES_FFMPEG_PATH: process.env.HYPERFRAMES_FFMPEG_PATH || require("ffmpeg-static"),
    HYPERFRAMES_FFPROBE_PATH: process.env.HYPERFRAMES_FFPROBE_PATH || require("@ffprobe-installer/ffprobe").path,
    // Usage telemetry is off unless you opt in (HYPERFRAMES_NO_TELEMETRY=0).
    HYPERFRAMES_NO_TELEMETRY: process.env.HYPERFRAMES_NO_TELEMETRY ?? "1",
  };
}

/** Runs `hyperframes <args>` in the project directory; exits the process on failure. */
export function hf(args) {
  const bin = join(PROJECT_DIR, "node_modules", ".bin", "hyperframes");
  const result = spawnSync(bin, args, { cwd: PROJECT_DIR, env: hfEnv(), stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  hf(process.argv.slice(2));
}
