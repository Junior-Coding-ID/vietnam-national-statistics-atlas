// VIETPULSE entry program (Node 22+, standard library only).
//
// Hands the site in: copies this repository's app/ and screenshots/ into
// the output directory and writes /output/dossier.json with buildDossier
// from the vendored make.fun library (vendor/makefun-frontend.ts, unchanged).
// The program writes ONLY to the output directory (MAKEFUN_OUTPUT_DIR, or
// MAKEFUN_OUTPUT, or /output); it never writes to the repository or cwd.
// Run outside the grader with:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

// The repository root is the directory holding this file, resolved from the
// module URL — never from process.cwd(), so the program works from any cwd.
const repoRoot = fileURLToPath(new URL(".", import.meta.url));
const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.MAKEFUN_OUTPUT ?? "/output";

// Start from a clean output directory so a second run writes byte-identical
// bytes to the first (the grader runs the program twice and compares).
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

// The site: plain static files under app/.
cpSync(join(repoRoot, "app"), join(outDir, "app"), { recursive: true });

// The screenshots: real renders of the site, first by name is the cover.
mkdirSync(join(outDir, "screenshots"), { recursive: true });
if (existsSync(join(repoRoot, "screenshots"))) {
  cpSync(join(repoRoot, "screenshots"), join(outDir, "screenshots"), { recursive: true });
}

// The dossier: the judge's view of the entry (screenshots, first-load
// files and bytes, and the site's source), exactly as the vendored library
// writes it. The caps match the scorer's: at most 4 screenshots of at most
// 256 KiB, app/ at most 993 files and 16 MiB, dossier text at most 160 KiB.
writeFileSync(
  join(outDir, "dossier.json"),
  buildDossier(outDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);

console.log("vietpulse: wrote " + outDir + "/dossier.json");
