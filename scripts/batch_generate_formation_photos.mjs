// Batch: for each formation in BdD formation AD, generate a photorealistic
// "over-the-shoulder" cover image from Nom + Objectif, and upload it to the "photo" property.
//
// Usage:
//   node scripts/batch_generate_formation_photos.mjs                    # all rows
//   node scripts/batch_generate_formation_photos.mjs --start 0 --end 7 # rows 0-7 only
//   node scripts/batch_generate_formation_photos.mjs --skip-has-photo  # skip rows that already have a photo
//
// Prerequisites:
//   - ComfyUI running locally on http://127.0.0.1:8188
//   - .env in project root with NOTION_TOKEN and NOTION_FORMATIONS_DB_ID

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { Client } from '@notionhq/client';
import { spawn } from 'child_process';

const DB_ID = process.env.NOTION_FORMATIONS_DB_ID || '37d96280-38de-80e8-803b-e069bdbc0aa2';
const TOKEN = process.env.NOTION_TOKEN;
const COMFYUI_URL = 'http://127.0.0.1:8188';
const GENERATE_PY = '/Users/davidollivier/.hermes/skills/creative/image-gen/scripts/generate.py';
const UPLOAD_SCRIPT = path.join(process.cwd(), 'scripts/upload_photo.mjs');
const OUTPUT_DIR = '/Users/davidollivier/outputs/notion_formation_photos';
const LOG_FILE = '/Users/davidollivier/outputs/notion_formation_photos/batch_log.json';
// Override the Notion property name for formations: "photo" instead of "photo"
// upload_photo.mjs uses "photo" property name which matches both bases.

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

function checkComfyUI() {
  try {
    const r = spawn('curl', ['-s', '--max-time', '8', `${COMFYUI_URL}/system_stats`], { stdio: ['ignore', 'pipe', 'ignore'] });
    let out = '';
    r.stdout.on('data', (d) => { out += d.toString(); });
    return new Promise((resolve) => {
      r.on('close', () => resolve(out.length > 0));
      r.on('error', () => resolve(false));
    });
  } catch { return Promise.resolve(false); }
}

// Translate a formation title + objectif into a photorealistic over-the-shoulder prompt
function buildPrompt(nom, objectif) {
  // Strip the leading number from the formation name (e.g. "8. IA, RGPD..." -> "IA, RGPD...")
  const cleanNom = nom.replace(/^\s*\d+\.\s*/, '').trim();
  return `photorealistic over-the-shoulder shot: a French small business professional seen from behind, sitting at a modern clean desk in a bright office, facing a laptop screen. The screen shows a training interface related to: ${cleanNom}. Context: ${objectif}. Natural daylight from a window, subtle blue (#3B97D3) and red (#9E2114) accent lighting, shallow depth of field focused on the laptop screen, 35mm corporate photography, professional, high quality, modern office`;
}

const NEGATIVE = "face visible, frontal portrait, visible face features, illustration, drawing, cartoon, anime, painting, sketch, flat design, isometric, 3d render, text, watermark, deformed, extra limbs, dark, low quality, blurry, multiple people, back of head only";

async function listRows() {
  const rows = [];
  let cursor;
  do {
    const resp = await notion.databases.query({ database_id: DB_ID, start_cursor: cursor });
    rows.push(...resp.results);
    cursor = resp.has_more ? resp.next_cursor : undefined;
  } while (cursor);
  return rows;
}

function generateImage(prompt, seed, outPath) {
  return new Promise((resolve, reject) => {
    const a = [
      GENERATE_PY,
      '--prompt', prompt,
      '--negative', NEGATIVE,
      '--width', '1024', '--height', '1024',
      '--steps', '35', '--cfg', '6.0', '--seed', String(seed),
      '--output', outPath,
    ];
    const child = spawn('/usr/bin/python3', a, {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, PYTHONPATH: '' },
      cwd: '/Users/davidollivier',
    });
    let stdout = '';
    let stderrBuf = '';
    child.stdout.on('data', (d) => { stdout += d.toString(); });
    child.stderr.on('data', (d) => {
      stderrBuf += d.toString();
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
        let parsed = null;
        const trimmed = stdout.trim();
        try {
          parsed = JSON.parse(trimmed.slice(trimmed.indexOf('{')));
        } catch {
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

async function main() {
  console.error(`[batch-formations] ComfyUI check...`);
  if (!await checkComfyUI()) {
    console.error(`[batch-formations] ERROR: ComfyUI not running at ${COMFYUI_URL}`);
    process.exit(1);
  }
  console.error(`[batch-formations] ComfyUI OK. Listing formations...`);
  const rows = await listRows();
  console.error(`[batch-formations] Found ${rows.length} formations. Processing indices ${startIdx} to ${endIdx === Infinity ? rows.length-1 : endIdx}...`);

  const log = { started: new Date().toISOString(), results: [], errors: [] };

  for (let i = startIdx; i < Math.min(endIdx + 1, rows.length); i++) {
    const row = rows[i];
    const p = row.properties;
    const nom = p['Nom']?.title?.[0]?.plain_text || '(sans nom)';
    const objectif = p[' Objectif général']?.rich_text?.map(r => r.plain_text).join('') || p['Objectif général']?.rich_text?.map(r => r.plain_text).join('') || '';
    const hasPhoto = (p['photo']?.files?.length || 0) > 0;

    console.error(`\n[batch-formations] [${i}] ${nom}`);

    if (skipHasPhoto && hasPhoto) {
      console.error(`[batch-formations]   ⏭️  already has photo, skipping`);
      log.results.push({ index: i, nom, status: 'skipped_has_photo' });
      continue;
    }

    if (!objectif) {
      console.error(`[batch-formations]   ⏭️  no objectif, skipping`);
      log.results.push({ index: i, nom, status: 'skipped_no_objectif' });
      continue;
    }

    const slug = nom.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50);
    const prompt = buildPrompt(nom, objectif);
    const outPath = path.join(OUTPUT_DIR, `formation_${slug}.png`);
    const seed = 5000 + i;

    try {
      console.error(`[batch-formations]   🎨 generating (seed ${seed})...`);
      const genResult = await generateImage(prompt, seed, outPath);
      if (genResult.status !== 'success') {
        throw new Error(`generation failed: ${JSON.stringify(genResult)}`);
      }
      console.error(`[batch-formations]   📤 uploading to Notion...`);
      const upResult = await uploadPhoto(row.id, outPath);
      if (upResult.status !== 'success') {
        throw new Error(`upload failed: ${JSON.stringify(upResult)}`);
      }
      console.error(`[batch-formations]   ✅ done`);
      log.results.push({ index: i, nom, page_id: row.id, image_path: outPath, seed, status: 'success' });
    } catch (e) {
      console.error(`[batch-formations]   ❌ ERROR: ${e.message}`);
      log.errors.push({ index: i, nom, error: e.message });
    }

    fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
  }

  log.completed = new Date().toISOString();
  log.success_count = log.results.filter(r => r.status === 'success').length;
  log.error_count = log.errors.length;
  log.skipped_count = log.results.filter(r => r.status !== 'success').length;
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));

  console.error(`\n[batch-formations] DONE. Success: ${log.success_count}, Errors: ${log.error_count}, Skipped: ${log.skipped_count}`);
  console.error(`[batch-formations] Log: ${LOG_FILE}`);
  console.log(JSON.stringify({ status: 'complete', success: log.success_count, errors: log.error_count, skipped: log.skipped_count, log_file: LOG_FILE }));
}

main().catch(e => { console.error('[batch-formations] FATAL:', e); process.exit(1); });