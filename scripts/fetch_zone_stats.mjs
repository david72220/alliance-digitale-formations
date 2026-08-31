/**
 * Calcule les statistiques PME réelles par ville (API recherche-entreprises.api.gouv.fr, gratuite, sans clé)
 * pour alimenter le contenu différencié des pages /zones/[slug]/.
 *
 * Usage : node scripts/fetch_zone_stats.mjs
 * Écrit  : data/zones/stats.json  (à rafraîchir tous les 3 mois — cf. gotcha comptages qui dérivent)
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; AllianceDigitaleZoneStats/1.0)' };

// Sections NAF (niveau 1) → libellé humain court, utilisé pour le paragraphe d'ancrage local
const NAF_SECTIONS = {
  A: 'agriculture, sylviculture et pêche',
  B: 'industries extractives',
  C: 'industrie manufacturière',
  D: 'énergie',
  E: 'eau, déchets et dépollution',
  F: 'construction et BTP',
  G: 'commerce et réparation automobile',
  H: 'transport et logistique',
  I: 'hébergement et restauration',
  J: 'information et communication',
  K: 'finance et assurance',
  L: 'activités immobilières',
  M: 'activités scientifiques et techniques',
  N: 'services administratifs et de soutien aux entreprises',
  O: 'administration publique',
  P: 'enseignement',
  Q: 'santé humaine et action sociale',
  R: 'arts, spectacles et activités récréatives',
  S: 'autres activités de services',
};

// Villes vague 1 — code commune INSEE (via geo.api.gouv.fr), nom d'usage SEO conservé même
// quand la commune administrative a fusionné (ex. Château-du-Loir → Montval-sur-Loir, 2016).
const VILLES = [
  { slug: 'le-mans', nomUsage: 'Le Mans', codeCommune: '72181', departement: '72' },
  { slug: 'sable-sur-sarthe', nomUsage: 'Sablé-sur-Sarthe', codeCommune: '72264', departement: '72' },
  { slug: 'la-ferte-bernard', nomUsage: 'La Ferté-Bernard', codeCommune: '72132', departement: '72' },
  { slug: 'la-fleche', nomUsage: 'La Flèche', codeCommune: '72154', departement: '72' },
  { slug: 'mamers', nomUsage: 'Mamers', codeCommune: '72180', departement: '72' },
  { slug: 'chateau-du-loir', nomUsage: 'Château-du-Loir', codeCommune: '72071', departement: '72' },
  { slug: 'laval', nomUsage: 'Laval', codeCommune: '53130', departement: '53' },
  { slug: 'alencon', nomUsage: 'Alençon', codeCommune: '61001', departement: '61' },
  { slug: 'angers', nomUsage: 'Angers', codeCommune: '49007', departement: '49' },
  { slug: 'tours', nomUsage: 'Tours', codeCommune: '37261', departement: '37' },
  { slug: 'blois', nomUsage: 'Blois', codeCommune: '41018', departement: '41' },
  { slug: 'chartres', nomUsage: 'Chartres', codeCommune: '28085', departement: '28' },
];

async function fetchJson(url, attempt = 1) {
  const res = await fetch(url, { headers: UA });
  if (res.status === 429 && attempt <= 5) {
    await new Promise((r) => setTimeout(r, 1500 * attempt));
    return fetchJson(url, attempt + 1);
  }
  if (!res.ok) throw new Error(`${res.status} sur ${url}`);
  return res.json();
}

async function totalPourFiltre(codeCommune, extra = '') {
  const url = `https://recherche-entreprises.api.gouv.fr/search?code_commune=${codeCommune}&etat_administratif=A&per_page=1&minimal=true${extra}`;
  const data = await fetchJson(url);
  return data.total_results ?? 0;
}

async function statsVille(v) {
  console.log(`→ ${v.nomUsage} (${v.codeCommune})`);

  // PME actives, tranche 3-49 salariés (codes INSEE 02=3-5, 03=6-9, 11=10-19, 12=20-49)
  const totalPME = await totalPourFiltre(v.codeCommune, '&tranche_effectif_salarie=02,03,11,12');

  // Toutes entreprises actives (référence, pour donner le poids relatif des PME)
  const totalActives = await totalPourFiltre(v.codeCommune);

  // Répartition par section NAF (parmi les PME 3-49) pour dégager le secteur dominant réel
  const secteurs = [];
  for (const [code, libelle] of Object.entries(NAF_SECTIONS)) {
    const n = await totalPourFiltre(
      v.codeCommune,
      `&tranche_effectif_salarie=02,03,11,12&section_activite_principale=${code}`
    );
    if (n > 0) secteurs.push({ code, libelle, count: n });
    await new Promise((r) => setTimeout(r, 400)); // respect du rate limit (429 mesuré à 120ms)
  }
  secteurs.sort((a, b) => b.count - a.count);

  return {
    slug: v.slug,
    nomUsage: v.nomUsage,
    departement: v.departement,
    codeCommune: v.codeCommune,
    totalEntreprisesActives: totalActives,
    totalPME3a49: totalPME,
    topSecteurs: secteurs.slice(0, 3),
    calculeLe: new Date().toISOString().slice(0, 10),
  };
}

async function main() {
  const outPath = path.join(__dirname, '..', 'data', 'zones', 'stats.json');
  let resultats = [];
  try {
    resultats = JSON.parse(await fs.readFile(outPath, 'utf-8'));
  } catch {}
  const dejaFait = new Set(resultats.map((r) => r.slug));
  const aTraiter = VILLES.filter((v) => !dejaFait.has(v.slug));

  for (const v of aTraiter) {
    try {
      resultats.push(await statsVille(v));
    } catch (err) {
      console.error(`  échec ${v.nomUsage} : ${err.message}`);
    }
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, JSON.stringify(resultats, null, 2), 'utf-8');
    await new Promise((r) => setTimeout(r, 400));
  }

  await fs.writeFile(outPath, JSON.stringify(resultats, null, 2), 'utf-8');
  console.log(`\n✅ ${resultats.length} villes écrites dans ${outPath}`);
}

main().catch((err) => {
  console.error('Erreur :', err.message);
  process.exit(1);
});
