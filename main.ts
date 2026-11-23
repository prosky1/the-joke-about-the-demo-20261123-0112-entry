// make.fun entry: "The joke about the demo"
// Writes one short joke (1-280 Unicode code points) to /output/entry.txt.

import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";

const ENTRY_TEXT =
  "Our demo worked perfectly in rehearsal. Then the client arrived, the Wi-Fi died, and the CEO discovered our 'live AI' was just Dave, typing very fast behind a curtain.";

const OUTPUT_PATH = "/output/entry.txt";

// Runtime validation: the sealed gate requires 1-280 Unicode code points,
// and the text must not be only whitespace.
const length = [...ENTRY_TEXT].length;
if (length < 1 || length > 280) {
  throw new Error(`Entry text is ${length} characters; must be 1-280.`);
}
if (ENTRY_TEXT.trim().length === 0) {
  throw new Error("Entry text must not be only whitespace.");
}

mkdirSync("/output", { recursive: true });
if (!existsSync("/output") || !statSync("/output").isDirectory()) {
  throw new Error("Could not create /output directory.");
}
writeFileSync(OUTPUT_PATH, ENTRY_TEXT, "utf8");

// Post-write verification: the file on disk must match the text exactly.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== ENTRY_TEXT) {
  throw new Error("Written entry.txt does not match the entry text.");
}
console.log(`Wrote ${[...ENTRY_TEXT].length} characters to ${OUTPUT_PATH}`);
