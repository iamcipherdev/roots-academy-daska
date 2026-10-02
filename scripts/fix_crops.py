#!/usr/bin/env python3
"""Fix crops: detect content bbox, re-crop problem images."""
from PIL import Image
import os

RAW = "/home/z/my-project/academy_photos/raw"
OUT = "/home/z/my-project/academy_photos/site"

def content_bbox(img, thresh=18):
    """Find bbox of non-black content."""
    g = img.convert("L")
    w, h = g.size
    px = g.load()
    # sample grid
    minx, miny, maxx, maxy = w, h, 0, 0
    for y in range(0, h, 4):
        for x in range(0, w, 4):
            if px[x, y] > thresh:
                if x < minx: minx = x
                if x > maxx: maxx = x
                if y < miny: miny = y
                if y > maxy: maxy = y
    return (minx, miny, maxx + 4, maxy + 4)

def save(img, name, max_w=800, quality=86):
    if img.mode != "RGB":
        img = img.convert("RGB")
    w, h = img.size
    if w > max_w:
        img = img.resize((max_w, int(h * max_w / w)), Image.LANCZOS)
    img.save(f"{OUT}/{name}", quality=quality, optimize=True)
    print(f"{name}: {img.size} -> {os.path.getsize(f'{OUT}/{name}')//1024}KB")

# 1. Interior — auto-detect content bbox on oar2
interior = Image.open(f"{RAW}/yt_0-aQwufwRic_oar2.jpg")
bb = content_bbox(interior)
print("interior bbox:", bb)
# add small margin
bb = (max(0, bb[0]-6), max(0, bb[1]-6), min(interior.width, bb[2]+6), min(interior.height, bb[3]+6))
save(interior.crop(bb), "interior.jpg")

# 2. Practical class — tighter crop avoiding overlays (orig 720x1280)
prac = Image.open(f"{RAW}/yt_6m_fzp10npg_oar2.jpg")
save(prac.crop((30, 135, 690, 855)), "practical-class.jpg")

# 3. Campus building — from hq thumb (480x360 letterboxed), center content
campus = Image.open(f"{RAW}/yt_d-W1-Z1gtZI_hq.jpg")
save(campus.crop((105, 0, 375, 240)), "campus-exterior.jpg", max_w=540)

# 4. Branch banner (oar2 of d-W1-Z1gtZI) — keep as authenticity artifact
banner = Image.open(f"{RAW}/yt_d-W1-Z1gtZI_oar2.jpg")
save(banner.crop((0, 0, 720, 720)), "banner-branches.jpg")

# 5. Lab students — slightly wider
lab2 = Image.open(f"{RAW}/yt_Kp-js6Ept_o_hq.jpg")
save(lab2.crop((105, 0, 375, 360)), "lab-students.jpg", max_w=540)
