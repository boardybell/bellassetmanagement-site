# Brief 06 — hero 05-lake

Generated with the built-in image generation tool. Originals are untouched 1536×1024 PNG files; graded outputs retain their dimensions.

## Variant 1 — exact prompt

Use case: photorealistic-natural. Create a 1536x1024 landscape photograph for a restrained cinematic private holding company website hero. A still alpine lake at first light below a sharp mountain range, with a distinct central pyramidal rocky peak, faint low mist floating on the water and a few dark conifers on the distant shoreline. Natural 50mm lens perspective, exceptional photographic realism, geological detail, no stylization. Balanced centered composition: the main mountain and its reflection must survive a central 4:5 portrait crop (central 53% of the width). Mountain summit near upper third, shoreline near middle, broad calm dark water filling lower half for cream overlay text. Quiet blue hour just before sunrise, subdued cool sky, no visible sun, no dramatic colorful clouds. Sparse shoreline trees fully contained with breathing room; no awkward edge crops. Dark navy shadows, muted cool stone highlights. Landscape only. No people, body parts, human silhouettes, animals, buildings, boats, vehicles, flags, text, letters, numbers, signage, logos, or watermarks.

## Variant 2 — exact prompt

Use case: photorealistic-natural. Create a 1536x1024 landscape photograph for a restrained cinematic private holding company website hero. A remote still alpine lake at earliest dawn beneath a serrated limestone mountain range, a centered double summit and steep rock faces, delicate horizontal mist drifting over glassy water, and a small isolated cluster of dark conifers on a low shoreline near center-right. A different natural viewpoint across a wider open basin, natural 50mm lens, real atmospheric depth and lifelike rock textures, no stylization. Keep the complete primary double summit and reflection inside the central 53% of the frame width, suitable for a centered 4:5 portrait crop. Peaks in upper third, distant shoreline slightly above center, extensive smooth dark lake foreground as quiet negative space for cream text. Restrained pre-sunrise blue hour with softly overcast cool sky and low contrast, no visible sun or vivid colors. All isolated trees contained comfortably, no awkward crops. Dark navy atmosphere and cool stone highlights. Landscape only. No people, body parts, human silhouettes, animals, buildings, boats, vehicles, flags, text, letters, numbers, signage, logos, or watermarks.

## Grading

Ran `grade.py` with `python3` (Pillow). Converted RGB to luminance using Rec.709 weights (0.2126, 0.7152, 0.0722), normalized to 0–1, and applied power 1.7 to deepen exposure. Mapped the resulting scalar by piecewise linear interpolation through: 0 → #0D1626; 0.45 → #16233B; 0.96 → #C9CCD3; 1 → #FDF6EC. The cream endpoint is reserved for extreme highlights; these subdued dawn scenes remain predominantly dark navy. Original hue is entirely discarded.

Added fine monochrome grain by perturbing the single tonal coordinate uniformly ±0.02 before palette mapping, with deterministic seeds 6051 and 6052. Clamping and mapping after the grain keep all output colors on the palette ramps (subject to 8-bit rounding), with no colored noise. No cropping, retouching, or resizing of deliverables. `crop-review.jpg` shows both centered approximately 4:5 crops for composition review. `grade.py` preserves the reproducible grading recipe.

