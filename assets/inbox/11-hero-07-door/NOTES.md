# Brief 11 — hero 07-door

Generated with the built-in image generation tool. Raw PNGs are untouched copies of the generated originals. All four images are 1536 × 1024.

## Exact prompt — variant 1

```text
Use case: photorealistic-natural.
Create a landscape 1536x1024 photograph for the single small architectural accent on an otherwise typographic private holding company website. Photographic realism, natural 70mm lens perspective, no stylization.
Subject: one heavy bronze door pull on a dark oak plank door, extremely close architectural detail. Entire pull and both mounting points fully inside the frame with generous top and bottom clearance, centered precisely horizontally and vertically, narrow enough to survive a centered vertical-band crop. Only uninterrupted door surface at frame edges.
Raking natural light picks out fine oak grain and patinated metal. Restrained, cinematic, quiet, expensive material honesty, deep shadows with readable texture. Palette warm near-black #14120F, warm stone #6E6759, subdued gold-brown #8A6425, restrained cream highlights #FDF6EC. No blue, green, red, saturated orange.
No people, body parts, human silhouettes, animals, vehicles, text, letters, numbers, signage, logos, watermarks, flags, modern glass towers, extra objects or awkward edge crops.
Variant 1: straight-on view of a substantial elongated rectangular bronze bar pull with softly worn squared edges, held off the door by two short bronze mounts. Vertical dark oak planks. Thin raking light from upper left, subtle bronze glints, matte dark wood.
Save the generated original directly in the current directory assets/inbox/11-hero-07-door as raw-1.png if file output is supported.
```

## Exact prompt — variant 2

```text
Use case: photorealistic-natural.
Create a landscape 1536x1024 photograph for the single small architectural accent on an otherwise typographic private holding company website. Photographic realism, natural 70mm lens perspective, no stylization.
Subject: one heavy bronze door pull on a dark oak plank door, extremely close architectural detail. Entire pull and both mounting points fully inside the frame with generous top and bottom clearance, centered precisely horizontally and vertically, narrow enough to survive a centered vertical-band crop. Only uninterrupted door surface at frame edges.
Raking natural light picks out fine oak grain and patinated metal. Restrained, cinematic, quiet, expensive material honesty, deep shadows with readable texture. Palette warm near-black #14120F, warm stone #6E6759, subdued gold-brown #8A6425, restrained cream highlights #FDF6EC. No blue, green, red, saturated orange.
No people, body parts, human silhouettes, animals, vehicles, text, letters, numbers, signage, logos, watermarks, flags, modern glass towers, extra objects or awkward edge crops.
Variant 2: a weighty rounded bronze pull, gently bowed out from the wood, with a thick oval cross-section and two restrained circular bronze mounting feet. Straight-on view with slight visible depth on its right side. Dark oak planks with finer close linear grain. Raking daylight from the upper right, narrow soft highlight along the curved bronze and a long quiet shadow to the left. Keep the complete handle centered with clear space at both ends. Distinct photograph and hardware from variant 1.
```

## Grading

Run `python3 grade.py` in this directory. Pillow reads each raw RGB image without resizing or cropping. Rec.709 weighted luminance (0.2126 R + 0.7152 G + 0.0722 B) is normalized and raised to power 0.88 to open the fine wood and metal detail gently. Deterministic, independent per-pixel monochrome grain of uniform ±0.02 normalized luminance is added before palette mapping (seeds 1108 and 1109).

The resulting scalar maps piecewise linearly from #14120F at 0, through a warm midtone at 0.5, to #FDF6EC at 1. The midtone blends #6E6759 toward #8A6425 by up to 65%, guided by the source's red-minus-blue warmth ratio, preserving quieter stone-brown wood and subtle gold-brown metal. Source hue is otherwise discarded. Grain affects luminance only and is mapped through the same palette, so it introduces no colored speckles or foreign hues. Output is rounded to 8-bit RGB PNG at the original dimensions.

Both pulls are fully contained and centered, with door-only frame edges. Variant 1 uses rectangular hardware and left raking light; variant 2 uses bowed rounded hardware and right raking light.

