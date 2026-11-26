# VIETPULSE — Viet Nam National Statistics Atlas, 2025 Annual Edition

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![make.fun rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Junior-Coding-ID/vietnam-national-statistics-atlas/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![make.fun reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Junior-Coding-ID/vietnam-national-statistics-atlas/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Entry for the [best-national-statistics-site-20261126-0539](https://make.fun/bounty/best-national-statistics-site-20261126-0539) bounty on make.fun: a fully static, offline national statistics site for Viet Nam — the 2025 Annual Edition.

## What it is

VIETPULSE is a 5-page statistics atlas (Overview, Economy, Regions, People, Sources) built from real National Statistics Office of Viet Nam (NSO) figures, with a World Bank series toggle:

- **6 KPI cards** — GDP $514.0 bn, +8.02% growth, $5,026 per capita, 102.3 m population, exports $475.04 bn, CPI 3.31%, plus the NSO unemployment strip (2.22%).
- **8 visualisations (V1–V8)** — growth, CPI, GDP, trade, regions, demographics and more, all hand-drawn inline SVG.
- **34-province cartogram map** with a full province table and a reconciliation banner (registration total 113,572,156 vs NSO resident population 102.3 m).
- **Fully offline** — no CDN, no external fonts, no network requests; all charts and the map are inline SVG, data lives in a local `data.js`.

## Run

```sh
node main.ts
```

`main.ts` (Node only) copies the static app into the output directory and builds the submission dossier. Serve locally with `serve.ts` or any static server and open `index.html`.
