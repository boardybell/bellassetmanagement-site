# Brief 03 — hero 02-cornice

Generated with the built-in image generation tool. Both originals are untouched 1536 × 1024 PNGs, copied byte-for-byte from the tool output. No cropping, resizing, retouching, or sharpening was applied.

## Variant 1 — exact prompt

Use case: photorealistic-natural. Create a landscape 1536x1024 architectural photograph for a restrained cinematic private holding company website hero band. Looking steeply upward at the corner of a carved limestone cornice and pediment of a monumental classical building, with authentic egg-and-dart moulding and crisp rectangular dentils. Oblique corner view, corner positioned right of center, cornice recedes diagonally left into depth; leave ample calm dark evening sky above and to the left. Natural 50mm lens perspective, realistic stone pores, subtle weathering, structurally credible continuous carvings. One single crisp raking light from the left reveals the relief; deep unlit recesses, quiet dark exposure. Cool limestone, dark navy evening sky, restrained low key photographic realism, no stylization, no CGI appearance. Building language: dignified neoclassical carved stone, like a historic institutional facade. Compose edges deliberately, keep pediment corner comfortably inside the frame, no awkwardly severed architectural focal details. Image only; website text will sit below this image. No people, body parts, human silhouettes, animals, vehicles, text, letters, numbers, inscriptions, signage, logos, watermarks, flags, or modern glass towers.

## Variant 2 — exact prompt

Use case: photorealistic-natural. Generate a new landscape 1536x1024 photograph, a different composition of a monumental classical limestone cornice and triangular pediment corner seen from far below, for a restrained architectural website hero. Place the projecting outer corner in the left half with two stone faces receding right and left; the pediment's sloping carved rake is clearly readable against broad empty dark evening sky across the upper half and right. Egg-and-dart moulding, regular rectangular dentils, softly aged carved limestone with real fine pores and restrained weathering. Single crisp raking light from the left, deep sculptural shadows under the overhang, subtle edge illumination. Natural 50mm lens, believable architectural geometry, photographic realism, cinematic quiet, low key exposure, cool stone and dark navy sky. Dignified historic institutional neoclassical building language. Keep the focal corner and pediment peak fully within the frame with breathing room; building continues naturally beyond lower edges. Calm dark areas; no copy over the image, website text sits below. No stylization, illustration, or CGI. No people or body parts, human silhouettes, animals, vehicles, text, letters, numbers, inscriptions, signage, logos, watermarks, flags, or modern glass towers.

## Grading

Executed `grade.py` with `python3`. The script preserves the original dimensions and maps source RGB to luminance using 0.2126 R + 0.7152 G + 0.0722 B. It then linearly interpolates a restricted tonal palette at these input luminance positions (0–255):

| Input | Output |
| --- | --- |
| 0 | #0D1626 |
| 100 | #16233B |
| 205 | #5A6982 |
| 248 | #C9CCD3 |
| 255 | #FDF6EC |

The intermediate slate anchor keeps most architectural surfaces subdued navy; cool stone is reserved for high luminance, and cream is reserved for the very brightest source values. The ramp does not force the image to reach cream. Original warm hues are discarded entirely.

Fine monochrome grain uses one independent uniform random value per pixel, amplitude ±5.1 luminance levels (±2% of 255), applied before palette mapping. This avoids introducing hues outside the defined ramp or pushing shadows below #0D1626. Seeds are 301 and 302. PNG output is RGB, at the original 1536 × 1024 size. `grade.py` is included for exact reproduction.

Visually checked both originals and both graded outputs for composition, carving detail, and prohibited content.

