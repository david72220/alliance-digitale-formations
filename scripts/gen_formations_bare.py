#!/usr/bin/env python3
"""Re-render formation heroes as bare Pexels photos (no overlay, no text, no brand)."""
import json
import re
import urllib.parse
import urllib.request
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public'
CACHE_DIR = ROOT / '.pexels-cache'
CACHE_DIR.mkdir(exist_ok=True)

W, H = 1200, 630
UA = "Mozilla/5.0 alliance-digitale-fetch/1.0"

FORMATIONS = [
    ("automatisation-taches-repetitives-pme", "office productivity laptop"),
    ("ia-productivite-quotidienne-pme", "modern office work computer"),
    ("securite-donnees-conformite-pme", "cybersecurity business office"),
]


def read_key():
    for l in open(ROOT / '.env'):
        m = re.match(r'^PEXELS_API_KEY\s*=\s*(.+?)\s*$', l)
        if m:
            return m.group(1).strip().strip('"').strip("'")
    raise SystemExit("PEXELS_API_KEY missing")


def search(q, key):
    url = f"https://api.pexels.com/v1/search?query={urllib.parse.quote(q)}&orientation=landscape&size=large&per_page=5"
    req = urllib.request.Request(url, headers={"Authorization": key, "User-Agent": UA})
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read())


def download(url, dest):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        dest.write_bytes(r.read())


def get_photo(slug, query, key):
    cache = CACHE_DIR / f"{slug}.jpg"
    if cache.exists():
        return cache
    data = search(query, key)
    if not data.get("photos"):
        raise RuntimeError(f"no result {query!r}")
    p = data["photos"][0]
    download(p["src"]["large2x"], cache)
    return cache


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


def main():
    key = read_key()
    out_dir = PUBLIC / 'images' / 'formations'
    out_dir.mkdir(parents=True, exist_ok=True)
    for slug, query in FORMATIONS:
        photo = get_photo(slug, query, key)
        img = Image.open(photo).convert("RGB")
        img = crop_cover(img, W, H)
        jpg = out_dir / f"{slug}.jpg"
        webp = out_dir / f"{slug}.webp"
        img.save(jpg, "JPEG", quality=85, optimize=True, progressive=True)
        img.save(webp, "WEBP", quality=85, method=6)
        print(f"  {slug} → {jpg.stat().st_size//1024}KB jpg / {webp.stat().st_size//1024}KB webp")


if __name__ == "__main__":
    main()
