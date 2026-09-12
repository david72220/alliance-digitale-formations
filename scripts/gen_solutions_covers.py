#!/usr/bin/env python3
"""Génère les 8 visuels de cartes pour la page /nos-solutions (style Minobia).

Over-the-shoulder photoréaliste, personne de dos/profil tenant un appareil
avec interface lumineuse. Ambiance sombre bleutée charte Alliance.
Pas de texte lisible sur les visuels (nom/tagline en HTML sous la carte).

Usage: python3 gen_solutions_covers.py [--only slug]
Sortie: /tmp/ad-solutions-gen/<slug>.png  → copié en WebP par le script appelant.
Seeds déterministes: 4200 + i (rejouable).
"""
import json
import sys
import time
import urllib.request
from pathlib import Path

SERVER = "http://127.0.0.1:8188"
COMFY_OUTPUT = Path.home() / "Documents/comfy/ComfyUI/output"
OUTPUT_DIR = Path("/tmp/ad-solutions-gen")
OUTPUT_DIR.mkdir(exist_ok=True)

CHECKPOINT = "sd_xl_base_1.0.safetensors"

STYLE = (
    "photorealistic over-the-shoulder shot, person seen from behind, "
    "modern small business setting, dark blue ambient background (#070d18 tones), "
    "glowing blue interface light on the device screen, cinematic soft lighting, "
    "shallow depth of field, 35mm corporate photography, highly detailed, sharp focus"
)

NEGATIVE = (
    "face visible, frontal portrait, readable text, letters, words, writing, "
    "watermark, signature, blurry, low quality, deformed hands, extra fingers, "
    "control room, network operations center, wall of monitors, stock market, "
    "trading floor, newsroom, server room, illustration, cartoon, flat design"
)

# 8 cartes — chaque prompt = un produit, une scène métier distincte.
IMAGES = [
    {
        "slug": "compte-perso",
        "seed": 4201,
        "prompt": f"a woman seen from behind sitting at a kitchen table, holding a smartphone photographing a paper shopping receipt lying on the table, beside her a tablet screen glowing with a personal budget dashboard made of colorful envelope cards and charts, groceries and a coffee cup on the table, {STYLE}",
    },
    {
        "slug": "site-vitrine",
        "seed": 4202,
        "prompt": f"a craftsman plumber in dark workwear seen from behind standing in his workshop with copper pipes on shelves, holding a smartphone showing a clean professional website homepage with a hero section and service cards, {STYLE}",
    },
    {
        "slug": "site-capture",
        "seed": 4203,
        "prompt": f"a roofer in safety harness and work clothes seen from behind on a residential rooftop at golden hour, holding a smartphone showing a booking calendar interface with appointment slots glowing blue, houses and rooftops in the background, {STYLE}",
    },
    {
        "slug": "standardiste-ia",
        "seed": 4204,
        "prompt": f"a small business owner seen from behind behind the counter of a hardware shop in the evening, holding a smartphone showing a chat assistant conversation with message bubbles and a phone number highlighted, tools on shelves in the background, {STYLE}",
    },
    {
        "slug": "formations-ia",
        "seed": 4205,
        "prompt": f"a trainer seen from behind standing in front of a small training room with four adults sitting at individual desks each with a laptop, hands raised taking notes, bright classroom atmosphere with subtle blue accents, whiteboard with simple abstract diagrams, {STYLE}",
    },
    {
        "slug": "second-souffle",
        "seed": 4206,
        "prompt": f"a woman cafe owner seen from behind at the counter of a cozy french cafe in the morning light, holding a smartphone showing glowing blue email envelope icons flying toward small customer avatar cards, coffee machine and pastries in the background, {STYLE}",
    },
    {
        "slug": "presentia",
        "seed": 4207,
        "prompt": f"a hair salon owner seen from behind holding a smartphone showing a calendar notification with reminder bells and appointment confirmation cards glowing, beauty salon interior with mirror and chairs in the background, {STYLE}",
    },
    {
        "slug": "reputia",
        "seed": 4208,
        "prompt": f"a restaurant owner seen from behind holding a smartphone showing a review interface with five golden stars rating cards and a rising satisfaction chart, warm restaurant dining room with set tables in the background, {STYLE}",
    },
]


def submit_workflow(filename_prefix, seed, prompt, negative, width=1024, height=768, steps=30, cfg=7.0):
    workflow = {
        "3": {
            "class_type": "KSampler",
            "inputs": {
                "seed": seed, "steps": steps, "cfg": cfg,
                "sampler_name": "dpmpp_2m", "scheduler": "karras", "denoise": 1.0,
                "model": ["4", 0], "positive": ["6", 0], "negative": ["7", 0],
                "latent_image": ["5", 0],
            },
        },
        "4": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": CHECKPOINT}},
        "5": {"class_type": "EmptyLatentImage", "inputs": {"width": width, "height": height, "batch_size": 1}},
        "6": {"class_type": "CLIPTextEncode", "inputs": {"text": prompt, "clip": ["4", 1]}},
        "7": {"class_type": "CLIPTextEncode", "inputs": {"text": negative, "clip": ["4", 1]}},
        "8": {"class_type": "VAEDecode", "inputs": {"samples": ["3", 0], "vae": ["4", 2]}},
        "9": {"class_type": "SaveImage", "inputs": {"filename_prefix": filename_prefix, "images": ["8", 0]}},
    }
    payload = json.dumps({"prompt": workflow, "client_id": "ad-solutions"}).encode()
    req = urllib.request.Request(
        f"{SERVER}/prompt", data=payload,
        headers={"Content-Type": "application/json"}, method="POST",
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read().decode())["prompt_id"]


def wait_for_completion(prompt_id, timeout=900):
    start = time.time()
    while time.time() - start < timeout:
        try:
            req = urllib.request.Request(f"{SERVER}/history/{prompt_id}")
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read().decode())
                entry = data.get(prompt_id, {})
                if entry.get("status", {}).get("completed"):
                    return entry
                if entry.get("status", {}).get("status_str") == "error":
                    return None
        except urllib.error.HTTPError:
            pass
        time.sleep(3)
    return None


def find_output(prefix):
    candidates = sorted(
        COMFY_OUTPUT.glob(f"{prefix}_*.png"),
        key=lambda p: p.stat().st_mtime, reverse=True,
    )
    return candidates[0] if candidates else None


def main():
    only = set()
    if "--only" in sys.argv:
        only = set(sys.argv[sys.argv.index("--only") + 1].split(","))
    results = []
    for img in IMAGES:
        if only and img["slug"] not in only:
            continue
        prefix = f"sol_{img['slug']}"
        print(f"[{img['slug']}] submission seed={img['seed']}...", flush=True)
        pid = submit_workflow(prefix, img["seed"], img["prompt"], NEGATIVE)
        result = wait_for_completion(pid)
        out = find_output(prefix)
        if result and out:
            target = OUTPUT_DIR / f"{img['slug']}.png"
            out.rename(target)
            results.append({"slug": img["slug"], "path": str(target), "ok": True})
            print(f"[{img['slug']}] OK -> {target}", flush=True)
        else:
            results.append({"slug": img["slug"], "ok": False})
            print(f"[{img['slug']}] ÉCHEC", flush=True)
        time.sleep(2)
    ok = sum(1 for r in results if r["ok"])
    print(json.dumps({"total": len(results), "ok": ok, "results": results}, ensure_ascii=False))


if __name__ == "__main__":
    main()