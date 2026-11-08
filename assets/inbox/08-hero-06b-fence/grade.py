from PIL import Image
import random, math
from pathlib import Path

# One continuous warm tritone; gold-brown gently inflects the stone midtone.
shadow=(20,18,15)
stone=(110,103,89)
gold=(138,100,37)
mid=tuple(0.9*s+0.1*g for s,g in zip(stone,gold))
highlight=(253,246,236)
def palette(t):
    if t <= 0.46:
        f=t/0.46
        a,b=shadow,mid
    else:
        f=(t-0.46)/0.54
        a,b=mid,highlight
    return tuple(round(x+(y-x)*f) for x,y in zip(a,b))
lut=[palette(i/65535) for i in range(65536)]
for variant in (1,2):
    im=Image.open(f'raw-{variant}.png').convert('RGB')
    assert im.size==(1536,1024), im.size
    rng=random.Random(6080+variant)
    result=[]
    for r,g,b in im.getdata():
        y=(0.2126*r+0.7152*g+0.0722*b)/255
        # Subtle lift keeps snow luminous without flattening timber texture.
        y=y**0.92
        # Fine independent monochrome grain, bounded +/-2% full scale.
        y=max(0,min(1,y+rng.uniform(-0.02,0.02)))
        result.append(lut[round(y*65535)])
    out=Image.new('RGB',im.size)
    out.putdata(result)
    out.save(f'graded-{variant}.png')
    assert all(r>=g>=b for r,g,b in out.getdata())
    print(f'graded-{variant}.png: {out.size}, RGB, palette ordering verified')

