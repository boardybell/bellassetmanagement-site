from PIL import Image
import random
from bisect import bisect_right

stops = [(0.0,(13,22,38)),(0.45,(22,35,59)),(0.96,(201,204,211)),(1.0,(253,246,236))]
def palette(t):
    t=max(0,min(1,t))
    j=min(len(stops)-2,max(0,bisect_right([s[0] for s in stops],t)-1))
    a,ca=stops[j]; b,cb=stops[j+1]
    f=(t-a)/(b-a)
    return tuple(round(ca[k]+f*(cb[k]-ca[k])) for k in range(3))
for variant in (1,2):
    im=Image.open(f'raw-{variant}.png').convert('RGB')
    assert im.size == (1536,1024), im.size
    rng=random.Random(6050+variant)
    out=Image.new('RGB', im.size)
    pixels=[]
    for r,g,b in im.getdata():
        y=(0.2126*r+0.7152*g+0.0722*b)/255
        # Fine monochrome grain in the single tonal coordinate; preserves palette.
        t=max(0,min(1,y**1.7+rng.uniform(-0.02,0.02)))
        pixels.append(palette(t))
    out.putdata(pixels)
    out.save(f'graded-{variant}.png')
    print(f'graded-{variant}.png: {out.size}, RGB')
preview=Image.new('RGB',(800,500))
for n in (1,2):
    im=Image.open(f'graded-{n}.png')
    im=im.crop((358,0,1178,1024)).resize((400,500),Image.Resampling.LANCZOS)
    preview.paste(im,((n-1)*400,0))
preview.save('crop-review.jpg')

