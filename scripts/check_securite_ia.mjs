import { readFileSync } from 'node:fs';

const EXPECTED_DATE = process.argv[2] ?? '2026-11-25';
const dir = new URL('../src/data/securite-ia/', import.meta.url);
const load = (f) => JSON.parse(readFileSync(new URL(f, dir), 'utf8'));

const models = load('models.fr.json');
const { matrix } = load('recommendations.json');
const { sectors } = load('sectors.fr.json');

// Ids et slugs publiés au 25/11/2026 : leurs URL sont indexées, ils ne doivent pas disparaître.
const ORIGINAL_MODEL_IDS = ['chatgpt-free', 'chatgpt-plus', 'chatgpt-enterprise', 'claude-sonnet', 'gemini-free', 'gemini-workspace', 'mistral-api', 'le-chat', 'deepseek', 'qwen', 'kimi', 'glm', 'perplexity', 'grok', 'groq', 'copilot-365', 'ollama-local', 'llama-cpp-local', 'azure-openai', 'aws-bedrock'];
const ORIGINAL_SECTORS = JSON.parse(readFileSync(new URL('../scripts/securite_ia_slugs.json', import.meta.url), 'utf8'));

const LEVELS = ['low', 'medium', 'high', 'critical'];
const RISKS = ['none', 'low', 'medium', 'high', 'critical'];
const GDPR = ['yes', 'partially', 'no'];
const REQUIRED = ['id', 'label', 'editor', 'jurisdiction', 'jurisdiction_flag', 'data_retention', 'training_on_data', 'api_retention', 'risk_level', 'risk_description', 'gdpr_compliant', 'notes', 'safe_for_levels'];

const errors = [];
const err = (m) => errors.push(m);

if (models.last_verified !== EXPECTED_DATE) err(`last_verified = ${models.last_verified}, attendu ${EXPECTED_DATE}`);

const ids = models.models.map((m) => m.id);
const idSet = new Set(ids);
if (idSet.size !== ids.length) err('ids de modèles en double');
for (const id of ORIGINAL_MODEL_IDS) if (!idSet.has(id)) err(`id d'origine disparu : ${id}`);

for (const m of models.models) {
  for (const k of REQUIRED) if (m[k] === undefined || m[k] === '') err(`${m.id} : champ ${k} manquant`);
  if (!RISKS.includes(m.risk_level)) err(`${m.id} : risk_level invalide ${m.risk_level}`);
  if (!GDPR.includes(m.gdpr_compliant)) err(`${m.id} : gdpr_compliant invalide ${m.gdpr_compliant}`);
  if (typeof m.training_on_data !== 'boolean') err(`${m.id} : training_on_data non booléen`);
  if (!Array.isArray(m.safe_for_levels) || m.safe_for_levels.some((l) => !LEVELS.includes(l))) err(`${m.id} : safe_for_levels invalide`);
  if (m.safe_for_levels?.includes('critical') && m.jurisdiction !== 'LOCAL') err(`${m.id} : critical réservé au local`);
}

for (const lvl of LEVELS) {
  const row = matrix[lvl];
  if (!row) { err(`matrice : niveau ${lvl} absent`); continue; }
  const all = [...row.recommended, ...row.caution, ...row.forbidden];
  for (const id of all) if (!idSet.has(id)) err(`matrice ${lvl} : id inconnu ${id}`);
  for (const id of ids) {
    const n = all.filter((x) => x === id).length;
    if (n !== 1) err(`matrice ${lvl} : ${id} présent ${n} fois (attendu 1)`);
  }
}
const crit = matrix.critical;
if (crit && crit.local_only !== true) err('matrice critical : local_only doit rester true');
if (crit) for (const id of crit.recommended) {
  const m = models.models.find((x) => x.id === id);
  if (m && m.jurisdiction !== 'LOCAL') err(`matrice critical : ${id} recommandé mais non local`);
}

const SENS = ['low', 'medium', 'high', 'critical'];
const secById = new Map(sectors.map((s) => [s.id, s]));
for (const [sid, docs] of Object.entries(ORIGINAL_SECTORS)) {
  const s = secById.get(sid);
  if (!s) { err(`secteur d'origine disparu : ${sid}`); continue; }
  const docIds = new Set(s.documents.map((d) => d.id));
  for (const d of docs) if (!docIds.has(d)) err(`document d'origine disparu : ${sid}/${d}`);
}
for (const s of sectors) for (const d of s.documents) if (!SENS.includes(d.sensitivity)) err(`${s.id}/${d.id} : sensitivity invalide ${d.sensitivity}`);

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join('\n'));
  process.exit(1);
}
console.log(`OK — ${ids.length} outils, ${sectors.length} secteurs, last_verified ${models.last_verified}`);
