/**
 * Synchronise une ressource Notion avec le site:
 * - Si Publié=true : télécharge fichiers, génère data.json, met à jour resources.json
 * - Si Publié=false : supprime dossier public/ressources/{slug} + entrée resources.json
 *
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
const SLUG_ARG = process.argv[3];

if (!TOKEN || !PAGE_ID || !SLUG_ARG) {
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
function getSelect(prop) { return prop?.select?.name || ''; }
function getCheckbox(prop) { return prop?.checkbox === true; }
function getFileUrl(prop) {
  if (!prop?.files?.length) return '';
  const f = prop.files[0];
  return f.external?.url || f.file?.url || '';
}

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

function readResources(resourcesPath) {
  if (!fs.existsSync(resourcesPath)) return [];
  return JSON.parse(fs.readFileSync(resourcesPath, 'utf-8'));
}

async function unpublish(slug) {
  const dir = path.join(ROOT, 'public/ressources', slug);
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`Dossier supprimé : public/ressources/${slug}`);
  } else {
    console.log(`Pas de dossier à supprimer pour ${slug}.`);
  }
  const resourcesPath = path.join(ROOT, 'public/ressources/resources.json');
  const resources = readResources(resourcesPath);
  const idx = resources.findIndex((r) => r.slug === slug);
  if (idx >= 0) {
    resources.splice(idx, 1);
    fs.writeFileSync(resourcesPath, JSON.stringify(resources, null, 2), 'utf-8');
    console.log(`Entrée supprimée de resources.json : ${slug}`);
  }
  console.log(`Ressource ${slug} dépubliée.`);
}

async function publish(page, slug) {
  const p = page.properties;
  const title = getText(p.Titre);
  const module = getSelect(p.Module);
  const description = getText(p.Description);

  const resourceUrl = getFileUrl(p.ressource);
  const exerciceUrl = getFileUrl(p.Exercice);
  const solutionUrl = getFileUrl(p['Solution exercice']);

  if (!resourceUrl) {
    console.error('Fichier ressource manquant dans Notion. Arrêt.');
    process.exit(1);
  }

  const dir = path.join(ROOT, 'public/ressources', slug);
  fs.mkdirSync(dir, { recursive: true });

  await downloadFile(resourceUrl, path.join(dir, 'cours.md'));
  if (exerciceUrl) await downloadFile(exerciceUrl, path.join(dir, 'exercice.md'));
  if (solutionUrl) await downloadFile(solutionUrl, path.join(dir, 'solution.pdf'));

  const coursMd = fs.readFileSync(path.join(dir, 'cours.md'), 'utf-8');
  const exerciceMd = fs.existsSync(path.join(dir, 'exercice.md'))
    ? fs.readFileSync(path.join(dir, 'exercice.md'), 'utf-8')
    : '';

  const dataJson = {
    title,
    slug,
    module,
    description,
    contentHtml: marked.parse(coursMd, { gfm: true }),
    exerciseHtml: exerciceMd ? marked.parse(exerciceMd, { gfm: true }) : '',
    solutionUrl: solutionUrl ? `/ressources/${slug}/solution.pdf` : '',
    published: true,
  };
  fs.writeFileSync(path.join(dir, 'data.json'), JSON.stringify(dataJson, null, 2), 'utf-8');

  const resourcesPath = path.join(ROOT, 'public/ressources/resources.json');
  const resources = readResources(resourcesPath);
  const existingIndex = resources.findIndex((r) => r.slug === slug);
  const entry = { title, slug, module, description };
  if (existingIndex >= 0) resources[existingIndex] = entry;
  else resources.push(entry);
  fs.writeFileSync(resourcesPath, JSON.stringify(resources, null, 2), 'utf-8');

  console.log(`Ressource ${slug} publiée.`);
}

async function main() {
  const page = await notion.pages.retrieve({ page_id: PAGE_ID });
  const p = page.properties;
  const slug = getText(p.Slug) || SLUG_ARG;
  const published = getCheckbox(p.Publié) || getCheckbox(p.Publie);

  if (!published) {
    await unpublish(slug);
    return;
  }
  await publish(page, slug);
}

main().catch((err) => {
  console.error('Erreur :', err);
  process.exit(1);
});
