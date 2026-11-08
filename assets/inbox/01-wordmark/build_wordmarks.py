from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from PIL import Image, ImageDraw, ImageFilter
import io
import math
import cairosvg
import xml.etree.ElementTree as ET

ROOT=Path(__file__).parent
REINFORCED = set()
BLACK='#14120F'; CREAM='#FDF6EC'; NAVY='#16233B'
def font(name,**axes):
 f=TTFont(ROOT/'_ref'/name)
 return instantiateVariableFont(f,axes,inplace=False) if 'fvar' in f else f
plex=font('IBMPlexSans[wdth,wght].ttf',wght=500,wdth=100)
def cap(f):
 gs=f.getGlyphSet(); p=BoundsPen(gs); gs[f.getBestCmap()[ord('H')]].draw(p);return p.bounds[3]
def glyph(f,ch,x,baseline,height):
 gs=f.getGlyphSet(); n=f.getBestCmap()[ord(ch)]; s=height/cap(f)
 p=SVGPathPen(gs);gs[n].draw(TransformPen(p,(s,0,0,-s,x,baseline)))
 b=BoundsPen(gs);gs[n].draw(TransformPen(b,(s,0,0,-s,x,baseline)))
 return p.getCommands(),f['hmtx'][n][0]*s,b.bounds
# Optical pair adjustments in units of cap height.
PAIRS={'AS':-.025,'MA':-.025,'AN':-.018,'AG':-.015,'GE':-.012,'ME':-.015,'NT':-.012,'BE':-.01,'LL':-.012,'ET':-.015}
def line(words,f,smallf,h,ratio,tracking=1.1,gap=28):
 paths=[];bounds=[]; x=0
 for wi,word in enumerate(words.split()):
  if wi:x+=gap
  for i,ch in enumerate(word):
   ff=f if i==0 else smallf; hh=h if i==0 else h*ratio
   if i:x+=PAIRS.get(word[i-1]+ch,0)*h
   d,a,b=glyph(ff,ch,x,h,hh);paths.append((d, hh*.045 if id(ff) in REINFORCED else 0));bounds.append(b);x+=a+tracking
 minx=min(b[0] for b in bounds);maxx=max(b[2] for b in bounds)
 return paths,bounds,maxx-minx,minx

def descriptor(text,height,tracking):
 paths=[];bounds=[];x=0
 for ch in text:
  if ch==' ':x+=height*.62+tracking;continue
  d,a,b=glyph(plex,ch,x,height,height);paths.append(d);bounds.append(b);x+=a+tracking
 lo=min(b[0] for b in bounds);hi=max(b[2] for b in bounds)
 return paths,hi-lo,lo

def group(ds,x=0,y=0):return f'<g transform="translate({x:.5f} {y:.5f})">'+''.join(f'<path d="{d[0]}" stroke="currentColor" stroke-width="{d[1]:.5f}" stroke-linejoin="round"/>' if isinstance(d,tuple) and d[1] else f'<path d="{d[0] if isinstance(d,tuple) else d}"/>' for d in ds)+'</g>'
def svg(body,w,h,color,bg=False):
 return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w:.5f}" height="{h:.5f}" viewBox="0 0 {w:.5f} {h:.5f}">'+(f'<path fill="{bg}" d="M0 0H{w}V{h}H0Z"/>' if bg else '')+f'<g fill="{color}" color="{color}">{body}</g></svg>'
configs=[
 ('PlayfairDisplay[wght].ttf',400,460,.77,1.0,28,17,6.2,.145,'HOLDING COMPANY',False),
 ('LibreBodoni[wght].ttf',450,500,.78,1.2,28,17,6.4,.145,'HOLDING COMPANY',False),
 ('LibreBodoni[wght].ttf',400,480,.80,.7,25,16,4.7,.12,'HOLDING COMPANY',False),
 ('PlayfairDisplay[wght].ttf',450,500,.70,1.8,29,16,7.0,.17,'JACKSON, WYOMING',False),
 ('LibreBodoni[wght].ttf',450,500,.76,1.5,25,15,5.0,.14,'HOLDING COMPANY',True)]
notes=['# Bell Asset Management wordmarks','','All lettering is outlined from the supplied SIL Open Font License fonts. SVGs contain paths with no text elements or font references. Main words use large initials and optically weighted smaller capitals. Descriptor: IBM Plex Sans Medium (500). Each descriptor has two separate horizontal rules.','','Transparent PNGs preserve the lockup aspect ratio and are centered in the requested canvases. Preview panels use cream and navy.','']
for idx,(name,w,sw,ratio,track,gap,dh,dt,rulefrac,desc,stack) in enumerate(configs,1):
 axes={'opsz':72} if name.startswith('BodoniModa') else {}
 f=font(name,wght=w,**axes);sf=font(name,wght=sw,**axes)
 if idx in (2,5): REINFORCED.update((id(f),id(sf)))
 else: REINFORCED.difference_update((id(f),id(sf)))
 body=''; pad=10
 if not stack:
  ds,bs,W,lo=line('BELL ASSET MANAGEMENT',f,sf,100,ratio,track,gap)
  body=group(ds,pad-lo,pad); mainbottom=110
 else:
  ds,bs,W,lo=line('ASSET MANAGEMENT',f,sf,65,ratio,track,gap)
  top,tb,tw,tlo=line('BELL',f,sf,106,.78,2,20)
  body=group(top,pad+(W-tw)/2-tlo,pad)+group(ds,pad-lo,139)
  mainbottom=204
 dp,dw,dlo=descriptor(desc,dh,dt); dy=mainbottom+(40 if not stack else 29)
 # Keep descriptor and rules balanced as one centered group.
 rl=W*rulefrac; rg=25;total=dw+2*(rg+rl)
 if total>W*.94:
  rl=(W*.94-dw)/2-rg
 start=pad+(W-(dw+2*(rl+rg)))/2
 body+=group(dp,start+rl+rg-dlo,dy)
 ry=dy+dh/2;th=.95
 for rx in (start,start+rl+rg+dw+rg):body+=f'<path d="M{rx:.5f} {ry:.5f}h{rl:.5f}v{th}h{-rl:.5f}Z"/>'
 H=dy+dh+pad;W+=2*pad
 out=ROOT/f'wm-{idx:02}';out.mkdir(exist_ok=True)
 renders={}
 for label,col in [('black',BLACK),('cream',CREAM)]:
  source=svg(body,W,H,col);(out/f'wm-{idx:02}-{label}.svg').write_text(source)
  for cw,ch in [(1335,250),(2670,500)]:
   scale=min((cw-24)/W,(ch-24)/H)
   rw,rh=round(W*scale),round(H*scale)
   raw=cairosvg.svg2png(bytestring=source.encode(),output_width=rw,output_height=rh)
   import io
   im=Image.open(io.BytesIO(raw)); canvas=Image.new('RGBA',(cw,ch));canvas.alpha_composite(im,((cw-rw)//2,(ch-rh)//2));canvas.save(out/f'wm-{idx:02}-{label}-{cw}x{ch}.png')
  scale=min(1460/W,320/H);raw=cairosvg.svg2png(bytestring=source.encode(),output_width=round(W*scale),output_height=round(H*scale));renders[label]=Image.open(io.BytesIO(raw))
 preview=Image.new('RGBA',(1600,900),CREAM);preview.paste(NAVY,(0,450,1600,900))
 for label,cy in [('black',225),('cream',675)]:
  im=renders[label];preview.alpha_composite(im,((1600-im.width)//2,cy-im.height//2))
 preview.convert('RGB').save(out/f'wm-{idx:02}-preview.png')
 notes += [f'## wm-{idx:02}',f'{name.split("[")[0]}: initial weight {w}, smaller-cap weight {sw}; smaller caps {ratio:.0%} of initial height. '+('Bodoni Moda optical size 72. ' if axes else '')+f'Main tracking {track:g}, word gap {gap:g}, based on 100-unit initials. Descriptor {desc}, cap height {dh}, tracking {dt:g}. Each rule is {rl:.1f} units. '+('Stacked BELL over ASSET MANAGEMENT.' if stack else 'Single main line.')+(' Close to the reference lockup proportions.' if idx<=2 else '')+(' Libre Bodoni fallback with same-color round contour reinforcement, total stroke width 4.5% of each glyph cap height.' if idx in (2,5) else ''),'']
mono=ROOT/'monogram';mono.mkdir(exist_ok=True)
for idx in range(1,4):
 f=font('PlayfairDisplay[wght].ttf',wght=450) if idx==1 else font('BodoniModa[opsz,wght].ttf',wght=450,opsz=48)
 if idx==3:
  f=font('LibreBodoni[wght].ttf',wght=500); REINFORCED.add(id(f))
 else: REINFORCED.discard(id(f))
 text='B' if idx<3 else 'BAM';h=170 if idx<3 else 72
 ds,bs,W,lo=line(text,f,f,h,1,1.5,0)
 body=group(ds,(256-W)/2-lo,(256-h)/2)
 if idx==2:
  body+='<path fill-rule="evenodd" d="M24 24H232V232H24ZM26 26V230H230V26Z"/>'
 for label,fg,bg in [('navy-on-cream',NAVY,CREAM),('cream-on-navy',CREAM,NAVY)]:
  source=svg(body,256,256,fg,bg);(mono/f'monogram-{idx:02}-{label}.svg').write_text(source)
  cairosvg.svg2png(bytestring=source.encode(),write_to=str(mono/f'monogram-{idx:02}-{label}.png'),output_width=256,output_height=256)
notes+=['## Monograms','01: Playfair Display B, weight 450, generous clear space.','02: Bodoni Moda B, weight 450 and optical size 48, inside a fine square frame.','03: Libre Bodoni BAM fallback, equal-height capitals, weight 500; round contour reinforcement at 4.5% of each glyph cap height.','Each proposal has navy on cream and cream on navy square SVGs, plus 256-pixel PNG previews.','','The build script is included for reproducibility.']
(ROOT/'NOTES.md').write_text('\n'.join(notes)+'\n')
# Validate requested files and outlined SVGs.
for p in list(ROOT.glob('wm-*/*.svg'))+list(mono.glob('*.svg')):
 root=ET.fromstring(p.read_text()); assert not any(e.tag.endswith('text') for e in root.iter());assert 'font' not in p.read_text()
for p in ROOT.glob('wm-*/*.png'):
 im=Image.open(p); assert im.size in [(1335,250),(2670,500),(1600,900)]
print('Built and validated 5 wordmark packages and 3 paired monograms.')

# Measure sustained stroke cores, excluding pointed contour ends. Sample at a
# 400 px cap height in both axes; correct diagonal widths by centerline slope.
def stroke_measure(f, ch, reinforcement=0):
 d,advance,bounds=glyph(f,ch,30,430,400)
 body=f'<path d="{d}" stroke="{BLACK}" stroke-width="{400*reinforcement}" stroke-linejoin="round"/>'
 raw=cairosvg.svg2png(bytestring=svg(body,650,470,BLACK).encode())
 mask=Image.open(io.BytesIO(raw)).getchannel('A')
 values=[]
 for image in (mask,mask.transpose(Image.Transpose.ROTATE_90)):
  pix=image.load(); rows=[]
  for y in range(image.height):
   runs=[]; start=None
   for x in range(image.width+1):
    inside=x<image.width and pix[x,y]>=128
    if inside and start is None:start=x
    if not inside and start is not None:
     runs.append((start,x));start=None
   rows.append(runs)
  span=32
  for y in range(len(rows)-span):
   section=rows[y:y+span]
   if not section[0] or any(len(r)!=len(section[0]) for r in section):continue
   for k in range(len(section[0])):
    widths=[r[k][1]-r[k][0] for r in section]
    centers=[(r[k][1]+r[k][0])/2 for r in section]
    slope=(centers[-1]-centers[0])/(span-1)
    if max(widths)-min(widths)>1:continue
    if max(abs(c-centers[0]-i*slope) for i,c in enumerate(centers))>1:continue
    width=sum(widths)/span/math.sqrt(1+slope*slope)
    if width>=2:values.append(width/400)
 assert values, ch
 return min(values)

# Per-glyph at-size connectivity check, including the descriptor. Every final
# path is independently rendered at the same scale and position as the SVG.
def connected_components(mask):
 pixels=set((x,y) for y in range(mask.height) for x in range(mask.width) if mask.getpixel((x,y))>=16)
 components=[]
 while pixels:
  todo=[pixels.pop()];n=0
  while todo:
   x,y=todo.pop();n+=1
   for dy in (-1,0,1):
    for dx in (-1,0,1):
     q=(x+dx,y+dy)
     if q in pixels:pixels.remove(q);todo.append(q)
  components.append(n)
 return sorted(components,reverse=True)

def check_svg(path):
 root=ET.fromstring(path.read_text()); w,h=map(float,(root.attrib['width'],root.attrib['height']))
 # Remove background when checking paired monograms.
 painted=root.find('{http://www.w3.org/2000/svg}g')
 painted.set('fill',BLACK);painted.set('color',BLACK)
 checks=[]
 def visit(node,transforms):
  transforms=transforms+[node.attrib['transform']] if 'transform' in node.attrib else transforms
  for child in node:
   if child.tag.endswith('g'):visit(child,transforms)
   elif child.tag.endswith('path'):
    attrs=dict(child.attrib)
    if 'stroke' in attrs:attrs['stroke']=BLACK
    single=ET.tostring(ET.Element('path',attrs),encoding='unicode')
    for transform in reversed(transforms):single=f'<g transform="{transform}">{single}</g>'
    raw=cairosvg.svg2png(bytestring=svg(single,w,h,BLACK).encode(),output_width=300,output_height=round(300*h/w))
    components=connected_components(Image.open(io.BytesIO(raw)).getchannel('A'))
    checks.append(components)
 visit(painted,[])
 raw=cairosvg.svg2png(bytestring=svg(ET.tostring(painted,encoding='unicode'),w,h,BLACK).encode(),output_width=300,output_height=round(300*h/w))
 # This file preserves the exact 300 px raster used by the check.
 dest=ROOT/'validation';dest.mkdir(exist_ok=True)
 Image.open(io.BytesIO(raw)).save(dest/(path.stem+'-300.png'))
 return checks

measurements={}
for weight in (450,500):
 f=font('LibreBodoni[wght].ttf',wght=weight)
 measurements[weight]={ch:stroke_measure(f,ch,.045) for ch in sorted(set('BELLASSETMANAGEMENT'))}
 print('Stroke measurements',weight,{ch:round(v*100,2) for ch,v in measurements[weight].items()})
 assert min(measurements[weight].values())>=.06
for path in sorted(ROOT.glob('wm-*/*-black.svg'))+[mono/'monogram-03-navy-on-cream.svg']:
 checks=check_svg(path)
 print(path.name,'paths',len(checks),'component counts',[len(c) for c in checks])
 if path.parent.name in ('wm-02','wm-05','monogram'):
  assert all(len(c)==1 for c in checks), (path,checks)

# Comparison boards: same option order, centered, with exact header-size art.
comparison=Image.new('RGB',(1600,1500),CREAM)
small=Image.new('RGB',(400,800),CREAM)
for idx in range(1,6):
 source=(ROOT/f'wm-{idx:02}'/f'wm-{idx:02}-black.svg').read_bytes()
 for canvas,width,rowheight,labelsize in [(comparison,1400,300,20),(small,240,160,13)]:
  dimensions=ET.fromstring(source).attrib
  if canvas is comparison:width=min(width,round(230*float(dimensions['width'])/float(dimensions['height'])))
  raw=cairosvg.svg2png(bytestring=source,output_width=width)
  im=Image.open(io.BytesIO(raw))
  y=(idx-1)*rowheight
  # Labels identify the options outside the artwork.
  ImageDraw.Draw(canvas).text((20,y+12),f'wm-{idx:02}',fill=BLACK)
  canvas.paste(im,((canvas.width-im.width)//2,y+(rowheight-im.height)//2+8),im)
comparison.save(ROOT/'wordmark-comparison.png')
small.save(ROOT/'wordmark-small.png')
monocomp=Image.new('RGB',(768,512),CREAM)
for idx in range(1,4):
 for row,label in enumerate(('navy-on-cream','cream-on-navy')):
  monocomp.paste(Image.open(mono/f'monogram-{idx:02}-{label}.png'),((idx-1)*256,row*256))
monocomp.save(mono/'monogram-comparison.png')

descriptor_measurements={ch:stroke_measure(plex,ch) for ch in sorted(set('HOLDINGCOMPANY'))}
print('Descriptor hairlines', {ch:round(value*100,2) for ch,value in descriptor_measurements.items()})
assert min(descriptor_measurements.values())>=.06
notes += ['', '## Brief 01b verification',
 'Bodoni Moda at opsz 11, weight 500 still has 39-unit serifs against a 1500-unit cap height (2.60%). Libre Bodoni at weight 500 has 27.5-unit serifs against a 754-unit cap height (3.65%). Neither unmodified font meets the floor. Options 02, 05 and monogram 03 therefore use Libre Bodoni with same-color round contour reinforcement at 4.5% of each glyph cap height. This is vector path styling, with no text or font dependency.',
 'Minimum sustained hairlines are measured from CairoSVG alpha masks at 400 px cap height, threshold 128/255, using horizontal and vertical cross-sections sustained for 8% of cap height, with diagonal slope correction. Pointed contour ends are excluded because their mathematical width approaches zero. Quantization uncertainty is approximately 0.25 percentage points. The 6% floor applies to the rebuilt lettering; unchanged options and decorative rules retain brief 01 styling.',
 '', '| Weight | Glyph | Minimum hairline / cap height |', '| --- | --- | --- |']
for weight,measure in measurements.items():
 for ch,value in measure.items():notes.append(f'| {weight} | {ch} | {value:.2%} |')
notes += ['', f'Descriptor IBM Plex Sans 500: minimum sustained hairline {min(descriptor_measurements.values()):.2%} of cap height across HOLDING COMPANY.', '', '| Rebuilt artwork | Minimum main hairline / cap | Equivalent thickness at 300 px SVG width |', '| --- | --- | --- |']
for idx in (2,5):
 root=ET.fromstring((ROOT/f'wm-{idx:02}'/f'wm-{idx:02}-black.svg').read_text())
 scale=300/float(root.attrib['width'])
 # Small capitals are the limiting size, with the initial BELL row larger in option 05.
 h=100*.78 if idx==2 else 65*.76
 minimum=min(measurements[500].values())
 notes.append(f'| wm-{idx:02} | {min(min(measurements[450].values()),minimum):.2%} | {minimum*h*scale:.3f} px (small-cap hairline) |')
notes.append(f'| monogram-03 | {min(measurements[500][ch] for ch in "BAM"):.2%} | {min(measurements[500][ch] for ch in "BAM")*72*300/256:.3f} px |')
notes += ['', 'Each final black wordmark SVG was also rendered at exactly 300 px wide with CairoSVG. The paired monogram 03 was checked as black on transparency at the same 300 px square size. Each glyph path in options 02, 05 and monogram 03 remains visible and forms one connected component at alpha >= 16/255, including the wordmark descriptors. The exact test rasters are in validation/. Unchanged wordmarks 01, 03 and 04 were rendered and inspected but are outside this re-brief stroke repair.',
 'wordmark-comparison.png contains all five options. wordmark-small.png stacks all five black SVGs at exactly 240 px wide on #FDF6EC. The monogram comparison has also been refreshed.',
 'At these widths, fractional-pixel strokes use antialiasing. The 6% geometric floor does not imply one fully opaque device pixel in every small descriptor stroke.']
(ROOT/'NOTES.md').write_text('\n'.join(notes)+'\n')

# Final delivery checks after all previews and notes are written.
for path in list(ROOT.glob('wm-*/*.svg'))+list(mono.glob('*.svg')):
 content=path.read_text()
 assert '<text' not in content and 'font' not in content and '\u2014' not in content
for path in ROOT.glob('wm-*/*x*.png'):
 im=Image.open(path)
 assert im.mode=='RGBA' and im.getpixel((0,0))[3]==0
assert Image.open(ROOT/'wordmark-small.png').size==(400,800)
assert Image.open(ROOT/'wordmark-comparison.png').size==(1600,1500)
assert '\u2014' not in (ROOT/'NOTES.md').read_text()
print('Delivery checks passed: dimensions, transparency, path-only SVGs, previews and notes.')
