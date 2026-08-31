/**
 * Crée la base Notion "Zones d'intervention Alliance Digitale" — tableau de pilotage
 * des pages SEO locales /zones/[slug]/. Le contenu éditorial des pages reste dans
 * src/data/zones.ts (contrôle qualité fin nécessaire, cf. spec seo-local) ; cette base
 * sert à suivre l'état de publication, les stats PME et le prochain rafraîchissement.
 *
 * Usage : npx dotenv-cli -- node scripts/create_zones_db.mjs
 */
import { Client } from '@notionhq/client';

const TOKEN = process.env.NOTION_TOKEN;
const PAGE_ID = '3ac9628038de80a8a500fa48eba5be8a'; // Page "Alliance Digitale" (racine workspace, partagée à l'intégration)

if (!TOKEN) {
  console.error("ERREUR : définissez la variable d'environnement NOTION_TOKEN");
  process.exit(1);
}

const notion = new Client({ auth: TOKEN });

async function main() {
  console.log("Création de la base 'Zones d'intervention Alliance Digitale'...");
  const db = await notion.databases.create({
    parent: { type: 'page_id', page_id: PAGE_ID },
    title: [{ type: 'text', text: { content: "Zones d'intervention Alliance Digitale" } }],
    properties: {
      Ville: { title: {} },
      Slug: { rich_text: {} },
      Département: { rich_text: {} },
      Tier: {
        select: {
          options: [
            { name: 'Tier 1 — Sarthe', color: 'red' },
            { name: 'Tier 2 — limitrophe fort', color: 'blue' },
            { name: 'Tier 3 — complément', color: 'gray' },
          ],
        },
      },
      Publié: { checkbox: {} },
      'Nb PME (3-49 sal.)': { number: { format: 'number' } },
      'Nb entreprises actives': { number: { format: 'number' } },
      'Secteur dominant': { rich_text: {} },
      'Étude de cas associée': { rich_text: {} },
      'URL page': { url: {} },
      'Dernier rafraîchissement data': { date: {} },
    },
  });
  console.log(`\nID de la base : ${db.id}`);
  console.log('\nAjoutez cette ligne dans votre .env :');
  console.log(`NOTION_ZONES_DB_ID=${db.id}`);
}

main().catch((err) => {
  console.error('Erreur :', err.message);
  process.exit(1);
});
