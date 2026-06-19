#!/usr/bin/env python3
"""For each active formation in Notion: generate bare Pexels photo, upload to
public/images/formations/<page-id>.jpg, then PATCH Notion page 'photo' property
to point at the deployed Vercel URL.

Run AFTER images are deployed (so URLs return 200). Two-step:
  1) python3 scripts/upload_formation_photos.py --generate
  2) git add/commit/push + vercel deploy + alias
  3) python3 scripts/upload_formation_photos.py --patch
"""
import argparse
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public'
CACHE_DIR = ROOT / '.pexels-cache'
CACHE_DIR.mkdir(exist_ok=True)
MAPPING_PATH = ROOT / '.formation-photos.json'

VERCEL_BASE = "https://www.alliance-digitale.fr"
W, H = 1200, 630
UA = "Mozilla/5.0 alliance-digitale-fetch/1.0"

# Title keyword → Pexels query (EN)
THEME_RULES = [
    (r"\brgpd|\bsécurit|\bconformit|\bdonnées|gouvernance", "cybersecurity office laptop"),
    (r"\bprompt|\bproductivit", "modern office work computer"),
    (r"\bautomatis|\bworkflow|\bn8n", "office productivity laptop"),
    (r"\bllm|\blocal|\bdéploiement", "server hardware tech"),
    (r"\bclaude|\bchatgpt|\bgpt", "artificial intelligence laptop"),
    (r"\badministrati|\bbureau|\bcompta", "modern office workspace"),
    (r"\bd[ée]couvr|\bd[eé]butant|\bintroduction|\bbase|\bfondamenta", "team training office"),
    (r"\bcommerc|\bsales|\bvente|\bprospection", "business meeting team"),
    (r"\brecrut|\brh|\bressources humaines", "interview office hiring"),
    (r"\bvisuel|\bcréa|\bdesign|\bgraphique", "creative design tablet"),
    (r"\bréseau|\bsocial media", "social media phone creator"),
    (r"\bréunion|\bmeeting", "business meeting team"),
    (r"\bemail|\bcourriel", "writing email laptop"),
]
DEFAULT_QUERY = "professional office team"

# Per-UUID overrides to avoid duplicate hero photos when multiple formations
# share the same theme rule.
PAGE_QUERY_OVERRIDES = {
    "38296280-38de-81f2-986f-eba275b67046": "data privacy compliance audit",  # 8. RGPD gouvernance
    "38296280-38de-81cb-a9bd-efd68ce4a9ea": "server hardware data center",     # 7. LLM local
    "38296280-38de-81c4-bd78-c6c59e2c70e6": "administrative paperwork desk",   # 4. productivité admin
    "38296280-38de-8178-808d-e4657977245b": "hands typing keyboard close",     # 2. Prompts
    "38296280-38de-8158-8a65-fb1d17e78f4b": "marketing whiteboard brainstorm", # 3. comm marketing
    "37f96280-38de-80c8-b4c2-c3625f194d7b": "team training workshop laptop",   # 9. IA Express Sarthe
    "37d96280-38de-808a-b60e-ccc844577b67": "freelancer laptop cafe",          # A. autoentrepreneurs
}


def read_env(key):
    for l in open(ROOT / '.env'):
        m = re.match(rf'^{re.escape(key)}\s*=\s*(.+?)\s*$', l)
        if m:
            return m.group(1).strip().strip('"').strip("'")
    raise SystemExit(f"{key} missing in .env")


def query_for_title(title: str) -> str:
    t = title.lower()
    for pat, q in THEME_RULES:
        if re.search(pat, t):
            return q
    return DEFAULT_QUERY


def fetch_formations():
    token = read_env('NOTION_TOKEN')
    db = read_env('NOTION_FORMATIONS_DB_ID')
    req = urllib.request.Request(
        f"https://api.notion.com/v1/databases/{db}/query",
        data=b'{}',
        headers={
            "Authorization": f"Bearer {token}",
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=20) as r:
        d = json.loads(r.read())
    formations = []
    for p in d.get('results', []):
        props = p['properties']
        title_arr = props.get('Nom', {}).get('title', [])
        title = ''.join(x.get('plain_text', '') for x in title_arr).strip()
        active = props.get('Active', {}).get('checkbox', False)
        if not title:
            continue
        formations.append({
            'id': p['id'],
            'title': title,
            'active': active,
        })
    return formations, token


def pexels_search(query, key):
    url = f"https://api.pexels.com/v1/search?query={urllib.parse.quote(query)}&orientation=landscape&size=large&per_page=3"
    req = urllib.request.Request(url, headers={"Authorization": key, "User-Agent": UA})
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read())


def download(url, dest):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        dest.write_bytes(r.read())


def crop_cover(img, w, h):
    sw, sh = img.size
    sr = sw / sh
    tr = w / h
    if sr > tr:
        nw = int(sh * tr)
        left = (sw - nw) // 2
        img = img.crop((left, 0, left + nw, sh))
    else:
        nh = int(sw / tr)
        top = (sh - nh) // 2
        img = img.crop((0, top, sw, top + nh))
    return img.resize((w, h), Image.LANCZOS)


def generate():
    formations, _ = fetch_formations()
    print(f"{len(formations)} formations (active+inactive)")
    pex = read_env('PEXELS_API_KEY')
    out_dir = PUBLIC / 'images' / 'formations'
    out_dir.mkdir(parents=True, exist_ok=True)
    mapping = {}
    if MAPPING_PATH.exists():
        mapping = json.loads(MAPPING_PATH.read_text())

    for f in formations:
        page_id = f['id']
        fid_short = page_id.replace('-', '')
        cache_jpg = CACHE_DIR / f"formation-{fid_short}.jpg"
        cache_meta = CACHE_DIR / f"formation-{fid_short}.json"
        query = PAGE_QUERY_OVERRIDES.get(page_id) or query_for_title(f['title'])

        if not cache_jpg.exists() or not cache_meta.exists():
            data = pexels_search(query, pex)
            if not data.get('photos'):
                print(f"  ⚠ no result for {f['title']!r} (query={query!r})")
                continue
            p = data['photos'][0]
            download(p['src']['large2x'], cache_jpg)
            cache_meta.write_text(json.dumps({
                'pexels_id': p['id'],
                'photographer': p['photographer'],
                'photographer_url': p['photographer_url'],
                'pexels_url': p['url'],
                'alt': p.get('alt', ''),
                'query': query,
                'title': f['title'],
            }, ensure_ascii=False, indent=2))

        img = Image.open(cache_jpg).convert("RGB")
        img = crop_cover(img, W, H)
        out_jpg = out_dir / f"{page_id}.jpg"
        out_webp = out_dir / f"{page_id}.webp"
        img.save(out_jpg, "JPEG", quality=85, optimize=True, progressive=True)
        img.save(out_webp, "WEBP", quality=85, method=6)
        meta = json.loads(cache_meta.read_text())
        mapping[page_id] = {
            'title': f['title'],
            'active': f['active'],
            'jpg_path': f"/images/formations/{page_id}.jpg",
            'jpg_url': f"{VERCEL_BASE}/images/formations/{page_id}.jpg",
            'photographer': meta['photographer'],
            'pexels_url': meta['pexels_url'],
            'query': meta['query'],
        }
        print(f"  ✓ {f['title'][:50]:<52} → {out_jpg.stat().st_size//1024}KB [{meta['photographer']}]")
        time.sleep(0.15)

    MAPPING_PATH.write_text(json.dumps(mapping, ensure_ascii=False, indent=2))
    print(f"\nmapping: {MAPPING_PATH.relative_to(ROOT)}")
    print("\nNext: commit + push, then run with --patch")


def verify_url(url):
    try:
        req = urllib.request.Request(url, method='HEAD', headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.status == 200
    except Exception:
        return False


def patch_notion(dry=False):
    token = read_env('NOTION_TOKEN')
    if not MAPPING_PATH.exists():
        raise SystemExit("Run --generate first")
    mapping = json.loads(MAPPING_PATH.read_text())
    print(f"{len(mapping)} pages to PATCH")
    ok = fail = 0
    for page_id, info in mapping.items():
        if not verify_url(info['jpg_url']):
            print(f"  ✗ URL not 200: {info['jpg_url']}")
            fail += 1
            continue
        body = json.dumps({
            "properties": {
                "photo": {
                    "files": [
                        {
                            "name": f"{info['title'][:60]}.jpg",
                            "type": "external",
                            "external": {"url": info['jpg_url']},
                        }
                    ]
                }
            }
        }).encode()
        if dry:
            print(f"  DRY {page_id} ← {info['jpg_url']}")
            ok += 1
            continue
        req = urllib.request.Request(
            f"https://api.notion.com/v1/pages/{page_id}",
            data=body,
            headers={
                "Authorization": f"Bearer {token}",
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json",
            },
            method="PATCH",
        )
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                _ = r.read()
            print(f"  ✓ {info['title'][:50]:<52} ← {info['jpg_url'].split('/')[-1]}")
            ok += 1
        except urllib.error.HTTPError as e:
            print(f"  ✗ {info['title']}: HTTP {e.code} {e.read().decode()[:120]}")
            fail += 1
        time.sleep(0.35)  # Notion rate limit ~3 req/s
    print(f"\n{ok} ok, {fail} fail")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--generate', action='store_true')
    ap.add_argument('--patch', action='store_true')
    ap.add_argument('--dry', action='store_true')
    args = ap.parse_args()
    if args.generate:
        generate()
    elif args.patch:
        patch_notion(dry=args.dry)
    else:
        ap.print_help()


if __name__ == "__main__":
    main()
