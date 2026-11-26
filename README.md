# NusaData — Statistik Nasional Indonesia

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/arrafi97/makefun-national-stats-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/arrafi97/makefun-national-stats-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Entry for the make.fun bounty [Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539): an original, offline national statistics site for Indonesia, built with plain JavaScript and hand-drawn SVG charts — no libraries, no network.

NusaData presents Indonesia's official figures for 2020–2024 — population, GDP, inflation, poverty, inequality, employment, and all 38 provinces — each figure shown with its source and year. Visitors pick a year (2020–2024) and the whole site follows: KPI cards, charts, and tables. Every control works: hash-routed pages (Beranda, Ekonomi, Demografi, Sosial, Ketenagakerjaan, Wilayah, Tentang), sortable and searchable province tables, a province detail panel, and a year selector. All charts are SVG computed from the site's own data files.

## Run

Serve `app/` and open it in a desktop browser:

    node serve.ts

or open `app/index.html` from any static server. No build step, no network requests.

## Screenshots

`?shot=beranda|ekonomi|demografi|ponsel` stages one deterministic view of the real site (see `shots.json`).

## Hand in

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to `$MAKEFUN_OUTPUT_DIR` (default `/output`) and writes `dossier.json` with the vendored make.fun library:

    mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

## Sources

Every figure is from an official release: BPS (Berita Resmi Statistik, Sakernas, Proyeksi Penduduk Interim, IPM 2024), the Ministry of Finance, Bank Indonesia, and Ditjen Dukcapil Kemendagri. The full source list is on the site's Tentang page. NusaData is an independent presentation of official data, not an official BPS site.
