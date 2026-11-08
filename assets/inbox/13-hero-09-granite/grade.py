from PIL import Image
import random

STOPS = [(0, (13,22,38)), (0.24, (22,35,59)), (0.94, (201,204,211)), (1, (253,246,236))]

def palette(t):
    for (a, ca), (b, cb) in zip(STOPS, STOPS[1:]):
        if t <= b:
            f = (t-a)/(b-a)
            return tuple(round(x+(y-x)*f) for x,y in zip(ca,cb))
    return STOPS[-1][1]

for variant in (1,2):
    im = Image.open(f'raw-{variant}.png').convert('RGB')
    assert im.size == (1536,1024), im.size
    rng = random.Random(1309+variant)
    pixels = []
    for r,g,b in im.getdata():
        lum = (0.2126*r+0.7152*g+0.0722*b)/255
        # Keep the night exposure; a gentle shoulder preserves stone texture.
        tone = lum ** 1.10
        # Fine one-pixel monochrome grain, uniform +/- 2% luminance.
        tone = min(1, max(0, tone+rng.uniform(-0.02,0.02)))
        pixels.append(palette(tone))
    out = Image.new('RGB', im.size)
    out.putdata(pixels)
    out.save(f'graded-{variant}.png')
    print(f'graded-{variant}.png: {out.size}')
