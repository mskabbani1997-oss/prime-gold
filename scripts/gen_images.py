#!/usr/bin/env python3
"""
Prime Gold brand-image batch generator.

Generates the 12 brand assets via the Gemini (Nano Banana 2) REST API, converts
each PNG to WebP with Pillow, and writes them to public/images with the exact
filenames the app references. Resumable: skips assets that already exist unless
--force is passed. Per-image failures are reported and do not abort the batch.

Usage:
    python scripts/gen_images.py                 # generate all missing assets
    python scripts/gen_images.py hero-gold-bar   # generate one (or several) by name
    python scripts/gen_images.py --force         # regenerate everything
"""

import base64
import io
import json
import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

from PIL import Image, ImageOps

# Model and resolution can be overridden from the environment, e.g. to fall back
# to the budget Nano Banana original (1K) when the NB2 2K tier is unavailable.
MODEL = os.environ.get("PG_MODEL", "gemini-3.1-flash-image-preview")
SIZE_OVERRIDE = os.environ.get("PG_SIZE")  # e.g. "1K" forces every asset to 1K
API_BASE = "https://generativelanguage.googleapis.com/v1beta/models"
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "images"

# Shared art direction appended to every prompt.
STYLE = (
    " Deep warm obsidian near-black background, warm rose-gold tonality drawn from a "
    "champagne to rose-gold to antique-gold palette, quiet private-bank luxury mood, "
    "completely free of any text, labels, logos, or watermarks."
)

IMAGES = [
    {
        "name": "hero-gold-bar",
        "ratio": "4:5",
        "size": "2K",
        "prompt": (
            "A single certified gold bullion bar standing upright on a dark reflective "
            "stone surface, its face carrying a finely engraved serial number and refinery "
            "hallmark. Warm rose-gold rim light traces the bar's beveled edges while the "
            "background falls into near-black shadow, a faint dusting of golden particles "
            "drifting around it. Captured with a Hasselblad H6D medium format camera and a "
            "120mm macro lens at f/4, shallow depth of field isolating the bar against soft "
            "warm bokeh, a single key light raking across the brushed metal from camera-left. "
            "Architectural Digest product feature."
        ),
    },
    {
        "name": "hero-bg",
        "ratio": "16:9",
        "size": "2K",
        "prompt": (
            "An abstract atmosphere inside a private vault, completely uninhabited and empty "
            "of any subject, filled with slow-drifting golden dust particles suspended in "
            "still air. A soft pool of warm rose-gold light bleeds in from the upper right "
            "and dissolves into shadow, with gentle volumetric light rays and warm bokeh "
            "orbs. Captured with a Sony A7R IV and an 85mm lens at f/1.8, long-exposure feel, "
            "extremely shallow focus, intended as a clean background texture. Wallpaper "
            "magazine atmospheric spread."
        ),
    },
    {
        "name": "hero-gold-bar-back",
        "ratio": "4:5",
        "size": "2K",
        "prompt": (
            "The reverse face of a Swiss-minted gold bullion bar displayed beside its assay "
            "certificate of authenticity card, the card embossed with a wax-style seal and a "
            "fine guilloche border, the bar showing a matte cast-back surface. Both rest on "
            "dark brushed leather. Warm directional light from a single high softbox "
            "camera-right with deep warm shadows. Captured with a Hasselblad H6D and a 120mm "
            "macro lens at f/5.6, three-quarter overhead composition. Architectural Digest "
            "still life."
        ),
    },
    {
        "name": "category-gold-bars",
        "ratio": "3:2",
        "size": "2K",
        "prompt": (
            "Several gold bullion bars of varied weights arranged in an overlapping stack on "
            "a dark polished stone surface, ranging from thin wafers to a heavier cast bar, "
            "each catching warm light along its beveled edges. A soft rose-gold key light "
            "falls from camera-left with a subtle fill. Captured with a Canon EOS R5 and a "
            "100mm macro lens at f/5.6, 45-degree hero angle, shallow depth of field. Bang "
            "and Olufsen style premium product photography."
        ),
    },
    {
        "name": "category-gold-coins",
        "ratio": "3:2",
        "size": "2K",
        "prompt": (
            "An elegant fan arrangement of gold bullion coins with crisp raised relief and "
            "milled edges, resting on dark velvet, warm reflections pooling in the recesses "
            "of the relief. A single warm key light skims the surface to reveal fine "
            "engraving. Captured with a Canon EOS R5 and a 100mm macro lens at f/4, tight "
            "overhead macro composition, shallow focus on the front coin with soft bokeh "
            "behind. Aesop-minimal luxury still life."
        ),
    },
    {
        "name": "category-silver-bars",
        "ratio": "3:2",
        "size": "2K",
        "prompt": (
            "A small stack of brushed silver bullion bars on a dark slate surface, their cool "
            "metallic sheen meeting a warm rose-gold edge light for contrast against the "
            "background. Soft directional key light from camera-right with gentle "
            "reflections. Captured with a Canon EOS R5 and a 100mm macro lens at f/5.6, "
            "45-degree hero angle, shallow depth of field. Restrained luxury product "
            "photography in the style of a Wallpaper magazine feature."
        ),
    },
    {
        "name": "collection-valcambi",
        "ratio": "21:9",
        "size": "2K",
        "prompt": (
            "A row of precision-minted gold bars laid in clean Swiss order on a dark marble "
            "bench, evoking refinery craftsmanship, with crisp clean light suggesting Alpine "
            "clarity falling from a high window camera-left and vast negative space on the "
            "right. Captured with a Sony A7R IV and a 50mm lens at f/4, wide cinematic "
            "composition, shallow depth of field. Architectural Digest meets Swiss "
            "watchmaking editorial, calm and exacting."
        ),
    },
    {
        "name": "collection-sam",
        "ratio": "21:9",
        "size": "2K",
        "prompt": (
            "A few gold bars and a single gold coin arranged on warm dark stone under a low "
            "desert-evening light, amber and rose-gold tones suggesting a refined Middle "
            "Eastern luxury setting, deep editorial shadow with generous negative space to "
            "the left. Captured with a Sony A7R IV and a 50mm lens at f/4, wide cinematic "
            "composition, shallow depth of field, warm directional key light. National "
            "Geographic luxury feature mood."
        ),
    },
    {
        "name": "about-hero",
        "ratio": "21:9",
        "size": "2K",
        "prompt": (
            "The interior of a quiet private vault, completely uninhabited and empty of any "
            "human presence, a polished dark floor reflecting a single warm beam of light "
            "that descends from above onto a closed steel vault door in the distance. Deep "
            "shadows, a calm sense of security and trust, faint golden dust in the air. "
            "Captured with an ARRI Alexa and a 35mm Zeiss Supreme Prime lens, wide "
            "establishing composition, chiaroscuro lighting, warm color grade. Magnum Photos "
            "documentary interior."
        ),
    },
    {
        "name": "brand-statement",
        "ratio": "16:9",
        "size": "2K",
        "prompt": (
            "A single gold bullion bar resting on a dark reflective surface in the lower "
            "third of the frame, lit by one dramatic warm key light from above that fades "
            "into vast empty space across the rest of the image, leaving generous negative "
            "space for overlaid text. Deep shadow with a faint mirror reflection beneath the "
            "bar. Captured with a Hasselblad H6D and an 80mm lens at f/8, low wide "
            "composition, single-source chiaroscuro lighting. Architectural Digest "
            "minimalist editorial, restrained and powerful."
        ),
    },
    {
        "name": "og-default",
        "ratio": "16:9",
        "size": "2K",
        "fit": (1200, 630),
        "prompt": (
            "A hero gold bullion bar standing on dark obsidian stone, lit by warm rose-gold "
            "gradient light from the upper right, positioned in the right portion of the "
            "frame with generous empty dark space on the left for overlaid branding. Soft "
            "golden bokeh and deep shadow. Captured with a Hasselblad H6D and a 120mm lens "
            "at f/4, balanced composition, warm key light. Architectural Digest product "
            "still."
        ),
    },
    {
        "name": "tree-of-life-texture",
        "ratio": "1:1",
        "size": "1K",
        "prompt": (
            "A very subtle, low-contrast abstract pattern of fine organic branching lines "
            "forming a radial tree-of-life motif, rendered as faint thin rose-gold strokes "
            "on a deep near-black field, the lines barely emerging from the darkness like an "
            "embossed watermark. Even, soft, diffuse light with no strong highlights. A flat "
            "graphic texture in the style of luxury embossed leather endpaper, minimal and "
            "elegant."
        ),
    },
]


KEY_VARS = ("GEMINI_API_KEY", "GOOGLE_AI_API_KEY", "GOOGLE_API_KEY")


def _key_from_env_file():
    """Read an image API key from prime-gold/.env.local if present."""
    env_file = Path(__file__).resolve().parent.parent / ".env.local"
    if not env_file.exists():
        return None
    for line in env_file.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        name, _, value = line.partition("=")
        if name.strip() in KEY_VARS:
            return value.strip().strip('"').strip("'")
    return None


def api_key():
    for var in KEY_VARS:
        v = os.environ.get(var)
        if v:
            return v
    v = _key_from_env_file()
    if v:
        return v
    print(json.dumps({"error": True, "message": "No API key in env or .env.local"}))
    sys.exit(1)


def generate_png(prompt, ratio, size, key):
    url = f"{API_BASE}/{MODEL}:generateContent?key={key}"
    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseModalities": ["IMAGE"],
            "imageConfig": {"aspectRatio": ratio, "imageSize": size},
        },
    }
    data = json.dumps(body).encode("utf-8")
    for attempt in range(4):
        req = urllib.request.Request(
            url, data=data, headers={"Content-Type": "application/json"}, method="POST"
        )
        try:
            with urllib.request.urlopen(req, timeout=180) as resp:
                result = json.loads(resp.read().decode("utf-8"))
            break
        except urllib.error.HTTPError as e:
            err = e.read().decode("utf-8") if e.fp else ""
            if e.code == 429 and attempt < 3:
                wait = 2 ** (attempt + 1)
                print(json.dumps({"retry": True, "wait": wait}), flush=True)
                time.sleep(wait)
                continue
            raise RuntimeError(f"HTTP {e.code}: {err[:300]}")
        except urllib.error.URLError as e:
            raise RuntimeError(str(e.reason))
    else:
        raise RuntimeError("max retries exceeded")

    cands = result.get("candidates", [])
    if not cands:
        reason = result.get("promptFeedback", {}).get("blockReason", "UNKNOWN")
        raise RuntimeError(f"no candidates ({reason})")
    for part in cands[0].get("content", {}).get("parts", []):
        if "inlineData" in part:
            return base64.b64decode(part["inlineData"]["data"])
    raise RuntimeError(f"no image (finishReason {cands[0].get('finishReason')})")


def main():
    args = [a for a in sys.argv[1:] if a != "--force"]
    force = "--force" in sys.argv
    targets = [im for im in IMAGES if not args or im["name"] in args]

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    key = api_key()
    ok, skipped, failed = [], [], []

    for im in targets:
        out = OUT_DIR / f"{im['name']}.webp"
        if out.exists() and not force:
            skipped.append(im["name"])
            print(json.dumps({"skip": im["name"]}), flush=True)
            continue
        size = SIZE_OVERRIDE or im["size"]
        try:
            print(json.dumps({"start": im["name"], "ratio": im["ratio"], "size": size, "model": MODEL}), flush=True)
            png = generate_png(im["prompt"] + STYLE, im["ratio"], size, key)
            img = Image.open(io.BytesIO(png)).convert("RGB")
            if im.get("fit"):
                img = ImageOps.fit(img, im["fit"], Image.LANCZOS)
            img.save(out, "WEBP", quality=88, method=6)
            ok.append(im["name"])
            print(json.dumps({"done": im["name"], "px": img.size, "kb": round(out.stat().st_size / 1024)}), flush=True)
            time.sleep(1)  # gentle pacing for rate limits
        except Exception as e:  # noqa: BLE001 - report and continue
            failed.append({"name": im["name"], "error": str(e)})
            print(json.dumps({"FAIL": im["name"], "error": str(e)}), flush=True)

    print(json.dumps({"summary": {"ok": ok, "skipped": skipped, "failed": failed}}, indent=2), flush=True)
    if failed:
        sys.exit(2)


if __name__ == "__main__":
    main()
