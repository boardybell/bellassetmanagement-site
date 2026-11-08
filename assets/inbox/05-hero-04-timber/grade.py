from PIL import Image, ImageOps
import random
from pathlib import Path

SHADOW = (20, 18, 15)
STONE = (110, 103, 89)
GOLD = (138, 100, 37)
LIGHT = (253, 246, 236)
# A restrained blend of the two specified midtones.
MID = tuple(0.82*a + 0.18*b for a,b in zip(STONE, GOLD))

def color(t):
    if t <= 0.5:
        a,b,u = SHADOW,MID,t*2
    else:
        a,b,u = MID,LIGHT,(t-0.5)*2
    return tuple(round(x+(y-x)*u) for x,y in zip(a,b))

for n in (1,2):
    source = Image.open(f'raw-{n}.png').convert('RGB')
    assert source.size == (1536,1024), source.size
    gray = ImageOps.autocontrast(ImageOps.grayscale(source), cutoff=0.5)
    rng = random.Random(50400+n)
    pixels = []
    for value in gray.getdata():
        # Monochrome fine grain: uniform +/-2% of full luminance range.
        t = min(1.0,max(0.0,(value/255.0)**0.96 + rng.uniform(-0.02,0.02)))
        pixels.append(color(t))
    out = Image.new('RGB',source.size)
    out.putdata(pixels)
    out.save(f'graded-{n}.png')
    print(f'graded-{n}.png: {out.size}, RGB')
