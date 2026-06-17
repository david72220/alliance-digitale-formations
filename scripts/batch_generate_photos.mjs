// Batch: for each row in the Ressources Notion DB, generate a photorealistic
// "over-the-shoulder" course cover image from Titre + Description, and upload
// it to the "photo" property.
//
// Usage:
//   node scripts/batch_generate_photos.mjs                    # all rows
//   node scripts/batch_generate_photos.mjs --start 1 --end 5  # rows 1-5 only
//   node scripts/batch_generate_photos.mjs --skip-has-photo  # skip rows that already have a photo
//
// Prerequisites:
//   - ComfyUI running locally on http://127.0.0.1:8188 (start with ~/.hermes/skills/creative/image-gen/scripts/start_comfyui.sh)
//   - .env in project root with NOTION_TOKEN and NOTION_RESOURCES_DB_ID

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { Client } from '@notionhq/client';
import { execFileSync, spawn } from 'child_process';

const DB_ID = process.env.NOTION_RESOURCES_DB_ID || '37f96280-38de-814b-be57-ff8dd53fa940';
const TOKEN = process.env.NOTION_TOKEN;
const COMFYUI_URL = 'http://127.0.0.1:8188';
const GENERATE_PY = '/Users/davidollivier/.hermes/skills/creative/image-gen/scripts/generate.py';
const UPLOAD_SCRIPT = path.join(process.cwd(), 'scripts/upload_photo.mjs');
const OUTPUT_DIR = '/Users/davidollivier/outputs/notion_photos';
const LOG_FILE = '/Users/davidollivier/outputs/notion_photos/batch_log.json';

// Parse args
const args = process.argv.slice(2);
let startIdx = 0, endIdx = Infinity, skipHasPhoto = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--start' && args[i+1]) { startIdx = parseInt(args[++i]); }
  if (args[i] === '--end' && args[i+1]) { endIdx = parseInt(args[++i]); }
  if (args[i] === '--skip-has-photo') { skipHasPhoto = true; }
}

if (!TOKEN) { console.error('NOTION_TOKEN not set in .env'); process.exit(1); }
const notion = new Client({ auth: TOKEN });
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// --- helpers ---
function checkComfyUI() {
  try {
    const r = execFileSync('curl', ['-s', '--max-time', '8', `${COMFYUI_URL}/system_stats`], { stdio: ['ignore', 'pipe', 'ignore'] });
    return r.length > 0;
  } catch { return false; }
}

// Translate a course title + description into a photorealistic over-the-shoulder prompt
function buildPrompt(titre, description, module) {
  // Extract the core action/concept from the title
  const concept = titre.toLowerCase()
    .replace(/avec l['’]ia/g, '').replace(/en pme/g, '').replace(/et automatisation/g, '')
    .trim();
  return `photorealistic over-the-shoulder shot: a French small business professional seen from behind, sitting at a modern clean desk in a bright office, facing a laptop screen. The screen shows a software interface related to: ${titre}. Context: ${description}. ${module ? `Domain: ${module}.` : ''} Natural daylight from a window, subtle blue (#3B97D3) and red (#9E2114) accent lighting, shallow depth of field focused on the laptop screen, 35mm corporate photography, professional, high quality, modern office`;
}

const NEGATIVE = "face visible, frontal portrait, visible face features, illustration, drawing, cartoon, anime, painting, sketch, flat design, isometric, 3d render, text, watermark, deformed, extra limbs, dark, low quality, blurry, multiple people, back of head only";

async function listRows() {
  const rows = [];
  let cursor;
  do {
    const resp = await notion.databases.query({
      database_id: DB_ID,
      start_cursor: cursor,
    });
    rows.push(...resp.results);
    cursor = resp.has_more ? resp.next_cursor : undefined;
  } while (cursor);
  return rows;
}

// Use spawn (async) with stdout collected and stderr drained to avoid pipe
// buffer deadlocks that execFileSync hits when the Python script emits progress
// logs on stderr.
function generateImage(prompt, seed, outPath) {
  return new Promise((resolve, reject) => {
    const args = [
      GENERATE_PY,
      '--prompt', prompt,
      '--negative', NEGATIVE,
      '--width', '1024', '--height', '1024',
      '--steps', '35', '--cfg', '6.0', '--seed', String(seed),
      '--output', outPath,
    ];
    const child = spawn('/usr/bin/python3', args, {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, PYTHONPATH: '' },
      cwd: '/Users/davidollivier',
    });
    let stdout = '';
    let stderrBuf = '';
    child.stdout.on('data', (d) => { stdout += d.toString(); });
    child.stderr.on('data', (d) => {
      stderrBuf += d.toString();
      // Log progress to our stderr so we can see what's happening
      process.stderr.write(`[gen:py] ${d.toString()}`);
    });
    const timer = setTimeout(() => {
      child.kill('SIGKILL');
      reject(new Error('generation timed out after 300s'));
    }, 300000);
    child.on('close', (code) => {
      clearTimeout(timer);
      if (code !== 0) {
        reject(new Error(`generation exited with code ${code}. stderr: ${stderrBuf.slice(-500)}`));
        return;
      }
      try {
        // generate.py outputs pretty-printed JSON (indent=2) — parse the whole stdout
        // Try full stdout first; if that fails, find the last {...} block
        let parsed = null;
        const trimmed = stdout.trim();
        try {
          parsed = JSON.parse(trimmed.slice(trimmed.indexOf('{')));
        } catch {
          // Fallback: regex extract last JSON object
          const match = stdout.match(/\{[\s\S]*\}\s*$/);
          if (match) {
            try { parsed = JSON.parse(match[0]); } catch { /* fallthrough */ }
          }
        }
        if (!parsed) {
          reject(new Error(`generation output has no valid JSON. stdout: ${stdout.slice(-500)}`));
        } else {
          resolve(parsed);
        }
      } catch (e) {
        reject(new Error(`generation output not JSON. stdout: ${stdout.slice(-500)}`));
      }
    });
    child.on('error', reject);
  });
}

async function uploadPhoto(pageId, imagePath) {
  return new Promise((resolve, reject) => {
    const child = spawn('npx', ['dotenv-cli', '--', 'node', UPLOAD_SCRIPT, pageId, imagePath], {
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env },
    });
    let stdout = '';
    let stderrBuf = '';
    child.stdout.on('data', (d) => { stdout += d.toString(); });
    child.stderr.on('data', (d) => {
      stderrBuf += d.toString();
      process.stderr.write(`[upload] ${d.toString()}`);
    });
    const timer = setTimeout(() => {
      child.kill('SIGKILL');
      reject(new Error('upload timed out after 90s'));
    }, 90000);
    child.on('close', (code) => {
      clearTimeout(timer);
      if (code !== 0) {
        reject(new Error(`upload exited with code ${code}. stderr: ${stderrBuf.slice(-500)}`));
        return;
      }
      try {
        // Find the last JSON object in stdout
        const trimmed = stdout.trim();
        const parsed = JSON.parse(trimmed.slice(trimmed.indexOf('{')));
        resolve(parsed);
      } catch (e) {
        reject(new Error(`upload output not JSON. stdout: ${stdout.slice(-500)}`));
      }
    });
    child.on('error', reject);
  });
}

// --- main ---
async function main() {
  console.error(`[batch] ComfyUI check...`);
  if (!checkComfyUI()) {
    console.error(`[batch] ERROR: ComfyUI not running at ${COMFYUI_URL}`);
    console.error(`[batch] Start it with: bash ~/.hermes/skills/creative/image-gen/scripts/start_comfyui.sh`);
    process.exit(1);
  }
  console.error(`[batch] ComfyUI OK. Listing rows...`);
  const rows = await listRows();
  console.error(`[batch] Found ${rows.length} rows. Processing indices ${startIdx} to ${endIdx === Infinity ? rows.length-1 : endIdx}...`);

  const log = { started: new Date().toISOString(), results: [], errors: [] };

  for (let i = startIdx; i < Math.min(endIdx + 1, rows.length); i++) {
    const row = rows[i];
    const props = row.properties;
    const titre = props['Titre']?.title?.[0]?.plain_text || '(sans titre)';
    const desc = props['Description']?.rich_text?.map(r => r.plain_text).join('') || '';
    const module = props['Module']?.select?.name || '';
    const slug = props['Slug']?.rich_text?.[0]?.plain_text || `row_${i}`;
    const hasPhoto = (props['photo']?.files?.length || 0) > 0;

    console.error(`\n[batch] [${i}] ${titre}`);

    if (skipHasPhoto && hasPhoto) {
      console.error(`[batch]   ⏭️  already has photo, skipping (--skip-has-photo)`);
      log.results.push({ index: i, titre, slug, status: 'skipped_has_photo' });
      continue;
    }

    const prompt = buildPrompt(titre, desc, module);
    const outPath = path.join(OUTPUT_DIR, `notion_${slug}.png`);
    const seed = 1000 + i; // deterministic seed per row index

    try {
      console.error(`[batch]   🎨 generating (seed ${seed})...`);
      const genResult = await generateImage(prompt, seed, outPath);
      if (genResult.status !== 'success') {
        throw new Error(`generation failed: ${JSON.stringify(genResult)}`);
      }
      console.error(`[batch]   📤 uploading to Notion...`);
      const upResult = await uploadPhoto(row.id, outPath);
      if (upResult.status !== 'success') {
        throw new Error(`upload failed: ${JSON.stringify(upResult)}`);
      }
      console.error(`[batch]   ✅ done`);
      log.results.push({ index: i, titre, slug, page_id: row.id, image_path: outPath, seed, status: 'success' });
    } catch (e) {
      console.error(`[batch]   ❌ ERROR: ${e.message}`);
      log.errors.push({ index: i, titre, slug, error: e.message });
    }

    // Save log incrementally
    fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
  }

  log.completed = new Date().toISOString();
  log.success_count = log.results.filter(r => r.status === 'success').length;
  log.error_count = log.errors.length;
  log.skipped_count = log.results.filter(r => r.status === 'skipped_has_photo').length;
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));

  console.error(`\n[batch] DONE. Success: ${log.success_count}, Errors: ${log.error_count}, Skipped: ${log.skipped_count}`);
  console.error(`[batch] Log: ${LOG_FILE}`);
  console.log(JSON.stringify({ status: 'complete', success: log.success_count, errors: log.error_count, skipped: log.skipped_count, log_file: LOG_FILE }));
}

main().catch(e => { console.error('[batch] FATAL:', e); process.exit(1); });