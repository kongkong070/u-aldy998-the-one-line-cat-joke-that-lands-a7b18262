// The One-Line Cat Joke That Lands
// u-aldy998-the-one-line-cat-joke-that-lands-a7b18262
//
// Writes a single one-line cat joke to /output/entry.txt.
// Gate (RULES.txt): UTF-8 text, 1-200 characters, not only whitespace.
// Judge brief: setup + turn that lands, laugh on first read, surprise /
// fresh angle, no padding, no explanation after the punchline.
//
// The joke: a cat treating the sofa as his property and objecting to the
// human using it for its actual purpose. Setup = formal complaint about
// the new sofa; turn = the offence is that the human bought it for sitting.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const JOKE =
  "My cat filed a formal complaint about the new sofa — apparently I bought it for sitting, and he finds that deeply offensive.";

export function validate(text: string): void {
  if (typeof text !== "string") throw new Error("entry must be a string");
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) throw new Error("entry must not be only whitespace");
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (!/cat/i.test(text)) throw new Error("entry must be a joke about cats");
}

export function main(): void {
  validate(JOKE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  // Never rmSync the output dir itself: the grader bind-mounts it.
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, JOKE, "utf8");
  // Post-write guard: what landed on disk must be byte-identical to JOKE.
  // No trailing newline: the entry is exactly one line, nothing else.
  if (readFileSync(target, "utf8") !== JOKE) {
    throw new Error("entry.txt on disk does not match JOKE");
  }
}

main();
