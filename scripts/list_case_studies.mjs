// List all rows in the Études de cas database with their fields and Publié state
import 'dotenv/config';
import { Client } from '@notionhq/client';

const dbId = process.env.NOTION_CASE_STUDIES_DB_ID || '37f96280-38de-814d-9534-da549cbb76e9';
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

  console.log(`Found ${rows.length} rows in Études de cas:\n`);
  rows.forEach((row, i) => {
    const p = row.properties;
    const titre = p['Titre']?.title?.[0]?.plain_text || '(sans titre)';
    const publie = p['Publié']?.checkbox ? '✅Publié' : '⬜NON-publié';
    const visuel = p['Visuel']?.url || '(pas de visuel)';
    const resultat = p['Résultat chiffré']?.rich_text?.[0]?.plain_text || '(pas de résultat)';
    const problem = p['Problème']?.rich_text?.[0]?.plain_text || '(pas de problème)';
    console.log(`[${i}] ${publie} | ${titre}`);
    console.log(`     Visuel: ${visuel}`);
    console.log(`     Résultat: ${resultat}`);
    console.log(`     Problème: ${problem.slice(0, 100)}`);
    console.log('');
  });
}
main().catch(e => { console.error(e); process.exit(1); });