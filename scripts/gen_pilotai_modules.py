#!/usr/bin/env python3
"""Génère les 3 visuels des modules PilotAI (Social / Marketing / Commercial).

Même pipeline que gen_solutions_covers.py — over-the-shoulder, ambiance sombre
bleutée Alliance, pas de texte lisible. Seeds déterministes 4501-4503 (rejouable).
Sortie: /tmp/pilotai-gen/<slug>.png
"""
import json
import time
import urllib.request
from pathlib import Path

SERVER = "http://127.0.0.1:8188"
COMFY_OUTPUT = Path.home() / "Documents/comfy/ComfyUI/output"
OUTPUT_DIR = Path("/tmp/pilotai-gen")
OUTPUT_DIR.mkdir(exist_ok=True)

CHECKPOINT = "sd_xl_base_1.0.safetensors"

STYLE = (
    "photorealistic over-the-shoulder shot, person seen from behind, "
    "modern office setting, dark blue ambient background, "
    "glowing blue interface light on the screen, cinematic soft lighting, "
    "shallow depth of field, 35mm corporate photography, highly detailed, sharp focus"
)

NEGATIVE = (
    "face visible, frontal portrait, readable text, letters, words, writing, "
    "watermark, signature, blurry, low quality, deformed hands, extra fingers, "
    "control room, network operations center, wall of monitors, stock market, "
    "trading floor, newsroom, server room, illustration, cartoon, flat design"
)

IMAGES = [
    {
        "slug": "pilotai-social",
        "seed": 4501,
        "prompt": f"a community manager seen from behind sitting at a desk, working on a laptop showing a social media content planning interface with colorful scheduled post cards and engagement charts, smartphone showing a social feed beside the laptop, {STYLE}",
    },
    {
        "slug": "pilotai-marketing",
        "seed": 4502,
        "prompt": f"a marketing manager seen from behind standing at a whiteboard with colorful campaign funnel diagrams drawn on it, holding a tablet showing a marketing analytics dashboard with conversion charts and campaign cards, {STYLE}",
    },
    {
        "slug": "pilotai-commercial",
        "seed": 4503,
        "prompt": f"a salesperson seen from behind sitting at a tidy desk with a laptop showing a customer relationship pipeline board with deal cards moving across columns and a revenue chart, phone and notebook on the desk, {STYLE}",
    },
]


def submit_workflow(prefix, seed, prompt, negative, width=1024, height=768, steps=30, cfg=7.0):
    workflow = {
        "3": {"class_type": "KSampler", "inputs": {
            "seed": seed, "steps": steps, "cfg": cfg,
            "sampler_name": "dpmpp_2m", "scheduler": "karras", "denoise": 1.0,
            "model": ["4", 0], "positive": ["6", 0], "negative": ["7", 0],
            "latent_image": ["5", 0]}},
        "4": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": CHECKPOINT}},
        "5": {"class_type": "EmptyLatentImage", "inputs": {"width": width, "height": height, "batch_size": 1}},
        "6": {"class_type": "CLIPTextEncode", "inputs": {"text": prompt, "clip": ["4", 1]}},
        "7": {"class_type": "CLIPTextEncode", "inputs": {"text": negative, "clip": ["4", 1]}},
        "8": {"class_type": "VAEDecode", "inputs": {"samples": ["3", 0], "vae": ["4", 2]}},
        "9": {"class_type": "SaveImage", "inputs": {"filename_prefix": prefix, "images": ["8", 0]}},
    }
    payload = json.dumps({"prompt": workflow, "client_id": "pilotai-gen"}).encode()
    req = urllib.request.Request(f"{SERVER}/prompt", data=payload,
                                 headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read().decode())["prompt_id"]


def wait_for_completion(prompt_id, timeout=900):
    start = time.time()
    while time.time() - start < timeout:
        try:
            with urllib.request.urlopen(urllib.request.Request(f"{SERVER}/history/{prompt_id}"), timeout=30) as resp:
                entry = json.loads(resp.read().decode()).get(prompt_id, {})
                if entry.get("status", {}).get("completed"):
                    return entry
                if entry.get("status", {}).get("status_str") == "error":
                    return None
        except urllib.error.HTTPError:
            pass
        time.sleep(3)
    return None


def find_output(prefix):
    cands = sorted(COMFY_OUTPUT.glob(f"{prefix}_*.png"), key=lambda p: p.stat().st_mtime, reverse=True)
    return cands[0] if cands else None


def main():
    results = []
    for img in IMAGES:
        prefix = f"plt_{img['slug']}"
        print(f"[{img['slug']}] seed={img['seed']}...", flush=True)
        pid = submit_workflow(prefix, img["seed"], img["prompt"], NEGATIVE)
        ok = wait_for_completion(pid)
        out = find_output(prefix)
        if ok and out:
            target = OUTPUT_DIR / f"{img['slug']}.png"
            out.rename(target)
            results.append({"slug": img["slug"], "ok": True, "path": str(target)})
            print(f"[{img['slug']}] OK -> {target}", flush=True)
        else:
            results.append({"slug": img["slug"], "ok": False})
            print(f"[{img['slug']}] ÉCHEC", flush=True)
        time.sleep(2)
    print(json.dumps({"total": len(results), "ok": sum(r["ok"] for r in results)}, ensure_ascii=False))


if __name__ == "__main__":
    main()