/**
 * Synchronise la base Notion "Zones d'intervention" avec data/zones/stats.json
 * (stats PME réelles) + les métadonnées de pilotage ci-dessous. Sert de tableau de bord :
 * cocher "Publié" dans Notion n'active PAS la page (le contenu éditorial vit dans
 * src/data/zones.ts, contrôle qualité oblige), mais permet de suivre l'état du cluster.
 *
 * Usage : npx dotenv-cli -- node scripts/sync_zones_db.mjs
 */
import { Client } from '@notionhq/client';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKEN = process.env.NOTION_TOKEN;
const DB_ID = process.env.NOTION_ZONES_DB_ID;
const SITE_URL = process.env.SITE_URL || 'https://www.alliance-digitale.fr';

if (!TOKEN || !DB_ID) {
  console.error('ERREUR : NOTION_TOKEN et NOTION_ZONES_DB_ID requis dans .env');
  process.exit(1);
}

// Métadonnées de pilotage — doit rester cohérent avec src/data/zones.ts (slug, tier, étude de cas)
const META = [
  { slug: 'le-mans', tier: 'Tier 1 — Sarthe', etudeCas: 'comptes-rendus-pme-industrielle' },
  { slug: 'sable-sur-sarthe', tier: 'Tier 1 — Sarthe', etudeCas: '' },
  { slug: 'la-ferte-bernard', tier: 'Tier 1 — Sarthe', etudeCas: '' },
  { slug: 'la-fleche', tier: 'Tier 1 — Sarthe', etudeCas: '' },
  { slug: 'mamers', tier: 'Tier 1 — Sarthe', etudeCas: '' },
  { slug: 'chateau-du-loir', tier: 'Tier 1 — Sarthe', etudeCas: '' },
  { slug: 'laval', tier: 'Tier 2 — limitrophe fort', etudeCas: '' },
  { slug: 'alencon', tier: 'Tier 2 — limitrophe fort', etudeCas: '' },
  { slug: 'angers', tier: 'Tier 2 — limitrophe fort', etudeCas: '' },
  { slug: 'tours', tier: 'Tier 2 — limitrophe fort', etudeCas: '' },
  { slug: 'blois', tier: 'Tier 2 — limitrophe fort', etudeCas: '' },
  { slug: 'chartres', tier: 'Tier 2 — limitrophe fort', etudeCas: '' },
];

const notion = new Client({ auth: TOKEN });

async function findExistingPage(slug) {
  const res = await notion.databases.query({
    database_id: DB_ID,
    filter: { property: 'Slug', rich_text: { equals: slug } },
  });
  return res.results[0];
}

async function main() {
  const statsPath = path.join(__dirname, '..', 'data', 'zones', 'stats.json');
  const stats = JSON.parse(await fs.readFile(statsPath, 'utf-8'));

  for (const s of stats) {
    const meta = META.find((m) => m.slug === s.slug);
    if (!meta) continue;

    const properties = {
      Ville: { title: [{ text: { content: s.nomUsage } }] },
      Slug: { rich_text: [{ text: { content: s.slug } }] },
      Département: { rich_text: [{ text: { content: s.departement } }] },
      Tier: { select: { name: meta.tier } },
      Publié: { checkbox: true },
      'Nb PME (3-49 sal.)': { number: s.totalPME3a49 },
      'Nb entreprises actives': { number: s.totalEntreprisesActives },
      'Secteur dominant': { rich_text: [{ text: { content: s.topSecteurs[0]?.libelle || '' } }] },
      'Étude de cas associée': { rich_text: [{ text: { content: meta.etudeCas } }] },
      'URL page': { url: `${SITE_URL}/zones/${s.slug}/` },
      'Dernier rafraîchissement data': { date: { start: s.calculeLe } },
    };

    const existing = await findExistingPage(s.slug);
    if (existing) {
      await notion.pages.update({ page_id: existing.id, properties });
      console.log(`↻ mis à jour : ${s.nomUsage}`);
    } else {
      await notion.pages.create({ parent: { database_id: DB_ID }, properties });
      console.log(`+ créé : ${s.nomUsage}`);
    }
  }
  console.log('\n✅ Synchronisation terminée.');
}

main().catch((err) => {
  console.error('Erreur :', err.message);
  process.exit(1);
});
