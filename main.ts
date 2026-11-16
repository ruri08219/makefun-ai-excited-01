// ai-excited-01 entry: "Midnight Phoenix".
// A phoenix of molten gold and stained-glass feathers bursts out of a
// grandfather clock as it strikes midnight — the clock face shattering,
// brass gears and sparks flying, a full moon burning behind the bird.
// The program copies entry.png to the output directory the grader reads.
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

// The gate rejects a truncated image, so confirm the copy landed whole.
const { size } = statSync(target);
if (size === 0) {
  throw new Error("entry.png was copied as an empty file");
}
console.log(`Wrote ${target} (${size} bytes)`);
