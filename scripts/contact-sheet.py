"""Contact sheet for reviewing Codex output: one row per inbox dir, graded-1 | graded-2.
Usage: fontvenv python scripts/contact-sheet.py out.png assets/inbox/02-* ..."""
import sys, os
from PIL import Image, ImageDraw
out, dirs = sys.argv[1], sys.argv[2:]
TW, TH = 600, 400
rows = [d for d in dirs if os.path.exists(os.path.join(d, 'graded-1.png'))]
sheet = Image.new('RGB', (TW * 2 + 30, (TH + 30) * len(rows)), '#FDF6EC')
dr = ImageDraw.Draw(sheet)
for i, d in enumerate(rows):
    for j, f in enumerate(['graded-1.png', 'graded-2.png']):
        p = os.path.join(d, f)
        if os.path.exists(p):
            im = Image.open(p).convert('RGB'); im.thumbnail((TW, TH))
            sheet.paste(im, (j * (TW + 10) + 10, i * (TH + 30) + 25))
    dr.text((10, i * (TH + 30) + 8), os.path.basename(d), fill='#14120F')
sheet.save(out)
print(out, len(rows), 'rows')
