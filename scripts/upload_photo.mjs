// Upload an image file to a Notion page's "photo" property
// Usage: node scripts/upload_photo.mjs <pageId> <imagePath>
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { Client } from '@notionhq/client';

const pageId = process.argv[2];
const imagePath = process.argv[3];
const token = process.env.NOTION_TOKEN;

if (!token) { console.error('NOTION_TOKEN not set'); process.exit(1); }
if (!pageId || !imagePath) {
  console.error('Usage: node scripts/upload_photo.mjs <pageId> <imagePath>');
  process.exit(1);
}
if (!fs.existsSync(imagePath)) {
  console.error(`File not found: ${imagePath}`);
  process.exit(1);
}

const notion = new Client({ auth: token });

async function uploadFile(filePath) {
  const filename = path.basename(filePath);
  const contentType = filename.toLowerCase().endsWith('.png') ? 'image/png'
                    : filename.toLowerCase().endsWith('.jpg') || filename.toLowerCase().endsWith('.jpeg') ? 'image/jpeg'
                    : 'image/png';
  const fileSize = fs.statSync(filePath).size;

  // Step 1: create file upload
  const createResp = await fetch('https://api.notion.com/v1/file_uploads', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Notion-Version': '2025-09-03',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filename,
      content_type: contentType,
      // Notion file_uploads accept a length field for the expected size
    }),
  });
  if (!createResp.ok) {
    const txt = await createResp.text();
    throw new Error(`Step 1 (create file_upload) failed: ${createResp.status} ${txt}`);
  }
  const created = await createResp.json();
  const fileUploadId = created.id;
  const uploadUrl = created.upload_url;

  // Step 2: send bytes as multipart/form-data to the /send endpoint
  const fileBuffer = fs.readFileSync(filePath);
  const boundary = `----hermes${Date.now()}${Math.random().toString(16).slice(2)}`;
  const multipartBody = Buffer.concat([
    Buffer.from(`--${boundary}\r\n`, 'utf8'),
    Buffer.from(`Content-Disposition: form-data; name="file"; filename="${filename}"\r\n`, 'utf8'),
    Buffer.from(`Content-Type: ${contentType}\r\n\r\n`, 'utf8'),
    fileBuffer,
    Buffer.from(`\r\n--${boundary}--\r\n`, 'utf8'),
  ]);
  const sendResp = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Notion-Version': '2025-09-03',
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': String(multipartBody.length),
    },
    body: multipartBody,
  });
  if (!sendResp.ok) {
    const txt = await sendResp.text();
    throw new Error(`Step 2 (POST /send) failed: ${sendResp.status} ${txt}`);
  }

  return { file_upload_id: fileUploadId, filename };
}

async function main() {
  console.error(`Uploading ${imagePath} to page ${pageId}...`);
  const { file_upload_id, filename } = await uploadFile(imagePath);
  console.error(`File upload created: ${file_upload_id}`);

  // Step 3: attach to the page's "photo" property
  await notion.pages.update({
    page_id: pageId,
    properties: {
      photo: {
        files: [
          { name: filename, file_upload: { id: file_upload_id } },
        ],
      },
    },
  });
  console.error(`Photo attached to page ${pageId} (property: photo)`);
  console.log(JSON.stringify({ status: 'success', page_id: pageId, file_upload_id, filename }));
}

main().catch(e => { console.error('ERROR:', e.message); process.exit(1); });