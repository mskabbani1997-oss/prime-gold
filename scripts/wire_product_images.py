#!/usr/bin/env python3
"""Map the downloaded client store images (live-*) to catalog SKU slugs and
normalize them to <sku>.webp (primary, card) + <sku>-pack.webp (reveal). This is
a format re-encode only (for consistency/perf) — the client's real images are
used as-is, no editing. If a primary is degenerate (tiny), the reveal is promoted
to primary."""

import glob
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
DIR = ROOT / "public" / "images" / "products"

# catalog SKU slug -> live store slug (filename stem after "live-")
MAP = {
    "valcambi-gold-bar-1g": "1g-minted-gold-bar",
    "valcambi-gold-bar-25g": "5g-minted-gold-bar",  # no live 2.5g valcambi -> closest small bar
    "valcambi-gold-bar-5g": "5g-minted-gold-bar",
    "valcambi-gold-bar-10g": "10g-minted-gold-bar",
    "valcambi-gold-bar-20g": "20g-minted-gold-bar",
    "valcambi-gold-bar-1oz": "1oz-minted-gold-bar",
    "valcambi-gold-bar-50g": "50g-minted-gold-bar",
    "valcambi-gold-bar-100g": "100g-minted-gold-bar",
    "valcambi-gold-bar-250g": "250g-minted-gold-bar-valcambi",
    "valcambi-gold-bar-500g": "500g-minted-gold-bar",
    "valcambi-gold-bar-1kg": "1kg-minted-gold-bar",
    "sam-gold-bar-1g": "1g-minted-gold-bar-sam",
    "sam-gold-bar-25g": "2-5g-minted-gold-bar-sam",
    "sam-gold-bar-5g": "5g-minted-gold-bar-sam",
    "sam-gold-bar-10g": "10g-minted-gold-bar-sam",
    "sam-gold-bar-20g": "20g-minted-gold-bar-sam",
    "sam-gold-bar-50g": "50g-minted-gold-bar-sam",
    "sam-gold-bar-100g": "100g-minted-gold-bar-sam",
    "sam-gold-bar-1oz": "1oz-minted-gold-bar-sam",
    "armillary-gold-coin-1oz": "1oz-armillary-coins",
    "sam-gold-coin-1oz": "1oz-gold-coin-sam",
    "sam-silver-bar-1kg": "1kg-minted-silver-bar",
}


def find(live, role):
    hits = sorted(glob.glob(str(DIR / f"live-{live}-{role}.*")))
    return Path(hits[0]) if hits else None


def to_webp(src, dest):
    im = Image.open(src)
    im = im.convert("RGBA") if "A" in im.getbands() else im.convert("RGB")
    im.save(dest, "WEBP", quality=90, method=6)
    return im.size


def main():
    for sku, live in MAP.items():
        primary = find(live, "primary")
        reveal = find(live, "reveal")
        # promote reveal if primary missing or degenerate (tiny/broken)
        if primary and primary.stat().st_size < 8000:
            print(f"{sku}: primary {primary.name} tiny ({primary.stat().st_size}B) -> promote reveal")
            primary, reveal = reveal, None
        if not primary:
            print(f"{sku}: NO PRIMARY ({live})")
            continue
        size = to_webp(primary, DIR / f"{sku}.webp")
        msg = f"{sku}: primary {size}"
        if reveal:
            rsize = to_webp(reveal, DIR / f"{sku}-pack.webp")
            msg += f" + pack {rsize}"
        print(msg)


if __name__ == "__main__":
    main()
