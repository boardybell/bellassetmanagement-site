from PIL import Image
import random

# Grain is applied to the scalar tone before palette mapping, preserving hue.
# Midtone is an 85:15 blend of the two permitted midtone anchors.
anchors = [(0.0, (20,18,15)), (0.5, (114.2,102.55,81.2)),
           (1.0, (253,246,236))]

for variant in (1,2):
    im = Image.open(f'raw-{variant}.png').convert('RGB')
    assert im.size == (1536,1024), im.size
    rng = random.Random(9060 + variant)
    out = []
    for r,g,b in im.getdata():
        tone = (0.2126*r + 0.7152*g + 0.0722*b) / 255
        tone = min(1., max(0., tone + rng.uniform(-0.02,0.02)))
        for (lo,a),(hi,z) in zip(anchors,anchors[1:]):
            if tone <= hi:
                t = (tone-lo)/(hi-lo)
                out.append(tuple(round(x+(y-x)*t) for x,y in zip(a,z)))
                break
    graded = Image.new('RGB',im.size)
    graded.putdata(out)
    graded.save(f'graded-{variant}.png')
    assert all(r >= g >= b for r,g,b in out)
    print(f'graded-{variant}.png: {graded.size}, RGB, warm palette verified')
