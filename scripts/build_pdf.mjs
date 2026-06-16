import { mdToPdf } from 'md-to-pdf';
import path from 'node:path';

const input = process.argv[2];
if (!input) {
  console.error('Usage : npm run build:pdf -- <chemin/vers/fichier.md>');
  process.exit(1);
}

const output = input.replace(/\.md$/i, '.pdf');

await mdToPdf({ path: input }, { dest: output });
console.log(`PDF généré : ${output}`);
