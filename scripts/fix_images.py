#!/usr/bin/env python3
"""Two fixes, applied generically:
1. SAM silver: re-fetch the product page and grab two VALID images (the first
   crawl caught a 3.7KB junk placeholder) so it has a primary + reveal to flip.
2. Transparency: any product image that ships on a SOLID background (white on
   some reveals, green on the silver bar) gets its edge background flood-filled
   to transparent. Images that are already transparent are skipped — no
   case-by-case patching.
"""

import glob
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


def _open(url, timeout=60):
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


def refetch_silver():
    html = _open(f"{BASE}/ae/products/1kg-minted-silver-bar", 40).decode("utf-8", "ignore")
    urls, seen = [], set()
    for raw in re.findall(r"backend\.primegoldshop\.com%2Fstatic%2F[^&\"'\\]+", html):
        dec = urllib.parse.unquote("https%3A%2F%2F" + raw)
        if dec not in seen:
            seen.add(dec)
            urls.append(dec)
    # download all, keep only valid (>8KB), take first two distinct
    valid = []
    for i, u in enumerate(urls):
        safe = urllib.parse.quote(u, safe=":/?#[]@!$&'()*+,;=%")
        try:
            data = _open(safe, 90)
        except Exception as e:  # noqa: BLE001
            print(f"  silver dl fail: {e}")
            continue
        if len(data) > 8000:
            ext = ".webp" if ".webp" in u.lower() else (".jpg" if ".jp" in u.lower() else ".png")
            tmp = DIR / f"_silver_src_{len(valid)}{ext}"
            tmp.write_bytes(data)
            valid.append(tmp)
            print(f"  silver candidate {len(valid)}: {len(data)}B {u.split('/')[-1][:40]}")
        if len(valid) >= 2:
            break
    if not valid:
        print("  silver: no valid images found")
        return
    save_webp(valid[0], DIR / "sam-silver-bar-1kg.webp")
    if len(valid) > 1:
        save_webp(valid[1], DIR / "sam-silver-bar-1kg-pack.webp")
    for t in valid:
        t.unlink(missing_ok=True)
    print(f"  silver wired: primary + {'pack' if len(valid) > 1 else 'NO pack'}")


def save_webp(src, dest):
    im = Image.open(src)
    im = im.convert("RGBA") if "A" in im.getbands() else im.convert("RGB")
    im.save(dest, "WEBP", quality=90, method=6)


def is_transparent(im):
    if "A" not in im.getbands():
        return False
    lo, _ = im.convert("RGBA").getchannel("A").getextrema()
    return lo < 8


def make_transparent(path, thresh=55):
    im = Image.open(path)
    if is_transparent(im):
        return False  # already has a cut-out background
    rgb = im.convert("RGB")
    w, h = rgb.size
    magic = (255, 0, 254)
    for corner in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
        ImageDraw.floodfill(rgb, corner, magic, thresh=thresh)
    rgba = rgb.convert("RGBA")
    px = list(rgba.getdata())
    out = [(255, 255, 255, 0) if (p[0], p[1], p[2]) == magic else p for p in px]
    rgba.putdata(out)
    rgba.save(path, "WEBP", quality=90, method=6)
    return True


def main():
    print("== SAM silver re-fetch ==")
    try:
        refetch_silver()
    except Exception as e:  # noqa: BLE001
        print(f"  silver refetch failed: {e}")

    print("\n== transparency pass (solid-bg images only) ==")
    files = sorted(glob.glob(str(DIR / "*.webp")))
    changed = skipped = 0
    for f in files:
        if Path(f).name == "hero-bar-back.webp":
            continue
        try:
            if make_transparent(f):
                changed += 1
                print(f"  transparent: {Path(f).name}")
            else:
                skipped += 1
        except Exception as e:  # noqa: BLE001
            print(f"  FAIL {Path(f).name}: {e}")
    print(f"\n{changed} made transparent, {skipped} already transparent/skipped")


if __name__ == "__main__":
    main()
