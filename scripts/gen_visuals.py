#!/usr/bin/env python3
"""Generate branded SVG-style visuals for resources + formations via PIL."""
import json
import os
import re
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public'
RES_JSON = PUBLIC / 'ressources' / 'resources.json'

W, H = 1200, 630

# Brand
ALLIANCE_DARK = (7, 13, 24)
ALLIANCE_DARK2 = (11, 17, 32)
ALLIANCE_BLUE = (59, 151, 211)
ALLIANCE_BLUE_LIGHT = (30, 154, 215)
ALLIANCE_ORANGE = (158, 33, 20)
WHITE = (255, 255, 255)

# Module → (accent_color, icon_symbol, label_short)
MODULE_THEMES = {
    "Sécurité des données": ((220, 38, 38), "▣", "SÉCURITÉ"),
    "Automatisation": ((59, 151, 211), "⚡", "AUTOMATISATION"),
    "IA au quotidien": ((96, 165, 250), "✦", "IA AU QUOTIDIEN"),
    "Automatisation commerciale": ((251, 146, 60), "◇", "COMMERCIAL"),
    "Automatisation financière": ((52, 211, 153), "€", "FINANCE"),
    "Stratégie et pilotage": ((167, 139, 250), "◎", "STRATÉGIE"),
    "IA créative": ((236, 72, 153), "✺", "CRÉATIF"),
    "Relation client": ((45, 212, 191), "❋", "CLIENT"),
    "RH et management": ((251, 191, 36), "◍", "RH"),
    "_formation": ((59, 151, 211), "◆", "FORMATION"),
    "_default": ((59, 151, 211), "✦", "RESSOURCE"),
}

# macOS fonts
FONT_BOLD = "/System/Library/Fonts/HelveticaNeue.ttc"
FONT_REG = "/System/Library/Fonts/HelveticaNeue.ttc"
FONT_SYM = "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"


def get_font(path, size, idx=0):
    try:
        return ImageFont.truetype(path, size, index=idx)
    except Exception:
        return ImageFont.load_default(size)


def make_gradient(size, c1, c2, direction="diag"):
    w, h = size
    img = Image.new("RGB", size, c1)
    draw = ImageDraw.Draw(img)
    if direction == "diag":
        steps = max(w, h)
        for i in range(steps):
            t = i / steps
            r = int(c1[0] * (1 - t) + c2[0] * t)
            g = int(c1[1] * (1 - t) + c2[1] * t)
            b = int(c1[2] * (1 - t) + c2[2] * t)
            draw.line([(0, i * h // steps), (w, i * h // steps)], fill=(r, g, b))
    return img


def radial_glow(size, center, radius, color, opacity=120):
    w, h = size
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    cx, cy = center
    steps = 40
    for i in range(steps, 0, -1):
        t = i / steps
        r = int(radius * t)
        alpha = int(opacity * (1 - t) ** 1.5)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(*color, alpha))
    return overlay.filter(ImageFilter.GaussianBlur(20))


def wrap_text(draw, text, font, max_width):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        test = (cur + " " + w).strip()
        bbox = draw.textbbox((0, 0), test, font=font)
        if bbox[2] - bbox[0] <= max_width:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def fit_text(draw, text, font_path, max_width, max_lines, max_size=68, min_size=36):
    size = max_size
    while size >= min_size:
        font = get_font(font_path, size)
        lines = wrap_text(draw, text, font, max_width)
        if len(lines) <= max_lines:
            return font, lines, size
        size -= 4
    font = get_font(font_path, min_size)
    return font, wrap_text(draw, text, font, max_width)[:max_lines], min_size


def render_card(title: str, module: str, out_path: Path):
    accent, symbol, label = MODULE_THEMES.get(module, MODULE_THEMES["_default"])
    img = make_gradient((W, H), ALLIANCE_DARK, ALLIANCE_DARK2)
    img = img.convert("RGBA")

    # Glows
    img.alpha_composite(radial_glow((W, H), (W - 200, 150), 500, accent, opacity=80))
    img.alpha_composite(radial_glow((W, H), (180, H - 100), 400, ALLIANCE_BLUE, opacity=50))

    draw = ImageDraw.Draw(img)

    # Border
    draw.rounded_rectangle([40, 40, W - 40, H - 40], radius=24, outline=(255, 255, 255, 30), width=1)

    # Big background symbol
    sym_font = get_font(FONT_SYM, 420)
    try:
        bbox = draw.textbbox((0, 0), symbol, font=sym_font)
        sw = bbox[2] - bbox[0]
        sh = bbox[3] - bbox[1]
        sym_layer = Image.new("RGBA", (sw + 100, sh + 100), (0, 0, 0, 0))
        sdraw = ImageDraw.Draw(sym_layer)
        sdraw.text((50, 50), symbol, font=sym_font, fill=(*accent, 35))
        img.alpha_composite(sym_layer, (W - sw - 120, 100))
    except Exception:
        pass

    # Module pill
    pill_font = get_font(FONT_BOLD, 18, idx=1)
    pill_text = label
    bbox = draw.textbbox((0, 0), pill_text, font=pill_font)
    pw = bbox[2] - bbox[0] + 40
    ph = 38
    px, py = 90, 100
    draw.rounded_rectangle([px, py, px + pw, py + ph], radius=19, fill=(*accent, 60), outline=(*accent, 220), width=2)
    draw.text((px + 20, py + 8), pill_text, font=pill_font, fill=WHITE)

    # Title (wrap, fit)
    title_clean = re.sub(r"\s+", " ", title).strip()
    title_font, lines, size = fit_text(draw, title_clean, FONT_BOLD, W - 180, 4, max_size=68, min_size=40)
    title_font = get_font(FONT_BOLD, size, idx=1)
    ty = 200
    for line in lines:
        draw.text((90, ty), line, font=title_font, fill=WHITE)
        ty += int(size * 1.15)

    # Footer brand
    brand_font = get_font(FONT_BOLD, 22, idx=1)
    sub_font = get_font(FONT_REG, 16)
    draw.text((90, H - 110), "Alliance Digitale", font=brand_font, fill=WHITE)
    draw.text((90, H - 80), "Accompagnement IA · Formations · Sarthe", font=sub_font, fill=(255, 255, 255, 153))

    # AD circle
    cx, cy, r = W - 110, H - 110, 42
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(*accent, 80), outline=WHITE, width=2)
    ad_font = get_font(FONT_BOLD, 28, idx=1)
    bbox = draw.textbbox((0, 0), "AD", font=ad_font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text((cx - tw // 2, cy - th // 2 - 4), "AD", font=ad_font, fill=WHITE)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    # Save JPG (replaces cover.jpg) + WebP
    img_rgb = img.convert("RGB")
    img_rgb.save(out_path, "JPEG", quality=85, optimize=True, progressive=True)
    webp_path = out_path.with_suffix(".webp")
    img_rgb.save(webp_path, "WEBP", quality=85, method=6)
    return out_path.stat().st_size, webp_path.stat().st_size


def main():
    resources = json.loads(RES_JSON.read_text())
    print(f"{len(resources)} ressources")

    total_jpg = total_webp = 0
    for r in resources:
        slug = r["slug"]
        title = r["title"]
        module = r.get("module", "_default")
        out = PUBLIC / "ressources" / slug / "cover.jpg"
        jpg, webp = render_card(title, module, out)
        total_jpg += jpg
        total_webp += webp
        print(f"  {slug} → jpg {jpg//1024}KB / webp {webp//1024}KB")

    # Formations (3 in mock + any other slugs)
    formations = [
        ("automatisation-taches-repetitives-pme", "Automatiser les tâches répétitives en PME"),
        ("ia-productivite-quotidienne-pme", "IA et productivité au quotidien"),
        ("securite-donnees-conformite-pme", "Sécurité des données et conformité"),
    ]
    print(f"\n{len(formations)} formations")
    formations_dir = PUBLIC / "images" / "formations"
    for slug, title in formations:
        # Theme by slug heuristic
        if "securite" in slug:
            module = "Sécurité des données"
        elif "automatisation" in slug:
            module = "Automatisation"
        else:
            module = "IA au quotidien"
        out = formations_dir / f"{slug}.jpg"
        jpg, webp = render_card(title, module, out)
        total_jpg += jpg
        total_webp += webp
        print(f"  {slug} → jpg {jpg//1024}KB / webp {webp//1024}KB")

    print(f"\nTotal: jpg {total_jpg//1024}KB / webp {total_webp//1024}KB")


if __name__ == "__main__":
    main()
