"""Gently upscale the founder portrait (real photo, 182x222 -> 2x) with a mild
sharpen so it presents cleanly at larger sizes. No content changes."""
from PIL import Image, ImageFilter

SRC = "/home/z/my-project/public/images/faculty_dr_mohsin_ali.jpg"
DST = "/home/z/my-project/public/images/founder_dr_mohsin_ali.jpg"

im = Image.open(SRC).convert("RGB")
up = im.resize((im.width * 2, im.height * 2), Image.LANCZOS)
# very mild unsharp mask to recover crispness after upscaling
up = up.filter(ImageFilter.UnsharpMask(radius=1.6, percent=60, threshold=2))
up.save(DST, quality=92)
print("saved", DST, up.size)
