#!/usr/bin/env python3
"""Fetch Pexels photos per resource/formation + composite with brand overlay.

Style B: photo background + dark gradient overlay + module pill + title burned-in + AD logo.
"""
import json
import os
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public'
RES_JSON = PUBLIC / 'ressources' / 'resources.json'
CACHE_DIR = ROOT / '.pexels-cache'
CACHE_DIR.mkdir(exist_ok=True)
CREDITS_JSON = PUBLIC / 'ressources' / 'photo-credits.json'

W, H = 1200, 630
UA = "Mozilla/5.0 alliance-digitale-fetch/1.0"

ALLIANCE_DARK = (7, 13, 24)
WHITE = (255, 255, 255)

MODULE_THEMES = {
    "Sécurité des données": ((220, 38, 38), "SÉCURITÉ"),
    "Automatisation": ((59, 151, 211), "AUTOMATISATION"),
    "IA au quotidien": ((96, 165, 250), "IA AU QUOTIDIEN"),
    "Automatisation commerciale": ((251, 146, 60), "COMMERCIAL"),
    "Automatisation financière": ((52, 211, 153), "FINANCE"),
    "Stratégie et pilotage": ((167, 139, 250), "STRATÉGIE"),
    "IA créative": ((236, 72, 153), "CRÉATIF"),
    "Relation client": ((45, 212, 191), "CLIENT"),
    "RH et management": ((251, 191, 36), "RH"),
    "_formation": ((59, 151, 211), "FORMATION"),
    "_default": ((59, 151, 211), "RESSOURCE"),
}

# Slug → Pexels query (EN, 2-3 words for best results)
SLUG_QUERIES = {
    # Sécurité
    "rgpd-pme-10-points-controle": "gdpr compliance laptop",
    "bases-legales-rgpd-pme": "privacy law book",
    "double-authentification-deploiement": "two factor authentication phone",
    "droits-acces-outils-collaboratifs": "team collaboration office",
    "fuite-de-donnees-que-faire": "cybersecurity hacker code",
    "mots-de-passe-politique-outils": "password security keyboard",
    "registre-traitements-30-minutes": "documents compliance desk",
    "securiser-emails-pieces-jointes": "email security laptop",
    # Automatisation
    "automatisation-cas-pratique-complet": "business workflow team",
    "automatisation-connecteurs-n8n": "network connection nodes",
    "automatisation-documenter-workflow": "documentation writing notebook",
    "automatisation-identifier-cartographier-taches": "task planning whiteboard",
    "automatisation-notifications-alertes": "smartphone notification alert",
    "automatisation-relances-clients": "email customer phone",
    "automatisation-saisie-export-donnees": "spreadsheet data laptop",
    "automatisation-securiser-maintenir-workflows": "server monitoring screen",
    # IA quotidien
    "chatgpt-sans-exposer-donnees": "chatgpt artificial intelligence",
    "ia-analyser-fichier-excel": "spreadsheet data analysis",
    "ia-preparer-reunion": "business meeting team",
    "ia-prospection-commerciale": "sales call laptop",
    "ia-rediger-emails-documents": "writing email laptop",
    "rediger-prompt-efficace": "typing keyboard close",
    # Commercial
    "automatisation-devis-reponses-clients": "business contract handshake",
    # Finance
    "automatisation-facturation-relances-impayes": "invoice money calculator",
    # Stratégie
    "evaluer-maturite-ia-prioriser-projets": "business growth chart strategy",
    # Créatif
    "ia-contenu-reseaux-sociaux": "social media phone creator",
    "ia-creer-visuels-prospectus": "graphic design tablet",
    # Relation client
    "ia-devis-bat-professionnels": "blueprint architecture design",
    "ia-repondre-avis-clients": "customer review stars",
    # RH
    "ia-recrutement-pme": "job interview office",
    # Formations
    "automatisation-taches-repetitives-pme": "office productivity laptop",
    "ia-productivite-quotidienne-pme": "modern office work computer",
    "securite-donnees-conformite-pme": "cybersecurity business office",
}

FONT_BOLD = "/System/Library/Fonts/HelveticaNeue.ttc"


def font(size, idx=1):
    try:
        return ImageFont.truetype(FONT_BOLD, size, index=idx)
    except Exception:
        return ImageFont.load_default(size)


def read_env_key():
    for line in open(ROOT / '.env'):
        m = re.match(r'^PEXELS_API_KEY\s*=\s*(.+?)\s*$', line)
        if m:
            return m.group(1).strip().strip('"').strip("'")
    raise SystemExit("PEXELS_API_KEY missing in .env")


def search_pexels(query, key):
    url = f"https://api.pexels.com/v1/search?query={urllib.parse.quote(query)}&orientation=landscape&size=large&per_page=5"
    req = urllib.request.Request(url, headers={"Authorization": key, "User-Agent": UA})
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read())


def download(url, dest):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        dest.write_bytes(r.read())


def get_photo(slug, query, key):
    cache = CACHE_DIR / f"{slug}.jpg"
    meta = CACHE_DIR / f"{slug}.json"
    if cache.exists() and meta.exists():
        return cache, json.loads(meta.read_text())
    data = search_pexels(query, key)
    if not data.get("photos"):
        raise RuntimeError(f"no result for {query!r}")
    p = data["photos"][0]
    download(p["src"]["large2x"], cache)
    info = {
        "id": p["id"],
        "photographer": p["photographer"],
        "photographer_url": p["photographer_url"],
        "pexels_url": p["url"],
        "alt": p.get("alt", ""),
        "query": query,
    }
    meta.write_text(json.dumps(info, ensure_ascii=False, indent=2))
    return cache, info


def crop_cover(img, target_w, target_h):
    src_w, src_h = img.size
    src_ratio = src_w / src_h
    tgt_ratio = target_w / target_h
    if src_ratio > tgt_ratio:
        new_w = int(src_h * tgt_ratio)
        left = (src_w - new_w) // 2
        img = img.crop((left, 0, left + new_w, src_h))
    else:
        new_h = int(src_w / tgt_ratio)
        top = (src_h - new_h) // 2
        img = img.crop((0, top, src_w, top + new_h))
    return img.resize((target_w, target_h), Image.LANCZOS)


def wrap_text(draw, text, fnt, max_width):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        test = (cur + " " + w).strip()
        if draw.textbbox((0, 0), test, font=fnt)[2] <= max_width:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def fit_text(draw, text, max_width, max_lines, max_size=64, min_size=36):
    size = max_size
    while size >= min_size:
        f = font(size)
        lines = wrap_text(draw, text, f, max_width)
        if len(lines) <= max_lines:
            return f, lines, size
        size -= 4
    return font(min_size), wrap_text(draw, text, font(min_size), max_width)[:max_lines], min_size


def render(photo_path, title, module, out_path):
    accent, label = MODULE_THEMES.get(module, MODULE_THEMES["_default"])

    bg = Image.open(photo_path).convert("RGB")
    bg = crop_cover(bg, W, H)
    bg = bg.filter(ImageFilter.GaussianBlur(0.6))
    canvas = bg.convert("RGBA")

    # Dark gradient overlay: stronger bottom-left, lighter top-right
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    for y in range(H):
        # left → right: 70% → 30% alpha
        for slice_x_factor in [(0, 0.5, 180), (0.5, 1.0, 90)]:
            pass
    # Simpler: linear left-right then add bottom darken
    grad = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(grad)
    for x in range(W):
        t = x / W
        alpha = int(190 * (1 - t) + 80 * t)
        gdraw.line([(x, 0), (x, H)], fill=(0, 0, 0, alpha))
    canvas.alpha_composite(grad)
    # Bottom-up darken band
    bot = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    bdraw = ImageDraw.Draw(bot)
    for y in range(H):
        t = y / H
        a = int(40 + 100 * (t ** 1.5))
        bdraw.line([(0, y), (W, y)], fill=(*ALLIANCE_DARK, a))
    canvas.alpha_composite(bot)

    draw = ImageDraw.Draw(canvas)

    # Border subtle
    draw.rounded_rectangle([20, 20, W - 20, H - 20], radius=18, outline=(255, 255, 255, 40), width=1)

    # Pill
    pill_font = font(18)
    bbox = draw.textbbox((0, 0), label, font=pill_font)
    pw = bbox[2] - bbox[0] + 36
    ph = 38
    px, py = 70, 80
    draw.rounded_rectangle([px, py, px + pw, py + ph], radius=19, fill=(*accent, 230), outline=(255, 255, 255, 220), width=1)
    draw.text((px + 18, py + 8), label, font=pill_font, fill=WHITE)

    # Title
    title_clean = re.sub(r"\s+", " ", title).strip()
    title_font, lines, size = fit_text(draw, title_clean, W - 200, 4, max_size=60, min_size=36)
    title_font = font(size)
    ty = 200
    for line in lines:
        # Shadow
        draw.text((72, ty + 2), line, font=title_font, fill=(0, 0, 0, 200))
        draw.text((70, ty), line, font=title_font, fill=WHITE)
        ty += int(size * 1.15)

    # Footer brand
    draw.text((70, H - 110), "Alliance Digitale", font=font(22), fill=WHITE)
    draw.text((70, H - 80), "Accompagnement IA · Formations · Sarthe", font=font(15, idx=0), fill=(255, 255, 255, 180))

    # AD circle
    cx, cy, r = W - 100, H - 100, 42
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(*accent, 220), outline=WHITE, width=2)
    ad_font = font(26)
    bbox = draw.textbbox((0, 0), "AD", font=ad_font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text((cx - tw // 2, cy - th // 2 - 4), "AD", font=ad_font, fill=WHITE)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    rgb = canvas.convert("RGB")
    rgb.save(out_path, "JPEG", quality=85, optimize=True, progressive=True)
    rgb.save(out_path.with_suffix(".webp"), "WEBP", quality=85, method=6)
    return out_path.stat().st_size


def main():
    key = read_env_key()
    resources = json.loads(RES_JSON.read_text())
    credits = {}

    formations = [
        ("automatisation-taches-repetitives-pme", "Automatiser les tâches répétitives en PME", "Automatisation"),
        ("ia-productivite-quotidienne-pme", "IA et productivité au quotidien", "IA au quotidien"),
        ("securite-donnees-conformite-pme", "Sécurité des données et conformité", "Sécurité des données"),
    ]

    items = []
    for r in resources:
        items.append((r["slug"], r["title"], r.get("module", "_default"), PUBLIC / "ressources" / r["slug"] / "cover.jpg"))
    for slug, title, module in formations:
        items.append((slug, title, module, PUBLIC / "images" / "formations" / f"{slug}.jpg"))

    print(f"{len(items)} items to fetch/render")
    for i, (slug, title, module, out) in enumerate(items, 1):
        query = SLUG_QUERIES.get(slug, "office business")
        try:
            photo, info = get_photo(slug, query, key)
            sz = render(photo, title, module, out)
            credits[slug] = info
            print(f"  [{i:>2}/{len(items)}] {slug:<55} → {sz//1024}KB ({info['photographer']})")
        except Exception as e:
            print(f"  [{i:>2}/{len(items)}] {slug} FAIL: {e}")
        time.sleep(0.15)  # be gentle on API

    CREDITS_JSON.write_text(json.dumps(credits, ensure_ascii=False, indent=2))
    print(f"\nCredits saved: {CREDITS_JSON.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
