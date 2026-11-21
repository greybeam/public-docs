# How Greybeam works (docs video)

[HyperFrames](https://github.com/heygen-com/hyperframes) (Apache-2.0) source for `videos/how-greybeam-works.mp4` and `images/how-greybeam-works-poster.png`.

Render both (Node 22+, needs network for fonts): `cd motion && npm install && npm run render`

`npm run render` runs `hyperframes check`, renders the 22 s loop (H.264, muted, 1920×1080, 30 fps), fails if the file reaches 4 MB, and writes the poster from frame 157.

- Preview and edit in the browser: `npm run dev`. Lint, layout and contrast gate: `npm run check`.
- `index.html` mounts two scenes: `compositions/diagram.html` (cards, wires, query chips, routing-code log) and `compositions/titles.html` (step titles). The story timing (which query goes where, frame by frame at 30 fps) is the `QUERIES` table in `diagram.html`; shared easing helpers are in `lib/anim.js`.
- FFmpeg and FFprobe come from npm (`ffmpeg-static`, `@ffprobe-installer/ffprobe`); `scripts/hf.mjs` points HyperFrames at them, so nothing is installed system-wide. Set `HYPERFRAMES_FFMPEG_PATH` to use your own build.
- HyperFrames usage telemetry is off by default in these scripts; set `HYPERFRAMES_NO_TELEMETRY=0` to opt in.
- Satoshi is loaded from the Fontshare CDN at render time (its license forbids committing the font files). TASA Orbiter, Geist Mono and Inter (Satoshi fallback) come from Google Fonts.
