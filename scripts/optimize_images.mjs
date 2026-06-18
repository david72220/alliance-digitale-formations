import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import { join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const PUBLIC = fileURLToPath(new URL('../public/', import.meta.url));

const TARGETS = [
  { dir: 'images', maxWidth: 1600, webpQuality: 80, deleteOriginal: false },
  { dir: 'images/case-studies', maxWidth: 1200, webpQuality: 78, deleteOriginal: true },
];

const JPG_RECOMPRESS = [
  { dir: 'ressources', maxWidth: 1200, jpgQuality: 78 },
];

async function recompressJpg(file, cfg) {
  const { ext } = parse(file);
  if (!['.jpg', '.jpeg'].includes(ext.toLowerCase())) return null;
  const before = (await stat(file)).size;
  const buf = await sharp(file)
    .resize({ width: cfg.maxWidth, withoutEnlargement: true })
    .jpeg({ quality: cfg.jpgQuality, mozjpeg: true, progressive: true })
    .toBuffer();
  if (buf.length >= before * 0.95) return { file, before, after: before, skipped: true };
  await (await import('node:fs/promises')).writeFile(file, buf);
  return { file, before, after: buf.length, skipped: false };
}

async function walk(dir) {
  let out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else out.push(full);
  }
  return out;
}

async function optimizeFile(file, cfg) {
  const { name, ext, dir } = parse(file);
  if (!['.png', '.jpg', '.jpeg'].includes(ext.toLowerCase())) return null;
  const before = (await stat(file)).size;
  const webpPath = join(dir, `${name}.webp`);
  const img = sharp(file);
  const meta = await img.metadata();
  const width = meta.width && meta.width > cfg.maxWidth ? cfg.maxWidth : meta.width;
  await img.resize({ width, withoutEnlargement: true }).webp({ quality: cfg.webpQuality, effort: 6 }).toFile(webpPath);
  const after = (await stat(webpPath)).size;
  if (cfg.deleteOriginal) await unlink(file);
  return { file, webpPath, before, after, deleted: cfg.deleteOriginal };
}

async function ogImage() {
  const src = join(PUBLIC, 'og-image.png');
  const out = join(PUBLIC, 'og-image.webp');
  try { await stat(src); } catch { return null; }
  await sharp(src)
    .resize({ width: 1200, height: 630, fit: 'contain', background: { r: 11, g: 26, b: 50, alpha: 1 } })
    .webp({ quality: 85, effort: 6 })
    .toFile(out);
  const before = (await stat(src)).size;
  const after = (await stat(out)).size;
  return { file: src, webpPath: out, before, after };
}

let total = { before: 0, after: 0 };
for (const cfg of TARGETS) {
  const dir = join(PUBLIC, cfg.dir);
  try { await stat(dir); } catch { continue; }
  const files = await walk(dir);
  for (const f of files) {
    const r = await optimizeFile(f, cfg);
    if (!r) continue;
    total.before += r.before;
    total.after += r.after;
    const pct = ((1 - r.after / r.before) * 100).toFixed(1);
    console.log(`${r.deleted ? 'REPL' : 'WEBP'} ${r.file.replace(PUBLIC, '')} → ${(r.before/1024).toFixed(0)}KB → ${(r.after/1024).toFixed(0)}KB (-${pct}%)`);
  }
}

for (const cfg of JPG_RECOMPRESS) {
  const dir = join(PUBLIC, cfg.dir);
  try { await stat(dir); } catch { continue; }
  const files = await walk(dir);
  for (const f of files) {
    const r = await recompressJpg(f, cfg);
    if (!r) continue;
    total.before += r.before;
    total.after += r.after;
    if (r.skipped) {
      console.log(`SKIP ${r.file.replace(PUBLIC, '')} (already small)`);
    } else {
      const pct = ((1 - r.after / r.before) * 100).toFixed(1);
      console.log(`JPG  ${r.file.replace(PUBLIC, '')} → ${(r.before/1024).toFixed(0)}KB → ${(r.after/1024).toFixed(0)}KB (-${pct}%)`);
    }
  }
}

const og = await ogImage();
if (og) {
  total.before += og.before;
  total.after += og.after;
  const pct = ((1 - og.after / og.before) * 100).toFixed(1);
  console.log(`OG   og-image.png → og-image.webp 1200×630 (${(og.after/1024).toFixed(0)}KB, -${pct}%)`);
}

console.log(`\nTotal: ${(total.before/1024/1024).toFixed(2)} MB → ${(total.after/1024/1024).toFixed(2)} MB (gain ${((1 - total.after/total.before)*100).toFixed(1)}%)`);
