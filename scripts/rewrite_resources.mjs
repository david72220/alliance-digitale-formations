/**
 * Réécrit les contenus Markdown des modules dans un style débutant enrichi.
 * Lance avec : npx dotenv-cli -- node scripts/rewrite_resources.mjs
 * Nécessite une clé API d'un LLM (non inclus ici par défaut).
 */
import fs from 'node:fs';
import path from 'node:path';

const dataDir = path.resolve('data/ressources');
const skipSlug = 'rgpd-pme-10-points-controle';

function buildPrompt(data) {
  return `Tu es un rédacteur pédagogique spécialisé dans les formations pour PME et auto-entrepreneurs débutants en France.

Réécris le contenu du micro-cours suivant dans un style très accessible, concret et visuel.

TITRE : ${data.title}
MODULE : ${data.module}
DESCRIPTION : ${data.description}

CONTENU ACTUEL :
${data.content}

EXERCICE ACTUEL :
${data.exercice}

SOLUTION ACTUELLE :
${data.solution}

RÈGLES DE RÉÉCRITURE :
1. Le ton doit être simple, chaleureux et pédagogique. Pas de jargon. Phrases courtes.
2. Chaque concept abstrait doit être illustré par un exemple concret de PME ou d'auto-entrepreneur en Sarthe.
3. Ajoute des encadrés visuels avec la syntaxe exacte suivante :
   - ::: retenir Titre\nIdée centrale en 2-3 phrases\n:::
   - ::: tip Titre\nConseil pratique\n:::
   - ::: attention Titre\nPoint de vigilance\n:::
   - ::: card Titre\nExemple concret d'une PME\n:::
4. Utilise des tableaux Markdown pour comparer des options, des outils ou des durées.
5. Termine le contenu par un plan d'action simple sur 7 jours ou une checklist.
6. Réécris l'exercice avec un objectif clair, une consigne, un tableau à compléter si pertinent, et des questions de réflexion.
7. Réécris la solution avec un corrigé détaillé et une grille d'évaluation simple.
8. Ne pas utiliser de HTML. Ne pas ajouter d'images. Laisser le champ photo vide.

RÉPONDS UNIQUEMENT sous ce format JSON strict (sans balises Markdown autour du JSON) :
{
  "content": "# ${data.title}\\n\\n...",
  "exercice": "# Exercice pratique — ${data.title}\\n\\n...",
  "solution": "# Corrigé de l’exercice — ${data.title}\\n\\n..."
}
`;
}

async function rewriteResource(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (data.slug === skipSlug) {
    console.log(`Ignoré (déjà réécrit) : ${data.slug}`);
    return;
  }

  console.log(`Réécriture de ${data.slug}...`);
  // Ici, on pourrait appeler un LLM. Pour l'instant, on marque le fichier comme à traiter.
  // TODO: intégrer appel API local ou distant
  console.log(`TODO: appeler LLM pour ${data.slug}`);
}

async function main() {
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith('.json'));
  for (const file of files) {
    await rewriteResource(path.join(dataDir, file));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
