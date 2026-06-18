/**
 * Régénère les images de couverture pour les modules ayant des bugs visuels.
 * Utilise des prompts sans texte à l'écran pour éviter les artefacts.
 */
import fs from 'node:fs';
import path from 'node:path';

const publicDir = path.resolve('public/ressources');

const toRegenerate = [
  { slug: 'automatisation-identifier-cartographier-taches', concept: 'a clean desk with a mind map sketch, sticky notes, colorful markers and a laptop showing a simple flowchart diagram, no text' },
  { slug: 'automatisation-notifications-alertes', concept: 'a smartphone and laptop on a clean desk with glowing notification icons floating gently above them, soft blue and orange light accents, no text' },
  { slug: 'automatisation-cas-pratique-complet', concept: 'a modern PME office desk with a step-by-step automation workflow diagram on paper, laptop, coffee cup, no text' },
  { slug: 'automatisation-devis-reponses-clients', concept: 'a laptop on a desk with an email inbox and a small calculator nearby, clean modern office, blue and orange accents, no text' },
  { slug: 'automatisation-facturation-relances-impayes', concept: 'a desk with an invoice, a laptop, and a calendar with highlighted dates, clean modern office, blue and orange accents, no text' },
  { slug: 'ia-rediger-emails-documents', concept: 'a laptop screen showing a word processor and a notepad on a clean desk, person typing seen from behind, no text' },
  { slug: 'ia-prospection-commerciale', concept: 'a desk with a CRM dashboard on laptop, a phone, and a notepad with lead list, clean modern office, no text on screen' },
  { slug: 'ia-preparer-reunion', concept: 'a conference table with a laptop, notebook, pen and small clock, natural light, clean modern meeting room, no text' },
  { slug: 'securiser-emails-pieces-jointes', concept: 'a laptop with a glowing shield icon floating above the keyboard, lock and envelope nearby, clean desk, no text' },
  { slug: 'chatgpt-sans-exposer-donnees', concept: 'a laptop with a closed padlock icon, blurred documents, clean modern office, blue and orange accents, no text' },
  { slug: 'ia-creer-visuels-prospectus', concept: 'a desk with design swatches, color palette cards, tablet showing a layout, clean creative studio, no text' },
  { slug: 'ia-repondre-avis-clients', concept: 'a laptop and smartphone on a desk with star rating icons floating above, clean modern office, no text' },
  { slug: 'registre-traitements-30-minutes', concept: 'a desk with an open binder, checklist, pen and laptop, clean office, blue and orange accents, no text' },
  { slug: 'mots-de-passe-politique-outils', concept: 'a laptop with a password manager interface blurred, a keychain and lock on the desk, clean modern office, no text' },
];

function makePrompt(concept) {
  return `Photorealistic editorial cover image for a French SME training course about AI and automation. ${concept}. Over-the-shoulder view of a professional person from behind, no face visible. Modern bright office in Sarthe France, natural daylight, shallow depth of field, clean minimal desk, plants. Brand color accents: blue #3B97D3 and burnt orange #9E2114. Cinematic lighting, high quality, 16:9 aspect ratio, no text, no letters, no numbers, no UI elements, no words, no logos, no watermarks, no distorted hands.`;
}

async function generateImage(slug, concept) {
  const dir = path.join(publicDir, slug);
  fs.mkdirSync(dir, { recursive: true });
  const outputPath = path.join(dir, 'cover.jpg');

  const encoded = encodeURIComponent(makePrompt(concept));
  const seed = Math.floor(Math.random() * 1000000);
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=1280&height=720&nologo=true&seed=${seed}&enhance=true`;

  console.log(`Régénération : ${slug}...`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Pollinations error ${res.status}: ${res.statusText}`);
  }
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));
  console.log(`✓ ${outputPath}`);
}

async function main() {
  for (const item of toRegenerate) {
    try {
      await generateImage(item.slug, item.concept);
      await new Promise((resolve) => setTimeout(resolve, 4000));
    } catch (err) {
      console.error(`✗ ${item.slug}:`, err.message);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
