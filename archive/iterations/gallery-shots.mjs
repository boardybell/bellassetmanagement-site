// node scripts/gallery-shots.mjs
// Builds gallery imagery from the QA run's full-page screenshots (taken after fonts load and
// reveals complete): card crops into src/assets/gallery/, full pages into public/gallery/ as WebP.
// Run after `npm run qa` so the screenshots match the current build.
import sharp from 'sharp';
import { existsSync, mkdirSync } from 'node:fs';
mkdirSync('src/assets/gallery', { recursive: true });
mkdirSync('public/gallery', { recursive: true });
for (let i = 1; i <= 11; i++) {
  const n = String(i).padStart(2, '0');
  const dir = `qa-report/shots/iterations_${n}`;
  if (!existsSync(`${dir}/1440.png`)) { console.log(`skip ${n}: no QA screenshots`); continue; }
  // Card crops: top of the page, sized for a 720px card at 2x.
  await sharp(`${dir}/1440.png`).extract({ left: 0, top: 0, width: 1440, height: 900 }).resize({ width: 1440 }).png({ compressionLevel: 9, palette: false }).toFile(`src/assets/gallery/${n}-desktop.png`);
  const m = await sharp(`${dir}/390.png`).metadata();
  await sharp(`${dir}/390.png`).extract({ left: 0, top: 0, width: 390, height: Math.min(m.height, 844) }).png({ compressionLevel: 9 }).toFile(`src/assets/gallery/${n}-mobile.png`);
  // Full pages for the "full page" links.
  await sharp(`${dir}/1440.png`).webp({ quality: 70 }).toFile(`public/gallery/${n}-desktop-full.webp`);
  await sharp(`${dir}/390.png`).webp({ quality: 75 }).toFile(`public/gallery/${n}-mobile-full.webp`);
  console.log(`gallery ${n}`);
}
