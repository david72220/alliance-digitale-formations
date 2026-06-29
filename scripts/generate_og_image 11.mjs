import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const OUT_DIR = fileURLToPath(new URL('../public/', import.meta.url));

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#070d18"/>
      <stop offset="100%" stop-color="#0B1120"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.6">
      <stop offset="0%" stop-color="#3b97d3" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#3b97d3" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.1" cy="0.95" r="0.5">
      <stop offset="0%" stop-color="#9E2114" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#9E2114" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <rect x="60" y="60" width="1080" height="510" rx="24" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>

  <g transform="translate(90, 110)">
    <rect x="0" y="0" width="220" height="36" rx="18" fill="#9E2114" fill-opacity="0.12" stroke="#9E2114" stroke-opacity="0.4"/>
    <text x="20" y="24" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="700" fill="#9E2114" letter-spacing="1.5">AI ACT · AOÛT 2026</text>
  </g>

  <g transform="translate(90, 200)">
    <text font-family="Playfair Display, Georgia, serif" font-size="68" font-weight="700" fill="#ffffff">
      <tspan x="0" y="0">L'IA au service</tspan>
      <tspan x="0" y="84">de votre PME,</tspan>
      <tspan x="0" y="168" fill="#3b97d3">sans complexité technique</tspan>
    </text>
  </g>

  <g transform="translate(90, 530)">
    <text font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="600" fill="#ffffff">Alliance Digitale</text>
    <text font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="400" fill="#ffffff" fill-opacity="0.6" y="28">Accompagnement IA · Formations · Sarthe</text>
  </g>

  <g transform="translate(1020, 520)">
    <circle cx="40" cy="40" r="40" fill="#3b97d3" fill-opacity="0.15" stroke="#3b97d3" stroke-opacity="0.5"/>
    <text x="40" y="50" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="32" font-weight="800" fill="#3b97d3">AD</text>
  </g>
</svg>`;

const png = await sharp(Buffer.from(svg)).png({ quality: 95, compressionLevel: 9 }).toBuffer();
const webp = await sharp(Buffer.from(svg)).webp({ quality: 90, effort: 6 }).toBuffer();
const { writeFile } = await import('node:fs/promises');
await writeFile(join(OUT_DIR, 'og-image.png'), png);
await writeFile(join(OUT_DIR, 'og-image.webp'), webp);
console.log(`PNG: ${(png.length/1024).toFixed(1)} KB`);
console.log(`WebP: ${(webp.length/1024).toFixed(1)} KB`);
