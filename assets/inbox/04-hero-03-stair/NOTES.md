# Brief 04: hero 03-stair

## Exact generation prompt — variant 1

Create one photographic image, landscape 1536x1024 pixels. Restrained cinematic architectural photograph for Bell Asset Management, a private holding company. A short flight of four worn pale limestone steps, centered in the frame, with a plain limestone wall beside them on the right. Close, quiet, very simple composition. Long late-afternoon shadow from an off-camera architectural wall falls diagonally across the steps from upper left toward lower right; the shadow must be geometric, never human-shaped. Softly eroded step noses, subtle natural stone pores and patina, matte surfaces, no clutter. View from near the foot of the steps at a modest oblique angle with natural 50mm lens perspective, realistic photographic detail and exposure, no stylization. Keep the essential stair and diagonal shadow contained within the central 4:5 portrait crop (the central 820 pixels of this landscape frame); allow simple quiet stone on both outer sides, generous breathing room and nothing cut awkwardly at edges. Muted warm pale stone, deep warm charcoal shadow, cream sunlight, restrained gold-brown undertones, no colored objects. No people, body parts, human silhouettes, animals, vehicles, text, letters, numbers, signage, logos, watermarks, flags, railings, plants, modern glass towers. Save the untouched generated image in the current working directory as raw-1.png if file output is supported.

## Exact generation prompt — variant 2

Create one photographic image, landscape 1536x1024 pixels. Quiet, restrained cinematic architectural photography for a private holding company. A short flight of three broad worn pale limestone steps centered in the composition, seen almost straight on from a slightly elevated natural 50mm camera perspective. A completely plain stone wall stands on the left beside the stairs. The steps occupy the lower middle, with a simple pale limestone landing above and breathing room around the subject. A long crisp late-afternoon geometric shadow falls diagonally from upper right to lower left across all three treads, with subtle reflected light in the shadow. Beautiful understated weathering, gently rounded edges, small pores, no rubble, no ornament. Make this a distinct, quieter, paler composition than a tight close-up: simpler surfaces, fewer joints, broad sunlit planes. Essential stair, wall and shadow must read clearly inside a centered 4:5 portrait crop from the landscape; keep the focal point centered and avoid awkward objects at frame edges. Photographic realism, natural lens, realistic material detail, no stylization. Cream stone, warm charcoal shadows and muted gold-brown undertones only. No people, body parts, silhouettes of people, animals, vehicles, text, letters, numbers, signage, logos, watermarks, flags, railings, vegetation or modern glass towers. Save the untouched generated image in the current working directory as raw-2.png if file output is supported.

## Grading

Untouched tool outputs are preserved as raw-1.png and raw-2.png. Both are 1536 × 1024 RGB PNGs. Graded files retain that size and composition.

Executed grade.py with python3 (Pillow). Converted to luminance to remove all source hue, stretched the 0.5th–99.5th percentile range, then applied a 0.92 power curve. Piecewise linear tritone mapping uses #14120F at 0, a restrained midtone #74664F at 0.50 (an approximately 80:20 blend of #6E6759 and #8A6425), and #FDF6EC at 1.0. Blending the two supplied midtone options preserves monotonic luminance, natural stone detail, and a quiet warm finish without an abrupt gold band.

Fine deterministic monochrome grain is uniform ±2% in the scalar tone before palette mapping (seeds 4031 and 4032). Mapping after grain ensures the grain cannot introduce colors outside the warm palette interpolation. There is no independent RGB color noise. No resizing, cropping, retouching or sharpening was applied.

## Composition

Variant 1 is a close oblique four-step study with a right-hand wall and a descending diagonal shadow. Variant 2 is a frontal three-step study with a left-hand wall and the opposite diagonal. For the planned inset, use a centered 4:5 crop (approximately x=358..1177 over the full height), displayed around 420 px wide. The delivered images remain landscape originals.

