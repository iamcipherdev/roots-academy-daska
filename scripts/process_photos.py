#!/usr/bin/env python3
"""Process and optimize all real Roots Academy photos for the website."""
from PIL import Image, ImageEnhance
import os

RAW = "/home/z/my-project/academy_photos/raw"
OUT = "/home/z/my-project/academy_photos/site"
os.makedirs(OUT, exist_ok=True)

def save_optimized(img, name, max_w=1400, quality=85):
    """Resize and save optimized JPG."""
    if img.mode != "RGB":
        img = img.convert("RGB")
    w, h = img.size
    if w > max_w:
        img = img.resize((max_w, int(h * max_w / w)), Image.LANCZOS)
    img.save(f"{OUT}/{name}", quality=quality, optimize=True)
    print(f"{name}: {img.size} -> {os.path.getsize(f'{OUT}/{name}')//1024}KB")

# 1. Computer lab (Google Maps, high quality) — hero candidate
lab = Image.open(f"{RAW}/gmaps_1.jpg")
save_optimized(lab, "lab-hero.jpg", max_w=1400)

# 2. Computer lab students (from academy video) — crop center of letterboxed 480x360
lab2 = Image.open(f"{RAW}/yt_Kp-js6Ept_o_hq.jpg")
save_optimized(lab2.crop((105, 0, 375, 360)), "lab-students.jpg", max_w=600, quality=88)

# 3. Academy interior — reception area
interior = Image.open(f"{RAW}/yt_0-aQwufwRic_oar2.jpg")  # 720x1280
save_optimized(interior.crop((0, 130, 720, 1080)), "interior.jpg", max_w=800, quality=86)

# 4. Practical class — crop out overlay text (top text band ~0-115px, bottom ~1050+)
prac = Image.open(f"{RAW}/yt_6m_fzp10npg_oar2.jpg")  # 720x1280
save_optimized(prac.crop((30, 118, 690, 1045)), "practical-class.jpg", max_w=800, quality=86)

# 5. Campus building exterior (Jamkey Cheema branch)
campus = Image.open(f"{RAW}/yt_d-W1-Z1gtZI_oar2.jpg")  # 720x1280
save_optimized(campus.crop((0, 0, 720, 650)), "campus-exterior.jpg", max_w=800, quality=86)

# 6. Official posters (gallery) — trim black bars where present
def trim_black_bars(img):
    img = img.convert("RGB")
    w, h = img.size
    # scan rows for near-black
    px = img.load()
    top, bot = 0, h - 1
    def row_dark(y):
        vals = [sum(px[x, y]) / 3 for x in range(0, w, max(1, w // 24))]
        return sum(vals) / len(vals) < 22
    while top < h // 3 and row_dark(top):
        top += 1
    while bot > 2 * h // 3 and row_dark(bot):
        bot -= 1
    return img.crop((0, top, w, bot + 1))

posters = {
    "poster-admission-2025.jpg": "yt_MjQgt0YKu8c_oar2.jpg",
    "poster-computer-courses.jpg": "yt_ToxdtnJIa_s_oar2.jpg",
    "poster-ielts.jpg": "yt_FQNV9kdGA3M_oar2.jpg",
    "poster-dit.jpg": "yt_vjJ_iSYjBuk_oar2.jpg",
    "poster-admissions-open.jpg": "yt_uIigFDhEQcA_oar2.jpg",
    "poster-social-marketing.jpg": "yt_9IMQTmoOND4_oar2.jpg",
}
for name, src in posters.items():
    img = trim_black_bars(Image.open(f"{RAW}/{src}"))
    save_optimized(img, name, max_w=900, quality=85)

# 7. English courses whiteboard (ccvRZg0nJPU) — program info evidence
eng = Image.open(f"{RAW}/yt_ccvRZg0nJPU_sddefault.jpg")
save_optimized(eng, "english-courses.jpg", max_w=700, quality=86)

# 8. Faculty alt
save_optimized(Image.open("/home/z/my-project/academy_photos/processed/faculty_adleem_ashfaq_alt.jpg"),
               "faculty-adleem-alt.jpg", max_w=600, quality=86)

print("\nDone. Files in", OUT)
