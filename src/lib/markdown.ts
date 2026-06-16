import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

export function parseMarkdown(filePath: string): string {
  const fullPath = path.resolve(process.cwd(), 'public', filePath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  return marked.parse(content, { gfm: true }) as string;
}

export function estimateReadTime(text: string): number {
  const wordsPerMinute = 180;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
