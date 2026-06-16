/**
 * Affiche les propriétés d'une base Notion pour vérifier les noms exacts.
 * Usage : npm run notion:diagnose -- 37f96280-38de-814b-be57-ff8dd53fa940
 */
import { Client } from '@notionhq/client';

const TOKEN = process.env.NOTION_TOKEN;
const DB_ID = process.argv[2] || process.env.NOTION_RESOURCES_DB_ID;

if (!TOKEN || !DB_ID) {
  console.error('ERREUR : définissez NOTION_TOKEN et passez un DB_ID en argument');
  process.exit(1);
}

const notion = new Client({ auth: TOKEN });

async function main() {
  const db = await notion.databases.retrieve({ database_id: DB_ID });
  console.log(`Base : ${db.title?.map((t) => t.plain_text).join('') || DB_ID}`);
  console.log('\nPropriétés disponibles :');
  Object.entries(db.properties).forEach(([name, prop]) => {
    console.log(`  - "${name}" (type: ${prop.type})`);
  });
}

main().catch((err) => {
  console.error('Erreur :', err.message);
  process.exit(1);
});
