/**
 * Test rapide de connexion à Notion.
 * Usage : node scripts/test_notion.mjs
 */
import { Client } from '@notionhq/client';

const token = process.env.NOTION_TOKEN;
const dbId = process.env.NOTION_FORMATIONS_DB_ID;

if (!token || !dbId) {
  console.error('Usage : NOTION_TOKEN=xxx NOTION_FORMATIONS_DB_ID=xxx node scripts/test_notion.mjs');
  process.exit(1);
}

const notion = new Client({ auth: token });

try {
  const db = await notion.databases.retrieve({ database_id: dbId });
  console.log('✅ Connexion OK — base :', db.title?.[0]?.plain_text || 'Sans titre');
} catch (err) {
  console.error('❌ Erreur :', err.message);
  process.exit(1);
}
