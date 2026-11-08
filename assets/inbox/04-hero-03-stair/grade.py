from PIL import Image
import random

# All output colors lie along this warm palette, including the grain.
stops = [(0.0, (20,18,15)), (0.50, (116,102,79)),
         (1.0, (253,246,236))]
def color(t):
    for (a, ca), (b, cb) in zip(stops, stops[1:]):
        if t <= b:
            f = (t-a)/(b-a)
            return tuple(round(x+(y-x)*f) for x,y in zip(ca,cb))
    return stops[-1][1]

for variant in (1,2):
    im = Image.open(f'raw-{variant}.png').convert('RGB')
    assert im.size == (1536,1024), im.size
    gray = im.convert('L')
    hist = gray.histogram()
    def percentile(frac):
        total = 0
        for i, n in enumerate(hist):
            total += n
            if total >= im.width*im.height*frac:
                return i
    lo, hi = percentile(.005), percentile(.995)
    rng = random.Random(4030+variant)
    pixels = []
    for v in gray.getdata():
        t = max(0., min(1., (v-lo)/(hi-lo))) ** .92
        # Fine monochrome grain: +/-2% of tonal range, before palette mapping.
        t = max(0., min(1., t+rng.uniform(-.02,.02)))
        pixels.append(color(t))
    out = Image.new('RGB', im.size)
    out.putdata(pixels)
    out.save(f'graded-{variant}.png')
    print(f'graded-{variant}.png: {out.size}, luminance anchors {lo}..{hi}')
