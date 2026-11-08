from PIL import Image
import random

# Scalar grain before palette mapping prevents any off-palette chromatic noise.
shadow = (20, 18, 15)
stone = (110, 103, 89)
gold = (138, 100, 37)
cream = (253, 246, 236)

def blend(a, b, t):
    return tuple(x + (y-x)*t for x, y in zip(a,b))

for variant in (1, 2):
    im = Image.open(f'raw-{variant}.png').convert('RGB')
    assert im.size == (1536, 1024), im.size
    rng = random.Random(1107 + variant)
    out = []
    for r,g,b in im.getdata():
        lum = (0.2126*r + 0.7152*g + 0.0722*b)/255
        # Gently lift material detail while retaining the dark cinematic exposure.
        t = min(1., max(0., lum**0.88 + rng.uniform(-0.02, 0.02)))
        # Neutral stone on wood, restrained gold-brown in warmer source metal.
        warmth = max(0., min(1., ((r-b)/max(r,1)-0.35)/0.45))
        mid = blend(stone, gold, warmth*0.65)
        color = blend(shadow, mid, t/0.50) if t <= .50 else blend(mid, cream, (t-.50)/.50)
        out.append(tuple(round(c) for c in color))
    graded = Image.new('RGB', im.size)
    graded.putdata(out)
    graded.save(f'graded-{variant}.png')
    print(f'graded-{variant}.png: {graded.size}, RGB; warm palette mapping complete')
