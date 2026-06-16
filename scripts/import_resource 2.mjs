/**
 * Importe une ressource complète dans la base Notion Ressources.
 * Usage : npm run import:resource -- data/ressources/rgpd-pme.json
 */
import { Client } from '@notionhq/client';
import fs from 'node:fs';

const TOKEN = process.env.NOTION_TOKEN;
const DB_ID = process.env.NOTION_RESOURCES_DB_ID;

if (!TOKEN || !DB_ID) {
  console.error('ERREUR : définissez NOTION_TOKEN et NOTION_RESOURCES_DB_ID');
  process.exit(1);
}

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage : npm run import:resource -- data/ressources/nom-du-cours.json');
  process.exit(1);
}

const notion = new Client({ auth: TOKEN });

function toBlocks(content) {
  return content.split('\n\n').map((paragraph) => {
    const trimmed = paragraph.trim();
    if (!trimmed) return null;

    // Heading 2
    if (trimmed.startsWith('## ')) {
      return { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: trimmed.replace('## ', '') } }] } };
    }
    // Heading 3
    if (trimmed.startsWith('### ')) {
      return { object: 'block', type: 'heading_3', heading_3: { rich_text: [{ type: 'text', text: { content: trimmed.replace('### ', '') } }] } };
    }
    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      return { object: 'block', type: 'numbered_list_item', numbered_list_item: { rich_text: [{ type: 'text', text: { content: trimmed.replace(/^\d+\.\s/, '') } }] } };
    }
    // Bullet list
    if (trimmed.startsWith('- ')) {
      return { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: trimmed.replace('- ', '') } }] } };
    }
    // Callout (security emphasis)
    if (trimmed.startsWith('! ')) {
      return { object: 'block', type: 'callout', callout: { rich_text: [{ type: 'text', text: { content: trimmed.replace('! ', '') } }], icon: { emoji: '🔒' } } };
    }
    // Paragraph
    return { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: trimmed } }] } };
  }).filter(Boolean);
}

async function main() {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const page = await notion.pages.create({
    parent: { database_id: DB_ID },
    properties: {
      Titre: { title: [{ type: 'text', text: { content: data.title } }] },
      Slug: { rich_text: [{ type: 'text', text: { content: data.slug } }] },
      Description: { rich_text: [{ type: 'text', text: { content: data.description } }] },
      Publié: { checkbox: data.published ?? false },
    },
    children: [
      { object: 'block', type: 'heading_1', heading_1: { rich_text: [{ type: 'text', text: { content: data.title } }] } },
      { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: data.description } }] } },
      ...toBlocks(data.content),
    ],
  });

  console.log(`Ressource créée : ${page.id}`);
  console.log(`URL : https://www.notion.so/${page.id.replace(/-/g, '')}`);
}

main().catch((err) => {
  console.error('Erreur :', err.message);
  process.exit(1);
});
