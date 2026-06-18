/**
 * Génère des images de couverture pour les ressources via Pollinations.ai.
 * Style : photoréaliste, over-the-shoulder, couleurs Alliance Digitale.
 * Usage : npx dotenv-cli -- node scripts/generate_covers.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '..', 'data', 'ressources');
const publicDir = path.resolve(__dirname, '..', 'public', 'ressources');

function slugifyTitle(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function makePrompt(title, description, module) {
  const base = `Photorealistic professional training cover image, over-the-shoulder view of a person in a modern French PME office in Sarthe, working on a laptop. The screen subtly shows: "${title}". Clean modern workspace, natural light, plants, minimal desk. Person seen from behind, no face visible. Brand color accents: blue #3B97D3 and burnt orange #9E2114. Shallow depth of field, cinematic lighting, editorial photography style, 16:9 aspect ratio, high quality, no text overlay, no logos, no flat vector illustration.`;
  return base;
}

async function generateImage(prompt, outputPath) {
  const encoded = encodeURIComponent(prompt);
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=1280&height=720&nologo=true&seed=${Math.floor(Math.random() * 1000000)}&enhance=true`;

  console.log(`Téléchargement : ${path.basename(outputPath)}...`);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Pollinations error ${res.status}: ${res.statusText}`);
  }

  const buffer = await res.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));
  console.log(`✓ Image sauvegardée : ${outputPath}`);
}

async function main() {
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith('.json'));

  for (const file of files) {
    const jsonPath = path.join(dataDir, file);
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const slug = data.slug;
    const dir = path.join(publicDir, slug);
    fs.mkdirSync(dir, { recursive: true });

    const outputPath = path.join(dir, 'cover.jpg');
    if (fs.existsSync(outputPath)) {
      console.log(`Image déjà existante pour ${slug}, ignorée.`);
      continue;
    }

    try {
      const prompt = makePrompt(data.title, data.description, data.module);
      await generateImage(prompt, outputPath);

      // Met à jour le JSON avec le chemin de la photo
      data.photo = `/ressources/${slug}/cover.jpg`;
      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');

      // Petite pause pour éviter le rate limiting
      await new Promise((resolve) => setTimeout(resolve, 3000));
    } catch (err) {
      console.error(`✗ Erreur pour ${slug}:`, err.message);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
