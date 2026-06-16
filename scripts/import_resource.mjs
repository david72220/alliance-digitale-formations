/**
 * Importe une ressource complète dans la base Notion Ressources.
 * Génère 3 fichiers : cours.md, exercice.md, solution.md → solution.pdf
 * Usage : npm run import:resource -- data/ressources/rgpd-pme-10-points-controle.json
 */
import { Client } from '@notionhq/client';
import fs from 'node:fs';
import path from 'node:path';
import { mdToPdf } from 'md-to-pdf';
import { marked } from 'marked';

const TOKEN = process.env.NOTION_TOKEN;
const DB_ID = process.env.NOTION_RESOURCES_DB_ID;
const SITE_URL = process.env.SITE_URL || 'https://alliance-digitale-formations.vercel.app';

if (!TOKEN || !DB_ID) {
  console.error('ERREUR : définissez NOTION_TOKEN et NOTION_RESOURCES_DB_ID');
  process.exit(1);
}

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage : npm run import:resource -- data/ressources/nom-du-cours.json');
  process.exit(1);
}

const notion = new Client({ auth: TOKEN });

function parseMd(text) {
  return marked.parse(text, { gfm: true });
}

async function main() {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const slug = data.slug;
  const dir = path.resolve('public/ressources', slug);

  fs.mkdirSync(dir, { recursive: true });

  const coursPath = path.join(dir, 'cours.md');
  const exercicePath = path.join(dir, 'exercice.md');
  const solutionMdPath = path.join(dir, 'solution.md');
  const solutionPdfPath = path.join(dir, 'solution.pdf');
  const dataJsonPath = path.join(dir, 'data.json');

  fs.writeFileSync(coursPath, data.content, 'utf-8');
  fs.writeFileSync(exercicePath, data.exercice || exerciceParDefaut(data.title), 'utf-8');
  fs.writeFileSync(solutionMdPath, data.solution || solutionParDefaut(data.title), 'utf-8');

  await mdToPdf({ path: solutionMdPath }, { dest: solutionPdfPath });
  console.log(`PDF solution généré : ${solutionPdfPath}`);

  const resourceUrl = `${SITE_URL}/ressources/${slug}/cours.md`;
  const exerciceUrl = `${SITE_URL}/ressources/${slug}/exercice.md`;
  const solutionUrl = `${SITE_URL}/ressources/${slug}/solution.pdf`;

  // Génère le data.json pour Astro
  const resourceData = {
    title: data.title,
    slug,
    module: data.module || 'Autres',
    description: data.description,
    contentHtml: parseMd(fs.readFileSync(coursPath, 'utf-8')),
    exerciseHtml: parseMd(fs.readFileSync(exercicePath, 'utf-8')),
    solutionUrl,
    published: data.published ?? false,
    photo: data.photo || null,
  };
  fs.writeFileSync(dataJsonPath, JSON.stringify(resourceData, null, 2), 'utf-8');
  console.log(`Data JSON généré : ${dataJsonPath}`);

  // Construit la liste des fichiers Notion
  const notionFiles = [];
  if (data.photo) {
    notionFiles.push({ name: 'photo.jpg', type: 'external', external: { url: data.photo } });
  }

  // Créer la page dans Notion
  const page = await notion.pages.create({
    parent: { database_id: DB_ID },
    properties: {
      Titre: { title: [{ type: 'text', text: { content: data.title } }] },
      Slug: { rich_text: [{ type: 'text', text: { content: slug } }] },
      Description: { rich_text: [{ type: 'text', text: { content: data.description } }] },
      Module: { select: { name: data.module || 'Autres' } },
      Publié: { checkbox: data.published ?? false },
      ressource: {
        files: [{ name: 'cours.md', type: 'external', external: { url: resourceUrl } }],
      },
      Exercice: {
        files: [{ name: 'exercice.md', type: 'external', external: { url: exerciceUrl } }],
      },
      'Solution exercice': {
        files: [{ name: 'solution.pdf', type: 'external', external: { url: solutionUrl } }],
      },
      ...(notionFiles.length > 0 ? { photo: { files: notionFiles } } : {}),
    },
  });

  console.log(`Page Notion créée : ${page.id}`);
  console.log(`URL : https://www.notion.so/${page.id.replace(/-/g, '')}`);
}

function exerciceParDefaut(title) {
  return `# Exercice — ${title}\n\n## Consigne\n\nRéalisez un inventaire rapide des 3 outils de votre entreprise qui contiennent des données personnelles.\n\nPour chacun, notez :\n\n1. La finalité du traitement\n2. Les catégories de données stockées\n3. Les personnes qui y ont accès\n4. La durée de conservation actuelle\n\n## Livrable attendu\n\nUn tableau simple (papier, tableur ou Notion) listant ces 3 outils avec les 4 informations ci-dessus.\n\n## Question de réflexion\n\nQuelle est la base légale de chaque traitement ? Consentement, contrat, obligation légale, intérêt légitime ?\n`;
}

function solutionParDefaut(title) {
  return `# Solution de l'exercice — ${title}\n\n## Exemple de tableau\n\n| Outil | Finalité | Données | Accès | Conservation | Base légale |\n|---|---|---|---|---|---|\n| CRM | Suivi commercial | Coordonnées clients, historique | Commercial, dirigeant | 3 ans après dernier contact | Contrat / intérêt légitime |\n| Paie | Gestion salariale | RIB, fiches de paie, contrats | Comptable, RH | 5 ans après départ | Obligation légale |\n| Email professionnel | Communication interne/externe | Échanges, pièces jointes | Employé concerné | Variable selon nature | Contrat / intérêt légitime |\n\n## Points de vigilance\n\n- Un outil sans finalité claire doit être arrêté ou réduit.\n- Les durées de conservation doivent être justifiées.\n- L’accès doit être limité au strict nécessaire (principe de minimisation).\n- Le consentement n’est pas la base légale par défaut : il faut choisir la base la plus adaptée.\n`;
}

main().catch((err) => {
  console.error('Erreur :', err);
  process.exit(1);
});
