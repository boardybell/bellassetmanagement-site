from PIL import Image
import random, math
anchors=[(0,(13,22,38)),(.20,(22,35,59)),(.94,(201,204,211)),(1,(253,246,236))]
def color(t):
    t=max(0,min(1,t))
    for (a,c),(b,d) in zip(anchors,anchors[1:]):
        if t<=b:
            f=(t-a)/(b-a)
            return tuple(round(v+(w-v)*f) for v,w in zip(c,d))
    return anchors[-1][1]
for n in (1,2):
    im=Image.open(f'raw-{n}.png').convert('RGB')
    assert im.size==(1536,1024),im.size
    rng=random.Random(7200+n)
    out=[]
    for idx,(r,g,b) in enumerate(im.getdata()):
        x=(idx%im.width)/(im.width-1)
        lum=(.2126*r+.7152*g+.0722*b)/255
        # Deep shadow on left, eased transition to untouched architectural detail.
        u=max(0,min(1,(x-.45)/.17))
        blend=u*u*(3-2*u)
        t=(.035+lum*.10)*(1-blend)+(lum*.90)*blend
        # Fine monochrome grain in tonal coordinate, bounded to the palette.
        t+=rng.uniform(-.02,.02)
        out.append(color(t))
    dest=Image.new('RGB',im.size);dest.putdata(out)
    dest.save(f'graded-{n}.png')
    print(f'graded-{n}.png: {dest.size}')

