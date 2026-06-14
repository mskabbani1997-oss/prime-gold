#!/usr/bin/env python3
"""Download the client's OWN real product images from their production store.

Source: primegoldshop.com/ae/store -> each /ae/products/<slug> page references two
images on backend.primegoldshop.com/static/ (a styled primary + the real product
shot), wrapped in Next.js /_next/image?url=... Decode them, keep the first two
distinct per product (document order = primary, then reveal), download to
public/images/products/, and emit a manifest. Used AS-IS: no AI, no editing.
"""

import json
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images" / "products"
BASE = "https://primegoldshop.com"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36"


def _open(url, referer=None, timeout=60):
    """Open a URL with retries — the host's DNS resolver is flaky (getaddrinfo)."""
    headers = {"User-Agent": UA}
    if referer:
        headers["Referer"] = referer
    last = None
    for attempt in range(5):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read()
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(1.5 * (attempt + 1))
    raise last


def get(url):
    return _open(url, timeout=40).decode("utf-8", "ignore")


def collect_slugs():
    slugs = []
    seen = set()
    # listing + a few pagination variants (covers silver if it's on a later page)
    urls = [f"{BASE}/ae/store"] + [f"{BASE}/ae/store?page={p}" for p in range(2, 6)]
    for u in urls:
        try:
            html = get(u)
        except Exception as e:  # noqa: BLE001
            print(f"  listing {u}: {e}", flush=True)
            continue
        for m in re.findall(r"/ae/products/([a-z0-9\-]+)", html):
            if m not in seen:
                seen.add(m)
                slugs.append(m)
    return slugs


def extract_images(html):
    """Return distinct backend /static/ image URLs in document order."""
    found = []
    seen = set()
    # encoded inside /_next/image?url=...  and any direct references
    for raw in re.findall(r"backend\.primegoldshop\.com%2Fstatic%2F[^&\"'\\]+", html):
        dec = urllib.parse.unquote("https%3A%2F%2F" + raw)
        if dec not in seen:
            seen.add(dec)
            found.append(dec)
    for raw in re.findall(r"https://backend\.primegoldshop\.com/static/[^\"'\\ )]+", html):
        if raw not in seen:
            seen.add(raw)
            found.append(raw)
    return found


def download(url, dest):
    # spaces/parens must be percent-encoded for the request
    safe = urllib.parse.quote(url, safe=":/?#[]@!$&'()*+,;=%")
    data = _open(safe, referer=BASE + "/", timeout=90)
    dest.write_bytes(data)
    return len(data)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    slugs = sys.argv[1:] or collect_slugs()
    print(f"{len(slugs)} product slugs\n", flush=True)
    manifest = {}
    for i, slug in enumerate(slugs, 1):
        try:
            html = get(f"{BASE}/ae/products/{slug}")
        except Exception as e:  # noqa: BLE001
            print(f"[{i}/{len(slugs)}] {slug}: PAGE FAIL {e}", flush=True)
            continue
        imgs = extract_images(html)[:2]
        if not imgs:
            print(f"[{i}/{len(slugs)}] {slug}: NO IMAGES", flush=True)
            continue
        roles = ["primary", "reveal"]
        entry = {}
        for url, role in zip(imgs, roles):
            ext = ".webp" if ".webp" in url.lower() else (".jpg" if (".jpg" in url.lower() or ".jpeg" in url.lower()) else ".png")
            dest = OUT / f"live-{slug}-{role}{ext}"
            try:
                n = download(url, dest)
                entry[role] = {"url": url, "file": dest.name, "bytes": n}
                print(f"[{i}/{len(slugs)}] {slug} {role}: OK {n} -> {dest.name}", flush=True)
            except Exception as e:  # noqa: BLE001
                print(f"[{i}/{len(slugs)}] {slug} {role}: DL FAIL {e}", flush=True)
        manifest[slug] = entry
        time.sleep(0.4)
    (ROOT / "scripts" / "store_images_manifest.json").write_text(
        json.dumps(manifest, indent=2), encoding="utf-8"
    )
    ok = sum(1 for v in manifest.values() if v.get("primary"))
    print(f"\n{ok}/{len(slugs)} products with a primary image. Manifest written.", flush=True)


if __name__ == "__main__":
    main()
