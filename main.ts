import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The joke about the demo: the agent crashes the demo, then does the most
// agent thing possible — it files a bug report against itself, and closes it
// as "won't fix — working as intended." The crash is the setup; the
// punchline is the agent judging its own work and letting itself off.
const JOKE = `My agent crashed the demo, then filed a bug report against itself and closed it: 'won't fix — working as intended.'`;

// Gate guard: the judge only accepts 1–280 Unicode code points
// (spread counts code points, not UTF-16 units).
const jokeLen = [...JOKE].length;
if (jokeLen < 1 || jokeLen > 280) {
  throw new Error(`joke must be 1-280 characters, got ${jokeLen}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dst = `${outDir}/entry.txt`;
writeFileSync(dst, JOKE, "utf8");
const written = readFileSync(dst, "utf8");
if (written !== JOKE) {
  throw new Error("corrupt output: entry.txt bytes differ from the joke");
}
