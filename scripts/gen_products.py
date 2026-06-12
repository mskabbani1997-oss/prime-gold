#!/usr/bin/env python3
"""Batch-generate consistent product images via Gemini (Nano Banana 2) and write
them as WebP into public/images/products. One shared studio style across every
product for visual consistency; weight engraved per SKU.

Reads the API key from .env.local (GEMINI_API_KEY / GOOGLE_API_KEY).
Usage:
    python scripts/gen_products.py            # generate all
    python scripts/gen_products.py sam-silver-1kg valcambi-5g   # subset
"""

import base64
import io
import json
import os
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "images" / "products"
MODEL = "gemini-3.1-flash-image-preview"
API_BASE = "https://generativelanguage.googleapis.com/v1beta/models"
RATIO = "4:5"
SIZE = "2K"

# Shared art direction appended to every prompt — this is what enforces a single
# consistent look (lighting, background, framing, lens) across all products.
STYLE = (
    " Photorealistic studio product photograph. Warm dramatic studio lighting with a single "
    "key light raking across the metal from the upper left, a dark neutral charcoal background "
    "falling to near-black, soft golden bokeh, shallow depth of field isolating the subject, a "
    "subtle reflection on the surface beneath it. Captured with a Sony A7R IV and 90mm macro "
    "lens at f/5.6. Centered composition, the engraved markings crisp and clearly legible. "
    "Wallpaper* product editorial."
)

GOLD_BAR = (
    "A {brand} minted gold bullion bar viewed front-on, standing upright at a slight "
    "three-quarter angle on a dark reflective stone surface. The polished gold bar face is "
    "engraved with {emblem} at the top, then 'FINE GOLD', the weight '{w}', and the fineness "
    "'999.9', with a small serial number beneath."
)
SILVER_BAR = (
    "A SAM Precious Metals minted silver bullion bar viewed front-on, standing upright at a "
    "slight three-quarter angle on a dark reflective stone surface. Bright white-silver metallic "
    "finish. The bar face is engraved with a refinery emblem at the top, 'FINE SILVER', the "
    "weight '{w}', and the fineness '999'.{extra}"
)

PRODUCTS = {
    "valcambi-1g": GOLD_BAR.format(brand="Valcambi Suisse", emblem="the Valcambi rotating-square logo", w="1 g"),
    "valcambi-5g": GOLD_BAR.format(brand="Valcambi Suisse", emblem="the Valcambi rotating-square logo", w="5 g"),
    "valcambi-10g": GOLD_BAR.format(brand="Valcambi Suisse", emblem="the Valcambi rotating-square logo", w="10 g"),
    "valcambi-20g": GOLD_BAR.format(brand="Valcambi Suisse", emblem="the Valcambi rotating-square logo", w="20 g"),
    "valcambi-1oz": (
        "A Valcambi Suisse minted gold bullion bar viewed front-on, standing upright at a slight "
        "three-quarter angle on a dark reflective stone surface. The polished gold bar face is "
        "engraved with the Valcambi rotating-square logo at the top, then 'FINE GOLD', the weight "
        "'1 oz', '31.1 g', and the fineness '999.9', with a small serial number beneath."
    ),
    "valcambi-round": (
        "A Valcambi minted gold round coin viewed front-on, resting at a slight angle on a dark "
        "reflective stone surface. The circular polished gold face carries a fine guilloche "
        "pattern with 'FINE GOLD', the weight '1 g', and the fineness '999.9' engraved around it."
    ),
    "sam-gold-bar": GOLD_BAR.format(brand="SAM Precious Metals", emblem="a refinery emblem and the letters 'SAM'", w="1 g"),
    "sam-gold-coin": (
        "A SAM Precious Metals minted gold coin viewed front-on, resting at a slight angle on a "
        "dark reflective stone surface. The circular polished gold face shows a refinery emblem, "
        "the letters 'SAM', 'FINE GOLD', and the fineness '999.9'."
    ),
    "sam-silver-100g": SILVER_BAR.format(w="100 g", extra=""),
    "sam-silver-500g": SILVER_BAR.format(w="500 g", extra=""),
    "sam-silver-1kg": SILVER_BAR.format(
        w="1 KG",
        extra=" This is a substantially larger, thicker and heavier-looking kilo bar than a small bar.",
    ),
    "hero-bar-back": (
        "A Valcambi Suisse gold blister pack with assay certificate viewed front-on: a 1 oz "
        "minted fine-gold bar sealed inside a clear tamper-evident plastic capsule, mounted on a "
        "vivid orange assay certificate card. The card reads 'ASSAY CERTIFICATE' across the top, "
        "with 'valcambi suisse' branding, 'FINE GOLD', the fineness 'Au 999.9', the weight '1 oz' "
        "and '31.1 g', METAL / PURITY / WEIGHT / REFINER detail rows, and a printed serial number "
        "'AB 123456'."
    ),
}


def load_key():
    env = ROOT / ".env.local"
    if env.exists():
        for line in env.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            if k.strip() in ("GEMINI_API_KEY", "GOOGLE_API_KEY", "GOOGLE_AI_API_KEY"):
                return v.strip()
    for var in ("GEMINI_API_KEY", "GOOGLE_API_KEY", "GOOGLE_AI_API_KEY"):
        if os.environ.get(var):
            return os.environ[var]
    sys.exit("No API key found in .env.local or environment")


def generate(name, prompt, key):
    url = f"{API_BASE}/{MODEL}:generateContent?key={key}"
    body = {
        "contents": [{"parts": [{"text": prompt + STYLE}]}],
        "generationConfig": {
            "responseModalities": ["IMAGE"],
            "imageConfig": {"aspectRatio": RATIO, "imageSize": SIZE},
        },
    }
    data = json.dumps(body).encode("utf-8")
    for attempt in range(4):
        try:
            req = urllib.request.Request(
                url, data=data, headers={"Content-Type": "application/json"}, method="POST"
            )
            with urllib.request.urlopen(req, timeout=180) as resp:
                result = json.loads(resp.read().decode("utf-8"))
            break
        except urllib.error.HTTPError as e:
            err = e.read().decode("utf-8") if e.fp else ""
            if e.code == 429 and attempt < 3:
                wait = 2 ** (attempt + 1)
                print(f"  [{name}] 429, retrying in {wait}s", flush=True)
                time.sleep(wait)
                continue
            return f"HTTP {e.code}: {err[:200]}"
        except Exception as e:  # noqa: BLE001
            return f"ERR: {e}"
    else:
        return "max retries"

    cands = result.get("candidates", [])
    if not cands:
        return f"no candidates: {result.get('promptFeedback', {})}"
    img_b64 = None
    for part in cands[0].get("content", {}).get("parts", []):
        if "inlineData" in part:
            img_b64 = part["inlineData"]["data"]
    if not img_b64:
        return f"no image (finishReason={cands[0].get('finishReason')})"

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    im = Image.open(io.BytesIO(base64.b64decode(img_b64))).convert("RGB")
    dest = OUT_DIR / f"{name}.webp"
    im.save(dest, "WEBP", quality=88, method=6)
    return f"OK {im.size} -> {dest.name}"


def main():
    key = load_key()
    targets = sys.argv[1:] or list(PRODUCTS.keys())
    print(f"Generating {len(targets)} image(s) at {SIZE} {RATIO}\n", flush=True)
    results = {}
    for i, name in enumerate(targets, 1):
        if name not in PRODUCTS:
            print(f"[{i}/{len(targets)}] {name}: UNKNOWN", flush=True)
            continue
        print(f"[{i}/{len(targets)}] {name}: generating...", flush=True)
        res = generate(name, PRODUCTS[name], key)
        results[name] = res
        print(f"[{i}/{len(targets)}] {name}: {res}", flush=True)
        time.sleep(1)
    print("\n=== SUMMARY ===", flush=True)
    for k, v in results.items():
        print(f"{k}: {v}", flush=True)
    ok = sum(1 for v in results.values() if v.startswith("OK"))
    print(f"\n{ok}/{len(results)} succeeded", flush=True)


if __name__ == "__main__":
    main()
