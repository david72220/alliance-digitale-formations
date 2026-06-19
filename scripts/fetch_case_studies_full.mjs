import 'dotenv/config';
import { Client } from '@notionhq/client';
import fs from 'node:fs';

const dbId = process.env.NOTION_CASE_STUDIES_DB_ID || '37f96280-38de-814d-9534-da549cbb76e9';
const notion = new Client({ auth: process.env.NOTION_TOKEN });

const txt = (rt) => (rt || []).map(b => b.plain_text).join('');

const rows = [];
let cursor;
do {
  const r = await notion.databases.query({ database_id: dbId, start_cursor: cursor });
  rows.push(...r.results);
  cursor = r.has_more ? r.next_cursor : undefined;
} while (cursor);

const out = rows
  .filter(r => r.properties['Publié']?.checkbox)
  .map(r => ({
    id: r.id,
    titre: r.properties['Titre']?.title?.[0]?.plain_text || '',
    probleme: txt(r.properties['Problème']?.rich_text),
    solution: txt(r.properties['Solution']?.rich_text),
    resultat: txt(r.properties['Résultat chiffré']?.rich_text),
    secteur: txt(r.properties['Secteur']?.rich_text),
  }));

fs.writeFileSync('case_studies_full.json', JSON.stringify(out, null, 2));
console.log(`Wrote ${out.length} published case studies.`);
