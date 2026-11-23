// Entry program for make.fun's "Day one, day seven" TikTok bounty
// (Node 22, standard library only).
//
// The entry itself is the video on TikTok. This program has exactly one job:
// place VIDEO.json — the file at this repository's root that names the
// video's full address — into the output directory, where the grader reads
// it and the house attaches its own reading of the video's counts.
//
// The grader runs the program twice in a sandbox with no network and the two
// runs must write the same bytes, so the program writes that one file and
// nothing else: no timestamps, no logs on success, no state. Outside the
// grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for
// the /bot and /output mounts:
//
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });

const source = join(botDir, 'VIDEO.json');
const target = join(outputDir, 'VIDEO.json');
try {
  copyFileSync(source, target);
} catch (err) {
  console.error(`could not copy VIDEO.json from ${source}: ${(err as Error).message}`);
  process.exit(1);
}

// Read the copy back and make sure it is the JSON object the gate expects:
// a broken VIDEO.json would otherwise surface only as a refused entry.
try {
  const parsed = JSON.parse(readFileSync(target, 'utf8'));
  if (typeof parsed !== 'object' || parsed === null || typeof parsed.url !== 'string') {
    console.error('VIDEO.json in the output is not a JSON object with a url string');
    process.exit(1);
  }
} catch (err) {
  console.error(`VIDEO.json in the output does not parse: ${(err as Error).message}`);
  process.exit(1);
}
