// node scripts/make-icons.mjs <monogram-navy-on-cream.svg>
// Writes public/favicon.svg, favicon-32.png, apple-touch-icon.png (180), icon-192.png, icon-512.png.
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
const src = process.argv[2];
if (!src) { console.error('usage: make-icons.mjs <svg>'); process.exit(2); }
const svg = readFileSync(src);
writeFileSync('public/favicon.svg', svg);
for (const [name, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await sharp(svg, { density: 72 * Math.ceil(size / 64) }).resize(size, size).png({ compressionLevel: 9 }).toFile(`public/${name}`);
  console.log('wrote', name);
}
