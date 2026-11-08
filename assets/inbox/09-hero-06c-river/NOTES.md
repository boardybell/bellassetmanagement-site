# Brief 09 — hero 06c-river

Generated with the built-in image generation tool. Both untouched originals and graded files are 1536 × 1024 PNGs.

## Variant 1 — exact prompt

Use case: photorealistic-natural. Create a landscape 1536x1024 photograph for a restrained cinematic private holding company website. Close overhead view of smooth river stones submerged in very shallow crystal-clear water. An unarranged, quiet composition of rounded oval stones in varied sizes, broad smooth taupe stones with small dark pebbles nestled between, subtle mineral texture. Water surface barely visible, only faint soft refraction and a few subdued highlights, no dramatic ripples or caustics. Soft overcast daylight, natural 50mm lens, realistic tactile detail, gentle contrast, architectural compositional restraint. Warm stone neutrals, charcoal-brown shadows, muted gold-brown undertones, creamy highlights; no blue, green, red or saturated orange. Natural edge-to-edge riverbed with main stones fully framed and supporting pebbles continuing unobtrusively past boundaries, no awkward crops. No people, body parts, human silhouettes, animals, vehicles, text, letters, numbers, signage, logos, watermarks, flags, buildings or glass towers. Photographic realism only, no stylization, no illustration, no CGI.

## Variant 2 — exact prompt

Use case: photorealistic-natural. Generate a 1536x1024 landscape photograph, a second distinct riverbed composition for a restrained cinematic private holding company hero. Camera directly overhead, close to smooth river stones beneath a thin layer of perfectly clear shallow water. Fewer, larger elongated river-worn stones arranged naturally with flowing diagonal rhythms, a pale broad oblong stone just off center, darker rounded stones and fine gravel filling quiet interstices. All principal stones completely within the frame, a naturally continuous supporting riverbed at edges. Barely perceptible water surface with delicate softened refraction, no splash, bubbles, foam, bold ripple patterns or bright caustics. Soft diffuse light, natural 50mm photographic lens, sharp subtle mineral details, realistic wet stone texture with restrained sheen. Calm, architectural, understated cinematic photographic realism, no stylization or CGI. Warm taupe, warm grey, charcoal brown, muted gold-brown, ivory; no blue, green, red or saturated orange. No people, body parts, silhouettes of people, animals, vehicles, text, letters, numbers, signage, logos, watermarks, flags, architecture or modern glass towers. Avoid awkward cropped focal stones.

## Grading

Applied with Pillow using `python3`; reproducible code is in `grade.py`. Originals were copied byte-for-byte to raw-1.png and raw-2.png without pixel changes.

Converted RGB to scalar luminance with weights 0.2126 R + 0.7152 G + 0.0722 B. Added fine per-pixel monochrome uniform grain of ±2% full-scale tone, with deterministic seeds 9061 and 9062, clamped to [0,1]. Mapped the grain-bearing tone through a continuous piecewise-linear warm palette: 0 → #14120F; 0.5 → an 85:15 blend of #6E6759 and #8A6425 (RGB 114.2, 102.55, 81.2); 1 → #FDF6EC. Thus all output colors interpolate only between the specified warm anchors; grain cannot introduce foreign hues. Rounded to 8-bit RGB and saved at original size. Verified dimensions and warm channel ordering for every pixel. No cropping, resizing, sharpening, or compositional alteration.

