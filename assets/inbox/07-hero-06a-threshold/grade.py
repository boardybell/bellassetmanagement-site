from PIL import Image
import random

STOPS = [(0.0, (20,18,15)), (0.48, (110,103,89)),
         (0.67, (138,100,37)), (1.0, (253,246,236))]

def color(t):
    for (a, ca), (b, cb) in zip(STOPS, STOPS[1:]):
        if t <= b:
            f = max(0.0, (t-a)/(b-a))
            return tuple(round(x+(y-x)*f) for x,y in zip(ca,cb))
    return STOPS[-1][1]

for variant in (1, 2):
    im = Image.open(f'raw-{variant}.png').convert('RGB')
    assert im.size == (1536,1024), im.size
    gray = im.convert('L')
    rng = random.Random(7010 + variant)
    # Fine independent monochrome grain: uniform +/-2% of full scale.
    # Grain in luminance before palette mapping keeps every pixel on the ramp.
    pixels = [color(min(1.0,max(0.0,v/255.0+rng.uniform(-0.02,0.02))))
              for v in gray.getdata()]
    out = Image.new('RGB', im.size)
    out.putdata(pixels)
    out.save(f'graded-{variant}.png')
    print(f'graded-{variant}.png: {out.size}, RGB, palette ramp with 2% grain')
