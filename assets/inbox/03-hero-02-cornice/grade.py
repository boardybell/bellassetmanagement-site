"""Reproduce the navy grade with Pillow and deterministic monochrome grain."""
from PIL import Image
import random

STOPS = [(0, (13, 22, 38)), (100, (22, 35, 59)),
         (205, (90, 105, 130)), (248, (201, 204, 211)),
         (255, (253, 246, 236))]

def palette(t):
    t = max(0, min(255, t))
    for (a, ca), (b, cb) in zip(STOPS, STOPS[1:]):
        if t <= b:
            f = (t-a)/(b-a)
            return tuple(round(x+(y-x)*f) for x, y in zip(ca, cb))
    return STOPS[-1][1]

for variant in (1, 2):
    source = Image.open(f'raw-{variant}.png').convert('RGB')
    assert source.size == (1536, 1024), source.size
    rng = random.Random(300+variant)
    pixels = []
    for r, g, b in source.getdata():
        luminance = 0.2126*r + 0.7152*g + 0.0722*b
        # One neutral grain value per pixel, +/-2% of the 8-bit scale.
        # Grain precedes palette mapping so all resulting hues stay on the ramp.
        pixels.append(palette(luminance + rng.uniform(-5.1, 5.1)))
    result = Image.new('RGB', source.size)
    result.putdata(pixels)
    result.save(f'graded-{variant}.png')
    print(f'graded-{variant}.png: {result.size}, RGB')
