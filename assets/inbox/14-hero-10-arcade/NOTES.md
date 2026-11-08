# Brief 14 — hero 10-arcade

Generated using the built-in image generation tool. Both raw PNGs are untouched copies of the generated results, each 1536 × 1024. The local reference `_ref/bbco-hero.jpg` was visually inspected for architectural language and dark navy mood.

## Variant 1 — centered arcade

Exact prompt:

Use case: photorealistic-natural. Create a 1536x1024 landscape architectural photograph for a full-bleed private holding company website hero. A long barrel-vaulted stone arcade, repeating semicircular transverse arches and substantial classical stone piers, receding into deep darkness, with a small soft pool of natural light on the stone floor at the far end. Restrained monumental neoclassical building language: finely jointed limestone ashlar, disciplined classical moldings, subtle timeworn texture, institutional dignity. Eye-level camera, natural 40mm lens, straight verticals, carefully balanced centered perspective. Vault and repeated arches legible but mostly submerged in shadow; large calm dark areas across foreground and sides suitable for overlaid cream text. Dim indirect daylight, cinematic but entirely realistic architectural photography, understated exposure, dark cool navy mood, cool gray stone highlights. No stylization or illustration or CGI appearance. No people, body parts, human silhouettes, animals, vehicles, text, letters, numbers, signage, logos, watermarks, flags, modern glass towers. No awkward edge crops. Output exactly 1536x1024.

## Variant 2 — off-axis arcade

Exact prompt:

Use case: photorealistic-natural. Generate a new distinct 1536x1024 landscape architectural photograph, natural photographic realism, for a restrained cinematic private holding company website hero. A very long classical limestone barrel-vaulted arcade with repeated deep round arches, massive squared stone piers, subtly carved classical impost moldings and ashlar masonry. View from a slightly off-axis position close to one side of the arcade, natural 45mm lens, eye height, straight verticals; the sequence of arches converges toward a distant dark vanishing point slightly right of center. Heavy shadowed stone wall and vault fill the left foreground with calm dark negative space for cream typography. At the far end only, hidden daylight forms a small soft oval pool on the flagstone floor; the passage beyond disappears into darkness. Ancient institutional architecture with the disciplined neoclassical limestone detailing of a monumental financial building, subtle real stone weathering, no Gothic or fantasy features. Dark navy ambient shadows, muted cool stone highlights, low-key exposure, fine tactile detail, entirely believable lens photography, no stylization, no CGI. Carefully composed architectural edges. No people, body parts, silhouettes of people, animals, vehicles, text, letters, numbers, signage, logos, watermarks, flags or modern glass towers. Output exactly 1536x1024.

## Navy grading

Reproducible code: `grade.py`, run with `python3 grade.py`.

Both images use the same treatment, without resizing, cropping, or structural edits. Convert RGB to luminance using Rec.709 coefficients (0.2126, 0.7152, 0.0722), normalize by the image’s 99.995th-percentile luminance, clamp to [0,1], then raise to power 1.55 to hold broad areas in navy. Piecewise linear palette mapping uses these tone/color anchors:

- 0.000: #0D1626
- 0.500: #16233B
- 0.850: #37465E (intermediate cool navy)
- 0.985: #C9CCD3
- 1.000: #FDF6EC

Only the narrow uppermost 1.5% of the tone scale moves beyond cool stone toward cream. Original source hues are discarded entirely. Very fine monochrome grain is a per-pixel scalar uniform perturbation of ±0.02 in tone, applied before palette mapping; this preserves the palette trajectory rather than introducing independent RGB color noise. Fixed seeds are 1401 and 1402. Round to 8-bit RGB and save as `graded-1.png` and `graded-2.png`.
