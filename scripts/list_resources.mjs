// List all rows in the Ressources database with Titre + Description
// Usage: node scripts/list_resources.mjs
import 'dotenv/config';
import { Client } from '@notionhq/client';

const dbId = process.env.NOTION_RESOURCES_DB_ID || '37f96280-38de-814b-be57-ff8dd53fa940';
const token = process.env.NOTION_TOKEN;

if (!token) {
  console.error('ERROR: NOTION_TOKEN not set in .env');
  process.exit(1);
}

const notion = new Client({ auth: token });

async function main() {
  const rows = [];
  let cursor;
  do {
    const resp = await notion.databases.query({
      database_id: dbId,
      start_cursor: cursor,
    });
    rows.push(...resp.results);
    cursor = resp.has_more ? resp.next_cursor : undefined;
  } while (cursor);

  console.log(`Found ${rows.length} rows in Ressources database:\n`);
  rows.forEach((row, idx) => {
    const props = row.properties;
    const titre = props['Titre']?.title?.[0]?.plain_text || '(sans titre)';
    const desc = props['Description']?.rich_text?.[0]?.plain_text || '(sans description)';
    const module = props['Module']?.select?.name || '-';
    const publie = props['Publié']?.checkbox ? '✅' : '⬜';
    const hasPhoto = (props['photo']?.files?.length || 0) > 0 ? '📷' : '—';
    console.log(`[${idx}] ${publie} ${hasPhoto} | ${module} | ${titre}`);
    console.log(`     Description: ${desc.slice(0, 120)}${desc.length > 120 ? '…' : ''}`);
    console.log(`     Page ID: ${row.id}`);
    console.log('');
  });
}

main().catch(e => { console.error(e); process.exit(1); });