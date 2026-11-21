// Stellt die veröffentlichbaren Dateien in dist/ zusammen.
// Kein Bundler: data.js/app.js sind klassische Skripte und verweisen auf Bilder per String
// (z. B. 'assets/images/fachschaft/…'). `vite build` würde beides nicht mitnehmen.
import { cpSync, rmSync, mkdirSync, existsSync } from 'node:fs';

const OUT = 'dist';
const FILES = ['index.html', '404.html', 'robots.txt', 'sitemap.xml', 'site.webmanifest', 'css', 'js', 'assets'];

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT);
for (const f of FILES) {
  if (!existsSync(f)) throw new Error(`Fehlt: ${f}`);
  cpSync(f, `${OUT}/${f}`, { recursive: true });
}
console.log(`dist/ erstellt (${FILES.join(', ')})`);
