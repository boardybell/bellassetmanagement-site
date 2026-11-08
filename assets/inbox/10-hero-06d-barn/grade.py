from PIL import Image
import random
from pathlib import Path

# A restrained stone midpoint with 20% of the specified gold-brown.
shadow = (20,18,15)
mid = tuple(.8*a+.2*b for a,b in zip((110,103,89),(138,100,37)))
highlight = (253,246,236)

def color(t):
    if t <= .5:
        a,b,u=shadow,mid,t*2
    else:
        a,b,u=mid,highlight,(t-.5)*2
    return tuple(round(x+(y-x)*u) for x,y in zip(a,b))

for variant in (1,2):
    source=Image.open(f"raw-{variant}.png").convert("RGB")
    assert source.size == (1536,1024), source.size
    gray=source.convert("L")
    hist=gray.histogram()
    def percentile(q):
        target=sum(hist)*q
        count=0
        for i,n in enumerate(hist):
            count+=n
            if count>=target: return i
    lo,hi=percentile(.005),percentile(.995)
    rng=random.Random(1060+variant)
    pixels=[]
    for v in gray.getdata():
        t=max(0,min(1,(v-lo)/max(1,hi-lo)))
        # Fine monochrome uniform grain, +/-2% of full tonal scale.
        t=max(0,min(1,t+rng.uniform(-.02,.02)))
        pixels.append(color(t))
    result=Image.new("RGB",source.size)
    result.putdata(pixels)
    result.save(f"graded-{variant}.png")
    print(f"graded-{variant}.png: {result.size}, RGB; luminance endpoints {lo}, {hi}")
