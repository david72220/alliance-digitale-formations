// List all formations in the BdD formation AD database with Nom + Objectif + photo state
import 'dotenv/config';
import { Client } from '@notionhq/client';

const dbId = process.env.NOTION_FORMATIONS_DB_ID || '37d96280-38de-80e8-803b-e069bdbc0aa2';
const token = process.env.NOTION_TOKEN;
if (!token) { console.error('NOTION_TOKEN not set'); process.exit(1); }
const notion = new Client({ auth: token });

async function main() {
  const rows = [];
  let cursor;
  do {
    const resp = await notion.databases.query({ database_id: dbId, start_cursor: cursor });
    rows.push(...resp.results);
    cursor = resp.has_more ? resp.next_cursor : undefined;
  } while (cursor);

  console.log(`Found ${rows.length} formations:\n`);
  rows.forEach((row, i) => {
    const p = row.properties;
    const nom = p['Nom']?.title?.[0]?.plain_text || '(sans nom)';
    const objectif = p[' Objectif général']?.rich_text?.map(r => r.plain_text).join('') || p['Objectif général']?.rich_text?.map(r => r.plain_text).join('') || '(pas d objectif)';
    const active = p['Active']?.checkbox ? '✅Active' : '⬜inactive';
    const hasPhoto = (p['photo']?.files?.length || 0) > 0 ? '📷' : '—';
    const prix = p['Prix de la formation']?.rich_text?.[0]?.plain_text || '';
    console.log(`[${i}] ${active} ${hasPhoto} | ${nom}`);
    console.log(`     Objectif: ${objectif.slice(0, 200)}`);
    console.log(`     Prix: ${prix}`);
    console.log(`     Page ID: ${row.id}`);
    console.log('');
  });
}
main().catch(e => { console.error(e); process.exit(1); });