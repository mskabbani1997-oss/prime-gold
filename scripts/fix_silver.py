#!/usr/bin/env python3
"""Re-pull a CLEAN SAM silver image from the client's store and remove only its
flat background via edge flood-fill (NOT a global green chroma-key, which
previously ate into the bar and made it look scratched). Then autocrop + save."""

import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
DIR = ROOT / "public" / "images" / "products"
BASE = "https://primegoldshop.com"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36"


def _open(url, timeout=90):
    last = None
    for attempt in range(6):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": BASE + "/"})
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read()
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(1.5 * (attempt + 1))
    raise last


def main():
    html = _open(f"{BASE}/ae/products/1kg-minted-silver-bar", 40).decode("utf-8", "ignore")
    urls, seen = [], set()
    for raw in re.findall(r"backend\.primegoldshop\.com%2Fstatic%2F[^&\"'\\]+", html):
        dec = urllib.parse.unquote("https%3A%2F%2F" + raw)
        if dec not in seen:
            seen.add(dec)
            urls.append(dec)
    # pick the largest valid image (most detail)
    best, best_n = None, 0
    for u in urls:
        safe = urllib.parse.quote(u, safe=":/?#[]@!$&'()*+,;=%")
        try:
            data = _open(safe)
        except Exception:  # noqa: BLE001
            continue
        if len(data) > best_n:
            best, best_n = data, len(data)
    if not best:
        print("no silver image found")
        return
    tmp = DIR / "_silver_clean_src"
    tmp.write_bytes(best)
    im = Image.open(tmp).convert("RGB")
    w, h = im.size
    magic = (255, 0, 254)
    for corner in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
        ImageDraw.floodfill(im, corner, magic, thresh=60)
    rgba = im.convert("RGBA")
    rgba.putdata([(255, 255, 255, 0) if (p[0], p[1], p[2]) == magic else p for p in rgba.getdata()])
    bbox = rgba.getchannel("A").getbbox()
    if bbox:
        rgba = rgba.crop(bbox)
    rgba.save(DIR / "sam-silver-bar-1kg.webp", "WEBP", quality=92, method=6)
    tmp.unlink(missing_ok=True)
    print(f"clean silver saved: source {best_n}B -> {rgba.size}")


if __name__ == "__main__":
    main()
