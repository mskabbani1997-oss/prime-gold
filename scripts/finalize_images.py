#!/usr/bin/env python3
"""Final image polish:
- Silver safety green-key: drop any green-dominant pixel to transparent (silver
  is grayscale, so this can't touch the product) — guarantees no green anywhere.
- Autocrop every product image to its non-transparent bounding box, so
  object-contain centers each product evenly in its card (fixes off-center grid).
"""

import glob
from pathlib import Path
from PIL import Image

DIR = Path(__file__).resolve().parent.parent / "public" / "images" / "products"


def green_key(im):
    px = list(im.getdata())
    out = []
    for r, g, b, a in px:
        if a > 0 and g > r + 10 and g > b + 10:
            out.append((r, g, b, 0))
        else:
            out.append((r, g, b, a))
    im.putdata(out)
    return im


def main():
    for f in sorted(glob.glob(str(DIR / "*.webp"))):
        name = Path(f).name
        if name == "hero-bar-back.webp":
            continue
        im = Image.open(f).convert("RGBA")
        if "sam-silver" in name:
            im = green_key(im)
        bbox = im.getchannel("A").getbbox()
        if bbox:
            im = im.crop(bbox)
        im.save(f, "WEBP", quality=90, method=6)
        print(f"{name}: cropped -> {im.size}")


if __name__ == "__main__":
    main()
