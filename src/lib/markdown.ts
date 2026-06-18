import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const CALLOUT_TYPES: Record<string, { class: string; icon: string }> = {
  tip: { class: 'tip', icon: '💡' },
  astuce: { class: 'tip', icon: '💡' },
  warning: { class: 'warning', icon: '⚠️' },
  attention: { class: 'warning', icon: '⚠️' },
  remember: { class: 'remember', icon: '✅' },
  retenir: { class: 'remember', icon: '✅' },
  card: { class: '', icon: '' },
  fiche: { class: '', icon: '' },
};

function preprocessCallouts(text: string): string {
  return text.replace(
    /^:::\s*(tip|astuce|warning|attention|remember|retenir|card|fiche)\s+(.+?)\n([\s\S]*?)^:::$/gim,
    (_, type, title, body) => {
      const info = CALLOUT_TYPES[type.toLowerCase()] || { class: '', icon: '' };
      const isCard = type.toLowerCase() === 'card' || type.toLowerCase() === 'fiche';
      if (isCard) {
        return `<div class="visual-card"><div class="visual-card-title">${info.icon} ${title.trim()}</div>\n${body.trim()}\n</div>`;
      }
      return `<div class="callout ${info.class}"><div class="callout-title">${info.icon} ${title.trim()}</div>\n${body.trim()}\n</div>`;
    }
  );
}

function preprocessStepLists(text: string): string {
  // Transforme une liste où chaque item commence par "Etape X :" ou "X." suivi d'un titre en step-list
  return text.replace(
    /^(\s*)- \*\*(?:Étape|Etape|Step)\s*(\d+)\s*[:\-]?\s*\*\*\s*(.+)$/gim,
    '$1- **$2.** $3'
  );
}

function postprocessStepLists(html: string): string {
  // Remplace les ol contenant des li avec class step-item
  return html.replace(/<ol>([\s\S]*?<li class="step-item">[\s\S]*?<\/li>[\s\S]*?)<\/ol>/g, '<ol class="step-list">$1</ol>');
}

export function parseMarkdown(filePath: string): string {
  const fullPath = path.resolve(process.cwd(), 'public', filePath);
  const content = fs.readFileSync(fullPath, 'utf-8');

  let processed = preprocessCallouts(content);
  processed = preprocessStepLists(processed);

  const renderer = new marked.Renderer();
  renderer.listitem = ({ text, checked, task }) => {
    if (task) {
      return `<li class="task-item"><input type="checkbox" ${checked ? 'checked' : ''} disabled> ${text}</li>`;
    }
    if (/^\*\*\d+\.\*\*\s+/.test(text)) {
      return `<li class="step-item">${text.replace(/^\*\*\d+\.\*\*\s+/, '')}</li>`;
    }
    return `<li>${text}</li>`;
  };

  let html = marked.parse(processed, { gfm: true, renderer }) as string;
  html = postprocessStepLists(html);

  return html;
}

export function estimateReadTime(text: string): number {
  const wordsPerMinute = 180;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function parseInlineMarkdown(text: string): string {
  return marked.parseInline(text) as string;
}
