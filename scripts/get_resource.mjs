// Get full description of a single row by page ID
// Usage: node scripts/get_resource.mjs <pageId>
import 'dotenv/config';
import { Client } from '@notionhq/client';

const pageId = process.argv[2];
const token = process.env.NOTION_TOKEN;

if (!token) { console.error('NOTION_TOKEN not set'); process.exit(1); }
if (!pageId) { console.error('Usage: node scripts/get_resource.mjs <pageId>'); process.exit(1); }

const notion = new Client({ auth: token });

async function main() {
  const page = await notion.pages.retrieve({ page_id: pageId });
  const props = page.properties;
  const titre = props['Titre']?.title?.[0]?.plain_text || '';
  const desc = props['Description']?.rich_text?.map(r => r.plain_text).join('') || '';
  const module = props['Module']?.select?.name || '';
  const slug = props['Slug']?.rich_text?.[0]?.plain_text || '';
  console.log(JSON.stringify({ page_id: pageId, titre, description: desc, module, slug }, null, 2));
}

main().catch(e => { console.error(e); process.exit(1); });