/**
 * Importe toutes les ressources présentes dans data/ressources/ vers Notion.
 * Usage : npm run import:all
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const dataDir = path.resolve('data/ressources');

if (!fs.existsSync(dataDir)) {
  console.error(`Dossier ${dataDir} introuvable.`);
  process.exit(1);
}

const files = fs.readdirSync(dataDir).filter((f) => f.endsWith('.json'));

if (files.length === 0) {
  console.log('Aucun fichier JSON trouvé dans data/ressources/');
  process.exit(0);
}

console.log(`${files.length} ressource(s) à importer...`);

for (const file of files) {
  const filePath = path.join('data/ressources', file);
  console.log(`\n→ Import de ${file}...`);
  try {
    execSync(`node scripts/import_resource.mjs ${filePath}`, {
      stdio: 'inherit',
      env: process.env,
    });
  } catch (err) {
    console.error(`✗ Échec de l'import de ${file}`);
    process.exit(1);
  }
}

console.log('\n✓ Toutes les ressources ont été importées.');
