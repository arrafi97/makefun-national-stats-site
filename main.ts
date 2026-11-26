// NusaData — program penyerahan entri (Node 22, pustaka standar saja).
// Menyalin app/ dan screenshots/ dari samping berkas ini ke direktori
// keluaran, lalu menulis dossier.json memakai pustaka make.fun yang
// divendorkan tanpa diubah. Di luar grader, MAKEFUN_OUTPUT_DIR menggantikan
// /output:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Dua kali jalan harus menulis byte yang sama persis.
import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
