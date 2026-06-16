/**
 * Télécharge les fichiers d'une ressource Notion et génère le data.json + resources.json.
 * Usage : node scripts/download_resource.mjs PAGE_ID SLUG
 */
import { Client } from '@notionhq/client';
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const TOKEN = process.env.NOTION_TOKEN;
const PAGE_ID = process.argv[2];
const SLUG = process.argv[3];

if (!TOKEN || !PAGE_ID || !SLUG) {
  console.error('Usage : NOTION_TOKEN=... node scripts/download_resource.mjs PAGE_ID SLUG');
  process.exit(1);
}

const notion = new Client({ auth: TOKEN });

function getText(prop) {
  if (!prop) return '';
  if (prop.title) return prop.title.map((t) => t.plain_text).join('');
  if (prop.rich_text) return prop.rich_text.map((t) => t.plain_text).join('');
  return '';
}

function getSelect(prop) {
  return prop?.select?.name || '';
}

function getCheckbox(prop) {
  return prop?.checkbox === true;
}

function getFileUrl(prop) {
  if (!prop?.files?.length) return '';
  const f = prop.files[0];
  return f.external?.url || f.file?.url || '';
}

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      })
      .on('error', reject);
  });
}

async function main() {
  const page = await notion.pages.retrieve({ page_id: PAGE_ID });
  const p = page.properties;
  const title = getText(p.Titre);
  const slug = getText(p.Slug) || SLUG;
  const module = getSelect(p.Module);
  const description = getText(p.Description);
  const published = getCheckbox(p.Publié);

  if (!published) {
    console.error('La ressource n\'est pas publiée dans Notion. Arrêt.');
    process.exit(0);
  }

  const resourceUrl = getFileUrl(p.ressource);
  const exerciceUrl = getFileUrl(p.Exercice);
  const solutionUrl = getFileUrl(p['Solution exercice']);

  const dir = path.join(ROOT, 'public/ressources', slug);
  fs.mkdirSync(dir, { recursive: true });

  await downloadFile(resourceUrl, path.join(dir, 'cours.md'));
  await downloadFile(exerciceUrl, path.join(dir, 'exercice.md'));
  await downloadFile(solutionUrl, path.join(dir, 'solution.pdf'));

  const coursMd = fs.readFileSync(path.join(dir, 'cours.md'), 'utf-8');
  const exerciceMd = fs.readFileSync(path.join(dir, 'exercice.md'), 'utf-8');

  const dataJson = {
    title,
    slug,
    module,
    description,
    contentHtml: marked.parse(coursMd, { gfm: true }),
    exerciseHtml: marked.parse(exerciceMd, { gfm: true }),
    solutionUrl: `/ressources/${slug}/solution.pdf`,
    published,
  };
  fs.writeFileSync(path.join(dir, 'data.json'), JSON.stringify(dataJson, null, 2), 'utf-8');

  // Mise à jour de resources.json
  const resourcesPath = path.join(ROOT, 'public/ressources/resources.json');
  let resources = [];
  if (fs.existsSync(resourcesPath)) {
    resources = JSON.parse(fs.readFileSync(resourcesPath, 'utf-8'));
  }
  const existingIndex = resources.findIndex((r) => r.slug === slug);
  const resourceEntry = { title, slug, module, description };
  if (existingIndex >= 0) {
    resources[existingIndex] = resourceEntry;
  } else {
    resources.push(resourceEntry);
  }
  fs.writeFileSync(resourcesPath, JSON.stringify(resources, null, 2), 'utf-8');

  console.log(`Ressource ${slug} téléchargée et data.json généré.`);
}

main().catch((err) => {
  console.error('Erreur :', err);
  process.exit(1);
});
