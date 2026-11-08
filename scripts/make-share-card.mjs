// node scripts/make-share-card.mjs <wordmark-cream.svg> [out=public/share-card.png] [ground=#16233B]
// 1200x630: cream wordmark centered on navy, gold hairline frame inset (BB&Co report-cover language).
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
const [src, out = 'public/share-card.png', ground = '#16233B'] = process.argv.slice(2);
const W = 1200, H = 630;
const mark = await sharp(readFileSync(src), { density: 300 }).resize({ width: 820 }).png().toBuffer();
const m = await sharp(mark).metadata();
const frame = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect x="36" y="36" width="${W - 72}" height="${H - 72}" fill="none" stroke="#B98B3E" stroke-width="1.5"/>
</svg>`);
await sharp({ create: { width: W, height: H, channels: 3, background: ground } })
  .composite([{ input: frame }, { input: mark, left: Math.round((W - m.width) / 2), top: Math.round((H - m.height) / 2) }])
  .png({ compressionLevel: 9 }).toFile(out);
console.log('wrote', out);
