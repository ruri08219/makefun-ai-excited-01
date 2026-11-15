// ai-excited-01 entry: copies the image to the output directory.
// The image is "Sky Whale" — a colossal humpback whale breaching through
// a sea of clouds above snow-capped peaks at sunrise, its spray turning
// into a flock of glowing golden birds.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const target = join(outDir, "entry.png");

if (!existsSync(source)) {
  throw new Error("entry.png is missing next to main.ts");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Confirm the copy landed whole: the gate rejects a truncated image.
const { size } = statSync(target);
if (size === 0) {
  throw new Error("entry.png was copied as an empty file");
}
console.log(`Wrote ${target} (${size} bytes)`);
