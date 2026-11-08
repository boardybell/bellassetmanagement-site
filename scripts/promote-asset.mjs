// node scripts/promote-asset.mjs <reviewed-image> <name> [--aspect 16:9|4:5|4:1|3:2] [--focus x,y] [--width px]
// Landscape heroes default to 2400 wide; portrait plates default to their native crop width (max 1200).
// Takes a reviewed Codex image from assets/inbox, crops to the aspect, resizes (Lanczos) so the long
// edge is at least 2400 px, and writes src/assets/img/<name>.jpg. Astro <Picture> then emits AVIF/WebP/JPEG
// at 640/1024/1600/2400 with intrinsic width/height. (RealESRGAN and 4x-UltraSharp were tested on
// 2026-11-07 and rejected: the first smooths stone into plastic, the second adds a crosshatch.)
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
const [src, name, ...rest] = process.argv.slice(2);
const opt = (k, d) => (rest.includes(k) ? rest[rest.indexOf(k) + 1] : d);
const [aw, ah] = opt('--aspect', '16:9').split(':').map(Number);
const [fx, fy] = opt('--focus', '0.5,0.5').split(',').map(Number);
const img = sharp(src); const { width: W, height: H } = await img.metadata();
let cw = W, ch = Math.round(W * ah / aw);
if (ch > H) { ch = H; cw = Math.round(H * aw / ah); }
const left = Math.round(Math.min(Math.max(fx * W - cw / 2, 0), W - cw));
const top = Math.round(Math.min(Math.max(fy * H - ch / 2, 0), H - ch));
const outW = Number(opt('--width', aw >= ah ? Math.max(2400, cw) : Math.min(cw, 1200)));
mkdirSync('src/assets/img', { recursive: true });
await sharp(src).extract({ left, top, width: cw, height: ch }).resize({ width: outW, kernel: 'lanczos3' })
  .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(`src/assets/img/${name}.jpg`);
const m = await sharp(`src/assets/img/${name}.jpg`).metadata();
console.log(`${name}: ${W}x${H} crop ${cw}x${ch}@${left},${top} -> ${m.width}x${m.height}`);
