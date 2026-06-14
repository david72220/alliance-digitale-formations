/**
 * Crée les bases Notion manquantes pour le site Alliance Digitale.
 * Usage : npm run setup:notion
 */
import { Client } from '@notionhq/client';

const TOKEN = process.env.NOTION_TOKEN;
const PAGE_ID = '37f9628038de80b98601edced25e27f8'; // Page parente Site Alliance Digitale

if (!TOKEN) {
  console.error('ERREUR : définissez la variable d\'environnement NOTION_TOKEN');
  process.exit(1);
}

const notion = new Client({ auth: TOKEN });

async function createCaseStudiesDb() {
  return notion.databases.create({
    parent: { type: 'page_id', page_id: PAGE_ID },
    title: [{ type: 'text', text: { content: 'Études de cas Alliance Digitale' } }],
    properties: {
      Titre: { title: {} },
      Slug: { rich_text: {} },
      Client: { rich_text: {} },
      Anonymisé: { checkbox: {} },
      Secteur: { rich_text: {} },
      Problème: { rich_text: {} },
      Solution: { rich_text: {} },
      'Résultat chiffré': { rich_text: {} },
      Visuel: { url: {} },
      'Vidéo preuve': { url: {} },
      Publié: { checkbox: {} },
    },
  });
}

async function createResourcesDb() {
  return notion.databases.create({
    parent: { type: 'page_id', page_id: PAGE_ID },
    title: [{ type: 'text', text: { content: 'Ressources Alliance Digitale' } }],
    properties: {
      Titre: { title: {} },
      Slug: { rich_text: {} },
      Description: { rich_text: {} },
      Publié: { checkbox: {} },
    },
  });
}

async function main() {
  console.log("Création de la base 'Études de cas Alliance Digitale'...");
  const caseStudies = await createCaseStudiesDb();
  console.log(`ID : ${caseStudies.id}`);

  console.log("Création de la base 'Ressources Alliance Digitale'...");
  const resources = await createResourcesDb();
  console.log(`ID : ${resources.id}`);

  console.log('\nAjoutez ces IDs dans votre fichier .env :');
  console.log(`NOTION_CASE_STUDIES_DB_ID=${caseStudies.id}`);
  console.log(`NOTION_RESOURCES_DB_ID=${resources.id}`);
}

main().catch((err) => {
  console.error('Erreur :', err.message);
  process.exit(1);
});
