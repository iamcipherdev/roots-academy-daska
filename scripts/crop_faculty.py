#!/usr/bin/env python3
"""Crop faculty photos from official Roots Academy posters."""
from PIL import Image
import os

RAW = "/home/z/my-project/academy_photos/raw"
OUT = "/home/z/my-project/academy_photos/processed"
os.makedirs(OUT, exist_ok=True)

# 1. Dr. Mohsin Ali — from official Computer Courses poster (ToxdtnJIa_s)
img = Image.open(f"{RAW}/yt_ToxdtnJIa_s_oar2.jpg")  # 720x1280
print("ToxdtnJIa_s size:", img.size)
# Circular photo in "D" frame, top right area
mohsin = img.crop((528, 218, 710, 440))
mohsin.save(f"{OUT}/faculty_dr_mohsin_ali.jpg", quality=92)
print("Mohsin crop:", mohsin.size)

# 2. Prof. Adleem Ashfaq — from official IELTS poster (FQNV9kdGA3M)
img2 = Image.open(f"{RAW}/yt_FQNV9kdGA3M_oar2.jpg")  # 720x1280
print("FQNV9kdGA3M size:", img2.size)
adleem = img2.crop((400, 360, 700, 930))
adleem.save(f"{OUT}/faculty_adleem_ashfaq.jpg", quality=92)
print("Adleem crop:", adleem.size)

# 3. Also from Pk1lfHZygIQ (close-up of Adleem with book) — backup
img3 = Image.open(f"{RAW}/yt_Pk1lfHZygIQ_oar2.jpg")
adleem2 = img3.crop((240, 30, 720, 1280))
adleem2.save(f"{OUT}/faculty_adleem_ashfaq_alt.jpg", quality=92)
print("Adleem alt crop:", adleem2.size)

# 4. Dr. Mohsin Ali alt from 9IMQTmoOND4 (small circular, top right)
img4 = Image.open(f"{RAW}/yt_9IMQTmoOND4_oar2.jpg")  # 720x1280
mohsin2 = img4.crop((620, 285, 712, 375))
mohsin2.save(f"{OUT}/faculty_dr_mohsin_ali_alt.jpg", quality=92)
print("Mohsin alt crop:", mohsin2.size)
